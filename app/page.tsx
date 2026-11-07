"use client";

import React, { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { products, Product } from "@/data/products";
import Navbar from "@/components/Navbar";
import ProductBottleScroll from "@/components/ProductBottleScroll";
import ProductDetails from "@/components/ProductDetails";
import FreshnessSection from "@/components/FreshnessSection";
import BuyNowSection from "@/components/BuyNowSection";
import Footer from "@/components/Footer";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  X,
  Check,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [cartCount, setCartCount] = useState<number>(0);
  const [cartDrawerOpen, setCartDrawerOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<
    Array<{ product: Product; quantity: number; packSize: number; total: number }>
  >([]);

  const currentProduct = products[currentIndex];
  const nextIndex = (currentIndex + 1) % products.length;
  const nextProduct = products[nextIndex];
  const prevIndex = (currentIndex - 1 + products.length) % products.length;

  // Handle switching flavors
  const handleSelectProduct = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const handleNextFlavor = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  }, []);

  const handlePrevFlavor = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  }, []);

  // Reset scroll and update global theme CSS variable on flavor change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    // Update body background smoothly to match product gradient
    document.documentElement.style.setProperty(
      "--product-gradient",
      currentProduct.gradient
    );
    document.documentElement.style.setProperty(
      "--theme-color",
      currentProduct.themeColor
    );
  }, [currentIndex, currentProduct]);

  // Keyboard navigation (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === "ArrowRight") {
        handleNextFlavor();
      } else if (e.key === "ArrowLeft") {
        handlePrevFlavor();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNextFlavor, handlePrevFlavor]);

  // Cart operations
  const handleAddToCart = (quantity: number, packSize: number) => {
    const basePrice = parseInt(currentProduct.price.replace(/[^\d]/g, ""), 10) || 120;
    const discount = packSize === 12 ? 0.8 : packSize === 6 ? 0.9 : 1.0;
    const lineTotal = Math.round(basePrice * packSize * quantity * discount);

    setCartCount((prev) => prev + quantity * packSize);
    setCartItems((prev) => [
      ...prev,
      {
        product: currentProduct,
        quantity,
        packSize,
        total: lineTotal,
      },
    ]);
  };

  const handleOrderNowClick = () => {
    const buySection = document.getElementById("buy-now");
    if (buySection) {
      buySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen text-white font-sans overflow-x-hidden selection:bg-orange-500 selection:text-white">
      {/* Dynamic Background Noise / Gradient Mesh */}
      <div
        className="fixed inset-0 pointer-events-none z-[-1] transition-all duration-1000"
        style={{ background: currentProduct.gradient }}
      />
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-35 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.25),rgba(255,255,255,0))]" />

      {/* Top Navbar */}
      <Navbar
        currentProduct={currentProduct}
        onOrderNowClick={handleOrderNowClick}
        cartCount={cartCount}
        onCartClick={() => setCartDrawerOpen(true)}
      />

      {/* Fixed Left / Right Flavor Switcher Arrow Controls */}
      <div className="fixed left-4 sm:left-6 top-1/2 -translate-y-1/2 z-40 hidden md:block">
        <button
          onClick={handlePrevFlavor}
          aria-label={`Previous Flavor: ${products[prevIndex].name}`}
          className="group relative p-3 sm:p-4 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-xl border border-white/20 text-white transition-all duration-300 hover:scale-110 active:scale-95 shadow-2xl hover:shadow-orange-500/30"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-0.5 transition-transform" />
          <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1 rounded-lg bg-black/90 backdrop-blur-md border border-white/15 text-xs font-bold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
            {products[prevIndex].name}
          </span>
        </button>
      </div>

      <div className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:block">
        <button
          onClick={handleNextFlavor}
          aria-label={`Next Flavor: ${nextProduct.name}`}
          className="group relative p-3 sm:p-4 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-xl border border-white/20 text-white transition-all duration-300 hover:scale-110 active:scale-95 shadow-2xl hover:shadow-orange-500/30"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-0.5 transition-transform" />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1 rounded-lg bg-black/90 backdrop-blur-md border border-white/15 text-xs font-bold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
            {nextProduct.name}
          </span>
        </button>
      </div>

      {/* Fixed Bottom-Center Flavor Pill Menu */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-md px-4 pointer-events-auto">
        <div className="flex items-center justify-between p-1.5 rounded-full bg-black/60 backdrop-blur-2xl border border-white/20 shadow-2xl shadow-black/60">
          {products.map((prod, idx) => {
            const isActive = currentIndex === idx;
            return (
              <button
                key={prod.id}
                onClick={() => handleSelectProduct(idx)}
                className={`relative flex-1 flex items-center justify-center gap-2 py-2 px-3 sm:px-4 rounded-full text-xs font-bold transition-all duration-300 ${
                  isActive
                    ? "text-black shadow-lg"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {/* Active Highlight Background Pill */}
                {isActive && (
                  <motion.div
                    layoutId="activeFlavorPill"
                    className="absolute inset-0 rounded-full bg-white shadow-lg"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                <span
                  className="relative z-10 w-2 h-2 rounded-full transition-transform"
                  style={{ backgroundColor: prod.themeColor }}
                />
                <span className="relative z-10 truncate">{prod.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Orchestration with AnimatePresence */}
      <AnimatePresence mode="wait">
        <motion.main
          key={currentProduct.id}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full"
        >
          {/* 1. Scrollytelling HTML5 Canvas Bottle Sequence */}
          <ProductBottleScroll product={currentProduct} />

          {/* 2. Visual Details & Nutrition Section */}
          <ProductDetails product={currentProduct} />

          {/* 3. Farm to Bottle / Freshness Processing Section */}
          <FreshnessSection product={currentProduct} />

          {/* 4. Commerce & Buy Now Section + Next Flavor Slanted CTA */}
          <BuyNowSection
            product={currentProduct}
            onAddToCart={handleAddToCart}
            onNextFlavor={handleNextFlavor}
            nextProductName={nextProduct.name}
          />

          {/* 5. Luxury Brand Footer */}
          <Footer
            products={products}
            currentProductIndex={currentIndex}
            onSelectProduct={handleSelectProduct}
          />
        </motion.main>
      </AnimatePresence>

      {/* Slide-in Shopping Bag Drawer */}
      <AnimatePresence>
        {cartDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartDrawerOpen(false)}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md z-50 bg-black/95 border-l border-white/15 p-6 flex flex-col justify-between shadow-2xl backdrop-blur-2xl"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-orange-400" />
                    <h3 className="text-lg font-black tracking-tight text-white">
                      Your Cold Bag ({cartCount})
                    </h3>
                  </div>
                  <button
                    onClick={() => setCartDrawerOpen(false)}
                    aria-label="Close cart drawer"
                    className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="mt-6 space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                  {cartItems.length === 0 ? (
                    <div className="text-center py-16 text-white/50 space-y-3">
                      <ShoppingBag className="w-10 h-10 mx-auto opacity-30" />
                      <p className="text-sm">Your cold bag is empty.</p>
                      <button
                        onClick={() => {
                          setCartDrawerOpen(false);
                          handleOrderNowClick();
                        }}
                        className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-bold hover:bg-white/20 transition-all"
                      >
                        Explore Reserve Flavors
                      </button>
                    </div>
                  ) : (
                    cartItems.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10"
                      >
                        <div className="space-y-1">
                          <div className="font-bold text-sm text-white flex items-center gap-2">
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: item.product.themeColor }}
                            />
                            {item.product.name}
                          </div>
                          <div className="text-xs text-white/60">
                            {item.packSize}-Pack × {item.quantity} (Total {item.packSize * item.quantity} bottles)
                          </div>
                        </div>
                        <div className="font-mono font-bold text-sm text-orange-400">
                          ₹{item.total.toLocaleString("en-IN")}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {cartItems.length > 0 && (
                <div className="pt-6 border-t border-white/10 space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Chilled Shipping</span>
                    <span className="text-emerald-400 font-bold uppercase text-xs">
                      Free (Metro Express)
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-base">
                    <span className="font-bold text-white">Estimated Total</span>
                    <span className="font-mono font-black text-xl text-white">
                      ₹
                      {cartItems
                        .reduce((acc, curr) => acc + curr.total, 0)
                        .toLocaleString("en-IN")}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      alert("Order simulation complete! Fresh batch dispatched to cold chain packaging.");
                      setCartItems([]);
                      setCartCount(0);
                      setCartDrawerOpen(false);
                    }}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 font-black text-sm text-white tracking-wide shadow-xl hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-white" />
                    <span>Proceed to Cold-Chain Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
