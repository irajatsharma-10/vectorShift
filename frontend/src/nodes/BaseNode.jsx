// BaseNode.js
// Purely presentational shell component for all nodes.
// Renders container, title, handles (auto-distributed), and children.

import { Handle, Position } from 'reactflow';
import './BaseNode.css';

const POSITION_MAP = {
  left: Position.Left,
  right: Position.Right,
  top: Position.Top,
  bottom: Position.Bottom,
};

export const BaseNode = ({ id, data, title, handles, children }) => {
  // Group handles by position for auto-distribution
  const handlesByPosition = {};
  handles.forEach((h) => {
    const key = h.position;
    if (!handlesByPosition[key]) {
      handlesByPosition[key] = [];
    }
    handlesByPosition[key].push(h);
  });

  // Compute style offsets for each handle
  const renderedHandles = handles.map((h) => {
    const group = handlesByPosition[h.position];
    const index = group.indexOf(h);
    const total = group.length;

    const offset = ((index + 1) / (total + 1)) * 100;

    const isVertical = h.position === 'left' || h.position === 'right';
    const style = isVertical
      ? { top: `${offset}%` }
      : { left: `${offset}%` };

    return (
      <Handle
        key={`${id}-${h.id}`}
        type={h.type}
        position={POSITION_MAP[h.position]}
        id={`${id}-${h.id}`}
        style={style}
      />
    );
  });

  return (
    <div className="base-node">
      {renderedHandles}
      <div className="base-node__title">
        <span>{title}</span>
      </div>
      <div className="base-node__content">
        {children}
      </div>
    </div>
  );
};
