// apiNode.js — API Request node definition

import { BaseNode } from '../BaseNode';

export const type = 'api';
export const label = 'API Request';

export const ApiNode = (props) => {
  const { id } = props;
  
  return (
    <BaseNode 
      id={id}
      title="API Request" 
      handles={[
        { type: 'target', position: 'left', id: 'url' },
        { type: 'target', position: 'left', id: 'headers' },
        { type: 'target', position: 'left', id: 'body' },
        { type: 'source', position: 'right', id: 'response' },
        { type: 'source', position: 'right', id: 'error' },
      ]}
    >
      <div>
        <label>
          Method:
          <select defaultValue="GET">
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
