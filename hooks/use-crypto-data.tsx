"use client";

import { useState, useEffect } from "react";

export interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  circulating_supply: number;
  sparkline_in_7d?: {
    price: number[];
  };
}

export function useCryptoData(limit = 10) {
  const [data, setData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setError(null); // Reset error on dependency change

    const mockData: CryptoData[] = [
      {
        id: "bitcoin",
        symbol: "btc",
        name: "Bitcoin",
        image: "",
        current_price: 65432.1,
        price_change_percentage_24h: 2.34,
        market_cap: 1278954300000,
        total_volume: 32456789000,
        circulating_supply: 19543210,

        //* This creates 168 random price points to simulate a realistic price trend over the past 7 days. The values will fluctuate slightly, just like real market data.

        sparkline_in_7d: {
          price: Array(168)
            .fill(0)
            .map(() => 64000 + Math.random() * 3000),
        },
      },
      {
        id: "ethereum",
        symbol: "eth",
        name: "Ethereum",
        image: "",
        current_price: 3521.45,
        price_change_percentage_24h: -1.23,
        market_cap: 423567890000,
        total_volume: 15678901000,
        circulating_supply: 120356789,
        sparkline_in_7d: {
          price: Array(168)
            .fill(0)
            .map(() => 3400 + Math.random() * 300),
        },
      },
      {
        id: "solana",
        symbol: "sol",
        name: "Solana",
        image: "",
        current_price: 143.21,
        price_change_percentage_24h: 5.67,
        market_cap: 65432100000,
        total_volume: 5678901000,
        circulating_supply: 456789012,
        sparkline_in_7d: {
          price: Array(168)
            .fill(0)
            .map(() => 130 + Math.random() * 30),
        },
      },
      {
        id: "cardano",
        symbol: "ada",
        name: "Cardano",
        image: "",
        current_price: 0.58,
        price_change_percentage_24h: -0.45,
        market_cap: 20456789000,
        total_volume: 1234567890,
        circulating_supply: 35678901234,
        sparkline_in_7d: {
          price: Array(168)
            .fill(0)
            .map(() => 0.55 + Math.random() * 0.08),
        },
      },
      {
        id: "polkadot",
        symbol: "dot",
        name: "Polkadot",
        image: "",
        current_price: 7.89,
        price_change_percentage_24h: 3.21,
        market_cap: 9876543210,
        total_volume: 987654321,
        circulating_supply: 1234567890,
        sparkline_in_7d: {
          price: Array(168)
            .fill(0)
            .map(() => 7.5 + Math.random() * 0.8),
        },
      },
      {
        id: "dogecoin",
        symbol: "doge",
        name: "Dogecoin",
        image: "",
        current_price: 0.123,
        price_change_percentage_24h: 10.78,
        market_cap: 16789012345,
        total_volume: 2345678901,
        circulating_supply: 136789012345,
        sparkline_in_7d: {
          price: Array(168)
            .fill(0)
            .map(() => 0.11 + Math.random() * 0.03),
        },
      },
    ];

    const fetchMockData = () => {
      setLoading(true);
      setTimeout(() => {
        setData(mockData.slice(0, limit));
        setLoading(false);
      }, 1000);
    };

    fetchMockData();

    // Simulate price updates
    const interval = setInterval(() => {
      setData((currentData) =>
        currentData.map((coin) => ({
          ...coin,
          current_price:
            coin.current_price * (1 + (Math.random() * 0.01 - 0.005)),
          price_change_percentage_24h:
            coin.price_change_percentage_24h + (Math.random() * 0.4 - 0.2),
        }))
      );
    }, 3000);

    return () => clearInterval(interval); // Cleanup interval
  }, [limit]);

  return { data, loading, error };
}
