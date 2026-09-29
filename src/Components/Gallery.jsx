import { useEffect, useRef, useSyncExternalStore } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GALLERY_IMAGES } from '../data/gallery'
import { galleryStore } from '../data/galleryStore'

gsap.registerPlugin(ScrollTrigger)

// details for the photo currently on the camera display
function PhotoCaption() {
  const { index, active } = useSyncExternalStore(galleryStore.subscribe, galleryStore.get)
  const detailsRef = useRef(null)
  const photo = GALLERY_IMAGES[index]

  useEffect(() => {
    gsap.fromTo(
      detailsRef.current.children,
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', stagger: 0.06 },
    )
  }, [index])

  return (
    <div
      className={`pointer-events-none fixed bottom-10 left-8 z-20 max-w-xs transition-opacity duration-500 sm:left-14 lg:left-20 ${
        active ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div ref={detailsRef}>
        <div className="flex items-center gap-4">
          <span className="h-px w-10 bg-brand-crimson" />
          <span className="font-audiowide text-[11px] uppercase tracking-[0.4em] text-brand-crimson">
            {photo.category}
          </span>
        </div>
        <h3 className="mt-4 font-arizonia text-4xl leading-tight text-brand-offwhite sm:text-5xl">
          {photo.title}
        </h3>
        <p className="mt-3 font-audiowide text-[11px] uppercase leading-loose tracking-[0.2em] text-brand-offwhite/60">
          {photo.description}
        </p>
        <span className="mt-4 block font-audiowide text-[10px] tracking-[0.3em] text-brand-offwhite/40">
          {String(index + 1).padStart(2, '0')} / {String(GALLERY_IMAGES.length).padStart(2, '0')}
        </span>
      </div>
    </div>
  )
}

function Gallery() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gallery-reveal', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: '#gallery-heading',
          start: 'top 85%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div id="gallery" ref={sectionRef} className="relative w-full overflow-hidden bg-brand-black">
      <section
        id="gallery-heading"
        className="relative w-full px-8 pt-32 pb-16 sm:px-14 lg:px-20"
      >
        <div className="pointer-events-none absolute left-1/2 top-0 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-brand-crimson/10 blur-[140px]" />

        <div className="relative z-10 mx-auto max-w-6xl text-center">
          <div className="gallery-reveal flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-brand-crimson" />
            <span className="font-audiowide text-[11px] uppercase tracking-[0.4em] text-brand-crimson">
              Gallery
            </span>
            <span className="h-px w-10 bg-brand-crimson" />
          </div>

          <h2 className="gallery-reveal mt-8 font-arizonia text-5xl leading-[1.1] text-brand-offwhite sm:text-6xl lg:text-7xl">
            Frames Worth Framing
          </h2>

          <p className="gallery-reveal mx-auto mt-6 max-w-md font-audiowide text-[11px] uppercase leading-loose tracking-[0.25em] text-brand-offwhite/60">
            Straight off the display &mdash; keep scrolling to flip
            through the frames.
          </p>
        </div>
      </section>

      {/* scroll room: the 3D camera zooms in and flips through photos on its display */}
      <section id="gallery-images" className="relative h-[500vh] w-full" />

      <PhotoCaption />
    </div>
  )
}

export default Gallery
