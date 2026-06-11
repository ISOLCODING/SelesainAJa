import type { Metadata, Viewport } from "next"
import { Roboto, Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"
import "animate.css"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { FloatingWhatsApp } from "@/components/shared/FloatingWhatsApp"
import NextTopLoader from "nextjs-toploader"
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider"
import GoogleAnalytics from "@/components/seo/GoogleAnalytics"
import { Analytics } from "@vercel/analytics/next"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0B" },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL("https://selesainaja.vercel.app"),

  title: {
    default: "SelesainAja — Jasa Pengerjaan Tugas Profesional & Terpercaya",
    template: "%s | SelesainAja",
  },

  description:
    "Platform jasa pengerjaan tugas akademik #1 di Indonesia. Makalah, paper, presentasi, jurnal dikerjakan oleh tim profesional lulusan S2/S3. Mulai Rp50.000, cepat, bebas plagiat, revisi gratis!",

  keywords: [
    "jasa pengerjaan tugas",
    "jasa pembuatan makalah",
    "joki tugas",
    "jasa tugas kuliah",
    "jasa pembuatan paper",
    "jasa presentasi",
    "jasa jurnal ilmiah",
    "bantuan tugas akademik",
    "jasa pengetikan makalah",
    "joki tugas terpercaya",
    "jasa pengerjaan tugas online",
    "jasa pembuatan makalah murah",
    "jasa tugas sekolah",
    "jasa essay beasiswa",
    "jasa laporan praktikum",
  ],

  authors: [{ name: "Tim SelesainAja", url: "https://selesainaja.vercel.app/about" }],
  creator: "SelesainAja",
  publisher: "SelesainAja",

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://selesainaja.vercel.app",
    siteName: "SelesainAja",
    title: "SelesainAja — Jasa Pengerjaan Tugas Profesional & Terpercaya",
    description:
      "Platform jasa pengerjaan tugas akademik #1 di Indonesia. Makalah, paper, presentasi, jurnal dikerjakan oleh tim profesional. Mulai Rp50.000!",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SelesainAja - Jasa Pengerjaan Tugas Profesional",
        type: "image/jpeg",
      },
      {
        url: "/og-image-square.jpg",
        width: 600,
        height: 600,
        alt: "SelesainAja Logo",
        type: "image/jpeg",
      },
    ],
    countryName: "Indonesia",
    emails: ["support@selesainaja.vercel.app"],
    phoneNumbers: ["+6281112345678"],
  },

  twitter: {
    card: "summary_large_image",
    site: "@selesainaja",
    creator: "@selesainaja",
    title: "SelesainAja — Jasa Pengerjaan Tugas Profesional",
    description:
      "Platform jasa pengerjaan tugas akademik #1 di Indonesia. Mulai Rp50.000!",
    images: [
      {
        url: "/twitter-image.jpg",
        width: 1200,
        height: 675,
        alt: "SelesainAja - Jasa Pengerjaan Tugas",
      },
    ],
  },

  verification: {
    google: "e408fba496e16d62",
    yandex: "YANDEX_VERIFICATION_CODE",
    yahoo: "YAHOO_VERIFICATION_CODE",
    other: {
      "msvalidate.01": "BING_VERIFICATION_CODE",
      "pinterest-site-verification": "PINTEREST_CODE",
    },
  },

  alternates: {
    canonical: "https://selesainaja.vercel.app",
    languages: {
      "id-ID": "https://selesainaja.vercel.app",
    },
  },

  icons: {
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
  },

  manifest: "/site.webmanifest",

  appleWebApp: {
    capable: true,
    title: "SelesainAja",
    statusBarStyle: "black-translucent",
  },

  formatDetection: {
    telephone: true,
    date: true,
    address: true,
    email: true,
    url: true,
  },

  other: {
    "google-site-verification": "e408fba496e16d62",
    "msvalidate.01": "BING_CODE",
    "p:domain_verify": "PINTEREST_CODE",
    "fb:app_id": "FACEBOOK_APP_ID",
    "fb:pages": "FACEBOOK_PAGE_ID",
    "ia:markup_url": "https://selesainaja.vercel.app/ia",
  },
}

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-roboto",
  display: "swap",
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
})

import { PostHogProvider } from "@/components/providers/PostHogProvider"
import SuspendedPostHogPageView from "@/components/providers/PostHogPageView"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={`scroll-smooth ${roboto.variable} ${jakarta.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-[#FAFAFA] text-[#0A0A0B] min-h-screen flex flex-col" suppressHydrationWarning>
        <NextTopLoader 
          color="#0066FF"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #0066FF,0 0 5px #0066FF"
        />
        <PostHogProvider>
          <SuspendedPostHogPageView />
          <SmoothScrollProvider>
            <TooltipProvider>
              {children}
            </TooltipProvider>
          </SmoothScrollProvider>
        </PostHogProvider>
        <FloatingWhatsApp />
        <Toaster />
      </body>
      <GoogleAnalytics />
      <Analytics />
    </html>
  )
}
