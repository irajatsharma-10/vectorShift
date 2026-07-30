// llmNode.js — LLM node definition

import { BaseNode } from '../BaseNode';

export const type = 'llm';
export const label = 'LLM';

export const LLMNode = (props) => {
  const { id } = props;
  
  return (
    <BaseNode 
      id={id}
      title="LLM" 
      handles={[
        { type: 'target', position: 'left', id: 'system' },
        { type: 'target', position: 'left', id: 'prompt' },
        { type: 'source', position: 'right', id: 'response' },
      ]}
    >
      <span>This is a LLM.</span>
    </BaseNode>
  );
};
