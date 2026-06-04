import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/sections/HeroSection";
import { ServicesSection } from "@/components/home/sections/ServicesSection";
import { HowItWorksSection } from "@/components/home/sections/HowItWorksSection";
import { StatsSection } from "@/components/home/sections/StatsSection";
import { TestimonialsSection } from "@/components/home/sections/TestimonialsSection";
import { FAQSection } from "@/components/home/sections/FAQSection";
import { CTASection } from "@/components/home/sections/CTASection";
import { WaveDivider } from "@/components/shared/WaveDivider";
import JsonLd from "@/components/seo/JsonLd";
import { getOrganizationSchema, getWebsiteSchema } from "@/lib/seo/structured-data";

export const metadata: Metadata = {
  title: "SelesainAja — Jasa Pengerjaan Tugas Profesional ⭐ Mulai 50K",
  description:
    "Butuh bantuan tugas? ✓ SelesainAja platform jasa pengerjaan tugas #1. Makalah, paper, presentasi dikerjakan tim profesional. Bebas plagiat, cepat, revisi gratis! Mulai Rp50.000.",
  keywords: [
    "jasa pengerjaan tugas",
    "jasa pembuatan makalah",
    "joki tugas",
    "jasa tugas kuliah",
    "bantuan tugas akademik",
    "joki tugas terpercaya",
    "jasa pengerjaan tugas murah",
    "jasa pengerjaan tugas online",
  ],
  alternates: { canonical: "https://selesainaja.com" },
  openGraph: {
    title: "SelesainAja — Jasa Pengerjaan Tugas Profesional & Terpercaya",
    description:
      "Butuh bantuan tugas? ✓ SelesainAja platform jasa pengerjaan tugas #1. Mulai Rp50.000. Bebas plagiat, revisi gratis!",
    url: "https://selesainaja.com",
    images: [{ url: "/og/home.jpg", width: 1200, height: 630, alt: "SelesainAja - Jasa Pengerjaan Tugas" }],
  },
};


export default function Home() {
  const orgSchema = getOrganizationSchema();
  const websiteSchema = getWebsiteSchema();

  return (
    <>
      <JsonLd data={orgSchema} />
      <JsonLd data={websiteSchema} />
      <Header />
      <main className="grow">
        {/* Hero: #FAFAFA */}
        <HeroSection />

        {/* Wave: #FAFAFA → #EFF6FF */}
        <WaveDivider topColor="#FAFAFA" bottomColor="#EFF6FF" />

        {/* Stats: light blue gradient */}
        <StatsSection />

        {/* Wave: #F8FAFC → #FAFAFA */}
        <WaveDivider topColor="#F8FAFC" bottomColor="#FAFAFA" />

        {/* Services: #FAFAFA */}
        <ServicesSection />

        {/* Wave: #FAFAFA → #ffffff */}
        <WaveDivider topColor="#FAFAFA" bottomColor="#ffffff" />

        {/* HowItWorks: #ffffff */}
        <HowItWorksSection />

        {/* Wave: #ffffff → #FAFAFA */}
        <WaveDivider topColor="#ffffff" bottomColor="#FAFAFA" />

        {/* Testimonials: #FAFAFA */}
        <TestimonialsSection />

        {/* Wave: #FAFAFA → #ffffff */}
        <WaveDivider topColor="#FAFAFA" bottomColor="#ffffff" />

        {/* FAQ: #ffffff */}
        <FAQSection />

        {/* Wave: #ffffff → #2C5EAD */}
        <WaveDivider topColor="#ffffff" bottomColor="#2C5EAD" />

        {/* CTA: #2C5EAD */}
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
