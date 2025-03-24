"use client";

import React from "react";
import { ThemeProvider } from "./theme-provider";

export default function ClientThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
