/**
 * @file timerNode.js
 * @description Utility node for scheduling workflow executions or delaying data flow.
 * @module timerNode
 */

import { useState } from 'react';
import { useStore } from '../../store';
import { NodeShell } from '../../components/ui/NodeShell';
import { Clock } from 'lucide-react';

export const type = 'timer';
export const label = 'Timer Trigger';
export const group = 'Utilities';

export const TimerNode = (props) => {
  const { id, data } = props;
  const updateNodeField = useStore((s) => s.updateNodeField);
  
  const [delay, setDelay] = useState(data?.delay || 10);
  const [unit, setUnit] = useState(data?.unit || 'seconds');

  const handleDelayChange = (e) => {
    const val = parseInt(e.target.value, 10);
    setDelay(val);
    updateNodeField(id, 'delay', val);
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
    updateNodeField(id, 'unit', e.target.value);
  };

  return (
    <NodeShell 
      id={id}
      title="Timer Trigger" 
      icon={Clock}
      handles={[
        { type: 'source', position: 'right', id: 'trigger' },
      ]}
    >
      <div className="flex flex-col gap-3 min-w-[150px]">
        <div className="flex gap-2">
          <div className="flex flex-col gap-1 w-1/2">
            <label className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-300">Delay</label>
            <input 
              type="number" 
              value={delay} 
              onChange={handleDelayChange}
              min="0"
              className="w-full bg-neutral-100 dark:bg-[#18181B] border border-neutral-300 dark:border-[#27272A] rounded-md px-2 py-1.5 text-xs text-neutral-800 dark:text-neutral-200 outline-none focus:border-amber-500 transition-colors font-mono"
            />
          </div>
          <div className="flex flex-col gap-1 w-1/2">
            <label className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-300">Unit</label>
            <select 
              value={unit} 
              onChange={handleUnitChange}
              className="w-full bg-neutral-100 dark:bg-[#18181B] border border-neutral-300 dark:border-[#27272A] rounded-md px-2 py-1.5 text-xs font-medium text-neutral-800 dark:text-neutral-200 outline-none focus:border-amber-500 transition-colors"
            >
              <option value="milliseconds">ms</option>
              <option value="seconds">sec</option>
              <option value="minutes">min</option>
            </select>
          </div>
        </div>
      </div>
    </NodeShell>
  );
};
