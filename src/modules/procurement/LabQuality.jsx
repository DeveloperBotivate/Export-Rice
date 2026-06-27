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
    const trans = Math.floor(Math.random() * 50000) + 10000;
    return {
      id: i + 1,
      procurementId: `PRC-2026-${(i + 1).toString().padStart(4, '0')}`,
      planningDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      paddyType: ['Basmati', 'Non-Basmati', 'Sona Masuri'][Math.floor(Math.random() * 3)],
      expectedQty: qty,
      budgetAllocated: qty * rate,
      plannedBy: 'Admin User',
      procurementRegion: ['North', 'South', 'Central'][Math.floor(Math.random() * 3)],
      approvedBudget: qty * rate,
      approvalDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      approvedBy: 'Manager',
      priorityLevel: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
      approvalStatus: ['Approved', 'Rejected', 'Hold'][Math.floor(Math.random() * 3)],
      mandiName: ['Moga Main Mandi', 'Karnal Main Mandi', 'Ludhiana Grain Market'][Math.floor(Math.random() * 3)],
      mandiLocation: 'Central Market',
      mandiType: ['APMC', 'Private'][Math.floor(Math.random() * 2)],
      distance: Math.floor(Math.random() * 100) + 10,
      contactPerson: 'Rajesh Kumar',
      selectedBy: 'Supervisor',
      selectionDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      marketPrice: rate,
      minPrice: rate - 100,
      maxPrice: rate + 100,
      priceDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      marketTrend: ['Rising', 'Stable', 'Falling'][Math.floor(Math.random() * 3)],
      recordedBy: 'Field Agent',
      mspRate: 2183,
      paddyGrade: ['A', 'B', 'C'][Math.floor(Math.random() * 3)],
      mspYear: '2025-26',
      declaredBy: 'Govt. of India',
      effectiveDate: '2025-10-01',
      labId: `LAB-${Math.floor(Math.random() * 1000)}`,
      moisture: (12 + Math.random() * 5).toFixed(1),
      broken: (2 + Math.random() * 3).toFixed(1),
      chalky: (1 + Math.random() * 2).toFixed(1),
      foreignMatter: (0.5 + Math.random()).toFixed(1),
      finalLabGrade: ['A', 'B', 'C'][Math.floor(Math.random() * 3)],
      labTechnician: 'Amit Tech',
      testDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      finalPurchaseRate: rate,
      approvedQty: qty,
      paymentTerms: ['Advance', 'Credit', 'Full'][Math.floor(Math.random() * 3)],
      advanceAmount: Math.floor((qty * rate) * 0.2),
      approvalAuthority: 'Director',
      route: 'Mandi -> Mill',
      vehicleType: ['Truck', 'Tempo'][Math.floor(Math.random() * 2)],
      transportRate: Math.floor(Math.random() * 500) + 100,
      totalTransportCost: trans,
      transporterName: 'Fast Movers Logistics',
      transportDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      prNumber: `PR-${(i + 1).toString().padStart(4, '0')}`,
      requiredQty: qty,
      totalLandedCost: (rate + (trans / qty)).toFixed(2),
      estimatedTotalValue: (qty * (rate + (trans / qty))).toFixed(2),
      requirementStatus: ['Confirmed', 'Conditional'][Math.floor(Math.random() * 2)],
      createdBy: 'Procurement Head',
      createdAt: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      status: 'Pending'
    };
  });
};

