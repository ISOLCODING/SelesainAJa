import { Metadata } from "next"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { PageHeader } from "@/components/layout/PageHeader"
import { SectionWrapper } from "@/components/shared/SectionWrapper"
import Link from "next/link"
import { ArrowRight, Calendar, User } from "lucide-react"

export const metadata: Metadata = {
  title: "Blog — Tips Akademik, Panduan Tugas, & Informasi Kuliah",
  description:
    "Baca artikel tips akademik, panduan mengerjakan tugas, cara menulis makalah, format paper, dan informasi perkuliahan lainnya. Update setiap minggu!",
  keywords: [
    "tips akademik mahasiswa",
    "panduan menulis makalah",
    "cara mengerjakan tugas kuliah",
    "blog jasa pengerjaan tugas",
    "tips skripsi tesis",
  ],
  alternates: { canonical: "https://selesainaja.com/blog" },
  openGraph: {
    title: "Blog — Tips Akademik, Panduan Tugas, & Informasi Kuliah | SelesainAja",
    description:
      "Tips akademik, panduan mengerjakan tugas, cara menulis makalah, dan informasi kuliah. Update setiap minggu!",
    url: "https://selesainaja.com/blog",
  },
}

import { blogPosts } from "@/lib/data/blog"

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <PageHeader 
          title="Blog & Tips Akademik" 
          description="Kumpulan artikel, insight, dan panduan terbaru dari tim ahli kami untuk membantu mempermudah kehidupan akademik Anda."
        />

        <SectionWrapper className="bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <div key={index} className="group bg-[#FAFAFA] border border-[#E4E4E7] rounded-3xl overflow-hidden hover:border-[#0066FF]/30 transition-all duration-300 flex flex-col">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-[#0066FF] rounded-full">
                    {post.category}
                  </div>
                </div>
                <div className="p-6 md:p-8 flex flex-col grow">
                  <div className="flex items-center gap-4 text-sm text-[#71717A] mb-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User className="w-4 h-4" />
                      {post.author}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[#0A0A0B] mb-3 group-hover:text-[#0066FF] transition-colors line-clamp-2">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-[#71717A] line-clamp-3 mb-6">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto">
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-[#0066FF] font-semibold hover:underline"
                    >
                      Baca Selengkapnya
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionWrapper>
      </main>
      <Footer />
    </>
  )
}
