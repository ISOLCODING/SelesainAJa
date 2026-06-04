import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { services } from "@/lib/constants";
import Link from "next/link";
import { RiArrowLeftLine, RiHomeLine, RiArrowRightSLine } from "react-icons/ri";
import ServiceDetailClient from "@/components/services/ServiceDetailClient";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find(s => s.href === `/services/${slug}`);
  
  if (!service) {
    return {
      title: "Layanan Tidak Ditemukan | SelesainAja",
    };
  }

  return {
    title: `${service.title} | Layanan SelesainAja`,
    description: service.fullDescription || service.description,
    openGraph: {
      title: `${service.title} | Layanan SelesainAja`,
      description: service.fullDescription || service.description,
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

  return (
    <>
      <Header />
      <main className="grow min-h-screen bg-[#FAF9F6] font-sans">
        <ServiceDetailClient slug={slug} serviceTitle={service.title} />
      </main>
      <Footer />
    </>
  );
}
