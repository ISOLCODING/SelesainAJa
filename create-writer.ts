import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("writer123", 10);
  
  const writer = await prisma.user.upsert({
    where: { email: "writer@selesainaja.com" },
    update: {
      passwordHash,
      role: "writer",
      isActive: true,
    },
    create: {
      email: "writer@selesainaja.com",
      name: "Writer SelesainAja",
      passwordHash,
      role: "writer",
      isActive: true,
    },
  });

  console.log("Writer created:", writer);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
