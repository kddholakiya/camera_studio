import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { CAMERA_PATH_ID, CAMERA_PATH_SCROLL } from '../data/cameraPath'

gsap.registerPlugin(ScrollTrigger)

// wave the 3D camera rides along (see Camera.jsx): starts top-right, ends bottom-left.
// bends in a 1000x1000 space, scaled to the wrapper's real pixel size below
const WAVE = [
  ['M', 880, 0],
  ['C', 880, 110, 120, 90, 120, 200],
  ['C', 120, 310, 880, 290, 880, 400],
  ['C', 880, 510, 120, 490, 120, 600],
  ['C', 120, 710, 880, 690, 880, 800],
  ['C', 880, 890, 120, 870, 120, 960],
]

// real pixel coords (no stretched viewBox) keep getTotalLength and dash drawing exact
function buildWave(width, height) {
  return WAVE.map(([cmd, ...nums]) =>
    `${cmd} ${nums.map((n, i) => ((i % 2 ? height : width) * n) / 1000).join(' ')}`,
  ).join(' ')
}

function CameraPath({ children }) {
  const wrapperRef = useRef(null)
  const lineRef = useRef(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize({ width, height })
    })
    observer.observe(wrapperRef.current)
    return () => observer.disconnect()
  }, [])

  // draw the wave on scroll, starting at Client Reviews
  useEffect(() => {
    if (!size.width) return
    const line = lineRef.current
    const length = line.getTotalLength()

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { strokeDasharray: length, strokeDashoffset: length },
        { strokeDashoffset: 0, ease: 'none', scrollTrigger: { ...CAMERA_PATH_SCROLL, scrub: 0.5 } },
      )
    })
    ScrollTrigger.refresh()

    return () => ctx.revert()
  }, [size])

  const d = size.width ? buildWave(size.width, size.height) : ''

  return (
    <div id="camera-path" ref={wrapperRef} className="relative">
      {children}

      {/* after the sections in DOM order: paints over their backgrounds, under the
          fixed canvas (z-1) and under their z-10 content */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox={`0 0 ${size.width || 1} ${size.height || 1}`}
        aria-hidden="true"
      >
        {/* faint track showing the full route ahead */}
        <path d={d} fill="none" stroke="var(--color-brand-crimson)" strokeOpacity="0.2" strokeWidth="2" strokeLinecap="round" />
        <path
          ref={lineRef}
          id={CAMERA_PATH_ID}
          d={d}
          fill="none"
          stroke="var(--color-brand-crimson)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

export default CameraPath
