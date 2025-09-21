import { NODE_CONFIGS } from '../nodes/NodeConfigs';


export const getConfigType = (reactFlowType) => {
  const typeMap = {
    'customInput': 'input',
    'customOutput': 'output',
    'llm': 'llm',
    'text': 'text',
    'api': 'api',
    'transform': 'transform',
    'filter': 'filter',
    'merge': 'merge',
    'condition': 'condition'
  };
  return typeMap[reactFlowType] || reactFlowType;
};

export const getNodeDisplayName = (node, allNodes = []) => {
  const configType = getConfigType(node.type || node.data?.nodeType);
  const nodeConfig = NODE_CONFIGS[configType];
  
  if (!nodeConfig) return node.id;

  // Map of config types to their name fields
  const nameFieldMap = {
    'input': 'inputName',
    'output': 'outputName', 
    'text': 'textName',
    'llm': 'llmName',
    'api': 'apiName',
    'transform': 'transformName',
    'filter': 'filterName',
    'merge': 'mergeName',
    'condition': 'conditionName',
  };
  
  const nameField = nameFieldMap[configType];
  const userGivenName = nameField && node.data?.[nameField];
  
  // If user provided a name, use it
  if (userGivenName && userGivenName.trim()) {
    return userGivenName;
  }
  
  // Otherwise, generate a default name with proper suffix
  return generateDefaultNodeName(configType, allNodes, node.id);
};


// Generates a default name for a node with proper incremental suffix
export const generateDefaultNodeName = (configType, allNodes = [], currentNodeId = null) => {
  const nodeConfig = NODE_CONFIGS[configType];
  if (!nodeConfig) return configType;

  // Get the base name from config 
  const defaultValue = nodeConfig.fields?.find(field => 
    field.key.includes('Name') && field.defaultValue
  )?.defaultValue || configType;
  
  const baseName = defaultValue.replace(/_\d+$/, ''); // Remove existing suffix
  
  // Find all nodes of the same type to determine next suffix
  const sameTypeNodes = allNodes.filter(node => {
    if (currentNodeId && node.id === currentNodeId) return false;
    const nodeConfigType = getConfigType(node.type || node.data?.nodeType);
    return nodeConfigType === configType;
  });

  // Extract existing suffixes and find the next available one
  // Use a helper function to get actual stored names without recursion
  const existingSuffixes = sameTypeNodes.map(node => {
    const displayName = getActualNodeName(node, configType);
    const match = displayName.match(new RegExp(`^${baseName}_(\\d+)$`));
    return match ? parseInt(match[1], 10) : -1;
  }).filter(suffix => suffix >= 0);

  // Find the next available suffix
  let nextSuffix = 0;
  while (existingSuffixes.includes(nextSuffix)) {
    nextSuffix++;
  }

  return `${baseName}_${nextSuffix}`;
};

// Helper function to get the actual stored name without recursion
const getActualNodeName = (node, configType) => {
  // Map of config types to their name fields
  const nameFieldMap = {
    'input': 'inputName',
    'output': 'outputName', 
    'text': 'textName',
    'llm': 'llmName',
    'api': 'apiName',
    'transform': 'transformName',
    'filter': 'filterName',
    'merge': 'mergeName',
    'condition': 'conditionName',
  };
  
  const nameField = nameFieldMap[configType];
  const userGivenName = nameField && node.data?.[nameField];
  
  // If user provided a name, use it
  if (userGivenName && userGivenName.trim()) {
    return userGivenName;
  }
  
  // Otherwise return the base name with suffix 0 as fallback
  // This prevents infinite recursion
  const nodeConfig = NODE_CONFIGS[configType];
  const defaultValue = nodeConfig?.fields?.find(field => 
    field.key.includes('Name') && field.defaultValue
  )?.defaultValue || configType;
  
  const baseName = defaultValue.replace(/_\d+$/, '');
  return `${baseName}_0`;
};
