import { Metadata } from "next"
import { HowItWorksClient } from "@/components/how-it-works/HowItWorksClient"
import JsonLd from "@/components/seo/JsonLd"
import { getBreadcrumbSchema } from "@/lib/seo/structured-data"

export const metadata: Metadata = {
  title: "Cara Order Jasa Pengerjaan Tugas — Mudah & Cepat",
  description:
    "Cara pesan jasa pengerjaan tugas di SelesainAja: 1) Konsultasi via WhatsApp 2) Deal & pembayaran 3) Tim mengerjakan 4) Terima hasil & revisi. Proses mudah!",
  keywords: [
    "cara order jasa pengerjaan tugas",
    "cara pesan jasa makalah",
    "proses jasa tugas kuliah",
    "langkah pesan jasa akademik",
  ],
  alternates: { canonical: "https://selesainaja.com/how-it-works" },
  openGraph: {
    title: "Cara Order Jasa Pengerjaan Tugas — Mudah & Cepat | SelesainAja",
    description:
      "4 langkah mudah: Konsultasi → Deal & bayar → Pengerjaan → Terima hasil. Proses transparan & cepat!",
    url: "https://selesainaja.com/how-it-works",
  },
}

export default function HowItWorksPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Cara Order", url: "https://selesainaja.com/how-it-works" }
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <HowItWorksClient />
    </>
  )
}
