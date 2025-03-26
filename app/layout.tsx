import type React from "react";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientThemeProvider from "@/providers/client-theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crypto Nexus",
  description: "Next-gen, Web3-inspired crypto/NFT price tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientThemeProvider>{children}</ClientThemeProvider>
      </body>
    </html>
  );
}
