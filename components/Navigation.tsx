'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Menu, X, Sun, Moon, Phone, ChevronDown, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type SubItem = { href: string; label: string; desc?: string };
type NavItem = {
  href?: string;
  label: string;
  items?: SubItem[];
};

const navItems: NavItem[] = [
  {
    label: 'Diensten',
    items: [
      { href: '/diensten/bitumen-daken', label: 'Bitumen daken', desc: 'Bitumineuze dakbedekking' },
      { href: '/diensten/renovatie', label: 'Renovatie', desc: 'Dakrenovatie en -vernieuwing' },
      { href: '/diensten/nieuwbouw', label: 'Nieuwbouw', desc: 'Nieuwbouw daksystemen' },
      { href: '/diensten/onderhoud', label: 'Onderhoud', desc: 'Periodiek onderhoud' },
      { href: '/diensten/lekkage', label: 'Lekkage', desc: 'Spoedservice 24/7' },
    ],
  },
  {
    label: 'Over Ons',
    items: [
      { href: '/over', label: 'Ons verhaal', desc: 'Wie zijn wij en waar we voor staan' },
      { href: '/over#team', label: 'Team', desc: 'De mensen achter LK Dakwerken' },
      { href: '/over#projecten', label: 'Alle projecten', desc: 'Onze recente projecten' },
    ],
  },
  { href: '/contact', label: 'Contact' },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

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

  // Sluit dropdown bij escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    localStorage.setItem('theme', next);
  };

  const openDropdown = (label: string) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setOpenMenu(label);
  };

  const scheduleClose = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    closeTimeout.current = setTimeout(() => setOpenMenu(null), 120);
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
          <Link href="/" aria-label="LK Dakwerken home" className="flex items-center gap-2 shrink-0">
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
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium flex-1 justify-center">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.items && openDropdown(item.label)}
                onMouseLeave={() => item.items && scheduleClose()}
              >
                {item.items ? (
                  <>
                    <button
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg link-underline transition-opacity hover:opacity-80"
                      onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)}
                      aria-expanded={openMenu === item.label}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          'w-3.5 h-3.5 transition-transform duration-200',
                          openMenu === item.label && 'rotate-180'
                        )}
                      />
                    </button>
                    {/* Dropdown panel */}
                    <div
                      className={cn(
                        'absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200',
                        openMenu === item.label
                          ? 'opacity-100 translate-y-0 pointer-events-auto'
                          : 'opacity-0 -translate-y-1 pointer-events-none'
                      )}
                      onMouseEnter={() => openDropdown(item.label)}
                      onMouseLeave={scheduleClose}
                    >
                      <div className="bg-white text-ink-900 rounded-2xl shadow-2xl border border-paper-200 min-w-[340px] md:min-w-[400px] overflow-hidden">
                        {/* Items */}
                        <div className="p-2">
                          {item.items.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={() => setOpenMenu(null)}
                              className="group flex items-start gap-3 p-3 rounded-xl hover:bg-paper-50 transition-colors"
                            >
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-ink-900 group-hover:text-blue-500 transition-colors">
                                  {sub.label}
                                </div>
                                {sub.desc && (
                                  <div className="text-xs text-ink-500 mt-0.5">{sub.desc}</div>
                                )}
                              </div>
                              <ArrowRight className="w-4 h-4 text-blue-500 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all mt-1 shrink-0" />
                            </Link>
                          ))}
                        </div>
                        {/* Footer link */}
                        <div className="bg-paper-50 px-4 py-3 border-t border-paper-200">
                          {item.label === 'Diensten' && (
                            <Link
                              href="/diensten"
                              onClick={() => setOpenMenu(null)}
                              className="flex items-center justify-between text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors group"
                            >
                              <span>Bekijk alle diensten</span>
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                          )}
                          {item.label === 'Over Ons' && (
                            <Link
                              href="/over"
                              onClick={() => setOpenMenu(null)}
                              className="flex items-center justify-between text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors group"
                            >
                              <span>Lees ons verhaal</span>
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href!}
                    className="flex items-center px-3 py-2 rounded-lg link-underline transition-opacity hover:opacity-80"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
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
              href="/offerte"
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
          <Link href="/" onClick={() => setMobileOpen(false)} aria-label="LK Dakwerken" className="flex items-center gap-2">
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

        <nav className="flex-1 overflow-y-auto flex flex-col px-6 py-4">
          {navItems.map((item, i) => (
            <MobileNavSection
              key={item.label}
              item={item}
              index={i}
              scrolled={scrolled}
              onClose={() => setMobileOpen(false)}
            />
          ))}
        </nav>

        <div className={cn('px-6 py-6 border-t space-y-4', scrolled ? 'border-paper-200' : 'border-white/10')}>
          <a href="tel:+31102713824" className="flex items-center gap-3 font-mono text-sm">
            <Phone className="w-4 h-4" />
            <span>010 - 271 38 24</span>
          </a>
          <Link
            href="/offerte"
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

// Mobiele sectie: als dropdown-items, toon als accordion; anders als gewone link
function MobileNavSection({
  item,
  index,
  scrolled,
  onClose,
}: {
  item: NavItem;
  index: number;
  scrolled: boolean;
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);

  if (!item.items) {
    return (
      <Link
        href={item.href!}
        onClick={onClose}
        className={cn(
          'flex items-center justify-between py-5 text-2xl font-display font-bold tracking-tight border-b',
          scrolled ? 'border-paper-200' : 'border-white/10'
        )}
      >
        <span>{item.label}</span>
        <span className={cn('font-mono text-xs', scrolled ? 'text-ink-400' : 'text-white/40')}>0{index + 1}</span>
      </Link>
    );
  }

  return (
    <div className={cn('border-b', scrolled ? 'border-paper-200' : 'border-white/10')}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-5 text-2xl font-display font-bold tracking-tight"
      >
        <span>{item.label}</span>
        <ChevronDown
          className={cn('w-5 h-5 transition-transform duration-200', open && 'rotate-180')}
        />
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-300',
          open ? 'max-h-[600px] pb-3' : 'max-h-0'
        )}
      >
        <div className="space-y-1">
          {item.items.map((sub, i) => (
            <Link
              key={sub.href}
              href={sub.href}
              onClick={onClose}
              className={cn(
                'flex items-start gap-3 py-3 pl-2 rounded-lg transition-colors',
                scrolled ? 'hover:bg-paper-100' : 'hover:bg-white/5'
              )}
            >
              <span className={cn('font-mono text-xs mt-2', scrolled ? 'text-ink-400' : 'text-white/40')}>
                0{i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-base font-medium">{sub.label}</div>
                {sub.desc && (
                  <div className={cn('text-xs mt-0.5', scrolled ? 'text-ink-500' : 'text-white/60')}>
                    {sub.desc}
                  </div>
                )}
              </div>
              <ArrowRight className={cn('w-4 h-4 mt-2', scrolled ? 'text-ink-400' : 'text-white/40')} />
            </Link>
          ))}
          {/* Footer link */}
          <Link
            href={item.label === 'Diensten' ? '/diensten' : '/over'}
            onClick={onClose}
            className={cn(
              'flex items-center justify-between mt-2 py-3 pl-2 rounded-lg font-medium transition-colors',
              scrolled ? 'text-blue-500 hover:bg-paper-100' : 'text-blue-300 hover:bg-white/5'
            )}
          >
            <span>
              {item.label === 'Diensten' ? 'Bekijk alle diensten' : 'Lees ons verhaal'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
