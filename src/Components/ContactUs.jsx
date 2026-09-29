import { useState } from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'

// placeholder studio details — replace with real ones
const STUDIO_EMAIL = 'hello@yourstudio.com'
const CONTACT_DETAILS = [
  { icon: Mail, label: 'Email', value: STUDIO_EMAIL, href: `mailto:${STUDIO_EMAIL}` },
  { icon: Phone, label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210' },
  { icon: MapPin, label: 'Studio', value: 'Ahmedabad, Gujarat, India' },
]

const SHOOT_TYPES = ['Wedding', 'Fashion Portrait', 'Automotive', 'Food', 'Commercial', 'Other']

const inputClass =
  'w-full rounded-xl border border-brand-offwhite/10 bg-brand-offwhite/5 px-5 py-4 font-audiowide text-[11px] uppercase tracking-[0.15em] text-brand-offwhite placeholder:text-brand-offwhite/30 outline-none transition-colors duration-300 focus:border-brand-crimson'

function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', shoot: SHOOT_TYPES[0], date: '', message: '' })

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  // no backend yet: open the visitor's mail app with the enquiry pre-filled
  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = `${form.shoot} enquiry from ${form.name}`
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Shoot: ${form.shoot}`,
      `Preferred date: ${form.date || 'Flexible'}`,
      '',
      form.message,
    ].join('\n')
    window.location.href = `mailto:${STUDIO_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <section
      id="contact-us"
      className="relative w-full overflow-hidden bg-brand-black px-8 pt-32 pb-12 sm:px-14 lg:px-20"
    >
      <div className="pointer-events-none absolute -right-40 top-0 h-[28rem] w-[28rem] rounded-full bg-brand-crimson/15 blur-[140px]" />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-16 lg:grid-cols-2">
        <div>
          <div className="contact-reveal flex items-center gap-4">
            <span className="h-px w-10 bg-brand-crimson" />
            <span className="font-audiowide text-[11px] uppercase tracking-[0.4em] text-brand-crimson">
              Contact Us
            </span>
          </div>

          <h2 className="contact-reveal mt-8 font-arizonia text-5xl leading-[1.1] text-brand-offwhite sm:text-6xl lg:text-7xl">
            Let&rsquo;s Frame Your Story
          </h2>

          <p className="contact-reveal mt-6 max-w-sm font-audiowide text-[11px] uppercase leading-loose tracking-[0.25em] text-brand-offwhite/60">
            Tell us about your shoot &mdash; we reply within 24 hours.
          </p>

          <ul className="contact-details m-0 mt-14 list-none space-y-8 p-0">
            {CONTACT_DETAILS.map(({ icon: Icon, label, value, href }) => (
              <li key={label} className="contact-detail flex items-center gap-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-brand-offwhite/10 bg-brand-offwhite/5">
                  <Icon className="h-5 w-5 text-brand-crimson" />
                </span>
                <div>
                  <p className="font-audiowide text-[10px] uppercase tracking-[0.3em] text-brand-offwhite/40">
                    {label}
                  </p>
                  {href ? (
                    <a href={href} className="mt-1 block font-audiowide text-xs tracking-[0.15em] text-brand-offwhite transition-colors duration-300 hover:text-brand-crimson">
                      {value}
                    </a>
                  ) : (
                    <p className="mt-1 font-audiowide text-xs tracking-[0.15em] text-brand-offwhite">{value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="contact-form grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input name="name" required placeholder="Your name" value={form.name} onChange={update} className={inputClass} />
          <input name="email" type="email" required placeholder="Email" value={form.email} onChange={update} className={inputClass} />
          <select name="shoot" value={form.shoot} onChange={update} className={`${inputClass} appearance-none`}>
            {SHOOT_TYPES.map((type) => (
              <option key={type} value={type} className="bg-brand-black">
                {type}
              </option>
            ))}
          </select>
          <input name="date" type="date" value={form.date} onChange={update} className={`${inputClass} [color-scheme:dark]`} />
          <textarea
            name="message"
            required
            rows={6}
            placeholder="Tell us about your shoot"
            value={form.message}
            onChange={update}
            className={`${inputClass} resize-none sm:col-span-2`}
          />
          <Button
            type="submit"
            className="rounded-full bg-brand-crimson px-8 py-6 font-audiowide text-xs uppercase tracking-widest text-brand-offwhite transition-colors duration-500 hover:bg-brand-offwhite hover:text-brand-crimson sm:col-span-2 sm:justify-self-start"
          >
            Send Enquiry
          </Button>
        </form>
      </div>

      <footer className="relative z-10 mx-auto mt-32 flex max-w-6xl flex-col items-center justify-between gap-6 border-t border-brand-crimson/40 pt-10 sm:flex-row">
        <img src="/logo.png" alt="Logo" className="h-14 w-auto" />
        <p className="font-audiowide text-[10px] uppercase tracking-[0.3em] text-brand-offwhite/40">
          &copy; {new Date().getFullYear()} All rights reserved
        </p>
      </footer>
    </section>
  )
}

export default ContactUs
