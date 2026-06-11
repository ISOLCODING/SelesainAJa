import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: "Platform terpercaya yang hadir untuk membantu mahasiswa mengatasi kesulitan dalam penyelesaian tugas akademik sejak 2021. 5000+ tugas selesai, 1200+ klien puas.",
  openGraph: {
    title: "Tentang SelesainAja — Jasa Pengerjaan Tugas Profesional",
    description: "Platform jasa pengerjaan tugas akademik #1 di Indonesia. 5000+ tugas selesai, 1200+ klien puas. Dikerjakan oleh tim profesional lulusan S2/S3.",
    url: "https://selesainaja.vercel.app/about",
    siteName: "SelesainAja",
    locale: "id_ID",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tentang SelesainAja — Jasa Pengerjaan Tugas Profesional",
    description: "5000+ tugas selesai, 1200+ klien puas. Dikerjakan oleh tim profesional.",
    images: ["/og-image.jpg"],
  },
  keywords: ["tentang selesainaja", "jasa pengerjaan tugas profesional", "tim ahli akademik", "joki tugas terpercaya"],
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}