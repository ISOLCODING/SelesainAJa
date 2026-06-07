"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { z } from "zod";

const postSchema = z.object({
  title: z.string().min(3, "Judul minimal 3 karakter").max(500),
  slug: z.string().min(3).max(500),
  content: z.string(),
  contentJson: z.any().optional(),
  excerpt: z.string().optional(),
  status: z.enum(["draft", "pending_review", "published", "scheduled"]).default("draft"),
});

export async function getPosts() {
  try {
    const session = await auth();
    if (!session?.user) return [];

    // Jika admin, kembalikan semua. Jika writer, kembalikan miliknya saja
    // @ts-ignore
    const where = session.user.role === "admin" ? {} : { authorId: session.user.id };

    return await prisma.article.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        author: { select: { name: true, email: true } },
        categories: { include: { category: true } },
      }
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function createPost(formData: FormData) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    const validated = postSchema.safeParse({
      title: formData.get("title"),
      slug: formData.get("slug"),
      content: formData.get("content"),
      contentJson: JSON.parse(formData.get("contentJson") as string || "{}"),
      excerpt: formData.get("excerpt"),
      status: formData.get("status") || "draft",
    });

    if (!validated.success) {
      return { success: false, error: validated.error.issues?.[0]?.message || "Input tidak valid" };
    }

    const post = await prisma.article.create({
      data: {
        ...validated.data,
        authorId: session.user.id as string,
        publishedAt: validated.data.status === "published" ? new Date() : null,
      },
    });

    revalidatePath("/admin/articles");
    revalidatePath("/writer/articles");
    return { success: true, post };
  } catch (error) {
    console.error("Error creating post:", error);
    return { success: false, error: "Gagal menyimpan artikel. Pastikan slug unik." };
  }
}

export async function deletePost(id: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    // @ts-ignore
    if (session.user.role !== "admin") {
      const post = await prisma.article.findUnique({ where: { id } });
      if (post?.authorId !== session.user.id) {
        return { success: false, error: "Forbidden: Bukan artikel Anda" };
      }
    }

    await prisma.article.delete({
      where: { id },
    });
    
    revalidatePath("/admin/articles");
    revalidatePath("/writer/articles");
    return { success: true };
  } catch (error) {
    console.error("Error deleting post:", error);
    return { success: false, error: "Gagal menghapus artikel" };
  }
}
