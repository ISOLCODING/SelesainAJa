import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search, Edit, Eye, Trash2, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artikel | SelesainAja Admin",
};

export default async function AdminArticlesPage({
  searchParams,
}: {
  searchParams: { q?: string; status?: string };
}) {
  const query = searchParams.q || "";
  const statusFilter = searchParams.status || "all";

  // Fetch articles based on query and status
  const whereClause: any = {};
  if (query) {
    whereClause.title = { contains: query, mode: "insensitive" };
  }
  if (statusFilter !== "all") {
    // @ts-ignore - Ignore TS error due to cached Prisma types
    whereClause.status = statusFilter;
  }

  const articles = await prisma.article.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: { name: true },
      },
      categories: {
        include: { category: true },
      },
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published": return "bg-[#00C853]/10 text-[#00C853] border-[#00C853]/20";
      case "draft": return "bg-slate-100 text-slate-600 border-slate-200";
      case "pending_review": return "bg-[#FFB800]/10 text-[#FFB800] border-[#FFB800]/20";
      case "scheduled": return "bg-[#0066FF]/10 text-[#0066FF] border-[#0066FF]/20";
      default: return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "published": return "Published";
      case "draft": return "Draft";
      case "pending_review": return "Pending Review";
      case "scheduled": return "Scheduled";
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800">Artikel</h2>
          <p className="text-slate-500">Kelola semua artikel blog SelesainAja.</p>
        </div>
        <Link href="/admin/articles/new">
          <Button className="bg-[#0066FF] hover:bg-[#0052cc] text-white">
            <Plus className="mr-2 h-4 w-4" /> Tulis Artikel
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Cari artikel..." 
              className="pl-9 focus-visible:ring-[#0066FF]"
              defaultValue={query}
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
            {["all", "published", "draft", "pending_review"].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? "default" : "outline"}
                className={statusFilter === status ? "bg-slate-800" : ""}
                size="sm"
              >
                {status === "all" ? "Semua" : getStatusLabel(status)}
              </Button>
            ))}
          </div>
        </div>

        <div className="rounded-md border border-slate-200 overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="w-[300px]">Judul</TableHead>
                <TableHead>Penulis</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-32 text-slate-500">
                    Tidak ada artikel ditemukan.
                  </TableCell>
                </TableRow>
              ) : (
                articles.map((article: any) => (
                  <TableRow key={article.id} className="group">
                    <TableCell className="font-medium text-slate-800">
                      <div className="line-clamp-2">{article.title}</div>
                    </TableCell>
                    <TableCell className="text-slate-600">
                      {article.author?.name || "Unknown"}
                    </TableCell>
                    <TableCell>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(article.status)}`}>
                        {getStatusLabel(article.status)}
                      </span>
                    </TableCell>
                    <TableCell className="text-slate-600">
                      <div className="flex flex-wrap gap-1">
                        {article.categories?.map((c: any) => (
                          <span key={c.categoryId} className="text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                            {c.category.name}
                          </span>
                        ))}
                        {!article.categories?.length && "-"}
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-600 whitespace-nowrap">
                      {format(new Date(article.createdAt), "dd MMM yyyy", { locale: id })}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="h-8 w-8 p-0 inline-flex items-center justify-center rounded-md text-sm font-medium hover:bg-slate-100 hover:text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <Link href={`/admin/articles/${article.id}/edit`}>
                            <DropdownMenuItem className="cursor-pointer">
                              <Edit className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                          </Link>
                          <a href={`/blog/${article.slug}`} target="_blank" rel="noreferrer">
                            <DropdownMenuItem className="cursor-pointer">
                              <Eye className="mr-2 h-4 w-4" /> Preview
                            </DropdownMenuItem>
                          </a>
                          <DropdownMenuItem className="text-red-600 focus:bg-red-50 cursor-pointer">
                            <Trash2 className="mr-2 h-4 w-4" /> Hapus
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
