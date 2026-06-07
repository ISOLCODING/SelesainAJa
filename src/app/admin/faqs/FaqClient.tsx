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
import { createFaq, deleteFaq } from "@/app/actions/faq";
import { toast } from "sonner";

export function FaqClient({ initialFaqs }: { initialFaqs: any[] }) {
  const [faqs, setFaqs] = useState(initialFaqs);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const filteredFaqs = faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("question", question);
    formData.append("answer", answer);

    const res = await createFaq(formData);
    if (res.success && res.faq) {
      toast.success("FAQ berhasil ditambahkan!");
      setFaqs([...faqs, res.faq]);
      setOpen(false);
      setQuestion("");
      setAnswer("");
    } else {
      toast.error(res.error || "Terjadi kesalahan");
    }
    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus FAQ ini?")) return;
    
    const res = await deleteFaq(id);
    if (res.success) {
      toast.success("FAQ berhasil dihapus");
      setFaqs(faqs.filter((f) => f.id !== id));
    } else {
      toast.error(res.error || "Gagal menghapus");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800">FAQ</h2>
          <p className="text-slate-500">Kelola pertanyaan yang sering diajukan.</p>
        </div>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger render={
            <Button className="bg-[#0066FF] hover:bg-[#0052cc] text-white">
              <Plus className="mr-2 h-4 w-4" /> Tambah FAQ
            </Button>
          } />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah FAQ Baru</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Pertanyaan</label>
                <Input 
                  value={question} 
                  onChange={(e) => setQuestion(e.target.value)} 
                  placeholder="Misal: Berapa lama pengerjaan?" 
                  required 
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Jawaban</label>
                <Textarea 
                  value={answer} 
                  onChange={(e) => setAnswer(e.target.value)} 
                  placeholder="Jawaban dari pertanyaan di atas..." 
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
              placeholder="Cari pertanyaan..." 
              className="pl-9 focus-visible:ring-[#0066FF]"
            />
          </div>
        </div>

        <div className="rounded-md border border-slate-200 overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead>Pertanyaan</TableHead>
                <TableHead>Jawaban</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFaqs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center h-32 text-slate-500">
                    Tidak ada FAQ.
                  </TableCell>
                </TableRow>
              ) : (
                filteredFaqs.map((faq: any) => (
                  <TableRow key={faq.id}>
                    <TableCell className="font-medium text-slate-800 max-w-[200px] truncate">
                      {faq.question}
                    </TableCell>
                    <TableCell className="text-slate-600 max-w-[300px] truncate">
                      {faq.answer}
                    </TableCell>
                    <TableCell>
                      {faq.isActive ? (
                        <span className="bg-[#00C853]/10 text-[#00C853] px-2.5 py-0.5 rounded-full text-xs font-medium border border-[#00C853]/20">Aktif</span>
                      ) : (
                        <span className="bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full text-xs font-medium border border-slate-200">Nonaktif</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-red-600" onClick={() => handleDelete(faq.id)}>
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
