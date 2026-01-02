import { useEffect, useRef, useState } from "react";
import ForceGraph2D from "react-force-graph-2d";
import { useTheme } from "next-themes"; // If you use next-themes, or just check dark mode manually

// Mock Data Structure (What the backend WOULD send)
interface GraphData {
  nodes: { id: string; group: number; val: number }[];
  links: { source: string; target: string }[];
}

export const DependencyGraph = ({ data }: { data: GraphData }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ w: 800, h: 600 });
  const [isDark, setIsDark] = useState(false);

  // Check for dark mode to adjust colors
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    
    // Resize graph to fit container
    if (containerRef.current) {
      setDimensions({
        w: containerRef.current.clientWidth,
        h: containerRef.current.clientHeight
      });
    }
  }, []);

  return (
    <div ref={containerRef} className="w-full h-[600px] bg-slate-50 dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 relative">
      <div className="absolute top-4 left-4 z-10 bg-white/80 dark:bg-slate-800/80 p-3 rounded-lg backdrop-blur-md border border-slate-200 dark:border-slate-700 shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Interactive Map</h3>
        <p className="text-xs text-slate-400 dark:text-slate-500">Scroll to zoom • Drag to move</p>
      </div>

      <ForceGraph2D
        width={dimensions.w}
        height={dimensions.h}
        graphData={data}
        nodeLabel="id"
        nodeColor={(node: any) => {
            // Color nodes based on their "group" (Folder level)
            const colors = isDark 
                ? ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"] 
                : ["#2563eb", "#059669", "#d97706", "#dc2626"];
            return colors[node.group % colors.length];
        }}
        linkColor={() => isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"}
        backgroundColor={isDark ? "#0f172a" : "#f8fafc"} // Match slate-900 / slate-50
        nodeRelSize={6}
        linkDirectionalParticles={2} // Little dots moving along lines
        linkDirectionalParticleSpeed={0.005}
      />
    </div>
  );
};