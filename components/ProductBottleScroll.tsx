"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useScroll } from "framer-motion";
import { Product } from "@/data/products";
import ProductTextOverlays from "./ProductTextOverlays";

interface ProductBottleScrollProps {
  product: Product;
}

const TOTAL_FRAMES = 120;

export default function ProductBottleScroll({ product }: ProductBottleScrollProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastRenderedIndexRef = useRef<number>(-1);
  const animationFrameIdRef = useRef<number | null>(null);
  const isComponentMountedRef = useRef<boolean>(true);

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // Scroll tracking across the 500vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Responsive frame rendering with "contain" fit and high-DPI clarity
  const renderFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const images = imagesRef.current;
    let img = images[frameIndex];

    // If target frame not yet loaded, find closest loaded neighbor
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset < 20; offset++) {
        const left = images[frameIndex - offset];
        if (left && left.complete && left.naturalWidth > 0) {
          img = left;
          break;
        }
        const right = images[frameIndex + offset];
        if (right && right.complete && right.naturalWidth > 0) {
          img = right;
          break;
        }
      }
    }

    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    if (img && img.complete && img.naturalWidth > 0) {
      lastRenderedIndexRef.current = frameIndex;

      // "contain" fit aspect calculation
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = width / height;

      let drawWidth = width;
      let drawHeight = height;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        // Canvas is wider than image
        drawWidth = height * imgRatio;
        offsetX = (width - drawWidth) / 2;
      } else {
        // Canvas is taller than image
        drawHeight = width / imgRatio;
        offsetY = (height - drawHeight) / 2;
      }

      // Draw subtle ambient glow behind the bottle matching theme color
      const centerX = width / 2;
      const centerY = height / 2;
      const glowRadius = Math.min(drawWidth, drawHeight) * 0.45;
      const glowGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        glowRadius * 0.1,
        centerX,
        centerY,
        glowRadius
      );
      glowGrad.addColorStop(0, `${product.themeColor}33`); // 20% opacity
      glowGrad.addColorStop(0.7, `${product.themeColor}11`); // 7% opacity
      glowGrad.addColorStop(1, "transparent");

      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, glowRadius, 0, Math.PI * 2);
      ctx.fill();

      // Render the high-resolution frame
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    } else {
      // Procedural fallback bottle while images are streaming
      drawProceduralBottle(ctx, width, height, product.themeColor);
    }
  }, [product.themeColor]);

  // Procedural luxury bottle silhouette fallback
  const drawProceduralBottle = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    color: string
  ) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const bottleH = Math.min(height * 0.65, 480);
    const bottleW = bottleH * 0.38;

    // Ambient background aura
    const aura = ctx.createRadialGradient(
      centerX,
      centerY,
      10,
      centerX,
      centerY,
      bottleH * 0.55
    );
    aura.addColorStop(0, `${color}44`);
    aura.addColorStop(1, "transparent");
    ctx.fillStyle = aura;
    ctx.fillRect(0, 0, width, height);

    // Bottle body outline
    ctx.save();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
    ctx.lineWidth = 3;
    ctx.fillStyle = "rgba(255, 255, 255, 0.06)";

    const top = centerY - bottleH / 2;
    const bottom = centerY + bottleH / 2;
    const neckW = bottleW * 0.35;
    const neckH = bottleH * 0.18;

    ctx.beginPath();
    // Cap
    ctx.roundRect(centerX - neckW * 0.6, top - 18, neckW * 1.2, 18, [4, 4, 0, 0]);
    // Neck & shoulders
    ctx.moveTo(centerX - neckW / 2, top);
    ctx.lineTo(centerX - neckW / 2, top + neckH);
    ctx.bezierCurveTo(
      centerX - neckW / 2,
      top + neckH + 40,
      centerX - bottleW / 2,
      top + neckH + 20,
      centerX - bottleW / 2,
      top + neckH + 60
    );
    // Base
    ctx.lineTo(centerX - bottleW / 2, bottom - 20);
    ctx.quadraticCurveTo(centerX - bottleW / 2, bottom, centerX - bottleW / 2 + 20, bottom);
    ctx.lineTo(centerX + bottleW / 2 - 20, bottom);
    ctx.quadraticCurveTo(centerX + bottleW / 2, bottom, centerX + bottleW / 2, bottom - 20);
    ctx.lineTo(centerX + bottleW / 2, top + neckH + 60);
    ctx.bezierCurveTo(
      centerX + bottleW / 2,
      top + neckH + 20,
      centerX + neckW / 2,
      top + neckH + 40,
      centerX + neckW / 2,
      top + neckH
    );
    ctx.lineTo(centerX + neckW / 2, top);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();

    // Liquid inside
    const liquidGrad = ctx.createLinearGradient(centerX, top + neckH + 60, centerX, bottom);
    liquidGrad.addColorStop(0, `${color}cc`);
    liquidGrad.addColorStop(1, `${color}ee`);
    ctx.fillStyle = liquidGrad;
    ctx.fillRect(centerX - bottleW / 2 + 6, top + neckH + 70, bottleW - 12, bottleH * 0.65);

    ctx.restore();
  };

  // Resize canvas for device pixel ratio
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const newW = Math.floor(rect.width * dpr);
    const newH = Math.floor(rect.height * dpr);

    if (canvas.width !== newW || canvas.height !== newH) {
      canvas.width = newW;
      canvas.height = newH;
    }

    const currentScroll = scrollYProgress.get();
    const frameIndex = Math.min(
      TOTAL_FRAMES - 1,
      Math.max(0, Math.floor(currentScroll * TOTAL_FRAMES))
    );
    renderFrame(frameIndex);
  }, [renderFrame, scrollYProgress]);

  // Preload sequence of 120 images
  useEffect(() => {
    isComponentMountedRef.current = true;
    setImagesLoaded(false);
    setLoadProgress(0);

    const loadedImages: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let completedCount = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameIdx = i - 1;

      img.onload = () => {
        if (!isComponentMountedRef.current) return;
        completedCount++;
        setLoadProgress(Math.round((completedCount / TOTAL_FRAMES) * 100));

        // Render immediately when the first or current frame loads
        if (completedCount === 1 || frameIdx === 0) {
          handleResize();
        }

        if (completedCount >= TOTAL_FRAMES) {
          setImagesLoaded(true);
        }
      };

      // Fallback: If .webp fails, try .jpg
      img.onerror = () => {
        if (img.src.endsWith(".webp")) {
          img.src = `${product.folderPath}/${i}.jpg`;
        } else {
          completedCount++;
          if (completedCount >= TOTAL_FRAMES) {
            setImagesLoaded(true);
          }
        }
      };

      // Primary source path
      img.src = `${product.folderPath}/${i}.webp`;
      loadedImages[frameIdx] = img;
    }

    imagesRef.current = loadedImages;

    return () => {
      isComponentMountedRef.current = false;
    };
  }, [product.folderPath, handleResize]);

  // Window resize listener
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  // Subscribe to Framer Motion scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }

      animationFrameIdRef.current = requestAnimationFrame(() => {
        const frameIndex = Math.min(
          TOTAL_FRAMES - 1,
          Math.max(0, Math.floor(latest * TOTAL_FRAMES))
        );

        if (frameIndex !== lastRenderedIndexRef.current) {
          renderFrame(frameIndex);
        }
      });
    });

    return () => {
      unsubscribe();
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [scrollYProgress, renderFrame]);

  return (
    <section
      ref={containerRef}
      id="story"
      className="relative h-[500vh] w-full"
      aria-label={`${product.name} Scrollytelling Experience`}
    >
      {/* Sticky Fullscreen Div */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Subtle radial ambient glow behind entire view */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 transition-colors duration-1000"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${product.themeColor}55 0%, transparent 70%)`,
          }}
        />

        {/* HTML5 Canvas Engine */}
        <canvas
          ref={canvasRef}
          className="relative w-full h-full object-contain pointer-events-none z-0"
        />

        {/* Dynamic Text Overlays mapped to scroll sections */}
        <ProductTextOverlays
          scrollYProgress={scrollYProgress}
          product={product}
        />

        {/* Minimalist Frame Loading Indicator */}
        {!imagesLoaded && loadProgress < 95 && (
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 px-4 py-2 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 text-xs font-medium text-white/80 shadow-2xl animate-fade-in pointer-events-none">
            <span
              className="w-2 h-2 rounded-full animate-ping"
              style={{ backgroundColor: product.themeColor }}
            />
            <span>Preloading 4K Sequence: {loadProgress}%</span>
            <div className="w-16 h-1 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-200"
                style={{
                  width: `${loadProgress}%`,
                  backgroundColor: product.themeColor,
                }}
              />
            </div>
          </div>
        )}

        {/* Subtle Scroll Hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none opacity-70">
          <span className="text-[10px] uppercase font-bold tracking-widest text-white/60">
            Scroll to reveal
          </span>
          <div className="w-4 h-7 rounded-full border-2 border-white/30 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-white animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
