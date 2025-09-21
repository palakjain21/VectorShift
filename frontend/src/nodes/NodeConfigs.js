export const NODE_CONFIGS = {
  input: {
    type: 'input',
    title: 'Input',
    description: 'Pass data of different types from your workflow.',
    color: 'primary',
    fields: [
      {
        key: 'inputName',
        type: 'text',
        label: 'Name',
        defaultValue: 'input_1',
        required: true
      },
      {
        key: 'inputType',
        type: 'select',
        label: 'Type',
        options: [
          { value: 'Text', label: 'Text' },
          { value: 'File', label: 'File' }
        ],
        defaultValue: 'Text'
      },
      {
        key: 'fileInput',
        type: 'file',
        label: 'Upload File',
        accept: '.txt,.pdf,.doc,.docx',
        required: false,
        showWhen: {
          field: 'inputType',
          value: 'File'
        }
      }
    ],
    outputs: [
      {
        type: 'source',
        position: 'right',
        id: 'value'
      }
    ]
  },

  output: {
    type: 'output',
    title: 'Output',
    description: 'Output data of different types from your workflow.',
    color: 'primary',
    fields: [
      {
        key: 'outputName',
        type: 'text',
        label: 'Name',
        defaultValue: 'output_1',
        required: true
      },
      {
        key: 'outputType',
        type: 'select',
        label: 'Type',
        options: [
          { value: 'Text', label: 'Text' },
          { value: 'Image', label: 'Image' }
        ],
        defaultValue: 'Text'
      }
    ],
    inputs: [
      {
        type: 'target',
        position: 'left',
        id: 'value'
      }
    ]
  },

  text: {
    type: 'text',
    title: 'Text',
    description: 'Process and transform text data in your workflow.',
    color: 'primary',
    fields: [
      {
        key: 'textName',
        type: 'text',
        label: 'Name',
        defaultValue: 'text_1',
        required: true
      },
      {
        key: 'text',
        type: 'text',
        label: 'Text',
        defaultValue: '{{input}}',
        required: true
      }
    ],
    outputs: [
      {
        type: 'source',
        position: 'right',
        id: 'output'
      }
    ]
  },

  llm: {
    type: 'llm',
    title: 'LLM',
    description: 'Generate text using large language models.',
    color: 'primary',
    fields: [
      {
        key: 'llmName',
        type: 'text',
        label: 'Name',
        defaultValue: 'llm_1',
        required: true
      },
      {
        key: 'model',
        type: 'select',
        label: 'Model',
        options: [
          { value: 'gpt-4', label: 'GPT-4' },
          { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
          { value: 'claude-3', label: 'Claude 3' }
        ],
        defaultValue: 'gpt-4'
      },
      {
        key: 'knowledgeBase',
        type: 'select',
        label: 'Knowledge Base',
        options: [
          { value: 'company', label: 'Company Knowledge Base' },
          { value: 'customer', label: 'Customer Knowledge Base' },
        ],
        required: false
      },
      {
        key: 'temperature',
        type: 'number',
        label: 'Temperature',
        defaultValue: 0.7,
        placeholder: '0.0 - 2.0'
      }
    ],
    inputs: [
      {
        type: 'target',
        position: 'left',
        id: 'system',
        style: { top: '33%' }
      },
      {
        type: 'target',
        position: 'left',
        id: 'prompt',
        style: { top: '67%' }
      }
    ],
    outputs: [
      {
        type: 'source',
        position: 'right',
        id: 'response'
      }
    ]
  },
  api: {
    type: 'api',
    title: 'API Call',
    description: 'Make HTTP requests to external APIs.',
    color: 'primary',
    fields: [
      {
        key: 'apiName',
        type: 'text',
        label: 'Name',
        defaultValue: 'api_1',
        required: true
      },
      {
        key: 'url',
        type: 'text',
        label: 'URL',
        placeholder: 'https://api.example.com/data',
        required: true
      },
      {
        key: 'method',
        type: 'select',
        label: 'Method',
        options: ['GET', 'POST', 'PUT', 'DELETE'],
        defaultValue: 'GET'
      },
      {
        key: 'headers',
        type: 'textarea',
        label: 'Headers (JSON)',
        placeholder: '{"Authorization": "Bearer token"}'
      }
    ],
    inputs: [
      {
        type: 'target',
        position: 'left',
        id: 'data'
      }
    ],
    outputs: [
      {
        type: 'source',
        position: 'right',
        id: 'response'
      }
    ]
  },

  transform: {
    type: 'transform',
    title: 'Transform',
    description: 'Transform data using JavaScript expressions.',
    color: 'primary',
    fields: [
      {
        key: 'transformName',
        type: 'text',
        label: 'Name',
        defaultValue: 'transform_1',
        required: true
      },
      {
        key: 'expression',
        type: 'textarea',
        label: 'JavaScript Expression',
        placeholder: 'data.map(item => item.name.toUpperCase())',
        required: true
      },
      {
        key: 'outputType',
        type: 'select',
        label: 'Output Type',
        options: [
          { value: 'array', label: 'Array' },
          { value: 'object', label: 'Object' },
          { value: 'string', label: 'String' }
        ],
        defaultValue: 'array'
      }
    ],
    inputs: [
      {
        type: 'target',
        position: 'left',
        id: 'data'
      }
    ],
    outputs: [
      {
        type: 'source',
        position: 'right',
        id: 'result'
      }
    ]
  },

  filter: {
    type: 'filter',
    title: 'Filter',
    description: 'Filter data based on conditions.',
    color: 'primary',
    fields: [
      {
        key: 'filterName',
        type: 'text',
        label: 'Name',
        defaultValue: 'filter_1',
        required: true
      },
      {
        key: 'condition',
        type: 'textarea',
        label: 'Filter Condition',
        placeholder: 'item.age > 18 && item.active === true',
        required: true
      },
      {
        key: 'caseSensitive',
        type: 'select',
        label: 'Case Sensitive',
        options: [
          { value: true, label: 'Yes' },
          { value: false, label: 'No' }
        ],
        defaultValue: false
      }
    ],
    inputs: [
      {
        type: 'target',
        position: 'left',
        id: 'data'
      }
    ],
    outputs: [
      {
        type: 'source',
        position: 'right',
        id: 'filtered'
      }
    ]
  },

  merge: {
    type: 'merge',
    title: 'Merge',
    description: 'Combine data from multiple sources.',
    color: 'primary',
    fields: [
      {
        key: 'mergeName',
        type: 'text',
        label: 'Name',
        defaultValue: 'merge_1',
        required: true
      },
      {
        key: 'strategy',
        type: 'select',
        label: 'Merge Strategy',
        options: [
          { value: 'concat', label: 'Concatenate' },
          { value: 'union', label: 'Union' },
          { value: 'intersection', label: 'Intersection' }
        ],
        defaultValue: 'concat'
      },
      {
        key: 'keyField',
        type: 'text',
        label: 'Key Field',
        placeholder: 'id'
      }
    ],
    inputs: [
      {
        type: 'target',
        position: 'left',
        id: 'input1',
        style: { top: '25%' }
      },
      {
        type: 'target',
        position: 'left',
        id: 'input2',
        style: { top: '75%' }
      }
    ],
    outputs: [
      {
        type: 'source',
        position: 'right',
        id: 'merged'
      }
    ]
  },
  condition: {
    type: 'condition',
    title: 'Condition',
    description: 'Check if a condition is met.',
    color: 'primary',
    fields: [
      {
        key: 'conditionName',
        type: 'text',
        label: 'Name',
        defaultValue: 'condition_1',
        required: true
      },
      {
        key: 'condition',
        type: 'textarea',
        label: 'Condition',
        placeholder: 'if(item.active === true) return item.name  else  return item.age ',
        required: true
      }
    ],
    inputs: [
      {
        type: 'target',
        position: 'left',
        id: 'condition'
      }
    ],
    outputs: [
      {
        type: 'source',
        position: 'right',
        id: 'result'
      }
    ]
  }
};