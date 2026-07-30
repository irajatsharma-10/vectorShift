// timerNode.js — Timer node definition

import { BaseNode } from '../BaseNode';
import { useState } from 'react';
import { useStore } from '../../store';

export const type = 'timer';
export const label = 'Timer Trigger';

export const TimerNode = (props) => {
  const { id, data } = props;
  const updateNodeField = useStore((s) => s.updateNodeField);
  const [seconds, setSeconds] = useState(data?.seconds || 10);

  const handleChange = (e) => {
    setSeconds(e.target.value);
    updateNodeField(id, 'seconds', e.target.value);
  };

  return (
    <BaseNode 
      id={id}
      title="Timer Trigger" 
      handles={[
        { type: 'source', position: 'right', id: 'trigger' },
      ]}
    >
      <div>
        <label>
          Delay (sec):
          <input 
            type="number" 
            value={seconds} 
            onChange={handleChange}
            style={{ width: '100%', marginTop: '4px' }}
          />
        </label>
      </div>
    </BaseNode>
  );
};
