// mergeNode.js — Merge node definition

import { BaseNode } from '../BaseNode';

export const type = 'merge';
export const label = 'Merge Data';

export const MergeNode = (props) => {
  const { id } = props;
  
  return (
    <BaseNode 
      id={id}
      title="Merge" 
      handles={[
        { type: 'target', position: 'left', id: 'input_1' },
        { type: 'target', position: 'left', id: 'input_2' },
        { type: 'target', position: 'left', id: 'input_3' },
        { type: 'source', position: 'right', id: 'output' },
      ]}
    >
      <div style={{ textAlign: 'center', color: '#666' }}>
        <span>Combines 3 inputs</span>
      </div>
    </BaseNode>
  );
};
