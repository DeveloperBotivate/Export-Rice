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
    const bags = qty * 40;
    const rate = 45000;
    const freight = qty * 1500;
    const basic = qty * rate;
    const tax = basic * 0.05;
    
    return {
      id: i + 1,
      dispatchOrderNo: `DO-${(i + 1).toString().padStart(4, '0')}`,
      orderDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      orderType: 'Domestic',
      customerName: `Customer ${i+1}`,
      customerGst: `27AAAC${i}1234K1Z1`,
      riceGrade: 'Premium Basmati',
      quantity: qty,
      noOfBags: bags,
      reqDispatchDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      priority: 'Normal',
      
      reservationId: `SR-${(i + 1).toString().padStart(4, '0')}`,
      fgStockId: `FG-${(i + 1).toString().padStart(4, '0')}`,
      lotNo: `LT-${i+1}`,
      batchNo: `BT-${i+1}`,
      reservedQty: qty,
      reservedBags: bags,
      warehouse: 'Main WH',
      godown: 'Godown 1',
      rackBin: 'R1-B2',
      reservationDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      reservedBy: 'WH Manager',

      pickListNo: `PK-${(i + 1).toString().padStart(4, '0')}`,
      pickedQty: qty,
      pickedBags: bags,
      pickDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      pickedBy: 'Picker 1',
      supervisor: 'Super 1',

      loadingId: `LD-${(i + 1).toString().padStart(4, '0')}`,
      vehicleNumber: `MH 43 AB ${(1000 + i)}`,
      bagsLoaded: bags,
      weightLoaded: qty,
      shortage: 0,
      loadingDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}T10:00`,
      loadingSupervisor: 'Super 1',

      vehicleType: 'Truck',
      driverName: 'Ramu',
      driverPhone: '9876543210',
      transporterName: 'ABC Logistics',
      vehicleCapacity: 25,
      route: 'Mill -> Mumbai',
      freightRate: 1500,
      totalFreight: freight,
      expectedDeparture: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}T12:00`,
      expectedDelivery: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      assignedDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,

      weightSlipNo: `DW-${(i + 1).toString().padStart(4, '0')}`,
      grossWeight: qty * 1000 + 8000,
      tareWeight: 8000,
      netWeight: qty * 1000,
      variance: 0,
      weighbridgeId: 'WB-01',
      operator: 'WB Op',
      weighDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,

      challanNo: `DC-${(i + 1).toString().padStart(4, '0')}`,
      challanDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      destination: 'Mumbai',
      purpose: 'Sale',
      createdBy: 'Dispatch Clerk',

      invoiceNo: `INV-${(i + 1).toString().padStart(4, '0')}`,
      invoiceDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      invoiceType: 'Tax Invoice',
      rate: rate,
      basicAmount: basic,
      cgst: tax / 2,
      sgst: tax / 2,
      igst: 0,
      grandTotal: basic + tax,
      paymentDueDate: `2026-07-${(i % 28 + 1).toString().padStart(2, '0')}`,

      gatePassNo: `GP-${(i + 1).toString().padStart(4, '0')}`,
      issueDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}T14:00`,
      gateNo: 'Gate 2',
      guardName: 'Security 1',
      issuedBy: 'Dispatch Head',

      ewbNo: `EWB-${(i + 1).toString().padStart(4, '0')}`,
      ewbDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}T14:00`,
      validTill: `2026-06-${(i % 28 + 3).toString().padStart(2, '0')}`,
      totalValue: basic + tax,
      distance: 350,
      modeOfTransport: 'Road',
      transporterId: '27AABCT1234L1Z',
      generatedBy: 'Finance Exec',

      podId: `POD-${(i + 1).toString().padStart(4, '0')}`,
      actualDeliveryDate: `2026-06-${(i % 28 + 2).toString().padStart(2, '0')}`,
      receivedBy: 'Cust Store',
      bagsReceived: bags,
      weightReceived: qty * 1000,
      condition: 'Good',
      shortageBags: 0,
      shortageKg: 0,
      driverConfirmation: 'Y',

      confirmationId: `CF-${(i + 1).toString().padStart(4, '0')}`,
      confirmationDate: `2026-06-${(i % 28 + 2).toString().padStart(2, '0')}`,
      deliveryStatus: 'Complete',
      customerRating: 5,
      invoiceAmount: basic + tax,
      outstanding: basic + tax,
      disputedAmount: 0,
      disputeReason: '',
      resolved: 'Y',
      closedBy: 'Sales Exec',

      status: 'Completed'
    };
  });
};

