"use client"

import { RiSearchLine, RiNotification3Line, RiArrowDownSLine } from "react-icons/ri"
import Link from "next/link"

export function Topbar() {
  return (
    <header className="hidden lg:flex h-20 bg-white border-b border-slate-100 items-center justify-between px-10 sticky top-0 z-30">
      
      {/* Search Bar */}
      <div className="flex-1 max-w-md">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
            <RiSearchLine className="text-xl" />
          </div>
          <input
            type="text"
            placeholder="Cari pesanan (ID Order / Judul)..."
            className="w-full pl-11 pr-4 py-3 bg-slate-50 hover:bg-slate-100 focus:bg-white border border-transparent focus:border-primary/20 rounded-xl focus:ring-4 focus:ring-primary/10 transition-all duration-300 outline-none text-slate-700 font-medium text-sm"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6 pl-6">
        
        {/* Notification Bell */}
        <button className="relative p-2 text-slate-400 hover:text-primary transition-colors">
          <RiNotification3Line className="text-2xl" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full animate-pulse"></span>
        </button>

        {/* Divider */}
        <div className="w-px h-8 bg-slate-200"></div>

        {/* User Profile */}
        <Link href="/dashboard/profile" className="flex items-center gap-3 group">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">Ahmad Fauzi</p>
            <p className="text-xs font-medium text-slate-500">Mahasiswa S1</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold overflow-hidden shadow-sm">
              <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Fauzi&backgroundColor=f8fafc" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <RiArrowDownSLine className="text-slate-400 group-hover:text-primary transition-colors" />
          </div>
        </Link>

      </div>
    </header>
  )
}
