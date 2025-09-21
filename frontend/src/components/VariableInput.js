import { useState, useRef, useEffect } from 'react';
import { useStore } from '../store';
import { NODE_CONFIGS } from '../nodes/NodeConfigs';
import { FiLink } from 'react-icons/fi';

export const VariableInput = ({ 
  value, 
  onChange, 
  placeholder, 
  className, 
  type = 'text',
  rows = 3,
  currentNodeId 
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [selectedNode, setSelectedNode] = useState(null);
  const [dropdownStep, setDropdownStep] = useState(1); 
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  
  const nodes = useStore(state => state.nodes);
  
  const getConfigType = (reactFlowType) => {
    const typeMap = {
      'customInput': 'input',
      'customOutput': 'output',
      'llm': 'llm',
      'text': 'text',
      'database': 'database',
      'api': 'api',
      'transform': 'transform',
      'filter': 'filter',
      'merge': 'merge',
      'condition': 'condition'
    };
    return typeMap[reactFlowType] || reactFlowType;
  };

  const getAvailableNodes = () => {
    return nodes
      .filter(node => node.id !== currentNodeId)
      .map(node => {
        const reactFlowType = node.type || node.data?.nodeType;
        const configType = getConfigType(reactFlowType);
        const nodeConfig = NODE_CONFIGS[configType];
        
        return nodeConfig?.outputs ? {
          nodeId: node.id,
          nodeType: nodeConfig.title || configType,
          outputs: nodeConfig.outputs
        } : null;
      })
      .filter(Boolean);
  };

  const getNodeOutputs = (nodeId) => {
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return [];
    
    const configType = getConfigType(node.type || node.data?.nodeType);
    return NODE_CONFIGS[configType]?.outputs || [];
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    const cursorPos = e.target.selectionStart;
    
    onChange(newValue);
    setCursorPosition(cursorPos);
    
    // Auto-resize textarea
    if (type === 'textarea') {
      resizeTextarea(e.target, cursorPos);
    }
    
    // Check if user typed {{ at cursor position
    if (newValue.slice(cursorPos - 2, cursorPos) === '{{') {
      setDropdownStep(1);
      setSelectedNode(null);
      setShowDropdown(true);
    } else {
      closeDropdown();
    }
  };


  const handleNodeSelect = (node) => {
    setSelectedNode(node);
    setDropdownStep(2);
  };

  const handleOutputSelect = (output) => {
    const beforeCursor = value.slice(0, cursorPosition - 2);
    const afterCursor = value.slice(cursorPosition);
    const variableText = `{{${selectedNode.nodeId}.${output.id}}}`;
    const newValue = beforeCursor + variableText + afterCursor;
    
    onChange(newValue);
    closeDropdown();
    
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        const newCursorPos = beforeCursor.length + variableText.length;
        inputRef.current.setSelectionRange(newCursorPos, newCursorPos);
        
        if (type === 'textarea') {
          resizeTextarea(inputRef.current, newCursorPos);
        }
      }
    }, 0);
  };

  const resizeTextarea = (element, cursorPos) => {
    element.style.height = 'auto';
    
    const lineHeight = parseFloat(window.getComputedStyle(element).lineHeight) || 20;
    const maxHeight = lineHeight * 5; // 5 lines max
    
    if (element.scrollHeight <= maxHeight) {
      element.style.height = element.scrollHeight + 'px';
      element.style.overflowY = 'hidden';
    } else {
      element.style.height = maxHeight + 'px';
      element.style.overflowY = 'auto';
      scrollToCursor(element, cursorPos);
    }
  };

  const scrollToCursor = (element, cursorPos) => {
    const textBeforeCursor = element.value.slice(0, cursorPos);
    const currentLine = textBeforeCursor.split('\n').length - 1;
    const lineHeight = parseFloat(window.getComputedStyle(element).lineHeight) || 20;
    
    const cursorTop = currentLine * lineHeight;
    const visibleHeight = element.clientHeight;
    const scrollTop = element.scrollTop;
    
    if (cursorTop > scrollTop + visibleHeight - lineHeight) {
      element.scrollTop = cursorTop - visibleHeight + lineHeight * 2;
    } else if (cursorTop < scrollTop) {
      element.scrollTop = Math.max(0, cursorTop - lineHeight);
    }
  };

  const closeDropdown = () => {
    setShowDropdown(false);
    setDropdownStep(1);
    setSelectedNode(null);
  };

  const handleBackToNodes = () => {
    setDropdownStep(1);
    setSelectedNode(null);
  };


  const handleKeyDown = (e) => {
    if (showDropdown && e.key === 'Escape') {
      closeDropdown();
      e.preventDefault();
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          inputRef.current && !inputRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto-resize textarea on mount and when value changes
  useEffect(() => {
    if (inputRef.current && type === 'textarea') {
      resizeTextarea(inputRef.current, 0);
    }
  }, [value, type]);

  const availableNodes = getAvailableNodes();
  const selectedNodeOutputs = selectedNode?.outputs || [];

  return (
    <div className="relative">
      {type === 'textarea' ? (
        <textarea
          ref={inputRef}
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={className}
          rows={rows}
          style={{ resize: 'none', overflow: 'hidden' }}
        />
      ) : (
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={className}
        />
      )}
      
      {showDropdown && (availableNodes.length > 0 || selectedNode) && (
        <div
          ref={dropdownRef}
          className="absolute z-50 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto w-64"
          style={{
            top: '0%',
            left: '250px',
            marginTop: '0px',
          }}
        >
          {/* Step 1: Select Node */}
          {dropdownStep === 1 && (
            <>
              <div className="p-3 text-xs font-medium text-primary-800 border-b border-gray-200 bg-primary-100 rounded-t-lg">
                <div className="flex items-center gap-2">
                <span className="text-xs text-gray-600"><FiLink/></span>
                  Select Node
                </div>
              </div>
              {availableNodes.map((node) => (
                <div
                  key={node.nodeId}
                  className="px-2 py-2 hover:bg-indigo-50 cursor-pointer border-b border-gray-100 last:border-b-0 flex items-center gap-3"
                  onClick={() => handleNodeSelect(node)}
                >
                  <div className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center">
                    <span className="text-xs text-gray-600"><FiLink/></span>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">
                      {node.nodeId}
                    </div>
                    <div className="text-xs text-gray-500">
                      {node.nodeType}
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">
                    →
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Step 2: Select Output */}
          {dropdownStep === 2 && selectedNode && (
            <>
              <div className="p-3 text-xs font-medium text-primary-800 border-b border-gray-200 bg-primary-100 rounded-t-lg">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleBackToNodes}
                    className="w-4 h-4 bg-primary-300 rounded-full flex items-center justify-center text-primary-900 text-xs hover:bg-gray-500"
                  >
                    ←
                  </button>
                  Select Output
                </div>
              </div>
              {selectedNodeOutputs.map((output) => (
                <div
                  key={output.id}
                  className="px-4 py-3 hover:bg-indigo-50 cursor-pointer border-b border-primary-100 last:border-b-0 flex items-center gap-3"
                  onClick={() => handleOutputSelect(output)}
                >
                  <div className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center">
                    <span className="text-xs text-primary-800">🔗</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">
                      {output.id}
                    </div>
                    <div className="text-xs text-gray-500">
                      Output field
                    </div>
                  </div>
                  <div className="text-xs text-primary-800 font-mono bg-primary-100 px-2 py-1 rounded">
                    {output.type || 'source'}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      )}
      
      {showDropdown && availableNodes.length === 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-50 bg-white border border-gray-300 rounded-lg shadow-lg p-3 w-64"
          style={{
            top: '100%',
            left: 0,
            marginTop: '5px'
          }}
        >
          <div className="text-xs text-gray-500">
            No variables available. Add nodes with outputs to see variables here.
          </div>
        </div>
      )}
    </div>
  );
};
