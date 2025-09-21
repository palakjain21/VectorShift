import { draggableNodes } from '../../utils/utils';
import { DraggableNode } from './DraggableNode';
import { SubmitButton } from './Submit';

export const PipelineToolbar = () => {


    return (
        <div className="p-2.5 flex justify-between items-start">
            <div className="mt-5 mb-4 flex flex-wrap gap-2.5">
                {draggableNodes.map((node) => (
                    <DraggableNode key={node.type} type={node.type} label={node.label} />
                ))}
            </div>
            <div className="mt-5">
                <SubmitButton />
            </div>
        </div>
    );
};
