'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

const links = [
  { href: '/', label: 'Home' },
  { href: '/diensten', label: 'Diensten' },
  { href: '/over', label: 'Over' },
  { href: '/blog', label: 'Blog' },
  { href: '/locaties', label: 'Locaties' },
  { href: '/contact', label: 'Contact' },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    const prefersDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = (stored as 'light' | 'dark') || (prefersDark ? 'dark' : 'light');
    setTheme(initial);
    document.documentElement.classList.toggle('dark', initial === 'dark');
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    localStorage.setItem('theme', next);
  };

  return (
    <header className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1.5rem)] md:w-[calc(100%-3rem)] max-w-7xl">
      <div className={cn(
        'transition-all duration-300 px-4 md:px-6 py-3 rounded-2xl flex items-center justify-between',
        scrolled ? 'nav-floating text-ink-900' : 'nav-floating-dark text-white'
      )}>
      <div className="container-wide flex items-center justify-between h-14">
        <Link href="/" aria-label="LK Dakwerken home">
          <img src="/logo.svg" alt="LK Dakwerken" className={cn("h-8 w-auto", scrolled ? "" : "brightness-0 invert")} />
        </Link>

        <nav className="hidden lg:flex items-center gap-7 text-sm">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="link-underline">{link.label}</Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={toggleTheme} className="w-9 h-9 flex items-center justify-center border border-white/20 hover:bg-white/10 transition-colors" aria-label="Thema">
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          <Link href="/offerte" className="hidden md:inline-flex items-center gap-2 px-5 py-2 bg-blue-500 text-white text-sm font-semibold rounded-full hover:bg-blue-600 transition-colors shadow-md">
            Offerte
          </Link>

          <button onClick={() => setMobileOpen(true)} className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20" aria-label="Menu">
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className={cn(
        'fixed inset-0 bg-[var(--background)] z-[60] transition-transform duration-300 lg:hidden flex flex-col',
        mobileOpen ? 'translate-x-0' : 'translate-x-full'
      )}>
        <div className="container-tight py-5 flex items-center justify-between border-b border-white/10">
          <Link href="/" onClick={() => setMobileOpen(false)} aria-label="LK Dakwerken">
            <img src="/logo.svg" alt="LK Dakwerken" className={cn("h-8 w-auto", scrolled ? "" : "brightness-0 invert")} />
          </Link>
          <button onClick={() => setMobileOpen(false)} className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20" aria-label="Sluit">
            <X className="w-4 h-4" />
          </button>
        </div>
        <nav className="container-tight flex-1 flex flex-col">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block py-5 text-3xl font-semibold tracking-tight border-b border-white/10">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="container-tight py-6 border-t border-white/10 space-y-4">
          <a href="tel:+31612345678" className="font-mono text-lg block">06 12 34 56 78</a>
          <Link href="/offerte" onClick={() => setMobileOpen(false)} className="bg-blue-500 text-white py-3 font-semibold text-center hover:bg-blue-600 transition-colors">Offerte aanvragen</Link>
        </div>
      </div>
    </div>
    </header>
  );
}
