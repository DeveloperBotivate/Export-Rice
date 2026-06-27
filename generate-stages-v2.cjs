const fs = require('fs');
const path = require('path');

const stages = [
  { 
    file: 'ProcurementApproval.jsx', name: 'ProcurementApproval', title: 'Stage 2 - Procurement Approval', action: 'Approve', modalTitle: 'Approve Plan',
    pendingCols: [
      { header: 'Procurement ID', accessor: 'procurementId' }, { header: 'Planning Date', accessor: 'planningDate' },
      { header: 'Paddy Type', accessor: 'paddyType' }, { header: 'Expected Qty (MT)', accessor: 'expectedQty' },
      { header: 'Budget Allocated (₹)', accessor: 'budgetAllocated' }, { header: 'Planned By', accessor: 'plannedBy' }
    ],
    historyCols: [
      { header: 'Procurement ID', accessor: 'procurementId' }, { header: 'Paddy Type', accessor: 'paddyType' },
      { header: 'Expected Qty (MT)', accessor: 'expectedQty' }, { header: 'Approved Budget (₹)', accessor: 'approvedBudget' },
      { header: 'Approval Date', accessor: 'approvalDate' }, { header: 'Approved By', accessor: 'approvedBy' },
      { header: 'Priority Level', accessor: 'priorityLevel' }, { header: 'Approval Status', accessor: 'approvalStatus' }
    ],
    fields: [
      { label: 'Procurement ID', name: 'procurementId', type: 'text', readOnly: true },
      { label: 'Approval Date', name: 'approvalDate', type: 'date' },
      { label: 'Approved By', name: 'approvedBy', type: 'text' },
      { label: 'Approval Remarks', name: 'approvalRemarks', type: 'text' },
      { label: 'Approved Budget (₹)', name: 'approvedBudget', type: 'number' },
      { label: 'Priority Level', name: 'priorityLevel', type: 'select', options: ['High', 'Medium', 'Low'] },
      { label: 'Approval Status', name: 'approvalStatus', type: 'select', options: ['Approved', 'Rejected', 'Hold'] }
    ]
  },
  { 
    file: 'MandiSelection.jsx', name: 'MandiSelection', title: 'Stage 3 - Mandi Selection', action: 'Select Mandi', modalTitle: 'Select Mandi',
    pendingCols: [
      { header: 'Procurement ID', accessor: 'procurementId' }, { header: 'Paddy Type', accessor: 'paddyType' },
      { header: 'Procurement Region', accessor: 'procurementRegion' }, { header: 'Expected Qty (MT)', accessor: 'expectedQty' },
      { header: 'Approved Budget (₹)', accessor: 'approvedBudget' }, { header: 'Approval Date', accessor: 'approvalDate' }
    ],
    historyCols: [
      { header: 'Procurement ID', accessor: 'procurementId' }, { header: 'Mandi Name', accessor: 'mandiName' },
      { header: 'Mandi Location', accessor: 'mandiLocation' }, { header: 'Mandi Type', accessor: 'mandiType' },
      { header: 'Distance (km)', accessor: 'distance' }, { header: 'Contact Person', accessor: 'contactPerson' },
      { header: 'Selected By', accessor: 'selectedBy' }, { header: 'Selection Date', accessor: 'selectionDate' }
    ],
    fields: [
      { label: 'Procurement ID', name: 'procurementId', type: 'text', readOnly: true },
      { label: 'Mandi Name', name: 'mandiName', type: 'text' },
      { label: 'Mandi Location', name: 'mandiLocation', type: 'text' },
      { label: 'Mandi Type', name: 'mandiType', type: 'select', options: ['APMC', 'Private'] },
      { label: 'Distance from Mill (km)', name: 'distance', type: 'number' },
      { label: 'Contact Person', name: 'contactPerson', type: 'text' },
      { label: 'Contact Number', name: 'contactNumber', type: 'text' },
      { label: 'Mandi License No', name: 'licenseNo', type: 'text' },
      { label: 'Selected By', name: 'selectedBy', type: 'text' },
      { label: 'Selection Date', name: 'selectionDate', type: 'date' },
      { label: 'Remarks', name: 'remarks', type: 'text' }
    ]
  },
  { 
    file: 'MarketPrice.jsx', name: 'MarketPrice', title: 'Stage 4 - Current Market Price', action: 'Update Price', modalTitle: 'Update Market Price',
    pendingCols: [
      { header: 'Procurement ID', accessor: 'procurementId' }, { header: 'Mandi Name', accessor: 'mandiName' },
      { header: 'Mandi Location', accessor: 'mandiLocation' }, { header: 'Paddy Type', accessor: 'paddyType' },
      { header: 'Distance (km)', accessor: 'distance' }
    ],
    historyCols: [
      { header: 'Procurement ID', accessor: 'procurementId' }, { header: 'Mandi Name', accessor: 'mandiName' },
      { header: 'Paddy Type', accessor: 'paddyType' }, { header: 'Market Price (₹/Qt)', accessor: 'marketPrice' },
      { header: 'Min Price', accessor: 'minPrice' }, { header: 'Max Price', accessor: 'maxPrice' },
      { header: 'Price Date', accessor: 'priceDate' }, { header: 'Market Trend', accessor: 'marketTrend' },
      { header: 'Recorded By', accessor: 'recordedBy' }
    ],
    fields: [
      { label: 'Procurement ID', name: 'procurementId', type: 'text', readOnly: true },
      { label: 'Mandi Name', name: 'mandiName', type: 'text', readOnly: true },
      { label: 'Market Price (₹/Quintal)', name: 'marketPrice', type: 'number' },
      { label: 'Price Date', name: 'priceDate', type: 'date' },
      { label: 'Price Source', name: 'priceSource', type: 'text' },
      { label: 'Market Trend', name: 'marketTrend', type: 'select', options: ['Rising', 'Stable', 'Falling'] },
      { label: 'Min Price (₹/Qt)', name: 'minPrice', type: 'number' },
      { label: 'Max Price (₹/Qt)', name: 'maxPrice', type: 'number' },
      { label: 'Recorded By', name: 'recordedBy', type: 'text' },
      { label: 'Remarks', name: 'remarks', type: 'text' }
    ]
  },
  { 
    file: 'GovernmentMSP.jsx', name: 'GovernmentMSP', title: 'Stage 5 - Government MSP', action: 'Record MSP', modalTitle: 'Record MSP',
    pendingCols: [
      { header: 'Procurement ID', accessor: 'procurementId' }, { header: 'Mandi Name', accessor: 'mandiName' },
      { header: 'Paddy Type', accessor: 'paddyType' }, { header: 'Market Price (₹/Qt)', accessor: 'marketPrice' },
      { header: 'Price Date', accessor: 'priceDate' }
    ],
    historyCols: [
      { header: 'Procurement ID', accessor: 'procurementId' }, { header: 'Mandi Name', accessor: 'mandiName' },
      { header: 'Paddy Type', accessor: 'paddyType' }, { header: 'MSP Rate (₹/Qt)', accessor: 'mspRate' },
      { header: 'Market Price (₹/Qt)', accessor: 'marketPrice' }, { header: 'Paddy Grade', accessor: 'paddyGrade' },
      { header: 'MSP Year', accessor: 'mspYear' }, { header: 'Declared By', accessor: 'declaredBy' },
      { header: 'Effective Date', accessor: 'effectiveDate' }
    ],
    fields: [
      { label: 'Procurement ID', name: 'procurementId', type: 'text', readOnly: true },
      { label: 'Paddy Type', name: 'paddyType', type: 'text', readOnly: true },
      { label: 'MSP Rate (₹/Quintal)', name: 'mspRate', type: 'number' },
      { label: 'Paddy Grade', name: 'paddyGrade', type: 'select', options: ['A', 'B', 'C'] },
      { label: 'MSP Year', name: 'mspYear', type: 'text' },
      { label: 'Declared By', name: 'declaredBy', type: 'text' },
      { label: 'Effective Date', name: 'effectiveDate', type: 'date' },
      { label: 'Remarks', name: 'remarks', type: 'text' }
    ]
  },
  { 
    file: 'LabQuality.jsx', name: 'LabQuality', title: 'Stage 6 - Lab Quality Check', action: 'Check Quality', modalTitle: 'Lab Quality Check',
    pendingCols: [
      { header: 'Procurement ID', accessor: 'procurementId' }, { header: 'Mandi Name', accessor: 'mandiName' },
      { header: 'Paddy Type', accessor: 'paddyType' }, { header: 'MSP Rate (₹/Qt)', accessor: 'mspRate' },
      { header: 'Market Price (₹/Qt)', accessor: 'marketPrice' }, { header: 'Paddy Grade', accessor: 'paddyGrade' }
    ],
    historyCols: [
      { header: 'Procurement ID', accessor: 'procurementId' }, { header: 'Mandi Name', accessor: 'mandiName' },
      { header: 'Paddy Type', accessor: 'paddyType' }, { header: 'Lab ID', accessor: 'labId' },
      { header: 'Moisture %', accessor: 'moisture' }, { header: 'Broken %', accessor: 'broken' },
      { header: 'Chalky %', accessor: 'chalky' }, { header: 'Foreign Matter %', accessor: 'foreignMatter' },
      { header: 'Final Lab Grade', accessor: 'finalLabGrade' }, { header: 'Lab Technician', accessor: 'labTechnician' },
      { header: 'Test Date', accessor: 'testDate' }
    ],
    fields: [
      { label: 'Procurement ID', name: 'procurementId', type: 'text', readOnly: true },
      { label: 'Lab ID', name: 'labId', type: 'text' },
      { label: 'Test Date', name: 'testDate', type: 'date' },
      { label: 'Moisture Content (%)', name: 'moisture', type: 'number' },
      { label: 'Broken Grain (%)', name: 'broken', type: 'number' },
      { label: 'Chalky Grain (%)', name: 'chalky', type: 'number' },
      { label: 'Foreign Matter (%)', name: 'foreignMatter', type: 'number' },
      { label: 'Immature Grain (%)', name: 'immature', type: 'number' },
      { label: 'Red Grain (%)', name: 'redGrain', type: 'number' },
      { label: 'Final Lab Grade', name: 'finalLabGrade', type: 'select', options: ['A', 'B', 'C', 'Reject'] },
      { label: 'Lab Technician', name: 'labTechnician', type: 'text' },
      { label: 'Lab Remarks', name: 'labRemarks', type: 'text' }
    ]
  },
  { 
    file: 'FinalApproval.jsx', name: 'FinalApproval', title: 'Stage 7 - Final Approval', action: 'Final Approve', modalTitle: 'Final Approval',
    pendingCols: [
      { header: 'Procurement ID', accessor: 'procurementId' }, { header: 'Mandi Name', accessor: 'mandiName' },
      { header: 'Paddy Type', accessor: 'paddyType' }, { header: 'MSP Rate (₹/Qt)', accessor: 'mspRate' },
      { header: 'Market Price (₹/Qt)', accessor: 'marketPrice' }, { header: 'Lab Grade', accessor: 'finalLabGrade' }
    ],
    historyCols: [
      { header: 'Procurement ID', accessor: 'procurementId' }, { header: 'Mandi Name', accessor: 'mandiName' },
      { header: 'Paddy Type', accessor: 'paddyType' }, { header: 'Final Purchase Rate (₹/Qt)', accessor: 'finalPurchaseRate' },
      { header: 'Approved Qty (MT)', accessor: 'approvedQty' }, { header: 'Payment Terms', accessor: 'paymentTerms' },
      { header: 'Advance Amount (₹)', accessor: 'advanceAmount' }, { header: 'Approval Authority', accessor: 'approvalAuthority' },
      { header: 'Approval Date', accessor: 'approvalDate' }
    ],
    fields: [
      { label: 'Procurement ID', name: 'procurementId', type: 'text', readOnly: true },
      { label: 'Mandi Name', name: 'mandiName', type: 'text', readOnly: true },
      { label: 'Final Purchase Rate (₹/Qt)', name: 'finalPurchaseRate', type: 'number' },
      { label: 'Approved Quantity (MT)', name: 'approvedQty', type: 'number' },
      { label: 'Payment Terms', name: 'paymentTerms', type: 'select', options: ['Advance', 'Credit', 'Full'] },
      { label: 'Advance Amount (₹)', name: 'advanceAmount', type: 'number' },
      { label: 'Approval Authority', name: 'approvalAuthority', type: 'text' },
      { label: 'Approval Date', name: 'approvalDate', type: 'date' },
      { label: 'Remarks', name: 'remarks', type: 'text' }
    ]
  },
  { 
    file: 'TransportationCost.jsx', name: 'TransportationCost', title: 'Stage 8 - Transportation Cost', action: 'Add Transport Cost', modalTitle: 'Add Transport Cost',
    pendingCols: [
      { header: 'Procurement ID', accessor: 'procurementId' }, { header: 'Mandi Name', accessor: 'mandiName' },
      { header: 'Mandi Location', accessor: 'mandiLocation' }, { header: 'Approved Qty (MT)', accessor: 'approvedQty' },
      { header: 'Final Purchase Rate (₹/Qt)', accessor: 'finalPurchaseRate' }, { header: 'Approval Date', accessor: 'approvalDate' }
    ],
    historyCols: [
      { header: 'Procurement ID', accessor: 'procurementId' }, { header: 'Mandi Name', accessor: 'mandiName' },
      { header: 'Route', accessor: 'route' }, { header: 'Vehicle Type', accessor: 'vehicleType' },
      { header: 'Transport Rate (₹/MT)', accessor: 'transportRate' }, { header: 'Total Transport Cost (₹)', accessor: 'totalTransportCost' },
      { header: 'Transporter Name', accessor: 'transporterName' }, { header: 'Transport Date', accessor: 'transportDate' }
    ],
    fields: [
      { label: 'Procurement ID', name: 'procurementId', type: 'text', readOnly: true },
      { label: 'Mandi Name', name: 'mandiName', type: 'text', readOnly: true },
      { label: 'Transport Rate (₹/MT)', name: 'transportRate', type: 'number' },
      { label: 'Vehicle Type', name: 'vehicleType', type: 'select', options: ['Truck', 'Tempo', 'Other'] },
      { label: 'Route (Mandi → Mill)', name: 'route', type: 'text' },
      { label: 'Distance (km)', name: 'distance', type: 'number' },
      { label: 'Fuel Cost (₹)', name: 'fuelCost', type: 'number' },
      { label: 'Driver Charges (₹)', name: 'driverCharges', type: 'number' },
      { label: 'Loading Charges (₹)', name: 'loadingCharges', type: 'number' },
      { label: 'Toll Charges (₹)', name: 'tollCharges', type: 'number' },
      { label: 'Total Transport Cost (₹)', name: 'totalTransportCost', type: 'number' },
      { label: 'Transporter Name', name: 'transporterName', type: 'text' },
      { label: 'Transport Date', name: 'transportDate', type: 'date' }
    ]
  },
  { 
    file: 'PurchaseRequirement.jsx', name: 'PurchaseRequirement', title: 'Stage 9 - Purchase Requirement', action: 'Finalize Purchase', modalTitle: 'Finalize Purchase',
    pendingCols: [
      { header: 'Procurement ID', accessor: 'procurementId' }, { header: 'Mandi Name', accessor: 'mandiName' },
      { header: 'Paddy Type', accessor: 'paddyType' }, { header: 'Final Purchase Rate (₹/Qt)', accessor: 'finalPurchaseRate' },
      { header: 'Total Transport Cost (₹)', accessor: 'totalTransportCost' }, { header: 'Approved Qty (MT)', accessor: 'approvedQty' }
    ],
    historyCols: [
      { header: 'Procurement ID', accessor: 'procurementId' }, { header: 'PR Number', accessor: 'prNumber' },
      { header: 'Paddy Type', accessor: 'paddyType' }, { header: 'Required Qty (MT)', accessor: 'requiredQty' },
      { header: 'Final Rate (₹/Qt)', accessor: 'finalPurchaseRate' }, { header: 'Transport Cost (₹)', accessor: 'totalTransportCost' },
      { header: 'Total Landed Cost (₹/Qt)', accessor: 'totalLandedCost' }, { header: 'Estimated Total Value (₹)', accessor: 'estimatedTotalValue' },
      { header: 'Requirement Status', accessor: 'requirementStatus' }, { header: 'Created By', accessor: 'createdBy' },
      { header: 'Created At', accessor: 'createdAt' }
    ],
    fields: [
      { label: 'Procurement ID', name: 'procurementId', type: 'text', readOnly: true },
      { label: 'PR Number', name: 'prNumber', type: 'text' },
      { label: 'Required Quantity (MT)', name: 'requiredQty', type: 'number' },
      { label: 'Final Purchase Rate (₹/Qt)', name: 'finalPurchaseRate', type: 'number', readOnly: true },
      { label: 'Total Transport Cost (₹)', name: 'totalTransportCost', type: 'number', readOnly: true },
      { label: 'Total Landed Cost (₹/Qt)', name: 'totalLandedCost', type: 'number' },
      { label: 'Estimated Total Value (₹)', name: 'estimatedTotalValue', type: 'number' },
      { label: 'Purchase Justification', name: 'justification', type: 'text' },
      { label: 'Payment Mode', name: 'paymentMode', type: 'select', options: ['RTGS', 'NEFT', 'Cheque', 'Cash'] },
      { label: 'Expected Delivery Date', name: 'deliveryDate', type: 'date' },
      { label: 'Requirement Status', name: 'requirementStatus', type: 'select', options: ['Confirmed', 'Conditional', 'Cancelled'] },
      { label: 'Created By', name: 'createdBy', type: 'text' }
    ]
  }
];

