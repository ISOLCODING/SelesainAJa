const BASE_URL = "https://selesainaja.vercel.app";

// ─── ORGANIZATION SCHEMA ─────────────────────────────────────────────────────
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: "SelesainAja",
    alternateName: ["Selesain Aja", "selesainaja.vercel.app"],
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/logo.png`,
      width: "512",
      height: "512",
    },
    description:
      "Platform jasa pengerjaan tugas akademik profesional untuk mahasiswa & pelajar Indonesia.",
    foundingDate: "2020",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jakarta",
      addressCountry: "ID",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+62-812-xxxx-xxxx",
        contactType: "customer service",
        contactOption: "TollFree",
        availableLanguage: ["Indonesian"],
        areaServed: "ID",
      },
      {
        "@type": "ContactPoint",
        telephone: "+62-812-xxxx-xxxx",
        contactType: "whatsapp",
        availableLanguage: ["Indonesian"],
      },
    ],
    sameAs: [
      "https://instagram.com/selesainaja",
      "https://twitter.com/selesainaja",
      "https://facebook.com/selesainaja",
      "https://tiktok.com/@selesainaja",
      "https://youtube.com/@selesainaja",
      "https://linkedin.com/company/selesainaja",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      worstRating: "1",
      reviewCount: "2500",
    },
  };
}

// ─── WEBSITE SCHEMA ──────────────────────────────────────────────────────────
export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: "SelesainAja",
    description: "Jasa Pengerjaan Tugas Profesional",
    publisher: { "@id": `${BASE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// ─── SERVICE SCHEMA ──────────────────────────────────────────────────────────
export function getServiceSchema({
  slug,
  name,
  description,
  lowPrice = "50000",
  highPrice = "500000",
}: {
  slug: string;
  name: string;
  description: string;
  lowPrice?: string;
  highPrice?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE_URL}/services/${slug}#service`,
    name,
    description,
    provider: { "@id": `${BASE_URL}/#organization` },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "IDR",
      lowPrice,
      highPrice,
      offerCount: "3",
      offers: [
        { "@type": "Offer", name: "Basic", price: lowPrice, priceCurrency: "IDR" },
        { "@type": "Offer", name: "Standard", price: "200000", priceCurrency: "IDR" },
        { "@type": "Offer", name: "Premium", price: highPrice, priceCurrency: "IDR" },
      ],
    },
    areaServed: { "@type": "Country", name: "Indonesia" },
    serviceType: "Academic Writing Service",
    termsOfService: `${BASE_URL}/terms`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "2500",
    },
  };
}

// ─── FAQ SCHEMA ──────────────────────────────────────────────────────────────
export function getFAQSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// ─── BREADCRUMB SCHEMA ───────────────────────────────────────────────────────
export function getBreadcrumbSchema(
  items: { name: string; url?: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  };
}

// ─── ARTICLE / BLOG SCHEMA ────────────────────────────────────────────────────
export function getBlogSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
  imageUrl,
  keywords,
}: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  imageUrl: string;
  keywords: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    author: {
      "@type": "Person",
      name: "Tim SelesainAja",
      url: `${BASE_URL}/about`,
    },
    publisher: { "@id": `${BASE_URL}/#organization` },
    datePublished,
    dateModified: dateModified ?? datePublished,
    mainEntityOfPage: url,
    image: imageUrl,
    keywords,
  };
}
