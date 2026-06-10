"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  RiFileList3Line, 
  RiTimeLine, 
  RiCheckboxCircleLine, 
  RiWallet3Line,
  RiArrowRightLine,
  RiFileTextLine,
  RiDownloadCloud2Line,
  RiEyeLine
} from "react-icons/ri"
import { BiDotsVerticalRounded } from "react-icons/bi"

// --- Mock Data ---
const statCards = [
  { title: "Total Pesanan", value: "12", icon: RiFileList3Line, color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-100", trend: "+2 bulan ini" },
  { title: "Dalam Proses", value: "3", icon: RiTimeLine, color: "text-orange-500", bg: "bg-orange-50", border: "border-orange-100", trend: "Batas waktu terdekat: Besok" },
  { title: "Selesai", value: "9", icon: RiCheckboxCircleLine, color: "text-emerald-500", bg: "bg-emerald-50", border: "border-emerald-100", trend: "Tingkat keberhasilan 100%" },
  { title: "Total Belanja", value: "Rp 1.450.000", icon: RiWallet3Line, color: "text-purple-500", bg: "bg-purple-50", border: "border-purple-100", trend: "Hemat Rp 150.000 dari promo" },
]

const recentOrders = [
  { id: "#ORD-8921", title: "Makalah Manajemen Strategik", service: "Makalah", deadline: "Besok, 23:59", progress: 75, status: "in_progress", price: "Rp 150.000" },
  { id: "#ORD-8920", title: "Presentasi PPT Sejarah", service: "Presentasi", deadline: "3 Hari lagi", progress: 20, status: "pending", price: "Rp 80.000" },
  { id: "#ORD-8854", title: "Jurnal Teknik Informatika", service: "Jurnal", deadline: "Selesai", progress: 100, status: "completed", price: "Rp 350.000" },
  { id: "#ORD-8812", title: "Review Artikel Jurnal", service: "Review", deadline: "Selesai", progress: 100, status: "completed", price: "Rp 100.000" },
]

export default function DashboardOverviewPage() {
  const [greeting, setGreeting] = useState("Selamat Pagi")
  const [currentDate, setCurrentDate] = useState("")

  useEffect(() => {
    // Set time-based greeting
    const hour = new Date().getHours()
    if (hour < 11) setGreeting("Selamat Pagi")
    else if (hour < 15) setGreeting("Selamat Siang")
    else if (hour < 18) setGreeting("Selamat Sore")
    else setGreeting("Selamat Malam")

    // Set formatted date
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    setCurrentDate(new Date().toLocaleDateString('id-ID', options))
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in_progress":
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-orange-100 text-orange-700 border border-orange-200"><span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span> Diproses</span>
      case "pending":
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200"><span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span> Menunggu</span>
      case "completed":
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-200"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Selesai</span>
      default:
        return null
    }
  }

  return (
    <div className="space-y-8">
      
      {/* 1. WELCOME SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-1"
        >
          <p className="text-primary font-bold tracking-widest uppercase text-xs mb-2">{currentDate}</p>
          <h1 className="text-3xl md:text-4xl font-black font-jakarta text-slate-900 tracking-tight">
            {greeting}, <span className="text-primary">Ahmad!</span> 👋
          </h1>
          <p className="text-slate-500 font-medium">
            Ada 3 pesanan yang sedang kami kerjakan untuk Anda hari ini.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link 
            href="/dashboard/orders/new" 
            className="inline-flex items-center gap-2 bg-primary hover:bg-[#1f4788] text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-primary/25"
          >
            <span>Pesan Tugas Baru</span>
            <RiArrowRightLine />
          </Link>
        </motion.div>
      </div>

      {/* 2. STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {statCards.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${stat.bg} ${stat.color} ${stat.border} group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="text-2xl" />
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-black font-jakarta text-slate-900 mb-1 tracking-tight">{stat.value}</h3>
              <p className="text-sm font-bold text-slate-500 mb-4">{stat.title}</p>
              
              <div className="pt-4 border-t border-slate-50">
                <p className="text-xs font-medium text-slate-400">{stat.trend}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 3. RECENT ORDERS TABLE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden"
      >
        <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-black font-jakarta text-slate-900 mb-1">Pesanan Terkini</h2>
            <p className="text-sm text-slate-500 font-medium">Pantau status pengerjaan tugas Anda secara real-time.</p>
          </div>
          <Link href="/dashboard/orders" className="text-sm font-bold text-primary hover:text-secondary flex items-center gap-1 transition-colors">
            Lihat Semua <RiArrowRightLine />
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 md:px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Detail Tugas</th>
                <th className="px-6 md:px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 md:px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Progress</th>
                <th className="px-6 md:px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Deadline</th>
                <th className="px-6 md:px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentOrders.map((order, i) => (
                <tr key={i} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 md:px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center text-primary shrink-0">
                        <RiFileTextLine className="text-lg" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 mb-0.5">{order.title}</p>
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                          <span>{order.id}</span>
                          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                          <span>{order.service}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 md:px-8 py-5">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-6 md:px-8 py-5">
                    <div className="w-32">
                      <div className="flex justify-between text-xs font-bold mb-1.5">
                        <span className="text-slate-700">{order.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className={`h-1.5 rounded-full ${order.status === 'completed' ? 'bg-emerald-500' : 'bg-primary'}`} 
                          style={{ width: `${order.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 md:px-8 py-5">
                    <div className="text-sm font-bold text-slate-700 mb-0.5">{order.deadline}</div>
                    <div className="text-xs font-medium text-slate-400">{order.price}</div>
                  </td>
                  <td className="px-6 md:px-8 py-5">
                    <div className="flex items-center gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                      {order.status === 'completed' ? (
                        <button className="p-2 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors tooltip-trigger" title="Download Hasil">
                          <RiDownloadCloud2Line className="text-lg" />
                        </button>
                      ) : (
                        <button className="p-2 text-primary bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors tooltip-trigger" title="Lihat Detail">
                          <RiEyeLine className="text-lg" />
                        </button>
                      )}
                      <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                        <BiDotsVerticalRounded className="text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
      
    </div>
  )
}
