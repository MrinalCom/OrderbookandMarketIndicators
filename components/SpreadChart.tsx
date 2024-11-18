"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";

export default function SpreadChart({ data }) {
  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="spreadGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="time" 
            type="number" 
            domain={['dataMin', 'dataMax']} 
            tickFormatter={(time) => new Date(time).toLocaleTimeString()}
          />
          <YAxis 
            tickFormatter={(value) => `$${formatNumber(value)}`}
          />
          <Tooltip 
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              return (
                <Card className="p-2">
                  <div className="text-sm">
                    <div>Time: {new Date(payload[0].payload.time).toLocaleTimeString()}</div>
                    <div>Spread: ${formatNumber(payload[0].value)}</div>
                  </div>
                </Card>
              );
            }}
          />
          <Area 
            type="monotone" 
            dataKey="spread" 
            stroke="hsl(var(--chart-1))" 
            fill="url(#spreadGradient)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}