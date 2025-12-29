import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  active?: boolean;
}

export const GlowButton = ({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  size = "md",
  className,
  active = false,
}: GlowButtonProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const variants = {
    primary: "bg-primary/10 border-primary/30 text-primary hover:border-primary/50",
    secondary: "bg-card/60 border-border/40 text-foreground hover:border-border/60",
    ghost: "bg-transparent border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const activeStyles = active
    ? "border-primary/60 bg-primary/15 shadow-glow-sm scale-[1.02]"
    : "";

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative overflow-hidden rounded-xl border font-medium transition-all duration-300 group",
        variants[variant],
        sizes[size],
        activeStyles,
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      <span className="relative z-10">{children}</span>
      
      {/* Cursor Follow Glow */}
      {!disabled && (
        <motion.div
          className="absolute pointer-events-none w-40 h-40 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            background:
              variant === "primary"
                ? "radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 70%)"
                : "radial-gradient(circle, hsl(var(--foreground) / 0.1) 0%, transparent 70%)",
          }}
        />
      )}

      {/* Active Glow Border */}
      {active && (
        <motion.div
          className="absolute inset-0 rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            background: "linear-gradient(135deg, hsl(var(--primary) / 0.2) 0%, hsl(var(--accent) / 0.1) 100%)",
          }}
        />
      )}
    </motion.button>
  );
};
