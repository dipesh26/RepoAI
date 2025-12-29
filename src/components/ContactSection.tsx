import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Send, MessageSquare, Sparkles } from "lucide-react";

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isValid =
    formData.name.trim() &&
    formData.email.includes("@") &&
    formData.message.trim();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    // UPDATED: Dark Mode Background
    <section id="contact" className="py-24 px-6 relative overflow-hidden bg-slate-50/50 dark:bg-slate-900">
      
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-100/40 dark:bg-blue-900/10 rounded-full blur-[100px] translate-y-1/2" />
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-indigo-100/40 dark:bg-indigo-900/10 rounded-full blur-[100px] -translate-y-1/2" />
      </div>

      <div className="max-w-xl mx-auto relative z-10">
        <motion.div
          // UPDATED: Card Background & Border
          className="rounded-3xl p-8 md:p-10 bg-white/60 dark:bg-slate-800/50 backdrop-blur-2xl border border-white/60 dark:border-slate-700 shadow-xl shadow-blue-900/5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-10">
            {/* UPDATED: Icon Container Background */}
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4 shadow-sm shadow-blue-500/10">
              <MessageSquare size={24} />
            </div>
            {/* UPDATED: Text Colors */}
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Get in touch
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Have questions about RepoAI? We're here to help.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5">
            {/* Name */}
            <div className="space-y-1.5">
              <label
                htmlFor="name"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                // UPDATED: Input Colors
                className="w-full bg-white/50 dark:bg-slate-900/50 rounded-xl px-4 py-3.5 text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 border border-slate-200 dark:border-slate-700 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all duration-200"
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                // UPDATED: Input Colors
                className="w-full bg-white/50 dark:bg-slate-900/50 rounded-xl px-4 py-3.5 text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 border border-slate-200 dark:border-slate-700 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all duration-200"
                placeholder="john@company.com"
              />
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label
                htmlFor="message"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                // UPDATED: Input Colors
                className="w-full bg-white/50 dark:bg-slate-900/50 rounded-xl px-4 py-3.5 text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 border border-slate-200 dark:border-slate-700 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all duration-200 resize-none"
                placeholder="Tell us about your project..."
              />
            </div>

            {/* Submit Button */}
            <motion.button
              ref={buttonRef}
              type="button"
              disabled={!isValid}
              onMouseMove={handleMouseMove}
              className={`relative overflow-hidden w-full py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 group mt-2 ${
                isValid
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02]"
                  : "bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed border border-slate-200 dark:border-slate-600"
              }`}
              whileTap={isValid ? { scale: 0.98 } : {}}
            >
              <span className="relative z-10 flex items-center gap-2">
                {isValid ? <Sparkles size={18} /> : <Send size={18} />}
                <span>Send Message</span>
              </span>

              {/* Cursor Follow Glow (Only visible when active) */}
              {isValid && (
                <motion.div
                  className="absolute pointer-events-none w-40 h-40 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    left: mousePosition.x,
                    top: mousePosition.y,
                    background:
                      "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
                  }}
                />
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};