import { DraggableNode } from './draggableNode';
import { draggableNodes } from './utils/utils';

export const PipelineToolbar = () => {


    return (
        <div className='p-[10px]'>
            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {draggableNodes.map((node) => (
                    <DraggableNode key={node.type} type={node.type} label={node.label} />
                ))}
            </div>
        </div>
    );
};
