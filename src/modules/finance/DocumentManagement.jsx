import React from 'react';
import { FileText, Download, Share2, Printer } from 'lucide-react';
import DataTable from '../../components/DataTable';
import { usePagination } from '../../hooks/usePagination';
const dummyDocs = [];

export const DocumentManagement = () => {
  const docs = dummyDocs;

  const pagination = usePagination(docs, 10);

  const columns = [
    { header: 'Document Type', cell: (row) => <span className="font-medium flex items-center gap-2"><FileText size={16} className="text-primary"/> {row.type}</span> },
    { header: 'Reference', cell: (row) => <span className="text-slate-600">{row.ref}</span> },
    { header: 'Generated On', cell: (row) => <span className="text-slate-600">{row.date}</span> },
    { header: 'Actions', className: 'text-right', cell: (row) => (
      <div className="flex justify-end gap-3">
        <button className="text-slate-400 hover:text-primary"><Download size={18}/></button>
        <button className="text-slate-400 hover:text-primary"><Printer size={18}/></button>
        <button className="text-slate-400 hover:text-primary"><Share2 size={18}/></button>
      </div>
    )}
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-800">Document Management</h2>
        <p className="text-sm text-slate-500">Auto-generate and manage letterhead documents</p>
      </div>

      <Card>
        <DataTable 
          columns={columns} 
          data={pagination.paginatedData} 
          {...pagination}
        />
      </Card>
    </div>
  );
};

import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';