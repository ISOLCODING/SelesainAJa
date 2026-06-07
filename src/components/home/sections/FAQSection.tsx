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
import { faqs as fallbackFaqs } from "@/lib/data/faqs"

export function FAQSection({ initialFaqs }: { initialFaqs?: any[] }) {
  const faqs = initialFaqs && initialFaqs.length > 0 ? initialFaqs : fallbackFaqs

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
            <div className="relative aspect-square w-full max-w-lg mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl">
              <Image 
                src="/images/faq.png" 
                alt="FAQ SelesainAja"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              
              {/* Premium Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B]/80 via-[#0A0A0B]/20 to-transparent mix-blend-multiply" />
              
              {/* Glassmorphism Badge */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, type: "spring", bounce: 0.4 }}
                className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-xl px-6 py-5 rounded-3xl border border-white/20 z-20 flex items-center gap-5 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1591DC] to-[#2C5EAD] flex items-center justify-center text-white font-black text-2xl shrink-0 shadow-lg shadow-[#1591DC]/40">
                  ?
                </div>
                <div>
                  <p className="text-xs font-black text-white/70 uppercase tracking-[0.2em] mb-1.5">Butuh Bantuan?</p>
                  <p className="text-lg font-bold text-white leading-tight">Hubungi Tim Customer Service Kami.</p>
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
              <Accordion className="w-full space-y-4">
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
