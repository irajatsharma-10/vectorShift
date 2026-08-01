/**
 * @file dragUtils.js
 * @description Utility functions for handling HTML5 drag-and-drop operations for canvas nodes.
 * @module dragUtils
 */

export const startNodeDrag = (event, nodeType) => {
    const appData = { nodeType };
    if (event.target && event.target.style) {
        event.target.style.cursor = 'grabbing';
    }
    // We send a JSON string to match how WorkflowCanvas parses it
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
};
