import { 
    FiArrowDown, 
    FiArrowUp, 
    FiType, 
    FiCpu, 
    FiGlobe, 
    FiRefreshCw, 
    FiFilter, 
    FiGitMerge, 
    FiGitBranch, 
  } from 'react-icons/fi';
  
  export const getNodeIcon = (type) => {
    const iconMap = {
      'customInput': FiArrowDown,
      'input': FiArrowDown,
      'customOutput': FiArrowUp,
      'output': FiArrowUp,
      'text': FiType,
      'llm': FiCpu,
      'api': FiGlobe,
      'transform': FiRefreshCw,
      'filter': FiFilter,
      'merge': FiGitMerge,
      'condition': FiGitBranch
    };
    
    return iconMap[type] || FiType; 
  };

  export const draggableNodes = [
        { type: 'customInput', label: 'Input' },
        { type: 'llm', label: 'LLM' },
        { type: 'customOutput', label: 'Output' },
        { type: 'text', label: 'Text' },
        { type: 'api', label: 'API Call' },
        { type: 'transform', label: 'Transform' },
        { type: 'filter', label: 'Filter' },
        { type: 'merge', label: 'Merge' },
        { type: 'condition', label: 'Condition' },
    ];