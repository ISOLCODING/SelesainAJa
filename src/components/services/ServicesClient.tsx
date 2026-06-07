"use client"

import { useRef } from "react"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { PageHeader } from "@/components/layout/PageHeader"
import { services } from "@/lib/constants"
import Image from "next/image"
import Link from "next/link"
import { 
  RiCheckDoubleLine, 
  RiStarFill,
  RiTimeLine,
  RiMoneyDollarCircleLine
} from "react-icons/ri"
import { BiBriefcase, BiChat } from "react-icons/bi"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { useGSAP } from "@gsap/react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

const serviceImages = [
  "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?q=80&w=1000&auto=format&fit=crop", // Makalah
  "https://images.unsplash.com/photo-1455390582262-044cdead2708?q=80&w=1000&auto=format&fit=crop", // Essay
  "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1000&auto=format&fit=crop", // Presentasi
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop", // Jurnal
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1000&auto=format&fit=crop", // Proposal
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop", // Skripsi
]

export function ServicesClient() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Parallax effect on images
    const images = gsap.utils.toArray('.service-image')
    images.forEach((img: any) => {
      gsap.to(img, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: img.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      })
    })

    // Reveal text content
    const textBlocks = gsap.utils.toArray('.service-text')
    textBlocks.forEach((block: any) => {
      gsap.fromTo(block, 
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: block,
            start: "top 80%",
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out"
        }
      )
    })
  }, { scope: containerRef })

  return (
    <div ref={containerRef}>
      <Header />
      <main className="min-h-screen bg-[#FAFAFA] font-sans text-primary">
        
        {/* PAGE HEADER */}
        <PageHeader
          title={<>Layanan <span className="text-[#0066FF]">Unggulan</span> Kami.</>}
          description="Eksplorasi layanan akademik dan profesional kami. Dikerjakan secara spesifik oleh tenaga ahli untuk memastikan kualitas terbaik dan orisinalitas tinggi."
          badge="Lengkap & Terpercaya"
          background="image"
          backgroundImage="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop"
          breadcrumbs={[
            { label: "Beranda", href: "/" },
            { label: "Layanan" }
          ]}
        />

        {/* STANDAR KUALITAS SECTION */}
        <section className="bg-white py-16 border-b border-[#E4E4E7]">
          <div className="container-custom">
            <div className="flex flex-wrap justify-center gap-6 md:gap-12">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E6F0FF] text-[#0066FF] flex items-center justify-center">
                  <RiCheckDoubleLine className="text-xl" />
                </div>
                <span className="font-bold text-[#0A0A0B]">100% Bebas Plagiasi</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E6F0FF] text-[#0066FF] flex items-center justify-center">
                  <RiStarFill className="text-xl" />
                </div>
                <span className="font-bold text-[#0A0A0B]">Dikerjakan Tim Expert</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E6F0FF] text-[#0066FF] flex items-center justify-center">
                  <RiTimeLine className="text-xl" />
                </div>
                <span className="font-bold text-[#0A0A0B]">Garansi Tepat Waktu</span>
              </div>
            </div>
          </div>
        </section>

        {/* DEEP DIVE SERVICES ROWS */}
        <section className="py-24 space-y-24 md:space-y-32">
          {services.map((service, index) => {
            const isEven = index % 2 !== 0
            const imageSrc = serviceImages[index % serviceImages.length]

            return (
              <div key={service.title} className="container-custom">
                <div className={`flex flex-col ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20`}>
                  
                  {/* Image Column */}
                  <div className="w-full lg:w-1/2">
                    <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl">
                      {/* Image gets parallaxed slightly */}
                      <div className="absolute inset-[-15%] w-[130%] h-[130%]">
                        <Image 
                          src={imageSrc} 
                          alt={service.title} 
                          fill
                          className="object-cover service-image"
                        />
                      </div>
                      <div className={`absolute inset-0 opacity-40 mix-blend-multiply bg-gradient-to-br ${service.color}`} />
                      
                      {/* Floating Badge */}
                      <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2">
                        <service.icon className="text-[#0066FF] text-xl" />
                        <span className="font-black text-[#0A0A0B] text-sm uppercase tracking-wider">{service.title}</span>
                      </div>
                    </div>
                  </div>

                  {/* Text Column */}
                  <div className="w-full lg:w-1/2 service-text">
                    <h2 className="text-4xl md:text-5xl font-black text-[#0A0A0B] mb-6 tracking-tight leading-tight">
                      {service.title}
                    </h2>
                    <p className="text-lg text-[#71717A] leading-relaxed mb-8">
                      {service.fullDescription}
                    </p>

                    {/* Features Grid */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#E4E4E7] mb-8">
                      <h4 className="text-lg font-bold text-[#0A0A0B] mb-4 border-b border-[#F4F4F5] pb-4">Yang Anda Dapatkan:</h4>
                      <ul className="space-y-3">
                        {service.features?.map((feat, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <RiCheckDoubleLine className="text-[#0066FF] text-xl shrink-0 mt-0.5" />
                            <span className="text-[#3F3F46] font-medium leading-relaxed">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Benefits Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                      {service.benefits?.map((benefit, i) => (
                        <div key={i} className="bg-[#E6F0FF]/50 rounded-2xl p-4 flex gap-3 items-start">
                          <RiStarFill className="text-[#0066FF] shrink-0 mt-1" />
                          <span className="text-sm font-bold text-[#0A0A0B]">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    {/* Price & CTA */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-[#E4E4E7]">
                      <div>
                        <p className="text-sm font-bold text-[#71717A] uppercase tracking-widest mb-1 flex items-center gap-2">
                          <RiTimeLine className="text-[#0066FF]" />
                          Estimasi: {service.deliveryTime}
                        </p>
                        <p className="text-2xl font-black text-[#0A0A0B] flex items-center gap-2">
                          <RiMoneyDollarCircleLine className="text-[#10B981] text-3xl" />
                          {service.price}
                        </p>
                      </div>
                      
                      <Link 
                        href={service.href}
                        className="w-full sm:w-auto bg-[#0066FF] text-white px-8 py-4 rounded-full font-black hover:bg-[#0052CC] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center"
                      >
                        Lihat Detail Layanan
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            )
          })}
        </section>

        {/* CUSTOM SERVICES / BUNDLING CTA */}
        <section className="container-custom pb-24">
          <div className="group relative bg-[#0A0A0B] rounded-[3rem] p-10 md:p-16 lg:p-20 overflow-hidden border border-[#E4E4E7] shadow-2xl transition-transform duration-700 hover:-translate-y-2">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-gradient-to-l from-[#0066FF]/20 to-transparent pointer-events-none" />
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#0066FF] rounded-full blur-[100px] opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity duration-700" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Column */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-bold mb-8 uppercase tracking-[0.2em] backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-[#0066FF] animate-pulse" />
                  Layanan Custom & Bundling
                </div>
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-[1.05] uppercase">
                  BUTUH LEBIH DARI <span className="text-[#0066FF]">SATU LAYANAN?</span>
                </h3>
              </div>
              
              {/* Right Column */}
              <div className="lg:col-span-5 flex flex-col items-start lg:pl-12 lg:border-l border-white/20">
                <div className="w-14 h-14 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-sm">
                  <BiBriefcase className="text-2xl text-[#0066FF]" />
                </div>
                <p className="text-lg text-white/80 font-medium leading-relaxed mb-10">
                  Konsultasikan kebutuhan spesifik Anda. Kami menyediakan paket Bundling (contoh: Skripsi + PPT Sidang) dengan harga yang jauh lebih hemat.
                </p>
                
                <a 
                  href="https://wa.me/6281112345678?text=Halo%20Admin,%20saya%20ingin%20konsultasi%20layanan%20bundling"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-[#0A0A0B] py-4 px-8 rounded-full font-black text-lg transition-all duration-300 hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.2)] flex items-center gap-3"
                >
                  Mulai Diskusi
                  <BiChat className="text-xl text-[#0066FF]" />
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
