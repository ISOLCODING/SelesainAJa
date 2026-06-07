"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Menu, User, Phone } from "lucide-react"
import { cn } from "@/lib/utils"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

import gsap from "gsap"
import { useGSAP } from "@gsap/react"

const mainNav = [
  { name: "Beranda", href: "/" },
  { name: "Layanan", href: "/services" },
  { name: "Cara Kerja", href: "/how-it-works" },
  { name: "Testimoni", href: "/testimonials" },
  { name: "FAQ", href: "/faq" },
  { name: "Blog", href: "/blog" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useGSAP(() => {
    // Initial Entrance Animation
    const tl = gsap.timeline()
    
    tl.fromTo(
      ".nav-brand",
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
    )
    .fromTo(
      ".nav-item",
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)" },
      "-=0.4"
    )
    .fromTo(
      ".nav-actions",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.5)" },
      "-=0.4"
    )
  }, { scope: headerRef })

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
        isScrolled
          ? "py-3"
          : "py-6"
      )}
    >
      <div className="container-custom">
        <div 
          className={cn(
            "flex items-center justify-between mx-auto transition-all duration-500",
            isScrolled 
              ? "bg-white/80 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-[2rem] px-6 h-16 lg:h-20"
              : "bg-transparent px-2 h-24 lg:h-28"
          )}
        >
          {/* Logo */}
          <Link href="/" className="nav-brand flex items-center group shrink-0 min-w-[140px]">
            {isScrolled ? (
              <div className="flex items-center gap-2.5 animate__animated animate__fadeIn group">
                {/* Modern Geometric Icon */}
                <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-[#0066FF] to-[#0052CC] shadow-[inset_0px_2px_4px_rgba(255,255,255,0.3)] shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                  <div className="w-3 h-3 bg-white rounded-sm rotate-45 transition-transform duration-300 group-hover:rotate-90" />
                </div>
                {/* Sleek Typography */}
                <span className="text-xl md:text-2xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-[#0A0A0B] to-[#52525B] transition-opacity">
                  Selesain<span className="text-[#0066FF] font-black">Aja.</span>
                </span>
              </div>
            ) : (
              <Image 
                src="/images/Logo.png" 
                alt="SelesainAja Logo" 
                width={300} 
                height={150} 
                priority
                className="h-20 md:h-24 lg:h-28 w-auto object-contain group-hover:scale-105 transition-transform duration-300 origin-left animate__animated animate__fadeIn"
              />
            )}
          </Link>

          {/* Desktop Nav - Modern Pill Design */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/95 backdrop-blur-xl rounded-full px-2 py-1.5 border border-white/60 shadow-md">
            {mainNav.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "nav-item relative px-5 py-2 text-sm font-bold rounded-full transition-all duration-300 overflow-hidden group",
                    isActive
                      ? "text-white"
                      : "text-[#0A0A0B] hover:text-[#0066FF] hover:bg-[#F4F8FB]"
                  )}
                >
                  {isActive && (
                    <span className="absolute inset-0 bg-[#0066FF] rounded-full -z-10" />
                  )}
                  <span className={cn(
                    "relative z-10",
                    !isActive && "group-hover:translate-y-[-1px] inline-block transition-transform duration-300"
                  )}>
                    {item.name}
                  </span>
                  {!isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#0066FF] rounded-full group-hover:w-1/2 transition-all duration-300" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="nav-actions hidden lg:flex items-center gap-4">
            <Link
              href="https://wa.me/6281112345678"
              target="_blank"
              className="flex items-center gap-2 text-sm font-bold text-[#0A0A0B] bg-white/95 backdrop-blur-xl px-2 py-1.5 pr-5 rounded-full border border-white/60 shadow-md hover:bg-white hover:shadow-lg transition-all group"
            >
              <div className="w-8 h-8 rounded-full bg-[#E6F0FF] flex items-center justify-center group-hover:bg-[#0066FF] group-hover:text-white text-[#0066FF] transition-colors">
                <Phone className="w-4 h-4" />
              </div>
              <span>Konsultasi</span>
            </Link>
            <div className="h-6 w-px bg-white/20" />
            <Link href="/login">
              <Button className="rounded-full px-6 font-bold bg-[#0066FF] hover:bg-[#0052CC] shadow-lg shadow-[#0066FF]/25 hover:shadow-[#0066FF]/40 transition-all hover:-translate-y-0.5 animate__animated animate__pulse animate__infinite animate__slower">
                <User className="w-4 h-4 mr-2" />
                Masuk
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
            <SheetTrigger
              className="lg:hidden nav-actions"
              render={
                <Button variant="ghost" size="icon" className="shrink-0 rounded-full hover:bg-[#F4F4F5]" />
              }
            >
              <Menu className="w-6 h-6 text-[#0A0A0B]" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] p-0 border-l border-white/20 bg-white/95 backdrop-blur-2xl">
              <VisuallyHidden asChild>
                <SheetTitle>Menu Navigasi</SheetTitle>
              </VisuallyHidden>
              <div className="flex flex-col h-full">
                <div className="p-6 border-b border-[#E4E4E7]/50">
                  <Link href="/" className="flex items-center" onClick={() => setIsMobileOpen(false)}>
                    <Image 
                      src="/images/Logo.png" 
                      alt="SelesainAja Logo" 
                      width={160} 
                      height={80} 
                      className="h-10 w-auto object-contain"
                    />
                  </Link>
                </div>
                <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
                  {mainNav.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileOpen(false)}
                        className={cn(
                          "flex items-center px-4 py-4 text-base font-bold rounded-2xl transition-all duration-300",
                          isActive
                            ? "text-[#0066FF] bg-[#E6F0FF] shadow-inner"
                            : "text-[#71717A] hover:text-[#0A0A0B] hover:bg-[#F4F4F5]"
                        )}
                      >
                        {item.name}
                      </Link>
                    )
                  })}
                </nav>
                <div className="p-6 border-t border-[#E4E4E7]/50 bg-[#FAFAFA] space-y-4">
                  <Link href="https://wa.me/6281112345678" target="_blank" className="flex items-center gap-3 w-full p-4 rounded-2xl bg-white border border-[#E4E4E7] shadow-sm font-bold text-[#0A0A0B] hover:border-[#0066FF] transition-colors">
                    <div className="w-10 h-10 rounded-full bg-[#E6F0FF] text-[#0066FF] flex items-center justify-center">
                      <Phone className="w-5 h-5" />
                    </div>
                    Tanya Admin
                  </Link>
                  <Link href="/login" className="block w-full">
                    <Button className="w-full h-14 rounded-2xl font-black text-lg bg-[#0066FF] hover:bg-[#0052CC] shadow-xl shadow-[#0066FF]/20 animate__animated animate__pulse animate__infinite">
                      <User className="w-5 h-5 mr-2" />
                      Masuk ke Akun
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
