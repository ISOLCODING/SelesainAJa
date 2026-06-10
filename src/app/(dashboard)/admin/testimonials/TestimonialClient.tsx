"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { createTestimonial, deleteTestimonial } from "@/app/actions/testimonial";
import { toast } from "sonner";

export function TestimonialClient({ initialTestimonials }: { initialTestimonials: any[] }) {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [customerName, setCustomerName] = useState("");
  const [university, setUniversity] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState("5");

  const filtered = testimonials.filter(
    (t) =>
      t.customerName?.toLowerCase().includes(search.toLowerCase()) ||
      t.university?.toLowerCase().includes(search.toLowerCase()) ||
      t.content?.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("customerName", customerName);
    formData.append("university", university);
    formData.append("content", content);
    formData.append("rating", rating);

    const res = await createTestimonial(formData);
    if (res.success && res.testimonial) {
      toast.success("Testimoni berhasil ditambahkan!");
      setTestimonials([...testimonials, res.testimonial]);
      setOpen(false);
      setCustomerName("");
      setUniversity("");
      setContent("");
      setRating("5");
    } else {
      toast.error(res.error || "Terjadi kesalahan");
    }
    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus testimoni ini?")) return;
    
    const res = await deleteTestimonial(id);
    if (res.success) {
      toast.success("Testimoni berhasil dihapus");
      setTestimonials(testimonials.filter((t) => t.id !== id));
    } else {
      toast.error(res.error || "Gagal menghapus");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800">Testimoni</h2>
          <p className="text-slate-500">Kelola ulasan dan testimoni klien.</p>
        </div>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger render={
            <Button className="bg-[#0066FF] hover:bg-[#0052cc] text-white">
              <Plus className="mr-2 h-4 w-4" /> Tambah Testimoni
            </Button>
          } />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Testimoni Baru</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Nama Klien</label>
                <Input 
                  value={customerName} 
                  onChange={(e) => setCustomerName(e.target.value)} 
                  placeholder="Misal: Budi Santoso" 
                  required 
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Universitas/Jurusan</label>
                <Input 
                  value={university} 
                  onChange={(e) => setUniversity(e.target.value)} 
                  placeholder="Misal: Universitas Indonesia" 
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Rating (1-5)</label>
                <Input 
                  type="number"
                  min="1"
                  max="5"
                  value={rating} 
                  onChange={(e) => setRating(e.target.value)} 
                  required 
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Konten Ulasan</label>
                <Textarea 
                  value={content} 
                  onChange={(e) => setContent(e.target.value)} 
                  placeholder="Isi testimoni dari klien..." 
                  required 
                  rows={4}
                />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>Batal</Button>
                <Button type="submit" disabled={isLoading} className="bg-[#0066FF] hover:bg-[#0052cc] text-white">
                  {isLoading ? "Menyimpan..." : "Simpan"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari testimoni..." 
              className="pl-9 focus-visible:ring-[#0066FF]"
            />
          </div>
        </div>

        <div className="rounded-md border border-slate-200 overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead>Klien</TableHead>
                <TableHead>Ulasan</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center h-32 text-slate-500">
                    Tidak ada testimoni.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((testi: any) => (
                  <TableRow key={testi.id}>
                    <TableCell className="font-medium text-slate-800">
                      {testi.customerName}
                      <div className="text-xs text-slate-500">{testi.university}</div>
                    </TableCell>
                    <TableCell className="text-slate-600 max-w-[300px] truncate">
                      {testi.content}
                    </TableCell>
                    <TableCell>
                      <span className="text-[#FF6B00] font-bold">{testi.rating}/5</span>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-red-600" onClick={() => handleDelete(testi.id)}>
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
