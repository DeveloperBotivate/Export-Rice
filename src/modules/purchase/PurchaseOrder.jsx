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
    const qty = Math.floor(Math.random() * 500) + 100;
    const rate = Math.floor(Math.random() * 1000) + 2000;
    const gross = qty * 1000 + Math.floor(Math.random() * 500);
    const tare = Math.floor(Math.random() * 200) + 100;
    const netWeight = gross - tare;
    
    return {
      id: i + 1,
      prNumber: `PR-2026-${(i + 1).toString().padStart(4, '0')}`,
      prDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      poNumber: `PO-2026-${(i + 1).toString().padStart(4, '0')}`,
      poDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      paddyGrade: ['Grade A', 'Grade B', 'Grade C'][Math.floor(Math.random() * 3)],
      quantity: qty,
      targetMandi: ['Moga Mandi', 'Karnal Mandi', 'Ludhiana Market'][Math.floor(Math.random() * 3)],
      requestedBy: 'Purchase Officer',
      department: 'Procurement',
      remarks: 'Standard purchase request',
      requiredByDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      vendorName: 'Ramesh Singh',
      vendorPhone: '9876543210',
      rate: rate,
      totalValue: qty * rate,
      poValidityDate: `2026-07-${(i % 28 + 1).toString().padStart(2, '0')}`,
      deliveryTerms: 'FOR',
      paymentTerms: 'Advance 20%',
      agentName: 'Suresh Agent',
      agentId: 'AGT-001',
      agentPhone: '8765432109',
      agentFirmName: 'Suresh & Sons',
      commissionType: 'Per Qt',
      commissionRate: 15,
      assignmentDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      vehicleNumber: `PB-10-AB-${(i * 123) % 9999}`,
      vehicleType: 'Truck',
      driverName: 'Gurpreet Singh',
      driverPhone: '7654321098',
      driverLicense: 'PB-DL-12345',
      vehicleCapacity: 25,
      transporterName: 'Fast Logistics',
      expectedDepartureDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      mandiName: 'Moga Main Mandi',
      mandiCode: 'MOG-001',
      apmcLicense: 'APMC-MOG-123',
      mandiLocation: 'Moga City',
      expectedPurchaseDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      auctionSlot: 'Morning Slot',
      lotNumbers: `LOT-${i+1}`,
      challanNumber: `CHL-${(i + 1).toString().padStart(4, '0')}`,
      challanDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      farmerName: 'Baldev Singh',
      farmerId: 'AADHAAR-8765',
      village: 'Village Kalan',
      noOfBags: qty * 20,
      grossWeight: gross,
      tareWeight: tare,
      netWeight: netWeight,
      totalAmount: (netWeight / 100) * rate,
      mandiCess: 2,
      commissionAmount: 5000,
      netPayable: ((netWeight / 100) * rate) * 1.02 + 5000,
      gateEntryNumber: `GE-${(i + 1).toString().padStart(4, '0')}`,
      entryDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      entryTime: '10:30 AM',
      securityGuardName: 'Ramu',
      purpose: 'Inward',
      sealNumber: `SEAL-${i+1}`,
      weightSlipNumber: `WS-${(i + 1).toString().padStart(4, '0')}`,
      weighDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      weighTime: '11:00 AM',
      weighbridgeId: 'WB-01',
      operatorName: 'Sunil',
      variance: 'None',
      purchaseClosureId: `PC-${(i + 1).toString().padStart(4, '0')}`,
      netQtyAdded: (netWeight / 1000).toFixed(2),
      warehouse: 'Warehouse A',
      godown: 'Godown 1',
      binRack: 'Bin 5',
      lotNumber: `LOT-RC-${i+1}`,
      batchNumber: `BATCH-${i+1}`,
      moisture: (12 + Math.random() * 5).toFixed(1),
      closureDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      inventoryUpdatedBy: 'Inventory Manager',
      createdBy: 'Admin',
      createdAt: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      updatedAt: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      status: 'Pending'
    };
  });
};

