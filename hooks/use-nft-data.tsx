"use client";

import { useState, useEffect } from "react";

export interface NFTData {
  id: string;
  name: string;
  collection: string;
  image: string;
  price: number;
  currency: string;
  floorPrice?: number;
  lastSale?: number;
  attributes?: {
    trait_type: string;
    value: string;
  }[];
}

export function useNFTData(limit = 8) {
  const [data, setData] = useState<NFTData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // In a real app, you would fetch from OpenSea API
    // const fetchData = async () => {
    //   try {
    //     setLoading(true)
    //     const response = await fetch(
    //       `https://api.opensea.io/api/v1/assets?limit=${limit}`
    //     )
    //     if (!response.ok) {
    //       throw new Error('Network response was not ok')
    //     }
    //     const result = await response.json()
    //     setData(result.assets)
    //   } catch (err) {
    //     setError(err instanceof Error ? err : new Error('An unknown error occurred'))
    //   } finally {
    //     setLoading(false)
    //   }
    // }

    // For demo purposes, we'll use mock data
    const mockData: NFTData[] = [
      {
        id: "nft1",
        name: "Cyber Punk #3429",
        collection: "CyberPunks",
        image: "",
        price: 1.25,
        currency: "ETH",
        floorPrice: 0.98,
        lastSale: 1.15,
        attributes: [
          { trait_type: "Background", value: "Blue" },
          { trait_type: "Eyes", value: "Laser" },
          { trait_type: "Mouth", value: "Smile" },
        ],
      },
      {
        id: "nft2",
        name: "Bored Ape #8765",
        collection: "Bored Ape Yacht Club",
        image: "",
        price: 68.5,
        currency: "ETH",
        floorPrice: 65.2,
        lastSale: 70.1,
        attributes: [
          { trait_type: "Background", value: "Jungle" },
          { trait_type: "Fur", value: "Golden" },
          { trait_type: "Eyes", value: "Angry" },
        ],
      },
      {
        id: "nft3",
        name: "Azuki #4532",
        collection: "Azuki",
        image: "",
        price: 12.3,
        currency: "ETH",
        floorPrice: 11.8,
        lastSale: 13.2,
        attributes: [
          { trait_type: "Background", value: "Red" },
          { trait_type: "Clothing", value: "Kimono" },
          { trait_type: "Type", value: "Human" },
        ],
      },
      {
        id: "nft4",
        name: "Doodle #9876",
        collection: "Doodles",
        image: "",
        price: 6.9,
        currency: "ETH",
        floorPrice: 6.5,
        lastSale: 7.2,
        attributes: [
          { trait_type: "Background", value: "Pastel" },
          { trait_type: "Face", value: "Happy" },
          { trait_type: "Head", value: "Crown" },
        ],
      },
      {
        id: "nft5",
        name: "CloneX #2345",
        collection: "CloneX",
        image: "",
        price: 4.5,
        currency: "ETH",
        floorPrice: 4.2,
        lastSale: 4.8,
        attributes: [
          { trait_type: "Background", value: "Purple" },
          { trait_type: "Helmet", value: "Cyber" },
          { trait_type: "Skin", value: "Robot" },
        ],
      },
      {
        id: "nft6",
        name: "Moonbird #6543",
        collection: "Moonbirds",
        image: "",
        price: 8.1,
        currency: "ETH",
        floorPrice: 7.8,
        lastSale: 8.5,
        attributes: [
          { trait_type: "Background", value: "Night" },
          { trait_type: "Feathers", value: "Rare" },
          { trait_type: "Eyes", value: "Diamond" },
        ],
      },
      {
        id: "nft7",
        name: "Pudgy Penguin #1234",
        collection: "Pudgy Penguins",
        image: "",
        price: 3.7,
        currency: "ETH",
        floorPrice: 3.5,
        lastSale: 3.9,
        attributes: [
          { trait_type: "Background", value: "Ice" },
          { trait_type: "Outfit", value: "Scarf" },
          { trait_type: "Head", value: "Beanie" },
        ],
      },
      {
        id: "nft8",
        name: "World of Women #5678",
        collection: "World of Women",
        image: "",
        price: 2.9,
        currency: "ETH",
        floorPrice: 2.7,
        lastSale: 3.1,
        attributes: [
          { trait_type: "Background", value: "Galaxy" },
          { trait_type: "Skin", value: "Gold" },
          { trait_type: "Hair", value: "Flowing" },
        ],
      },
    ];

    const fetchMockData = () => {
      setTimeout(() => {
        setData(mockData.slice(0, limit));
        setLoading(false);
      }, 1000);
    };

    fetchMockData();

    // Simulate price updates
    const interval = setInterval(() => {
      setData((currentData) =>
        currentData.map((nft) => ({
          ...nft,
          price: nft.price * (1 + (Math.random() * 0.01 - 0.005)),
          floorPrice: nft.floorPrice
            ? nft.floorPrice * (1 + (Math.random() * 0.005 - 0.0025))
            : undefined,
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [limit]);

  return { data, loading, error };
}
