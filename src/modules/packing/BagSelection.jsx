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

export const BagSelection = () => {
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
    
    
    
    
    
    
    
    const readOnlyFields = ["packingOrderNo"];
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
          Select Bags
        </Button>
      </div>
    )
  };

  const pendingCols = [{"header":"Packing Order No","accessor":"packingOrderNo"},{"header":"Order Date","accessor":"orderDate"},{"header":"Rice Grade","accessor":"riceGrade"},{"header":"Lot No","accessor":"lotNo"},{"header":"Qty to Pack (MT)","accessor":"qtyToPack"},{"header":"Bag Type","accessor":"bagType"},{"header":"Bag Size","accessor":"bagSize"},{"header":"Created By","accessor":"createdBy"}];
  const historyCols = [{"header":"Packing Order No","accessor":"packingOrderNo"},{"header":"Rice Grade","accessor":"riceGrade"},{"header":"Bag Type","accessor":"bagType"},{"header":"Bag Size","accessor":"bagSize"},{"header":"No. of Bags Required","accessor":"noOfBagsRequired"},{"header":"Packing Material Stock ID","accessor":"packingMaterialStockId"},{"header":"Packing Material Batch No","accessor":"packingMaterialBatchNo"},{"header":"Label Type","accessor":"labelType"},{"header":"Approved By","accessor":"approvedBy"},{"header":"Selection Date","accessor":"selectionDate"}];

  const columns = activeTab === 'pending' ? [actionColumn, ...pendingCols] : historyCols;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Stage 2 - Bag Selection</h2>
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
        title="Bag Selection Details"
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
              <Label>Bag Type</Label>
              <Select 
                value={formData.bagType || ''} 
                onChange={(e) => setFormData({...formData, bagType: e.target.value})}
                disabled={false}
                className={false ? 'bg-slate-100' : ''}
              >
                <option value="">Select Bag Type</option>
                <option value="PP">PP</option><option value="BOPP">BOPP</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Bag Size</Label>
              <Select 
                value={formData.bagSize || ''} 
                onChange={(e) => setFormData({...formData, bagSize: e.target.value})}
                disabled={false}
                className={false ? 'bg-slate-100' : ''}
              >
                <option value="">Select Bag Size</option>
                <option value="5kg">5kg</option><option value="10kg">10kg</option><option value="25kg">25kg</option><option value="50kg">50kg</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Bag Color / Design</Label>
              <Input 
                type="text"
                value={formData.bagColor || ''} 
                onChange={(e) => setFormData({...formData, bagColor: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>No. of Bags Required</Label>
              <Input 
                type="number"
                value={formData.noOfBagsRequired || ''} 
                onChange={(e) => setFormData({...formData, noOfBagsRequired: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Packing Material Stock ID</Label>
              <Input 
                type="text"
                value={formData.packingMaterialStockId || ''} 
                onChange={(e) => setFormData({...formData, packingMaterialStockId: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Packing Material Batch No</Label>
              <Input 
                type="text"
                value={formData.packingMaterialBatchNo || ''} 
                onChange={(e) => setFormData({...formData, packingMaterialBatchNo: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Label Type</Label>
              <Input 
                type="text"
                value={formData.labelType || ''} 
                onChange={(e) => setFormData({...formData, labelType: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Thread / Seal Type</Label>
              <Input 
                type="text"
                value={formData.threadType || ''} 
                onChange={(e) => setFormData({...formData, threadType: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Approved By</Label>
              <Input 
                type="text"
                value={formData.approvedBy || ''} 
                onChange={(e) => setFormData({...formData, approvedBy: e.target.value})}
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
