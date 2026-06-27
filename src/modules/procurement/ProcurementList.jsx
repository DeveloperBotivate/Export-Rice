import React, { useState } from 'react';
import { Search, Plus, Play } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input, Label, Select } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import DataTable from '../../components/DataTable';
import { usePagination } from '../../hooks/usePagination';
import { Modal } from '../../components/ui/Modal';
import { WorkflowNavigation } from '../../components/WorkflowNavigation';
import { PageTabs } from '../../components/PageTabs';

const generateDummyPlans = () => {
  const seasons = ['Kharif', 'Rabi', 'Zaid'];
  const branches = ['Main Branch', 'North Branch', 'South Branch'];
  const types = ['Government', 'Open Market'];
  const states = ['Punjab', 'Haryana'];
  const districts = ['Moga', 'Karnal', 'Ludhiana', 'Ambala'];
  const talukas = ['Moga', 'Indri', 'Jagraon', 'Naraingarh'];
  const mandis = ['Moga Main Mandi', 'Karnal Main Mandi', 'Ludhiana Grain Market', 'Ambala Cantt Mandi'];
  const centers = ['Center A', 'Center B', 'Center C', 'Center D'];

  return Array.from({ length: 15 }, (_, i) => {
    const randomSeason = seasons[Math.floor(Math.random() * seasons.length)];
    const randomBranch = branches[Math.floor(Math.random() * branches.length)];
    const randomType = types[Math.floor(Math.random() * types.length)];
    
    // Group location data together to make sense
    const locations = [
      { state: 'Punjab', district: 'Moga', taluka: 'Moga', mandi: 'Moga Main Mandi' },
      { state: 'Haryana', district: 'Karnal', taluka: 'Indri', mandi: 'Karnal Main Mandi' },
      { state: 'Punjab', district: 'Ludhiana', taluka: 'Jagraon', mandi: 'Ludhiana Grain Market' },
      { state: 'Haryana', district: 'Ambala', taluka: 'Naraingarh', mandi: 'Ambala Cantt Mandi' },
      { state: 'Punjab', district: 'Patiala', taluka: 'Rajpura', mandi: 'Rajpura Grain Market' },
      { state: 'Haryana', district: 'Kurukshetra', taluka: 'Thanesar', mandi: 'Pipli Mandi' }
    ];
    
    const loc = locations[Math.floor(Math.random() * locations.length)];
    const randomCenter = centers[Math.floor(Math.random() * centers.length)];

    const dateDay = Math.floor(Math.random() * 28) + 1;
    const dateMonth = Math.floor(Math.random() * 12) + 1;
    
    return {
      id: i + 1,
      planningNo: `PP-2026-${(i + 1).toString().padStart(4, '0')}`,
      planningDate: `2026-${dateMonth.toString().padStart(2, '0')}-${dateDay.toString().padStart(2, '0')}`,
      season: randomSeason,
      financialYear: Math.random() > 0.5 ? '2026-27' : '2025-26',
      branch: randomBranch,
      type: randomType,
      state: loc.state,
      district: loc.district,
      taluka: loc.taluka,
      mandi: loc.mandi,
      center: randomCenter,
      gps: `${(30 + Math.random()).toFixed(4)}° N, ${(75 + Math.random()).toFixed(4)}° E`,
      address: `${loc.mandi} Yard No. ${Math.floor(Math.random() * 10) + 1}`
    };
  });
};

