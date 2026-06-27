const fs = require('fs');
const path = require('path');

const stages = [
  {
    file: 'PurchaseApproval.jsx', name: 'PurchaseApproval', title: 'Stage 2 - Purchase Approval', action: 'Approve', modalTitle: 'Approval Details',
    pendingCols: [
      { header: 'Indent No', accessor: 'indentNo' },
      { header: 'Indent Date', accessor: 'indentDate' },
      { header: 'Purchase Type', accessor: 'purchaseType' },
      { header: 'Agency / Mandi', accessor: 'agencyMandi' },
      { header: 'Paddy Grade', accessor: 'paddyGrade' },
      { header: 'Qty MT', accessor: 'qtyMt' },
      { header: 'Budget / Mandated Rate ₹', accessor: 'rate' },
      { header: 'Required By Date', accessor: 'requiredByDate' },
      { header: 'Requested By', accessor: 'requestedBy' }
    ],
    historyCols: [
      { header: 'Indent No', accessor: 'indentNo' },
      { header: 'Approval ID', accessor: 'approvalId' },
      { header: 'Indent Date', accessor: 'indentDate' },
      { header: 'Purchase Type', accessor: 'purchaseType' },
      { header: 'Agency / Mandi', accessor: 'agencyMandi' },
      { header: 'Paddy Grade', accessor: 'paddyGrade' },
      { header: 'Approved Qty MT', accessor: 'approvedQty' },
      { header: 'Approved Rate ₹/Qt', accessor: 'approvedRate' },
      { header: 'Approved Budget ₹', accessor: 'approvedBudget' },
      { header: 'Approved By', accessor: 'approvedBy' },
      { header: 'Approval Date', accessor: 'approvalDate' },
      { header: 'Priority', accessor: 'priority' },
      { header: 'Approval Status', accessor: 'approvalStatus' }
    ],
    fields: [
      { label: 'Indent No', name: 'indentNo', type: 'text', readOnly: true },
      { label: 'Purchase Type', name: 'purchaseType', type: 'text', readOnly: true },
      { label: 'Agency / Mandi', name: 'agencyMandi', type: 'text', readOnly: true },
      { label: 'Approval ID', name: 'approvalId', type: 'text', readOnly: true },
      { label: 'Approval Date', name: 'approvalDate', type: 'date' },
      { label: 'Approved By (Name & Designation)', name: 'approvedBy', type: 'text' },
      { label: 'Approved Quantity MT', name: 'approvedQty', type: 'number' },
      { label: 'Approved Rate ₹/Qt', name: 'approvedRate', type: 'number' },
      { label: 'Approved Budget Total ₹', name: 'approvedBudget', type: 'number', readOnly: true },
      { label: 'Priority Level', name: 'priority', type: 'select', options: ['High', 'Medium', 'Low'] },
      { label: 'Approval Status', name: 'approvalStatus', type: 'select', options: ['Approved', 'Rejected', 'On Hold'] },
      { label: 'Rejection/Hold Reason', name: 'reason', type: 'text' },
      { label: 'Approval Remarks', name: 'remarks', type: 'text' }
    ]
  },
  {
    file: 'CreatePO.jsx', name: 'CreatePO', title: 'Stage 3 - Create PO', action: 'Create PO', modalTitle: 'Create Purchase Order',
    pendingCols: [
      { header: 'Indent No', accessor: 'indentNo' },
      { header: 'Approval ID', accessor: 'approvalId' },
      { header: 'Purchase Type', accessor: 'purchaseType' },
      { header: 'Agency / Mandi', accessor: 'agencyMandi' },
      { header: 'Paddy Grade', accessor: 'paddyGrade' },
      { header: 'Approved Qty MT', accessor: 'approvedQty' },
      { header: 'Approved Rate ₹/Qt', accessor: 'approvedRate' },
      { header: 'Approved By', accessor: 'approvedBy' },
      { header: 'Approval Date', accessor: 'approvalDate' }
    ],
    historyCols: [
      { header: 'PO Number', accessor: 'poNumber' },
      { header: 'Indent No', accessor: 'indentNo' },
      { header: 'Approval ID', accessor: 'approvalId' },
      { header: 'PO Date', accessor: 'poDate' },
      { header: 'Purchase Type', accessor: 'purchaseType' },
      { header: 'Agency / Vendor Name', accessor: 'agencyVendorName' },
      { header: 'Paddy Grade', accessor: 'paddyGrade' },
      { header: 'Quantity MT', accessor: 'qtyMt' },
      { header: 'Rate ₹/Qt', accessor: 'rate' },
      { header: 'Total PO Value ₹', accessor: 'totalPoValue' },
      { header: 'Payment Terms', accessor: 'paymentTerms' },
      { header: 'PO Validity Date', accessor: 'poValidityDate' },
      { header: 'Created By', accessor: 'createdBy' }
    ],
    fields: [
      { label: 'Indent No', name: 'indentNo', type: 'text', readOnly: true },
      { label: 'Approval ID', name: 'approvalId', type: 'text', readOnly: true },
      { label: 'Purchase Type', name: 'purchaseType', type: 'text', readOnly: true },
      { label: 'PO Number', name: 'poNumber', type: 'text', readOnly: true },
      { label: 'PO Date', name: 'poDate', type: 'date' },
      { label: 'PO Validity Date', name: 'poValidityDate', type: 'date' },
      { label: 'Agency Name', name: 'agencyVendorName', type: 'text' },
      { label: 'Government Season', name: 'season', type: 'text' },
      { label: 'Allocation Order Ref', name: 'allocationOrderRef', type: 'text' },
      { label: 'Mandated Rate ₹/Qt', name: 'mandatedRate', type: 'number' },
      { label: 'Vendor / Farmer Name', name: 'vendorName', type: 'text' },
      { label: 'Vendor Phone', name: 'vendorPhone', type: 'text' },
      { label: 'Vendor Aadhaar / PAN', name: 'vendorId', type: 'text' },
      { label: 'Paddy Grade', name: 'paddyGrade', type: 'text', readOnly: true },
      { label: 'Quantity MT', name: 'qtyMt', type: 'number' },
      { label: 'Rate ₹/Qt', name: 'rate', type: 'number' },
      { label: 'Total PO Value ₹', name: 'totalPoValue', type: 'number', readOnly: true },
      { label: 'Delivery Terms', name: 'deliveryTerms', type: 'text' },
      { label: 'Payment Terms', name: 'paymentTerms', type: 'select', options: ['Advance', 'Credit', 'Full'] },
      { label: 'PO Remarks', name: 'remarks', type: 'text' }
    ]
  },
  {
    file: 'ArrangeLogistics.jsx', name: 'ArrangeLogistics', title: 'Stage 4 - Arrange Logistics', action: 'Arrange Logistics', modalTitle: 'Logistics Details',
    pendingCols: [
      { header: 'PO Number', accessor: 'poNumber' },
      { header: 'Indent No', accessor: 'indentNo' },
      { header: 'Purchase Type', accessor: 'purchaseType' },
      { header: 'Agency / Vendor Name', accessor: 'agencyVendorName' },
      { header: 'Paddy Grade', accessor: 'paddyGrade' },
      { header: 'Quantity MT', accessor: 'qtyMt' },
      { header: 'Rate ₹/Qt', accessor: 'rate' },
      { header: 'PO Date', accessor: 'poDate' },
      { header: 'PO Validity Date', accessor: 'poValidityDate' }
    ],
    historyCols: [
      { header: 'Logistics ID', accessor: 'logisticsId' },
      { header: 'PO Number', accessor: 'poNumber' },
      { header: 'Indent No', accessor: 'indentNo' },
      { header: 'Vehicle Number', accessor: 'vehicleNumber' },
      { header: 'Vehicle Type', accessor: 'vehicleType' },
      { header: 'Driver Name', accessor: 'driverName' },
      { header: 'Transporter Name', accessor: 'transporterName' },
      { header: 'Route', accessor: 'route' },
      { header: 'Distance km', accessor: 'distance' },
      { header: 'Freight Rate ₹/MT', accessor: 'freightRate' },
      { header: 'Total Freight ₹', accessor: 'totalFreight' },
      { header: 'Expected Departure', accessor: 'expectedDeparture' },
      { header: 'Expected Arrival', accessor: 'expectedArrival' }
    ],
    fields: [
      { label: 'PO Number', name: 'poNumber', type: 'text', readOnly: true },
      { label: 'Indent No', name: 'indentNo', type: 'text', readOnly: true },
      { label: 'Logistics ID', name: 'logisticsId', type: 'text', readOnly: true },
      { label: 'Vehicle Number', name: 'vehicleNumber', type: 'text' },
      { label: 'Vehicle Type', name: 'vehicleType', type: 'select', options: ['Truck', 'Trolley', 'Container'] },
      { label: 'Driver Name', name: 'driverName', type: 'text' },
      { label: 'Driver Phone', name: 'driverPhone', type: 'text' },
      { label: 'Driver License No', name: 'driverLicenseNo', type: 'text' },
      { label: 'Vehicle Capacity MT', name: 'vehicleCapacity', type: 'number' },
      { label: 'Transporter Name', name: 'transporterName', type: 'text' },
      { label: 'Transporter Phone', name: 'transporterPhone', type: 'text' },
      { label: 'Transporter GSTIN', name: 'transporterGstin', type: 'text' },
      { label: 'Route (Mandi / Agency → Mill)', name: 'route', type: 'text' },
      { label: 'Distance km', name: 'distance', type: 'number' },
      { label: 'Expected Departure Date', name: 'expectedDeparture', type: 'date' },
      { label: 'Expected Arrival Date', name: 'expectedArrival', type: 'date' },
      { label: 'Freight Rate ₹/MT', name: 'freightRate', type: 'number' },
      { label: 'Total Freight ₹', name: 'totalFreight', type: 'number', readOnly: true },
      { label: 'Advance to Driver ₹', name: 'advanceToDriver', type: 'number' },
      { label: 'Remarks', name: 'remarks', type: 'text' }
    ]
  },
  {
    file: 'POEntry.jsx', name: 'POEntry', title: 'Stage 5 - PO Entry', action: 'Record Entry', modalTitle: 'PO Entry Details',
    pendingCols: [
      { header: 'PO Number', accessor: 'poNumber' },
      { header: 'Indent No', accessor: 'indentNo' },
      { header: 'Logistics ID', accessor: 'logisticsId' },
      { header: 'Purchase Type', accessor: 'purchaseType' },
      { header: 'Agency / Vendor Name', accessor: 'agencyVendorName' },
      { header: 'Paddy Grade', accessor: 'paddyGrade' },
      { header: 'Quantity MT', accessor: 'qtyMt' },
      { header: 'Rate ₹/Qt', accessor: 'rate' },
      { header: 'Vehicle Number', accessor: 'vehicleNumber' },
      { header: 'Expected Departure', accessor: 'expectedDeparture' }
    ],
    historyCols: [
      { header: 'PO Entry ID', accessor: 'poEntryId' },
      { header: 'PO Number', accessor: 'poNumber' },
      { header: 'Indent No', accessor: 'indentNo' },
      { header: 'Entry Date', accessor: 'entryDate' },
      { header: 'Location', accessor: 'location' },
      { header: 'Lot No', accessor: 'lotNo' },
      { header: 'No. of Bags', accessor: 'noOfBags' },
      { header: 'Gross Weight at Source Kg', accessor: 'grossWeight' },
      { header: 'Moisture at Source %', accessor: 'moisture' },
      { header: 'Paddy Grade Verified', accessor: 'paddyGradeVerified' },
      { header: 'Recorded By', accessor: 'recordedBy' }
    ],
    fields: [
      { label: 'PO Number', name: 'poNumber', type: 'text', readOnly: true },
      { label: 'Indent No', name: 'indentNo', type: 'text', readOnly: true },
      { label: 'Logistics ID', name: 'logisticsId', type: 'text', readOnly: true },
      { label: 'PO Entry ID', name: 'poEntryId', type: 'text', readOnly: true },
      { label: 'Entry Date', name: 'entryDate', type: 'date' },
      { label: 'Mandi / Agency Location', name: 'location', type: 'text' },
      { label: 'Lot Numbers', name: 'lotNo', type: 'text' },
      { label: 'Auction Slot / Token No', name: 'tokenNo', type: 'text' },
      { label: 'No. of Bags', name: 'noOfBags', type: 'number' },
      { label: 'Gross Weight at Source Kg', name: 'grossWeight', type: 'number' },
      { label: 'Moisture at Source %', name: 'moisture', type: 'number' },
      { label: 'Paddy Grade Verified', name: 'paddyGradeVerified', type: 'text' },
      { label: 'Entry Recorded By', name: 'recordedBy', type: 'text' },
      { label: 'Remarks', name: 'remarks', type: 'text' }
    ]
  },
  {
    file: 'AdvancePayment.jsx', name: 'AdvancePayment', title: 'Stage 6 - Advance Payment', action: 'Process Payment', modalTitle: 'Advance Payment Details',
    pendingCols: [
      { header: 'PO Number', accessor: 'poNumber' },
      { header: 'Indent No', accessor: 'indentNo' },
      { header: 'PO Entry ID', accessor: 'poEntryId' },
      { header: 'Purchase Type', accessor: 'purchaseType' },
      { header: 'Agency / Vendor Name', accessor: 'agencyVendorName' },
      { header: 'Total PO Value ₹', accessor: 'totalPoValue' },
      { header: 'Rate ₹/Qt', accessor: 'rate' },
      { header: 'Quantity MT', accessor: 'qtyMt' },
      { header: 'Payment Terms', accessor: 'paymentTerms' }
    ],
    historyCols: [
      { header: 'Advance Payment ID', accessor: 'advanceId' },
      { header: 'PO Number', accessor: 'poNumber' },
      { header: 'Indent No', accessor: 'indentNo' },
      { header: 'Payment Date', accessor: 'paymentDate' },
      { header: 'Payee Name', accessor: 'payeeName' },
      { header: 'Advance Amount ₹', accessor: 'advanceAmount' },
      { header: 'TDS ₹', accessor: 'tdsAmount' },
      { header: 'Net Paid ₹', accessor: 'netPaid' },
      { header: 'Payment Mode', accessor: 'paymentMode' },
      { header: 'UTR / Cheque No', accessor: 'utrNo' },
      { header: 'Paid By', accessor: 'paidBy' }
    ],
    fields: [
      { label: 'PO Number', name: 'poNumber', type: 'text', readOnly: true },
      { label: 'Indent No', name: 'indentNo', type: 'text', readOnly: true },
      { label: 'PO Entry ID', name: 'poEntryId', type: 'text', readOnly: true },
      { label: 'Advance Payment ID', name: 'advanceId', type: 'text', readOnly: true },
      { label: 'Payment Date', name: 'paymentDate', type: 'date' },
      { label: 'Payee Name', name: 'payeeName', type: 'text' },
      { label: 'Payee Bank Account No', name: 'bankAccount', type: 'text' },
      { label: 'Payee IFSC Code', name: 'ifscCode', type: 'text' },
      { label: 'Advance Amount ₹', name: 'advanceAmount', type: 'number' },
      { label: 'Payment Mode', name: 'paymentMode', type: 'select', options: ['NEFT', 'RTGS', 'Cheque', 'Cash'] },
      { label: 'Bank Name', name: 'bankName', type: 'text' },
      { label: 'UTR / Cheque No', name: 'utrNo', type: 'text' },
      { label: 'Cheque Date', name: 'chequeDate', type: 'date' },
      { label: 'TDS Rate %', name: 'tdsRate', type: 'number' },
      { label: 'TDS Amount ₹', name: 'tdsAmount', type: 'number', readOnly: true },
      { label: 'Net Amount Paid ₹', name: 'netPaid', type: 'number', readOnly: true },
      { label: 'Paid By', name: 'paidBy', type: 'text' },
      { label: 'Approval Reference', name: 'approvalRef', type: 'text' },
      { label: 'Remarks', name: 'remarks', type: 'text' }
    ]
  },
  {
    file: 'Lift.jsx', name: 'Lift', title: 'Stage 7 - Lift', action: 'Record Lift', modalTitle: 'Lift Details',
    pendingCols: [
      { header: 'PO Number', accessor: 'poNumber' },
      { header: 'Indent No', accessor: 'indentNo' },
      { header: 'Advance Payment ID', accessor: 'advanceId' },
      { header: 'Logistics ID', accessor: 'logisticsId' },
      { header: 'Vehicle Number', accessor: 'vehicleNumber' },
      { header: 'Driver Name', accessor: 'driverName' },
      { header: 'Agency / Vendor Name', accessor: 'agencyVendorName' },
      { header: 'Paddy Grade', accessor: 'paddyGrade' },
      { header: 'Quantity MT', accessor: 'qtyMt' },
      { header: 'Entry Date', accessor: 'entryDate' },
      { header: 'Advance Paid ₹', accessor: 'advancePaid' }
    ],
    historyCols: [
      { header: 'Lift ID', accessor: 'liftId' },
      { header: 'PO Number', accessor: 'poNumber' },
      { header: 'Indent No', accessor: 'indentNo' },
      { header: 'Lift Date', accessor: 'liftDate' },
      { header: 'Vehicle Number', accessor: 'vehicleNumber' },
      { header: 'Driver Name', accessor: 'driverName' },
      { header: 'No. of Bags', accessor: 'noOfBags' },
      { header: 'Gross Weight Kg', accessor: 'grossWeight' },
      { header: 'Net Weight Lifted Kg', accessor: 'netWeight' },
      { header: 'Moisture at Lift %', accessor: 'moisture' },
      { header: 'Lifted From', accessor: 'liftedFrom' },
      { header: 'Supervisor', accessor: 'supervisor' }
    ],
    fields: [
      { label: 'PO Number', name: 'poNumber', type: 'text', readOnly: true },
      { label: 'Indent No', name: 'indentNo', type: 'text', readOnly: true },
      { label: 'Logistics ID', name: 'logisticsId', type: 'text', readOnly: true },
      { label: 'Advance Payment ID', name: 'advanceId', type: 'text', readOnly: true },
      { label: 'Lift ID', name: 'liftId', type: 'text', readOnly: true },
      { label: 'Lift Date & Time', name: 'liftDate', type: 'datetime-local' },
      { label: 'Vehicle Number', name: 'vehicleNumber', type: 'text', readOnly: true },
      { label: 'Driver Name', name: 'driverName', type: 'text', readOnly: true },
      { label: 'No. of Bags Loaded', name: 'noOfBags', type: 'number' },
      { label: 'Gross Weight Loaded Kg', name: 'grossWeight', type: 'number' },
      { label: 'Tare Weight Kg', name: 'tareWeight', type: 'number' },
      { label: 'Net Weight Lifted Kg', name: 'netWeight', type: 'number', readOnly: true },
      { label: 'Paddy Grade', name: 'paddyGrade', type: 'text', readOnly: true },
      { label: 'Moisture at Lift %', name: 'moisture', type: 'number' },
      { label: 'Lifted From (Mandi / Agency Name)', name: 'liftedFrom', type: 'text' },
      { label: 'Supervisor Name', name: 'supervisor', type: 'text' },
      { label: 'Seal No', name: 'sealNo', type: 'text' },
      { label: 'Loading Remarks', name: 'remarks', type: 'text' }
    ]
  },
  {
    file: 'LabReport.jsx', name: 'LabReport', title: 'Stage 8 - Lab Report', action: 'Enter Report', modalTitle: 'Lab Report Details',
    pendingCols: [
      { header: 'Lift ID', accessor: 'liftId' },
      { header: 'PO Number', accessor: 'poNumber' },
      { header: 'Indent No', accessor: 'indentNo' },
      { header: 'Vehicle Number', accessor: 'vehicleNumber' },
      { header: 'Net Weight Lifted Kg', accessor: 'netWeight' },
      { header: 'Paddy Grade', accessor: 'paddyGrade' },
      { header: 'Moisture at Lift %', accessor: 'moisture' },
      { header: 'Lift Date', accessor: 'liftDate' }
    ],
    historyCols: [
      { header: 'Lab Report ID', accessor: 'labReportId' },
      { header: 'Lift ID', accessor: 'liftId' },
      { header: 'PO Number', accessor: 'poNumber' },
      { header: 'Indent No', accessor: 'indentNo' },
      { header: 'Lab Name', accessor: 'labName' },
      { header: 'Test Date', accessor: 'testDate' },
      { header: 'Moisture %', accessor: 'moisture' },
      { header: 'Broken %', accessor: 'broken' },
      { header: 'Chalky %', accessor: 'chalky' },
      { header: 'Foreign Matter %', accessor: 'foreignMatter' },
      { header: 'Paddy Grade Result', accessor: 'gradeResult' },
      { header: 'Recovery % Expected', accessor: 'recovery' },
      { header: 'Lab Result', accessor: 'labResult' },
      { header: 'Approved for Purchase', accessor: 'approved' },
      { header: 'Lab Technician', accessor: 'technician' }
    ],
    fields: [
      { label: 'Lift ID', name: 'liftId', type: 'text', readOnly: true },
      { label: 'PO Number', name: 'poNumber', type: 'text', readOnly: true },
      { label: 'Indent No', name: 'indentNo', type: 'text', readOnly: true },
      { label: 'Lab Report ID', name: 'labReportId', type: 'text', readOnly: true },
      { label: 'Lab Name', name: 'labName', type: 'text' },
      { label: 'Test Date', name: 'testDate', type: 'date' },
      { label: 'Moisture Content %', name: 'moisture', type: 'number' },
      { label: 'Broken Grain %', name: 'broken', type: 'number' },
      { label: 'Chalky Grain %', name: 'chalky', type: 'number' },
      { label: 'Foreign Matter %', name: 'foreignMatter', type: 'number' },
      { label: 'Immature Grain %', name: 'immature', type: 'number' },
      { label: 'Red Grain %', name: 'redGrain', type: 'number' },
      { label: 'Damaged / Discoloured %', name: 'damaged', type: 'number' },
      { label: 'Paddy Grade Result', name: 'gradeResult', type: 'select', options: ['A', 'B', 'C', 'Reject'] },
      { label: 'Recovery % Expected', name: 'recovery', type: 'number' },
      { label: 'Lab Technician Name', name: 'technician', type: 'text' },
      { label: 'Lab Remarks', name: 'remarks', type: 'text' },
      { label: 'Lab Result', name: 'labResult', type: 'select', options: ['Pass', 'Fail', 'Conditional'] },
      { label: 'Approved for Purchase', name: 'approved', type: 'select', options: ['Yes', 'No'] }
    ]
  },
  {
    file: 'FullKitting.jsx', name: 'FullKitting', title: 'Stage 9 - Full Kitting', action: 'Process Kitting', modalTitle: 'Full Kitting Details',
    pendingCols: [
      { header: 'Lab Report ID', accessor: 'labReportId' },
      { header: 'Lift ID', accessor: 'liftId' },
      { header: 'PO Number', accessor: 'poNumber' },
      { header: 'Indent No', accessor: 'indentNo' },
      { header: 'Vehicle Number', accessor: 'vehicleNumber' },
      { header: 'Net Weight Lifted Kg', accessor: 'netWeight' },
      { header: 'Paddy Grade Result', accessor: 'gradeResult' },
      { header: 'Lab Result', accessor: 'labResult' },
      { header: 'Approved', accessor: 'approved', cell: true }
    ],
    historyCols: [
      { header: 'Full Kitting ID', accessor: 'kittingId' },
      { header: 'Challan No', accessor: 'challanNo' },
      { header: 'Lab Report ID', accessor: 'labReportId' },
      { header: 'PO Number', accessor: 'poNumber' },
      { header: 'Indent No', accessor: 'indentNo' },
      { header: 'Kitting Date', accessor: 'kittingDate' },
      { header: 'Farmer / Agency Name', accessor: 'agencyVendorName' },
      { header: 'No. of Bags', accessor: 'noOfBags' },
      { header: 'Net Weight Kg', accessor: 'netWeight' },
      { header: 'Rate ₹/Qt', accessor: 'rate' },
      { header: 'Total Amount ₹', accessor: 'totalAmount' },
      { header: 'Advance Paid ₹', accessor: 'advancePaid' },
      { header: 'Balance Paid ₹', accessor: 'balancePaid' },
      { header: 'Net Payable ₹', accessor: 'netPayable' },
      { header: 'Paid By', accessor: 'paidBy' }
    ],
    fields: [
      { label: 'Lab Report ID', name: 'labReportId', type: 'text', readOnly: true },
      { label: 'Lift ID', name: 'liftId', type: 'text', readOnly: true },
      { label: 'PO Number', name: 'poNumber', type: 'text', readOnly: true },
      { label: 'Indent No', name: 'indentNo', type: 'text', readOnly: true },
      { label: 'Full Kitting ID', name: 'kittingId', type: 'text', readOnly: true },
      { label: 'Kitting Date', name: 'kittingDate', type: 'date' },
      { label: 'Challan Number', name: 'challanNo', type: 'text', readOnly: true },
      { label: 'Challan Date', name: 'challanDate', type: 'date' },
      { label: 'Farmer / Agency Name', name: 'agencyVendorName', type: 'text', readOnly: true },
      { label: 'Farmer ID / Aadhaar', name: 'farmerId', type: 'text' },
      { label: 'Village / Tehsil', name: 'village', type: 'text' },
      { label: 'No. of Bags', name: 'noOfBags', type: 'number', readOnly: true },
      { label: 'Gross Weight Kg', name: 'grossWeight', type: 'number', readOnly: true },
      { label: 'Tare Weight Kg', name: 'tareWeight', type: 'number', readOnly: true },
      { label: 'Net Weight Kg', name: 'netWeight', type: 'number', readOnly: true },
      { label: 'Rate ₹/Qt', name: 'rate', type: 'number', readOnly: true },
      { label: 'Total Amount ₹', name: 'totalAmount', type: 'number', readOnly: true },
      { label: 'Mandi Cess %', name: 'cess', type: 'number' },
      { label: 'Commission Amount ₹', name: 'commission', type: 'number' },
      { label: 'Net Payable ₹', name: 'netPayable', type: 'number', readOnly: true },
      { label: 'Advance Already Paid ₹', name: 'advancePaid', type: 'number', readOnly: true },
      { label: 'Balance Payable ₹', name: 'balancePayable', type: 'number', readOnly: true },
      { label: 'Balance Payment Mode', name: 'paymentMode', type: 'select', options: ['NEFT', 'RTGS', 'Cheque', 'Cash'] },
      { label: 'Balance UTR / Cheque No', name: 'utrNo', type: 'text' },
      { label: 'Paid By', name: 'paidBy', type: 'text' },
      { label: 'Kitting Remarks', name: 'remarks', type: 'text' }
    ]
  },
  {
    file: 'PurchaseClosure.jsx', name: 'PurchaseClosure', title: 'Stage 10 - Purchase Closure → Inventory', action: 'Close & Update', modalTitle: 'Purchase Closure Details',
    pendingCols: [
      { header: 'Full Kitting ID', accessor: 'kittingId' },
      { header: 'Challan No', accessor: 'challanNo' },
      { header: 'PO Number', accessor: 'poNumber' },
      { header: 'Indent No', accessor: 'indentNo' },
      { header: 'Farmer / Agency Name', accessor: 'agencyVendorName' },
      { header: 'Net Weight Kg', accessor: 'netWeight' },
      { header: 'Rate ₹/Qt', accessor: 'rate' },
      { header: 'Net Payable ₹', accessor: 'netPayable' },
      { header: 'Kitting Date', accessor: 'kittingDate' }
    ],
    historyCols: [
      { header: 'Purchase Closure ID', accessor: 'closureId' },
      { header: 'Full Kitting ID', accessor: 'kittingId' },
      { header: 'PO Number', accessor: 'poNumber' },
      { header: 'Indent No', accessor: 'indentNo' },
      { header: 'Closure Date', accessor: 'closureDate' },
      { header: 'Purchase Type', accessor: 'purchaseType' },
      { header: 'Agency / Vendor Name', accessor: 'agencyVendorName' },
      { header: 'Lot Number', accessor: 'lotNo' },
      { header: 'Batch Number', accessor: 'batchNo' },
      { header: 'Net Qty Added MT', accessor: 'netQtyMt' },
      { header: 'Warehouse', accessor: 'warehouse' },
      { header: 'Go-down', accessor: 'godown' },
      { header: 'Bin / Rack', accessor: 'binRack' },
      { header: 'Quality Grade', accessor: 'qualityGrade' },
      { header: 'Moisture %', accessor: 'moisture' },
      { header: 'Total Purchase Value ₹', accessor: 'totalPurchaseValue' },
      { header: 'Freight Cost ₹', accessor: 'freightCost' },
      { header: 'Total Landed Cost ₹', accessor: 'totalLandedCost' },
      { header: 'Valuation Rate ₹/MT', accessor: 'valuationRate' },
      { header: 'Inventory Updated By', accessor: 'updatedBy' }
    ],
    fields: [
      { label: 'Full Kitting ID', name: 'kittingId', type: 'text', readOnly: true },
      { label: 'Challan No', name: 'challanNo', type: 'text', readOnly: true },
      { label: 'PO Number', name: 'poNumber', type: 'text', readOnly: true },
      { label: 'Indent No', name: 'indentNo', type: 'text', readOnly: true },
      { label: 'Purchase Closure ID', name: 'closureId', type: 'text', readOnly: true },
      { label: 'Closure Date', name: 'closureDate', type: 'date' },
      { label: 'Net Quantity MT', name: 'netQtyMt', type: 'number' },
      { label: 'Warehouse Location', name: 'warehouse', type: 'text' },
      { label: 'Go-down', name: 'godown', type: 'text' },
      { label: 'Bin / Rack', name: 'binRack', type: 'text' },
      { label: 'Lot Number', name: 'lotNo', type: 'text', readOnly: true },
      { label: 'Batch Number', name: 'batchNo', type: 'text', readOnly: true },
      { label: 'Quality Grade', name: 'qualityGrade', type: 'text', readOnly: true },
      { label: 'Moisture at Receipt %', name: 'moisture', type: 'number', readOnly: true },
      { label: 'Purchase Type', name: 'purchaseType', type: 'text', readOnly: true },
      { label: 'Agency / Vendor Name', name: 'agencyVendorName', type: 'text', readOnly: true },
      { label: 'Total Purchase Value ₹', name: 'totalPurchaseValue', type: 'number', readOnly: true },
      { label: 'Freight Cost ₹', name: 'freightCost', type: 'number', readOnly: true },
      { label: 'Total Landed Cost ₹', name: 'totalLandedCost', type: 'number', readOnly: true },
      { label: 'Valuation Rate ₹/MT', name: 'valuationRate', type: 'number', readOnly: true },
      { label: 'Inventory Updated By', name: 'updatedBy', type: 'text' },
      { label: 'Storage Remarks', name: 'remarks', type: 'text' }
    ]
  }
];

