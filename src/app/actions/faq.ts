"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createFaq(formData: FormData) {
  try {
    const question = formData.get("question") as string;
    const answer = formData.get("answer") as string;

    if (!question || !answer) {
      return { success: false, error: "Pertanyaan dan Jawaban wajib diisi" };
    }

    const faq = await prisma.faq.create({
      data: {
        question,
        answer,
        isActive: true,
      },
    });

    revalidatePath("/admin/faqs");
    revalidatePath("/");
    return { success: true, faq };
  } catch (error) {
    console.error("Error creating faq:", error);
    return { success: false, error: "Gagal menyimpan FAQ" };
  }
}

export async function deleteFaq(id: string) {
  try {
    await prisma.faq.delete({
      where: { id },
    });
    revalidatePath("/admin/faqs");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting faq:", error);
    return { success: false, error: "Gagal menghapus FAQ" };
  }
}
