"use client"

import { useRef, useState, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { SectionWrapper } from "@/components/shared/SectionWrapper"
import { 
  BiRightArrowAlt, 
  BiCheckCircle, 
} from "react-icons/bi"
import Link from "next/link"
import { services } from "@/lib/constants"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useGSAP(() => {
    if (!containerRef.current || !isMounted) return;

    // Heading entrance animation
    if (headingRef.current) {
      gsap.from(headingRef.current.children, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
      });
    }

    // Scroll triggered card reveal (Swiss grid stagger)
    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
        },
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        delay: (index % 3) * 0.15
      });
    });

  }, { scope: containerRef, dependencies: [isMounted] });

  return (
    <SectionWrapper id="services" background="dark" className="relative overflow-hidden py-32 md:py-48 bg-[#0A0A0B]">
      <div ref={containerRef} className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Swiss Style Header */}
        <div ref={headingRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-24 md:mb-32 items-end border-b border-white/10 pb-16">
          <div className="lg:col-span-8">
            <p className="text-[#1591DC] font-bold tracking-[0.25em] uppercase text-sm mb-8 flex items-center gap-4">
              <span className="w-12 h-px bg-[#1591DC]" />
              Layanan Utama
            </p>
            <h2 className="text-6xl md:text-8xl lg:text-[7rem] font-black text-white tracking-tighter leading-[0.9]" style={{ fontFamily: "var(--font-batica)" }}>
              SOLUSI<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30">AKADEMIK</span><br />
              TERBAIK.
            </h2>
          </div>
          <div className="lg:col-span-4 lg:pb-4">
            <p className="text-xl text-white/60 font-medium leading-relaxed">
              Didesain khusus untuk memenuhi standar akademis dan profesional dengan kualitas <span className="text-white font-bold">100% Original</span> dan proses yang sepenuhnya transparan.
            </p>
          </div>
        </div>

        {/* 3-Column Swiss Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10 mb-32">
          {services.map((service, index) => (
            <Link key={index} href={service.href} className="block group outline-none bg-[#0A0A0B]">
              <div 
                ref={(el) => { cardsRef.current[index] = el; }}
                className="h-full p-10 md:p-14 hover:bg-white transition-colors duration-500 flex flex-col relative overflow-hidden"
              >
                {/* Hover Accent */}
                <div className="absolute top-0 left-0 w-full h-2 bg-[#1591DC] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                {/* Top Section */}
                <div className="flex items-start justify-between mb-16">
                  <div className="w-16 h-16 bg-white/5 group-hover:bg-[#1591DC]/10 flex items-center justify-center transition-colors duration-500">
                    <service.icon className="w-8 h-8 text-white group-hover:text-[#1591DC] transition-colors duration-500" />
                  </div>
                  <span className="text-xs font-bold text-white/40 group-hover:text-[#1591DC] tracking-widest uppercase transition-colors duration-500">
                    {service.deliveryTime}
                  </span>
                </div>

                {/* Title & Desc */}
                <h3 className="text-4xl font-black text-white group-hover:text-[#0A0A0B] mb-6 tracking-tight transition-colors duration-500" style={{ fontFamily: "var(--font-batica)" }}>
                  {service.title}
                </h3>
                <p className="text-white/50 group-hover:text-[#0A0A0B]/70 leading-relaxed font-medium mb-12 transition-colors duration-500 text-lg">
                  {service.description}
                </p>

                {/* Features */}
                <div className="flex-1">
                  <ul className="space-y-4 mb-16">
                    {service.features?.slice(0, 3).map((feat, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <BiCheckCircle className="w-6 h-6 text-[#1591DC] shrink-0" />
                        <span className="text-base font-medium text-white/70 group-hover:text-[#0A0A0B]/80 transition-colors duration-500">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer / Price */}
                <div className="pt-8 border-t border-white/10 group-hover:border-[#0A0A0B]/10 flex items-end justify-between mt-auto transition-colors duration-500">
                  <div>
                    <p className="text-xs font-bold text-white/40 group-hover:text-[#0A0A0B]/40 uppercase tracking-widest mb-2 transition-colors duration-500">Mulai dari</p>
                    <p className="text-3xl font-black text-white group-hover:text-[#0A0A0B] transition-colors duration-500">
                      {service.price.replace("Mulai ", "")}
                    </p>
                  </div>
                  <div className="w-14 h-14 bg-white/10 group-hover:bg-[#1591DC] flex items-center justify-center transition-colors duration-500">
                    <BiRightArrowAlt className="w-8 h-8 text-white" />
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>

        {/* Brutalist / Swiss CTA */}
        <div className="bg-[#1591DC] p-12 md:p-24 relative overflow-hidden group">
          {/* Decorative typography in background */}
          <div className="absolute -right-10 -top-20 text-[25rem] font-black text-[#0A0A0B]/10 leading-none pointer-events-none select-none" style={{ fontFamily: "var(--font-batica)" }}>
            ?
          </div>
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7">
              <h3 className="text-5xl md:text-6xl lg:text-[5rem] font-black text-[#0A0A0B] mb-8 tracking-tighter uppercase leading-[0.9]" style={{ fontFamily: "var(--font-batica)" }}>
                Butuh Layanan<br/><span className="text-white">Kustom?</span>
              </h3>
              <p className="text-xl text-[#0A0A0B]/80 font-bold max-w-xl">
                Konsultasikan kebutuhan tugas spesifik Anda. Diskusi langsung dengan ahli kami, tanpa biaya admin.
              </p>
            </div>
            <div className="md:col-span-5 flex md:justify-end">
              <a 
                href="https://wa.me/6281112345678?text=Halo%20Admin%20SelesainAja,%20saya%20ingin%20konsultasi%20mengenai%20layanan%20kustom"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-6 bg-[#0A0A0B] text-white py-8 px-12 font-black text-2xl hover:bg-white hover:text-[#0A0A0B] transition-colors duration-300"
              >
                DISKUSI SEKARANG
                <BiRightArrowAlt className="text-4xl" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </SectionWrapper>
  )
}
