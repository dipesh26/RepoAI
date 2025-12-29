import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

const featureLabels: Record<string, string> = {
  summarize: "Summarizing Repo...",
  readme: "Generating README...",
  setup: "Generating Setup Guide...",
  techdebt: "Finding Technical Debt...",
};

interface LoadingModalProps {
  isOpen: boolean;
  feature: string;
}

export const LoadingModal = ({ isOpen, feature }: LoadingModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/20 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="relative w-full max-w-sm mx-4 bg-white rounded-3xl border border-slate-100 p-8 shadow-2xl shadow-blue-900/10 text-center"
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Status Text */}
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-6">
              {featureLabels[feature] || "Processing..."}
            </p>

            {/* Loading Animation Container */}
            <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden mb-8">
              {/* Progress Bar */}
              <motion.div
                className="absolute inset-y-0 left-0 bg-blue-600 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, ease: "easeInOut" }}
              />
              
              {/* Shimmer Effect */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
                }}
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {/* AI Thinking Indicator */}
            <div className="flex items-center justify-center gap-3 text-slate-900">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              >
                <Loader2 size={20} className="text-blue-600" />
              </motion.div>
              <span className="text-base font-medium">AI is Thinking...</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};