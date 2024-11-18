"use client";

import { useEffect, useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Activity, TrendingDown, TrendingUp, LineChart } from 'lucide-react';
import OrderbookDisplay from './OrderbookDisplay';
import SpreadChart from './SpreadChart';
import ImbalanceChart from './ImbalanceChart';
import DepthChart from './DepthChart';
import { useWebSocket } from '@/hooks/use-websocket';
import { processOrderbookData } from '@/lib/orderbook-utils';
import { formatNumber } from '@/lib/utils';

export default function OrderbookDashboard() {
  const [orderbook, setOrderbook] = useState({ bids: [], asks: [] });
  const [spreadHistory, setSpreadHistory] = useState([]);
  const maxLevels = 10;

  const { data } = useWebSocket('wss://stream.binance.com:9443/ws/btcusdt@depth20@100ms');

  useEffect(() => {
    if (data) {
      const processed = processOrderbookData(data, maxLevels);
      setOrderbook(processed);
      
      if (processed.asks[0] && processed.bids[0]) {
        const spread = processed.asks[0][0] - processed.bids[0][0];
        setSpreadHistory(prev => [...prev.slice(-60), { 
          time: new Date().getTime(),
          spread 
        }]);
      }
    }
  }, [data]);

  const imbalance = useMemo(() => {
    if (!orderbook.bids.length || !orderbook.asks.length) return 0;
    const bidVolume = orderbook.bids.reduce((sum, [_, vol]) => sum + parseFloat(vol), 0);
    const askVolume = orderbook.asks.reduce((sum, [_, vol]) => sum + parseFloat(vol), 0);
    return (bidVolume - askVolume) / (bidVolume + askVolume);
  }, [orderbook]);

  const currentPrice = useMemo(() => {
    if (!orderbook.asks[0] || !orderbook.bids[0]) return null;
    return (orderbook.asks[0][0] + orderbook.bids[0][0]) / 2;
  }, [orderbook]);

  return (
    <div className="grid gap-6">
      {currentPrice && (
        <Card className="border-none bg-gradient-to-r from-primary/10 via-primary/5 to-background">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Activity className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Current Price</p>
                <h2 className="text-3xl font-bold">${formatNumber(currentPrice)}</h2>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="overflow-hidden border-none bg-gradient-to-br from-card to-background shadow-md">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <CardTitle>Live Orderbook</CardTitle>
            </div>
            <CardDescription>Real-time order book with top 10 levels</CardDescription>
          </CardHeader>
          <CardContent>
            <OrderbookDisplay orderbook={orderbook} />
          </CardContent>
        </Card>

        <Card className="border-none bg-gradient-to-br from-card to-background shadow-md">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-primary" />
              <CardTitle>Spread Indicator</CardTitle>
            </div>
            <CardDescription>1-minute rolling spread history</CardDescription>
          </CardHeader>
          <CardContent>
            <SpreadChart data={spreadHistory} />
          </CardContent>
        </Card>
      </div>

      <Card className="border-none bg-gradient-to-br from-card to-background shadow-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            <CardTitle>Orderbook Imbalance</CardTitle>
          </div>
          <CardDescription>Buy vs sell pressure visualization</CardDescription>
        </CardHeader>
        <CardContent>
          <ImbalanceChart value={imbalance} />
        </CardContent>
      </Card>

      <Card className="border-none bg-gradient-to-br from-card to-background shadow-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <LineChart className="h-5 w-5 text-primary" />
            <CardTitle>Market Depth</CardTitle>
          </div>
          <CardDescription>Cumulative volume analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <DepthChart orderbook={orderbook} />
        </CardContent>
      </Card>
    </div>
  );
}