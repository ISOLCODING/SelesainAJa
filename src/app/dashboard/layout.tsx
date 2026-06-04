import { Metadata } from "next"
import { Sidebar } from "@/components/dashboard/Sidebar"
import { Topbar } from "@/components/dashboard/Topbar"

export const metadata: Metadata = {
  title: "Dashboard — SelesainAja",
  description: "Kelola pesanan tugas akademik Anda dengan sistem cerdas SelesainAja.",
  robots: { index: false, follow: false },
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      <Sidebar />
      
      <div className="flex-1 lg:ml-72 flex flex-col min-h-screen">
        <Topbar />
        
        {/* Main Content Area */}
        <main className="flex-1 p-6 lg:p-10 pt-24 lg:pt-10 overflow-x-hidden">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
