import { Metadata } from "next"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { PageHeader } from "@/components/layout/PageHeader"
import { ServicesSection } from "@/components/home/sections/ServicesSection"

export const metadata: Metadata = {
  title: "Layanan Jasa Pengerjaan Tugas & Makalah | SelesainAja",
  description: "Eksplorasi berbagai layanan pengerjaan tugas akademik dari SelesainAja. Mulai dari makalah, presentasi PPT, paper ilmiah, hingga artikel jurnal.",
}

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <PageHeader 
          title="Layanan Terbaik Kami" 
          description="Pilih layanan yang sesuai dengan kebutuhan tugas Anda. Dikerjakan oleh tim profesional, dijamin tepat waktu, dan 100% bebas plagiasi."
        />
        <ServicesSection />
      </main>
      <Footer />
    </>
  )
}
