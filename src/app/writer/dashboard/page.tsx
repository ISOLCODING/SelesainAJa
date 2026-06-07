import { StatCards } from "@/components/dashboard/StatCards";
import { QuickDraft } from "@/components/dashboard/QuickDraft";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | SelesainAja Writer",
};

export default async function WriterDashboardPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/writer/login");
  }

  // Fetch writer specific stats
  const [totalArticles, draftArticles] = await Promise.all([
    // @ts-ignore
    prisma.article.count({ 
      where: { 
        authorId: session.user.id 
      } 
    }),
    // @ts-ignore
    prisma.article.count({ 
      where: { 
        authorId: session.user.id,
        status: "draft"
      } 
    }),
  ]);

  const stats = {
    totalArticles,
    totalViews: 0, // Mock, would need sum of views for author's articles
    totalWriters: 1, // Irrelevant for writer view, maybe change the cards later
    pendingComments: draftArticles, // Just repurposing the cards for now
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-800">Halo, {session.user.name}</h2>
        <p className="text-slate-500">Selamat datang di dashboard penulis.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <QuickDraft />
      </div>
    </div>
  );
}
