"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, ArrowUpRight, Send, ArrowRight } from "lucide-react"
import { services } from "@/lib/constants"

const footerLinks = {
  company: [
    { name: "Tentang Kami", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Karir", href: "/careers" },
    { name: "Kontak", href: "/contact" },
  ],
  legal: [
    { name: "Syarat & Ketentuan", href: "/terms" },
    { name: "Kebijakan Privasi", href: "/privacy" },
    { name: "FAQ", href: "/faq" },
  ],
}

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com/selesainaja",
    hoverClass: "hover:bg-gradient-to-br hover:from-[#F77737] hover:to-[#C13584]",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "https://twitter.com/selesainaja",
    hoverClass: "hover:bg-[#000000]",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 5.942zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@selesainaja",
    hoverClass: "hover:bg-[#FF0000]",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/selesainaja",
    hoverClass: "hover:bg-[#0A66C2]",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
]

export function Footer() {
  return (
    <footer className="relative bg-[#0A0A0B] text-white overflow-hidden pt-20 md:pt-32 pb-8 border-t border-white/5">
      
      {/* Abstract Glowing Accent */}
      <div className="absolute top-0 right-1/4 w-[800px] h-[400px] bg-[#1591DC] rounded-full blur-[150px] opacity-[0.05] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#4BB8FA] rounded-full blur-[150px] opacity-[0.04] pointer-events-none" />

      <div className="container-custom relative z-10">
        
        {/* Top Massive CTA Area */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10 mb-20 pb-20 border-b border-white/10">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[1.05] mb-6 uppercase" style={{ fontFamily: "var(--font-batica)" }}>
              PUNYA <span className="text-[#1591DC]">TUGAS</span><br />
              YANG PERLU DIBERESIN?
            </h2>
            <p className="text-xl text-white/60 font-medium leading-relaxed">
              Tim ahli kami siap membantu Anda menyelesaikan tugas dengan cepat, rahasia, dan berkualitas tinggi.
            </p>
          </div>
          <a 
            href="https://wa.me/6281112345678" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-5 bg-white hover:bg-[#1591DC] text-[#0A0A0B] hover:text-white px-8 py-5 md:px-10 md:py-6 rounded-full font-black text-xl transition-all duration-300 hover:scale-[1.02] shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(21,145,220,0.3)] shrink-0"
          >
            HUBUNGI KAMI 
            <div className="w-12 h-12 rounded-full bg-[#0A0A0B]/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Link href="/" className="mb-10 block group">
              <Image 
                src="/images/Logo.png" 
                alt="SelesainAja Logo" 
                width={200} 
                height={50} 
                className="h-12 w-auto object-contain brightness-0 invert group-hover:opacity-80 transition-opacity" 
              />
            </Link>
            <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-sm font-medium">
              Platform jasa pengerjaan tugas akademik profesional #1 Indonesia. Tim ahli, kualitas terjamin, harga transparan.
            </p>
            <div className="space-y-4 w-full">
              {[
                { icon: Mail, text: "support@selesainaja.com" },
                { icon: Phone, text: "0812-XXXX-XXXX" },
                { icon: MapPin, text: "Jakarta, Indonesia" },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-center gap-4 text-white/70 group w-fit cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#1591DC] group-hover:border-[#1591DC] transition-colors shadow-sm">
                    <Icon className="w-5 h-5 group-hover:text-white text-[#4BB8FA] transition-colors" />
                  </div>
                  <span className="font-semibold text-base group-hover:text-white transition-colors">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Links: Layanan */}
          <div className="lg:col-span-3 lg:col-start-6">
            <h4 className="text-sm font-black text-white uppercase tracking-widest mb-8 flex items-center gap-3">
              <span className="w-2 h-2 bg-[#1591DC] rounded-full" /> Layanan
            </h4>
            <ul className="space-y-4">
              {services.slice(0, 5).map((link) => (
                <li key={link.title}>
                  <Link href={link.href} className="text-white/60 hover:text-[#4BB8FA] transition-colors font-medium flex items-center gap-3 group text-lg">
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-7 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[#1591DC]" />
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links: Perusahaan */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-black text-white uppercase tracking-widest mb-8 flex items-center gap-3">
              <span className="w-2 h-2 bg-[#1591DC] rounded-full" /> Perusahaan
            </h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/60 hover:text-[#4BB8FA] transition-colors font-medium flex items-center gap-3 group text-lg">
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-7 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[#1591DC]" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links: Legal */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-black text-white uppercase tracking-widest mb-8 flex items-center gap-3">
              <span className="w-2 h-2 bg-[#1591DC] rounded-full" /> Legal
            </h4>
            <ul className="space-y-4 mb-10">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/60 hover:text-[#4BB8FA] transition-colors font-medium flex items-center gap-3 group text-lg">
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-7 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[#1591DC]" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3">
              <span className="text-xs font-black tracking-wider text-[#4BB8FA] bg-[#1591DC]/10 border border-[#1591DC]/20 px-4 py-2 rounded-full inline-flex items-center w-fit gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4BB8FA]" /> 100% AMAN
              </span>
              <span className="text-xs font-black tracking-wider text-[#4BB8FA] bg-[#1591DC]/10 border border-[#1591DC]/20 px-4 py-2 rounded-full inline-flex items-center w-fit gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4BB8FA]" /> BEBAS PLAGIASI
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Giant Text & Copyright */}
        <div className="border-t border-white/10 pt-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <p className="text-base text-white/40 font-medium">
            © {new Date().getFullYear()} SelesainAja. Dibuat di Indonesia.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={`w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white ${social.hoverClass} hover:border-transparent transition-all duration-300 hover:scale-110 shadow-sm`}
              >
                {social.svg}
              </a>
            ))}
          </div>
        </div>
        
        {/* Massive Watermark */}
        <div className="mt-16 text-center overflow-hidden select-none pointer-events-none opacity-[0.02] flex justify-center">
          <h1 className="text-[13vw] font-black uppercase tracking-tighter leading-none whitespace-nowrap" style={{ fontFamily: "var(--font-batica)" }}>
            SELESAINAJA
          </h1>
        </div>

      </div>
    </footer>
  )
}
