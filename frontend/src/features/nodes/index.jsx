/**
 * @file index.js
 * @description Central registry exporting all ReactFlow node types and toolbar configurations.
 * @module index
 */

// definitions/index.js — Central registry

import * as inputNode from './inputNode';
import * as outputNode from './outputNode';
import * as llmNode from './llmNode';
import * as textNode from './textNode';
import * as apiNode from './apiNode';
import * as noteNode from './noteNode';
import * as mergeNode from './mergeNode';
import * as conditionNode from './conditionNode';
import * as timerNode from './timerNode';

// Map over all imported modules to build the structures ReactFlow and Toolbar need
const modules = [
  inputNode, 
  outputNode, 
  llmNode, 
  textNode,
  apiNode,
  noteNode,
  mergeNode,
  conditionNode,
  timerNode
];

export const nodeTypes = Object.fromEntries(
  modules.map((m) => {
    // The component is the export that isn't 'type' or 'label'
    const Component = Object.values(m).find(val => typeof val === 'function');
    return [m.type, Component];
  })
);

export const toolbarItems = modules.map((m) => ({
  type: m.type,
  label: m.label,
  group: m.group || 'Uncategorized',
}));
