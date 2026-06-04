"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { RiEyeLine, RiEyeOffLine, RiGoogleFill, RiLockPasswordLine, RiMailLine, RiUser3Line } from "react-icons/ri"
import { BiLoaderAlt } from "react-icons/bi"

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // Simple password strength calculation
  const getPasswordStrength = () => {
    if (!password) return 0
    let score = 0
    if (password.length > 6) score += 1
    if (password.length > 10) score += 1
    if (/[A-Z]/.test(password)) score += 1
    if (/[0-9]/.test(password)) score += 1
    if (/[^A-Za-z0-9]/.test(password)) score += 1
    return Math.min(score, 4)
  }

  const strength = getPasswordStrength()
  const strengthLabels = ["Sangat Lemah", "Lemah", "Cukup", "Kuat", "Sangat Kuat"]
  const strengthColors = ["bg-slate-200", "bg-red-500", "bg-orange-500", "bg-emerald-500", "bg-emerald-600"]

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert("Password tidak cocok!")
      return
    }
    
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
            Daftar Akun Baru
          </h1>
          <p className="text-slate-500 font-medium">
            Bergabunglah dan permudah penyelesaian tugas akademik Anda.
          </p>
        </div>

        <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100">
          <form onSubmit={handleRegister} className="space-y-5">
            
            {/* Name Field */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Nama Lengkap</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <RiUser3Line className="text-xl" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 outline-none text-slate-700 font-medium"
                />
              </div>
            </div>

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
              <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <RiLockPasswordLine className="text-xl" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 8 karakter"
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
              
              {/* Password Strength Indicator */}
              {password.length > 0 && (
                <div className="pt-2 px-1">
                  <div className="flex gap-1 mb-1.5">
                    {[1, 2, 3, 4].map((level) => (
                      <div 
                        key={level} 
                        className={`h-1.5 w-full rounded-full transition-colors duration-300 ${
                          strength >= level ? strengthColors[strength] : "bg-slate-100"
                        }`} 
                      />
                    ))}
                  </div>
                  <p className={`text-xs font-bold ${strength >= 3 ? "text-emerald-600" : "text-slate-500"}`}>
                    Kekuatan: {strengthLabels[strength]}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Konfirmasi Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <RiLockPasswordLine className="text-xl" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Ulangi password"
                  required
                  className={`w-full pl-11 pr-12 py-3.5 bg-slate-50 border rounded-xl focus:bg-white focus:ring-2 transition-all duration-300 outline-none text-slate-700 font-medium ${
                    confirmPassword && password !== confirmPassword 
                      ? "border-red-300 focus:ring-red-200 focus:border-red-400" 
                      : "border-slate-200 focus:ring-primary/20 focus:border-primary"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showConfirmPassword ? <RiEyeOffLine className="text-xl" /> : <RiEyeLine className="text-xl" />}
                </button>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="text-xs font-bold text-red-500 mt-1 ml-1">Password tidak cocok</p>
              )}
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start pt-2">
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-1 w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary focus:ring-offset-0 bg-slate-50 cursor-pointer shrink-0"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-slate-500 leading-relaxed cursor-pointer select-none">
                Saya menyetujui{" "}
                <Link href="/terms" className="text-primary hover:text-secondary font-bold">
                  Syarat & Ketentuan
                </Link>{" "}
                serta{" "}
                <Link href="/privacy" className="text-primary hover:text-secondary font-bold">
                  Kebijakan Privasi
                </Link>{" "}
                SelesainAja.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || (password !== confirmPassword && confirmPassword.length > 0)}
              className="w-full py-4 bg-primary hover:bg-[#1f4788] text-white rounded-xl font-bold font-jakarta text-lg transition-all duration-300 shadow-lg shadow-primary/25 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center group mt-2"
            >
              {isLoading ? (
                <BiLoaderAlt className="animate-spin text-2xl" />
              ) : (
                <span className="group-hover:scale-105 transition-transform">Buat Akun Gratis</span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-8 relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative bg-white px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
              Atau daftar dengan
            </div>
          </div>

          {/* Social Register */}
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
          Sudah memiliki akun?{" "}
          <Link href="/login" className="text-primary hover:text-secondary font-bold transition-colors">
            Masuk di sini
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
