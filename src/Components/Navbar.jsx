const LINKS = ['About', 'Contact Us', 'Gallery', 'FAQs', 'Client Reviews']

function Navbar() {
  return (
    <nav className="z-10 flex w-full items-center justify-between border-b border-brand-crimson bg-brand-black/85 px-10  backdrop-blur-md">
      <img src="/logo.png" alt="Logo" className="h-20 w-auto" />
      <ul className="flex list-none items-center gap-9 p-0 m-0">
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
    </nav>
  )
}

export default Navbar
