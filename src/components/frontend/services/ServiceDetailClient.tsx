"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { 
  RiHomeLine, 
  RiArrowRightSLine,
  RiCheckLine,
  RiArrowRightLine,
  RiTimeLine,
  RiSecurePaymentLine
} from "react-icons/ri";
import {
  BiChevronDown,
  BiMessageRoundedDots,
  BiCreditCardFront,
  BiBriefcase,
  BiCheckCircle,
  BiLogoWhatsapp
} from "react-icons/bi";
import { notFound } from "next/navigation";
import posthog from "posthog-js";
import { PageHeader } from "@/components/layout/PageHeader";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const generalFaqs = [
  { q: "Apakah kerahasiaan data saya terjamin?", a: "Tentu saja! Keamanan dan privasi Anda adalah prioritas absolut kami. Kami menggunakan protokol keamanan tingkat tinggi dan semua file serta identitas klien akan dihapus setelah project dinyatakan selesai tanpa jejak publikasi." },
  { q: "Bagaimana jika hasil tidak sesuai harapan?", a: "Kami menyediakan garansi revisi gratis sesuai dengan brief awal yang telah disepakati. Kepuasan Anda adalah yang utama, tim kami siap menyesuaikan draft hingga Anda 100% puas." },
  { q: "Apakah bisa request format spesifik dari kampus?", a: "Pasti! Anda cukup mengirimkan pedoman penulisan atau template spesifik dari institusi/kampus Anda, dan penulis ahli kami akan mengikutinya secara sangat presisi mulai dari font, margin, hingga cara sitasi." },
  { q: "Siapa yang mengerjakan tugas saya?", a: "Setiap project ditangani oleh tim ahli yang terdiri dari akademisi, praktisi industri, dan penulis tersertifikasi. Mereka diseleksi secara ketat sesuai dengan latar belakang dan spesialisasi keilmuan yang relevan dengan tugas Anda." },
  { q: "Apakah saya bisa memantau progres pengerjaan?", a: "Ya, Anda bisa selalu menghubungi admin CS kami yang responsif via WhatsApp untuk menanyakan progres dari tugas yang sedang dikerjakan. Kami menjamin transparansi di setiap tahap." },
];

