import { Hero } from '@/components/Hero';
import { Diensten } from '@/components/Diensten';
import { OverOns } from '@/components/OverOns';
import { Process } from '@/components/Process';
import { Reviews } from '@/components/Reviews';
import { Locaties } from '@/components/Locaties';
import { Blog } from '@/components/Blog';
import { ContactCTA } from '@/components/ContactCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <Diensten />
      <OverOns />
      <Process />
      <Reviews />
      <Blog />
      <Locaties />
      <ContactCTA />
    </>
  );
}
