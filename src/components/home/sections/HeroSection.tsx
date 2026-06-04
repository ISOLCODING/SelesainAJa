"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const benefits = [
  "Privasi Terjamin 100%",
  "Bebas Plagiasi (Turnitin)",
  "Revisi Tanpa Batas",
  "Pengerjaan Kilat 24 Jam",
]

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-[#FAFAFA]">
      {/* Decorative Blobs */}
      <div className="absolute top-20 right-0 w-64 h-64 md:w-[500px] md:h-[500px] bg-[#4BB8FA]/15 rounded-full blur-3xl pointer-events-none -z-10 mix-blend-multiply" />
      <div className="absolute bottom-10 left-[-10%] w-72 h-72 md:w-[600px] md:h-[600px] bg-[#2C5EAD]/10 rounded-full blur-3xl pointer-events-none -z-10 mix-blend-multiply" />
      
      <div className="container-custom relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C4E2F5]/50 border border-[#4BB8FA]/30 text-[#1591DC] text-sm font-bold mb-8 shadow-sm"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2C5EAD] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2C5EAD]"></span>
              </span>
              Platform Jasa Joki #1 di Indonesia
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-black tracking-tight text-[#0A0A0B] mb-6 leading-[1.1] text-balance"
            >
              Tugas Numpuk? <br className="hidden sm:block" />
              Biar Kami Yang <span className="text-[#1591DC] relative inline-block">
                SelesainAja.
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#4BB8FA]/40 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="transparent" />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-[#71717A] mb-10 max-w-xl font-medium leading-relaxed"
            >
              Fokus aja sama hal yang lebih penting. Urusan makalah, jurnal, sampai coding serahkan ke tim ahli kami. Hasil cepat, aman, dan berkualitas A+.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 mb-12"
            >
              <Link href="/services" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-[#2C5EAD] hover:bg-[#1591DC] text-white rounded-2xl h-14 px-8 text-base font-bold shadow-[0_8px_20px_-6px_rgba(44,94,173,0.5)] transition-all duration-300 hover:-translate-y-1">
                  Pesan Sekarang
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="#how-it-works" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-[#C4E2F5] hover:border-[#4BB8FA] hover:bg-[#C4E2F5]/20 rounded-2xl h-14 px-8 text-base font-bold text-[#2C5EAD] transition-all duration-300">
                  Lihat Cara Kerja
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-x-6 gap-y-3"
            >
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-sm font-bold text-[#0A0A0B]">
                  <CheckCircle2 className="w-5 h-5 text-[#4BB8FA]" />
                  {benefit}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative lg:ml-auto w-full max-w-lg mx-auto lg:max-w-none mt-16 sm:mt-24 lg:mt-0"
          >
            {/* Image Container with Modern Swiss Design */}
            <div className="relative aspect-square md:aspect-[4/5] lg:aspect-square w-full group">
              {/* Swiss Geometric Background Frame */}
              <div 
                className="absolute inset-0 rounded-2xl overflow-hidden border-2 border-[#E2E8F0] shadow-sm bg-[#F8FAFC]"
              >
                {/* Lightweight CSS Grid Pattern */}
                <div 
                  className="absolute inset-0 opacity-[0.15]"
                  style={{
                    backgroundImage: "linear-gradient(#94A3B8 1px, transparent 1px), linear-gradient(90deg, #94A3B8 1px, transparent 1px)",
                    backgroundSize: "24px 24px"
                  }}
                />
              </div>

              {/* Character Image */}
              <Image 
                src="/images/hero-girl.png" 
                alt="Mahasiswa tersenyum"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={85}
                className="object-contain object-bottom z-10 scale-[1.05] origin-bottom transition-transform duration-700 group-hover:scale-[1.1]"
                priority
              />

              {/* Floating Review Card - Clean Swiss UI */}
              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-6 sm:top-12 -left-2 sm:-left-6 md:-left-12 bg-white p-3 sm:p-4 rounded-xl shadow-[8px_8px_0_0_rgba(20,145,220,0.1)] border border-[#E2E8F0] z-20 flex items-center gap-3 sm:gap-4 max-w-[180px] sm:max-w-[220px]"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#F0F5FA] rounded-full flex-shrink-0 flex items-center justify-center text-lg sm:text-xl">
                  👩🏻‍🎓
                </div>
                <div>
                  <div className="flex text-[#FFB800] text-[10px] sm:text-sm mb-1 gap-0.5">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <p className="text-xs font-bold text-[#0A0A0B] leading-tight">"Skripsi beres tepat waktu! Mantap "</p>
                </div>
              </motion.div>

              {/* Floating Stats Card - Clean Swiss UI */}
              <motion.div 
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-6 sm:bottom-12 -right-2 sm:-right-4 md:-right-10 bg-white px-5 py-3 sm:px-6 sm:py-4 rounded-xl shadow-[8px_8px_0_0_rgba(20,145,220,0.1)] border border-[#E2E8F0] z-20 text-center"
              >
                <div className="text-xl sm:text-3xl font-black text-[#1591DC] mb-0.5 leading-none">10k+</div>
                <div className="text-[10px] sm:text-xs font-bold text-[#71717A] uppercase tracking-wider">Tugas Selesai</div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
