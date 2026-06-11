import { Metadata } from "next"
import { LoginForm } from "@/components/auth/LoginForm"
import Link from "next/link"
import { RiArrowLeftLine } from "react-icons/ri"

export const metadata: Metadata = {
  title: "Masuk — Jasa Pengerjaan Tugas",
  description: "Masuk ke akun SelesainAja untuk mengelola pesanan Anda.",
  robots: { index: false, follow: false },
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* LEFT PANEL - BRANDING (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-[45%] bg-primary relative flex-col justify-between p-12 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-white/10 rounded-full blur-[80px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-secondary/20 rounded-full blur-[80px]"></div>
        
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white font-medium transition-colors bg-white/10 px-5 py-2.5 rounded-full backdrop-blur-md border border-white/10 hover:bg-white/20">
            <RiArrowLeftLine className="text-xl" />
            Kembali ke Beranda
          </Link>
        </div>

        <div className="relative z-10 max-w-lg mt-20">
          <h2 className="text-5xl lg:text-[4rem] font-black font-jakarta text-white leading-[1.1] mb-6 tracking-tight">
            Dashboard<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300">
              Masa Depan.
            </span>
          </h2>
          <p className="text-xl text-white/80 font-medium leading-relaxed">
            Kelola seluruh tugas akademik Anda dalam satu tempat dengan sistem cerdas yang dirancang khusus untuk produktivitas.
          </p>
        </div>

        <div className="relative z-10 text-white/60 text-sm font-medium">
          &copy; {new Date().getFullYear()} SelesainAja. Hak Cipta Dilindungi.
        </div>
      </div>

      {/* RIGHT PANEL - FORM */}
      <div className="w-full lg:w-[55%] flex flex-col relative items-center justify-center p-6 sm:p-12 bg-white lg:bg-slate-50/50">
        {/* Mobile Home Button */}
        <div className="absolute top-6 left-6 lg:hidden z-20">
          <Link href="/" className="inline-flex items-center justify-center w-10 h-10 text-slate-500 hover:text-primary font-medium transition-colors bg-white rounded-full shadow-md border border-slate-100">
            <RiArrowLeftLine className="text-xl" />
          </Link>
        </div>
        
        <div className="w-full py-8">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
