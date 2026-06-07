"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TiptapEditor } from "@/components/editor/TiptapEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Save, Send, ImageIcon } from "lucide-react";
import Link from "next/link";
import { toast } from "react-hot-toast";

interface ArticleEditorProps {
  initialTitle?: string;
  categories: { id: string; name: string }[];
  tags: { id: string; name: string }[];
}

export function ArticleEditor({ initialTitle = "", categories, tags }: ArticleEditorProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState("");
  const [contentJson, setContentJson] = useState<any>(null);
  
  // Meta state
  const [status, setStatus] = useState("draft");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDesc, setMetaDesc] = useState("");
  const [slug, setSlug] = useState("");
  const [sourceName, setSourceName] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");

  const handleSave = async (isPublish: boolean = false) => {
    if (!title.trim()) {
      toast.error("Judul artikel tidak boleh kosong");
      return;
    }

    const savingToast = toast.loading(isPublish ? "Mempublikasikan..." : "Menyimpan draft...");

    try {
      // In a real app, this would be an API call
      // await fetch('/api/articles', { method: 'POST', body: JSON.stringify({...}) })
      
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(isPublish ? "Artikel dipublikasikan!" : "Draft tersimpan!", { id: savingToast });
      router.push("/admin/articles");
      router.refresh();
    } catch (error) {
      toast.error("Gagal menyimpan artikel", { id: savingToast });
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    // Auto generate slug if slug is empty or it was exactly matching the previous title's slug
    if (!slug || slug === title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')) {
      setSlug(newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/articles">
            <Button variant="outline" size="icon" className="h-9 w-9 border-slate-200">
              <ArrowLeft className="h-4 w-4 text-slate-600" />
            </Button>
          </Link>
          <h2 className="text-xl font-bold tracking-tight text-slate-800">Tulis Artikel Baru</h2>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" onClick={() => handleSave(false)} className="flex-1 sm:flex-none border-slate-200">
            <Save className="mr-2 h-4 w-4" /> Simpan Draft
          </Button>
          <Button onClick={() => handleSave(true)} className="flex-1 sm:flex-none bg-[#0066FF] hover:bg-[#0052cc] text-white">
            <Send className="mr-2 h-4 w-4" /> Publish
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Editor Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Judul Artikel</label>
              <Input 
                placeholder="Masukkan judul artikel yang menarik..." 
                value={title}
                onChange={handleTitleChange}
                className="text-lg font-medium py-6 focus-visible:ring-[#0066FF]"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Konten</label>
              <TiptapEditor 
                content={content} 
                onChange={(html, json) => {
                  setContent(html);
                  setContentJson(json);
                }} 
              />
            </div>
          </div>
        </div>

        {/* Sidebar Meta */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm sticky top-20">
            <Tabs defaultValue="settings" className="w-full">
              <TabsList className="w-full grid grid-cols-3 rounded-t-xl rounded-b-none border-b border-slate-100 bg-slate-50/50 p-0 h-12">
                <TabsTrigger value="settings" className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-[#0066FF] rounded-none">Pengaturan</TabsTrigger>
                <TabsTrigger value="image" className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-[#0066FF] rounded-none">Gambar</TabsTrigger>
                <TabsTrigger value="seo" className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-[#0066FF] rounded-none">SEO</TabsTrigger>
              </TabsList>
              
              <TabsContent value="settings" className="p-5 space-y-6 mt-0">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Status</label>
                  <select 
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="draft">Draft</option>
                    <option value="pending_review">Pending Review</option>
                    <option value="published">Published</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-700">Kategori</label>
                  <div className="space-y-2 max-h-40 overflow-y-auto p-3 border border-slate-200 rounded-md bg-slate-50/50">
                    {categories.map((cat) => (
                      <div key={cat.id} className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          id={`cat-${cat.id}`}
                          checked={selectedCategories.includes(cat.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedCategories([...selectedCategories, cat.id]);
                            } else {
                              setSelectedCategories(selectedCategories.filter(id => id !== cat.id));
                            }
                          }}
                          className="h-4 w-4 rounded border-slate-300 text-[#0066FF] focus:ring-[#0066FF]"
                        />
                        <label htmlFor={`cat-${cat.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-600">
                          {cat.name}
                        </label>
                      </div>
                    ))}
                    {categories.length === 0 && (
                      <p className="text-sm text-slate-500 italic">Belum ada kategori.</p>
                    )}
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h4 className="text-sm font-bold text-slate-800">Sumber Referensi <span className="text-xs font-normal text-slate-500">(Opsional)</span></h4>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-700">Nama Sumber</label>
                    <Input 
                      placeholder="contoh: Jurnal Kemendikbud" 
                      value={sourceName}
                      onChange={(e) => setSourceName(e.target.value)}
                      className="text-sm h-9"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-700">Link Sumber</label>
                    <Input 
                      placeholder="https://..." 
                      value={sourceUrl}
                      onChange={(e) => setSourceUrl(e.target.value)}
                      className="text-sm h-9"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="image" className="p-5 mt-0">
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 transition-colors">
                    <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                      <ImageIcon className="h-6 w-6 text-slate-400" />
                    </div>
                    <p className="text-sm font-medium text-slate-700">Pilih Gambar Utama</p>
                    <p className="text-xs text-slate-500 mt-1">Klik untuk upload atau pilih dari media</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="seo" className="p-5 space-y-4 mt-0">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-slate-700">Meta Title</label>
                    <span className={`text-xs ${metaTitle.length > 60 ? 'text-red-500' : 'text-slate-400'}`}>
                      {metaTitle.length}/60
                    </span>
                  </div>
                  <Input 
                    placeholder="Judul untuk mesin pencari..." 
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-slate-700">Meta Description</label>
                    <span className={`text-xs ${metaDesc.length > 160 ? 'text-red-500' : 'text-slate-400'}`}>
                      {metaDesc.length}/160
                    </span>
                  </div>
                  <Textarea 
                    placeholder="Deskripsi singkat artikel (muncul di Google)..." 
                    className="resize-none h-24"
                    value={metaDesc}
                    onChange={(e) => setMetaDesc(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Slug URL</label>
                  <Input 
                    placeholder="contoh-judul-artikel" 
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
