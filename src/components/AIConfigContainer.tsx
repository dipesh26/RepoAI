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
  AlertCircle,
  Folder,
  X,
  Loader2,
  File,
  Network
} from "lucide-react";
import { GlowButton } from "./GlowButton";

const features = [
  { id: "summarize", label: "Summarize", icon: <FileText size={13} />, tooltip: "Code Summarization" },
  { id: "visualize", label: "Code Map", icon: <Network size={13} />, tooltip: "Visual Dependency Graph" },
  { id: "readme", label: "README", icon: <BookOpen size={13} />, tooltip: "Readme File Generation" },
  { id: "setup", label: "Setup", icon: <Terminal size={13} />, tooltip: "Project Setup Guide" },
  { id: "techdebt", label: "Tech Debt", icon: <Bug size={13} />, tooltip: "Technical Debt Analysis" },
];

interface AIConfigContainerProps {
  onAnalyze: (feature: string, input: string) => void;
}

export const AIConfigContainer = ({ onAnalyze }: AIConfigContainerProps) => {
  const [selectedFeature, setSelectedFeature] = useState("summarize");
  const [inputValue, setInputValue] = useState("");
  const [inputType, setInputType] = useState<"url" | "folder" | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  
  // Hover states
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
  const [isFolderHovered, setIsFolderHovered] = useState(false);

  // Upload States
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadSuccess, setIsUploadSuccess] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<FileList | null>(null);
  const [showFileModal, setShowFileModal] = useState(false);

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
      setIsUploading(true);
      setIsUploadSuccess(false);
      setInputType("folder");
      setIsValid(null);

      // Simulate Upload
      setTimeout(() => {
        setUploadedFiles(files);
        setInputValue(`${files.length} files uploaded`);
        setIsUploading(false);
        setIsUploadSuccess(true);
        setIsValid(true);

        setTimeout(() => {
          setIsUploadSuccess(false);
        }, 1500);
      }, 2000);
    }
  };

  const removeFolder = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUploadedFiles(null);
    setInputValue("");
    setInputType(null);
    setIsValid(null);
    setIsUploadSuccess(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const canAnalyze = selectedFeature && isValid === true && !isUploading;

  return (
    <>
      <motion.div
        className="rounded-3xl p-5 md:p-8 max-w-2xl mx-auto bg-white/60 dark:bg-white backdrop-blur-2xl border border-white/50 dark:border-white/10 shadow-xl shadow-indigo-500/5 relative overflow-visible"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/40 to-transparent pointer-events-none rounded-3xl overflow-hidden" />
        
        <div className="relative z-10">
          {/* Feature Selector */}
          <div className="mb-8">
            <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-500 font-semibold mb-4 ml-1">
              Select AI Mode
            </p>
            {/* UPDATED: Added md:flex-nowrap to force one line on desktop */}
            <div className="flex flex-wrap md:flex-nowrap gap-2 md:gap-1.7">
              {features.map((feature) => {
                const isActive = selectedFeature === feature.id;
                return (
                  <div key={feature.id} className="relative flex-1">
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
                      // UPDATED: Added whitespace-nowrap to prevent text wrapping inside buttons
                      className={`relative w-full overflow-hidden px-3 md:px-4 py-2.5 text-sm font-medium rounded-xl border transition-all duration-300 group flex items-center justify-center gap-2 whitespace-nowrap
                        ${isActive 
                          ? "bg-blue-50/80 dark:bg-blue-50 border-primary dark:border-blue-500 text-primary dark:text-blue-600 shadow-[0_0_15px_rgba(59,130,246,0.15)]" 
                          : "bg-white/50 dark:bg-slate-50 border-slate-200 dark:border-slate-200 text-slate-600 dark:text-slate-600 hover:border-primary/50 hover:text-primary hover:bg-white/80"
                        }
                      `}
                    >
                      <span className={`${isActive ? "opacity-100" : "opacity-70 group-hover:opacity-100"}`}>
                        {feature.icon}
                      </span>
                      <span className="relative z-10">{feature.label}</span>
                      {!isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                      )}
                    </motion.button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Input Area */}
          <div className="mb-4 relative">
            
            {/* Label Row with Upload Icon on the Right */}
            <div className="flex items-center justify-between mb-4 pl-1 h-10">
              <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-500 font-semibold">
                Input Source
              </p>

              {/* Upload Status Icon (Aligned Right) */}
              <AnimatePresence>
                {(isUploading || uploadedFiles) && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                  >
                    <div 
                      onClick={() => !isUploading && setShowFileModal(true)}
                      className={`
                        relative flex items-center justify-center w-10 h-10 rounded-lg border transition-all duration-300 mr-2
                        ${isUploading 
                          ? "bg-white/50 border-blue-200" 
                          : "bg-blue-50 border-blue-200 cursor-pointer hover:bg-blue-100"
                        }
                      `}
                    >
                      <Folder 
                        size={20} 
                        className={`text-blue-600 transition-opacity ${isUploading ? "opacity-50" : "opacity-100"}`} 
                      />
                      {isUploading && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Loader2 size={24} className="text-blue-600 animate-spin" />
                        </div>
                      )}
                      {!isUploading && (
                        <button
                          onClick={removeFolder}
                          className="absolute -top-2 -right-2 bg-white border border-slate-200 rounded-full p-0.5 text-slate-400 hover:text-red-500 hover:border-red-200 shadow-sm transition-colors"
                        >
                          <X size={12} strokeWidth={3} />
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="relative">
              <div
                className={`relative flex items-center rounded-2xl border transition-all duration-300 ${
                  isValid === true
                    ? "border-green-500/50 bg-green-50/30 shadow-[0_0_20px_-5px_rgba(34,197,94,0.2)]"
                    : isValid === false
                    ? "border-red-500/50 bg-red-50/30 shadow-[0_0_20px_-5px_rgba(239,68,68,0.2)]"
                    : "border-slate-200 dark:border-slate-200 bg-white/50 dark:bg-slate-50 focus-within:border-primary/50 focus-within:shadow-[0_0_20px_-5px_rgba(59,130,246,0.2)]"
                }`}
              >
                <div className="pl-3 md:pl-5 text-slate-400 shrink-0">
                  <Github size={20} />
                </div>

                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder="https://github.com/user/repository"
                  disabled={isUploading || !!uploadedFiles}
                  className="flex-1 bg-transparent px-3 py-3 md:px-4 md:py-4 text-sm md:text-base text-slate-700 dark:text-slate-700 placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none font-medium min-w-0 disabled:opacity-50 disabled:cursor-not-allowed"
                />

                <div className="relative shrink-0">
                  <AnimatePresence>
                    {isFolderHovered && !uploadedFiles && !isUploading && (
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
                  </AnimatePresence>

                  <motion.button
                    onClick={handleFolderSelect}
                    onMouseEnter={() => setIsFolderHovered(true)}
                    onMouseLeave={() => setIsFolderHovered(false)}
                    disabled={isUploading || !!uploadedFiles}
                    className={`mr-2 md:mr-3 p-2 md:p-2.5 rounded-xl transition-colors ${
                      isUploading || uploadedFiles 
                        ? "text-slate-300 cursor-not-allowed" 
                        : "text-slate-400 hover:text-primary hover:bg-blue-50/50"
                    }`}
                    whileHover={!uploadedFiles ? { scale: 1.05 } : {}}
                    whileTap={!uploadedFiles ? { scale: 0.95 } : {}}
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

              {/* Validation Icons - Commented Out As Requested */}
              <AnimatePresence>
                {isValid !== null && !isUploading && (
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
            disabled={!canAnalyze && !isUploadSuccess}
            onClick={() => canAnalyze && onAnalyze(selectedFeature, inputValue)}
            className={`w-full py-4 text-base font-semibold shadow-lg transition-all duration-500 ${
              isUploadSuccess ? "bg-green-600 shadow-green-500/20 border-green-500" : "shadow-blue-500/20"
            }`}
          >
            <div className="flex items-center justify-center gap-3 relative h-6 overflow-hidden">
              <AnimatePresence mode="wait">
                
                {isUploading ? (
                  <motion.div
                    key="uploading"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <Loader2 size={20} className="animate-spin" />
                    <span>Uploading Files...</span>
                  </motion.div>
                ) : isUploadSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="flex items-center gap-2 text-white"
                  >
                    <Check size={20} strokeWidth={3} />
                    <span>Upload Completed</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="analyze"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <Sparkles size={20} />
                    <span>Analyze Repository</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </GlowButton>
        </div>
      </motion.div>

      {/* File List Modal */}
      <AnimatePresence>
        {showFileModal && uploadedFiles && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/20 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowFileModal(false)}
          >
            <motion.div
              className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100"
              initial={{ scale: 0.9, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 10 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                  <Folder size={18} className="text-blue-500" />
                  Uploaded Files ({uploadedFiles.length})
                </h3>
                <button 
                  onClick={() => setShowFileModal(false)}
                  className="p-1 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="max-h-[60vh] overflow-y-auto p-2">
                <div className="flex flex-col gap-1">
                  {Array.from(uploadedFiles).map((file, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors text-sm text-slate-600">
                      <File size={16} className="text-slate-400" />
                      <span className="truncate">{file.name}</span>
                      <span className="ml-auto text-xs text-slate-400">
                        {(file.size / 1024).toFixed(1)} KB
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};