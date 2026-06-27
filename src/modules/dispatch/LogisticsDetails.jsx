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

export const LogisticsDetails = () => {
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
    if ('LogisticsDetails' === 'DispatchPlanning') autoFields = { planId: 'DP-00' + Math.floor(Math.random()*100) };
    if ('LogisticsDetails' === 'ArrangeLogistics') autoFields = { logisticsArrangementId: 'LA-00' + Math.floor(Math.random()*100) };
    if ('LogisticsDetails' === 'PickingList') autoFields = { pickListNo: 'PK-00' + Math.floor(Math.random()*100) };
    if ('LogisticsDetails' === 'LogisticsDetails') autoFields = { logisticsId: 'LG-00' + Math.floor(Math.random()*100) };
    if ('LogisticsDetails' === 'TestCertificate') autoFields = { certificateNo: 'TC-00' + Math.floor(Math.random()*100) };
    if ('LogisticsDetails' === 'DispatchWeight') autoFields = { weightSlipNo: 'DW-00' + Math.floor(Math.random()*100) };
    if ('LogisticsDetails' === 'Invoice') autoFields = { invoiceNo: 'INV-00' + Math.floor(Math.random()*100), invoiceType: item.orderType === 'Export' ? 'Export Invoice' : 'Tax Invoice' };
    if ('LogisticsDetails' === 'DeliveryConfirmation') autoFields = { confirmationId: 'CF-00' + Math.floor(Math.random()*100) };
    
    const readOnlyFields = ["pickListNo","dispatchOrderNo","orderType","sourceRef","logisticsId","totalFreightAmount"];
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
          Update Details
        </Button>
      </div>
    )
  };

  const pendingCols = [{"header":"Pick List No","accessor":"pickListNo"},{"header":"Dispatch Order No","accessor":"dispatchOrderNo"},{"header":"Order Type","accessor":"orderType"},{"header":"Source Ref","accessor":"sourceRef"},{"header":"Picked Qty (MT)","accessor":"pickedQty"},{"header":"No. of Bags","accessor":"pickedBags"},{"header":"Pick Date","accessor":"pickDate"}];
  const historyCols = [{"header":"Logistics ID","accessor":"logisticsId"},{"header":"Dispatch Order No","accessor":"dispatchOrderNo"},{"header":"Order Type","accessor":"orderType"},{"header":"Source Ref","accessor":"sourceRef"},{"header":"Vehicle Number","accessor":"vehicleNumber"},{"header":"Driver Name","accessor":"driverName"},{"header":"Transporter Name","accessor":"transporterName"},{"header":"Route","accessor":"route"},{"header":"Total Freight (₹)","accessor":"totalFreightAmount"},{"header":"Expected Departure","accessor":"expectedDeparture"},{"header":"Expected Delivery Date","accessor":"expectedDeliveryDate"}];

  const columns = activeTab === 'pending' ? [actionColumn, ...pendingCols] : historyCols;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Stage 5 - Logistics (Transporter & Driver Details)</h2>
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
              <Label>Pick List No</Label>
              <Input 
                type="text"
                value={formData.pickListNo || ''} 
                onChange={(e) => setFormData({...formData, pickListNo: e.target.value})}
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
              <Label>Logistics ID</Label>
              <Input 
                type="text"
                value={formData.logisticsId || ''} 
                onChange={(e) => setFormData({...formData, logisticsId: e.target.value})}
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
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Vehicle Type</Label>
              <Select 
                value={formData.vehicleType || ''} 
                onChange={(e) => setFormData({...formData, vehicleType: e.target.value})}
                disabled={false}
                className={false ? 'bg-slate-100' : ''}
              >
                <option value="">Select Vehicle Type</option>
                <option value="Truck">Truck</option><option value="Container">Container</option><option value="Tempo">Tempo</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Driver Name</Label>
              <Input 
                type="text"
                value={formData.driverName || ''} 
                onChange={(e) => setFormData({...formData, driverName: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Driver Phone</Label>
              <Input 
                type="text"
                value={formData.driverPhone || ''} 
                onChange={(e) => setFormData({...formData, driverPhone: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Driver License No</Label>
              <Input 
                type="text"
                value={formData.driverLicenseNo || ''} 
                onChange={(e) => setFormData({...formData, driverLicenseNo: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Driver License Expiry</Label>
              <Input 
                type="date"
                value={formData.driverLicenseExpiry || ''} 
                onChange={(e) => setFormData({...formData, driverLicenseExpiry: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Transporter Name</Label>
              <Input 
                type="text"
                value={formData.transporterName || ''} 
                onChange={(e) => setFormData({...formData, transporterName: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Transporter Phone</Label>
              <Input 
                type="text"
                value={formData.transporterPhone || ''} 
                onChange={(e) => setFormData({...formData, transporterPhone: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Transporter GSTIN</Label>
              <Input 
                type="text"
                value={formData.transporterGstin || ''} 
                onChange={(e) => setFormData({...formData, transporterGstin: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Vehicle Capacity (MT)</Label>
              <Input 
                type="number"
                value={formData.vehicleCapacity || ''} 
                onChange={(e) => setFormData({...formData, vehicleCapacity: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Route (Mill → Destination/Port)</Label>
              <Input 
                type="text"
                value={formData.route || ''} 
                onChange={(e) => setFormData({...formData, route: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Freight Rate (₹/MT)</Label>
              <Input 
                type="number"
                value={formData.freightRate || ''} 
                onChange={(e) => setFormData({...formData, freightRate: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Total Freight Amount (₹)</Label>
              <Input 
                type="number"
                value={formData.totalFreightAmount || ''} 
                onChange={(e) => setFormData({...formData, totalFreightAmount: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Advance to Driver (₹)</Label>
              <Input 
                type="number"
                value={formData.advanceToDriver || ''} 
                onChange={(e) => setFormData({...formData, advanceToDriver: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Expected Departure Date & Time</Label>
              <Input 
                type="datetime-local"
                value={formData.expectedDeparture || ''} 
                onChange={(e) => setFormData({...formData, expectedDeparture: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Expected Delivery Date</Label>
              <Input 
                type="date"
                value={formData.expectedDeliveryDate || ''} 
                onChange={(e) => setFormData({...formData, expectedDeliveryDate: e.target.value})}
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
