import React, { useState } from 'react';
import { Search, Plus, Play } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input, Label, Select } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import DataTable from '../../components/DataTable';
import { usePagination } from '../../hooks/usePagination';
import { Modal } from '../../components/ui/Modal';
import { PageTabs } from '../../components/PageTabs';

const generateDummyData = () => {
  return Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    orderId: `SO-00${(i + 1).toString().padStart(2, '0')}`,
    contractNo: `EC-00${(i + 1).toString().padStart(2, '0')}`,
    contractDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
    buyerName: `Buyer ${i+1}`,
    buyerCountry: ['USA', 'UK', 'UAE', 'Singapore'][Math.floor(Math.random() * 4)],
    buyerAddress: '123 Export Lane',
    buyerContactPerson: 'John Doe',
    buyerEmail: `john.doe@buyer${i+1}.com`,
    buyerPhone: '+1 234 567 8900',
    incoterms: ['FOB', 'CIF', 'CNF', 'EXW'][Math.floor(Math.random() * 4)],
    riceGrade: ['Basmati', 'Non-Basmati'][Math.floor(Math.random() * 2)],
    quantity: Math.floor(Math.random() * 50) + 10,
    price: 1000,
    totalContractValue: 50000,
    portOfLoading: 'Mundra',
    portOfDestination: 'Jebel Ali',
    shipmentDate: `2026-07-${(i % 28 + 1).toString().padStart(2, '0')}`,
    paymentTerms: 'LC',
    lcTtReferenceNo: 'LC12345',
    currency: 'USD',
    tolerance: '5',
    specialConditions: 'None',
    createdBy: 'Export Mgr',
    status: 'Completed',
    totalQtySupplied: Math.floor(Math.random() * 50) + 10,
    completionDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`
  }));
};

export const ExportContract = () => {
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
    setFormData({
      orderId: item.orderId,
      buyerName: item.buyerName,
      riceGrade: item.riceGrade,
      quantity: item.quantity,
      contractNo: 'EC-00' + Math.floor(Math.random()*100)
    });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    const newItem = { ...selectedItem, ...formData, status: 'Completed' };
    setHistoryItems([newItem, ...historyItems]);
    setPendingItems(pendingItems.filter(p => p.id !== selectedItem.id));
    setIsModalOpen(false);
  };

  const pendingCols = [
    {
      header: 'Action',
      className: 'text-right',
      cell: (row) => (
        <div className="flex justify-end">
          <Button size="sm" onClick={() => handleActionClick(row)} className="flex items-center gap-1 bg-primary text-white">
            <Play size={14} /> Create Contract
          </Button>
        </div>
      )
    },
    { header: 'Order ID', accessor: 'orderId' },
    { header: 'Customer/Buyer Name', accessor: 'buyerName' },
    { header: 'Rice Grade', accessor: 'riceGrade' },
    { header: 'Total Qty Supplied (MT)', accessor: 'totalQtySupplied' },
    { header: 'Completion Date', accessor: 'completionDate' }
  ];

  const historyCols = [
    { header: 'Contract No', accessor: 'contractNo' },
    { header: 'Order ID', accessor: 'orderId' },
    { header: 'Contract Date', accessor: 'contractDate' },
    { header: 'Buyer Name', accessor: 'buyerName' },
    { header: 'Buyer Country', accessor: 'buyerCountry' },
    { header: 'Incoterms', accessor: 'incoterms' },
    { header: 'Rice Grade', accessor: 'riceGrade' },
    { header: 'Quantity (MT)', accessor: 'quantity' },
    { header: 'Total Contract Value ($)', accessor: 'totalContractValue' },
    { header: 'Port of Loading', accessor: 'portOfLoading' },
    { header: 'Port of Destination', accessor: 'portOfDestination' },
    { header: 'Shipment Date', accessor: 'shipmentDate' },
    { header: 'Payment Terms', accessor: 'paymentTerms' },
    { header: 'Created By', accessor: 'createdBy' },
    { header: 'Status', accessor: 'status' }
  ];

  const columns = activeTab === 'pending' ? pendingCols : historyCols;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Stage 1 - Export Contract</h2>
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
        title="Create Export Contract"
      >
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Order ID</Label>
              <Input type="text" value={formData.orderId || ''} readOnly className="bg-slate-100" />
            </div>
            <div className="space-y-1.5">
              <Label>Contract No</Label>
              <Input type="text" value={formData.contractNo || ''} readOnly className="bg-slate-100" />
            </div>
            <div className="space-y-1.5">
              <Label>Contract Date</Label>
              <Input type="date" value={formData.contractDate || ''} onChange={(e) => setFormData({...formData, contractDate: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Buyer Name</Label>
              <Input type="text" value={formData.buyerName || ''} readOnly className="bg-slate-100" />
            </div>
            <div className="space-y-1.5">
              <Label>Buyer Country</Label>
              <Input type="text" value={formData.buyerCountry || ''} onChange={(e) => setFormData({...formData, buyerCountry: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Buyer Address</Label>
              <Input type="text" value={formData.buyerAddress || ''} onChange={(e) => setFormData({...formData, buyerAddress: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Buyer Contact Person</Label>
              <Input type="text" value={formData.buyerContactPerson || ''} onChange={(e) => setFormData({...formData, buyerContactPerson: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Buyer Email</Label>
              <Input type="text" value={formData.buyerEmail || ''} onChange={(e) => setFormData({...formData, buyerEmail: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Buyer Phone</Label>
              <Input type="text" value={formData.buyerPhone || ''} onChange={(e) => setFormData({...formData, buyerPhone: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Incoterms</Label>
              <Select value={formData.incoterms || ''} onChange={(e) => setFormData({...formData, incoterms: e.target.value})}>
                <option value="">Select Incoterms</option>
                <option value="FOB">FOB</option>
                <option value="CIF">CIF</option>
                <option value="CNF">CNF</option>
                <option value="EXW">EXW</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Rice Grade</Label>
              <Input type="text" value={formData.riceGrade || ''} readOnly className="bg-slate-100" />
            </div>
            <div className="space-y-1.5">
              <Label>Quantity (MT)</Label>
              <Input type="number" value={formData.quantity || ''} readOnly className="bg-slate-100" />
            </div>
            <div className="space-y-1.5">
              <Label>Price ($/MT)</Label>
              <Input type="number" value={formData.price || ''} onChange={(e) => setFormData({...formData, price: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Total Contract Value ($)</Label>
              <Input type="number" value={formData.totalContractValue || ''} onChange={(e) => setFormData({...formData, totalContractValue: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Port of Loading</Label>
              <Input type="text" value={formData.portOfLoading || ''} onChange={(e) => setFormData({...formData, portOfLoading: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Port of Destination</Label>
              <Input type="text" value={formData.portOfDestination || ''} onChange={(e) => setFormData({...formData, portOfDestination: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Shipment Date</Label>
              <Input type="date" value={formData.shipmentDate || ''} onChange={(e) => setFormData({...formData, shipmentDate: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Payment Terms</Label>
              <Select value={formData.paymentTerms || ''} onChange={(e) => setFormData({...formData, paymentTerms: e.target.value})}>
                <option value="">Select Terms</option>
                <option value="LC">LC</option>
                <option value="TT">TT</option>
                <option value="DA">DA</option>
                <option value="CAD">CAD</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>LC/TT Reference No</Label>
              <Input type="text" value={formData.lcTtReferenceNo || ''} onChange={(e) => setFormData({...formData, lcTtReferenceNo: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Currency</Label>
              <Input type="text" value={formData.currency || ''} onChange={(e) => setFormData({...formData, currency: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Tolerance (±%)</Label>
              <Input type="text" value={formData.tolerance || ''} onChange={(e) => setFormData({...formData, tolerance: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Special Conditions</Label>
              <Input type="text" value={formData.specialConditions || ''} onChange={(e) => setFormData({...formData, specialConditions: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Created By</Label>
              <Input type="text" value={formData.createdBy || ''} onChange={(e) => setFormData({...formData, createdBy: e.target.value})} />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
            <Button onClick={() => setIsModalOpen(false)} variant="outline">Cancel</Button>
            <Button onClick={handleSave}>Save Contract</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