const template = (stage) => `import React, { useState, useEffect } from 'react';
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
      procurementId: \`PRC-2026-\${(i + 1).toString().padStart(4, '0')}\`,
      planningDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      paddyType: ['Basmati', 'Non-Basmati', 'Sona Masuri'][Math.floor(Math.random() * 3)],
      expectedQty: qty,
      budgetAllocated: qty * rate,
      plannedBy: 'Admin User',
      procurementRegion: ['North', 'South', 'Central'][Math.floor(Math.random() * 3)],
      approvedBudget: qty * rate,
      approvalDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      approvedBy: 'Manager',
      priorityLevel: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
      approvalStatus: ['Approved', 'Rejected', 'Hold'][Math.floor(Math.random() * 3)],
      mandiName: ['Moga Main Mandi', 'Karnal Main Mandi', 'Ludhiana Grain Market'][Math.floor(Math.random() * 3)],
      mandiLocation: 'Central Market',
      mandiType: ['APMC', 'Private'][Math.floor(Math.random() * 2)],
      distance: Math.floor(Math.random() * 100) + 10,
      contactPerson: 'Rajesh Kumar',
      selectedBy: 'Supervisor',
      selectionDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      marketPrice: rate,
      minPrice: rate - 100,
      maxPrice: rate + 100,
      priceDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      marketTrend: ['Rising', 'Stable', 'Falling'][Math.floor(Math.random() * 3)],
      recordedBy: 'Field Agent',
      mspRate: 2183,
      paddyGrade: ['A', 'B', 'C'][Math.floor(Math.random() * 3)],
      mspYear: '2025-26',
      declaredBy: 'Govt. of India',
      effectiveDate: '2025-10-01',
      labId: \`LAB-\${Math.floor(Math.random() * 1000)}\`,
      moisture: (12 + Math.random() * 5).toFixed(1),
      broken: (2 + Math.random() * 3).toFixed(1),
      chalky: (1 + Math.random() * 2).toFixed(1),
      foreignMatter: (0.5 + Math.random()).toFixed(1),
      finalLabGrade: ['A', 'B', 'C'][Math.floor(Math.random() * 3)],
      labTechnician: 'Amit Tech',
      testDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
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
      transportDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      prNumber: \`PR-\${(i + 1).toString().padStart(4, '0')}\`,
      requiredQty: qty,
      totalLandedCost: (rate + (trans / qty)).toFixed(2),
      estimatedTotalValue: (qty * (rate + (trans / qty))).toFixed(2),
      requirementStatus: ['Confirmed', 'Conditional'][Math.floor(Math.random() * 2)],
      createdBy: 'Procurement Head',
      createdAt: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      status: 'Pending'
    };
  });
};

export const ${stage.name} = () => {
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
    const readOnlyFields = ${JSON.stringify(stage.fields.filter(f => f.readOnly).map(f => f.name))};
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
      ${stage.name === 'TransportationCost' ? `
      const fuel = parseFloat(formData.fuelCost) || 0;
      const driver = parseFloat(formData.driverCharges) || 0;
      const load = parseFloat(formData.loadingCharges) || 0;
      const toll = parseFloat(formData.tollCharges) || 0;
      const total = fuel + driver + load + toll;
      if (formData.totalTransportCost !== total) {
        setFormData(prev => ({ ...prev, totalTransportCost: total }));
      }
      ` : ''}
      ${stage.name === 'PurchaseRequirement' ? `
      const rate = parseFloat(formData.finalPurchaseRate) || 0;
      const transport = parseFloat(formData.totalTransportCost) || 0;
      const qty = parseFloat(formData.requiredQty) || 0;
      const landed = rate + (transport / (qty || 1)); // Rough calculation
      const totalVal = landed * qty;
      if (formData.totalLandedCost !== landed || formData.estimatedTotalValue !== totalVal) {
        setFormData(prev => ({ ...prev, totalLandedCost: landed.toFixed(2), estimatedTotalValue: totalVal.toFixed(2) }));
      }
      ` : ''}
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
          ${stage.action}
        </Button>
      </div>
    )
  };

  const pendingCols = ${JSON.stringify(stage.pendingCols)};
  const historyCols = ${JSON.stringify(stage.historyCols)};

  const columns = activeTab === 'pending' ? [actionColumn, ...pendingCols] : historyCols;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">${stage.title}</h2>
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
            <p className="font-semibold text-slate-800">{selectedItem?.procurementId}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            ${stage.fields.map(f => {
              if (f.type === 'select') {
                return `
            <div className="space-y-1.5">
              <Label>${f.label}</Label>
              <Select 
                value={formData.${f.name} || ''} 
                onChange={(e) => setFormData({...formData, ${f.name}: e.target.value})}
                disabled={${!!f.readOnly}}
                className={${!!f.readOnly} ? 'bg-slate-100' : ''}
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
                readOnly={${!!f.readOnly}}
                className={${!!f.readOnly} ? 'bg-slate-100' : ''}
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
