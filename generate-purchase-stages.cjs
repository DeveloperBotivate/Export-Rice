const fs = require('fs');
const path = require('path');

const stages = [
  {
    title: 'Purchase Requirement',
    file: 'PurchaseRequirement.jsx',
    prev: null, next: '/source-selection', storageKey: 'purchase_3_1_history', readFrom: null,
    pendingColumns: [],
    historyColumns: [
      ['Requirement No', 'requirementNo'], ['Date', 'requirementDate'], ['Purchase Type', 'purchaseType'],
      ['Gov Ref', 'procurementRef'], ['Target Mandi', 'targetMandi'], ['Broker Name', 'brokerName'],
      ['Paddy Grade', 'govPaddyGrade|mktPaddyGrade'], ['Qty MT', 'govQtyMT|mktQtyMT'], 
      ['Rate ₹/Qt', 'mspRate|budgetRate'], ['Required By', 'requiredByDate'], ['Requested By', 'requestedBy'], ['Status', 'status']
    ],
    fields: [
      { name: 'requirementNo', label: 'Requirement No', type: 'text', readOnly: true },
      { name: 'requirementDate', label: 'Requirement Date', type: 'date' },
      { name: 'purchaseType', label: 'Purchase Type', type: 'select', options: ['Government', 'Market'] },
      { name: 'procurementRef', label: 'Procurement Ref No', type: 'text', readOnly: true, condition: 'Government' },
      { name: 'govPaddyGrade', label: 'Paddy Grade (Gov)', type: 'text', readOnly: true, condition: 'Government' },
      { name: 'govQtyMT', label: 'Qty MT (Gov)', type: 'number', readOnly: true, condition: 'Government' },
      { name: 'mspRate', label: 'MSP Rate ₹/Qt', type: 'number', readOnly: true, condition: 'Government' },
      { name: 'targetSeason', label: 'Target Season', type: 'text', readOnly: true, condition: 'Government' },
      { name: 'procurementRegion', label: 'Procurement Region', type: 'text', readOnly: true, condition: 'Government' },
      { name: 'targetMandi', label: 'Target Mandi', type: 'text', condition: 'Market' },
      { name: 'mktPaddyGrade', label: 'Paddy Grade Required', type: 'text', condition: 'Market' },
      { name: 'mktQtyMT', label: 'Qty MT', type: 'number', condition: 'Market' },
      { name: 'budgetRate', label: 'Budget ₹/Qt', type: 'number', condition: 'Market' },
      { name: 'brokerName', label: 'Broker / Arhtiya Name', type: 'text', condition: 'Market' },
      { name: 'brokerCode', label: 'Broker Code', type: 'text', condition: 'Market' },
      { name: 'requiredByDate', label: 'Required By Date', type: 'date' },
      { name: 'requestedBy', label: 'Requested By', type: 'text' },
      { name: 'department', label: 'Department', type: 'text' },
      { name: 'remarks', label: 'Remarks', type: 'text' }
    ]
  },
  {
    title: 'Source Selection & Indent',
    file: 'SourceSelection.jsx',
    prev: '/purchase-requirement', next: '/purchase-approval', storageKey: 'purchase_3_1_history', readFrom: 'purchase_3_1_history',
    pendingColumns: [
      ['Action', ''], ['Requirement No', 'requirementNo'], ['Date', 'requirementDate'], ['Purchase Type', 'purchaseType'],
      ['Paddy Grade', 'govPaddyGrade|mktPaddyGrade'], ['Qty MT', 'govQtyMT|mktQtyMT'], ['Rate ₹/Qt', 'mspRate|budgetRate'],
      ['Required By', 'requiredByDate'], ['Requested By', 'requestedBy']
    ],
    historyColumns: [
      ['Indent No', 'indentNo'], ['Indent Date', 'indentDate'], ['Purchase Type', 'purchaseType'],
      ['Agency/Broker', 'agencyName|brokerName'], ['Season/Mandi', 'season|mandiName'],
      ['Paddy Grade', 'govPaddyGrade|mktPaddyGrade'], ['Qty MT', 'govQtyMT|mktQtyMT'], ['Rate ₹/Qt', 'mandatedRate|mktRate'],
      ['Required By', 'requiredByDate'], ['Requested By', 'requestedBy'], ['Status', 'status']
    ],
    fields: [
      { name: 'indentNo', label: 'Indent No', type: 'text', readOnly: true },
      { name: 'indentDate', label: 'Indent Date', type: 'date' },
      { name: 'requirementNo', label: 'Requirement No', type: 'text', readOnly: true },
      { name: 'purchaseType', label: 'Purchase Type', type: 'text', readOnly: true },
      { name: 'agencyName', label: 'Agency Name', type: 'select', options: ['FCI', 'MARKFED', 'PUNSUP', 'NAFED', 'State Agency'], condition: 'Government' },
      { name: 'season', label: 'Season', type: 'text', readOnly: true, condition: 'Government' },
      { name: 'govPaddyGrade', label: 'Paddy Grade', type: 'text', readOnly: true, condition: 'Government' },
      { name: 'govQtyMT', label: 'Qty MT', type: 'number', readOnly: true, condition: 'Government' },
      { name: 'mandatedRate', label: 'Mandated Rate ₹/Qt', type: 'number', readOnly: true, condition: 'Government' },
      { name: 'allocationRef', label: 'Allocation Order Ref No', type: 'text', condition: 'Government' },
      { name: 'doNo', label: 'DO (Delivery Order) No', type: 'text', condition: 'Government' },
      { name: 'brokerName', label: 'Broker / Arhtiya Name', type: 'text', condition: 'Market' },
      { name: 'brokerCode', label: 'Broker Code', type: 'text', condition: 'Market' },
      { name: 'mandiName', label: 'Mandi Name', type: 'text', condition: 'Market' },
      { name: 'supplierName', label: 'Supplier / Farmer Name', type: 'text', condition: 'Market' },
      { name: 'paddyVariety', label: 'Paddy Variety', type: 'text', condition: 'Market' },
      { name: 'mktSeason', label: 'Season', type: 'text', condition: 'Market' },
      { name: 'mktQtyMT', label: 'Qty MT', type: 'number', condition: 'Market' },
      { name: 'mktRate', label: 'Rate ₹/Qt', type: 'number', condition: 'Market' },
      { name: 'commission', label: 'Commission %', type: 'number', condition: 'Market' },
      { name: 'brokerage', label: 'Brokerage %', type: 'number', condition: 'Market' },
      { name: 'loadingCharges', label: 'Loading Charges ₹', type: 'number', condition: 'Market' },
      { name: 'hamaliCharges', label: 'Hamali Charges ₹', type: 'number', condition: 'Market' },
      { name: 'otherCharges', label: 'Other Charges ₹', type: 'number', condition: 'Market' },
      { name: 'requiredByDate', label: 'Required By Date', type: 'date' },
      { name: 'requestedBy', label: 'Requested By', type: 'text' },
      { name: 'department', label: 'Department', type: 'text' },
      { name: 'remarks', label: 'Remarks', type: 'text' }
    ]
  },
  {
    title: 'Purchase Approval',
    file: 'PurchaseApproval.jsx',
    prev: '/source-selection', next: '/po-do-entry', storageKey: 'purchase_3_1_history', readFrom: 'purchase_3_1_history',
    pendingColumns: [
      ['Action', ''], ['Indent No', 'indentNo'], ['Indent Date', 'indentDate'], ['Purchase Type', 'purchaseType'],
      ['Agency/Broker Name', 'agencyName|brokerName'], ['Paddy Grade', 'govPaddyGrade|mktPaddyGrade'], 
      ['Qty MT', 'govQtyMT|mktQtyMT'], ['Rate ₹/Qt', 'mandatedRate|mktRate'], ['Required By', 'requiredByDate'], ['Requested By', 'requestedBy']
    ],
    historyColumns: [
      ['Indent No', 'indentNo'], ['Approval ID', 'approvalId'], ['Purchase Type', 'purchaseType'],
      ['Agency/Broker Name', 'agencyName|brokerName'], ['Paddy Grade', 'govPaddyGrade|mktPaddyGrade'], 
      ['Approved Qty MT', 'approvedQtyMT'], ['Approved Rate ₹/Qt', 'approvedRate'], ['Approved Budget ₹', 'approvedTotalValue'], 
      ['Approved By', 'approvedBy'], ['Approval Date', 'approvalDate'], ['Priority', 'priorityLevel'], ['Status', 'approvalStatus']
    ],
    fields: [
      { name: 'indentNo', label: 'Indent No', type: 'text', readOnly: true },
      { name: 'purchaseType', label: 'Purchase Type', type: 'text', readOnly: true },
      { name: 'agencyName', label: 'Agency / Mandi', type: 'text', readOnly: true, condition: 'Government' },
      { name: 'mandiName', label: 'Agency / Mandi', type: 'text', readOnly: true, condition: 'Market' },
      { name: 'approvalId', label: 'Approval ID', type: 'text', readOnly: true },
      { name: 'approvalDate', label: 'Approval Date', type: 'date' },
      { name: 'approvedBy', label: 'Approved By (Name & Designation)', type: 'text' },
      { name: 'approvedQtyMT', label: 'Approved Quantity MT', type: 'number' },
      { name: 'approvedRate', label: 'Approved Rate ₹/Qt', type: 'number' },
      { name: 'approvedTotalValue', label: 'Approved Budget Total ₹', type: 'number' },
      { name: 'priorityLevel', label: 'Priority Level', type: 'select', options: ['High', 'Medium', 'Low'] },
      { name: 'approvalStatus', label: 'Approval Status', type: 'select', options: ['Approved', 'Rejected', 'On Hold'] },
      { name: 'rejectionReason', label: 'Rejection/Hold Reason', type: 'text' },
      { name: 'approvalRemarks', label: 'Approval Remarks', type: 'text' }
    ]
  },
  {
    title: 'Create PO / Government DO',
    file: 'CreatePODO.jsx',
    prev: '/purchase-approval', next: '/arrange-logistics-purchase', storageKey: 'purchase_3_1_history', readFrom: 'purchase_3_1_history',
    pendingColumns: [
      ['Action', ''], ['Indent No', 'indentNo'], ['Approval ID', 'approvalId'], ['Purchase Type', 'purchaseType'], 
      ['Agency/Broker Name', 'agencyName|brokerName'], ['Paddy Grade', 'govPaddyGrade|mktPaddyGrade'], 
      ['Approved Qty MT', 'approvedQtyMT'], ['Approved Rate ₹/Qt', 'approvedRate'], ['Approved By', 'approvedBy'], ['Approval Date', 'approvalDate']
    ],
    historyColumns: [
      ['Indent No', 'indentNo'], ['Approval ID', 'approvalId'], ['PO/DO Number', 'poNumber|doNumber'], 
      ['Vendor/Agency Name', 'vendorName|agencyName'], ['Purchase Type', 'purchaseType'], ['Paddy Grade', 'govPaddyGrade|mktPaddyGrade|paddyGrade'], 
      ['Qty MT', 'qtyMT'], ['Rate ₹/Qt', 'rate'], ['Total Value ₹', 'totalValue'], ['Payment Terms', 'paymentTerms'], 
      ['Validity Date', 'poValidity|doValidity'], ['Created By', 'createdBy']
    ],
    fields: [
      { name: 'indentNo', label: 'Indent No', type: 'text', readOnly: true },
      { name: 'approvalId', label: 'Approval ID', type: 'text', readOnly: true },
      { name: 'purchaseType', label: 'Purchase Type', type: 'text', readOnly: true },
      { name: 'poNumber', label: 'PO Number', type: 'text', readOnly: true, condition: 'Market' },
      { name: 'poDate', label: 'PO Date', type: 'date', condition: 'Market' },
      { name: 'poValidity', label: 'PO Validity Date', type: 'date', condition: 'Market' },
      { name: 'vendorName', label: 'Vendor / Farmer Name', type: 'text', condition: 'Market' },
      { name: 'vendorPhone', label: 'Vendor Phone', type: 'text', condition: 'Market' },
      { name: 'vendorId', label: 'Vendor Aadhaar / PAN', type: 'text', condition: 'Market' },
      { name: 'doNumber', label: 'DO Number', type: 'text', condition: 'Government' },
      { name: 'doDate', label: 'DO Date', type: 'date', condition: 'Government' },
      { name: 'doValidity', label: 'DO Validity Date', type: 'date', condition: 'Government' },
      { name: 'agencyName', label: 'Agency Name', type: 'text', readOnly: true, condition: 'Government' },
      { name: 'season', label: 'Season', type: 'text', readOnly: true, condition: 'Government' },
      { name: 'allocationRef', label: 'Allocation Order Ref', type: 'text', readOnly: true, condition: 'Government' },
      { name: 'mandatedRate', label: 'Mandated Rate ₹/Qt', type: 'number', readOnly: true, condition: 'Government' },
      { name: 'emdDeposit', label: 'EMD / Security Deposit ₹', type: 'number', condition: 'Government' },
      { name: 'paddyGrade', label: 'Paddy Grade', type: 'text', readOnly: true },
      { name: 'qtyMT', label: 'Quantity MT', type: 'number' },
      { name: 'rate', label: 'Rate ₹/Qt', type: 'number' },
      { name: 'totalValue', label: 'Total PO / DO Value ₹', type: 'number', readOnly: true },
      { name: 'deliveryTerms', label: 'Delivery Terms', type: 'text' },
      { name: 'paymentTerms', label: 'Payment Terms', type: 'text' },
      { name: 'remarks', label: 'Remarks', type: 'text' }
    ]
  },
  {
    title: 'Arrange Logistics',
    file: 'ArrangeLogistics.jsx',
    prev: '/po-do-entry', next: '/source-entry', storageKey: 'purchase_3_1_history', readFrom: 'purchase_3_1_history',
    pendingColumns: [
      ['Action', ''], ['PO/DO Number', 'poNumber|doNumber|poDoNumber'], ['Indent No', 'indentNo'], ['Purchase Type', 'purchaseType'], 
      ['Vendor/Agency Name', 'vendorName|agencyName'], ['Paddy Grade', 'paddyGrade|govPaddyGrade|mktPaddyGrade'], 
      ['Qty MT', 'qtyMT'], ['Rate ₹/Qt', 'rate'], ['Validity Date', 'poValidity|doValidity']
    ],
    historyColumns: [
      ['Logistics ID', 'logisticsId'], ['PO/DO Number', 'poDoNumber|poNumber|doNumber'], ['Indent No', 'indentNo'], 
      ['Vehicle Number', 'vehicleNumber'], ['Vehicle Type', 'vehicleType'], ['Driver Name', 'driverName'], 
      ['Transporter Name', 'transporterName'], ['Route', 'route'], ['Distance km', 'distance'], 
      ['Freight Rate ₹/MT', 'freightRate'], ['Total Freight ₹', 'totalFreight'], ['Expected Departure', 'expectedDeparture'], ['Expected Arrival', 'expectedArrival']
    ],
    fields: [
      { name: 'poDoNumber', label: 'PO / DO Number', type: 'text', readOnly: true },
      { name: 'indentNo', label: 'Indent No', type: 'text', readOnly: true },
      { name: 'purchaseType', label: 'Purchase Type', type: 'text', readOnly: true },
      { name: 'logisticsId', label: 'Logistics ID', type: 'text', readOnly: true },
      { name: 'vehicleNumber', label: 'Vehicle Number', type: 'text' },
      { name: 'vehicleType', label: 'Vehicle Type', type: 'select', options: ['Truck', 'Trolley', 'Container'] },
      { name: 'driverName', label: 'Driver Name', type: 'text' },
      { name: 'driverPhone', label: 'Driver Phone', type: 'text' },
      { name: 'driverLicense', label: 'Driver License No', type: 'text' },
      { name: 'vehicleCapacity', label: 'Vehicle Capacity MT', type: 'number' },
      { name: 'transporterName', label: 'Transporter Name', type: 'text' },
      { name: 'transporterPhone', label: 'Transporter Phone', type: 'text' },
      { name: 'transporterGst', label: 'Transporter GSTIN', type: 'text' },
      { name: 'route', label: 'Route (Mandi/Agency → Mill)', type: 'text' },
      { name: 'distance', label: 'Distance km', type: 'number' },
      { name: 'expectedDeparture', label: 'Expected Departure Date', type: 'date' },
      { name: 'expectedArrival', label: 'Expected Arrival Date', type: 'date' },
      { name: 'freightRate', label: 'Freight Rate ₹/MT', type: 'number' },
      { name: 'totalFreight', label: 'Total Freight ₹', type: 'number', readOnly: true },
      { name: 'advanceDriver', label: 'Advance to Driver ₹', type: 'number' },
      { name: 'remarks', label: 'Remarks', type: 'text' }
    ]
  },
  {
    title: 'Source Entry',
    file: 'SourceEntry.jsx',
    prev: '/arrange-logistics-purchase', next: '/advance-payment', storageKey: 'purchase_3_1_history', readFrom: 'purchase_3_1_history',
    pendingColumns: [
      ['Action', ''], ['PO/DO Number', 'poDoNumber|poNumber|doNumber'], ['Indent No', 'indentNo'], ['Logistics ID', 'logisticsId'], 
      ['Purchase Type', 'purchaseType'], ['Vendor/Agency Name', 'vendorName|agencyName'], ['Paddy Grade', 'paddyGrade|govPaddyGrade|mktPaddyGrade'], 
      ['Qty MT', 'qtyMT'], ['Vehicle Number', 'vehicleNumber'], ['Expected Departure', 'expectedDeparture']
    ],
    historyColumns: [
      ['PO Entry ID', 'poEntryId'], ['PO/DO Number', 'poDoNumber|poNumber|doNumber'], ['Indent No', 'indentNo'], ['Entry Date', 'entryDate'], 
      ['Mandi/Agency', 'mandiName|agencyName'], ['Broker/Godown', 'brokerName|agencyGodown'], ['Lot No', 'lotNumbers'], 
      ['No. of Bags', 'noOfBags'], ['Gross Weight Kg', 'grossWeightSource'], ['Moisture %', 'moistureSource'], 
      ['Paddy Grade Verified', 'paddyGradeVerified'], ['Recorded By', 'recordedBy']
    ],
    fields: [
      { name: 'poDoNumber', label: 'PO / DO Number', type: 'text', readOnly: true },
      { name: 'indentNo', label: 'Indent No', type: 'text', readOnly: true },
      { name: 'logisticsId', label: 'Logistics ID', type: 'text', readOnly: true },
      { name: 'purchaseType', label: 'Purchase Type', type: 'text', readOnly: true },
      { name: 'poEntryId', label: 'PO Entry ID', type: 'text', readOnly: true },
      { name: 'entryDate', label: 'Entry Date', type: 'date' },
      { name: 'mandiName', label: 'Mandi Name', type: 'text', condition: 'Market' },
      { name: 'mandiLocation', label: 'Mandi Location', type: 'text', condition: 'Market' },
      { name: 'auctionSlot', label: 'Auction Slot / Token No', type: 'text', condition: 'Market' },
      { name: 'brokerName', label: 'Broker Name', type: 'text', readOnly: true, condition: 'Market' },
      { name: 'commissionAmt', label: 'Commission Amount ₹', type: 'number', condition: 'Market' },
      { name: 'agencyName', label: 'Agency Name', type: 'text', readOnly: true, condition: 'Government' },
      { name: 'agencyGodown', label: 'Agency Godown Name', type: 'text', condition: 'Government' },
      { name: 'allocationNumber', label: 'Allocation Number', type: 'text', readOnly: true, condition: 'Government' },
      { name: 'lotNumbers', label: 'Lot Numbers', type: 'text' },
      { name: 'noOfBags', label: 'No. of Bags', type: 'number' },
      { name: 'grossWeightSource', label: 'Gross Weight at Source Kg', type: 'number' },
      { name: 'moistureSource', label: 'Moisture at Source %', type: 'number' },
      { name: 'paddyGradeVerified', label: 'Paddy Grade Verified', type: 'text' },
      { name: 'recordedBy', label: 'Entry Recorded By', type: 'text' },
      { name: 'remarks', label: 'Remarks', type: 'text' }
    ]
  },
  {
    title: 'Advance Payment',
    file: 'AdvancePayment.jsx',
    prev: '/source-entry', next: '/lift', storageKey: 'purchase_3_1_history', readFrom: 'purchase_3_1_history',
    pendingColumns: [
      ['Action', ''], ['PO/DO Number', 'poDoNumber|poNumber|doNumber'], ['Indent No', 'indentNo'], ['PO Entry ID', 'poEntryId'], 
      ['Purchase Type', 'purchaseType'], ['Vendor/Agency Name', 'vendorName|agencyName'], ['Rate ₹/Qt', 'rate'], ['Qty MT', 'qtyMT']
    ],
    historyColumns: [
      ['Advance Payment ID', 'advancePaymentId'], ['PO/DO Number', 'poDoNumber|poNumber|doNumber'], ['Indent No', 'indentNo'], ['Payment Date', 'paymentDate'], 
      ['Purchase Type', 'purchaseType'], ['Payee Name', 'payeeName|agencyName'], ['Advance Amount ₹', 'advanceAmount'], 
      ['TDS ₹', 'tdsAmount'], ['Net Paid ₹', 'netAmount'], ['Payment Mode', 'paymentMode'], ['UTR/Cheque No', 'utrNo|ddRtgs'], ['Paid By', 'paidBy']
    ],
    fields: [
      { name: 'poDoNumber', label: 'PO / DO Number', type: 'text', readOnly: true },
      { name: 'poEntryId', label: 'PO Entry ID', type: 'text', readOnly: true },
      { name: 'purchaseType', label: 'Purchase Type', type: 'text', readOnly: true },
      { name: 'advancePaymentId', label: 'Advance Payment ID', type: 'text', readOnly: true },
      { name: 'paymentDate', label: 'Payment Date', type: 'date' },
      { name: 'payeeName', label: 'Payee Name', type: 'text', condition: 'Market' },
      { name: 'bankAccount', label: 'Bank Account No', type: 'text', condition: 'Market' },
      { name: 'ifsc', label: 'IFSC', type: 'text', condition: 'Market' },
      { name: 'agencyName', label: 'Agency Name', type: 'text', readOnly: true, condition: 'Government' },
      { name: 'paymentAdvice', label: 'Payment Advice No', type: 'text', condition: 'Government' },
      { name: 'ddRtgs', label: 'Demand Draft / RTGS Ref', type: 'text', condition: 'Government' },
      { name: 'advanceAmount', label: 'Advance Amount ₹', type: 'number' },
      { name: 'paymentMode', label: 'Payment Mode', type: 'select', options: ['NEFT', 'RTGS', 'DD', 'Cash'] },
      { name: 'bankName', label: 'Bank Name', type: 'text' },
      { name: 'utrNo', label: 'UTR / Cheque / DD No', type: 'text' },
      { name: 'tdsRate', label: 'TDS Rate %', type: 'number' },
      { name: 'tdsAmount', label: 'TDS Amount ₹', type: 'number', readOnly: true },
      { name: 'netAmount', label: 'Net Amount Paid ₹', type: 'number', readOnly: true },
      { name: 'paidBy', label: 'Paid By', type: 'text' },
      { name: 'approvalRef', label: 'Approval Reference', type: 'text' },
      { name: 'remarks', label: 'Remarks', type: 'text' }
    ]
  },
  {
    title: 'Lift',
    file: 'Lift.jsx',
    prev: '/advance-payment', next: '/weighment', storageKey: 'purchase_3_1_history', readFrom: 'purchase_3_1_history',
    pendingColumns: [
      ['Action', ''], ['PO/DO Number', 'poDoNumber|poNumber|doNumber'], ['Indent No', 'indentNo'], ['PO Entry ID', 'poEntryId'], 
      ['Purchase Type', 'purchaseType'], ['Vendor/Agency', 'vendorName|agencyName'], ['Qty MT', 'qtyMT'], ['Advance Paid ₹', 'advanceAmount']
    ],
    historyColumns: [
      ['Lift ID', 'liftId'], ['PO/DO Number', 'poDoNumber|poNumber|doNumber'], ['Indent No', 'indentNo'], ['Lift Date', 'liftDate'], 
      ['Vehicle Number', 'vehicleNumber'], ['Driver Name', 'driverName'], ['No. of Bags', 'noOfBags'], 
      ['Gross Weight Kg', 'grossWeight'], ['Net Weight Kg', 'netWeight'], ['Moisture %', 'moisture'], 
      ['Lifted From', 'liftedFrom'], ['Supervisor', 'supervisor']
    ],
    fields: [
      { name: 'poDoNumber', label: 'PO / DO Number', type: 'text', readOnly: true },
      { name: 'indentNo', label: 'Indent No', type: 'text', readOnly: true },
      { name: 'purchaseType', label: 'Purchase Type', type: 'text', readOnly: true },
      { name: 'liftId', label: 'Lift ID', type: 'text', readOnly: true },
      { name: 'liftDate', label: 'Lift Date & Time', type: 'datetime-local' },
      { name: 'vehicleNumber', label: 'Vehicle Number', type: 'text', readOnly: true },
      { name: 'driverName', label: 'Driver Name', type: 'text', readOnly: true },
      { name: 'noOfBags', label: 'No. of Bags Loaded', type: 'number' },
      { name: 'grossWeight', label: 'Gross Weight Loaded Kg', type: 'number' },
      { name: 'tareWeight', label: 'Tare Weight Kg', type: 'number' },
      { name: 'netWeight', label: 'Net Weight Lifted Kg', type: 'number', readOnly: true },
      { name: 'paddyGrade', label: 'Paddy Grade', type: 'text', readOnly: true },
      { name: 'moisture', label: 'Moisture at Lift %', type: 'number' },
      { name: 'liftedFrom', label: 'Lifted From', type: 'text' },
      { name: 'supervisor', label: 'Supervisor Name', type: 'text' },
      { name: 'sealNo', label: 'Seal No', type: 'text' },
      { name: 'lorryReceipt', label: 'Lorry Receipt No', type: 'text', condition: 'Government' },
      { name: 'doBalance', label: 'DO Balance Qty MT', type: 'number', readOnly: true, condition: 'Government' },
      { name: 'remarks', label: 'Loading Remarks', type: 'text' }
    ]
  },
  {
    title: 'Weighment',
    file: 'Weighment.jsx',
    prev: '/lift', next: '/material-receipt', storageKey: 'purchase_3_1_history', readFrom: 'purchase_3_1_history',
    pendingColumns: [
      ['Action', ''], ['Lift No', 'liftNo'], ['Pending Lift MT', 'remainingAfterLiftMT'], ['Lift ID', 'liftId'], ['PO/DO Number', 'poDoNumber|poNumber|doNumber'], ['Indent No', 'indentNo'], 
      ['Vehicle Number', 'vehicleNumber'], ['Paddy Grade', 'paddyGrade|paddyGradeVerified'], ['No. of Bags', 'noOfBags'], 
      ['Net Weight Lifted Kg', 'netWeight'], ['Moisture %', 'moisture'], ['Lift Date', 'liftDate']
    ],
    historyColumns: [
      ['Weigh Slip No', 'weighSlipNo'], ['Lift No', 'liftNo'], ['Pending Lift MT', 'remainingAfterLiftMT'], ['Lift ID', 'liftId'], ['PO/DO Number', 'poDoNumber|poNumber|doNumber'], ['Indent No', 'indentNo'], 
      ['Weigh Date', 'weighDate'], ['Vehicle Number', 'vehicleNumber'], ['Gross Weight Kg', 'grossWeight'], 
      ['Tare Weight Kg', 'tareWeight'], ['Net Weight Kg', 'netWeight'], ['Variance Kg', 'varianceKg'], 
      ['Variance %', 'variancePct'], ['Operator', 'operator']
    ],
    fields: [
      { name: 'liftId', label: 'Lift ID', type: 'text', readOnly: true },
      { name: 'poDoNumber', label: 'PO / DO Number', type: 'text', readOnly: true },
      { name: 'purchaseType', label: 'Purchase Type', type: 'text', readOnly: true },
      { name: 'weighSlipNo', label: 'Weighbridge Slip No', type: 'text', readOnly: true },
      { name: 'weighDate', label: 'Weigh Date & Time', type: 'datetime-local' },
      { name: 'vehicleNumber', label: 'Vehicle Number', type: 'text', readOnly: true },
      { name: 'grossWeight', label: 'Gross Weight Kg', type: 'number' },
      { name: 'tareWeight', label: 'Tare Weight Kg', type: 'number' },
      { name: 'netWeight', label: 'Net Weight Kg', type: 'number', readOnly: true },
      { name: 'weighbridgeId', label: 'Weighbridge ID', type: 'text' },
      { name: 'operator', label: 'Weighbridge Operator', type: 'text' },
      { name: 'varianceKg', label: 'Variance vs Lift Weight Kg', type: 'number', readOnly: true },
      { name: 'variancePct', label: 'Variance %', type: 'number', readOnly: true },
      { name: 'varianceReason', label: 'Variance Reason', type: 'text' },
      { name: 'remarks', label: 'Remarks', type: 'text' }
    ]
  },
  {
    title: 'Material Receipt',
    file: 'MaterialReceipt.jsx',
    prev: '/weighment', next: '/laboratory-report', storageKey: 'purchase_3_1_history', readFrom: 'purchase_3_1_history',
    pendingColumns: [
      ['Action', ''], ['Lift No', 'liftNo'], ['Pending Lift MT', 'remainingAfterLiftMT'], ['Weigh Slip No', 'weighSlipNo'], ['Lift ID', 'liftId'], ['PO/DO Number', 'poDoNumber|poNumber|doNumber'], 
      ['Indent No', 'indentNo'], ['Vehicle Number', 'vehicleNumber'], ['Net Weight Kg', 'netWeight'], 
      ['Paddy Grade', 'paddyGrade|paddyGradeVerified'], ['Weigh Date', 'weighDate']
    ],
    historyColumns: [
      ['GRN No', 'grnNo'], ['Lift No', 'liftNo'], ['Pending Lift MT', 'remainingAfterLiftMT'], ['Weigh Slip No', 'weighSlipNo'], ['Lift ID', 'liftId'], ['PO/DO Number', 'poDoNumber|poNumber|doNumber'], 
      ['Indent No', 'indentNo'], ['GRN Date', 'grnDate'], ['Lot No', 'lotNo'], ['Batch No', 'batchNo'], 
      ['Warehouse', 'warehouse'], ['Go-down', 'godown'], ['Received Qty Kg', 'receivedQty'], 
      ['Shortage Kg', 'shortage'], ['Excess Kg', 'excess'], ['Received By', 'receivedBy']
    ],
    fields: [
      { name: 'weighSlipNo', label: 'Weighbridge Slip No', type: 'text', readOnly: true },
      { name: 'liftId', label: 'Lift ID', type: 'text', readOnly: true },
      { name: 'purchaseType', label: 'Purchase Type', type: 'text', readOnly: true },
      { name: 'grnNo', label: 'GRN No', type: 'text', readOnly: true },
      { name: 'grnDate', label: 'GRN Date', type: 'date' },
      { name: 'warehouse', label: 'Warehouse Location', type: 'text' },
      { name: 'godown', label: 'Go-down', type: 'text' },
      { name: 'binRack', label: 'Bin / Rack', type: 'text' },
      { name: 'lotNo', label: 'Lot Number', type: 'text', readOnly: true },
      { name: 'batchNo', label: 'Batch Number', type: 'text', readOnly: true },
      { name: 'receivedQty', label: 'Received Qty Kg', type: 'number' },
      { name: 'expectedQty', label: 'Expected Qty Kg', type: 'number', readOnly: true },
      { name: 'shortage', label: 'Shortage Kg', type: 'number', readOnly: true },
      { name: 'excess', label: 'Excess Kg', type: 'number', readOnly: true },
      { name: 'shortageReason', label: 'Shortage / Excess Reason', type: 'text' },
      { name: 'noOfBags', label: 'No. of Bags Received', type: 'number' },
      { name: 'paddyGrade', label: 'Paddy Grade', type: 'text', readOnly: true },
      { name: 'receivedBy', label: 'Received By', type: 'text' },
      { name: 'warehouseIncharge', label: 'Warehouse In-charge', type: 'text' },
      { name: 'remarks', label: 'Remarks', type: 'text' }
    ]
  },
  {
    title: 'Laboratory Report',
    file: 'LaboratoryReport.jsx',
    prev: '/material-receipt', next: '/accounts-verification', storageKey: 'purchase_3_1_history', readFrom: 'purchase_3_1_history',
    pendingColumns: [
      ['Action', ''], ['Lift No', 'liftNo'], ['Pending Lift MT', 'remainingAfterLiftMT'], ['GRN No', 'grnNo'], ['Lift ID', 'liftId'], ['PO/DO Number', 'poDoNumber|poNumber|doNumber'], 
      ['Indent No', 'indentNo'], ['Lot No', 'lotNo'], ['Net Weight Kg', 'netWeight|receivedQty'], 
      ['Paddy Grade', 'paddyGrade|paddyGradeVerified'], ['GRN Date', 'grnDate']
    ],
    historyColumns: [
      ['Lab Report ID', 'labReportId'], ['Lift No', 'liftNo'], ['Pending Lift MT', 'remainingAfterLiftMT'], ['GRN No', 'grnNo'], ['PO/DO Number', 'poDoNumber|poNumber|doNumber'], ['Indent No', 'indentNo'], 
      ['Lot No', 'lotNo'], ['Lab Name', 'labName'], ['Test Date', 'testDate'], ['Moisture %', 'moisture'], 
      ['Broken %', 'broken'], ['Paddy Grade Result', 'paddyGradeResult'], ['Recovery %', 'recovery'], 
      ['Lab Result', 'labResult'], ['Approved', 'approved'], ['Technician', 'technician']
    ],
    fields: [
      { name: 'grnNo', label: 'GRN No', type: 'text', readOnly: true },
      { name: 'purchaseType', label: 'Purchase Type', type: 'text', readOnly: true },
      { name: 'labReportId', label: 'Lab Report ID', type: 'text', readOnly: true },
      { name: 'labName', label: 'Lab Name', type: 'text' },
      { name: 'testDate', label: 'Test Date', type: 'date' },
      { name: 'moisture', label: 'Moisture Content %', type: 'number' },
      { name: 'broken', label: 'Broken Grain %', type: 'number' },
      { name: 'chalky', label: 'Chalky Grain %', type: 'number' },
      { name: 'foreign', label: 'Foreign Matter %', type: 'number' },
      { name: 'immature', label: 'Immature Grain %', type: 'number' },
      { name: 'redGrain', label: 'Red Grain %', type: 'number' },
      { name: 'damaged', label: 'Damaged / Discoloured %', type: 'number' },
      { name: 'paddyGradeResult', label: 'Paddy Grade Result', type: 'select', options: ['A', 'B', 'C', 'Reject'] },
      { name: 'recovery', label: 'Recovery % Expected', type: 'number' },
      { name: 'technician', label: 'Lab Technician Name', type: 'text' },
      { name: 'remarks', label: 'Lab Remarks', type: 'text' },
      { name: 'labResult', label: 'Lab Result', type: 'select', options: ['Pass', 'Fail', 'Conditional'] },
      { name: 'approved', label: 'Approved for Receipt', type: 'select', options: ['Yes', 'No'] }
    ]
  },
  {
    title: 'Accounts Verification',
    file: 'AccountsVerification.jsx',
    prev: '/laboratory-report', next: '/full-kitting', storageKey: 'purchase_3_1_history', readFrom: 'purchase_3_1_history',
    pendingColumns: [
      ['Action', ''], ['Lift No', 'liftNo'], ['Pending Lift MT', 'remainingAfterLiftMT'], ['Lab Report ID', 'labReportId'], ['GRN No', 'grnNo'], ['PO/DO Number', 'poDoNumber|poNumber|doNumber'], 
      ['Indent No', 'indentNo'], ['Purchase Type', 'purchaseType'], ['Vendor/Agency Name', 'vendorName|agencyName'], 
      ['Net Weight Kg', 'netWeight|receivedQty'], ['Lab Result', 'labResult']
    ],
    historyColumns: [
      ['AV ID', 'accountsVerificationId'], ['Lift No', 'liftNo'], ['Pending Lift MT', 'remainingAfterLiftMT'], ['GRN No', 'grnNo'], ['PO/DO Number', 'poDoNumber|poNumber|doNumber'], ['Indent No', 'indentNo'], 
      ['Purchase Type', 'purchaseType'], ['Supplier/Govt Bill ₹', 'supplierBillAmt|govtBillAmt'], 
      ['Freight ₹', 'freightAmount'], ['Labour ₹', 'labourCharges'], ['Advance Paid ₹', 'advancePaid|advanceAmount'], 
      ['Balance Payable ₹', 'balancePayable'], ['TDS ₹', 'tdsAmount'], ['Net Payable ₹', 'netPayable'], 
      ['Status', 'paymentStatus'], ['Verified By', 'verifiedBy']
    ],
    fields: [
      { name: 'accountsVerificationId', label: 'Accounts Verification ID', type: 'text', readOnly: true },
      { name: 'verificationDate', label: 'Verification Date', type: 'date' },
      { name: 'purchaseType', label: 'Purchase Type', type: 'text', readOnly: true },
      { name: 'supplierBillNo', label: 'Supplier Bill No', type: 'text', condition: 'Market' },
      { name: 'supplierBillAmt', label: 'Supplier Bill Amount ₹', type: 'number', condition: 'Market' },
      { name: 'brokerCommission', label: 'Broker Commission ₹', type: 'number', condition: 'Market' },
      { name: 'hamaliCharges', label: 'Hamali Charges ₹', type: 'number', condition: 'Market' },
      { name: 'loadingCharges', label: 'Loading Charges ₹', type: 'number', condition: 'Market' },
      { name: 'mandiCess', label: 'Mandi Cess ₹', type: 'number', condition: 'Market' },
      { name: 'otherCharges', label: 'Other Charges ₹', type: 'number', condition: 'Market' },
      { name: 'govtBillNo', label: 'Government Bill No', type: 'text', condition: 'Government' },
      { name: 'govtBillAmt', label: 'Government Bill Amount ₹', type: 'number', condition: 'Government' },
      { name: 'emdRefund', label: 'EMD / Security Refund ₹', type: 'number', condition: 'Government' },
      { name: 'freightBillNo', label: 'Freight Bill No', type: 'text' },
      { name: 'freightAmount', label: 'Freight Amount ₹', type: 'number' },
      { name: 'labourCharges', label: 'Labour Charges ₹', type: 'number' },
      { name: 'advancePaid', label: 'Advance Already Paid ₹', type: 'number', readOnly: true },
      { name: 'balancePayable', label: 'Balance Payable ₹', type: 'number', readOnly: true },
      { name: 'paymentStatus', label: 'Payment Status', type: 'select', options: ['Unpaid', 'Partial', 'Paid'] },
      { name: 'tdsRate', label: 'TDS Rate %', type: 'number' },
      { name: 'tdsAmount', label: 'TDS Amount ₹', type: 'number', readOnly: true },
      { name: 'netPayable', label: 'Net Payable ₹', type: 'number', readOnly: true },
      { name: 'verifiedBy', label: 'Verified By', type: 'text' },
      { name: 'remarks', label: 'Remarks', type: 'text' }
    ]
  },
  {
    title: 'Full Kitting',
    file: 'FullKitting.jsx',
    prev: '/accounts-verification', next: '/purchase-closure', storageKey: 'purchase_3_1_history', readFrom: 'purchase_3_1_history',
    pendingColumns: [
      ['Action', ''], ['Lift No', 'liftNo'], ['Pending Lift MT', 'remainingAfterLiftMT'], ['AV ID', 'accountsVerificationId'], ['GRN No', 'grnNo'], ['PO/DO Number', 'poDoNumber|poNumber|doNumber'], 
      ['Indent No', 'indentNo'], ['Purchase Type', 'purchaseType'], ['Vendor/Agency Name', 'vendorName|agencyName'], 
      ['Net Payable ₹', 'netPayable'], ['Payment Status', 'paymentStatus']
    ],
    historyColumns: [
      ['Full Kitting ID', 'fullKittingId'], ['Lift No', 'liftNo'], ['Pending Lift MT', 'remainingAfterLiftMT'], ['Challan No', 'challanNo'], ['AV ID', 'accountsVerificationId'], 
      ['PO/DO Number', 'poDoNumber|poNumber|doNumber'], ['Indent No', 'indentNo'], ['Kitting Date', 'kittingDate'], 
      ['Farmer/Agency Name', 'farmerName|agencyName'], ['No. of Bags', 'noOfBags'], ['Net Weight Kg', 'netWeight'], 
      ['Rate ₹/Qt', 'rate'], ['Total Amount ₹', 'totalAmount'], ['Advance Paid ₹', 'advancePaid|advanceAmount'], 
      ['Balance Paid ₹', 'balancePayable'], ['Net Payable ₹', 'netPayable'], ['Paid By', 'paidBy']
    ],
    fields: [
      { name: 'fullKittingId', label: 'Full Kitting ID', type: 'text', readOnly: true },
      { name: 'challanNo', label: 'Challan No', type: 'text', readOnly: true },
      { name: 'challanDate', label: 'Challan Date', type: 'date' },
      { name: 'kittingDate', label: 'Kitting Date', type: 'date' },
      { name: 'purchaseType', label: 'Purchase Type', type: 'text', readOnly: true },
      { name: 'farmerName', label: 'Farmer Name', type: 'text', readOnly: true, condition: 'Market' },
      { name: 'farmerId', label: 'Farmer ID / Aadhaar', type: 'text', condition: 'Market' },
      { name: 'agencyName', label: 'Agency Name', type: 'text', readOnly: true, condition: 'Government' },
      { name: 'govtRef', label: 'Government Reference No', type: 'text', condition: 'Government' },
      { name: 'noOfBags', label: 'No. of Bags', type: 'number', readOnly: true },
      { name: 'netWeight', label: 'Net Weight Kg', type: 'number', readOnly: true },
      { name: 'rate', label: 'Rate ₹/Qt', type: 'number', readOnly: true },
      { name: 'totalAmount', label: 'Total Amount ₹', type: 'number', readOnly: true },
      { name: 'commissionAmount', label: 'Commission Amount ₹', type: 'number', condition: 'Market' },
      { name: 'netPayable', label: 'Net Payable ₹', type: 'number', readOnly: true },
      { name: 'advancePaid', label: 'Advance Paid ₹', type: 'number', readOnly: true },
      { name: 'balancePayable', label: 'Balance Payable ₹', type: 'number', readOnly: true },
      { name: 'balancePaymentMode', label: 'Balance Payment Mode', type: 'select', options: ['NEFT', 'RTGS', 'DD', 'Cash'] },
      { name: 'balanceUtr', label: 'Balance UTR / Cheque No', type: 'text' },
      { name: 'paidBy', label: 'Paid By', type: 'text' },
      { name: 'remarks', label: 'Kitting Remarks', type: 'text' }
    ]
  },
  {
    title: 'Purchase Closure',
    file: 'PurchaseClosure.jsx',
    prev: '/full-kitting', next: null, storageKey: 'purchase_3_1_history', readFrom: 'purchase_3_1_history',
    pendingColumns: [
      ['Action', ''], ['Lift No', 'liftNo'], ['Pending Lift MT', 'remainingAfterLiftMT'], ['Full Kitting ID', 'fullKittingId'], ['Challan No', 'challanNo'], ['PO/DO Number', 'poDoNumber|poNumber|doNumber'], 
      ['Indent No', 'indentNo'], ['Agency/Vendor Name', 'agencyName|vendorName'], ['Net Weight Kg', 'netWeight'], 
      ['Rate ₹/Qt', 'rate'], ['Net Payable ₹', 'netPayable'], ['Kitting Date', 'kittingDate']
    ],
    historyColumns: [
      ['Purchase Closure ID', 'purchaseClosureId'], ['Lift No', 'liftNo'], ['Pending Lift MT', 'remainingAfterLiftMT'], ['Full Kitting ID', 'fullKittingId'], ['PO/DO Number', 'poDoNumber|poNumber|doNumber'], 
      ['Indent No', 'indentNo'], ['Closure Date', 'closureDate'], ['Purchase Type', 'purchaseType'], 
      ['Vendor/Agency Name', 'vendorName|agencyName'], ['Lot No', 'lotNo'], ['Batch No', 'batchNo'], 
      ['Net Qty Added MT', 'netQty'], ['Warehouse', 'warehouse'], ['Go-down', 'godown'], 
      ['Quality Grade', 'qualityGrade'], ['Moisture %', 'moisture'], ['Total Landed Cost ₹', 'totalLandedCost'], 
      ['Valuation Rate ₹/MT', 'valuationRate'], ['Status', 'closureStatus']
    ],
    fields: [
      { name: 'purchaseClosureId', label: 'Purchase Closure ID', type: 'text', readOnly: true },
      { name: 'closureDate', label: 'Closure Date', type: 'date' },
      { name: 'purchaseType', label: 'Purchase Type', type: 'text', readOnly: true },
      { name: 'netQty', label: 'Net Qty MT', type: 'number' },
      { name: 'warehouse', label: 'Warehouse Location', type: 'text' },
      { name: 'godown', label: 'Go-down', type: 'text' },
      { name: 'binRack', label: 'Bin / Rack', type: 'text' },
      { name: 'lotNo', label: 'Lot No', type: 'text', readOnly: true },
      { name: 'batchNo', label: 'Batch No', type: 'text', readOnly: true },
      { name: 'qualityGrade', label: 'Quality Grade', type: 'text', readOnly: true },
      { name: 'moisture', label: 'Moisture at Receipt %', type: 'number', readOnly: true },
      { name: 'totalPurchaseValue', label: 'Total Purchase Value ₹', type: 'number', readOnly: true },
      { name: 'freightCost', label: 'Freight Cost ₹', type: 'number', readOnly: true },
      { name: 'totalLandedCost', label: 'Total Landed Cost ₹', type: 'number', readOnly: true },
      { name: 'valuationRate', label: 'Valuation Rate ₹/MT', type: 'number', readOnly: true },
      { name: 'govtCharges', label: 'Total Govt Charges ₹', type: 'number', condition: 'Government' },
      { name: 'brokerCommission', label: 'Total Broker Commission ₹', type: 'number', condition: 'Market' },
      { name: 'updatedBy', label: 'Inventory Updated By', type: 'text' },
      { name: 'remarks', label: 'Storage Remarks', type: 'text' },
      { name: 'closureStatus', label: 'Closure Status', type: 'select', options: ['Complete', 'Partial'] }
    ]
  }
];

