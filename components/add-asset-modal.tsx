"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X, Search, ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { useCryptoData } from "@/hooks/use-crypto-data";
import { useNFTData } from "@/hooks/use-nft-data";
import { Input } from "./ui/input";

interface AddAssetModalProps {
  onClose: () => void;
}

export default function AddAssetModal({ onClose }: AddAssetModalProps) {
  const { data: cryptoData } = useCryptoData(20);
  const { data: nftData } = useNFTData(12);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("crypto");

  const filteredCrypto = cryptoData.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredNFTs = nftData.filter(
    (nft) =>
      nft.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nft.collection.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        transition={{ type: "spring", damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900/90 border border-slate-700/50 rounded-2xl overflow-hidden max-w-md w-full max-h-[80vh] flex flex-col"
      >
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-xl font-bold">Add Asset</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-800/50 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          <div className="relative mb-4">
            <Input
              type="text"
              placeholder="Search assets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/50 border-slate-700 backdrop-blur-sm text-white placeholder:text-gray-400 pl-10 pr-4 py-6 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>

          <Tabs
            defaultValue="crypto"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-2 mb-4 bg-slate-800/50">
              <TabsTrigger
                value="crypto"
                className="data-[state=active]:bg-gradient-to-r from-blue-500 to-purple-600 data-[state=active]:text-white"
              >
                Cryptocurrencies
              </TabsTrigger>
              <TabsTrigger
                value="nft"
                className="data-[state=active]:bg-gradient-to-r from-blue-500 to-purple-600 data-[state=active]:text-white"
              >
                NFTs
              </TabsTrigger>
            </TabsList>

            <TabsContent value="crypto" className="mt-0">
              <div className="overflow-y-auto max-h-[50vh] pr-1 space-y-2">
                {filteredCrypto.length > 0 ? (
                  filteredCrypto.map((crypto) => (
                    <motion.div
                      key={crypto.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-3 flex items-center hover:bg-slate-700/30 transition-colors cursor-pointer group"
                    >
                      <div className="relative w-8 h-8 mr-3 rounded-full overflow-hidden bg-slate-700 flex items-center justify-center">
                        <Image
                          src={crypto.image || "/placeholder.svg"}
                          alt={crypto.name}
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-medium">{crypto.name}</h3>
                        <span className="text-gray-400 text-sm uppercase">
                          {crypto.symbol}
                        </span>
                      </div>

                      <div className="text-right">
                        <div className="font-semibold">
                          ${crypto.current_price.toLocaleString()}
                        </div>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        className="ml-2 p-1 rounded-full bg-blue-500/20 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ArrowRight size={16} />
                      </motion.div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    No cryptocurrencies found
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="nft" className="mt-0">
              <div className="overflow-y-auto max-h-[50vh] pr-1">
                <div className="grid grid-cols-2 gap-3">
                  {filteredNFTs.length > 0 ? (
                    filteredNFTs.map((nft) => (
                      <motion.div
                        key={nft.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                        className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden hover:border-purple-500/50 transition-colors cursor-pointer"
                      >
                        <div className="relative aspect-square">
                          <Image
                            src={nft.image || "/placeholder.svg"}
                            alt={nft.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="p-2">
                          <h3 className="font-medium text-sm truncate">
                            {nft.name}
                          </h3>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400 text-xs truncate">
                              {nft.collection}
                            </span>
                            <span className="text-xs font-semibold">
                              {nft.price} ETH
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-400 col-span-2">
                      No NFTs found
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-auto p-4 border-t border-slate-800">
          <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
            Add Selected {activeTab === "crypto" ? "Cryptocurrency" : "NFT"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
