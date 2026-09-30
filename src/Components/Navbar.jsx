import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const LINKS = ['About', 'Contact Us', 'Gallery', 'FAQs', 'Client Reviews']

function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed left-0 top-0 z-20 flex w-full items-center justify-between border-b border-brand-crimson bg-brand-black px-6 sm:px-10">
      <img src="/logo.png" alt="Logo" className="h-14 w-auto sm:h-20" />

      <ul className="hidden list-none items-center gap-9 p-0 m-0 lg:flex">
        {LINKS.map((link) => (
          <li key={link}>
            <a
              href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
              className="rounded-full border border-transparent px-3 py-1.5 font-audiowide text-xs uppercase tracking-wider text-brand-offwhite transition-all duration-300 hover:border-white/20 hover:bg-white/5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] hover:backdrop-blur-sm"
            >
              <span className="text-glass-hover">{link}</span>
            </a>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? 'Close menu' : 'Open menu'}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-transparent text-brand-offwhite transition-colors duration-300 hover:border-white/20 hover:bg-white/5 lg:hidden"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <ul
        className={`absolute left-0 top-full m-0 flex w-full list-none flex-col gap-1 border-b border-brand-crimson bg-brand-black/95 p-4 backdrop-blur-md transition-[grid-template-rows] lg:hidden ${
          open ? 'flex' : 'hidden'
        }`}
      >
        {LINKS.map((link) => (
          <li key={link}>
            <a
              href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setOpen(false)}
              className="block rounded-full border border-transparent px-3 py-2.5 font-audiowide text-xs uppercase tracking-wider text-brand-offwhite transition-all duration-300 hover:border-white/20 hover:bg-white/5"
            >
              <span className="text-glass-hover">{link}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar
