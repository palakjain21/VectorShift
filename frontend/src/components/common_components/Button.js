import React from 'react';

export const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  disabled = false,
  className = '',
  type = 'button',
  ...props
}) => {
  const getVariantClasses = () => {
    const variants = {
      primary: 'bg-primary-800 text-white hover:bg-primary-900 focus:ring-primary-500',
      secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
      success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 disabled:bg-gray-500',
      icon: 'p-1 rounded-full hover:bg-gray-200 transition-colors duration-200',
      iconDanger: 'p-1 rounded-full hover:bg-red-100 hover:text-red-600 text-primary-600 transition-colors duration-200',
      small: 'w-4 h-4 bg-primary-300 rounded-full flex items-center justify-center text-primary-900 text-xs hover:bg-gray-500'
    };
    return variants[variant] || variants.primary;
  };

  const getSizeClasses = () => {
    const sizes = {
      sm: 'px-2 py-1 text-xs',
      md: 'px-3 py-2 text-sm',
      lg: 'px-4 py-3 text-base'
    };
    return sizes[size] || sizes.md;
  };

  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200';
  
  const variantClasses = getVariantClasses();
  const sizeClasses = variant === 'icon' || variant === 'iconDanger' || variant === 'small' ? '' : getSizeClasses();
  
  const buttonClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${className}`.trim();

  const renderContent = () => {
    if (!Icon) return children;
    
    if (iconPosition === 'right') {
      return (
        <>
          {children && <span>{children}</span>}
          <Icon className={children ? 'ml-2' : ''} size={variant === 'small' ? 12 : 16} />
        </>
      );
    }
    
    return (
      <>
        <Icon className={children ? 'mr-2' : ''} size={variant === 'small' ? 12 : variant === 'icon' || variant === 'iconDanger' ? 14 : 16} />
        {children && <span>{children}</span>}
      </>
    );
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      {...props}
    >
      {renderContent()}
    </button>
  );
};
