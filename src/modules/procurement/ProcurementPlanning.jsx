import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input, Label, Select } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import DataTable from '../../components/DataTable';
import { usePagination } from '../../hooks/usePagination';
import { Modal } from '../../components/ui/Modal';

const generateDummyPlans = () => {
  const seasons = ['Kharif', 'Rabi', 'Zaid'];
  const branches = ['Main Branch', 'North Branch', 'South Branch'];
  const types = ['Government', 'Open Market'];
  const statuses = ['Draft', 'Pending', 'Approved'];
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
      status: statuses[Math.floor(Math.random() * statuses.length)],
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

export const ProcurementPlanning = () => {
  const [data, setData] = useState(generateDummyPlans());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeason, setFilterSeason] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const filteredData = data.filter(item => {
    const matchesSearch = Object.values(item).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesSeason = filterSeason === 'All' || item.season === filterSeason;
    const matchesStatus = filterStatus === 'All' || item.status === filterStatus;
    
    return matchesSearch && matchesSeason && matchesStatus;
  });

  const pagination = usePagination(filteredData, 10);

  const handleAdd = () => {
    setFormData({
      planningNo: `PP-2026-${(data.length + 1).toString().padStart(4, '0')}`,
      planningDate: new Date().toISOString().split('T')[0],
      status: 'Draft'
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEdit = (row) => {
    setFormData(row);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (isEditing) {
      setData(data.map(item => item.id === formData.id ? formData : item));
    } else {
      setData([{ ...formData, id: Date.now() }, ...data]);
    }
    setIsModalOpen(false);
  };

  const columns = [
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
    { header: 'Status', cell: (row) => (
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
        row.status === 'Approved' ? 'bg-green-100 text-green-700' :
        row.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
        'bg-slate-100 text-slate-700'
      }`}>
        {row.status}
      </span>
    )},
    {
      header: 'Actions',
      className: 'text-right',
      cell: (row) => (
        <div className="flex justify-end gap-2">
          <Button size="sm" className="bg-primary text-white" onClick={() => console.log('Planning clicked')}>
            Planning
          </Button>
          <Button variant="ghost" size="icon" className="p-1.5 text-primary hover:bg-primary/10 rounded-md" onClick={() => handleEdit(row)}>
            <Edit2 size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="p-1.5 text-destructive hover:bg-destructive/10 rounded-md" onClick={() => setData(data.filter(d => d.id !== row.id))}>
            <Trash2 size={16} />
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input 
              className="pl-10"
              placeholder="Search plans..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select 
            value={filterSeason} 
            onChange={(e) => setFilterSeason(e.target.value)}
            className="w-40"
          >
            <option value="All">All Seasons</option>
            <option value="Kharif">Kharif</option>
            <option value="Rabi">Rabi</option>
            <option value="Zaid">Zaid</option>
          </Select>
          <Select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-40"
          >
            <option value="All">All Statuses</option>
            <option value="Draft">Draft</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
          </Select>
        </div>
        <Button onClick={handleAdd}>
          <Plus size={18} />
          Add Procurement Plan
        </Button>
      </div>

      <Card>
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

      {/* Add/Edit Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={isEditing ? 'Edit Procurement Plan' : 'Add Procurement Plan'}
      >
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="space-y-1.5">
            <Label>Planning No (Auto)</Label>
            <Input value={formData.planningNo || ''} readOnly className="bg-slate-50" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Planning Date</Label>
              <Input 
                type="date"
                value={formData.planningDate || ''} 
                onChange={(e) => setFormData({...formData, planningDate: e.target.value})}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Procurement Season</Label>
              <Select 
                value={formData.season || ''} 
                onChange={(e) => setFormData({...formData, season: e.target.value})}
              >
                <option value="">Select Season</option>
                <option value="Kharif">Kharif</option>
                <option value="Rabi">Rabi</option>
                <option value="Zaid">Zaid</option>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Financial Year</Label>
              <Select 
                value={formData.financialYear || ''} 
                onChange={(e) => setFormData({...formData, financialYear: e.target.value})}
              >
                <option value="">Select FY</option>
                <option value="2025-26">2025-26</option>
                <option value="2026-27">2026-27</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Branch</Label>
              <Select 
                value={formData.branch || ''} 
                onChange={(e) => setFormData({...formData, branch: e.target.value})}
              >
                <option value="">Select Branch</option>
                <option value="Main Branch">Main Branch</option>
                <option value="North Branch">North Branch</option>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Procurement Type</Label>
              <Select 
                value={formData.type || ''} 
                onChange={(e) => setFormData({...formData, type: e.target.value})}
              >
                <option value="">Select Type</option>
                <option value="Government">Government</option>
                <option value="Open Market">Open Market</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>State</Label>
              <Select 
                value={formData.state || ''} 
                onChange={(e) => setFormData({...formData, state: e.target.value})}
              >
                <option value="">Select State</option>
                <option value="Punjab">Punjab</option>
                <option value="Haryana">Haryana</option>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>District</Label>
              <Select 
                value={formData.district || ''} 
                onChange={(e) => setFormData({...formData, district: e.target.value})}
              >
                <option value="">Select District</option>
                <option value="Moga">Moga</option>
                <option value="Karnal">Karnal</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Taluka</Label>
              <Select 
                value={formData.taluka || ''} 
                onChange={(e) => setFormData({...formData, taluka: e.target.value})}
              >
                <option value="">Select Taluka</option>
                <option value="Moga">Moga</option>
                <option value="Indri">Indri</option>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Mandi</Label>
              <Select 
                value={formData.mandi || ''} 
                onChange={(e) => setFormData({...formData, mandi: e.target.value})}
              >
                <option value="">Select Mandi</option>
                <option value="Moga Main Mandi">Moga Main Mandi</option>
                <option value="Karnal Main Mandi">Karnal Main Mandi</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Procurement Center</Label>
              <Select 
                value={formData.center || ''} 
                onChange={(e) => setFormData({...formData, center: e.target.value})}
              >
                <option value="">Select Center</option>
                <option value="Center A">Center A</option>
                <option value="Center B">Center B</option>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>GPS Location</Label>
            <Input 
              value={formData.gps || ''} 
              onChange={(e) => setFormData({...formData, gps: e.target.value})}
              placeholder="Enter GPS coordinates"
            />
          </div>

          <div className="space-y-1.5">
            <Label>Mandi Address</Label>
            <Input 
              value={formData.address || ''} 
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              placeholder="Enter Mandi address"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
            <Button onClick={() => setIsModalOpen(false)} className="bg-white border border-slate-200 text-slate-600 hover:bg-slate-100">
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {isEditing ? 'Update Plan' : 'Save Plan'}
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
};