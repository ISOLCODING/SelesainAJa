import { Metadata } from "next"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { PageHeader } from "@/components/layout/PageHeader"
import { SectionWrapper } from "@/components/shared/SectionWrapper"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { ShieldCheck, Users, Trophy, Target } from "lucide-react"

export const metadata: Metadata = {
  title: "Tentang SelesainAja — Platform Jasa Pengerjaan Tugas #1 Indonesia",
  description:
    "Kenali SelesainAja, platform jasa pengerjaan tugas terpercaya sejak 2020. 2.500+ pelanggan puas, 10.000+ tugas selesai, rating 4.9/5. Tim profesional lulusan S2/S3.",
  keywords: [
    "tentang selesainaja",
    "jasa pengerjaan tugas terpercaya",
    "platform tugas akademik indonesia",
    "tim profesional jasa makalah",
  ],
  alternates: { canonical: "https://selesainaja.com/about" },
  openGraph: {
    title: "Tentang SelesainAja — Platform Jasa Pengerjaan Tugas #1 Indonesia",
    description:
      "Platform jasa pengerjaan tugas terpercaya. 2.500+ pelanggan puas, 10.000+ tugas selesai, rating 4.9/5.",
    url: "https://selesainaja.com/about",
  },
}

const values = [
  {
    icon: ShieldCheck,
    title: "Privasi & Keamanan",
    description: "Kami menjamin kerahasiaan identitas dan data akademik Anda 100%.",
  },
  {
    icon: Users,
    title: "Tim Profesional",
    description: "Dikerjakan langsung oleh ahlinya yang merupakan lulusan universitas terkemuka.",
  },
  {
    icon: Trophy,
    title: "Kualitas Premium",
    description: "Hasil pengerjaan terjamin kualitasnya, lolos uji plagiasi, dan sesuai dengan standar akademik.",
  },
  {
    icon: Target,
    title: "Tepat Waktu",
    description: "Kami selalu berkomitmen untuk menyelesaikan tugas Anda sebelum tenggat waktu yang ditentukan.",
  },
]

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <PageHeader 
          title="Tentang SelesainAja" 
          description="Platform terpercaya yang hadir untuk membantu mahasiswa mengatasi kesulitan dalam penyelesaian tugas akademik sejak 2021."
        />

        <SectionWrapper className="bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0A0A0B] mb-6">
                Membangun Masa Depan Akademik Yang Lebih Cerah.
              </h2>
              <p className="text-lg text-[#71717A] mb-6">
                SelesainAja hadir sejak 2021 untuk membantu mahasiswa mengatasi kesulitan dalam penyelesaian tugas akademik. Kami percaya setiap mahasiswa berhak mendapatkan dukungan profesional tanpa harus mengorbankan waktu istirahat mereka.
              </p>
              <div className="flex flex-wrap gap-8 mt-10">
                <div>
                  <h4 className="text-4xl font-bold text-[#0066FF] mb-2">5000+</h4>
                  <p className="text-[#71717A] font-medium">Tugas Selesai</p>
                </div>
                <div>
                  <h4 className="text-4xl font-bold text-[#0066FF] mb-2">1200+</h4>
                  <p className="text-[#71717A] font-medium">Klien Puas</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-[#FAFAFA] rounded-3xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                  alt="Tim SelesainAja" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper className="bg-[#FAFAFA]">
          <SectionHeading 
            title="Nilai Inti Kami" 
            subtitle="Prinsip yang kami pegang teguh dalam melayani setiap kebutuhan akademik Anda."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-2xl border border-[#E4E4E7] flex flex-col items-start"
              >
                <div className="w-12 h-12 rounded-xl bg-[#E6F0FF] text-[#0066FF] flex items-center justify-center mb-6">
                  <value.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#0A0A0B] mb-3">{value.title}</h3>
                <p className="text-[#71717A] leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </SectionWrapper>
      </main>
      <Footer />
    </>
  )
}
