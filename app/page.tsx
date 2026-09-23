import { Hero } from '@/components/Hero';
import { DienstenPaneel } from '@/components/DienstenPaneel';
import { OverOns } from '@/components/OverOns';
import { Process } from '@/components/Process';
import { ProjectenSlider } from '@/components/ProjectenSlider';
import { GoogleReviews } from '@/components/GoogleReviews';
import { Blog } from '@/components/Blog';
import { Locaties } from '@/components/Locaties';
import { ContactCTA } from '@/components/ContactCTA';
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
    'LK Dakwerken is uw dakdekker voor platte daken in Rotterdam en heel Zuid-Holland. Bitumen, renovatie, nieuwbouw, onderhoud en spoedhulp bij lekkage. Dakmerk erkend.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'LK Dakwerken | Dakdekker Rotterdam en Zuid-Holland',
    description:
      'Specialist in platte daken: bitumen, renovatie, nieuwbouw, onderhoud en lekkage. Dakmerk erkend, 10 jaar garantie.',
    url: '/',
  },
};

/**
 * Homepage als kleurblok-ritme: geen twee opeenvolgende secties delen
 * dezelfde achtergrond. De achtergrond per sectie staat in het commentaar.
 */
export default function Home() {
  return (
    <>
      <Hero />            {/* donkere fotohero, daaronder een witte strook */}
      <DienstenPaneel />  {/* paper-50 met een donker ink-paneel erin */}
      <OverOns />         {/* wit */}
      <Process />         {/* donker ink met foto */}
      <ProjectenSlider /> {/* wit */}
      <GoogleReviews />   {/* donker ink met raster en lijnen */}
      <Blog />            {/* paper-50 */}
      <Locaties />        {/* wit */}
      <ContactCTA />      {/* donker ink */}
    </>
  );
}
