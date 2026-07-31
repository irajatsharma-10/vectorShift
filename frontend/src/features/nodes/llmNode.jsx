/**
 * @file llmNode.js
 * @description Logic node providing integration with Large Language Models for prompt execution.
 * @module llmNode
 */

import { useState } from 'react';
import { useStore } from '../../store';
import { NodeShell } from '../../components/ui/NodeShell';
import { BrainCircuit } from 'lucide-react';

export const type = 'llm';
export const label = 'LLM';
export const group = 'AI & Logic';

export const LLMNode = (props) => {
  const { id, data } = props;
  const updateNodeField = useStore((s) => s.updateNodeField);
  
  const [model, setModel] = useState(data?.model || 'gpt-4o');
  const [systemPrompt, setSystemPrompt] = useState(data?.systemPrompt || 'You are a helpful assistant.');
  const [temperature, setTemperature] = useState(data?.temperature || 0.7);

  const handleModelChange = (e) => {
    setModel(e.target.value);
    updateNodeField(id, 'model', e.target.value);
  };

  const handlePromptChange = (e) => {
    setSystemPrompt(e.target.value);
    updateNodeField(id, 'systemPrompt', e.target.value);
  };

  const handleTempChange = (e) => {
    const val = parseFloat(e.target.value);
    setTemperature(val);
    updateNodeField(id, 'temperature', val);
  };

  return (
    <NodeShell 
      id={id}
      title="LLM" 
      icon={BrainCircuit}
      handles={[
        { type: 'target', position: 'left', id: 'system' },
        { type: 'target', position: 'left', id: 'prompt' },
        { type: 'source', position: 'right', id: 'response' },
      ]}
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">Model</label>
          <select 
            value={model} 
            onChange={handleModelChange}
            className="w-full bg-neutral-100 dark:bg-[#18181B] border border-neutral-300 dark:border-[#27272A] rounded-md px-2 py-1.5 text-xs text-neutral-800 dark:text-neutral-200 outline-none focus:border-purple-500 transition-colors"
          >
            <option value="gpt-4o">GPT-4o</option>
            <option value="gpt-4-turbo">GPT-4 Turbo</option>
            <option value="claude-3-5-sonnet">Claude 3.5 Sonnet</option>
            <option value="claude-3-opus">Claude 3 Opus</option>
            <option value="llama-3-70b">Llama 3 70B</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">System Prompt</label>
          <textarea 
            value={systemPrompt} 
            onChange={handlePromptChange}
            placeholder="You are a helpful assistant..."
            className="w-full bg-neutral-100 dark:bg-[#18181B] border border-neutral-300 dark:border-[#27272A] rounded-md px-2 py-1.5 text-xs text-neutral-800 dark:text-neutral-200 outline-none focus:border-purple-500 transition-colors resize-none h-16 leading-relaxed"
          />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">Temperature</label>
            <span className="text-[10px] text-neutral-500 font-mono bg-neutral-200 dark:bg-[#27272A] px-1 rounded">{temperature}</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="2" 
            step="0.1" 
            value={temperature} 
            onChange={handleTempChange}
            className="w-full accent-purple-500"
          />
        </div>
      </div>
    </NodeShell>
  );
};
