"use client";

import React, { useState, useEffect } from "react";
import { ShoppingBag, Sparkles, ArrowRight, Menu, X } from "lucide-react";
import { Product } from "@/data/products";

interface NavbarProps {
  currentProduct: Product;
  onOrderNowClick: () => void;
  cartCount: number;
  onCartClick: () => void;
}

export default function Navbar({
  currentProduct,
  onOrderNowClick,
  cartCount,
  onCartClick,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/60 backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-black/40 py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Nano Banana Home"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-pink-500 p-[1.5px] transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3 shadow-lg shadow-orange-500/20">
              <div className="w-full h-full bg-black/90 rounded-[10px] flex items-center justify-center backdrop-blur-sm">
                {/* Custom SVG Icon: Abstract Lightning + Banana Curve */}
                <svg
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-amber-400 group-hover:text-white transition-colors"
                >
                  {/* Banana Crescent Contour */}
                  <path
                    d="M6 21C8 25 15 27 22 22C24.5 20.2 26 17.5 26.5 15C25 17 22 18.5 18 18C13 17.5 9 13.5 8 9C7.5 12 6.5 17 6 21Z"
                    fill="url(#bananaGrad)"
                    opacity="0.9"
                  />
                  {/* Lightning Energy Slash */}
                  <path
                    d="M17 4L11 15H17L15 26L23 13H17L19 4H17Z"
                    fill="url(#lightningGrad)"
                  />
                  <defs>
                    <linearGradient
                      id="bananaGrad"
                      x1="6"
                      y1="9"
                      x2="26.5"
                      y2="26"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F59E0B" />
                      <stop offset="1" stopColor="#EC4899" />
                    </linearGradient>
                    <linearGradient
                      id="lightningGrad"
                      x1="11"
                      y1="4"
                      x2="23"
                      y2="26"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#FDE047" />
                      <stop offset="0.5" stopColor="#FB923C" />
                      <stop offset="1" stopColor="#F43F5E" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-orange-400 via-amber-300 to-pink-500 bg-clip-text text-transparent">
                Nano Banana
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-widest text-white/50 -mt-1 hidden sm:block">
                Future of Freshness
              </span>
            </div>
          </a>

          {/* Center: Current Flavor Pill & Links */}
          <nav className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-medium text-white/90 shadow-inner">
              <span
                className="w-2.5 h-2.5 rounded-full animate-ping"
                style={{ backgroundColor: currentProduct.themeColor }}
              />
              <span
                className="w-2 h-2 rounded-full -ml-3.5"
                style={{ backgroundColor: currentProduct.themeColor }}
              />
              <span className="text-white/60">Now Viewing:</span>
              <span className="font-bold text-white tracking-wide">
                {currentProduct.name}
              </span>
            </div>

            <a
              href="#story"
              className="text-xs uppercase tracking-wider text-white/70 hover:text-white transition-colors"
            >
              Story
            </a>
            <a
              href="#details"
              className="text-xs uppercase tracking-wider text-white/70 hover:text-white transition-colors"
            >
              Nutrients
            </a>
            <a
              href="#freshness"
              className="text-xs uppercase tracking-wider text-white/70 hover:text-white transition-colors"
            >
              Farm to Bottle
            </a>
          </nav>

          {/* Right Action: Cart + Glowing Order Now */}
          <div className="flex items-center gap-3">
            <button
              onClick={onCartClick}
              aria-label="View Shopping Cart"
              className="relative p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 transition-all text-white hover:scale-105 active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-orange-500 text-white text-[10px] font-extrabold flex items-center justify-center ring-2 ring-black shadow-lg">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Glowing Order Now Button */}
            <button
              onClick={onOrderNowClick}
              className="relative group px-5 sm:px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm tracking-wide text-white overflow-hidden transition-all duration-300 shadow-lg hover:shadow-orange-500/50 active:scale-95"
            >
              {/* Outer Glow Layer */}
              <span className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 via-pink-500 to-amber-500 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-pulse-slow" />

              {/* Button Body */}
              <span className="relative flex items-center gap-2 px-4 py-2 bg-black/85 rounded-full border border-white/20 transition-all duration-300 group-hover:bg-black/70">
                <Sparkles className="w-3.5 h-3.5 text-orange-400 group-hover:rotate-12 transition-transform" />
                <span>Order Now</span>
                <span className="text-orange-400 font-mono text-xs hidden sm:inline">
                  {currentProduct.price}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-white/70 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-white/10 border border-white/15 text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-6 bg-black/95 backdrop-blur-2xl border-b border-white/10 mt-2 space-y-3">
          <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: currentProduct.themeColor }}
            />
            <span className="text-white/60">Flavor:</span>
            <span className="font-bold text-white">{currentProduct.name}</span>
            <span className="ml-auto font-mono text-orange-400 font-bold">
              {currentProduct.price}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <a
              href="#story"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-white/5 text-white/80 hover:bg-white/10"
            >
              Story
            </a>
            <a
              href="#details"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-white/5 text-white/80 hover:bg-white/10"
            >
              Nutrients
            </a>
            <a
              href="#freshness"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-white/5 text-white/80 hover:bg-white/10"
            >
              Freshness
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
