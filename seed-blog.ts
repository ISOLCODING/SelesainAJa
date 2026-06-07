import { PrismaClient } from '@prisma/client';
import { blogPosts } from './src/lib/data/blog';

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding blog posts...");
  let count = 0;

  for (const post of blogPosts) {
    const exists = await prisma.article.findUnique({
      where: { slug: post.slug }
    });

    if (!exists) {
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

      let publishedDate = new Date();
      try {
        if (post.date) {
          const engDate = post.date.replace('Okt', 'Oct').replace('Agt', 'Aug').replace('Mei', 'May').replace('Des', 'Dec');
          const parsed = new Date(engDate);
          if (!isNaN(parsed.getTime())) {
            publishedDate = parsed;
          }
        }
      } catch(e) {}

      await prisma.article.create({
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
      count++;
      console.log(`Created: ${post.title}`);
    }
  }

  console.log(`Successfully seeded ${count} articles.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
