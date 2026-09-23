# LK Dakwerken

Professionele website voor LK Dakwerken, een Rotterdams dakdekkersbedrijf gespecialiseerd in bitumen, renovatie, nieuwbouw, onderhoud en lekkage. Werkzaam in heel Zuid-Holland.

## Tech stack

- **Framework**: Next.js 16 (App Router) + React 19
- **Styling**: Tailwind CSS v4 met custom thema (blauw + zwart + wit + grijs)
- **Typography**: Inter (body + display) + Montserrat (display alternatief)
- **Animaties**: framer-motion met respect voor `prefers-reduced-motion`
- **Icons**: lucide-react + custom SVG iconen in `components/DakIconen.tsx`

## Features

- 13+ unieke pagina's (home, 5 diensten detail, over ons, blog, 48 locaties, contact, offerte)
- Multi-step offerte wizard (3 stappen + success state)
- 50 Zuid-Holland locaties voor SEO landing pages
- 6 blog artikelen
- JSON-LD structured data (RoofingContractor schema)
- Sitemap.xml + robots.txt
- Floating navigation met blur effect
- Rounded panels, pill-buttons met arrow-cubes
- Volledig responsive (mobile-first)

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Project structuur

```
app/
  page.tsx              # Homepage
  diensten/             # Diensten overzicht + 5 detail pagina's
  over/                 # Over ons
  blog/                 # Blog index + 6 artikelen
  locaties/             # 48 Zuid-Holland locaties
  contact/              # Contact
  offerte/              # Offerte formulier (multi-step wizard)
  globals.css           # Custom CSS + Tailwind v4 @theme
  layout.tsx            # Root layout + fonts + JSON-LD
  sitemap.ts            # Dynamische sitemap
  robots.ts             # Robots.txt

components/
  Hero.tsx              # Hero met full-width background + 3 service cards
  Navigation.tsx        # Floating nav panel
  Footer.tsx            # Donker panel met contact info
  Diensten.tsx          # Diensten lijst in panel
  OverOns.tsx           # Stats panel met foto achtergrond
  Reviews.tsx           # Reviews carousel-stijl grid
  Blog.tsx              # Blog cards
  Locaties.tsx          # Locaties per regio
  Process.tsx           # Werkwijze in 4 stappen
  ContactCTA.tsx        # Oranje-blauwe CTA met contact cards
  DienstDetail.tsx      # Herbruikbare component voor 5 diensten
  OfferteFormulier.tsx  # Multi-step wizard
  DakIconen.tsx         # Custom SVG iconen
  ScrollReveal.tsx      # Scroll animaties

lib/
  data.ts               # 50 locaties, 5 diensten, blog posts, reviews, FAQ
  utils.ts              # cn helper
```

## Design keuzes

- **Palet**: puur blauw (#2563eb) + zwart + wit + grijzen, geen oranje
- **Vormgeving**: zachte roundingen (rounded-2xl / 3xl), pill-buttons met arrow-cubes
- **Floating panels**: nav en cards zweven boven de content met shadow en blur
- **Custom SVG iconen**: daklijn, dakpan, hamer, waterdruppel etc als decoratieve patronen

## SEO

- Metadata per pagina met title, description, canonical
- OpenGraph tags voor social sharing
- JSON-LD RoofingContractor schema
- Sitemap met alle URLs (homepage + 5 diensten + over + blog + locaties + 48 locaties)
- Robots.txt met disallow voor /api/
- Semantische HTML met goede heading hiërarchie

## License

Proprietary - LK Dakwerken
