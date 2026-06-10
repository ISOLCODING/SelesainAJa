import { Metadata } from "next"
import JsonLd from "@/components/seo/JsonLd"
import { getBreadcrumbSchema } from "@/lib/seo/structured-data"
import { ServicesClient } from "@/components/frontend/services/ServicesClient"

export const metadata: Metadata = {
  title: "Layanan Jasa Pengerjaan Tugas — Makalah, Paper, Presentasi",
  description:
    "Lihat semua layanan jasa pengerjaan tugas: makalah (50K), presentasi (75K), jurnal (150K), essay (40K), laporan praktikum (60K), programming (100K). Tim profesional, bebas plagiat!",
  keywords: [
    "layanan jasa pengerjaan tugas",
    "jasa makalah",
    "jasa presentasi",
    "jasa jurnal ilmiah",
    "jasa essay",
    "harga jasa tugas",
    "jasa pengerjaan tugas online",
  ],
  alternates: { canonical: "https://selesainaja.com/services" },
  openGraph: {
    title: "Layanan Jasa Pengerjaan Tugas — Makalah, Paper, Presentasi | SelesainAja",
    description:
      "Semua layanan jasa pengerjaan tugas akademik: makalah, paper, presentasi, jurnal, essay. Tim profesional, bebas plagiat, harga transparan.",
    url: "https://selesainaja.com/services",
    images: [{ url: "/og/services.jpg", width: 1200, height: 630, alt: "Layanan SelesainAja" }],
  },
}

export default function ServicesPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Layanan", url: "https://selesainaja.com/services" }
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <ServicesClient />
    </>
  )
}