export const PurchaseOrder = () => {
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
    
    // Auto-generate IDs for specific stages
    let autoFields = {};
    autoFields = { poNumber: 'PO-' + Math.floor(Math.random()*10000) };
    
    
    
    
    
    const readOnlyFields = ["prNumber","totalValue"];
    const initialFormData = {};
    readOnlyFields.forEach(field => {
      initialFormData[field] = item[field];
    });
    
    setFormData({ ...initialFormData, ...autoFields });
    setIsModalOpen(true);
  };

  // Auto-calculations for specific stages
  useEffect(() => {
    if (isModalOpen && formData) {
      
      const qty = parseFloat(formData.quantity) || 0;
      const rate = parseFloat(formData.rate) || 0;
      const total = qty * rate;
      if (formData.totalValue !== total) setFormData(prev => ({ ...prev, totalValue: total }));
      
      
      
      
      
    }
  }, [formData, isModalOpen]);

  const handleSave = () => {
    const processedItem = { ...selectedItem, ...formData, status: 'Completed', updatedAt: new Date().toISOString().split('T')[0] };
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
          Create PO
        </Button>
      </div>
    )
  };

  const pendingCols = [{"header":"PR Number","accessor":"prNumber"},{"header":"PR Date","accessor":"prDate"},{"header":"Paddy Type / Grade","accessor":"paddyGrade"},{"header":"Quantity Required (MT)","accessor":"quantity"},{"header":"Target Mandi","accessor":"targetMandi"},{"header":"Requested By","accessor":"requestedBy"}];
  const historyCols = [{"header":"PR Number","accessor":"prNumber"},{"header":"PO Number","accessor":"poNumber"},{"header":"PO Date","accessor":"poDate"},{"header":"Vendor / Farmer Name","accessor":"vendorName"},{"header":"Paddy Grade","accessor":"paddyGrade"},{"header":"Quantity (MT)","accessor":"quantity"},{"header":"Rate (₹/Qt)","accessor":"rate"},{"header":"Total Value (₹)","accessor":"totalValue"},{"header":"PO Validity Date","accessor":"poValidityDate"}];

  const columns = activeTab === 'pending' ? [actionColumn, ...pendingCols] : historyCols;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Stage 2 - Purchase Order</h2>
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
        title="Create Purchase Order"
      >
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 mb-4">
            <p className="text-sm text-slate-600 mb-1">Processing PR Number:</p>
            <p className="font-semibold text-slate-800">{selectedItem?.prNumber}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            
            <div className="space-y-1.5">
              <Label>PR Number</Label>
              <Input 
                type="text"
                value={formData.prNumber || ''} 
                onChange={(e) => setFormData({...formData, prNumber: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>PO Number</Label>
              <Input 
                type="text"
                value={formData.poNumber || ''} 
                onChange={(e) => setFormData({...formData, poNumber: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>PO Date</Label>
              <Input 
                type="date"
                value={formData.poDate || ''} 
                onChange={(e) => setFormData({...formData, poDate: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Vendor / Farmer Name</Label>
              <Input 
                type="text"
                value={formData.vendorName || ''} 
                onChange={(e) => setFormData({...formData, vendorName: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Vendor Phone</Label>
              <Input 
                type="text"
                value={formData.vendorPhone || ''} 
                onChange={(e) => setFormData({...formData, vendorPhone: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Paddy Grade</Label>
              <Input 
                type="text"
                value={formData.paddyGrade || ''} 
                onChange={(e) => setFormData({...formData, paddyGrade: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Quantity (MT)</Label>
              <Input 
                type="number"
                value={formData.quantity || ''} 
                onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Rate (₹/Qt)</Label>
              <Input 
                type="number"
                value={formData.rate || ''} 
                onChange={(e) => setFormData({...formData, rate: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Total Value (₹)</Label>
              <Input 
                type="number"
                value={formData.totalValue || ''} 
                onChange={(e) => setFormData({...formData, totalValue: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Delivery Terms</Label>
              <Input 
                type="text"
                value={formData.deliveryTerms || ''} 
                onChange={(e) => setFormData({...formData, deliveryTerms: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Payment Terms</Label>
              <Input 
                type="text"
                value={formData.paymentTerms || ''} 
                onChange={(e) => setFormData({...formData, paymentTerms: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>PO Validity Date</Label>
              <Input 
                type="date"
                value={formData.poValidityDate || ''} 
                onChange={(e) => setFormData({...formData, poValidityDate: e.target.value})}
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
