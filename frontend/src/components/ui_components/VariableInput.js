import { useState, useRef, useEffect } from 'react';
import { useStore } from '../../store';
import { NODE_CONFIGS } from '../../nodes/NodeConfigs';
import { DropdownContainer } from '../common_components/DropdownContainer';
import { resizeTextarea } from '../../utils/textareaUtils';
import { getConfigType, getNodeDisplayName } from '../../utils/nodeNameUtils';

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
  

  const getAvailableNodes = () => {
    return nodes
      .filter(node => node.id !== currentNodeId)
      .map(node => {
        const reactFlowType = node.type || node.data?.nodeType;
        const configType = getConfigType(reactFlowType);
        const nodeConfig = NODE_CONFIGS[configType];
        
        if (!nodeConfig?.outputs) return null;
        
        return {
          nodeId: node.id,
          nodeName: getNodeDisplayName(node, nodes),
          nodeType: nodeConfig.title || configType,
          outputs: nodeConfig.outputs
        };
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
    
    if (type === 'textarea') {
      resizeTextarea(e.target, cursorPos);
    }
    
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
    const variableText = `{{${selectedNode.nodeName}.${output.id}}}`;
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

  useEffect(() => {
    if (inputRef.current && type === 'textarea') {
      resizeTextarea(inputRef.current, 0);
    }
  }, [value, type]);

  const availableNodes = getAvailableNodes();

  return (
    <div className="relative">
      {type === 'textarea' ? (
        <textarea
          ref={inputRef}
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`${className} resize-none overflow-hidden`}
          rows={rows}
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
      
      <DropdownContainer
        ref={dropdownRef}
        showDropdown={showDropdown}
        availableNodes={availableNodes}
        selectedNode={selectedNode}
        dropdownStep={dropdownStep}
        onNodeSelect={handleNodeSelect}
        onOutputSelect={handleOutputSelect}
        onBackToNodes={handleBackToNodes}
      />
    </div>
  );
};
