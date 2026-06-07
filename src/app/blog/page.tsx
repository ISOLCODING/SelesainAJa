import { Metadata } from "next"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import Link from "next/link"
import { Calendar, User, Search, ArrowRight, TrendingUp } from "lucide-react"
import { FaFacebook, FaTwitter, FaInstagram, FaShareAlt } from "react-icons/fa"
import Image from "next/image"
import JsonLd from "@/components/seo/JsonLd"
import { getBreadcrumbSchema } from "@/lib/seo/structured-data"
import { prisma } from "@/lib/prisma"
import { format } from "date-fns"
import { id } from "date-fns/locale"

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

export const dynamic = "force-dynamic"; // Ensure fresh data on every load

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const resolvedParams = await searchParams;
  const categoryFilter = typeof resolvedParams.category === 'string' ? resolvedParams.category : undefined;
  const searchQuery = typeof resolvedParams.search === 'string' ? resolvedParams.search : undefined;

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Blog", url: "https://selesainaja.com/blog" }
  ]);

  const whereClause: any = { status: 'published' };
  
  if (categoryFilter && categoryFilter !== "All News") {
    whereClause.categories = {
      some: {
        category: { name: categoryFilter }
      }
    };
  }

  if (searchQuery) {
    whereClause.title = { contains: searchQuery, mode: 'insensitive' };
  }

  // Fetch from database
  const rawPosts = await prisma.article.findMany({
    where: whereClause,
    orderBy: { publishedAt: 'desc' },
    include: {
      author: { select: { name: true } },
      categories: { include: { category: true } }
    }
  });

  // Map to frontend structure
  const blogPosts = rawPosts.map((post) => ({
    id: post.id,
    title: post.title,
    excerpt: post.excerpt || "",
    category: post.categories.length > 0 ? post.categories[0].category.name : "Umum",
    date: post.publishedAt ? format(post.publishedAt, 'dd MMM yyyy', { locale: id }) : "",
    image: post.featuredImage || "https://images.unsplash.com/photo-1455390582262-044cdead2708?q=80&w=2000&auto=format&fit=crop",
    slug: post.slug,
    author: post.author?.name || "Tim Penulis"
  }));

  // Fetch dynamic categories
  const dbCategories = await prisma.category.findMany({
    where: { articles: { some: { article: { status: 'published' } } } },
    select: { name: true }
  });
  const categories = ["All News", ...Array.from(new Set(dbCategories.map(c => c.name)))];

  // Segregate posts for the layout
  const heroPost = blogPosts.length > 0 ? blogPosts[0] : null; // 1 Large Post
  const featuredPosts = blogPosts.slice(1, 5); // 4 smaller posts for the right side of hero
  const popularPosts = blogPosts.slice(5, 15); // Posts for the main list
  const latestPosts = blogPosts.slice(0, 5); // Sidebar latest news

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <Header />
      <main className="min-h-screen bg-white pt-24 pb-16">
        
        {/* Magazine Header Navigation (Secondary) */}
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200 pb-4">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span className="text-[#0066FF]">Selesain</span>Blog
            </h1>
            <div className="flex items-center gap-4 mt-4 md:mt-0 text-slate-500">
              <span className="text-sm font-medium">{new Date().toLocaleDateString('id-ID', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <div className="flex gap-3">
                <a href="#" className="hover:text-[#0066FF] transition-colors"><FaFacebook size={18} /></a>
                <a href="#" className="hover:text-[#0066FF] transition-colors"><FaTwitter size={18} /></a>
                <a href="#" className="hover:text-[#0066FF] transition-colors"><FaInstagram size={18} /></a>
              </div>
            </div>
          </div>
        </div>

        {blogPosts.length === 0 ? (
          <div className="container mx-auto px-4 text-center py-20">
            <h2 className="text-2xl font-bold text-slate-700">Belum ada artikel yang dipublikasikan.</h2>
            <p className="text-slate-500 mt-2">Silakan kembali lagi nanti.</p>
          </div>
        ) : (
          <>
            {/* HERO GRID SECTION */}
            <section className="container mx-auto px-4 lg:px-8 max-w-7xl mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-1 lg:gap-2 h-auto lg:h-[500px]">
                
                {/* Main Hero Post (Left) */}
                {heroPost && (
                  <div className="lg:col-span-6 relative h-[300px] lg:h-full group overflow-hidden bg-slate-900">
                    <Image 
                      src={heroPost.image} 
                      alt={heroPost.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                      <div className="mb-3">
                        <span className="px-3 py-1 bg-[#0066FF] text-white text-xs font-bold uppercase tracking-wider">
                          {heroPost.category}
                        </span>
                      </div>
                      <h2 className="text-2xl lg:text-4xl font-bold text-white mb-3 leading-tight group-hover:text-blue-100 transition-colors">
                        <Link href={`/blog/${heroPost.slug}`} className="before:absolute before:inset-0">
                          {heroPost.title}
                        </Link>
                      </h2>
                      <div className="flex items-center text-slate-300 text-sm font-medium gap-4">
                        <span className="flex items-center"><Calendar size={14} className="mr-1.5" /> {heroPost.date}</span>
                      </div>
                    </div>
                  </div>
                )}

            {/* 4 Featured Posts (Right) */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-1 lg:gap-2 h-full">
              {featuredPosts.map((post, i) => (
                <div key={i} className="relative h-[250px] lg:h-full group overflow-hidden bg-slate-900">
                  <Image 
                    src={post.image} 
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-5">
                    <div className="mb-2">
                      <span className="px-2 py-0.5 bg-[#FFB800] text-black text-[10px] font-bold uppercase tracking-wider">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-yellow-100 transition-colors">
                      <Link href={`/blog/${post.slug}`} className="before:absolute before:inset-0">
                        {post.title}
                      </Link>
                    </h3>
                    <div className="flex items-center text-slate-300 text-xs font-medium gap-4">
                      <span className="flex items-center"><Calendar size={12} className="mr-1.5" /> {post.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* MAIN CONTENT AREA */}
        <section className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Column: Popular News */}
            <div className="lg:col-span-8">
              
              {/* Category Tabs */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-slate-100 mb-8 pb-3">
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-2 relative">
                  Popular news
                  <span className="absolute -bottom-[15px] left-0 w-1/2 h-[2px] bg-[#0066FF]"></span>
                </h3>
                <div className="flex flex-wrap gap-4 mt-4 sm:mt-0">
                  {categories.map((cat, i) => {
                    const isActive = cat === "All News" ? !categoryFilter : categoryFilter === cat;
                    const href = cat === "All News" ? "/blog" : `/blog?category=${encodeURIComponent(cat)}`;
                    
                    return (
                      <Link 
                        key={i} 
                        href={href}
                        className={`text-sm font-bold uppercase tracking-wider transition-colors ${isActive ? 'text-[#0066FF]' : 'text-slate-400 hover:text-slate-800'}`}
                      >
                        {cat}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* News List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {popularPosts.map((post, index) => (
                  <div key={index} className="group">
                    <div className="relative aspect-[4/3] overflow-hidden mb-4 bg-slate-100">
                      <Image 
                        src={post.image} 
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-slate-900 text-white px-2 py-0.5 text-xs font-bold uppercase">
                        {post.category}
                      </div>
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2 leading-snug group-hover:text-[#0066FF] transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h4>
                    <p className="text-slate-500 text-sm line-clamp-2 mb-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-xs text-slate-400 font-medium">
                      <span className="flex items-center"><Calendar size={12} className="mr-1.5" /> {post.date}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-6 border-t border-slate-200">
                <button className="w-full py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold uppercase text-sm tracking-wider transition-colors">
                  Load More Articles
                </button>
              </div>

            </div>

            {/* Right Column: Sidebar */}
            <aside className="lg:col-span-4 space-y-10">
              
              {/* Search Widget */}
              <div className="bg-[#0A0A0B] p-6 text-white">
                <h4 className="text-xl font-bold italic mb-4 font-serif">Search</h4>
                <form action="/blog" method="GET" className="flex">
                  {categoryFilter && <input type="hidden" name="category" value={categoryFilter} />}
                  <input 
                    type="text" 
                    name="search"
                    defaultValue={searchQuery || ""}
                    placeholder="I'm looking for..." 
                    className="flex-1 px-4 py-2 bg-white text-slate-900 outline-none text-sm"
                  />
                  <button type="submit" className="bg-[#FFB800] text-black px-4 py-2 font-bold text-sm hover:bg-yellow-400 transition-colors">
                    Search
                  </button>
                </form>
              </div>

              {/* Follow Us Widget */}
              <div className="bg-slate-50 p-6 border border-slate-100">
                <h4 className="text-xl font-bold italic mb-2 font-serif text-slate-900">Follow us</h4>
                <p className="text-sm text-slate-500 mb-4">Read our latest news on any of these social networks!</p>
                <div className="flex gap-2">
                  {[FaFacebook, FaTwitter, FaInstagram].map((Icon, i) => (
                    <a key={i} href="#" className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center hover:bg-[#0066FF] transition-colors">
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Newsletter Widget */}
              <div className="bg-slate-50 p-6 border border-slate-100">
                <h4 className="text-xl font-bold italic mb-2 font-serif text-slate-900">Get latest news delivered daily!</h4>
                <p className="text-sm text-slate-500 mb-4">We will send you breaking news right to your inbox</p>
                <div className="flex flex-col gap-2">
                  <input 
                    type="email" 
                    placeholder="Your e-mail" 
                    className="px-4 py-3 bg-white border border-slate-200 text-slate-900 outline-none focus:border-[#0066FF] text-sm"
                  />
                  <button className="bg-[#FFB800] text-black px-4 py-3 font-bold text-sm hover:bg-yellow-400 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>

              {/* Latest News List */}
              <div>
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-2 relative border-b-2 border-slate-100 pb-3 mb-6">
                  Latest news
                  <span className="absolute -bottom-[2px] left-0 w-1/3 h-[2px] bg-[#0066FF]"></span>
                </h3>
                <div className="flex flex-col gap-6">
                  {latestPosts.map((post, i) => (
                    <div key={i} className="flex gap-4 group">
                      <div className="w-24 h-24 shrink-0 relative bg-slate-100 overflow-hidden">
                        <Image 
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h5 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-[#0066FF] transition-colors line-clamp-2 mb-1.5">
                          <Link href={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h5>
                        <div className="flex items-center text-[11px] text-slate-400 font-medium">
                          <Calendar size={10} className="mr-1" /> {post.date}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </aside>
          </div>
        </section>
          </>
        )}
      </main>
      <Footer />
    </>
  )
}
