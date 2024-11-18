"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatNumber } from "@/lib/utils";

export default function OrderbookDisplay({ orderbook }) {
  return (
    <div className="grid grid-cols-2 gap-6 rounded-lg bg-muted/5 p-4">
      <div className="space-y-3">
        <h3 className="flex items-center gap-2 text-sm font-medium">
          <span className="h-2 w-2 rounded-full bg-green-500"></span>
          Bids
        </h3>
        <div className="rounded-lg bg-card">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-xs font-medium">Price</TableHead>
                <TableHead className="text-xs font-medium">Size</TableHead>
                <TableHead className="text-xs font-medium">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderbook.bids.map(([price, size], i) => (
                <TableRow key={`bid-${i}`} className="group hover:bg-muted/50">
                  <TableCell className="text-sm font-medium text-green-500 group-hover:text-green-400">
                    {formatNumber(price)}
                  </TableCell>
                  <TableCell className="text-sm">{formatNumber(size)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatNumber(price * size)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="space-y-3">
        <h3 className="flex items-center gap-2 text-sm font-medium">
          <span className="h-2 w-2 rounded-full bg-red-500"></span>
          Asks
        </h3>
        <div className="rounded-lg bg-card">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-xs font-medium">Price</TableHead>
                <TableHead className="text-xs font-medium">Size</TableHead>
                <TableHead className="text-xs font-medium">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderbook.asks.map(([price, size], i) => (
                <TableRow key={`ask-${i}`} className="group hover:bg-muted/50">
                  <TableCell className="text-sm font-medium text-red-500 group-hover:text-red-400">
                    {formatNumber(price)}
                  </TableCell>
                  <TableCell className="text-sm">{formatNumber(size)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatNumber(price * size)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}