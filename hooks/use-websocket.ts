"use client";

import { useState, useEffect } from 'react';

export function useWebSocket(url: string) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);
        setData(parsed);
      } catch (err) {
        setError(err);
      }
    };

    ws.onerror = (err) => {
      setError(err);
    };

    return () => {
      ws.close();
    };
  }, [url]);

  return { data, error };
}