import React from 'react';

export const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => {
  const getVariantClasses = () => {
    const variants = {
      primary: 'bg-primary-100 text-primary-800',
      secondary: 'bg-secondary-100 text-secondary-600',
      success: 'bg-success-100 text-success-800',
      error: 'bg-error-100 text-error-800'
    };
    return variants[variant] || variants.success;
  };

  const getSizeClasses = () => {
    const sizes = {
      sm: 'px-2 py-1 text-xs',
      md: 'px-3 py-1 text-xs',
      lg: 'px-3 py-1 text-sm'
    };
    return sizes[size] || sizes.md;
  };

  const baseClasses = 'inline-flex items-center font-medium rounded-full';
  const variantClasses = getVariantClasses();
  const sizeClasses = getSizeClasses();
  
  const badgeClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${className}`.trim();

  return (
    <span className={badgeClasses} {...props}>
      {children}
    </span>
  );
};
