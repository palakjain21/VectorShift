import { FiLink } from 'react-icons/fi';
import { DropdownItem } from './DropdownItem';
import { FiArrowRight } from 'react-icons/fi';

export const NodeSelector = ({ availableNodes, onNodeSelect }) => {
  return (
    <>
      <div className="p-3 text-xs font-medium text-primary-800 border-b border-gray-200 bg-primary-100 rounded-t-lg">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-600"><FiLink /></span>
          Select Node
        </div>
      </div>
      {availableNodes.map((node) => (
        <DropdownItem
          key={node.nodeId}
          icon={FiLink}
          onClick={() => onNodeSelect(node)}
        >
          <div className="flex items-center">
            <div className="flex flex-col items-start">
              <div className="text-sm font-medium text-gray-900">
                {node.nodeName}
              </div>
              <div className="text-xs text-gray-500">
                {node.nodeType}
              </div>
            </div>
            <div className="text-xs text-gray-400 ml-auto">
              <FiArrowRight />
            </div>
          </div>

        </DropdownItem>
      ))}
    </>
  );
};
