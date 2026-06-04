export interface PricingTier {
  id: string;
  name: string;
  price: number;
  priceUnit: string;
  isPopular: boolean;
  description: string;
  features: string[];
  excludedFeatures?: string[];
  turnaroundTime: string;
}

export interface FeatureRow {
  feature: string;
  values: {
    basic: boolean | string;
    standard: boolean | string;
    premium: boolean | string;
  };
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: string;
  details: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  pages: number;
  format: string;
  level: string;
  thumbnailUrl: string;
  previewUrl: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  tags: string[];
}

export interface WriterProfile {
  id: string;
  name: string;
  photoUrl: string;
  degrees: string[];
  experienceYears: number;
  expertiseTags: string[];
  completedWorks: number;
  rating: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface RelatedService {
  slug: string;
  name: string;
  priceStart: number;
  icon: string;
}

export interface ServiceDetail {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  categorySlug: string;
  isPopular: boolean;
  
  rating: number;
  totalReviews: number;
  satisfactionRate: number;
  highlights: { icon: string; text: string }[];
  
  pricingTiers: PricingTier[];
  features: FeatureRow[];
  processSteps: ProcessStep[];
  samples: PortfolioItem[];
  testimonials: Testimonial[];
  writers: WriterProfile[];
  faqs: FAQItem[];
  relatedServices: RelatedService[];
  
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  
  totalCompleted: number;
  onTimeRate: number;
}
