import { Metadata } from "next"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { PageHeader } from "@/components/layout/PageHeader"
import { FAQSection } from "@/components/home/sections/FAQSection"

export const metadata: Metadata = {
  title: "FAQ - Pertanyaan Seputar Layanan | SelesainAja",
  description: "Temukan jawaban untuk pertanyaan yang paling sering diajukan mengenai layanan SelesainAja.",
}

export default function FAQPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <PageHeader 
          title="Pertanyaan Sering Diajukan" 
          description="Punya pertanyaan seputar layanan kami? Temukan jawabannya di sini atau hubungi tim customer service kami."
        />
        <FAQSection />
      </main>
      <Footer />
    </>
  )
}
