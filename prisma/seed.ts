const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Seed Admin
  const adminPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@selesainaja.com" },
    update: {},
    create: {
      email: "admin@selesainaja.com",
      name: "Admin SelesainAja",
      passwordHash: adminPassword,
      role: "admin",
    },
  });

  // Seed Writer
  const writerPassword = await bcrypt.hash("writer123", 10);
  const writer = await prisma.user.upsert({
    where: { email: "writer@selesainaja.com" },
    update: {},
    create: {
      email: "writer@selesainaja.com",
      name: "Writer SelesainAja",
      passwordHash: writerPassword,
      role: "writer",
    },
  });

  console.log({ admin, writer });
  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
