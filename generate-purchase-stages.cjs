const fs = require('fs');
const path = require('path');

const stages = [
  {
    file: 'PurchaseOrder.jsx', name: 'PurchaseOrder', title: 'Stage 2 - Purchase Order', action: 'Create PO', modalTitle: 'Create Purchase Order',
    pendingCols: [
      { header: 'PR Number', accessor: 'prNumber' }, { header: 'PR Date', accessor: 'prDate' },
      { header: 'Paddy Type / Grade', accessor: 'paddyGrade' }, { header: 'Quantity Required (MT)', accessor: 'quantity' },
      { header: 'Target Mandi', accessor: 'targetMandi' }, { header: 'Requested By', accessor: 'requestedBy' }
    ],
    historyCols: [
      { header: 'PR Number', accessor: 'prNumber' }, { header: 'PO Number', accessor: 'poNumber' },
      { header: 'PO Date', accessor: 'poDate' }, { header: 'Vendor / Farmer Name', accessor: 'vendorName' },
      { header: 'Paddy Grade', accessor: 'paddyGrade' }, { header: 'Quantity (MT)', accessor: 'quantity' },
      { header: 'Rate (₹/Qt)', accessor: 'rate' }, { header: 'Total Value (₹)', accessor: 'totalValue' },
      { header: 'PO Validity Date', accessor: 'poValidityDate' }
    ],
    fields: [
      { label: 'PR Number', name: 'prNumber', type: 'text', readOnly: true },
      { label: 'PO Number', name: 'poNumber', type: 'text' },
      { label: 'PO Date', name: 'poDate', type: 'date' },
      { label: 'Vendor / Farmer Name', name: 'vendorName', type: 'text' },
      { label: 'Vendor Phone', name: 'vendorPhone', type: 'text' },
      { label: 'Paddy Grade', name: 'paddyGrade', type: 'text' },
      { label: 'Quantity (MT)', name: 'quantity', type: 'number' },
      { label: 'Rate (₹/Qt)', name: 'rate', type: 'number' },
      { label: 'Total Value (₹)', name: 'totalValue', type: 'number', readOnly: true },
      { label: 'Delivery Terms', name: 'deliveryTerms', type: 'text' },
      { label: 'Payment Terms', name: 'paymentTerms', type: 'text' },
      { label: 'PO Validity Date', name: 'poValidityDate', type: 'date' }
    ]
  },
  {
    file: 'AgentAssignment.jsx', name: 'AgentAssignment', title: 'Stage 3 - Agent Assignment', action: 'Assign Agent', modalTitle: 'Assign Agent',
    pendingCols: [
      { header: 'PR Number', accessor: 'prNumber' }, { header: 'PO Number', accessor: 'poNumber' },
      { header: 'PO Date', accessor: 'poDate' }, { header: 'Paddy Grade', accessor: 'paddyGrade' },
      { header: 'Quantity (MT)', accessor: 'quantity' }, { header: 'Target Mandi', accessor: 'targetMandi' },
      { header: 'Vendor Name', accessor: 'vendorName' }
    ],
    historyCols: [
      { header: 'PR Number', accessor: 'prNumber' }, { header: 'PO Number', accessor: 'poNumber' },
      { header: 'Agent Name', accessor: 'agentName' }, { header: 'Agent ID', accessor: 'agentId' },
      { header: 'Agent Firm Name', accessor: 'agentFirmName' }, { header: 'Mandi', accessor: 'targetMandi' },
      { header: 'Commission Type', accessor: 'commissionType' }, { header: 'Commission Rate', accessor: 'commissionRate' },
      { header: 'Assignment Date', accessor: 'assignmentDate' }
    ],
    fields: [
      { label: 'PR Number', name: 'prNumber', type: 'text', readOnly: true },
      { label: 'PO Number', name: 'poNumber', type: 'text', readOnly: true },
      { label: 'Agent Name', name: 'agentName', type: 'text' },
      { label: 'Agent ID / License No', name: 'agentId', type: 'text' },
      { label: 'Agent Phone', name: 'agentPhone', type: 'text' },
      { label: 'Agent Firm Name', name: 'agentFirmName', type: 'text' },
      { label: 'Mandi', name: 'targetMandi', type: 'text' },
      { label: 'Commission Type', name: 'commissionType', type: 'select', options: ['Per Qt', 'Percentage'] },
      { label: 'Commission Rate', name: 'commissionRate', type: 'number' },
      { label: 'Assignment Date', name: 'assignmentDate', type: 'date' },
      { label: 'Remarks', name: 'remarks', type: 'text' }
    ]
  },
  {
    file: 'VehicleAssignment.jsx', name: 'VehicleAssignment', title: 'Stage 4 - Vehicle Assignment', action: 'Assign Vehicle', modalTitle: 'Assign Vehicle',
    pendingCols: [
      { header: 'PR Number', accessor: 'prNumber' }, { header: 'PO Number', accessor: 'poNumber' },
      { header: 'Agent Name', accessor: 'agentName' }, { header: 'Mandi', accessor: 'targetMandi' },
      { header: 'Quantity (MT)', accessor: 'quantity' }, { header: 'Assignment Date', accessor: 'assignmentDate' }
    ],
    historyCols: [
      { header: 'PR Number', accessor: 'prNumber' }, { header: 'PO Number', accessor: 'poNumber' },
      { header: 'Vehicle Number', accessor: 'vehicleNumber' }, { header: 'Vehicle Type', accessor: 'vehicleType' },
      { header: 'Driver Name', accessor: 'driverName' }, { header: 'Driver Phone', accessor: 'driverPhone' },
      { header: 'Vehicle Capacity (MT)', accessor: 'vehicleCapacity' }, { header: 'Transporter Name', accessor: 'transporterName' },
      { header: 'Expected Departure Date', accessor: 'expectedDepartureDate' }
    ],
    fields: [
      { label: 'PR Number', name: 'prNumber', type: 'text', readOnly: true },
      { label: 'PO Number', name: 'poNumber', type: 'text', readOnly: true },
      { label: 'Vehicle Number', name: 'vehicleNumber', type: 'text' },
      { label: 'Vehicle Type', name: 'vehicleType', type: 'select', options: ['Truck', 'Trolley', 'Container'] },
      { label: 'Driver Name', name: 'driverName', type: 'text' },
      { label: 'Driver Phone', name: 'driverPhone', type: 'text' },
      { label: 'Driver License No', name: 'driverLicense', type: 'text' },
      { label: 'Vehicle Capacity (MT)', name: 'vehicleCapacity', type: 'number' },
      { label: 'Transporter Name', name: 'transporterName', type: 'text' },
      { label: 'Expected Departure Date', name: 'expectedDepartureDate', type: 'date' },
      { label: 'Remarks', name: 'remarks', type: 'text' }
    ]
  },
  {
    file: 'MandiSelectionPurchase.jsx', name: 'MandiSelectionPurchase', title: 'Stage 5 - Mandi Selection', action: 'Select Mandi', modalTitle: 'Mandi Selection Details',
    pendingCols: [
      { header: 'PR Number', accessor: 'prNumber' }, { header: 'PO Number', accessor: 'poNumber' },
      { header: 'Vehicle Number', accessor: 'vehicleNumber' }, { header: 'Vehicle Type', accessor: 'vehicleType' },
      { header: 'Driver Name', accessor: 'driverName' }, { header: 'Agent Name', accessor: 'agentName' },
      { header: 'Expected Departure Date', accessor: 'expectedDepartureDate' }
    ],
    historyCols: [
      { header: 'PR Number', accessor: 'prNumber' }, { header: 'PO Number', accessor: 'poNumber' },
      { header: 'Mandi Name', accessor: 'mandiName' }, { header: 'Mandi Code', accessor: 'mandiCode' },
      { header: 'Mandi Location', accessor: 'mandiLocation' }, { header: 'Expected Purchase Date', accessor: 'expectedPurchaseDate' },
      { header: 'Auction Slot', accessor: 'auctionSlot' }, { header: 'Target Qty (MT)', accessor: 'quantity' }
    ],
    fields: [
      { label: 'PR Number', name: 'prNumber', type: 'text', readOnly: true },
      { label: 'PO Number', name: 'poNumber', type: 'text', readOnly: true },
      { label: 'Mandi Name', name: 'mandiName', type: 'text' },
      { label: 'Mandi Code', name: 'mandiCode', type: 'text' },
      { label: 'APMC License No', name: 'apmcLicense', type: 'text' },
      { label: 'Mandi Location', name: 'mandiLocation', type: 'text' },
      { label: 'Expected Purchase Date', name: 'expectedPurchaseDate', type: 'date' },
      { label: 'Lot Numbers', name: 'lotNumbers', type: 'text' },
      { label: 'Auction Slot', name: 'auctionSlot', type: 'text' },
      { label: 'Remarks', name: 'remarks', type: 'text' }
    ]
  },
  {
    file: 'PurchaseChallan.jsx', name: 'PurchaseChallan', title: 'Stage 6 - Purchase Challan', action: 'Generate Challan', modalTitle: 'Generate Purchase Challan',
    pendingCols: [
      { header: 'PR Number', accessor: 'prNumber' }, { header: 'PO Number', accessor: 'poNumber' },
      { header: 'Mandi Name', accessor: 'mandiName' }, { header: 'Mandi Location', accessor: 'mandiLocation' },
      { header: 'Vehicle Number', accessor: 'vehicleNumber' }, { header: 'Expected Purchase Date', accessor: 'expectedPurchaseDate' }
    ],
    historyCols: [
      { header: 'PR Number', accessor: 'prNumber' }, { header: 'PO Number', accessor: 'poNumber' },
      { header: 'Challan Number', accessor: 'challanNumber' }, { header: 'Challan Date', accessor: 'challanDate' },
      { header: 'Farmer Name', accessor: 'farmerName' }, { header: 'Paddy Grade', accessor: 'paddyGrade' },
      { header: 'No. of Bags', accessor: 'noOfBags' }, { header: 'Gross Weight (Kg)', accessor: 'grossWeight' },
      { header: 'Net Weight (Kg)', accessor: 'netWeight' }, { header: 'Rate (₹/Qt)', accessor: 'rate' },
      { header: 'Net Payable (₹)', accessor: 'netPayable' }
    ],
    fields: [
      { label: 'PR Number', name: 'prNumber', type: 'text', readOnly: true },
      { label: 'PO Number', name: 'poNumber', type: 'text', readOnly: true },
      { label: 'Challan Number', name: 'challanNumber', type: 'text' },
      { label: 'Challan Date', name: 'challanDate', type: 'date' },
      { label: 'Farmer Name', name: 'farmerName', type: 'text' },
      { label: 'Farmer ID / Aadhaar', name: 'farmerId', type: 'text' },
      { label: 'Village / Tehsil', name: 'village', type: 'text' },
      { label: 'Paddy Grade', name: 'paddyGrade', type: 'text' },
      { label: 'No. of Bags', name: 'noOfBags', type: 'number' },
      { label: 'Gross Weight (Kg)', name: 'grossWeight', type: 'number' },
      { label: 'Tare Weight (Kg)', name: 'tareWeight', type: 'number' },
      { label: 'Net Weight (Kg)', name: 'netWeight', type: 'number', readOnly: true },
      { label: 'Rate (₹/Qt)', name: 'rate', type: 'number' },
      { label: 'Total Amount (₹)', name: 'totalAmount', type: 'number', readOnly: true },
      { label: 'Mandi Cess (%)', name: 'mandiCess', type: 'number' },
      { label: 'Commission Amount (₹)', name: 'commissionAmount', type: 'number' },
      { label: 'Net Payable (₹)', name: 'netPayable', type: 'number', readOnly: true }
    ]
  },
  {
    file: 'GateEntryPurchase.jsx', name: 'GateEntryPurchase', title: 'Stage 7 - Gate Entry', action: 'Record Entry', modalTitle: 'Gate Entry Details',
    pendingCols: [
      { header: 'PR Number', accessor: 'prNumber' }, { header: 'PO Number', accessor: 'poNumber' },
      { header: 'Challan Number', accessor: 'challanNumber' }, { header: 'Challan Date', accessor: 'challanDate' },
      { header: 'Farmer Name', accessor: 'farmerName' }, { header: 'Paddy Grade', accessor: 'paddyGrade' },
      { header: 'Net Weight (Kg)', accessor: 'netWeight' }, { header: 'Vehicle Number', accessor: 'vehicleNumber' }
    ],
    historyCols: [
      { header: 'PR Number', accessor: 'prNumber' }, { header: 'PO Number', accessor: 'poNumber' },
      { header: 'Challan Number', accessor: 'challanNumber' }, { header: 'Gate Entry Number', accessor: 'gateEntryNumber' },
      { header: 'Entry Date', accessor: 'entryDate' }, { header: 'Entry Time', accessor: 'entryTime' },
      { header: 'Vehicle Number', accessor: 'vehicleNumber' }, { header: 'Driver Name', accessor: 'driverName' },
      { header: 'Security Guard Name', accessor: 'securityGuardName' }
    ],
    fields: [
      { label: 'PR Number', name: 'prNumber', type: 'text', readOnly: true },
      { label: 'PO Number', name: 'poNumber', type: 'text', readOnly: true },
      { label: 'Challan Number', name: 'challanNumber', type: 'text', readOnly: true },
      { label: 'Gate Entry Number', name: 'gateEntryNumber', type: 'text' },
      { label: 'Entry Date', name: 'entryDate', type: 'date' },
      { label: 'Entry Time', name: 'entryTime', type: 'time' },
      { label: 'Vehicle Number', name: 'vehicleNumber', type: 'text', readOnly: true },
      { label: 'Driver Name', name: 'driverName', type: 'text', readOnly: true },
      { label: 'Driver Phone', name: 'driverPhone', type: 'text' },
      { label: 'Security Guard Name', name: 'securityGuardName', type: 'text' },
      { label: 'Purpose', name: 'purpose', type: 'text' },
      { label: 'Seal / Lock Number', name: 'sealNumber', type: 'text' },
      { label: 'Remarks', name: 'remarks', type: 'text' }
    ]
  },
  {
    file: 'GrossWeight.jsx', name: 'GrossWeight', title: 'Stage 8 - Gross Weight', action: 'Record Weight', modalTitle: 'Record Weighbridge Data',
    pendingCols: [
      { header: 'PR Number', accessor: 'prNumber' }, { header: 'PO Number', accessor: 'poNumber' },
      { header: 'Gate Entry Number', accessor: 'gateEntryNumber' }, { header: 'Entry Date', accessor: 'entryDate' },
      { header: 'Vehicle Number', accessor: 'vehicleNumber' }, { header: 'Challan Number', accessor: 'challanNumber' },
      { header: 'Driver Name', accessor: 'driverName' }
    ],
    historyCols: [
      { header: 'PR Number', accessor: 'prNumber' }, { header: 'PO Number', accessor: 'poNumber' },
      { header: 'Weight Slip Number', accessor: 'weightSlipNumber' }, { header: 'Challan Number', accessor: 'challanNumber' },
      { header: 'Gate Entry Number', accessor: 'gateEntryNumber' }, { header: 'Gross Weight (Kg)', accessor: 'grossWeight' },
      { header: 'Tare Weight (Kg)', accessor: 'tareWeight' }, { header: 'Net Weight (Kg)', accessor: 'netWeight' },
      { header: 'Weigh Date', accessor: 'weighDate' }, { header: 'Operator Name', accessor: 'operatorName' }
    ],
    fields: [
      { label: 'PR Number', name: 'prNumber', type: 'text', readOnly: true },
      { label: 'PO Number', name: 'poNumber', type: 'text', readOnly: true },
      { label: 'Gate Entry Number', name: 'gateEntryNumber', type: 'text', readOnly: true },
      { label: 'Challan Number', name: 'challanNumber', type: 'text', readOnly: true },
      { label: 'Weight Slip Number', name: 'weightSlipNumber', type: 'text' },
      { label: 'Weigh Date', name: 'weighDate', type: 'date' },
      { label: 'Weigh Time', name: 'weighTime', type: 'time' },
      { label: 'Gross Weight (Kg)', name: 'grossWeight', type: 'number' },
      { label: 'Tare Weight (Kg)', name: 'tareWeight', type: 'number' },
      { label: 'Net Weight (Kg)', name: 'netWeight', type: 'number', readOnly: true },
      { label: 'Weighbridge ID', name: 'weighbridgeId', type: 'text' },
      { label: 'Operator Name', name: 'operatorName', type: 'text' },
      { label: 'Variance', name: 'variance', type: 'text' },
      { label: 'Remarks', name: 'remarks', type: 'text' }
    ]
  },
  {
    file: 'PurchaseClosure.jsx', name: 'PurchaseClosure', title: 'Stage 9 - Purchase Closure', action: 'Close Purchase', modalTitle: 'Purchase Closure & Inventory',
    pendingCols: [
      { header: 'PR Number', accessor: 'prNumber' }, { header: 'PO Number', accessor: 'poNumber' },
      { header: 'Weight Slip Number', accessor: 'weightSlipNumber' }, { header: 'Challan Number', accessor: 'challanNumber' },
      { header: 'Net Weight (Kg)', accessor: 'netWeight' }, { header: 'Rate (₹/Qt)', accessor: 'rate' },
      { header: 'Weigh Date', accessor: 'weighDate' }
    ],
    historyCols: [
      { header: 'PR Number', accessor: 'prNumber' }, { header: 'PO Number', accessor: 'poNumber' },
      { header: 'Purchase Closure ID', accessor: 'purchaseClosureId' }, { header: 'Lot Number', accessor: 'lotNumber' },
      { header: 'Batch Number', accessor: 'batchNumber' }, { header: 'Net Qty Added (MT)', accessor: 'netQtyAdded' },
      { header: 'Warehouse', accessor: 'warehouse' }, { header: 'Go-down', accessor: 'godown' },
      { header: 'Bin / Rack', accessor: 'binRack' }, { header: 'Quality Grade', accessor: 'paddyGrade' },
      { header: 'Moisture %', accessor: 'moisture' }, { header: 'Closure Date', accessor: 'closureDate' },
      { header: 'Inventory Updated By', accessor: 'inventoryUpdatedBy' }
    ],
    fields: [
      { label: 'PR Number', name: 'prNumber', type: 'text', readOnly: true },
      { label: 'PO Number', name: 'poNumber', type: 'text', readOnly: true },
      { label: 'Weight Slip Number', name: 'weightSlipNumber', type: 'text', readOnly: true },
      { label: 'Purchase Closure ID', name: 'purchaseClosureId', type: 'text' },
      { label: 'Net Quantity (MT)', name: 'netQtyAdded', type: 'number' },
      { label: 'Warehouse Location', name: 'warehouse', type: 'text' },
      { label: 'Go-down', name: 'godown', type: 'text' },
      { label: 'Bin / Rack', name: 'binRack', type: 'text' },
      { label: 'Lot Number', name: 'lotNumber', type: 'text' },
      { label: 'Batch Number', name: 'batchNumber', type: 'text' },
      { label: 'Quality Grade', name: 'paddyGrade', type: 'text' },
      { label: 'Moisture at Receipt (%)', name: 'moisture', type: 'number' },
      { label: 'Storage Remarks', name: 'storageRemarks', type: 'text' },
      { label: 'Inventory Updated By', name: 'inventoryUpdatedBy', type: 'text' }
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
    const gross = qty * 1000 + Math.floor(Math.random() * 500);
    const tare = Math.floor(Math.random() * 200) + 100;
    const netWeight = gross - tare;
    
    return {
      id: i + 1,
      prNumber: \`PR-2026-\${(i + 1).toString().padStart(4, '0')}\`,
      prDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      poNumber: \`PO-2026-\${(i + 1).toString().padStart(4, '0')}\`,
      poDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      paddyGrade: ['Grade A', 'Grade B', 'Grade C'][Math.floor(Math.random() * 3)],
      quantity: qty,
      targetMandi: ['Moga Mandi', 'Karnal Mandi', 'Ludhiana Market'][Math.floor(Math.random() * 3)],
      requestedBy: 'Purchase Officer',
      department: 'Procurement',
      remarks: 'Standard purchase request',
      requiredByDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      vendorName: 'Ramesh Singh',
      vendorPhone: '9876543210',
      rate: rate,
      totalValue: qty * rate,
      poValidityDate: \`2026-07-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      deliveryTerms: 'FOR',
      paymentTerms: 'Advance 20%',
      agentName: 'Suresh Agent',
      agentId: 'AGT-001',
      agentPhone: '8765432109',
      agentFirmName: 'Suresh & Sons',
      commissionType: 'Per Qt',
      commissionRate: 15,
      assignmentDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      vehicleNumber: \`PB-10-AB-\${(i * 123) % 9999}\`,
      vehicleType: 'Truck',
      driverName: 'Gurpreet Singh',
      driverPhone: '7654321098',
      driverLicense: 'PB-DL-12345',
      vehicleCapacity: 25,
      transporterName: 'Fast Logistics',
      expectedDepartureDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      mandiName: 'Moga Main Mandi',
      mandiCode: 'MOG-001',
      apmcLicense: 'APMC-MOG-123',
      mandiLocation: 'Moga City',
      expectedPurchaseDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      auctionSlot: 'Morning Slot',
      lotNumbers: \`LOT-\${i+1}\`,
      challanNumber: \`CHL-\${(i + 1).toString().padStart(4, '0')}\`,
      challanDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      farmerName: 'Baldev Singh',
      farmerId: 'AADHAAR-8765',
      village: 'Village Kalan',
      noOfBags: qty * 20,
      grossWeight: gross,
      tareWeight: tare,
      netWeight: netWeight,
      totalAmount: (netWeight / 100) * rate,
      mandiCess: 2,
      commissionAmount: 5000,
      netPayable: ((netWeight / 100) * rate) * 1.02 + 5000,
      gateEntryNumber: \`GE-\${(i + 1).toString().padStart(4, '0')}\`,
      entryDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      entryTime: '10:30 AM',
      securityGuardName: 'Ramu',
      purpose: 'Inward',
      sealNumber: \`SEAL-\${i+1}\`,
      weightSlipNumber: \`WS-\${(i + 1).toString().padStart(4, '0')}\`,
      weighDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      weighTime: '11:00 AM',
      weighbridgeId: 'WB-01',
      operatorName: 'Sunil',
      variance: 'None',
      purchaseClosureId: \`PC-\${(i + 1).toString().padStart(4, '0')}\`,
      netQtyAdded: (netWeight / 1000).toFixed(2),
      warehouse: 'Warehouse A',
      godown: 'Godown 1',
      binRack: 'Bin 5',
      lotNumber: \`LOT-RC-\${i+1}\`,
      batchNumber: \`BATCH-\${i+1}\`,
      moisture: (12 + Math.random() * 5).toFixed(1),
      closureDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      inventoryUpdatedBy: 'Inventory Manager',
      createdBy: 'Admin',
      createdAt: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      updatedAt: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
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
    
    // Auto-generate IDs for specific stages
    let autoFields = {};
    ${stage.name === 'PurchaseOrder' ? `autoFields = { poNumber: 'PO-' + Math.floor(Math.random()*10000) };` : ''}
    ${stage.name === 'PurchaseChallan' ? `autoFields = { challanNumber: 'CHL-' + Math.floor(Math.random()*10000) };` : ''}
    ${stage.name === 'GateEntryPurchase' ? `autoFields = { gateEntryNumber: 'GE-' + Math.floor(Math.random()*10000), purpose: 'Inward' };` : ''}
    ${stage.name === 'GrossWeight' ? `autoFields = { weightSlipNumber: 'WS-' + Math.floor(Math.random()*10000) };` : ''}
    ${stage.name === 'PurchaseClosure' ? `autoFields = { purchaseClosureId: 'PC-' + Math.floor(Math.random()*10000) };` : ''}
    
    const readOnlyFields = ${JSON.stringify(stage.fields.filter(f => f.readOnly).map(f => f.name))};
    const initialFormData = {};
    readOnlyFields.forEach(field => {
      initialFormData[field] = item[field];
    });
    
    setFormData({ ...initialFormData, ...autoFields });
    setIsModalOpen(true);
  };

  // Auto-calculations for specific stages
  useEffect(() => {
    if (isModalOpen && formData) {
      ${stage.name === 'PurchaseOrder' ? `
      const qty = parseFloat(formData.quantity) || 0;
      const rate = parseFloat(formData.rate) || 0;
      const total = qty * rate;
      if (formData.totalValue !== total) setFormData(prev => ({ ...prev, totalValue: total }));
      ` : ''}
      
      ${stage.name === 'PurchaseChallan' ? `
      const gross = parseFloat(formData.grossWeight) || 0;
      const tare = parseFloat(formData.tareWeight) || 0;
      const net = gross > tare ? gross - tare : 0;
      const rate = parseFloat(formData.rate) || 0;
      const amount = (net / 100) * rate; // Rate is per Qt (100kg)
      const cess = parseFloat(formData.mandiCess) || 0;
      const comm = parseFloat(formData.commissionAmount) || 0;
      const payable = amount + (amount * (cess / 100)) + comm;
      
      if (formData.netWeight !== net || formData.totalAmount !== amount || formData.netPayable !== payable) {
        setFormData(prev => ({ ...prev, netWeight: net, totalAmount: amount, netPayable: payable }));
      }
      ` : ''}
      
      ${stage.name === 'GrossWeight' ? `
      const gross = parseFloat(formData.grossWeight) || 0;
      const tare = parseFloat(formData.tareWeight) || 0;
      const net = gross > tare ? gross - tare : 0;
      if (formData.netWeight !== net) {
        setFormData(prev => ({ ...prev, netWeight: net }));
      }
      ` : ''}
    }
  }, [formData, isModalOpen]);

  const handleSave = () => {
    const processedItem = { ...selectedItem, ...formData, status: 'Completed', updatedAt: new Date().toISOString().split('T')[0] };
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
            <p className="text-sm text-slate-600 mb-1">Processing PR Number:</p>
            <p className="font-semibold text-slate-800">{selectedItem?.prNumber}</p>
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

const stage1Template = () => `import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input, Label, Select } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import DataTable from '../../components/DataTable';
import { usePagination } from '../../hooks/usePagination';
import { Modal } from '../../components/ui/Modal';

const generateDummyData = () => {
  return Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    prNumber: \`PR-2026-\${(i + 1).toString().padStart(4, '0')}\`,
    prDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
    paddyGrade: ['Grade A', 'Grade B', 'Grade C'][Math.floor(Math.random() * 3)],
    quantity: Math.floor(Math.random() * 500) + 100,
    targetMandi: ['Moga Mandi', 'Karnal Mandi', 'Ludhiana Market'][Math.floor(Math.random() * 3)],
    requiredByDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
    requestedBy: 'Purchase Officer',
    department: 'Procurement',
    remarks: 'Standard request',
    createdBy: 'Admin',
    createdAt: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
    updatedAt: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`
  }));
};

