import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { id } from "date-fns/locale";
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
import { Search, CheckCircle, XCircle, Trash2, ExternalLink } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Komentar | SelesainAja Admin",
};

export default async function AdminCommentsPage() {
  const comments = await prisma.comment.findMany({
    orderBy: { createdAt: "desc" },
    // @ts-ignore
    include: {
      article: { select: { title: true, slug: true } }
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-[#00C853]/10 text-[#00C853] border-[#00C853]/20";
      case "pending": return "bg-[#FFB800]/10 text-[#FFB800] border-[#FFB800]/20";
      case "spam": return "bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20";
      default: return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800">Komentar</h2>
          <p className="text-slate-500">Moderasi komentar pengunjung pada artikel.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Cari komentar atau nama..." 
              className="pl-9 focus-visible:ring-[#0066FF]"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="bg-slate-800 text-white hover:bg-slate-700">Semua</Button>
            <Button variant="outline" size="sm">Pending</Button>
            <Button variant="outline" size="sm">Spam</Button>
          </div>
        </div>

        <div className="rounded-md border border-slate-200 overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead>Penulis</TableHead>
                <TableHead>Komentar</TableHead>
                <TableHead>Artikel</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-32 text-slate-500">
                    Tidak ada komentar.
                  </TableCell>
                </TableRow>
              ) : (
                comments.map((comment: any) => (
                  <TableRow key={comment.id}>
                    <TableCell>
                      <div className="font-medium text-slate-800">{comment.authorName}</div>
                      <div className="text-xs text-slate-500">{comment.authorEmail}</div>
                      <div className="text-xs text-slate-400 mt-1">
                        {format(new Date(comment.createdAt), "dd MMM yyyy, HH:mm", { locale: id })}
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-600 max-w-xs">
                      <p className="line-clamp-3 text-sm">{comment.content}</p>
                    </TableCell>
                    <TableCell>
                      <Link href={`/blog/${comment.article.slug}`} className="text-[#0066FF] hover:underline text-sm flex items-center gap-1 line-clamp-2" target="_blank">
                        {comment.article.title} <ExternalLink className="h-3 w-3 shrink-0" />
                      </Link>
                    </TableCell>
                    <TableCell>
                      {/* @ts-ignore */}
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(comment.status)}`}>
                        {comment.status === "approved" ? "Approved" : comment.status === "pending" ? "Pending" : "Spam"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right space-x-1">
                      {/* @ts-ignore */}
                      {comment.status !== "approved" && (
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-[#00C853]" title="Approve">
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                      {/* @ts-ignore */}
                      {comment.status !== "spam" && (
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-[#FFB800]" title="Mark as Spam">
                          <XCircle className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-red-600" title="Delete">
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
