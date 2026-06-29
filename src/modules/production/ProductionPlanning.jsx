import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input, Label, Select } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import DataTable from '../../components/DataTable';
import { usePagination } from '../../hooks/usePagination';
import { Modal } from '../../components/ui/Modal';

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
      planType: ['Daily', 'Weekly', 'Monthly'][Math.floor(Math.random() * 3)],
      paddyVariety: ['Basmati', 'Sona Masuri', 'IR64'][Math.floor(Math.random() * 3)],
      plannedInputQty: qty,
      targetHeadRice: (qty * 0.6).toFixed(2),
      targetBrokenRice: (qty * 0.05).toFixed(2),
      targetBran: (qty * 0.08).toFixed(2),
      targetHusk: (qty * 0.20).toFixed(2),
      expectedRecovery: 60,
      plant: 'Mill Unit 1',
      shift: ['Morning', 'Evening', 'Night'][Math.floor(Math.random() * 3)],
      machineAllocated: `MCH-${Math.floor(Math.random() * 10).toString().padStart(2, '0')}`,
      machineName: 'Satake Master',
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
      machineUsed: `MCH-${Math.floor(Math.random() * 10).toString().padStart(2, '0')}`,
      batchStartTime: '08:00',
      batchEndTime: '16:00',
      batchRemarks: 'Standard Processing',
      issueId: `RMI-2026-${(i + 1).toString().padStart(4, '0')}`,
      issueDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}T08:30`,
      paddyQtyIssued: qty,
      ppBagsIssued: 'PP-50KG (1000)',
      boppBagsIssued: 'BOPP-25KG (500)',
      threadIssued: 'TH-01 (10)',
      labelsIssued: 'LBL-01 (2000)',
      palletsIssued: 5,
      lubricantsIssued: 'LUB-10 (2L)',
      otherConsumables: 'None',
      issuedBy: 'Store Keeper',
      receivedBy: 'Suresh',
      issueRemarks: 'All items OK',
      preQcId: `PQC-2026-${(i + 1).toString().padStart(4, '0')}`,
      testDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}T09:00`,
      moisturePercent: 12.5,
      foreignMatterPercent: 1.2,
      brokenPercent: 2.5,
      chalkyPercent: 1.0,
      immatureGrainPercent: 0.5,
      damagedGrainPercent: 0.4,
      redGrainPercent: 0.2,
      paddyGradeConfirmed: 'A',
      expectedRecoveryAfterTest: 62,
      qcResult: 'Pass',
      approvedForProduction: 'Yes',
      rejectionReason: '-',
      qcRemarks: 'Good Quality',
      labTechnician: 'Dr. Kumar',
      millingSessionId: `MILL-2026-${(i + 1).toString().padStart(4, '0')}`,
      remarks: 'Standard processing parameters applied',
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


