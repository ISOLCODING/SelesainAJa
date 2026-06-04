"use client"

import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { SectionWrapper } from "@/components/shared/SectionWrapper"
import { 
  BiRightArrowAlt, 
  BiCheckCircle, 
  BiTargetLock, 
  BiTrophy, 
  BiLineChart, 
  BiShieldAlt2,
  BiTrendingUp,
  BiBriefcase,
  BiChat
} from "react-icons/bi"
import Link from "next/link"
import { services } from "@/lib/constants"
import { motion, AnimatePresence } from "framer-motion"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const blobsRef = useRef<(HTMLDivElement | null)[]>([])
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useGSAP(() => {
    if (!containerRef.current || !isMounted) return;

    // Organic floating blobs animation - Modern Editorial Style
    blobsRef.current.forEach((blob, i) => {
      if (!blob) return;
      
      // Floating animation
      gsap.to(blob, {
        y: i % 2 === 0 ? -60 : 60,
        x: i % 2 === 0 ? 40 : -40,
        rotation: i % 2 === 0 ? 30 : -30,
        duration: 6 + i * 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Scroll Parallax for blobs
      gsap.to(blob, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
        y: (i + 1) * 120,
        rotation: (i + 1) * 45,
      });
    });

    // Heading entrance animation
    if (headingRef.current) {
      gsap.from(headingRef.current.children, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
    }

    // Scroll triggered card reveal (Editorial style stagger with dynamic transforms)
    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      
      const isFeatured = index % 4 === 0 || index % 4 === 3;
      
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
        },
        y: 80,
        opacity: 0,
        rotation: isFeatured ? 2 : -2, // Subtle tilt
        scale: 0.95,
        duration: 1,
        ease: "back.out(1.1)",
        delay: (index % 3) * 0.1 // Stagger by column
      });
    });

  }, { scope: containerRef, dependencies: [isMounted] });

  // Secondary highlights features
  const highlights = [
    { icon: BiTargetLock, title: "Fokus Kualitas", desc: "Setiap detail tugas dikerjakan dengan presisi tinggi" },
    { icon: BiShieldAlt2, title: "100% Aman", desc: "Data & identitas klien dijamin kerahasiaannya" },
    { icon: BiTrendingUp, title: "Tepat Waktu", desc: "Komitmen penuh pada deadline yang disepakati" }
  ];

  return (
    <SectionWrapper id="services" background="default" className="relative overflow-hidden pt-32 pb-40">
      <div ref={containerRef} className="relative z-10 w-full max-w-[1400px] mx-auto">
        
        {/* Editorial Background Blobs - Using the requested colors */}
        <div className="absolute inset-0 pointer-events-none z-[-1] opacity-70">
          <div 
            ref={(el) => { blobsRef.current[0] = el }}
            className="absolute top-[5%] left-[5%] w-[40rem] h-[40rem] bg-[#C4E2F5] rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-[80px] mix-blend-multiply opacity-60"
          />
          <div 
            ref={(el) => { blobsRef.current[1] = el }}
            className="absolute bottom-[10%] right-[5%] w-[45rem] h-[45rem] bg-[#4BB8FA] rounded-[30%_70%_70%_30%/30%_30%_70%_70%] blur-[90px] mix-blend-multiply opacity-30"
          />
          <div 
            ref={(el) => { blobsRef.current[2] = el }}
            className="absolute top-1/2 left-[30%] w-[35rem] h-[35rem] bg-[#1591DC] rounded-[50%_50%_20%_80%/25%_80%_20%_75%] blur-[100px] mix-blend-multiply opacity-20"
          />
          <div 
            ref={(el) => { blobsRef.current[3] = el }}
            className="absolute top-[20%] right-[20%] w-[30rem] h-[30rem] bg-[#2C5EAD] rounded-[70%_30%_50%_50%/40%_60%_40%_60%] blur-[80px] mix-blend-multiply opacity-15"
          />
        </div>

        {/* Section Heading */}
        <div ref={headingRef} className="text-center mb-24 relative px-4">
          <div className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-[#C4E2F5]/40 text-[#2C5EAD] rounded-full font-black uppercase tracking-[0.25em] text-sm mb-8 border border-[#2C5EAD]/20 backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#1591DC] animate-ping" />
            <span className="w-2 h-2 rounded-full bg-[#1591DC] absolute" />
            Layanan Editorial
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-[5.5rem] font-black text-slate-900 tracking-tighter leading-[1.05] max-w-5xl mx-auto mb-8">
            Eksplorasi Layanan <span className="text-[#2C5EAD] italic font-serif font-normal inline-block relative">
              Premium
              <div className="absolute -bottom-2 left-0 w-full h-2 bg-[#4BB8FA]/30 rounded-full" />
            </span> Kami.
          </h2>
          <p className="text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
            Didesain khusus untuk memenuhi standar akademis dan profesional dengan kualitas <span className="text-[#1591DC] font-bold">100% Original</span> dan proses transparan.
          </p>
        </div>

        {/* Highlights Banner */}
        <div className="max-w-6xl mx-auto mb-24 px-4 hidden md:block">
          <div className="bg-white/80 backdrop-blur-xl rounded-[3rem] p-4 shadow-[0_20px_40px_-15px_rgba(44,94,173,0.1)] border border-white flex justify-between items-center divide-x divide-slate-100">
            {highlights.map((item, i) => (
              <div key={i} className="px-10 py-6 flex-1 flex items-center gap-6 group">
                <div className="w-16 h-16 rounded-[1.5rem] bg-[#C4E2F5]/30 flex items-center justify-center text-[#2C5EAD] group-hover:bg-[#2C5EAD] group-hover:text-white transition-colors duration-500 shrink-0">
                  <item.icon className="text-3xl" />
                </div>
                <div>
                  <h4 className="text-xl font-black text-slate-900 mb-1">{item.title}</h4>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3-Column Service Cards — Clean International Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, index) => (
            <Link key={index} href={service.href} className="block h-full outline-none group">
              <div className="h-full bg-white rounded-2xl border border-[#E4E4E7] hover:border-[#1591DC]/40 hover:shadow-lg hover:shadow-[#1591DC]/8 transition-all duration-200 flex flex-col overflow-hidden">

                {/* Top Section */}
                <div className="px-6 pt-6 pb-5 border-b border-[#F4F4F5]">
                  {/* Icon + Badge Row */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-[#F4F4F5] group-hover:bg-[#1591DC]/10 transition-colors duration-200 flex items-center justify-center">
                      <service.icon className="w-5 h-5 text-[#52525B] group-hover:text-[#1591DC] transition-colors duration-200" />
                    </div>
                    <span className="text-[11px] font-bold text-[#71717A] bg-[#F4F4F5] px-2.5 py-1 rounded-full">
                      {service.deliveryTime}
                    </span>
                  </div>
                  {/* Title */}
                  <h3 className="text-[17px] font-bold text-[#09090B] leading-snug mb-2 group-hover:text-[#1591DC] transition-colors duration-200">
                    {service.title}
                  </h3>
                  {/* Description */}
                  <p className="text-sm text-[#71717A] leading-relaxed font-normal">
                    {service.description}
                  </p>
                </div>

                {/* Features */}
                <div className="flex-1 px-6 py-5">
                  <ul className="space-y-2">
                    {service.features?.slice(0, 4).map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <svg className="w-4 h-4 text-[#1591DC] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-[#52525B] leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer */}
                <div className="px-6 pb-5 pt-4 border-t border-[#F4F4F5] flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-semibold text-[#A1A1AA] uppercase tracking-widest mb-0.5">Mulai dari</p>
                    <p className="text-base font-bold text-[#09090B]">
                      {service.price.replace("Mulai ", "")}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1591DC] group-hover:text-white group-hover:bg-[#1591DC] border border-[#1591DC]/30 group-hover:border-transparent px-3.5 py-1.5 rounded-lg transition-all duration-200">
                    Pesan
                    <BiRightArrowAlt className="w-4 h-4" />
                  </span>
                </div>

              </div>
            </Link>
          ))}
        </div>

        {/* Global CTA Section within Services - Swiss Modernist Layout */}
        <div className="mt-32 max-w-7xl mx-auto px-4 md:px-6">
          <div className="bg-[#0A0A0B] rounded-[2rem] md:rounded-[3rem] p-10 md:p-16 lg:p-20 relative overflow-hidden border border-[#27272A] shadow-2xl">
            {/* Subtle Modern Accent */}
            <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-gradient-to-l from-[#1591DC]/10 to-transparent pointer-events-none" />
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#1591DC] rounded-full blur-[120px] opacity-20 pointer-events-none" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Column: Massive Typography */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#4BB8FA] text-sm font-bold mb-8 uppercase tracking-[0.2em]">
                  <span className="w-2 h-2 rounded-full bg-[#4BB8FA] animate-pulse" />
                  Layanan Kustom
                </div>
                <h3 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white tracking-tighter leading-[1.05] uppercase text-balance" style={{ fontFamily: "var(--font-batica)" }}>
                  TUGAS <span className="text-[#1591DC]">SPESIFIK</span><br />
                  BUTUH SOLUSI<br />
                  <span className="text-[#E4E4E7]">SPESIFIK.</span>
                </h3>
              </div>
              
              {/* Right Column: Content & CTA */}
              <div className="lg:col-span-5 flex flex-col items-start lg:pl-12 lg:border-l border-white/10 pt-4 lg:pt-0">
                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-8">
                  <BiBriefcase className="text-2xl text-[#4BB8FA]" />
                </div>
                <p className="text-lg md:text-xl text-[#A1A1AA] font-medium leading-relaxed mb-10 max-w-md">
                  Tidak menemukan layanan yang pas di katalog kami? Konsultasikan format, deadline, dan ekspektasi Anda secara langsung. Tim spesialis kami siap beradaptasi.
                </p>
                
                <a 
                  href="https://wa.me/6281112345678?text=Halo%20Admin%20SelesainAja,%20saya%20ingin%20konsultasi%20mengenai%20layanan%20kustom"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-between w-full sm:w-auto gap-8 bg-white text-[#0A0A0B] py-4 px-6 md:py-5 md:px-8 rounded-full font-black text-lg transition-all duration-300 hover:bg-[#1591DC] hover:text-white hover:scale-[1.02] shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(21,145,220,0.3)]"
                >
                  <span className="uppercase tracking-widest text-sm md:text-base">Mulai Diskusi</span>
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#0A0A0B]/10 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                    <BiChat className="text-lg md:text-xl" />
                  </div>
                </a>
              </div>
              
            </div>
          </div>
        </div>

      </div>
    </SectionWrapper>
  )
}