const template = (stage) => `import React, { useState, useEffect } from 'react';
import { Search, Play, Plus, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input, Label, Select } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import DataTable from '../../components/DataTable';
import { usePagination } from '../../hooks/usePagination';
import { Modal } from '../../components/ui/Modal';
import { PageTabs } from '../../components/PageTabs';

const generateDummyData = () => {
  return Array.from({ length: 40 }, (_, i) => {
    const isGov = i % 2 === 0;
    const orderType = isGov ? 'Government' : 'Direct Market';
    return {
      id: i + 1,
      indentNo: \`IND-00\${(i + 1).toString().padStart(2, '0')}\`,
      indentDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      purchaseType: orderType,
      agencyMandi: isGov ? 'FCI' : 'Local Mandi',
      paddyGrade: ['Grade A', 'Grade B', 'Common'][Math.floor(Math.random() * 3)],
      qtyMt: Math.floor(Math.random() * 50) + 10,
      rate: Math.floor(Math.random() * 500) + 2000,
      requiredByDate: \`2026-07-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      requestedBy: \`User \${i+1}\`,
      
      approvalId: \`APR-00\${(i + 1).toString().padStart(2, '0')}\`,
      approvedQty: Math.floor(Math.random() * 50) + 10,
      approvedRate: Math.floor(Math.random() * 500) + 2000,
      approvedBudget: 100000,
      approvedBy: 'Manager',
      approvalDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      priority: 'High',
      approvalStatus: 'Approved',
      
      poNumber: \`PO-00\${(i + 1).toString().padStart(2, '0')}\`,
      poDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      agencyVendorName: isGov ? 'FCI' : 'Farmer Singh',
      totalPoValue: 100000,
      paymentTerms: 'Advance',
      poValidityDate: \`2026-07-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      createdBy: 'Buyer',
      
      logisticsId: \`LOG-00\${(i + 1).toString().padStart(2, '0')}\`,
      vehicleNumber: 'PB01A1234',
      vehicleType: 'Truck',
      driverName: 'Driver X',
      transporterName: 'Trans Y',
      route: 'Mandi-Mill',
      distance: 50,
      freightRate: 100,
      totalFreight: 5000,
      expectedDeparture: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      expectedArrival: \`2026-06-\${(i % 28 + 2).toString().padStart(2, '0')}\`,
      
      poEntryId: \`POE-00\${(i + 1).toString().padStart(2, '0')}\`,
      entryDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      location: 'Gate 1',
      lotNo: 'L-123',
      noOfBags: 500,
      grossWeight: 25000,
      moisture: 14.5,
      paddyGradeVerified: 'Yes',
      recordedBy: 'Guard',
      
      advanceId: \`ADV-00\${(i + 1).toString().padStart(2, '0')}\`,
      paymentDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      payeeName: isGov ? 'FCI' : 'Farmer Singh',
      advanceAmount: 20000,
      tdsAmount: 0,
      netPaid: 20000,
      paymentMode: 'NEFT',
      utrNo: 'UTR123456',
      paidBy: 'Finance',
      
      liftId: \`LIFT-00\${(i + 1).toString().padStart(2, '0')}\`,
      liftDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      netWeight: 24500,
      liftedFrom: 'Mandi',
      supervisor: 'Supervisor A',
      
      labReportId: \`LAB-00\${(i + 1).toString().padStart(2, '0')}\`,
      labName: 'Inhouse',
      testDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      broken: 2.1,
      chalky: 1.5,
      foreignMatter: 0.5,
      gradeResult: 'A',
      recovery: 67,
      labResult: 'Pass',
      approved: i % 5 === 0 ? 'No' : 'Yes',
      technician: 'Tech 1',
      
      kittingId: \`FK-00\${(i + 1).toString().padStart(2, '0')}\`,
      challanNo: \`CHL-00\${(i + 1).toString().padStart(2, '0')}\`,
      kittingDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      totalAmount: 100000,
      advancePaid: 20000,
      balancePaid: 80000,
      netPayable: 80000,
      
      closureId: \`PC-00\${(i + 1).toString().padStart(2, '0')}\`,
      closureDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      batchNo: 'B-123',
      netQtyMt: 24.5,
      warehouse: 'W1',
      godown: 'G1',
      binRack: 'R1',
      qualityGrade: 'A',
      totalPurchaseValue: 100000,
      freightCost: 5000,
      totalLandedCost: 105000,
      valuationRate: 4285,
      updatedBy: 'Store',
      
      status: 'Completed'
    };
  });
};

export const ${stage.name} = () => {
  const [pendingItems, setPendingItems] = useState(generateDummyData().slice(0, 20));
  const [historyItems, setHistoryItems] = useState(generateDummyData().slice(20, 40));
  
  const [activeTab, setActiveTab] = useState("pending");
  const [searchTerm, setSearchTerm] = useState("");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({});

  const displayData = activeTab === "pending" ? pendingItems : historyItems;
  
  const filteredData = displayData.filter(item => 
    Object.values(item).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const pagination = usePagination(filteredData, 10);

  const handleActionClick = (item) => {
    if ("${stage.name}" === "FullKitting" && item.approved === 'No') {
      alert("Cannot process kitting for rejected lab reports.");
      return;
    }
    
    setSelectedItem(item);
    
    let autoFields = {};
    if ("${stage.name}" === "PurchaseApproval") autoFields = { approvalId: "APR-00" + Math.floor(Math.random()*100) };
    if ("${stage.name}" === "CreatePO") autoFields = { poNumber: "PO-00" + Math.floor(Math.random()*100) };
    if ("${stage.name}" === "ArrangeLogistics") autoFields = { logisticsId: "LOG-00" + Math.floor(Math.random()*100) };
    if ("${stage.name}" === "POEntry") autoFields = { poEntryId: "POE-00" + Math.floor(Math.random()*100) };
    if ("${stage.name}" === "AdvancePayment") autoFields = { advanceId: "ADV-00" + Math.floor(Math.random()*100) };
    if ("${stage.name}" === "Lift") autoFields = { liftId: "LIFT-00" + Math.floor(Math.random()*100) };
    if ("${stage.name}" === "LabReport") autoFields = { labReportId: "LAB-00" + Math.floor(Math.random()*100) };
    if ("${stage.name}" === "FullKitting") autoFields = { kittingId: "FK-00" + Math.floor(Math.random()*100), challanNo: "CHL-00" + Math.floor(Math.random()*100) };
    if ("${stage.name}" === "PurchaseClosure") autoFields = { closureId: "PC-00" + Math.floor(Math.random()*100), lotNo: "LT-00" + Math.floor(Math.random()*100), batchNo: "BT-00" + Math.floor(Math.random()*100) };
    
    const readOnlyFields = ${JSON.stringify(stage.fields.filter(f => f.readOnly).map(f => f.name))};
    const initialFormData = {};
    readOnlyFields.forEach(field => {
      initialFormData[field] = item[field];
    });
    
    setFormData({ ...initialFormData, ...autoFields });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    const processedItem = { ...selectedItem, ...formData, status: "Completed" };
    setHistoryItems([processedItem, ...historyItems]);
    setPendingItems(pendingItems.filter(p => p.id !== selectedItem.id));
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const actionColumn = {
    header: "Action",
    className: "text-right",
    cell: (row) => {
      if ("${stage.name}" === "FullKitting" && row.approved === 'No') {
        return (
          <div className="flex justify-end">
            <span className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 text-xs rounded font-medium">
              <AlertCircle size={12} /> Blocked
            </span>
          </div>
        );
      }
      return (
        <div className="flex justify-end">
          <Button size="sm" onClick={() => handleActionClick(row)} className="flex items-center gap-1 bg-primary text-white">
            <Play size={14} />
            ${stage.action}
          </Button>
        </div>
      );
    }
  };

  const pendingCols = ${JSON.stringify(stage.pendingCols)}.map(col => {
    if (col.accessor === 'approved' && "${stage.name}" === "FullKitting") {
      return {
        ...col,
        cell: (row) => (
          <span className={\`px-2 py-1 rounded text-xs font-semibold \${row.approved === 'Yes' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}\`}>
            {row.approved}
          </span>
        )
      };
    }
    return col;
  });
  
  const historyCols = ${JSON.stringify(stage.historyCols)};

  const columns = activeTab === "pending" ? [actionColumn, ...pendingCols] : historyCols;

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
                value={formData.${f.name} || ""} 
                onChange={(e) => setFormData({...formData, ${f.name}: e.target.value})}
                disabled={${!!f.readOnly}}
                className={${!!f.readOnly} ? "bg-slate-100" : ""}
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
                value={formData.${f.name} || ""} 
                onChange={(e) => setFormData({...formData, ${f.name}: e.target.value})}
                readOnly={${!!f.readOnly}}
                className={${!!f.readOnly} ? "bg-slate-100" : ""}
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
`

