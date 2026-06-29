const fs = require('fs');
const path = require('path');

const stages = [
  {
    file: 'AccountsPayable.jsx', name: 'AccountsPayable', title: 'Stage 2 - Accounts Payable', action: 'Process AP', modalTitle: 'AP Details',
    pendingCols: [
      { header: 'Purchase Closure ID', accessor: 'closureId' }, { header: 'PR Number', accessor: 'prNumber' },
      { header: 'PO Number', accessor: 'poNumber' }, { header: 'Vendor/Farmer Name', accessor: 'vendorName' },
      { header: 'Net Qty (MT)', accessor: 'netQty' }, { header: 'Final Purchase Rate (₹/Qt)', accessor: 'purchaseRate' },
      { header: 'Total Purchase Value (₹)', accessor: 'purchaseValue' }, { header: 'Closure Date', accessor: 'closureDate' }
    ],
    historyCols: [
      { header: 'AP ID', accessor: 'apId' }, { header: 'Purchase Closure ID', accessor: 'closureId' },
      { header: 'PO Number', accessor: 'poNumber' }, { header: 'PR Number', accessor: 'prNumber' },
      { header: 'Vendor Name', accessor: 'vendorName' }, { header: 'Bill No', accessor: 'billNo' },
      { header: 'Bill Date', accessor: 'billDate' }, { header: 'Bill Amount (₹)', accessor: 'billAmount' },
      { header: 'TDS (₹)', accessor: 'tdsAmount' }, { header: 'Net Payable (₹)', accessor: 'netPayable' },
      { header: 'Due Date', accessor: 'dueDate' }, { header: 'Amount Paid (₹)', accessor: 'amountPaid' },
      { header: 'Outstanding (₹)', accessor: 'outstanding' }, { header: 'Status', accessor: 'paymentStatus' }
    ],
    fields: [
      { label: 'Purchase Closure ID', name: 'closureId', type: 'text', readOnly: true },
      { label: 'PO Number', name: 'poNumber', type: 'text', readOnly: true },
      { label: 'PR Number', name: 'prNumber', type: 'text', readOnly: true },
      { label: 'AP ID', name: 'apId', type: 'text', readOnly: true },
      { label: 'Vendor Name', name: 'vendorName', type: 'text', readOnly: true },
      { label: 'Vendor Phone', name: 'vendorPhone', type: 'text' },
      { label: 'Vendor Bank Account No', name: 'vendorBankAcc', type: 'text' },
      { label: 'Vendor IFSC', name: 'vendorIfsc', type: 'text' },
      { label: 'Bill No', name: 'billNo', type: 'text' },
      { label: 'Bill Date', name: 'billDate', type: 'date' },
      { label: 'Bill Amount (₹)', name: 'billAmount', type: 'number' },
      { label: 'TDS Rate (%)', name: 'tdsRate', type: 'number' },
      { label: 'TDS Amount (₹)', name: 'tdsAmount', type: 'number', readOnly: true },
      { label: 'Net Payable (₹)', name: 'netPayable', type: 'number', readOnly: true },
      { label: 'Due Date', name: 'dueDate', type: 'date' },
      { label: 'Amount Paid (₹)', name: 'amountPaid', type: 'number' },
      { label: 'Outstanding (₹)', name: 'outstanding', type: 'number', readOnly: true },
      { label: 'Status', name: 'paymentStatus', type: 'select', options: ['Unpaid', 'Partial', 'Paid'] },
      { label: 'Remarks', name: 'remarks', type: 'text' }
    ]
  },
  {
    file: 'VendorPayments.jsx', name: 'VendorPayments', title: 'Stage 3 - Vendor Payments', action: 'Pay Vendor', modalTitle: 'Payment Details',
    pendingCols: [
      { header: 'AP ID', accessor: 'apId' }, { header: 'PO Number', accessor: 'poNumber' },
      { header: 'PR Number', accessor: 'prNumber' }, { header: 'Vendor Name', accessor: 'vendorName' },
      { header: 'Bill No', accessor: 'billNo' }, { header: 'Bill Amount (₹)', accessor: 'billAmount' },
      { header: 'TDS (₹)', accessor: 'tdsAmount' }, { header: 'Net Payable (₹)', accessor: 'netPayable' },
      { header: 'Outstanding (₹)', accessor: 'outstanding' }, { header: 'Due Date', accessor: 'dueDate' },
      { header: 'Status', accessor: 'paymentStatus' }
    ],
    historyCols: [
      { header: 'Payment ID', accessor: 'paymentId' }, { header: 'AP ID', accessor: 'apId' },
      { header: 'PO Number', accessor: 'poNumber' }, { header: 'Vendor Name', accessor: 'vendorName' },
      { header: 'Bill Ref', accessor: 'billRef' }, { header: 'Amount Paid (₹)', accessor: 'amountPaid' },
      { header: 'TDS (₹)', accessor: 'tdsAmount' }, { header: 'Net Amount (₹)', accessor: 'netAmount' },
      { header: 'Payment Mode', accessor: 'paymentMode' }, { header: 'UTR/Cheque No', accessor: 'utrNo' },
      { header: 'Payment Date', accessor: 'paymentDate' }, { header: 'Paid By', accessor: 'paidBy' }
    ],
    fields: [
      { label: 'AP ID', name: 'apId', type: 'text', readOnly: true },
      { label: 'PO Number', name: 'poNumber', type: 'text', readOnly: true },
      { label: 'Payment ID', name: 'paymentId', type: 'text', readOnly: true },
      { label: 'Payment Date', name: 'paymentDate', type: 'date' },
      { label: 'Vendor Name', name: 'vendorName', type: 'text', readOnly: true },
      { label: 'Vendor Bank Account No', name: 'vendorBankAcc', type: 'text', readOnly: true },
      { label: 'Vendor IFSC', name: 'vendorIfsc', type: 'text', readOnly: true },
      { label: 'Bill Reference', name: 'billRef', type: 'text', readOnly: true },
      { label: 'Amount Being Paid (₹)', name: 'amountPaid', type: 'number' },
      { label: 'TDS Deducted (₹)', name: 'tdsAmount', type: 'number', readOnly: true },
      { label: 'Net Amount (₹)', name: 'netAmount', type: 'number', readOnly: true },
      { label: 'Payment Mode', name: 'paymentMode', type: 'select', options: ['NEFT', 'RTGS', 'Cheque', 'Cash'] },
      { label: 'Bank Name', name: 'bankName', type: 'text' },
      { label: 'Bank Account No (Payer)', name: 'payerBankAcc', type: 'text' },
      { label: 'UTR/Cheque No', name: 'utrNo', type: 'text' },
      { label: 'Cheque Date', name: 'chequeDate', type: 'date' },
      { label: 'Paid By', name: 'paidBy', type: 'text' },
      { label: 'Approval Reference', name: 'approvalRef', type: 'text' }
    ]
  },
  {
    file: 'TransporterPayments.jsx', name: 'TransporterPayments', title: 'Stage 4 - Transporter Payments', action: 'Pay Transporter', modalTitle: 'Transporter Payment Details',
    pendingCols: [
      { header: 'Loading ID', accessor: 'loadingId' }, { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' },
      { header: 'Vehicle Number', accessor: 'vehicleNumber' }, { header: 'Transporter Name', accessor: 'transporterName' },
      { header: 'Transporter GSTIN', accessor: 'transporterGst' }, { header: 'Route', accessor: 'route' },
      { header: 'Total Loaded Weight (MT)', accessor: 'weightLoaded' }, { header: 'Freight Rate (₹/MT)', accessor: 'freightRate' },
      { header: 'Total Freight (₹)', accessor: 'totalFreight' }, { header: 'Expected Delivery Date', accessor: 'expectedDelivery' }
    ],
    historyCols: [
      { header: 'Payment ID', accessor: 'paymentId' }, { header: 'Loading ID', accessor: 'loadingId' },
      { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' }, { header: 'Transporter Name', accessor: 'transporterName' },
      { header: 'Trip Ref', accessor: 'tripRef' }, { header: 'Freight Amount (₹)', accessor: 'freightAmount' },
      { header: 'Advance Paid (₹)', accessor: 'advancePaid' }, { header: 'TDS (₹)', accessor: 'tdsAmount' },
      { header: 'Net Payable (₹)', accessor: 'netPayable' }, { header: 'Payment Mode', accessor: 'paymentMode' },
      { header: 'UTR/Cheque No', accessor: 'utrNo' }, { header: 'Payment Date', accessor: 'paymentDate' },
      { header: 'Paid By', accessor: 'paidBy' }
    ],
    fields: [
      { label: 'Loading ID', name: 'loadingId', type: 'text', readOnly: true },
      { label: 'Dispatch Order No', name: 'dispatchOrderNo', type: 'text', readOnly: true },
      { label: 'Transporter Name', name: 'transporterName', type: 'text', readOnly: true },
      { label: 'Transporter GSTIN', name: 'transporterGst', type: 'text', readOnly: true },
      { label: 'Payment ID', name: 'paymentId', type: 'text', readOnly: true },
      { label: 'Payment Date', name: 'paymentDate', type: 'date' },
      { label: 'Trip Reference', name: 'tripRef', type: 'text', readOnly: true },
      { label: 'Freight Amount (₹)', name: 'freightAmount', type: 'number', readOnly: true },
      { label: 'Advance Already Paid (₹)', name: 'advancePaid', type: 'number' },
      { label: 'Balance Payable (₹)', name: 'balancePayable', type: 'number', readOnly: true },
      { label: 'TDS Rate (%)', name: 'tdsRate', type: 'number' },
      { label: 'TDS Deducted (₹)', name: 'tdsAmount', type: 'number', readOnly: true },
      { label: 'Net Payable (₹)', name: 'netPayable', type: 'number', readOnly: true },
      { label: 'Payment Mode', name: 'paymentMode', type: 'select', options: ['NEFT', 'RTGS', 'Cheque', 'Cash'] },
      { label: 'Bank Name', name: 'bankName', type: 'text' },
      { label: 'UTR/Cheque No', name: 'utrNo', type: 'text' },
      { label: 'Paid By', name: 'paidBy', type: 'text' },
      { label: 'Remarks', name: 'remarks', type: 'text' }
    ]
  },
  {
    file: 'AgentCommission.jsx', name: 'AgentCommission', title: 'Stage 5 - Agent Commission', action: 'Pay Agent', modalTitle: 'Agent Commission Details',
    pendingCols: [
      { header: 'PR Number', accessor: 'prNumber' }, { header: 'PO Number', accessor: 'poNumber' },
      { header: 'Agent Name', accessor: 'agentName' }, { header: 'Agent ID', accessor: 'agentId' },
      { header: 'Agent Firm Name', accessor: 'agentFirm' }, { header: 'Mandi', accessor: 'mandi' },
      { header: 'Commission Type', accessor: 'commissionType' }, { header: 'Commission Rate', accessor: 'commissionRate' },
      { header: 'Total Qty (MT)', accessor: 'quantity' }, { header: 'Assignment Date', accessor: 'assignmentDate' }
    ],
    historyCols: [
      { header: 'Commission ID', accessor: 'commissionId' }, { header: 'PR Number', accessor: 'prNumber' },
      { header: 'PO Number', accessor: 'poNumber' }, { header: 'Agent Name', accessor: 'agentName' },
      { header: 'Agent ID', accessor: 'agentId' }, { header: 'Purchase Ref', accessor: 'purchaseRef' },
      { header: 'Commission Type', accessor: 'commissionType' }, { header: 'Commission Amount (₹)', accessor: 'commissionAmount' },
      { header: 'TDS (₹)', accessor: 'tdsAmount' }, { header: 'Net Payable (₹)', accessor: 'netPayable' },
      { header: 'Payment Date', accessor: 'paymentDate' }, { header: 'UTR/Cheque No', accessor: 'utrNo' },
      { header: 'Paid By', accessor: 'paidBy' }
    ],
    fields: [
      { label: 'PR Number', name: 'prNumber', type: 'text', readOnly: true },
      { label: 'PO Number', name: 'poNumber', type: 'text', readOnly: true },
      { label: 'Agent Name', name: 'agentName', type: 'text', readOnly: true },
      { label: 'Agent ID', name: 'agentId', type: 'text', readOnly: true },
      { label: 'Agent Bank Account No', name: 'agentBankAcc', type: 'text' },
      { label: 'Agent IFSC', name: 'agentIfsc', type: 'text' },
      { label: 'Commission ID', name: 'commissionId', type: 'text', readOnly: true },
      { label: 'Purchase Reference', name: 'purchaseRef', type: 'text', readOnly: true },
      { label: 'Commission Type', name: 'commissionType', type: 'text', readOnly: true },
      { label: 'Commission Rate', name: 'commissionRate', type: 'number', readOnly: true },
      { label: 'Total Quantity (MT)', name: 'quantity', type: 'number' },
      { label: 'Commission Amount (₹)', name: 'commissionAmount', type: 'number', readOnly: true },
      { label: 'TDS Rate (%)', name: 'tdsRate', type: 'number' },
      { label: 'TDS Deducted (₹)', name: 'tdsAmount', type: 'number', readOnly: true },
      { label: 'Net Payable (₹)', name: 'netPayable', type: 'number', readOnly: true },
      { label: 'Payment Date', name: 'paymentDate', type: 'date' },
      { label: 'Payment Mode', name: 'paymentMode', type: 'select', options: ['NEFT', 'RTGS', 'Cheque'] },
      { label: 'UTR/Cheque No', name: 'utrNo', type: 'text' },
      { label: 'Paid By', name: 'paidBy', type: 'text' }
    ]
  },
  {
    file: 'SalesCommission.jsx', name: 'SalesCommission', title: 'Stage 6 - Sales Commission', action: 'Pay Sales Agent', modalTitle: 'Sales Commission Details',
    pendingCols: [
      { header: 'Order Completion ID', accessor: 'completionId' }, { header: 'Order ID', accessor: 'orderId' },
      { header: 'Customer Name', accessor: 'customerName' }, { header: 'Rice Grade', accessor: 'riceGrade' },
      { header: 'Total Qty Supplied (MT)', accessor: 'quantity' }, { header: 'Total Value (₹)', accessor: 'totalValue' },
      { header: 'Completion Date', accessor: 'completionDate' }
    ],
    historyCols: [
      { header: 'Commission ID', accessor: 'commissionId' }, { header: 'Order ID', accessor: 'orderId' },
      { header: 'Customer Name', accessor: 'customerName' }, { header: 'Sales Agent Name', accessor: 'agentName' },
      { header: 'Commission Type', accessor: 'commissionType' }, { header: 'Commission Amount (₹)', accessor: 'commissionAmount' },
      { header: 'TDS (₹)', accessor: 'tdsAmount' }, { header: 'Net Payable (₹)', accessor: 'netPayable' },
      { header: 'Payment Date', accessor: 'paymentDate' }, { header: 'UTR/Cheque No', accessor: 'utrNo' }
    ],
    fields: [
      { label: 'Order Completion ID', name: 'completionId', type: 'text', readOnly: true },
      { label: 'Order ID', name: 'orderId', type: 'text', readOnly: true },
      { label: 'Commission ID', name: 'commissionId', type: 'text', readOnly: true },
      { label: 'Sales Agent Name', name: 'agentName', type: 'text' },
      { label: 'Sales Agent ID', name: 'agentId', type: 'text' },
      { label: 'Commission Type', name: 'commissionType', type: 'select', options: ['% of Sales', 'Fixed ₹/MT'] },
      { label: 'Commission Rate', name: 'commissionRate', type: 'number' },
      { label: 'Total Sales Value (₹)', name: 'totalValue', type: 'number', readOnly: true },
      { label: 'Commission Amount (₹)', name: 'commissionAmount', type: 'number', readOnly: true },
      { label: 'TDS Rate (%)', name: 'tdsRate', type: 'number' },
      { label: 'TDS Deducted (₹)', name: 'tdsAmount', type: 'number', readOnly: true },
      { label: 'Net Payable (₹)', name: 'netPayable', type: 'number', readOnly: true },
      { label: 'Payment Date', name: 'paymentDate', type: 'date' },
      { label: 'Payment Mode', name: 'paymentMode', type: 'select', options: ['NEFT', 'RTGS', 'Cheque'] },
      { label: 'UTR/Cheque No', name: 'utrNo', type: 'text' },
      { label: 'Paid By', name: 'paidBy', type: 'text' }
    ]
  },
  {
    file: 'PurchaseCommission.jsx', name: 'PurchaseCommission', title: 'Stage 7 - Purchase Commission (Summary)', action: 'Summarize', modalTitle: 'Purchase Commission Summary',
    pendingCols: [
      { header: 'Commission ID', accessor: 'commissionId' }, { header: 'PR Number', accessor: 'prNumber' },
      { header: 'PO Number', accessor: 'poNumber' }, { header: 'Agent Name', accessor: 'agentName' },
      { header: 'Commission Amount (₹)', accessor: 'commissionAmount' }, { header: 'TDS (₹)', accessor: 'tdsAmount' },
      { header: 'Net Payable (₹)', accessor: 'netPayable' }, { header: 'Payment Date', accessor: 'paymentDate' }
    ],
    historyCols: [
      { header: 'Purchase Commission ID', accessor: 'pcId' }, { header: 'Period', accessor: 'period' },
      { header: 'Total Purchases (₹)', accessor: 'totalPurchases' }, { header: 'Total Commission Paid (₹)', accessor: 'totalCommission' },
      { header: 'Commission %', accessor: 'commissionPercent' }, { header: 'No. of Transactions', accessor: 'noOfTransactions' },
      { header: 'Prepared By', accessor: 'preparedBy' }, { header: 'Date', accessor: 'summaryDate' }
    ],
    fields: [
      { label: 'Commission ID', name: 'commissionId', type: 'text', readOnly: true },
      { label: 'PR Number', name: 'prNumber', type: 'text', readOnly: true },
      { label: 'PO Number', name: 'poNumber', type: 'text', readOnly: true },
      { label: 'Purchase Commission ID', name: 'pcId', type: 'text', readOnly: true },
      { label: 'Period', name: 'period', type: 'select', options: ['Month', 'Quarter', 'Year'] },
      { label: 'Total Purchases (₹)', name: 'totalPurchases', type: 'number' },
      { label: 'Total Commission Paid (₹)', name: 'totalCommission', type: 'number', readOnly: true },
      { label: 'Commission % on Total Purchase', name: 'commissionPercent', type: 'number', readOnly: true },
      { label: 'No. of Purchase Transactions', name: 'noOfTransactions', type: 'number' },
      { label: 'Summary Prepared By', name: 'preparedBy', type: 'text' },
      { label: 'Remarks', name: 'remarks', type: 'text' }
    ]
  },
  {
    file: 'BrokerCommission.jsx', name: 'BrokerCommission', title: 'Stage 8 - Broker Commission', action: 'Pay Broker', modalTitle: 'Broker Commission Details',
    pendingCols: [
      { header: 'Contract No', accessor: 'contractNo' }, { header: 'Contract Date', accessor: 'contractDate' },
      { header: 'Buyer Name', accessor: 'buyerName' }, { header: 'Buyer Country', accessor: 'buyerCountry' },
      { header: 'Rice Grade', accessor: 'riceGrade' }, { header: 'Quantity (MT)', accessor: 'quantity' },
      { header: 'Total Contract Value ($)', accessor: 'contractValueUsd' }, { header: 'Payment Terms', accessor: 'paymentTerms' }
    ],
    historyCols: [
      { header: 'Broker Commission ID', accessor: 'bcId' }, { header: 'Contract No', accessor: 'contractNo' },
      { header: 'Buyer Name', accessor: 'buyerName' }, { header: 'Broker Name', accessor: 'brokerName' },
      { header: 'Commission Type', accessor: 'commissionType' }, { header: 'Commission Amount ($)', accessor: 'commissionUsd' },
      { header: 'INR Equivalent (₹)', accessor: 'inrEquivalent' }, { header: 'TDS (₹)', accessor: 'tdsAmount' },
      { header: 'Net Payable (₹)', accessor: 'netPayable' }, { header: 'Payment Date', accessor: 'paymentDate' },
      { header: 'SWIFT/UTR Ref', accessor: 'swiftRef' }
    ],
    fields: [
      { label: 'Contract No', name: 'contractNo', type: 'text', readOnly: true },
      { label: 'Broker Commission ID', name: 'bcId', type: 'text', readOnly: true },
      { label: 'Broker Name', name: 'brokerName', type: 'text' },
      { label: 'Broker Firm', name: 'brokerFirm', type: 'text' },
      { label: 'Broker Country', name: 'brokerCountry', type: 'text' },
      { label: 'Commission Currency', name: 'currency', type: 'select', options: ['USD', 'INR'] },
      { label: 'Commission Type', name: 'commissionType', type: 'select', options: ['% of Contract', 'Fixed USD'] },
      { label: 'Commission Rate', name: 'commissionRate', type: 'number' },
      { label: 'Total Contract Value ($)', name: 'contractValueUsd', type: 'number', readOnly: true },
      { label: 'Commission Amount ($)', name: 'commissionUsd', type: 'number', readOnly: true },
      { label: 'Forex Rate (₹/$)', name: 'forexRate', type: 'number' },
      { label: 'INR Equivalent (₹)', name: 'inrEquivalent', type: 'number', readOnly: true },
      { label: 'TDS (₹, if applicable)', name: 'tdsAmount', type: 'number' },
      { label: 'Net Payable (₹)', name: 'netPayable', type: 'number', readOnly: true },
      { label: 'Payment Date', name: 'paymentDate', type: 'date' },
      { label: 'Payment Mode', name: 'paymentMode', type: 'select', options: ['Wire Transfer', 'NEFT'] },
      { label: 'SWIFT/UTR Reference', name: 'swiftRef', type: 'text' },
      { label: 'Paid By', name: 'paidBy', type: 'text' }
    ]
  },
  {
    file: 'ExportPaymentTracking.jsx', name: 'ExportPaymentTracking', title: 'Stage 9 - Export Payment Tracking', action: 'Track Export', modalTitle: 'Export Payment Tracking Details',
    pendingCols: [
      { header: 'Payment ID', accessor: 'paymentId' }, { header: 'Export Invoice No', accessor: 'invoiceNo' },
      { header: 'Contract No', accessor: 'contractNo' }, { header: 'Buyer Name', accessor: 'buyerName' },
      { header: 'Buyer Country', accessor: 'buyerCountry' }, { header: 'Amount Received ($)', accessor: 'receivedUsd' },
      { header: 'INR Equivalent (₹)', accessor: 'inrEquivalent' }, { header: 'Forex Rate', accessor: 'forexRate' },
      { header: 'FIRC No', accessor: 'fircNo' }, { header: 'Outstanding ($)', accessor: 'outstandingUsd' },
      { header: 'Payment Status', accessor: 'paymentStatus' }, { header: 'Receipt Date', accessor: 'receiptDate' }
    ],
    historyCols: [
      { header: 'Tracking ID', accessor: 'eptId' }, { header: 'Export Invoice No', accessor: 'invoiceNo' },
      { header: 'Contract No', accessor: 'contractNo' }, { header: 'Buyer Name', accessor: 'buyerName' },
      { header: 'Amount Received ($)', accessor: 'receivedUsd' }, { header: 'INR Equivalent (₹)', accessor: 'inrEquivalent' },
      { header: 'Forex Rate', accessor: 'forexRate' }, { header: 'FIRC No', accessor: 'fircNo' },
      { header: 'BRC No', accessor: 'brcNo' }, { header: 'Outstanding ($)', accessor: 'outstandingUsd' },
      { header: 'Reconciled', accessor: 'reconciled' }, { header: 'Reconciled By', accessor: 'reconciledBy' },
      { header: 'Reconciliation Date', accessor: 'reconciliationDate' }
    ],
    fields: [
      { label: 'Export Payment ID', name: 'paymentId', type: 'text', readOnly: true },
      { label: 'Export Invoice No', name: 'invoiceNo', type: 'text', readOnly: true },
      { label: 'Contract No', name: 'contractNo', type: 'text', readOnly: true },
      { label: 'Buyer Name', name: 'buyerName', type: 'text', readOnly: true },
      { label: 'Tracking ID', name: 'eptId', type: 'text', readOnly: true },
      { label: 'Receipt Date', name: 'receiptDate', type: 'date', readOnly: true },
      { label: 'Amount Received ($)', name: 'receivedUsd', type: 'number', readOnly: true },
      { label: 'Forex Rate', name: 'forexRate', type: 'number', readOnly: true },
      { label: 'INR Equivalent (₹)', name: 'inrEquivalent', type: 'number', readOnly: true },
      { label: 'FIRC No', name: 'fircNo', type: 'text', readOnly: true },
      { label: 'FIRC Date', name: 'fircDate', type: 'date' },
      { label: 'Bank', name: 'bankName', type: 'text', readOnly: true },
      { label: 'Outstanding ($)', name: 'outstandingUsd', type: 'number', readOnly: true },
      { label: 'Payment Status', name: 'paymentStatus', type: 'text', readOnly: true },
      { label: 'Bank Realization Certificate (BRC) No', name: 'brcNo', type: 'text' },
      { label: 'BRC Date', name: 'brcDate', type: 'date' },
      { label: 'BRC Amount ($)', name: 'brcAmount', type: 'number' },
      { label: 'Reconciled', name: 'reconciled', type: 'select', options: ['Y', 'N'] },
      { label: 'Reconciled By', name: 'reconciledBy', type: 'text' },
      { label: 'Reconciliation Date', name: 'reconciliationDate', type: 'date' },
      { label: 'Remarks', name: 'remarks', type: 'text' }
    ]
  },
  {
    file: 'DomesticPaymentTracking.jsx', name: 'DomesticPaymentTracking', title: 'Stage 10 - Domestic Payment Tracking', action: 'Track Domestic', modalTitle: 'Domestic Tracking Details',
    pendingCols: [
      { header: 'AR ID', accessor: 'arId' }, { header: 'Invoice No', accessor: 'invoiceNo' },
      { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' }, { header: 'Customer Name', accessor: 'customerName' },
      { header: 'Invoice Amount (₹)', accessor: 'invoiceAmount' }, { header: 'Payment Received (₹)', accessor: 'amountReceived' },
      { header: 'Outstanding (₹)', accessor: 'outstanding' }, { header: 'Days Overdue', accessor: 'daysOverdue' },
      { header: 'Payment Mode', accessor: 'paymentMode' }, { header: 'Status', accessor: 'status' }
    ],
    historyCols: [
      { header: 'Tracking ID', accessor: 'dptId' }, { header: 'AR ID', accessor: 'arId' },
      { header: 'Invoice No', accessor: 'invoiceNo' }, { header: 'Customer Name', accessor: 'customerName' },
      { header: 'Invoice Amount (₹)', accessor: 'invoiceAmount' }, { header: 'Outstanding (₹)', accessor: 'outstanding' },
      { header: 'Expected Payment Date', accessor: 'expectedPaymentDate' }, { header: 'Follow-up Date', accessor: 'followUpDate' },
      { header: 'Customer Response', accessor: 'customerResponse' }, { header: 'Promise to Pay Date', accessor: 'promiseToPayDate' },
      { header: 'Escalated', accessor: 'escalated' }, { header: 'Resolved', accessor: 'resolved' }
    ],
    fields: [
      { label: 'AR ID', name: 'arId', type: 'text', readOnly: true },
      { label: 'Invoice No', name: 'invoiceNo', type: 'text', readOnly: true },
      { label: 'Dispatch Order No', name: 'dispatchOrderNo', type: 'text', readOnly: true },
      { label: 'Customer Name', name: 'customerName', type: 'text', readOnly: true },
      { label: 'Tracking ID', name: 'dptId', type: 'text', readOnly: true },
      { label: 'Tracking Date', name: 'trackingDate', type: 'date' },
      { label: 'Invoice Amount (₹)', name: 'invoiceAmount', type: 'number', readOnly: true },
      { label: 'Total Received so far (₹)', name: 'amountReceived', type: 'number', readOnly: true },
      { label: 'Outstanding (₹)', name: 'outstanding', type: 'number', readOnly: true },
      { label: 'Expected Payment Date', name: 'expectedPaymentDate', type: 'date' },
      { label: 'Follow-up Done (Y/N)', name: 'followUpDone', type: 'select', options: ['Y', 'N'] },
      { label: 'Follow-up Date', name: 'followUpDate', type: 'date' },
      { label: 'Follow-up Mode', name: 'followUpMode', type: 'select', options: ['Call', 'Email', 'Visit'] },
      { label: 'Customer Response', name: 'customerResponse', type: 'text' },
      { label: 'Promise to Pay Date', name: 'promiseToPayDate', type: 'date' },
      { label: 'Escalated (Y/N)', name: 'escalated', type: 'select', options: ['Y', 'N'] },
      { label: 'Escalated To', name: 'escalatedTo', type: 'text' },
      { label: 'Resolved (Y/N)', name: 'resolved', type: 'select', options: ['Y', 'N'] },
      { label: 'Remarks', name: 'remarks', type: 'text' }
    ]
  },
  {
    file: 'ProfitAndLoss.jsx', name: 'ProfitAndLoss', title: 'Stage 11 - Profit & Loss', action: 'Generate P&L', modalTitle: 'Profit & Loss Statement Details',
    pendingCols: [
      { header: 'P&L ID', accessor: 'plId' }, { header: 'Period', accessor: 'period' },
      { header: 'Total Revenue (₹)', accessor: 'totalRevenue' }, { header: 'Total Cost (₹)', accessor: 'totalCost' },
      { header: 'Gross Profit (₹)', accessor: 'grossProfit' }, { header: 'Gross Margin %', accessor: 'grossMargin' },
      { header: 'EBITDA (₹)', accessor: 'ebitda' }, { header: 'Net Profit (₹)', accessor: 'netProfit' },
      { header: 'Net Margin %', accessor: 'netMargin' }, { header: 'Recovery %', accessor: 'recoveryPercent' },
      { header: 'Prepared By', accessor: 'preparedBy' }, { header: 'Created Date', accessor: 'createdDate' }
    ],
    historyCols: [
      { header: 'P&L ID', accessor: 'plId' }, { header: 'Period', accessor: 'period' },
      { header: 'Total Revenue (₹)', accessor: 'totalRevenue' }, { header: 'Total Cost (₹)', accessor: 'totalCost' },
      { header: 'Gross Profit (₹)', accessor: 'grossProfit' }, { header: 'Gross Margin %', accessor: 'grossMargin' },
      { header: 'EBITDA (₹)', accessor: 'ebitda' }, { header: 'Net Profit (₹)', accessor: 'netProfit' },
      { header: 'Net Margin %', accessor: 'netMargin' }, { header: 'Recovery %', accessor: 'recoveryPercent' },
      { header: 'Prepared By', accessor: 'preparedBy' }, { header: 'Created Date', accessor: 'createdDate' }
    ],
    fields: [
      { label: 'P&L ID', name: 'plId', type: 'text', readOnly: true },
      { label: 'Period Type', name: 'periodType', type: 'select', options: ['Monthly', 'Quarterly', 'Yearly'] },
      { label: 'Period', name: 'period', type: 'text', placeholder: 'e.g. Apr 2025–Mar 2026' },
      { label: 'Total Domestic Sales Revenue (₹)', name: 'domRevenue', type: 'number' },
      { label: 'Total Export Revenue (₹)', name: 'expRevenue', type: 'number' },
      { label: 'Total Revenue (₹)', name: 'totalRevenue', type: 'number', readOnly: true },
      { label: 'Total Purchase Cost (₹)', name: 'purchaseCost', type: 'number' },
      { label: 'Total Production Cost (₹)', name: 'productionCost', type: 'number' },
      { label: 'Total Packing Cost (₹)', name: 'packingCost', type: 'number' },
      { label: 'Total Domestic Transport Cost (₹)', name: 'domTransportCost', type: 'number' },
      { label: 'Total Export Freight Cost (₹)', name: 'expFreightCost', type: 'number' },
      { label: 'Total Agent Commission (₹)', name: 'agentComm', type: 'number' },
      { label: 'Total Sales Commission (₹)', name: 'salesComm', type: 'number' },
      { label: 'Total Broker Commission (₹)', name: 'brokerComm', type: 'number' },
      { label: 'Total Admin & Overhead (₹)', name: 'adminCost', type: 'number' },
      { label: 'Total Other Expenses (₹)', name: 'otherCost', type: 'number' },
      { label: 'Total Cost (₹)', name: 'totalCost', type: 'number', readOnly: true },
      { label: 'Gross Profit (₹)', name: 'grossProfit', type: 'number', readOnly: true },
      { label: 'Gross Margin %', name: 'grossMargin', type: 'number', readOnly: true },
      { label: 'EBITDA (₹)', name: 'ebitda', type: 'number', readOnly: true },
      { label: 'Depreciation (₹)', name: 'depreciation', type: 'number' },
      { label: 'EBIT (₹)', name: 'ebit', type: 'number', readOnly: true },
      { label: 'Interest Expense (₹)', name: 'interest', type: 'number' },
      { label: 'EBT (₹)', name: 'ebt', type: 'number', readOnly: true },
      { label: 'Tax (₹)', name: 'tax', type: 'number' },
      { label: 'Net Profit (₹)', name: 'netProfit', type: 'number', readOnly: true },
      { label: 'Net Margin %', name: 'netMargin', type: 'number', readOnly: true },
      { label: 'Recovery % (Paddy → Rice)', name: 'recoveryPercent', type: 'number' },
      { label: 'Yield %', name: 'yieldPercent', type: 'number' },
      { label: 'Prepared By', name: 'preparedBy', type: 'text' }
    ]
  },
  {
    file: 'BankReconciliation.jsx', name: 'BankReconciliation', title: 'Stage 12 - Bank Reconciliation', action: 'Reconcile', modalTitle: 'Bank Reconciliation Details',
    pendingCols: [
      { header: 'P&L ID', accessor: 'plId' }, { header: 'Period', accessor: 'period' },
      { header: 'Total Revenue (₹)', accessor: 'totalRevenue' }, { header: 'Total Cost (₹)', accessor: 'totalCost' },
      { header: 'Net Profit (₹)', accessor: 'netProfit' }, { header: 'Net Margin %', accessor: 'netMargin' },
      { header: 'Prepared By', accessor: 'preparedBy' }, { header: 'Created Date', accessor: 'createdDate' }
    ],
    historyCols: [
      { header: 'Recon ID', accessor: 'brId' }, { header: 'P&L ID', accessor: 'plId' },
      { header: 'Recon Date', accessor: 'reconDate' }, { header: 'Bank Name', accessor: 'bankName' },
      { header: 'Account No', accessor: 'accountNo' }, { header: 'Opening Balance (₹)', accessor: 'openingBal' },
      { header: 'Bank Closing Balance (₹)', accessor: 'bankClosingBal' }, { header: 'Book Closing Balance (₹)', accessor: 'bookClosingBal' },
      { header: 'Variance (₹)', accessor: 'variance' }, { header: 'Recon Status', accessor: 'reconStatus' },
      { header: 'Reconciled By', accessor: 'reconciledBy' }, { header: 'Verified By', accessor: 'verifiedBy' }
    ],
    fields: [
      { label: 'P&L ID', name: 'plId', type: 'text', readOnly: true },
      { label: 'Recon ID', name: 'brId', type: 'text', readOnly: true },
      { label: 'Recon Date', name: 'reconDate', type: 'date' },
      { label: 'Bank Name', name: 'bankName', type: 'text' },
      { label: 'Branch Name', name: 'branchName', type: 'text' },
      { label: 'Account No', name: 'accountNo', type: 'text' },
      { label: 'Account Type', name: 'accountType', type: 'select', options: ['Current', 'CC', 'OD'] },
      { label: 'Opening Balance (₹)', name: 'openingBal', type: 'number' },
      { label: 'Closing Balance as per Bank Statement (₹)', name: 'bankClosingBal', type: 'number' },
      { label: 'Closing Balance as per Books (₹)', name: 'bookClosingBal', type: 'number' },
      { label: 'Uncleared Cheques Issued (₹)', name: 'unclearedIssued', type: 'number' },
      { label: 'Cheques in Transit — Received (₹)', name: 'transitReceived', type: 'number' },
      { label: 'Deposits in Transit (₹)', name: 'depositsTransit', type: 'number' },
      { label: 'Bank Charges (₹)', name: 'bankCharges', type: 'number' },
      { label: 'Interest Earned (₹)', name: 'interestEarned', type: 'number' },
      { label: 'ECS/NACH Debits (₹)', name: 'ecsDebits', type: 'number' },
      { label: 'Other Adjustments (₹)', name: 'otherAdj', type: 'number' },
      { label: 'Reconciled Balance (₹)', name: 'reconciledBal', type: 'number', readOnly: true },
      { label: 'Variance (₹)', name: 'variance', type: 'number', readOnly: true },
      { label: 'Reconciliation Status', name: 'reconStatus', type: 'select', options: ['Matched', 'Unmatched'] },
      { label: 'Reconciled By', name: 'reconciledBy', type: 'text' },
      { label: 'Verified By', name: 'verifiedBy', type: 'text' }
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
    const qty = Math.floor(Math.random() * 50) + 10;
    const rate = 45000;
    const total = qty * rate;
    
    return {
      id: i + 1,
      // Shared Dummy Data for Pending Lists
      closureId: \`PCL-\${(i + 1).toString().padStart(4, '0')}\`,
      prNumber: \`PR-\${(i + 1).toString().padStart(4, '0')}\`,
      poNumber: \`PO-\${(i + 1).toString().padStart(4, '0')}\`,
      vendorName: \`Vendor \${i+1}\`,
      netQty: qty,
      purchaseRate: 2500,
      purchaseValue: qty * 2500,
      closureDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,

      apId: \`AP-\${(i + 1).toString().padStart(4, '0')}\`,
      billNo: \`BILL-\${(i+1)}\`,
      billDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      billAmount: qty * 2500,
      tdsAmount: (qty * 2500) * 0.01,
      netPayable: (qty * 2500) * 0.99,
      dueDate: \`2026-07-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      outstanding: (qty * 2500) * 0.99,
      paymentStatus: 'Unpaid',

      loadingId: \`LD-\${(i + 1).toString().padStart(4, '0')}\`,
      dispatchOrderNo: \`DO-\${(i + 1).toString().padStart(4, '0')}\`,
      vehicleNumber: \`MH 04 AB \${1000+i}\`,
      transporterName: 'ABC Logistics',
      transporterGst: '27AABC1234L1Z',
      route: 'Mill -> Mumbai',
      weightLoaded: qty,
      freightRate: 1500,
      totalFreight: qty * 1500,
      expectedDelivery: \`2026-06-\${(i % 28 + 5).toString().padStart(2, '0')}\`,

      agentName: \`Agent \${i+1}\`,
      agentId: \`AG-\${(i+1).toString().padStart(3, '0')}\`,
      agentFirm: \`Firm \${i+1}\`,
      mandi: 'Karnal',
      commissionType: 'Fixed/MT',
      commissionRate: 50,
      quantity: qty,
      assignmentDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      
      completionId: \`OC-\${(i + 1).toString().padStart(4, '0')}\`,
      orderId: \`SO-\${(i + 1).toString().padStart(4, '0')}\`,
      customerName: \`Customer \${i+1}\`,
      riceGrade: 'Premium Basmati',
      totalValue: total,
      completionDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,

      commissionId: \`COM-\${(i + 1).toString().padStart(4, '0')}\`,
      commissionAmount: 5000,
      paymentDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,

      contractNo: \`EC-\${(i + 1).toString().padStart(4, '0')}\`,
      contractDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      buyerName: \`Global Buyer \${i+1}\`,
      buyerCountry: 'UAE',
      contractValueUsd: qty * 1000,
      paymentTerms: 'LC',

      paymentId: \`EP-\${(i + 1).toString().padStart(4, '0')}\`,
      invoiceNo: \`INV-\${(i + 1).toString().padStart(4, '0')}\`,
      receivedUsd: qty * 1000,
      inrEquivalent: qty * 1000 * 83.5,
      forexRate: 83.5,
      fircNo: \`FIRC-\${(i + 1).toString().padStart(5, '0')}\`,
      outstandingUsd: 0,
      receiptDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,

      arId: \`AR-\${(i + 1).toString().padStart(4, '0')}\`,
      invoiceAmount: total,
      amountReceived: total,
      daysOverdue: 0,
      paymentMode: 'NEFT',
      status: 'Paid',

      plId: \`PL-\${(i + 1).toString().padStart(4, '0')}\`,
      period: 'Apr 2026',
      totalRevenue: total * 10,
      totalCost: total * 8,
      grossProfit: total * 2,
      grossMargin: 20,
      ebitda: total * 1.8,
      netProfit: total * 1.5,
      netMargin: 15,
      recoveryPercent: 65,
      preparedBy: 'Finance Head',
      createdDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,

      brId: \`BR-\${(i + 1).toString().padStart(4, '0')}\`,
      reconDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      bankName: 'HDFC Bank',
      accountNo: '001122334455',
      openingBal: 1000000,
      bankClosingBal: 1500000,
      bookClosingBal: 1500000,
      variance: 0,
      reconStatus: 'Matched',
      reconciledBy: 'Acc Exec',
      verifiedBy: 'Finance Head'
    };
  });
};

export const ${stage.name} = () => {
  const [pendingItems, setPendingItems] = useState(generateDummyData().slice(0, 20));
  const [historyItems, setHistoryItems] = useState(generateDummyData().slice(20, 40));
  
  const [activeTab, setActiveTab] = useState('${stage.name === 'ProfitAndLoss' ? 'history' : 'pending'}');
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
    ${stage.name === 'AccountsPayable' ? `autoFields = { apId: 'AP-' + Math.floor(Math.random()*10000) };` : ''}
    ${stage.name === 'VendorPayments' ? `autoFields = { paymentId: 'VP-' + Math.floor(Math.random()*10000) };` : ''}
    ${stage.name === 'TransporterPayments' ? `autoFields = { paymentId: 'TP-' + Math.floor(Math.random()*10000) };` : ''}
    ${stage.name === 'AgentCommission' ? `autoFields = { commissionId: 'AC-' + Math.floor(Math.random()*10000) };` : ''}
    ${stage.name === 'SalesCommission' ? `autoFields = { commissionId: 'SC-' + Math.floor(Math.random()*10000) };` : ''}
    ${stage.name === 'PurchaseCommission' ? `autoFields = { pcId: 'PC-' + Math.floor(Math.random()*10000) };` : ''}
    ${stage.name === 'BrokerCommission' ? `autoFields = { bcId: 'BC-' + Math.floor(Math.random()*10000) };` : ''}
    ${stage.name === 'ExportPaymentTracking' ? `autoFields = { eptId: 'EPT-' + Math.floor(Math.random()*10000) };` : ''}
    ${stage.name === 'DomesticPaymentTracking' ? `autoFields = { dptId: 'DPT-' + Math.floor(Math.random()*10000) };` : ''}
    ${stage.name === 'ProfitAndLoss' ? `autoFields = { plId: 'PL-' + Math.floor(Math.random()*10000) };` : ''}
    ${stage.name === 'BankReconciliation' ? `autoFields = { brId: 'BR-' + Math.floor(Math.random()*10000) };` : ''}
    
    const readOnlyFields = ${JSON.stringify(stage.fields.filter(f => f.readOnly).map(f => f.name))};
    const initialFormData = {};
    readOnlyFields.forEach(field => {
      if (item && item[field] !== undefined) {
        initialFormData[field] = item[field];
      }
    });
    
    setFormData({ ...initialFormData, ...autoFields });
    setIsModalOpen(true);
  };

  const handleCreateNew = () => {
    setSelectedItem({});
    setFormData({ plId: 'PL-' + Math.floor(Math.random()*10000) });
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (isModalOpen && formData) {
      ${stage.name === 'AccountsPayable' ? `
      const billAmt = parseFloat(formData.billAmount) || 0;
      const tdsRate = parseFloat(formData.tdsRate) || 0;
      const tdsAmt = billAmt * (tdsRate / 100);
      const net = billAmt - tdsAmt;
      const paid = parseFloat(formData.amountPaid) || 0;
      const out = net - paid;
      if (formData.tdsAmount !== tdsAmt || formData.netPayable !== net || formData.outstanding !== out) {
        setFormData(prev => ({ ...prev, tdsAmount: tdsAmt, netPayable: net, outstanding: out }));
      }
      ` : ''}
      ${stage.name === 'VendorPayments' || stage.name === 'AgentCommission' || stage.name === 'SalesCommission' ? `
      const amt = parseFloat(formData.amountPaid || formData.commissionAmount || formData.quantity * formData.commissionRate) || 0;
      const tdsRate = parseFloat(formData.tdsRate) || 0;
      const tdsAmt = amt * (tdsRate / 100);
      const net = amt - tdsAmt;
      if (formData.tdsAmount !== tdsAmt || formData.netAmount !== net || formData.netPayable !== net || (formData.commissionAmount !== amt && '${stage.name}' !== 'VendorPayments')) {
        setFormData(prev => ({ ...prev, tdsAmount: tdsAmt, netAmount: net, netPayable: net, commissionAmount: amt }));
      }
      ` : ''}
      ${stage.name === 'TransporterPayments' ? `
      const fr = parseFloat(selectedItem?.totalFreight) || 0;
      const adv = parseFloat(formData.advancePaid) || 0;
      const bal = fr - adv;
      const tdsRate = parseFloat(formData.tdsRate) || 0;
      const tdsAmt = bal * (tdsRate / 100);
      const net = bal - tdsAmt;
      if (formData.freightAmount !== fr || formData.balancePayable !== bal || formData.tdsAmount !== tdsAmt || formData.netPayable !== net) {
        setFormData(prev => ({ ...prev, freightAmount: fr, balancePayable: bal, tdsAmount: tdsAmt, netPayable: net }));
      }
      ` : ''}
      ${stage.name === 'BrokerCommission' ? `
      const valUsd = parseFloat(selectedItem?.contractValueUsd) || 0;
      const rate = parseFloat(formData.commissionRate) || 0;
      const type = formData.commissionType;
      const commUsd = type === 'Fixed USD' ? rate : valUsd * (rate/100);
      const forex = parseFloat(formData.forexRate) || 0;
      const inr = commUsd * forex;
      const tds = parseFloat(formData.tdsAmount) || 0;
      const net = inr - tds;
      if (formData.commissionUsd !== commUsd || formData.inrEquivalent !== inr || formData.netPayable !== net) {
        setFormData(prev => ({ ...prev, commissionUsd: commUsd, inrEquivalent: inr, netPayable: net }));
      }
      ` : ''}
      ${stage.name === 'ProfitAndLoss' ? `
      const r1 = parseFloat(formData.domRevenue) || 0;
      const r2 = parseFloat(formData.expRevenue) || 0;
      const totalRev = r1 + r2;
      
      const c1 = parseFloat(formData.purchaseCost) || 0;
      const c2 = parseFloat(formData.productionCost) || 0;
      const c3 = parseFloat(formData.packingCost) || 0;
      const c4 = parseFloat(formData.domTransportCost) || 0;
      const c5 = parseFloat(formData.expFreightCost) || 0;
      const c6 = parseFloat(formData.agentComm) || 0;
      const c7 = parseFloat(formData.salesComm) || 0;
      const c8 = parseFloat(formData.brokerComm) || 0;
      const c9 = parseFloat(formData.adminCost) || 0;
      const c10 = parseFloat(formData.otherCost) || 0;
      const totalCost = c1+c2+c3+c4+c5+c6+c7+c8+c9+c10;
      
      const gp = totalRev - c1 - c2 - c3;
      const gpMargin = totalRev ? (gp/totalRev)*100 : 0;
      const ebitda = totalRev - totalCost;
      
      const dep = parseFloat(formData.depreciation) || 0;
      const ebit = ebitda - dep;
      const int = parseFloat(formData.interest) || 0;
      const ebt = ebit - int;
      const tax = parseFloat(formData.tax) || 0;
      const np = ebt - tax;
      const npMargin = totalRev ? (np/totalRev)*100 : 0;
      
      if (formData.totalRevenue !== totalRev || formData.totalCost !== totalCost || formData.grossProfit !== gp || formData.ebitda !== ebitda || formData.netProfit !== np) {
        setFormData(prev => ({ 
          ...prev, 
          totalRevenue: totalRev, 
          totalCost: totalCost, 
          grossProfit: gp, 
          grossMargin: gpMargin.toFixed(2), 
          ebitda: ebitda, 
          ebit: ebit, 
          ebt: ebt, 
          netProfit: np, 
          netMargin: npMargin.toFixed(2) 
        }));
      }
      ` : ''}
      ${stage.name === 'BankReconciliation' ? `
      const ob = parseFloat(formData.openingBal) || 0;
      const cbb = parseFloat(formData.bookClosingBal) || 0;
      
      const uci = parseFloat(formData.unclearedIssued) || 0;
      const ctr = parseFloat(formData.transitReceived) || 0;
      const dit = parseFloat(formData.depositsTransit) || 0;
      const bc = parseFloat(formData.bankCharges) || 0;
      const ie = parseFloat(formData.interestEarned) || 0;
      const ed = parseFloat(formData.ecsDebits) || 0;
      const oa = parseFloat(formData.otherAdj) || 0;
      
      const rec = cbb + uci - ctr - dit - bc + ie - ed + oa;
      const bank = parseFloat(formData.bankClosingBal) || 0;
      const variance = rec - bank;
      
      if (formData.reconciledBal !== rec || formData.variance !== variance) {
        setFormData(prev => ({ ...prev, reconciledBal: rec, variance: variance }));
      }
      ` : ''}
    }
  }, [formData, isModalOpen, selectedItem]);

  const handleSave = () => {
    const processedItem = { ...selectedItem, ...formData, status: 'Completed' };
    setHistoryItems([processedItem, ...historyItems]);
    if (selectedItem?.id) {
      setPendingItems(pendingItems.filter(p => p.id !== selectedItem.id));
    }
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
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">${stage.title}</h2>
        ${stage.name === 'ProfitAndLoss' ? `
        <Button onClick={handleCreateNew} className="flex items-center gap-2">
          <Plus size={16} /> Create P&L
        </Button>
        ` : ''}
      </div>

      ${stage.name !== 'ProfitAndLoss' ? `<PageTabs activeTab={activeTab} setActiveTab={setActiveTab} />` : ''}

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
        size="5xl"
      >
        <div className="max-h-[85vh] overflow-y-auto">
          <div className="bg-gradient-to-r from-green-900 to-green-800 px-6 py-4 flex items-center justify-between">
            <div>
              <p className="text-green-300 text-xs font-medium uppercase tracking-widest">Finance Module</p>
              <h3 className="text-white text-lg font-bold mt-0.5">${stage.modalTitle}</h3>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-1.5">
              <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse"></span>
              <span className="text-white text-xs font-medium">Recording</span>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              ${stage.fields.map(f => {
                const isRO = !!f.readOnly;
                const cardClass = isRO
                  ? `'p-3 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5'`
                  : `'p-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-green-300 transition-all space-y-1.5'`;
                const inputClass = isRO
                  ? `'bg-slate-100 text-slate-500 border-slate-200 cursor-not-allowed text-sm'`
                  : `'border-slate-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 text-sm bg-white'`;

                if (f.type === 'select') {
                  return `
              <div className={${cardClass}}>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">${f.label}</Label>
                  ${isRO ? `<span className="text-[10px] bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded font-medium">AUTO</span>` : ''}
                </div>
                <Select 
                  value={formData.${f.name} || ''} 
                  onChange={(e) => setFormData({...formData, ${f.name}: e.target.value})}
                  disabled={${isRO}}
                  className={${inputClass}}
                >
                  <option value="">Select...</option>
                  ${f.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                </Select>
              </div>`;
                } else {
                  return `
              <div className={${cardClass}}>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">${f.label}</Label>
                  ${isRO ? `<span className="text-[10px] bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded font-medium">AUTO</span>` : ''}
                </div>
                <Input 
                  type="${f.type}"
                  value={formData.${f.name} || ''} 
                  onChange={(e) => setFormData({...formData, ${f.name}: e.target.value})}
                  readOnly={${isRO}}
                  className={${inputClass}}
                  placeholder="${f.placeholder || ''}"
                />
              </div>`;
                }
              }).join('')}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <Button onClick={() => setIsModalOpen(false)} variant="outline" className="px-6">
                Cancel
              </Button>
              <Button onClick={handleSave} className="px-6 bg-gradient-to-r from-green-700 to-green-600 shadow-md text-white">
                Save & Process
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
`;

const stage1Template = () => `import React, { useState, useEffect } from 'react';
import { Search, Play } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input, Label, Select } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import DataTable from '../../components/DataTable';
import { usePagination } from '../../hooks/usePagination';
import { Modal } from '../../components/ui/Modal';
import { PageTabs } from '../../components/PageTabs';

const generateDummyData = () => {
  return Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    confirmationId: \`CF-\${(i + 1).toString().padStart(4, '0')}\`,
    invoiceNo: \`INV-\${(i + 1).toString().padStart(4, '0')}\`,
    dispatchOrderNo: \`DO-\${(i + 1).toString().padStart(4, '0')}\`,
    customerName: \`Customer \${i+1}\`,
    customerGst: \`27AAAC\${i}1234K1Z1\`,
    invoiceAmount: (Math.floor(Math.random() * 50) + 10) * 45000,
    outstandingAmount: (Math.floor(Math.random() * 50) + 10) * 45000,
    confirmationDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
    deliveryStatus: 'Complete',
    invoiceDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
    paymentDueDate: \`2026-07-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
    status: 'Pending'
  }));
};

export const AccountsReceivable = () => {
  const [pendingItems, setPendingItems] = useState(generateDummyData().slice(0, 20));
  const [historyItems, setHistoryItems] = useState(generateDummyData().slice(20, 40));
  const [activeTab, setActiveTab] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);

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
      ...item,
      arId: 'AR-' + Math.floor(Math.random()*10000),
      paymentReceived: 0,
      outstanding: item.invoiceAmount
    });
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (isModalOpen && formData && selectedItem) {
      const inv = parseFloat(selectedItem.invoiceAmount) || 0;
      const rec = parseFloat(formData.paymentReceived) || 0;
      const out = inv - rec;
      if (formData.outstanding !== out) {
        setFormData(prev => ({ ...prev, outstanding: out }));
      }
    }
  }, [formData, isModalOpen, selectedItem]);

  const handleSave = () => {
    const newItem = { ...formData, id: Date.now(), status: 'Paid' };
    setHistoryItems([newItem, ...historyItems]);
    setPendingItems(pendingItems.filter(p => p.id !== selectedItem.id));
    setIsModalOpen(false);
  };

  const actionColumn = {
    header: 'Action',
    className: 'text-right',
    cell: (row) => (
      <div className="flex justify-end">
        <Button size="sm" onClick={() => handleActionClick(row)} className="flex items-center gap-1 bg-primary text-white">
          <Play size={14} /> Process AR
        </Button>
      </div>
    )
  };

  const pendingCols = [
    { header: 'Confirmation ID', accessor: 'confirmationId' },
    { header: 'Invoice No', accessor: 'invoiceNo' },
    { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' },
    { header: 'Customer Name', accessor: 'customerName' },
    { header: 'Invoice Amount (₹)', accessor: 'invoiceAmount' },
    { header: 'Outstanding Amount (₹)', accessor: 'outstandingAmount' },
    { header: 'Confirmation Date', accessor: 'confirmationDate' },
    { header: 'Delivery Status', accessor: 'deliveryStatus' }
  ];

  const historyCols = [
    { header: 'AR ID', accessor: 'arId' },
    { header: 'Confirmation ID', accessor: 'confirmationId' },
    { header: 'Invoice No', accessor: 'invoiceNo' },
    { header: 'Customer Name', accessor: 'customerName' },
    { header: 'Invoice Amount (₹)', accessor: 'invoiceAmount' },
    { header: 'Payment Received (₹)', accessor: 'paymentReceived' },
    { header: 'Outstanding (₹)', accessor: 'outstanding' },
    { header: 'Payment Mode', accessor: 'paymentMode' },
    { header: 'Status', accessor: 'status' }
  ];

  const columns = activeTab === 'pending' ? [actionColumn, ...pendingCols] : historyCols;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Stage 1 - Accounts Receivable</h2>
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
        title="Accounts Receivable Details"
      >
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Confirmation ID</Label>
              <Input type="text" value={formData.confirmationId || ''} readOnly className="bg-slate-100" />
            </div>
            <div className="space-y-1.5">
              <Label>Invoice No</Label>
              <Input type="text" value={formData.invoiceNo || ''} readOnly className="bg-slate-100" />
            </div>
            <div className="space-y-1.5">
              <Label>AR ID</Label>
              <Input type="text" value={formData.arId || ''} readOnly className="bg-slate-100" />
            </div>
            <div className="space-y-1.5">
              <Label>Customer Name</Label>
              <Input type="text" value={formData.customerName || ''} readOnly className="bg-slate-100" />
            </div>
            <div className="space-y-1.5">
              <Label>Invoice Date</Label>
              <Input type="date" value={formData.invoiceDate || ''} readOnly className="bg-slate-100" />
            </div>
            <div className="space-y-1.5">
              <Label>Invoice Amount (₹)</Label>
              <Input type="number" value={formData.invoiceAmount || ''} readOnly className="bg-slate-100" />
            </div>
            <div className="space-y-1.5">
              <Label>Payment Due Date</Label>
              <Input type="date" value={formData.paymentDueDate || ''} readOnly className="bg-slate-100" />
            </div>
            <div className="space-y-1.5">
              <Label>Payment Received (₹)</Label>
              <Input type="number" value={formData.paymentReceived || ''} onChange={(e) => setFormData({...formData, paymentReceived: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Payment Date</Label>
              <Input type="date" value={formData.paymentDate || ''} onChange={(e) => setFormData({...formData, paymentDate: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Payment Mode</Label>
              <Select value={formData.paymentMode || ''} onChange={(e) => setFormData({...formData, paymentMode: e.target.value})}>
                <option value="NEFT">NEFT</option>
                <option value="RTGS">RTGS</option>
                <option value="Cheque">Cheque</option>
                <option value="Cash">Cash</option>
                <option value="UPI">UPI</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>UTR/Reference No</Label>
              <Input type="text" value={formData.utrNo || ''} onChange={(e) => setFormData({...formData, utrNo: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Outstanding (₹)</Label>
              <Input type="number" value={formData.outstanding || ''} readOnly className="bg-slate-100" />
            </div>
            <div className="space-y-1.5">
              <Label>Status</Label>
              <Select value={formData.arStatus || ''} onChange={(e) => setFormData({...formData, arStatus: e.target.value})}>
                <option value="Current">Current</option>
                <option value="Overdue">Overdue</option>
                <option value="Partially Paid">Partially Paid</option>
                <option value="Written-off">Written-off</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Remarks</Label>
              <Input type="text" value={formData.remarks || ''} onChange={(e) => setFormData({...formData, remarks: e.target.value})} />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
            <Button onClick={() => setIsModalOpen(false)} variant="outline">Cancel</Button>
            <Button onClick={handleSave}>Save Record</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
`;

// Write Stage 1
fs.writeFileSync(path.join(__dirname, 'src/modules/finance', 'AccountsReceivable.jsx'), stage1Template());
console.log('Created AccountsReceivable.jsx');

// Write Stages 2-12
stages.forEach(stage => {
  const filePath = path.join(__dirname, 'src/modules/finance', stage.file);
  fs.writeFileSync(filePath, template(stage));
  console.log('Created ' + stage.file);
});
