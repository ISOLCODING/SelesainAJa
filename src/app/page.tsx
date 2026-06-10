import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/frontend/home/sections/HeroSection";
import { ServicesSection } from "@/components/frontend/home/sections/ServicesSection";
import { HowItWorksSection } from "@/components/frontend/home/sections/HowItWorksSection";
import { StatsSection } from "@/components/frontend/home/sections/StatsSection";
import { TestimonialsSection } from "@/components/frontend/home/sections/TestimonialsSection";
import { FAQSection } from "@/components/frontend/home/sections/FAQSection";
import { CTASection } from "@/components/frontend/home/sections/CTASection";
import { WaveDivider } from "@/components/shared/WaveDivider";
import JsonLd from "@/components/seo/JsonLd";
import { getOrganizationSchema, getWebsiteSchema } from "@/lib/seo/structured-data";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "SelesainAja — Jasa Pengerjaan Tugas Profesional  Mulai 50K",
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
  alternates: { canonical: "https://selesainaja.vercel.app" },
  openGraph: {
    title: "SelesainAja — Jasa Pengerjaan Tugas Profesional & Terpercaya",
    description:
      "Butuh bantuan tugas? SelesainAja platform jasa pengerjaan tugas #1. Mulai Rp50.000. Bebas plagiat, revisi gratis!",
    url: "https://selesainaja.vercel.app",
    images: [{ url: "/og/home.jpg", width: 1200, height: 630, alt: "SelesainAja - Jasa Pengerjaan Tugas" }],
  },
};

export default async function Home() {
  const orgSchema = getOrganizationSchema();
  const websiteSchema = getWebsiteSchema();

  // Fetch dynamic content from Prisma
  const [dbServices, dbTestimonials, dbFaqs] = await Promise.all([
    prisma.service.findMany({ where: { isActive: true }, orderBy: { sortOrder: "asc" } }),
    prisma.testimonial.findMany({ where: { status: "published" }, orderBy: { sortOrder: "asc" } }),
    prisma.faq.findMany({ where: { isActive: true }, orderBy: { sortOrder: "asc" } })
  ]);

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
        <ServicesSection initialServices={dbServices} />

        {/* Wave: #FAFAFA → #ffffff */}
        <WaveDivider topColor="#FAFAFA" bottomColor="#ffffff" />

        {/* HowItWorks: #ffffff */}
        <HowItWorksSection />

        {/* Wave: #ffffff → #FAFAFA */}
        <WaveDivider topColor="#ffffff" bottomColor="#FAFAFA" />

        {/* Testimonials: #FAFAFA */}
        <TestimonialsSection initialTestimonials={dbTestimonials} />

        {/* Wave: #FAFAFA → #ffffff */}
        <WaveDivider topColor="#FAFAFA" bottomColor="#ffffff" />

        {/* FAQ: #ffffff */}
        <FAQSection initialFaqs={dbFaqs} />

        {/* Wave: #ffffff → #2C5EAD */}
        <WaveDivider topColor="#ffffff" bottomColor="#2C5EAD" />

        {/* CTA: #2C5EAD */}
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
