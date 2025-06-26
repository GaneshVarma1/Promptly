"use client";
import React, { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";

export function MovingBorderBox({
  color = "var(--sky-500)",
  borderRadius = 24,
  duration = 2000,
  borderWidth = 2,
  className = "",
  children,
  ...props
}: {
  color?: string;
  borderRadius?: number;
  duration?: number;
  borderWidth?: number;
  className?: string;
  children: React.ReactNode;
  [key: string]: any;
}) {
  const pathRef = useRef<SVGRectElement>(null);
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
    <div className={`relative ${className}`} style={{ borderRadius }} {...props}>
      <svg
        className="absolute left-0 top-0 w-full h-full pointer-events-none"
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ zIndex: 2 }}
      >
        <rect
          ref={pathRef}
          x={borderWidth / 2}
          y={borderWidth / 2}
          width={100 - borderWidth}
          height={100 - borderWidth}
          rx={borderRadius}
          ry={borderRadius}
          fill="none"
          stroke="var(--border-color, #38bdf8)"
          strokeWidth={borderWidth}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 3,
        }}
      >
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            transform,
            width: 32,
            height: 32,
            borderRadius: 16,
            background: `radial-gradient(circle, ${color} 60%, transparent 100%)`,
            opacity: 0.7,
          }}
        />
      </motion.div>
      <div
        className="relative w-full h-full"
        style={{
          borderRadius,
          zIndex: 4,
        }}
      >
        {children}
      </div>
    </div>
  );
} 