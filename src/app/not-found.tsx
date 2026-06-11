import Link from "next/link"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import JsonLd from "@/components/seo/JsonLd"
import { getBreadcrumbSchema } from "@/lib/seo/structured-data"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Halaman Tidak Ditemukan (404)",
  description: "Halaman yang Anda cari tidak ditemukan. Kembali ke beranda SelesainAja — jasa pengerjaan tugas profesional & terpercaya.",
  robots: { index: false, follow: true },
}

export default function NotFound() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Beranda", url: "https://selesainaja.vercel.app" },
    { name: "404 - Halaman Tidak Ditemukan" },
  ])

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <Header />
      <main className="grow pt-32 pb-20 bg-white min-h-[70vh] flex items-center justify-center">
        <div className="text-center max-w-lg mx-auto px-4">
          <h1 className="text-8xl font-black text-[#0066FF] mb-4">404</h1>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Halaman Tidak Ditemukan</h2>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan. 
            Silakan kembali ke beranda atau jelajahi layanan kami.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-3 bg-[#0066FF] text-white font-bold rounded-xl hover:bg-[#0052CC] transition-colors"
            >
              Kembali ke Beranda
            </Link>
            <Link
              href="/services"
              className="px-8 py-3 bg-slate-100 text-slate-900 font-bold rounded-xl hover:bg-slate-200 transition-colors"
            >
              Lihat Layanan
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}