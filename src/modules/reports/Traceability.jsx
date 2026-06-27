import React, { useState } from 'react';
import { Search, GitBranch, ShieldCheck, AlertTriangle, CheckCircle, Clock, Eye, Package, Filter } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import DataTable from '../../components/DataTable';
import { usePagination } from '../../hooks/usePagination';

// ── Full lifecycle trace records
const AUDIT_LOG = [
  // IND-0001 full journey
  { id: 1, auditId: 'AUD-0001', eventType: 'Procurement Planning', module: 'Procurement', refId: 'PRC-0001', lotNo: '-', description: 'Procurement plan approved for Basmati 120 MT target — Karnal Mandi', performedBy: 'Mill Manager', timestamp: '2026-06-01 09:00', ipAddr: '192.168.1.10', result: 'Approved' },
  { id: 2, auditId: 'AUD-0002', eventType: 'Purchase Indent Created', module: 'Purchase Execution', refId: 'IND-0001', lotNo: '-', description: 'Purchase Indent IND-0001 created for 120 MT Basmati Paddy', performedBy: 'Ramesh Verma', timestamp: '2026-06-01 10:15', ipAddr: '192.168.1.12', result: 'Created' },
  { id: 3, auditId: 'AUD-0003', eventType: 'Purchase Order Issued', module: 'Purchase Execution', refId: 'PO-0001', lotNo: '-', description: 'PO-0001 issued to farmer Rajesh Kumar @ ₹2500/Qt — Moga Mandi', performedBy: 'Ramesh Verma', timestamp: '2026-06-01 11:30', ipAddr: '192.168.1.12', result: 'Issued' },
  { id: 4, auditId: 'AUD-0004', eventType: 'Agent Assigned', module: 'Purchase Execution', refId: 'PO-0001', lotNo: '-', description: 'Harish Kumar (AG-001) assigned to PO-0001 for field coordination', performedBy: 'Purchase Head', timestamp: '2026-06-01 12:00', ipAddr: '192.168.1.10', result: 'Assigned' },
  { id: 5, auditId: 'AUD-0005', eventType: 'Vehicle Assigned', module: 'Purchase Execution', refId: 'PO-0001', lotNo: '-', description: 'Vehicle HR-55-AB-1234 assigned for paddy pickup — Driver Raju Singh', performedBy: 'Transport Dept', timestamp: '2026-06-02 08:00', ipAddr: '192.168.1.15', result: 'Assigned' },
  { id: 6, auditId: 'AUD-0006', eventType: 'Purchase Challan Generated', module: 'Purchase Execution', refId: 'PCH-0001', lotNo: '-', description: 'Challan issued at Moga Mandi — Gross Weight 22,500 KG', performedBy: 'Ramesh Verma', timestamp: '2026-06-02 14:30', ipAddr: '192.168.1.20', result: 'Generated' },
  { id: 7, auditId: 'AUD-0007', eventType: 'Gate Entry Recorded', module: 'Purchase Execution', refId: 'GE-0001', lotNo: '-', description: 'Vehicle PB-10-AB-1234 entered mill gate — Gross: 22500 KG', performedBy: 'Security Staff', timestamp: '2026-06-03 07:15', ipAddr: '192.168.1.30', result: 'Entered' },
  { id: 8, auditId: 'AUD-0008', eventType: 'Weighbridge — Gross Weight', module: 'Purchase Execution', refId: 'WB-0001', lotNo: '-', description: 'Gross: 22,500 KG | Tare: 7,000 KG | Net: 15,500 KG (115.5 MT)', performedBy: 'Weighbridge Operator', timestamp: '2026-06-03 07:30', ipAddr: '192.168.1.31', result: 'Recorded' },
  { id: 9, auditId: 'AUD-0009', eventType: 'Lab Quality Test', module: 'Purchase Execution', refId: 'LAB-0001', lotNo: '-', description: 'Moisture: 13.2% | Broken: 1.8% | Foreign Matter: 0.5% — APPROVED', performedBy: 'Dr. Sunil Rao', timestamp: '2026-06-03 09:00', ipAddr: '192.168.1.25', result: 'Approved' },
  { id: 10, auditId: 'AUD-0010', eventType: 'Purchase Closure', module: 'Purchase Execution', refId: 'PCL-0001', lotNo: '-', description: 'IND-0001 closed. Final Qty: 115.5 MT @ ₹2500/Qt. Total: ₹2,88,750', performedBy: 'Purchase Head', timestamp: '2026-06-03 11:00', ipAddr: '192.168.1.10', result: 'Closed' },
  // Inventory
  { id: 11, auditId: 'AUD-0011', eventType: 'Stock Allocated', module: 'Inventory', refId: 'STK-0001', lotNo: 'LOT-001', description: 'LOT-001: 115.5 MT Basmati Paddy allocated to Main Warehouse / GD-01', performedBy: 'Warehouse Manager', timestamp: '2026-06-03 12:00', ipAddr: '192.168.1.40', result: 'Allocated' },
  // Production
  { id: 12, auditId: 'AUD-0012', eventType: 'Production Order Created', module: 'Manufacturing', refId: 'PRD-0001', lotNo: 'LOT-001', description: 'Production PRD-0001 planned: Input 115.5 MT, Target Recovery 65%, Machine Mill-A1', performedBy: 'Production Manager', timestamp: '2026-06-04 06:00', ipAddr: '192.168.1.50', result: 'Planned' },
  { id: 13, auditId: 'AUD-0013', eventType: 'Production Started', module: 'Manufacturing', refId: 'PRD-0001', lotNo: 'LOT-001', description: 'Mill-A1 started processing LOT-001 — Morning Shift, Operator Vikram', performedBy: 'Mill Supervisor', timestamp: '2026-06-04 07:00', ipAddr: '192.168.1.51', result: 'Started' },
  { id: 14, auditId: 'AUD-0014', eventType: 'Paddy Cleaning Done', module: 'Manufacturing', refId: 'PRD-0001', lotNo: 'LOT-001', description: 'Paddy Cleaning: Input 115.5 MT → Cleaned 113.2 MT. Waste: 2.3 MT', performedBy: 'Vikram (Operator)', timestamp: '2026-06-04 08:00', ipAddr: '192.168.1.51', result: 'Completed' },
  { id: 15, auditId: 'AUD-0015', eventType: 'Dehusking Completed', module: 'Manufacturing', refId: 'PRD-0001', lotNo: 'LOT-001', description: 'Dehusking complete. Brown Rice: 80.2 MT | Husk: 20.5 MT', performedBy: 'Vikram (Operator)', timestamp: '2026-06-04 10:00', ipAddr: '192.168.1.51', result: 'Completed' },
  { id: 16, auditId: 'AUD-0016', eventType: 'Polishing Completed', module: 'Manufacturing', refId: 'PRD-0001', lotNo: 'LOT-001', description: 'Polished Rice: 74.2 MT | Bran: 8.1 MT | Polish: 6.4 MT | Broken: 6.3 MT', performedBy: 'Vikram (Operator)', timestamp: '2026-06-04 14:00', ipAddr: '192.168.1.51', result: 'Completed' },
  { id: 17, auditId: 'AUD-0017', eventType: 'Production Closed', module: 'Manufacturing', refId: 'PRD-0001', lotNo: 'LOT-001', description: 'PRD-0001 closed. Final Recovery: 64.2%. Output: 74.2 MT Premium Basmati Rice', performedBy: 'Production Manager', timestamp: '2026-06-04 17:00', ipAddr: '192.168.1.50', result: 'Closed' },
  // Packing
  { id: 18, auditId: 'AUD-0018', eventType: 'Packing Order Created', module: 'Packing', refId: 'PKO-0001', lotNo: 'LOT-001', description: 'Packing order for 50 MT Premium Basmati — 25kg BOPP bags', performedBy: 'Packing Supervisor', timestamp: '2026-06-05 08:00', ipAddr: '192.168.1.60', result: 'Created' },
  { id: 19, auditId: 'AUD-0019', eventType: 'Packing Completed', module: 'Packing', refId: 'PKO-0001', lotNo: 'LOT-001', description: '2000 bags of 25kg packed. Barcode & QR generated. Finished Goods updated.', performedBy: 'Packing Supervisor', timestamp: '2026-06-05 16:00', ipAddr: '192.168.1.60', result: 'Completed' },
  // Sales
  { id: 20, auditId: 'AUD-0020', eventType: 'Sales Order Received', module: 'Sales', refId: 'SO-0001', lotNo: '-', description: 'Order from Reliance Fresh: 50 MT Premium Basmati @ ₹85,000/MT', performedBy: 'Priya Sharma', timestamp: '2026-06-06 10:00', ipAddr: '192.168.1.70', result: 'Received' },
  { id: 21, auditId: 'AUD-0021', eventType: 'Quotation Sent', module: 'Sales', refId: 'SO-0001', lotNo: '-', description: 'Quotation sent to Reliance Fresh. Valid till 2026-06-13.', performedBy: 'Priya Sharma', timestamp: '2026-06-06 11:00', ipAddr: '192.168.1.70', result: 'Sent' },
  { id: 22, auditId: 'AUD-0022', eventType: 'Order Approved', module: 'Sales', refId: 'SO-0001', lotNo: '-', description: 'Order SO-0001 approved by Sales Manager. PO received from Reliance Fresh.', performedBy: 'Sales Manager', timestamp: '2026-06-07 09:30', ipAddr: '192.168.1.10', result: 'Approved' },
  // Dispatch
  { id: 23, auditId: 'AUD-0023', eventType: 'Dispatch Order Created', module: 'Dispatch', refId: 'DO-0001', lotNo: 'LOT-001', description: 'DO-0001 created for SO-0001. 50 MT, 1000 bags, Vehicle HR-55-AB-1234', performedBy: 'Mohan Singh', timestamp: '2026-06-13 08:00', ipAddr: '192.168.1.80', result: 'Created' },
  { id: 24, auditId: 'AUD-0024', eventType: 'Stock Reserved', module: 'Dispatch', refId: 'DO-0001', lotNo: 'LOT-001', description: 'LOT-001 stock reserved: 50 MT. Remaining inventory updated.', performedBy: 'Warehouse Manager', timestamp: '2026-06-13 09:00', ipAddr: '192.168.1.40', result: 'Reserved' },
  { id: 25, auditId: 'AUD-0025', eventType: 'Loading Completed', module: 'Dispatch', refId: 'DO-0001', lotNo: 'LOT-001', description: 'Loading complete. Vehicle HR-55-AB-1234. Dispatch Weight: 49.95 MT', performedBy: 'Loading Supervisor', timestamp: '2026-06-13 14:00', ipAddr: '192.168.1.81', result: 'Loaded' },
  { id: 26, auditId: 'AUD-0026', eventType: 'Invoice Generated', module: 'Dispatch', refId: 'INV-0001', lotNo: 'LOT-001', description: 'Tax Invoice INV-0001 generated. Value: ₹42,50,000 + GST 5% = ₹44,62,500', performedBy: 'Billing Dept', timestamp: '2026-06-13 15:00', ipAddr: '192.168.1.90', result: 'Generated' },
  { id: 27, auditId: 'AUD-0027', eventType: 'E-Way Bill Generated', module: 'Dispatch', refId: 'EWB-0001', lotNo: 'LOT-001', description: 'E-Way Bill EWB-0001 generated. Valid 2 days. GST Portal Ref: GJ123456', performedBy: 'Mohan Singh', timestamp: '2026-06-13 15:30', ipAddr: '192.168.1.80', result: 'Generated' },
  { id: 28, auditId: 'AUD-0028', eventType: 'Gate Pass Issued', module: 'Dispatch', refId: 'DO-0001', lotNo: 'LOT-001', description: 'Outward Gate Pass issued. Vehicle HR-55-AB-1234 departed 15:45', performedBy: 'Security Staff', timestamp: '2026-06-13 15:45', ipAddr: '192.168.1.30', result: 'Departed' },
  { id: 29, auditId: 'AUD-0029', eventType: 'Delivery Confirmed', module: 'Dispatch', refId: 'DO-0001', lotNo: 'LOT-001', description: 'POD received from Reliance Fresh. Signed by Store Manager. Qty: 49.95 MT', performedBy: 'Priya Sharma', timestamp: '2026-06-15 11:00', ipAddr: '192.168.1.70', result: 'Delivered' },
  // Finance
  { id: 30, auditId: 'AUD-0030', eventType: 'Payment Received', module: 'Finance & Payments', refId: 'AR-0001', lotNo: '-', description: 'Payment ₹44,62,500 received from Reliance Fresh via RTGS. UTR: HDFC20261100123', performedBy: 'Finance Head', timestamp: '2026-06-17 14:00', ipAddr: '192.168.1.95', result: 'Received' },
];

