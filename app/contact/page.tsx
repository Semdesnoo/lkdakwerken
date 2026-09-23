import type { Metadata } from 'next';
import { Phone, Mail, MapPin, MessageSquare, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact - Bel, mail of stuur een WhatsApp',
  description: 'Neem contact op met LK Dakwerken. Bel 06 12 34 56 78 of stuur een WhatsApp.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <>
      <section className="pt-28 pb-12 md:pt-32 md:pb-20 border-b border-[var(--border)]">
        <div className="container-wide">
          <div className="max-w-3xl">
            <div className="eyebrow mb-6">Contact</div>
            <h1 className="text-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-[-0.04em] text-balance">
              Laten we
              <br />
              <span className="text-[var(--accent)]">kennismaken.</span>
            </h1>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-px bg-[var(--border)]">
            {[
              { icon: Phone, label: 'Bel ons', waarde: '06 12 34 56 78', sub: '7 dagen, 07:00 - 21:00', href: 'tel:+31612345678' },
              { icon: MessageSquare, label: 'WhatsApp', waarde: '06 12 34 56 78', sub: 'Reactie binnen 1 uur', href: 'https://wa.me/31612345678' },
              { icon: Mail, label: 'Mail ons', waarde: 'info@lkdakwerken.nl', sub: 'Binnen 24 uur', href: 'mailto:info@lkdakwerken.nl' },
              { icon: MapPin, label: 'Bezoek ons', waarde: 'Bedrijvenpark 12', sub: '3000 AB Rotterdam', href: '#' },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <a key={c.label} href={c.href} className="bg-[var(--background)] p-6 hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors flex items-start gap-4 group">
                  <Icon className="w-5 h-5 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="text-[11px] font-mono uppercase tracking-[0.15em] opacity-60">{c.label}</div>
                    <div className="text-display text-lg tracking-tight mt-1">{c.waarde}</div>
                    <div className="text-xs opacity-60 mt-1 flex items-center gap-1.5"><Clock className="w-3 h-3" /> {c.sub}</div>
                  </div>
                </a>
              );
            })}
          </div>

          <div className="lg:col-span-7">
            <div className="aspect-[4/3] bg-[var(--foreground)] overflow-hidden">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=4.3777%2C51.8744%2C4.5777%2C51.9744&layer=mapnik"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(0.9) hue-rotate(180deg)' }}
                title="LK Dakwerken locatie"
                loading="lazy"
              />
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)]">
              <div className="bg-[var(--background)] p-5">
                <div className="text-[11px] font-mono uppercase tracking-[0.15em] text-[var(--muted)] mb-2">Openingstijden</div>
                <div className="text-sm space-y-0.5">
                  <div>Ma-Vr: 07:30-17:30</div>
                  <div>Za: 09:00-13:00</div>
                  <div className="text-[var(--accent)]">Zo: alleen spoed</div>
                </div>
              </div>
              <div className="bg-[var(--background)] p-5">
                <div className="text-[11px] font-mono uppercase tracking-[0.15em] text-[var(--muted)] mb-2">KVK</div>
                <div className="font-mono text-sm">12345678</div>
              </div>
              <div className="bg-[var(--background)] p-5">
                <div className="text-[11px] font-mono uppercase tracking-[0.15em] text-[var(--muted)] mb-2">Certificering</div>
                <div className="text-sm">Dakmerk Erkend</div>
                <div className="text-sm">VCA-gecertificeerd</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
