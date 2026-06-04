"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { 
  BiArrowBack, 
  BiCheckCircle, 
  BiCreditCardFront, 
  BiShieldQuarter, 
  BiChevronDown,
  BiStar,
  BiTrophy,
  BiTimeFive,
  BiLogoWhatsapp,
  BiInfoCircle,
  BiRightArrowAlt,
  BiBarChartSquare,
  BiChat,
  BiShieldAlt2,
  BiFileBlank,
  BiMessageRoundedDots,
  BiBriefcase,
  BiUserVoice,
  BiTask,
  BiLaptop,
  BiTargetLock,
  BiSupport,
  BiLineChart
} from "react-icons/bi";
import { services } from "@/lib/constants";
import { notFound } from "next/navigation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// Custom SVGs for payment methods as requested
const paymentMethods = [
  { name: "BCA", 
    svg: <svg viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-auto">
      <path d="M15 5H45V25H15V5Z" fill="#005DAA"/>
      <text x="50" y="22" fontFamily="Arial, sans-serif" fontSize="22" fill="#005DAA" fontWeight="900" fontStyle="italic">BCA</text>
      <circle cx="25" cy="15" r="5" fill="white"/>
    </svg> 
  },
  { name: "BRI", 
    svg: <svg viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-auto">
      <path d="M10 10H30V25H10V10Z" fill="#00529C"/>
      <path d="M20 5L30 15H10L20 5Z" fill="#F37021"/>
      <text x="40" y="22" fontFamily="Arial, sans-serif" fontSize="22" fill="#00529C" fontWeight="900">BRI</text>
    </svg> 
  },
  { name: "Bank DKI", 
    svg: <svg viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-24 h-auto">
      <rect x="5" y="5" width="20" height="20" fill="#D32F2F" rx="4"/>
      <circle cx="15" cy="15" r="5" fill="white"/>
      <text x="35" y="22" fontFamily="Arial, sans-serif" fontSize="20" fill="#D32F2F" fontWeight="900">Bank DKI</text>
    </svg> 
  },
  { name: "SeaBank", 
    svg: <svg viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-24 h-auto">
      <circle cx="15" cy="15" r="12" fill="#FF7043"/>
      <path d="M10 15C10 12 15 10 20 15C25 20 20 22 15 15Z" fill="white" stroke="white" strokeWidth="2"/>
      <text x="35" y="22" fontFamily="Arial, sans-serif" fontSize="20" fill="#FF7043" fontWeight="900">SeaBank</text>
    </svg> 
  },
  { name: "DANA", 
    svg: <svg viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-auto">
      <path d="M10 15C10 7 15 5 20 5C27 5 30 10 30 15C30 22 25 25 20 25C13 25 10 20 10 15Z" fill="#118EEA"/>
      <path d="M15 15L20 20L25 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <text x="35" y="22" fontFamily="Arial, sans-serif" fontSize="20" fill="#118EEA" fontWeight="900">DANA</text>
    </svg> 
  },
  { name: "OVO", 
    svg: <svg viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-auto">
      <circle cx="18" cy="15" r="12" fill="#4C3494"/>
      <circle cx="18" cy="15" r="8" fill="white"/>
      <circle cx="18" cy="15" r="4" fill="#4C3494"/>
      <text x="35" y="22" fontFamily="Arial, sans-serif" fontSize="22" fill="#4C3494" fontWeight="900">OVO</text>
    </svg> 
  },
];

