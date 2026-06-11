import { NextResponse } from "next/server";
import { services } from "@/lib/constants";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const baseUrl = "https://selesainaja.vercel.app";

  const staticPages = [
    { url: baseUrl, lastmod: new Date().toISOString(), freq: "weekly", pri: "1.0" },
    { url: `${baseUrl}/services`, lastmod: new Date().toISOString(), freq: "weekly", pri: "0.9" },
    { url: `${baseUrl}/about`, lastmod: new Date().toISOString(), freq: "monthly", pri: "0.7" },
    { url: `${baseUrl}/contact`, lastmod: new Date().toISOString(), freq: "monthly", pri: "0.7" },
    { url: `${baseUrl}/faq`, lastmod: new Date().toISOString(), freq: "weekly", pri: "0.8" },
    { url: `${baseUrl}/how-it-works`, lastmod: new Date().toISOString(), freq: "monthly", pri: "0.7" },
    { url: `${baseUrl}/blog`, lastmod: new Date().toISOString(), freq: "daily", pri: "0.8" },
    { url: `${baseUrl}/testimonials`, lastmod: new Date().toISOString(), freq: "weekly", pri: "0.7" },
    { url: `${baseUrl}/careers`, lastmod: new Date().toISOString(), freq: "monthly", pri: "0.5" },
    { url: `${baseUrl}/privacy`, lastmod: new Date().toISOString(), freq: "yearly", pri: "0.3" },
    { url: `${baseUrl}/terms`, lastmod: new Date().toISOString(), freq: "yearly", pri: "0.3" },
  ];

  const servicePages = services.map((s: any) => ({
    url: `${baseUrl}${s.href}`,
    lastmod: new Date().toISOString(),
    freq: "weekly",
    pri: "0.85",
  }));

  let blogPages: any[] = [];
  try {
    const articles = await prisma.article.findMany({
      where: { status: "published" },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    });
    blogPages = articles.map((a: any) => ({
      url: `${baseUrl}/blog/${a.slug}`,
      lastmod: a.updatedAt.toISOString(),
      freq: "weekly",
      pri: "0.75",
    }));
  } catch (e) {
    console.error("Sitemap blog error:", e);
  }

  const all = [...staticPages, ...servicePages, ...blogPages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all.map((p) => `  <url>
    <loc>${p.url}</loc>
    <lastmod>${p.lastmod}</lastmod>
    <changefreq>${p.freq}</changefreq>
    <priority>${p.pri}</priority>
  </url>`).join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, max-age=3600",
      "X-Robots-Tag": "all",
    },
  });
}