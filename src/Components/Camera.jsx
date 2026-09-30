import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Environment, useGLTF, useTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { GALLERY_SRCS, PLACEHOLDER_SRC } from '../data/gallery'
import { galleryStore } from '../data/galleryStore'
import { CAMERA_PATH_ID, CAMERA_PATH_SCROLL } from '../data/cameraPath'

gsap.registerPlugin(ScrollTrigger)

// rear display, in the model's local space (recessed panel on the back face)
const SCREEN_POSITION = [0.158, -0.117, 0.44]
const SCREEN_SIZE = [2.0, 1.32]

// crop texture like CSS object-fit: cover
function coverTexture(tex, [w, h]) {
  tex.colorSpace = THREE.SRGBColorSpace
  const imgAspect = tex.image.width / tex.image.height
  const screenAspect = w / h
  if (imgAspect > screenAspect) {
    tex.repeat.set(screenAspect / imgAspect, 1)
    tex.offset.set((1 - tex.repeat.x) / 2, 0)
  } else {
    tex.repeat.set(1, imgAspect / screenAspect)
    tex.offset.set(0, (1 - tex.repeat.y) / 2)
  }
  tex.needsUpdate = true
}

// mobile pose keeps the camera closer to center so it stays on-screen at narrow widths
const DESKTOP_POSE = { position: [6, -0.3, 0], rotation: [Math.PI / 18, Math.PI / 11.2, 0], scale: [1.2, 1.2, 1.2] }
const MOBILE_POSE = { position: [1, -0.7, 0], rotation: [Math.PI / 18, Math.PI / 3, 0], scale: [0.85, 0.85, 0.85] }
const MOBILE_BREAKPOINT = 768

// scroll-driven tween targets, scaled down on mobile so the model stays framed
// while riding the same hero -> about -> gallery scroll path
const DESKTOP_SCROLL_TWEENS = {
  heroToAbout: { x: -1.5, y: 0.6 },
  aboutToGalleryPos: { x: 0.2, y: -0.3 },
  galleryZoomScale: 3,
}
const MOBILE_SCROLL_TWEENS = {
  heroToAbout: { x: -0.2, y: 0.5 },
  aboutToGalleryPos: { x: 0, y: 0 },
  galleryZoomScale: 1.3,
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < MOBILE_BREAKPOINT)

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = (e) => setIsMobile(e.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return isMobile
}

const _ndc = new THREE.Vector3()
const _dir = new THREE.Vector3()
const _target = new THREE.Vector3()
const _scaled = new THREE.Vector3()

// last slice of the wave over which the camera shrinks away
const HIDE_FROM = 0.94
// max tilt (radians) while riding the wave
const MAX_BANK = 0.5
const MAX_TURN = 0.6

// point on the SVG path -> viewport px
function pathPointToScreen(path, progress) {
  const p = THREE.MathUtils.clamp(progress, 0, 1)
  const pt = path.getPointAtLength(p * path.getTotalLength())
  return new DOMPoint(pt.x, pt.y).matrixTransform(path.getScreenCTM())
}

// viewport px -> world position on the z plane the model sits on
function screenToWorld(screen, camera, planeZ, out) {
  // canvas is fixed full-viewport, so viewport px map straight to NDC
  _ndc.set((screen.x / window.innerWidth) * 2 - 1, -(screen.y / window.innerHeight) * 2 + 1, 0.5)
  _ndc.unproject(camera)
  _dir.copy(_ndc).sub(camera.position).normalize()
  const t = (planeZ - camera.position.z) / _dir.z
  return out.copy(camera.position).addScaledVector(_dir, t)
}

