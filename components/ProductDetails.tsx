"use client";

import React from "react";
import { motion } from "framer-motion";
import { Product } from "@/data/products";
import { Droplet, Sparkles, ShieldCheck, Award, Leaf, Zap } from "lucide-react";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <section
      id="details"
      className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Decorative Background Lighting */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full blur-[120px] pointer-events-none opacity-30"
        style={{ backgroundColor: product.themeColor }}
      />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-xs font-bold uppercase tracking-widest text-amber-300 mb-4 shadow-lg"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>The Alchemy of Raw Purity</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-6"
        >
          {product.detailsSection.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg sm:text-xl text-white/80 leading-relaxed font-light"
        >
          {product.detailsSection.description}
        </motion.p>
      </div>

      {/* 3 Core Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {product.stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="group relative p-8 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/15 hover:border-white/30 transition-all duration-300 shadow-2xl hover:-translate-y-1"
          >
            {/* Card Background Glow */}
            <div
              className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-15 group-hover:opacity-30 transition-opacity"
              style={{ backgroundColor: product.themeColor }}
            />

            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-white/50">
                Specification 0{idx + 1}
              </span>
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: product.themeColor }}
              />
            </div>

            <div className="text-5xl sm:text-6xl font-black text-white mb-2 tracking-tight group-hover:scale-105 transition-transform origin-left">
              {stat.val}
            </div>

            <div className="text-sm font-semibold uppercase tracking-wider text-white/70">
              {stat.label}
            </div>

            <p className="mt-4 text-xs text-white/50 leading-relaxed">
              Strictly verified batch testing. Zero artificial dilution or sweeteners.
            </p>
          </motion.div>
        ))}
      </div>

      {/* Feature Badges & Process Pillars */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-black/60 to-black/30 backdrop-blur-2xl border border-white/15 shadow-2xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold uppercase tracking-widest text-white/90">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Certified Excellence</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Why Nano Banana Outperforms Conventional Juice
            </h3>

            <p className="text-white/75 text-sm sm:text-base leading-relaxed">
              Standard supermarket juices undergo boiling thermal pasteurization, destroying
              living enzymes, heat-fragile vitamins, and true aromatic notes. Nano Banana relies on
              sub-zero cold-pressing and isostatic pressure, unlocking vibrant, uncorrupted vitality.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {product.features.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
                >
                  <ShieldCheck
                    className="w-5 h-5 flex-shrink-0"
                    style={{ color: product.themeColor }}
                  />
                  <span className="text-xs font-bold text-white tracking-wide">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Comparison Matrix */}
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400 flex items-center gap-1.5">
                  <Leaf className="w-4 h-4" /> Nano Banana (HPP Cold-Press)
                </span>
                <span className="text-xs font-mono font-bold text-white bg-emerald-500/30 px-2 py-0.5 rounded">
                  Raw / Living
                </span>
              </div>
              <ul className="text-xs text-white/80 space-y-1.5 list-disc list-inside">
                <li>100% active digestive enzymes intact</li>
                <li>Zero thermal degradation of Vitamin C</li>
                <li>True-to-fruit crisp mouthfeel</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 opacity-70">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase font-extrabold tracking-widest text-red-400 flex items-center gap-1.5">
                  <Zap className="w-4 h-4" /> Conventional Shelf-Stable Juices
                </span>
                <span className="text-xs font-mono font-bold text-white/60 bg-red-500/20 px-2 py-0.5 rounded">
                  Dead Heat
                </span>
              </div>
              <ul className="text-xs text-white/60 space-y-1.5 list-disc list-inside">
                <li>Boiled up to 95°C during pasteurization</li>
                <li>Reconstituted from concentrated pastes</li>
                <li>Often artificially sweetened or preserved</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
