'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
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
      { href: '/projecten', label: 'Alle projecten', desc: 'Opgeleverde daken in de regio' },
    ],
  },
  { href: '/contact', label: 'Contact' },
];

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  /* De balk schuift omhoog uit beeld zodra je naar beneden scrollt, en komt
     terug zodra je omhoog scrollt. */
  const [verborgen, setVerborgen] = useState(false);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    let vorige = window.scrollY;
    let wachtOpFrame = false;

    const verwerk = () => {
      const huidige = window.scrollY;
      const verschil = huidige - vorige;

      /* Bovenaan altijd tonen, en kleine bewegingen negeren zodat de balk
         niet gaat knipperen bij een trillende muis of trackpad. */
      if (huidige < 120) {
        setVerborgen(false);
      } else if (Math.abs(verschil) > 6) {
        setVerborgen(verschil > 0);
      }

      vorige = huidige;
      wachtOpFrame = false;
    };

    const opScroll = () => {
      if (wachtOpFrame) return;
      wachtOpFrame = true;
      window.requestAnimationFrame(verwerk);
    };

    window.addEventListener('scroll', opScroll, { passive: true });
    return () => window.removeEventListener('scroll', opScroll);
  }, []);

  /* Een openstaand menu hoort niet mee omhoog te schuiven. */
  useEffect(() => {
    if (verborgen) setOpenMenu(null);
  }, [verborgen]);

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

  const isActive = (item: NavItem) => {
    if (item.href) return pathname === item.href;
    if (item.label === 'Diensten') return pathname.startsWith('/diensten');
    if (item.label === 'Over Ons') {
      return pathname.startsWith('/over') || pathname.startsWith('/projecten');
    }
    return false;
  };

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
      setOpenMenu(openMenu === item.label ? null : item.label);
    } else {
      setOpenMenu(null);
    }
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-4 md:top-6 left-1/2 z-50 w-[calc(100%-1.5rem)] md:w-[calc(100%-3rem)] max-w-7xl',
          'transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none',
          // -translate-x-1/2 houdt de balk gecentreerd; de tweede waarde
          // schuift hem verticaal uit beeld. Iets meer dan de eigen hoogte,
          // zodat ook de schaduw meegaat.
          verborgen ? '-translate-x-1/2 -translate-y-[150%]' : '-translate-x-1/2 translate-y-0'
        )}
      >
        <div className="flex items-center justify-between gap-4 md:gap-8 pl-4 pr-3 md:pl-6 md:pr-4 py-2.5 md:py-3 nav-floating text-ink-900">
          <Link href="/" aria-label="LK Dakwerken, naar de homepage" className="shrink-0">
            <img src="/lkdakwerken/logo.png" alt="LK Dakwerken" className="h-7 md:h-9 w-auto" />
          </Link>

          <nav aria-label="Hoofdmenu" className="hidden lg:flex items-center justify-center gap-1 flex-1">
            {navItems.map((item) => {
              const isOpen = openMenu === item.label;
              const active = isActive(item);
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
                        'group relative flex items-center gap-1.5 px-4 py-2 text-[15px] font-semibold transition-colors duration-200',
                        isOpen || active ? 'text-blue-500' : 'text-ink-900 hover:text-blue-500'
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        aria-hidden="true"
                        className={cn('w-4 h-4 transition-transform duration-300', isOpen && 'rotate-180')}
                      />
                      <span
                        aria-hidden="true"
                        className={cn(
                          'absolute bottom-0.5 left-4 right-4 h-0.5 rounded-full bg-blue-500 origin-center transition-transform duration-300',
                          isOpen || active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                        )}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href!}
                      className={cn(
                        'group relative inline-flex items-center px-4 py-2 text-[15px] font-semibold transition-colors duration-200',
                        active ? 'text-blue-500' : 'text-ink-900 hover:text-blue-500'
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          'absolute bottom-0.5 left-4 right-4 h-0.5 rounded-full bg-blue-500 origin-center transition-transform duration-300',
                          active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                        )}
                      />
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="lg:hidden flex-1" />

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="tel:+311****3824"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full text-ink-700 hover:bg-paper-100 hover:text-blue-500 transition-colors"
              aria-label="Bel ons: 010 - 271 38 24"
            >
              <Phone className="w-[1.05rem] h-[1.05rem]" aria-hidden="true" />
            </a>

            <Link
              href="/offerte"
              className="inline-flex items-center gap-2 px-4 md:pl-5 md:pr-4 py-2.5 text-sm font-semibold rounded-full bg-blue-500 text-white whitespace-nowrap transition-colors hover:bg-blue-600"
            >
              Offerte
              <ArrowRight className="hidden md:block w-3.5 h-3.5" aria-hidden="true" />
            </Link>

            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center hover:bg-paper-100 text-ink-700 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Dropdown-paneel */}
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
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="p-3">
                        {item.items!.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setOpenMenu(null)}
                            className="group flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-paper-50 transition-colors"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-ink-900 group-hover:text-blue-500 transition-colors">
                                {sub.label}
                              </div>
                              {sub.desc && <div className="text-sm text-ink-500 mt-0.5">{sub.desc}</div>}
                            </div>
                            <ArrowRight
                              aria-hidden="true"
                              className="w-4 h-4 text-blue-500 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0"
                            />
                          </Link>
                        ))}
                      </div>
                      <div className="bg-paper-50 px-6 py-4 border-t border-paper-200">
                        <Link
                          href={item.label === 'Diensten' ? '/diensten' : '/over'}
                          onClick={() => setOpenMenu(null)}
                          className="flex items-center justify-between text-sm font-semibold text-blue-500 hover:text-blue-600 transition-colors group"
                        >
                          <span>
                            {item.label === 'Diensten' ? 'Bekijk alle diensten' : 'Lees ons verhaal'}
                          </span>
                          <ArrowRight
                            aria-hidden="true"
                            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </header>

      {/* Mobiele lade */}
      <div
        className={cn(
          'fixed inset-0 z-[60] lg:hidden flex flex-col transition-transform duration-300 bg-white text-ink-900',
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="px-6 py-5 flex items-center justify-between border-b border-paper-200">
          <Link href="/" onClick={() => setMobileOpen(false)} aria-label="LK Dakwerken">
            <img src="/lkdakwerken/logo.png" alt="LK Dakwerken" className="h-9 w-auto" />
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-paper-100"
            aria-label="Sluit menu"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Mobiel menu" className="flex-1 overflow-y-auto flex flex-col px-6 py-2">
          {navItems.map((item) => (
            <MobileNavSection key={item.label} item={item} onClose={() => setMobileOpen(false)} />
          ))}
        </nav>

        <div className="px-6 py-6 border-t border-paper-200 space-y-3">
          <a href="tel:+311****3824" className="flex items-center gap-3 font-medium">
            <Phone className="w-4 h-4 text-blue-500" aria-hidden="true" />
            <span>010 - 271 38 24</span>
          </a>
          <Link
            href="/offerte"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-3.5 font-semibold transition-colors rounded-full"
          >
            Offerte aanvragen
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </>
  );
}

