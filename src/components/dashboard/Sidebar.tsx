"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  RiDashboardLine, 
  RiFileList3Line, 
  RiWallet3Line, 
  RiNotification3Line, 
  RiUser3Line, 
  RiAddCircleLine,
  RiMenuLine,
  RiCloseLine
} from "react-icons/ri"
import { motion, AnimatePresence } from "framer-motion"

const menuItems = [
  { name: "Overview", icon: RiDashboardLine, href: "/dashboard" },
  { name: "Pesanan Saya", icon: RiFileList3Line, href: "/dashboard/orders" },
  { name: "Pembayaran", icon: RiWallet3Line, href: "/dashboard/payments" },
  { name: "Notifikasi", icon: RiNotification3Line, href: "/dashboard/notifications", badge: 3 },
  { name: "Profil", icon: RiUser3Line, href: "/dashboard/profile" },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  const SidebarContent = () => (
    <>
      <div className="p-8">
        <Link href="/" className="inline-block">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-black font-jakarta text-xl shadow-md">
              S
            </div>
            <span className="font-black font-jakarta text-xl text-slate-900 tracking-tight">
              SelesainAja.
            </span>
          </div>
        </Link>
      </div>

      <div className="px-4 pb-6">
        <Link 
          href="/dashboard/orders/new" 
          className="w-full bg-primary hover:bg-[#1f4788] text-white flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold transition-all duration-300 shadow-md shadow-primary/20 group"
        >
          <RiAddCircleLine className="text-xl group-hover:rotate-90 transition-transform duration-300" />
          <span>Pesan Joki Baru</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`) && item.href !== '/dashboard'
          
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex items-center justify-between px-4 py-3.5 rounded-xl font-medium transition-all duration-300 ${
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className={`text-xl ${isActive ? "text-primary" : "text-slate-400"}`} />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <button className="w-full flex items-center gap-3 px-4 py-3.5 text-red-500 font-medium hover:bg-red-50 rounded-xl transition-colors text-left">
          <RiCloseLine className="text-xl" />
          <span>Keluar Akun</span>
        </button>
      </div>
    </>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 h-screen fixed left-0 top-0 bg-white border-r border-slate-100 z-40">
        <SidebarContent />
      </aside>

      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-black font-jakarta text-sm">
            S
          </div>
          <span className="font-black font-jakarta text-lg text-slate-900">
            SelesainAja.
          </span>
        </div>
        <button 
          onClick={toggleMobileMenu}
          className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-xl text-slate-600"
        >
          <RiMenuLine className="text-xl" />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobileMenu}
              className="lg:hidden fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40"
            />
            <motion.aside 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed top-0 left-0 bottom-0 w-[80%] max-w-sm bg-white shadow-2xl z-50 flex flex-col"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