export const ProductionPlanning = () => {
  const getInitialData = () => {
    let master = JSON.parse(localStorage.getItem('production_master_v4'));
    let historyIds = JSON.parse(localStorage.getItem('prod_v4_1_history'));
    
    if (!master || master.length === 0 || !master[0].productionOrderNo) {
      master = generateDummyData();
      localStorage.setItem('production_master_v4', JSON.stringify(master));
      
      for(let i=1; i<=17; i++) {
        const numItems = Math.max(0, (18 - i) * 2); 
        const ids = Array.from({length: numItems}, (_, index) => index + 1);
        localStorage.setItem(`prod_v4_${i}_history`, JSON.stringify(ids));
      }
      historyIds = Array.from({length: 40}, (_, index) => index + 1);
      localStorage.setItem('prod_v4_1_history', JSON.stringify(historyIds));
    }
    
    return historyIds.map(id => master.find(m => m.id === id)).filter(Boolean);
  };

  const [historyItems, setHistoryItems] = useState(getInitialData());
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});

  const filteredData = historyItems.filter(item => 
    Object.values(item).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const pagination = usePagination(filteredData, 10);

  const handleCreateNew = () => {
    setFormData({ planNo: 'PP-2026-' + Math.floor(Math.random()*10000) });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    const newItem = { ...formData, id: Date.now(), status: 'Open' };
    
    const master = JSON.parse(localStorage.getItem('production_master_v4')) || [];
    const newMaster = [newItem, ...master];
    localStorage.setItem('production_master_v4', JSON.stringify(newMaster));
    
    const historyIds = JSON.parse(localStorage.getItem('prod_v4_1_history')) || [];
    localStorage.setItem('prod_v4_1_history', JSON.stringify([newItem.id, ...historyIds]));
    
    setHistoryItems([newItem, ...historyItems]);
    setIsModalOpen(false);
  };

  const columns = [
    { header: 'Plan No', accessor: 'planNo' },
    { header: 'Plan Date', accessor: 'planDate' },
    { header: 'Plan Type', accessor: 'planType' },
    { header: 'Paddy Variety', accessor: 'paddyVariety' },
    { header: 'Planned Input MT', accessor: 'plannedInputQty' },
    { header: 'Target Head Rice MT', accessor: 'targetHeadRice' },
    { header: 'Target Broken MT', accessor: 'targetBrokenRice' },
    { header: 'Target Bran MT', accessor: 'targetBran' },
    { header: 'Target Husk MT', accessor: 'targetHusk' },
    { header: 'Expected Recovery %', accessor: 'expectedRecovery' },
    { header: 'Plant', accessor: 'plant' },
    { header: 'Shift', accessor: 'shift' },
    { header: 'Machine', accessor: 'machineAllocated' },
    { header: 'Supervisor', accessor: 'supervisor' },
    { header: 'Planned By', accessor: 'plannedBy' },
    { header: 'Status', accessor: 'status' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Stage 1 - Production Planning</h2>
        <Button onClick={handleCreateNew} className="flex items-center gap-2">
          <Plus size={16} /> Create Production Plan
        </Button>
      </div>

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
        title="Create Production Plan"
      >
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Production Plan No</Label>
              <Input type="text" value={formData.planNo || ''} readOnly className="bg-slate-100" />
            </div>
            <div className="space-y-1.5">
              <Label>Plan Date</Label>
              <Input type="date" value={formData.planDate || ''} onChange={(e) => setFormData({...formData, planDate: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Plan Type</Label>
              <Select value={formData.planType || ''} onChange={(e) => setFormData({...formData, planType: e.target.value})}>
                <option value="">Select Plan Type</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Production Requirement</Label>
              <Input type="text" value={formData.productionRequirement || ''} onChange={(e) => setFormData({...formData, productionRequirement: e.target.value})} placeholder="Sales Order Ref" />
            </div>
            <div className="space-y-1.5">
              <Label>Available Paddy Stock</Label>
              <Input type="number" value={formData.availablePaddyStock || ''} onChange={(e) => setFormData({...formData, availablePaddyStock: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Paddy Variety / Grade</Label>
              <Input type="text" value={formData.paddyVariety || ''} onChange={(e) => setFormData({...formData, paddyVariety: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Planned Input Quantity MT</Label>
              <Input type="number" value={formData.plannedInputQty || ''} onChange={(e) => setFormData({...formData, plannedInputQty: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Production Target — Head Rice MT</Label>
              <Input type="number" value={formData.targetHeadRice || ''} onChange={(e) => setFormData({...formData, targetHeadRice: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Production Target — Broken Rice MT</Label>
              <Input type="number" value={formData.targetBrokenRice || ''} onChange={(e) => setFormData({...formData, targetBrokenRice: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Production Target — Bran MT</Label>
              <Input type="number" value={formData.targetBran || ''} onChange={(e) => setFormData({...formData, targetBran: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Production Target — Husk MT</Label>
              <Input type="number" value={formData.targetHusk || ''} onChange={(e) => setFormData({...formData, targetHusk: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Expected Recovery %</Label>
              <Input type="number" value={formData.expectedRecovery || ''} onChange={(e) => setFormData({...formData, expectedRecovery: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Plant / Mill Unit</Label>
              <Input type="text" value={formData.plant || ''} onChange={(e) => setFormData({...formData, plant: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Shift</Label>
              <Select value={formData.shift || ''} onChange={(e) => setFormData({...formData, shift: e.target.value})}>
                <option value="">Select Shift</option>
                <option value="Morning">Morning</option>
                <option value="Evening">Evening</option>
                <option value="Night">Night</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Shift Start Time</Label>
              <Input type="time" value={formData.shiftStartTime || ''} onChange={(e) => setFormData({...formData, shiftStartTime: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Shift End Time</Label>
              <Input type="time" value={formData.shiftEndTime || ''} onChange={(e) => setFormData({...formData, shiftEndTime: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Machine Allocated</Label>
              <Input type="text" value={formData.machineAllocated || ''} onChange={(e) => setFormData({...formData, machineAllocated: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Operator Allocated</Label>
              <Input type="text" value={formData.operatorAllocated || ''} onChange={(e) => setFormData({...formData, operatorAllocated: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Supervisor Name</Label>
              <Input type="text" value={formData.supervisor || ''} onChange={(e) => setFormData({...formData, supervisor: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Planned By</Label>
              <Input type="text" value={formData.plannedBy || ''} onChange={(e) => setFormData({...formData, plannedBy: e.target.value})} />
            </div>
            <div className="space-y-1.5 col-span-2">
              <Label>Remarks</Label>
              <Input type="text" value={formData.remarks || ''} onChange={(e) => setFormData({...formData, remarks: e.target.value})} />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
            <Button onClick={() => setIsModalOpen(false)} variant="outline">Cancel</Button>
            <Button onClick={handleSave}>Save Request</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
