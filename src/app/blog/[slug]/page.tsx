import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { FaFacebook, FaTwitter, FaShareAlt } from "react-icons/fa";
import Image from "next/image";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { TableOfContents } from "@/components/shared/TableOfContents";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.article.findUnique({
    where: { slug },
  });
  
  if (!post) {
    return {
      title: "Artikel Tidak Ditemukan | SelesainAja",
    };
  }

  return {
    title: `${post.metaTitle || post.title} | Blog SelesainAja`,
    description: post.metaDescription || post.excerpt,
  };
}

export const dynamic = "force-dynamic";

export default async function BlogPostDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  let rawPost;
  try {
    rawPost = await prisma.article.update({
      where: { slug, status: 'published' },
      data: {
        viewCount: { increment: 1 }
      },
      include: {
        author: { select: { name: true } },
        categories: { include: { category: true } }
      }
    });
  } catch (e) {
    // If not found, update throws an error.
  }

  if (!rawPost) {
    return (
      <>
        <Header />
        <main className="grow pt-32 pb-20 bg-white min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Artikel Tidak Ditemukan</h1>
            <Link href="/blog" className="text-[#0066FF] font-semibold hover:underline flex items-center justify-center gap-2">
              <ArrowLeft size={16} /> Kembali ke Blog
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const post = {
    ...rawPost,
    category: rawPost.categories.length > 0 ? rawPost.categories[0].category.name : "Umum",
    date: rawPost.publishedAt ? format(rawPost.publishedAt, 'dd MMM yyyy', { locale: id }) : "",
    author: rawPost.author?.name || "Tim Penulis",
    image: rawPost.featuredImage || "https://images.unsplash.com/photo-1455390582262-044cdead2708?q=80&w=2000&auto=format&fit=crop",
    readTime: "5 min read", // You can calculate this based on word count if you want
    content: rawPost.content || "",
    sourceName: (rawPost as any).sourceName as string | null | undefined,
    sourceUrl: (rawPost as any).sourceUrl as string | null | undefined
  };

  // Fetch Related Posts for Sidebar
  const rawRelatedPosts = await prisma.article.findMany({
    where: { 
      status: 'published', 
      id: { not: post.id },
      categories: {
        some: {
          category: { name: post.category !== "Umum" ? post.category : undefined }
        }
      }
    },
    orderBy: { publishedAt: 'desc' },
    take: 3
  });

  // If not enough related posts, fetch latest
  let finalRelatedPosts = rawRelatedPosts;
  if (finalRelatedPosts.length < 3) {
    const additionalPosts = await prisma.article.findMany({
      where: {
        status: 'published',
        id: { notIn: [post.id, ...finalRelatedPosts.map(p => p.id)] }
      },
      orderBy: { publishedAt: 'desc' },
      take: 3 - finalRelatedPosts.length
    });
    finalRelatedPosts = [...finalRelatedPosts, ...additionalPosts];
  }

  const latestPosts = finalRelatedPosts.map(p => ({
    title: p.title,
    slug: p.slug,
    date: p.publishedAt ? format(p.publishedAt, 'dd MMM yyyy', { locale: id }) : "",
    image: p.featuredImage || "https://images.unsplash.com/photo-1455390582262-044cdead2708?q=80&w=2000&auto=format&fit=crop"
  }));

  return (
    <>
      <Header />
      <main className="grow pt-24 pb-20 bg-white min-h-screen">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          
          <div className="mb-8">
            <Breadcrumbs 
              items={[
                { label: "Blog", href: "/blog" },
                { label: post.category, href: `/blog?category=${encodeURIComponent(post.category)}` },
                { label: post.title }
              ]} 
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Article Content (Left Column) */}
            <article className="lg:col-span-8">
              
              <div className="mb-8">
                <div className="mb-4">
                  <span className="px-3 py-1 bg-[#FFB800] text-black text-xs font-bold uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-6 leading-tight font-serif">
                  {post.title}
                </h1>
                
                <div className="flex flex-wrap items-center justify-between border-y border-slate-200 py-4 mb-8">
                  <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
                    <span className="text-slate-800 font-bold">By {post.author}</span>
                    <span className="flex items-center"><Calendar size={14} className="mr-1.5" /> {post.date}</span>
                    <span className="flex items-center"><Clock size={14} className="mr-1.5" /> {post.readTime}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-4 sm:mt-0">
                    <span className="text-sm font-bold italic mr-2">Share:</span>
                    <button className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#0066FF] hover:text-white transition-colors"><FaFacebook size={14} /></button>
                    <button className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-sky-500 hover:text-white transition-colors"><FaTwitter size={14} /></button>
                    <button className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-800 hover:text-white transition-colors"><FaShareAlt size={14} /></button>
                  </div>
                </div>
              </div>

              <div className="relative h-[400px] w-full mb-10 overflow-hidden bg-slate-100">
                <Image 
                  src={post.image} 
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Mobile Table of Contents */}
              <div className="block lg:hidden mb-10">
                <TableOfContents contentSelector=".article-content" />
              </div>
              
              <div 
                className="article-content prose md:prose-lg lg:prose-xl prose-slate max-w-none prose-headings:font-black prose-headings:font-serif prose-headings:text-slate-900 prose-a:text-[#0066FF] hover:prose-a:text-blue-800 prose-img:rounded-2xl prose-img:shadow-md prose-p:leading-relaxed prose-li:marker:text-slate-400 scroll-mt-28"
                dangerouslySetInnerHTML={{ 
                  __html: (() => {
                    let idx = 0;
                    return post.content.replace(/<(h[23])(.*?)>/g, (match, tag, rest) => {
                      if (rest.includes('id=')) return match;
                      return `<${tag} id="heading-${idx++}"${rest}>`;
                    });
                  })()
                }}
              />

              {/* Source Reference */}
              {(post.sourceName || post.sourceUrl) && (
                <div className="mt-10 p-5 bg-blue-50 border border-blue-100 rounded-xl">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2 block">Sumber Referensi / Tautan Eksternal:</span>
                  {post.sourceUrl ? (
                    <a href={post.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-slate-900 font-bold hover:text-[#0066FF] flex items-center transition-colors">
                      {post.sourceName || post.sourceUrl}
                    </a>
                  ) : (
                    <span className="text-slate-900 font-bold">{post.sourceName}</span>
                  )}
                </div>
              )}

              {/* Tags / Bottom Meta */}
              <div className="mt-10 pt-8 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold uppercase tracking-wider text-slate-900">Tags:</span>
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded hover:bg-slate-200 cursor-pointer transition-colors">Pendidikan</span>
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded hover:bg-slate-200 cursor-pointer transition-colors">Tugas Akhir</span>
                </div>
              </div>

            </article>

            {/* Right Sidebar */}
            <aside className="lg:col-span-4 space-y-10">
              
              {/* Subscribe Widget */}
              <div className="bg-[#0A0A0B] p-6 text-white">
                <h4 className="text-xl font-bold italic mb-2 font-serif">Stay Updated!</h4>
                <p className="text-sm text-slate-400 mb-4">Dapatkan tips akademik terbaru langsung di kotak masuk Anda.</p>
                <div className="flex flex-col gap-3">
                  <input 
                    type="email" 
                    placeholder="Alamat E-mail" 
                    className="px-4 py-3 bg-white/10 border border-white/20 text-white outline-none focus:border-[#FFB800] text-sm"
                  />
                  <button className="bg-[#FFB800] text-black px-4 py-3 font-bold text-sm hover:bg-yellow-400 transition-colors">
                    Berlangganan
                  </button>
                </div>
              </div>

              {/* Latest News Widget */}
              <div className="bg-slate-50 border border-slate-100 p-6">
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-2 relative border-b-2 border-slate-200 pb-3 mb-6">
                  Baca Juga
                  <span className="absolute -bottom-[2px] left-0 w-1/3 h-[2px] bg-[#0066FF]"></span>
                </h3>
                <div className="flex flex-col gap-6">
                  {latestPosts.map((latest, i) => (
                    <div key={i} className="flex gap-4 group">
                      <div className="w-20 h-20 shrink-0 relative bg-slate-200 overflow-hidden">
                        <Image 
                          src={latest.image}
                          alt={latest.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h5 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-[#0066FF] transition-colors line-clamp-2 mb-1.5">
                          <Link href={`/blog/${latest.slug}`}>
                            {latest.title}
                          </Link>
                        </h5>
                        <div className="flex items-center text-[11px] text-slate-400 font-medium">
                          <Calendar size={10} className="mr-1" /> {latest.date}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop Table of Contents (Sticky at the bottom of sidebar) */}
              <div className="hidden lg:block sticky top-28">
                <TableOfContents contentSelector=".article-content" />
              </div>

            </aside>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
