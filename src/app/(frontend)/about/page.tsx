"use client"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { PageHeader } from "@/components/layout/PageHeader"
import { SectionWrapper } from "@/components/shared/SectionWrapper"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { ShieldCheck, Users, Trophy, Target } from "lucide-react"
import Image from "next/image"
import JsonLd from "@/components/seo/JsonLd"
import { getBreadcrumbSchema } from "@/lib/seo/structured-data"
import { motion } from "framer-motion"

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
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Tentang Kami", url: "https://selesainaja.vercel.app/about" }
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <Header />
      <main className="min-h-screen bg-white">
        <PageHeader 
          title="Tentang SelesainAja" 
          description="Platform terpercaya yang hadir untuk membantu mahasiswa mengatasi kesulitan dalam penyelesaian tugas akademik sejak 2021."
        />

        <SectionWrapper className="bg-white">
          <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E6F0FF] text-[#0066FF] text-sm font-bold mb-6">
                <span className="w-2 h-2 rounded-full bg-[#0066FF] animate-pulse" />
                Sejak 2021
              </div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#0A0A0B] mb-6 leading-tight">
                Membangun Masa Depan Akademik Yang <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-[#4BB8FA]">Lebih Cerah.</span>
              </h2>
              <p className="text-lg text-[#71717A] mb-8 leading-relaxed font-medium">
                SelesainAja hadir sejak 2021 untuk membantu mahasiswa mengatasi kesulitan dalam penyelesaian tugas akademik. Kami percaya setiap mahasiswa berhak mendapatkan dukungan profesional tanpa harus mengorbankan waktu istirahat mereka.
              </p>
              <div className="flex flex-wrap gap-10 mt-10 p-6 bg-[#FAFAFA] rounded-2xl border border-[#F4F4F5]">
                <div>
                  <h4 className="text-4xl font-black text-[#0A0A0B] mb-1">5000<span className="text-[#0066FF]">+</span></h4>
                  <p className="text-[#71717A] font-medium text-sm tracking-wide uppercase">Tugas Selesai</p>
                </div>
                <div className="w-px bg-[#E4E4E7]"></div>
                <div>
                  <h4 className="text-4xl font-black text-[#0A0A0B] mb-1">1200<span className="text-[#0066FF]">+</span></h4>
                  <p className="text-[#71717A] font-medium text-sm tracking-wide uppercase">Klien Puas</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-[#E6F0FF] to-[#FAFAFA] rounded-[3rem] overflow-hidden relative shadow-2xl shadow-[#0066FF]/10 p-4 border border-white">
                <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden">
                  <Image 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                    alt="Tim SelesainAja"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -z-10 top-1/2 -right-12 w-64 h-64 bg-[#4BB8FA]/20 blur-[80px] rounded-full" />
              <div className="absolute -z-10 -bottom-12 -left-12 w-64 h-64 bg-[#0066FF]/10 blur-[80px] rounded-full" />
            </motion.div>
          </div>
        </SectionWrapper>

        <SectionWrapper className="bg-[#FAFAFA] relative overflow-hidden">
          <div className="container-custom relative z-10">
            <SectionHeading 
              title="Nilai Inti Kami" 
              subtitle="Prinsip yang kami pegang teguh dalam melayani setiap kebutuhan akademik Anda."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mt-16">
              {values.map((value, index) => (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  key={index}
                  className="bg-white p-8 lg:p-10 rounded-[2rem] border border-[#E4E4E7] shadow-sm hover:shadow-xl hover:shadow-[#0066FF]/5 hover:border-[#0066FF]/20 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#F4F4F5] text-[#52525B] group-hover:bg-[#0066FF] group-hover:text-white transition-colors duration-300 flex items-center justify-center mb-6">
                    <value.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0A0A0B] mb-3 group-hover:text-[#0066FF] transition-colors">{value.title}</h3>
                  <p className="text-[#71717A] leading-relaxed font-medium">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionWrapper>
      </main>
      <Footer />
    </>
  )
}
