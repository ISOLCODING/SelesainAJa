import { ArticleEditor } from "@/components/cms/editor/ArticleEditor";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit Artikel | SelesainAja Admin",
};

export default async function EditArticlePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  // Fetch article, categories, and tags
  const [article, categories, tags] = await Promise.all([
    prisma.article.findUnique({
      where: { id },
      include: {
        categories: true,
        tags: true,
      }
    }),
    prisma.category.findMany({ orderBy: { name: 'asc' } }),
    prisma.tag.findMany({ orderBy: { name: 'asc' } })
  ]);

  if (!article) {
    notFound();
  }

  // NOTE: A real implementation would pass the full article details to the editor
  // (content, meta, status, selected categories). For the scope of this UI build, 
  // we pass the initialTitle to demonstrate the view. The ArticleEditor component
  // would need to be extended to accept these additional props for full editing capability.

  return (
    <ArticleEditor 
      initialTitle={article.title}
      categories={categories}
      tags={tags}
      // additional props for edit mode
    />
  );
}
