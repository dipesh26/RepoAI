import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, BookOpen, Terminal, Bug, Download, Copy, Check, Network } from "lucide-react";
import { DependencyGraph } from "./DependencyGraph"; // Import the graph component

interface Tab {
  id: string;
  label: string;
  content: string;
  type?: 'text' | 'graph'; // Added type definition
}

interface OutputModalProps {
  isOpen: boolean;
  onClose: () => void;
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const tabIcons: Record<string, React.ElementType> = {
  summarize: FileText,
  visualize: Network, // Added icon for Code Map
  readme: BookOpen,
  setup: Terminal,
  techdebt: Bug,
};

const tabLabels: Record<string, string> = {
  summarize: "Summary",
  visualize: "Code Map", // Added label for Code Map
  readme: "README",
  setup: "Setup Guide",
  techdebt: "Tech Debt",
};

export const OutputModal = ({
  isOpen,
  onClose,
  tabs,
  activeTab,
  onTabChange,
}: OutputModalProps) => {
  
  const [isCopied, setIsCopied] = useState(false);
  const ActiveIcon = tabIcons[activeTab] || FileText;

  // Handle Copy to Clipboard
  const handleCopy = () => {
    const currentTab = tabs.find((t) => t.id === activeTab);
    if (!currentTab) return;

    navigator.clipboard.writeText(currentTab.content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Handle file download for README
  const handleDownload = () => {
    const currentTab = tabs.find((t) => t.id === activeTab);
    if (!currentTab) return;

    const blob = new Blob([currentTab.content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "README.md";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/20 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="w-full max-w-4xl h-[600px] max-h-[85vh] flex flex-col bg-white rounded-3xl border border-slate-200 shadow-2xl shadow-blue-900/10 overflow-hidden"
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-white z-20 shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                   {ActiveIcon && <ActiveIcon size={20} />}
                </div>
                <h2 className="text-lg font-bold text-slate-900">
                  {tabLabels[activeTab] || activeTab}
                </h2>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors focus:outline-none focus:ring-0"
              >
                <X size={20} />
              </button>
            </div>

            {/* Tabs */}
            {tabs.length > 1 && (
              <div className="flex gap-2 px-6 py-3 border-b border-slate-100 bg-slate-50/50 overflow-x-auto shrink-0 z-10">
                {tabs.map((tab) => {
                  const Icon = tabIcons[tab.id] || FileText;
                  const isActive = activeTab === tab.id;
                  
                  return (
                    <button
                      key={tab.id}
                      onClick={() => onTabChange(tab.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap outline-none ring-0 focus:outline-none focus:ring-0 ${
                        isActive
                          ? "bg-white text-blue-600 shadow-sm shadow-blue-500/5 border border-slate-200"
                          : "text-slate-500 hover:text-slate-700 hover:bg-white/50 border border-transparent"
                      }`}
                    >
                      <Icon size={16} className={isActive ? "text-blue-500" : "text-slate-400"} />
                      {tabLabels[tab.id] || tab.label}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Content Area */}
            <div className="flex-1 relative overflow-hidden bg-slate-50/30">
              <AnimatePresence initial={false}>
                {tabs.map(
                  (tab) =>
                    tab.id === activeTab && (
                      <motion.div
                        key={tab.id}
                        className="absolute inset-0 overflow-y-auto p-0" // Removed padding from container to let graph fill
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {/* 1. CHECK IF CONTENT IS GRAPH TYPE */}
                        {tab.type === 'graph' ? (
                          <div className="w-full h-full bg-slate-900 relative">
                             {/* Render Graph (Parsing the JSON string content) */}
                             <DependencyGraph data={JSON.parse(tab.content)} />
                          </div>
                        ) : (
                          
                          // 2. ELSE RENDER STANDARD TEXT/MARKDOWN (Existing Layout)
                          <div className="p-8">
                            <div className="prose prose-slate prose-sm max-w-none">
                              <div className="relative text-slate-600 leading-relaxed whitespace-pre-wrap font-mono text-sm bg-white p-6 rounded-2xl border border-slate-200 shadow-sm pt-12">
                                
                                {/* Action Buttons Container */}
                                <div className="absolute top-3 right-3 flex items-center gap-2">
                                  {/* Copy Button (Available for all tabs) */}
                                  <button
                                    onClick={handleCopy}
                                    className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 border border-slate-100 transition-colors focus:outline-none focus:ring-0"
                                    title="Copy to clipboard"
                                  >
                                    {isCopied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                                  </button>

                                  {/* Download Button (Only for README) */}
                                  {tab.id === "readme" && (
                                    <button
                                      onClick={handleDownload}
                                      className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 border border-slate-100 transition-colors focus:outline-none focus:ring-0"
                                      title="Download README.md"
                                    >
                                      <Download size={18} />
                                    </button>
                                  )}
                                </div>

                                {tab.content}
                              </div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};