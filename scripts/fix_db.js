const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();
  const writer = users.find(u => u.role === 'writer');
  
  if (!writer) {
    console.log("No writer found");
    return;
  }

  const articles = await prisma.article.findMany({
    orderBy: { createdAt: 'desc' }
  });

  console.log(`Found ${articles.length} articles. Reassigning 4 to writer ${writer.name}...`);

  for (let i = 0; i < 4; i++) {
    if (articles[i]) {
      await prisma.article.update({
        where: { id: articles[i].id },
        data: { authorId: writer.id }
      });
      console.log(`Reassigned: ${articles[i].title}`);
    }
  }

  console.log("Done!");
}

main().finally(() => prisma.$disconnect());
