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
          background="image"
          backgroundImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop"
          breadcrumbs={[
            { label: "Beranda", href: "/" },
            { label: "Testimoni" }
          ]}
        />
        <TestimonialsSection />
      </main>
      <Footer />
    </>
  )
}
