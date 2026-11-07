"use client";

import React from "react";
import { motion } from "framer-motion";
import { Product } from "@/data/products";
import { ShieldCheck, Snowflake, Gauge, Wind, Clock, CheckCircle2 } from "lucide-react";

interface FreshnessSectionProps {
  product: Product;
}

export default function FreshnessSection({ product }: FreshnessSectionProps) {
  const steps = [
    {
      step: "01",
      title: "Dawn Harvest",
      desc: "Plucked at peak brix sugar balance from pesticide-free smallholder groves.",
      icon: Clock,
    },
    {
      step: "02",
      title: "Zero-Heat Pressing",
      desc: "Hydraulic cold pressing keeps cellular structures intact and prevents oxidation.",
      icon: Wind,
    },
    {
      step: "03",
      title: "87,000 PSI Cold HPP",
      desc: "Isostatic cold water pressure neutralizes microorganisms without a single degree of heat.",
      icon: Gauge,
    },
    {
      step: "04",
      title: "Insulated Cold Chain",
      desc: "Chilled to 3°C within 15 minutes of bottling and dispatched in thermal eco-mailers.",
      icon: Snowflake,
    },
  ];

  return (
    <section
      id="freshness"
      className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Background Accent */}
      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-20"
        style={{ backgroundColor: product.themeColor }}
      />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-xs font-bold uppercase tracking-widest text-white/90 mb-4 shadow-lg"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>The Freshness Manifesto</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-6"
        >
          {product.freshnessSection.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg sm:text-xl text-white/80 leading-relaxed font-light"
        >
          {product.freshnessSection.description}
        </motion.p>
      </div>

      {/* 4 Step Visual Pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {steps.map((st, index) => {
          const IconComponent = st.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="relative p-6 sm:p-8 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/15 hover:border-white/30 transition-all duration-300 flex flex-col justify-between group shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-black text-white/30 group-hover:text-white/60 transition-colors">
                    {st.step}
                  </span>
                  <div
                    className="p-3 rounded-2xl bg-white/10 border border-white/15 group-hover:scale-110 transition-transform"
                    style={{ color: product.themeColor }}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                  {st.title}
                </h3>

                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  {st.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-emerald-400 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Zero Heat Standard</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Live Cold-Chain Telemetry Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="p-6 sm:p-8 rounded-3xl bg-black/50 backdrop-blur-2xl border border-white/15 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
      >
        <div className="space-y-1">
          <span className="text-[11px] uppercase tracking-wider text-white/50 font-bold">
            Cold Chain Temp
          </span>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono">
            3.2 °C
          </div>
          <span className="text-[10px] text-emerald-400 font-semibold">
            ● Optimal Freshness
          </span>
        </div>

        <div className="space-y-1">
          <span className="text-[11px] uppercase tracking-wider text-white/50 font-bold">
            HPP Pressure
          </span>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono">
            600 MPa
          </div>
          <span className="text-[10px] text-emerald-400 font-semibold">
            ● Pathogen-Neutralized
          </span>
        </div>

        <div className="space-y-1">
          <span className="text-[11px] uppercase tracking-wider text-white/50 font-bold">
            Thermal Heat Added
          </span>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono">
            0.00 °C
          </div>
          <span className="text-[10px] text-emerald-400 font-semibold">
            ● Raw Enzyme Active
          </span>
        </div>

        <div className="space-y-1">
          <span className="text-[11px] uppercase tracking-wider text-white/50 font-bold">
            Shelf Life (Chilled)
          </span>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono">
            45 Days
          </div>
          <span className="text-[10px] text-emerald-400 font-semibold">
            ● 100% Without Chemicals
          </span>
        </div>
      </motion.div>
    </section>
  );
}
