'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X, Sun, Moon, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

const links = [
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
    const onScroll = () => setScrolled(window.scrollY > 12);
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
    <>
      <header className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1.5rem)] md:w-[calc(100%-3rem)] max-w-7xl">
        <div
          className={cn(
            'flex items-center justify-between gap-2 md:gap-4 px-3 md:px-5 py-2.5 md:py-3 rounded-2xl transition-all duration-300',
            scrolled ? 'nav-floating text-ink-900' : 'nav-floating-dark text-white'
          )}
        >
          {/* Logo links */}
          <Link href="/lkdakwerken/" aria-label="LK Dakwerken home" className="flex items-center gap-2 shrink-0">
            <img
              src="/lkdakwerken/logo.svg"
              alt="LK Dakwerken"
              className={cn('h-7 md:h-8 w-auto transition-all', scrolled ? '' : 'brightness-0 invert')}
            />
            <span className={cn('hidden md:inline font-display font-bold text-base tracking-tight', scrolled ? 'text-ink-900' : 'text-white')}>
              LK Dakwerken
            </span>
          </Link>

          {/* Nav links gecentreerd - alleen desktop */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium flex-1 justify-center">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="link-underline transition-opacity hover:opacity-80"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Spacer voor mobile */}
          <div className="lg:hidden flex-1" />

          {/* Rechts: telefoon (desktop), theme toggle, Offerte CTA, mobile menu */}
          <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
            {/* Telefoon link - alleen op xl schermen */}
            <a
              href="tel:+31102713824"
              className={cn(
                'hidden xl:flex items-center gap-2 px-3 py-2 rounded-full text-xs font-mono transition-colors',
                scrolled ? 'text-ink-700 hover:bg-paper-100' : 'text-white/80 hover:bg-white/10'
              )}
              aria-label="Bel ons"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>010 - 271 38 24</span>
            </a>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className={cn(
                'w-9 h-9 rounded-full flex items-center justify-center transition-colors',
                scrolled ? 'hover:bg-paper-100 text-ink-700' : 'hover:bg-white/10 text-white'
              )}
              aria-label={theme === 'dark' ? 'Lichte modus' : 'Donkere modus'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Offerte CTA */}
            <Link
              href="/lkdakwerken/offerte"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-full hover:bg-blue-600 transition-colors shadow-sm"
            >
              Offerte
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(true)}
              className={cn(
                'lg:hidden w-9 h-9 rounded-full flex items-center justify-center transition-colors',
                scrolled ? 'hover:bg-paper-100 text-ink-700' : 'hover:bg-white/10 text-white'
              )}
              aria-label="Open menu"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          'fixed inset-0 z-[60] lg:hidden flex flex-col transition-transform duration-300',
          scrolled ? 'bg-white text-ink-900' : 'bg-ink-900 text-white',
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className={cn('px-6 py-5 flex items-center justify-between border-b', scrolled ? 'border-paper-200' : 'border-white/10')}>
          <Link href="/lkdakwerken/" onClick={() => setMobileOpen(false)} aria-label="LK Dakwerken" className="flex items-center gap-2">
            <img
              src="/lkdakwerken/logo.svg"
              alt="LK Dakwerken"
              className={cn('h-8 w-auto', scrolled ? '' : 'brightness-0 invert')}
            />
            <span className="font-display font-bold text-base">LK Dakwerken</span>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className={cn('w-9 h-9 rounded-full flex items-center justify-center', scrolled ? 'hover:bg-paper-100' : 'hover:bg-white/10')}
            aria-label="Sluit menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 flex flex-col px-6 py-4">
          {links.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'flex items-center justify-between py-5 text-2xl font-display font-bold tracking-tight border-b',
                scrolled ? 'border-paper-200' : 'border-white/10'
              )}
            >
              <span>{link.label}</span>
              <span className={cn('font-mono text-xs', scrolled ? 'text-ink-400' : 'text-white/40')}>0{i + 1}</span>
            </Link>
          ))}
        </nav>

        <div className={cn('px-6 py-6 border-t space-y-4', scrolled ? 'border-paper-200' : 'border-white/10')}>
          <a href="tel:+31102713824" className="flex items-center gap-3 font-mono text-sm">
            <Phone className="w-4 h-4" />
            <span>010 - 271 38 24</span>
          </a>
          <Link
            href="/lkdakwerken/offerte"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-3 font-semibold transition-colors rounded-full"
          >
            Offerte aanvragen
          </Link>
        </div>
      </div>
    </>
  );
}
