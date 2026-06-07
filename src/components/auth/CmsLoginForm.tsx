"use client"

import { useState } from "react"
import Link from "next/link"
import { loginAction } from "@/app/actions/auth"
import { motion } from "framer-motion"
import { RiEyeLine, RiEyeOffLine, RiLockPasswordLine, RiMailLine } from "react-icons/ri"
import { BiLoaderAlt, BiErrorCircle } from "react-icons/bi"
import { toast } from "react-hot-toast"

export function CmsLoginForm({ role = "admin" }: { role?: "admin" | "writer" }) {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    try {
      const formData = new FormData(e.currentTarget);
      // Let next-auth know where to redirect after successful login
      formData.append("redirectTo", `/${role}/dashboard`);
      
      const res = await loginAction(formData);

      if (res?.error) {
        setError(res.error);
        toast.error(res.error);
        setIsLoading(false); // Only set to false on error, if success it will redirect
      }
    } catch (err) {
      setError("Terjadi kesalahan sistem");
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-10">
          <Link href="/" className="inline-block mb-6 text-2xl font-black tracking-tight text-white">
             SelesainAja<span className="text-[#0066FF]">.</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-black font-jakarta text-slate-800 tracking-tight mb-3">
            Dashboard {role === "admin" ? "Admin" : "Penulis"}
          </h1>
          <p className="text-slate-500 font-medium">
            Masuk untuk mengelola konten website
          </p>
        </div>

        <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-xl border border-slate-100 relative overflow-hidden">
          {/* Accent line */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-[#0066FF]" />
          
          <form onSubmit={handleLogin} className="space-y-6 mt-2">
            
            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl flex items-center text-sm font-medium border border-red-100">
                <BiErrorCircle className="text-xl mr-2 shrink-0" />
                <span>{error}</span>
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <RiMailLine className="text-xl" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="admin@selesainaja.com"
                  required
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] transition-all duration-300 outline-none text-slate-700 font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-sm font-bold text-slate-700">Password</label>
                <Link href={`/${role}/forgot-password`} className="text-xs font-bold text-[#0066FF] hover:text-[#0052cc] transition-colors">
                  Lupa Password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <RiLockPasswordLine className="text-xl" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  required
                  className="w-full pl-11 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] transition-all duration-300 outline-none text-slate-700 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <RiEyeOffLine className="text-xl" /> : <RiEyeLine className="text-xl" />}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded border-slate-300 text-[#0066FF] focus:ring-[#0066FF] focus:ring-offset-0 bg-slate-50 cursor-pointer"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-slate-600 cursor-pointer select-none">
                Ingat Saya
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-[#0066FF] hover:bg-[#0052cc] text-white rounded-xl font-bold font-jakarta text-lg transition-all duration-300 shadow-lg shadow-[#0066FF]/25 disabled:opacity-70 flex items-center justify-center group"
            >
              {isLoading ? (
                <BiLoaderAlt className="animate-spin text-2xl" />
              ) : (
                <span className="flex items-center gap-2">
                  Masuk 
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