export const VehicleAssignment = () => {
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
    
    
    
    
    
    
    
    
    
    
    
    const readOnlyFields = ["loadingId","dispatchOrderNo","totalFreight"];
    const initialFormData = {};
    readOnlyFields.forEach(field => {
      initialFormData[field] = item[field];
    });
    
    setFormData({ ...initialFormData, ...autoFields });
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (isModalOpen && formData) {
      
      const qty = parseFloat(selectedItem.weightLoaded) || 0;
      const rate = parseFloat(formData.freightRate) || 0;
      const total = qty * rate;
      if (formData.totalFreight !== total) {
        setFormData(prev => ({ ...prev, totalFreight: total }));
      }
      
      
      
      
    }
  }, [formData, isModalOpen, selectedItem]);

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
          Assign Vehicle
        </Button>
      </div>
    )
  };

  const pendingCols = [{"header":"Loading ID","accessor":"loadingId"},{"header":"Dispatch Order No","accessor":"dispatchOrderNo"},{"header":"Customer Name","accessor":"customerName"},{"header":"Vehicle Number","accessor":"vehicleNumber"},{"header":"No. of Bags Loaded","accessor":"bagsLoaded"},{"header":"Total Loaded Weight (MT)","accessor":"weightLoaded"},{"header":"Loading Date","accessor":"loadingDate"},{"header":"Loading Supervisor","accessor":"loadingSupervisor"}];
  const historyCols = [{"header":"Loading ID","accessor":"loadingId"},{"header":"Dispatch Order No","accessor":"dispatchOrderNo"},{"header":"Vehicle Number","accessor":"vehicleNumber"},{"header":"Vehicle Type","accessor":"vehicleType"},{"header":"Driver Name","accessor":"driverName"},{"header":"Driver Phone","accessor":"driverPhone"},{"header":"Transporter Name","accessor":"transporterName"},{"header":"Vehicle Capacity (MT)","accessor":"vehicleCapacity"},{"header":"Route","accessor":"route"},{"header":"Freight Rate (₹/MT)","accessor":"freightRate"},{"header":"Total Freight (₹)","accessor":"totalFreight"},{"header":"Expected Departure","accessor":"expectedDeparture"},{"header":"Expected Delivery Date","accessor":"expectedDelivery"},{"header":"Assigned Date","accessor":"assignedDate"}];

  const columns = activeTab === 'pending' ? [actionColumn, ...pendingCols] : historyCols;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Stage 5 - Vehicle Assignment</h2>
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
        title="Vehicle Details"
      >
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            
            <div className="space-y-1.5">
              <Label>Loading ID</Label>
              <Input 
                type="text"
                value={formData.loadingId || ''} 
                onChange={(e) => setFormData({...formData, loadingId: e.target.value})}
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
              <Label>Vehicle Make/Model</Label>
              <Input 
                type="text"
                value={formData.vehicleMake || ''} 
                onChange={(e) => setFormData({...formData, vehicleMake: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
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
                value={formData.driverLicense || ''} 
                onChange={(e) => setFormData({...formData, driverLicense: e.target.value})}
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
                value={formData.transporterGst || ''} 
                onChange={(e) => setFormData({...formData, transporterGst: e.target.value})}
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
              <Label>Route (Mill → Dest)</Label>
              <Input 
                type="text"
                value={formData.route || ''} 
                onChange={(e) => setFormData({...formData, route: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Expected Departure Date</Label>
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
                value={formData.expectedDelivery || ''} 
                onChange={(e) => setFormData({...formData, expectedDelivery: e.target.value})}
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
                value={formData.totalFreight || ''} 
                onChange={(e) => setFormData({...formData, totalFreight: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Advance to Driver (₹)</Label>
              <Input 
                type="number"
                value={formData.advanceDriver || ''} 
                onChange={(e) => setFormData({...formData, advanceDriver: e.target.value})}
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
