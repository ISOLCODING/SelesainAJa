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
    color: "bg-[#0066FF]",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "02",
    title: "Kesepakatan Harga & Pembayaran",
    desc: "Kami akan memberikan penawaran harga terbaik. Jika sepakat, lakukan pembayaran Uang Muka (DP) minimal 50% melalui berbagai metode pembayaran aman yang tersedia. Tugas akan langsung kami jadwalkan untuk dikerjakan.",
    color: "bg-[#00B87C]",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "03",
    title: "Proses Pengerjaan",
    desc: "Tim ahli kami yang relevan dengan bidang studi Anda akan segera mengeksekusi tugas. Anda berhak meminta laporan kemajuan (progress report) kapan saja. Kami pastikan kualitas tulisan 100% orisinal.",
    color: "bg-[#FF5C39]",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "04",
    title: "Penyerahan File & Revisi",
    desc: "Setelah tugas rampung, kami mengirimkan cuplikan hasil. Lakukan pelunasan untuk menerima dokumen utuh. Temukan bagian yang kurang sesuai? Nikmati garansi revisi gratis tanpa biaya tambahan.",
    color: "bg-[#7B61FF]",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop"
  }
]

const payments = [
  { name: "BCA", color: "#0066AE", svg: <svg viewBox="0 0 100 30" className="h-8 md:h-10"><text x="50" y="22" fill="#0066AE" fontWeight="900" fontSize="28" fontFamily="Arial, sans-serif" textAnchor="middle">BCA</text></svg> },
  { name: "BRI", color: "#00529C", svg: <svg viewBox="0 0 100 30" className="h-8 md:h-10"><text x="50" y="22" fill="#00529C" fontWeight="900" fontSize="28" fontFamily="Arial, sans-serif" textAnchor="middle">BRI</text></svg> },
  { name: "Bank DKI", color: "#E8302D", svg: <svg viewBox="0 0 120 30" className="h-8 md:h-10"><text x="60" y="22" fill="#E8302D" fontWeight="900" fontSize="24" fontFamily="Arial, sans-serif" textAnchor="middle">Bank DKI</text></svg> },
  { name: "SeaBank", color: "#FF7020", svg: <svg viewBox="0 0 120 30" className="h-8 md:h-10"><text x="60" y="22" fill="#FF7020" fontWeight="900" fontSize="24" fontFamily="Arial, sans-serif" textAnchor="middle">SeaBank</text></svg> },
  { name: "DANA", color: "#118EEA", svg: <svg viewBox="0 0 100 30" className="h-8 md:h-10"><text x="50" y="22" fill="#118EEA" fontWeight="900" fontSize="26" fontFamily="Arial, sans-serif" textAnchor="middle">DANA</text></svg> },
  { name: "OVO", color: "#4C3494", svg: <svg viewBox="0 0 100 30" className="h-8 md:h-10"><text x="50" y="22" fill="#4C3494" fontWeight="900" fontSize="28" fontFamily="Arial, sans-serif" textAnchor="middle">OVO</text></svg> },
]

export function HowItWorksClient() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50 pt-28 pb-20">
        
        {/* HERO SECTION */}
        <section className="container mx-auto px-6 lg:px-12 mb-20 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6"
          >
            Cara Pesan <br className="hidden md:block"/> <span className="text-[#0066FF]">Tugas Anda.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto"
          >
            Proses transparan, cepat, dan 100% aman. Kami mendesain alur pengerjaan seringkas mungkin agar Anda bisa bernapas lega.
          </motion.p>
        </section>

        {/* INTERACTIVE STEPS SECTION (SWISS LAYOUT) */}
        <section className="container mx-auto px-6 lg:px-12 mb-32">
          <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm flex flex-col lg:flex-row min-h-[600px]">
            
            {/* Sidebar Steps */}
            <div className="lg:w-1/2 p-8 lg:p-16 border-b lg:border-b-0 lg:border-r border-slate-200 bg-slate-50/50">
              <h2 className="text-3xl font-bold text-slate-900 mb-10">4 Langkah Mudah</h2>
              <div className="space-y-6">
                {steps.map((step, index) => (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(index)}
                    className={`w-full text-left p-6 rounded-2xl transition-all duration-300 border-2 ${
                      activeStep === index 
                        ? "border-[#0066FF] bg-white shadow-md" 
                        : "border-transparent hover:border-slate-200 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <span className={`text-xl font-black ${activeStep === index ? "text-[#0066FF]" : "text-slate-400"}`}>
                        {step.id}
                      </span>
                      <div>
                        <h3 className={`text-xl font-bold mb-2 ${activeStep === index ? "text-slate-900" : "text-slate-600"}`}>
                          {step.title}
                        </h3>
                        <AnimatePresence>
                          {activeStep === index && (
                            <motion.p 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="text-slate-600 leading-relaxed overflow-hidden"
                            >
                              {step.desc}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Image Viewer */}
            <div className="lg:w-1/2 relative bg-slate-100 overflow-hidden min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
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
                  <div className={`absolute inset-0 opacity-20 mix-blend-multiply ${steps[activeStep].color}`} />
                  
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="bg-white p-6 rounded-2xl shadow-xl flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-slate-500 mb-1">Langkah {steps[activeStep].id}</p>
                        <p className="text-lg font-bold text-slate-900">{steps[activeStep].title}</p>
                      </div>
                      <div className={`w-12 h-12 rounded-full ${steps[activeStep].color} text-white flex items-center justify-center`}>
                         <RiArrowRightUpLine className="text-2xl" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
          </div>
        </section>

        {/* PAYMENT METHODS SECTION */}
        <section className="container mx-auto px-6 lg:px-12">
          <div className="bg-slate-900 rounded-[2rem] p-10 lg:p-20 text-center">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Pembayaran yang Fleksibel</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-16">
              Mendukung berbagai metode pembayaran bank lokal dan e-wallet terpercaya untuk kenyamanan dan keamanan transaksi Anda.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {payments.map((payment) => (
                <div 
                  key={payment.name} 
                  className="bg-white rounded-2xl aspect-[4/3] flex items-center justify-center p-6 hover:-translate-y-2 transition-transform duration-300 shadow-lg cursor-pointer group"
                >
                  <div className="grayscale group-hover:grayscale-0 transition-all duration-300 opacity-60 group-hover:opacity-100 scale-90 group-hover:scale-100">
                    {payment.svg}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-16 pt-16 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-left">
                <h3 className="text-2xl font-bold text-white mb-2">Punya Tugas Hari Ini?</h3>
                <p className="text-slate-400">Tim kami online 24/7 membalas pesan Anda.</p>
              </div>
              <a 
                href="https://wa.me/6281112345678" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-5 rounded-full font-bold text-lg flex items-center gap-3 transition-colors shrink-0"
              >
                <RiWhatsappLine className="text-2xl" />
                Chat via WhatsApp
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
