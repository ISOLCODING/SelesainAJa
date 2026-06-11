import { Metadata } from "next"
import JsonLd from "@/components/seo/JsonLd"
import { getBreadcrumbSchema } from "@/lib/seo/structured-data"
import { ServicesClient } from "@/components/frontend/services/ServicesClient"
import { prisma } from "@/lib/prisma"

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
  alternates: { canonical: "https://selesainaja.vercel.app/services" },
  openGraph: {
    title: "Layanan Jasa Pengerjaan Tugas — Makalah, Paper, Presentasi | SelesainAja",
    description:
      "Semua layanan jasa pengerjaan tugas akademik: makalah, paper, presentasi, jurnal, essay. Tim profesional, bebas plagiat, harga transparan.",
    url: "https://selesainaja.vercel.app/services",
    images: [{ url: "/og/services.jpg", width: 1200, height: 630, alt: "Layanan SelesainAja" }],
  },
}

export default async function ServicesPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Layanan", url: "https://selesainaja.vercel.app/services" }
  ]);

  let dbServices: any[] = [];
  try {
    dbServices = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" }
    });
  } catch (e) {
    console.error("Services page DB fetch error:", e);
  }

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <ServicesClient initialServices={dbServices} />
    </>
  )
}
