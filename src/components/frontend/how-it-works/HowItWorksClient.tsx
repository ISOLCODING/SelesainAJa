"use client"

import { useRef } from "react"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { PageHeader } from "@/components/layout/PageHeader"
import { 
  RiWhatsappLine, 
  RiShieldCheckFill, 
  RiTimeFill, 
  RiFileSettingsFill,
  RiCheckDoubleLine
} from "react-icons/ri"
import Image from "next/image"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { useGSAP } from "@gsap/react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

const steps = [
  {
    id: "01",
    title: "Konsultasi Gratis & Pengiriman Brief",
    desc: "Hubungi admin kami via WhatsApp. Kirimkan detail tugas, panduan dari dosen, rubrik penilaian, dan tenggat waktu (deadline). Tim kami akan menganalisis kebutuhan Anda secara mendalam secara gratis.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop",
    accent: "bg-[#0066FF]"
  },
  {
    id: "02",
    title: "Estimasi Transparan & Pembayaran",
    desc: "Dapatkan penawaran harga final yang sangat transparan tanpa biaya tersembunyi. Sepakat? Lakukan pembayaran DP (Uang Muka) minimal 50% via Bank Transfer atau E-Wallet untuk mengunci jadwal pengerjaan.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1000&auto=format&fit=crop",
    accent: "bg-[#4BB8FA]"
  },
  {
    id: "03",
    title: "Proses Riset & Pengerjaan Expert",
    desc: "Tugas Anda langsung dieksekusi oleh tenaga ahli (Lulusan S1/S2 Universitas Top) sesuai jurusan Anda. Proses dilakukan dengan riset literatur kredibel. Anda juga dapat meminta laporan progres (update) berkala.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop",
    accent: "bg-[#0A0A0B]"
  },
  {
    id: "04",
    title: "Quality Control & Uji Plagiasi",
    desc: "Sebelum diserahkan, tugas melewati tahap Quality Control ketat. Kami memastikan tidak ada typo, format sudah rapi, dan mengujinya menggunakan Turnitin Premium untuk menjamin orisinalitas karya (plagiasi rendah).",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop",
    accent: "bg-[#2C5EAD]"
  },
  {
    id: "05",
    title: "Penyerahan File & Garansi Revisi",
    desc: "Cuplikan hasil tugas kami kirimkan ke Anda. Setelah pelunasan, Anda akan menerima file utuh. Jika ada bagian yang belum sesuai dengan kesepakatan/brief awal, nikmati fasilitas Garansi Revisi Gratis tanpa ribet.",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1000&auto=format&fit=crop",
    accent: "bg-[#10B981]"
  }
]

const guarantees = [
  {
    title: "100% Orisinalitas",
    desc: "Bebas dari copy-paste. Pengecekan Turnitin Premium menjamin hasil yang dikirimkan otentik dan aman diserahkan ke dosen.",
    icon: <RiShieldCheckFill className="w-8 h-8" />
  },
  {
    title: "Tepat Waktu",
    desc: "Garansi on-time delivery. Kami berkomitmen menyelesaikan tugas sesuai atau bahkan sebelum deadline yang disepakati.",
    icon: <RiTimeFill className="w-8 h-8" />
  },
  {
    title: "Privasi Terjamin",
    desc: "Identitas klien, asal kampus, dan seluruh file tugas bersifat sangat rahasia. Kami menjamin 100% perlindungan data Anda.",
    icon: <RiFileSettingsFill className="w-8 h-8" />
  }
]

const payments = [
  { name: "BCA", svg: <img src="/images/payments/bca-new.png" alt="BCA" className="max-h-10 md:max-h-12 w-auto max-w-full object-contain" /> },
  { name: "BRI", svg: <img src="/images/payments/bri-new.png" alt="BRI" className="max-h-10 md:max-h-12 w-auto max-w-full object-contain" /> },
  { name: "DANA", svg: <img src="/images/payments/dana-new.png" alt="DANA" className="max-h-10 md:max-h-12 w-auto max-w-full object-contain" /> },
  { name: "LinkAja", svg: <img src="/images/payments/linkaja-new.png" alt="LinkAja" className="max-h-10 md:max-h-12 w-auto max-w-full object-contain" /> },
]

