import { Metadata } from "next"
import { RegisterForm } from "@/components/auth/RegisterForm"
import Link from "next/link"
import { RiArrowLeftLine, RiCheckLine } from "react-icons/ri"

export const metadata: Metadata = {
  title: "Daftar — SelesainAja | Jasa Pengerjaan Tugas",
  description: "Daftar akun SelesainAja gratis. Kelola semua pesanan tugas Anda dengan mudah.",
  robots: { index: false, follow: false },
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* LEFT PANEL - BRANDING (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-[45%] bg-slate-900 relative flex-col justify-between p-12 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-primary/20 rounded-full blur-[80px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-emerald-500/10 rounded-full blur-[80px]"></div>
        
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white font-medium transition-colors bg-white/5 px-5 py-2.5 rounded-full backdrop-blur-md border border-white/10 hover:bg-white/10">
            <RiArrowLeftLine className="text-xl" />
            Kembali ke Beranda
          </Link>
        </div>

        <div className="relative z-10 max-w-lg">
          <h2 className="text-4xl lg:text-5xl font-black font-jakarta text-white leading-[1.2] mb-10 tracking-tight">
            Bergabung dengan <br />
            <span className="text-primary">Ribuan Mahasiswa</span> <br />
            Lainnya.
          </h2>
          
          <div className="space-y-6">
            {[
              "Lacak status tugas secara real-time",
              "Sistem notifikasi progres otomatis",
              "Manajemen pembayaran yang mudah",
              "Akses prioritas untuk tugas mendesak"
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-5 group">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all duration-300">
                  <RiCheckLine className="text-emerald-400 text-xl" />
                </div>
                <p className="text-white/80 font-medium text-lg group-hover:text-white transition-colors">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-white/60 text-sm font-medium">
          &copy; {new Date().getFullYear()} SelesainAja. Hak Cipta Dilindungi.
        </div>
      </div>

      {/* RIGHT PANEL - FORM */}
      <div className="w-full lg:w-[55%] flex flex-col relative items-center justify-center p-6 sm:p-12 bg-white lg:bg-slate-50/50 min-h-screen overflow-y-auto">
        {/* Mobile Home Button */}
        <div className="absolute top-6 left-6 lg:hidden z-20">
          <Link href="/" className="inline-flex items-center justify-center w-10 h-10 text-slate-500 hover:text-primary font-medium transition-colors bg-white rounded-full shadow-md border border-slate-100">
            <RiArrowLeftLine className="text-xl" />
          </Link>
        </div>
        
        <div className="w-full py-8">
          <RegisterForm />
        </div>
      </div>
    </div>
  )
}
