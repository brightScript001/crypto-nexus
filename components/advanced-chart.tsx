"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChartContainer, ChartTooltip, LineChart } from "@/components/ui/chart";

interface ChartData {
  date: string;
  value: number;
}

interface AdvancedChartProps {
  data?: ChartData[];
  height?: number;
  isPositive?: boolean;
  showTooltip?: boolean;
  showGrid?: boolean;
  showAxis?: boolean;
  lineColor?: string;
  areaColor?: string;
  className?: string;
}

export default function AdvancedChart({
  data,
  height = 300,
  isPositive = true,
  showTooltip = true,
  showGrid = true,
  showAxis = true,
  lineColor,
  areaColor,
  className = "",
}: AdvancedChartProps) {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    if (data && data.length > 0) {
      setChartData(data);
    } else {
      // Generate mock data if none provided
      const mockData: ChartData[] = [];
      const now = new Date();
      const baseValue = 10000;

      for (let i = 30; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);

        // Create a somewhat realistic growth curve with some volatility
        const progress = (30 - i) / 30;
        const trend = isPositive ? 1 : -1;
        const randomFactor = 1 + (Math.random() * 0.05 - 0.025); // ±2.5% random variation
        const value =
          baseValue + baseValue * 0.2 * progress * trend * randomFactor;

        mockData.push({
          date: date.toISOString().split("T")[0],
          value,
        });
      }

      setChartData(mockData);
    }
  }, [data, isPositive]);

  // Determine colors based on price trend
  const actualLineColor = lineColor || (isPositive ? "#10b981" : "#ef4444");
  const actualAreaColor =
    areaColor ||
    (isPositive ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`w-full ${className}`}
      style={{ height }}
    >
      <ChartContainer
        data={chartData}
        xAxisKey="date"
        yAxisKey="value"
        showGrid={showGrid}
        showAxis={showAxis}
      >
        <LineChart
          data={chartData}
          xAxisKey="date"
          yAxisKey="value"
          stroke={actualLineColor}
          fill={actualAreaColor}
          showTooltip={showTooltip}
        />
        {showTooltip && <ChartTooltip />}
      </ChartContainer>
    </motion.div>
  );
}