export function HowItWorksClient() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Animate the steps cards on scroll
    const stepCards = gsap.utils.toArray('.step-card')
    stepCards.forEach((card: any, i) => {
      gsap.fromTo(card, 
        { y: 100, opacity: 0 },
        {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        }
      )
    })

    // Animate guarantees section
    gsap.fromTo('.guarantee-card', 
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: ".guarantees-section",
          start: "top 80%",
        },
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.8,
        ease: "back.out(1.5)",
      }
    )
  }, { scope: containerRef })

  return (
    <div ref={containerRef}>
      <Header />
      <main className="min-h-screen bg-[#FAFAFA] pb-24 font-sans text-primary overflow-hidden">
        
        {/* PAGE HEADER */}
        <PageHeader
          title={<>Cara Pesan <br className="hidden md:block"/> <span className="text-[#0066FF]">Tugas Anda.</span></>}
          description="Alur kerja yang komprehensif, transparan, dan terjamin keamanannya. Kami mendesain sistem yang memastikan tugas Anda selesai dengan kualitas tertinggi."
          badge="Alur Sistematis"
          background="image"
          backgroundImage="https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=2000&auto=format&fit=crop"
          breadcrumbs={[
            { label: "Beranda", href: "/" },
            { label: "Cara Kerja" }
          ]}
        />

        {/* 5 STEPS - SCROLLING CARDS */}
        <section className="container-custom py-24">
          <div className="text-center mb-16 lg:mb-24">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E6F0FF] text-[#0066FF] text-sm font-bold mb-6 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#0066FF] animate-pulse" />
              Proses Kerja
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[#0A0A0B] mb-6 tracking-tight">
              5 Langkah Menuju <span className="text-[#0066FF]">Kesuksesan</span>
            </h2>
            <p className="text-[#71717A] text-lg max-w-2xl mx-auto font-medium">
              Kami menyederhanakan proses pengerjaan tanpa mengurangi kualitas. Ikuti panduan praktis berikut untuk memulai.
            </p>
          </div>

          <div className="space-y-12 lg:space-y-24 max-w-6xl mx-auto">
            {steps.map((step, index) => {
              const isEven = index % 2 === 1
              return (
                <div 
                  key={step.id} 
                  className={`step-card flex flex-col ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-8 lg:gap-16`}
                >
                  {/* Image Viewer */}
                  <div className="w-full lg:w-1/2 relative group rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/3] lg:aspect-square">
                    <Image 
                      src={step.image} 
                      alt={step.title} 
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 opacity-40 mix-blend-multiply ${step.accent}`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    <div className="absolute bottom-8 left-8 right-8">
                      <div className="text-[6rem] font-black leading-none text-white/20 select-none">
                        {step.id}
                      </div>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="w-full lg:w-1/2 py-8 lg:py-0">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-xl shadow-current/20 ${step.accent}`}>
                        {step.id}
                      </div>
                      <div className="h-0.5 flex-1 bg-gradient-to-r from-[#E4E4E7] to-transparent" />
                    </div>
                    
                    <h3 className="text-3xl lg:text-4xl font-black text-[#0A0A0B] mb-6 tracking-tight leading-tight">
                      {step.title}
                    </h3>
                    
                    <p className="text-lg text-[#71717A] leading-relaxed font-medium">
                      {step.desc}
                    </p>

                    <div className="mt-8 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#E6F0FF] text-[#0066FF] flex items-center justify-center">
                        <RiCheckDoubleLine />
                      </div>
                      <span className="text-sm font-bold text-[#0066FF] uppercase tracking-wider">Tahap {step.id} Selesai</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* 3 GUARANTEES SECTION */}
        <section className="guarantees-section bg-white py-24 border-y border-[#E4E4E7]">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-[#0A0A0B] mb-6 tracking-tight">
                Keamanan & Jaminan <span className="text-[#0066FF]">Prioritas Kami</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {guarantees.map((guarantee, i) => (
                <div key={i} className="guarantee-card bg-[#FAFAFA] p-8 md:p-10 rounded-[2rem] border border-[#E4E4E7] hover:border-[#0066FF]/30 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                  <div className="w-16 h-16 rounded-2xl bg-[#E6F0FF] text-[#0066FF] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#0066FF] group-hover:text-white transition-all duration-300">
                    {guarantee.icon}
                  </div>
                  <h3 className="text-2xl font-black text-[#0A0A0B] mb-4">
                    {guarantee.title}
                  </h3>
                  <p className="text-[#71717A] font-medium leading-relaxed">
                    {guarantee.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PAYMENT METHODS SECTION */}
        <section className="container-custom pt-24">
          <div className="bg-gradient-to-br from-[#0066FF] to-[#0052CC] rounded-[3rem] p-10 md:p-20 text-center shadow-2xl relative overflow-hidden">
            {/* Ambient Background Blobs */}
            <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[60%] bg-white/10 rounded-full blur-[80px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[60%] bg-white/10 rounded-full blur-[80px]" />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                Berbagai Pilihan Metode Pembayaran
              </h2>
              <p className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto mb-16 font-medium leading-relaxed">
                Pembayaran yang aman, mudah, dan fleksibel. Kami mendukung metode transfer bank dan e-wallet paling populer di Indonesia.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {payments.map((payment) => (
                  <div 
                    key={payment.name} 
                    className="bg-white/95 backdrop-blur-sm rounded-[1.5rem] h-24 md:h-28 flex items-center justify-center p-4 md:p-6 hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.4)] transition-all duration-300 cursor-pointer group"
                  >
                    <div className="scale-95 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center w-full h-full">
                      {payment.svg}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-20 pt-12 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-8 text-left">
                <div>
                  <h3 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">Tugas Kuliah Menumpuk?</h3>
                  <p className="text-white/80 text-lg font-medium">Tim kami siap membantu Anda menyelesaikan tugas hari ini juga.</p>
                </div>
                <a 
                  href="https://wa.me/6281112345678" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white text-[#0A0A0B] hover:bg-[#F4F4F5] px-8 py-5 rounded-[1.5rem] font-black text-xl flex items-center gap-3 transition-all duration-300 shadow-xl hover:shadow-2xl shrink-0 animate__animated animate__pulse animate__infinite animate__slow"
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
    </div>
  )
}
