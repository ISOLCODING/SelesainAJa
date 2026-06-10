"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { TiptapEditor } from "@/components/editor/TiptapEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Save, Send, ImageIcon, Eye, CalendarIcon, CheckCircle2, XCircle, Trash2 } from "lucide-react";
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
  
  // New features state
  const [wordCount, setWordCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [focusKeyword, setFocusKeyword] = useState("");
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Calculate word count and reading time
  useEffect(() => {
    // Simple text extraction from HTML
    const text = content.replace(/<[^>]*>?/gm, '');
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const count = words.length;
    setWordCount(count);
    
    // Average reading speed: 200 words per minute
    const time = Math.max(1, Math.ceil(count / 200));
    setReadingTime(count === 0 ? 0 : time);
  }, [content]);

  // Auto-save simulation
  useEffect(() => {
    if (!title.trim() && !content.trim()) return;
    
    setIsSaving(true);
    const timer = setTimeout(() => {
      // Simulate API call
      setLastSaved(new Date());
      setIsSaving(false);
    }, 1500); // 1.5 seconds after stopped typing

    return () => clearTimeout(timer);
  }, [title, content, metaTitle, metaDesc, slug, status]);

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
          <Button variant="outline" className="hidden sm:flex border-slate-200">
            <Eye className="mr-2 h-4 w-4" /> Preview
          </Button>
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
            
            {/* Editor Footer / Meta Info */}
            <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-4">
                <span>{wordCount} kata</span>
                <span>Estimasi {readingTime} mnt baca</span>
              </div>
              <div className="flex items-center gap-1.5">
                {isSaving ? (
                  <span className="flex items-center gap-1">Menyimpan...</span>
                ) : lastSaved ? (
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-green-500" />
                    Tersimpan {lastSaved.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                ) : (
                  <span>Draft belum tersimpan</span>
                )}
              </div>
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

                {status === "scheduled" && (
                  <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 border border-slate-100 rounded-lg">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-700">Tanggal Terbit</label>
                      <div className="relative">
                        <Input 
                          type="date" 
                          value={scheduledDate}
                          onChange={(e) => setScheduledDate(e.target.value)}
                          className="text-sm h-9 pl-8"
                        />
                        <CalendarIcon className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-700">Waktu Terbit</label>
                      <Input 
                        type="time" 
                        value={scheduledTime}
                        onChange={(e) => setScheduledTime(e.target.value)}
                        className="text-sm h-9"
                      />
                    </div>
                  </div>
                )}

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
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        // Create a local object URL for preview
                        const url = URL.createObjectURL(file);
                        setFeaturedImage(url);
                      }
                    }}
                  />
                  
                  {featuredImage ? (
                    <div className="relative rounded-lg overflow-hidden border border-slate-200 group">
                      <img src={featuredImage} alt="Featured" className="w-full h-auto object-cover aspect-video" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <Button variant="secondary" size="sm" onClick={() => fileInputRef.current?.click()}>
                          Ganti
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => {
                          setFeaturedImage(null);
                          if (fileInputRef.current) fileInputRef.current.value = '';
                        }}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-slate-300 hover:border-[#0066FF] rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer bg-slate-50 hover:bg-blue-50/50 transition-colors"
                    >
                      <div className="h-12 w-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-3">
                        <ImageIcon className="h-6 w-6 text-slate-400" />
                      </div>
                      <p className="text-sm font-medium text-slate-700">Pilih Gambar Utama</p>
                      <p className="text-xs text-slate-500 mt-1">Klik untuk upload (JPG, PNG, max 2MB)</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="seo" className="p-5 space-y-4 mt-0">
                <div className="space-y-2 pb-4 border-b border-slate-100">
                  <label className="text-sm font-medium text-slate-700">Focus Keyword</label>
                  <Input 
                    placeholder="Contoh: pendidikan karakter..." 
                    value={focusKeyword}
                    onChange={(e) => setFocusKeyword(e.target.value)}
                  />
                  {focusKeyword && (
                    <div className="pt-3 space-y-2">
                      <p className="text-xs font-semibold text-slate-600">Analisis SEO Dasar:</p>
                      <ul className="text-xs space-y-1.5">
                        <li className="flex items-center gap-1.5">
                          {title.toLowerCase().includes(focusKeyword.toLowerCase()) 
                            ? <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> 
                            : <XCircle className="w-3.5 h-3.5 text-slate-300" />}
                          <span className={title.toLowerCase().includes(focusKeyword.toLowerCase()) ? "text-slate-700" : "text-slate-500"}>Keyword di Judul Artikel</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          {metaDesc.toLowerCase().includes(focusKeyword.toLowerCase()) 
                            ? <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> 
                            : <XCircle className="w-3.5 h-3.5 text-slate-300" />}
                          <span className={metaDesc.toLowerCase().includes(focusKeyword.toLowerCase()) ? "text-slate-700" : "text-slate-500"}>Keyword di Meta Description</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          {content.toLowerCase().includes(focusKeyword.toLowerCase()) 
                            ? <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> 
                            : <XCircle className="w-3.5 h-3.5 text-slate-300" />}
                          <span className={content.toLowerCase().includes(focusKeyword.toLowerCase()) ? "text-slate-700" : "text-slate-500"}>Keyword di Konten Utama</span>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

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
