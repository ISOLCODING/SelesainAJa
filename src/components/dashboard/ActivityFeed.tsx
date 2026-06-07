import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

interface Activity {
  id: string;
  user: { name: string; image?: string };
  action: string;
  target: string;
  date: Date;
}

interface ActivityFeedProps {
  activities: Activity[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <div className="bg-white p-3 md:p-4 rounded-sm border border-[#E6E9ED] mb-4 col-span-full lg:col-span-1">
      <div className="border-b border-[#E6E9ED] pb-2 mb-3 flex items-center justify-between">
        <h2 className="text-[16px] font-normal text-[#73879C]">Aktivitas Terbaru</h2>
      </div>
      <div className="mt-4">
        <ul className="space-y-4">
          {activities.length > 0 ? (
            activities.map((activity) => (
              <li key={activity.id} className="flex gap-4">
                <div className="relative mt-1 shrink-0">
                  {activity.user.image ? (
                    <img src={activity.user.image} alt="" className="h-8 w-8 rounded-full border border-slate-200" />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-[#1ABB9C]/10 flex items-center justify-center text-[#1ABB9C] font-bold text-xs border border-[#1ABB9C]/20">
                      {activity.user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-[13px] text-[#73879C]">
                    <span className="font-bold text-[#1ABB9C]">{activity.user.name}</span> {activity.action}{" "}
                    <span className="font-semibold text-slate-700">{activity.target}</span>
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {formatDistanceToNow(activity.date, { addSuffix: true, locale: id })}
                  </p>
                </div>
              </li>
            ))
          ) : (
            <div className="text-center py-8 text-slate-500 text-[13px]">
              Belum ada aktivitas terbaru.
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}
