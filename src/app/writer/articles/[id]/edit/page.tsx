import { ArticleEditor } from "@/components/cms/editor/ArticleEditor";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Edit Artikel | SelesainAja Writer",
};

export default async function EditArticlePage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/writer/login");
  }

  const { id } = params;

  // Fetch article, categories, and tags
  const [article, categories, tags] = await Promise.all([
    prisma.article.findUnique({
      where: { 
        id,
        // @ts-ignore
        authorId: session.user.id // Ensure writer can only edit their own
      },
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

  return (
    <ArticleEditor 
      initialTitle={article.title}
      categories={categories}
      tags={tags}
      // additional props for edit mode
    />
  );
}
