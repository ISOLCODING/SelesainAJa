"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function getAdminDashboardStats() {
  try {
    const session = await auth();
    // @ts-ignore
    if (!session?.user || session.user.role !== "admin") {
      throw new Error("Unauthorized");
    }

    const totalPosts = await prisma.article.count();
    
    const viewsAggregation = await prisma.article.aggregate({
      _sum: { viewCount: true }
    });
    const totalViews = viewsAggregation._sum.viewCount || 0;
    
    const activeWriters = await prisma.user.count({
      where: { role: "writer" }
    });
    
    const activeServices = await prisma.service.count({
      where: { isActive: true }
    });

    const recentPosts = await prisma.article.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { author: { select: { name: true } } }
    });

    return {
      totalPosts,
      totalViews,
      activeWriters,
      activeServices,
      recentPosts
    };
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return {
      totalPosts: 0,
      totalViews: 0,
      activeWriters: 0,
      activeServices: 0,
      recentPosts: []
    };
  }
}

export async function getWriterDashboardStats() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    const userId = session.user.id as string;

    const totalPosts = await prisma.article.count({
      where: { authorId: userId }
    });
    
    const publishedPosts = await prisma.article.count({
      where: { authorId: userId, status: "published" }
    });
    
    const draftPosts = await prisma.article.count({
      where: { authorId: userId, status: "draft" }
    });

    const recentPosts = await prisma.article.findMany({
      where: { authorId: userId },
      orderBy: { createdAt: "desc" },
      take: 5
    });

    return {
      totalPosts,
      publishedPosts,
      draftPosts,
      recentPosts
    };
  } catch (error) {
    console.error("Error fetching writer stats:", error);
    return {
      totalPosts: 0,
      publishedPosts: 0,
      draftPosts: 0,
      recentPosts: []
    };
  }
}
