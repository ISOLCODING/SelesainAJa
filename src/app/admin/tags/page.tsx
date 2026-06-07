import { prisma } from "@/lib/prisma";
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
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tag | SelesainAja Admin",
};

export default async function AdminTagsPage() {
  const tags = await prisma.tag.findMany({
    orderBy: { name: "asc" },
    // @ts-ignore
    include: {
      _count: {
        select: { articles: true }
      }
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800">Tag</h2>
          <p className="text-slate-500">Kelola tag untuk artikel blog.</p>
        </div>
        <Button className="bg-[#0066FF] hover:bg-[#0052cc] text-white">
          <Plus className="mr-2 h-4 w-4" /> Tambah Tag
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Cari tag..." 
              className="pl-9 focus-visible:ring-[#0066FF]"
            />
          </div>
        </div>

        <div className="rounded-md border border-slate-200 overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead>Nama Tag</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead className="text-center">Jumlah Artikel</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tags.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center h-32 text-slate-500">
                    Tidak ada tag.
                  </TableCell>
                </TableRow>
              ) : (
                tags.map((tag) => (
                  <TableRow key={tag.id}>
                    <TableCell className="font-medium text-slate-800">
                      {tag.name}
                    </TableCell>
                    <TableCell className="text-slate-600">
                      {tag.slug}
                    </TableCell>
                    <TableCell className="text-center text-slate-600">
                      <span className="bg-slate-100 px-2 py-1 rounded-full text-xs font-medium">
                        {/* @ts-ignore */}
                        {tag._count?.articles || 0}
                      </span>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-[#0066FF]">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-red-600">
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