export default function ServiceDetailClient({
  service,
}: {
  service: any;
}) {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!service) return
    posthog.capture("service_detail_viewed", {
      service_name: service.name || service.title,
      service_slug: service.slug,
      service_price: service.priceDisplay || service.price,
    })
  }, [])
  
  useGSAP(() => {
    // Clean fade-up animation for all sections
    const sections = gsap.utils.toArray('.animate-section');
    sections.forEach((sec: any) => {
      gsap.fromTo(sec, 
        { y: 40, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sec,
            start: "top 85%",
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.1
        }
      );
    });
  }, { scope: containerRef });

  if (!service) return notFound();

  const whatsappText = encodeURIComponent(
    `Halo Admin SelesainAja, saya tertarik dan ingin konsultasi mengenai layanan "${service.name || service.title}". Boleh minta informasi lebih lanjut?`
  );
  const whatsappUrl = `https://wa.me/6281112345678?text=${whatsappText}`;
  const displayTitle = service.name || service.title;
  const slug = service.slug;

  // Determine a relevant image based on the slug
  let heroImage = "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?q=80&w=1200&auto=format&fit=crop";
  if (slug === 'jurnal' || slug === 'skripsi') {
    heroImage = "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1200&auto=format&fit=crop"; // Book/Library
  } else if (slug === 'proposal' || slug === 'essay') {
    heroImage = "https://images.unsplash.com/photo-1455390582262-044cdead2708?q=80&w=1200&auto=format&fit=crop"; // Writing
  } else if (slug === 'presentasi') {
    heroImage = "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200&auto=format&fit=crop"; // Presentation
  }

  return (
    <div ref={containerRef} className="bg-white min-h-screen selection:bg-slate-900 selection:text-white font-sans text-slate-800 pb-24">
      
      {/* ── BREADCRUMB & PAGE HEADER ─────────────────────────────── */}
      <PageHeader
        title={displayTitle}
        description={service.description}
        badge="Layanan Profesional"
        background="image"
        backgroundImage={heroImage}
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Layanan", href: "/services" },
          { label: displayTitle }
        ]}
      />

      {/* ── OVERVIEW SECTION ─────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-section">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-[1.2] mb-6">
              Lebih Dekat dengan Layanan <span className="text-blue-600">{displayTitle}</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              {service.fullDescription || service.shortDescription}
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => posthog.capture("service_consultation_clicked", { service_name: displayTitle, service_slug: slug })}
                className="w-full sm:w-auto bg-slate-900 text-white px-8 py-4 rounded-lg font-bold text-base hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 animate__animated animate__pulse animate__infinite animate__slower"
              >
                Konsultasi Gratis <RiArrowRightLine />
              </a>
            </div>
          </div>
          <div className="animate-section relative aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-slate-100">
            <Image 
              src={heroImage} 
              alt={displayTitle} 
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* ── FEATURES & PRICING SECTION ─────────────────────────────── */}
      <section id="features" className="bg-slate-50 border-y border-slate-200 py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Keunggulan (Left) */}
            <div className="lg:col-span-7 animate-section">
              <h2 className="text-3xl font-black text-slate-900 mb-10 tracking-tight">Apa Saja Keunggulannya?</h2>
              <div className="space-y-6">
                {service.benefits?.map((benefit: string, i: number) => (
                  <div key={i} className="flex items-start gap-4 p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0">
                      <RiCheckLine className="text-xl" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-1">Keunggulan {i + 1}</h4>
                      <p className="text-slate-600 leading-relaxed">{benefit}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Card (Right) */}
            <div className="lg:col-span-5 animate-section">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-8 sticky top-24">
                <div className="border-b border-slate-100 pb-6 mb-6">
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Investasi</p>
                  <p className="text-4xl font-black text-slate-900">{service.priceDisplay || service.price}</p>
                </div>
                
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">Yang Anda Dapatkan:</h4>
                <ul className="space-y-4 mb-8">
                  {service.features?.map((feat: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <RiCheckLine className="text-slate-900 text-xl shrink-0" />
                      <span className="text-slate-600 text-sm">{feat}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-3">
                    <RiTimeLine className="text-slate-900 text-xl shrink-0" />
                    <span className="text-slate-600 text-sm">Estimasi {service.deliveryTime || "1-3 Hari"}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <RiSecurePaymentLine className="text-slate-900 text-xl shrink-0" />
                    <span className="text-slate-600 text-sm">Privasi & Data Dijamin Aman</span>
                  </li>
                </ul>
                
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => posthog.capture("service_order_clicked", { service_name: displayTitle, service_slug: slug, service_price: service.priceDisplay || service.price })}
                  className="w-full block bg-slate-900 text-white py-4 rounded-lg font-bold text-center hover:bg-slate-800 transition-colors"
                >
                  Pesan Sekarang
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS (Timeline) ─────────────────────────────── */}
      <section className="py-20 lg:py-28 max-w-4xl mx-auto px-6 animate-section">
        <h2 className="text-3xl font-black text-slate-900 mb-12 tracking-tight text-center">Proses Pengerjaan</h2>
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
          {[
            { step: "01", title: "Konsultasi Brief", desc: "Hubungi admin via WhatsApp untuk diskusi detail tugas, format, dan deadline.", icon: BiMessageRoundedDots },
            { step: "02", title: "Pembayaran DP", desc: "Sepakati estimasi harga dan lakukan pembayaran uang muka (DP) 50%.", icon: BiCreditCardFront },
            { step: "03", title: "Proses Eksekusi", desc: "Penulis spesialis kami mengerjakan tugas sesuai standar akademik terbaik.", icon: BiBriefcase },
            { step: "04", title: "Hasil & Pelunasan", desc: "Draft dikirim untuk direview. Lakukan pelunasan jika tugas sudah 100% sempurna.", icon: BiCheckCircle },
          ].map((item, i) => (
            <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-slate-900 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <item.icon className="text-xl" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                <div className="text-xs font-bold text-slate-400 mb-1 tracking-widest">LANGKAH {item.step}</div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ SECTION ─────────────────────────────── */}
      <section className="bg-slate-50 border-t border-slate-200 py-20 lg:py-28 animate-section">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-black text-slate-900 mb-10 tracking-tight">Pertanyaan Umum</h2>
          <div className="border-t border-slate-200">
            {generalFaqs.map((faq, i) => (
              <div key={i} className="border-b border-slate-200">
                <button
                  onClick={() => {
                    const next = activeFaq === i ? null : i
                    setActiveFaq(next)
                    if (next !== null) posthog.capture("faq_expanded", { faq_question: faq.q, service_slug: slug })
                  }}
                  className="w-full py-6 flex items-center justify-between text-left gap-4 hover:text-slate-600 transition-colors focus:outline-none"
                >
                  <span className="text-lg font-bold text-slate-900">
                    {faq.q}
                  </span>
                  <BiChevronDown className={`text-2xl text-slate-400 transition-transform duration-300 ${activeFaq === i ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="pb-6 text-slate-600 leading-relaxed animate__animated animate__fadeIn">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}