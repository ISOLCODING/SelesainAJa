import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { blogPosts } from "@/lib/data/blog";

export async function GET() {
  try {
    let seededCount = 0;

    for (const post of blogPosts) {
      // Check if exists
      const exists = await prisma.article.findUnique({
        where: { slug: post.slug }
      });

      if (!exists) {
        // Find or create category
        let category = await prisma.category.findFirst({
          where: { name: post.category }
        });

        if (!category) {
          category = await prisma.category.create({
            data: {
              name: post.category,
              slug: post.category.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            }
          });
        }

        // Find author (admin) or create a dummy
        let author = await prisma.user.findFirst({
          where: { role: 'admin' }
        });
        
        if (!author) {
          author = await prisma.user.create({
            data: {
              name: post.author || "Admin",
              email: "admin@selesainaja.com",
              role: "admin",
              isActive: true,
            }
          });
        }

        // Safely parse date
        let publishedDate = new Date();
        try {
          if (post.date) {
            // Replace Indo month names if any
            const engDate = post.date.replace('Okt', 'Oct').replace('Agt', 'Aug').replace('Mei', 'May').replace('Des', 'Dec');
            const parsed = new Date(engDate);
            if (!isNaN(parsed.getTime())) {
              publishedDate = parsed;
            }
          }
        } catch(e) {}

        // Create the article
        const newArticle = await prisma.article.create({
          data: {
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            content: post.content,
            featuredImage: post.image,
            authorId: author.id,
            status: "published",
            publishedAt: publishedDate,
            metaTitle: post.title,
            metaDescription: post.excerpt,
            categories: {
              create: [
                { categoryId: category.id }
              ]
            },
            sourceName: post.sourceName || null,
            sourceUrl: post.sourceUrl || null,
          } as any
        });
        seededCount++;
      }
    }

    return NextResponse.json({ success: true, seededCount });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
