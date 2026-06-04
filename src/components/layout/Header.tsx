"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Menu, X, Phone, ArrowRight, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

const mainNav = [
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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-[#E4E4E7] shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 bg-[#0066FF] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-[#0A0A0B]">
              Selesain<span className="text-[#0066FF]">Aja</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {mainNav.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                    isActive
                      ? "text-[#0066FF] bg-[#E6F0FF]"
                      : "text-[#71717A] hover:text-[#0A0A0B] hover:bg-[#F4F4F5]"
                  )}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="tel:+62812xxxx"
              className="flex items-center gap-2 text-sm text-[#71717A] hover:text-[#0A0A0B] transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>0812-XXXX-XXXX</span>
            </Link>
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Masuk
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="bg-[#0066FF] hover:bg-[#0052CC] rounded-lg">
                Daftar Gratis
                <ArrowRight className="ml-1.5 w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
            <SheetTrigger
              className="lg:hidden"
              render={
                <Button variant="ghost" size="icon" className="shrink-0" />
              }
            >
              <Menu className="w-5 h-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] p-0">
              <VisuallyHidden asChild>
                <SheetTitle>Menu Navigasi</SheetTitle>
              </VisuallyHidden>
              <div className="flex flex-col h-full">
                <div className="p-6 border-b border-[#E4E4E7]">
                  <Link href="/" className="flex items-center gap-2.5" onClick={() => setIsMobileOpen(false)}>
                    <div className="w-9 h-9 bg-[#0066FF] rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">S</span>
                    </div>
                    <span className="font-bold text-xl">SelesainAja</span>
                  </Link>
                </div>
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                  {mainNav.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileOpen(false)}
                        className={cn(
                          "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                          isActive
                            ? "text-[#0066FF] bg-[#E6F0FF]"
                            : "text-[#71717A] hover:text-[#0A0A0B] hover:bg-[#F4F4F5]"
                        )}
                      >
                        {item.name}
                      </Link>
                    )
                  })}
                </nav>
                <div className="p-4 border-t border-[#E4E4E7] space-y-2">
                  <Link href="/login" onClick={() => setIsMobileOpen(false)}>
                    <Button variant="outline" className="w-full">Masuk</Button>
                  </Link>
                  <Link href="/register" onClick={() => setIsMobileOpen(false)}>
                    <Button className="w-full bg-[#0066FF] hover:bg-[#0052CC]">
                      Daftar Gratis
                      <ArrowRight className="ml-1.5 w-4 h-4" />
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
