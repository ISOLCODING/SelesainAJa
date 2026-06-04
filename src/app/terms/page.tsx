import { Metadata } from "next"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { PageHeader } from "@/components/layout/PageHeader"

export const metadata: Metadata = {
  title: "Syarat & Ketentuan | SelesainAja",
  description: "Syarat dan ketentuan penggunaan layanan SelesainAja.",
}

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <PageHeader 
          title="Syarat & Ketentuan" 
          description="Panduan dan aturan penggunaan layanan kami. Mohon dibaca dengan saksama."
        />
        <div className="container mx-auto px-6 py-16 max-w-4xl">
          <div className="prose prose-slate prose-lg max-w-none">
            <h3 className="text-xl font-bold text-slate-900 mb-4">1. Pendahuluan</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Dengan mengakses dan menggunakan layanan SelesainAja, Anda menyetujui untuk mematuhi semua syarat dan ketentuan yang tercantum pada halaman ini. Layanan ini ditujukan khusus untuk keperluan referensi dan bantuan akademik.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mb-4 mt-8">2. Penggunaan Layanan</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Hasil pengerjaan (output) yang diberikan oleh tim SelesainAja sebaiknya digunakan sebagai bahan referensi, literatur tambahan, atau panduan belajar. Kami tidak bertanggung jawab atas segala konsekuensi hukum maupun sanksi akademik yang ditimbulkan dari penyalahgunaan hak cipta oleh klien.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mb-4 mt-8">3. Proses Pembayaran</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Pemesanan tugas akan mulai diproses setelah kami menerima Down Payment (DP) sebesar 50% dari total biaya yang telah disepakati. Pelunasan sisa biaya wajib dilakukan sebelum kami mengirimkan dokumen *final* secara utuh.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mb-4 mt-8">4. Kebijakan Revisi</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Kami memberikan fasilitas garansi revisi secara gratis untuk periode waktu maksimal 7 (tujuh) hari terhitung sejak tanggal dokumen dikirimkan. Permintaan revisi yang berada di luar *brief* atau instruksi awal akan dikenakan biaya tambahan sesuai dengan porsinya.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mb-4 mt-8">5. Pembatalan</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Tugas yang sudah masuk proses pengerjaan (DP sudah dibayarkan) tidak dapat dibatalkan, dan uang DP tidak dapat ditarik kembali (*non-refundable*), kecuali terdapat kegagalan pengerjaan dari pihak tim SelesainAja.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
