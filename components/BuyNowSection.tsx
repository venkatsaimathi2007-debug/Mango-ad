"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Product } from "@/data/products";
import confetti from "canvas-confetti";
import {
  ShoppingBag,
  Truck,
  RotateCcw,
  ShieldCheck,
  Plus,
  Minus,
  Sparkles,
  ArrowRight,
  Check,
} from "lucide-react";

interface BuyNowSectionProps {
  product: Product;
  onAddToCart: (quantity: number, packSize: number) => void;
  onNextFlavor: () => void;
  nextProductName: string;
}

export default function BuyNowSection({
  product,
  onAddToCart,
  onNextFlavor,
  nextProductName,
}: BuyNowSectionProps) {
  const [packSize, setPackSize] = useState<number>(6); // 1, 6, 12
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  // Extract base numerical price from "₹120"
  const basePrice = parseInt(product.buyNowSection.price.replace(/[^\d]/g, ""), 10) || 120;

  // Calculate pricing with pack discounts
  const discountMultiplier = packSize === 12 ? 0.8 : packSize === 6 ? 0.9 : 1.0;
  const totalPrice = Math.round(basePrice * packSize * quantity * discountMultiplier);
  const originalPrice = basePrice * packSize * quantity;
  const savings = originalPrice - totalPrice;

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Fire confetti from button position
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { x, y },
      colors: [product.themeColor, "#FF8A00", "#FF3366", "#FFFFFF"],
    });

    onAddToCart(quantity, packSize);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2400);
  };

  return (
    <section
      id="buy-now"
      className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Background radial highlight */}
      <div
        className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[140px] pointer-events-none opacity-25"
        style={{ backgroundColor: product.themeColor }}
      />

      {/* Main Commerce Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative rounded-3xl bg-gradient-to-br from-black/70 via-black/50 to-black/70 backdrop-blur-2xl border border-white/20 p-8 sm:p-12 lg:p-16 shadow-2xl overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Product Info & Pack Options (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-bold uppercase tracking-widest text-amber-300 mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Micro-Batch Reserve</span>
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
                {product.name}
              </h2>
              <p className="text-lg text-white/70 font-light mt-1">
                {product.subName} — {product.buyNowSection.unit}
              </p>
            </div>

            {/* Processing Badges */}
            <div className="flex flex-wrap gap-2.5">
              {product.buyNowSection.processingParams.map((param, i) => (
                <span
                  key={i}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/10 border border-white/15 text-white/90 backdrop-blur-md flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  {param}
                </span>
              ))}
            </div>

            {/* Pack Size Selector */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-white/70 block">
                Select Reserve Pack Size
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { size: 1, label: "Single", discount: "" },
                  { size: 6, label: "6-Pack", discount: "Save 10%" },
                  { size: 12, label: "12-Pack", discount: "Save 20%" },
                ].map((pack) => (
                  <button
                    key={pack.size}
                    onClick={() => setPackSize(pack.size)}
                    className={`relative p-3.5 sm:p-4 rounded-2xl border text-center transition-all duration-200 ${
                      packSize === pack.size
                        ? "bg-white/20 border-white text-white shadow-lg ring-1 ring-white/50"
                        : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {pack.discount && (
                      <span className="absolute -top-2.5 right-2 px-2 py-0.5 rounded-full bg-orange-500 text-white text-[9px] font-black uppercase tracking-wider">
                        {pack.discount}
                      </span>
                    )}
                    <div className="text-base sm:text-lg font-black">{pack.label}</div>
                    <div className="text-[11px] opacity-70">
                      {pack.size === 1 ? "Daily dose" : pack.size === 6 ? "Weekly refill" : "Pro subscription"}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Delivery & Return Assurances */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <Truck className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-white/80 leading-relaxed">
                  <strong className="text-white">Cold-Chain Delivery: </strong>
                  {product.buyNowSection.deliveryPromise}
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <RotateCcw className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-white/80 leading-relaxed">
                  <strong className="text-white">Freshness Guarantee: </strong>
                  {product.buyNowSection.returnPolicy}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing & Checkout Action (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-black/60 border border-white/15 space-y-8 shadow-xl">
            {/* Price Readout */}
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-white/50">
                Subtotal
              </span>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight">
                  ₹{totalPrice.toLocaleString("en-IN")}
                </span>
                {savings > 0 && (
                  <span className="text-lg text-white/40 line-through font-mono">
                    ₹{originalPrice.toLocaleString("en-IN")}
                  </span>
                )}
              </div>
              {savings > 0 && (
                <span className="inline-block text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                  You save ₹{savings} with pack discount
                </span>
              )}
            </div>

            {/* Quantity Stepper */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-white/70 block">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center rounded-2xl bg-white/10 border border-white/15 p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Decrease quantity"
                    className="p-2.5 rounded-xl hover:bg-white/10 text-white transition-colors disabled:opacity-30"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-5 font-mono font-bold text-lg text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Increase quantity"
                    className="p-2.5 rounded-xl hover:bg-white/10 text-white transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-xs text-white/60">
                  Total Bottles: <strong className="text-white">{packSize * quantity}</strong>
                </span>
              </div>
            </div>

            {/* Add to Cart CTA */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                className="w-full relative group p-[2px] rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-xl hover:shadow-orange-500/30"
              >
                {/* Glowing edge gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 animate-pulse-slow" />

                <div className="relative flex items-center justify-center gap-3 py-4 px-6 rounded-[14px] bg-black font-extrabold text-base text-white tracking-wide transition-colors group-hover:bg-black/85">
                  <ShoppingBag className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span>
                    {isAdded ? "Added to Cold Bag!" : `Add to Cart — ₹${totalPrice}`}
                  </span>
                </div>
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-white/60">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Cold-packaged & dispatched within 2 hours</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Large Slanted-Edge CTA: Next Flavor Journey */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-16 text-center"
      >
        <button
          onClick={onNextFlavor}
          className="group relative inline-flex items-center gap-4 px-10 py-6 rounded-2xl bg-black/60 hover:bg-black/80 border-2 border-white/20 hover:border-white/50 text-white transition-all duration-300 shadow-2xl hover:scale-105 active:scale-95 [clip-path:polygon(0%_0%,_95%_0%,_100%_50%,_95%_100%,_0%_100%,_5%_50%)]"
        >
          <div className="text-left pl-3">
            <div className="text-[10px] uppercase font-bold tracking-widest text-amber-400">
              Continue The Sensory Journey
            </div>
            <div className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-3">
              <span>Next: {nextProductName}</span>
              <ArrowRight className="w-6 h-6 text-amber-400 group-hover:translate-x-2 transition-transform" />
            </div>
          </div>
        </button>
      </motion.div>
    </section>
  );
}
