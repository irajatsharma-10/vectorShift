/**
 * @file inputNode.js
 * @description Core node for designating data entry points into the workflow.
 * @module inputNode
 */

import { useState } from 'react';
import { useStore } from '../../store';
import { NodeShell } from '../../components/ui/NodeShell';
import { ArrowRightToLine } from 'lucide-react';

export const type = 'customInput';
export const label = 'Input';
export const group = 'Core';

export const InputNode = (props) => {
  const { id, data } = props;
  const updateNodeField = useStore((s) => s.updateNodeField);
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace('customInput-', 'input_')
  );
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
    updateNodeField(id, 'inputName', e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
    updateNodeField(id, 'inputType', e.target.value);
  };

  return (
    <NodeShell
      id={id}
      title="Input"
      icon={ArrowRightToLine}
      handles={[{ type: 'source', position: 'right', id: 'value' }]}
    >
      <div className="flex flex-col gap-2 min-w-[150px]">
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-300">Name</label>
          <input
            type="text"
            value={currName}
            onChange={handleNameChange}
            className="w-full bg-neutral-100 dark:bg-[#18181B] border border-neutral-300 dark:border-[#27272A] rounded-md px-2 py-1.5 text-xs text-neutral-800 dark:text-neutral-200 outline-none focus:border-emerald-500 transition-colors font-mono"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-300">Type</label>
          <select
            value={inputType}
            onChange={handleTypeChange}
            className="w-full bg-neutral-100 dark:bg-[#18181B] border border-neutral-300 dark:border-[#27272A] rounded-md px-2 py-1.5 text-xs font-medium text-neutral-800 dark:text-neutral-200 outline-none focus:border-emerald-500 transition-colors"
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
            <option value="Audio">Audio</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-300">Value (for prototype execution)</label>
          <input
            type="text"
            value={data?.inputValue || ''}
            onChange={(e) => updateNodeField(id, 'inputValue', e.target.value)}
            className="w-full bg-neutral-100 dark:bg-[#18181B] border border-neutral-300 dark:border-[#27272A] rounded-md px-2 py-1.5 text-xs text-neutral-800 dark:text-neutral-200 outline-none focus:border-emerald-500 transition-colors font-mono"
            placeholder="Static input value..."
          />
        </div>
      </div>
    </NodeShell>
  );
};
