import React from 'react';

export const Table = ({ className = '', children, ...props }) => (
  <div className="w-full overflow-auto">
    <table className={"w-full text-sm text-left " + className} {...props}>
      {children}
    </table>
  </div>
);

export const TableHeader = ({ className = '', children, ...props }) => (
  <thead className={"bg-slate-50 text-slate-600 font-medium border-b border-slate-200 " + className} {...props}>
    {children}
  </thead>
);

export const TableBody = ({ className = '', children, ...props }) => (
  <tbody className={"divide-y divide-slate-100 " + className} {...props}>
    {children}
  </tbody>
);

export const TableRow = ({ className = '', children, ...props }) => (
  <tr className={"hover:bg-slate-50 transition-colors " + className} {...props}>
    {children}
  </tr>
);

export const TableHead = ({ className = '', children, ...props }) => (
  <th className={"px-6 py-4 align-middle font-medium text-slate-600 " + className} {...props}>
    {children}
  </th>
);

export const TableCell = ({ className = '', children, ...props }) => (
  <td className={"px-6 py-4 align-middle text-slate-700 " + className} {...props}>
    {children}
  </td>
);
