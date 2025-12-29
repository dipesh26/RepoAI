import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, Code, Search, GitBranch, Layers } from "lucide-react";

const quickPrompts = [
  { label: "Find issues", icon: Search },
  { label: "Explain architecture", icon: Layers },
  { label: "Analyze code quality", icon: Code },
  { label: "Show dependencies", icon: GitBranch },
];

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export const ChatAgent = () => {
  const [phase, setPhase] = useState<"pre-chat" | "chat">("pre-chat");
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const sendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: content,
    };

    setMessages((prev) => [...prev, userMessage]);
    setPhase("chat");
    setIsTyping(true);
    
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `I've analyzed your query about "${content.slice(0, 30)}...". Based on the repository structure, I found several key insights that might help you understand the codebase better. Would you like me to elaborate on any specific aspect?`,
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleQuickPrompt = (prompt: string) => {
    sendMessage(prompt);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    sendMessage(inputValue);
    setInputValue(""); // Only clear input when typing manually
  };

    useEffect(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      }, [messages]);

  return (
    <motion.div
      className="rounded-3xl max-w-2xl mx-auto bg-white/60 dark:bg-white backdrop-blur-2xl border border-white/50 dark:border-white/10 shadow-xl shadow-indigo-500/5 relative overflow-hidden mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      {/* Subtle ambient glow behind the container content */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Pre-Chat Phase - Quick Prompts */}
        <AnimatePresence>
          {phase === "pre-chat" && (
            <motion.div
              className="p-8 pb-4"
              initial={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-500 font-semibold mb-4 flex items-center gap-2">
                <Sparkles size={14} className="text-blue-500" />
                Ask AI about your code
              </p>
              <div className="flex flex-wrap gap-3">
                {quickPrompts.map((prompt) => (
                  <motion.button
                    key={prompt.label}
                    onClick={() => handleQuickPrompt(prompt.label)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    // Container: p-[1px] creates the border width
                    className="group relative p-[1px] rounded-full overflow-hidden"
                  >
                    {/* The Flowing Outline (Always Visible & Slower) */}
                    {/* Changed 'spin_2s' to 'spin_4s' for slower speed */}
                    {/* Removed 'opacity-0' so it's always visible */}
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#F1F5F9_0%,#3B82F6_50%,#F1F5F9_100%)]" />

                    {/* The Inner Button Content (White Background) */}
                    <span className="relative flex items-center gap-1.5 h-full w-full rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-500 dark:text-slate-500 backdrop-blur-3xl transition-colors group-hover:text-blue-600 group-hover:bg-white/95">
                      <prompt.icon size={12} className="opacity-70 group-hover:opacity-100 transition-opacity" />
                      {prompt.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Phase - Messages */}
        <AnimatePresence>
          {phase === "chat" && (
            <motion.div
              ref={chatContainerRef}
              className="max-h-96 overflow-y-auto p-6 space-y-6"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`max-w-[90%] md:max-w-[85%] px-4 py-3 md:px-5 md:py-3.5 rounded-2xl shadow-sm text-sm leading-relaxed ${
                      message.role === "user"
                        ? "bg-blue-600 text-white rounded-br-sm shadow-blue-500/20"
                        : "bg-white border border-slate-100 dark:border-slate-200 text-slate-700 dark:text-slate-700 rounded-bl-sm"
                    }`}
                  >
                    <p>{message.content}</p>
                  </div>
                </motion.div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="bg-white border border-slate-100 px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm">
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-slate-400"
                          animate={{ y: [0, -4, 0] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.1,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input Area */}
        <div className="p-4 border-t border-white/50 bg-white/30 backdrop-blur-sm">
          <div className="flex items-center gap-3 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask anything about the repository..."
              className="flex-1 bg-white/50 rounded-xl px-4 py-3.5 text-slate-700 placeholder:text-slate-400 border border-slate-200 focus:border-primary/50 focus:ring-4 focus:ring-primary/5 focus:outline-none transition-all duration-200"
            />
            <motion.button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className={`p-3.5 rounded-xl transition-all duration-300 shadow-lg ${
                inputValue.trim()
                  ? "bg-primary text-white shadow-blue-500/25"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
              }`}
              whileHover={inputValue.trim() ? { scale: 1.05 } : {}}
              whileTap={inputValue.trim() ? { scale: 0.95 } : {}}
            >
              <Send size={18} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};