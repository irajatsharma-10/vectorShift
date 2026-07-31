/**
 * @file mergeNode.js
 * @description Utility node for combining multiple data streams into a single output.
 * @module mergeNode
 */

import { useState } from 'react';
import { useStore } from '../../store';
import { NodeShell } from '../../components/ui/NodeShell';
import { Combine } from 'lucide-react';

export const type = 'merge';
export const label = 'Merge Data';
export const group = 'Utilities';

export const MergeNode = (props) => {
  const { id, data } = props;
  const updateNodeField = useStore((s) => s.updateNodeField);
  
  const [strategy, setStrategy] = useState(data?.strategy || 'concat');

  const handleStrategyChange = (e) => {
    setStrategy(e.target.value);
    updateNodeField(id, 'strategy', e.target.value);
  };

  return (
    <NodeShell 
      id={id}
      title="Merge" 
      icon={Combine}
      handles={[
        { type: 'target', position: 'left', id: 'input1' },
        { type: 'target', position: 'left', id: 'input2' },
        { type: 'target', position: 'left', id: 'input3' },
        { type: 'source', position: 'right', id: 'output' },
      ]}
    >
      <div className="flex flex-col gap-2 min-w-[150px]">
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-300">Merge Strategy</label>
          <select 
            value={strategy} 
            onChange={handleStrategyChange}
            className="w-full bg-neutral-100 dark:bg-[#18181B] border border-neutral-300 dark:border-[#27272A] rounded-md px-2 py-1.5 text-xs font-medium text-neutral-800 dark:text-neutral-200 outline-none focus:border-purple-500 transition-colors"
          >
            <option value="concat">Concatenate String</option>
            <option value="array">Combine as Array</option>
            <option value="object">Deep Merge JSON</option>
          </select>
        </div>
      </div>
    </NodeShell>
  );
};
