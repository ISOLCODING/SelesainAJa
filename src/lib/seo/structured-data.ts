export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SelesainAja",
    url: "https://selesainaja.com",
    logo: "https://selesainaja.com/logo.png",
    description: "Platform jasa pengerjaan tugas akademik profesional",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jakarta",
      addressCountry: "ID",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+62-811-1234-5678", // Replace with real phone
      contactType: "customer service",
      availableLanguage: ["Indonesian"],
    },
    sameAs: [
      "https://instagram.com/selesainaja",
      "https://twitter.com/selesainaja",
      "https://facebook.com/selesainaja",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "1250",
      bestRating: "5",
    },
  };
}

export function getServiceSchema(
  serviceName: string,
  description: string,
  url: string,
  price: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    description: description,
    provider: {
      "@type": "Organization",
      name: "SelesainAja",
    },
    url: url,
    offers: {
      "@type": "Offer",
      price: price,
      priceCurrency: "IDR",
      availability: "https://schema.org/InStock",
    },
  };
}

export function getBlogSchema(
  title: string,
  description: string,
  url: string,
  datePublished: string,
  imageUrl: string,
  keywords: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    author: {
      "@type": "Organization",
      name: "Tim SelesainAja",
      url: "https://selesainaja.com/tentang-kami",
    },
    datePublished: datePublished,
    dateModified: datePublished,
    mainEntityOfPage: url,
    publisher: {
      "@type": "Organization",
      name: "SelesainAja",
      logo: {
        "@type": "ImageObject",
        url: "https://selesainaja.com/logo.png",
      },
    },
    image: imageUrl,
    keywords: keywords,
  };
}
