"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, UploadCloud, Copy, Edit, Trash2, LayoutGrid, List as ListIcon, FileIcon } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

// Mock data for the UI
const MOCK_MEDIA = [
  {
    id: "1",
    filename: "hero-image-v2.jpg",
    originalName: "IMG_9012.jpg",
    mimeType: "image/jpeg",
    size: 2450000, // ~2.4MB
    url: "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
    createdAt: new Date(),
    folder: "general"
  },
  {
    id: "2",
    filename: "logo-transparent.png",
    originalName: "logo.png",
    mimeType: "image/png",
    size: 150000,
    url: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9",
    createdAt: new Date(Date.now() - 86400000 * 2),
    folder: "branding"
  },
  {
    id: "3",
    filename: "document-template.pdf",
    originalName: "template.pdf",
    mimeType: "application/pdf",
    size: 500000,
    url: "#",
    createdAt: new Date(Date.now() - 86400000 * 5),
    folder: "documents"
  }
];

export default function AdminMediaPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");

  const formatBytes = (bytes: number, decimals = 2) => {
    if (!+bytes) return '0 Bytes'
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800">Media Library</h2>
          <p className="text-slate-500">Kelola semua file gambar dan dokumen.</p>
        </div>
        <Button className="bg-[#0066FF] hover:bg-[#0052cc] text-white">
          <UploadCloud className="mr-2 h-4 w-4" /> Upload Media
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Cari file..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 focus-visible:ring-[#0066FF]"
            />
          </div>
          <div className="flex items-center gap-2 border border-slate-200 rounded-md p-1 bg-slate-50">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`h-8 px-2 ${view === 'grid' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500'}`}
              onClick={() => setView("grid")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`h-8 px-2 ${view === 'list' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500'}`}
              onClick={() => setView("list")}
            >
              <ListIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Drag & Drop Upload Zone (Simplified) */}
        <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 mb-6 flex flex-col items-center justify-center text-center bg-slate-50/50 hover:bg-slate-50 transition-colors">
          <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
            <UploadCloud className="h-6 w-6 text-slate-500" />
          </div>
          <h3 className="text-sm font-semibold text-slate-700">Tarik dan letakkan file di sini</h3>
          <p className="text-xs text-slate-500 mt-1 mb-4">atau klik untuk memilih file (Max 5MB)</p>
          <Button variant="outline" size="sm">Pilih File</Button>
        </div>

        {/* Media Grid View */}
        {view === "grid" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {MOCK_MEDIA.map((item) => (
              <div key={item.id} className="group relative rounded-lg border border-slate-200 overflow-hidden bg-slate-50 aspect-square flex flex-col">
                <div className="flex-1 bg-slate-100 flex items-center justify-center overflow-hidden">
                  {item.mimeType.startsWith('image/') ? (
                    <img src={item.url} alt={item.filename} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <FileIcon className="h-12 w-12 text-slate-400" />
                  )}
                </div>
                <div className="p-2 bg-white border-t border-slate-100 text-xs">
                  <p className="truncate font-medium text-slate-700" title={item.filename}>{item.filename}</p>
                  <p className="text-slate-500 mt-0.5">{formatBytes(item.size)}</p>
                </div>
                
                {/* Actions overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
                  <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full" title="Copy URL">
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full" title="Edit">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="destructive" className="h-8 w-8 rounded-full" title="Hapus">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Media List View */}
        {view === "list" && (
          <div className="border border-slate-200 rounded-md">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-medium">
                <tr>
                  <th className="px-4 py-3">File</th>
                  <th className="px-4 py-3">Tipe</th>
                  <th className="px-4 py-3">Ukuran</th>
                  <th className="px-4 py-3">Tanggal Upload</th>
                  <th className="px-4 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_MEDIA.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 flex items-center gap-3">
                      <div className="h-10 w-10 rounded bg-slate-100 flex items-center justify-center shrink-0 overflow-hidden">
                        {item.mimeType.startsWith('image/') ? (
                          <img src={item.url} alt={item.filename} className="w-full h-full object-cover" />
                        ) : (
                          <FileIcon className="h-5 w-5 text-slate-400" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-slate-800 line-clamp-1">{item.filename}</p>
                        <p className="text-xs text-slate-500 line-clamp-1">{item.folder}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{item.mimeType}</td>
                    <td className="px-4 py-3 text-slate-600">{formatBytes(item.size)}</td>
                    <td className="px-4 py-3 text-slate-600">
                      {format(item.createdAt, "dd MMM yyyy", { locale: id })}
                    </td>
                    <td className="px-4 py-3 text-right space-x-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-slate-800">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-[#0066FF]">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
