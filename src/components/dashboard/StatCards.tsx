import { FileText, Eye, Users, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardsProps {
  stats: {
    totalArticles: number;
    totalViews: number;
    totalWriters: number;
    pendingComments: number;
  };
}

export function StatCards({ stats }: StatCardsProps) {
  const cards = [
    {
      title: "Total Artikel",
      value: stats.totalArticles,
      desc: "Artikel dipublikasikan",
      icon: FileText,
      iconColor: "text-slate-500"
    },
    {
      title: "Total Views",
      value: stats.totalViews,
      desc: "Views bulan ini",
      icon: Eye,
      iconColor: "text-slate-500"
    },
    {
      title: "Penulis Aktif",
      value: stats.totalWriters,
      desc: "User dengan role writer",
      icon: Users,
      iconColor: "text-slate-500"
    },
    {
      title: "Komentar Pending",
      value: stats.pendingComments,
      desc: "Butuh review",
      icon: MessageSquare,
      iconColor: "text-slate-500"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 bg-white border-b border-[#D9DEE4] py-4 mb-4">
      {cards.map((card, idx) => (
        <div 
          key={card.title} 
          className={cn(
            "flex flex-col px-4 md:px-6 relative",
            idx !== 0 && "md:border-l md:border-[#D9DEE4]",
            (idx === 1 || idx === 3) && "border-l border-[#D9DEE4] md:border-l-0", // mobile border
            idx > 1 && "mt-4 md:mt-0 pt-4 md:pt-0 border-t border-[#D9DEE4] md:border-t-0" // mobile top border
          )}
        >
          <span className="text-[13px] text-[#73879C] flex items-center mb-1">
            <card.icon className={cn("h-[14px] w-[14px] mr-1", card.iconColor)} /> 
            {card.title}
          </span>
          <div className="text-[40px] font-bold text-[#73879C] leading-none mb-1">
            {card.value}
          </div>
          <span className="text-[13px] text-[#73879C]">
            <span className="text-[#1ABB9C] font-medium mr-1"><i className="fa fa-sort-asc"></i></span> 
            {card.desc}
          </span>
        </div>
      ))}
    </div>
  );
}
