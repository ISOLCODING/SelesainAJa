import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { RiArrowLeftLine } from "react-icons/ri";
import ServiceDetailClient from "@/components/frontend/services/ServiceDetailClient";
import JsonLd from "@/components/seo/JsonLd";
import { getServiceSchema, getBreadcrumbSchema } from "@/lib/seo/structured-data";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = await prisma.service.findUnique({
    where: { slug }
  });

  if (!service) {
    return { title: "Layanan Tidak Ditemukan" };
  }

  const priceStr = service.priceDisplay || "Mulai Rp 50.000";
  const priceShort = priceStr.replace("Mulai Rp ", "").replace(".000", "K");
  const title = `Jasa ${service.name} Profesional Mulai ${priceShort}`;
  const description = `Butuh jasa ${service.name.toLowerCase()}? Dikerjakan oleh tim profesional lulusan S2/S3.  Bebas plagiat (Turnitin)  Revisi gratis  ${service.deliveryTime ?? "1-3 hari"}  Format lengkap. Harga ${priceStr}. Pesan sekarang!`;
  const canonicalUrl = `https://selesainaja.vercel.app/services/${slug}`;

  return {
    title,
    description,
    keywords: [
      `jasa ${service.name.toLowerCase()}`,
      `harga jasa ${service.name.toLowerCase()}`,
      `jasa ${service.name.toLowerCase()} online`,
      `jasa ${service.name.toLowerCase()} terpercaya`,
      "jasa pengerjaan tugas",
      "joki tugas terpercaya",
    ],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `Jasa ${service.name} Profesional | SelesainAja`,
      description: `Jasa ${service.name.toLowerCase()} berkualitas oleh tim profesional. Bebas plagiat, revisi gratis, harga ${priceStr}.`,
      url: canonicalUrl,
      images: [{ url: `/og/services/${slug}.jpg`, width: 1200, height: 630, alt: `Jasa ${service.name} - SelesainAja` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `Jasa ${service.name} Profesional | SelesainAja`,
      description: `Jasa ${service.name.toLowerCase()} oleh tim profesional. Bebas plagiat, revisi gratis. ${priceStr}.`,
    },
  };
}


export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await prisma.service.findUnique({
    where: { slug }
  });

  if (!service) {
    return (
      <>
        <Header />
        <main className="grow pt-32 pb-20 bg-[#FAF9F6] min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-black text-slate-900 mb-6 uppercase tracking-widest">Layanan Tidak Ditemukan</h1>
            <Link href="/services" className="text-primary font-bold hover:underline flex items-center justify-center gap-2">
              <RiArrowLeftLine /> Kembali ke Daftar Layanan
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const serviceSchema = getServiceSchema({
    slug,
    name: service.name,
    description: `Layanan profesional untuk ${service.name}`
  });
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Layanan", url: "https://selesainaja.vercel.app/services" },
    { name: service.name, url: `https://selesainaja.vercel.app/services/${slug}` }
  ]);

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />
      <Header />
      <main className="grow min-h-screen bg-[#FAF9F6] font-sans">
        <ServiceDetailClient service={service} />
      </main>
      <Footer />
    </>
  );
}
