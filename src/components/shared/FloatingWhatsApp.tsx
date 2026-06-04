"use client"

import { RiWhatsappLine } from "react-icons/ri"
import { motion } from "framer-motion"

export function FloatingWhatsApp() {
  return (
    <motion.a
      href="https://wa.me/6281112345678"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
      className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-2xl hover:bg-[#20bd5a] hover:-translate-y-1 transition-all duration-300 group"
      aria-label="Chat WhatsApp"
    >
      <RiWhatsappLine className="w-9 h-9" />
      <span className="absolute flex h-full w-full">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-40"></span>
      </span>
      {/* Tooltip */}
      <span className="absolute right-20 bg-slate-900 text-white text-sm font-semibold py-2 px-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Pesan Sekarang
      </span>
    </motion.a>
  )
}
