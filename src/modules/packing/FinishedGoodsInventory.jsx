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

export const FinishedGoodsInventory = () => {
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
    
    
    
    
    
    autoFields = { fgStockId: 'FGS-' + Math.floor(Math.random()*10000) };
    
    const readOnlyFields = ["qcId","newLotNumber","newBatchNumber","packingOrderNo","fgStockId","riceGrade","fgTotalStockValue"];
    const initialFormData = {};
    readOnlyFields.forEach(field => {
      initialFormData[field] = item[field];
    });
    
    setFormData({ ...initialFormData, ...autoFields });
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (isModalOpen && formData) {
      
      
      

      
      const weight = parseFloat(formData.fgTotalWeight) || 0;
      const rate = parseFloat(formData.fgValuationRate) || 0;
      const total = weight * rate;
      if (formData.fgTotalStockValue !== total) {
        setFormData(prev => ({ ...prev, fgTotalStockValue: total }));
      }
      
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
          Move to FG
        </Button>
      </div>
    )
  };

  const pendingCols = [{"header":"QC ID","accessor":"qcId"},{"header":"Lot Number","accessor":"newLotNumber"},{"header":"Batch Number","accessor":"newBatchNumber"},{"header":"Packing Order No","accessor":"packingOrderNo"},{"header":"Rice Grade","accessor":"riceGrade"},{"header":"QC Result","accessor":"qcResult"},{"header":"QC Date","accessor":"qcDate"},{"header":"QC Inspector","accessor":"qcInspector"}];
  const historyCols = [{"header":"FG Stock ID","accessor":"fgStockId"},{"header":"QC ID","accessor":"qcId"},{"header":"Lot Number","accessor":"newLotNumber"},{"header":"Batch Number","accessor":"newBatchNumber"},{"header":"Packing Order No","accessor":"packingOrderNo"},{"header":"Rice Grade","accessor":"riceGrade"},{"header":"No. of Bags","accessor":"fgNoOfBags"},{"header":"Total Weight (MT)","accessor":"fgTotalWeight"},{"header":"Warehouse","accessor":"warehouse"},{"header":"Go-down","accessor":"godown"},{"header":"Rack / Bin","accessor":"rackBin"},{"header":"MRP (₹)","accessor":"fgMrp"},{"header":"Total Stock Value (₹)","accessor":"fgTotalStockValue"},{"header":"Added By","accessor":"fgAddedBy"},{"header":"Added Date","accessor":"fgAddedDate"}];

  const columns = activeTab === 'pending' ? [actionColumn, ...pendingCols] : historyCols;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Stage 9 - Finished Goods Inventory</h2>
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
        title="FG Stock Details"
      >
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            
            <div className="space-y-1.5">
              <Label>QC ID</Label>
              <Input 
                type="text"
                value={formData.qcId || ''} 
                onChange={(e) => setFormData({...formData, qcId: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Lot Number</Label>
              <Input 
                type="text"
                value={formData.newLotNumber || ''} 
                onChange={(e) => setFormData({...formData, newLotNumber: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Batch Number</Label>
              <Input 
                type="text"
                value={formData.newBatchNumber || ''} 
                onChange={(e) => setFormData({...formData, newBatchNumber: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
              />
            </div>
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
              <Label>FG Stock ID</Label>
              <Input 
                type="text"
                value={formData.fgStockId || ''} 
                onChange={(e) => setFormData({...formData, fgStockId: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
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
              <Label>No. of Bags</Label>
              <Input 
                type="number"
                value={formData.fgNoOfBags || ''} 
                onChange={(e) => setFormData({...formData, fgNoOfBags: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Total Net Weight (MT)</Label>
              <Input 
                type="number"
                value={formData.fgTotalWeight || ''} 
                onChange={(e) => setFormData({...formData, fgTotalWeight: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Warehouse</Label>
              <Input 
                type="text"
                value={formData.warehouse || ''} 
                onChange={(e) => setFormData({...formData, warehouse: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Go-down</Label>
              <Input 
                type="text"
                value={formData.godown || ''} 
                onChange={(e) => setFormData({...formData, godown: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Rack / Bin</Label>
              <Input 
                type="text"
                value={formData.rackBin || ''} 
                onChange={(e) => setFormData({...formData, rackBin: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>MRP (₹)</Label>
              <Input 
                type="number"
                value={formData.fgMrp || ''} 
                onChange={(e) => setFormData({...formData, fgMrp: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Valuation Rate (₹/MT)</Label>
              <Input 
                type="number"
                value={formData.fgValuationRate || ''} 
                onChange={(e) => setFormData({...formData, fgValuationRate: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Total Stock Value (₹)</Label>
              <Input 
                type="number"
                value={formData.fgTotalStockValue || ''} 
                onChange={(e) => setFormData({...formData, fgTotalStockValue: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Added By</Label>
              <Input 
                type="text"
                value={formData.fgAddedBy || ''} 
                onChange={(e) => setFormData({...formData, fgAddedBy: e.target.value})}
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
