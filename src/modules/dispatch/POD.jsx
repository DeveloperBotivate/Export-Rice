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

export const POD = () => {
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
    
    
    
    
    
    
    
    
    autoFields = { podId: 'POD-' + Math.floor(Math.random()*10000) };
    
    
    const readOnlyFields = ["ewbNo","invoiceNo","dispatchOrderNo","podId"];
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
          Record POD
        </Button>
      </div>
    )
  };

  const pendingCols = [{"header":"EWB No","accessor":"ewbNo"},{"header":"Gate Pass No","accessor":"gatePassNo"},{"header":"Invoice No","accessor":"invoiceNo"},{"header":"Dispatch Order No","accessor":"dispatchOrderNo"},{"header":"Customer Name","accessor":"customerName"},{"header":"Vehicle Number","accessor":"vehicleNumber"},{"header":"Grand Total (₹)","accessor":"grandTotal"},{"header":"EWB Date","accessor":"ewbDate"},{"header":"Valid Till","accessor":"validTill"},{"header":"Expected Delivery Date","accessor":"expectedDelivery"}];
  const historyCols = [{"header":"POD ID","accessor":"podId"},{"header":"EWB No","accessor":"ewbNo"},{"header":"Invoice No","accessor":"invoiceNo"},{"header":"Dispatch Order No","accessor":"dispatchOrderNo"},{"header":"Customer Name","accessor":"customerName"},{"header":"Actual Delivery Date","accessor":"actualDeliveryDate"},{"header":"Received By","accessor":"receivedBy"},{"header":"No. of Bags Received","accessor":"bagsReceived"},{"header":"Net Weight Received (Kg)","accessor":"weightReceived"},{"header":"Condition","accessor":"condition"},{"header":"Shortage (Bags)","accessor":"shortageBags"},{"header":"Shortage (Kg)","accessor":"shortageKg"},{"header":"Driver Confirmation","accessor":"driverConfirmation"}];

  const columns = activeTab === 'pending' ? [actionColumn, ...pendingCols] : historyCols;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Stage 11 - Proof of Delivery (POD)</h2>
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
        title="POD Details"
      >
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            
            <div className="space-y-1.5">
              <Label>EWB No</Label>
              <Input 
                type="text"
                value={formData.ewbNo || ''} 
                onChange={(e) => setFormData({...formData, ewbNo: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Invoice No</Label>
              <Input 
                type="text"
                value={formData.invoiceNo || ''} 
                onChange={(e) => setFormData({...formData, invoiceNo: e.target.value})}
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
              <Label>POD ID</Label>
              <Input 
                type="text"
                value={formData.podId || ''} 
                onChange={(e) => setFormData({...formData, podId: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Actual Delivery Date</Label>
              <Input 
                type="date"
                value={formData.actualDeliveryDate || ''} 
                onChange={(e) => setFormData({...formData, actualDeliveryDate: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Actual Delivery Time</Label>
              <Input 
                type="time"
                value={formData.actualDeliveryTime || ''} 
                onChange={(e) => setFormData({...formData, actualDeliveryTime: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Received By (Name)</Label>
              <Input 
                type="text"
                value={formData.receivedBy || ''} 
                onChange={(e) => setFormData({...formData, receivedBy: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Receiver Designation</Label>
              <Input 
                type="text"
                value={formData.receiverDesignation || ''} 
                onChange={(e) => setFormData({...formData, receiverDesignation: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Receiver Phone</Label>
              <Input 
                type="text"
                value={formData.receiverPhone || ''} 
                onChange={(e) => setFormData({...formData, receiverPhone: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>No. of Bags Received</Label>
              <Input 
                type="number"
                value={formData.bagsReceived || ''} 
                onChange={(e) => setFormData({...formData, bagsReceived: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Net Weight Received (Kg)</Label>
              <Input 
                type="number"
                value={formData.weightReceived || ''} 
                onChange={(e) => setFormData({...formData, weightReceived: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Condition on Arrival</Label>
              <Select 
                value={formData.condition || ''} 
                onChange={(e) => setFormData({...formData, condition: e.target.value})}
                disabled={false}
                className={false ? 'bg-slate-100' : ''}
              >
                <option value="">Select Condition on Arrival</option>
                <option value="Good">Good</option><option value="Damaged">Damaged</option><option value="Short">Short</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Shortage — No. of Bags</Label>
              <Input 
                type="number"
                value={formData.shortageBags || ''} 
                onChange={(e) => setFormData({...formData, shortageBags: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Shortage — Weight (Kg)</Label>
              <Input 
                type="number"
                value={formData.shortageKg || ''} 
                onChange={(e) => setFormData({...formData, shortageKg: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Damage Description</Label>
              <Input 
                type="text"
                value={formData.damageDescription || ''} 
                onChange={(e) => setFormData({...formData, damageDescription: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>POD Document Ref</Label>
              <Input 
                type="text"
                value={formData.podDocRef || ''} 
                onChange={(e) => setFormData({...formData, podDocRef: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Driver Confirmation</Label>
              <Select 
                value={formData.driverConfirmation || ''} 
                onChange={(e) => setFormData({...formData, driverConfirmation: e.target.value})}
                disabled={false}
                className={false ? 'bg-slate-100' : ''}
              >
                <option value="">Select Driver Confirmation</option>
                <option value="Y">Y</option><option value="N">N</option>
              </Select>
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
