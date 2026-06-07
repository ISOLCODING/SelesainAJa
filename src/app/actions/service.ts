"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getServices() {
  try {
    return await prisma.service.findMany({
      orderBy: { sortOrder: "asc" },
    });
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

export async function createService(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const shortDescription = formData.get("shortDesc") as string;
    const fullDescription = formData.get("longDesc") as string;
    const priceDisplay = formData.get("priceText") as string;
    const icon = formData.get("icon") as string;
    const sortOrder = parseInt(formData.get("displayOrder") as string) || 0;
    const isActive = formData.get("isActive") === "on";

    if (!name || !slug) {
      return { success: false, error: "Nama dan Slug wajib diisi" };
    }

    const service = await prisma.service.create({
      data: {
        name,
        slug,
        shortDescription,
        fullDescription,
        priceDisplay,
        icon,
        sortOrder,
        isActive,
      },
    });

    revalidatePath("/admin/services");
    return { success: true, service };
  } catch (error) {
    console.error("Error creating service:", error);
    return { success: false, error: "Gagal menyimpan layanan" };
  }
}

export async function deleteService(id: string) {
  try {
    await prisma.service.delete({
      where: { id },
    });
    revalidatePath("/admin/services");
    return { success: true };
  } catch (error) {
    console.error("Error deleting service:", error);
    return { success: false, error: "Gagal menghapus layanan" };
  }
}
