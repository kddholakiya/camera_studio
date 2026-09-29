import { useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import gsap from 'gsap'
import Camera from './Camera'
import { Button } from '@/components/ui/button'

function Hero({ ready = true }) {
  const eyebrowRef = useRef(null)
  const lineOneRef = useRef(null)
  const lineTwoRef = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    if (!ready) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from(eyebrowRef.current, { opacity: 0, y: -12, duration: 0.6 })
        .from(
          lineOneRef.current.querySelectorAll('.hero-char'),
          { opacity: 0, y: 40, rotateX: -60, stagger: 0.03, duration: 0.8 },
          '-=0.2',
        )
        .from(
          lineTwoRef.current.querySelectorAll('.hero-char'),
          { opacity: 0, y: 40, rotateX: -60, stagger: 0.03, duration: 0.8 },
          '-=0.5',
        )
        .from(subRef.current, { opacity: 0, y: 20, duration: 0.6 }, '-=0.3')
        .from(ctaRef.current.children, { opacity: 0, y: 20, stagger: 0.12, duration: 0.6 }, '-=0.3')
    })

    return () => ctx.revert()
  }, [ready])

  const splitChars = (text) =>
    [...text].map((char, i) => (
      <span key={`${char}-${i}`} className="hero-char inline-block" style={{ perspective: '600px' }}>
        {char === ' ' ? ' ' : char}
      </span>
    ))

  return (
    <section id="hero" className="relative grid h-screen w-full grid-cols-1 overflow-hidden bg-brand-black lg:grid-cols-2">
      <div className="pointer-events-none absolute right-0 top-1/2 hidden h-[34rem] w-[34rem] -translate-y-1/2 translate-x-1/4 rounded-full bg-brand-crimson/20 blur-[140px] lg:block" />
      <div className="pointer-events-none absolute right-[8%] top-1/2 hidden h-[22rem] w-[22rem] -translate-y-1/2 rounded-full border border-brand-offwhite/10 lg:block" />

      <div className="relative z-10 flex flex-col justify-center px-8 py-28 sm:px-14 lg:px-20">
        <div ref={eyebrowRef} className="flex items-center gap-4">
          <span className="h-px w-10 bg-brand-crimson" />
          <span className="font-audiowide text-[11px] uppercase tracking-[0.4em] text-brand-crimson">
            Est. Behind the Lens
          </span>
        </div>

        <h1 className="mt-8 font-arizonia text-6xl leading-[1.05] text-brand-offwhite sm:text-7xl lg:text-8xl">
          <span ref={lineOneRef} className="block">
            {splitChars('Capturing Stories')}
          </span>
          <span ref={lineTwoRef} className="block">
            {splitChars('Beyond Frames')}
          </span>
        </h1>

        <p ref={subRef} className="mt-8 max-w-md font-audiowide text-[11px] uppercase leading-loose tracking-[0.25em] text-brand-offwhite/60">
          Luxury Photography &bull; Weddings
          <br />
          Fashion Portraits &bull; Commercial Shoots
        </p>

        <div ref={ctaRef} className="mt-12 flex flex-wrap items-center gap-4">
          <Button className="rounded-full bg-brand-crimson px-8 py-6 font-audiowide text-xs uppercase tracking-widest text-brand-offwhite hover:bg-brand-offwhite hover:text-brand-crimson transition-colors duration-500">
            Book a Session
          </Button>
          <Button
            variant="outline"
            className="rounded-full border-brand-offwhite/30 bg-transparent px-8 py-6 font-audiowide text-xs uppercase tracking-widest text-brand-offwhite hover:text-brand-crimson hover:bg-brand-offwhite/10 transition-colors duration-500"
          >
            View Gallery
          </Button>
        </div>
      </div>


      <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 lg:hidden">
        <span className="h-10 w-px animate-pulse bg-brand-offwhite/30" />
      </div>
    </section>
  )
}

export default Hero
