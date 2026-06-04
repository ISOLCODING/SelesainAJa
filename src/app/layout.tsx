import type { Metadata } from "next"
import { Roboto } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { FloatingWhatsApp } from "@/components/shared/FloatingWhatsApp"
export const metadata: Metadata = {
  title: "SelesainAja | Jasa Joki Akademik Terpercaya",
  description: "Platform jasa pengerjaan tugas akademik profesional untuk mahasiswa & pelajar Indonesia. Dikerjakan oleh tim ahli, kualitas terjamin, harga transparan.",
}

const roboto = Roboto({ 
  subsets: ["latin"], 
  weight: ["400", "500", "700", "900"],
  variable: "--font-roboto"
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={`scroll-smooth ${roboto.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-[#FAFAFA] text-[#0A0A0B]" suppressHydrationWarning>
        <TooltipProvider>
          {children}
        </TooltipProvider>
        <FloatingWhatsApp />
        <Toaster />
      </body>
    </html>
  )
}
