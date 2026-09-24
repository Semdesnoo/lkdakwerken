import { Hero } from '@/components/Hero';
import { DienstenPaneel } from '@/components/DienstenPaneel';
import { OverOns } from '@/components/OverOns';
import { Process } from '@/components/Process';
import { ProjectenSlider } from '@/components/ProjectenSlider';
import { GoogleReviews } from '@/components/GoogleReviews';
import { Blog } from '@/components/Blog';
import { ContactCTA } from '@/components/ContactCTA';
import { SchuineOvergang } from '@/components/SchuineOvergang';
import type { Metadata } from 'next';

/**
 * De titel van de homepage wijkt bewust af van het sjabloon in layout.tsx:
 * hier hoort de bedrijfsnaam vooraan te staan, gevolgd door wat we doen en
 * waar. Dat is de regel die Google in de zoekresultaten toont, dus die blijft
 * onder de zestig tekens zodat hij niet wordt afgekapt.
 */
export const metadata: Metadata = {
  title: 'LK Dakwerken | Dakdekker Rotterdam en Zuid-Holland',
  description:
    'LK Dakwerken is uw dakdekker voor platte daken in Rotterdam en heel Zuid-Holland. Bitumen, renovatie, nieuwbouw, onderhoud en spoedhulp bij lekkage.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'LK Dakwerken | Dakdekker Rotterdam en Zuid-Holland',
    description:
      'Specialist in platte daken: bitumen, renovatie, nieuwbouw, onderhoud en lekkage. 10 jaar garantie.',
    url: '/',
  },
};

/**
 * Homepage als kleurblok-ritme: geen twee opeenvolgende secties delen
 * dezelfde achtergrond. De achtergrond per sectie staat in het commentaar.
 *
 * De blog sluit de pagina af, met de oproep tot actie er direct boven. Om te
 * voorkomen dat die donkere oproep tegen de donkere reviews aan komt te
 * liggen, staan over ons en de projecten ertussen.
 *
 * Het werkgebied met de kaart en de gemeentelijst staat op /locaties, niet
 * meer op de homepage.
 */
export default function Home() {
  return (
    <>
      <Hero />            {/* videohero met donkere gloed */}
      <DienstenPaneel />  {/* paper-50 met een wit paneel erin, dakvormige wig met zigzag geknipt uit de sectie zelf */}
      <SchuineOvergang kleur="#0a0a0a" hoek={-1.75} />
      <Process />         {/* donker ink met foto */}
      <SchuineOvergang kleur="#ffffff" hoek={1.75} />
      <OverOns />         {/* wit */}
      <SchuineOvergang kleur="#000000" hoek={-1.75} />
      <GoogleReviews />   {/* donker ink met raster en lijnen */}
      <SchuineOvergang kleur="#ffffff" hoek={1.75} />
      <ProjectenSlider /> {/* wit */}
      <SchuineOvergang kleur="#000000" hoek={-1.75} />
      <ContactCTA />      {/* donker ink */}
      <SchuineOvergang kleur="#fafafa" hoek={1.75} zigzag />
      <Blog />            {/* paper-50, sluit de pagina af boven de voettekst */}
    </>
  );
}
