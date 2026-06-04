import { Metadata } from "next"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { PageHeader } from "@/components/layout/PageHeader"
import { TestimonialsSection } from "@/components/home/sections/TestimonialsSection"

export const metadata: Metadata = {
  title: "Testimoni | SelesainAja",
  description: "Apa kata mereka yang telah menggunakan layanan SelesainAja? Temukan berbagai testimoni dari mahasiswa di seluruh Indonesia.",
}

export default function TestimonialsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <PageHeader 
          title="Kisah Sukses Klien Kami" 
          description="Ratusan mahasiswa telah mempercayakan tugas akademik mereka kepada SelesainAja. Berikut adalah cerita mereka."
        />
        <TestimonialsSection />
      </main>
      <Footer />
    </>
  )
}
