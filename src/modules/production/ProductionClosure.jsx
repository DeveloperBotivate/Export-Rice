import React, { useState, useEffect } from 'react';
import { Search, Play } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input, Label, Select } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import DataTable from '../../components/DataTable';
import { usePagination } from '../../hooks/usePagination';
import { Modal } from '../../components/ui/Modal';
import { PageTabs } from '../../components/PageTabs';

const generateDummyData = () => {
  return Array.from({ length: 40 }, (_, i) => {
    const qty = Math.floor(Math.random() * 50) + 10;
    
    return {
      id: i + 1,
      planNo: `PP-2026-${(i + 1).toString().padStart(4, '0')}`,
      productionOrderNo: `PRD-2026-${(i + 1).toString().padStart(4, '0')}`,
      batchNo: `BT-2026-${(i + 1).toString().padStart(4, '0')}`,
      lotNo: `LT-2026-${(i + 1).toString().padStart(4, '0')}`,
      planDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      paddyVariety: ['Basmati', 'Sona Masuri', 'IR64'][Math.floor(Math.random() * 3)],
      plannedInputQty: qty,
      targetHeadRice: (qty * 0.6).toFixed(2),
      expectedRecovery: 60,
      plant: 'Mill Unit 1',
      shift: ['Morning', 'Evening', 'Night'][Math.floor(Math.random() * 3)],
      supervisor: 'Rajesh',
      plannedBy: 'Production Head',
      orderDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      operatorAllocated: 'Suresh',
      productionStartDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      productionEndDate: `2026-06-${(i % 28 + 2).toString().padStart(2, '0')}`,
      priority: 'Normal',
      status: 'In Progress',
      batchDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      sourceStockId: `STK-${Math.floor(Math.random() * 1000)}`,
      sourceWarehouse: 'Godown A',
      qtyToProcess: qty,
      machineUsed: `MCH-${Math.floor(Math.random() * 10)}`,
      batchStartTime: '08:00',
      batchEndTime: '16:00',
      issueId: `RMI-2026-${(i + 1).toString().padStart(4, '0')}`,
      issueDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}T08:30`,
      paddyQtyIssued: qty,
      ppBagsIssued: 'PP-50KG (1000)',
      boppBagsIssued: 'BOPP-25KG (500)',
      threadIssued: 'TH-01 (10)',
      labelsIssued: 'LBL-01 (2000)',
      issuedBy: 'Store Keeper',
      receivedBy: 'Suresh',
      preQcId: `PQC-2026-${(i + 1).toString().padStart(4, '0')}`,
      testDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}T09:00`,
      moisturePercent: 12.5,
      foreignMatterPercent: 1.2,
      brokenPercent: 2.5,
      chalkyPercent: 1.0,
      paddyGradeConfirmed: 'A',
      expectedRecoveryAfterTest: 62,
      qcResult: 'Pass',
      approvedForProduction: 'Yes',
      labTechnician: 'Dr. Kumar',
      millingSessionId: `MILL-2026-${(i + 1).toString().padStart(4, '0')}`,
      cleaningId: `CLN-2026-${(i + 1).toString().padStart(4, '0')}`,
      cleaningInputMt: qty,
      cleanedOutputMt: (qty * 0.98).toFixed(2),
      dustRemovedKg: 15,
      stonesRemovedKg: 5,
      foreignMatterRemovedKg: 2,
      dehuskingId: `DHK-2026-${(i + 1).toString().padStart(4, '0')}`,
      dehuskingInputMt: (qty * 0.98).toFixed(2),
      brownRiceMt: (qty * 0.78).toFixed(2),
      huskMt: (qty * 0.20).toFixed(2),
      dehuskingEfficiency: 95,
      rubberRollId: 'RR-10',
      machineRpm: 1400,
      separationId: `SEP-2026-${(i + 1).toString().padStart(4, '0')}`,
      separatorInputMt: (qty * 0.78).toFixed(2),
      separatedBrownRiceMt: (qty * 0.76).toFixed(2),
      paddyReturnedMt: 0.5,
      separatorEfficiency: 98,
      polishingId: `POL-2026-${(i + 1).toString().padStart(4, '0')}`,
      polishingInputMt: (qty * 0.76).toFixed(2),
      whiteRiceMt: (qty * 0.68).toFixed(2),
      branMt: (qty * 0.08).toFixed(2),
      polishedRiceMt: (qty * 0.65).toFixed(2),
      ricePolishMt: (qty * 0.03).toFixed(2),
      polishingDegree: 8,
      waterUsedL: 50,
      gradingId: `GRD-2026-${(i + 1).toString().padStart(4, '0')}`,
      gradingInputMt: (qty * 0.65).toFixed(2),
      headRiceMt: (qty * 0.58).toFixed(2),
      gradeBRiceMt: (qty * 0.02).toFixed(2),
      brokenRiceMt: (qty * 0.05).toFixed(2),
      smallBrokenMt: (qty * 0.01).toFixed(2),
      sieveSize: '3mm',
      colorSortId: `CS-2026-${(i + 1).toString().padStart(4, '0')}`,
      colorSortingInputMt: (qty * 0.60).toFixed(2),
      sortedRiceOutputMt: (qty * 0.59).toFixed(2),
      rejectionMt: (qty * 0.01).toFixed(2),
      rejectionPercent: 1.5,
      noOfPasses: 2,
      totalMillingDuration: 8,
      powerConsumed: 450,
      millingDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}T10:00`,
      finalQcId: `FQC-2026-${(i + 1).toString().padStart(4, '0')}`,
      inspectionDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}T17:00`,
      finalMoisturePercent: 13,
      finalBrokenPercent: 4.5,
      finalChalkyPercent: 0.5,
      finalForeignMatterPercent: 0.1,
      finalColour: 'L-85',
      finalHeadRiceGrade: 'Premium',
      finalBrokenRiceGrade: 'A',
      finalQcResult: 'Pass',
      finalQcInspector: 'Dr. Kumar',
      yieldId: `YLD-2026-${(i + 1).toString().padStart(4, '0')}`,
      yieldDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      totalPaddyInputMt: qty,
      wasteMt: (qty * 0.02).toFixed(2),
      headRiceRecovery: 58,
      totalRiceRecovery: 63,
      millingPercent: 65,
      expectedHeadRiceMt: (qty * 0.6).toFixed(2),
      varianceMt: (qty * 0.58 - qty * 0.6).toFixed(2),
      variancePercent: -2,
      totalMachineHours: 8,
      downtimeHours: 0,
      calculatedBy: 'System',
      fgEntryId: `FGE-2026-${(i + 1).toString().padStart(4, '0')}`,
      fgEntryDate: `2026-06-${(i % 28 + 2).toString().padStart(2, '0')}`,
      headRiceLotNo: `LT-R${(i + 1).toString().padStart(3, '0')}`,
      headRiceBatchNo: `BT-R${(i + 1).toString().padStart(3, '0')}`,
      targetWarehouse: 'FG Warehouse 1',
      totalFgValue: qty * 45000,
      fgEnteredBy: 'Store Keeper',
      packingOrderNo: `PKO-2026-${(i + 1).toString().padStart(4, '0')}`,
      packingDate: `2026-06-${(i % 28 + 2).toString().padStart(2, '0')}`,
      bagType: 'PP',
      bagSize: '25kg',
      noOfBagsRequired: (qty * 0.58 * 1000) / 25,
      totalPackedMt: (qty * 0.58).toFixed(2),
      barcodeSeries: `8901000${i}0000 - 8901000${i}9999`,
      qrBatchId: `QR-2026-${(i + 1).toString().padStart(4, '0')}`,
      mrp: 1800,
      bestBeforeDate: `2027-06-${(i % 28 + 2).toString().padStart(2, '0')}`,
      packingQcResult: 'Pass',
      packingSupervisor: 'Vikram',
      fgwEntryId: `FGW-2026-${(i + 1).toString().padStart(4, '0')}`,
      fgwEntryDate: `2026-06-${(i % 28 + 2).toString().padStart(2, '0')}T18:00`,
      fgWarehouse: 'FG Warehouse 1',
      fgGodown: 'Godown 1',
      fgRack: 'Rack A',
      fgBin: 'Bin 1',
      fgwStockValue: qty * 45000,
      fgwEntryDoneBy: 'Store Keeper',
      closureId: `PCL-2026-${(i + 1).toString().padStart(4, '0')}`,
      closureDate: `2026-06-${(i % 28 + 3).toString().padStart(2, '0')}`,
      machineEfficiency: 95,
      labourCost: 5000,
      totalBatchCost: qty * 25000 + 5000 + 2000,
      costPerMt: (qty * 25000 + 5000 + 2000) / qty,
      batchProfitLoss: qty * 45000 - (qty * 25000 + 5000 + 2000),
      batchStatus: 'Closed',
      closedBy: 'Production Head'
    };
  });
};

