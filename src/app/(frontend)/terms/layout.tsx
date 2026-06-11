import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Syarat & Ketentuan",
  description: "Syarat dan ketentuan penggunaan layanan SelesainAja. Baca panduan lengkap tentang kebijakan pembayaran, revisi, dan pembatalan.",
  openGraph: {
    title: "Syarat & Ketentuan — SelesainAja",
    description: "Syarat dan ketentuan penggunaan layanan SelesainAja. Baca panduan lengkap tentang kebijakan pembayaran, revisi, dan pembatalan.",
    url: "https://selesainaja.vercel.app/terms",
    siteName: "SelesainAja",
    locale: "id_ID",
    type: "website",
  },
  keywords: ["syarat ketentuan selesainaja", "kebijakan pembayaran", "garansi revisi", "pembatalan pesanan"],
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children
}