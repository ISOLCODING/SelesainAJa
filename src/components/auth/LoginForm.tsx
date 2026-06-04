"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { RiEyeLine, RiEyeOffLine, RiGoogleFill, RiLockPasswordLine, RiMailLine } from "react-icons/ri"
import { BiLoaderAlt } from "react-icons/bi"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // temporary mock success
      window.location.href = "/dashboard"
    }, 1500)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-10">
          <Link href="/" className="inline-block mb-6">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white font-black font-jakarta text-2xl shadow-lg">
              S
            </div>
          </Link>
          <h1 className="text-3xl md:text-4xl font-black font-jakarta text-slate-900 tracking-tight mb-3">
            Selamat Datang
          </h1>
          <p className="text-slate-500 font-medium">
            Masuk ke dashboard untuk mengelola pesanan Anda.
          </p>
        </div>

        <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100">
          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <RiMailLine className="text-xl" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  required
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 outline-none text-slate-700 font-medium"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-sm font-bold text-slate-700">Password</label>
                <Link href="/forgot-password" className="text-xs font-bold text-primary hover:text-secondary transition-colors">
                  Lupa password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <RiLockPasswordLine className="text-xl" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-11 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 outline-none text-slate-700 font-medium"
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

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary focus:ring-offset-0 bg-slate-50 cursor-pointer"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-slate-600 cursor-pointer select-none">
                Ingat saya selama 30 hari
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-primary hover:bg-[#1f4788] text-white rounded-xl font-bold font-jakarta text-lg transition-all duration-300 shadow-lg shadow-primary/25 disabled:opacity-70 flex items-center justify-center group"
            >
              {isLoading ? (
                <BiLoaderAlt className="animate-spin text-2xl" />
              ) : (
                <span className="group-hover:scale-105 transition-transform">Masuk</span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-8 relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative bg-white px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
              Atau masuk dengan
            </div>
          </div>

          {/* Social Login */}
          <div className="mt-8">
            <button
              type="button"
              className="w-full py-3.5 bg-white border-2 border-slate-100 hover:border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-3"
            >
              <RiGoogleFill className="text-2xl text-[#DB4437]" />
              Google
            </button>
          </div>
        </div>

        <p className="mt-10 text-center text-slate-500 font-medium">
          Belum punya akun?{" "}
          <Link href="/register" className="text-primary hover:text-secondary font-bold transition-colors">
            Daftar Sekarang
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
