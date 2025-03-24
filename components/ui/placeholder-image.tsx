"use client";

import { useId } from "react";

interface PlaceholderImageProps {
  width: number;
  height: number;
  className?: string;
  type?: "crypto" | "nft" | "avatar";
}

export default function PlaceholderImage({
  width,
  height,
  className = "",
  type = "crypto",
}: PlaceholderImageProps) {
  const id = useId();

  // Different gradients based on image type
  const getGradient = () => {
    switch (type) {
      case "nft":
        return (
          <linearGradient
            id={`gradient-${id}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.6" />
          </linearGradient>
        );
      case "avatar":
        return (
          <linearGradient
            id={`gradient-${id}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.6" />
          </linearGradient>
        );
      default:
        return (
          <linearGradient
            id={`gradient-${id}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#6366F1" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.6" />
          </linearGradient>
        );
    }
  };

  // Different patterns based on image type
  const getPattern = () => {
    switch (type) {
      case "nft":
        return (
          <pattern
            id={`pattern-${id}`}
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="10" cy="10" r="2" fill="rgba(255, 255, 255, 0.2)" />
          </pattern>
        );
      case "avatar":
        return (
          <pattern
            id={`pattern-${id}`}
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect
              x="8"
              y="8"
              width="4"
              height="4"
              fill="rgba(255, 255, 255, 0.2)"
            />
          </pattern>
        );
      default:
        return (
          <pattern
            id={`pattern-${id}`}
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0,10 L20,10 M10,0 L10,20"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="1"
            />
          </pattern>
        );
    }
  };

  // Different icons based on image type
  const getIcon = () => {
    switch (type) {
      case "nft":
        return (
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z"
            fill="rgba(255, 255, 255, 0.5)"
          />
        );
      case "avatar":
        return (
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
            fill="rgba(255, 255, 255, 0.5)"
          />
        );
      default:
        return (
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"
            fill="rgba(255, 255, 255, 0.5)"
          />
        );
    }
  };

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {getGradient()}
        {getPattern()}
      </defs>

      {/* Background */}
      <rect width="24" height="24" fill={`url(#gradient-${id})`} rx="4" />

      {/* Pattern overlay */}
      <rect width="24" height="24" fill={`url(#pattern-${id})`} rx="4" />

      {/* Icon */}
      <g transform="translate(0, 0)">{getIcon()}</g>
    </svg>
  );
}
