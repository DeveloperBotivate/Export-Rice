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
    const rate = Math.floor(Math.random() * 50000) + 40000;
    
    return {
      id: i + 1,
      packingOrderNo: `PKO-2026-${(i + 1).toString().padStart(4, '0')}`,
      orderDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      riceGrade: ['Grade A', 'Grade B', 'Premium'][Math.floor(Math.random() * 3)],
      lotNo: `LOT-${i+1}`,
      batchNo: `BATCH-${i+1}`,
      qtyToPack: qty,
      bagType: ['PP', 'BOPP'][Math.floor(Math.random() * 2)],
      bagSize: ['5kg', '10kg', '25kg', '50kg'][Math.floor(Math.random() * 4)],
      targetPackingDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      shift: ['Morning', 'Evening', 'Night'][Math.floor(Math.random() * 3)],
      createdBy: 'Packing Head',
      
      noOfBagsRequired: qty * 1000 / 25,
      packingMaterialStockId: `PM-${Math.floor(Math.random() * 1000)}`,
      packingMaterialBatchNo: `PM-BT-${Math.floor(Math.random() * 100)}`,
      labelType: 'Standard',
      approvedBy: 'Manager',
      selectionDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,

      barcodeFormat: 'EAN13',
      barcodeSeries: `10000${i} - 10000${i + 50}`,
      totalBarcodes: 50,
      printDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      printedBy: 'Operator',

      qrBatchId: `QR-${(i + 1).toString().padStart(4, '0')}`,
      qrContentType: 'Both',
      totalQrGenerated: 50,
      fssaiLicense: 'FSSAI1234567890',
      mrp: 1500,
      packedDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      bestBeforeDate: `2027-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      generatedBy: 'System',

      newBatchNumber: `BT-${(i + 1).toString().padStart(4, '0')}`,
      batchDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      qtyInBatch: qty,
      manufacturingDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      assignedBy: 'Supervisor',

      newLotNumber: `LT-${(i + 1).toString().padStart(4, '0')}`,
      lotQuantity: qty,
      warehouse: 'Warehouse A',
      godown: 'Godown 1',
      rackBin: 'Rack 3',
      assignedDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,

      weightVerifyId: `WV-${(i + 1).toString().padStart(4, '0')}`,
      targetWeight: 25,
      sampleBagsChecked: 10,
      avgWeight: 25.02,
      variance: 0.08,
      weightPassFail: 'Pass',
      verificationDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}T10:00`,
      verifiedBy: 'Quality Checker',

      qcId: `QC-${(i + 1).toString().padStart(4, '0')}`,
      sealIntegrity: 'Pass',
      labelAccuracy: 'Pass',
      bagStitching: 'Pass',
      visualAppearance: 'Good',
      qcSampleSize: 5,
      rejectionCount: 0,
      qcResult: 'Pass',
      qcDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      qcInspector: 'QC Manager',

      fgStockId: `FGS-${(i + 1).toString().padStart(4, '0')}`,
      fgNoOfBags: qty * 1000 / 25,
      fgTotalWeight: qty,
      fgMrp: 1500,
      fgTotalStockValue: qty * rate,
      fgAddedBy: 'Store Manager',
      fgAddedDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,

      status: 'Completed'
    };
  });
};

export const QRCodeStage = () => {
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
    autoFields = { qrBatchId: 'QR-' + Math.floor(Math.random()*10000) };
    
    
    
    
    
    
    const readOnlyFields = ["packingOrderNo","qrBatchId","barcodeSeries","riceGrade","lotNo","batchNo"];
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
    const processedItem = { ...selectedItem, ...formData, status: 'Completed', fgAddedDate: new Date().toISOString().split('T')[0] };
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
          Generate QR
        </Button>
      </div>
    )
  };

  const pendingCols = [{"header":"Packing Order No","accessor":"packingOrderNo"},{"header":"Barcode Format","accessor":"barcodeFormat"},{"header":"Barcode Series (From–To)","accessor":"barcodeSeries"},{"header":"Total Barcodes","accessor":"totalBarcodes"},{"header":"Print Date","accessor":"printDate"},{"header":"Printed By","accessor":"printedBy"}];
  const historyCols = [{"header":"QR Batch ID","accessor":"qrBatchId"},{"header":"Packing Order No","accessor":"packingOrderNo"},{"header":"QR Content Type","accessor":"qrContentType"},{"header":"Linked Barcode Series","accessor":"barcodeSeries"},{"header":"Total QR Generated","accessor":"totalQrGenerated"},{"header":"FSSAI License","accessor":"fssaiLicense"},{"header":"MRP (₹)","accessor":"mrp"},{"header":"Packed Date","accessor":"packedDate"},{"header":"Best Before Date","accessor":"bestBeforeDate"},{"header":"Generated By","accessor":"generatedBy"}];

  const columns = activeTab === 'pending' ? [actionColumn, ...pendingCols] : historyCols;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Stage 4 - QR Code Generation</h2>
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
        title="QR Code Details"
      >
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            
            <div className="space-y-1.5">
              <Label>Packing Order No</Label>
              <Input 
                type="text"
                value={formData.packingOrderNo || ''} 
                onChange={(e) => setFormData({...formData, packingOrderNo: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>QR Content Type</Label>
              <Select 
                value={formData.qrContentType || ''} 
                onChange={(e) => setFormData({...formData, qrContentType: e.target.value})}
                disabled={false}
                className={false ? 'bg-slate-100' : ''}
              >
                <option value="">Select QR Content Type</option>
                <option value="Product Info">Product Info</option><option value="Trace Link">Trace Link</option><option value="Both">Both</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>QR Batch ID</Label>
              <Input 
                type="text"
                value={formData.qrBatchId || ''} 
                onChange={(e) => setFormData({...formData, qrBatchId: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Linked Barcode Series</Label>
              <Input 
                type="text"
                value={formData.barcodeSeries || ''} 
                onChange={(e) => setFormData({...formData, barcodeSeries: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Product Name</Label>
              <Input 
                type="text"
                value={formData.productName || ''} 
                onChange={(e) => setFormData({...formData, productName: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Rice Grade</Label>
              <Input 
                type="text"
                value={formData.riceGrade || ''} 
                onChange={(e) => setFormData({...formData, riceGrade: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Lot No</Label>
              <Input 
                type="text"
                value={formData.lotNo || ''} 
                onChange={(e) => setFormData({...formData, lotNo: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Batch No</Label>
              <Input 
                type="text"
                value={formData.batchNo || ''} 
                onChange={(e) => setFormData({...formData, batchNo: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Mill Name</Label>
              <Input 
                type="text"
                value={formData.millName || ''} 
                onChange={(e) => setFormData({...formData, millName: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>FSSAI License</Label>
              <Input 
                type="text"
                value={formData.fssaiLicense || ''} 
                onChange={(e) => setFormData({...formData, fssaiLicense: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Packed Date</Label>
              <Input 
                type="date"
                value={formData.packedDate || ''} 
                onChange={(e) => setFormData({...formData, packedDate: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Best Before Date</Label>
              <Input 
                type="date"
                value={formData.bestBeforeDate || ''} 
                onChange={(e) => setFormData({...formData, bestBeforeDate: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>MRP (₹)</Label>
              <Input 
                type="number"
                value={formData.mrp || ''} 
                onChange={(e) => setFormData({...formData, mrp: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Generated By</Label>
              <Input 
                type="text"
                value={formData.generatedBy || ''} 
                onChange={(e) => setFormData({...formData, generatedBy: e.target.value})}
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
