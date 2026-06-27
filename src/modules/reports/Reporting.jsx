import React, { useState } from 'react';
import { BarChart2, TrendingUp, Package, Truck, DollarSign, Factory, ShoppingCart, Globe, Download, RefreshCw, Calendar } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import DataTable from '../../components/DataTable';
import { usePagination } from '../../hooks/usePagination';

// ── KPI Card
const KPI = ({ label, value, sub, trend, color }) => (
  <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</p>
    <p className={`text-2xl font-bold mt-1 ${color || 'text-slate-800'}`}>{value}</p>
    {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
    {trend && <p className={`text-xs font-semibold mt-1 ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>{trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% vs last month</p>}
  </div>
);

// ── Section Header
const Section = ({ icon: Icon, title, children }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-3 pb-2 border-b border-slate-200">
      <div className="p-2 bg-primary/10 rounded-lg"><Icon size={18} className="text-primary" /></div>
      <h3 className="text-lg font-bold text-slate-800">{title}</h3>
    </div>
    {children}
  </div>
);

// ── Report Tab
const TABS = ['Overview', 'Procurement', 'Production', 'Sales', 'Export', 'Dispatch', 'Finance'];

// ─── DATA ───────────────────────────────────────────

const procurementData = [
  { id: 1, prNumber: 'PR-0001', paddyType: 'Basmati', targetMandi: 'Karnal', qtyRequired: 120, qtyProcured: 115.5, rate: 2500, totalValue: 288750, agent: 'Harish Kumar', closureDate: '2026-06-03', mspRate: 2203, premium: 297, status: 'Closed' },
  { id: 2, prNumber: 'PR-0002', paddyType: 'IR-36', targetMandi: 'Moga', qtyRequired: 80, qtyProcured: 78, rate: 2000, totalValue: 156000, agent: 'Suresh Lal', closureDate: '2026-06-04', mspRate: 1940, premium: 60, status: 'Closed' },
  { id: 3, prNumber: 'PR-0003', paddyType: 'Sharbati', targetMandi: 'Ambala', qtyRequired: 60, qtyProcured: 60, rate: 1800, totalValue: 108000, agent: 'Mahesh Yadav', closureDate: '2026-06-05', mspRate: 1815, premium: -15, status: 'Closed' },
  { id: 4, prNumber: 'PR-0004', paddyType: 'Basmati', targetMandi: 'Karnal', qtyRequired: 100, qtyProcured: 98, rate: 2550, totalValue: 249900, agent: 'Harish Kumar', closureDate: '2026-06-07', mspRate: 2203, premium: 347, status: 'Closed' },
  { id: 5, prNumber: 'PR-0005', paddyType: 'Sona Masoori', targetMandi: 'Guntur', qtyRequired: 200, qtyProcured: 195, rate: 2100, totalValue: 409500, agent: 'Krishna Reddy', closureDate: '2026-06-09', mspRate: 2050, premium: 50, status: 'Closed' },
  { id: 6, prNumber: 'PR-0006', paddyType: 'IR-36', targetMandi: 'Moga', qtyRequired: 90, qtyProcured: 85, rate: 2020, totalValue: 171700, agent: 'Suresh Lal', closureDate: '2026-06-10', mspRate: 1940, premium: 80, status: 'Closed' },
  { id: 7, prNumber: 'PR-0007', paddyType: 'Basmati', targetMandi: 'Panipat', qtyRequired: 150, qtyProcured: 148, rate: 2480, totalValue: 367040, agent: 'Ramesh Gupta', closureDate: '2026-06-12', mspRate: 2203, premium: 277, status: 'Closed' },
  { id: 8, prNumber: 'PR-0008', paddyType: 'Basmati', targetMandi: 'Karnal', qtyRequired: 75, qtyProcured: 0, rate: 0, totalValue: 0, agent: 'Harish Kumar', closureDate: '-', mspRate: 2203, premium: 0, status: 'Pending' },
];

const productionData = [
  { id: 1, prdNo: 'PRD-0001', lotNo: 'LOT-001', paddyInput: 115.5, riceOut: 74.2, brokenOut: 6.3, branOut: 8.1, huskOut: 20.5, polishOut: 6.4, recoveryPct: 64.2, shift: 'Morning', machine: 'Mill-A1', date: '2026-06-04', status: 'Closed' },
  { id: 2, prdNo: 'PRD-0002', lotNo: 'LOT-002', paddyInput: 78, riceOut: 50.7, brokenOut: 4.5, branOut: 5.5, huskOut: 13.8, polishOut: 3.5, recoveryPct: 65.0, shift: 'Evening', machine: 'Mill-A2', date: '2026-06-05', status: 'Closed' },
  { id: 3, prdNo: 'PRD-0003', lotNo: 'LOT-003', paddyInput: 60, riceOut: 37.8, brokenOut: 3.6, branOut: 4.5, huskOut: 10.8, polishOut: 3.3, recoveryPct: 63.0, shift: 'Night', machine: 'Mill-B1', date: '2026-06-06', status: 'Closed' },
  { id: 4, prdNo: 'PRD-0004', lotNo: 'LOT-004', paddyInput: 98, riceOut: 65.1, brokenOut: 5.8, branOut: 7.0, huskOut: 17.3, polishOut: 2.8, recoveryPct: 66.4, shift: 'Morning', machine: 'Mill-A1', date: '2026-06-08', status: 'Closed' },
  { id: 5, prdNo: 'PRD-0005', lotNo: 'LOT-005', paddyInput: 195, riceOut: 121.5, brokenOut: 10.8, branOut: 14.2, huskOut: 35.1, polishOut: 13.4, recoveryPct: 62.3, shift: 'Morning', machine: 'Mill-A2', date: '2026-06-10', status: 'Closed' },
  { id: 6, prdNo: 'PRD-0006', lotNo: 'LOT-006', paddyInput: 85, riceOut: 56.1, brokenOut: 5.1, branOut: 6.2, huskOut: 15.4, polishOut: 2.2, recoveryPct: 66.0, shift: 'Evening', machine: 'Mill-B1', date: '2026-06-11', status: 'Closed' },
];

const salesData = [
  { id: 1, orderId: 'SO-0001', orderType: 'Domestic', customer: 'Reliance Fresh', grade: 'Premium Basmati', qty: 50, rate: 85000, value: 4250000, deliveryDate: '2026-06-15', status: 'Completed' },
  { id: 2, orderId: 'SO-0002', orderType: 'Domestic', customer: 'More Supermarket', grade: 'IR-36 Rice', qty: 30, rate: 35000, value: 1050000, deliveryDate: '2026-06-16', status: 'Completed' },
  { id: 3, orderId: 'SO-0003', orderType: 'Export', customer: 'Al Dahra Trading', grade: 'Premium Basmati', qty: 100, rate: 110000, value: 11000000, deliveryDate: '2026-06-25', status: 'Completed' },
  { id: 4, orderId: 'SO-0004', orderType: 'Domestic', customer: 'D-Mart Ltd', grade: 'Sharbati Rice', qty: 25, rate: 42000, value: 1050000, deliveryDate: '2026-06-18', status: 'Completed' },
  { id: 5, orderId: 'SO-0005', orderType: 'Export', customer: 'Gulf Foods FZE', grade: 'Premium Basmati', qty: 80, rate: 112000, value: 8960000, deliveryDate: '2026-06-28', status: 'Dispatched' },
  { id: 6, orderId: 'SO-0006', orderType: 'Domestic', customer: 'Star Bazaar', grade: 'Broken Rice', qty: 40, rate: 18000, value: 720000, deliveryDate: '2026-06-20', status: 'Completed' },
  { id: 7, orderId: 'SO-0007', orderType: 'Export', customer: 'KSA Rice Traders', grade: 'IR-36 Rice', qty: 150, rate: 38000, value: 5700000, deliveryDate: '2026-07-05', status: 'Processing' },
];

const exportData = [
  { id: 1, contractNo: 'EC-0001', buyer: 'Al Dahra Trading', country: 'UAE', incoterms: 'FOB', grade: 'Premium Basmati', qtyMT: 100, pricePerMT: 1320, totalUSD: 132000, portLoading: 'JNPT Mumbai', shipDate: '2026-06-22', payTerms: 'LC', status: 'Shipped' },
  { id: 2, contractNo: 'EC-0002', buyer: 'Gulf Foods FZE', country: 'UAE', incoterms: 'CIF', grade: 'Premium Basmati', qtyMT: 80, pricePerMT: 1350, totalUSD: 108000, portLoading: 'JNPT Mumbai', shipDate: '2026-06-28', payTerms: 'TT', status: 'In Transit' },
  { id: 3, contractNo: 'EC-0003', buyer: 'KSA Rice Traders', country: 'Saudi Arabia', incoterms: 'CNF', grade: 'IR-36 Rice', qtyMT: 150, pricePerMT: 460, totalUSD: 69000, portLoading: 'Kandla', shipDate: '2026-07-05', payTerms: 'LC', status: 'Booked' },
  { id: 4, contractNo: 'EC-0004', buyer: 'Egypt Trade Co.', country: 'Egypt', incoterms: 'FOB', grade: 'Sona Masoori', qtyMT: 200, pricePerMT: 520, totalUSD: 104000, portLoading: 'Chennai', shipDate: '2026-07-10', payTerms: 'DA', status: 'Booked' },
  { id: 5, contractNo: 'EC-0005', buyer: 'Oman Foodstuff', country: 'Oman', incoterms: 'FOB', grade: 'Premium Basmati', qtyMT: 60, pricePerMT: 1400, totalUSD: 84000, portLoading: 'JNPT Mumbai', shipDate: '2026-07-15', payTerms: 'TT', status: 'Contract Signed' },
];

const dispatchData = [
  { id: 1, dispatchNo: 'DO-0001', orderRef: 'SO-0001', customer: 'Reliance Fresh', type: 'Domestic', grade: 'Premium Basmati', qty: 50, bags: 1000, vehicle: 'HR-55-AB-1234', driver: 'Raju Singh', dispatchDate: '2026-06-14', deliveryDate: '2026-06-15', status: 'Delivered' },
  { id: 2, dispatchNo: 'DO-0002', orderRef: 'SO-0002', customer: 'More Supermarket', type: 'Domestic', grade: 'IR-36 Rice', qty: 30, bags: 600, vehicle: 'PB-10-CD-5678', driver: 'Mohan Lal', dispatchDate: '2026-06-15', deliveryDate: '2026-06-16', status: 'Delivered' },
  { id: 3, dispatchNo: 'DO-0003', orderRef: 'SO-0004', customer: 'D-Mart Ltd', type: 'Domestic', grade: 'Sharbati Rice', qty: 25, bags: 500, vehicle: 'MH-12-EF-9012', driver: 'Kishan Rao', dispatchDate: '2026-06-17', deliveryDate: '2026-06-18', status: 'Delivered' },
  { id: 4, dispatchNo: 'DO-0004', orderRef: 'SO-0006', customer: 'Star Bazaar', type: 'Domestic', grade: 'Broken Rice', qty: 40, bags: 800, vehicle: 'UP-32-GH-3456', driver: 'Deepak Kumar', dispatchDate: '2026-06-19', deliveryDate: '2026-06-20', status: 'Delivered' },
  { id: 5, dispatchNo: 'DO-0005', orderRef: 'SO-0003', customer: 'Al Dahra Trading', type: 'Export', grade: 'Premium Basmati', qty: 100, bags: 2000, vehicle: 'Container', driver: 'Freight Agent', dispatchDate: '2026-06-21', deliveryDate: '2026-06-22', status: 'Port Reached' },
  { id: 6, dispatchNo: 'DO-0006', orderRef: 'SO-0005', customer: 'Gulf Foods FZE', type: 'Export', grade: 'Premium Basmati', qty: 80, bags: 1600, vehicle: 'Container', driver: 'Freight Agent', dispatchDate: '2026-06-27', deliveryDate: '2026-06-28', status: 'Loading' },
];

const financeData = [
  { id: 1, txnId: 'FIN-0001', type: 'Accounts Payable', ref: 'PO-0001', party: 'Rajesh Kumar (Farmer)', amount: 288750, tds: 2887, netPaid: 285863, payDate: '2026-06-06', mode: 'NEFT', status: 'Paid' },
  { id: 2, txnId: 'FIN-0002', type: 'Accounts Payable', ref: 'PO-0002', party: 'Suresh Lal (Farmer)', amount: 156000, tds: 1560, netPaid: 154440, payDate: '2026-06-07', mode: 'RTGS', status: 'Paid' },
  { id: 3, txnId: 'FIN-0003', type: 'Agent Commission', ref: 'PO-0001', party: 'Harish Kumar', amount: 5775, tds: 578, netPaid: 5197, payDate: '2026-06-08', mode: 'NEFT', status: 'Paid' },
  { id: 4, txnId: 'FIN-0004', type: 'Transporter Payment', ref: 'DO-0001', party: 'ABC Logistics Pvt Ltd', amount: 18000, tds: 180, netPaid: 17820, payDate: '2026-06-16', mode: 'NEFT', status: 'Paid' },
  { id: 5, txnId: 'FIN-0005', type: 'Accounts Receivable', ref: 'SO-0001', party: 'Reliance Fresh', amount: 4250000, tds: 0, netPaid: 4250000, payDate: '2026-06-17', mode: 'RTGS', status: 'Received' },
  { id: 6, txnId: 'FIN-0006', type: 'Accounts Receivable', ref: 'SO-0003', party: 'Al Dahra Trading', amount: 11000000, tds: 0, netPaid: 11000000, payDate: '2026-06-24', mode: 'LC', status: 'Received' },
  { id: 7, txnId: 'FIN-0007', type: 'Broker Commission', ref: 'EC-0001', party: 'Dubai Trade Broker', amount: 132000, tds: 0, netPaid: 132000, payDate: '2026-06-25', mode: 'Wire Transfer', status: 'Paid' },
  { id: 8, txnId: 'FIN-0008', type: 'Accounts Payable', ref: 'PO-0005', party: 'Krishna Reddy (Farmer)', amount: 409500, tds: 4095, netPaid: 405405, payDate: '2026-06-12', mode: 'RTGS', status: 'Paid' },
];

const STATUS_COLOR = {
  'Closed': 'bg-green-100 text-green-700', 'Pending': 'bg-amber-100 text-amber-700',
  'Completed': 'bg-green-100 text-green-700', 'Dispatched': 'bg-blue-100 text-blue-700',
  'Processing': 'bg-amber-100 text-amber-700', 'Shipped': 'bg-emerald-100 text-emerald-700',
  'In Transit': 'bg-blue-100 text-blue-700', 'Booked': 'bg-indigo-100 text-indigo-700',
  'Contract Signed': 'bg-purple-100 text-purple-700', 'Delivered': 'bg-green-100 text-green-700',
  'Port Reached': 'bg-teal-100 text-teal-700', 'Loading': 'bg-amber-100 text-amber-700',
  'Paid': 'bg-green-100 text-green-700', 'Received': 'bg-emerald-100 text-emerald-700',
};
const Badge = ({ status }) => (
  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_COLOR[status] || 'bg-slate-100 text-slate-600'}`}>{status}</span>
);

export const Reporting = () => {
  const [activeTab, setActiveTab] = useState('Overview');

  const totalProcured = procurementData.reduce((a, r) => a + r.qtyProcured, 0).toFixed(1);
  const totalProduced = productionData.reduce((a, r) => a + r.riceOut, 0).toFixed(1);
  const totalSalesValue = salesData.reduce((a, r) => a + r.value, 0);
  const totalExportUSD = exportData.reduce((a, r) => a + r.totalUSD, 0);
  const avgRecovery = (productionData.reduce((a, r) => a + r.recoveryPct, 0) / productionData.length).toFixed(1);
  const totalAP = financeData.filter(f => f.type === 'Accounts Payable' || f.type.includes('Commission') || f.type === 'Transporter Payment').reduce((a, r) => a + r.netPaid, 0);
  const totalAR = financeData.filter(f => f.type === 'Accounts Receivable').reduce((a, r) => a + r.netPaid, 0);

  const procPag = usePagination(procurementData, 8);
  const prodPag = usePagination(productionData, 8);
  const salesPag = usePagination(salesData, 8);
  const exportPag = usePagination(exportData, 8);
  const dispPag = usePagination(dispatchData, 8);
  const finPag = usePagination(financeData, 8);

  const procColumns = [
    { header: 'PR Number', cell: r => <span className="font-semibold text-primary">{r.prNumber}</span> },
    { header: 'Paddy Type', accessor: 'paddyType' },
    { header: 'Target Mandi', accessor: 'targetMandi' },
    { header: 'Qty Required (MT)', accessor: 'qtyRequired' },
    { header: 'Qty Procured (MT)', cell: r => <span className="font-bold">{r.qtyProcured}</span> },
    { header: 'Rate (₹/Qt)', cell: r => <span>₹{r.rate}</span> },
    { header: 'MSP (₹/Qt)', cell: r => <span>₹{r.mspRate}</span> },
    { header: 'Premium (₹)', cell: r => <span className={r.premium >= 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>₹{r.premium}</span> },
    { header: 'Total Value (₹)', cell: r => <span>₹{r.totalValue.toLocaleString()}</span> },
    { header: 'Agent', accessor: 'agent' },
    { header: 'Status', cell: r => <Badge status={r.status} /> },
  ];

  const prodColumns = [
    { header: 'Production No', cell: r => <span className="font-semibold text-primary">{r.prdNo}</span> },
    { header: 'Lot No', accessor: 'lotNo' },
    { header: 'Paddy Input (MT)', accessor: 'paddyInput' },
    { header: 'Rice Output (MT)', cell: r => <span className="font-bold text-emerald-600">{r.riceOut}</span> },
    { header: 'Broken (MT)', cell: r => <span className="text-amber-600">{r.brokenOut}</span> },
    { header: 'Bran (MT)', cell: r => <span className="text-slate-600">{r.branOut}</span> },
    { header: 'Husk (MT)', cell: r => <span className="text-slate-600">{r.huskOut}</span> },
    { header: 'Recovery %', cell: r => (
      <span className={`font-bold ${r.recoveryPct >= 65 ? 'text-green-600' : 'text-amber-600'}`}>{r.recoveryPct}%</span>
    )},
    { header: 'Machine', accessor: 'machine' },
    { header: 'Shift', accessor: 'shift' },
    { header: 'Date', accessor: 'date' },
  ];

  const salesColumns = [
    { header: 'Order ID', cell: r => <span className="font-semibold text-primary">{r.orderId}</span> },
    { header: 'Type', cell: r => <span className={`px-2 py-1 rounded-full text-xs font-semibold ${r.orderType === 'Export' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>{r.orderType}</span> },
    { header: 'Customer', accessor: 'customer' },
    { header: 'Grade', accessor: 'grade' },
    { header: 'Qty (MT)', accessor: 'qty' },
    { header: 'Rate (₹/MT)', cell: r => <span>₹{r.rate.toLocaleString()}</span> },
    { header: 'Total Value (₹)', cell: r => <span className="font-bold">₹{r.value.toLocaleString()}</span> },
    { header: 'Delivery Date', accessor: 'deliveryDate' },
    { header: 'Status', cell: r => <Badge status={r.status} /> },
  ];

  const exportColumns = [
    { header: 'Contract No', cell: r => <span className="font-semibold text-primary">{r.contractNo}</span> },
    { header: 'Buyer', accessor: 'buyer' },
    { header: 'Country', accessor: 'country' },
    { header: 'Incoterms', cell: r => <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-medium">{r.incoterms}</span> },
    { header: 'Grade', accessor: 'grade' },
    { header: 'Qty (MT)', accessor: 'qtyMT' },
    { header: 'Price/MT ($)', cell: r => <span>${r.pricePerMT}</span> },
    { header: 'Total ($)', cell: r => <span className="font-bold text-emerald-600">${r.totalUSD.toLocaleString()}</span> },
    { header: 'Ship Date', accessor: 'shipDate' },
    { header: 'Payment', cell: r => <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">{r.payTerms}</span> },
    { header: 'Status', cell: r => <Badge status={r.status} /> },
  ];

  const dispColumns = [
    { header: 'Dispatch No', cell: r => <span className="font-semibold text-primary">{r.dispatchNo}</span> },
    { header: 'Order Ref', accessor: 'orderRef' },
    { header: 'Type', cell: r => <span className={`px-2 py-1 rounded-full text-xs font-semibold ${r.type === 'Export' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>{r.type}</span> },
    { header: 'Customer', accessor: 'customer' },
    { header: 'Grade', accessor: 'grade' },
    { header: 'Qty (MT)', accessor: 'qty' },
    { header: 'Bags', accessor: 'bags' },
    { header: 'Vehicle', accessor: 'vehicle' },
    { header: 'Dispatch Date', accessor: 'dispatchDate' },
    { header: 'Status', cell: r => <Badge status={r.status} /> },
  ];

  const finColumns = [
    { header: 'Txn ID', cell: r => <span className="font-semibold text-primary">{r.txnId}</span> },
    { header: 'Type', cell: r => (
      <span className={`px-2 py-1 rounded text-xs font-medium ${r.type === 'Accounts Receivable' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-50 text-red-700'}`}>{r.type}</span>
    )},
    { header: 'Reference', accessor: 'ref' },
    { header: 'Party', accessor: 'party' },
    { header: 'Amount (₹)', cell: r => <span>₹{r.amount.toLocaleString()}</span> },
    { header: 'TDS (₹)', cell: r => <span className="text-slate-500">₹{r.tds.toLocaleString()}</span> },
    { header: 'Net Amount (₹)', cell: r => <span className={`font-bold ${r.type === 'Accounts Receivable' ? 'text-emerald-600' : 'text-slate-800'}`}>₹{r.netPaid.toLocaleString()}</span> },
    { header: 'Date', accessor: 'payDate' },
    { header: 'Mode', cell: r => <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs">{r.mode}</span> },
    { header: 'Status', cell: r => <Badge status={r.status} /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Reporting</h2>
          <p className="text-sm text-slate-500 mt-0.5">Comprehensive mill performance reports across all operations</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 bg-white text-slate-600 rounded-xl font-medium text-sm hover:bg-slate-50 transition-colors">
            <Calendar size={16} /> Jun 2026
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors">
            <Download size={16} /> Export Report
          </button>
        </div>
      </div>

      {/* Tab nav */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl overflow-x-auto">
        {TABS.map(t => (
          <button key={t} onClick={() => setActiveTab(t)}
            className={`flex-shrink-0 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === t ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
            {t}
          </button>
        ))}
      </div>

      {/* Overview */}
      {activeTab === 'Overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <KPI label="Total Paddy Procured" value={`${totalProcured} MT`} sub="June 2026" trend={8} />
            <KPI label="Rice Output" value={`${totalProduced} MT`} sub={`Avg Recovery: ${avgRecovery}%`} trend={3} color="text-emerald-600" />
            <KPI label="Total Sales Value" value={`₹${(totalSalesValue / 10000000).toFixed(2)}Cr`} sub="Domestic + Export" trend={12} color="text-blue-600" />
            <KPI label="Export Revenue" value={`$${(totalExportUSD / 1000).toFixed(0)}K`} sub="USD · All contracts" trend={18} color="text-purple-600" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <KPI label="Accounts Payable" value={`₹${(totalAP / 100000).toFixed(1)}L`} sub="Total paid to farmers/vendors" />
            <KPI label="Accounts Receivable" value={`₹${(totalAR / 10000000).toFixed(2)}Cr`} sub="Total received from customers" color="text-emerald-600" />
            <KPI label="Active Dispatches" value={dispatchData.filter(d => d.status !== 'Delivered').length} sub="In transit / loading" trend={-2} />
            <KPI label="Active Export Contracts" value={exportData.filter(d => d.status !== 'Shipped').length} sub="Live export orders" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <div className="p-4 border-b border-slate-100 font-bold text-slate-700">Production Recovery Summary</div>
              <div className="p-4 space-y-3">
                {productionData.map(p => (
                  <div key={p.id} className="flex items-center gap-3">
                    <span className="text-xs font-medium text-slate-500 w-20 shrink-0">{p.prdNo}</span>
                    <div className="flex-1 bg-slate-100 rounded-full h-2.5">
                      <div className="h-2.5 rounded-full bg-emerald-500" style={{ width: `${p.recoveryPct}%` }}></div>
                    </div>
                    <span className={`text-sm font-bold w-14 text-right ${p.recoveryPct >= 65 ? 'text-emerald-600' : 'text-amber-600'}`}>{p.recoveryPct}%</span>
                  </div>
                ))}
              </div>
            </Card>
            <Card>
              <div className="p-4 border-b border-slate-100 font-bold text-slate-700">Sales Breakdown</div>
              <div className="p-4 space-y-3">
                {salesData.map(s => (
                  <div key={s.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-700">{s.customer}</p>
                      <p className="text-xs text-slate-400">{s.orderId} · {s.orderType} · {s.qty} MT</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-800">₹{(s.value / 100000).toFixed(1)}L</p>
                      <Badge status={s.status} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'Procurement' && (
        <Card>
          <div className="p-4 border-b border-slate-100 flex justify-between items-center">
            <span className="font-bold text-slate-700">Procurement Report — June 2026</span>
            <span className="text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">{procurementData.length} Purchase Requests</span>
          </div>
          <DataTable columns={procColumns} data={procPag.paginatedData} currentPage={procPag.currentPage} totalPages={procPag.totalPages} itemsPerPage={procPag.itemsPerPage} onPageChange={procPag.setCurrentPage} onItemsPerPageChange={procPag.setItemsPerPage} totalResults={procPag.totalResults} />
        </Card>
      )}

      {activeTab === 'Production' && (
        <Card>
          <div className="p-4 border-b border-slate-100 flex justify-between items-center">
            <span className="font-bold text-slate-700">Production Report — June 2026</span>
            <span className="text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">{productionData.length} Production Runs · Avg Recovery: {avgRecovery}%</span>
          </div>
          <DataTable columns={prodColumns} data={prodPag.paginatedData} currentPage={prodPag.currentPage} totalPages={prodPag.totalPages} itemsPerPage={prodPag.itemsPerPage} onPageChange={prodPag.setCurrentPage} onItemsPerPageChange={prodPag.setItemsPerPage} totalResults={prodPag.totalResults} />
        </Card>
      )}

      {activeTab === 'Sales' && (
        <Card>
          <div className="p-4 border-b border-slate-100 flex justify-between items-center">
            <span className="font-bold text-slate-700">Sales Report — June 2026</span>
            <span className="text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">Total: ₹{(totalSalesValue / 10000000).toFixed(2)} Cr</span>
          </div>
          <DataTable columns={salesColumns} data={salesPag.paginatedData} currentPage={salesPag.currentPage} totalPages={salesPag.totalPages} itemsPerPage={salesPag.itemsPerPage} onPageChange={salesPag.setCurrentPage} onItemsPerPageChange={salesPag.setItemsPerPage} totalResults={salesPag.totalResults} />
        </Card>
      )}

      {activeTab === 'Export' && (
        <Card>
          <div className="p-4 border-b border-slate-100 flex justify-between items-center">
            <span className="font-bold text-slate-700">Export Report — June 2026</span>
            <span className="text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">Total: ${totalExportUSD.toLocaleString()} USD</span>
          </div>
          <DataTable columns={exportColumns} data={exportPag.paginatedData} currentPage={exportPag.currentPage} totalPages={exportPag.totalPages} itemsPerPage={exportPag.itemsPerPage} onPageChange={exportPag.setCurrentPage} onItemsPerPageChange={exportPag.setItemsPerPage} totalResults={exportPag.totalResults} />
        </Card>
      )}

      {activeTab === 'Dispatch' && (
        <Card>
          <div className="p-4 border-b border-slate-100 flex justify-between items-center">
            <span className="font-bold text-slate-700">Dispatch Report — June 2026</span>
            <span className="text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">{dispatchData.length} Dispatch Orders</span>
          </div>
          <DataTable columns={dispColumns} data={dispPag.paginatedData} currentPage={dispPag.currentPage} totalPages={dispPag.totalPages} itemsPerPage={dispPag.itemsPerPage} onPageChange={dispPag.setCurrentPage} onItemsPerPageChange={dispPag.setItemsPerPage} totalResults={dispPag.totalResults} />
        </Card>
      )}

      {activeTab === 'Finance' && (
        <Card>
          <div className="p-4 border-b border-slate-100 flex justify-between items-center">
            <span className="font-bold text-slate-700">Finance Report — June 2026</span>
            <span className="text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">AR: ₹{(totalAR/10000000).toFixed(2)}Cr · AP: ₹{(totalAP/100000).toFixed(1)}L</span>
          </div>
          <DataTable columns={finColumns} data={finPag.paginatedData} currentPage={finPag.currentPage} totalPages={finPag.totalPages} itemsPerPage={finPag.itemsPerPage} onPageChange={finPag.setCurrentPage} onItemsPerPageChange={finPag.setItemsPerPage} totalResults={finPag.totalResults} />
        </Card>
      )}
    </div>
  );
};
