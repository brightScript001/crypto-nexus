"use client";

import * as React from "react";
import {
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  TooltipProps,
} from "recharts";

interface ChartProps<T> {
  data: T[];
  xAxisKey: keyof T;
  yAxisKey: keyof T;
  children: React.ReactNode | React.ReactNode[];
  showGrid?: boolean;
  showAxis?: boolean;
}

export function ChartContainer<T>({
  data,
  xAxisKey,
  yAxisKey,
  children,
  showGrid = true,
  showAxis = true,
}: ChartProps<T>) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart
        data={data}
        margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
      >
        {showAxis && (
          <>
            <XAxis
              dataKey={String(xAxisKey)}
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              hide={!showGrid}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              hide={!showGrid}
              tickFormatter={(value: number) => `$${value.toLocaleString()}`}
            />
          </>
        )}
        {children}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}

interface LineChartProps<T> {
  data: T[];
  xAxisKey: keyof T;
  yAxisKey: keyof T;
  stroke?: string;
  fill?: string;
  showTooltip?: boolean;
}

export function LineChart<T>({
  data,
  xAxisKey,
  yAxisKey,
  stroke = "#8884d8",
  fill = "#8884d820",
  showTooltip = true,
}: LineChartProps<T>) {
  return (
    <>
      <React.Fragment>
        <defs>
          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={stroke} stopOpacity={0.8} />
            <stop offset="95%" stopColor={stroke} stopOpacity={0} />
          </linearGradient>
        </defs>
      </React.Fragment>
      <Line
        type="monotone"
        dataKey={String(yAxisKey)}
        stroke={stroke}
        strokeWidth={2}
        dot={false}
        activeDot={{ r: 6, strokeWidth: 0 }}
        fill={fill ? "url(#colorGradient)" : undefined}
      />
    </>
  );
}

// Custom tooltip component
const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
  active,
  payload,
}) => {
  if (!active || !payload || payload.length === 0) return null;

  const value = payload[0]?.value;
  const date = payload[0]?.payload?.date;

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col">
          <span className="text-[0.70rem] uppercase text-muted-foreground">
            Value
          </span>
          <span className="font-bold text-foreground">
            ${value?.toLocaleString()}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[0.70rem] uppercase text-muted-foreground">
            Date
          </span>
          <span className="font-bold text-foreground">{date}</span>
        </div>
      </div>
    </div>
  );
};

export function ChartTooltip() {
  return <Tooltip content={<CustomTooltip />} />;
}
