import { Metadata } from "next"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { PageHeader } from "@/components/layout/PageHeader"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Masuk — SelesainAja | Jasa Pengerjaan Tugas",
  description:
    "Masuk ke akun SelesainAja untuk melihat status order, riwayat pembayaran, dan download hasil tugas Anda.",
  robots: { index: false, follow: false },
}

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <PageHeader 
          title="Masuk ke Akun Anda" 
          description="Akses dashboard Anda untuk melacak status pengerjaan tugas."
        />
        <div className="container mx-auto px-6 py-20 text-center max-w-lg">
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Portal Sedang Dalam Pengembangan</h2>
            <p className="text-slate-600 mb-8">
              Fitur login klien saat ini masih dalam tahap penyempurnaan. Silakan hubungi admin kami melalui WhatsApp untuk informasi status pesanan Anda.
            </p>
            <a href="https://wa.me/6281112345678" target="_blank" rel="noopener noreferrer" className={buttonVariants({ size: "lg", className: "w-full bg-[#0066FF] hover:bg-[#0052CC] text-white" })}>
              Hubungi Admin via WhatsApp
            </a>
            <p className="mt-6 text-sm text-slate-500">
              Belum punya akun? <Link href="/register" className="text-[#0066FF] hover:underline font-medium">Daftar sekarang</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
