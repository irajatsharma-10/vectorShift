// definitions/index.js — Central registry
// Adding a node = import its definition + add to this array.

import { BaseNode } from '../BaseNode';
import { inputNodeDefinition } from './inputNode';
import { outputNodeDefinition } from './outputNode';
import { llmNodeDefinition } from './llmNode';
import { textNodeDefinition } from './textNode';

const definitions = [
  inputNodeDefinition,
  outputNodeDefinition,
  llmNodeDefinition,
  textNodeDefinition,
];

// Wraps a definition into a React component that BaseNode can render
const createNode = (def) => {
  const NodeComponent = (props) => (
    <BaseNode
      id={props.id}
      data={props.data}
      title={def.title}
      handles={def.handles}
    >
      {def.renderContent(props)}
    </BaseNode>
  );
  NodeComponent.displayName = def.title + 'Node';
  return NodeComponent;
};

// nodeTypes map for ReactFlow
export const nodeTypes = Object.fromEntries(
  definitions.map((def) => [def.type, createNode(def)])
);

// Toolbar items list
export const toolbarItems = definitions.map((def) => ({
  type: def.type,
  label: def.label,
}));