const MODULE_COLORS = {
  'Procurement': 'bg-amber-100 text-amber-700',
  'Purchase Execution': 'bg-orange-100 text-orange-700',
  'Inventory': 'bg-blue-100 text-blue-700',
  'Manufacturing': 'bg-purple-100 text-purple-700',
  'Packing': 'bg-pink-100 text-pink-700',
  'Sales': 'bg-sky-100 text-sky-700',
  'Dispatch': 'bg-indigo-100 text-indigo-700',
  'Finance & Payments': 'bg-emerald-100 text-emerald-700',
};

const RESULT_COLORS = {
  'Approved': 'text-green-600', 'Created': 'text-blue-600', 'Issued': 'text-blue-600',
  'Assigned': 'text-indigo-600', 'Generated': 'text-purple-600', 'Entered': 'text-slate-600',
  'Recorded': 'text-slate-600', 'Closed': 'text-green-600', 'Allocated': 'text-emerald-600',
  'Planned': 'text-amber-600', 'Started': 'text-orange-600', 'Completed': 'text-green-600',
  'Received': 'text-green-600', 'Sent': 'text-blue-600', 'Reserved': 'text-indigo-600',
  'Loaded': 'text-purple-600', 'Departed': 'text-red-600', 'Delivered': 'text-emerald-600',
};

