import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { services } from "@/lib/constants";
import Link from "next/link";
import { RiArrowLeftLine } from "react-icons/ri";
import ServiceDetailClient from "@/components/frontend/services/ServiceDetailClient";
import JsonLd from "@/components/seo/JsonLd";
import { getServiceSchema, getBreadcrumbSchema } from "@/lib/seo/structured-data";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find(s => s.href === `/services/${slug}`);

  if (!service) {
    return { title: "Layanan Tidak Ditemukan" };
  }

  const priceShort = service.price.replace("Mulai Rp ", "").replace(".000", "K");
  const title = `Jasa ${service.title} Profesional ⭐ Mulai ${priceShort}`;
  const description = `Butuh jasa ${service.title.toLowerCase()}? Dikerjakan oleh tim profesional lulusan S2/S3. ✓ Bebas plagiat (Turnitin) ✓ Revisi gratis ✓ ${service.deliveryTime ?? "1-3 hari"} ✓ Format lengkap. Harga ${service.price}. Pesan sekarang!`;
  const canonicalUrl = `https://selesainaja.com${service.href}`;

  return {
    title,
    description,
    keywords: [
      `jasa ${service.title.toLowerCase()}`,
      `harga jasa ${service.title.toLowerCase()}`,
      `jasa ${service.title.toLowerCase()} online`,
      `jasa ${service.title.toLowerCase()} terpercaya`,
      "jasa pengerjaan tugas",
      "joki tugas terpercaya",
    ],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `Jasa ${service.title} Profesional | SelesainAja`,
      description: `Jasa ${service.title.toLowerCase()} berkualitas oleh tim profesional. Bebas plagiat, revisi gratis, harga ${service.price}.`,
      url: canonicalUrl,
      images: [{ url: `/og/services/${slug}.jpg`, width: 1200, height: 630, alt: `Jasa ${service.title} - SelesainAja` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `Jasa ${service.title} Profesional | SelesainAja`,
      description: `Jasa ${service.title.toLowerCase()} oleh tim profesional. Bebas plagiat, revisi gratis. ${service.price}.`,
    },
  };
}


export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find(s => s.href === `/services/${slug}`);

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
    name: service.title,
    description: `Layanan profesional untuk ${service.title}`
  });
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Layanan", url: "https://selesainaja.com/services" },
    { name: service.title, url: `https://selesainaja.com/services/${slug}` }
  ]);

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />
      <Header />
      <main className="grow min-h-screen bg-[#FAF9F6] font-sans">
        <ServiceDetailClient slug={slug} serviceTitle={service.title} />
      </main>
      <Footer />
    </>
  );
}
