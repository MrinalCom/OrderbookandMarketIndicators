import OrderbookDashboard from '@/components/OrderbookDashboard';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 space-y-2">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            BTC-USD Orderbook Analysis
          </h1>
          <p className="text-muted-foreground">Real-time market depth and trading analysis</p>
        </div>
        <OrderbookDashboard />
      </div>
    </main>
  );
}