"use client";

import React, { useState } from "react";
import { ArrowRight, Check, Heart, Mail, ShieldCheck, Sparkles } from "lucide-react";
import { Product } from "@/data/products";

interface FooterProps {
  products: Product[];
  currentProductIndex: number;
  onSelectProduct: (index: number) => void;
}

export default function Footer({
  products,
  currentProductIndex,
  onSelectProduct,
}: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="relative bg-gray-900 text-white/70 border-t border-white/10 pt-20 pb-12 overflow-hidden z-20">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-28 bg-gradient-to-b from-orange-500/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Col 1: Brand (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-pink-500 p-[1.5px] shadow-lg shadow-orange-500/20">
                <div className="w-full h-full bg-black/90 rounded-[10px] flex items-center justify-center">
                  <svg
                    viewBox="0 0 32 32"
                    fill="none"
                    className="w-4 h-4 text-amber-400"
                  >
                    <path
                      d="M6 21C8 25 15 27 22 22C24.5 20.2 26 17.5 26.5 15C25 17 22 18.5 18 18C13 17.5 9 13.5 8 9C7.5 12 6.5 17 6 21Z"
                      fill="#F59E0B"
                    />
                    <path
                      d="M17 4L11 15H17L15 26L23 13H17L19 4H17Z"
                      fill="#FB923C"
                    />
                  </svg>
                </div>
              </div>
              <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-orange-400 via-amber-300 to-pink-500 bg-clip-text text-transparent">
                Nano Banana
              </span>
            </div>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-sm">
              The future of freshness. We harness cold hydraulic extraction and 87,000 PSI
              isostatic pressure to bottle raw, living plant nutrients without heat degradation.
            </p>

            <div className="flex items-center gap-2 text-xs text-white/50">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Certified 100% Fruit • Zero Added Water • HPP Cold Sealed</span>
            </div>
          </div>

          {/* Col 2: Shop Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-white">
              Shop Reserves
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {products.map((p, idx) => (
                <li key={p.id}>
                  <button
                    onClick={() => {
                      onSelectProduct(idx);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`flex items-center gap-2 text-left transition-colors ${
                      currentProductIndex === idx
                        ? "text-orange-400 font-bold"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: p.themeColor }}
                    />
                    <span>{p.name}</span>
                  </button>
                </li>
              ))}
              <li>
                <a
                  href="#buy-now"
                  className="text-white/50 hover:text-white transition-colors"
                >
                  Tasting Flight (3-Pack)
                </a>
              </li>
              <li>
                <a
                  href="#buy-now"
                  className="text-white/50 hover:text-white transition-colors"
                >
                  Monthly Chilled Refills
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Support & Science (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-white">
              Science & Support
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="#freshness" className="hover:text-white transition-colors">
                  The HPP Processing Science
                </a>
              </li>
              <li>
                <a href="#details" className="hover:text-white transition-colors">
                  Nutritional Bioavailability
                </a>
              </li>
              <li>
                <a href="#freshness" className="hover:text-white transition-colors">
                  Cold-Chain Logistics Guarantee
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Wholesale & Metro Stockists
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Transparency Lab Certificates
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter Signup (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-white flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Join The Fresh Club</span>
            </h4>
            <p className="text-xs text-white/70 leading-relaxed">
              Unlock 15% off your initial chilled batch and receive alerts for limited
              harvest drops.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2.5">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/40 text-xs focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white transition-colors flex items-center justify-center"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {subscribed && (
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold">
                  <Check className="w-3.5 h-3.5" />
                  <span>Welcome aboard! Check your inbox for 15% off.</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Credits Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>
            © {new Date().getFullYear()} Nano Banana Inc. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Chilled Shipping Policy
            </a>
          </div>

          <div className="flex items-center gap-1 text-white/60">
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
            <span>for pure vitality</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
