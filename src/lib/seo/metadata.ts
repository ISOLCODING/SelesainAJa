import { Metadata } from "next";

interface GenerateMetadataProps {
  title: string;
  description: string;
  path: string;
  keywords?: string;
  image?: string;
}

export function generatePageMetadata({
  title,
  description,
  path,
  keywords,
  image = "/og-image.jpg",
}: GenerateMetadataProps): Metadata {
  const url = `https://selesainaja.com${path}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "SelesainAja",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "id_ID",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
