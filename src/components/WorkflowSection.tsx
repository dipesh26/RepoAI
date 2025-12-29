import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Settings, Upload, Brain, MessageCircle } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Select Feature",
    description: "Choose from summarize, README, setup guide, or tech debt analysis.",
    icon: Settings,
    animation: "toggles",
  },
  {
    id: 2,
    title: "Input Source",
    description: "Paste a GitHub URL or upload a local folder for analysis.",
    icon: Upload,
    animation: "typing",
  },
  {
    id: 3,
    title: "AI Analysis",
    description: "Our AI scans and understands your entire codebase structure.",
    icon: Brain,
    animation: "scan",
  },
  {
    id: 4,
    title: "Interact",
    description: "Ask questions, get insights, and chat with your repository.",
    icon: MessageCircle,
    animation: "chat",
  },
];

export const WorkflowSection = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveStep((prev) => (prev === 4 ? 1 : prev + 1));
    }, 2000);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    // UPDATED: Dark Mode Background
    <section className="py-24 px-6 relative overflow-hidden bg-slate-50/50 dark:bg-slate-900">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-100/30 dark:bg-blue-900/10 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-indigo-100/30 dark:bg-indigo-900/10 rounded-full blur-3xl -translate-y-1/2" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Title */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* UPDATED: Text Colors */}
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white tracking-tight">
            How It Works
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            From raw code to actionable insights in four simple steps.
          </p>
        </motion.div>

        {/* Steps Container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* UPDATED: Inactive Line Color */}
          <div className="absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-slate-200 dark:bg-slate-700 -translate-y-1/2 hidden md:block rounded-full" />
          
          <motion.div
            className="absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 -translate-y-1/2 hidden md:block rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)] origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: (activeStep - 1) / 3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const isActive = activeStep === step.id;
              const isPast = activeStep > step.id;

              return (
                <motion.div
                  key={step.id}
                  className="relative group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <motion.button
                    onMouseEnter={() => setActiveStep(step.id)}
                    onClick={() => setActiveStep(step.id)}
                    className={`w-full text-left transition-all duration-500 rounded-3xl p-1 cursor-default ${
                       isActive ? "scale-105" : "hover:scale-102"
                    }`}
                  >
                    <div className={`
                      h-full w-full rounded-2xl p-6 transition-all duration-300 relative overflow-hidden border
                      ${isActive 
                        ? "bg-white/80 dark:bg-slate-800/80 border-blue-200 dark:border-blue-900 shadow-xl shadow-blue-500/10 backdrop-blur-xl" 
                        : "bg-white/40 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 hover:bg-white/60 dark:hover:bg-slate-800/60 hover:border-slate-300 dark:hover:border-slate-600 backdrop-blur-md"
                      }
                    `}>
                      
                      {/* Active Gradient Background Fade */}
                      {isActive && (
                         <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 pointer-events-none" />
                      )}

                      <div className="relative z-10">
                         {/* Step Number & Icon Bubble */}
                        <div className="flex items-center justify-between mb-6">
                            <motion.div
                              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm ${
                                isActive 
                                  ? "bg-blue-600 text-white shadow-blue-500/30 rotate-3"
                                  : isPast
                                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                                  : "bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 group-hover:bg-white dark:group-hover:bg-slate-600 group-hover:text-slate-600 dark:group-hover:text-slate-300"
                              }`}
                            >
                              <step.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                            </motion.div>
                            <span className={`text-4xl font-bold opacity-10 ${isActive ? 'text-blue-600' : 'text-slate-400 dark:text-slate-600'}`}>
                                0{step.id}
                            </span>
                        </div>

                        {/* Content Colors */}
                        <h3 className={`text-lg font-bold mb-3 transition-colors ${isActive ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-300"}`}>
                          {step.title}
                        </h3>
                        
                        <p className={`text-sm leading-relaxed transition-colors ${isActive ? "text-slate-600 dark:text-slate-300" : "text-slate-500 dark:text-slate-400"}`}>
                          {step.description}
                        </p>

                        {/* Micro Animation Area */}
                        <div className="h-16 mt-6 flex items-center justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-xl border border-slate-100/50 dark:border-slate-700/50 overflow-hidden relative">
                           <div className={`transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-30 grayscale"}`}>
                              
                              {step.animation === "toggles" && (
                                <div className="flex gap-1.5">
                                  {[0, 1, 2].map((i) => (
                                    <motion.div
                                      key={i}
                                      className="w-8 h-2.5 rounded-full"
                                      animate={{ 
                                        backgroundColor: i === 0 ? "#3B82F6" : "#E2E8F0", // Keeping specific colors as requested
                                        scale: i === 0 ? 1 : 0.9
                                      }}
                                      transition={{ 
                                        duration: 0.8, 
                                        delay: i * 0.2, 
                                        repeat: Infinity, 
                                        repeatType: "reverse" 
                                      }}
                                    />
                                  ))}
                                </div>
                              )}

                              {step.animation === "typing" && (
                                <div className="flex items-center gap-2">
                                  <div className="h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded-md overflow-hidden relative">
                                    <motion.div
                                      className="absolute inset-0 bg-blue-500/20"
                                      initial={{ x: "-100%" }}
                                      animate={{ x: "100%" }}
                                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                    />
                                  </div>
                                  <motion.div
                                    className="w-0.5 h-5 bg-blue-500"
                                    animate={{ opacity: [1, 0, 1] }}
                                    transition={{ duration: 0.8, repeat: Infinity }}
                                  />
                                </div>
                              )}

                              {step.animation === "scan" && (
                                <div className="relative w-10 h-10 border-2 border-blue-100 dark:border-blue-900 rounded-lg flex items-center justify-center overflow-hidden bg-white dark:bg-slate-800">
                                  <CodeLines />
                                  <motion.div
                                    className="absolute inset-x-0 h-0.5 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                                    animate={{ top: ["0%", "100%", "0%"] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                  />
                                </div>
                              )}

                              {step.animation === "chat" && (
                                <div className="flex flex-col gap-1.5 w-16">
                                  <motion.div
                                    className="h-2 w-12 rounded-full bg-blue-500 self-end"
                                    animate={{ scaleX: [1, 0.9, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                  />
                                  <motion.div
                                    className="h-2 w-8 rounded-full bg-slate-200 dark:bg-slate-600 self-start"
                                    animate={{ scaleX: [0.9, 1, 0.9] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                                  />
                                  <motion.div
                                    className="h-2 w-10 rounded-full bg-blue-500 self-end"
                                    animate={{ scaleX: [1, 0.9, 1] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                                  />
                                </div>
                              )}

                           </div>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

// Simple Helper for the Scan Animation
const CodeLines = () => (
    <div className="flex flex-col gap-1 w-full px-1.5 opacity-30">
        <div className="h-0.5 w-full bg-slate-400 rounded-full" />
        <div className="h-0.5 w-2/3 bg-slate-400 rounded-full" />
        <div className="h-0.5 w-3/4 bg-slate-400 rounded-full" />
        <div className="h-0.5 w-1/2 bg-slate-400 rounded-full" />
    </div>
);