import React, { useState, useMemo } from 'react';
import {
  Search, Plus, Minus, ArrowRightLeft, AlertTriangle, Warehouse,
  Package, TrendingUp, TrendingDown, ChevronDown, X
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input, Label, Select } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import DataTable from '../../components/DataTable';
import { usePagination } from '../../hooks/usePagination';
import { Modal } from '../../components/ui/Modal';

// ─────────────────────────────────────────────
// SEED DATA
// ─────────────────────────────────────────────

const seedRawMaterial = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  stockId: `STK-${(i + 1).toString().padStart(4, '0')}`,
  prNumber: `PR-${(i + 1).toString().padStart(4, '0')}`,
  itemName: ['Basmati Paddy', 'IR-36 Paddy', 'Sharbati Paddy', 'Sona Masoori Paddy'][i % 4],
  grade: ['Grade A', 'Grade B', 'Grade C', 'Premium'][i % 4],
  lotNo: `LOT-${(i + 1).toString().padStart(3, '0')}`,
  batchNo: `BATCH-${(i + 1).toString().padStart(3, '0')}`,
  warehouse: ['Main Warehouse', 'North Godown', 'South Godown'][i % 3],
  goDown: [`GD-0${(i % 5) + 1}`],
  quantity: parseFloat((Math.random() * 80 + 20).toFixed(2)),
  moisture: parseFloat((Math.random() * 5 + 10).toFixed(1)),
  qualityGrade: ['A+', 'A', 'B+', 'B'][i % 4],
  valuationRate: [2200, 2000, 1800, 2500][i % 4],
  totalValue: 0,
  dateReceived: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
  status: ['Available', 'In Production', 'Reserved'][i % 3],
  txns: [{ type: '+', qty: parseFloat((Math.random() * 80 + 20).toFixed(2)), note: 'Purchase Receipt', date: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}` }],
})).map(r => ({ ...r, totalValue: (r.quantity * r.valuationRate).toFixed(2) }));

const seedFinishedGoods = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  itemCode: `FG-${(i + 1).toString().padStart(4, '0')}`,
  itemName: ['Premium Basmati Rice', 'Broken Rice', 'Bran', 'Husk', 'Polish'][i % 5],
  quantity: parseFloat((Math.random() * 50 + 10).toFixed(2)),
  unit: 'MT',
  warehouse: ['Finished Goods Store', 'Dispatch Bay', 'Cold Storage'][i % 3],
  rackBin: `R${i % 10 + 1}-B${i % 5 + 1}`,
  batchNo: `PRD-BATCH-${(i + 1).toString().padStart(3, '0')}`,
  supplier: 'Internal Production',
  reorderLevel: 5,
  receivedDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
  txns: [{ type: '+', qty: parseFloat((Math.random() * 50 + 10).toFixed(2)), note: 'Production Output', date: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}` }],
}));

const seedTransfers = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  transferId: `TRF-${(i + 1).toString().padStart(4, '0')}`,
  stockId: `STK-${(i + 1).toString().padStart(4, '0')}`,
  itemName: ['Basmati Paddy', 'IR-36 Paddy', 'Premium Basmati Rice'][i % 3],
  lotNo: `LOT-${(i + 1).toString().padStart(3, '0')}`,
  fromWarehouse: ['Main Warehouse', 'North Godown'][i % 2],
  toWarehouse: ['South Godown', 'Finished Goods Store'][i % 2],
  fromGoDown: `GD-0${(i % 5) + 1}`,
  toGoDown: `GD-0${((i + 2) % 5) + 1}`,
  qtyTransferred: parseFloat((Math.random() * 20 + 5).toFixed(2)),
  transferDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
  authorizedBy: ['Mill Manager', 'Warehouse Head', 'Supervisor'][i % 3],
}));

const seedDamage = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  damageId: `DMG-${(i + 1).toString().padStart(4, '0')}`,
  verificationId: `VER-${(i + 1).toString().padStart(4, '0')}`,
  itemName: ['Basmati Paddy', 'IR-36 Paddy', 'Finished Rice'][i % 3],
  lotNo: `LOT-${(i + 1).toString().padStart(3, '0')}`,
  damagedQty: parseFloat((Math.random() * 5 + 0.5).toFixed(2)),
  damageType: ['Moisture Damage', 'Pest Infestation', 'Physical Damage', 'Spillage'][i % 4],
  reason: ['Improper Storage', 'Handling Error', 'Natural Cause'][i % 3],
  disposalMethod: ['Sell as Cattle Feed', 'Dispose', 'Donate'][i % 3],
  lossValue: parseFloat((Math.random() * 50000 + 5000).toFixed(2)),
  date: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
  authorizedBy: ['Quality Manager', 'Mill Manager'][i % 2],
}));