const LOT_COLORS = ['bg-red-500', 'bg-orange-500', 'bg-amber-500', 'bg-green-500', 'bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-teal-500'];
const MODULE_LIST = ['All Modules', 'Procurement', 'Purchase Execution', 'Inventory', 'Manufacturing', 'Packing', 'Sales', 'Dispatch', 'Finance & Payments'];

export const Traceability = () => {
  const [search, setSearch] = useState('');
  const [filterModule, setFilterModule] = useState('All Modules');
  const [traceId, setTraceId] = useState('');
  const [traceResult, setTraceResult] = useState(null);
  const [activeView, setActiveView] = useState('table'); // 'table' | 'timeline'

  const handleTrace = () => {
    if (!traceId.trim()) return;
    const results = AUDIT_LOG.filter(a =>
      a.refId.toLowerCase().includes(traceId.toLowerCase()) ||
      a.lotNo.toLowerCase().includes(traceId.toLowerCase()) ||
      a.auditId.toLowerCase().includes(traceId.toLowerCase())
    );
    setTraceResult(results.length > 0 ? results : []);
  };

  const filtered = AUDIT_LOG.filter(a => {
    const matchSearch = Object.values(a).some(v => String(v).toLowerCase().includes(search.toLowerCase()));
    const matchModule = filterModule === 'All Modules' || a.module === filterModule;
    return matchSearch && matchModule;
  });

  const pagination = usePagination(filtered, 10);

  const columns = [
    { header: 'Audit ID', cell: r => <span className="font-mono text-xs font-bold text-primary">{r.auditId}</span> },
    { header: 'Event', cell: r => <span className="text-sm font-semibold text-slate-800">{r.eventType}</span> },
    { header: 'Module', cell: r => <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${MODULE_COLORS[r.module] || 'bg-slate-100 text-slate-600'}`}>{r.module}</span> },
    { header: 'Reference ID', cell: r => <span className="font-mono text-xs font-bold text-slate-600">{r.refId}</span> },
    { header: 'Lot / Batch', cell: r => r.lotNo !== '-' ? <span className="text-xs font-medium text-indigo-600">{r.lotNo}</span> : <span className="text-xs text-slate-300">—</span> },
    { header: 'Description', cell: r => <p className="text-xs text-slate-600 max-w-xs truncate" title={r.description}>{r.description}</p> },
    { header: 'Performed By', cell: r => (
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">{r.performedBy[0]}</div>
        <span className="text-xs text-slate-600">{r.performedBy}</span>
      </div>
    )},
    { header: 'Timestamp', cell: r => <span className="text-xs text-slate-500 whitespace-nowrap">{r.timestamp}</span> },
    { header: 'Result', cell: r => <span className={`text-xs font-bold ${RESULT_COLORS[r.result] || 'text-slate-600'}`}>● {r.result}</span> },
  ];

  const displayData = traceResult || filtered;
  const displayPag = usePagination(displayData, 10);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Traceability & Audit</h2>
          <p className="text-sm text-slate-500 mt-0.5">End-to-end lineage tracking — from procurement to payment</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setActiveView('table')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeView === 'table' ? 'bg-primary text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
            Table View
          </button>
          <button onClick={() => setActiveView('timeline')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeView === 'timeline' ? 'bg-primary text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
            Timeline View
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: ShieldCheck, label: 'Total Audit Events', value: AUDIT_LOG.length, color: 'bg-primary', sub: 'Complete journey' },
          { icon: GitBranch, label: 'Modules Tracked', value: 8, color: 'bg-indigo-500', sub: 'End-to-end coverage' },
          { icon: CheckCircle, label: 'Approved Events', value: AUDIT_LOG.filter(a => a.result === 'Approved' || a.result === 'Completed' || a.result === 'Delivered').length, color: 'bg-emerald-500', sub: 'Successful stages' },
          { icon: AlertTriangle, label: 'Critical Events', value: AUDIT_LOG.filter(a => a.result === 'Departed' || a.result === 'Closed').length, color: 'bg-amber-500', sub: 'Gate exits & closures' },
        ].map(({ icon: Icon, label, value, color, sub }) => (
          <div key={label} className="bg-white rounded-xl border border-slate-200 p-5 flex items-start gap-4 shadow-sm">
            <div className={`p-3 rounded-lg ${color}`}><Icon size={20} className="text-white" /></div>
            <div><p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</p><p className="text-2xl font-bold text-slate-800 mt-0.5">{value}</p><p className="text-xs text-slate-400 mt-0.5">{sub}</p></div>
          </div>
        ))}
      </div>

      {/* Trace Search */}
      <div className="bg-gradient-to-r from-primary/5 to-indigo-50 rounded-2xl border border-primary/20 p-6">
        <h3 className="font-bold text-slate-800 mb-1 flex items-center gap-2"><GitBranch size={18} className="text-primary" /> Trace Any ID</h3>
        <p className="text-sm text-slate-500 mb-4">Enter a Lot No, PR Number, PO Number, Dispatch Order, or any Reference ID to trace the complete lifecycle.</p>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="e.g. LOT-001, PR-0001, PO-0001, DO-0001, EC-0001..."
              value={traceId}
              onChange={e => { setTraceId(e.target.value); if (!e.target.value) setTraceResult(null); }}
              onKeyDown={e => e.key === 'Enter' && handleTrace()}
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 shadow-sm"
            />
          </div>
          <button onClick={handleTrace} className="px-6 py-3 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors shadow-sm">
            Trace Lifecycle
          </button>
          {traceResult && (
            <button onClick={() => { setTraceResult(null); setTraceId(''); }} className="px-4 py-3 border border-slate-200 bg-white text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-50">
              Clear
            </button>
          )}
        </div>
        {traceResult !== null && (
          <div className={`mt-4 px-4 py-2.5 rounded-xl text-sm font-medium ${traceResult.length > 0 ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
            {traceResult.length > 0 ? `✓ Found ${traceResult.length} audit events for "${traceId}"` : `✗ No records found for "${traceId}"`}
          </div>
        )}
      </div>

      {/* Timeline View */}
      {activeView === 'timeline' && (
        <Card>
          <div className="p-4 border-b border-slate-100 font-bold text-slate-700">
            Complete Lifecycle Timeline — LOT-001 / PR-0001 Journey
          </div>
          <div className="p-6">
            <div className="relative pl-8 border-l-2 border-slate-200 space-y-0">
              {AUDIT_LOG.map((event, idx) => (
                <div key={event.id} className="relative pb-6">
                  {/* Dot */}
                  <div className={`absolute -left-[41px] w-4 h-4 rounded-full border-4 border-white ${LOT_COLORS[Object.keys(MODULE_COLORS).indexOf(event.module) % LOT_COLORS.length]}`}></div>

                  <div className="bg-white rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all p-4">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${MODULE_COLORS[event.module] || 'bg-slate-100 text-slate-600'}`}>{event.module}</span>
                        <h4 className="font-semibold text-slate-800 text-sm">{event.eventType}</h4>
                        <span className="font-mono text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded">{event.refId}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-bold ${RESULT_COLORS[event.result] || 'text-slate-600'}`}>● {event.result}</span>
                        <span className="text-xs text-slate-400">{event.timestamp}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">{event.description}</p>
                    <p className="text-xs text-slate-400 mt-1">By: <span className="font-medium text-slate-500">{event.performedBy}</span> · IP: {event.ipAddr}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Table View */}
      {activeView === 'table' && (
        <Card>
          <div className="p-4 border-b border-slate-200 flex flex-wrap gap-3 items-center bg-slate-50">
            <div className="relative flex-1 min-w-52">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input type="text" placeholder="Search audit log..." value={search} onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <select value={filterModule} onChange={e => setFilterModule(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none">
              {MODULE_LIST.map(m => <option key={m}>{m}</option>)}
            </select>
            <span className="text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg font-medium">
              {traceResult ? `${traceResult.length} trace results` : `${filtered.length} records`}
            </span>
          </div>
          <DataTable
            columns={columns}
            data={traceResult ? displayPag.paginatedData : pagination.paginatedData}
            currentPage={traceResult ? displayPag.currentPage : pagination.currentPage}
            totalPages={traceResult ? displayPag.totalPages : pagination.totalPages}
            itemsPerPage={traceResult ? displayPag.itemsPerPage : pagination.itemsPerPage}
            onPageChange={traceResult ? displayPag.setCurrentPage : pagination.setCurrentPage}
            onItemsPerPageChange={traceResult ? displayPag.setItemsPerPage : pagination.setItemsPerPage}
            totalResults={traceResult ? displayPag.totalResults : pagination.totalResults}
          />
        </Card>
      )}
    </div>
  );
};