// textNode.js — Text node definition

import { useState, useRef, useEffect } from 'react';
import { useStore } from '../../store';
import { BaseNode } from '../BaseNode';
import { useUpdateNodeInternals } from 'reactflow';

export const type = 'text';
export const label = 'Text';

export const TextNode = (props) => {
  const { id, data } = props;
  const updateNodeField = useStore((s) => s.updateNodeField);
  const updateNodeInternals = useUpdateNodeInternals();
  const textareaRef = useRef(null);

  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);

  // Auto-resize textarea when text changes
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currText]);

  // Parse variables from text
  useEffect(() => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const matches = Array.from(currText.matchAll(regex)).map(m => m[1]);
    const uniqueVariables = [...new Set(matches)];
    
    setVariables(uniqueVariables);
  }, [currText]);

  // Trigger ReactFlow update when variable list explicitly changes (even if length is same)
  const variablesString = JSON.stringify(variables);
  useEffect(() => {
    updateNodeInternals(id);
  }, [id, updateNodeInternals, variablesString]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
    updateNodeField(id, 'text', e.target.value);
  };

  const dynamicHandles = variables.map(variable => ({
    type: 'target',
    position: 'left',
    id: variable
  }));

  const handles = [
    ...dynamicHandles,
    { type: 'source', position: 'right', id: 'output' }
  ];

  return (
    <BaseNode 
      id={id}
      title="Text" 
      handles={handles}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label style={{ marginBottom: '4px' }}>Text:</label>
        <textarea 
          ref={textareaRef}
          value={currText} 
          onChange={handleTextChange} 
          className="nodrag"
          style={{ 
            minWidth: '250px',
            maxWidth: '450px',
            minHeight: '60px',
            resize: 'none',
            padding: '4px',
            overflow: 'hidden',
            boxSizing: 'border-box'
          }}
        />
      </div>
    </BaseNode>
  );
};
