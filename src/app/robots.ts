import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/dashboard/",
          "/login",
          "/register",
          "/forgot-password",
          "/_next/",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/dashboard/"],
      },
    ],
    sitemap: "https://selesainaja.com/sitemap.xml",
    host: "https://selesainaja.com",
  };
}
