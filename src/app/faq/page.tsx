import { Metadata } from "next"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { PageHeader } from "@/components/layout/PageHeader"
import { FAQSection } from "@/components/home/sections/FAQSection"
import { faqs } from "@/lib/data/faqs"
import JsonLd from "@/components/seo/JsonLd"
import { getFAQSchema, getBreadcrumbSchema } from "@/lib/seo/structured-data"

export const metadata: Metadata = {
  title: "FAQ — Pertanyaan Seputar Jasa Pengerjaan Tugas",
  description:
    "Tanya jawab lengkap seputar jasa pengerjaan tugas: harga, proses, garansi, privasi, revisi. Temukan jawaban untuk semua pertanyaan Anda di sini.",
  keywords: [
    "faq jasa pengerjaan tugas",
    "pertanyaan jasa makalah",
    "garansi pengerjaan tugas",
    "harga jasa tugas kuliah",
  ],
  alternates: { canonical: "https://selesainaja.com/faq" },
  openGraph: {
    title: "FAQ — Pertanyaan Seputar Jasa Pengerjaan Tugas | SelesainAja",
    description:
      "Tanya jawab lengkap: harga, proses, garansi, privasi, revisi. Temukan jawaban semua pertanyaan Anda.",
    url: "https://selesainaja.com/faq",
  },
}

export default function FAQPage() {
  const faqSchema = getFAQSchema(faqs);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "FAQ", url: "https://selesainaja.com/faq" }
  ]);

  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <Header />
      <main className="min-h-screen bg-white">
        <PageHeader 
          title="Pertanyaan Sering Diajukan" 
          description="Punya pertanyaan seputar layanan kami? Temukan jawabannya di sini atau hubungi tim customer service kami."
          background="image"
          backgroundImage="https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=2000&auto=format&fit=crop"
          breadcrumbs={[
            { label: "Beranda", href: "/" },
            { label: "FAQ" }
          ]}
        />
        <FAQSection />
      </main>
      <Footer />
    </>
  )
}
