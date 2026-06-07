import { ArticleEditor } from "@/components/cms/editor/ArticleEditor";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Tulis Artikel | SelesainAja Writer",
};

export default async function NewArticlePage({
  searchParams,
}: {
  searchParams: { title?: string };
}) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/writer/login");
  }

  const initialTitle = searchParams.title || "";
  
  // Fetch categories and tags for the sidebar
  const [categories, tags] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: 'asc' } }),
    prisma.tag.findMany({ orderBy: { name: 'asc' } })
  ]);

  return (
    <ArticleEditor 
      initialTitle={initialTitle}
      categories={categories}
      tags={tags}
    />
  );
}
