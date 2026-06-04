import { Metadata } from "next";

const BASE_URL = "https://selesainaja.com";

interface GenerateMetadataProps {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
}

export function generatePageMetadata({
  title,
  description,
  path,
  keywords,
  image = "/og-image.jpg",
  noIndex = false,
}: GenerateMetadataProps): Metadata {
  const url = `${BASE_URL}${path}`;

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    ...(noIndex
      ? { robots: { index: false, follow: false } }
      : {}),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "SelesainAja",
      locale: "id_ID",
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      site: "@selesainaja",
      title,
      description,
      images: [image],
    },
  };
}
