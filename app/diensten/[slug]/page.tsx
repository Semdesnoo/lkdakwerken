import { notFound } from "next/navigation";
import DienstDetail from "@/components/DienstDetail";
import { diensten } from "@/lib/data";

export const dynamicParams = false;

export async function generateStaticParams() {
  // bitumen-daken heeft een eigen, uitgebreide pagina onder app/diensten/bitumen-daken/
  return diensten.filter((d) => d.slug !== 'bitumen-daken').map((d) => ({ slug: d.slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dienst = diensten.find((d) => d.slug === slug);
  if (!dienst) notFound();
  return <DienstDetail dienst={dienst} />;
}