export const LabQuality = () => {
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
    const readOnlyFields = ["procurementId"];
    const initialFormData = {};
    readOnlyFields.forEach(field => {
      initialFormData[field] = item[field];
    });
    setFormData({ ...initialFormData }); // Pre-fill ONLY readOnly fields
    setIsModalOpen(true);
  };

  // Auto-calculations for specific stages
  useEffect(() => {
    if (isModalOpen && formData) {
      
      
    }
  }, [formData, isModalOpen]);

  const handleSave = () => {
    const processedItem = { ...selectedItem, ...formData, status: 'Completed', createdAt: new Date().toISOString().split('T')[0] };
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
          Check Quality
        </Button>
      </div>
    )
  };

  const pendingCols = [{"header":"Procurement ID","accessor":"procurementId"},{"header":"Mandi Name","accessor":"mandiName"},{"header":"Paddy Type","accessor":"paddyType"},{"header":"MSP Rate (₹/Qt)","accessor":"mspRate"},{"header":"Market Price (₹/Qt)","accessor":"marketPrice"},{"header":"Paddy Grade","accessor":"paddyGrade"}];
  const historyCols = [{"header":"Procurement ID","accessor":"procurementId"},{"header":"Mandi Name","accessor":"mandiName"},{"header":"Paddy Type","accessor":"paddyType"},{"header":"Lab ID","accessor":"labId"},{"header":"Moisture %","accessor":"moisture"},{"header":"Broken %","accessor":"broken"},{"header":"Chalky %","accessor":"chalky"},{"header":"Foreign Matter %","accessor":"foreignMatter"},{"header":"Final Lab Grade","accessor":"finalLabGrade"},{"header":"Lab Technician","accessor":"labTechnician"},{"header":"Test Date","accessor":"testDate"}];

  const columns = activeTab === 'pending' ? [actionColumn, ...pendingCols] : historyCols;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Stage 6 - Lab Quality Check</h2>
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
        title="Lab Quality Check"
      >
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 mb-4">
            <p className="text-sm text-slate-600 mb-1">Processing Record:</p>
            <p className="font-semibold text-slate-800">{selectedItem?.procurementId}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            
            <div className="space-y-1.5">
              <Label>Procurement ID</Label>
              <Input 
                type="text"
                value={formData.procurementId || ''} 
                onChange={(e) => setFormData({...formData, procurementId: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Lab ID</Label>
              <Input 
                type="text"
                value={formData.labId || ''} 
                onChange={(e) => setFormData({...formData, labId: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Test Date</Label>
              <Input 
                type="date"
                value={formData.testDate || ''} 
                onChange={(e) => setFormData({...formData, testDate: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Moisture Content (%)</Label>
              <Input 
                type="number"
                value={formData.moisture || ''} 
                onChange={(e) => setFormData({...formData, moisture: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Broken Grain (%)</Label>
              <Input 
                type="number"
                value={formData.broken || ''} 
                onChange={(e) => setFormData({...formData, broken: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Chalky Grain (%)</Label>
              <Input 
                type="number"
                value={formData.chalky || ''} 
                onChange={(e) => setFormData({...formData, chalky: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Foreign Matter (%)</Label>
              <Input 
                type="number"
                value={formData.foreignMatter || ''} 
                onChange={(e) => setFormData({...formData, foreignMatter: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Immature Grain (%)</Label>
              <Input 
                type="number"
                value={formData.immature || ''} 
                onChange={(e) => setFormData({...formData, immature: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Red Grain (%)</Label>
              <Input 
                type="number"
                value={formData.redGrain || ''} 
                onChange={(e) => setFormData({...formData, redGrain: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Final Lab Grade</Label>
              <Select 
                value={formData.finalLabGrade || ''} 
                onChange={(e) => setFormData({...formData, finalLabGrade: e.target.value})}
                disabled={false}
                className={false ? 'bg-slate-100' : ''}
              >
                <option value="">Select Final Lab Grade</option>
                <option value="A">A</option><option value="B">B</option><option value="C">C</option><option value="Reject">Reject</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Lab Technician</Label>
              <Input 
                type="text"
                value={formData.labTechnician || ''} 
                onChange={(e) => setFormData({...formData, labTechnician: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Lab Remarks</Label>
              <Input 
                type="text"
                value={formData.labRemarks || ''} 
                onChange={(e) => setFormData({...formData, labRemarks: e.target.value})}
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
