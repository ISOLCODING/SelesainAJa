"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { RiHomeLine, RiArrowRightSLine } from "react-icons/ri";
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
} from "react-icons/bi";
import { services } from "@/lib/constants";
import { notFound } from "next/navigation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const paymentMethods = [
  {
    name: "BCA",
    svg: (
      <svg viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-auto">
        <path d="M15 5H45V25H15V5Z" fill="#005DAA" />
        <text x="50" y="22" fontFamily="Arial, sans-serif" fontSize="22" fill="#005DAA" fontWeight="900" fontStyle="italic">BCA</text>
        <circle cx="25" cy="15" r="5" fill="white" />
      </svg>
    ),
  },
  {
    name: "BRI",
    svg: (
      <svg viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-auto">
        <path d="M10 10H30V25H10V10Z" fill="#00529C" />
        <path d="M20 5L30 15H10L20 5Z" fill="#F37021" />
        <text x="40" y="22" fontFamily="Arial, sans-serif" fontSize="22" fill="#00529C" fontWeight="900">BRI</text>
      </svg>
    ),
  },
  {
    name: "Bank DKI",
    svg: (
      <svg viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-auto">
        <rect x="5" y="5" width="20" height="20" fill="#D32F2F" rx="4" />
        <circle cx="15" cy="15" r="5" fill="white" />
        <text x="35" y="22" fontFamily="Arial, sans-serif" fontSize="20" fill="#D32F2F" fontWeight="900">Bank DKI</text>
      </svg>
    ),
  },
  {
    name: "SeaBank",
    svg: (
      <svg viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-auto">
        <circle cx="15" cy="15" r="12" fill="#FF7043" />
        <path d="M10 15C10 12 15 10 20 15C25 20 20 22 15 15Z" fill="white" stroke="white" strokeWidth="2" />
        <text x="35" y="22" fontFamily="Arial, sans-serif" fontSize="20" fill="#FF7043" fontWeight="900">SeaBank</text>
      </svg>
    ),
  },
  {
    name: "DANA",
    svg: (
      <svg viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-auto">
        <path d="M10 5H30C40 5 45 10 45 15C45 20 40 25 30 25H10V5Z" fill="#118EE9" />
        <text x="50" y="22" fontFamily="Arial, sans-serif" fontSize="22" fill="#118EE9" fontWeight="900">DANA</text>
      </svg>
    ),
  },
  {
    name: "GoPay",
    svg: (
      <svg viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-auto">
        <circle cx="20" cy="15" r="10" fill="#00AED6" />
        <circle cx="20" cy="15" r="5" fill="white" />
        <text x="35" y="22" fontFamily="Arial, sans-serif" fontSize="20" fill="#00AED6" fontWeight="900">gopay</text>
      </svg>
    ),
  },
];

const generalFaqs = [
  { q: "Apakah kerahasiaan data saya terjamin?", a: "Tentu saja! Keamanan dan privasi Anda adalah prioritas absolut kami. Kami menggunakan protokol keamanan tingkat tinggi dan semua file serta identitas klien akan dihapus setelah project dinyatakan selesai tanpa jejak publikasi." },
  { q: "Bagaimana jika hasil tidak sesuai harapan?", a: "Kami menyediakan garansi revisi gratis sesuai dengan brief awal yang telah disepakati. Kepuasan Anda adalah yang utama, tim kami siap menyesuaikan draft hingga Anda 100% puas." },
  { q: "Apakah bisa request format spesifik dari kampus?", a: "Pasti! Anda cukup mengirimkan pedoman penulisan atau template spesifik dari institusi/kampus Anda, dan penulis ahli kami akan mengikutinya secara sangat presisi mulai dari font, margin, hingga cara sitasi." },
  { q: "Siapa yang mengerjakan tugas saya?", a: "Setiap project ditangani oleh tim ahli yang terdiri dari akademisi, praktisi industri, dan penulis tersertifikasi. Mereka diseleksi secara ketat sesuai dengan latar belakang dan spesialisasi keilmuan yang relevan dengan tugas Anda." },
  { q: "Apakah saya bisa memantau progres pengerjaan?", a: "Ya, Anda bisa selalu menghubungi admin CS kami yang responsif via WhatsApp untuk menanyakan progres dari tugas yang sedang dikerjakan. Kami menjamin transparansi di setiap tahap." },
];

