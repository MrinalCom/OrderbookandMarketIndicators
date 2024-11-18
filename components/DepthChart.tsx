"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";

export default function DepthChart({ orderbook }) {
  const data = processDepthData(orderbook);

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis 
            dataKey="price" 
            tickFormatter={(value) => `$${formatNumber(value)}`}
          />
          <YAxis 
            tickFormatter={(value) => formatNumber(value)}
          />
          <Tooltip 
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              return (
                <Card className="p-2">
                  <div className="text-sm">
                    <div>Price: ${formatNumber(payload[0].payload.price)}</div>
                    <div>Bids: {formatNumber(payload[0].payload.bids)}</div>
                    <div>Asks: {formatNumber(payload[1].payload.asks)}</div>
                  </div>
                </Card>
              );
            }}
          />
          <Line 
            type="monotone" 
            dataKey="bids" 
            stroke="hsl(var(--chart-2))" 
            dot={false}
          />
          <Line 
            type="monotone" 
            dataKey="asks" 
            stroke="hsl(var(--chart-3))" 
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function processDepthData(orderbook) {
  const data = [];
  let bidTotal = 0;
  let askTotal = 0;

  // Process bids
  orderbook.bids.forEach(([price, size]) => {
    bidTotal += parseFloat(size);
    data.push({
      price: parseFloat(price),
      bids: bidTotal,
      asks: 0
    });
  });

  // Process asks
  orderbook.asks.forEach(([price, size]) => {
    askTotal += parseFloat(size);
    data.push({
      price: parseFloat(price),
      bids: 0,
      asks: askTotal
    });
  });

  return data.sort((a, b) => a.price - b.price);
}