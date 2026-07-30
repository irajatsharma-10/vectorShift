// conditionNode.js — Condition node definition

import { BaseNode } from '../BaseNode';
import { useState } from 'react';
import { useStore } from '../../store';

export const type = 'condition';
export const label = 'Condition Branch';

export const ConditionNode = (props) => {
  const { id, data } = props;
  const updateNodeField = useStore((s) => s.updateNodeField);
  const [expression, setExpression] = useState(data?.expression || 'x > 5');

  const handleChange = (e) => {
    setExpression(e.target.value);
    updateNodeField(id, 'expression', e.target.value);
  };

  return (
    <BaseNode 
      id={id}
      title="Condition" 
      handles={[
        { type: 'target', position: 'left', id: 'input' },
        { type: 'source', position: 'right', id: 'true' },
        { type: 'source', position: 'right', id: 'false' },
      ]}
    >
      <div>
        <label>
          Expression:
          <input 
            type="text" 
            value={expression} 
            onChange={handleChange}
            style={{ width: '100%', marginTop: '4px' }}
          />
        </label>
      </div>
    </BaseNode>
  );
};
