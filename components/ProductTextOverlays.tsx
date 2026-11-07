"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import { Product } from "@/data/products";
import { Sparkles, Sun, Zap, Heart } from "lucide-react";

interface ProductTextOverlaysProps {
  scrollYProgress: MotionValue<number>;
  product: Product;
}

export default function ProductTextOverlays({
  scrollYProgress,
  product,
}: ProductTextOverlaysProps) {
  // Section 1: Hero entrance (0.00 -> 0.22)
  const opacity1 = useTransform(
    scrollYProgress,
    [0.0, 0.08, 0.16, 0.22],
    [1, 1, 0.9, 0]
  );
  const y1 = useTransform(
    scrollYProgress,
    [0.0, 0.08, 0.16, 0.22],
    [0, 0, -25, -60]
  );
  const scale1 = useTransform(scrollYProgress, [0.0, 0.22], [1, 0.95]);

  // Section 2: Flavor explosion (0.24 -> 0.48)
  const opacity2 = useTransform(
    scrollYProgress,
    [0.22, 0.28, 0.42, 0.48],
    [0, 1, 1, 0]
  );
  const y2 = useTransform(
    scrollYProgress,
    [0.22, 0.28, 0.42, 0.48],
    [50, 0, 0, -50]
  );
  const scale2 = useTransform(scrollYProgress, [0.22, 0.48], [0.95, 1.02]);

  // Section 3: Vitality & Energy (0.50 -> 0.74)
  const opacity3 = useTransform(
    scrollYProgress,
    [0.48, 0.54, 0.68, 0.74],
    [0, 1, 1, 0]
  );
  const y3 = useTransform(
    scrollYProgress,
    [0.48, 0.54, 0.68, 0.74],
    [50, 0, 0, -50]
  );
  const scale3 = useTransform(scrollYProgress, [0.48, 0.74], [0.95, 1.02]);

  // Section 4: Pure fruit declaration (0.76 -> 0.98)
  const opacity4 = useTransform(
    scrollYProgress,
    [0.74, 0.8, 0.92, 0.98],
    [0, 1, 1, 0]
  );
  const y4 = useTransform(
    scrollYProgress,
    [0.74, 0.8, 0.92, 0.98],
    [50, 0, 0, -30]
  );
  const scale4 = useTransform(scrollYProgress, [0.74, 0.98], [0.95, 1.05]);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-center items-center overflow-hidden">
      {/* SECTION 1: Pure Sunshine / Brand Hook */}
      <motion.div
        style={{ opacity: opacity1, y: y1, scale: scale1 }}
        className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center"
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/20 text-xs sm:text-sm font-semibold tracking-wider uppercase text-amber-300 shadow-xl">
            <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
            <span>100% Raw Living Juice</span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-white drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)] leading-[1.05]">
            {product.section1.title}
          </h1>

          <p className="text-xl sm:text-2xl md:text-3xl font-light text-white/90 max-w-xl mx-auto drop-shadow-md">
            {product.section1.subtitle}
          </p>

          <div className="flex items-center gap-3 pt-2">
            {product.features.map((feat, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full text-xs font-semibold bg-white/15 backdrop-blur-md border border-white/20 text-white/90 shadow"
              >
                {feat}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* SECTION 2: Orchard / Fresh Ingredients */}
      <motion.div
        style={{ opacity: opacity2, y: y2, scale: scale2 }}
        className="absolute inset-0 flex flex-col items-start justify-center px-6 sm:px-12 md:px-20 lg:px-32"
      >
        <div className="max-w-2xl text-left space-y-4 bg-black/35 backdrop-blur-md p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-xs font-bold tracking-widest uppercase text-white/80">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Peak Orchard Harvest</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-tight drop-shadow-lg">
            {product.section2.title}
          </h2>

          <p className="text-base sm:text-xl text-white/85 font-normal leading-relaxed">
            {product.section2.subtitle}
          </p>
        </div>
      </motion.div>

      {/* SECTION 3: Vitality / Energy Boost */}
      <motion.div
        style={{ opacity: opacity3, y: y3, scale: scale3 }}
        className="absolute inset-0 flex flex-col items-end justify-center px-6 sm:px-12 md:px-20 lg:px-32"
      >
        <div className="max-w-2xl text-right space-y-4 bg-black/35 backdrop-blur-md p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-xs font-bold tracking-widest uppercase text-white/80 ml-auto">
            <Zap className="w-3.5 h-3.5 text-yellow-300" />
            <span>Bio-Active Nutrition</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-tight drop-shadow-lg">
            {product.section3.title}
          </h2>

          <p className="text-base sm:text-xl text-white/85 font-normal leading-relaxed">
            {product.section3.subtitle}
          </p>

          <div className="flex justify-end gap-3 pt-2">
            {product.stats.map((s, idx) => (
              <div
                key={idx}
                className="flex flex-col items-end px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-right"
              >
                <span className="text-lg font-black text-white">{s.val}</span>
                <span className="text-[10px] uppercase font-bold text-white/60">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* SECTION 4: Pure Fruit Declaration */}
      <motion.div
        style={{ opacity: opacity4, y: y4, scale: scale4 }}
        className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center"
      >
        <div className="max-w-4xl mx-auto space-y-6 bg-black/40 backdrop-blur-xl p-8 sm:p-12 rounded-3xl border border-white/15 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 border border-white/30 text-xs font-bold tracking-widest uppercase text-white">
            <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
            <span>Zero Compromise</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight text-white leading-none drop-shadow-2xl">
            {product.section4.title}
          </h2>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            {product.buyNowSection.processingParams.map((param, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-xl text-sm font-bold bg-white/15 border border-white/20 text-white backdrop-blur-md shadow-lg"
              >
                ✓ {param}
              </span>
            ))}
          </div>

          <p className="text-sm sm:text-base text-white/70 max-w-lg mx-auto">
            Scroll down to explore the farm-to-bottle craft and secure your batch.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
