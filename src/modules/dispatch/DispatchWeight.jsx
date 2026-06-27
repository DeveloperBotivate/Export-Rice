import React, { useState, useEffect } from 'react';
import { Search, Play, Plus } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input, Label, Select } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import DataTable from '../../components/DataTable';
import { usePagination } from '../../hooks/usePagination';
import { Modal } from '../../components/ui/Modal';
import { PageTabs } from '../../components/PageTabs';

const generateDummyData = () => {
  return Array.from({ length: 40 }, (_, i) => {
    const orderType = i % 2 === 0 ? 'Export' : 'Domestic';
    return {
      id: i + 1,
      sourceRef: orderType === 'Export' ? `EC-00${(i + 1).toString().padStart(2, '0')}` : `SO-00${(i + 1).toString().padStart(2, '0')}`,
      dispatchOrderNo: `DO-00${(i + 1).toString().padStart(2, '0')}`,
      orderType: orderType,
      customerName: `Customer ${i+1}`,
      riceGrade: ['Basmati', 'Non-Basmati'][Math.floor(Math.random() * 2)],
      quantity: Math.floor(Math.random() * 50) + 10,
      requiredDispatchDate: `2026-07-${(i % 28 + 1).toString().padStart(2, '0')}`,
      priority: ['Normal', 'Urgent'][Math.floor(Math.random() * 2)],
      
      planId: `DP-00${(i + 1).toString().padStart(2, '0')}`,
      plannedDispatchDate: `2026-07-${(i % 28 + 1).toString().padStart(2, '0')}`,
      allocatedQty: Math.floor(Math.random() * 50) + 10,
      allocationStatus: 'Full',
      planningDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      plannedBy: 'Planner',
      
      logisticsArrangementId: `LA-00${(i + 1).toString().padStart(2, '0')}`,
      modeRequired: orderType === 'Export' ? 'Sea' : 'Road',
      vehicleType: orderType === 'Export' ? 'Container' : 'Truck',
      noOfVehicles: 2,
      transporterShortlisted: 'Transporter X',
      estimatedFreight: 20000,
      arrangementStatus: 'Confirmed',
      arrangedBy: 'Logistics',
      
      pickListNo: `PK-00${(i + 1).toString().padStart(2, '0')}`,
      lotNo: 'LOT123',
      batchNo: 'B123',
      pickedQty: 20,
      pickedBags: 800,
      pickDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      pickedBy: 'Picker',
      supervisor: 'Supervisor',
      
      logisticsId: `LG-00${(i + 1).toString().padStart(2, '0')}`,
      vehicleNumber: 'MH01AB1234',
      driverName: 'Driver Y',
      transporterName: 'Transporter X',
      route: 'Mill to Port',
      totalFreightAmount: 20000,
      expectedDeparture: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      expectedDeliveryDate: `2026-06-${(i % 28 + 5).toString().padStart(2, '0')}`,
      
      certificateNo: `TC-00${(i + 1).toString().padStart(2, '0')}`,
      testDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      qualityGradeConfirmed: 'Premium',
      moisture: 12.5,
      phytoCertNo: 'PHYTO123',
      result: 'Pass',
      testedBy: 'Lab Off',
      
      weightSlipNo: `DW-00${(i + 1).toString().padStart(2, '0')}`,
      grossWeight: 25000,
      tareWeight: 5000,
      netWeight: 20000,
      variance: 0,
      weighbridgeId: 'WB1',
      operatorName: 'Operator',
      weighDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      
      invoiceNo: `INV-00${(i + 1).toString().padStart(2, '0')}`,
      invoiceDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      qtyMt: 20,
      grandTotal: 1000000,
      paymentTerms: 'Advance',
      createdBy: 'Finance',
      
      confirmationId: `CF-00${(i + 1).toString().padStart(2, '0')}`,
      confirmationDate: `2026-07-${(i % 28 + 1).toString().padStart(2, '0')}`,
      deliveryStatus: 'Complete',
      outstandingAmount: 0,
      closedBy: 'Admin',
      
      status: 'Completed'
    };
  });
};

