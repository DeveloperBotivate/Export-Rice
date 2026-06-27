import React, { useState } from 'react';
import { Search, Plus, Play } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input, Label, Select } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import DataTable from '../../components/DataTable';
import { usePagination } from '../../hooks/usePagination';
import { Modal } from '../../components/ui/Modal';
import { PageTabs } from '../../components/PageTabs';

const generateDummyData = (type, offset = 0) => {
  return Array.from({ length: 20 }, (_, i) => {
    const num = i + 1 + offset;
    return {
      id: type + num,
      indentNo: `IND-00${num.toString().padStart(2, '0')}`,
      indentDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      purchaseType: type,
      procurementRef: type === 'Government' ? `PROC-00${num.toString().padStart(2, '0')}` : '-',
      prNumber: type === 'Government' ? `PR-00${num.toString().padStart(2, '0')}` : '-',
      agencyName: type === 'Government' ? 'FCI' : '-',
      targetMandi: type === 'Direct Market' ? 'Local Mandi' : '-',
      season: type === 'Government' ? 'Kharif' : '-',
      paddyGrade: ['Grade A', 'Grade B', 'Common'][Math.floor(Math.random() * 3)],
      qtyMt: Math.floor(Math.random() * 50) + 10,
      mandatedRate: type === 'Government' ? 2200 : '-',
      budget: type === 'Direct Market' ? 2100 : '-',
      region: type === 'Government' ? 'Punjab' : '-',
      allocationOrderRef: type === 'Government' ? `ALLOC-00${num}` : '-',
      requiredByDate: `2026-07-${(i % 28 + 1).toString().padStart(2, '0')}`,
      requestedBy: `User ${num}`,
      department: 'Procurement',
      status: 'Completed'
    };
  });
};

