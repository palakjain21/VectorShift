import React from 'react';

export const StatCard = ({
  icon: Icon,
  iconVariant = 'primary',
  title,
  subtitle,
  value,
  valueColor = 'text-primary-600',
  children,
  className = '',
  ...props
}) => {
  const cardClasses = `p-3 bg-white rounded-lg border border-gray-200 shadow-sm ${className}`.trim();

  const getIconBgColor = () => {
    const variants = {
      primary: 'bg-primary-100',
      secondary: 'bg-secondary-100',
      success: 'bg-success-100',
      error: 'bg-error-100'
    };
    return variants[iconVariant] || variants.primary;
  };

  const getIconTextColor = () => {
    const variants = {
      primary: 'text-primary-600',
      secondary: 'text-secondary-600',
      success: 'text-success-600',
      error: 'text-error-800'
    };
    return variants[iconVariant] || variants.primary;
  };

  return (
    <div className={cardClasses} {...props}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 ${getIconBgColor()} rounded-lg`}>
            <Icon className={`w-4 h-4 ${getIconTextColor()}`} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{title}</p>
            {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
          </div>
        </div>
        <div className="text-right">
          {value && <p className={`text-2xl font-bold ${valueColor}`}>{value}</p>}
          {children}
        </div>
      </div>
    </div>
  );
};
