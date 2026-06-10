"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save } from "lucide-react";
import { toast } from "react-hot-toast";

export default function AdminSettingsPage() {
  const handleSave = () => {
    toast.success("Pengaturan berhasil disimpan");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800">Pengaturan</h2>
          <p className="text-slate-500">Konfigurasi umum website SelesainAja.</p>
        </div>
        <Button onClick={handleSave} className="bg-[#0066FF] hover:bg-[#0052cc] text-white">
          <Save className="mr-2 h-4 w-4" /> Simpan Perubahan
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="w-full justify-start rounded-none border-b border-slate-100 bg-slate-50/50 p-0 h-12 px-4">
            <TabsTrigger value="general" className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-[#0066FF] rounded-none h-12 px-6">Umum</TabsTrigger>
            <TabsTrigger value="seo" className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-[#0066FF] rounded-none h-12 px-6">SEO</TabsTrigger>
            <TabsTrigger value="social" className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-[#0066FF] rounded-none h-12 px-6">Sosial Media</TabsTrigger>
            <TabsTrigger value="smtp" className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-[#0066FF] rounded-none h-12 px-6">Email SMTP</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="p-6 space-y-6 mt-0">
            <div className="space-y-4 max-w-2xl">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Nama Website</label>
                <Input defaultValue="SelesainAja" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Deskripsi Singkat</label>
                <Textarea defaultValue="Platform layanan penyelesaian tugas dan skripsi terpercaya." className="h-20" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Email Kontak</label>
                <Input type="email" defaultValue="halo@selesainaja.vercel.app" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Nomor WhatsApp</label>
                <Input defaultValue="+6281234567890" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Logo Website (URL)</label>
                <Input defaultValue="/logo.png" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Favicon (URL)</label>
                <Input defaultValue="/favicon.ico" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="seo" className="p-6 space-y-6 mt-0">
            <div className="space-y-4 max-w-2xl">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Meta Title Default</label>
                <Input defaultValue="SelesainAja - Layanan Skripsi & Tugas Terbaik" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Meta Description Default</label>
                <Textarea defaultValue="SelesainAja membantu mahasiswa menyelesaikan skripsi, tesis, dan tugas dengan cepat dan tepat." className="h-20" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Google Analytics Tracking ID</label>
                <Input placeholder="G-XXXXXXXXXX" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="social" className="p-6 space-y-6 mt-0">
            <div className="space-y-4 max-w-2xl">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Instagram URL</label>
                <Input placeholder="https://instagram.com/selesainaja" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">TikTok URL</label>
                <Input placeholder="https://tiktok.com/@selesainaja" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">LinkedIn URL</label>
                <Input placeholder="https://linkedin.com/company/selesainaja" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="smtp" className="p-6 space-y-6 mt-0">
            <div className="space-y-4 max-w-2xl">
              <div className="p-4 bg-blue-50 text-blue-800 text-sm rounded-md border border-blue-100">
                Pengaturan SMTP digunakan untuk mengirim email notifikasi seperti reset password.
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">SMTP Host</label>
                <Input placeholder="smtp.gmail.com" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">SMTP Port</label>
                  <Input placeholder="587" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Enkripsi</label>
                  <select className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:ring-offset-2">
                    <option value="tls">TLS</option>
                    <option value="ssl">SSL</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">SMTP Username</label>
                <Input placeholder="email@domain.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">SMTP Password</label>
                <Input type="password" placeholder="••••••••••••" />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
