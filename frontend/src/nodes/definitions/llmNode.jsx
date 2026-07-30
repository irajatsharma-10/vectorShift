// llmNode.js — LLM node definition

export const llmNodeDefinition = {
  type: 'llm',
  label: 'LLM',
  title: 'LLM',
  handles: [
    { type: 'target', position: 'left', id: 'system' },
    { type: 'target', position: 'left', id: 'prompt' },
    { type: 'source', position: 'right', id: 'response' },
  ],
  renderContent: () => <span>This is a LLM.</span>,
};
