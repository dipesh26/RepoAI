import { motion } from "framer-motion";

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-start pt-32 pb-2 px-6"
    >
      <div className="relative max-w-5xl mx-auto text-center z-10">
        {/* Main Heading */}
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span
            className="inline-block text-slate-800 dark:text-slate-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Understand any codebase,
          </motion.span>
          {/* Spacer */}
          {" "}
          <motion.span
            className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-600 to-indigo-600 animate-gradient-shift pb-2"
            style={{
              // Subtle glow for the accent word only
                filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))"
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            instantly
          </motion.span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Analyze repositories, generate docs, and chat with your code using AI.
        </motion.p>
      </div>
    </section>
  );
};
