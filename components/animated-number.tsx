"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  formatOptions?: Intl.NumberFormatOptions;
  className?: string;
}

export default function AnimatedNumber({
  value,
  duration = 1,
  formatOptions = { minimumFractionDigits: 2, maximumFractionDigits: 2 },
  className = "",
}: AnimatedNumberProps) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const [prevValue, setPrevValue] = useState(value);

  const springValue = useSpring(prevValue, {
    stiffness: 100,
    damping: 30,
    duration,
  });

  const displayValue = useTransform(springValue, (current) =>
    current.toLocaleString(undefined, formatOptions)
  );

  useEffect(() => {
    if (value !== prevValue) {
      setPrevValue(value);
      springValue.set(value);
    }
  }, [value, prevValue, springValue]);

  return (
    <motion.span ref={nodeRef} className={className}>
      {displayValue}
    </motion.span>
  );
}
