'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const navItems = [
  { id: 'about', label: 'about', num: '01' },
  { id: 'arsenal', label: 'arsenal', num: '02' },
  { id: 'experience', label: 'experience', num: '03' },
  { id: 'lab', label: 'lab', num: '04' },
  { id: 'vibe', label: 'vibe', num: '05' },
  { id: 'projects', label: 'projects', num: '06' },
  { id: 'contact', label: 'contact', num: '07' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className={`fixed top-8 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled || open
          ? 'bg-[var(--bg)]/80 backdrop-blur-md border-b border-[var(--line)]'
          : 'border-b border-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <a
            href="#about"
            onClick={(e) => handleClick(e, 'about')}
            className="font-mono text-sm tracking-tight flex items-center gap-2 group"
          >
            <span className="inline-block w-2 h-2 bg-[var(--accent)] group-hover:rotate-45 transition-transform" />
            <span className="text-[var(--fg)]">aakarsh</span>
            <span className="text-[var(--fg-dim)]">.aa</span>
          </a>

          <div className="hidden md:flex items-center gap-6 font-mono text-xs uppercase tracking-wider">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className="group relative text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
              >
                <span className="text-[var(--fg-dim)] mr-1.5">{item.num}</span>
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--accent)] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          <a
            href="#contact"
            onClick={(e) => handleClick(e, 'contact')}
            className="hidden md:inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider border border-[var(--line-strong)] hover:border-[var(--accent)] hover:text-[var(--accent)] text-[var(--fg)] px-3 py-1.5 transition-all"
          >
            <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full" />
            let&apos;s build
          </a>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-xl text-[var(--fg)]"
            aria-label="toggle menu"
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-[var(--line)]">
          <div className="flex flex-col py-4 font-mono text-sm">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className="px-6 py-3 text-[var(--fg-muted)] hover:text-[var(--accent)] hover:bg-[var(--bg-soft)] flex items-center gap-3"
              >
                <span className="text-[var(--fg-dim)] text-xs">{item.num}</span>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;
