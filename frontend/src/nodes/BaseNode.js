import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { getNodeIcon } from '../utils/utils';
import { VariableInput } from '../components/VariableInput';
import { FiX } from 'react-icons/fi';
import { useStore } from '../store';

export const BaseNode = ({ 
  id, 
  data, 
  config,
  onDataChange 
}) => {
  const [nodeData, setNodeData] = useState(data || {});
  const deleteNode = useStore((state) => state.deleteNode);

  const getColorClasses = (color) => {
    const colorMap = {
      primary: {
        bg: 'bg-primary-100',
        bgDark: 'bg-primary-800',
        text: 'text-primary-800',
        textLight: 'text-primary-600'
      },
    };
    return colorMap[color];
  };

  const colors = getColorClasses(config?.color || 'primary');

  const IconComponent = getNodeIcon(config?.type);

  const handleFieldChange = (fieldKey, value) => {
    const newData = { ...nodeData, [fieldKey]: value };
    setNodeData(newData);
    if (onDataChange) {
      onDataChange(newData);
    }
  };

  const handleDeleteNode = () => {
    deleteNode(id);
  };

  const renderField = (field) => {
    const { key, type, label, options, placeholder, required } = field;
    const value = nodeData[key] || field.defaultValue || '';

    const commonClasses = "w-full text-xs border border-primary-200 rounded px-2 py-1 bg-white text-primary-700 focus:outline-none focus:ring-1 focus:ring-primary-500";

    switch (type) {
      case 'select':
        return (
          <div key={key}>
            <label className="block text-xs text-primary-700 mb-1">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            <select
              value={value}
              onChange={(e) => handleFieldChange(key, e.target.value)}
              className={commonClasses}
            >
              {options?.map(option => (
                <option key={option.value || option} value={option.value || option}>
                  {option.label || option}
                </option>
              ))}
            </select>
          </div>
        );

      case 'textarea':
        return (
          <div key={key}>
            <label className="block text-xs text-primary-700 mb-1">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            <VariableInput
              value={value}
              onChange={(newValue) => handleFieldChange(key, newValue)}
              placeholder={placeholder}
              className={`${commonClasses} resize-none`}
              type="textarea"
              rows={3}
              currentNodeId={id}
            />
          </div>
        );

      case 'number':
        return (
          <div key={key}>
            <label className="block text-xs text-primary-700 mb-1">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
              type="number"
              value={value}
              onChange={(e) => handleFieldChange(key, e.target.value)}
              placeholder={placeholder}
              className={commonClasses}
            />
          </div>
        );

      case 'file':
        return (
          <div key={key}>
            <label className="block text-xs text-primary-700 mb-1">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
              type="file"
              onChange={(e) => handleFieldChange(key, e.target.files[0]?.name || '')}
              className={`${commonClasses} file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-primary-100 file:text-primary-700 hover:file:bg-primary-200`}
              accept={field.accept}
            />
          </div>
        );

      default: 
        return (
          <div key={key}>
            <label className="block text-xs text-primary-700 mb-1">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            <VariableInput
              value={value}
              onChange={(newValue) => handleFieldChange(key, newValue)}
              placeholder={placeholder}
              className={commonClasses}
              type="text"
              currentNodeId={id}
            />
          </div>
        );
    }
  };

  const renderHandle = (handle, index) => {
    const { type, position, id: handleId, label, style } = handle;
    const positionMap = {
      'left': Position.Left,
      'right': Position.Right,
      'top': Position.Top,
      'bottom': Position.Bottom
    };

    return (
      <Handle
        key={handleId || `${type}-${index}`}
        type={type}
        position={positionMap[position]}
        id={handleId || `${id}-${type}-${index}`}
        className="w-3 h-3 bg-primary-800 border-2 border-white"
        style={{
          top: style?.top || '50%',
          left: style?.left,
          right: style?.right,
          transform: style?.transform || 'translateY(-50%)',
          ...style
        }}
      />
    );
  };

  return (
    <div className={`w-64 bg-white border border-primary-300 rounded-lg shadow-sm ${config?.className || ''}`}>
      {config?.inputs?.map((handle, index) => renderHandle(handle, index))}
      
      <div className={`${colors.bg} px-3 py-2 rounded-t-lg border-b border-primary-300 relative`}>
        <div className="flex items-center gap-2">
          <IconComponent  size={14}  className='text-primary-900'/>

          <span className={`${colors.text} font-medium text-sm`}>
            {config?.title || 'Node'}
          </span>
        </div>
        <p className={`${colors.textLight} text-xs mt-1`}>
          {config?.description || 'Node description'}
        </p>
        
        <button
          onClick={handleDeleteNode}
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-red-100 hover:text-red-600 text-primary-600 transition-colors duration-200"
          title="Delete node"
        >
          <FiX size={14} />
        </button>
      </div>
      
      <div className="p-3 space-y-3">
        {config?.fields?.map(renderField)}
        {config?.customContent && config.customContent(nodeData, handleFieldChange)}
      </div>
      
      {config?.outputs?.map((handle, index) => renderHandle(handle, index))}
    </div>
  );
};
