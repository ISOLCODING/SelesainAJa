import { QuickDraft } from "@/components/dashboard/QuickDraft";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { FileText, Eye, Edit3, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard | SelesainAja Writer",
};

export default async function WriterDashboardPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/writer/login");
  }

  // Fetch writer specific stats
  // @ts-ignore
  const articles = await prisma.article.findMany({
    where: { 
      authorId: session.user.id 
    },
    select: {
      id: true,
      title: true,
      status: true,
      viewCount: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" }
  });

  const totalArticles = articles.length;
  const draftArticles = articles.filter(a => a.status === "draft").length;
  const publishedArticles = articles.filter(a => a.status === "published").length;
  const totalViews = articles.reduce((sum, article) => sum + article.viewCount, 0);

  // Activities: taking top 5 newest articles by this writer
  const activities = articles.slice(0, 5).map(article => ({
    id: article.id,
    user: { name: session.user?.name || "Penulis", image: session.user?.image || undefined },
    action: article.status === "draft" ? "membuat draft" : "mempublikasikan artikel",
    target: article.title,
    date: article.createdAt,
  }));

  const statCards = [
    {
      title: "Total Artikel",
      value: totalArticles,
      desc: `${publishedArticles} sudah rilis`,
      icon: FileText,
      color: "bg-blue-50 text-blue-600",
      href: "/writer/articles?status=all"
    },
    {
      title: "Total Views",
      value: totalViews.toLocaleString("id-ID"),
      desc: "Dari seluruh artikel",
      icon: Eye,
      color: "bg-green-50 text-green-600",
      href: "#"
    },
    {
      title: "Draft Tersimpan",
      value: draftArticles,
      desc: "Menunggu diselesaikan",
      icon: Edit3,
      color: "bg-orange-50 text-orange-600",
      href: "/writer/articles?status=draft"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800">Halo, {session.user.name} 👋</h2>
          <p className="text-slate-500 mt-1">Selamat datang kembali. Mari bagikan lebih banyak cerita hari ini!</p>
        </div>
        <Link href="/writer/articles/new">
          <button className="bg-[#0066FF] hover:bg-[#0052cc] text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
            <Edit3 className="w-4 h-4" /> Tulis Artikel Baru
          </button>
        </Link>
      </div>

      {/* Modern Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((card, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative group overflow-hidden transition-all hover:shadow-md hover:border-slate-200">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${card.color}`}>
                <card.icon className="w-6 h-6" />
              </div>
              {card.href !== "#" && (
                <Link href={card.href}>
                  <div className="text-slate-400 hover:text-[#0066FF] transition-colors p-1">
                    <ArrowUpRight className="w-5 h-5 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                  </div>
                </Link>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">{card.title}</p>
              <h3 className="text-3xl font-bold text-slate-800">{card.value}</h3>
              <p className="text-xs text-slate-500 mt-2 font-medium">{card.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {/* Custom Wrapper for Activity Feed to give it a modern container */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-800">Aktivitas Terakhir Anda</h3>
              <Link href="/writer/articles" className="text-sm text-[#0066FF] hover:underline font-medium">Lihat Semua</Link>
            </div>
            <div className="p-2 sm:p-4">
               {/* We wrap it in a slightly modified wrapper so we don't break the ActivityFeed component UI */}
              <ActivityFeed activities={activities} />
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
           <QuickDraft />
        </div>
      </div>
    </div>
  );
}
