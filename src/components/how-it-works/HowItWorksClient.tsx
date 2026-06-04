"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { RiWhatsappLine, RiArrowRightUpLine } from "react-icons/ri"
import Image from "next/image"

const steps = [
  {
    id: "01",
    title: "Konsultasi & Pengiriman Brief",
    desc: "Hubungi admin kami melalui WhatsApp. Jelaskan secara detail tugas yang Anda butuhkan, lampirkan panduan atau rubrik penilaian dari kampus, dan tentukan tenggat waktu (deadline). Kami akan menganalisis kebutuhan Anda secara instan.",
    color: "bg-primary",
    textClass: "text-primary",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "02",
    title: "Kesepakatan Harga & Pembayaran",
    desc: "Kami akan memberikan penawaran harga terbaik. Jika sepakat, lakukan pembayaran Uang Muka (DP) minimal 50% melalui berbagai metode pembayaran aman yang tersedia. Tugas akan langsung kami jadwalkan untuk dikerjakan.",
    color: "bg-secondary",
    textClass: "text-secondary",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "03",
    title: "Proses Pengerjaan",
    desc: "Tim ahli kami yang relevan dengan bidang studi Anda akan segera mengeksekusi tugas. Anda berhak meminta laporan kemajuan (progress report) kapan saja. Kami pastikan kualitas tulisan 100% orisinal.",
    color: "bg-accent",
    textClass: "text-accent",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "04",
    title: "Penyerahan File & Revisi",
    desc: "Setelah tugas rampung, kami mengirimkan cuplikan hasil. Lakukan pelunasan untuk menerima dokumen utuh. Temukan bagian yang kurang sesuai? Nikmati garansi revisi gratis tanpa biaya tambahan.",
    color: "bg-[#1E3A8A]",
    textClass: "text-[#1E3A8A]",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop"
  }
]

const payments = [
  { name: "BCA", svg: <img src="/images/payments/bca.png" alt="BCA" className="h-10 md:h-12 w-auto object-contain" /> },
  { name: "BRI", svg: <img src="/images/payments/bri.png" alt="BRI" className="h-10 md:h-12 w-auto object-contain" /> },
  { name: "Bank DKI", svg: <img src="/images/payments/bank-dki.png" alt="Bank DKI" className="h-10 md:h-12 w-auto object-contain" /> },
  { name: "DANA", svg: <img src="/images/payments/dana.png" alt="DANA" className="h-10 md:h-12 w-auto object-contain" /> },
]

