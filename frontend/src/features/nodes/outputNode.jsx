/**
 * @file outputNode.js
 * @description Core node for designating the final output points of a workflow.
 * @module outputNode
 */

import { useState } from 'react';
import { useStore } from '../../store';
import { NodeShell } from '../../components/ui/NodeShell';
import { ArrowLeftFromLine } from 'lucide-react';

export const type = 'customOutput';
export const label = 'Output';
export const group = 'Core';

export const OutputNode = (props) => {
  const { id, data } = props;
  const updateNodeField = useStore((s) => s.updateNodeField);
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace('customOutput-', 'output_')
  );
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
    updateNodeField(id, 'outputName', e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
    updateNodeField(id, 'outputType', e.target.value);
  };

  return (
    <NodeShell 
      id={id}
      title="Output" 
      icon={ArrowLeftFromLine}
      handles={[{ type: 'target', position: 'left', id: 'value' }]}
    >
      <div className="flex flex-col gap-2 min-w-[150px]">
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-300">Name</label>
          <input 
            type="text" 
            value={currName} 
            onChange={handleNameChange}
            className="w-full bg-neutral-100 dark:bg-[#18181B] border border-neutral-300 dark:border-[#27272A] rounded-md px-2 py-1.5 text-xs text-neutral-800 dark:text-neutral-200 outline-none focus:border-rose-500 transition-colors font-mono"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-300">Type</label>
          <select 
            value={outputType} 
            onChange={handleTypeChange}
            className="w-full bg-neutral-100 dark:bg-[#18181B] border border-neutral-300 dark:border-[#27272A] rounded-md px-2 py-1.5 text-xs font-medium text-neutral-800 dark:text-neutral-200 outline-none focus:border-rose-500 transition-colors"
          >
            <option value="Text">Text</option>
            <option value="File">Image</option>
            <option value="Audio">JSON</option>
          </select>
        </div>
      </div>
    </NodeShell>
  );
};
