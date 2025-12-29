import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Mail, MapPin } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export const Footer = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    // UPDATED: Dark Mode Background & Border
    <footer className="py-16 px-6 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 relative overflow-hidden">
      
      {/* Background Decor (Optional Subtle Glow) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-100/20 dark:bg-blue-900/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-0.5 text-xl font-bold mb-6">
              {/* UPDATED: Brand Text Color */}
              <span className="text-slate-700 dark:text-slate-200">Repo</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">AI</span>
            </div>
            {/* UPDATED: Description Color */}
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xs">
              AI-powered code understanding for everyone. Analyze repositories,
              generate documentation, and explore codebases with ease.
            </p>
          </motion.div>

          {/* Navigation Column */}
          <motion.div
            className="flex flex-col md:items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div>
              {/* UPDATED: Heading Color */}
              <h4 className="font-semibold text-slate-900 dark:text-slate-200 mb-6">Navigation</h4>
              <nav className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.href)}
                    // UPDATED: Link Colors
                    className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm text-left"
                  >
                    {link.name}
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Contact Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* UPDATED: Heading Color */}
            <h4 className="font-semibold text-slate-900 dark:text-slate-200 mb-6">Contact</h4>
            <div className="space-y-4">
              <a
                href="mailto:hello@repoai.dev"
                // UPDATED: Link Text Color
                className="flex items-center gap-3 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm group"
              >
                {/* UPDATED: Icon Container Colors */}
                <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 group-hover:border-blue-200 dark:group-hover:border-blue-800 transition-colors">
                   <Mail size={16} className="text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                </div>
                hello@repoai.dev
              </a>
              {/* UPDATED: Location Text Color */}
              <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-sm group">
                 {/* UPDATED: Icon Container Colors */}
                 <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <MapPin size={16} className="text-slate-400" />
                 </div>
                San Francisco, CA
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          // UPDATED: Top Border Color
          className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* UPDATED: Copyright Text Color */}
          <p className="text-slate-400 dark:text-slate-500 text-sm">
            © 2025 RepoAI. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                // UPDATED: Social Button Hover Background
                className="p-2 rounded-full text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={link.label}
              >
                <link.icon size={20} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};