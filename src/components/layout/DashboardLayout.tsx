"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
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
  X,
  Tags,
  FolderTree,
  ChevronDown,
  ChevronRight,
  Maximize,
  Lock
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const adminNavItems = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/articles", icon: FileText, label: "Artikel" },
  { href: "/admin/categories", icon: FolderTree, label: "Kategori" },
  { href: "/admin/tags", icon: Tags, label: "Tag" },
  { href: "/admin/media", icon: ImageIcon, label: "Media" },
  { href: "/admin/services", icon: Briefcase, label: "Layanan" },
  { href: "/admin/testimonials", icon: Star, label: "Testimoni" },
  { href: "/admin/faqs", icon: HelpCircle, label: "FAQ" },
  { href: "/admin/comments", icon: MessageSquare, label: "Komentar" },
  { href: "/admin/users", icon: Users, label: "Penulis" },
  { href: "/admin/settings", icon: Settings, label: "Pengaturan" },
];

const writerNavItems = [
  { href: "/writer/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/writer/articles", icon: FileText, label: "Artikel Saya" },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    role: "admin" | "writer";
    image?: string | null;
  };
}

export default function DashboardLayout({ children, user }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isAuthPage = pathname.endsWith("/login") || pathname.endsWith("/forgot-password");

  if (isAuthPage) {
    return <>{children}</>;
  }

  // Safe navigation if user exists
  const navItems = user?.role === "admin" ? adminNavItems : writerNavItems;
  const profileLink = user?.role === "admin" ? "/admin/profile" : "/writer/profile";
  const loginLink = user?.role === "admin" ? "/admin/login" : "/writer/login";

  return (
    <div className="flex h-screen bg-[#F7F7F7] overflow-hidden text-sm md:text-base font-sans">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-[230px] bg-[#2A3F54] text-[#E7E7E7] transition-transform duration-300 lg:static lg:translate-x-0 flex flex-col",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo / Site Title */}
        <div className="flex items-center h-[50px] px-4 shrink-0 mt-2 mb-2">
          <Briefcase className="h-6 w-6 mr-2 text-white" />
          <Link href="/" className="text-[22px] font-normal text-[#ECF0F1] tracking-wide">
            SelesainAja
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="ml-auto lg:hidden text-white/70 hover:text-white">
            <X size={20} />
          </button>
        </div>
        
        {/* Profile Quick Info */}
        <div className="flex items-center px-4 py-4 mb-4 border-b border-white/5">
          <div className="shrink-0 mr-4">
            {user.image ? (
              <img src={user.image} alt="Avatar" className="h-[56px] w-[56px] rounded-full border-[3px] border-white/20 p-0.5 bg-white" />
            ) : (
              <div className="h-[56px] w-[56px] rounded-full border-[3px] border-white/20 p-0.5 bg-white flex items-center justify-center text-slate-800 font-bold text-xl">
                {user.name?.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] text-[#BAB8B8]">Welcome,</span>
            <span className="text-[15px] font-medium text-[#ECF0F1]">{user.name || "User"}</span>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="px-4 mb-2 mt-2">
            <h3 className="text-xs font-bold text-[#ECF0F1] uppercase tracking-wider mb-2">General</h3>
          </div>
          
          <nav className="space-y-0">
            {navItems.map((item) => {
              const isDashboard = item.href.endsWith("/dashboard");
              const isActive = isDashboard 
                ? pathname === item.href 
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
                
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center px-4 py-3.5 text-[13px] font-medium transition-all group relative",
                    isActive 
                      ? "bg-[rgba(255,255,255,0.05)] text-white shadow-[inset_4px_0_0_0_#1ABB9C]" 
                      : "text-[#E7E7E7] hover:bg-[rgba(255,255,255,0.05)] hover:text-white"
                  )}
                >
                  <item.icon className={cn(
                    "mr-3 h-[18px] w-[18px]", 
                    isActive ? "text-white" : "text-[#E7E7E7] group-hover:text-white"
                  )} />
                  {item.label}
                  <ChevronRight className={cn(
                    "ml-auto h-3 w-3 opacity-50 transition-transform",
                    isActive && "rotate-90 opacity-100 text-[#1ABB9C]"
                  )} />
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer actions (Logout, etc) */}
        <div className="flex items-center justify-between p-2 bg-[#172D44] text-[#5A738E] mt-auto">
          <Link href={profileLink} className="flex-1 flex justify-center py-2 hover:text-[#ECF0F1] transition-colors" title="Settings">
            <Settings className="h-4 w-4" />
          </Link>
          <button className="flex-1 flex justify-center py-2 hover:text-[#ECF0F1] transition-colors" title="FullScreen">
            <Maximize className="h-4 w-4" />
          </button>
          <button className="flex-1 flex justify-center py-2 hover:text-[#ECF0F1] transition-colors" title="Lock">
            <Lock className="h-4 w-4" />
          </button>
          <button 
            onClick={() => signOut({ callbackUrl: loginLink })}
            className="flex-1 flex justify-center py-2 hover:text-[#ECF0F1] transition-colors" 
            title="Logout"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#F7F7F7]">
        {/* Header (Top Navigation) */}
        <header className="flex items-center justify-between h-[50px] px-4 bg-[#EDEDED] border-b border-[#D9DEE4] shrink-0 sticky top-0 z-30">
          <div className="flex items-center">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden mr-4 text-[#5A738E] hover:text-[#2A3F54] focus:outline-none"
            >
              <Menu size={20} />
            </button>
            <button className="hidden lg:block text-[#5A738E] hover:text-[#2A3F54] focus:outline-none">
              <Menu size={20} />
            </button>
          </div>
          
          <div className="flex items-center space-x-4 h-full">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center h-full focus:outline-none hover:bg-[#D9DEE4] px-3 transition-colors">
                {user.image ? (
                  <img src={user.image} alt={user.name || "Avatar"} className="h-[29px] w-[29px] rounded-full mr-2" />
                ) : (
                  <div className="h-[29px] w-[29px] rounded-full bg-[#1ABB9C] flex items-center justify-center text-white font-bold mr-2 text-xs">
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
                <span className="text-[#5A738E] text-[13px]">{user.name}</span>
                <ChevronDown className="ml-1 h-3 w-3 text-[#5A738E]" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-white border border-[#D9DEE4] text-[#5A738E] rounded-none shadow-sm">
                <DropdownMenuItem className="cursor-pointer text-[13px] hover:bg-[#F5F7FA]">
                  <Link href={profileLink} className="w-full"> Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-[13px] hover:bg-[#F5F7FA]">
                  <Link href="/admin/settings" className="w-full flex items-center">
                    <span className="flex-1">Settings</span>
                    <span className="bg-red-500 text-white text-[10px] px-1.5 rounded-sm">50%</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-[13px] hover:bg-[#F5F7FA]">
                  Help
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => signOut({ callbackUrl: loginLink })}
                  className="cursor-pointer text-[13px] hover:bg-[#F5F7FA]"
                >
                  <LogOut className="mr-2 h-3 w-3" /> Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 scroll-smooth text-[#73879C]">
          <div className="max-w-full mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
