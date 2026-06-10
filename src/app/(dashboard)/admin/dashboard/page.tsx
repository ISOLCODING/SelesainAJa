import { StatCards } from "@/components/dashboard/StatCards";
import { ViewsChart } from "@/components/dashboard/ViewsChart";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { QuickDraft } from "@/components/dashboard/QuickDraft";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | SelesainAja Admin",
};

export default async function AdminDashboardPage() {
  const [totalArticles, pendingComments, totalWriters, articles] = await Promise.all([
    prisma.article.count(),
    prisma.comment.count({ where: { status: "pending" as any } }),
    prisma.user.count({ where: { role: "writer" as any } }),
    prisma.article.findMany({
      select: {
        id: true,
        title: true,
        viewCount: true,
        createdAt: true,
        author: { select: { name: true, image: true } }
      },
      orderBy: { createdAt: "desc" }
    })
  ]);

  const totalViews = articles.reduce((sum, article) => sum + article.viewCount, 0);

  const stats = {
    totalArticles,
    totalViews,
    totalWriters,
    pendingComments,
  };

  // Generate chart data for the last 30 days based on article creation
  const now = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(now.getDate() - 29);
  thirtyDaysAgo.setHours(0, 0, 0, 0);

  const chartDataMap = new Map<string, number>();
  for (let i = 0; i < 30; i++) {
    const d = new Date(thirtyDaysAgo);
    d.setDate(thirtyDaysAgo.getDate() + i);
    chartDataMap.set(d.toLocaleDateString("id-ID", { day: "numeric", month: "short" }), 0);
  }

  articles.forEach(article => {
    if (article.createdAt >= thirtyDaysAgo) {
      const dateStr = article.createdAt.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
      if (chartDataMap.has(dateStr)) {
        chartDataMap.set(dateStr, chartDataMap.get(dateStr)! + 1);
      }
    }
  });

  const chartData = Array.from(chartDataMap.entries()).map(([date, views]) => ({ date, views }));

  // Activities: taking top 5 newest articles
  const activities = articles.slice(0, 5).map(article => ({
    id: article.id,
    user: { name: article.author?.name || "Admin", image: article.author?.image || undefined },
    action: "mempublikasikan artikel",
    target: article.title,
    date: article.createdAt,
  }));

  return (
    <div className="space-y-4">
      <StatCards stats={stats} />

      <div className="grid gap-4 lg:grid-cols-3">
        <ViewsChart data={chartData} />
        <div className="space-y-4">
          <QuickDraft />
          <ActivityFeed activities={activities} />
        </div>
      </div>
    </div>
  );
}
