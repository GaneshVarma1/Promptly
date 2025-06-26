"use client";
import React, { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";

export function MovingBorderLine({
  color = "var(--sky-500)",
  height = 4,
  duration = 2000,
  className = "",
  ...props
}: {
  color?: string;
  height?: number;
  duration?: number;
  className?: string;
  [key: string]: any;
}) {
  const pathRef = useRef<SVGLineElement>(null);
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength?.();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).x
  );
  const y = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).y
  );

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <div className={`relative w-full`} style={{ height }} {...props}>
      <svg
        className="absolute left-0 top-0 w-full h-full"
        width="100%"
        height={height}
        viewBox={`0 0 100 ${height}`}
        preserveAspectRatio="none"
      >
        <line
          ref={pathRef}
          x1="0"
          y1={height / 2}
          x2="100"
          y2={height / 2}
          stroke="var(--border-color, #38bdf8)"
          strokeWidth={height}
          strokeLinecap="round"
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          transform,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            width: height * 3,
            height,
            borderRadius: height,
            background: `radial-gradient(circle, ${color} 60%, transparent 100%)`,
            opacity: 0.7,
          }}
        />
      </motion.div>
    </div>
  );
} 