export const PurchaseIndent = () => {
  const [activeTab, setActiveTab] = useState("gov");
  const [govItems, setGovItems] = useState(generateDummyData('Government', 0));
  const [dmItems, setDmItems] = useState(generateDummyData('Direct Market', 20));
  
  const [isTypeSelectorOpen, setIsTypeSelectorOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const [formData, setFormData] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);

  const handleAddClick = () => {
    setSelectedItem(null);
    setIsTypeSelectorOpen(true);
  };

  const handleActionClick = (item, type) => {
    setSelectedItem(item);
    setSelectedType(type);
    setFormData({
      ...item,
      indentNo: "IND-00" + Math.floor(Math.random()*100),
      indentDate: new Date().toISOString().split('T')[0]
    });
    setIsFormOpen(true);
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setIsTypeSelectorOpen(false);
    setFormData({
      indentNo: "IND-00" + Math.floor(Math.random()*100),
      purchaseType: type,
      indentDate: new Date().toISOString().split('T')[0],
      procurementRef: type === 'Government' ? 'PROC-00' + Math.floor(Math.random()*100) : '',
      prNumber: type === 'Government' ? 'PR-00' + Math.floor(Math.random()*100) : '',
      season: type === 'Government' ? 'Kharif' : '',
      paddyGrade: 'Grade A',
      qtyMt: 50,
      mandatedRate: type === 'Government' ? 2200 : '',
      region: type === 'Government' ? 'Punjab' : ''
    });
    setIsFormOpen(true);
  };

  const handleSave = () => {
    const newItem = { ...formData, id: Math.random(), status: 'Completed' };
    if (selectedType === 'Government') {
      if (selectedItem) {
        setGovItems(govItems.map(p => p.id === selectedItem.id ? newItem : p));
      } else {
        setGovItems([newItem, ...govItems]);
      }
    } else {
      if (selectedItem) {
        setDmItems(dmItems.map(p => p.id === selectedItem.id ? newItem : p));
      } else {
        setDmItems([newItem, ...dmItems]);
      }
    }
    setIsFormOpen(false);
  };

  const actionColumn = (type) => ({
    header: "Action",
    className: "text-center",
    cell: (row) => (
      row.status !== 'Completed' ? (
        <div className="flex justify-center">
          <Button size="sm" onClick={() => handleActionClick(row, type)} className="flex items-center gap-1 bg-primary text-white">
            <Play size={14} /> Process
          </Button>
        </div>
      ) : (
        <span className="text-slate-400 font-medium">Completed</span>
      )
    )
  });

  const govCols = [
    actionColumn('Government'),
    { header: "Indent No", accessor: "indentNo" },
    { header: "Indent Date", accessor: "indentDate" },
    { header: "Purchase Type", accessor: "purchaseType", cell: (row) => <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{row.purchaseType}</span> },
    { header: "Procurement Ref No", accessor: "procurementRef" },
    { header: "Agency Name", accessor: "agencyName" },
    { header: "Season", accessor: "season" },
    { header: "Paddy Grade", accessor: "paddyGrade" },
    { header: "Qty MT", accessor: "qtyMt" },
    { header: "Mandated Rate ₹/Qt", accessor: "mandatedRate" },
    { header: "Region", accessor: "region" },
    { header: "Required By Date", accessor: "requiredByDate" },
    { header: "Requested By", accessor: "requestedBy" },
    { header: "Status", accessor: "status" }
  ];

  const dmCols = [
    actionColumn('Direct Market'),
    { header: "Indent No", accessor: "indentNo" },
    { header: "Indent Date", accessor: "indentDate" },
    { header: "Purchase Type", accessor: "purchaseType", cell: (row) => <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">{row.purchaseType}</span> },
    { header: "Target Mandi", accessor: "targetMandi" },
    { header: "Paddy Grade", accessor: "paddyGrade" },
    { header: "Qty MT", accessor: "qtyMt" },
    { header: "Budget ₹/Qt", accessor: "budget" },
    { header: "Required By Date", accessor: "requiredByDate" },
    { header: "Requested By", accessor: "requestedBy" },
    { header: "Status", accessor: "status" }
  ];

  const govPagination = usePagination(govItems, 10);
  const dmPagination = usePagination(dmItems, 10);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Stage 1 - Purchase Indent</h2>
        <Button onClick={handleAddClick} className="flex items-center gap-2">
          <Plus size={16} /> Add Indent
        </Button>
      </div>

      <div className="flex border-b border-slate-200">
        <button 
          onClick={() => setActiveTab('gov')} 
          className={`px-6 py-3 font-medium transition-colors ${activeTab === 'gov' ? 'border-b-2 border-primary text-primary' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
        >
          Government Indents
        </button>
        <button 
          onClick={() => setActiveTab('dm')} 
          className={`px-6 py-3 font-medium transition-colors ${activeTab === 'dm' ? 'border-b-2 border-primary text-primary' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
        >
          Direct Market Indents
        </button>
      </div>

      {activeTab === 'gov' && (
        <Card>
          <div className="p-4 border-b border-slate-200">
            <h3 className="text-lg font-semibold">Government Indents</h3>
          </div>
          <DataTable 
            columns={govCols} 
            data={govPagination.paginatedData} 
            currentPage={govPagination.currentPage}
            totalPages={govPagination.totalPages}
            itemsPerPage={govPagination.itemsPerPage}
            onPageChange={govPagination.setCurrentPage}
            onItemsPerPageChange={govPagination.setItemsPerPage}
            totalResults={govPagination.totalResults}
          />
        </Card>
      )}

      {activeTab === 'dm' && (
        <Card>
          <div className="p-4 border-b border-slate-200">
            <h3 className="text-lg font-semibold">Direct Market Indents</h3>
          </div>
          <DataTable 
            columns={dmCols} 
            data={dmPagination.paginatedData} 
            currentPage={dmPagination.currentPage}
            totalPages={dmPagination.totalPages}
            itemsPerPage={dmPagination.itemsPerPage}
            onPageChange={dmPagination.setCurrentPage}
            onItemsPerPageChange={dmPagination.setItemsPerPage}
            totalResults={dmPagination.totalResults}
          />
        </Card>
      )}

      <Modal isOpen={isTypeSelectorOpen} onClose={() => setIsTypeSelectorOpen(false)} title="Select Purchase Type">
        <div className="p-6 flex flex-col gap-4">
          <Button onClick={() => handleTypeSelect('Government')} className="w-full justify-center text-lg py-6" variant="outline">
            Government (FCI / State Agency)
          </Button>
          <Button onClick={() => handleTypeSelect('Direct Market')} className="w-full justify-center text-lg py-6" variant="outline">
            Direct Market (Mandi / Farmer)
          </Button>
        </div>
      </Modal>

      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} title={`Create ${selectedType} Indent`}>
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Indent No</Label>
              <Input type="text" value={formData.indentNo || ""} readOnly className="bg-slate-100" />
            </div>
            <div className="space-y-1.5">
              <Label>Indent Date</Label>
              <Input type="date" value={formData.indentDate || ""} onChange={(e) => setFormData({...formData, indentDate: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Purchase Type</Label>
              <Input type="text" value={formData.purchaseType || ""} readOnly className="bg-slate-100" />
            </div>
            
            {selectedType === 'Government' && (
              <>
                <div className="space-y-1.5">
                  <Label>Procurement Ref No</Label>
                  <Input type="text" value={formData.procurementRef || ""} readOnly className="bg-slate-100" />
                </div>
                <div className="space-y-1.5">
                  <Label>PR Number from Procurement</Label>
                  <Input type="text" value={formData.prNumber || ""} readOnly className="bg-slate-100" />
                </div>
                <div className="space-y-1.5">
                  <Label>Agency Name</Label>
                  <Select value={formData.agencyName || ""} onChange={(e) => setFormData({...formData, agencyName: e.target.value})}>
                    <option value="">Select Agency</option>
                    <option value="FCI">FCI</option>
                    <option value="NAFED">NAFED</option>
                    <option value="State Agency">State Agency</option>
                    <option value="Other">Other</option>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Government Season</Label>
                  <Input type="text" value={formData.season || ""} readOnly className="bg-slate-100" />
                </div>
                <div className="space-y-1.5">
                  <Label>Paddy Grade</Label>
                  <Input type="text" value={formData.paddyGrade || ""} readOnly className="bg-slate-100" />
                </div>
                <div className="space-y-1.5">
                  <Label>Quantity Required MT</Label>
                  <Input type="number" value={formData.qtyMt || ""} readOnly className="bg-slate-100" />
                </div>
                <div className="space-y-1.5">
                  <Label>Mandated Rate ₹/Qt</Label>
                  <Input type="number" value={formData.mandatedRate || ""} readOnly className="bg-slate-100" />
                </div>
                <div className="space-y-1.5">
                  <Label>Procurement Region / State</Label>
                  <Input type="text" value={formData.region || ""} readOnly className="bg-slate-100" />
                </div>
                <div className="space-y-1.5">
                  <Label>Allocation Order Ref No</Label>
                  <Input type="text" value={formData.allocationOrderRef || ""} onChange={(e) => setFormData({...formData, allocationOrderRef: e.target.value})} />
                </div>
              </>
            )}

            {selectedType === 'Direct Market' && (
              <>
                <div className="space-y-1.5">
                  <Label>Target Mandi</Label>
                  <Input type="text" value={formData.targetMandi || ""} onChange={(e) => setFormData({...formData, targetMandi: e.target.value})} />
                </div>
                <div className="space-y-1.5">
                  <Label>Paddy Grade Required</Label>
                  <Input type="text" value={formData.paddyGrade || ""} onChange={(e) => setFormData({...formData, paddyGrade: e.target.value})} />
                </div>
                <div className="space-y-1.5">
                  <Label>Quantity Required MT</Label>
                  <Input type="number" value={formData.qtyMt || ""} onChange={(e) => setFormData({...formData, qtyMt: e.target.value})} />
                </div>
                <div className="space-y-1.5">
                  <Label>Budget ₹/Qt</Label>
                  <Input type="number" value={formData.budget || ""} onChange={(e) => setFormData({...formData, budget: e.target.value})} />
                </div>
              </>
            )}
            
            <div className="space-y-1.5">
              <Label>Required By Date</Label>
              <Input type="date" value={formData.requiredByDate || ""} onChange={(e) => setFormData({...formData, requiredByDate: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Requested By</Label>
              <Input type="text" value={formData.requestedBy || ""} onChange={(e) => setFormData({...formData, requestedBy: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Department</Label>
              <Input type="text" value={formData.department || ""} onChange={(e) => setFormData({...formData, department: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Remarks</Label>
              <Input type="text" value={formData.remarks || ""} onChange={(e) => setFormData({...formData, remarks: e.target.value})} />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
            <Button onClick={() => setIsFormOpen(false)} variant="outline">Cancel</Button>
            <Button onClick={handleSave}>Save Indent</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
