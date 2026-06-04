import { Metadata } from "next"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { PageHeader } from "@/components/layout/PageHeader"
import { SectionWrapper } from "@/components/shared/SectionWrapper"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Hubungi Kami | SelesainAja",
  description: "Hubungi tim customer service SelesainAja untuk konsultasi gratis mengenai jasa pengerjaan makalah, tugas kuliah, dan presentasi PPT. Fast response 24/7.",
}

import { contactInfo } from "@/lib/data/contact"

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <PageHeader 
          title="Hubungi Kami" 
          description="Punya pertanyaan atau butuh konsultasi terkait tugas Anda? Tim kami siap membantu Anda 24/7 dengan respons cepat."
        />

        <SectionWrapper className="bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-[#0A0A0B] mb-2">Info Kontak</h3>
                <p className="text-[#71717A] mb-8">Pilih metode komunikasi yang paling nyaman bagi Anda.</p>
              </div>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#E6F0FF] text-[#0066FF] flex items-center justify-center shrink-0">
                      <info.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#0A0A0B]">{info.title}</h4>
                      <p className="text-[#71717A] mb-2">{info.value}</p>
                      <Link href={info.href} className="text-[#0066FF] font-medium text-sm hover:underline">
                        {info.action}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-[#FAFAFA] border border-[#E4E4E7] rounded-3xl p-8 md:p-12">
                <h3 className="text-2xl font-bold text-[#0A0A0B] mb-2">Kirim Pesan</h3>
                <p className="text-[#71717A] mb-8">Isi formulir di bawah ini dan kami akan membalas secepatnya.</p>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nama Lengkap</Label>
                      <Input id="name" placeholder="John Doe" className="bg-white" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john@example.com" className="bg-white" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subjek Layanan</Label>
                    <Input id="subject" placeholder="Konsultasi Tugas Makalah" className="bg-white" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Detail Pesan</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Jelaskan detail tugas atau pertanyaan Anda..." 
                      className="min-h-[150px] bg-white resize-y" 
                    />
                  </div>
                  <Button size="lg" className="w-full bg-[#0066FF] hover:bg-[#0052CC] text-white rounded-xl h-14 text-base font-semibold">
                    Kirim Pesan Sekarang
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </SectionWrapper>
      </main>
      <Footer />
    </>
  )
}