export const PurchaseRequest = () => {
  const [historyItems, setHistoryItems] = useState(generateDummyData());
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});

  const filteredData = historyItems.filter(item => 
    Object.values(item).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const pagination = usePagination(filteredData, 10);

  const handleCreateNew = () => {
    setFormData({ prNumber: 'PR-' + Math.floor(Math.random()*10000) });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    const newItem = { ...formData, id: Date.now(), createdAt: new Date().toISOString().split('T')[0], status: 'Completed' };
    setHistoryItems([newItem, ...historyItems]);
    setIsModalOpen(false);
  };

  const columns = [
    { header: 'PR Number', accessor: 'prNumber' },
    { header: 'PR Date', accessor: 'prDate' },
    { header: 'Paddy Type / Grade', accessor: 'paddyGrade' },
    { header: 'Quantity Required (MT)', accessor: 'quantity' },
    { header: 'Target Mandi', accessor: 'targetMandi' },
    { header: 'Required By Date', accessor: 'requiredByDate' },
    { header: 'Requested By', accessor: 'requestedBy' },
    { header: 'Department', accessor: 'department' },
    { header: 'Remarks', accessor: 'remarks' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Stage 1 - Purchase Request</h2>
        <Button onClick={handleCreateNew} className="flex items-center gap-2">
          <Plus size={16} /> Create Purchase Request
        </Button>
      </div>

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
        title="Create Purchase Request"
      >
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>PR Number</Label>
              <Input type="text" value={formData.prNumber || ''} readOnly className="bg-slate-100" />
            </div>
            <div className="space-y-1.5">
              <Label>PR Date</Label>
              <Input type="date" value={formData.prDate || ''} onChange={(e) => setFormData({...formData, prDate: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Paddy Type / Grade</Label>
              <Input type="text" value={formData.paddyGrade || ''} onChange={(e) => setFormData({...formData, paddyGrade: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Quantity Required (MT)</Label>
              <Input type="number" value={formData.quantity || ''} onChange={(e) => setFormData({...formData, quantity: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Target Mandi</Label>
              <Input type="text" value={formData.targetMandi || ''} onChange={(e) => setFormData({...formData, targetMandi: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Required By Date</Label>
              <Input type="date" value={formData.requiredByDate || ''} onChange={(e) => setFormData({...formData, requiredByDate: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Requested By</Label>
              <Input type="text" value={formData.requestedBy || ''} onChange={(e) => setFormData({...formData, requestedBy: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Department</Label>
              <Input type="text" value={formData.department || ''} onChange={(e) => setFormData({...formData, department: e.target.value})} />
            </div>
            <div className="space-y-1.5 col-span-2">
              <Label>Remarks</Label>
              <Input type="text" value={formData.remarks || ''} onChange={(e) => setFormData({...formData, remarks: e.target.value})} />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
            <Button onClick={() => setIsModalOpen(false)} variant="outline">Cancel</Button>
            <Button onClick={handleSave}>Save Request</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
`;

// Write Stage 1
fs.writeFileSync(path.join('c:/Users/devel/Downloads/Rice Mill/src/modules/purchase', 'PurchaseRequest.jsx'), stage1Template());
console.log('Created PurchaseRequest.jsx');

// Write Stages 2-9
stages.forEach(stage => {
  const filePath = path.join('c:/Users/devel/Downloads/Rice Mill/src/modules/purchase', stage.file);
  fs.writeFileSync(filePath, template(stage));
  console.log('Created ' + stage.file);
});
