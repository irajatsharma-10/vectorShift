/**
 * @file noteNode.js
 * @description Utility node for placing non-executable documentation or comments on the canvas.
 * @module noteNode
 */

import { useState } from 'react';
import { useStore } from '../../store'; 
import { X } from 'lucide-react';

export const type = 'note';
export const label = 'Sticky Note';
export const group = 'Utilities';

export const NoteNode = (props) => {
  const { id, data, selected } = props;
  const updateNodeField = useStore((s) => s.updateNodeField);
  const removeNode = useStore((s) => s.removeNode);
  const [text, setText] = useState(data?.text || '');
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e) => {
    setText(e.target.value);
    updateNodeField(id, 'text', e.target.value);
  };

  const isActive = selected || isFocused;

  return (
    <div 
      className={`
        w-[320px] flex flex-col relative group transition-all duration-300
        rounded-2xl overflow-hidden
        bg-amber-50/90 dark:bg-[#151517]/95 backdrop-blur-xl
        border 
      `}
      style={{
        borderColor: isActive 
          ? 'var(--tw-colors-amber-400)' 
          : 'var(--tw-colors-amber-200, rgba(253,230,138,0.5))',
        // Ensure the dark mode uses a different inactive border
        ...(document.documentElement.classList.contains('dark') && {
          borderColor: isActive ? 'rgba(251, 191, 36, 0.4)' : 'rgba(255, 255, 255, 0.05)',
        }),
        boxShadow: isActive 
          ? '0 0 0 1px rgba(245,158,11,0.5), 0 10px 25px -5px rgba(245,158,11,0.15), 0 20px 40px -10px rgba(0,0,0,0.1)'
          : '0 4px 15px -5px rgba(0,0,0,0.05), 0 4px 6px -2px rgba(0,0,0,0.02)',
        transform: selected ? 'scale(1.02) translateY(-2px)' : 'scale(1) translateY(0)'
      }}
    >
      {/* Top ambient highlight (Dark mode only) */}
      <div className="hidden dark:block absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
      {/* Top crisp border (Light mode only) */}
      <div className="dark:hidden absolute top-0 left-0 right-0 h-[2px] bg-amber-200" />

      {/* Header */}
      <div className="h-[44px] px-4 flex items-center justify-between border-b border-amber-200/50 dark:border-white/[0.03]">
        <div className="flex items-center gap-2.5">
          {/* Subtle amber indicator dot */}
          <div className="relative flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-amber-500 dark:bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.2)] dark:shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
          </div>
          <span className="text-[12px] font-semibold tracking-wide text-amber-900/80 dark:text-neutral-300 uppercase">Note</span>
        </div>
        
        {/* Delete Node Button */}
        <button 
          onClick={() => removeNode(id)}
          className="p-1.5 text-amber-700/50 hover:text-red-600 hover:bg-red-500/10 dark:text-neutral-400 dark:hover:text-red-500 dark:hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
          title="Delete Node"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Body - Clean Typography Surface */}
      <div className="p-4 relative z-10 dark:bg-gradient-to-b dark:from-amber-500/5 dark:to-transparent">
        <textarea 
          value={text} 
          onChange={handleChange} 
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Type your notes here..."
          className={`
            w-full min-h-[120px] resize-none text-[13px] leading-relaxed font-medium
            bg-transparent 
            text-amber-950 dark:text-neutral-200 
            placeholder:text-amber-900/40 dark:placeholder:text-neutral-500
            focus:outline-none
            custom-node-content nodrag
          `}
        />
      </div>
    </div>
  );
};
