import { useEffect, useRef, useState, useCallback } from "react";
import ForceGraph2D from "react-force-graph-2d";
import { 
  Minimize, FileCode, Box, Layers, Play, 
  Network, Link, Share2, Sparkles, Bug, MessageSquare 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GraphData {
  nodes: { id: string; group: number; val: number; type: string }[];
  links: { source: string | any; target: string | any }[];
}

interface DependencyGraphProps {
  data: GraphData;
  onNodeAction?: (nodeId: string, action: 'explain' | 'fix' | 'chat') => void;
}

export const DependencyGraph = ({ data, onNodeAction }: DependencyGraphProps) => {
  const graphRef = useRef<any>();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [dimensions, setDimensions] = useState({ w: 800, h: 600 });
  const [isDark, setIsDark] = useState(false);
  
  // State for interaction
  const [hoverNode, setHoverNode] = useState<any>(null);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [menuPos, setMenuPos] = useState<{ x: number, y: number } | null>(null);

  // 1. Theme & Resize Handler
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({ 
          w: containerRef.current.clientWidth, 
          h: containerRef.current.clientHeight 
        });
      }
    };
    window.addEventListener("resize", updateDimensions);
    setTimeout(updateDimensions, 100); 
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // 2. Metrics Calculation
  const getNodeMetrics = (nodeId: string) => {
    if (!data.links) return { dependencies: 0, links: 0 };
    const dependencies = data.links.filter(l => (typeof l.source === 'object' ? l.source.id : l.source) === nodeId).length;
    const incoming = data.links.filter(l => (typeof l.target === 'object' ? l.target.id : l.target) === nodeId).length;
    return { dependencies, links: dependencies + incoming };
  };

  // 3. Active Node Logic
  const activeNode = selectedNode || hoverNode; 

  // 4. Update Menu Position
  const updateMenuPosition = useCallback((node: any) => {
    if (!node || !graphRef.current) {
      if (!selectedNode) setMenuPos(null); // Only clear if nothing selected
      return;
    }
    
    // Translate Graph Coordinates to Screen Coordinates
    const coords = graphRef.current.graph2ScreenCoords(node.x, node.y);
    // Position menu slightly to the right and up from the node center
    setMenuPos({ x: coords.x + 20, y: coords.y - 40 }); 
  }, [selectedNode]);

  // 5. Handle Node Click
  const handleNodeClick = useCallback((node: any) => {
    // If clicking same node, deselect
    if (selectedNode === node) {
        setSelectedNode(null);
        setMenuPos(null);
        return;
    }

    setSelectedNode(node);
    updateMenuPosition(node);

    if (graphRef.current) {
        graphRef.current.centerAt(node.x, node.y, 1000);
        graphRef.current.zoom(3, 1000);
    }
  }, [selectedNode, updateMenuPosition]);

  const handleReset = () => {
      setSelectedNode(null);
      setHoverNode(null);
      setMenuPos(null);
      if (graphRef.current) {
          graphRef.current.zoomToFit(500, 20);
      }
  };

  // Handle Background Click to Deselect
  const handleBgClick = () => {
      if (selectedNode) {
          setSelectedNode(null);
          setMenuPos(null);
      }
  };

  // 6. Custom Node Renderer
  const paintNode = useCallback((node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
    const isHighlighted = (hoverNode === node) || (selectedNode === node);
    const isEntry = node.id.includes("main") || node.id.includes("index") || node.id === "src/App.tsx";
    const label = node.id.split('/').pop();
    const fontSize = 12 / globalScale;
    
    let color = isDark ? '#3b82f6' : '#2563eb'; 
    let shape = 'circle';

    if (isEntry) {
      color = '#ef4444'; 
      shape = 'diamond';
    } else if (node.type === 'ts') {
      color = '#10b981'; 
      shape = 'square';
    } else if (node.type === 'config') {
      color = '#f59e0b'; 
      shape = 'triangle';
    }

    if (isHighlighted) {
      ctx.shadowColor = color;
      ctx.shadowBlur = 15;
    } else {
      ctx.shadowBlur = 0;
    }
    ctx.fillStyle = color;

    ctx.beginPath();
    const size = isEntry ? 6 : 4; 

    if (shape === 'circle') {
      ctx.arc(node.x, node.y, size, 0, 2 * Math.PI, false);
    } else if (shape === 'square') {
      ctx.rect(node.x - size, node.y - size, size * 2, size * 2);
    } else if (shape === 'diamond') {
      ctx.moveTo(node.x, node.y - size * 1.5);
      ctx.lineTo(node.x + size * 1.5, node.y);
      ctx.lineTo(node.x, node.y + size * 1.5);
      ctx.lineTo(node.x - size * 1.5, node.y);
    } else if (shape === 'triangle') {
      ctx.moveTo(node.x, node.y - size * 1.2);
      ctx.lineTo(node.x + size, node.y + size);
      ctx.lineTo(node.x - size, node.y + size);
    }
    ctx.fill();
    ctx.shadowBlur = 0; 

    // Render Label
    if (isHighlighted || globalScale > 2.5) {
      ctx.font = `${fontSize}px Sans-Serif`;
      const textWidth = ctx.measureText(label).width;
      const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.5);

      ctx.fillStyle = isDark ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)';
      ctx.beginPath();
      ctx.roundRect(
        node.x - bckgDimensions[0] / 2, 
        node.y + size + 2, 
        bckgDimensions[0], 
        bckgDimensions[1], 
        4
      );
      ctx.fill();

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = isDark ? '#e2e8f0' : '#334155';
      ctx.fillText(label, node.x, node.y + size + 2 + bckgDimensions[1] / 2);
    }
  }, [isDark, hoverNode, selectedNode]);

  return (
    <div ref={containerRef} className="w-full h-full relative bg-slate-50 dark:bg-[#020617] overflow-hidden rounded-xl">
      
      {/* --- HUD (Left Side - Info Only) --- */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none">
        <motion.div 
            layout 
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="w-56 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-700 p-3 rounded-xl shadow-lg overflow-hidden"
        >
          <motion.h3 layout="position" className="text-blue-600 dark:text-blue-400 font-mono text-xs uppercase tracking-widest mb-1 flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            Architecture View
          </motion.h3>
          
          <AnimatePresence mode="wait">
            {activeNode ? (
                // MODE A: Specific Node
                <motion.div
                    key="node-details"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.15 }}
                >
                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-100 dark:border-slate-800">
                        <div className={`p-1.5 rounded-lg shrink-0 ${
                            activeNode.id.includes('main') || activeNode.id.includes('App.tsx') ? "bg-red-100 text-red-600" :
                            activeNode.type === 'ts' ? "bg-green-100 text-green-600" :
                            activeNode.type === 'config' ? "bg-amber-100 text-amber-600" :
                            "bg-blue-100 text-blue-600"
                        }`}>
                            {activeNode.id.includes('main') || activeNode.id.includes('App.tsx') ? <Play size={14} /> :
                             activeNode.type === 'ts' ? <Box size={14} /> :
                             activeNode.type === 'config' ? <Layers size={14} /> :
                             <FileCode size={14} />}
                        </div>
                        <div className="min-w-0 flex-1">
                            <h3 className="font-bold text-xs text-slate-800 dark:text-slate-100 truncate">
                                {activeNode.id.split('/').pop()}
                            </h3>
                            <p className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">
                                {activeNode.id.includes('main') ? 'ENTRY POINT' : activeNode.type || 'COMPONENT'}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                        {(() => {
                            const { dependencies, links } = getNodeMetrics(activeNode.id);
                            return (
                                <>
                                    <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded-lg flex flex-col justify-center">
                                        <div className="flex items-center gap-1.5 mb-1">
                                            <Link size={12} className="text-slate-400" />
                                            <span className="text-slate-400 uppercase font-semibold">Links</span>
                                        </div>
                                        <span className="font-mono font-medium text-slate-700 dark:text-slate-300 text-base">{links}</span>
                                    </div>
                                    <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded-lg flex flex-col justify-center">
                                        <div className="flex items-center gap-1.5 mb-1">
                                            <Share2 size={12} className="text-slate-400" />
                                            <span className="text-slate-400 uppercase font-semibold">Dependencies</span>
                                        </div>
                                        <span className="font-mono font-medium text-slate-700 dark:text-slate-300 text-base">{dependencies}</span>
                                    </div>
                                </>
                            );
                        })()}
                    </div>
                </motion.div>
            ) : (
                // MODE B: Global Map
                <motion.div 
                    key="global-view"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center gap-3 pt-1"
                >
                    <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                        <Network size={16} />
                    </div>
                    <div>
                        <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-tight">
                            Global Map
                        </h3>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono flex gap-2 mt-0.5">
                            <span>{data.nodes.length} Files</span>
                            <span>{data.links.length} Links</span>
                        </div>
                    </div>
                </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* --- FLOATING ACTION MENU (Right next to Node) --- */}
      <AnimatePresence>
        {(selectedNode || hoverNode) && menuPos && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: -10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: -10 }}
            transition={{ duration: 0.2, delay: hoverNode && !selectedNode ? 0.2 : 0 }} // Small delay on hover
            style={{ 
                position: 'absolute', 
                left: menuPos.x, 
                top: menuPos.y 
            }}
            className="z-30 pointer-events-auto"
          >
            <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-700 p-2 rounded-xl shadow-xl flex flex-col gap-1 min-w-[140px]">
                {/* Header for Context */}
                <div className="px-2 py-1 border-b border-slate-100 dark:border-slate-800 mb-1">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                        {activeNode?.id.split('/').pop()}
                    </span>
                </div>

                <button 
                    onClick={(e) => { e.stopPropagation(); onNodeAction && onNodeAction(activeNode.id, 'explain'); }}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
                >
                    <Sparkles size={14} className="text-blue-500" />
                    Explain Code
                </button>
                <button 
                    onClick={(e) => { e.stopPropagation(); onNodeAction && onNodeAction(activeNode.id, 'fix'); }}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-amber-900/30 hover:text-amber-600 dark:hover:text-amber-400 transition-colors text-left"
                >
                    <Bug size={14} className="text-amber-500" />
                    Find Issues
                </button>
                <button 
                    onClick={(e) => { e.stopPropagation(); onNodeAction && onNodeAction(activeNode.id, 'chat'); }}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
                >
                    <MessageSquare size={14} className="text-slate-500" />
                    Chat
                </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Control Buttons */}
      <div className="absolute bottom-6 right-6 z-20 pointer-events-auto">
        <button 
          onClick={handleReset}
          className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 shadow-md transition-all active:scale-95"
          title="Reset View"
        >
          <Minimize size={18} />
        </button>
      </div>

      {/* GRAPH ENGINE */}
      <ForceGraph2D
        ref={graphRef}
        width={dimensions.w}
        height={dimensions.h}
        graphData={data}
        backgroundColor="rgba(0,0,0,0)"
        
        nodeCanvasObject={paintNode}
        nodePointerAreaPaint={(node: any, color, ctx) => {
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 8, 0, 2 * Math.PI, false);
          ctx.fill();
        }}

        linkColor={() => isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)"}
        linkWidth={1.5}
        linkCurvature={0} 
        
        linkDirectionalParticles={2}
        linkDirectionalParticleWidth={2}
        linkDirectionalParticleColor={() => isDark ? "#60a5fa" : "#2563eb"}
        linkDirectionalParticleSpeed={0.005}

        onNodeHover={(node) => {
            // Logic: If locked (selectedNode), ignore hover unless we want to peek
            // Current Logic: If Locked, stay locked. If free, show hover.
            if (!selectedNode) {
                setHoverNode(node || null);
                updateMenuPosition(node);
            }
            if (containerRef.current) {
                containerRef.current.style.cursor = node ? 'pointer' : 'move';
            }
        }}
        
        onNodeClick={handleNodeClick}
        onBackgroundClick={handleBgClick} // Clears selection
        onNodeDragEnd={(node) => {
            // Update menu position if node was dragged
            if (node === selectedNode) updateMenuPosition(node);
        }}
        
        d3AlphaDecay={0.04}
        d3VelocityDecay={0.3}
        cooldownTicks={50}
        onEngineStop={() => graphRef.current?.zoomToFit(500, 30)}
      />
    </div>
  );
};