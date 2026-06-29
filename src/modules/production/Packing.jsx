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

export const Packing = () => {
  const getInitialData = () => {
    const rawPending = JSON.parse(localStorage.getItem('production_14_history')) || [];
    const rawHistory = JSON.parse(localStorage.getItem('production_15_history')) || [];
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
    
    
    
    
    
    
    
    
    
    
    
    
    
    autoFields = { packingOrderNo: 'PKO-2026-' + Math.floor(Math.random()*10000), qrBatchId: 'QR-2026-' + Math.floor(Math.random()*10000) };
    
    
    
    const readOnlyFields = ["fgEntryId","batchNo","productionOrderNo","packingOrderNo","finalHeadRiceGrade","headRiceLotNo","noOfBagsRequired","qrBatchId"];
    const initialFormData = {};
    readOnlyFields.forEach(field => {
      initialFormData[field] = item[field];
    });
    
    setFormData({ ...initialFormData, ...autoFields });
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (isModalOpen && formData) {
      
      
      
      const qtyPack = parseFloat(formData.qtyToPack) || 0;
      const netWt = parseFloat(formData.netWeightPerBag) || 0;
      const bags = netWt > 0 ? Math.ceil((qtyPack * 1000) / netWt) : 0;
      if (formData.noOfBagsRequired !== bags) {
        setFormData(prev => ({ ...prev, noOfBagsRequired: bags }));
      }
      
    }
  }, [formData, isModalOpen]);

  const handleSave = () => {
    const processedItem = { ...selectedItem, ...formData, status: 'Completed' };
    
    const master = JSON.parse(localStorage.getItem('production_master')) || [];
    const updatedMaster = master.map(m => m.id === processedItem.id ? processedItem : m);
    localStorage.setItem('production_master', JSON.stringify(updatedMaster));

    const rawHistory = JSON.parse(localStorage.getItem('production_15_history')) || [];
    if (!rawHistory.includes(processedItem.id)) {
      rawHistory.unshift(processedItem.id);
      localStorage.setItem('production_15_history', JSON.stringify(rawHistory));
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
          Pack Goods
        </Button>
      </div>
    )
  };

  const pendingCols = [{"header":"FG Entry ID","accessor":"fgEntryId"},{"header":"Batch No","accessor":"batchNo"},{"header":"Production Order No","accessor":"productionOrderNo"},{"header":"Head Rice Grade","accessor":"finalHeadRiceGrade"},{"header":"Head Rice MT","accessor":"headRiceMt"},{"header":"Head Rice Lot No","accessor":"headRiceLotNo"},{"header":"Target Warehouse","accessor":"targetWarehouse"},{"header":"Entry Date","accessor":"fgEntryDate"}];
  const historyCols = [{"header":"Packing Order No","accessor":"packingOrderNo"},{"header":"FG Entry ID","accessor":"fgEntryId"},{"header":"Batch No","accessor":"batchNo"},{"header":"Production Order No","accessor":"productionOrderNo"},{"header":"Packing Date","accessor":"packingDate"},{"header":"Rice Grade","accessor":"finalHeadRiceGrade"},{"header":"Lot No","accessor":"headRiceLotNo"},{"header":"Bag Type","accessor":"bagType"},{"header":"Bag Size","accessor":"bagSize"},{"header":"No. of Bags","accessor":"noOfBagsRequired"},{"header":"Total Packed MT","accessor":"totalPackedMt"},{"header":"Barcode Series","accessor":"barcodeSeries"},{"header":"QR Batch ID","accessor":"qrBatchId"},{"header":"MRP ₹","accessor":"mrp"},{"header":"Best Before","accessor":"bestBeforeDate"},{"header":"Packing QC Result","accessor":"packingQcResult"},{"header":"Packing Supervisor","accessor":"packingSupervisor"}];

  const columns = activeTab === 'pending' ? [actionColumn, ...pendingCols] : historyCols;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Stage 10 - Packing</h2>
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
        title="Stage 10 - Packing Details"
        size="4xl"
      >
        <div className="max-h-[85vh] overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">FG Entry ID</Label>
              <Input 
                type="text"
                value={formData.fgEntryId || ''} 
                onChange={(e) => setFormData({...formData, fgEntryId: e.target.value})}
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
              <Label className="text-sm font-medium text-slate-700">Packing Order No</Label>
              <Input 
                type="text"
                value={formData.packingOrderNo || ''} 
                onChange={(e) => setFormData({...formData, packingOrderNo: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Packing Date</Label>
              <Input 
                type="date"
                value={formData.packingDate || ''} 
                onChange={(e) => setFormData({...formData, packingDate: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Rice Grade</Label>
              <Input 
                type="text"
                value={formData.finalHeadRiceGrade || ''} 
                onChange={(e) => setFormData({...formData, finalHeadRiceGrade: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Lot No</Label>
              <Input 
                type="text"
                value={formData.headRiceLotNo || ''} 
                onChange={(e) => setFormData({...formData, headRiceLotNo: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Quantity to Pack MT</Label>
              <Input 
                type="number"
                value={formData.qtyToPack || ''} 
                onChange={(e) => setFormData({...formData, qtyToPack: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Bag Type</Label>
              <Select 
                value={formData.bagType || ''} 
                onChange={(e) => setFormData({...formData, bagType: e.target.value})}
                disabled={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              >
                <option value="">Select...</option>
                <option value="PP">PP</option><option value="BOPP">BOPP</option><option value="Jute">Jute</option><option value="HDPE">HDPE</option>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Bag Size</Label>
              <Select 
                value={formData.bagSize || ''} 
                onChange={(e) => setFormData({...formData, bagSize: e.target.value})}
                disabled={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              >
                <option value="">Select...</option>
                <option value="1kg">1kg</option><option value="2kg">2kg</option><option value="5kg">5kg</option><option value="10kg">10kg</option><option value="25kg">25kg</option><option value="50kg">50kg</option>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">No. of Bags Required</Label>
              <Input 
                type="number"
                value={formData.noOfBagsRequired || ''} 
                onChange={(e) => setFormData({...formData, noOfBagsRequired: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Net Weight per Bag Kg</Label>
              <Input 
                type="number"
                value={formData.netWeightPerBag || ''} 
                onChange={(e) => setFormData({...formData, netWeightPerBag: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Packing Material Stock ID</Label>
              <Input 
                type="text"
                value={formData.packingMaterialStockId || ''} 
                onChange={(e) => setFormData({...formData, packingMaterialStockId: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Label Type</Label>
              <Input 
                type="text"
                value={formData.labelType || ''} 
                onChange={(e) => setFormData({...formData, labelType: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Label Batch No</Label>
              <Input 
                type="text"
                value={formData.labelBatchNo || ''} 
                onChange={(e) => setFormData({...formData, labelBatchNo: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">FSSAI No</Label>
              <Input 
                type="text"
                value={formData.fssaiNo || ''} 
                onChange={(e) => setFormData({...formData, fssaiNo: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Manufacturing Date</Label>
              <Input 
                type="date"
                value={formData.manufacturingDate || ''} 
                onChange={(e) => setFormData({...formData, manufacturingDate: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Best Before Date</Label>
              <Input 
                type="date"
                value={formData.bestBeforeDate || ''} 
                onChange={(e) => setFormData({...formData, bestBeforeDate: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">MRP ₹</Label>
              <Input 
                type="number"
                value={formData.mrp || ''} 
                onChange={(e) => setFormData({...formData, mrp: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Barcode Format</Label>
              <Select 
                value={formData.barcodeFormat || ''} 
                onChange={(e) => setFormData({...formData, barcodeFormat: e.target.value})}
                disabled={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              >
                <option value="">Select...</option>
                <option value="EAN13">EAN13</option><option value="Code128">Code128</option><option value="GS1">GS1</option>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Barcode Series Start</Label>
              <Input 
                type="text"
                value={formData.barcodeSeriesStart || ''} 
                onChange={(e) => setFormData({...formData, barcodeSeriesStart: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Barcode Series End</Label>
              <Input 
                type="text"
                value={formData.barcodeSeriesEnd || ''} 
                onChange={(e) => setFormData({...formData, barcodeSeriesEnd: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">QR Content Type</Label>
              <Input 
                type="text"
                value={formData.qrContentType || ''} 
                onChange={(e) => setFormData({...formData, qrContentType: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">QR Batch ID</Label>
              <Input 
                type="text"
                value={formData.qrBatchId || ''} 
                onChange={(e) => setFormData({...formData, qrBatchId: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Sample Bags Checked</Label>
              <Input 
                type="number"
                value={formData.sampleBagsChecked || ''} 
                onChange={(e) => setFormData({...formData, sampleBagsChecked: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Avg Actual Weight Kg</Label>
              <Input 
                type="number"
                value={formData.avgActualWeight || ''} 
                onChange={(e) => setFormData({...formData, avgActualWeight: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Variance %</Label>
              <Input 
                type="number"
                value={formData.weightVariance || ''} 
                onChange={(e) => setFormData({...formData, weightVariance: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Pass/Fail</Label>
              <Select 
                value={formData.weightPassFail || ''} 
                onChange={(e) => setFormData({...formData, weightPassFail: e.target.value})}
                disabled={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              >
                <option value="">Select...</option>
                <option value="Pass">Pass</option><option value="Fail">Fail</option>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Packing QC Result</Label>
              <Select 
                value={formData.packingQcResult || ''} 
                onChange={(e) => setFormData({...formData, packingQcResult: e.target.value})}
                disabled={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              >
                <option value="">Select...</option>
                <option value="Pass">Pass</option><option value="Fail">Fail</option><option value="Conditional">Conditional</option>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Packing Supervisor</Label>
              <Input 
                type="text"
                value={formData.packingSupervisor || ''} 
                onChange={(e) => setFormData({...formData, packingSupervisor: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Packing Operator</Label>
              <Input 
                type="text"
                value={formData.packingOperator || ''} 
                onChange={(e) => setFormData({...formData, packingOperator: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Packing Remarks</Label>
              <Input 
                type="text"
                value={formData.packingRemarks || ''} 
                onChange={(e) => setFormData({...formData, packingRemarks: e.target.value})}
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
