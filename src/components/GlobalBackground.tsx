import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export const GlobalBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">

      {/* 🌞 LIGHT MODE BACKGROUND */}
      <div className="absolute inset-0 dark:hidden">
        <div
          className="absolute inset-0"
          style={{
          background: "linear-gradient(135deg, #F5F7FA 0%, #E4E8F0 100%)",
        }}

        />
      </div>

       {/* 🌙 DARK MODE BACKGROUND */}
      <div 
        className="absolute inset-0 hidden dark:block"
        style={{
          background: `linear-gradient(
            135deg, 
            hsl(230 25% 4%) 0%, 
            hsl(240 20% 6%) 25%,
            hsl(250 18% 5%) 50%,
            hsl(235 22% 5%) 75%,
            hsl(225 20% 4%) 100%
          )`,
        }}
      />

      {/* LAYER 2 — Abstract Gradient Shapes */}
      
      {/* Shape 1: Top-left flowing curve */}
      {/* <div 
        className="absolute -top-[20%] -left-[15%] w-[70%] h-[70%] animate-breathing"
        style={{
          background: `radial-gradient(
            ellipse 80% 60% at 30% 40%,
            hsl(270 60% 25% / 0.25) 0%,
            hsl(260 50% 20% / 0.15) 30%,
            hsl(250 45% 15% / 0.08) 50%,
            transparent 70%
          )`,
          filter: "blur(80px)",
          transform: "rotate(-15deg)",
        }}
      /> */}

      {/* Shape 2: Right side sweeping wave */}
      {/* <div 
        className="absolute top-[10%] -right-[10%] w-[60%] h-[80%] animate-breathing animation-delay-1000"
        style={{
          background: `radial-gradient(
            ellipse 70% 90% at 70% 50%,
            hsl(220 70% 30% / 0.2) 0%,
            hsl(230 60% 25% / 0.12) 35%,
            hsl(240 50% 20% / 0.06) 55%,
            transparent 75%
          )`,
          filter: "blur(100px)",
          transform: "rotate(10deg)",
        }}
      /> */}

      {/* Shape 3: Center-left indigo blob */}
      {/* <div 
        className="absolute top-[30%] left-[5%] w-[50%] h-[50%] animate-breathing animation-delay-500"
        style={{
          background: `radial-gradient(
            ellipse 60% 70% at 40% 50%,
            hsl(245 55% 28% / 0.18) 0%,
            hsl(255 50% 22% / 0.1) 40%,
            transparent 70%
          )`,
          filter: "blur(90px)",
        }}
      /> */}

      {/* Shape 4: Bottom subtle wave */}
      {/* <div 
        className="absolute -bottom-[15%] left-[20%] w-[80%] h-[50%] animate-breathing animation-delay-1500"
        style={{
          background: `radial-gradient(
            ellipse 100% 50% at 50% 80%,
            hsl(235 50% 22% / 0.15) 0%,
            hsl(250 45% 18% / 0.08) 40%,
            transparent 70%
          )`,
          filter: "blur(80px)",
        }}
      /> */}

      {/* Shape 5: Subtle magenta accent - top right */}
      {/* <div 
        className="absolute top-[5%] right-[15%] w-[35%] h-[35%] animate-breathing animation-delay-2000"
        style={{
          background: `radial-gradient(
            circle at 60% 40%,
            hsl(280 50% 25% / 0.12) 0%,
            hsl(270 45% 20% / 0.06) 40%,
            transparent 65%
          )`,
          filter: "blur(70px)",
        }}
      /> */}

      {/* Shape 6: Deep blue flowing shape - center right */}
      {/* <div 
        className="absolute top-[45%] right-[5%] w-[45%] h-[45%] animate-breathing animation-delay-750"
        style={{
          background: `radial-gradient(
            ellipse 80% 60% at 60% 50%,
            hsl(215 65% 28% / 0.16) 0%,
            hsl(225 55% 22% / 0.08) 45%,
            transparent 70%
          )`,
          filter: "blur(85px)",
          transform: "rotate(20deg)",
        }}
      /> */}

      {/* LAYER 3 — Central ambient glow for depth */}
      {/* <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] animate-breathing animation-delay-1250"
        style={{
          background: `radial-gradient(
            ellipse 50% 50% at 50% 50%,
            hsl(240 30% 12% / 0.4) 0%,
            hsl(235 25% 8% / 0.2) 30%,
            transparent 60%
          )`,
        }}
      /> */}

      {/* LAYER 4 — Cursor-Follow Ambient Glow */}
      {/* <motion.div
        className="pointer-events-none absolute w-[800px] h-[800px] rounded-full"
        style={{
          left: mousePosition.x - 400,
          top: mousePosition.y - 400,
          background: `radial-gradient(
            circle at center,
            hsl(225 70% 50% / 0.06) 0%,
            hsl(250 60% 45% / 0.04) 25%,
            hsl(270 50% 40% / 0.02) 45%,
            transparent 65%
          )`,
          filter: "blur(40px)",
        }}
      /> */}

      {/* Secondary smaller cursor glow for subtle highlight */}
      <motion.div
        className="pointer-events-none absolute w-[400px] h-[400px] rounded-full"
        style={{
          left: mousePosition.x - 200,
          top: mousePosition.y - 200,
          background: `radial-gradient(
            circle at center,
            hsl(220 65% 55% / 0.04) 0%,
            hsl(240 55% 50% / 0.02) 40%,
            transparent 60%
          )`,
          filter: "blur(30px)",
        }}
      />

      {/* Subtle noise texture overlay for premium feel */}
      {/* <div 
        className="absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      /> */}

      {/* Vignette effect for depth */}
      {/* <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(
            ellipse 80% 80% at 50% 50%,
            transparent 0%,
            hsl(235 20% 3% / 0.3) 100%
          )`,
        }}
      /> */}
    </div>
  );
};
