/**
 * @file WorkflowCanvas.js
 * @description Interactive canvas component managing the ReactFlow instance and node states.
 * @module WorkflowCanvas
 */

// WorkflowCanvas.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap, MarkerType } from 'reactflow';
import { useStore } from '../../store';
import { shallow } from 'zustand/shallow';
import { nodeTypes } from '../../features/nodes';

import 'reactflow/dist/style.css';
import { GRID_SIZE, PRO_OPTIONS } from '../../constants';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  theme: state.theme,
});

export const WorkflowCanvas = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect,
      theme,
    } = useStore(selector, shallow);

    const isLight = theme === 'light';

    const getInitNodeData = (nodeID, type) => {
      let nodeData = { id: nodeID, nodeType: `${type}` };
      return nodeData;
    }

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
      
            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
      
            addNode(newNode);
          }
        },
        [reactFlowInstance, addNode, getNodeID]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <div ref={reactFlowWrapper} className={`w-full h-full relative ${isLight ? 'bg-white' : ''}`}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                proOptions={PRO_OPTIONS}
                snapGrid={[GRID_SIZE, GRID_SIZE]}
                connectionLineType='smoothstep'
                defaultEdgeOptions={{
                    animated: true,
                    style: { strokeWidth: 2, stroke: isLight ? '#94A3B8' : '#52525B', strokeDasharray: '5 5' },
                    markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12, color: isLight ? '#94A3B8' : '#52525B' }
                }}
                className={isLight ? 'bg-[radial-gradient(circle_at_50%_0%,_#F8FAFC,_#F1F5F9)]' : 'bg-[radial-gradient(circle_at_50%_0%,_#11111a,_#000000)]'}
            >
                <Background variant="dots" gap={24} size={2} color={isLight ? '#CBD5E1' : '#27272A'} />
                <Controls />
                <MiniMap 
                    className={`border shadow-sm rounded-lg overflow-hidden !m-6 !right-0 !bottom-0 ${isLight ? 'border-neutral-200' : 'border-[#27272A]'}`} 
                    style={{ backgroundColor: isLight ? '#FFFFFF' : '#09090B' }}
                    maskColor={isLight ? 'rgba(241,245,249,0.75)' : 'rgba(0,0,0,0.6)'}
                    nodeColor={isLight ? '#94A3B8' : '#3F3F46'}
                    nodeStrokeColor="transparent"
                    nodeBorderRadius={4}
                    zoomable
                    pannable
                />
            </ReactFlow>

            {/* Empty State Overlay */}
            {nodes.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <div className="bg-surface dark:bg-surface-dark px-8 py-6 rounded-lg border border-edge dark:border-edge-dark shadow-sm text-center max-w-sm flex flex-col items-center gap-2">
                        <h3 className="text-neutral-900 dark:text-neutral-100 font-semibold tracking-tight text-[15px]">Canvas is empty</h3>
                        <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">Drag nodes from the sidebar to build your workflow.</p>
                    </div>
                </div>
            )}
        </div>
    )
}
