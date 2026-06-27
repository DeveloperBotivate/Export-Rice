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

export const ArrangeLogistics = () => {
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
    if ('ArrangeLogistics' === 'DispatchPlanning') autoFields = { planId: 'DP-00' + Math.floor(Math.random()*100) };
    if ('ArrangeLogistics' === 'ArrangeLogistics') autoFields = { logisticsArrangementId: 'LA-00' + Math.floor(Math.random()*100) };
    if ('ArrangeLogistics' === 'PickingList') autoFields = { pickListNo: 'PK-00' + Math.floor(Math.random()*100) };
    if ('ArrangeLogistics' === 'LogisticsDetails') autoFields = { logisticsId: 'LG-00' + Math.floor(Math.random()*100) };
    if ('ArrangeLogistics' === 'TestCertificate') autoFields = { certificateNo: 'TC-00' + Math.floor(Math.random()*100) };
    if ('ArrangeLogistics' === 'DispatchWeight') autoFields = { weightSlipNo: 'DW-00' + Math.floor(Math.random()*100) };
    if ('ArrangeLogistics' === 'Invoice') autoFields = { invoiceNo: 'INV-00' + Math.floor(Math.random()*100), invoiceType: item.orderType === 'Export' ? 'Export Invoice' : 'Tax Invoice' };
    if ('ArrangeLogistics' === 'DeliveryConfirmation') autoFields = { confirmationId: 'CF-00' + Math.floor(Math.random()*100) };
    
    const readOnlyFields = ["planId","dispatchOrderNo","orderType","sourceRef","logisticsArrangementId"];
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
          Arrange Logistics
        </Button>
      </div>
    )
  };

  const pendingCols = [{"header":"Plan ID","accessor":"planId"},{"header":"Dispatch Order No","accessor":"dispatchOrderNo"},{"header":"Order Type","accessor":"orderType"},{"header":"Source Ref","accessor":"sourceRef"},{"header":"Allocated Qty (MT)","accessor":"allocatedQty"},{"header":"Planned Dispatch Date","accessor":"plannedDispatchDate"},{"header":"Customer/Buyer Name","accessor":"customerName"}];
  const historyCols = [{"header":"Logistics Arrangement ID","accessor":"logisticsArrangementId"},{"header":"Dispatch Order No","accessor":"dispatchOrderNo"},{"header":"Order Type","accessor":"orderType"},{"header":"Source Ref","accessor":"sourceRef"},{"header":"Mode Required","accessor":"modeRequired"},{"header":"Vehicle Type","accessor":"vehicleType"},{"header":"No. of Vehicles","accessor":"noOfVehicles"},{"header":"Transporter Shortlisted","accessor":"transporterShortlisted"},{"header":"Estimated Freight (₹)","accessor":"estimatedFreight"},{"header":"Arrangement Status","accessor":"arrangementStatus"},{"header":"Arranged By","accessor":"arrangedBy"}];

  const columns = activeTab === 'pending' ? [actionColumn, ...pendingCols] : historyCols;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Stage 3 - Arrange Logistics</h2>
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
        title="Logistics Details"
      >
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            
            <div className="space-y-1.5">
              <Label>Plan ID</Label>
              <Input 
                type="text"
                value={formData.planId || ''} 
                onChange={(e) => setFormData({...formData, planId: e.target.value})}
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
              <Label>Logistics Arrangement ID</Label>
              <Input 
                type="text"
                value={formData.logisticsArrangementId || ''} 
                onChange={(e) => setFormData({...formData, logisticsArrangementId: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Mode Required</Label>
              <Select 
                value={formData.modeRequired || ''} 
                onChange={(e) => setFormData({...formData, modeRequired: e.target.value})}
                disabled={false}
                className={false ? 'bg-slate-100' : ''}
              >
                <option value="">Select Mode Required</option>
                <option value="Road">Road</option><option value="Rail">Rail</option><option value="Sea">Sea</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Vehicle Type Needed</Label>
              <Select 
                value={formData.vehicleType || ''} 
                onChange={(e) => setFormData({...formData, vehicleType: e.target.value})}
                disabled={false}
                className={false ? 'bg-slate-100' : ''}
              >
                <option value="">Select Vehicle Type Needed</option>
                <option value="Truck">Truck</option><option value="Container">Container</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>No. of Vehicles Required</Label>
              <Input 
                type="number"
                value={formData.noOfVehicles || ''} 
                onChange={(e) => setFormData({...formData, noOfVehicles: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Transporter Shortlisted</Label>
              <Input 
                type="text"
                value={formData.transporterShortlisted || ''} 
                onChange={(e) => setFormData({...formData, transporterShortlisted: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Estimated Freight (₹)</Label>
              <Input 
                type="number"
                value={formData.estimatedFreight || ''} 
                onChange={(e) => setFormData({...formData, estimatedFreight: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Arrangement Status</Label>
              <Select 
                value={formData.arrangementStatus || ''} 
                onChange={(e) => setFormData({...formData, arrangementStatus: e.target.value})}
                disabled={false}
                className={false ? 'bg-slate-100' : ''}
              >
                <option value="">Select Arrangement Status</option>
                <option value="Confirmed">Confirmed</option><option value="Pending">Pending</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Arranged By</Label>
              <Input 
                type="text"
                value={formData.arrangedBy || ''} 
                onChange={(e) => setFormData({...formData, arrangedBy: e.target.value})}
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
