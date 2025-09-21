
import { BaseNode } from './BaseNode';
import { NODE_CONFIGS } from './NodeConfigs';

export const createNode = (nodeType) => {
  const config = NODE_CONFIGS[nodeType];
  
  if (!config) {
    console.warn(`Node type "${nodeType}" not found in configurations`);
    return null;
  }

  return ({ id, data, onDataChange }) => (
    <BaseNode
      id={id}
      data={data}
      config={config}
      onDataChange={onDataChange}
    />
  );
};

export const getAvailableNodeTypes = () => {
  return Object.keys(NODE_CONFIGS);
};

export const getNodeConfig = (nodeType) => {
  return NODE_CONFIGS[nodeType];
};

export const createAllNodes = () => {
  const nodes = {};
  Object.keys(NODE_CONFIGS).forEach(nodeType => {
    nodes[nodeType] = createNode(nodeType);
  });
  return nodes;
};

export const InputNode = createNode('input');
export const OutputNode = createNode('output');
export const TextNode = createNode('text');
export const LLMNode = createNode('llm');
export const APINode = createNode('api');
export const TransformNode = createNode('transform');
export const FilterNode = createNode('filter');
export const MergeNode = createNode('merge');
export const ConditionNode = createNode('condition');
