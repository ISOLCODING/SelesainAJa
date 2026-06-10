const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const articles = await prisma.article.findMany({ include: { author: true } });
  console.log("ARTICLES:");
  console.log(JSON.stringify(articles.map(a => ({ id: a.id, title: a.title, author: a.author?.name })), null, 2));
  
  const users = await prisma.user.findMany();
  console.log("USERS:");
  console.log(users.map(u => ({ id: u.id, name: u.name, role: u.role, email: u.email })));
}

main().finally(() => prisma.$disconnect());
