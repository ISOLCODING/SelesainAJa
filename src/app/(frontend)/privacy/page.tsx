import { Metadata } from "next"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { PageHeader } from "@/components/layout/PageHeader"

export const metadata: Metadata = {
  title: "Kebijakan Privasi | SelesainAja",
  description: "Kebijakan privasi dan perlindungan data klien SelesainAja.",
}

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <PageHeader 
          title="Kebijakan Privasi" 
          description="Komitmen kami dalam melindungi data dan kerahasiaan identitas Anda."
        />
        <div className="container mx-auto px-6 py-16 max-w-4xl">
          <div className="prose prose-slate prose-lg max-w-none">
            <h3 className="text-xl font-bold text-slate-900 mb-4">1. Kerahasiaan Identitas</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Kami menjamin kerahasiaan identitas (nama, asal kampus, nomor HP, email) seluruh klien SelesainAja. Informasi pribadi Anda tidak akan pernah kami publikasikan, bagikan, atau jual kepada pihak ketiga dengan alasan apa pun.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mb-4 mt-8">2. Pengumpulan Data</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Data yang kami kumpulkan saat Anda berinteraksi dengan kami hanya digunakan untuk keperluan komunikasi (WhatsApp/Email), penagihan pembayaran (Invoice), dan distribusi hasil pengerjaan (Document Delivery).
            </p>

            <h3 className="text-xl font-bold text-slate-900 mb-4 mt-8">3. Keamanan File & Tugas</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Seluruh file tugas, data mentah (raw data), dan bahan penelitian yang Anda serahkan akan disimpan dengan aman. File tersebut akan kami hapus secara permanen dari server dan database kami selambat-lambatnya 30 (tiga puluh) hari setelah status *project* dinyatakan selesai.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mb-4 mt-8">4. Privasi Penulis (Writer)</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Demi menjaga profesionalisme, kami mengatur dan membatasi komunikasi langsung antara klien dengan tim *writer/author*. Segala proses tanya-jawab, revisi, dan *briefing* hanya dilakukan melalui kanal Admin/Customer Service yang tersentralisasi.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
