"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Users, CheckCircle2, Clock, Star } from "lucide-react"

const stats = [
  {
    value: 50,
    suffix: "+",
    label: "Tugas Selesai",
    sublabel: "Setiap harinya",
    icon: CheckCircle2,
    color: "#1591DC",
    bg: "from-[#1591DC]/10 to-[#4BB8FA]/5",
    border: "border-[#1591DC]/20",
  },
  {
    value: 10,
    suffix: "K+",
    label: "Klien Puas",
    sublabel: "Mahasiswa Indonesia",
    icon: Users,
    color: "#2C5EAD",
    bg: "from-[#2C5EAD]/10 to-[#1591DC]/5",
    border: "border-[#2C5EAD]/20",
  },
  {
    value: 99,
    suffix: "%",
    label: "Tepat Waktu",
    sublabel: "Sebelum deadline",
    icon: Clock,
    color: "#0EA5E9",
    bg: "from-[#0EA5E9]/10 to-[#38BDF8]/5",
    border: "border-[#0EA5E9]/20",
  },
  {
    value: 4.9,
    suffix: "/5",
    label: "Rating Klien",
    sublabel: "Berdasarkan ulasan",
    icon: Star,
    color: "#F59E0B",
    bg: "from-[#F59E0B]/10 to-[#FCD34D]/5",
    border: "border-[#F59E0B]/20",
  },
]

function AnimatedCounter({ target, suffix, color }: { target: number; suffix: string; color: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    const isDecimal = target % 1 !== 0
    const duration = 1800
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [isInView, target])

  return (
    <span ref={ref} style={{ color }}>
      {count}{suffix}
    </span>
  )
}

export function StatsSection() {
  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-br from-[#EFF6FF] via-[#F0F9FF] to-[#F8FAFC] overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#1591DC]/8 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#2C5EAD]/8 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[200px] bg-[#4BB8FA]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1591DC]/10 border border-[#1591DC]/20 text-[#1591DC] text-sm font-bold uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1591DC] animate-pulse" />
            Pencapaian Kami
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-[#0A0A0B] leading-tight">
            Angka yang <span className="text-[#1591DC]">Berbicara</span> Sendiri
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`relative group bg-white rounded-2xl p-6 md:p-8 border-2 ${stat.border} shadow-sm hover:shadow-xl hover:shadow-[#1591DC]/10 transition-all duration-500 overflow-hidden cursor-default`}
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />

              {/* Icon */}
              <div
                className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${stat.color}15` }}
              >
                <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
              </div>

              {/* Number */}
              <div className="relative z-10 text-4xl md:text-5xl font-black mb-1 leading-none tabular-nums">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} color={stat.color} />
              </div>

              {/* Label */}
              <div className="relative z-10 mt-3">
                <p className="font-black text-[#0A0A0B] text-base">{stat.label}</p>
                <p className="text-[#71717A] text-sm font-medium mt-0.5">{stat.sublabel}</p>
              </div>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl"
                style={{ backgroundColor: stat.color }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
