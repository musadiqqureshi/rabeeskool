"use client";

import { useEffect, useRef } from "react";

type Dot = { x: number; y: number; r: number; vx: number; vy: number; a: number };

export function Particles({ count = 34 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let dots: Dot[] = [];
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 1.5 + Math.random() * 3.5,
        vx: (Math.random() - 0.5) * 0.18,
        vy: -(0.1 + Math.random() * 0.25),
        a: 0.15 + Math.random() * 0.35,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.y + d.r < 0) {
          d.y = h + d.r;
          d.x = Math.random() * w;
        }
        if (d.x < -10) d.x = w + 10;
        if (d.x > w + 10) d.x = -10;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(37, 99, 235, ${d.a})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    seed();
    if (reduce) {
      draw();
      cancelAnimationFrame(raf);
    } else {
      draw();
    }

    const onResize = () => {
      resize();
      seed();
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
