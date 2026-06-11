import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description: "Komitmen SelesainAja dalam melindungi data pribadi dan kerahasiaan identitas klien. Baca kebijakan privasi lengkap kami.",
  openGraph: {
    title: "Kebijakan Privasi — SelesainAja",
    description: "Komitmen SelesainAja dalam melindungi data pribadi dan kerahasiaan identitas klien. Baca kebijakan privasi lengkap kami.",
    url: "https://selesainaja.vercel.app/privacy",
    siteName: "SelesainAja",
    locale: "id_ID",
    type: "website",
  },
  keywords: ["kebijakan privasi selesainaja", "privasi joki tugas", "kerahasiaan data", "keamanan data klien"],
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children
}