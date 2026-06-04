"use client"

import { motion } from "framer-motion"
import { SectionWrapper } from "@/components/shared/SectionWrapper"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Budi Santoso",
    uni: "Universitas Indonesia",
    text: "Sumpah ngebantu banget! Makalah sosiologi gue dapet A. Formatnya rapi, bahasanya bagus, dan bener-bener bebas plagiasi pas gue cek di Turnitin.",
    rating: 5
  },
  {
    name: "Sarah Wijaya",
    uni: "Institut Teknologi Bandung",
    text: "Tugas ngoding Java gue sempet stuck, untung ada SelesainAja. Kodenya bersih, dikasih komen penjelas juga jadi gue tetep ngerti pas ditanya dosen.",
    rating: 5
  },
  {
    name: "Riko Pratama",
    uni: "Universitas Gadjah Mada",
    text: "Gila sih ngerjain PPT nya cepet banget, padahal gue pesen paket kilat. Desainnya modern elegan gak norak. The best lah pokoknya!",
    rating: 5
  }
]

export function TestimonialsSection() {
  return (
    <SectionWrapper id="testimonials" background="default">
      <SectionHeading 
        badge="Testimoni Klien"
        title="Kata Mereka Yang Udah Lulus"
        subtitle="Jangan cuma dengerin dari kami. Lihat apa kata ribuan mahasiswa yang udah terbantu tugasnya."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testi, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white p-8 rounded-2xl border border-[#E4E4E7] shadow-sm flex flex-col h-full"
          >
            <div className="flex items-center gap-1 mb-6">
              {[...Array(testi.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#FF6B00] text-[#FF6B00]" />
              ))}
            </div>
            <p className="text-[#0A0A0B] font-medium leading-relaxed mb-8 flex-1">
              "{testi.text}"
            </p>
            <div>
              <div className="font-bold text-[#0A0A0B]">{testi.name}</div>
              <div className="text-sm text-[#71717A] mt-1">{testi.uni}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
