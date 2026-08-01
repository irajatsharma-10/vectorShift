/**
 * @file NodeShell.js
 * @description Reusable UI wrapper providing standardized styling and handles for all canvas nodes.
 * @module NodeShell
 */

// NodeShell.js
// Purely presentational shell component for all nodes.
// Renders container, title, handles (auto-distributed), and children.

import { Handle, Position } from 'reactflow';
import { X } from 'lucide-react';
import { useStore } from '../../store';

const POSITION_MAP = {
  left: Position.Left,
  right: Position.Right,
  top: Position.Top,
  bottom: Position.Bottom,
};

export const NodeShell = ({ id, data, title, handles, children, icon: Icon, colorMode = 'primary', width }) => {
  const removeNode = useStore((state) => state.removeNode);

  // Group handles by position for auto-distribution
  const handlesByPosition = {};
  handles.forEach((h) => {
    const key = h.position;
    if (!handlesByPosition[key]) {
      handlesByPosition[key] = [];
    }
    handlesByPosition[key].push(h);
  });

  // Compute style offsets for each handle
  const renderedHandles = handles.map((h) => {
    const group = handlesByPosition[h.position];
    const index = group.indexOf(h);
    const total = group.length;

    const offset = ((index + 1) / (total + 1)) * 100;

    const isVertical = h.position === 'left' || h.position === 'right';

    let positionClass = '';
    if (h.position === 'right') {
        positionClass = '!right-[-6px] !transform !-translate-y-1/2';
    } else if (h.position === 'left') {
        positionClass = '!left-[-6px] !transform !-translate-y-1/2';
    } else if (h.position === 'top') {
        positionClass = '!top-[-6px] !transform !-translate-x-1/2';
    } else if (h.position === 'bottom') {
        positionClass = '!bottom-[-6px] !transform !-translate-x-1/2';
    }

    const style = isVertical ? { top: `${offset}%` } : { left: `${offset}%` };

    return (
      <Handle
        key={`${id}-${h.id}`}
        type={h.type}
        position={POSITION_MAP[h.position]}
        id={h.id}
        style={style}
        className={`!w-3 !h-3 !bg-neutral-50 dark:!bg-[#18181B] !border-[1.5px] !border-neutral-300 dark:!border-neutral-600 rounded-full transition-all hover:!border-primary hover:!bg-primary/10 hover:scale-125 !opacity-100 shadow-sm z-20 ${positionClass}`}
      />
    );
  });

  const isAmber = colorMode === 'amber';
  const headerBgClass = isAmber ? 'bg-amber-50/50 dark:bg-amber-500/10' : 'bg-neutral-100 dark:bg-[#18181B]';
  const headerBorderClass = isAmber ? 'border-amber-200 dark:border-amber-500/20' : 'border-neutral-200 dark:border-[#27272A]';
  const nodeBgClass = isAmber ? 'bg-amber-50/80 border-amber-200 dark:bg-amber-950/30 dark:border-amber-500/20' : 'bg-white dark:bg-[#09090B] border-neutral-200 dark:border-[#27272A]';
  const titleClass = isAmber ? 'text-amber-900 dark:text-amber-100' : 'text-neutral-900 dark:text-white';
  const iconBgClass = isAmber ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.3)]' : 'bg-primary/10 dark:bg-primary/20 text-primary shadow-[0_0_10px_rgba(139,92,246,0.1)] dark:shadow-[0_0_10px_rgba(139,92,246,0.3)]';
  const footerBgClass = isAmber ? 'border-amber-200 dark:border-amber-500/20 bg-amber-100/50 dark:bg-amber-950/40' : 'border-neutral-200 dark:border-[#27272A] bg-neutral-50 dark:bg-[#09090B]';

  return (
    <div
      className={`rounded-xl shadow-node-light dark:shadow-node-dark flex flex-col transition-all duration-300 group relative hover:shadow-[0_0_30px_rgba(139,92,246,0.2)] dark:hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] ${width ? '' : 'w-[300px]'}`}
      style={width ? { width: `${width}px` } : undefined}
    >
      
      {/* Rotating Border Element (Visible only when selected) */}
      <div className="absolute -inset-[2px] rounded-2xl overflow-hidden opacity-0 [.react-flow__node.selected_&]:opacity-100 transition-opacity duration-300 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(transparent,rgba(139,92,246,0.1),rgba(139,92,246,1),transparent_60%)] animate-[spin_4s_linear_infinite]" />
      </div>

      {renderedHandles}
      
      {/* Inner Container */}
      <div className={`rounded-xl overflow-hidden border flex flex-col w-full h-full relative z-10 ${nodeBgClass}`}>
        <div className={`${headerBgClass} border-b ${headerBorderClass} px-4 py-3 flex items-center justify-between relative z-10 transition-colors`}>
          <div className="flex items-center gap-3">
              {Icon && (
                <div className={`p-1.5 rounded-md ${iconBgClass} transition-colors`}>
                  <Icon className="w-4 h-4" />
                </div>
              )}
              <span className={`font-semibold text-[14px] tracking-tight transition-colors ${titleClass}`}>{title}</span>
          </div>
          
          {/* Delete Node Button */}
          <button 
            onClick={() => removeNode(id)}
            className="p-1.5 text-neutral-400 hover:text-red-500 hover:bg-red-500/10 rounded-md transition-all opacity-0 group-hover:opacity-100 shadow-sm"
            title="Delete Node"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <div className="custom-node-content nodrag p-4 flex-1 text-sm text-neutral-600 dark:text-neutral-400 flex flex-col gap-4">
          {children}
        </div>

        <div className={`border-t px-4 py-2.5 flex items-center gap-2 transition-colors ${footerBgClass}`}>
          <div className={`w-1.5 h-1.5 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)] ${isAmber ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
          <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 tracking-wider uppercase">Active - Valid</span>
        </div>
      </div>
    </div>
  );
};
