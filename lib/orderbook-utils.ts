export function processOrderbookData(data: any, maxLevels: number = 10) {
  if (!data?.bids || !data?.asks) return { bids: [], asks: [] };

  return {
    bids: data.bids.slice(0, maxLevels).map(([price, size]) => [
      parseFloat(price),
      parseFloat(size)
    ]),
    asks: data.asks.slice(0, maxLevels).map(([price, size]) => [
      parseFloat(price),
      parseFloat(size)
    ])
  };
}