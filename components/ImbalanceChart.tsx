"use client";

import { Progress } from "@/components/ui/progress";

export default function ImbalanceChart({ value }) {
  const progressValue = ((value + 1) / 2) * 100;
  const isPositive = value > 0;
  
  return (
    <div className="space-y-4">
      <div className="relative h-6 overflow-hidden rounded-full bg-muted/30">
        <Progress 
          value={progressValue} 
          className={`h-6 transition-all duration-500 ${
            isPositive ? 'bg-green-500/20' : 'bg-red-500/20'
          }`}
        />
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <span className="text-sm font-medium text-muted-foreground">Sell Pressure</span>
          <span className={`text-sm font-bold ${
            isPositive ? 'text-green-500' : 'text-red-500'
          }`}>
            {(value * 100).toFixed(2)}%
          </span>
          <span className="text-sm font-medium text-muted-foreground">Buy Pressure</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-red-500/10 p-4">
          <p className="text-sm font-medium text-red-500">Sell Volume</p>
          <p className="text-2xl font-bold text-red-500">
            {((1 - value) * 50).toFixed(1)}%
          </p>
        </div>
        <div className="rounded-lg bg-green-500/10 p-4">
          <p className="text-sm font-medium text-green-500">Buy Volume</p>
          <p className="text-2xl font-bold text-green-500">
            {((1 + value) * 50).toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  );
}