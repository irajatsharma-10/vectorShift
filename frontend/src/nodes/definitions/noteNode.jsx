// noteNode.js — Note node definition

import { BaseNode } from '../BaseNode';
import { useState } from 'react';
import { useStore } from '../../store';

export const type = 'note';
export const label = 'Sticky Note';

export const NoteNode = (props) => {
  const { id, data } = props;
  const updateNodeField = useStore((s) => s.updateNodeField);
  const [text, setText] = useState(data?.text || '');

  const handleChange = (e) => {
    setText(e.target.value);
    updateNodeField(id, 'text', e.target.value);
  };

  return (
    <BaseNode 
      id={id}
      title="Note" 
      handles={[]} // Explicitly zero handles
    >
      <div style={{ padding: '4px 0' }}>
        <textarea 
          value={text} 
          onChange={handleChange} 
          placeholder="Type your notes here..."
          style={{ width: '100%', minHeight: '60px', resize: 'none' }}
        />
      </div>
    </BaseNode>
  );
};