export function HowItWorksClient() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-32 pb-24 font-sans text-primary">
        
        {/* HERO SECTION - SWISS STYLE */}
        <section className="container-custom mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-5 py-2 rounded-full text-sm font-bold uppercase tracking-[0.2em] mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            Alur Sistematis
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl lg:text-[5.5rem] font-black font-jakarta text-primary tracking-tighter leading-[1.05] mb-8"
          >
            Cara Pesan <br className="hidden md:block"/> 
            <span className="text-secondary">Tugas Anda.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-primary/70 max-w-3xl mx-auto font-medium"
          >
            Proses transparan, cepat, dan terjamin keamanannya. Kami mendesain alur pengerjaan seringkas mungkin dengan standar kualitas tinggi.
          </motion.p>
        </section>

        {/* INTERACTIVE STEPS SECTION (PURE SWISS LAYOUT) */}
        <section className="container-custom mb-32">
          <div className="bg-white rounded-[3rem] border border-primary/10 overflow-hidden shadow-[0_20px_60px_-15px_rgba(44,94,173,0.1)] flex flex-col lg:flex-row min-h-[650px]">
            
            {/* Sidebar Steps */}
            <div className="lg:w-1/2 p-8 md:p-12 lg:p-16 border-b lg:border-b-0 lg:border-r border-primary/10 bg-[#FAFAFC]">
              <h2 className="text-3xl md:text-4xl font-black font-jakarta text-primary mb-12 tracking-tight">
                4 Langkah Mudah
              </h2>
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(index)}
                    className={`w-full text-left p-6 md:p-8 rounded-[2rem] transition-all duration-500 border-2 ${
                      activeStep === index 
                        ? `border-primary bg-white shadow-xl shadow-primary/5` 
                        : `border-transparent hover:border-primary/20 hover:bg-white/60`
                    }`}
                  >
                    <div className="flex items-start gap-5">
                      <span className={`text-2xl font-black font-jakarta transition-colors duration-300 ${activeStep === index ? step.textClass : "text-primary/30"}`}>
                        {step.id}
                      </span>
                      <div>
                        <h3 className={`text-xl md:text-2xl font-black font-jakarta tracking-tight mb-3 transition-colors duration-300 ${activeStep === index ? "text-primary" : "text-primary/60"}`}>
                          {step.title}
                        </h3>
                        <AnimatePresence>
                          {activeStep === index && (
                            <motion.p 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="text-primary/70 leading-relaxed overflow-hidden font-medium text-sm md:text-base"
                            >
                              <span className="block pt-2">
                                {step.desc}
                              </span>
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Image Viewer - Modern Swiss Solid Grid */}
            <div className="lg:w-1/2 relative bg-primary/5 overflow-hidden min-h-[400px] lg:min-h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <Image 
                    src={steps[activeStep].image} 
                    alt={steps[activeStep].title} 
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  {/* Solid overlay pattern (Swiss touch) */}
                  <div className={`absolute inset-0 opacity-40 mix-blend-multiply ${steps[activeStep].color}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                  
                  <div className="absolute bottom-10 left-10 right-10">
                    <div className="bg-white/95 backdrop-blur-md p-8 rounded-[2rem] shadow-2xl flex items-center justify-between border border-white">
                      <div>
                        <p className="text-sm font-black font-jakarta uppercase tracking-[0.2em] text-secondary mb-2">
                          Langkah {steps[activeStep].id}
                        </p>
                        <p className="text-2xl font-black font-jakarta text-primary tracking-tight leading-tight">
                          {steps[activeStep].title}
                        </p>
                      </div>
                      <div className={`w-14 h-14 rounded-2xl ${steps[activeStep].color} text-white flex items-center justify-center shrink-0 shadow-lg`}>
                         <RiArrowRightUpLine className="text-3xl" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
          </div>
        </section>

        {/* PAYMENT METHODS SECTION - BLUE MONOCHROME SWISS */}
        <section className="container-custom">
          <div className="bg-gradient-to-br from-primary to-secondary rounded-[3rem] p-12 md:p-20 text-center shadow-2xl relative overflow-hidden">
            {/* Ambient Background Blobs */}
            <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[60%] bg-white/10 rounded-full blur-[80px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[60%] bg-white/10 rounded-full blur-[80px]" />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-jakarta text-white mb-8 tracking-tight leading-tight">
                Fleksibilitas <br className="md:hidden" /> Pembayaran
              </h2>
              <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-16 font-medium">
                Mendukung berbagai metode pembayaran bank lokal dan e-wallet terpercaya untuk kenyamanan dan keamanan transaksi Anda.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {payments.map((payment) => (
                  <div 
                    key={payment.name} 
                    className="bg-white/95 backdrop-blur-sm rounded-[1.5rem] aspect-[4/3] flex items-center justify-center p-6 hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] transition-all duration-400 cursor-pointer group"
                  >
                    <div className="grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 scale-95 group-hover:scale-105 transition-all duration-400">
                      {payment.svg}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-20 pt-12 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-8 text-left">
                <div>
                  <h3 className="text-3xl font-black font-jakarta text-white mb-2 tracking-tight">Punya Tugas Hari Ini?</h3>
                  <p className="text-white/80 text-lg font-medium">Tim kami selalu siaga membalas pesan Anda.</p>
                </div>
                <a 
                  href="https://wa.me/6281112345678" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white text-primary hover:bg-[#F4F8FB] px-8 py-5 rounded-[1.5rem] font-black font-jakarta text-lg flex items-center gap-3 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 shrink-0"
                >
                  <RiWhatsappLine className="text-3xl text-[#25D366]" />
                  Konsultasi Sekarang
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
