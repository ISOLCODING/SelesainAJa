"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { SectionWrapper } from "@/components/shared/SectionWrapper"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { Star } from "lucide-react"
import { testimonials as fallbackTestimonials } from "@/lib/constants"

export function TestimonialsSection({ initialTestimonials }: { initialTestimonials?: any[] }) {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const testimonials = initialTestimonials && initialTestimonials.length > 0 ? initialTestimonials : fallbackTestimonials

  return (
    <SectionWrapper id="testimonials" background="default">
      <SectionHeading 
        badge="Testimoni Klien"
        title="Kata Mereka Yang Udah Lulus"
        subtitle="Jangan cuma dengerin dari kami. Lihat apa kata ribuan mahasiswa yang udah terbantu tugasnya."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testi: any, index: number) => (
          <motion.div
            key={index}
            ref={(el: HTMLDivElement | null) => { cardsRef.current[index] = el }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white p-8 rounded-2xl border border-[#E4E4E7] shadow-sm flex flex-col h-full"
          >
            <div className="flex items-center gap-1 mb-6">
              {[...Array(testi.rating || 5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#FF6B00] text-[#FF6B00]" />
              ))}
            </div>
            <p className="text-[#0A0A0B] font-medium leading-relaxed mb-8 flex-1">
              "{testi.text || testi.content}"
            </p>
            <div>
              <div className="font-bold text-[#0A0A0B]">{testi.name || testi.customerName}</div>
              <div className="text-sm text-[#71717A] mt-1">{testi.uni || testi.university}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
