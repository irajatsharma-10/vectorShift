/**
 * @file conditionNode.js
 * @description Logic node for evaluating conditional branching within the workflow.
 * @module conditionNode
 */

import { useState } from 'react';
import { useStore } from '../../store';
import { NodeShell } from '../../components/ui/NodeShell';
import { Split } from 'lucide-react';

export const type = 'condition';
export const label = 'Condition Branch';
export const group = 'AI & Logic';

export const ConditionNode = (props) => {
  const { id, data } = props;
  const updateNodeField = useStore((s) => s.updateNodeField);
  const [expression, setExpression] = useState(data?.expression || 'input > 5');

  const handleChange = (e) => {
    setExpression(e.target.value);
    updateNodeField(id, 'expression', e.target.value);
  };

  return (
    <NodeShell 
      id={id}
      title="Condition" 
      icon={Split}
      handles={[
        { type: 'target', position: 'left', id: 'input' },
        { type: 'source', position: 'right', id: 'true' },
        { type: 'source', position: 'right', id: 'false' },
      ]}
    >
      <div className="flex flex-col gap-1 min-w-[150px]">
        <label className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-300">Expression</label>
        <input 
          type="text" 
          value={expression} 
          onChange={handleChange}
          placeholder="e.g., input == 'success'"
          className="w-full bg-neutral-100 dark:bg-[#18181B] border border-neutral-300 dark:border-[#27272A] rounded-md px-2 py-1.5 text-xs text-neutral-800 dark:text-neutral-200 outline-none focus:border-indigo-500 transition-colors font-mono"
        />
      </div>
    </NodeShell>
  );
};
