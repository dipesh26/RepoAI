import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, User, LogOut, HelpCircle, Menu, X } from "lucide-react";
import { AuthModal } from "@/components/auth/AuthModal";

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export const FloatingNavbar = () => {
  const [activeLink, setActiveLink] = useState("Home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  
  // Dropdown States
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Refs for click detection
  const buttonRef = useRef<HTMLButtonElement>(null);
  const profileRef = useRef<HTMLDivElement>(null); // For Profile Icon Container
  const mobileMenuRef = useRef<HTMLDivElement>(null); // For Mobile Menu Container
  const hamburgerRef = useRef<HTMLButtonElement>(null); // For Hamburger Button

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // FIX 1: Close menus on scroll
      if (isMobileMenuOpen) setIsMobileMenuOpen(false);
      if (isProfileOpen) setIsProfileOpen(false);
    };

    // FIX 2: Close menus when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      // Profile Dropdown Logic
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }

      // Mobile Menu Logic (Ignore if clicking the hamburger button itself)
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen, isProfileOpen]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const scrollToSection = (href: string, name: string) => {
    setActiveLink(name);
    // FIX 3: Close menu first to allow smooth scrolling visibility
    setIsMobileMenuOpen(false);
    
    // Small timeout to ensure menu close animation starts before scroll
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  // Reusable Profile Dropdown Content (Unchanged)
  const ProfileDropdown = () => (
    <motion.div
      className="absolute right-0 top-full mt-3 w-72 rounded-2xl border border-white/40 dark:border-white/10 bg-white dark:bg-slate-900/90 backdrop-blur-xl shadow-2xl p-4 overflow-hidden z-50"
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 p-0.5">
          <div className="w-full h-full rounded-full bg-white dark:bg-slate-800 flex items-center justify-center overflow-hidden">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="w-full h-full object-cover"/>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">Dipesh Mahajan</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">dipeshmahajan26@gmail.com</p>
        </div>
      </div>
      <div className="space-y-1">
        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <HelpCircle size={18} className="text-slate-400" /> Help Center
        </button>
        <button onClick={() => setIsProfileOpen(false)} className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
          <LogOut size={18} /> Log out
        </button>
      </div>
    </motion.div>
  );

  return (
    <>
      {/* =======================
          MOBILE LAYOUT (< md) 
         ======================= */}
      <div className="md:hidden fixed top-4 left-4 right-4 z-50">
        <nav className="rounded-2xl px-4 py-3 flex items-center justify-between bg-white/65 dark:bg-slate-900/70 backdrop-blur-[12px] border border-white/40 dark:border-white/10 shadow-lg">
          
          {/* Logo (Left) */}
          <button onClick={() => scrollToSection("#hero", "Home")} className="flex items-center gap-0.5 text-lg font-bold tracking-tight">
            <span className="text-slate-700 dark:text-slate-100">Repo</span>
            <span className="gradient-text-primary glow-text">AI</span>
          </button>

          {/* Right Actions: Theme -> Profile -> Menu */}
          <div className="flex items-center gap-2">
            
            {/* Theme Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-800 transition-all"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={`p-2 rounded-xl transition-all ${isProfileOpen ? "bg-primary/10 text-primary" : "text-slate-600 dark:text-slate-300"}`}
              >
                <User size={18} />
              </button>
              <AnimatePresence>
                {isProfileOpen && <ProfileDropdown />}
              </AnimatePresence>
            </div>

            {/* Hamburger Menu - Added Ref Here */}
            <button
              ref={hamburgerRef}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Expansion - Added Ref Here */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              ref={mobileMenuRef}
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              className="mt-2 rounded-2xl bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl border border-white/40 dark:border-white/10 overflow-hidden shadow-xl"
            >
              <div className="p-4 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.href, link.name)}
                    className={`p-3 rounded-xl text-left font-medium transition-colors ${
                      activeLink === link.name
                        ? "bg-primary/10 text-primary"
                        : "text-slate-600 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-800"
                    }`}
                  >
                    {link.name}
                  </button>
                ))}
                
                <div className="h-px bg-slate-200 dark:bg-slate-700 my-1" />
                
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setAuthOpen(true);
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-primary via-blue-600 to-indigo-600 text-white font-semibold shadow-lg shadow-blue-500/30"
                >
                  Sign In
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>


      {/* =======================
          DESKTOP LAYOUT (>= md) 
         ======================= */}
      <motion.div
        className="hidden md:block fixed top-8 left-0 right-0 z-50 pointer-events-none"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="pointer-events-auto mx-auto w-fit">
          <div className="relative">
            {/* Pill Navbar */}
            <motion.nav
              className="rounded-full  py-3 border flex items-center justify-between gap-16 bg-white/65 dark:bg-slate-900/70 backdrop-blur-[12px] border-white/40 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
              animate={{ width: isScrolled ? "55vw" : "50vw" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Logo */}
              <motion.div animate={{ x: isScrolled ? 40 : 40 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                <button onClick={() => scrollToSection("#hero", "Home")} className="flex items-center gap-0.5 text-xl font-bold tracking-tight">
                  <span className="text-slate-700 dark:text-slate-100">Repo</span>
                  <span className="gradient-text-primary glow-text">AI</span>
                </button>
              </motion.div>

              {/* Desktop Nav Links */}
              <div className="flex items-center gap-1">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.href, link.name)}
                    className="relative px-4 py-2 text-sm font-medium text-slate-600 dark:text-white hover:text-primary dark:hover:text-blue-400 transition-colors duration-200"
                  >
                    {link.name}
                    <AnimatePresence>
                      {activeLink === link.name && (
                        <motion.div
                          className="absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full"
                          initial={{ width: 0, x: "-50%" }}
                          animate={{ width: "50%", x: "-50%" }}
                          exit={{ width: 0, x: "-50%" }}
                          transition={{ duration: 0.3 }}
                          style={{ boxShadow: "0 0 10px hsl(var(--primary) / 0.5)" }}
                        />
                      )}
                    </AnimatePresence>
                  </button>
                ))}
              </div>

              {/* Login Button */}
              <motion.div animate={{ x: isScrolled ? -40 : -40 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                <motion.button
                  onClick={() => setAuthOpen(true)}
                  ref={buttonRef}
                  onMouseMove={handleMouseMove}
                  className="relative overflow-hidden px-5 py-2 text-sm font-medium rounded-xl bg-white/50 dark:bg-slate-800/50 border border-primary/30 dark:border-blue-500/30 text-primary hover:border-primary/50 transition-all duration-300 group hover:text-white hover: dark:text-white"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">Sign In</span>
                  <motion.div
                    className="absolute pointer-events-none w-32 h-32 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      left: mousePosition.x,
                      top: mousePosition.y,
                      background: "linear-gradient(to right, hsl(var(--primary)), #2563eb, #4f46e5)",
                    }}
                  />
                </motion.button>
              </motion.div>
            </motion.nav>
          </div>
        </div>

        {/* Desktop External Controls (Theme & Profile) */}
        <div className="pointer-events-auto absolute right-12 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {/* Theme Toggle */}
          <motion.button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-xl bg-white/65 dark:bg-slate-900/60 backdrop-blur-sm border border-white/40 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-blue-400 hover:bg-white/80 dark:hover:bg-slate-800 transition-all duration-200 shadow-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isDark ? (
                <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Sun size={18} />
                </motion.div>
              ) : (
                <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Moon size={18} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Desktop Profile Container - Added Ref and Hover logic */}
          <div 
            className="relative" 
            ref={profileRef} 
            onMouseEnter={() => setIsProfileOpen(true)} 
            onMouseLeave={() => setIsProfileOpen(false)}
          >
            <motion.button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className={`p-2 rounded-xl backdrop-blur-sm border transition-all duration-200 shadow-sm ${
                isProfileOpen
                  ? "bg-primary/10 border-primary text-primary"
                  : "bg-white/65 dark:bg-slate-900/60 border-white/40 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-blue-400 hover:bg-white/80 dark:hover:bg-slate-800"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <User size={18} />
            </motion.button>
            <AnimatePresence>{isProfileOpen && <ProfileDropdown />}</AnimatePresence>
          </div>
        </div>
      </motion.div>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
};