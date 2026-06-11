import { Metadata } from "next"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { PageHeader } from "@/components/layout/PageHeader"

export const metadata: Metadata = {
  title: "Karir",
  description: "Bergabunglah menjadi bagian dari tim ahli penulis dan akademisi SelesainAja. Open Recruitment Freelance Academic Writer.",
  openGraph: {
    title: "Karir — SelesainAja",
    description: "Bergabunglah menjadi bagian dari tim ahli penulis dan akademisi SelesainAja. Open Recruitment Freelance Academic Writer.",
    url: "https://selesainaja.vercel.app/careers",
    siteName: "SelesainAja",
    locale: "id_ID",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Karir — SelesainAja",
    description: "Bergabunglah menjadi bagian dari tim ahli penulis dan akademisi SelesainAja.",
    images: ["/og-image.jpg"],
  },
  keywords: ["karir selesainaja", "lowongan penulis lepas", "freelance academic writer", "rekrutmen penulis"],
}

export default function CareersPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <PageHeader 
          title="Berkarir di SelesainAja" 
          description="Bergabung dengan tim penulis lepas dan ahli akademik terbaik di Indonesia."
        />
        <div className="container mx-auto px-6 py-16 max-w-4xl">
          <div className="prose prose-slate prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Open Recruitment Freelance Writer</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Kami selalu mencari talenta muda dan akademisi berpengalaman untuk bergabung sebagai *Freelance Academic Writer*. Jika Anda memiliki hobi menulis, riset mendalam, dan memahami standar penulisan karya tulis ilmiah, ini adalah kesempatan yang tepat untuk mendapatkan penghasilan tambahan yang fleksibel!
            </p>

            <h3 className="text-xl font-bold text-slate-900 mb-4 mt-12">Kualifikasi Umum:</h3>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-8">
              <li>Mahasiswa tingkat akhir (skripsi) atau lulusan S1/S2 dari PTN/PTS terkemuka.</li>
              <li>Memiliki IPK minimal 3.25 (dibuktikan dengan transkrip nilai).</li>
              <li>Mampu menggunakan software manajemen referensi (Mendeley, Zotero).</li>
              <li>Disiplin terhadap *deadline* dan memiliki integritas (anti-plagiasi).</li>
              <li>Memiliki laptop/PC pribadi dan koneksi internet yang stabil.</li>
            </ul>

            <h3 className="text-xl font-bold text-slate-900 mb-4 mt-12">Cara Melamar:</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Kirimkan CV terbaru, transkrip nilai, dan minimal 2 (dua) portofolio tulisan (makalah/paper/artikel yang pernah Anda buat secara mandiri) ke email kami:
            </p>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 inline-block">
              <p className="font-semibold text-slate-900 mb-1">Email: <a href="mailto:recruitment@selesainaja.vercel.app" className="text-[#0066FF] hover:underline">recruitment@selesainaja.vercel.app</a></p>
              <p className="text-slate-600 text-sm">Subjek: Nama Lengkap - Jurusan - Posisi (Contoh: Budi Santoso - Ilmu Hukum - Freelance Writer)</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
