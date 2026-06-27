import React, { useState, useMemo } from 'react';
import {
  Search, AlertTriangle, AlertCircle, Warehouse, Package,
  TrendingDown, TrendingUp, CheckCircle, Info, ChevronDown, ShoppingCart, Factory
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import DataTable from '../../components/DataTable';
import { usePagination } from '../../hooks/usePagination';

// Seed Data for Raw Material
const rmData = Array.from({ length: 20 }, (_, i) => {
  const received = Math.floor(Math.random() * 100) + 50; // 50-150
  const used = Math.floor(Math.random() * received); // 0-received
  const damaged = Math.floor(Math.random() * 5);
  const reserved = Math.floor(Math.random() * 10);
  
  // Pending orders
  const pendingCount = Math.floor(Math.random() * 3);
  const pendingMt = pendingCount * 15;
  
  // Calculate Closing Stock
  const closingStock = received - used - damaged - reserved;
  const shortage = closingStock - pendingMt;
  
  const valuationRate = [2200, 2000, 1800, 2500][i % 4];
  
  return {
    id: i + 1,
    stockId: `STK-${(i + 1).toString().padStart(4, '0')}`,
    itemName: ['Basmati Paddy', 'IR-36 Paddy', 'Sharbati Paddy', 'Sona Masoori Paddy'][i % 4],
    grade: ['Grade A', 'Grade B', 'Grade C', 'Premium'][i % 4],
    lotNo: `LOT-${(i + 1).toString().padStart(3, '0')}`,
    batchNo: `BATCH-${(i + 1).toString().padStart(3, '0')}`,
    warehouse: ['Main Warehouse', 'North Godown', 'South Godown'][i % 3],
    received,
    used,
    damaged,
    reserved,
    closingStock,
    pendingCount,
    pendingMt,
    shortage,
    valuationRate,
    stockValue: Math.max(0, closingStock) * valuationRate,
    moisture: parseFloat((Math.random() * 5 + 10).toFixed(1)),
    fefoDate: new Date(Date.now() + (Math.random() * 90 - 10) * 86400000).toISOString().split('T')[0], // Some in past/soon
    purchaseRef: `IND-00${i+1}`,
    createdBy: 'System',
    createdAt: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`
  };
});

// Seed Data for Finished Goods
const fgData = Array.from({ length: 20 }, (_, i) => {
  const produced = Math.floor(Math.random() * 100) + 50; 
  const dispatched = Math.floor(Math.random() * produced); 
  const damaged = Math.floor(Math.random() * 5);
  const reserved = Math.floor(Math.random() * 10);
  
  const pendingCount = Math.floor(Math.random() * 3);
  const pendingMt = pendingCount * 15;
  
  const closingStock = produced - dispatched - damaged - reserved;
  const shortage = closingStock - pendingMt;
  
  const valuationRate = [4500, 4200, 3800, 5000][i % 4];
  const orderType = i % 3 === 0 ? 'Export' : 'Domestic';
  
  return {
    id: i + 1,
    fgStockId: `FG-${(i + 1).toString().padStart(4, '0')}`,
    productGrade: ['Premium Basmati', 'Export Grade Rice', 'Broken Rice', 'Grade A Domestic'][i % 4],
    grade: ['Grade A', 'Grade B', 'Grade C', 'Premium'][i % 4],
    lotNo: `FGLOT-${(i + 1).toString().padStart(3, '0')}`,
    batchNo: `FGBATCH-${(i + 1).toString().padStart(3, '0')}`,
    warehouse: ['FG Warehouse', 'Dispatch Bay', 'Cold Storage'][i % 3],
    totalBags: Math.max(0, closingStock) * 20, // 50kg bags
    produced,
    dispatched,
    reserved,
    damaged,
    closingStock,
    pendingCount,
    pendingMt,
    shortage,
    valuationRate,
    mrp: valuationRate / 20 + 200,
    stockValue: Math.max(0, closingStock) * valuationRate,
    bestBeforeDate: new Date(Date.now() + (Math.random() * 180 - 10) * 86400000).toISOString().split('T')[0],
    packingOrderRef: `PKO-00${i+1}`,
    fssaiNo: '10020000000012',
    orderType,
    createdBy: 'System',
    createdAt: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`
  };
});

// StatCard Component
const StatCard = ({ title, value, icon: Icon, color, isNegative }) => (
  <Card className={`p-4 ${isNegative ? 'border-red-500 bg-red-50' : ''}`}>
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon size={24} className="text-white" />
      </div>
      <div>
        <p className={`text-sm font-medium ${isNegative ? 'text-red-700' : 'text-slate-500'}`}>{title}</p>
        <p className={`text-2xl font-bold ${isNegative ? 'text-red-700' : 'text-slate-800'}`}>{value}</p>
      </div>
    </div>
  </Card>
);

export const InventoryLedger = () => {
  const [activeTab, setActiveTab] = useState('RM'); // RM or FG
  const [searchTerm, setSearchTerm] = useState('');
  
  // Logic for Raw Material KPIs
  const rmTotalReceived = rmData.reduce((acc, curr) => acc + curr.received, 0);
  const rmTotalUsed = rmData.reduce((acc, curr) => acc + curr.used, 0);
  const rmClosingStock = rmData.reduce((acc, curr) => acc + curr.closingStock, 0);
  const rmPendingNeed = rmData.reduce((acc, curr) => acc + curr.pendingMt, 0);
  const rmShortfall = rmPendingNeed > rmClosingStock ? rmPendingNeed - rmClosingStock : 0;

  // Logic for FG KPIs
  const fgTotalProduced = fgData.reduce((acc, curr) => acc + curr.produced, 0);
  const fgTotalDispatched = fgData.reduce((acc, curr) => acc + curr.dispatched, 0);
  const fgClosingStock = fgData.reduce((acc, curr) => acc + curr.closingStock, 0);
  const fgPendingNeed = fgData.reduce((acc, curr) => acc + curr.pendingMt, 0);
  const fgShortfall = fgPendingNeed > fgClosingStock ? fgPendingNeed - fgClosingStock : 0;

  // Columns for RM
  const rmCols = [
    { header: "Stock ID", accessor: "stockId" },
    { header: "Item Name", accessor: "itemName" },
    { header: "Grade", accessor: "grade" },
    { header: "Lot No", accessor: "lotNo" },
    { header: "Batch No", accessor: "batchNo" },
    { header: "Warehouse", accessor: "warehouse" },
    { header: "Received", accessor: "received", cell: (row) => `${row.received} MT` },
    { header: "Used", accessor: "used", cell: (row) => `${row.used} MT` },
    { header: "Damaged", accessor: "damaged", cell: (row) => `${row.damaged} MT` },
    { header: "Reserved", accessor: "reserved", cell: (row) => `${row.reserved} MT` },
    { 
      header: "Closing Stock", 
      accessor: "closingStock", 
      cell: (row) => (
        <span className={row.closingStock < 0 ? 'text-red-600 font-bold' : 'font-medium'}>
          {row.closingStock} MT
        </span>
      ) 
    },
    { 
      header: "Pending Orders (Need)", 
      accessor: "pendingMt", 
      cell: (row) => (
        <div className="flex items-center gap-1 group relative cursor-help">
          <span className="font-medium text-slate-700">{row.pendingCount} Orders ({row.pendingMt} MT)</span>
          <Info size={14} className="text-slate-400" />
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-2 bg-slate-800 text-white text-xs rounded shadow-lg z-50 whitespace-nowrap">
            PRD-00{row.id}: {row.pendingMt} MT Scheduled
          </div>
        </div>
      )
    },
    { 
      header: "Shortage/Surplus", 
      accessor: "shortage", 
      cell: (row) => (
        <span className={row.shortage < 0 ? 'text-red-600 font-semibold flex flex-col gap-1' : row.shortage === 0 ? 'text-amber-600 font-semibold' : 'text-emerald-600 font-semibold'}>
          <span>{row.shortage > 0 ? '+' : ''}{row.shortage} MT</span>
          {row.shortage < 0 && (
            <span className="bg-red-100 text-red-700 text-[10px] px-1.5 py-0.5 rounded-full cursor-pointer hover:bg-red-200 transition-colors w-fit text-center" title="Click to raise purchase indent">
              Raise Indent
            </span>
          )}
        </span>
      )
    },
    { 
      header: "Status", 
      accessor: "status", 
      cell: (row) => {
        if (row.closingStock < 0 || row.shortage < 0) return <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium flex w-fit items-center gap-1"><AlertTriangle size={12}/> Critical</span>;
        if (row.closingStock < 20) return <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium flex w-fit items-center gap-1"><AlertCircle size={12}/> Low Stock</span>;
        return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium flex w-fit items-center gap-1"><CheckCircle size={12}/> Sufficient</span>;
      }
    },
    { header: "Stock Value ₹", accessor: "stockValue", cell: (row) => `₹${row.stockValue.toLocaleString()}` },
    { header: "Valuation Rate", accessor: "valuationRate", cell: (row) => `₹${row.valuationRate}/MT` },
    { header: "Moisture %", accessor: "moisture", cell: (row) => `${row.moisture}%` },
    { 
      header: "FEFO Date", 
      accessor: "fefoDate",
      cell: (row) => {
        const isExpiringSoon = new Date(row.fefoDate) < new Date(Date.now() + 30 * 86400000);
        return <span className={isExpiringSoon ? 'text-red-600 font-medium' : ''}>{row.fefoDate}</span>;
      }
    },
    { header: "Purchase Ref", accessor: "purchaseRef" }
  ];

  // Columns for FG
  const fgCols = [
    { header: "FG Stock ID", accessor: "fgStockId" },
    { 
      header: "Product / Grade", 
      accessor: "productGrade",
      cell: (row) => (
        <div className="flex flex-col gap-1">
          <span className="font-medium text-slate-800">{row.productGrade}</span>
        </div>
      )
    },
    { header: "Grade", accessor: "grade" },
    { header: "Lot No", accessor: "lotNo" },
    { header: "Batch No", accessor: "batchNo" },
    { header: "Warehouse", accessor: "warehouse" },
    { header: "Total Bags", accessor: "totalBags" },
    { header: "Produced", accessor: "produced", cell: (row) => `${row.produced} MT` },
    { header: "Dispatched", accessor: "dispatched", cell: (row) => `${row.dispatched} MT` },
    { header: "Reserved", accessor: "reserved", cell: (row) => `${row.reserved} MT` },
    { header: "Damaged", accessor: "damaged", cell: (row) => `${row.damaged} MT` },
    { 
      header: "Closing Stock", 
      accessor: "closingStock", 
      cell: (row) => (
        <span className={row.closingStock < 0 ? 'text-red-600 font-bold' : 'font-medium'}>
          {row.closingStock} MT
        </span>
      ) 
    },
    { 
      header: "Pending Sales Orders", 
      accessor: "pendingMt", 
      cell: (row) => (
        <div className="flex items-center gap-1 group relative cursor-help">
          <span className="font-medium text-slate-700">{row.pendingCount} Orders ({row.pendingMt} MT)</span>
          <Info size={14} className="text-slate-400" />
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-2 bg-slate-800 text-white text-xs rounded shadow-lg z-50 whitespace-nowrap">
            SO-00{row.id}: {row.pendingMt} MT Confirmed - Raj Traders
          </div>
        </div>
      )
    },
    { 
      header: "Shortage/Surplus", 
      accessor: "shortage", 
      cell: (row) => (
        <span className={row.shortage < 0 ? 'text-red-600 font-semibold flex flex-col gap-1' : row.shortage === 0 ? 'text-amber-600 font-semibold' : 'text-emerald-600 font-semibold'}>
          <span>{row.shortage > 0 ? '+' : ''}{row.shortage} MT</span>
          {row.shortage < 0 && (
            <span className="bg-red-100 text-red-700 text-[10px] px-1.5 py-0.5 rounded-full cursor-pointer hover:bg-red-200 transition-colors w-fit text-center" title="Click to plan production">
              Plan Production
            </span>
          )}
        </span>
      )
    },
    { 
      header: "Status", 
      accessor: "status", 
      cell: (row) => {
        if (row.closingStock < 0 || row.shortage < 0) return <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium flex w-fit items-center gap-1"><AlertTriangle size={12}/> Critical</span>;
        if (row.closingStock < 20) return <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium flex w-fit items-center gap-1"><AlertCircle size={12}/> Low Stock</span>;
        return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium flex w-fit items-center gap-1"><CheckCircle size={12}/> Sufficient</span>;
      }
    },
    { header: "Stock Value ₹", accessor: "stockValue", cell: (row) => `₹${row.stockValue.toLocaleString()}` },
    { header: "MRP ₹/bag", accessor: "mrp", cell: (row) => `₹${row.mrp}` },
    { header: "Valuation Rate", accessor: "valuationRate", cell: (row) => `₹${row.valuationRate}/MT` },
    { 
      header: "Best Before", 
      accessor: "bestBeforeDate",
      cell: (row) => {
        const isExpiringSoon = new Date(row.bestBeforeDate) < new Date(Date.now() + 30 * 86400000);
        return <span className={isExpiringSoon ? 'text-red-600 font-medium' : ''}>{row.bestBeforeDate}</span>;
      }
    },
    { header: "Packing Ref", accessor: "packingOrderRef" }
  ];

  const currentData = activeTab === 'RM' ? rmData : fgData;
  const currentCols = activeTab === 'RM' ? rmCols : fgCols;
  
  // Sort by FEFO or Best Before date ascending so oldest is first
  const sortedData = [...currentData].sort((a, b) => {
    const dateA = new Date(a.fefoDate || a.bestBeforeDate);
    const dateB = new Date(b.fefoDate || b.bestBeforeDate);
    return dateA - dateB;
  });

  const filteredData = sortedData.filter(item => 
    Object.values(item).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const pagination = usePagination(filteredData, 10);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Inventory Ledger</h2>
      </div>

      <div className="flex border-b border-slate-200">
        <button 
          onClick={() => setActiveTab('RM')} 
          className={`px-6 py-3 font-medium transition-colors ${activeTab === 'RM' ? 'border-b-2 border-primary text-primary' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
        >
          Raw Material Inventory
        </button>
        <button 
          onClick={() => setActiveTab('FG')} 
          className={`px-6 py-3 font-medium transition-colors ${activeTab === 'FG' ? 'border-b-2 border-primary text-primary' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
        >
          Finished Goods Inventory
        </button>
      </div>

      {activeTab === 'RM' ? (
        <div className="grid grid-cols-5 gap-4">
          <StatCard title="Total Received (MT)" value={rmTotalReceived} icon={Warehouse} color="bg-blue-500" />
          <StatCard title="Used in Prod. (MT)" value={rmTotalUsed} icon={TrendingDown} color="bg-indigo-500" />
          <StatCard title="Closing Stock (MT)" value={rmClosingStock} icon={Package} color="bg-emerald-500" />
          <StatCard title="Pending Need (MT)" value={rmPendingNeed} icon={ShoppingCart} color="bg-amber-500" />
          <StatCard title="Shortfall (MT)" value={rmShortfall} icon={AlertTriangle} color="bg-red-500" isNegative={rmShortfall > 0} />
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-4">
          <StatCard title="Total Produced (MT)" value={fgTotalProduced} icon={Factory} color="bg-blue-500" />
          <StatCard title="Total Dispatched (MT)" value={fgTotalDispatched} icon={TrendingUp} color="bg-indigo-500" />
          <StatCard title="Closing Stock (MT)" value={fgClosingStock} icon={Package} color="bg-emerald-500" />
          <StatCard title="Pending Need (MT)" value={fgPendingNeed} icon={ShoppingCart} color="bg-amber-500" />
          <StatCard title="Shortfall (MT)" value={fgShortfall} icon={AlertTriangle} color="bg-red-500" isNegative={fgShortfall > 0} />
        </div>
      )}

      <Card>
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
          <div className="flex gap-4 items-center w-full max-w-3xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <Input 
                placeholder={`Search ${activeTab === 'RM' ? 'raw materials' : 'finished goods'} by lot, batch, grade...`} 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white"
              />
            </div>
            <Select className="w-48 bg-white">
              <option value="">All Grades</option>
              <option value="Grade A">Grade A</option>
              <option value="Grade B">Grade B</option>
              <option value="Grade C">Grade C</option>
            </Select>
            <Select className="w-48 bg-white">
              <option value="">All Warehouses</option>
              <option value="Main">Main Warehouse</option>
              <option value="FG">FG Store</option>
            </Select>
          </div>
        </div>
        
        <DataTable 
          columns={currentCols} 
          data={pagination.paginatedData} 
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          itemsPerPage={pagination.itemsPerPage}
          onPageChange={pagination.setCurrentPage}
          onItemsPerPageChange={pagination.setItemsPerPage}
          totalResults={pagination.totalResults}
          getRowClass={(row) => {
            if (row.closingStock < 0 || row.shortage < 0) return '!bg-red-50/60 border-l-4 border-l-red-500';
            if (row.closingStock < 20) return '!bg-amber-50/60 border-l-4 border-l-amber-500';
            return 'border-l-4 border-l-transparent';
          }}
        />
      </Card>
    </div>
  );
};