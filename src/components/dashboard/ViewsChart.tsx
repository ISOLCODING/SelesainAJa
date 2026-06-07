"use client";

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

interface ViewsChartProps {
  data: { date: string; views: number }[];
}

export function ViewsChart({ data }: ViewsChartProps) {
  return (
    <div className="bg-white p-3 md:p-4 rounded-sm border border-[#E6E9ED] mb-4 col-span-full lg:col-span-2">
      <div className="border-b border-[#E6E9ED] pb-2 mb-3 flex items-center justify-between">
        <h2 className="text-[16px] font-normal text-[#73879C]">Views 30 Hari Terakhir <small className="text-[13px] text-[#1ABB9C] ml-2">Total</small></h2>
      </div>
      <div className="h-[280px] w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E4E4E7" />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#73879C', fontSize: 11 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#73879C', fontSize: 11 }}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '4px', border: '1px solid #E6E9ED', boxShadow: 'none', fontSize: '12px' }}
              itemStyle={{ color: '#73879C' }}
            />
            <Line 
              type="monotone" 
              dataKey="views" 
              stroke="#1ABB9C" 
              strokeWidth={2}
              dot={{ r: 3, fill: '#1ABB9C', strokeWidth: 0 }}
              activeDot={{ r: 5, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