function MobileNavSection({ item, onClose }: { item: NavItem; onClose: () => void }) {
  const [open, setOpen] = useState(false);

  if (!item.items) {
    return (
      <Link
        href={item.href!}
        onClick={onClose}
        className="flex items-center justify-between py-5 text-2xl font-display font-bold tracking-tight border-b border-paper-200"
      >
        <span>{item.label}</span>
        <ArrowRight className="w-5 h-5 text-blue-500" aria-hidden="true" />
      </Link>
    );
  }

  return (
    <div className="border-b border-paper-200">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex items-center justify-between w-full py-5 text-2xl font-display font-bold tracking-tight"
      >
        <span>{item.label}</span>
        <ChevronDown
          aria-hidden="true"
          className={cn('w-5 h-5 transition-transform duration-200', open && 'rotate-180')}
        />
      </button>
      <div className={cn('overflow-hidden transition-all duration-300', open ? 'max-h-[600px] pb-4' : 'max-h-0')}>
        <div className="space-y-1">
          {item.items.map((sub) => (
            <Link
              key={sub.href}
              href={sub.href}
              onClick={onClose}
              className="flex items-center gap-3 py-3 px-3 rounded-2xl hover:bg-paper-100 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="text-base font-semibold">{sub.label}</div>
                {sub.desc && <div className="text-sm mt-0.5 text-ink-500">{sub.desc}</div>}
              </div>
              <ArrowRight className="w-4 h-4 text-ink-400 shrink-0" aria-hidden="true" />
            </Link>
          ))}
          <Link
            href={item.label === 'Diensten' ? '/diensten' : '/over'}
            onClick={onClose}
            className="flex items-center justify-between mt-1 py-3 px-3 rounded-2xl font-semibold text-blue-500 hover:bg-paper-100 transition-colors"
          >
            <span>{item.label === 'Diensten' ? 'Bekijk alle diensten' : 'Lees ons verhaal'}</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
