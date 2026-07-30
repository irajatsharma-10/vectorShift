// definitions/index.js — Central registry

import * as inputNode from './inputNode';
import * as outputNode from './outputNode';
import * as llmNode from './llmNode';
import * as textNode from './textNode';

// Map over all imported modules to build the structures ReactFlow and Toolbar need
const modules = [inputNode, outputNode, llmNode, textNode];

export const nodeTypes = Object.fromEntries(
  modules.map((m) => {
    // The component is the export that isn't 'type' or 'label'
    // E.g., 'InputNode', 'LLMNode'
    const Component = Object.values(m).find(val => typeof val === 'function');
    return [m.type, Component];
  })
);

export const toolbarItems = modules.map((m) => ({
  type: m.type,
  label: m.label,
}));
