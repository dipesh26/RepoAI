import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Github, 
  FolderUp, 
  Sparkles, 
  FileText, 
  BookOpen, 
  Terminal, 
  Bug,
  Check,
  AlertCircle
} from "lucide-react";
import { GlowButton } from "./GlowButton";

// Added tooltip text to data
const features = [
  { id: "summarize", label: "Summarize", icon: <FileText size={18} />, tooltip: "Code Summarization" },
  { id: "readme", label: "README", icon: <BookOpen size={18} />, tooltip: "Readme File Generation" },
  { id: "setup", label: "Setup", icon: <Terminal size={18} />, tooltip: "Project Setup Guide" },
  { id: "techdebt", label: "Tech Debt", icon: <Bug size={18} />, tooltip: "Technical Debt Analysis" },
];

interface AIConfigContainerProps {
  onAnalyze: (feature: string, input: string) => void;
}

export const AIConfigContainer = ({ onAnalyze }: AIConfigContainerProps) => {
  const [selectedFeature, setSelectedFeature] = useState("summarize");
  const [inputValue, setInputValue] = useState("");
  const [inputType, setInputType] = useState<"url" | "folder" | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  
  // NEW: Hover states for tooltips
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
  const [isFolderHovered, setIsFolderHovered] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateGitHubUrl = (url: string) => {
    const githubPattern = /^https?:\/\/(www\.)?github\.com\/[\w-]+\/[\w.-]+\/?$/;
    return githubPattern.test(url);
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    setInputType("url");
    if (value.length > 0) {
      setIsValid(validateGitHubUrl(value));
    } else {
      setIsValid(null);
    }
  };

  const handleFolderSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setInputValue(`${files.length} files selected`);
      setInputType("folder");
      setIsValid(true);
    }
  };

  const canAnalyze = selectedFeature && isValid === true;

  return (
    <motion.div
      // UPDATED: Adjusted padding for mobile (p-5) vs desktop (md:p-8)
      className="rounded-3xl p-5 md:p-8 max-w-2xl mx-auto bg-white/60 dark:bg-white backdrop-blur-2xl border border-white/50 dark:border-white/10 shadow-xl shadow-indigo-500/5 relative overflow-visible"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
    >
      {/* Subtle ambient glow behind the container content */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/40 to-transparent pointer-events-none rounded-3xl overflow-hidden" />
      
      <div className="relative z-10">
        {/* Feature Selector */}
        <div className="mb-8">
          <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-4 ml-1">
            Select AI Mode
          </p>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {features.map((feature) => {
              const isActive = selectedFeature === feature.id;
              
              return (
                <div key={feature.id} className="relative flex-1 md:flex-none">
                   {/* Feature Tooltip */}
                   <AnimatePresence>
                    {hoveredFeature === feature.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 5, scale: 0.9 }}
                        animate={{ opacity: 1, y: -8, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-lg shadow-xl whitespace-nowrap z-20 pointer-events-none hidden md:block"
                      >
                        {feature.tooltip}
                        <div className="absolute -bottom-1 left-4 w-2 h-2 bg-slate-900 rotate-45" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button
                    onClick={() => setSelectedFeature(feature.id)}
                    onMouseEnter={() => setHoveredFeature(feature.id)}
                    onMouseLeave={() => setHoveredFeature(null)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    // UPDATED: Added w-full for mobile uniformity
                    className={`relative w-full md:w-auto overflow-hidden px-4 md:px-5 py-2.5 text-sm font-medium rounded-xl border transition-all duration-300 group flex items-center justify-center md:justify-start gap-2
                      ${isActive 
                        ? "bg-blue-50/80 border-primary text-primary shadow-[0_0_15px_rgba(59,130,246,0.15)]" 
                        : "bg-white/50 border-slate-200 text-slate-600 hover:border-primary/50 hover:text-primary hover:bg-white/80"
                      }
                    `}
                  >
                    <span className={`${isActive ? "opacity-100" : "opacity-70 group-hover:opacity-100"}`}>
                      {feature.icon}
                    </span>
                    <span className="relative z-10 whitespace-nowrap">{feature.label}</span>
                    
                    {/* Hover Glow Effect */}
                    {!isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    )}
                  </motion.button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Unified Input Bar */}
        <div className="mb-4">
          <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-4 ml-1">
            Input Source
          </p>
          <div className="relative">
            <div
              className={`relative flex items-center rounded-2xl border transition-all duration-300 ${
                isValid === true
                  ? "border-green-500/50 bg-green-50/30 shadow-[0_0_20px_-5px_rgba(34,197,94,0.2)]"
                  : isValid === false
                  ? "border-red-500/50 bg-red-50/30 shadow-[0_0_20px_-5px_rgba(239,68,68,0.2)]"
                  : "border-slate-200 bg-white/50 focus-within:border-primary/50 focus-within:shadow-[0_0_20px_-5px_rgba(59,130,246,0.2)]"
              }`}
            >
              {/* UPDATED: Reduced padding left on mobile */}
              <div className="pl-3 md:pl-5 text-slate-400 shrink-0">
                <Github size={20} />
              </div>

              <input
                type="text"
                value={inputValue}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="https://github.com/user/repository"
                // UPDATED: Responsive padding and font size
                className="flex-1 bg-transparent px-3 py-3 md:px-4 md:py-4 text-sm md:text-base text-slate-700 placeholder:text-slate-400 focus:outline-none font-medium min-w-0"
              />

              {/* Folder Upload Button Container */}
              <div className="relative shrink-0">
                {/* <AnimatePresence>
                  {isFolderHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 5, scale: 0.9 }}
                      animate={{ opacity: 1, y: -8, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-lg shadow-xl whitespace-nowrap z-20 pointer-events-none hidden md:block"
                    >
                      Upload folder
                      <div className="absolute -bottom-1 left-4 w-2 h-2 bg-slate-900 rotate-45" />
                    </motion.div>
                  )}
                </AnimatePresence> */}

                <motion.button
                  onClick={handleFolderSelect}
                  onMouseEnter={() => setIsFolderHovered(true)}
                  onMouseLeave={() => setIsFolderHovered(false)}
                  className="mr-2 md:mr-3 p-2 md:p-2.5 rounded-xl text-slate-400 hover:text-primary hover:bg-blue-50/50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="Upload local folder"
                >
                  <FolderUp size={20} />
                </motion.button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                // @ts-ignore
                webkitdirectory=""
                directory=""
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {/* Validation Indicator */}
            {/* UPDATED: Adjusted positioning for mobile to not overlap */}
            <AnimatePresence>
              {isValid !== null && (
                <motion.div
                  className="absolute right-12 md:right-[4.5rem] top-1/2 -translate-y-1/2 pointer-events-none"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  {isValid ? (
                    <div className="bg-green-100 rounded-full">
                      {/* <Check className="text-green-600" size={14} strokeWidth={3} /> */}
                    </div>
                  ) : (
                    <div className="bg-red-100 rounded-full">
                      {/* <AlertCircle className="text-red-600" size={14} strokeWidth={3} /> */}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Analyze Button */}
        <GlowButton
          variant="primary"
          size="lg"
          disabled={!canAnalyze}
          onClick={() => canAnalyze && onAnalyze(selectedFeature, inputValue)}
          className="w-full py-4 text-base font-semibold shadow-lg shadow-blue-500/20"
        >
          <span className="flex items-center justify-center gap-3">
            <Sparkles size={20} />
            <span>Analyze Repository</span>
          </span>
        </GlowButton>
      </div>
    </motion.div>
  );
};