const generalFaqs = [
  { q: "Apakah kerahasiaan data saya terjamin?", a: "Tentu saja! Keamanan dan privasi Anda adalah prioritas absolut kami. Kami menggunakan protokol keamanan tingkat tinggi dan semua file serta identitas klien akan dihapus setelah project dinyatakan selesai tanpa jejak publikasi." },
  { q: "Bagaimana jika hasil tidak sesuai harapan?", a: "Kami menyediakan garansi revisi gratis sesuai dengan brief awal yang telah disepakati. Kepuasan Anda adalah yang utama, tim kami siap menyesuaikan draft hingga Anda 100% puas." },
  { q: "Apakah bisa request format spesifik dari kampus?", a: "Pasti! Anda cukup mengirimkan pedoman penulisan atau template spesifik dari institusi/kampus Anda, dan penulis ahli kami akan mengikutinya secara sangat presisi mulai dari font, margin, hingga cara sitasi." },
  { q: "Siapa yang mengerjakan tugas saya?", a: "Setiap project ditangani oleh tim ahli yang terdiri dari akademisi, praktisi industri, dan penulis tersertifikasi. Mereka diseleksi secara ketat sesuai dengan latar belakang dan spesialisasi keilmuan yang relevan dengan tugas Anda." },
  { q: "Apakah saya bisa memantau progres pengerjaan?", a: "Ya, Anda bisa selalu menghubungi admin CS kami yang responsif via WhatsApp untuk menanyakan progres dari tugas yang sedang dikerjakan. Kami menjamin transparansi di setiap tahap." }
];