export default function ServiceDetailClient({
  slug,
  serviceTitle,
}: {
  slug: string;
  serviceTitle?: string;
}) {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [isMounted, setIsMounted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<(HTMLDivElement | null)[]>([]);
  const bentoRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useGSAP(
    () => {
      if (!containerRef.current || !isMounted) return;

      // Ambient blobs
      blobsRef.current.forEach((blob, i) => {
        if (!blob) return;
        gsap.to(blob, {
          y: i % 2 === 0 ? -60 : 60,
          x: i % 2 === 0 ? 40 : -40,
          rotation: i % 2 === 0 ? 30 : -30,
          duration: 10 + i * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
        gsap.to(blob, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 2,
          },
          y: (i + 1) * 120,
          rotation: (i + 1) * 60,
        });
      });

      // Bento UI Entrance Animation
      gsap.fromTo(
        bentoRefs.current.filter(Boolean),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    },
    { scope: containerRef, dependencies: [isMounted] }
  );

  const service = services.find((s) => s.href === `/services/${slug}`);
  if (!service) return notFound();

  const Icon = service.icon;
  const whatsappText = encodeURIComponent(
    `Halo Admin SelesainAja, saya tertarik dan ingin konsultasi mengenai layanan "${service.title}". Boleh minta informasi lebih lanjut?`
  );
  const whatsappUrl = `https://wa.me/6281112345678?text=${whatsappText}`;
  const displayTitle = serviceTitle || service.title || slug;

  return (
    <div
      ref={containerRef}
      className="bg-[#FAFAFA] min-h-screen selection:bg-primary selection:text-white relative overflow-hidden font-sans pb-24"
    >
      {/* ── Ambient Background Blobs ─────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          ref={(el) => { blobsRef.current[0] = el; }}
          className="absolute top-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-accent/20 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-[90px] mix-blend-multiply"
        />
        <div
          ref={(el) => { blobsRef.current[1] = el; }}
          className="absolute top-[30%] left-[-15%] w-[36rem] h-[36rem] bg-secondary/15 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-[100px] mix-blend-multiply"
        />
        <div
          ref={(el) => { blobsRef.current[2] = el; }}
          className="absolute bottom-[-10%] right-[5%] w-[44rem] h-[44rem] bg-primary/10 rounded-[50%_50%_20%_80%/25%_80%_20%_75%] blur-[120px] mix-blend-multiply"
        />
      </div>

      <div className="container-custom relative z-10 pt-20">
        {/* ── Breadcrumb & Navigation ─────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-sm font-medium w-fit py-3 px-5 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/60 shadow-sm"
          >
            <Link href="/" className="flex items-center gap-1 text-slate-400 hover:text-primary transition-colors">
              <RiHomeLine className="text-base" />
              <span className="hidden sm:inline">Beranda</span>
            </Link>
            <RiArrowRightSLine className="text-slate-300 shrink-0" />
            <Link href="/services" className="text-slate-400 hover:text-primary transition-colors hidden sm:inline">
              Layanan
            </Link>
            <RiArrowRightSLine className="text-slate-300 shrink-0 hidden sm:block" />
            <span className="text-primary font-bold truncate max-w-[180px]">{displayTitle}</span>
          </nav>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-primary font-bold transition-all duration-300 uppercase tracking-[0.15em] text-xs group bg-white/80 backdrop-blur-md py-3 px-5 rounded-2xl border border-slate-200/60 shadow-sm w-fit"
          >
            <BiArrowBack className="text-base group-hover:-translate-x-1 transition-transform" />
            Semua Layanan
          </Link>
        </div>

        {/* ── BENTO GRID LAYOUT ───────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* 1. HERO MAIN BLOCK (Span 8) */}
          <div 
            ref={(el) => { bentoRefs.current[0] = el; }}
            className="lg:col-span-8 bg-white p-8 lg:p-12 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col justify-center relative overflow-hidden group"
          > 
            <div className="flex items-center gap-6 mb-8 relative z-10">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center rounded-[2rem] shadow-lg shadow-primary/20 -rotate-3 group-hover:rotate-0 transition-transform duration-500 shrink-0">
                <Icon className="text-5xl md:text-6xl drop-shadow-sm" />
              </div>
              <div>
                <span className="text-secondary font-black tracking-[0.2em] uppercase text-xs bg-secondary/10 px-4 py-1.5 rounded-full inline-block mb-2">
                  Layanan Premium
                </span>
               
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-800 tracking-tight leading-[1.1] mb-6 relative z-10">
              {service.title.split(" ").map((word, i) => (
                <span
                  key={i}
                  className={i % 2 !== 0 ? "text-primary font-serif italic font-normal mr-3" : "mr-3"}
                >
                  {word}
                </span>
              ))}
            </h1>

            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl relative z-10 mb-8">
              {service.fullDescription || service.description}
            </p>

            <div className="grid sm:grid-cols-2 gap-4 relative z-10">
              {service.features?.slice(0, 4).map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <BiCheckCircle className="text-sm" />
                  </div>
                  <span className="text-sm font-semibold text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 2. PRICING & ACTION BLOCK (Span 4) */}
          <div 
            ref={(el) => { bentoRefs.current[1] = el; }}
            className="lg:col-span-4 bg-gradient-to-br from-primary to-secondary text-white p-8 lg:p-10 rounded-[2.5rem] shadow-[0_20px_40px_-15px_rgba(44,94,173,0.4)] flex flex-col justify-between relative overflow-hidden group hover:shadow-[0_20px_40px_-10px_rgba(44,94,173,0.6)] transition-shadow duration-500"
          >
            <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-white/20 rounded-full blur-[40px] group-hover:scale-150 transition-transform duration-700" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/15 text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-8 backdrop-blur-sm border border-white/20 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                Siap Dikerjakan
              </div>

              <h2 className="text-3xl lg:text-4xl font-black mb-6 leading-tight tracking-tight">
                <span className="font-serif italic text-white/90 font-normal">Investasi</span><br />
                Tugas Anda
              </h2>

              <div className="mb-8 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 group-hover:bg-white/15 transition-colors duration-400">
                <p className="text-white/80 text-xs font-bold uppercase tracking-[0.2em] mb-2">Mulai Dari</p>
                <p className="text-4xl lg:text-5xl font-black text-white tracking-tight">{service.price}</p>
              </div>

              <div className="space-y-4 mb-8">
                {[
                  { icon: BiTimeFive, text: `Estimasi: ${service.deliveryTime || "1–3 Hari"}` },
                  { icon: BiFileBlank, text: "Format Lengkap Sesuai Brief" },
                  { icon: BiShieldQuarter, text: "Privasi 100% Terjamin" },
                ].map((row, i) => (
                  <div key={i} className="flex items-center gap-4 text-white/90">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                      <row.icon className="text-xl text-white" />
                    </div>
                    <span className="font-medium text-sm">{row.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-50 text-primary py-5 px-6 rounded-2xl font-black text-lg transition-all duration-400 shadow-xl group/btn hover:-translate-y-1"
            >
              <BiLogoWhatsapp className="text-3xl text-emerald-500" />
              PESAN SEKARANG
              <BiRightArrowAlt className="text-2xl group-hover/btn:translate-x-2 transition-transform duration-400" />
            </a>
          </div>

          {/* 3. TRUST STATS BENTO (Span 12, Nested Grid) */}
          <div className="lg:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {[
              { icon: BiTrophy, value: "100%", label: "Kualitas Grade A", bg: "bg-primary", text: "text-white" },
              { icon: BiShieldAlt2, value: "Zero", label: "Plagiarisme", bg: "bg-emerald-500", text: "text-white" },
              { icon: BiTimeFive, value: "24/7", label: "Support Aktif", bg: "bg-white", text: "text-slate-900" },
              { icon: BiUserVoice, value: "5.0", label: "Rating Klien", bg: "bg-secondary", text: "text-white" },
            ].map((stat, i) => (
              <div 
                key={i}
                ref={(el) => { bentoRefs.current[2 + i] = el; }}
                className={`${stat.bg} ${stat.text} p-6 md:p-8 rounded-[2rem] shadow-sm border ${stat.bg === 'bg-white' ? 'border-slate-100' : 'border-transparent'} flex flex-col items-center justify-center text-center group hover:-translate-y-1 transition-transform duration-300`}
              >
                <stat.icon className="text-4xl md:text-5xl mb-4 opacity-80 group-hover:scale-110 transition-transform duration-400" />
                <div className="text-3xl md:text-4xl font-black mb-1 tracking-tight">{stat.value}</div>
                <div className="text-xs uppercase tracking-[0.15em] font-bold opacity-70">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* 4. HOW IT WORKS BLOCK (Span 8) */}
          <div 
            ref={(el) => { bentoRefs.current[6] = el; }}
            className="lg:col-span-8 bg-white p-8 lg:p-12 rounded-[2.5rem] shadow-sm border border-slate-100 relative overflow-hidden"
          >
            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="inline-block px-4 py-1.5 bg-accent/10 text-primary font-bold uppercase tracking-[0.2em] text-xs rounded-full mb-3">
                  Simple & Fast
                </span>
                <h3 className="text-3xl md:text-4xl font-black text-slate-900">
                  Cara <span className="font-serif italic text-primary font-normal">Order</span>
                </h3>
              </div>
              <div className="hidden md:flex items-center gap-2 text-slate-400 font-medium text-sm bg-slate-50 px-4 py-2 rounded-full">
                <BiTimeFive className="text-lg" /> Pengerjaan Cepat
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
              {[
                { step: "01", title: "Konsultasi Brief", desc: "Hubungi admin via WhatsApp untuk diskusi detail tugas, format, dan deadline.", icon: BiMessageRoundedDots, color: "text-primary", bg: "bg-primary/10" },
                { step: "02", title: "Pembayaran DP", desc: "Sepakati estimasi harga dan lakukan pembayaran uang muka (DP) 50%.", icon: BiCreditCardFront, color: "text-secondary", bg: "bg-secondary/10" },
                { step: "03", title: "Proses Eksekusi", desc: "Penulis spesialis kami mengerjakan tugas sesuai standar akademik terbaik.", icon: BiBriefcase, color: "text-accent", bg: "bg-accent/10" },
                { step: "04", title: "Hasil & Revisi", desc: "Draft dikirim untuk review. Pelunasan dilakukan jika tugas sudah 100% sempurna.", icon: BiCheckCircle, color: "text-emerald-500", bg: "bg-emerald-500/10" },
              ].map((item, i) => (
                <div key={i} className="flex gap-5 group">
                  <div className={`w-14 h-14 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                    <item.icon className="text-2xl" />
                  </div>
                  <div>
                    <div className="text-xs font-black tracking-[0.2em] text-slate-300 mb-1">STEP {item.step}</div>
                    <h4 className="text-lg font-black text-slate-900 mb-2">{item.title}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5. PAYMENT METHODS (Span 4) */}
          <div 
            ref={(el) => { bentoRefs.current[7] = el; }}
            className="lg:col-span-4 bg-white p-8 lg:p-10 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col"
          >
            <div className="mb-8">
              <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 font-bold uppercase tracking-[0.2em] text-xs rounded-full mb-3">
                Verified
              </span>
              <h3 className="text-2xl md:text-3xl font-black text-slate-900">
                Metode <span className="font-serif italic text-primary font-normal">Bayar</span>
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4 flex-1 content-start">
              {paymentMethods.map((pm, i) => (
                <div
                  key={i}
                  className="h-16 bg-slate-50 rounded-2xl border border-slate-100 hover:border-primary/20 flex items-center justify-center p-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
                >
                  {pm.svg}
                </div>
              ))}
            </div>
          </div>

          {/* 6. FAQ ACCORDION (Span 12) */}
          <div 
            ref={(el) => { bentoRefs.current[8] = el; }}
            className="lg:col-span-12 bg-white p-8 lg:p-12 rounded-[2.5rem] shadow-sm border border-slate-100"
          >
            <div className="mb-10 text-center max-w-2xl mx-auto">
              <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary font-bold uppercase tracking-[0.2em] text-xs rounded-full mb-4">
                FAQ
              </span>
              <h3 className="text-3xl md:text-4xl font-black text-slate-900">
                Pertanyaan <span className="font-serif italic text-primary font-normal">Umum</span>
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
              {generalFaqs.map((faq, i) => (
                <div
                  key={i}
                  className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 hover:border-primary/20 transition-colors duration-300 h-fit"
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 group focus:outline-none"
                  >
                    <span className="text-base font-bold text-slate-800 group-hover:text-primary transition-colors leading-snug">
                      {faq.q}
                    </span>
                    <span className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center transition-transform duration-300 ${activeFaq === i ? "bg-primary text-white rotate-180" : "bg-white text-slate-400 group-hover:text-primary shadow-sm"}`}>
                      <BiChevronDown className="text-xl" />
                    </span>
                  </button>

                  <AnimatePresence>
                    {activeFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4 mt-2">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Floating WhatsApp Button ──────────────────────────────── */}
      <div className="fixed bottom-8 right-8 z-[100]">
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3">
          <div className="hidden lg:flex items-center opacity-0 group-hover:opacity-100 group-hover:-translate-x-2 transition-all duration-400 pointer-events-none">
            <div className="bg-white text-slate-800 font-bold px-5 py-3 rounded-2xl shadow-xl border border-slate-100 text-sm whitespace-nowrap">
              Chat untuk Diskusi Tugas 👋
            </div>
            <div className="w-0 h-0 border-y-[8px] border-y-transparent border-l-[10px] border-l-white ml-[-1px]" />
          </div>

          <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-[0_12px_30px_rgba(0,0,0,0.2)] hover:scale-110 hover:bg-emerald-500 transition-all duration-400 border-2 border-white/30 hover:shadow-[0_12px_30px_rgba(16,185,129,0.4)] relative overflow-hidden">
            <BiLogoWhatsapp className="text-4xl relative z-10 group-hover:scale-110 transition-transform duration-400 drop-shadow-sm" />
            <div className="absolute top-2.5 right-2.5 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-900 group-hover:border-emerald-500 transition-colors" />
          </div>
        </a>
      </div>
    </div>
  );
}