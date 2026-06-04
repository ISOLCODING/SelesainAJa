"use client"

import { motion } from "framer-motion"
import { SectionWrapper } from "@/components/shared/SectionWrapper"
import { SectionHeading } from "@/components/shared/SectionHeading"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Image from "next/image"

const faqs = [
  {
    question: "Apakah aman dari Turnitin dan plagiasi?",
    answer: "Sangat aman. Setiap tugas yang kami kerjakan selalu dicek menggunakan Turnitin versi Premium sebelum dikirimkan ke klien. Kami menjamin tingkat plagiasi di bawah batas maksimal yang ditentukan kampusmu (biasanya < 20%)."
  },
  {
    question: "Berapa lama waktu pengerjaan tugas?",
    answer: "Tergantung tingkat kesulitan dan paket yang dipilih. Tersedia paket Regular (3-5 hari), Express (24-48 jam), dan Kilat (di bawah 24 jam)."
  },
  {
    question: "Bagaimana sistem pembayarannya?",
    answer: "Pembayaran dilakukan di awal (minimal DP 50%) via Bank Transfer (BCA, Mandiri, BNI) atau E-Wallet (GoPay, OVO, Dana). Sisa pembayaran dilunasi setelah tugas selesai dan preview dikirimkan."
  },
  {
    question: "Apakah ada garansi revisi jika ada yang kurang?",
    answer: "Tentu. Kami memberikan garansi revisi gratis sesuai dengan brief awal yang disepakati. Selama revisi tidak melenceng jauh dari kesepakatan awal, kami siap membantu sampai tugas benar-benar sesuai."
  },
  {
    question: "Siapa yang mengerjakan tugas saya?",
    answer: "Tugas dikerjakan oleh tim ahli kami yang terdiri dari lulusan S1/S2 perguruan tinggi ternama yang sudah berpengalaman di bidang akademiknya masing-masing."
  }
]

export function FAQSection() {
  return (
    <SectionWrapper id="faq" background="white" className="overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-square md:aspect-[4/5] lg:aspect-square w-full max-w-md mx-auto">
              {/* Blob Background */}
              <div className="absolute inset-0 bg-[#C4E2F5] rounded-[30%_70%_70%_30%/30%_30%_70%_70%] transform rotate-12 scale-90" />
              <div className="absolute inset-4 border-2 border-dashed border-[#1591DC]/30 rounded-[70%_30%_30%_70%/70%_70%_30%_30%] transform -rotate-6" />
              
              <Image 
                src="/images/faq-confused.png" 
                alt="Mahasiswa bingung dengan tugas"
                fill
                className="object-contain object-bottom z-10 drop-shadow-xl scale-110 origin-bottom"
              />

              {/* Floating Question Marks */}
              <motion.div 
                animate={{ y: [0, -15, 0], rotate: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 right-10 md:top-20 md:-right-4 text-5xl font-black text-[#2C5EAD] drop-shadow-md z-20"
                style={{ fontFamily: "var(--font-batica)" }}
              >
                ?
              </motion.div>
              <motion.div 
                animate={{ y: [0, 15, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-1/2 -left-6 md:-left-12 text-6xl font-black text-[#4BB8FA] drop-shadow-md z-20 opacity-70"
                style={{ fontFamily: "var(--font-batica)" }}
              >
                ?
              </motion.div>
              
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-12 -left-4 bg-white px-5 py-3 rounded-2xl shadow-[0_10px_30px_-10px_rgba(44,94,173,0.2)] border border-[#E4E4E7] z-20 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-[#1591DC] flex items-center justify-center text-white font-bold text-xl">
                  i
                </div>
                <div>
                  <p className="text-xs font-bold text-[#71717A] uppercase tracking-wider">Butuh Bantuan?</p>
                  <p className="text-sm font-bold text-[#0A0A0B]">Cek FAQ di bawah</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - FAQ Accordion */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C4E2F5]/50 text-[#2C5EAD] text-sm font-bold mb-4 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2C5EAD]" />
                FAQ
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0A0A0B] mb-4 text-balance" style={{ fontFamily: "var(--font-batica)" }}>
                Punya Pertanyaan?<br/>
                <span className="text-[#1591DC]">Cari Jawabannya Disini.</span>
              </h2>
              <p className="text-[#71717A] text-lg font-medium max-w-lg">
                Masih ragu? Berikut adalah beberapa pertanyaan yang paling sering ditanyakan oleh klien kami.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`} 
                    className="border-2 border-[#E4E4E7] bg-white px-6 rounded-2xl data-[state=open]:border-[#4BB8FA] data-[state=open]:shadow-[0_8px_20px_-6px_rgba(75,184,250,0.2)] transition-all duration-300"
                  >
                    <AccordionTrigger className="text-left font-bold text-[#0A0A0B] hover:no-underline hover:text-[#1591DC] py-5 text-lg">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#71717A] font-medium leading-relaxed pb-6 text-base">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>

        </div>
      </div>
    </SectionWrapper>
  )
}
