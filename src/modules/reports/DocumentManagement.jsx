import React, { useState } from 'react';
import { Search, FileText, Download, Eye, Filter, Upload, Tag, Calendar, User, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import DataTable from '../../components/DataTable';
import { usePagination } from '../../hooks/usePagination';

const DOC_TYPES = ['All', 'Purchase Order', 'Invoice', 'Export Contract', 'Packing List', 'Bill of Lading', 'Certificate of Origin', 'E-Way Bill', 'Delivery Challan', 'Lab Report', 'Gate Pass', 'Production Report', 'Bank Realization Certificate', 'LC Document', 'Insurance'];

const DOCS = [
  // Purchase Execution
  { id: 1, docId: 'DOC-0001', docName: 'Purchase Order — PR-0001', docType: 'Purchase Order', module: 'Purchase Execution', refId: 'PO-0001', uploadedBy: 'Ramesh Verma', uploadDate: '2026-06-01', expiryDate: null, status: 'Active', size: '245 KB', tags: ['PO', 'Basmati', 'Karnal'] },
  { id: 2, docId: 'DOC-0002', docName: 'Purchase Challan — PR-0002', docType: 'Invoice', module: 'Purchase Execution', refId: 'PCH-0002', uploadedBy: 'Ramesh Verma', uploadDate: '2026-06-02', expiryDate: null, status: 'Active', size: '180 KB', tags: ['Challan'] },
  { id: 3, docId: 'DOC-0003', docName: 'Lab Quality Report — LAB-001', docType: 'Lab Report', module: 'Purchase Execution', refId: 'LAB-0001', uploadedBy: 'Dr. Sunil Rao', uploadDate: '2026-06-02', expiryDate: null, status: 'Active', size: '320 KB', tags: ['Lab', 'Quality', 'Moisture'] },
  { id: 4, docId: 'DOC-0004', docName: 'Gate Pass — PR-0003', docType: 'Gate Pass', module: 'Purchase Execution', refId: 'GP-0003', uploadedBy: 'Security Staff', uploadDate: '2026-06-03', expiryDate: null, status: 'Active', size: '120 KB', tags: ['Gate'] },
  { id: 5, docId: 'DOC-0005', docName: 'Purchase Order — PR-0005', docType: 'Purchase Order', module: 'Purchase Execution', refId: 'PO-0005', uploadedBy: 'Ramesh Verma', uploadDate: '2026-06-04', expiryDate: null, status: 'Active', size: '260 KB', tags: ['PO'] },
  // Sales
  { id: 6, docId: 'DOC-0006', docName: 'Sales Quotation — SO-0001', docType: 'Invoice', module: 'Sales', refId: 'SO-0001', uploadedBy: 'Priya Sharma', uploadDate: '2026-06-05', expiryDate: '2026-07-05', status: 'Active', size: '198 KB', tags: ['Quotation', 'Domestic'] },
  { id: 7, docId: 'DOC-0007', docName: 'Sales Invoice — SO-0003', docType: 'Invoice', module: 'Sales', refId: 'SI-0003', uploadedBy: 'Priya Sharma', uploadDate: '2026-06-06', expiryDate: null, status: 'Active', size: '215 KB', tags: ['Invoice'] },
  { id: 8, docId: 'DOC-0008', docName: 'Delivery Challan — DO-0001', docType: 'Delivery Challan', module: 'Dispatch', refId: 'DO-0001', uploadedBy: 'Mohan Singh', uploadDate: '2026-06-07', expiryDate: null, status: 'Active', size: '165 KB', tags: ['Dispatch', 'Challan'] },
  // E-Way Bills
  { id: 9, docId: 'DOC-0009', docName: 'E-Way Bill — DO-0001', docType: 'E-Way Bill', module: 'Dispatch', refId: 'EWB-0001', uploadedBy: 'Mohan Singh', uploadDate: '2026-06-07', expiryDate: '2026-06-09', status: 'Expired', size: '90 KB', tags: ['EWB', 'GST'] },
  { id: 10, docId: 'DOC-0010', docName: 'E-Way Bill — DO-0002', docType: 'E-Way Bill', module: 'Dispatch', refId: 'EWB-0002', uploadedBy: 'Mohan Singh', uploadDate: '2026-06-08', expiryDate: '2026-06-10', status: 'Active', size: '90 KB', tags: ['EWB'] },
  // Export
  { id: 11, docId: 'DOC-0011', docName: 'Export Contract — EC-0001', docType: 'Export Contract', module: 'Export Management', refId: 'EC-0001', uploadedBy: 'Anil Export Team', uploadDate: '2026-06-09', expiryDate: '2026-12-09', status: 'Active', size: '520 KB', tags: ['Export', 'UAE', 'FOB'] },
  { id: 12, docId: 'DOC-0012', docName: 'Packing List — EC-0001', docType: 'Packing List', module: 'Export Management', refId: 'PL-0001', uploadedBy: 'Anil Export Team', uploadDate: '2026-06-10', expiryDate: null, status: 'Active', size: '310 KB', tags: ['Packing', 'Export'] },
  { id: 13, docId: 'DOC-0013', docName: 'Bill of Lading — EC-0001', docType: 'Bill of Lading', module: 'Export Management', refId: 'BL-0001', uploadedBy: 'Shipping Agent', uploadDate: '2026-06-15', expiryDate: null, status: 'Active', size: '480 KB', tags: ['BL', 'Shipping'] },
  { id: 14, docId: 'DOC-0014', docName: 'Certificate of Origin — EC-0001', docType: 'Certificate of Origin', module: 'Export Management', refId: 'CO-0001', uploadedBy: 'Chamber of Commerce', uploadDate: '2026-06-15', expiryDate: null, status: 'Active', size: '290 KB', tags: ['COO', 'Export'] },
  { id: 15, docId: 'DOC-0015', docName: 'LC Document — EC-0002', docType: 'LC Document', module: 'Export Management', refId: 'LC-0002', uploadedBy: 'HDFC Bank', uploadDate: '2026-06-11', expiryDate: '2026-09-11', status: 'Active', size: '640 KB', tags: ['LC', 'Payment'] },
  { id: 16, docId: 'DOC-0016', docName: 'BRC — EC-0001', docType: 'Bank Realization Certificate', module: 'Finance & Payments', refId: 'BRC-0001', uploadedBy: 'Finance Head', uploadDate: '2026-06-20', expiryDate: null, status: 'Active', size: '175 KB', tags: ['BRC', 'Forex'] },
  { id: 17, docId: 'DOC-0017', docName: 'Insurance Certificate — EC-0003', docType: 'Insurance', module: 'Export Management', refId: 'INS-0003', uploadedBy: 'Insurance Broker', uploadDate: '2026-06-12', expiryDate: '2026-12-12', status: 'Active', size: '340 KB', tags: ['Insurance'] },
  { id: 18, docId: 'DOC-0018', docName: 'Production Report — PRD-0001', docType: 'Production Report', module: 'Manufacturing', refId: 'PRD-0001', uploadedBy: 'Mill Supervisor', uploadDate: '2026-06-13', expiryDate: null, status: 'Active', size: '420 KB', tags: ['Production'] },
  { id: 19, docId: 'DOC-0019', docName: 'Gate Pass — DO-0005', docType: 'Gate Pass', module: 'Dispatch', refId: 'DO-0005', uploadedBy: 'Security Staff', uploadDate: '2026-06-14', expiryDate: null, status: 'Active', size: '110 KB', tags: ['Gate', 'Dispatch'] },
  { id: 20, docId: 'DOC-0020', docName: 'LC Document — EC-0004', docType: 'LC Document', module: 'Export Management', refId: 'LC-0004', uploadedBy: 'SBI Bank', uploadDate: '2026-06-16', expiryDate: '2026-08-16', status: 'Expiring Soon', size: '590 KB', tags: ['LC'] },
  { id: 21, docId: 'DOC-0021', docName: 'E-Way Bill — DO-0008', docType: 'E-Way Bill', module: 'Dispatch', refId: 'EWB-0008', uploadedBy: 'Mohan Singh', uploadDate: '2026-06-17', expiryDate: '2026-06-25', status: 'Expired', size: '88 KB', tags: ['EWB'] },
  { id: 22, docId: 'DOC-0022', docName: 'Delivery Challan — DO-0010', docType: 'Delivery Challan', module: 'Dispatch', refId: 'DO-0010', uploadedBy: 'Mohan Singh', uploadDate: '2026-06-18', expiryDate: null, status: 'Active', size: '155 KB', tags: ['Dispatch'] },
  { id: 23, docId: 'DOC-0023', docName: 'Packing List — EC-0003', docType: 'Packing List', module: 'Export Management', refId: 'PL-0003', uploadedBy: 'Anil Export Team', uploadDate: '2026-06-19', expiryDate: null, status: 'Active', size: '300 KB', tags: ['Packing'] },
  { id: 24, docId: 'DOC-0024', docName: 'Bill of Lading — EC-0002', docType: 'Bill of Lading', module: 'Export Management', refId: 'BL-0002', uploadedBy: 'Shipping Agent', uploadDate: '2026-06-20', expiryDate: null, status: 'Active', size: '465 KB', tags: ['BL'] },
  { id: 25, docId: 'DOC-0025', docName: 'Lab Report — LAB-012', docType: 'Lab Report', module: 'Purchase Execution', refId: 'LAB-0012', uploadedBy: 'Dr. Sunil Rao', uploadDate: '2026-06-21', expiryDate: null, status: 'Active', size: '290 KB', tags: ['Lab'] },
];

const MODULE_COLORS = {
  'Purchase Execution': 'bg-amber-100 text-amber-700',
  'Sales': 'bg-blue-100 text-blue-700',
  'Dispatch': 'bg-indigo-100 text-indigo-700',
  'Export Management': 'bg-emerald-100 text-emerald-700',
  'Finance & Payments': 'bg-purple-100 text-purple-700',
  'Manufacturing': 'bg-orange-100 text-orange-700',
};
const STATUS_COLORS = {
  'Active': 'bg-green-100 text-green-700',
  'Expired': 'bg-red-100 text-red-700',
  'Expiring Soon': 'bg-amber-100 text-amber-700',
};

const StatCard = ({ icon: Icon, label, value, color, sub }) => (
  <div className="bg-white rounded-xl border border-slate-200 p-5 flex items-start gap-4 shadow-sm">
    <div className={`p-3 rounded-lg ${color}`}><Icon size={20} className="text-white" /></div>
    <div><p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</p><p className="text-2xl font-bold text-slate-800 mt-0.5">{value}</p>{sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}</div>
  </div>
);

export const DocumentManagement = () => {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const filtered = DOCS.filter(d => {
    const matchSearch = Object.values(d).some(v => String(v).toLowerCase().includes(search.toLowerCase()));
    const matchType = filterType === 'All' || d.docType === filterType;
    const matchStatus = filterStatus === 'All' || d.status === filterStatus;
    return matchSearch && matchType && matchStatus;
  });

  const pagination = usePagination(filtered, 10);

  const activeCount = DOCS.filter(d => d.status === 'Active').length;
  const expiredCount = DOCS.filter(d => d.status === 'Expired').length;
  const expiringCount = DOCS.filter(d => d.status === 'Expiring Soon').length;
  const exportDocs = DOCS.filter(d => d.module === 'Export Management').length;

  const columns = [
    { header: 'Doc ID', cell: r => <span className="font-semibold text-primary text-sm">{r.docId}</span> },
    { header: 'Document Name', cell: r => (
      <div>
        <p className="font-medium text-slate-800 text-sm">{r.docName}</p>
        <p className="text-xs text-slate-400">{r.size} · Ref: {r.refId}</p>
      </div>
    )},
    { header: 'Type', cell: r => (
      <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-medium">{r.docType}</span>
    )},
    { header: 'Module', cell: r => (
      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${MODULE_COLORS[r.module] || 'bg-slate-100 text-slate-600'}`}>{r.module}</span>
    )},
    { header: 'Uploaded By', cell: r => (
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">{r.uploadedBy[0]}</div>
        <span className="text-sm text-slate-600">{r.uploadedBy}</span>
      </div>
    )},
    { header: 'Upload Date', cell: r => <span className="text-sm text-slate-600">{r.uploadDate}</span> },
    { header: 'Expiry Date', cell: r => r.expiryDate
      ? <span className={`text-sm font-medium ${r.status === 'Expired' ? 'text-red-600' : r.status === 'Expiring Soon' ? 'text-amber-600' : 'text-slate-600'}`}>{r.expiryDate}</span>
      : <span className="text-xs text-slate-400">—</span>
    },
    { header: 'Status', cell: r => (
      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[r.status] || 'bg-slate-100 text-slate-600'}`}>{r.status}</span>
    )},
    { header: 'Tags', cell: r => (
      <div className="flex flex-wrap gap-1">
        {r.tags.map(t => <span key={t} className="px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded text-xs">{t}</span>)}
      </div>
    )},
    { header: 'Actions', className: 'text-right', cell: r => (
      <div className="flex justify-end gap-1">
        <button className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors" title="View"><Eye size={14} /></button>
        <button className="p-1.5 hover:bg-green-50 text-green-600 rounded-lg transition-colors" title="Download"><Download size={14} /></button>
      </div>
    )},
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Document Management</h2>
          <p className="text-sm text-slate-500 mt-0.5">Centralized repository for all mill documents across every module</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors shadow-sm">
          <Upload size={16} /> Upload Document
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={FileText} label="Total Documents" value={DOCS.length} color="bg-primary" sub="All modules" />
        <StatCard icon={CheckCircle} label="Active" value={activeCount} color="bg-emerald-500" sub="Valid documents" />
        <StatCard icon={AlertCircle} label="Expired" value={expiredCount} color="bg-red-500" sub="Renewal needed" />
        <StatCard icon={Clock} label="Expiring Soon" value={expiringCount} color="bg-amber-500" sub="Action required" />
      </div>

      <div className="bg-white rounded-xl border border-amber-200 p-4 flex items-center gap-3">
        <AlertCircle className="text-amber-500 shrink-0" size={20} />
        <div>
          <p className="font-semibold text-amber-700 text-sm">{expiredCount + expiringCount} document(s) need attention</p>
          <p className="text-xs text-amber-600">E-Way Bill EWB-0001 & EWB-0008 have expired. LC-0004 expiring on 2026-08-16.</p>
        </div>
      </div>

      <Card>
        <div className="p-4 border-b border-slate-200 flex flex-wrap gap-3 items-center bg-slate-50">
          <div className="relative flex-1 min-w-52">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input type="text" placeholder="Search documents..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <select value={filterType} onChange={e => setFilterType(e.target.value)}
            className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none">
            {DOC_TYPES.map(t => <option key={t}>{t}</option>)}
          </select>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none">
            {['All', 'Active', 'Expired', 'Expiring Soon'].map(s => <option key={s}>{s}</option>)}
          </select>
          <span className="text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg font-medium">{filtered.length} results</span>
        </div>
        <DataTable columns={columns} data={pagination.paginatedData} currentPage={pagination.currentPage} totalPages={pagination.totalPages} itemsPerPage={pagination.itemsPerPage} onPageChange={pagination.setCurrentPage} onItemsPerPageChange={pagination.setItemsPerPage} totalResults={pagination.totalResults} />
      </Card>
    </div>
  );
};
