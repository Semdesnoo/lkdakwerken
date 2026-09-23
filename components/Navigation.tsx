'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, ChevronDown, ArrowRight } from 'lucide-react';
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
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

  const openDropdown = (label: string) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setOpenMenu(label);
  };

  const scheduleClose = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    closeTimeout.current = setTimeout(() => setOpenMenu(null), 120);
  };

  const handleItemClick = (item: NavItem) => {
    if (item.items) {
      const next = openMenu === item.label ? null : item.label;
      setOpenMenu(next);
    } else {
      setOpenMenu(null);
    }
  };

  return (
    <>
      <header className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1.5rem)] md:w-[calc(100%-3rem)] max-w-7xl">
        <div
          className={cn(
            'flex items-center justify-between gap-4 md:gap-6 px-4 md:px-6 py-2.5 md:py-3 rounded-2xl transition-all duration-300',
            scrolled ? 'nav-floating text-ink-900' : 'nav-floating-dark text-white'
          )}
        >
          {/* Logo links met LK Dakwerken merk-teken */}
          <Link href="/" aria-label="LK Dakwerken home" className="flex items-center gap-3 shrink-0 group">
            <img
              src="/lkdakwerken/logo.svg"
              alt="LK Dakwerken"
              className={cn(
                'h-7 md:h-9 w-auto transition-all duration-300',
                scrolled ? '' : 'brightness-0 invert'
              )}
            />
          </Link>

          {/* Nav links: grotere, boldere titels gecentreerd */}
          <nav className="hidden lg:flex items-center justify-center gap-2 xl:gap-3 flex-1">
            {navItems.map((item) => {
              const isOpen = openMenu === item.label;
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.items && openDropdown(item.label)}
                  onMouseLeave={() => item.items && scheduleClose()}
                >
                  {item.items ? (
                    <button
                      onClick={() => handleItemClick(item)}
                      aria-expanded={isOpen}
                      className={cn(
                        'group relative flex items-center gap-1.5 px-3 xl:px-4 py-2 text-[15px] font-display font-semibold transition-all duration-200',
                        isOpen
                          ? 'text-blue-500'
                          : scrolled
                            ? 'text-ink-900 hover:text-blue-500'
                            : 'text-white hover:text-blue-300'
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          'w-4 h-4 transition-transform duration-300 ease-out',
                          isOpen && 'rotate-180'
                        )}
                      />
                      <span
                        className={cn(
                          'absolute bottom-0 left-3 right-3 xl:left-4 xl:right-4 h-0.5 bg-blue-500 origin-center transition-transform duration-300 ease-out',
                          isOpen ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                        )}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href!}
                      className={cn(
                        'group relative inline-flex items-center px-3 xl:px-4 py-2 text-[15px] font-display font-semibold transition-all duration-200',
                        scrolled ? 'text-ink-900 hover:text-blue-500' : 'text-white hover:text-blue-300'
                      )}
                    >
                      {item.label}
                      <span className="absolute bottom-0 left-3 right-3 xl:left-4 xl:right-4 h-0.5 bg-blue-500 origin-center scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="lg:hidden flex-1" />

          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            <a
              href="tel:+311****3824"
              className={cn(
                'hidden xl:flex items-center gap-2 px-3 py-2 rounded-full text-xs font-mono transition-colors',
                scrolled ? 'text-ink-700 hover:bg-paper-100' : 'text-white/80 hover:bg-white/10'
              )}
              aria-label="Bel ons"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>010 - 271 38 24</span>
            </a>

            <Link
              href="/offerte"
              className="inline-flex items-center gap-2 px-4 md:px-5 py-2.5 text-sm font-semibold rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-all duration-200 shadow-sm hover:shadow-md hover:scale-[1.02]"
            >
              Offerte
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

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

        {/* Mega dropdown panel: cross-fade via grid-rows animatie */}
        <div
          className={cn(
            'hidden lg:block absolute top-full left-0 right-0 pt-3 transition-all duration-300 ease-out',
            openMenu ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
          )}
          onMouseEnter={() => openMenu && openDropdown(openMenu)}
          onMouseLeave={scheduleClose}
        >
          <div className="bg-white text-ink-900 rounded-2xl shadow-2xl border border-paper-200 overflow-hidden">
            {navItems
              .filter((item) => item.items)
              .map((item) => {
                const isOpen = openMenu === item.label;
                return (
                  <div
                    key={item.label}
                    className={cn(
                      'grid transition-all duration-300 ease-out',
                      isOpen
                        ? 'grid-rows-[1fr] opacity-100'
                        : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="p-3 md:p-4">
                        {item.items!.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setOpenMenu(null)}
                            className="group flex items-start gap-3 px-4 py-3 rounded-xl hover:bg-paper-50 transition-colors"
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
                      <div className="bg-paper-50 px-6 py-4 border-t border-paper-200">
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
                );
              })}
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
              className={cn('h-9 w-auto', scrolled ? '' : 'brightness-0 invert')}
            />
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
          <a href="tel:+311****3824" className="flex items-center gap-3 font-mono text-sm">
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
        <ChevronDown className={cn('w-5 h-5 transition-transform duration-200', open && 'rotate-180')} />
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
              <span className={cn('font-mono text-xs mt-2', scrolled ? 'text-ink-400' : 'text-white/40')}>0{i + 1}</span>
              <div className="flex-1 min-w-0">
                <div className="text-base font-medium">{sub.label}</div>
                {sub.desc && (
                  <div className={cn('text-xs mt-0.5', scrolled ? 'text-ink-500' : 'text-white/60')}>{sub.desc}</div>
                )}
              </div>
              <ArrowRight className={cn('w-4 h-4 mt-2', scrolled ? 'text-ink-400' : 'text-white/40')} />
            </Link>
          ))}
          <Link
            href={item.label === 'Diensten' ? '/diensten' : '/over'}
            onClick={onClose}
            className={cn(
              'flex items-center justify-between mt-2 py-3 pl-2 rounded-lg font-medium transition-colors',
              scrolled ? 'text-blue-500 hover:bg-paper-100' : 'text-blue-300 hover:bg-white/5'
            )}
          >
            <span>{item.label === 'Diensten' ? 'Bekijk alle diensten' : 'Lees ons verhaal'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
