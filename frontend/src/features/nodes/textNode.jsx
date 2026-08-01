/**
 * @file textNode.js
 * @description Core node for defining static or templated text input blocks.
 * @module textNode
 */

import { useState, useRef, useEffect } from 'react';
import { useStore } from '../../store';
import { NodeShell } from '../../components/ui/NodeShell';
import { useUpdateNodeInternals } from 'reactflow';
import { Type } from 'lucide-react';

export const type = 'text';
export const label = 'Text';
export const group = 'Core';

export const TextNode = (props) => {
  const { id, data } = props;
  const updateNodeField = useStore((s) => s.updateNodeField);
  const updateNodeInternals = useUpdateNodeInternals();
  const textareaRef = useRef(null);

  const [currText, setCurrText] = useState(data?.text || 'Enter the text');
  const [variables, setVariables] = useState([]);
  const [nodeWidth, setNodeWidth] = useState(300);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;

      textareaRef.current.style.width = 'auto';
      const contentWidth = Math.max(textareaRef.current.scrollWidth, 200);
      setNodeWidth(Math.min(Math.max(contentWidth + 48, 240), 480));
    }
  }, [currText]);

  useEffect(() => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const matches = Array.from(currText.matchAll(regex)).map(m => m[1]);
    const uniqueVariables = [...new Set(matches)];
    
    setVariables(uniqueVariables);
  }, [currText]);

  const variablesString = JSON.stringify(variables);
  useEffect(() => {
    updateNodeInternals(id);
  }, [id, updateNodeInternals, variablesString]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
    updateNodeField(id, 'text', e.target.value);
  };

  const dynamicHandles = variables.map(variable => ({
    type: 'target',
    position: 'left',
    id: variable
  }));

  const handles = [
    ...dynamicHandles,
    { type: 'source', position: 'right', id: 'output' }
  ];

  return (
    <NodeShell 
      id={id}
      title="Text" 
      icon={Type}
      handles={handles}
      width={nodeWidth}
    >
      <div className="flex flex-col gap-2 min-w-[200px]">
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-300">Text Content</label>
          <textarea 
            ref={textareaRef}
            value={currText} 
            onChange={handleTextChange} 
            placeholder='Use {{variable}} to extract fields'
            className="w-full min-h-[60px] bg-neutral-100 dark:bg-[#18181B] border border-neutral-300 dark:border-[#27272A] rounded-md px-2 py-1.5 text-[11px] text-neutral-800 dark:text-neutral-200 outline-none focus:border-blue-500 transition-colors font-mono resize-none overflow-hidden leading-relaxed"
          />
        </div>
        {variables.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {variables.map(v => (
              <span key={v} className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-mono border border-blue-500/20">
                {v}
              </span>
            ))}
          </div>
        )}
      </div>
    </NodeShell>
  );
};
