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
      cleanedOutputMt: (qty * 0.98).toFixed(2),
      destonedOutputMt: (qty * 0.97).toFixed(2),
      brownRiceMt: (qty * 0.78).toFixed(2),
      huskMt: (qty * 0.20).toFixed(2),
      whiteRiceMt: (qty * 0.68).toFixed(2),
      branMt: (qty * 0.08).toFixed(2),
      polishedRiceMt: (qty * 0.65).toFixed(2),
      ricePolishMt: (qty * 0.03).toFixed(2),
      headRiceMt: (qty * 0.58).toFixed(2),
      brokenRiceMt: (qty * 0.05).toFixed(2),
      rejectionMt: (qty * 0.01).toFixed(2),
      totalMillingDuration: 8,
      powerConsumed: 450,
      millingDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
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

export const MillingProcess = () => {
  const [pendingItems, setPendingItems] = useState(generateDummyData().slice(0, 20));
  const [historyItems, setHistoryItems] = useState(generateDummyData().slice(20, 40));
  
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
    
    
    
    
    autoFields = { millingSessionId: 'MILL-2026-' + Math.floor(Math.random()*10000) };
    
    
    
    
    
    
    
    const readOnlyFields = ["millingSessionId","batchNo","productionOrderNo"];
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
          Process Milling
        </Button>
      </div>
    )
  };

  const pendingCols = [{"header":"Pre-QC ID","accessor":"preQcId"},{"header":"Batch No","accessor":"batchNo"},{"header":"Production Order No","accessor":"productionOrderNo"},{"header":"Paddy Grade","accessor":"paddyGradeConfirmed"},{"header":"Paddy Qty Issued MT","accessor":"paddyQtyIssued"},{"header":"Expected Recovery %","accessor":"expectedRecoveryAfterTest"},{"header":"QC Result","accessor":"qcResult"},{"header":"Approved for Production","accessor":"approvedForProduction"}];
  const historyCols = [{"header":"Milling Session ID","accessor":"millingSessionId"},{"header":"Batch No","accessor":"batchNo"},{"header":"Production Order No","accessor":"productionOrderNo"},{"header":"Cleaning Output MT","accessor":"cleanedOutputMt"},{"header":"Destoned Output MT","accessor":"destonedOutputMt"},{"header":"Brown Rice MT","accessor":"brownRiceMt"},{"header":"Husk MT","accessor":"huskMt"},{"header":"White Rice MT","accessor":"whiteRiceMt"},{"header":"Bran MT","accessor":"branMt"},{"header":"Polished Rice MT","accessor":"polishedRiceMt"},{"header":"Polish MT","accessor":"ricePolishMt"},{"header":"Head Rice MT","accessor":"headRiceMt"},{"header":"Broken Rice MT","accessor":"brokenRiceMt"},{"header":"Rejection MT","accessor":"rejectionMt"},{"header":"Total Duration Hours","accessor":"totalMillingDuration"},{"header":"Power kWh","accessor":"powerConsumed"},{"header":"Date","accessor":"millingDate"}];

  const columns = activeTab === 'pending' ? [actionColumn, ...pendingCols] : historyCols;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Stage 6 - Milling Process</h2>
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
        title="Milling Details"
        size="5xl"
      >
        <div className="max-h-[85vh] overflow-y-auto">
          {/* Premium Header Banner */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-4 flex items-center justify-between">
            <div>
              <p className="text-slate-300 text-xs font-medium uppercase tracking-widest">Production Module</p>
              <h3 className="text-white text-lg font-bold mt-0.5">Milling Details</h3>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-white text-xs font-medium">In Progress</span>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              
              <div className={'p-3 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5'}>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Milling Session ID</Label>
                  <span className="text-[10px] bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded font-medium">AUTO</span>
                </div>
                <Input 
                  type="text"
                  value={formData.millingSessionId || ''} 
                  onChange={(e) => setFormData({...formData, millingSessionId: e.target.value})}
                  readOnly={true}
                  className={'bg-slate-100 text-slate-500 border-slate-200 cursor-not-allowed text-sm'}
                />
              </div>
              <div className={'p-3 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5'}>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Batch No</Label>
                  <span className="text-[10px] bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded font-medium">AUTO</span>
                </div>
                <Input 
                  type="text"
                  value={formData.batchNo || ''} 
                  onChange={(e) => setFormData({...formData, batchNo: e.target.value})}
                  readOnly={true}
                  className={'bg-slate-100 text-slate-500 border-slate-200 cursor-not-allowed text-sm'}
                />
              </div>
              <div className={'p-3 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5'}>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Production Order No</Label>
                  <span className="text-[10px] bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded font-medium">AUTO</span>
                </div>
                <Input 
                  type="text"
                  value={formData.productionOrderNo || ''} 
                  onChange={(e) => setFormData({...formData, productionOrderNo: e.target.value})}
                  readOnly={true}
                  className={'bg-slate-100 text-slate-500 border-slate-200 cursor-not-allowed text-sm'}
                />
              </div>
              <div className={'p-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-primary/30 transition-all space-y-1.5'}>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Cleaning Input MT</Label>
                  
                </div>
                <Input 
                  type="number"
                  value={formData.cleaningInputMt || ''} 
                  onChange={(e) => setFormData({...formData, cleaningInputMt: e.target.value})}
                  readOnly={false}
                  className={'border-slate-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 text-sm bg-white'}
                />
              </div>
              <div className={'p-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-primary/30 transition-all space-y-1.5'}>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Cleaned Output MT</Label>
                  
                </div>
                <Input 
                  type="number"
                  value={formData.cleanedOutputMt || ''} 
                  onChange={(e) => setFormData({...formData, cleanedOutputMt: e.target.value})}
                  readOnly={false}
                  className={'border-slate-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 text-sm bg-white'}
                />
              </div>
              <div className={'p-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-primary/30 transition-all space-y-1.5'}>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Dust Removed Kg</Label>
                  
                </div>
                <Input 
                  type="number"
                  value={formData.dustRemovedKg || ''} 
                  onChange={(e) => setFormData({...formData, dustRemovedKg: e.target.value})}
                  readOnly={false}
                  className={'border-slate-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 text-sm bg-white'}
                />
              </div>
              <div className={'p-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-primary/30 transition-all space-y-1.5'}>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Stones/Debris Removed Kg</Label>
                  
                </div>
                <Input 
                  type="number"
                  value={formData.stonesRemovedKg || ''} 
                  onChange={(e) => setFormData({...formData, stonesRemovedKg: e.target.value})}
                  readOnly={false}
                  className={'border-slate-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 text-sm bg-white'}
                />
              </div>
              <div className={'p-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-primary/30 transition-all space-y-1.5'}>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Destoning Input MT</Label>
                  
                </div>
                <Input 
                  type="number"
                  value={formData.destoningInputMt || ''} 
                  onChange={(e) => setFormData({...formData, destoningInputMt: e.target.value})}
                  readOnly={false}
                  className={'border-slate-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 text-sm bg-white'}
                />
              </div>
              <div className={'p-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-primary/30 transition-all space-y-1.5'}>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Destoned Output MT</Label>
                  
                </div>
                <Input 
                  type="number"
                  value={formData.destonedOutputMt || ''} 
                  onChange={(e) => setFormData({...formData, destonedOutputMt: e.target.value})}
                  readOnly={false}
                  className={'border-slate-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 text-sm bg-white'}
                />
              </div>
              <div className={'p-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-primary/30 transition-all space-y-1.5'}>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Dehusking Input MT</Label>
                  
                </div>
                <Input 
                  type="number"
                  value={formData.dehuskingInputMt || ''} 
                  onChange={(e) => setFormData({...formData, dehuskingInputMt: e.target.value})}
                  readOnly={false}
                  className={'border-slate-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 text-sm bg-white'}
                />
              </div>
              <div className={'p-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-primary/30 transition-all space-y-1.5'}>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Brown Rice Output MT</Label>
                  
                </div>
                <Input 
                  type="number"
                  value={formData.brownRiceMt || ''} 
                  onChange={(e) => setFormData({...formData, brownRiceMt: e.target.value})}
                  readOnly={false}
                  className={'border-slate-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 text-sm bg-white'}
                />
              </div>
              <div className={'p-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-primary/30 transition-all space-y-1.5'}>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Husk Generated MT</Label>
                  
                </div>
                <Input 
                  type="number"
                  value={formData.huskMt || ''} 
                  onChange={(e) => setFormData({...formData, huskMt: e.target.value})}
                  readOnly={false}
                  className={'border-slate-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 text-sm bg-white'}
                />
              </div>
              <div className={'p-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-primary/30 transition-all space-y-1.5'}>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Separator Input MT</Label>
                  
                </div>
                <Input 
                  type="number"
                  value={formData.separatorInputMt || ''} 
                  onChange={(e) => setFormData({...formData, separatorInputMt: e.target.value})}
                  readOnly={false}
                  className={'border-slate-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 text-sm bg-white'}
                />
              </div>
              <div className={'p-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-primary/30 transition-all space-y-1.5'}>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Separated Brown Rice MT</Label>
                  
                </div>
                <Input 
                  type="number"
                  value={formData.separatedBrownRiceMt || ''} 
                  onChange={(e) => setFormData({...formData, separatedBrownRiceMt: e.target.value})}
                  readOnly={false}
                  className={'border-slate-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 text-sm bg-white'}
                />
              </div>
              <div className={'p-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-primary/30 transition-all space-y-1.5'}>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Whitening Input MT</Label>
                  
                </div>
                <Input 
                  type="number"
                  value={formData.whiteningInputMt || ''} 
                  onChange={(e) => setFormData({...formData, whiteningInputMt: e.target.value})}
                  readOnly={false}
                  className={'border-slate-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 text-sm bg-white'}
                />
              </div>
              <div className={'p-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-primary/30 transition-all space-y-1.5'}>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">White Rice Output MT</Label>
                  
                </div>
                <Input 
                  type="number"
                  value={formData.whiteRiceMt || ''} 
                  onChange={(e) => setFormData({...formData, whiteRiceMt: e.target.value})}
                  readOnly={false}
                  className={'border-slate-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 text-sm bg-white'}
                />
              </div>
              <div className={'p-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-primary/30 transition-all space-y-1.5'}>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Bran Generated MT</Label>
                  
                </div>
                <Input 
                  type="number"
                  value={formData.branMt || ''} 
                  onChange={(e) => setFormData({...formData, branMt: e.target.value})}
                  readOnly={false}
                  className={'border-slate-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 text-sm bg-white'}
                />
              </div>
              <div className={'p-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-primary/30 transition-all space-y-1.5'}>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Polishing Input MT</Label>
                  
                </div>
                <Input 
                  type="number"
                  value={formData.polishingInputMt || ''} 
                  onChange={(e) => setFormData({...formData, polishingInputMt: e.target.value})}
                  readOnly={false}
                  className={'border-slate-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 text-sm bg-white'}
                />
              </div>
              <div className={'p-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-primary/30 transition-all space-y-1.5'}>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Polished Rice Output MT</Label>
                  
                </div>
                <Input 
                  type="number"
                  value={formData.polishedRiceMt || ''} 
                  onChange={(e) => setFormData({...formData, polishedRiceMt: e.target.value})}
                  readOnly={false}
                  className={'border-slate-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 text-sm bg-white'}
                />
              </div>
              <div className={'p-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-primary/30 transition-all space-y-1.5'}>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Rice Polish Generated MT</Label>
                  
                </div>
                <Input 
                  type="number"
                  value={formData.ricePolishMt || ''} 
                  onChange={(e) => setFormData({...formData, ricePolishMt: e.target.value})}
                  readOnly={false}
                  className={'border-slate-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 text-sm bg-white'}
                />
              </div>
              <div className={'p-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-primary/30 transition-all space-y-1.5'}>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Grading Input MT</Label>
                  
                </div>
                <Input 
                  type="number"
                  value={formData.gradingInputMt || ''} 
                  onChange={(e) => setFormData({...formData, gradingInputMt: e.target.value})}
                  readOnly={false}
                  className={'border-slate-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 text-sm bg-white'}
                />
              </div>
              <div className={'p-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-primary/30 transition-all space-y-1.5'}>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Grade A / Head Rice MT</Label>
                  
                </div>
                <Input 
                  type="number"
                  value={formData.headRiceMt || ''} 
                  onChange={(e) => setFormData({...formData, headRiceMt: e.target.value})}
                  readOnly={false}
                  className={'border-slate-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 text-sm bg-white'}
                />
              </div>
              <div className={'p-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-primary/30 transition-all space-y-1.5'}>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Grade B Rice MT</Label>
                  
                </div>
                <Input 
                  type="number"
                  value={formData.gradeBRiceMt || ''} 
                  onChange={(e) => setFormData({...formData, gradeBRiceMt: e.target.value})}
                  readOnly={false}
                  className={'border-slate-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 text-sm bg-white'}
                />
              </div>
              <div className={'p-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-primary/30 transition-all space-y-1.5'}>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Broken Rice MT</Label>
                  
                </div>
                <Input 
                  type="number"
                  value={formData.brokenRiceMt || ''} 
                  onChange={(e) => setFormData({...formData, brokenRiceMt: e.target.value})}
                  readOnly={false}
                  className={'border-slate-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 text-sm bg-white'}
                />
              </div>
              <div className={'p-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-primary/30 transition-all space-y-1.5'}>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Small Broken MT</Label>
                  
                </div>
                <Input 
                  type="number"
                  value={formData.smallBrokenMt || ''} 
                  onChange={(e) => setFormData({...formData, smallBrokenMt: e.target.value})}
                  readOnly={false}
                  className={'border-slate-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 text-sm bg-white'}
                />
              </div>
              <div className={'p-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-primary/30 transition-all space-y-1.5'}>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Color Sorting Input MT</Label>
                  
                </div>
                <Input 
                  type="number"
                  value={formData.colorSortingInputMt || ''} 
                  onChange={(e) => setFormData({...formData, colorSortingInputMt: e.target.value})}
                  readOnly={false}
                  className={'border-slate-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 text-sm bg-white'}
                />
              </div>
              <div className={'p-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-primary/30 transition-all space-y-1.5'}>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Sorted Rice Output MT</Label>
                  
                </div>
                <Input 
                  type="number"
                  value={formData.sortedRiceOutputMt || ''} 
                  onChange={(e) => setFormData({...formData, sortedRiceOutputMt: e.target.value})}
                  readOnly={false}
                  className={'border-slate-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 text-sm bg-white'}
                />
              </div>
              <div className={'p-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-primary/30 transition-all space-y-1.5'}>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Rejection/Discard MT</Label>
                  
                </div>
                <Input 
                  type="number"
                  value={formData.rejectionMt || ''} 
                  onChange={(e) => setFormData({...formData, rejectionMt: e.target.value})}
                  readOnly={false}
                  className={'border-slate-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 text-sm bg-white'}
                />
              </div>
              <div className={'p-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-primary/30 transition-all space-y-1.5'}>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Total Milling Duration (Hours)</Label>
                  
                </div>
                <Input 
                  type="number"
                  value={formData.totalMillingDuration || ''} 
                  onChange={(e) => setFormData({...formData, totalMillingDuration: e.target.value})}
                  readOnly={false}
                  className={'border-slate-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 text-sm bg-white'}
                />
              </div>
              <div className={'p-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-primary/30 transition-all space-y-1.5'}>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Power Consumed (kWh)</Label>
                  
                </div>
                <Input 
                  type="number"
                  value={formData.powerConsumed || ''} 
                  onChange={(e) => setFormData({...formData, powerConsumed: e.target.value})}
                  readOnly={false}
                  className={'border-slate-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 text-sm bg-white'}
                />
              </div>
              <div className={'p-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-primary/30 transition-all space-y-1.5'}>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Date</Label>
                  
                </div>
                <Input 
                  type="date"
                  value={formData.millingDate || ''} 
                  onChange={(e) => setFormData({...formData, millingDate: e.target.value})}
                  readOnly={false}
                  className={'border-slate-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 text-sm bg-white'}
                />
              </div>
              <div className={'p-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-primary/30 transition-all space-y-1.5'}>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Overall Milling Remarks</Label>
                  
                </div>
                <Input 
                  type="text"
                  value={formData.millingRemarks || ''} 
                  onChange={(e) => setFormData({...formData, millingRemarks: e.target.value})}
                  readOnly={false}
                  className={'border-slate-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 text-sm bg-white'}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <Button onClick={() => setIsModalOpen(false)} variant="outline" className="px-6">
                Cancel
              </Button>
              <Button onClick={handleSave} className="px-6 bg-gradient-to-r from-primary to-primary/80 shadow-md">
                Save & Process
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
