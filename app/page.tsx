import { Hero } from '@/components/Hero';
import { DienstenPaneel } from '@/components/DienstenPaneel';
import { OverOns } from '@/components/OverOns';
import { Process } from '@/components/Process';
import { ProjectenSlider } from '@/components/ProjectenSlider';
import { GoogleReviews } from '@/components/GoogleReviews';
import { Blog } from '@/components/Blog';
import { Locaties } from '@/components/Locaties';
import { ContactCTA } from '@/components/ContactCTA';

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
