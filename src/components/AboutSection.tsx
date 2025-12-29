import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Code, Brain, Zap, GitBranch, Terminal } from "lucide-react";

// Icons configuration
const floatingIcons = [
  { icon: Github, x: "5%", y: "10%", delay: 0 },
  { icon: Code, x: "92%", y: "15%", delay: 0.5 },
  { icon: GitBranch, x: "8%", y: "85%", delay: 1 },
  { icon: Terminal, x: "90%", y: "80%", delay: 1.5 },
];

const features = [
  {
    title: "Built for real-world repos",
    description: "Handles complex monorepos and enterprise-scale codebases.",
  },
  {
    title: "Designed for clarity & speed",
    description: "Get insights in seconds, not hours of manual code review.",
  },
  {
    title: "Handles large codebases",
    description: "Optimized for repositories with thousands of files.",
  },
];

export const AboutSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ 
        x: e.clientX / window.innerWidth, 
        y: e.clientY / window.innerHeight 
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    // UPDATED: Dark Mode Background
    <section id="about" className="py-24 px-6 relative overflow-hidden bg-slate-50/50 dark:bg-slate-900">
      
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-100/30 dark:bg-blue-900/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-100/30 dark:bg-indigo-900/10 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3" />
      </div>

      {/* Floating Icons */}
      {floatingIcons.map((item, index) => {
        const Icon = item.icon;
        const offsetX = (mousePosition.x - 0.5) * 20; 
        const offsetY = (mousePosition.y - 0.5) * 20;

        return (
          <motion.div
            key={index}
            // UPDATED: Dark Mode Icon Color
            className="absolute text-slate-200 dark:text-slate-800 pointer-events-none z-0"
            style={{ left: item.x, top: item.y }}
            animate={{
              x: offsetX * (index % 2 === 0 ? 1 : -1),
              y: offsetY * (index % 2 === 0 ? -1 : 1),
            }}
            transition={{ type: "spring", damping: 60, stiffness: 40 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: item.delay,
                ease: "easeInOut",
              }}
            >
              <Icon size={80} strokeWidth={1} />
            </motion.div>
          </motion.div>
        );
      })}

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* UPDATED: Text Colors */}
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white tracking-tight">
              About <span className="text-blue-600 dark:text-blue-400">RepoAI</span>
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed mb-10">
              We built RepoAI to make open-source exploration easier. Whether
              you're onboarding to a new project, auditing code quality, or
              just curious about how things work under the hood — RepoAI gives
              you instant, AI-powered insights.
            </p>

            {/* Feature Cards List */}
            <motion.div 
              className="space-y-4"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.15 }
                }
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {features.map((feature) => (
                <motion.div
                  key={feature.title}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 20 } }
                  }}
                  whileHover={{ x: 5 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 20,    
                    delay: 0        
                  }}
                  // UPDATED: Card Background & Border for Dark Mode
                  className="group p-5 rounded-2xl bg-white/60 dark:bg-slate-800/50 backdrop-blur-md border border-white/80 dark:border-slate-700 shadow-sm hover:shadow-lg hover:shadow-blue-500/5 hover:border-blue-100 dark:hover:border-blue-900 transition-all duration-300 cursor-default"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-400 group-hover:scale-125 transition-transform duration-300" />
                    <div>
                      {/* UPDATED: Text Colors inside card */}
                      <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Premium Scanning Animation */}
          <motion.div
            className="relative flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* UPDATED: Animation Container Background */}
            <div className="w-full max-w-[500px] aspect-square bg-white/30 dark:bg-slate-800/30 backdrop-blur-xl rounded-[2.5rem] border border-white/60 dark:border-slate-700 shadow-2xl shadow-blue-900/5 relative overflow-hidden flex items-center justify-center">
              
              {/* Radar Grid Background */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)]" />
              <div className="absolute inset-0 opacity-20" 
                   style={{ backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
              />

              {/* CENTER BRAIN */}
              <div className="relative z-20 flex items-center justify-center">
                
                {/* Core Glow */}
                <motion.div
                  className="absolute inset-0 bg-blue-500/30 blur-2xl rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

                {/* Brain Container */}
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-xl shadow-blue-500/20 relative z-20">
                  <Brain size={48} className="text-white" />
                </div>

                {/* Pulse Rings */}
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute border border-blue-500/20 rounded-full"
                    style={{ width: "100%", height: "100%" }}
                    animate={{ 
                      width: ["100%", "300%"],
                      height: ["100%", "300%"],
                      opacity: [0.5, 0],
                      borderWidth: ["2px", "0px"]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 1,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </div>

              {/* Scanning Radar Effect */}
              <motion.div
                className="absolute inset-0 z-10"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-full h-full bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0%,rgba(59,130,246,0.1)_15%,transparent_20%)]" />
              </motion.div>

              {/* Orbiting Code Particles */}
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-full h-full"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 15 + i * 5,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: i % 2 === 0 ? "loop" : "reverse" // Alternate direction
                  }}
                >
                  <div 
                    // UPDATED: Particle Background
                    className="absolute bg-white dark:bg-slate-900 border border-blue-100 dark:border-blue-900 shadow-sm px-2 py-1 rounded-md text-[10px] text-blue-600 dark:text-blue-400 font-mono flex items-center gap-1"
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: `rotate(${i * 90}deg) translate(${100 + i * 20}px) rotate(-${i * 90}deg)` // Position circles
                    }}
                  >
                    <Code size={10} />
                    <span>fn_0{i}</span>
                  </div>
                </motion.div>
              ))}

              {/* Glass Reflection Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none rounded-[2.5rem] z-30" />
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};