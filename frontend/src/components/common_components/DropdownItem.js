import React from 'react';

export const DropdownItem = ({
  children,
  icon: Icon,
  onClick,
  className = '',
  ...props
}) => {
  const itemClasses = `px-3 py-2 hover:bg-indigo-50 cursor-pointer border-b border-gray-100 last:border-b-0 flex items-center gap-3 ${className}`.trim();

  return (
    <div className={itemClasses} onClick={onClick} {...props}>
      {Icon && (
        <div className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center">
          <Icon size={16} className="text-gray-600" />
        </div>
      )}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};
