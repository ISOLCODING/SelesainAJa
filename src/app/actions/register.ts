"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(8, "Password minimal 8 karakter"),
});

export async function registerUser(formData: FormData) {
  try {
    const validated = registerSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!validated.success) {
      return { success: false, error: validated.error.issues?.[0]?.message || "Input tidak valid" };
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: validated.data.email },
    });

    if (existingUser) {
      return { success: false, error: "Email sudah terdaftar" };
    }

    const passwordHash = await bcrypt.hash(validated.data.password, 10);

    await prisma.user.create({
      data: {
        name: validated.data.name,
        email: validated.data.email,
        passwordHash,
        role: "writer", // Default role
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error registering user:", error);
    return { success: false, error: "Terjadi kesalahan saat mendaftar" };
  }
}