export const ProductionClosure = () => {
  const getInitialData = () => {
    const rawPending = JSON.parse(localStorage.getItem('production_16_history')) || [];
    const rawHistory = JSON.parse(localStorage.getItem('production_17_history')) || [];
    const master = JSON.parse(localStorage.getItem('production_master')) || [];
    
    const resolvedPending = rawPending.map(id => master.find(m => m.id === id)).filter(Boolean);
    const resolvedHistory = rawHistory.map(id => master.find(m => m.id === id)).filter(Boolean);
    
    const pending = resolvedPending.filter(p => !rawHistory.includes(p.id));
    return { pending, history: resolvedHistory };
  };

  const initial = getInitialData();
  const [pendingItems, setPendingItems] = useState(initial.pending);
  const [historyItems, setHistoryItems] = useState(initial.history);
  
  const [activeTab, setActiveTab] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({});

  const displayData = activeTab === 'pending' ? pendingItems : historyItems;
  
  const filteredData = displayData.filter(item => 
    Object.values(item).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const pagination = usePagination(filteredData, 10);

  const handleActionClick = (item) => {
    setSelectedItem(item);
    
    let autoFields = {};
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    autoFields = { closureId: 'PCL-2026-' + Math.floor(Math.random()*10000) };
    
    const readOnlyFields = ["fgwEntryId","batchNo","productionOrderNo","planNo","closureId","totalPaddyInputMt","headRiceMt","brokenRiceMt","branMt","huskMt","ricePolishMt","wasteMt","headRiceRecovery","totalRiceRecovery","millingPercent","expectedRecovery","variancePercent","totalMachineHours","powerConsumed","downtimeHours","totalLabourHours","totalBatchCost","costPerMt","batchProfitLoss"];
    const initialFormData = {};
    readOnlyFields.forEach(field => {
      initialFormData[field] = item[field];
    });
    
    setFormData({ ...initialFormData, ...autoFields });
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (isModalOpen && formData) {
      
      
      
    }
  }, [formData, isModalOpen]);

  const handleSave = () => {
    const processedItem = { ...selectedItem, ...formData, status: 'Completed' };
    
    const master = JSON.parse(localStorage.getItem('production_master')) || [];
    const updatedMaster = master.map(m => m.id === processedItem.id ? processedItem : m);
    localStorage.setItem('production_master', JSON.stringify(updatedMaster));

    const rawHistory = JSON.parse(localStorage.getItem('production_17_history')) || [];
    if (!rawHistory.includes(processedItem.id)) {
      rawHistory.unshift(processedItem.id);
      localStorage.setItem('production_17_history', JSON.stringify(rawHistory));
    }
    
    setHistoryItems([processedItem, ...historyItems]);
    setPendingItems(pendingItems.filter(p => p.id !== selectedItem.id));
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const actionColumn = {
    header: 'Action',
    className: 'text-right',
    cell: (row) => (
      <div className="flex justify-end">
        <Button size="sm" onClick={() => handleActionClick(row)} className="flex items-center gap-1 bg-primary text-white">
          <Play size={14} />
          Close Production
        </Button>
      </div>
    )
  };

  const pendingCols = [{"header":"FG Warehouse Entry ID","accessor":"fgwEntryId"},{"header":"Packing Order No","accessor":"packingOrderNo"},{"header":"Batch No","accessor":"batchNo"},{"header":"Production Order No","accessor":"productionOrderNo"},{"header":"Rice Grade","accessor":"finalHeadRiceGrade"},{"header":"Total Net Weight MT","accessor":"totalPackedMt"},{"header":"Entry Date","accessor":"fgwEntryDate"},{"header":"Entry Done By","accessor":"fgwEntryDoneBy"}];
  const historyCols = [{"header":"Closure ID","accessor":"closureId"},{"header":"Batch No","accessor":"batchNo"},{"header":"Production Order No","accessor":"productionOrderNo"},{"header":"Plan No","accessor":"planNo"},{"header":"Closure Date","accessor":"closureDate"},{"header":"Paddy Input MT","accessor":"totalPaddyInputMt"},{"header":"Head Rice MT","accessor":"headRiceMt"},{"header":"Broken Rice MT","accessor":"brokenRiceMt"},{"header":"Bran MT","accessor":"branMt"},{"header":"Husk MT","accessor":"huskMt"},{"header":"Head Rice Recovery %","accessor":"headRiceRecovery"},{"header":"Total Recovery %","accessor":"totalRiceRecovery"},{"header":"Milling %","accessor":"millingPercent"},{"header":"Variance %","accessor":"variancePercent"},{"header":"Machine Hours","accessor":"totalMachineHours"},{"header":"Power kWh","accessor":"powerConsumed"},{"header":"Machine Efficiency %","accessor":"machineEfficiency"},{"header":"Labour Cost ₹","accessor":"labourCost"},{"header":"Total Batch Cost ₹","accessor":"totalBatchCost"},{"header":"Cost per MT ₹","accessor":"costPerMt"},{"header":"Batch Profit/Loss ₹","accessor":"batchProfitLoss"},{"header":"Batch Status","accessor":"batchStatus"},{"header":"Closed By","accessor":"closedBy"}];

  const columns = activeTab === 'pending' ? [actionColumn, ...pendingCols] : historyCols;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Stage 12 - Production Closure</h2>
      </div>

      <PageTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <Card>
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input 
              type="text" 
              placeholder="Search..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <DataTable 
          columns={columns} 
          data={pagination.paginatedData} 
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          itemsPerPage={pagination.itemsPerPage}
          onPageChange={pagination.setCurrentPage}
          onItemsPerPageChange={pagination.setItemsPerPage}
          totalResults={pagination.totalResults}
        />
      </Card>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Stage 12 - Production Closure Details"
        size="4xl"
      >
        <div className="max-h-[85vh] overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">FG Warehouse Entry ID</Label>
              <Input 
                type="text"
                value={formData.fgwEntryId || ''} 
                onChange={(e) => setFormData({...formData, fgwEntryId: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Batch No</Label>
              <Input 
                type="text"
                value={formData.batchNo || ''} 
                onChange={(e) => setFormData({...formData, batchNo: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Production Order No</Label>
              <Input 
                type="text"
                value={formData.productionOrderNo || ''} 
                onChange={(e) => setFormData({...formData, productionOrderNo: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Plan No</Label>
              <Input 
                type="text"
                value={formData.planNo || ''} 
                onChange={(e) => setFormData({...formData, planNo: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Closure ID</Label>
              <Input 
                type="text"
                value={formData.closureId || ''} 
                onChange={(e) => setFormData({...formData, closureId: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Closure Date</Label>
              <Input 
                type="date"
                value={formData.closureDate || ''} 
                onChange={(e) => setFormData({...formData, closureDate: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Total Paddy Input MT</Label>
              <Input 
                type="number"
                value={formData.totalPaddyInputMt || ''} 
                onChange={(e) => setFormData({...formData, totalPaddyInputMt: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Head Rice MT</Label>
              <Input 
                type="number"
                value={formData.headRiceMt || ''} 
                onChange={(e) => setFormData({...formData, headRiceMt: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Broken Rice MT</Label>
              <Input 
                type="number"
                value={formData.brokenRiceMt || ''} 
                onChange={(e) => setFormData({...formData, brokenRiceMt: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Bran MT</Label>
              <Input 
                type="number"
                value={formData.branMt || ''} 
                onChange={(e) => setFormData({...formData, branMt: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Husk MT</Label>
              <Input 
                type="number"
                value={formData.huskMt || ''} 
                onChange={(e) => setFormData({...formData, huskMt: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Polish MT</Label>
              <Input 
                type="number"
                value={formData.ricePolishMt || ''} 
                onChange={(e) => setFormData({...formData, ricePolishMt: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Waste MT</Label>
              <Input 
                type="number"
                value={formData.wasteMt || ''} 
                onChange={(e) => setFormData({...formData, wasteMt: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Head Rice Recovery %</Label>
              <Input 
                type="number"
                value={formData.headRiceRecovery || ''} 
                onChange={(e) => setFormData({...formData, headRiceRecovery: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Total Rice Recovery %</Label>
              <Input 
                type="number"
                value={formData.totalRiceRecovery || ''} 
                onChange={(e) => setFormData({...formData, totalRiceRecovery: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Milling %</Label>
              <Input 
                type="number"
                value={formData.millingPercent || ''} 
                onChange={(e) => setFormData({...formData, millingPercent: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Expected Recovery %</Label>
              <Input 
                type="number"
                value={formData.expectedRecovery || ''} 
                onChange={(e) => setFormData({...formData, expectedRecovery: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Variance %</Label>
              <Input 
                type="number"
                value={formData.variancePercent || ''} 
                onChange={(e) => setFormData({...formData, variancePercent: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Total Machine Hours</Label>
              <Input 
                type="number"
                value={formData.totalMachineHours || ''} 
                onChange={(e) => setFormData({...formData, totalMachineHours: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Total Power kWh</Label>
              <Input 
                type="number"
                value={formData.powerConsumed || ''} 
                onChange={(e) => setFormData({...formData, powerConsumed: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Machine Efficiency %</Label>
              <Input 
                type="number"
                value={formData.machineEfficiency || ''} 
                onChange={(e) => setFormData({...formData, machineEfficiency: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Total Downtime Hours</Label>
              <Input 
                type="number"
                value={formData.downtimeHours || ''} 
                onChange={(e) => setFormData({...formData, downtimeHours: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Total Labour Hours</Label>
              <Input 
                type="number"
                value={formData.totalLabourHours || ''} 
                onChange={(e) => setFormData({...formData, totalLabourHours: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">No. of Workers</Label>
              <Input 
                type="number"
                value={formData.noOfWorkers || ''} 
                onChange={(e) => setFormData({...formData, noOfWorkers: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Labour Cost ₹</Label>
              <Input 
                type="number"
                value={formData.labourCost || ''} 
                onChange={(e) => setFormData({...formData, labourCost: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Paddy Cost ₹</Label>
              <Input 
                type="number"
                value={formData.paddyCost || ''} 
                onChange={(e) => setFormData({...formData, paddyCost: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Packing Material Cost ₹</Label>
              <Input 
                type="number"
                value={formData.packingMaterialCost || ''} 
                onChange={(e) => setFormData({...formData, packingMaterialCost: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Power Cost ₹</Label>
              <Input 
                type="number"
                value={formData.powerCost || ''} 
                onChange={(e) => setFormData({...formData, powerCost: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Other Overheads ₹</Label>
              <Input 
                type="number"
                value={formData.otherOverheads || ''} 
                onChange={(e) => setFormData({...formData, otherOverheads: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Total Batch Cost ₹</Label>
              <Input 
                type="number"
                value={formData.totalBatchCost || ''} 
                onChange={(e) => setFormData({...formData, totalBatchCost: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Cost per MT ₹</Label>
              <Input 
                type="number"
                value={formData.costPerMt || ''} 
                onChange={(e) => setFormData({...formData, costPerMt: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Batch Profit/Loss ₹</Label>
              <Input 
                type="number"
                value={formData.batchProfitLoss || ''} 
                onChange={(e) => setFormData({...formData, batchProfitLoss: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Batch Status</Label>
              <Select 
                value={formData.batchStatus || ''} 
                onChange={(e) => setFormData({...formData, batchStatus: e.target.value})}
                disabled={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              >
                <option value="">Select...</option>
                <option value="Closed">Closed</option><option value="Partial">Partial</option><option value="Rejected">Rejected</option>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Closed By</Label>
              <Input 
                type="text"
                value={formData.closedBy || ''} 
                onChange={(e) => setFormData({...formData, closedBy: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Closure Remarks</Label>
              <Input 
                type="text"
                value={formData.closureRemarks || ''} 
                onChange={(e) => setFormData({...formData, closureRemarks: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-8 mt-8 border-t border-slate-100">
            <Button onClick={() => setIsModalOpen(false)} variant="outline" className="px-6">
              Cancel
            </Button>
            <Button onClick={handleSave} className="px-6 bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
              Save Details
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
