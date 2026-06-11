import { Metadata } from "next"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { PageHeader } from "@/components/layout/PageHeader"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Harga Layanan",
  description: "Lihat daftar harga jasa pengerjaan tugas akademik SelesainAja. Mulai dari Rp50.000, bebas plagiat, revisi gratis.",
}

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <PageHeader
          title="Harga Layanan"
          description="Informasi harga lengkap untuk setiap layanan pengerjaan tugas akademik."
          breadcrumbs={[
            { label: "Beranda", href: "/" },
            { label: "Harga" }
          ]}
        />
        <div className="container-custom py-20 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Segera Hadir</h2>
          <p className="text-slate-500 mb-8 max-w-lg mx-auto">
            Halaman harga sedang dalam pengembangan. Sementara itu, lihat daftar layanan yang kami sediakan.
          </p>
          <Link
            href="/services"
            className="px-6 py-3 bg-[#0066FF] text-white font-bold rounded-xl hover:bg-[#0052CC] transition-colors"
          >
            Lihat Layanan
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}