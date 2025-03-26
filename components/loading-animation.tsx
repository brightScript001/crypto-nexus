"use client";

import { motion } from "framer-motion";

interface LoadingAnimationProps {
  size?: number;
  color?: string;
}

export default function LoadingAnimation({
  size = 40,
  color = "bg-gradient-to-r from-blue-500 to-purple-600",
}: LoadingAnimationProps) {
  return (
    <div className="flex items-center justify-center">
      <div className="relative" style={{ width: size, height: size }}>
        <motion.div
          className={`absolute inset-0 rounded-full ${color}`}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className={`absolute inset-0 rounded-full ${color}`}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />

        <motion.div
          className="absolute inset-0 rounded-full bg-white"
          initial={{ scale: 0.2 }}
          animate={{
            scale: [0.2, 0.3, 0.2],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
}
