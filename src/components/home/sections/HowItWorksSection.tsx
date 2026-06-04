"use client"

import { motion } from "framer-motion"
import { SectionWrapper } from "@/components/shared/SectionWrapper"
import { MessageSquareText, FileCheck, CreditCard, Send, CheckCircle2 } from "lucide-react"
import Image from "next/image"

const steps = [
  {
    icon: MessageSquareText,
    title: "Konsultasi Tugas",
    description: "Kirim detail tugas, format, dan deadline ke admin kami via WhatsApp atau sistem web.",
    color: "#2C5EAD",
    bgColor: "bg-[#2C5EAD]/10"
  },
  {
    icon: CreditCard,
    title: "Pembayaran DP",
    description: "Sepakati harga & lakukan pembayaran DP. Tim kami akan langsung mulai mengerjakan.",
    color: "#1591DC",
    bgColor: "bg-[#1591DC]/10"
  },
  {
    icon: FileCheck,
    title: "Proses Pengerjaan",
    description: "Kami mengerjakan tugasmu sesuai brief. Kamu bisa pantau progress kapan saja.",
    color: "#4BB8FA",
    bgColor: "bg-[#4BB8FA]/10"
  },
  {
    icon: Send,
    title: "Pengiriman & Revisi",
    description: "Tugas selesai dikirim! Jika ada yang kurang pas, minta revisi gratis sepuasnya.",
    color: "#0A0A0B",
    bgColor: "bg-[#E4E4E7]"
  }
]

export function HowItWorksSection() {
  return (
    <SectionWrapper id="how-it-works" background="white" className="overflow-hidden">
      <div className="container-custom">
        
        {/* Header aligned left, max width */}
        <div className="max-w-2xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C4E2F5]/50 text-[#2C5EAD] text-sm font-bold mb-4 uppercase tracking-wider"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#2C5EAD]" />
            Cara Kerja
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0A0A0B] mb-6 text-balance leading-tight"
            style={{ fontFamily: "var(--font-batica)" }}
          >
            Gampang Banget,<br/>
            <span className="text-[#1591DC]">Tinggal Duduk Manis!</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-[#71717A] font-medium"
          >
            Hanya 4 langkah mudah untuk menyelesaikan tugasmu. Anti ribet, cepat, dan pasti beres sesuai deadline.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column - Steps */}
          <div className="relative">
            {/* Connecting line for steps */}
            <div className="absolute left-[28px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#2C5EAD] via-[#1591DC] to-[#E4E4E7] hidden md:block opacity-30" />
            
            <div className="space-y-8 relative">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative flex flex-col md:flex-row gap-6 md:gap-8 group"
                >
                  {/* Step Number/Icon */}
                  <div className={`relative z-10 w-14 h-14 md:w-16 md:h-16 shrink-0 rounded-2xl flex items-center justify-center bg-white border-2 transition-colors duration-300 shadow-sm`}
                       style={{ borderColor: step.color }}>
                    <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-white border-2 flex items-center justify-center text-[10px] font-black z-20"
                         style={{ borderColor: step.color, color: step.color }}>
                      0{index + 1}
                    </div>
                    <step.icon className="w-6 h-6 md:w-8 md:h-8 transition-colors duration-300" style={{ color: step.color }} />
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 pt-1 md:pt-3">
                    <h3 className="text-xl md:text-2xl font-black text-[#0A0A0B] mb-2" style={{ fontFamily: "var(--font-batica)" }}>
                      {step.title}
                    </h3>
                    <p className="text-[#71717A] font-medium leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column - Hero Guy Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative lg:h-[600px] flex items-end justify-center"
          >
            {/* Background Blob/Shape */}
            <div className="absolute bottom-0 w-full aspect-square bg-[#2C5EAD] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] opacity-10 transform rotate-12 scale-90 md:scale-100" />
            <div className="absolute bottom-10 w-[90%] aspect-square bg-[#4BB8FA] rounded-[60%_40%_30%_70%/60%_30%_70%_40%] opacity-20 transform -rotate-12 scale-90 md:scale-100 blur-2xl" />
            
            <div className="relative w-[90%] max-w-[400px] aspect-[3/4] md:aspect-square lg:aspect-[3/4] z-10">
              <Image 
                src="/images/hero-guy.png" 
                alt="Mahasiswa menunjuk ke atas dengan senyum"
                fill
                className="object-contain object-bottom drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)] scale-110 origin-bottom"
              />
            </div>

            {/* Floating Badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-20 -left-4 md:-left-12 bg-white px-5 py-4 rounded-2xl shadow-xl border border-[#E4E4E7] z-20 flex items-center gap-3"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-[#C4E2F5] flex items-center justify-center overflow-hidden">
                    <span className="text-xs">👋</span>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-xs font-bold text-[#71717A]">Dipercaya oleh</p>
                <p className="text-sm font-black text-[#2C5EAD]">10.000+ Klien</p>
              </div>
            </motion.div>

            {/* Success Badge */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-24 -right-4 md:-right-8 bg-white p-4 rounded-full shadow-[0_10px_30px_-10px_rgba(44,94,173,0.3)] border border-[#E4E4E7] z-20 flex items-center gap-2"
            >
              <CheckCircle2 className="w-6 h-6 text-[#1591DC]" />
              <span className="font-bold text-[#0A0A0B] pr-2">100% Berhasil</span>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </SectionWrapper>
  )
}