// ─────────────────────────────────────────────
// STAT CARD
// ─────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, color, sub }) => (
  <div className={`bg-white rounded-xl border border-slate-200 p-5 flex items-start gap-4 shadow-sm`}>
    <div className={`p-3 rounded-lg ${color}`}>
      <Icon size={22} className="text-white" />
    </div>
    <div>
      <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</p>
      <p className="text-2xl font-bold text-slate-800 mt-0.5">{value}</p>
      {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
    </div>
  </div>
);

// ─────────────────────────────────────────────
// STATUS BADGE
// ─────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const map = {
    'Available': 'bg-green-100 text-green-700',
    'In Production': 'bg-amber-100 text-amber-700',
    'Reserved': 'bg-blue-100 text-blue-700',
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${map[status] || 'bg-slate-100 text-slate-600'}`}>
      {status}
    </span>
  );
};

// ─────────────────────────────────────────────
// SECTION TAB BAR
// ─────────────────────────────────────────────
const SectionTabs = ({ active, onChange }) => {
  const tabs = [
    { id: 'raw', label: 'Raw Material Stock' },
    { id: 'finished', label: 'Finished Goods Stock' },
    { id: 'transfer', label: 'Stock Transfer' },
    { id: 'damage', label: 'Damage & Waste' },
  ];
  return (
    <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
      {tabs.map(t => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
            active === t.id
              ? 'bg-white text-primary shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
};

// ─────────────────────────────────────────────
// TRANSACTION LEDGER MODAL
// ─────────────────────────────────────────────
const TxnModal = ({ item, onClose }) => (
  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
      <div className="p-5 border-b border-slate-100 flex justify-between items-center">
        <div>
          <h3 className="font-bold text-slate-800">Transaction Ledger</h3>
          <p className="text-xs text-slate-500">{item.itemName || item.itemName} · {item.lotNo || item.batchNo}</p>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg"><X size={18} /></button>
      </div>
      <div className="p-5 space-y-2 max-h-80 overflow-y-auto">
        {(item.txns || []).map((t, idx) => (
          <div key={idx} className={`flex items-center justify-between p-3 rounded-lg ${t.type === '+' ? 'bg-green-50 border border-green-100' : 'bg-red-50 border border-red-100'}`}>
            <div className="flex items-center gap-3">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-sm font-bold ${t.type === '+' ? 'bg-green-500' : 'bg-red-500'}`}>
                {t.type === '+' ? <Plus size={14} /> : <Minus size={14} />}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700">{t.note}</p>
                <p className="text-xs text-slate-400">{t.date}</p>
              </div>
            </div>
            <span className={`font-bold text-sm ${t.type === '+' ? 'text-green-600' : 'text-red-600'}`}>
              {t.type}{t.qty} MT
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export const InventoryLedger = () => {
  const [section, setSection] = useState('raw');
  const [search, setSearch] = useState('');

  // Data states
  const [rawStock, setRawStock] = useState(seedRawMaterial);
  const [finishedGoods, setFinishedGoods] = useState(seedFinishedGoods);
  const [transfers, setTransfers] = useState(seedTransfers);
  const [damages, setDamages] = useState(seedDamage);

  // Modal states
  const [txnModal, setTxnModal] = useState(null);
  const [addModal, setAddModal] = useState(false);
  const [addForm, setAddForm] = useState({});
  const [addType, setAddType] = useState('in'); // 'in' | 'out'
  const [stockAdjModal, setStockAdjModal] = useState(null);
  const [adjForm, setAdjForm] = useState({ qty: '', type: '+', note: '' });

  // ── Adjustments (+ / -)
  const handleAdjSave = () => {
    const qty = parseFloat(adjForm.qty);
    if (!qty || qty <= 0) return;
    const txn = { type: adjForm.type, qty, note: adjForm.note || (adjForm.type === '+' ? 'Manual Add' : 'Manual Deduct'), date: new Date().toISOString().split('T')[0] };
    if (section === 'raw') {
      setRawStock(prev => prev.map(r => r.id === stockAdjModal.id
        ? { ...r, quantity: parseFloat((r.quantity + (adjForm.type === '+' ? qty : -qty)).toFixed(2)), txns: [...(r.txns || []), txn] }
        : r
      ));
    } else if (section === 'finished') {
      setFinishedGoods(prev => prev.map(r => r.id === stockAdjModal.id
        ? { ...r, quantity: parseFloat((r.quantity + (adjForm.type === '+' ? qty : -qty)).toFixed(2)), txns: [...(r.txns || []), txn] }
        : r
      ));
    }
    setStockAdjModal(null);
    setAdjForm({ qty: '', type: '+', note: '' });
  };

  // ── New Transfer
  const [tfrModal, setTfrModal] = useState(false);
  const [tfrForm, setTfrForm] = useState({});
  const handleTfrSave = () => {
    const newId = `TRF-${(transfers.length + 1).toString().padStart(4, '0')}`;
    setTransfers(prev => [{ ...tfrForm, id: Date.now(), transferId: newId }, ...prev]);
    setTfrModal(false);
    setTfrForm({});
  };

  // ── New Damage
  const [dmgModal, setDmgModal] = useState(false);
  const [dmgForm, setDmgForm] = useState({});
  const handleDmgSave = () => {
    const newId = `DMG-${(damages.length + 1).toString().padStart(4, '0')}`;
    setDamages(prev => [{ ...dmgForm, id: Date.now(), damageId: newId }, ...prev]);
    setDmgModal(false);
    setDmgForm({});
  };

  // ── Stats
  const totalRaw = rawStock.reduce((a, r) => a + r.quantity, 0).toFixed(1);
  const totalFG = finishedGoods.reduce((a, r) => a + r.quantity, 0).toFixed(1);
  const totalDmg = damages.reduce((a, r) => a + r.damagedQty, 0).toFixed(1);
  const totalValue = rawStock.reduce((a, r) => a + parseFloat(r.totalValue), 0);

  // ── Filtered data
  const filtered = (data) => data.filter(row =>
    Object.values(row).some(v => String(v).toLowerCase().includes(search.toLowerCase()))
  );

  const rawFiltered = filtered(rawStock);
  const fgFiltered = filtered(finishedGoods);
  const tfrFiltered = filtered(transfers);
  const dmgFiltered = filtered(damages);

  const rawPag = usePagination(rawFiltered, 10);
  const fgPag = usePagination(fgFiltered, 10);
  const tfrPag = usePagination(tfrFiltered, 10);
  const dmgPag = usePagination(dmgFiltered, 10);

  // ─────────────────────────────────────────────
  // COLUMNS
  // ─────────────────────────────────────────────
  const rawColumns = [
    { header: 'Stock ID', cell: r => <span className="font-semibold text-primary">{r.stockId}</span> },
    { header: 'PR Number', accessor: 'prNumber' },
    { header: 'Item Name', accessor: 'itemName' },
    { header: 'Grade', accessor: 'grade' },
    { header: 'Lot No', accessor: 'lotNo' },
    { header: 'Batch No', accessor: 'batchNo' },
    { header: 'Warehouse', accessor: 'warehouse' },
    { header: 'Go-down', cell: r => <span>{r.goDown}</span> },
    { header: 'Qty (MT)', cell: r => <span className="font-bold text-slate-800">{r.quantity}</span> },
    { header: 'Moisture %', accessor: 'moisture' },
    { header: 'Quality', accessor: 'qualityGrade' },
    { header: 'Rate (₹/MT)', cell: r => <span>₹{r.valuationRate.toLocaleString()}</span> },
    { header: 'Total Value (₹)', cell: r => <span className="font-medium">₹{parseFloat(r.totalValue).toLocaleString()}</span> },
    { header: 'Date Received', accessor: 'dateReceived' },
    { header: 'Status', cell: r => <StatusBadge status={r.status} /> },
    {
      header: 'Actions', className: 'text-right', cell: r => (
        <div className="flex justify-end gap-1">
          <button onClick={() => { setStockAdjModal(r); setAdjForm({ qty: '', type: '+', note: '' }); }}
            className="p-1.5 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors" title="Add Stock">
            <Plus size={14} />
          </button>
          <button onClick={() => { setStockAdjModal(r); setAdjForm({ qty: '', type: '-', note: '' }); }}
            className="p-1.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors" title="Deduct Stock">
            <Minus size={14} />
          </button>
          <button onClick={() => setTxnModal(r)}
            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors" title="View Ledger">
            <TrendingUp size={14} />
          </button>
        </div>
      )
    },
  ];

  const fgColumns = [
    { header: 'Item Code', cell: r => <span className="font-semibold text-primary">{r.itemCode}</span> },
    { header: 'Item Name', accessor: 'itemName' },
    { header: 'Qty (MT)', cell: r => <span className={`font-bold ${r.quantity <= r.reorderLevel ? 'text-red-600' : 'text-slate-800'}`}>{r.quantity}</span> },
    { header: 'Unit', accessor: 'unit' },
    { header: 'Warehouse', accessor: 'warehouse' },
    { header: 'Rack / Bin', accessor: 'rackBin' },
    { header: 'Batch No', accessor: 'batchNo' },
    { header: 'Supplier', accessor: 'supplier' },
    { header: 'Reorder Lvl', cell: r => (
      <span className={`flex items-center gap-1 ${r.quantity <= r.reorderLevel ? 'text-red-600 font-semibold' : 'text-slate-600'}`}>
        {r.quantity <= r.reorderLevel && <AlertTriangle size={12} />} {r.reorderLevel} MT
      </span>
    )},
    { header: 'Received Date', accessor: 'receivedDate' },
    {
      header: 'Actions', className: 'text-right', cell: r => (
        <div className="flex justify-end gap-1">
          <button onClick={() => { setStockAdjModal(r); setAdjForm({ qty: '', type: '+', note: '' }); }}
            className="p-1.5 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors" title="Add">
            <Plus size={14} />
          </button>
          <button onClick={() => { setStockAdjModal(r); setAdjForm({ qty: '', type: '-', note: '' }); }}
            className="p-1.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors" title="Deduct">
            <Minus size={14} />
          </button>
          <button onClick={() => setTxnModal(r)}
            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors">
            <TrendingUp size={14} />
          </button>
        </div>
      )
    },
  ];

  const tfrColumns = [
    { header: 'Transfer ID', cell: r => <span className="font-semibold text-primary">{r.transferId}</span> },
    { header: 'Stock ID', accessor: 'stockId' },
    { header: 'Item Name', accessor: 'itemName' },
    { header: 'Lot No', accessor: 'lotNo' },
    { header: 'From Warehouse', accessor: 'fromWarehouse' },
    { header: 'To Warehouse', accessor: 'toWarehouse' },
    { header: 'From Go-down', accessor: 'fromGoDown' },
    { header: 'To Go-down', accessor: 'toGoDown' },
    { header: 'Qty (MT)', cell: r => <span className="font-bold">{r.qtyTransferred}</span> },
    { header: 'Transfer Date', accessor: 'transferDate' },
    { header: 'Authorized By', accessor: 'authorizedBy' },
  ];

  const dmgColumns = [
    { header: 'Damage ID', cell: r => <span className="font-semibold text-red-600">{r.damageId}</span> },
    { header: 'Verification ID', accessor: 'verificationId' },
    { header: 'Item Name', accessor: 'itemName' },
    { header: 'Lot No', accessor: 'lotNo' },
    { header: 'Damaged Qty (MT)', cell: r => <span className="text-red-600 font-bold">{r.damagedQty}</span> },
    { header: 'Damage Type', accessor: 'damageType' },
    { header: 'Reason', accessor: 'reason' },
    { header: 'Disposal Method', accessor: 'disposalMethod' },
    { header: 'Loss Value (₹)', cell: r => <span className="text-red-600 font-medium">₹{r.lossValue?.toLocaleString()}</span> },
    { header: 'Date', accessor: 'date' },
    { header: 'Authorized By', accessor: 'authorizedBy' },
  ];

  // ─────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Inventory Management</h2>
          <p className="text-sm text-slate-500 mt-0.5">Live stock tracking — Raw Material, Finished Goods, Transfers & Damage</p>
        </div>
        <div className="flex gap-2">
          {section === 'transfer' && (
            <Button onClick={() => setTfrModal(true)} className="flex items-center gap-2">
              <ArrowRightLeft size={16} /> New Transfer
            </Button>
          )}
          {section === 'damage' && (
            <Button onClick={() => setDmgModal(true)} className="flex items-center gap-2 bg-red-600 hover:bg-red-700">
              <AlertTriangle size={16} /> Log Damage
            </Button>
          )}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Warehouse} label="Total Raw Material" value={`${totalRaw} MT`} color="bg-amber-500" sub={`₹${(totalValue / 100000).toFixed(1)}L valuation`} />
        <StatCard icon={Package} label="Finished Goods" value={`${totalFG} MT`} color="bg-emerald-500" sub="Ready for dispatch" />
        <StatCard icon={ArrowRightLeft} label="Total Transfers" value={transfers.length} color="bg-blue-500" sub="This period" />
        <StatCard icon={AlertTriangle} label="Total Damage" value={`${totalDmg} MT`} color="bg-red-500" sub="Recorded losses" />
      </div>

      {/* Section Tabs */}
      <SectionTabs active={section} onChange={(s) => { setSection(s); setSearch(''); }} />

      {/* Table Card */}
      <Card>
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="flex items-center gap-2">
            {section === 'raw' && <span className="text-xs text-slate-500 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full font-medium">{rawFiltered.length} records</span>}
            {section === 'finished' && <span className="text-xs text-slate-500 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full font-medium">{fgFiltered.length} records</span>}
            {section === 'transfer' && <span className="text-xs text-slate-500 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full font-medium">{tfrFiltered.length} records</span>}
            {section === 'damage' && <span className="text-xs text-slate-500 bg-red-50 border border-red-200 px-3 py-1 rounded-full font-medium">{dmgFiltered.length} records</span>}
          </div>
        </div>

        {section === 'raw' && <DataTable columns={rawColumns} data={rawPag.paginatedData} currentPage={rawPag.currentPage} totalPages={rawPag.totalPages} itemsPerPage={rawPag.itemsPerPage} onPageChange={rawPag.setCurrentPage} onItemsPerPageChange={rawPag.setItemsPerPage} totalResults={rawPag.totalResults} />}
        {section === 'finished' && <DataTable columns={fgColumns} data={fgPag.paginatedData} currentPage={fgPag.currentPage} totalPages={fgPag.totalPages} itemsPerPage={fgPag.itemsPerPage} onPageChange={fgPag.setCurrentPage} onItemsPerPageChange={fgPag.setItemsPerPage} totalResults={fgPag.totalResults} />}
        {section === 'transfer' && <DataTable columns={tfrColumns} data={tfrPag.paginatedData} currentPage={tfrPag.currentPage} totalPages={tfrPag.totalPages} itemsPerPage={tfrPag.itemsPerPage} onPageChange={tfrPag.setCurrentPage} onItemsPerPageChange={tfrPag.setItemsPerPage} totalResults={tfrPag.totalResults} />}
        {section === 'damage' && <DataTable columns={dmgColumns} data={dmgPag.paginatedData} currentPage={dmgPag.currentPage} totalPages={dmgPag.totalPages} itemsPerPage={dmgPag.itemsPerPage} onPageChange={dmgPag.setCurrentPage} onItemsPerPageChange={dmgPag.setItemsPerPage} totalResults={dmgPag.totalResults} />}
      </Card>

      {/* ── Transaction Ledger Modal */}
      {txnModal && <TxnModal item={txnModal} onClose={() => setTxnModal(null)} />}

      {/* ── Stock Adjustment Modal (+ / -) */}
      {stockAdjModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="p-5 border-b border-slate-100">
              <h3 className="font-bold text-slate-800">Stock Adjustment</h3>
              <p className="text-xs text-slate-500">{stockAdjModal.itemName} · {stockAdjModal.stockId || stockAdjModal.itemCode}</p>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex gap-3">
                <button
                  onClick={() => setAdjForm(f => ({ ...f, type: '+' }))}
                  className={`flex-1 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 border-2 transition-all ${adjForm.type === '+' ? 'border-green-500 bg-green-50 text-green-700' : 'border-slate-200 text-slate-500'}`}>
                  <Plus size={16} /> Add Stock
                </button>
                <button
                  onClick={() => setAdjForm(f => ({ ...f, type: '-' }))}
                  className={`flex-1 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 border-2 transition-all ${adjForm.type === '-' ? 'border-red-500 bg-red-50 text-red-700' : 'border-slate-200 text-slate-500'}`}>
                  <Minus size={16} /> Deduct Stock
                </button>
              </div>
              <div className="space-y-1.5">
                <Label>Current Quantity</Label>
                <input type="number" value={stockAdjModal.quantity} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-100 text-sm" />
              </div>
              <div className="space-y-1.5">
                <Label>Quantity to {adjForm.type === '+' ? 'Add' : 'Deduct'} (MT)</Label>
                <input type="number" value={adjForm.qty} onChange={e => setAdjForm(f => ({ ...f, qty: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Enter quantity..." />
              </div>
              <div className="space-y-1.5">
                <Label>Reason / Note</Label>
                <input type="text" value={adjForm.note} onChange={e => setAdjForm(f => ({ ...f, note: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder={adjForm.type === '+' ? 'e.g. Purchase Receipt, Production Return...' : 'e.g. Production Use, Dispatch, Damage...'} />
              </div>
              {adjForm.qty && (
                <div className={`p-3 rounded-xl text-sm font-medium ${adjForm.type === '+' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  New Quantity: {adjForm.type === '+' ? (parseFloat(stockAdjModal.quantity) + parseFloat(adjForm.qty || 0)).toFixed(2) : (parseFloat(stockAdjModal.quantity) - parseFloat(adjForm.qty || 0)).toFixed(2)} MT
                </div>
              )}
            </div>
            <div className="p-5 border-t border-slate-100 flex justify-end gap-3">
              <button onClick={() => setStockAdjModal(null)} className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50">Cancel</button>
              <button onClick={handleAdjSave}
                className={`px-5 py-2 rounded-lg text-sm font-semibold text-white transition-colors ${adjForm.type === '+' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}>
                Confirm {adjForm.type === '+' ? 'Add' : 'Deduct'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── New Transfer Modal */}
      {tfrModal && (
        <Modal isOpen={tfrModal} onClose={() => setTfrModal(false)} title="New Stock Transfer">
          <div className="p-6 grid grid-cols-2 gap-4 max-h-[80vh] overflow-y-auto">
            {[
              { label: 'Stock ID', name: 'stockId', type: 'text' },
              { label: 'Item Name', name: 'itemName', type: 'text' },
              { label: 'Lot No', name: 'lotNo', type: 'text' },
              { label: 'Qty to Transfer (MT)', name: 'qtyTransferred', type: 'number' },
              { label: 'From Warehouse', name: 'fromWarehouse', type: 'text' },
              { label: 'To Warehouse', name: 'toWarehouse', type: 'text' },
              { label: 'From Go-down', name: 'fromGoDown', type: 'text' },
              { label: 'To Go-down', name: 'toGoDown', type: 'text' },
              { label: 'Transfer Date', name: 'transferDate', type: 'date' },
              { label: 'Authorized By', name: 'authorizedBy', type: 'text' },
            ].map(f => (
              <div key={f.name} className="space-y-1.5">
                <Label>{f.label}</Label>
                <Input type={f.type} value={tfrForm[f.name] || ''} onChange={e => setTfrForm(p => ({ ...p, [f.name]: e.target.value }))} />
              </div>
            ))}
            <div className="col-span-2 flex justify-end gap-3 pt-4 border-t border-slate-100">
              <Button variant="outline" onClick={() => setTfrModal(false)}>Cancel</Button>
              <Button onClick={handleTfrSave}>Save Transfer</Button>
            </div>
          </div>
        </Modal>
      )}

      {/* ── New Damage Modal */}
      {dmgModal && (
        <Modal isOpen={dmgModal} onClose={() => setDmgModal(false)} title="Log Damage / Waste">
          <div className="p-6 grid grid-cols-2 gap-4 max-h-[80vh] overflow-y-auto">
            {[
              { label: 'Verification ID', name: 'verificationId', type: 'text' },
              { label: 'Item Name', name: 'itemName', type: 'text' },
              { label: 'Lot No', name: 'lotNo', type: 'text' },
              { label: 'Damaged Qty (MT)', name: 'damagedQty', type: 'number' },
              { label: 'Damage Type', name: 'damageType', type: 'text' },
              { label: 'Reason', name: 'reason', type: 'text' },
              { label: 'Disposal Method', name: 'disposalMethod', type: 'text' },
              { label: 'Loss Value (₹)', name: 'lossValue', type: 'number' },
              { label: 'Date', name: 'date', type: 'date' },
              { label: 'Authorized By', name: 'authorizedBy', type: 'text' },
            ].map(f => (
              <div key={f.name} className="space-y-1.5">
                <Label>{f.label}</Label>
                <Input type={f.type} value={dmgForm[f.name] || ''} onChange={e => setDmgForm(p => ({ ...p, [f.name]: e.target.value }))} />
              </div>
            ))}
            <div className="col-span-2 flex justify-end gap-3 pt-4 border-t border-slate-100">
              <Button variant="outline" onClick={() => setDmgModal(false)}>Cancel</Button>
              <Button className="bg-red-600 hover:bg-red-700" onClick={handleDmgSave}>Log Damage</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};