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
import { Plus, Search, Edit, Trash2, Shield, User } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pengguna | SelesainAja Admin",
};

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800">Pengguna</h2>
          <p className="text-slate-500">Kelola Admin dan Penulis (Writer).</p>
        </div>
        <Button className="bg-[#0066FF] hover:bg-[#0052cc] text-white">
          <Plus className="mr-2 h-4 w-4" /> Tambah Pengguna
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Cari nama atau email..." 
              className="pl-9 focus-visible:ring-[#0066FF]"
            />
          </div>
        </div>

        <div className="rounded-md border border-slate-200 overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Terdaftar</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-32 text-slate-500">
                    Tidak ada pengguna.
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user: any) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium text-slate-800 flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 overflow-hidden shrink-0">
                        {user.image ? (
                          <img src={user.image} alt={user.name || "User"} className="h-full w-full object-cover" />
                        ) : (
                          <User className="h-4 w-4" />
                        )}
                      </div>
                      {user.name || "-"}
                    </TableCell>
                    <TableCell className="text-slate-600">
                      {user.email}
                    </TableCell>
                    <TableCell>
                      {user.role === "admin" ? (
                        <span className="flex items-center w-fit gap-1 bg-[#8B5CF6]/10 text-[#8B5CF6] px-2.5 py-0.5 rounded-full text-xs font-medium border border-[#8B5CF6]/20">
                          <Shield className="h-3 w-3" /> Admin
                        </span>
                      ) : (
                        <span className="flex items-center w-fit gap-1 bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full text-xs font-medium border border-slate-200">
                          <User className="h-3 w-3" /> Writer
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-slate-600 whitespace-nowrap">
                      {format(new Date(user.createdAt), "dd MMM yyyy", { locale: id })}
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
