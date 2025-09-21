import React from 'react';
import { getNodeIcon } from '../../utils/utils';

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };

    const IconComponent = getNodeIcon(type);
  
    return (
      <div
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        className={`${type} cursor-grab min-w-[100px] h-[40px] px-2 flex items-center rounded-md bg-primary-800 justify-center flex-col hover:bg-primary-900`}
        draggable
      >
        <div className="flex items-center gap-1">
          <IconComponent size={14} className="text-white" />
          <span className="text-white">{label}</span>
        </div>
      </div>
    );
  };
  