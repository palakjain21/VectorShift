import React from 'react';

export const Card = ({
  children,
  variant = 'default',
  className = '',
  ...props
}) => {
  const getVariantClasses = () => {
    const variants = {
      primary: 'bg-white border border-primary-300 rounded-lg shadow-sm',
      modal: 'bg-white border-2 rounded-xl shadow-2xl'
    };
    return variants[variant] || variants.primary;
  };

  const cardClasses = `${getVariantClasses()} ${className}`.trim();

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

export const CardHeader = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const getVariantClasses = () => {
    const variants = {
      primary: 'bg-primary-100 px-3 py-2 rounded-t-lg border-b border-primary-300',
      modal: 'flex items-center justify-between p-6 border-b border-gray-200'
    };
    return variants[variant] || variants.primary;
  };

  const headerClasses = `${getVariantClasses()} ${className}`.trim();

  return (
    <div className={headerClasses} {...props}>
      {children}
    </div>
  );
};

export const CardBody = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`p-4 ${className}`.trim()} {...props}>
      {children}
    </div>
  );
};
