import { notFound } from "next/navigation";
import DienstDetail from "@/components/DienstDetail";
import { diensten } from "@/lib/data";

export const dynamicParams = false;

export async function generateStaticParams() {
  // bitumen-daken en renovatie hebben eigen, uitgebreide pagina's
  return diensten.filter((d) => !['bitumen-daken', 'renovatie'].includes(d.slug)).map((d) => ({ slug: d.slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dienst = diensten.find((d) => d.slug === slug);
  if (!dienst) notFound();
  return <DienstDetail dienst={dienst} />;
}
