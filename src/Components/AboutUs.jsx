import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Aperture, Heart, Sparkles, Camera as CameraIcon } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: '10+', label: 'Years Behind the Lens' },
  { value: '250+', label: 'Weddings Captured' },
  { value: '40+', label: 'Editorial Features' },
  { value: '15k+', label: 'Frames Delivered' },
]

const VALUES = [
  {
    icon: Aperture,
    title: 'Precision',
    text: 'Every composition is measured &mdash; light, angle, and timing rehearsed until the frame earns its place.',
  },
  {
    icon: Heart,
    title: 'Emotion First',
    text: 'We chase the unscripted moment &mdash; a glance, a laugh &mdash; over the posed and predictable.',
  },
  {
    icon: Sparkles,
    title: 'Craft',
    text: 'From raw capture to final grade, each image is hand&#8209;finished, never templated.',
  },
  {
    icon: CameraIcon,
    title: 'Presence',
    text: 'We shoot quietly and move light on set, so the story unfolds the way it would without us there.',
  },
]



function AboutUs() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-reveal', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: '#about',
          start: 'top 75%',
        },
      })

      gsap.from('.about-value-card', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: '.about-values-grid',
          start: 'top 80%',
        },
      })


    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-brand-black px-8 py-32 sm:px-14 lg:px-20"
    >
      <div className="pointer-events-none absolute -left-40 top-0 h-[28rem] w-[28rem] rounded-full bg-brand-crimson/10 blur-[140px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[24rem] w-[24rem] rounded-full bg-brand-crimson/10 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="about-reveal flex items-center gap-4">
          <span className="h-px w-10 bg-brand-crimson" />
          <span className="font-audiowide text-[11px] uppercase tracking-[0.4em] text-brand-crimson">
            About Us
          </span>
        </div>

        <h2 className="about-reveal mt-8 max-w-4xl font-arizonia text-5xl leading-[1.1] text-brand-offwhite sm:text-6xl lg:text-7xl">
          The Story Behind Every Frame
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <p className="about-reveal font-audiowide text-[11px] uppercase leading-loose tracking-[0.25em] text-brand-offwhite/60">
            We are a studio built on light, patience, and detail &mdash;
            turning fleeting moments into images that last a lifetime. What
            began as one photographer with a single camera has grown into a
            full creative collective, but the instinct hasn&rsquo;t changed:
            look for the real moment, and wait for it.
          </p>
          <p className="about-reveal font-audiowide text-[11px] uppercase leading-loose tracking-[0.25em] text-brand-offwhite/60">
            We work across weddings, fashion, and commercial campaigns, but
            every shoot follows the same discipline &mdash; scout the light,
            plan the frame, then step back and let the story happen in front
            of the lens. The result is imagery that feels lived&#8209;in, not
            staged.
          </p>
        </div>

        <div className="mt-20 grid about-values-grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="about-value-card rounded-2xl border border-brand-offwhite/10 bg-brand-offwhite/5 p-6 transition-colors duration-500 hover:border-brand-crimson/40"
            >
              <Icon className="h-6 w-6 text-brand-crimson" />
              <h3 className="mt-5 font-audiowide text-xs uppercase tracking-[0.2em] text-brand-offwhite">
                {title}
              </h3>
              <p
                className="mt-3 font-audiowide text-[10px] uppercase leading-loose tracking-[0.2em] text-brand-offwhite/50"
                dangerouslySetInnerHTML={{ __html: text }}
              />
            </div>
          ))}
        </div>

        <div className="mt-24 grid grid-cols-2 gap-10 border-t border-brand-offwhite/10 pt-16 sm:grid-cols-4" id='about-stats'>
          {STATS.map((stat) => (
            <div key={stat.label} className="about-reveal">
              <p className="font-arizonia text-5xl text-brand-crimson">{stat.value}</p>
              <p className="mt-2 font-audiowide text-[10px] uppercase tracking-[0.25em] text-brand-offwhite/60">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutUs
