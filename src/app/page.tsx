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
import { getOrganizationSchema } from "@/lib/seo/structured-data";

export default function Home() {
  const orgSchema = getOrganizationSchema();

  return (
    <>
      <JsonLd data={orgSchema} />
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
