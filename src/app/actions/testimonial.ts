"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createTestimonial(formData: FormData) {
  try {
    const customerName = formData.get("customerName") as string;
    const university = formData.get("university") as string;
    const content = formData.get("content") as string;
    const rating = parseInt(formData.get("rating") as string) || 5;
    const status = formData.get("status") as any || "published";

    if (!customerName || !content) {
      return { success: false, error: "Nama dan Konten wajib diisi" };
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        customerName,
        university,
        content,
        rating,
        status,
      },
    });

    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return { success: true, testimonial };
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return { success: false, error: "Gagal menyimpan testimoni" };
  }
}

export async function deleteTestimonial(id: string) {
  try {
    await prisma.testimonial.delete({
      where: { id },
    });
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return { success: false, error: "Gagal menghapus testimoni" };
  }
}
