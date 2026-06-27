import React from 'react';

export const Card = ({ className = '', children, ...props }) => (
  <div className={"bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden " + className} {...props}>
    {children}
  </div>
);

export const CardHeader = ({ className = '', children, ...props }) => (
  <div className={"p-6 flex flex-col space-y-1.5 " + className} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ className = '', children, ...props }) => (
  <h3 className={"font-semibold leading-none tracking-tight text-slate-800 " + className} {...props}>
    {children}
  </h3>
);

export const CardDescription = ({ className = '', children, ...props }) => (
  <p className={"text-sm text-slate-500 " + className} {...props}>
    {children}
  </p>
);

export const CardContent = ({ className = '', children, ...props }) => (
  <div className={"p-6 pt-0 " + className} {...props}>
    {children}
  </div>
);
