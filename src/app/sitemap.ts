import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://selesainaja.com";

  // In a real application, you would fetch dynamic routes from your CMS or database
  const routes = [
    "",
    "/services/jasa-pembuatan-makalah",
    "/services/jasa-pengerjaan-presentasi",
    "/services/jasa-paper-ilmiah",
    "/services/jasa-artikel-jurnal",
    "/kategori/makalah",
    "/kategori/presentasi",
    "/kategori/paper",
    "/area/jakarta",
    "/area/surabaya",
    "/area/bandung",
    "/blog",
    "/tentang-kami",
    "/kontak",
  ];

  const sitemaps = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  return sitemaps;
}