function Camera(props) {
    const isMobile = useIsMobile()
    const pose = isMobile ? MOBILE_POSE : DESKTOP_POSE
    const position = props.position ?? pose.position
    const rotation = props.rotation ?? pose.rotation
    const scale = props.scale ?? pose.scale

    const groupRef = useRef(null)
    const pathGroupRef = useRef(null)
    const pathState = useRef({ active: false, progress: 0 })
    const pathOffset = useRef(new THREE.Vector3())
    const camera = useThree((state) => state.camera)
    const keyLightRef = useRef(null)
    const rimLightRef = useRef(null)
    const screenMatRef = useRef(null)
    const placeholderTex = useTexture(PLACEHOLDER_SRC)
    const galleryTex = useTexture(GALLERY_SRCS)
    ;[placeholderTex, ...galleryTex].forEach((t) => coverTexture(t, SCREEN_SIZE))
    const { scene } = useGLTF("/model/camera/camera.glb")
    const bodyTex = useTexture({
      map: "/model/camera/camera_camera_BaseColor.png",
      normalMap: "/model/camera/camera_camera_NormalOpenGL.png",
      roughnessMap: "/model/camera/camera_camera_Roughness.png",
      metalnessMap: "/model/camera/camera_camera_Metallic.png",
    })
    useThree(({ camera }) => {
        camera.position.z = 6
    })
    Object.values(bodyTex).forEach((t) => { t.flipY = true })
    scene.traverse((child) => {
    	console.log('child:', child.name)
      if (!child.isMesh || child.userData.isScreen) return
        child.material = new THREE.MeshStandardMaterial({
          map: bodyTex.map,
          normalMap: bodyTex.normalMap,
          roughnessMap: bodyTex.roughnessMap,
          metalnessMap: bodyTex.metalnessMap,
          metalness: 0.4,
          roughness: 0.7,
        })
      


    })

  // ride the SVG wave. The outer group moves, scales and tilts the model around its own
  // origin; offset eases from the model's scroll-animated spot to the path point, so
  // scrolling back up glides it home (offset -> 0, no tilt, full size).
  useFrame((_, delta) => {
    const outer = pathGroupRef.current
    const inner = groupRef.current
    if (!outer || !inner) return
    const { active, progress } = pathState.current
    const el = document.getElementById(CAMERA_PATH_ID)
    const path = el?.getAttribute('d') ? el : null
    const onPath = active && path
    const ease = 1 - Math.exp(-delta * 6)
    const { lerp, clamp } = THREE.MathUtils

    let targetScale = 1
    let bank = 0
    let turn = 0
    if (onPath) {
      targetScale = clamp((1 - progress) / (1 - HIDE_FROM), 0, 1)

      const here = pathPointToScreen(path, progress)
      screenToWorld(here, camera, inner.position.z, _target)
      pathOffset.current.lerp(_target.sub(inner.position), ease)

      // direction of travel on screen (y down); tilt into curves, face where it's heading
      const ahead = pathPointToScreen(path, progress + 0.01)
      const dx = ahead.x - here.x
      const dy = ahead.y - here.y
      const len = Math.hypot(dx, dy)
      if (len > 0.001) {
        const tx = dx / len
        const ty = dy / len
        // bank fades to 0 on vertical stretches (tx -> 0), so no flip between left/right runs
        bank = clamp(-tx * Math.atan2(ty, Math.abs(tx)), -MAX_BANK, MAX_BANK)
        turn = tx * MAX_TURN
      }
    } else {
      pathOffset.current.lerp(_target.set(0, 0, 0), ease)
    }

    outer.scale.setScalar(lerp(outer.scale.x, targetScale, ease))
    outer.rotation.z = lerp(outer.rotation.z, bank, ease)
    outer.rotation.y = lerp(outer.rotation.y, turn, ease)
    outer.visible = outer.scale.x > 0.01

    // keep the model's origin at (its own spot + offset) whatever the outer scale/rotation:
    // world = outer.position + R * s * inner.position
    _scaled.copy(inner.position).multiplyScalar(outer.scale.x).applyQuaternion(outer.quaternion)
    outer.position.copy(inner.position).add(pathOffset.current).sub(_scaled)
  })

  useEffect(() => {
    if (!groupRef.current || !keyLightRef.current || !rimLightRef.current) return
    const scrollTweens = isMobile ? MOBILE_SCROLL_TWEENS : DESKTOP_SCROLL_TWEENS

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          endTrigger: '#about',
          end: 'top top',
          scrub: 1,
          
        },
      })

      tl.to(groupRef.current.position, { ...scrollTweens.heroToAbout, ease: 'none' }, 0)
        .to(groupRef.current.rotation, { x: Math.PI / 3, y: Math.PI * 3.5,  ease: 'none' }, 0)
        .to(keyLightRef.current.position, { x: -4, y: 2, z: -2, ease: 'none' }, 0)
        .to(keyLightRef.current, { intensity: 0.5, ease: 'none' }, 0)
        .to(rimLightRef.current.position, { x: 4, y: 1, z: -3, ease: 'none' }, 0)
        .to(rimLightRef.current, { intensity: 1.8, ease: 'none' }, 0)


        

      // once the gallery heading text finishes, bring the camera front and
      // center so its display faces the viewer, before the images spread
      const faceFrontTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#about',
          start: 'bottom bottom',
          endTrigger: '#gallery-heading',
          end: 'bottom bottom',
          scrub: 1,
        },
      })

      faceFrontTl.to(groupRef.current.rotation, { x: 0, z: Math.PI * 2, ease: 'none' }, 0)

      const faceFrontTl1 = gsap.timeline({
        scrollTrigger: {
          trigger: '#about',
          start: 'bottom bottom',
          endTrigger: '#gallery-heading',
          end: 'top top',
          scrub: 1,
        },
      })

      faceFrontTl1.to(groupRef.current.position, { ...scrollTweens.aboutToGalleryPos, ease: 'none' }, 0)

      const zoomGalleryTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#gallery-heading',
          start: 'top top',
          end: '+=100%',
          scrub: 1,
        },
      })
      // zoomGalleryTl.to(groupRef.current.position, { x: 3, ease: 'none' }, 0)
      const zoomScale = scrollTweens.galleryZoomScale
      zoomGalleryTl.to(groupRef.current.scale, { x: zoomScale, y: zoomScale, z: zoomScale, ease: 'none' }, 0)

      const showOnScreen = (tex) => {
        const mat = screenMatRef.current
        if (!mat || mat.map === tex) return
        mat.map = tex
        mat.needsUpdate = true
      }

      // once the zoom is done, flip through the gallery on the display
      ScrollTrigger.create({
        trigger: '#gallery',
        start: () => zoomGalleryTl.scrollTrigger.end,
        end: 'bottom bottom',
        
        onUpdate: (self) => {
          // one extra slot at the end so the placeholder returns after the last photo
          const slots = galleryTex.length + 1
          const i = Math.min(Math.floor(self.progress * slots), slots - 1)
          const isPhoto = i < galleryTex.length
          galleryStore.set({ index: isPhoto ? i : galleryStore.get().index, active: self.isActive && isPhoto })
          showOnScreen(isPhoto ? galleryTex[i] : placeholderTex)
        },
        // outside the flip range the display shows the placeholder
        onLeave: () => {
          galleryStore.set({ active: false })
          showOnScreen(placeholderTex)
        },
        onLeaveBack: () => {
          galleryStore.set({ index: 0, active: false })
          showOnScreen(placeholderTex)
        },
      })

      // shrink back from the gallery zoom as the path section comes in
      gsap.timeline({
        scrollTrigger: {
          trigger: '#camera-path',
          start: 'top bottom',
          end: 'top center',
          scrub: 1,
        },
      }).to(groupRef.current.scale, { x: 1, y: 1, z: 1, ease: 'none' }, 0)

      // path point tracks scroll; keeps the camera near viewport center until the page ends
      ScrollTrigger.create({
        ...CAMERA_PATH_SCROLL,
        onUpdate: (self) => {
          pathState.current.progress = self.progress
        },
        onToggle: (self) => {
          pathState.current.active = self.isActive || self.progress === 1
        },
      })
    })

    return () => ctx.revert()
  }, [galleryTex, placeholderTex, isMobile])

  return (
    <>
      <group ref={pathGroupRef}>
      <primitive ref={groupRef} object={scene} position={position} rotation={rotation} scale={scale}>
        <mesh userData={{ isScreen: true }} position={SCREEN_POSITION} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={SCREEN_SIZE} />
          <meshBasicMaterial ref={screenMatRef} map={placeholderTex} toneMapped={false} />
        </mesh>
      </primitive>
      </group>
      <ambientLight intensity={0.5} />
      <directionalLight ref={keyLightRef} position={[3, 6, 6]} intensity={1.6} />
      <directionalLight ref={rimLightRef} position={[-5, -1, 4]} intensity={0.6} color="#ff5566" />
      <Environment preset="city"  />
    </>
  )
}

export default Camera
