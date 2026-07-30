// toolbar.js

import { DraggableNode } from './draggableNode';
import { toolbarItems } from './nodes';

export const PipelineToolbar = () => {

    return (
        <div style={{ padding: '10px' }}>
            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {toolbarItems.map((item) => (
                    <DraggableNode key={item.type} type={item.type} label={item.label} />
                ))}
            </div>
        </div>
    );
};

