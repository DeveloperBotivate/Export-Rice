const fs = require('fs');
const path = require('path');

const stages = [
  { file: 'ProcurementApproval.jsx', name: 'ProcurementApproval', title: 'Procurement Approval', desc: 'Stage 2 - Approve procurement plans', action: 'Approve', modalTitle: 'Approve Plan', fields: [{label: 'Status', type: 'select', name: 'status', options: ['Approved', 'Rejected']}, {label: 'Remarks', type: 'text', name: 'remarks'}] },
  { file: 'MandiSelection.jsx', name: 'MandiSelection', title: 'Mandi Selection', desc: 'Stage 3 - Select Mandi for procurement', action: 'Select Mandi', modalTitle: 'Select Mandi', fields: [{label: 'Mandi', type: 'select', name: 'mandi', options: ['Karnal Mandi', 'Kurukshetra Mandi', 'Ambala Mandi']}, {label: 'Distance (km)', type: 'number', name: 'distance'}] },
  { file: 'MarketPrice.jsx', name: 'MarketPrice', title: 'Current Market Price', desc: 'Stage 4 - Update current market prices', action: 'Update Price', modalTitle: 'Update Market Price', fields: [{label: 'Current Price (Rs/Qtl)', type: 'number', name: 'currentPrice'}, {label: 'Price Date', type: 'date', name: 'priceDate'}] },
  { file: 'GovernmentMSP.jsx', name: 'GovernmentMSP', title: 'Government MSP', desc: 'Stage 5 - Record Government Minimum Support Price', action: 'Record MSP', modalTitle: 'Record MSP', fields: [{label: 'MSP (Rs/Qtl)', type: 'number', name: 'msp'}, {label: 'Season', type: 'select', name: 'season', options: ['Kharif', 'Rabi']}] },
  { file: 'LabQuality.jsx', name: 'LabQuality', title: 'Lab Quality', desc: 'Stage 6 - Perform quality checks', action: 'Check Quality', modalTitle: 'Lab Quality Check', fields: [{label: 'Moisture %', type: 'number', name: 'moisture'}, {label: 'Broken %', type: 'number', name: 'broken'}, {label: 'Damage %', type: 'number', name: 'damage'}, {label: 'Grade', type: 'select', name: 'grade', options: ['Grade A', 'Grade B', 'Grade C']}] },
  { file: 'FinalApproval.jsx', name: 'FinalApproval', title: 'Approval', desc: 'Stage 7 - Final approval before purchase', action: 'Final Approve', modalTitle: 'Final Approval', fields: [{label: 'Approval Status', type: 'select', name: 'status', options: ['Approved', 'Rejected']}, {label: 'Approved By', type: 'text', name: 'approvedBy'}, {label: 'Comments', type: 'text', name: 'comments'}] },
  { file: 'TransportationCost.jsx', name: 'TransportationCost', title: 'Transportation Cost', desc: 'Stage 8 - Estimate transportation costs', action: 'Add Transport Cost', modalTitle: 'Add Transport Cost', fields: [{label: 'Transport Provider', type: 'select', name: 'provider', options: ['Provider A', 'Provider B', 'Provider C']}, {label: 'Cost (Rs/MT)', type: 'number', name: 'cost'}, {label: 'Vehicle Type', type: 'select', name: 'vehicle', options: ['Truck', 'Tractor', 'Mini Truck']}] },
  { file: 'PurchaseRequirement.jsx', name: 'PurchaseRequirement', title: 'Purchase Requirement', desc: 'Stage 9 - Finalize purchase requirements', action: 'Finalize Purchase', modalTitle: 'Finalize Purchase', fields: [{label: 'Total Quantity (MT)', type: 'number', name: 'quantity'}, {label: 'Expected Delivery Date', type: 'date', name: 'deliveryDate'}, {label: 'PO Notes', type: 'text', name: 'notes'}] }
];

const template = (stage) => `import React, { useState } from 'react';
import { Search, Play } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input, Label, Select } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import DataTable from '../../components/DataTable';
import { usePagination } from '../../hooks/usePagination';
import { Modal } from '../../components/ui/Modal';
import { PageTabs } from '../../components/PageTabs';

const generateDummyData = () => {
  return Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    planningNo: \`PP-2026-\${(i + 1).toString().padStart(4, '0')}\`,
    planningDate: \`2026-06-\${(i + 1).toString().padStart(2, '0')}\`,
    season: ['Kharif', 'Rabi', 'Zaid'][Math.floor(Math.random() * 3)],
    state: ['Punjab', 'Haryana'][Math.floor(Math.random() * 2)],
    mandi: ['Moga Main Mandi', 'Karnal Main Mandi', 'Ludhiana Grain Market'][Math.floor(Math.random() * 3)],
    status: 'Pending'
  }));
};

export const ${stage.name} = () => {
  const [pendingItems, setPendingItems] = useState(generateDummyData().slice(0, 8));
  const [historyItems, setHistoryItems] = useState(generateDummyData().slice(8, 15));
  
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
    setFormData({});
    setIsModalOpen(true);
  };

  const handleSave = () => {
    const processedItem = { ...selectedItem, ...formData, status: 'Completed' };
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
          ${stage.action}
        </Button>
      </div>
    )
  };

  const baseColumns = [
    { header: 'Serial No', accessor: 'planningNo' },
    { header: 'Date', accessor: 'planningDate' },
    { header: 'Season', accessor: 'season' },
    { header: 'State', accessor: 'state' },
    { header: 'Mandi', accessor: 'mandi' }
  ];
  
  ${stage.fields.map(f => `
  if (activeTab === 'history') {
    baseColumns.push({ header: '${f.label}', accessor: '${f.name}' });
  }
  `).join('')}

  const columns = activeTab === 'pending' ? [actionColumn, ...baseColumns] : baseColumns;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-800">${stage.title}</h2>
        <p className="text-sm text-slate-500">${stage.desc}</p>
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
        title="${stage.modalTitle}"
      >
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 mb-4">
            <p className="text-sm text-slate-600 mb-1">Processing Record:</p>
            <p className="font-semibold text-slate-800">{selectedItem?.planningNo}</p>
          </div>

          <div className="space-y-4">
            ${stage.fields.map(f => {
              if (f.type === 'select') {
                return `
            <div className="space-y-1.5">
              <Label>${f.label}</Label>
              <Select 
                value={formData.${f.name} || ''} 
                onChange={(e) => setFormData({...formData, ${f.name}: e.target.value})}
              >
                <option value="">Select ${f.label}</option>
                ${f.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
              </Select>
            </div>`;
              } else {
                return `
            <div className="space-y-1.5">
              <Label>${f.label}</Label>
              <Input 
                type="${f.type}"
                value={formData.${f.name} || ''} 
                onChange={(e) => setFormData({...formData, ${f.name}: e.target.value})}
              />
            </div>`;
              }
            }).join('')}
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
`;

stages.forEach(stage => {
  const filePath = path.join('c:/Users/devel/Downloads/Rice Mill/src/modules/procurement', stage.file);
  fs.writeFileSync(filePath, template(stage));
  console.log('Created ' + stage.file);
});
