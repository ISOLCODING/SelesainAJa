import { Metadata } from "next"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { PageHeader } from "@/components/layout/PageHeader"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Portofolio",
  description: "Lihat portofolio hasil pengerjaan tugas akademik oleh tim profesional SelesainAja.",
}

export default function PortfolioPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <PageHeader
          title="Portofolio"
          description="Kumpulan hasil pengerjaan tugas akademik terbaik dari tim profesional kami."
          breadcrumbs={[
            { label: "Beranda", href: "/" },
            { label: "Portofolio" }
          ]}
        />
        <div className="container-custom py-20 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Segera Hadir</h2>
          <p className="text-slate-500 mb-8 max-w-lg mx-auto">
            Halaman portofolio sedang dalam pengembangan. Sementara itu, lihat testimoni dari klien kami.
          </p>
          <Link
            href="/testimonials"
            className="px-6 py-3 bg-[#0066FF] text-white font-bold rounded-xl hover:bg-[#0052CC] transition-colors"
          >
            Lihat Testimoni
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}