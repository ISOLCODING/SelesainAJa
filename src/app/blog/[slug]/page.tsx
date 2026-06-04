import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { RiArrowLeftLine, RiCalendarEventLine, RiTimeLine } from "react-icons/ri";
import Image from "next/image";

import { blogPosts } from "@/lib/data/blog";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);
  
  if (!post) {
    return {
      title: "Artikel Tidak Ditemukan | SelesainAja",
    };
  }

  return {
    title: `${post.title} | Blog SelesainAja`,
    description: post.excerpt,
  };
}

export default async function BlogPostDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <>
        <Header />
        <main className="grow pt-32 pb-20 bg-slate-50 min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Artikel Tidak Ditemukan</h1>
            <Link href="/blog" className="text-primary-600 font-semibold hover:underline flex items-center justify-center gap-2">
              <RiArrowLeftLine /> Kembali ke Blog
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="grow pt-28 pb-20 bg-slate-50 min-h-screen">
        <article className="container mx-auto px-6 lg:px-12 max-w-4xl">
          
          <Link href="/blog" className="inline-flex items-center text-slate-500 hover:text-primary-600 font-medium mb-8 transition-colors">
            <RiArrowLeftLine className="mr-2" />
            Kembali ke Daftar Artikel
          </Link>

          <div className="bg-white rounded-4xl overflow-hidden shadow-sm border border-slate-100">
            <div className="relative h-[400px] w-full">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-6 left-6 z-10">
                <span className="px-4 py-1.5 bg-primary-600 text-white text-sm font-bold uppercase tracking-wider rounded-full shadow-lg">
                  {post.category}
                </span>
              </div>
            </div>
            
            <div className="p-8 lg:p-12">
              <div className="flex flex-wrap items-center text-sm font-medium text-slate-500 mb-6 gap-6">
                <div className="flex items-center">
                  <RiCalendarEventLine className="mr-2 text-lg" />
                  {post.date}
                </div>
                <div className="flex items-center">
                  <RiTimeLine className="mr-2 text-lg" />
                  {post.readTime}
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-8 leading-tight">
                {post.title}
              </h1>
              
              {/* Blog Content */}
              <div 
                className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-primary-600 hover:prose-a:text-primary-700"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              
              <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
                <p className="text-slate-500 font-medium">Bagikan artikel ini:</p>
                <div className="flex gap-4">
                  <button className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors">
                    WA
                  </button>
                  <button className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
                    FB
                  </button>
                  <button className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-sky-500 hover:text-white transition-colors">
                    TW
                  </button>
                </div>
              </div>
            </div>
          </div>
          
        </article>
      </main>
      <Footer />
    </>
  );
}
