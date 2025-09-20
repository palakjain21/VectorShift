# Node Abstraction System

This directory contains a reusable node abstraction system that eliminates code duplication and makes it easy to create new nodes.

## Architecture

### Core Components

1. **`BaseNode.js`** - The main abstraction component that handles:
   - Common layout structure (header, content, handles)
   - Field rendering for different input types
   - Handle positioning and styling
   - State management

2. **`NodeConfigs.js`** - Configuration objects that define:
   - Node metadata (title, description, color)
   - Input/output handles
   - Form fields with types and validation
   - Custom styling options

3. **`NodeFactory.js`** - Factory functions that:
   - Create node components from configurations
   - Provide utilities for node management
   - Export pre-built node components

4. **`ExampleNodes.js`** - 6 example nodes demonstrating the abstraction

## Usage

### Creating a New Node

Instead of writing a full component, just add a configuration to `NodeConfigs.js`:

```javascript
myNewNode: {
  type: 'myNewNode',
  title: 'My New Node',
  description: 'Does something cool',
  color: 'blue',
  fields: [
    {
      key: 'inputField',
      type: 'text',
      label: 'Input Field',
      required: true
    }
  ],
  inputs: [
    { type: 'target', position: 'left', id: 'data' }
  ],
  outputs: [
    { type: 'source', position: 'right', id: 'result' }
  ]
}
```

Then create the component:
```javascript
export const MyNewNode = createNode('myNewNode');
```

### Using Existing Nodes

```javascript
import { DatabaseNode, APINode, TransformNode } from './nodes';

// Use in your React Flow
<DatabaseNode id="db-1" data={{ query: "SELECT * FROM users" }} />
```

## Field Types

- `text` - Text input
- `textarea` - Multi-line text input
- `select` - Dropdown selection
- `number` - Numeric input
- `file` - File upload input

## Handle Types

- `target` - Input handle (left side)
- `source` - Output handle (right side)

## Benefits

1. **90% less code** - New nodes require only configuration
2. **Consistent styling** - All nodes inherit theme updates
3. **Easy maintenance** - Changes to BaseNode affect all nodes
4. **Type safety** - Configuration-driven approach reduces errors
5. **Reusability** - Field components can be reused across nodes

## Example Nodes Created

1. **Database Node** - Execute SQL queries
2. **API Node** - Make HTTP requests
3. **Transform Node** - Transform data with JavaScript
4. **Filter Node** - Filter data based on conditions
5. **Merge Node** - Combine data from multiple sources
6. **Condition Node** - Check if data meets a certain condition
