"use client"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { PageHeader } from "@/components/layout/PageHeader"
import { SectionWrapper } from "@/components/shared/SectionWrapper"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import JsonLd from "@/components/seo/JsonLd"
import { getBreadcrumbSchema } from "@/lib/seo/structured-data"
import { contactInfo } from "@/lib/data/contact"
import { motion } from "framer-motion"

export default function ContactPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Kontak", url: "https://selesainaja.vercel.app/contact" }
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <Header />
      <main className="min-h-screen bg-white">
        <PageHeader 
          title="Hubungi Kami" 
          description="Punya pertanyaan atau butuh konsultasi terkait tugas Anda? Tim kami siap membantu Anda 24/7 dengan respons cepat."
        />

        <SectionWrapper className="bg-white">
          <div className="container-custom grid grid-cols-1 lg:grid-cols-3 gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1 space-y-8"
            >
              <div>
                <h3 className="text-2xl font-black text-[#0A0A0B] mb-2">Info Kontak</h3>
                <p className="text-[#71717A] mb-8 font-medium">Pilih metode komunikasi yang paling nyaman bagi Anda.</p>
              </div>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    key={index} 
                    className="flex gap-4 group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-[#F4F4F5] group-hover:bg-[#E6F0FF] text-[#52525B] group-hover:text-[#0066FF] flex items-center justify-center shrink-0 transition-colors duration-300">
                      <info.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0A0A0B]">{info.title}</h4>
                      <p className="text-[#71717A] mb-2 font-medium">{info.value}</p>
                      <Link href={info.href} className="inline-flex items-center text-[#0066FF] font-bold text-sm hover:underline group-hover:translate-x-1 transition-transform">
                        {info.action}
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-[#FAFAFA] border border-[#E4E4E7] rounded-[2rem] p-8 md:p-12 shadow-sm hover:shadow-xl hover:shadow-[#0066FF]/5 transition-shadow duration-300">
                <h3 className="text-3xl font-black text-[#0A0A0B] mb-2">Kirim Pesan</h3>
                <p className="text-[#71717A] mb-8 font-medium">Isi formulir di bawah ini dan kami akan membalas secepatnya.</p>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="font-bold">Nama Lengkap</Label>
                      <Input id="name" placeholder="John Doe" className="bg-white h-12 rounded-xl focus-visible:ring-[#0066FF]" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="font-bold">Email</Label>
                      <Input id="email" type="email" placeholder="john@example.com" className="bg-white h-12 rounded-xl focus-visible:ring-[#0066FF]" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="font-bold">Subjek Layanan</Label>
                    <Input id="subject" placeholder="Konsultasi Tugas Makalah" className="bg-white h-12 rounded-xl focus-visible:ring-[#0066FF]" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="font-bold">Detail Pesan</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Jelaskan detail tugas atau pertanyaan Anda..." 
                      className="min-h-[150px] bg-white resize-y rounded-xl focus-visible:ring-[#0066FF]" 
                    />
                  </div>
                  <Button size="lg" className="w-full bg-[#0066FF] hover:bg-[#0052CC] text-white rounded-xl h-14 text-base font-bold shadow-lg shadow-[#0066FF]/20 transition-all hover:-translate-y-1">
                    Kirim Pesan Sekarang
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </SectionWrapper>
      </main>
      <Footer />
    </>
  )
}
