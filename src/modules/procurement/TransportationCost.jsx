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

export const TransportationCost = () => {
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
    const readOnlyFields = ["procurementId","mandiName"];
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
      
      const fuel = parseFloat(formData.fuelCost) || 0;
      const driver = parseFloat(formData.driverCharges) || 0;
      const load = parseFloat(formData.loadingCharges) || 0;
      const toll = parseFloat(formData.tollCharges) || 0;
      const total = fuel + driver + load + toll;
      if (formData.totalTransportCost !== total) {
        setFormData(prev => ({ ...prev, totalTransportCost: total }));
      }
      
      
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
          Add Transport Cost
        </Button>
      </div>
    )
  };

  const pendingCols = [{"header":"Procurement ID","accessor":"procurementId"},{"header":"Mandi Name","accessor":"mandiName"},{"header":"Mandi Location","accessor":"mandiLocation"},{"header":"Approved Qty (MT)","accessor":"approvedQty"},{"header":"Final Purchase Rate (₹/Qt)","accessor":"finalPurchaseRate"},{"header":"Approval Date","accessor":"approvalDate"}];
  const historyCols = [{"header":"Procurement ID","accessor":"procurementId"},{"header":"Mandi Name","accessor":"mandiName"},{"header":"Route","accessor":"route"},{"header":"Vehicle Type","accessor":"vehicleType"},{"header":"Transport Rate (₹/MT)","accessor":"transportRate"},{"header":"Total Transport Cost (₹)","accessor":"totalTransportCost"},{"header":"Transporter Name","accessor":"transporterName"},{"header":"Transport Date","accessor":"transportDate"}];

  const columns = activeTab === 'pending' ? [actionColumn, ...pendingCols] : historyCols;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Stage 8 - Transportation Cost</h2>
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
        title="Add Transport Cost"
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
              <Label>Mandi Name</Label>
              <Input 
                type="text"
                value={formData.mandiName || ''} 
                onChange={(e) => setFormData({...formData, mandiName: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Transport Rate (₹/MT)</Label>
              <Input 
                type="number"
                value={formData.transportRate || ''} 
                onChange={(e) => setFormData({...formData, transportRate: e.target.value})}
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
                <option value="Truck">Truck</option><option value="Tempo">Tempo</option><option value="Other">Other</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Route (Mandi → Mill)</Label>
              <Input 
                type="text"
                value={formData.route || ''} 
                onChange={(e) => setFormData({...formData, route: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Distance (km)</Label>
              <Input 
                type="number"
                value={formData.distance || ''} 
                onChange={(e) => setFormData({...formData, distance: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Fuel Cost (₹)</Label>
              <Input 
                type="number"
                value={formData.fuelCost || ''} 
                onChange={(e) => setFormData({...formData, fuelCost: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Driver Charges (₹)</Label>
              <Input 
                type="number"
                value={formData.driverCharges || ''} 
                onChange={(e) => setFormData({...formData, driverCharges: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Loading Charges (₹)</Label>
              <Input 
                type="number"
                value={formData.loadingCharges || ''} 
                onChange={(e) => setFormData({...formData, loadingCharges: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Toll Charges (₹)</Label>
              <Input 
                type="number"
                value={formData.tollCharges || ''} 
                onChange={(e) => setFormData({...formData, tollCharges: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Total Transport Cost (₹)</Label>
              <Input 
                type="number"
                value={formData.totalTransportCost || ''} 
                onChange={(e) => setFormData({...formData, totalTransportCost: e.target.value})}
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
              <Label>Transport Date</Label>
              <Input 
                type="date"
                value={formData.transportDate || ''} 
                onChange={(e) => setFormData({...formData, transportDate: e.target.value})}
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