const template = (stage, isStage1) => `import React, { useState, useEffect } from 'react';
import { Search, Plus, Filter, Clock, History as HistoryIcon } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input, Label, Select } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Modal } from '../../components/ui/Modal';
import { WorkflowNavigation } from '../../components/WorkflowNavigation';

const getVal = (item, keyStr) => {
  if (!keyStr) return '-';
  const keys = keyStr.split('|');
  for (let k of keys) {
    if (item[k]) return item[k];
  }
  return '-';
};

export const ${stage.file.replace('.jsx', '')} = () => {
  const getInitialData = () => {
    let masterData = JSON.parse(localStorage.getItem('purchase_master_v3')) || [];
    
    const resolveItems = (rawArray) => {
      return rawArray.map(item => typeof item === 'number' ? masterData.find(m => m.id === item) : item).filter(Boolean);
    };

    ${isStage1 ? `
    // Dummy Data seeding across all stages using Normalized Storage to save quota
    let rawHistory = JSON.parse(localStorage.getItem('purchase_3_1_history'));
    
    if (!rawHistory || rawHistory.length === 0) {
      const dummyDataArray = [];
      // Generate 40 items (reduced from 280 to fix slow first-load)
      for (let i = 1; i <= 40; i++) {
        const pReq = "PRQ-" + i.toString().padStart(4, '0');
        const pInd = "IND-" + i.toString().padStart(4, '0');
        const pPo = "PO-" + i.toString().padStart(4, '0');
        const pType = i % 2 === 0 ? 'Government' : 'Market';
        
        dummyDataArray.push({
          id: i, requirementNo: pReq, requirementDate: '2023-10-15', purchaseType: pType, targetMandi: 'Karnal Mandi', mktPaddyGrade: 'Basmati 1121', mktQtyMT: 300 + i*10, budgetRate: 3500, brokerName: 'Ramesh Trading', brokerCode: 'BRK-045', requiredByDate: '2023-11-05', requestedBy: 'Admin', department: 'Procurement', status: 'Processed',
          indentNo: pInd, indentDate: '2023-10-16', mandiName: 'Karnal Mandi', supplierName: 'Kisan Traders', paddyVariety: 'Basmati', mktSeason: 'Kharif', mktRate: 3450, commission: 2, brokerage: 1, loadingCharges: 500, hamaliCharges: 200, otherCharges: 100,
          approvalId: "APR-" + i.toString().padStart(4, '0'), approvalDate: '2023-10-17', approvedBy: 'Manager', approvedQtyMT: 300 + i*10, approvedRate: 3450, approvedTotalValue: 1035000, priorityLevel: 'High', approvalStatus: 'Approved',
          poNumber: pPo, poDate: '2023-10-18', poValidity: '2023-11-18', vendorName: 'Kisan Traders', vendorPhone: '9876543210', vendorId: 'PAN12345', qtyMT: 300 + i*10, rate: 3450, totalValue: 1035000, paymentTerms: 'Net 30', deliveryTerms: 'FOB',
          logisticsId: "LOG-" + i.toString().padStart(4, '0'), vehicleNumber: 'HR-45-A-1234', vehicleType: 'Truck', driverName: 'Raju', transporterName: 'Speedy Transport', route: 'Karnal -> Mill', distance: 50, expectedDeparture: '2023-10-19', expectedArrival: '2023-10-20', freightRate: 500, totalFreight: 10000, advanceDriver: 2000,
          poEntryId: "POE-" + i.toString().padStart(4, '0'), entryDate: '2023-10-20', mandiLocation: 'Karnal', auctionSlot: 'A-12', commissionAmt: 20700, lotNumbers: "LOT-K-" + i, noOfBags: 600, grossWeightSource: 30000, moistureSource: 17.5, paddyGradeVerified: 'Basmati 1121', recordedBy: 'Gate Keeper',
          advancePaymentId: "ADV-" + i.toString().padStart(4, '0'), paymentDate: '2023-10-21', payeeName: 'Kisan Traders', bankAccount: 'AC123456', advanceAmount: 50000, paymentMode: 'NEFT', utrNo: 'UTR98765', tdsAmount: 500, netAmount: 49500, paidBy: 'Finance',
          liftId: "LIFT-" + i.toString().padStart(4, '0'), liftDate: '2023-10-22T08:00', grossWeight: 30000, tareWeight: 10000, netWeight: 20000, moisture: 17.4, liftedFrom: 'Karnal Godown', supervisor: 'Amit',
          weighSlipNo: "WB-" + i.toString().padStart(4, '0'), weighDate: '2023-10-22T14:00', weighbridgeId: 'WB-A1', operator: 'Suresh', varianceKg: 0, variancePct: 0,
          grnNo: "GRN-" + i.toString().padStart(4, '0'), grnDate: '2023-10-22', warehouse: 'WH-1', godown: 'G-1', lotNo: "LT-" + i.toString().padStart(4, '0'), batchNo: "BT-" + i.toString().padStart(4, '0'), receivedQty: 20000, expectedQty: 20000, shortage: 0, excess: 0, receivedBy: 'Store Keeper',
          labReportId: "LAB-" + i.toString().padStart(4, '0'), labName: 'Internal QC', testDate: '2023-10-23', broken: 2, paddyGradeResult: 'A', recovery: 68, technician: 'Dr. Singh', labResult: 'Pass', approved: 'Yes',
          accountsVerificationId: "AV-" + i.toString().padStart(4, '0'), verificationDate: '2023-10-24', supplierBillAmt: 690000, brokerCommission: 13800, freightAmount: 10000, advancePaid: 50000, balancePayable: 666500, paymentStatus: 'Paid', netPayable: 666500, verifiedBy: 'Accounts Dept',
          fullKittingId: "FK-" + i.toString().padStart(4, '0'), challanNo: "CHL-" + i.toString().padStart(4, '0'), kittingDate: '2023-10-25', farmerName: 'Ramesh Farmer', totalAmount: 690000,
          purchaseClosureId: "PC-" + i.toString().padStart(4, '0'), closureDate: '2023-10-26', netQty: 20, qualityGrade: 'A', totalPurchaseValue: 690000, totalLandedCost: 715000, valuationRate: 35750, closureStatus: 'Complete',
          // Gov Specific Fields
          procurementRef: "PROC-Gov-" + (100+i), govPaddyGrade: 'Grade A', govQtyMT: 500, mspRate: 2203, targetSeason: 'Kharif 2023', agencyName: 'FCI', season: 'Kharif 2023', mandatedRate: 2203, allocationRef: "ALLOC-" + i, doNo: "DO-FCI-" + i
        });
      }
      
      // Store full objects ONCE to save memory limit
      localStorage.setItem('purchase_master_v3', JSON.stringify(dummyDataArray));
      masterData = dummyDataArray;
      
      // Inject only IDs into all stages via mathematical slices
      for(let i=1; i<=14; i++) {
        const numItems = Math.max(2, Math.round(40 * (15 - i) / 14)); 
        const ids = Array.from({length: numItems}, (_, index) => index + 1);
        localStorage.setItem(\`purchase_\${i}_history\`, JSON.stringify(ids));
      }
      
      rawHistory = Array.from({length: 40}, (_, index) => index + 1);
    }
    
    return { pending: [], history: resolveItems(rawHistory) };
    ` : `
    const rawPending = JSON.parse(localStorage.getItem('${stage.readFrom}')) || [];
    const rawHistory = JSON.parse(localStorage.getItem('${stage.storageKey}')) || [];
    
    const pending = resolveItems(rawPending);
    const history = resolveItems(rawHistory);
    
    const historyIds = history.map(h => h.id);
    const unresolvedPending = pending.filter(p => !historyIds.includes(p.id));
    
    return { pending: unresolvedPending, history };
    `}
  };

  const initial = getInitialData();
  const [items, setItems] = useState(initial.pending);
  const [historyItems, setHistoryItems] = useState(initial.history);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedType, setSelectedType] = useState('All');
  const [activeTab, setActiveTab] = useState('${isStage1 ? 'history' : 'pending'}');

  const handleAction = (item, type = 'Market') => {
    const autoGen = !item.requirementNo ? { requirementNo: 'REQ-2026-' + Math.floor(Math.random() * 10000) } : {};
    setFormData({ ...item, purchaseType: type, ...autoGen });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    const newItem = { ...formData, status: 'Processed' };
    if (!newItem.id) newItem.id = Date.now();
    
    // Save new item directly to raw history array
    const rawHistory = JSON.parse(localStorage.getItem('${stage.storageKey}')) || [];
    rawHistory.push(newItem);
    localStorage.setItem('${stage.storageKey}', JSON.stringify(rawHistory));
    
    setHistoryItems([...historyItems, newItem]);

    
    ${!isStage1 ? `
    const remainingItems = items.filter(i => i.id !== formData.id);
    setItems(remainingItems);
    ` : ''}
    
    setIsModalOpen(false);
    setFormData({});
  };

  const getRowClass = (type) => {
    if (type === 'Domestic' || type === 'Government') return 'bg-blue-50/50 hover:bg-blue-100/60 transition-colors border-l-4 border-l-blue-400';
    if (type === 'Export' || type === 'Market') return 'bg-emerald-50/50 hover:bg-emerald-100/60 transition-colors border-l-4 border-l-emerald-400';
    return 'hover:bg-slate-50 transition-colors';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">${stage.title}</h1>
          <p className="text-slate-500">Manage ${stage.title.toLowerCase()}</p>
        </div>
        ${isStage1 ? `
        <div className="flex gap-3">
          <Button onClick={() => handleAction({}, 'Market')} className="bg-amber-600 hover:bg-amber-700">
            <Plus className="w-4 h-4 mr-2" />
            Market Requirement
          </Button>
          <Button onClick={() => handleAction({}, 'Government')} className="bg-indigo-600 hover:bg-indigo-700">
            <Plus className="w-4 h-4 mr-2" />
            Govt Requirement
          </Button>
        </div>` : ''}
      </div>

      <div className="border-b border-slate-200 mb-6">
        <div className="flex gap-6">
          ${!isStage1 ? `
          <button 
            onClick={() => setActiveTab('pending')}
            className={\`pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 \${
              activeTab === 'pending' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }\`}
          >
            <Clock className="w-4 h-4" />
            Pending Action
          </button>
          ` : ''}
          <button 
            onClick={() => setActiveTab('history')}
            className={\`pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 \${
              activeTab === 'history' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }\`}
          >
            <HistoryIcon className="w-4 h-4" />
            History / Completed
          </button>
        </div>
      </div>

      <Card className="p-0 border-0 shadow-sm ring-1 ring-slate-200 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white">
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <Input className="pl-9 bg-slate-50 border-slate-200" placeholder="Search..." />
          </div>
          ${!isStage1 ? `
          <Select 
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-48 bg-slate-50 border-slate-200"
          >
            <option value="All">All Types</option>
            <option value="Market">Market (Mkt)</option>
            <option value="Government">Government (Gov)</option>
          </Select>
          ` : ''}
        </div>
        
        <div className="overflow-x-auto bg-white">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-slate-600 bg-slate-50 uppercase tracking-wide border-b border-slate-200">
              <tr>
                {activeTab === 'pending' ? (
                  <>
                    ${!isStage1 ? stage.pendingColumns.map(col => `<th className="px-6 py-4 font-bold">${col[0]}</th>`).join('\n                    ') : ''}
                  </>
                ) : (
                  <>
                    ${stage.historyColumns.map(col => `<th className="px-6 py-4 font-bold">${col[0]}</th>`).join('\n                    ')}
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {activeTab === 'pending' && (
                <>
                  {items
                    .filter(item => selectedType === 'All' || item.purchaseType === selectedType)
                    .map((item, index) => (
                    <tr key={index} className={getRowClass(item.orderType || item.purchaseType)}>
                      <td className="px-6 py-4">
                        <Button 
                          onClick={() => handleAction(item, item.purchaseType)}
                          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-4 py-2 text-xs rounded-md shadow-sm font-medium"
                        >
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                          Process
                        </Button>
                      </td>
                      ${!isStage1 ? stage.pendingColumns.slice(1).map(col => `<td className="px-6 py-4 font-medium text-slate-700">{getVal(item, '${col[1]}')}</td>`).join('\n                      ') : ''}
                    </tr>
                  ))}
                  {items.length === 0 && (
                    <tr><td colSpan="${!isStage1 ? stage.pendingColumns.length : 1}" className="px-6 py-12 text-center text-slate-500">No pending records found</td></tr>
                  )}
                </>
              )}
              
              {activeTab === 'history' && (
                <>
                  {historyItems.map((item, index) => (
                    <tr key={index} className={getRowClass(item.orderType || item.purchaseType)}>
                      ${stage.historyColumns.map(col => `<td className="px-6 py-4 font-medium text-slate-700">{getVal(item, '${col[1]}')}</td>`).join('\n                      ')}
                    </tr>
                  ))}
                  {historyItems.length === 0 && (
                    <tr><td colSpan="${stage.historyColumns.length}" className="px-6 py-12 text-center text-slate-500">No history records found</td></tr>
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={\`${stage.title} Details\`}
        size="4xl"
      >
        <div className="max-h-[85vh] overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            ${stage.fields.map(f => {
              const isRO = !!f.readOnly;
              const inputClass = isRO
                ? "'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'"
                : "'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'";
                
              let fieldWrapper = `<div className="space-y-1">`;
              let endWrapper = `</div>`;
              
              if (f.condition === 'Government') {
                fieldWrapper = `{formData.purchaseType === 'Government' && (\n              <div className="space-y-1">`;
                endWrapper = `</div>\n              )}`;
              } else if (f.condition === 'Market') {
                fieldWrapper = `{formData.purchaseType === 'Market' && (\n              <div className="space-y-1">`;
                endWrapper = `</div>\n              )}`;
              }

              if (f.type === 'select') {
                return `
            ${fieldWrapper}
              <Label className="text-sm font-medium text-slate-700">${f.label}</Label>
              <Select 
                value={formData.${f.name} || ''} 
                onChange={(e) => setFormData({...formData, ${f.name}: e.target.value})}
                disabled={${isRO}}
                className={${inputClass}}
              >
                <option value="">Select...</option>
                ${f.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
              </Select>
            ${endWrapper}`;
              } else {
                return `
            ${fieldWrapper}
              <Label className="text-sm font-medium text-slate-700">${f.label}</Label>
              <Input 
                type="${f.type}"
                value={formData.${f.name} || ''} 
                onChange={(e) => setFormData({...formData, ${f.name}: e.target.value})}
                readOnly={${isRO}}
                className={${inputClass}}
              />
            ${endWrapper}`;
              }
            }).join('')}
          </div>

          <div className="flex justify-end gap-3 pt-8 mt-8 border-t border-slate-100">
            <Button onClick={() => setIsModalOpen(false)} variant="outline" className="px-6">
              Cancel
            </Button>
            <Button onClick={handleSave} className="px-6 bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
              Save Details
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
`;

// Write Stages 1-14
stages.forEach((stage, i) => {
  const filePath = path.join(__dirname, 'src/modules/purchase', stage.file);
  fs.writeFileSync(filePath, template(stage, i === 0));
  console.log('Created ' + stage.file);
});
