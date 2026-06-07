"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PenLine } from "lucide-react";
import { toast } from "react-hot-toast";

export function QuickDraft() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      // Fetch session from API since this is a client component and we might not have it in context
      const resSession = await fetch('/api/auth/session');
      const session = await resSession.json();
      const role = session?.user?.role || 'admin';

      toast.loading("Membuka editor...", { id: "quick-draft" });
      router.push(`/${role}/articles/new?title=${encodeURIComponent(title)}`);
      toast.dismiss("quick-draft");
    } catch (error) {
      toast.error("Gagal membuat draft");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-3 md:p-4 rounded-sm border border-[#E6E9ED] mb-4 col-span-full lg:col-span-1">
      <div className="border-b border-[#E6E9ED] pb-2 mb-3 flex items-center justify-between">
        <h2 className="text-[16px] font-normal text-[#73879C] flex items-center gap-2">
          <PenLine className="h-[14px] w-[14px] text-[#1ABB9C]" />
          Quick Draft
        </h2>
      </div>
      <div className="mt-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-[13px] font-medium text-[#73879C]">
              Judul Artikel
            </label>
            <Input
              id="title"
              placeholder="Apa yang ingin Anda tulis hari ini?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="focus-visible:ring-[#1ABB9C] border-[#D9DEE4] shadow-none rounded-none text-[13px]"
              disabled={isSubmitting}
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-[#1ABB9C] hover:bg-[#149c82] text-white rounded-none shadow-none text-[13px]"
            disabled={!title.trim() || isSubmitting}
          >
            Mulai Menulis
          </Button>
        </form>
      </div>
    </div>
  );
}
