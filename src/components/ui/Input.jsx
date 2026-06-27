import React from 'react';

export const Input = ({ className = '', ...props }) => {
  return (
    <input
      className={"flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all " + className}
      {...props}
    />
  );
};

export const Select = ({ className = '', children, ...props }) => {
  return (
    <select
      className={"flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all " + className}
      {...props}
    >
      {children}
    </select>
  );
};

export const Textarea = ({ className = '', ...props }) => {
  return (
    <textarea
      className={"flex min-h-[80px] w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all " + className}
      {...props}
    />
  );
};

export const Label = ({ className = '', children, ...props }) => {
  return (
    <label
      className={"text-sm font-medium leading-none text-slate-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 " + className}
      {...props}
    >
      {children}
    </label>
  );
};
