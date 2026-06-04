import { Metadata } from "next"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { PageHeader } from "@/components/layout/PageHeader"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Daftar — SelesainAja | Jasa Pengerjaan Tugas",
  description:
    "Daftar akun SelesainAja gratis. Dapatkan akses ke semua layanan jasa pengerjaan tugas: makalah, presentasi, jurnal, essay.",
  robots: { index: false, follow: false },
}

export default function RegisterPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <PageHeader 
          title="Daftar Akun Baru" 
          description="Bergabunglah dengan ribuan mahasiswa lainnya yang telah mempercayakan tugasnya kepada SelesainAja."
        />
        <div className="container mx-auto px-6 py-20 text-center max-w-lg">
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Pendaftaran Segera Hadir</h2>
            <p className="text-slate-600 mb-8">
              Fitur registrasi mandiri sedang dalam tahap penyempurnaan. Saat ini, pemesanan dapat dilakukan secara langsung melalui WhatsApp kami dengan proses yang sama cepatnya!
            </p>
            <a href="https://wa.me/6281112345678" target="_blank" rel="noopener noreferrer" className={buttonVariants({ size: "lg", className: "w-full bg-[#0066FF] hover:bg-[#0052CC] text-white" })}>
              Pesan Langsung via WhatsApp
            </a>
            <p className="mt-6 text-sm text-slate-500">
              Sudah punya akun? <Link href="/login" className="text-[#0066FF] hover:underline font-medium">Masuk di sini</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
