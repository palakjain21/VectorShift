import { createNode } from './NodeFactory';

// 1. Database Node - Execute SQL queries
export const DatabaseNode = createNode('database');

// 2. API Node - Make HTTP requests
export const APINode = createNode('api');

// 3. Transform Node - Transform data with JavaScript
export const TransformNode = createNode('transform');

// 4. Filter Node - Filter data based on conditions
export const FilterNode = createNode('filter');

// 5. Merge Node - Combine data from multiple sources
export const MergeNode = createNode('merge');

// 6. Condition Node - Check if a condition is met
export const ConditionNode = createNode('condition');

// Export all example nodes
export const EXAMPLE_NODES = {
  DatabaseNode,
  APINode,
  TransformNode,
  FilterNode,
  MergeNode,
  ConditionNode
};
