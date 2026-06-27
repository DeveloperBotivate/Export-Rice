const fs = require('fs');
const path = require('path');

const stages = [
  {
    file: 'DispatchPlanning.jsx', name: 'DispatchPlanning', title: 'Stage 2 - Dispatch Planning', action: 'Plan Dispatch', modalTitle: 'Planning Details',
    pendingCols: [
      { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' },
      { header: 'Order Type', accessor: 'orderType' },
      { header: 'Source Ref', accessor: 'sourceRef' },
      { header: 'Customer/Buyer Name', accessor: 'customerName' },
      { header: 'Rice Grade', accessor: 'riceGrade' },
      { header: 'Quantity (MT)', accessor: 'quantity' },
      { header: 'Required Dispatch Date', accessor: 'requiredDispatchDate' },
      { header: 'Priority', accessor: 'priority' }
    ],
    historyCols: [
      { header: 'Plan ID', accessor: 'planId' },
      { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' },
      { header: 'Order Type', accessor: 'orderType' },
      { header: 'Source Ref', accessor: 'sourceRef' },
      { header: 'Planned Dispatch Date', accessor: 'plannedDispatchDate' },
      { header: 'Allocated Qty (MT)', accessor: 'allocatedQty' },
      { header: 'Allocation Status', accessor: 'allocationStatus' },
      { header: 'Planning Date', accessor: 'planningDate' },
      { header: 'Planned By', accessor: 'plannedBy' }
    ],
    fields: [
      { label: 'Dispatch Order No', name: 'dispatchOrderNo', type: 'text', readOnly: true },
      { label: 'Order Type', name: 'orderType', type: 'text', readOnly: true },
      { label: 'Source Reference', name: 'sourceRef', type: 'text', readOnly: true },
      { label: 'Plan ID', name: 'planId', type: 'text', readOnly: true },
      { label: 'Planning Date', name: 'planningDate', type: 'date' },
      { label: 'Planned Dispatch Date', name: 'plannedDispatchDate', type: 'date' },
      { label: 'Warehouse/Go-down Source', name: 'warehouseSource', type: 'text' },
      { label: 'Stock Availability Check', name: 'stockAvailability', type: 'select', options: ['Available', 'Shortfall'] },
      { label: 'Allocated Quantity (MT)', name: 'allocatedQty', type: 'number' },
      { label: 'Allocation Status', name: 'allocationStatus', type: 'select', options: ['Full', 'Partial'] },
      { label: 'Planned By', name: 'plannedBy', type: 'text' },
      { label: 'Remarks', name: 'remarks', type: 'text' }
    ]
  },
  {
    file: 'ArrangeLogistics.jsx', name: 'ArrangeLogistics', title: 'Stage 3 - Arrange Logistics', action: 'Arrange Logistics', modalTitle: 'Logistics Details',
    pendingCols: [
      { header: 'Plan ID', accessor: 'planId' },
      { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' },
      { header: 'Order Type', accessor: 'orderType' },
      { header: 'Source Ref', accessor: 'sourceRef' },
      { header: 'Allocated Qty (MT)', accessor: 'allocatedQty' },
      { header: 'Planned Dispatch Date', accessor: 'plannedDispatchDate' },
      { header: 'Customer/Buyer Name', accessor: 'customerName' }
    ],
    historyCols: [
      { header: 'Logistics Arrangement ID', accessor: 'logisticsArrangementId' },
      { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' },
      { header: 'Order Type', accessor: 'orderType' },
      { header: 'Source Ref', accessor: 'sourceRef' },
      { header: 'Mode Required', accessor: 'modeRequired' },
      { header: 'Vehicle Type', accessor: 'vehicleType' },
      { header: 'No. of Vehicles', accessor: 'noOfVehicles' },
      { header: 'Transporter Shortlisted', accessor: 'transporterShortlisted' },
      { header: 'Estimated Freight (₹)', accessor: 'estimatedFreight' },
      { header: 'Arrangement Status', accessor: 'arrangementStatus' },
      { header: 'Arranged By', accessor: 'arrangedBy' }
    ],
    fields: [
      { label: 'Plan ID', name: 'planId', type: 'text', readOnly: true },
      { label: 'Dispatch Order No', name: 'dispatchOrderNo', type: 'text', readOnly: true },
      { label: 'Order Type', name: 'orderType', type: 'text', readOnly: true },
      { label: 'Source Reference', name: 'sourceRef', type: 'text', readOnly: true },
      { label: 'Logistics Arrangement ID', name: 'logisticsArrangementId', type: 'text', readOnly: true },
      { label: 'Mode Required', name: 'modeRequired', type: 'select', options: ['Road', 'Rail', 'Sea'] },
      { label: 'Vehicle Type Needed', name: 'vehicleType', type: 'select', options: ['Truck', 'Container'] },
      { label: 'No. of Vehicles Required', name: 'noOfVehicles', type: 'number' },
      { label: 'Transporter Shortlisted', name: 'transporterShortlisted', type: 'text' },
      { label: 'Estimated Freight (₹)', name: 'estimatedFreight', type: 'number' },
      { label: 'Arrangement Status', name: 'arrangementStatus', type: 'select', options: ['Confirmed', 'Pending'] },
      { label: 'Arranged By', name: 'arrangedBy', type: 'text' },
      { label: 'Remarks', name: 'remarks', type: 'text' }
    ]
  },
  {
    file: 'PickingList.jsx', name: 'PickingList', title: 'Stage 4 - Picking List', action: 'Create Picking List', modalTitle: 'Picking List Details',
    pendingCols: [
      { header: 'Logistics Arrangement ID', accessor: 'logisticsArrangementId' },
      { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' },
      { header: 'Order Type', accessor: 'orderType' },
      { header: 'Source Ref', accessor: 'sourceRef' },
      { header: 'Allocated Qty (MT)', accessor: 'allocatedQty' },
      { header: 'Transporter Shortlisted', accessor: 'transporterShortlisted' },
      { header: 'Arrangement Status', accessor: 'arrangementStatus' }
    ],
    historyCols: [
      { header: 'Pick List No', accessor: 'pickListNo' },
      { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' },
      { header: 'Order Type', accessor: 'orderType' },
      { header: 'Source Ref', accessor: 'sourceRef' },
      { header: 'Lot No', accessor: 'lotNo' },
      { header: 'Batch No', accessor: 'batchNo' },
      { header: 'Picked Qty (MT)', accessor: 'pickedQty' },
      { header: 'No. of Bags', accessor: 'pickedBags' },
      { header: 'Pick Date', accessor: 'pickDate' },
      { header: 'Picked By', accessor: 'pickedBy' },
      { header: 'Supervisor', accessor: 'supervisor' }
    ],
    fields: [
      { label: 'Logistics Arrangement ID', name: 'logisticsArrangementId', type: 'text', readOnly: true },
      { label: 'Dispatch Order No', name: 'dispatchOrderNo', type: 'text', readOnly: true },
      { label: 'Order Type', name: 'orderType', type: 'text', readOnly: true },
      { label: 'Source Reference', name: 'sourceRef', type: 'text', readOnly: true },
      { label: 'Pick List No', name: 'pickListNo', type: 'text', readOnly: true },
      { label: 'Pick Date', name: 'pickDate', type: 'date' },
      { label: 'Warehouse', name: 'warehouse', type: 'text' },
      { label: 'Go-down/Rack/Bin', name: 'rackBin', type: 'text' },
      { label: 'Rice Grade', name: 'riceGrade', type: 'text', readOnly: true },
      { label: 'Lot No', name: 'lotNo', type: 'text' },
      { label: 'Batch No', name: 'batchNo', type: 'text' },
      { label: 'Quantity to Pick (MT)', name: 'pickedQty', type: 'number' },
      { label: 'No. of Bags', name: 'pickedBags', type: 'number' },
      { label: 'Picked By', name: 'pickedBy', type: 'text' },
      { label: 'Supervisor Name', name: 'supervisor', type: 'text' },
      { label: 'Remarks', name: 'remarks', type: 'text' }
    ]
  },
  {
    file: 'LogisticsDetails.jsx', name: 'LogisticsDetails', title: 'Stage 5 - Logistics (Transporter & Driver Details)', action: 'Update Details', modalTitle: 'Logistics Details',
    pendingCols: [
      { header: 'Pick List No', accessor: 'pickListNo' },
      { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' },
      { header: 'Order Type', accessor: 'orderType' },
      { header: 'Source Ref', accessor: 'sourceRef' },
      { header: 'Picked Qty (MT)', accessor: 'pickedQty' },
      { header: 'No. of Bags', accessor: 'pickedBags' },
      { header: 'Pick Date', accessor: 'pickDate' }
    ],
    historyCols: [
      { header: 'Logistics ID', accessor: 'logisticsId' },
      { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' },
      { header: 'Order Type', accessor: 'orderType' },
      { header: 'Source Ref', accessor: 'sourceRef' },
      { header: 'Vehicle Number', accessor: 'vehicleNumber' },
      { header: 'Driver Name', accessor: 'driverName' },
      { header: 'Transporter Name', accessor: 'transporterName' },
      { header: 'Route', accessor: 'route' },
      { header: 'Total Freight (₹)', accessor: 'totalFreightAmount' },
      { header: 'Expected Departure', accessor: 'expectedDeparture' },
      { header: 'Expected Delivery Date', accessor: 'expectedDeliveryDate' }
    ],
    fields: [
      { label: 'Pick List No', name: 'pickListNo', type: 'text', readOnly: true },
      { label: 'Dispatch Order No', name: 'dispatchOrderNo', type: 'text', readOnly: true },
      { label: 'Order Type', name: 'orderType', type: 'text', readOnly: true },
      { label: 'Source Reference', name: 'sourceRef', type: 'text', readOnly: true },
      { label: 'Logistics ID', name: 'logisticsId', type: 'text', readOnly: true },
      { label: 'Vehicle Number', name: 'vehicleNumber', type: 'text' },
      { label: 'Vehicle Type', name: 'vehicleType', type: 'select', options: ['Truck', 'Container', 'Tempo'] },
      { label: 'Driver Name', name: 'driverName', type: 'text' },
      { label: 'Driver Phone', name: 'driverPhone', type: 'text' },
      { label: 'Driver License No', name: 'driverLicenseNo', type: 'text' },
      { label: 'Driver License Expiry', name: 'driverLicenseExpiry', type: 'date' },
      { label: 'Transporter Name', name: 'transporterName', type: 'text' },
      { label: 'Transporter Phone', name: 'transporterPhone', type: 'text' },
      { label: 'Transporter GSTIN', name: 'transporterGstin', type: 'text' },
      { label: 'Vehicle Capacity (MT)', name: 'vehicleCapacity', type: 'number' },
      { label: 'Route (Mill → Destination/Port)', name: 'route', type: 'text' },
      { label: 'Freight Rate (₹/MT)', name: 'freightRate', type: 'number' },
      { label: 'Total Freight Amount (₹)', name: 'totalFreightAmount', type: 'number', readOnly: true },
      { label: 'Advance to Driver (₹)', name: 'advanceToDriver', type: 'number' },
      { label: 'Expected Departure Date & Time', name: 'expectedDeparture', type: 'datetime-local' },
      { label: 'Expected Delivery Date', name: 'expectedDeliveryDate', type: 'date' },
      { label: 'Remarks', name: 'remarks', type: 'text' }
    ]
  },
  {
    file: 'TestCertificate.jsx', name: 'TestCertificate', title: 'Stage 6 - Test Certificate', action: 'Issue Certificate', modalTitle: 'Test Certificate Details',
    pendingCols: [
      { header: 'Logistics ID', accessor: 'logisticsId' },
      { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' },
      { header: 'Order Type', accessor: 'orderType' },
      { header: 'Source Ref', accessor: 'sourceRef' },
      { header: 'Rice Grade', accessor: 'riceGrade' },
      { header: 'Vehicle Number', accessor: 'vehicleNumber' },
      { header: 'Expected Departure', accessor: 'expectedDeparture' }
    ],
    historyCols: [
      { header: 'Certificate No', accessor: 'certificateNo' },
      { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' },
      { header: 'Order Type', accessor: 'orderType' },
      { header: 'Source Ref', accessor: 'sourceRef' },
      { header: 'Test Date', accessor: 'testDate' },
      { header: 'Quality Grade Confirmed', accessor: 'qualityGradeConfirmed' },
      { header: 'Moisture %', accessor: 'moisture' },
      { header: 'Phytosanitary Cert No', accessor: 'phytoCertNo' },
      { header: 'Result', accessor: 'result' },
      { header: 'Tested By', accessor: 'testedBy' }
    ],
    fields: [
      { label: 'Logistics ID', name: 'logisticsId', type: 'text', readOnly: true },
      { label: 'Dispatch Order No', name: 'dispatchOrderNo', type: 'text', readOnly: true },
      { label: 'Order Type', name: 'orderType', type: 'text', readOnly: true },
      { label: 'Source Reference', name: 'sourceRef', type: 'text', readOnly: true },
      { label: 'Certificate No', name: 'certificateNo', type: 'text', readOnly: true },
      { label: 'Test Date', name: 'testDate', type: 'date' },
      { label: 'Lab/Quality Officer Name', name: 'testedBy', type: 'text' },
      { label: 'Moisture %', name: 'moisture', type: 'number' },
      { label: 'Broken Grain %', name: 'brokenGrain', type: 'number' },
      { label: 'Foreign Matter %', name: 'foreignMatter', type: 'number' },
      { label: 'Quality Grade Confirmed', name: 'qualityGradeConfirmed', type: 'text' },
      { label: 'Phytosanitary Required (Y/N)', name: 'phytoRequired', type: 'select', options: ['Y', 'N'] },
      { label: 'Phytosanitary Cert No', name: 'phytoCertNo', type: 'text' },
      { label: 'Fumigation Cert No (if Export)', name: 'fumigationCertNo', type: 'text' },
      { label: 'Result', name: 'result', type: 'select', options: ['Pass', 'Fail'] },
      { label: 'Remarks', name: 'remarks', type: 'text' }
    ]
  },
  {
    file: 'DispatchWeight.jsx', name: 'DispatchWeight', title: 'Stage 7 - Dispatch Weight', action: 'Record Weight', modalTitle: 'Dispatch Weight Details',
    pendingCols: [
      { header: 'Certificate No', accessor: 'certificateNo' },
      { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' },
      { header: 'Order Type', accessor: 'orderType' },
      { header: 'Source Ref', accessor: 'sourceRef' },
      { header: 'Vehicle Number', accessor: 'vehicleNumber' },
      { header: 'Result', accessor: 'result' },
      { header: 'Test Date', accessor: 'testDate' }
    ],
    historyCols: [
      { header: 'Weight Slip No', accessor: 'weightSlipNo' },
      { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' },
      { header: 'Order Type', accessor: 'orderType' },
      { header: 'Source Ref', accessor: 'sourceRef' },
      { header: 'Gross Weight (Kg)', accessor: 'grossWeight' },
      { header: 'Tare Weight (Kg)', accessor: 'tareWeight' },
      { header: 'Net Weight (Kg)', accessor: 'netWeight' },
      { header: 'Variance %', accessor: 'variance' },
      { header: 'Weighbridge ID', accessor: 'weighbridgeId' },
      { header: 'Operator', accessor: 'operatorName' },
      { header: 'Weigh Date', accessor: 'weighDate' }
    ],
    fields: [
      { label: 'Certificate No', name: 'certificateNo', type: 'text', readOnly: true },
      { label: 'Dispatch Order No', name: 'dispatchOrderNo', type: 'text', readOnly: true },
      { label: 'Order Type', name: 'orderType', type: 'text', readOnly: true },
      { label: 'Source Reference', name: 'sourceRef', type: 'text', readOnly: true },
      { label: 'Vehicle Number', name: 'vehicleNumber', type: 'text', readOnly: true },
      { label: 'Weight Slip No', name: 'weightSlipNo', type: 'text', readOnly: true },
      { label: 'Weigh Date & Time', name: 'weighDate', type: 'datetime-local' },
      { label: 'Gross Weight (Kg)', name: 'grossWeight', type: 'number' },
      { label: 'Tare Weight (Kg)', name: 'tareWeight', type: 'number' },
      { label: 'Net Weight (Kg)', name: 'netWeight', type: 'number', readOnly: true },
      { label: 'Weighbridge ID', name: 'weighbridgeId', type: 'text' },
      { label: 'Operator Name', name: 'operatorName', type: 'text' },
      { label: 'Variance vs Pick List (%)', name: 'variance', type: 'number', readOnly: true },
      { label: 'Variance Reason', name: 'varianceReason', type: 'text' },
      { label: 'Remarks', name: 'remarks', type: 'text' }
    ]
  },
  {
    file: 'Invoice.jsx', name: 'Invoice', title: 'Stage 8 - Invoice', action: 'Create Invoice', modalTitle: 'Invoice Details',
    pendingCols: [
      { header: 'Weight Slip No', accessor: 'weightSlipNo' },
      { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' },
      { header: 'Order Type', accessor: 'orderType' },
      { header: 'Source Ref', accessor: 'sourceRef' },
      { header: 'Net Weight (Kg)', accessor: 'netWeight' },
      { header: 'Customer/Buyer Name', accessor: 'customerName' },
      { header: 'Weigh Date', accessor: 'weighDate' }
    ],
    historyCols: [
      { header: 'Invoice No', accessor: 'invoiceNo' },
      { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' },
      { header: 'Order Type', accessor: 'orderType' },
      { header: 'Source Ref', accessor: 'sourceRef' },
      { header: 'Invoice Date', accessor: 'invoiceDate' },
      { header: 'Customer/Buyer Name', accessor: 'customerName' },
      { header: 'Rice Grade', accessor: 'riceGrade' },
      { header: 'Qty (MT)', accessor: 'qtyMt' },
      { header: 'Grand Total', accessor: 'grandTotal' },
      { header: 'Payment Terms', accessor: 'paymentTerms' },
      { header: 'Created By', accessor: 'createdBy' }
    ],
    fields: [
      { label: 'Weight Slip No', name: 'weightSlipNo', type: 'text', readOnly: true },
      { label: 'Dispatch Order No', name: 'dispatchOrderNo', type: 'text', readOnly: true },
      { label: 'Order Type', name: 'orderType', type: 'text', readOnly: true },
      { label: 'Source Reference', name: 'sourceRef', type: 'text', readOnly: true },
      { label: 'Invoice No', name: 'invoiceNo', type: 'text', readOnly: true },
      { label: 'Invoice Date', name: 'invoiceDate', type: 'date' },
      { label: 'Invoice Type', name: 'invoiceType', type: 'text', readOnly: true },
      { label: 'Customer/Buyer Name', name: 'customerName', type: 'text', readOnly: true },
      { label: 'GSTIN / Buyer Country', name: 'gstinOrCountry', type: 'text' },
      { label: 'Rice Grade', name: 'riceGrade', type: 'text', readOnly: true },
      { label: 'Quantity (MT)', name: 'qtyMt', type: 'number', readOnly: true },
      { label: 'Rate (₹/MT or $/MT)', name: 'rate', type: 'number' },
      { label: 'Basic Amount', name: 'basicAmount', type: 'number', readOnly: true },
      { label: 'Freight Charges', name: 'freightCharges', type: 'number' },
      { label: 'Other Charges', name: 'otherCharges', type: 'number' },
      { label: 'GST — CGST/SGST/IGST (Domestic only)', name: 'gstAmount', type: 'number' },
      { label: 'Grand Total', name: 'grandTotal', type: 'number', readOnly: true },
      { label: 'Payment Terms', name: 'paymentTerms', type: 'text' },
      { label: 'Created By', name: 'createdBy', type: 'text' }
    ]
  },
  {
    file: 'DeliveryConfirmation.jsx', name: 'DeliveryConfirmation', title: 'Stage 9 - Delivery Confirmation', action: 'Confirm Delivery', modalTitle: 'Delivery Confirmation Details',
    pendingCols: [
      { header: 'Invoice No', accessor: 'invoiceNo' },
      { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' },
      { header: 'Order Type', accessor: 'orderType' },
      { header: 'Source Ref', accessor: 'sourceRef' },
      { header: 'Customer/Buyer Name', accessor: 'customerName' },
      { header: 'Grand Total', accessor: 'grandTotal' },
      { header: 'Invoice Date', accessor: 'invoiceDate' }
    ],
    historyCols: [
      { header: 'Confirmation ID', accessor: 'confirmationId' },
      { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' },
      { header: 'Order Type', accessor: 'orderType' },
      { header: 'Source Ref', accessor: 'sourceRef' },
      { header: 'Customer/Buyer Name', accessor: 'customerName' },
      { header: 'Confirmation Date', accessor: 'confirmationDate' },
      { header: 'Delivery Status', accessor: 'deliveryStatus' },
      { header: 'Outstanding Amount', accessor: 'outstandingAmount' },
      { header: 'Closed By', accessor: 'closedBy' }
    ],
    fields: [
      { label: 'Invoice No', name: 'invoiceNo', type: 'text', readOnly: true },
      { label: 'Dispatch Order No', name: 'dispatchOrderNo', type: 'text', readOnly: true },
      { label: 'Order Type', name: 'orderType', type: 'text', readOnly: true },
      { label: 'Source Reference', name: 'sourceRef', type: 'text', readOnly: true },
      { label: 'Confirmation ID', name: 'confirmationId', type: 'text', readOnly: true },
      { label: 'Confirmation Date', name: 'confirmationDate', type: 'date' },
      { label: 'Delivery Status', name: 'deliveryStatus', type: 'select', options: ['Complete', 'Partial', 'Disputed'] },
      { label: 'Actual Delivery Date', name: 'actualDeliveryDate', type: 'date' },
      { label: 'Received By', name: 'receivedBy', type: 'text' },
      { label: 'No. of Bags/Containers Received', name: 'receivedQty', type: 'number' },
      { label: 'Condition on Arrival', name: 'condition', type: 'select', options: ['Good', 'Damaged', 'Short'] },
      { label: 'Amount Received so far (₹/$)', name: 'amountReceived', type: 'number' },
      { label: 'Outstanding Amount', name: 'outstandingAmount', type: 'number', readOnly: true },
      { label: 'Customer/Buyer Feedback', name: 'feedback', type: 'text' },
      { label: 'Closed By', name: 'closedBy', type: 'text' },
      { label: 'Remarks', name: 'remarks', type: 'text' }
    ]
  }
];

const template = (stage) => `import React, { useState, useEffect } from 'react';
import { Search, Play, Plus } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input, Label, Select } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import DataTable from '../../components/DataTable';
import { usePagination } from '../../hooks/usePagination';
import { Modal } from '../../components/ui/Modal';
import { PageTabs } from '../../components/PageTabs';

const generateDummyData = () => {
  return Array.from({ length: 40 }, (_, i) => {
    const orderType = i % 2 === 0 ? 'Export' : 'Domestic';
    return {
      id: i + 1,
      sourceRef: orderType === 'Export' ? \`EC-00\${(i + 1).toString().padStart(2, '0')}\` : \`SO-00\${(i + 1).toString().padStart(2, '0')}\`,
      dispatchOrderNo: \`DO-00\${(i + 1).toString().padStart(2, '0')}\`,
      orderType: orderType,
      customerName: \`Customer \${i+1}\`,
      riceGrade: ['Basmati', 'Non-Basmati'][Math.floor(Math.random() * 2)],
      quantity: Math.floor(Math.random() * 50) + 10,
      requiredDispatchDate: \`2026-07-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      priority: ['Normal', 'Urgent'][Math.floor(Math.random() * 2)],
      
      planId: \`DP-00\${(i + 1).toString().padStart(2, '0')}\`,
      plannedDispatchDate: \`2026-07-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      allocatedQty: Math.floor(Math.random() * 50) + 10,
      allocationStatus: 'Full',
      planningDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      plannedBy: 'Planner',
      
      logisticsArrangementId: \`LA-00\${(i + 1).toString().padStart(2, '0')}\`,
      modeRequired: orderType === 'Export' ? 'Sea' : 'Road',
      vehicleType: orderType === 'Export' ? 'Container' : 'Truck',
      noOfVehicles: 2,
      transporterShortlisted: 'Transporter X',
      estimatedFreight: 20000,
      arrangementStatus: 'Confirmed',
      arrangedBy: 'Logistics',
      
      pickListNo: \`PK-00\${(i + 1).toString().padStart(2, '0')}\`,
      lotNo: 'LOT123',
      batchNo: 'B123',
      pickedQty: 20,
      pickedBags: 800,
      pickDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      pickedBy: 'Picker',
      supervisor: 'Supervisor',
      
      logisticsId: \`LG-00\${(i + 1).toString().padStart(2, '0')}\`,
      vehicleNumber: 'MH01AB1234',
      driverName: 'Driver Y',
      transporterName: 'Transporter X',
      route: 'Mill to Port',
      totalFreightAmount: 20000,
      expectedDeparture: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      expectedDeliveryDate: \`2026-06-\${(i % 28 + 5).toString().padStart(2, '0')}\`,
      
      certificateNo: \`TC-00\${(i + 1).toString().padStart(2, '0')}\`,
      testDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      qualityGradeConfirmed: 'Premium',
      moisture: 12.5,
      phytoCertNo: 'PHYTO123',
      result: 'Pass',
      testedBy: 'Lab Off',
      
      weightSlipNo: \`DW-00\${(i + 1).toString().padStart(2, '0')}\`,
      grossWeight: 25000,
      tareWeight: 5000,
      netWeight: 20000,
      variance: 0,
      weighbridgeId: 'WB1',
      operatorName: 'Operator',
      weighDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      
      invoiceNo: \`INV-00\${(i + 1).toString().padStart(2, '0')}\`,
      invoiceDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      qtyMt: 20,
      grandTotal: 1000000,
      paymentTerms: 'Advance',
      createdBy: 'Finance',
      
      confirmationId: \`CF-00\${(i + 1).toString().padStart(2, '0')}\`,
      confirmationDate: \`2026-07-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      deliveryStatus: 'Complete',
      outstandingAmount: 0,
      closedBy: 'Admin',
      
      status: 'Completed'
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
    
    let autoFields = {};
    if ('${stage.name}' === 'DispatchPlanning') autoFields = { planId: 'DP-00' + Math.floor(Math.random()*100) };
    if ('${stage.name}' === 'ArrangeLogistics') autoFields = { logisticsArrangementId: 'LA-00' + Math.floor(Math.random()*100) };
    if ('${stage.name}' === 'PickingList') autoFields = { pickListNo: 'PK-00' + Math.floor(Math.random()*100) };
    if ('${stage.name}' === 'LogisticsDetails') autoFields = { logisticsId: 'LG-00' + Math.floor(Math.random()*100) };
    if ('${stage.name}' === 'TestCertificate') autoFields = { certificateNo: 'TC-00' + Math.floor(Math.random()*100) };
    if ('${stage.name}' === 'DispatchWeight') autoFields = { weightSlipNo: 'DW-00' + Math.floor(Math.random()*100) };
    if ('${stage.name}' === 'Invoice') autoFields = { invoiceNo: 'INV-00' + Math.floor(Math.random()*100), invoiceType: item.orderType === 'Export' ? 'Export Invoice' : 'Tax Invoice' };
    if ('${stage.name}' === 'DeliveryConfirmation') autoFields = { confirmationId: 'CF-00' + Math.floor(Math.random()*100) };
    
    const readOnlyFields = ${JSON.stringify(stage.fields.filter(f => f.readOnly).map(f => f.name))};
    const initialFormData = {};
    readOnlyFields.forEach(field => {
      initialFormData[field] = item[field];
    });
    
    setFormData({ ...initialFormData, ...autoFields });
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
import { Search, Plus, Play } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input, Label, Select } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import DataTable from '../../components/DataTable';
import { usePagination } from '../../hooks/usePagination';
import { Modal } from '../../components/ui/Modal';
import { PageTabs } from '../../components/PageTabs';

const generateDummyData = () => {
  return Array.from({ length: 40 }, (_, i) => {
    const orderType = i % 2 === 0 ? 'Export' : 'Domestic';
    return {
      id: i + 1,
      sourceRef: orderType === 'Export' ? \`EC-00\${(i + 1).toString().padStart(2, '0')}\` : \`SO-00\${(i + 1).toString().padStart(2, '0')}\`,
      dispatchOrderNo: \`DO-00\${(i + 1).toString().padStart(2, '0')}\`,
      orderType: orderType,
      customerName: \`Customer \${i+1}\`,
      riceGrade: ['Basmati', 'Non-Basmati'][Math.floor(Math.random() * 2)],
      quantity: Math.floor(Math.random() * 50) + 10,
      requiredDispatchDate: \`2026-07-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      priority: ['Normal', 'Urgent'][Math.floor(Math.random() * 2)],
      orderDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      customerPhone: '+1234567890',
      noOfBags: 500,
      bagSize: '50kg',
      createdBy: 'Dispatcher',
      status: 'Completed'
    };
  });
};

export const DispatchOrder = () => {
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
    setFormData({
      sourceRef: item.sourceRef,
      orderType: item.orderType,
      customerName: item.customerName,
      riceGrade: item.riceGrade,
      quantity: item.quantity,
      dispatchOrderNo: 'DO-00' + Math.floor(Math.random()*100)
    });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    const newItem = { ...selectedItem, ...formData, status: 'Completed' };
    setHistoryItems([newItem, ...historyItems]);
    setPendingItems(pendingItems.filter(p => p.id !== selectedItem.id));
    setIsModalOpen(false);
  };

  const pendingCols = [
    {
      header: 'Action',
      className: 'text-right',
      cell: (row) => (
        <div className="flex justify-end">
          <Button size="sm" onClick={() => handleActionClick(row)} className="flex items-center gap-1 bg-primary text-white">
            <Play size={14} /> Dispatch
          </Button>
        </div>
      )
    },
    { header: 'Order Type', accessor: 'orderType', cell: (row) => (
      <span className={\`px-2 py-1 rounded text-xs font-semibold \${row.orderType === 'Export' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}\`}>
        {row.orderType}
      </span>
    )},
    { header: 'Source Ref', accessor: 'sourceRef' },
    { header: 'Customer/Buyer Name', accessor: 'customerName' },
    { header: 'Rice Grade', accessor: 'riceGrade' },
    { header: 'Quantity (MT)', accessor: 'quantity' },
    { header: 'Required Dispatch Date', accessor: 'requiredDispatchDate' },
    { header: 'Priority', accessor: 'priority' }
  ];

  const historyCols = [
    { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' },
    { header: 'Order Type', accessor: 'orderType', cell: (row) => (
      <span className={\`px-2 py-1 rounded text-xs font-semibold \${row.orderType === 'Export' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}\`}>
        {row.orderType}
      </span>
    )},
    { header: 'Source Ref', accessor: 'sourceRef' },
    { header: 'Customer/Buyer Name', accessor: 'customerName' },
    { header: 'Rice Grade', accessor: 'riceGrade' },
    { header: 'Quantity (MT)', accessor: 'quantity' },
    { header: 'No. of Bags', accessor: 'noOfBags' },
    { header: 'Required Dispatch Date', accessor: 'requiredDispatchDate' },
    { header: 'Priority', accessor: 'priority' },
    { header: 'Created By', accessor: 'createdBy' },
    { header: 'Status', accessor: 'status' }
  ];

  const columns = activeTab === 'pending' ? pendingCols : historyCols;

  const domesticPending = pendingItems.filter(i => i.orderType === 'Domestic').length;
  const exportPending = pendingItems.filter(i => i.orderType === 'Export').length;
  const totalPending = pendingItems.length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Stage 1 - Dispatch Order</h2>
        <div className="flex gap-4">
          <div className="bg-slate-100 px-3 py-1.5 rounded-md text-sm">Total Pending: <span className="font-bold">{totalPending}</span></div>
          <div className="bg-green-50 text-green-700 px-3 py-1.5 rounded-md text-sm border border-green-200">Domestic: <span className="font-bold">{domesticPending}</span></div>
          <div className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-md text-sm border border-blue-200">Export: <span className="font-bold">{exportPending}</span></div>
        </div>
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
        title="Create Dispatch Order"
      >
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Dispatch Order No</Label>
              <Input type="text" value={formData.dispatchOrderNo || ''} readOnly className="bg-slate-100" />
            </div>
            <div className="space-y-1.5">
              <Label>Order Type</Label>
              <Input type="text" value={formData.orderType || ''} readOnly className="bg-slate-100" />
            </div>
            <div className="space-y-1.5">
              <Label>Source Reference</Label>
              <Input type="text" value={formData.sourceRef || ''} readOnly className="bg-slate-100" />
            </div>
            <div className="space-y-1.5">
              <Label>Order Date</Label>
              <Input type="date" value={formData.orderDate || ''} onChange={(e) => setFormData({...formData, orderDate: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Customer/Buyer Name</Label>
              <Input type="text" value={formData.customerName || ''} readOnly className="bg-slate-100" />
            </div>
            <div className="space-y-1.5">
              <Label>Customer Phone / Buyer Country</Label>
              <Input type="text" value={formData.customerPhone || ''} onChange={(e) => setFormData({...formData, customerPhone: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Delivery Address / Port of Loading</Label>
              <Input type="text" value={formData.deliveryAddress || ''} onChange={(e) => setFormData({...formData, deliveryAddress: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Rice Grade</Label>
              <Input type="text" value={formData.riceGrade || ''} onChange={(e) => setFormData({...formData, riceGrade: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Quantity (MT)</Label>
              <Input type="number" value={formData.quantity || ''} onChange={(e) => setFormData({...formData, quantity: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>No. of Bags</Label>
              <Input type="number" value={formData.noOfBags || ''} onChange={(e) => setFormData({...formData, noOfBags: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Bag Size</Label>
              <Input type="text" value={formData.bagSize || ''} onChange={(e) => setFormData({...formData, bagSize: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Required Dispatch Date</Label>
              <Input type="date" value={formData.requiredDispatchDate || ''} onChange={(e) => setFormData({...formData, requiredDispatchDate: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Priority</Label>
              <Select value={formData.priority || ''} onChange={(e) => setFormData({...formData, priority: e.target.value})}>
                <option value="">Select Priority</option>
                <option value="Normal">Normal</option>
                <option value="Urgent">Urgent</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Special Instructions</Label>
              <Input type="text" value={formData.specialInstructions || ''} onChange={(e) => setFormData({...formData, specialInstructions: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Created By</Label>
              <Input type="text" value={formData.createdBy || ''} onChange={(e) => setFormData({...formData, createdBy: e.target.value})} />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
            <Button onClick={() => setIsModalOpen(false)} variant="outline">Cancel</Button>
            <Button onClick={handleSave}>Save Order</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
`;

const dir = path.join(__dirname, 'src', 'modules', 'dispatch');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(path.join(dir, 'DispatchOrder.jsx'), stage1Template());
console.log('Created DispatchOrder.jsx');

stages.forEach(stage => {
  const filePath = path.join(dir, stage.file);
  fs.writeFileSync(filePath, template(stage));
  console.log('Created ' + stage.file);
});