export const DispatchWeight = () => {
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
    if ('DispatchWeight' === 'DispatchPlanning') autoFields = { planId: 'DP-00' + Math.floor(Math.random()*100) };
    if ('DispatchWeight' === 'ArrangeLogistics') autoFields = { logisticsArrangementId: 'LA-00' + Math.floor(Math.random()*100) };
    if ('DispatchWeight' === 'PickingList') autoFields = { pickListNo: 'PK-00' + Math.floor(Math.random()*100) };
    if ('DispatchWeight' === 'LogisticsDetails') autoFields = { logisticsId: 'LG-00' + Math.floor(Math.random()*100) };
    if ('DispatchWeight' === 'TestCertificate') autoFields = { certificateNo: 'TC-00' + Math.floor(Math.random()*100) };
    if ('DispatchWeight' === 'DispatchWeight') autoFields = { weightSlipNo: 'DW-00' + Math.floor(Math.random()*100) };
    if ('DispatchWeight' === 'Invoice') autoFields = { invoiceNo: 'INV-00' + Math.floor(Math.random()*100), invoiceType: item.orderType === 'Export' ? 'Export Invoice' : 'Tax Invoice' };
    if ('DispatchWeight' === 'DeliveryConfirmation') autoFields = { confirmationId: 'CF-00' + Math.floor(Math.random()*100) };
    
    const readOnlyFields = ["certificateNo","dispatchOrderNo","orderType","sourceRef","vehicleNumber","weightSlipNo","netWeight","variance"];
    const initialFormData = {};
    readOnlyFields.forEach(field => {
      initialFormData[field] = item[field];
    });
    
    setFormData({ ...initialFormData, ...autoFields });
    setIsModalOpen(true);
  };

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
          Record Weight
        </Button>
      </div>
    )
  };

  const pendingCols = [{"header":"Certificate No","accessor":"certificateNo"},{"header":"Dispatch Order No","accessor":"dispatchOrderNo"},{"header":"Order Type","accessor":"orderType"},{"header":"Source Ref","accessor":"sourceRef"},{"header":"Vehicle Number","accessor":"vehicleNumber"},{"header":"Result","accessor":"result"},{"header":"Test Date","accessor":"testDate"}];
  const historyCols = [{"header":"Weight Slip No","accessor":"weightSlipNo"},{"header":"Dispatch Order No","accessor":"dispatchOrderNo"},{"header":"Order Type","accessor":"orderType"},{"header":"Source Ref","accessor":"sourceRef"},{"header":"Gross Weight (Kg)","accessor":"grossWeight"},{"header":"Tare Weight (Kg)","accessor":"tareWeight"},{"header":"Net Weight (Kg)","accessor":"netWeight"},{"header":"Variance %","accessor":"variance"},{"header":"Weighbridge ID","accessor":"weighbridgeId"},{"header":"Operator","accessor":"operatorName"},{"header":"Weigh Date","accessor":"weighDate"}];

  const columns = activeTab === 'pending' ? [actionColumn, ...pendingCols] : historyCols;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Stage 7 - Dispatch Weight</h2>
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
        title="Dispatch Weight Details"
      >
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            
            <div className="space-y-1.5">
              <Label>Certificate No</Label>
              <Input 
                type="text"
                value={formData.certificateNo || ''} 
                onChange={(e) => setFormData({...formData, certificateNo: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Dispatch Order No</Label>
              <Input 
                type="text"
                value={formData.dispatchOrderNo || ''} 
                onChange={(e) => setFormData({...formData, dispatchOrderNo: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Order Type</Label>
              <Input 
                type="text"
                value={formData.orderType || ''} 
                onChange={(e) => setFormData({...formData, orderType: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Source Reference</Label>
              <Input 
                type="text"
                value={formData.sourceRef || ''} 
                onChange={(e) => setFormData({...formData, sourceRef: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Vehicle Number</Label>
              <Input 
                type="text"
                value={formData.vehicleNumber || ''} 
                onChange={(e) => setFormData({...formData, vehicleNumber: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Weight Slip No</Label>
              <Input 
                type="text"
                value={formData.weightSlipNo || ''} 
                onChange={(e) => setFormData({...formData, weightSlipNo: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Weigh Date & Time</Label>
              <Input 
                type="datetime-local"
                value={formData.weighDate || ''} 
                onChange={(e) => setFormData({...formData, weighDate: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Gross Weight (Kg)</Label>
              <Input 
                type="number"
                value={formData.grossWeight || ''} 
                onChange={(e) => setFormData({...formData, grossWeight: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Tare Weight (Kg)</Label>
              <Input 
                type="number"
                value={formData.tareWeight || ''} 
                onChange={(e) => setFormData({...formData, tareWeight: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Net Weight (Kg)</Label>
              <Input 
                type="number"
                value={formData.netWeight || ''} 
                onChange={(e) => setFormData({...formData, netWeight: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Weighbridge ID</Label>
              <Input 
                type="text"
                value={formData.weighbridgeId || ''} 
                onChange={(e) => setFormData({...formData, weighbridgeId: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Operator Name</Label>
              <Input 
                type="text"
                value={formData.operatorName || ''} 
                onChange={(e) => setFormData({...formData, operatorName: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Variance vs Pick List (%)</Label>
              <Input 
                type="number"
                value={formData.variance || ''} 
                onChange={(e) => setFormData({...formData, variance: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Variance Reason</Label>
              <Input 
                type="text"
                value={formData.varianceReason || ''} 
                onChange={(e) => setFormData({...formData, varianceReason: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Remarks</Label>
              <Input 
                type="text"
                value={formData.remarks || ''} 
                onChange={(e) => setFormData({...formData, remarks: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
            <Button onClick={() => setIsModalOpen(false)} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save & Process
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
