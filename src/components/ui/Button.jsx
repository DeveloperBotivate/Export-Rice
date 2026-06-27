import React from 'react';

export const Button = ({ variant = 'primary', size = 'default', className = '', children, ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90 shadow-sm',
    secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200',
    outline: 'border border-slate-200 bg-transparent hover:bg-slate-100 text-slate-700',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-700',
    destructive: 'bg-destructive text-white hover:bg-destructive/90 shadow-sm',
    destructiveOutline: 'border border-destructive/20 text-destructive hover:bg-destructive/10'
  };

  const sizes = {
    sm: 'h-8 px-3 text-xs',
    default: 'h-10 px-4 py-2 text-sm',
    lg: 'h-12 px-8 text-base',
    icon: 'h-9 w-9 p-1.5'
  };

  return (
    <button 
      className={baseStyles + " " + variants[variant] + " " + sizes[size] + " " + className}
      {...props}
    >
      {children}
    </button>
  );
};
