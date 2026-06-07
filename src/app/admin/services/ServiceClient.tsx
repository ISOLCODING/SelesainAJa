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
import { createService, deleteService } from "@/app/actions/service";
import { toast } from "sonner";

export function ServiceClient({ initialServices }: { initialServices: any[] }) {
  const [services, setServices] = useState(initialServices);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [priceText, setPriceText] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [icon, setIcon] = useState("");

  const filtered = services.filter(
    (s) =>
      s.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.shortDescription?.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("slug", name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
    formData.append("shortDesc", shortDesc);
    formData.append("priceText", priceText);
    formData.append("deliveryTime", deliveryTime);
    formData.append("icon", icon);
    formData.append("isActive", "on");

    const res = await createService(formData);
    if (res.success && res.service) {
      toast.success("Layanan berhasil ditambahkan!");
      setServices([...services, res.service]);
      setOpen(false);
      setName("");
      setShortDesc("");
      setPriceText("");
      setDeliveryTime("");
      setIcon("");
    } else {
      toast.error(res.error || "Terjadi kesalahan");
    }
    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus layanan ini?")) return;
    
    const res = await deleteService(id);
    if (res.success) {
      toast.success("Layanan berhasil dihapus");
      setServices(services.filter((s) => s.id !== id));
    } else {
      toast.error(res.error || "Gagal menghapus");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800">Layanan</h2>
          <p className="text-slate-500">Kelola layanan yang ditawarkan (Bimbingan, Olah Data, dll).</p>
        </div>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger render={
            <Button className="bg-[#0066FF] hover:bg-[#0052cc] text-white">
              <Plus className="mr-2 h-4 w-4" /> Tambah Layanan
            </Button>
          } />
          <DialogContent className="max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Tambah Layanan Baru</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Nama Layanan</label>
                <Input 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Misal: Tugas Makalah" 
                  required 
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Deskripsi Singkat</label>
                <Textarea 
                  value={shortDesc} 
                  onChange={(e) => setShortDesc(e.target.value)} 
                  placeholder="Deskripsi singkat..." 
                  required 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Harga (Teks)</label>
                  <Input 
                    value={priceText} 
                    onChange={(e) => setPriceText(e.target.value)} 
                    placeholder="Mulai Rp 50.000" 
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Waktu Pengerjaan</label>
                  <Input 
                    value={deliveryTime} 
                    onChange={(e) => setDeliveryTime(e.target.value)} 
                    placeholder="1-3 Hari" 
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Nama Icon (React-Icons/Bi)</label>
                <Input 
                  value={icon} 
                  onChange={(e) => setIcon(e.target.value)} 
                  placeholder="Misal: BiBookOpen" 
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
              placeholder="Cari layanan..." 
              className="pl-9 focus-visible:ring-[#0066FF]"
            />
          </div>
        </div>

        <div className="rounded-md border border-slate-200 overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead>Nama Layanan</TableHead>
                <TableHead>Harga</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center h-32 text-slate-500">
                    Tidak ada layanan.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((service: any) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium text-slate-800">
                      {service.name}
                    </TableCell>
                    <TableCell className="text-slate-600">
                      {service.priceDisplay ? `Rp ${service.priceDisplay.toLocaleString("id-ID")}` : "Hubungi Kami"}
                    </TableCell>
                    <TableCell>
                      {service.isActive ? (
                        <span className="bg-[#00C853]/10 text-[#00C853] px-2.5 py-0.5 rounded-full text-xs font-medium border border-[#00C853]/20">Aktif</span>
                      ) : (
                        <span className="bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full text-xs font-medium border border-slate-200">Nonaktif</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-red-600" onClick={() => handleDelete(service.id)}>
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
