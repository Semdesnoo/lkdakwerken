import { notFound } from "next/navigation";
import DienstDetail from "@/components/DienstDetail";
import { diensten } from "@/lib/data";

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dienst = diensten.find((d) => d.slug === slug);
  if (!dienst) notFound();
  return <DienstDetail dienst={dienst} />;
}
