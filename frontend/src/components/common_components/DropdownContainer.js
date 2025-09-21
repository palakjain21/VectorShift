import { forwardRef } from 'react';
import { NodeSelector } from './NodeSelector';
import { OutputSelector } from './OutputSelector';

export const DropdownContainer = forwardRef(({ 
  showDropdown, 
  availableNodes, 
  selectedNode, 
  dropdownStep,
  onNodeSelect,
  onOutputSelect,
  onBackToNodes 
}, ref) => {
  if (!showDropdown) return null;

  return (
    <div
      ref={ref}
      className="absolute z-50 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto w-64 top-0 left-64"
    >
      {dropdownStep === 1 && availableNodes.length > 0 && (
        <NodeSelector 
          availableNodes={availableNodes}
          onNodeSelect={onNodeSelect}
        />
      )}

      {dropdownStep === 2 && selectedNode && (
        <OutputSelector 
          selectedNode={selectedNode}
          onOutputSelect={onOutputSelect}
          onBackToNodes={onBackToNodes}
        />
      )}

      {dropdownStep === 1 && availableNodes.length === 0 && (
        <div className="p-3">
          <div className="text-xs text-gray-500">
            No variables available. Add nodes with outputs to see variables here.
          </div>
        </div>
      )}
    </div>
  );
});