export default function ServiceDetailClient({ slug }: { slug: string }) {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<"overview" | "benefits" | "process" | "faq">("overview");
  const [isMounted, setIsMounted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<(HTMLDivElement | null)[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const processStepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const pricingCardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useGSAP(() => {
    if (!containerRef.current || !isMounted) return;

    // Editorial Floating Background Blobs Animation (GSAP + ScrollTrigger Parallax)
    blobsRef.current.forEach((blob, i) => {
      if (!blob) return;
      gsap.to(blob, {
        y: i % 2 === 0 ? -80 : 80,
        x: i % 2 === 0 ? 50 : -50,
        rotation: i % 2 === 0 ? 45 : -45,
        duration: 8 + i * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to(blob, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 2,
        },
        y: (i + 1) * 150,
        rotation: (i + 1) * 90,
      });
    });

    // Hero Section Entrance
    const tl = gsap.timeline();
    tl.from(heroRef.current, {
      y: 80,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
    }).from(".hero-stagger", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "back.out(1.2)"
    }, "-=0.8");

    // Pricing Card Sticky Float effect
    if (pricingCardRef.current) {
      gsap.to(pricingCardRef.current, {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    // Process Steps Stagger Animation (ScrollTrigger)
    if (activeTab === "process") {
      processStepsRef.current.forEach((step, i) => {
        if (!step) return;
        gsap.fromTo(step, 
          { x: i % 2 === 0 ? -100 : 100, opacity: 0 },
          {
            scrollTrigger: {
              trigger: step,
              start: "top 85%",
            },
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            clearProps: "all"
          }
        );
      });
    }

  }, { scope: containerRef, dependencies: [isMounted, activeTab] });

  const service = services.find(s => s.href === `/services/${slug}`);
  
  if (!service) {
    return notFound();
  }

  const Icon = service.icon;
  const whatsappText = encodeURIComponent(`Halo Admin SelesainAja, saya tertarik dan ingin konsultasi mengenai layanan "${service.title}". Boleh minta informasi lebih lanjut?`);
  const whatsappUrl = `https://wa.me/6281112345678?text=${whatsappText}`;

  return (
    <div ref={containerRef} className="bg-[#FAF9F6] min-h-screen pt-32 pb-32 selection:bg-primary selection:text-white relative overflow-hidden font-sans">
      
      {/* Modern Editorial Organic Background Blobs */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div 
          ref={(el) => { blobsRef.current[0] = el }}
          className="absolute top-[-10%] right-[-10%] w-[50rem] h-[50rem] bg-accent/20 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-[90px] mix-blend-multiply" 
        />
        <div 
          ref={(el) => { blobsRef.current[1] = el }}
          className="absolute top-[30%] left-[-15%] w-[45rem] h-[45rem] bg-secondary/15 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-[100px] mix-blend-multiply" 
        />
        <div 
          ref={(el) => { blobsRef.current[2] = el }}
          className="absolute bottom-[-10%] right-[10%] w-[55rem] h-[55rem] bg-primary/10 rounded-[50%_50%_20%_80%/25%_80%_20%_75%] blur-[120px] mix-blend-multiply" 
        />
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-12 relative z-10 max-w-[1400px]">
        
        {/* Editorial Back Button */}
        <Link href="/services" className="inline-flex items-center text-slate-500 hover:text-primary font-bold mb-16 transition-all duration-300 uppercase tracking-[0.25em] text-xs lg:text-sm group relative z-20">
          <span className="w-12 h-12 rounded-full bg-white shadow-md border border-slate-100 group-hover:border-primary group-hover:bg-primary group-hover:text-white flex items-center justify-center mr-5 transition-all duration-500 group-hover:scale-110">
            <BiArrowBack className="text-2xl" />
          </span>
          <span className="group-hover:translate-x-2 transition-transform duration-300">Kembali ke Editorial Layanan</span>
        </Link>

        <div className="flex flex-col lg:flex-row gap-20 items-start">
          
          {/* Main Content Area */}
          <div className="lg:w-[62%] w-full" ref={contentRef}>
            
            {/* Hero Section */}
            <div ref={heroRef} className="mb-24 relative">
              <div className="flex items-center gap-8 mb-12 hero-stagger">
                <div className="w-28 h-28 md:w-36 md:h-36 bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center rounded-[3rem] shadow-[0_30px_50px_-20px_rgba(44,94,173,0.5)] transform -rotate-6 hover:rotate-0 hover:scale-105 transition-all duration-700 ease-out">
                  <Icon className="text-7xl md:text-8xl drop-shadow-xl" />
                </div>
                <div className="flex flex-col">
                  <span className="text-secondary font-black tracking-[0.4em] uppercase text-sm mb-3 drop-shadow-sm bg-white/50 px-4 py-1.5 rounded-full inline-block border border-secondary/20">
                    Layanan Eksklusif
                  </span>
                  <div className="flex gap-2">
                    {[1,2,3,4,5].map((i) => (
                      <BiStar key={i} className="text-accent text-2xl drop-shadow-sm" />
                    ))}
                  </div>
                </div>
              </div>
              
              <h1 className="hero-stagger text-5xl md:text-7xl lg:text-[5.5rem] font-black text-slate-900 tracking-tighter leading-[1.05] mb-10">
                {service.title.split(' ').map((word, i) => (
                  <span key={i} className={i % 2 !== 0 ? "text-primary font-serif italic font-normal pr-4 inline-block transform hover:-translate-y-2 transition-transform duration-300" : "pr-4 inline-block"}>
                    {word}
                  </span>
                ))}
              </h1>
              
              <p className="hero-stagger text-2xl md:text-3xl text-slate-600 leading-[1.5] font-medium max-w-3xl border-l-4 border-accent pl-8">
                {service.fullDescription || service.description}
              </p>
            </div>

            {/* Editorial Interactive Tabs */}
            <div className="sticky top-20 z-40 bg-[#FAF9F6]/90 backdrop-blur-2xl border-b border-slate-300/50 mb-20 hidden md:block rounded-t-3xl pt-6 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.05)]">
              <div className="flex space-x-14 px-8">
                {[
                  { id: "overview", label: "Overview", icon: BiInfoCircle },
                  { id: "benefits", label: "Keunggulan", icon: BiStar },
                  { id: "process", label: "Cara Order", icon: BiBarChartSquare },
                  { id: "faq", label: "FAQ", icon: BiChat }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`pb-6 flex items-center gap-3 font-black uppercase tracking-[0.2em] text-sm transition-all relative overflow-hidden group ${
                      activeTab === tab.id 
                        ? "text-primary" 
                        : "text-slate-400 hover:text-slate-800"
                    }`}
                  >
                    <tab.icon className={`text-2xl transition-transform duration-500 ${activeTab === tab.id ? 'scale-110' : 'group-hover:scale-110'}`} />
                    {tab.label}
                    
                    {/* Hover indicator */}
                    <div className={`absolute bottom-0 left-0 w-full h-1 bg-secondary transform origin-left transition-transform duration-300 ${activeTab === tab.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'}`} />
                    
                    {activeTab === tab.id && (
                      <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-1.5 bg-primary rounded-t-full shadow-[0_0_15px_rgba(44,94,173,0.6)]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Sections */}
            <div className="min-h-[700px] relative">
              <AnimatePresence mode="wait">
                
                {/* OVERVIEW TAB */}
                {activeTab === "overview" && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="space-y-24"
                  >
                    {/* Key Features (Organic Glassmorphism Cards) */}
                    <div className="relative">
                      <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-14 flex items-center gap-4">
                        Fitur <span className="font-serif italic text-primary font-normal">Utama</span>
                      </h3>
                      <div className="grid md:grid-cols-2 gap-10">
                        {service.features?.map((item, idx) => (
                          <div key={idx} className="bg-white/80 backdrop-blur-md p-10 rounded-[3rem] shadow-[0_15px_50px_-20px_rgba(0,0,0,0.05)] flex flex-col items-start gap-6 group hover:-translate-y-4 transition-all duration-500 border border-white hover:border-muted/50 hover:shadow-xl hover:shadow-primary/10">
                            <div className="w-20 h-20 rounded-full bg-muted/30 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-500 shadow-inner">
                              <BiCheckCircle className="text-4xl" />
                            </div>
                            <span className="text-2xl text-slate-800 font-bold leading-relaxed">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Stats Editorial Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                      {[
                        { icon: BiTrophy, value: "100%", label: "Kualitas", bg: "bg-primary", text: "text-white" },
                        { icon: BiTimeFive, value: "24/7", label: "Dukungan", bg: "bg-white", text: "text-primary" },
                        { icon: BiShieldAlt2, value: "Aman", label: "Garansi", bg: "bg-secondary", text: "text-white" },
                        { icon: BiUserVoice, value: "5.0", label: "Rating", bg: "bg-accent", text: "text-white" }
                      ].map((stat, i) => (
                        <div key={i} className={`${stat.bg} ${stat.text} p-10 rounded-[3rem] text-center hover:scale-105 hover:-translate-y-2 transition-all duration-500 shadow-xl ${stat.bg === 'bg-white' ? 'shadow-slate-200/60 border border-slate-100' : 'shadow-' + stat.bg.split('-')[1] + '/40 border border-white/20'}`}>
                          <stat.icon className={`text-6xl mx-auto mb-8 ${stat.bg === 'bg-white' ? 'text-primary' : 'text-white/90 drop-shadow-md'}`} />
                          <div className="text-5xl font-black mb-3 tracking-tighter">{stat.value}</div>
                          <div className={`text-sm uppercase tracking-[0.2em] font-bold ${stat.bg === 'bg-white' ? 'text-slate-500' : 'text-white/80'}`}>{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* BENEFITS TAB */}
                {activeTab === "benefits" && (
                  <motion.div
                    key="benefits"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="space-y-20"
                  >
                    <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-14">
                      Keuntungan <span className="font-serif italic text-primary font-normal">Layanan</span>
                    </h3>
                    <div className="grid md:grid-cols-2 gap-10">
                      {(service.benefits?.length ? service.benefits : [
                        "Hasil 100% original, bebas plagiasi (dengan bukti Turnitin)",
                        "Dikerjakan oleh penulis ahli sesuai bidang studi",
                        "Format sesuai dengan panduan kampus Anda",
                        "Revisi gratis jika ada perbaikan minor",
                        "Kerahasiaan data dan tugas terjamin"
                      ]).map((item, idx) => (
                        <div key={idx} className="bg-white p-12 rounded-[3.5rem] shadow-[0_15px_50px_-20px_rgba(0,0,0,0.06)] hover:shadow-[0_30px_60px_-20px_rgba(44,94,173,0.2)] transition-all duration-700 group relative overflow-hidden border border-slate-100 hover:border-secondary/30">
                          <div className="absolute -top-16 -right-16 w-56 h-56 bg-muted/20 rounded-full group-hover:scale-[2.5] transition-transform duration-1000 ease-in-out" />
                          <div className="relative z-10 flex flex-col gap-8">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-secondary to-accent text-white flex items-center justify-center shadow-xl shadow-secondary/30 transform group-hover:rotate-12 transition-transform duration-500">
                              <BiShieldQuarter className="text-5xl" />
                            </div>
                            <span className="text-3xl text-slate-800 font-bold leading-tight group-hover:text-primary transition-colors">
                              {item}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* PROCESS TAB (Cara Order - Interactive) */}
                {activeTab === "process" && (
                  <motion.div
                    key="process"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="space-y-20"
                  >
                    <div className="text-center md:text-left mb-16">
                      <span className="inline-block px-5 py-2 bg-accent/10 text-primary font-bold uppercase tracking-[0.2em] text-sm rounded-full mb-6">Simple & Fast</span>
                      <h3 className="text-5xl md:text-6xl font-black text-slate-900">
                        Cara <span className="font-serif italic text-primary font-normal">Order</span>
                      </h3>
                    </div>

                    <div className="relative pt-10 pb-10">
                      {/* Organic Wavy Connector */}
                      <div className="absolute left-[4rem] md:left-[50%] top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent to-secondary transform md:-translate-x-1/2 opacity-20 rounded-full" />
                      
                      <div className="space-y-32 relative z-10">
                        {[
                          { step: "01", title: "KONSULTASI AWAL", desc: "Klik tombol WhatsApp, sampaikan brief, deadline, dan kriteria tugas Anda ke tim admin CS kami yang super responsif.", icon: BiMessageRoundedDots, color: "text-primary" },
                          { step: "02", title: "DEAL & PEMBAYARAN", desc: "Kami akan berikan estimasi biaya & timeline. Setelah sepakat, lakukan pembayaran DP 50% untuk memulai progres.", icon: BiCreditCardFront, color: "text-secondary" },
                          { step: "03", title: "PROSES PENGERJAAN", desc: "Tim spesialis kami akan langsung mengeksekusi tugas sesuai instruksi dan memastikan kualitas standar akademik tertinggi.", icon: BiBriefcase, color: "text-accent" },
                          { step: "04", title: "HASIL & REVISI", desc: "Draft dikirim untuk direview. Lakukan pelunasan setelah revisi (jika ada) selesai dan Anda 100% puas dengan hasilnya.", icon: BiCheckCircle, color: "text-emerald-500" }
                        ].map((item, i) => (
                          <div key={i} ref={(el) => { processStepsRef.current[i] = el }} className={`flex flex-col md:flex-row items-center gap-10 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                            
                            {/* Card Content */}
                            <div className={`md:w-1/2 w-full flex ${i % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                              <div className="bg-white/90 backdrop-blur-lg p-12 rounded-[3.5rem] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.08)] hover:-translate-y-3 transition-all duration-500 w-full md:w-[95%] border border-slate-100 ml-28 md:ml-0 group hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10">
                                <div className={`w-20 h-20 rounded-[2rem] bg-slate-50 flex items-center justify-center mb-8 shadow-inner ${item.color}`}>
                                  <item.icon className="text-5xl group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <h4 className="text-3xl lg:text-4xl font-black mb-5 text-slate-900 tracking-tight group-hover:text-primary transition-colors">{item.title}</h4>
                                <p className="text-slate-600 font-medium text-xl lg:text-2xl leading-relaxed">{item.desc}</p>
                              </div>
                            </div>

                            {/* Center Node */}
                            <div className="absolute left-8 md:static md:flex w-28 h-28 bg-gradient-to-br from-primary to-secondary text-white rounded-[2.5rem] flex items-center justify-center font-serif font-black text-4xl shadow-[0_0_0_15px_rgba(250,249,246,1)] z-10 mx-auto shrink-0 transform rotate-12 group-hover:rotate-0 transition-transform">
                              {item.step}
                            </div>
                            
                            <div className="hidden md:block md:w-1/2" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* FAQ TAB */}
                {activeTab === "faq" && (
                  <motion.div
                    key="faq"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="space-y-16"
                  >
                    <div className="mb-14">
                      <span className="inline-block px-5 py-2 bg-secondary/10 text-secondary font-bold uppercase tracking-[0.2em] text-sm rounded-full mb-6">FAQ</span>
                      <h3 className="text-4xl md:text-5xl font-black text-slate-900">
                        Pertanyaan <span className="font-serif italic text-primary font-normal">Umum</span>
                      </h3>
                    </div>
                    
                    <div className="space-y-8">
                      {generalFaqs.map((faq, i) => (
                        <div 
                          key={i} 
                          className="bg-white rounded-[2.5rem] overflow-hidden transition-all duration-500 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-xl hover:shadow-primary/10 hover:border-muted"
                        >
                          <button
                            onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                            className="w-full p-10 lg:p-12 flex items-center justify-between text-left focus:outline-none group"
                          >
                            <span className="text-2xl md:text-3xl font-black text-slate-900 pr-8 group-hover:text-primary transition-colors leading-tight">{faq.q}</span>
                            <span className={`w-16 h-16 shrink-0 rounded-full flex items-center justify-center transition-all duration-500 ${activeFaq === i ? 'bg-primary text-white rotate-180 shadow-lg shadow-primary/30' : 'bg-slate-50 text-slate-400 group-hover:bg-muted group-hover:text-primary'}`}>
                              <BiChevronDown className="text-4xl" />
                            </span>
                          </button>
                          
                          <AnimatePresence>
                            {activeFaq === i && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                              >
                                <div className="px-10 lg:px-12 pb-12 pt-0 text-slate-600 text-xl lg:text-2xl leading-relaxed font-medium">
                                  <div className="w-16 h-1 bg-accent/30 rounded-full mb-6" />
                                  {faq.a}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Editorial Curved SVG Divider */}
            <div className="w-full py-24 flex justify-center opacity-30">
              <svg width="200" height="40" viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 20C50 20 50 0 100 0C150 0 150 20 200 20C150 20 150 40 100 40C50 40 50 20 0 20Z" fill="#1591DC" />
              </svg>
            </div>

            {/* Payment Methods Section (Interactive SVGs) */}
            <div className="mb-24 bg-white p-12 md:p-16 rounded-[4rem] shadow-2xl shadow-slate-200/50 border border-slate-100">
              <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8 text-center md:text-left">
                <div>
                  <span className="inline-block px-5 py-2 bg-emerald-100 text-emerald-700 font-bold uppercase tracking-[0.2em] text-sm rounded-full mb-6">Verified</span>
                  <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                    Metode Pembayaran <span className="font-serif italic text-primary">Aman</span>
                  </h3>
                </div>
                <BiShieldQuarter className="text-6xl text-emerald-500 opacity-20 hidden md:block" />
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                {paymentMethods.map((pm, i) => (
                  <div key={i} className="h-32 bg-slate-50 rounded-[2.5rem] border-2 border-transparent hover:border-primary/20 hover:bg-white flex items-center justify-center p-6 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(44,94,173,0.15)] grayscale hover:grayscale-0 transition-all duration-500 hover:-translate-y-2 cursor-pointer group">
                    <div className="group-hover:scale-110 transition-transform duration-500">
                      {pm.svg}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
          
          {/* Sticky Editorial Sidebar */}
          <div className="lg:w-[38%] w-full relative z-30">
            <div className="sticky top-28">
              
              {/* Premium Interactive Pricing Card */}
              <div ref={pricingCardRef} className="bg-white rounded-[3.5rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border-2 border-white relative group hover:border-muted transition-colors duration-700">
                
                {/* High-end Abstract Background */}
                <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-br from-primary via-secondary to-accent opacity-[0.15] group-hover:opacity-20 transition-opacity duration-700" />
                <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-accent/20 rounded-full blur-[40px] group-hover:scale-150 transition-transform duration-1000" />
                
                <div className="p-12 md:p-14 relative z-10">
                  <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm text-primary px-6 py-3 rounded-full text-sm font-black uppercase tracking-[0.25em] mb-10 border border-primary/10 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    Pesan Sekarang
                  </div>
                  
                  <h2 className="text-5xl md:text-6xl font-black mb-10 leading-[1.1] text-slate-900 tracking-tight">
                    <span className="font-serif italic text-primary font-normal">Investasi</span><br/>
                    Tugas Anda.
                  </h2>
                  
                  <div className="mb-14 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 group-hover:bg-primary/5 transition-colors duration-500">
                    <p className="text-slate-500 text-sm font-bold uppercase tracking-[0.2em] mb-4">Estimasi Biaya</p>
                    <p className="text-5xl lg:text-6xl font-black text-primary tracking-tighter">{service.price}</p>
                    <p className="text-slate-400 mt-4 text-sm font-medium">
                      *Harga disesuaikan dengan tingkat kesulitan dan deadline.
                    </p>
                  </div>
                  
                  <div className="space-y-8 mb-16">
                    <div className="flex items-center gap-6 text-slate-700">
                      <div className="w-14 h-14 rounded-[1.5rem] bg-white flex items-center justify-center shrink-0 shadow-sm border border-slate-100 group-hover:border-primary/20 group-hover:text-primary transition-colors">
                        <BiTimeFive className="text-3xl" />
                      </div>
                      <span className="font-bold text-xl">Selesai: {service.deliveryTime || "1-3 Hari"}</span>
                    </div>
                    <div className="flex items-center gap-6 text-slate-700">
                      <div className="w-14 h-14 rounded-[1.5rem] bg-white flex items-center justify-center shrink-0 shadow-sm border border-slate-100 group-hover:border-secondary/20 group-hover:text-secondary transition-colors">
                        <BiFileBlank className="text-3xl" />
                      </div>
                      <span className="font-bold text-xl">Format: PDF / DOCX / PPT</span>
                    </div>
                    <div className="flex items-center gap-6 text-slate-700">
                      <div className="w-14 h-14 rounded-[1.5rem] bg-white flex items-center justify-center shrink-0 shadow-sm border border-slate-100 group-hover:border-emerald-500/20 group-hover:text-emerald-500 transition-colors">
                        <BiShieldQuarter className="text-3xl" />
                      </div>
                      <span className="font-bold text-xl">Privasi Klien Terjamin 100%</span>
                    </div>
                  </div>
                  
                  <a 
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-full flex items-center justify-center gap-4 bg-slate-900 hover:bg-primary text-white py-8 px-10 rounded-full font-black text-2xl transition-all duration-500 overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_40px_-15px_rgba(44,94,173,0.5)] group/btn hover:-translate-y-1"
                  >
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-shimmer" />
                    <BiLogoWhatsapp className="text-5xl group-hover/btn:scale-125 transition-transform duration-500" />
                    KONSULTASI
                    <BiRightArrowAlt className="text-4xl group-hover/btn:translate-x-3 transition-transform duration-500 absolute right-8" />
                  </a>
                  
                  <div className="flex items-center justify-center gap-4 mt-10 text-slate-500 font-bold text-lg bg-slate-50 py-4 px-6 rounded-full">
                    <span className="relative flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
                    </span>
                    Admin Online - Fast Response
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Floating Modern WA Button for both Mobile & Desktop (right aligned) */}
      <div className="fixed bottom-10 right-10 z-[100]">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4"
        >
          {/* Tooltip */}
          <div className="hidden lg:flex items-center opacity-0 group-hover:opacity-100 group-hover:-translate-x-4 transition-all duration-500 pointer-events-none">
            <div className="bg-white text-slate-800 font-black px-6 py-4 rounded-2xl shadow-2xl border border-slate-100 text-lg whitespace-nowrap">
              Chat untuk Diskusi Tugas 👋
            </div>
            <div className="w-0 h-0 border-y-[10px] border-y-transparent border-l-[12px] border-l-white ml-[-1px]"></div>
          </div>
          
          <div className="w-24 h-24 bg-slate-900 text-white rounded-[2.5rem] flex items-center justify-center shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:scale-110 hover:bg-emerald-500 transition-all duration-500 hover:rounded-[2rem] border-4 border-white/50 backdrop-blur-sm hover:shadow-[0_20px_50px_rgba(16,185,129,0.4)] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 group-hover:animate-shimmer" />
            <BiLogoWhatsapp className="text-6xl drop-shadow-md relative z-10 group-hover:scale-110 transition-transform duration-500" />
            
            {/* Notification Dot */}
            <div className="absolute top-4 right-4 w-5 h-5 bg-red-500 rounded-full border-4 border-slate-900 group-hover:border-emerald-500 transition-colors" />
          </div>
        </a>
      </div>
    </div>
  );
}
  
