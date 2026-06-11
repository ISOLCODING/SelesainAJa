import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Hubungi Kami",
  description: "Hubungi tim SelesainAja untuk konsultasi tugas akademik, pertanyaan, atau informasi lebih lanjut. Kami siap membantu Anda 24/7 via WhatsApp, Email, atau formulir kontak.",
  openGraph: {
    title: "Hubungi SelesainAja — Konsultasi Tugas Akademik",
    description: "Konsultasi tugas akademik gratis dengan tim SelesainAja. Kami siap membantu Anda 24/7 via WhatsApp, Email, atau formulir kontak.",
    url: "https://selesainaja.vercel.app/contact",
    siteName: "SelesainAja",
    locale: "id_ID",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hubungi SelesainAja — Konsultasi Tugas Akademik",
    description: "Konsultasi tugas akademik gratis 24/7.",
    images: ["/og-image.jpg"],
  },
  keywords: ["kontak selesainaja", "konsultasi tugas", "hubungi joki tugas", "customer service tugas kuliah", "WhatsApp jasa tugas"],
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}