export const ProcurementList = () => {
  const generatedPlans = generateDummyPlans();
  
  // Take first 3 for history, rest for pending
  const initialHistory = generatedPlans.slice(0, 3).map(plan => ({
    ...plan,
    reqQuantity: Math.floor(Math.random() * 500) + 100,
    expMoisture: (Math.random() * 5 + 12).toFixed(1),
    expBroken: (Math.random() * 3 + 2).toFixed(1),
    expDamage: (Math.random() * 2 + 1).toFixed(1),
    availInventory: Math.floor(Math.random() * 1000) + 500,
    prefGrade: ['Grade A', 'Grade B', 'Grade C'][Math.floor(Math.random() * 3)],
    priority: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)]
  }));
  
  const initialPending = generatedPlans.slice(3);

  const [pendingPlans, setPendingPlans] = useState(initialPending);
  const [historyPlans, setHistoryPlans] = useState(initialHistory);
  
  const [activeTab, setActiveTab] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [formData, setFormData] = useState({});

  const displayData = activeTab === 'pending' ? pendingPlans : historyPlans;
  
  const filteredData = displayData.filter(item => 
    Object.values(item).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const pagination = usePagination(filteredData, 10);

  const handleActionClick = (plan) => {
    setSelectedPlan(plan);
    setFormData({});
    setIsModalOpen(true);
  };

  const handleSave = () => {
    const processedPlan = { ...selectedPlan, ...formData };
    setHistoryPlans([processedPlan, ...historyPlans]);
    setPendingPlans(pendingPlans.filter(p => p.id !== selectedPlan.id));
    setIsModalOpen(false);
    setSelectedPlan(null);
  };

  const pendingColumns = [
    { header: 'Serial No', accessor: 'planningNo' },
    { header: 'Planning Date', accessor: 'planningDate' },
    { header: 'Season', accessor: 'season' },
    { header: 'Financial Year', accessor: 'financialYear' },
    { header: 'Branch', accessor: 'branch' },
    { header: 'Type', accessor: 'type' },
    { header: 'State', accessor: 'state' },
    { header: 'District', accessor: 'district' },
    { header: 'Taluka', accessor: 'taluka' },
    { header: 'Mandi', accessor: 'mandi' },
    { header: 'Center', accessor: 'center' },
    { header: 'GPS', accessor: 'gps' },
    { header: 'Address', accessor: 'address' },
    {
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
    }
  ];

  const historyColumns = [
    { header: 'Serial No', accessor: 'planningNo' },
    { header: 'Season', accessor: 'season' },
    { header: 'Financial Year', accessor: 'financialYear' },
    { header: 'Branch', accessor: 'branch' },
    { header: 'Type', accessor: 'type' },
    { header: 'State', accessor: 'state' },
    { header: 'Mandi', accessor: 'mandi' },
    { header: 'Address', accessor: 'address' },
    { header: 'Required Qty (MT)', accessor: 'reqQuantity' },
    { header: 'Exp Moisture %', accessor: 'expMoisture' },
    { header: 'Exp Broken %', accessor: 'expBroken' },
    { header: 'Exp Damage %', accessor: 'expDamage' },
    { header: 'Available Inventory', accessor: 'availInventory' },
    { header: 'Pref Paddy Grade', accessor: 'prefGrade' },
    { header: 'Priority', accessor: 'priority', cell: (row) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        row.priority === 'High' ? 'bg-red-100 text-red-700' :
        row.priority === 'Medium' ? 'bg-amber-100 text-amber-700' :
        'bg-green-100 text-green-700'
      }`}>
        {row.priority}
      </span>
    )}
  ];

  const columns = activeTab === 'pending' ? pendingColumns : historyColumns;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-800">Procurement Module</h2>
        <p className="text-sm text-slate-500">Convert Procurement Plans into Procurement Orders</p>
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

      <WorkflowNavigation 
        prevLink="/procurement-planning"
        prevLabel="Procurement Planning"
        nextLink="/gate"
        nextLabel="Gate Management"
      />

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Create Procurement Order"
      >
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 mb-4">
            <p className="text-sm text-slate-600 mb-1">Processing Plan:</p>
            <p className="font-semibold text-slate-800">{selectedPlan?.planningNo}</p>
            <p className="text-sm text-slate-500">{selectedPlan?.mandi} - {selectedPlan?.state}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Required Quantity (MT)</Label>
              <Input 
                type="number"
                value={formData.reqQuantity || ''} 
                onChange={(e) => setFormData({...formData, reqQuantity: e.target.value})}
                placeholder="Enter quantity"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Available Inventory</Label>
              <Input 
                type="number"
                value={formData.availInventory || ''} 
                onChange={(e) => setFormData({...formData, availInventory: e.target.value})}
                placeholder="Enter inventory"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label>Expected Moisture %</Label>
              <Input 
                type="number"
                value={formData.expMoisture || ''} 
                onChange={(e) => setFormData({...formData, expMoisture: e.target.value})}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Expected Broken %</Label>
              <Input 
                type="number"
                value={formData.expBroken || ''} 
                onChange={(e) => setFormData({...formData, expBroken: e.target.value})}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Expected Damage %</Label>
              <Input 
                type="number"
                value={formData.expDamage || ''} 
                onChange={(e) => setFormData({...formData, expDamage: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Preferred Paddy Grade</Label>
              <Select 
                value={formData.prefGrade || ''} 
                onChange={(e) => setFormData({...formData, prefGrade: e.target.value})}
              >
                <option value="">Select Grade</option>
                <option value="Grade A">Grade A</option>
                <option value="Grade B">Grade B</option>
                <option value="Grade C">Grade C</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Purchase Priority</Label>
              <Select 
                value={formData.priority || ''} 
                onChange={(e) => setFormData({...formData, priority: e.target.value})}
              >
                <option value="">Select Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
            <Button onClick={() => setIsModalOpen(false)} className="bg-white border border-slate-200 text-slate-600 hover:bg-slate-100">
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};