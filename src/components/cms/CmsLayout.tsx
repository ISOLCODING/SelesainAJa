"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  Users, 
  Image as ImageIcon,
  MessageSquare,
  HelpCircle,
  Briefcase,
  Star,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

const adminNavItems = [
  { href: "/cms/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/cms/admin/posts", icon: FileText, label: "Artikel (Blog)" },
  { href: "/cms/admin/services", icon: Briefcase, label: "Layanan" },
  { href: "/cms/admin/testimonials", icon: Star, label: "Testimoni" },
  { href: "/cms/admin/faqs", icon: HelpCircle, label: "FAQ" },
  { href: "/cms/admin/comments", icon: MessageSquare, label: "Komentar" },
  { href: "/cms/admin/media", icon: ImageIcon, label: "Media Library" },
  { href: "/cms/admin/users", icon: Users, label: "Pengguna" },
  { href: "/cms/admin/settings", icon: Settings, label: "Pengaturan" },
];

const writerNavItems = [
  { href: "/cms/writer", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/cms/writer/posts", icon: FileText, label: "Artikel Saya" },
  { href: "/cms/writer/media", icon: ImageIcon, label: "Media Library" },
];

export default function CmsLayout({ children, role = "admin" }: { children: React.ReactNode, role?: "admin" | "writer" }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = role === "admin" ? adminNavItems : writerNavItems;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-30 w-64 bg-white border-r transition-transform duration-300 lg:static lg:translate-x-0 flex flex-col",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <Link href="/cms" className="text-xl font-bold text-primary">SelesainAja CMS</Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-3">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors",
                    isActive 
                      ? "bg-primary/10 text-primary" 
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <item.icon className={cn("mr-3 h-5 w-5", isActive ? "text-primary" : "text-gray-400")} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t">
          <button className="flex w-full items-center px-3 py-2.5 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 transition-colors">
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between h-16 px-6 bg-white border-b shrink-0">
          <div className="flex items-center">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden mr-4 text-gray-500 hover:text-gray-700"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-semibold text-gray-800 hidden sm:block">
              {navItems.find(i => pathname === i.href || pathname.startsWith(`${i.href}/`))?.label || "Dashboard"}
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-right hidden sm:block">
              <p className="font-medium text-gray-700">Admin User</p>
              <p className="text-gray-500 text-xs">admin@selesainaja.com</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
