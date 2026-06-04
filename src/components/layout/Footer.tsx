"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, ArrowUpRight, Send } from "lucide-react"
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
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "https://twitter.com/selesainaja",
    hoverClass: "hover:bg-[#000000]",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 5.942zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@selesainaja",
    hoverClass: "hover:bg-[#FF0000]",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/selesainaja",
    hoverClass: "hover:bg-[#0A66C2]",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
]

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-[#0F1C3F] via-[#172554] to-[#1E3A8A] text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#1591DC]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#4BB8FA]/10 rounded-full blur-3xl translate-x-1/4 translate-y-1/4 pointer-events-none" />
      
      {/* Grid dot pattern */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "28px 28px"
        }}
      />

      <div className="container-custom relative z-10 pt-16 pb-0">
        {/* Newsletter Banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 mb-16 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="text-lg md:text-xl font-black text-white mb-1">Dapatkan Update & Promo Terbaru! 🎉</h3>
            <p className="text-white/60 text-sm">Subscribe newsletter kami dan nikmati diskon eksklusif setiap minggu.</p>
          </div>
          <div className="flex w-full md:w-auto gap-2 shrink-0">
            <input
              type="email"
              placeholder="email@kamu.com"
              className="flex-1 md:w-64 bg-white/10 border border-white/20 text-white placeholder:text-white/40 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#4BB8FA] transition-colors"
            />
            <button className="bg-[#1591DC] hover:bg-[#0d7ab5] text-white rounded-xl px-4 py-2.5 font-bold text-sm flex items-center gap-2 transition-colors shrink-0">
              <Send className="w-4 h-4" /> Kirim
            </button>
          </div>
        </motion.div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center group mb-6">
              <Image 
                src="/images/Logo.png" 
                alt="SelesainAja Logo" 
                width={200} 
                height={50} 
                className="h-10 md:h-12 w-auto object-contain group-hover:scale-105 transition-transform origin-left brightness-0 invert" 
              />
            </Link>
            <p className="text-sm text-white/55 max-w-xs mb-6 leading-relaxed">
              Platform jasa pengerjaan tugas akademik profesional #1 Indonesia. Tim ahli, kualitas terjamin, harga transparan.
            </p>
            
            {/* Contact info */}
            <div className="space-y-3">
              {[
                { icon: Mail, text: "support@selesainaja.com" },
                { icon: Phone, text: "0812-XXXX-XXXX" },
                { icon: MapPin, text: "Jakarta, Indonesia" },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-white/55 group">
                  <div className="w-8 h-8 rounded-lg bg-white/8 flex items-center justify-center group-hover:bg-[#1591DC]/30 transition-colors shrink-0">
                    <Icon className="w-3.5 h-3.5 text-[#4BB8FA]" />
                  </div>
                  <span className="group-hover:text-white/80 transition-colors">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Layanan */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-black text-white/40 uppercase tracking-[0.15em] mb-5">Layanan</h4>
            <ul className="space-y-3">
              {services.slice(0, 6).map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#1591DC] group-hover:scale-150 transition-transform" />
                    {link.title}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-1 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Perusahaan */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-black text-white/40 uppercase tracking-[0.15em] mb-5">Perusahaan</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#1591DC] group-hover:scale-150 transition-transform" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-black text-white/40 uppercase tracking-[0.15em] mb-5">Legal & Bantuan</h4>
            <ul className="space-y-3 mb-8">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#1591DC] group-hover:scale-150 transition-transform" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2">
              {["100% Aman", "Bebas Plagiasi", "Garansi Revisi"].map((badge) => (
                <span key={badge} className="text-[10px] font-bold text-[#4BB8FA] bg-[#1591DC]/15 border border-[#1591DC]/30 px-2.5 py-1 rounded-full">
                  ✓ {badge}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/35 text-center sm:text-left">
            © {new Date().getFullYear()} SelesainAja. Dibuat dengan ❤️ di Indonesia. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={`w-9 h-9 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center text-white/60 hover:text-white ${social.hoverClass} hover:border-transparent transition-all duration-300 hover:scale-110`}
              >
                {social.svg}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
