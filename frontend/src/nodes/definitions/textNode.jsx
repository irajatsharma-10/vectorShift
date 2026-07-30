// textNode.js — Text node definition

import { useState } from 'react';
import { useStore } from '../../store';
import { BaseNode } from '../BaseNode';

export const type = 'text';
export const label = 'Text';

export const TextNode = (props) => {
  const { id, data } = props;
  const updateNodeField = useStore((s) => s.updateNodeField);
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
    updateNodeField(id, 'text', e.target.value);
  };

  return (
    <BaseNode 
      id={id}
      title="Text" 
      handles={[{ type: 'source', position: 'right', id: 'output' }]}
    >
      <label>
        Text:
        <input type="text" value={currText} onChange={handleTextChange} />
      </label>
    </BaseNode>
  );
};
