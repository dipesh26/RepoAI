import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare } from "lucide-react";

interface FloatingActionButtonProps {
  isVisible: boolean;
  onClick: () => void;
}

export const FloatingActionButton = ({
  isVisible,
  onClick,
}: FloatingActionButtonProps) => {
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

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          ref={buttonRef}
          onClick={onClick}
          onMouseMove={handleMouseMove}
          // UPDATED: High Contrast Dark Mode Colors
          className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-blue-600 dark:bg-white text-white dark:text-blue-600 shadow-xl shadow-blue-600/30 dark:shadow-white/10 flex items-center justify-center overflow-hidden group border border-blue-500 dark:border-white/20"
          initial={{ scale: 0, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Icon */}
          <MessageSquare size={24} className="relative z-10 fill-current" />
          
          {/* Cursor Follow Glow (Internal) */}
          <motion.div
            className="absolute pointer-events-none w-24 h-24 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
              background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
            }}
          />

          {/* Pulse Animation Ring (Behind) */}
          <motion.div
            // UPDATED: Pulse color for dark mode
            className="absolute inset-0 rounded-full bg-blue-400 dark:bg-white/30 z-0"
            animate={{
              scale: [1, 1.5, 1.5],
              opacity: [0.6, 0, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
              delay: 1 
            }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};