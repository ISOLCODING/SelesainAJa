"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { motion } from "framer-motion"
import { RiEyeLine, RiEyeOffLine, RiGoogleFill, RiLockPasswordLine, RiMailLine } from "react-icons/ri"
import { BiLoaderAlt, BiErrorCircle } from "react-icons/bi"
import { loginAction } from "@/app/actions/auth"
import posthog from "posthog-js"

export function LoginForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement)?.value

    try {
      const formData = new FormData(e.currentTarget);
      // Let the server action know to redirect to the smart router
      formData.append("redirectTo", `/dashboard`);

      const result = await loginAction(formData);

      // If we get here and there's an error string returned
      if (result?.error) {
        setError(result.error);
        posthog.capture("login_failed", { error: result.error })
        setIsLoading(false);
      } else {
        posthog.identify(email, { email })
        posthog.capture("user_logged_in", { method: "credentials" })
      }
    } catch (err) {
      // Typically redirect throws an error that we shouldn't catch,
      // but if we do, Next.js handles NEXT_REDIRECT internally.
      if ((err as any)?.digest?.startsWith("NEXT_REDIRECT")) throw err
      setError("Terjadi kesalahan sistem");
      posthog.captureException(err)
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
          <Link href="/" className="inline-block mb-6">
            <Image 
              src="/images/Logo.png" 
              alt="SelesainAja Logo" 
              width={200} 
              height={100} 
              priority
              className="h-12 w-auto object-contain mx-auto"
            />
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
            
            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl flex items-center text-sm font-medium border border-red-100">
                <BiErrorCircle className="text-xl mr-2" />
                {error}
              </div>
            )}
            
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <RiMailLine className="text-xl" />
                </div>
                <input
                  type="email"
                  name="email"
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
                  name="password"
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