const stage1Template = () => `import React, { useState } from 'react';
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
      indentNo: \`IND-00\${num.toString().padStart(2, '0')}\`,
      indentDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      purchaseType: type,
      procurementRef: type === 'Government' ? \`PROC-00\${num.toString().padStart(2, '0')}\` : '-',
      prNumber: type === 'Government' ? \`PR-00\${num.toString().padStart(2, '0')}\` : '-',
      agencyName: type === 'Government' ? 'FCI' : '-',
      targetMandi: type === 'Direct Market' ? 'Local Mandi' : '-',
      season: type === 'Government' ? 'Kharif' : '-',
      paddyGrade: ['Grade A', 'Grade B', 'Common'][Math.floor(Math.random() * 3)],
      qtyMt: Math.floor(Math.random() * 50) + 10,
      mandatedRate: type === 'Government' ? 2200 : '-',
      budget: type === 'Direct Market' ? 2100 : '-',
      region: type === 'Government' ? 'Punjab' : '-',
      allocationOrderRef: type === 'Government' ? \`ALLOC-00\${num}\` : '-',
      requiredByDate: \`2026-07-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      requestedBy: \`User \${num}\`,
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
          className={\`px-6 py-3 font-medium transition-colors \${activeTab === 'gov' ? 'border-b-2 border-primary text-primary' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}\`}
        >
          Government Indents
        </button>
        <button 
          onClick={() => setActiveTab('dm')} 
          className={\`px-6 py-3 font-medium transition-colors \${activeTab === 'dm' ? 'border-b-2 border-primary text-primary' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}\`}
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

      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} title={\`Create \${selectedType} Indent\`}>
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
`

const dir = path.join(__dirname, 'src', 'modules', 'purchase');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(path.join(dir, 'PurchaseIndent.jsx'), stage1Template());
console.log('Created PurchaseIndent.jsx');

stages.forEach(stage => {
  const filePath = path.join(dir, stage.file);
  fs.writeFileSync(filePath, template(stage));
  console.log('Created ' + stage.file);
});
