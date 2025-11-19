import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = ''
}) => {
  const baseClasses = 'font-montserrat font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'text-white shadow-lg transform hover:scale-105 active:scale-95' + 
             ' bg-gradient-to-r from-blue via-sky-blue to-dark-blue' +
             ' hover:from-dark-blue hover:via-blue hover:to-sky-blue' +
             ' focus:ring-blue focus:ring-opacity-50',
    secondary: 'bg-slate text-dark-blue border-2 border-slate-200' +
              ' hover:bg-slate-200 hover:border-blue focus:ring-blue focus:ring-opacity-30',
    outline: 'border-2 border-blue text-blue hover:bg-blue hover:text-white' +
            ' focus:ring-blue focus:ring-opacity-50 transform hover:scale-105 active:scale-95'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
    >
      {children}
    </button>
  );
};