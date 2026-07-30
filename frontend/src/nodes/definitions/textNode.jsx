// textNode.js — Text node definition

import { useState } from 'react';
import { useStore } from '../../store';

const TextNodeContent = ({ id, data }) => {
  const updateNodeField = useStore((s) => s.updateNodeField);
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
    updateNodeField(id, 'text', e.target.value);
  };

  return (
    <label>
      Text:
      <input type="text" value={currText} onChange={handleTextChange} />
    </label>
  );
};

export const textNodeDefinition = {
  type: 'text',
  label: 'Text',
  title: 'Text',
  handles: [
    { type: 'source', position: 'right', id: 'output' },
  ],
  renderContent: (props) => <TextNodeContent {...props} />,
};
