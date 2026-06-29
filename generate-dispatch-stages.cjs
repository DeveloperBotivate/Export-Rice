const fs = require('fs');
const path = require('path');

const stages = [
  {
    file: 'SalesOrder.jsx', name: 'SalesOrder', title: 'Stage 1 - Sales Order', action: 'Receive Order', modalTitle: 'Sales Order Details', storageKey: 'dispatch_1_history',
    pendingCols: [
      { header: 'Sales Order No', accessor: 'salesOrderNo' },
      { header: 'Order Type', accessor: 'orderType' },
      { header: 'Customer Name', accessor: 'customerName' },
      { header: 'Rice Grade', accessor: 'riceGrade' },
      { header: 'Quantity (MT)', accessor: 'quantityMt' },
      { header: 'Price', accessor: 'price' },
      { header: 'Total Order Value', accessor: 'totalOrderValue' },
      { header: 'Expected Delivery Date', accessor: 'expectedDeliveryDate' },
      { header: 'Priority', accessor: 'priority' },
      { header: 'Received By', accessor: 'receivedBy' },
      { header: 'Status', accessor: 'status' }
    ],
    historyCols: [
      { header: 'Sales Order No', accessor: 'salesOrderNo' },
      { header: 'Order Date', accessor: 'orderDate' },
      { header: 'Order Type', accessor: 'orderType' },
      { header: 'Customer/Buyer', accessor: 'customerName' },
      { header: 'Rice Grade', accessor: 'riceGrade' },
      { header: 'Qty MT', accessor: 'quantityMt' },
      { header: 'Total Value', accessor: 'totalOrderValue' },
      { header: 'Expected Delivery', accessor: 'expectedDeliveryDate' },
      { header: 'Priority', accessor: 'priority' },
      { header: 'Received By', accessor: 'receivedBy' },
      { header: 'Status', accessor: 'status' }
    ],
    autoField: { key: 'salesOrderNo', prefix: 'SO' },
    fields: [
      { label: 'Sales Order No', name: 'salesOrderNo', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Order Date', name: 'orderDate', type: 'date', visibility: 'Common' },
      { label: 'Order Type', name: 'orderType', type: 'select', options: ['Domestic', 'Export'], visibility: 'Common' },
      { label: 'Customer / Buyer Name', name: 'customerName', type: 'text', visibility: 'Common' },
      { label: 'Customer Phone', name: 'customerPhone', type: 'text', visibility: 'Common' },
      { label: 'Customer Email', name: 'customerEmail', type: 'text', visibility: 'Common' },
      { label: 'Customer GSTIN', name: 'customerGstin', type: 'text', visibility: 'Domestic' },
      { label: 'Billing Address', name: 'billingAddress', type: 'text', visibility: 'Common' },
      { label: 'Delivery State / Pin Code', name: 'deliveryStatePin', type: 'text', visibility: 'Domestic' },
      { label: 'Delivery Address', name: 'deliveryAddress', type: 'text', visibility: 'Common' },
      { label: 'Buyer Country', name: 'buyerCountry', type: 'text', visibility: 'Export' },
      { label: 'Buyer Address', name: 'buyerAddress', type: 'text', visibility: 'Export' },
      { label: 'Incoterms', name: 'incoterms', type: 'select', options: ['FOB', 'CIF', 'CNF', 'EXW'], visibility: 'Export' },
      { label: 'Port of Loading', name: 'portOfLoading', type: 'text', visibility: 'Export' },
      { label: 'Port of Destination', name: 'portOfDestination', type: 'text', visibility: 'Export' },
      { label: 'Currency', name: 'currency', type: 'select', options: ['USD', 'EUR', 'AED'], visibility: 'Export' },
      { label: 'Payment Terms', name: 'paymentTerms', type: 'select', options: ['LC', 'TT', 'DA', 'CAD'], visibility: 'Export' },
      { label: 'LC/TT Reference No', name: 'lcTtRefNo', type: 'text', visibility: 'Export' },
      { label: 'Rice Grade / Product', name: 'riceGrade', type: 'text', visibility: 'Common' },
      { label: 'Quantity Required MT', name: 'quantityMt', type: 'number', visibility: 'Common' },
      { label: 'Bag Size Preference', name: 'bagSize', type: 'text', visibility: 'Common' },
      { label: 'Price (₹/MT or $/MT)', name: 'price', type: 'number', visibility: 'Common' },
      { label: 'Total Order Value (auto)', name: 'totalOrderValue', type: 'number', readOnly: true, visibility: 'Common' },
      { label: 'Expected Delivery Date', name: 'expectedDeliveryDate', type: 'date', visibility: 'Common' },
      { label: 'Priority', name: 'priority', type: 'select', options: ['Normal', 'Urgent'], visibility: 'Common' },
      { label: 'Special Instructions', name: 'specialInstructions', type: 'text', visibility: 'Common' },
      { label: 'Received By', name: 'receivedBy', type: 'text', visibility: 'Common' }
    ]
  },
  {
    file: 'OrderApproval.jsx', name: 'OrderApproval', title: 'Stage 2 - Order Approval', action: 'Approve', modalTitle: 'Approval Details', storageKey: 'dispatch_2_history',
    pendingCols: [
      { header: 'Sales Order No', accessor: 'salesOrderNo' },
      { header: 'Order Date', accessor: 'orderDate' },
      { header: 'Order Type', accessor: 'orderType' },
      { header: 'Customer Name', accessor: 'customerName' },
      { header: 'Rice Grade', accessor: 'riceGrade' },
      { header: 'Qty MT', accessor: 'quantityMt' },
      { header: 'Price', accessor: 'price' },
      { header: 'Total Value', accessor: 'totalOrderValue' },
      { header: 'Expected Delivery', accessor: 'expectedDeliveryDate' },
      { header: 'Priority', accessor: 'priority' }
    ],
    historyCols: [
      { header: 'Approval ID', accessor: 'approvalId' },
      { header: 'Sales Order No', accessor: 'salesOrderNo' },
      { header: 'Order Type', accessor: 'orderType' },
      { header: 'Customer Name', accessor: 'customerName' },
      { header: 'Rice Grade', accessor: 'riceGrade' },
      { header: 'Approved Qty MT', accessor: 'approvedQty' },
      { header: 'Approved Price', accessor: 'approvedPrice' },
      { header: 'Approved Total', accessor: 'approvedTotalValue' },
      { header: 'Approved By', accessor: 'approvedBy' },
      { header: 'Approval Date', accessor: 'approvalDate' },
      { header: 'Approval Status', accessor: 'approvalStatus' }
    ],
    autoField: { key: 'approvalId', prefix: 'APR' },
    fields: [
      { label: 'Sales Order No', name: 'salesOrderNo', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Order Type', name: 'orderType', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Approval ID', name: 'approvalId', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Approval Date', name: 'approvalDate', type: 'date', visibility: 'Common' },
      { label: 'Approved By', name: 'approvedBy', type: 'text', visibility: 'Common' },
      { label: 'Approved Quantity MT', name: 'approvedQty', type: 'number', visibility: 'Common' },
      { label: 'Approved Price (₹ or $)', name: 'approvedPrice', type: 'number', visibility: 'Common' },
      { label: 'Approved Total Value (auto)', name: 'approvedTotalValue', type: 'number', readOnly: true, visibility: 'Common' },
      { label: 'Special Discount %', name: 'specialDiscount', type: 'number', visibility: 'Common' },
      { label: 'Payment Advance ₹', name: 'paymentAdvance', type: 'number', visibility: 'Common' },
      { label: 'Credit Days', name: 'creditDays', type: 'number', visibility: 'Domestic' },
      { label: 'Priority Level', name: 'priorityLevel', type: 'select', options: ['High', 'Medium', 'Low'], visibility: 'Common' },
      { label: 'Approval Status', name: 'approvalStatus', type: 'select', options: ['Approved', 'Rejected', 'On Hold'], visibility: 'Common' },
      { label: 'Rejection Reason', name: 'rejectionReason', type: 'text', visibility: 'Common' },
      { label: 'Approval Remarks', name: 'approvalRemarks', type: 'text', visibility: 'Common' }
    ]
  },
  {
    file: 'StockAvailabilityCheck.jsx', name: 'StockAvailabilityCheck', title: 'Stage 3 - Stock Availability Check', action: 'Check Stock', modalTitle: 'Stock Availability Details', storageKey: 'dispatch_3_history',
    pendingCols: [
      { header: 'Approval ID', accessor: 'approvalId' },
      { header: 'Sales Order No', accessor: 'salesOrderNo' },
      { header: 'Order Type', accessor: 'orderType' },
      { header: 'Customer Name', accessor: 'customerName' },
      { header: 'Rice Grade', accessor: 'riceGrade' },
      { header: 'Approved Qty MT', accessor: 'approvedQty' },
      { header: 'Approved Price', accessor: 'approvedPrice' },
      { header: 'Approval Date', accessor: 'approvalDate' }
    ],
    historyCols: [
      { header: 'Stock Check ID', accessor: 'stockCheckId' },
      { header: 'Approval ID', accessor: 'approvalId' },
      { header: 'Sales Order No', accessor: 'salesOrderNo' },
      { header: 'Order Type', accessor: 'orderType' },
      { header: 'Rice Grade', accessor: 'riceGrade' },
      { header: 'Required Qty MT', accessor: 'quantityMt' },
      { header: 'Available Stock MT', accessor: 'availableFgStock' },
      { header: 'Shortfall MT', accessor: 'shortfallMt' },
      { header: 'Stock Sufficient', accessor: 'stockSufficient' },
      { header: 'Available Lot No', accessor: 'availableLotNos' },
      { header: 'Available Warehouse', accessor: 'availableWarehouse' },
      { header: 'Checked By', accessor: 'checkedBy' },
      { header: 'Check Date', accessor: 'checkDate' }
    ],
    autoField: { key: 'stockCheckId', prefix: 'SCK' },
    fields: [
      { label: 'Approval ID', name: 'approvalId', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Sales Order No', name: 'salesOrderNo', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Order Type', name: 'orderType', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Stock Check ID', name: 'stockCheckId', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Check Date', name: 'checkDate', type: 'date', visibility: 'Common' },
      { label: 'Rice Grade Required', name: 'riceGrade', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Quantity Required MT', name: 'quantityMt', type: 'number', readOnly: true, visibility: 'Common' },
      { label: 'Available FG Stock MT', name: 'availableFgStock', type: 'number', visibility: 'Common' },
      { label: 'Available Lot No(s)', name: 'availableLotNos', type: 'text', visibility: 'Common' },
      { label: 'Available Batch No(s)', name: 'availableBatchNos', type: 'text', visibility: 'Common' },
      { label: 'Available Warehouse / Go-down', name: 'availableWarehouse', type: 'text', visibility: 'Common' },
      { label: 'Stock Sufficient', name: 'stockSufficient', type: 'select', options: ['Yes', 'No'], visibility: 'Common' },
      { label: 'Shortfall MT (auto if No)', name: 'shortfallMt', type: 'number', visibility: 'Common' },
      { label: 'Action if No', name: 'actionIfNo', type: 'select', options: ['Plan Production', 'Source from Other WH'], visibility: 'Common' },
      { label: 'Checked By', name: 'checkedBy', type: 'text', visibility: 'Common' },
      { label: 'Remarks', name: 'remarks', type: 'text', visibility: 'Common' }
    ]
  },
  {
    file: 'StockReservation.jsx', name: 'StockReservation', title: 'Stage 4 - Stock Reservation', action: 'Reserve Stock', modalTitle: 'Stock Reservation Details', storageKey: 'dispatch_4_history',
    pendingCols: [
      { header: 'Stock Check ID', accessor: 'stockCheckId' },
      { header: 'Sales Order No', accessor: 'salesOrderNo' },
      { header: 'Order Type', accessor: 'orderType' },
      { header: 'Customer Name', accessor: 'customerName' },
      { header: 'Rice Grade', accessor: 'riceGrade' },
      { header: 'Required Qty MT', accessor: 'quantityMt' },
      { header: 'Available Stock MT', accessor: 'availableFgStock' },
      { header: 'Available Lot No', accessor: 'availableLotNos' },
      { header: 'Available Warehouse', accessor: 'availableWarehouse' },
      { header: 'Check Date', accessor: 'checkDate' }
    ],
    historyCols: [
      { header: 'Reservation ID', accessor: 'reservationId' },
      { header: 'Stock Check ID', accessor: 'stockCheckId' },
      { header: 'Sales Order No', accessor: 'salesOrderNo' },
      { header: 'Order Type', accessor: 'orderType' },
      { header: 'Customer Name', accessor: 'customerName' },
      { header: 'Rice Grade', accessor: 'riceGrade' },
      { header: 'Lot No', accessor: 'lotNo' },
      { header: 'Batch No', accessor: 'batchNo' },
      { header: 'Reserved Qty MT', accessor: 'reservedQtyMt' },
      { header: 'No. of Bags', accessor: 'bagsReserved' },
      { header: 'Warehouse', accessor: 'warehouse' },
      { header: 'FEFO Date', accessor: 'fefoDate' },
      { header: 'Reserved By', accessor: 'reservedBy' }
    ],
    autoField: { key: 'reservationId', prefix: 'RSV' },
    fields: [
      { label: 'Stock Check ID', name: 'stockCheckId', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Sales Order No', name: 'salesOrderNo', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Order Type', name: 'orderType', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Reservation ID', name: 'reservationId', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Reservation Date', name: 'reservationDate', type: 'date', visibility: 'Common' },
      { label: 'FG Stock ID', name: 'fgStockId', type: 'text', visibility: 'Common' },
      { label: 'Rice Grade', name: 'riceGrade', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Lot No', name: 'lotNo', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Batch No', name: 'batchNo', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Warehouse / Go-down / Rack / Bin', name: 'warehouse', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Reserved Quantity MT', name: 'reservedQtyMt', type: 'number', visibility: 'Common' },
      { label: 'No. of Bags Reserved (auto)', name: 'bagsReserved', type: 'number', visibility: 'Common' },
      { label: 'FEFO Date', name: 'fefoDate', type: 'date', readOnly: true, visibility: 'Common' },
      { label: 'Container Qty Required', name: 'containerQtyReq', type: 'number', visibility: 'Export' },
      { label: 'No. of Containers Required', name: 'noOfContainersReq', type: 'number', visibility: 'Export' },
      { label: 'Reserved By', name: 'reservedBy', type: 'text', visibility: 'Common' },
      { label: 'Remarks', name: 'remarks', type: 'text', visibility: 'Common' }
    ]
  },
  {
    file: 'DispatchPlanning.jsx', name: 'DispatchPlanning', title: 'Stage 5 - Dispatch Planning', action: 'Plan Dispatch', modalTitle: 'Dispatch Planning Details', storageKey: 'dispatch_5_history',
    pendingCols: [
      { header: 'Reservation ID', accessor: 'reservationId' },
      { header: 'Sales Order No', accessor: 'salesOrderNo' },
      { header: 'Order Type', accessor: 'orderType' },
      { header: 'Customer Name', accessor: 'customerName' },
      { header: 'Rice Grade', accessor: 'riceGrade' },
      { header: 'Reserved Qty MT', accessor: 'reservedQtyMt' },
      { header: 'No. of Bags', accessor: 'bagsReserved' },
      { header: 'Warehouse', accessor: 'warehouse' },
      { header: 'FEFO Date', accessor: 'fefoDate' },
      { header: 'Reserved By', accessor: 'reservedBy' }
    ],
    historyCols: [
      { header: 'Dispatch Plan ID', accessor: 'dispatchPlanId' },
      { header: 'Reservation ID', accessor: 'reservationId' },
      { header: 'Sales Order No', accessor: 'salesOrderNo' },
      { header: 'Order Type', accessor: 'orderType' },
      { header: 'Customer Name', accessor: 'customerName' },
      { header: 'Rice Grade', accessor: 'riceGrade' },
      { header: 'Planned Dispatch Date', accessor: 'plannedDispatchDate' },
      { header: 'Priority', accessor: 'priority' },
      { header: 'Route / CFS Name', accessor: 'routeOrCfs' },
      { header: 'Planned By', accessor: 'plannedBy' }
    ],
    autoField: { key: 'dispatchPlanId', prefix: 'DP' },
    fields: [
      { label: 'Reservation ID', name: 'reservationId', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Sales Order No', name: 'salesOrderNo', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Order Type', name: 'orderType', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Dispatch Plan ID', name: 'dispatchPlanId', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Planned Dispatch Date', name: 'plannedDispatchDate', type: 'date', visibility: 'Common' },
      { label: 'Priority', name: 'priority', type: 'select', options: ['Normal', 'Urgent', 'Express'], visibility: 'Common' },
      { label: 'Delivery Address', name: 'deliveryAddress', type: 'text', readOnly: true, visibility: 'Domestic' },
      { label: 'Route Planning (Mill → Delivery)', name: 'routePlanning', type: 'text', visibility: 'Domestic' },
      { label: 'Estimated Transit Days', name: 'estTransitDays', type: 'number', visibility: 'Domestic' },
      { label: 'Vehicle Type Required', name: 'vehicleTypeReq', type: 'text', visibility: 'Domestic' },
      { label: 'Stuffing Date', name: 'stuffingDate', type: 'date', visibility: 'Export' },
      { label: 'CFS / ICD Name', name: 'cfsIcdName', type: 'text', visibility: 'Export' },
      { label: 'Port of Loading', name: 'portOfLoading', type: 'text', readOnly: true, visibility: 'Export' },
      { label: 'Shipping Line (preliminary)', name: 'shippingLine', type: 'text', visibility: 'Export' },
      { label: 'ETD', name: 'etd', type: 'date', visibility: 'Export' },
      { label: 'Warehouse to Dispatch From', name: 'warehouse', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'No. of Trips / Loads', name: 'noOfTrips', type: 'number', visibility: 'Common' },
      { label: 'Planned By', name: 'plannedBy', type: 'text', visibility: 'Common' },
      { label: 'Remarks', name: 'remarks', type: 'text', visibility: 'Common' }
    ]
  },
  {
    file: 'PackingInstruction.jsx', name: 'PackingInstruction', title: 'Stage 6 - Packing Instruction', action: 'Issue Instruction', modalTitle: 'Packing Instructions', storageKey: 'dispatch_6_history',
    pendingCols: [
      { header: 'Dispatch Plan ID', accessor: 'dispatchPlanId' },
      { header: 'Sales Order No', accessor: 'salesOrderNo' },
      { header: 'Order Type', accessor: 'orderType' },
      { header: 'Customer Name', accessor: 'customerName' },
      { header: 'Rice Grade', accessor: 'riceGrade' },
      { header: 'Reserved Qty MT', accessor: 'reservedQtyMt' },
      { header: 'No. of Bags', accessor: 'bagsReserved' },
      { header: 'Planned Dispatch Date', accessor: 'plannedDispatchDate' },
      { header: 'Warehouse', accessor: 'warehouse' }
    ],
    historyCols: [
      { header: 'Packing Instruction ID', accessor: 'packingInstructionId' },
      { header: 'Dispatch Plan ID', accessor: 'dispatchPlanId' },
      { header: 'Sales Order No', accessor: 'salesOrderNo' },
      { header: 'Order Type', accessor: 'orderType' },
      { header: 'Customer Name', accessor: 'customerName' },
      { header: 'Rice Grade', accessor: 'riceGrade' },
      { header: 'Bag Type', accessor: 'bagType' },
      { header: 'Bag Size', accessor: 'bagSize' },
      { header: 'Brand / Label', accessor: 'brandLabel' },
      { header: 'Pallet Required', accessor: 'palletReq' },
      { header: 'Fumigation Required', accessor: 'fumigationReq' },
      { header: 'Packing Supervisor', accessor: 'packingSupervisor' },
      { header: 'Instruction Date', accessor: 'instructionDate' }
    ],
    autoField: { key: 'packingInstructionId', prefix: 'PKI' },
    fields: [
      { label: 'Dispatch Plan ID', name: 'dispatchPlanId', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Sales Order No', name: 'salesOrderNo', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Order Type', name: 'orderType', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Packing Instruction ID', name: 'packingInstructionId', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Instruction Date', name: 'instructionDate', type: 'date', visibility: 'Common' },
      { label: 'Rice Grade', name: 'riceGrade', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Bag Type', name: 'bagType', type: 'select', options: ['PP', 'BOPP', 'Jute'], visibility: 'Common' },
      { label: 'Bag Size', name: 'bagSize', type: 'select', options: ['1kg', '2kg', '5kg', '10kg', '25kg', '50kg'], visibility: 'Common' },
      { label: 'Brand / Label to Use', name: 'brandLabel', type: 'text', visibility: 'Common' },
      { label: 'MRP ₹', name: 'mrp', type: 'number', visibility: 'Common' },
      { label: 'FSSAI No', name: 'fssaiNo', type: 'text', visibility: 'Common' },
      { label: 'Special Label Instructions', name: 'specialLabelInst', type: 'text', visibility: 'Common' },
      { label: 'Stacking Instructions', name: 'stackingInst', type: 'text', visibility: 'Domestic' },
      { label: 'Delivery Challan Label Format', name: 'dcLabelFormat', type: 'text', visibility: 'Domestic' },
      { label: 'Pallet Required', name: 'palletReq', type: 'select', options: ['Yes', 'No'], visibility: 'Export' },
      { label: 'Pallet Type', name: 'palletType', type: 'select', options: ['Wood', 'Plastic'], visibility: 'Export' },
      { label: 'Bags per Pallet', name: 'bagsPerPallet', type: 'number', visibility: 'Export' },
      { label: 'Container Marking', name: 'containerMarking', type: 'text', visibility: 'Export' },
      { label: 'Fumigation Required', name: 'fumigationReq', type: 'select', options: ['Yes', 'No'], visibility: 'Export' },
      { label: 'Phytosanitary Required', name: 'phytoReq', type: 'select', options: ['Yes', 'No'], visibility: 'Export' },
      { label: 'Country-specific Labelling Requirements', name: 'countryLabelling', type: 'text', visibility: 'Export' },
      { label: 'Net Weight per Bag Kg', name: 'netWeightPerBag', type: 'number', visibility: 'Common' },
      { label: 'Gross Weight per Bag Kg', name: 'grossWeightPerBag', type: 'number', visibility: 'Common' },
      { label: 'Packing Supervisor', name: 'packingSupervisor', type: 'text', visibility: 'Common' },
      { label: 'Packing Remarks', name: 'packingRemarks', type: 'text', visibility: 'Common' }
    ]
  },
  {
    file: 'QualityClearance.jsx', name: 'QualityClearance', title: 'Stage 7 - Quality Clearance', action: 'Clear QC', modalTitle: 'QC Clearance Details', storageKey: 'dispatch_7_history',
    pendingCols: [
      { header: 'Packing Instruction ID', accessor: 'packingInstructionId' },
      { header: 'Sales Order No', accessor: 'salesOrderNo' },
      { header: 'Order Type', accessor: 'orderType' },
      { header: 'Customer Name', accessor: 'customerName' },
      { header: 'Rice Grade', accessor: 'riceGrade' },
      { header: 'Bag Type', accessor: 'bagType' },
      { header: 'Bag Size', accessor: 'bagSize' },
      { header: 'Planned Dispatch Date', accessor: 'plannedDispatchDate' }
    ],
    historyCols: [
      { header: 'QC Clearance ID', accessor: 'qcClearanceId' },
      { header: 'Sales Order No', accessor: 'salesOrderNo' },
      { header: 'Order Type', accessor: 'orderType' },
      { header: 'Customer Name', accessor: 'customerName' },
      { header: 'Rice Grade', accessor: 'riceGrade' },
      { header: 'Clearance Date', accessor: 'clearanceDate' },
      { header: 'Moisture %', accessor: 'moisture' },
      { header: 'Broken %', accessor: 'broken' },
      { header: 'QC Result', accessor: 'qcResult' },
      { header: 'Lab Cert No', accessor: 'labCertNo' },
      { header: 'EIA Cert No', accessor: 'eiaCertNo' },
      { header: 'QC Approval', accessor: 'qcApproval' },
      { header: 'QC Inspector', accessor: 'qcInspector' }
    ],
    autoField: { key: 'qcClearanceId', prefix: 'QCC' },
    fields: [
      { label: 'Packing Instruction ID', name: 'packingInstructionId', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Sales Order No', name: 'salesOrderNo', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Order Type', name: 'orderType', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'QC Clearance ID', name: 'qcClearanceId', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Clearance Date', name: 'clearanceDate', type: 'date', visibility: 'Common' },
      { label: 'QC Inspector', name: 'qcInspector', type: 'text', visibility: 'Common' },
      { label: 'Moisture %', name: 'moisture', type: 'number', visibility: 'Common' },
      { label: 'Broken %', name: 'broken', type: 'number', visibility: 'Common' },
      { label: 'Chalky %', name: 'chalky', type: 'number', visibility: 'Common' },
      { label: 'Foreign Matter %', name: 'foreignMatter', type: 'number', visibility: 'Common' },
      { label: 'Colour / Whiteness', name: 'colour', type: 'text', visibility: 'Common' },
      { label: 'Bag Integrity Check', name: 'bagIntegrity', type: 'select', options: ['Pass', 'Fail'], visibility: 'Common' },
      { label: 'Weight per Bag Verification', name: 'weightVerif', type: 'select', options: ['Pass', 'Fail'], visibility: 'Common' },
      { label: 'Label Accuracy', name: 'labelAccuracy', type: 'select', options: ['Pass', 'Fail'], visibility: 'Common' },
      { label: 'Lot / Batch No Verified', name: 'lotVerified', type: 'select', options: ['Pass', 'Fail'], visibility: 'Common' },
      { label: 'Lab Certificate Required', name: 'labCertReq', type: 'select', options: ['Yes', 'No'], visibility: 'Export' },
      { label: 'Lab Certificate No', name: 'labCertNo', type: 'text', visibility: 'Export' },
      { label: 'Lab Cert Issuing Authority', name: 'labCertAuth', type: 'text', visibility: 'Export' },
      { label: 'EIA Name', name: 'eiaName', type: 'text', visibility: 'Export' },
      { label: 'EIA Inspection Date', name: 'eiaDate', type: 'date', visibility: 'Export' },
      { label: 'EIA Certificate No', name: 'eiaCertNo', type: 'text', visibility: 'Export' },
      { label: 'Phytosanitary Certificate No', name: 'phytoCertNo', type: 'text', visibility: 'Export' },
      { label: 'QC Result', name: 'qcResult', type: 'select', options: ['Pass', 'Fail', 'Conditional'], visibility: 'Common' },
      { label: 'QC Approval for Dispatch', name: 'qcApproval', type: 'select', options: ['Yes', 'No'], visibility: 'Common' },
      { label: 'Rejection Reason', name: 'rejectionReason', type: 'text', visibility: 'Common' },
      { label: 'QC Remarks', name: 'qcRemarks', type: 'text', visibility: 'Common' }
    ]
  },
  {
    file: 'DispatchOrderStage.jsx', name: 'DispatchOrderStage', title: 'Stage 8 - Dispatch Order', action: 'Issue DO', modalTitle: 'Dispatch Order Details', storageKey: 'dispatch_8_history',
    pendingCols: [
      { header: 'QC Clearance ID', accessor: 'qcClearanceId' },
      { header: 'Sales Order No', accessor: 'salesOrderNo' },
      { header: 'Order Type', accessor: 'orderType' },
      { header: 'Customer Name', accessor: 'customerName' },
      { header: 'Rice Grade', accessor: 'riceGrade' },
      { header: 'QC Result', accessor: 'qcResult' },
      { header: 'QC Approval', accessor: 'qcApproval' },
      { header: 'Clearance Date', accessor: 'clearanceDate' }
    ],
    historyCols: [
      { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' },
      { header: 'QC Clearance ID', accessor: 'qcClearanceId' },
      { header: 'Sales Order No', accessor: 'salesOrderNo' },
      { header: 'Order Type', accessor: 'orderType' },
      { header: 'Customer / Buyer Name', accessor: 'customerName' },
      { header: 'Rice Grade', accessor: 'riceGrade' },
      { header: 'Lot No', accessor: 'lotNo' },
      { header: 'Batch No', accessor: 'batchNo' },
      { header: 'Qty to Dispatch MT', accessor: 'qtyToDispatch' },
      { header: 'No. of Bags', accessor: 'noOfBags' },
      { header: 'Warehouse', accessor: 'warehouse' },
      { header: 'DO Date', accessor: 'doDate' },
      { header: 'DO Issued By', accessor: 'doIssuedBy' }
    ],
    autoField: { key: 'dispatchOrderNo', prefix: 'DO' },
    fields: [
      { label: 'QC Clearance ID', name: 'qcClearanceId', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Sales Order No', name: 'salesOrderNo', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Order Type', name: 'orderType', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Dispatch Order No', name: 'dispatchOrderNo', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'DO Date', name: 'doDate', type: 'date', visibility: 'Common' },
      { label: 'Customer Name', name: 'customerName', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Rice Grade', name: 'riceGrade', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Lot No', name: 'lotNo', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Batch No', name: 'batchNo', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Quantity to Dispatch MT', name: 'qtyToDispatch', type: 'number', readOnly: true, visibility: 'Common' },
      { label: 'No. of Bags', name: 'noOfBags', type: 'number', readOnly: true, visibility: 'Common' },
      { label: 'Warehouse', name: 'warehouse', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Delivery Address', name: 'deliveryAddress', type: 'text', readOnly: true, visibility: 'Domestic' },
      { label: 'Customer GSTIN', name: 'customerGstin', type: 'text', readOnly: true, visibility: 'Domestic' },
      { label: 'HSN Code', name: 'hsnCode', type: 'text', visibility: 'Domestic' },
      { label: 'Port of Loading', name: 'portOfLoading', type: 'text', readOnly: true, visibility: 'Export' },
      { label: 'Port of Destination', name: 'portOfDestination', type: 'text', readOnly: true, visibility: 'Export' },
      { label: 'Incoterms', name: 'incoterms', type: 'text', readOnly: true, visibility: 'Export' },
      { label: 'Payment Terms', name: 'paymentTerms', type: 'text', readOnly: true, visibility: 'Export' },
      { label: 'Buyer Country', name: 'buyerCountry', type: 'text', readOnly: true, visibility: 'Export' },
      { label: 'Dispatch Priority', name: 'dispatchPriority', type: 'select', options: ['Normal', 'Urgent'], visibility: 'Common' },
      { label: 'DO Issued By', name: 'doIssuedBy', type: 'text', visibility: 'Common' },
      { label: 'DO Remarks', name: 'doRemarks', type: 'text', visibility: 'Common' }
    ]
  },
  {
    file: 'VehicleAllocation.jsx', name: 'VehicleAllocation', title: 'Stage 9 - Vehicle / Container Allocation', action: 'Allocate', modalTitle: 'Allocation Details', storageKey: 'dispatch_9_history',
    pendingCols: [
      { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' },
      { header: 'Sales Order No', accessor: 'salesOrderNo' },
      { header: 'Order Type', accessor: 'orderType' },
      { header: 'Customer Name', accessor: 'customerName' },
      { header: 'Rice Grade', accessor: 'riceGrade' },
      { header: 'Qty to Dispatch MT', accessor: 'qtyToDispatch' },
      { header: 'No. of Bags', accessor: 'noOfBags' },
      { header: 'DO Date', accessor: 'doDate' }
    ],
    historyCols: [
      { header: 'Allocation ID', accessor: 'allocationId' },
      { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' },
      { header: 'Sales Order No', accessor: 'salesOrderNo' },
      { header: 'Order Type', accessor: 'orderType' },
      { header: 'Vehicle No / Container No', accessor: 'vehicleOrContainerNo' },
      { header: 'Driver / Shipping Line', accessor: 'driverOrShippingLine' },
      { header: 'Transporter / Forwarding Agent', accessor: 'transporterOrAgent' },
      { header: 'Freight ₹ or $', accessor: 'totalFreight' },
      { header: 'Expected Departure', accessor: 'expectedDeparture' },
      { header: 'ETA Date', accessor: 'etaDate' },
      { header: 'Allocated By', accessor: 'allocatedBy' }
    ],
    autoField: { key: 'allocationId', prefix: 'VCA' },
    fields: [
      { label: 'Dispatch Order No', name: 'dispatchOrderNo', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Sales Order No', name: 'salesOrderNo', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Order Type', name: 'orderType', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Allocation ID', name: 'allocationId', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Allocation Date', name: 'allocationDate', type: 'date', visibility: 'Common' },
      { label: 'Vehicle Number', name: 'vehicleNumber', type: 'text', visibility: 'Domestic' },
      { label: 'Vehicle Type', name: 'vehicleType', type: 'text', visibility: 'Domestic' },
      { label: 'Vehicle Make/Model', name: 'vehicleModel', type: 'text', visibility: 'Domestic' },
      { label: 'Vehicle Capacity MT', name: 'vehicleCapacity', type: 'number', visibility: 'Domestic' },
      { label: 'Driver Name', name: 'driverName', type: 'text', visibility: 'Domestic' },
      { label: 'Driver Phone', name: 'driverPhone', type: 'text', visibility: 'Domestic' },
      { label: 'Driver License No', name: 'driverLicense', type: 'text', visibility: 'Domestic' },
      { label: 'Driver License Expiry', name: 'driverLicenseExp', type: 'date', visibility: 'Domestic' },
      { label: 'Transporter Name', name: 'transporterName', type: 'text', visibility: 'Domestic' },
      { label: 'Transporter Phone', name: 'transporterPhone', type: 'text', visibility: 'Domestic' },
      { label: 'Transporter GSTIN', name: 'transporterGstin', type: 'text', visibility: 'Domestic' },
      { label: 'Route (Mill → Delivery Point)', name: 'route', type: 'text', visibility: 'Domestic' },
      { label: 'Freight Rate ₹/MT', name: 'freightRate', type: 'number', visibility: 'Domestic' },
      { label: 'Total Freight ₹ (auto)', name: 'totalFreight', type: 'number', visibility: 'Domestic' },
      { label: 'Advance to Driver ₹', name: 'advanceDriver', type: 'number', visibility: 'Domestic' },
      { label: 'Shipping Line Name', name: 'shippingLine', type: 'text', visibility: 'Export' },
      { label: 'Booking Reference No', name: 'bookingRef', type: 'text', visibility: 'Export' },
      { label: 'Container Type (20ft/40ft/40HC)', name: 'containerType', type: 'select', options: ['20ft', '40ft', '40HC'], visibility: 'Export' },
      { label: 'No. of Containers', name: 'noOfContainers', type: 'number', visibility: 'Export' },
      { label: 'Container No(s)', name: 'containerNos', type: 'text', visibility: 'Export' },
      { label: 'Seal No(s)', name: 'sealNos', type: 'text', visibility: 'Export' },
      { label: 'CFS / ICD Name', name: 'cfsIcdName', type: 'text', visibility: 'Export' },
      { label: 'Stuffing Date & Time', name: 'stuffingDate', type: 'datetime-local', visibility: 'Export' },
      { label: 'Freight Rate $/Container', name: 'freightRateContainer', type: 'number', visibility: 'Export' },
      { label: 'Total Freight $ (auto)', name: 'totalFreightUsd', type: 'number', visibility: 'Export' },
      { label: 'Forwarding Agent Name', name: 'forwardingAgent', type: 'text', visibility: 'Export' },
      { label: 'CHA Name', name: 'chaName', type: 'text', visibility: 'Export' },
      { label: 'CHA License No', name: 'chaLicense', type: 'text', visibility: 'Export' },
      { label: 'Expected Departure Date', name: 'expectedDeparture', type: 'date', visibility: 'Common' },
      { label: 'Expected Delivery / ETA Date', name: 'etaDate', type: 'date', visibility: 'Common' },
      { label: 'Allocated By', name: 'allocatedBy', type: 'text', visibility: 'Common' },
      { label: 'Remarks', name: 'remarks', type: 'text', visibility: 'Common' }
    ]
  },
  {
    file: 'Loading.jsx', name: 'Loading', title: 'Stage 10 - Loading', action: 'Start Loading', modalTitle: 'Loading Details', storageKey: 'dispatch_10_history',
    pendingCols: [
      { header: 'Allocation ID', accessor: 'allocationId' },
      { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' },
      { header: 'Sales Order No', accessor: 'salesOrderNo' },
      { header: 'Order Type', accessor: 'orderType' },
      { header: 'Customer Name', accessor: 'customerName' },
      { header: 'Vehicle / Container No', accessor: 'vehicleOrContainerNo' },
      { header: 'Rice Grade', accessor: 'riceGrade' },
      { header: 'Qty MT', accessor: 'qtyToDispatch' },
      { header: 'Expected Departure', accessor: 'expectedDeparture' }
    ],
    historyCols: [
      { header: 'Loading ID', accessor: 'loadingId' },
      { header: 'Allocation ID', accessor: 'allocationId' },
      { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' },
      { header: 'Sales Order No', accessor: 'salesOrderNo' },
      { header: 'Order Type', accessor: 'orderType' },
      { header: 'Vehicle / Container No', accessor: 'vehicleOrContainerNo' },
      { header: 'No. of Bags Loaded', accessor: 'bagsLoaded' },
      { header: 'Total Loaded Weight MT', accessor: 'totalLoadedWeight' },
      { header: 'Shortage MT', accessor: 'shortageMt' },
      { header: 'Fumigation Done', accessor: 'fumigationDone' },
      { header: 'Loading Supervisor', accessor: 'loadingSupervisor' },
      { header: 'Loading Date', accessor: 'loadingDate' }
    ],
    autoField: { key: 'loadingId', prefix: 'LD' },
    fields: [
      { label: 'Allocation ID', name: 'allocationId', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Dispatch Order No', name: 'dispatchOrderNo', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Order Type', name: 'orderType', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Loading ID', name: 'loadingId', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Loading Date & Time', name: 'loadingDate', type: 'datetime-local', visibility: 'Common' },
      { label: 'Vehicle / Container No', name: 'vehicleOrContainerNo', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Loading Bay / Platform No', name: 'loadingBay', type: 'text', visibility: 'Common' },
      { label: 'No. of Bags Loaded', name: 'bagsLoaded', type: 'number', visibility: 'Common' },
      { label: 'Total Loaded Weight MT', name: 'totalLoadedWeight', type: 'number', visibility: 'Common' },
      { label: 'Lot No', name: 'lotNo', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Batch No', name: 'batchNo', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Stuffing Supervisor', name: 'stuffingSupervisor', type: 'text', visibility: 'Export' },
      { label: 'Loading Surveyor Name', name: 'loadingSurveyor', type: 'text', visibility: 'Export' },
      { label: 'Surveyor Company', name: 'surveyorCompany', type: 'text', visibility: 'Export' },
      { label: 'Fumigation Done', name: 'fumigationDone', type: 'select', options: ['Yes', 'No'], visibility: 'Export' },
      { label: 'Fumigation Certificate No', name: 'fumigationCertNo', type: 'text', visibility: 'Export' },
      { label: 'Fumigation Agency', name: 'fumigationAgency', type: 'text', visibility: 'Export' },
      { label: 'Stacking Pattern', name: 'stackingPattern', type: 'text', visibility: 'Common' },
      { label: 'Loading Supervisor', name: 'loadingSupervisor', type: 'text', visibility: 'Common' },
      { label: 'Shortage / Damage at Loading MT', name: 'shortageMt', type: 'number', visibility: 'Common' },
      { label: 'Loading Remarks', name: 'loadingRemarks', type: 'text', visibility: 'Common' }
    ]
  },
  {
    file: 'FinalWeighment.jsx', name: 'FinalWeighment', title: 'Stage 11 - Final Weighment', action: 'Record Weight', modalTitle: 'Weighment Details', storageKey: 'dispatch_11_history',
    pendingCols: [
      { header: 'Loading ID', accessor: 'loadingId' },
      { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' },
      { header: 'Sales Order No', accessor: 'salesOrderNo' },
      { header: 'Order Type', accessor: 'orderType' },
      { header: 'Customer Name', accessor: 'customerName' },
      { header: 'Vehicle / Container No', accessor: 'vehicleOrContainerNo' },
      { header: 'No. of Bags', accessor: 'bagsLoaded' },
      { header: 'Total Loaded Weight MT', accessor: 'totalLoadedWeight' },
      { header: 'Loading Date', accessor: 'loadingDate' }
    ],
    historyCols: [
      { header: 'Weight Slip No', accessor: 'weightSlipNo' },
      { header: 'Loading ID', accessor: 'loadingId' },
      { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' },
      { header: 'Sales Order No', accessor: 'salesOrderNo' },
      { header: 'Order Type', accessor: 'orderType' },
      { header: 'Vehicle / Container No', accessor: 'vehicleOrContainerNo' },
      { header: 'Gross Weight Kg', accessor: 'grossWeight' },
      { header: 'Tare Weight Kg', accessor: 'tareWeight' },
      { header: 'Net Weight Kg', accessor: 'netWeight' },
      { header: 'Variance MT', accessor: 'varianceMt' },
      { header: 'VGM (Export)', accessor: 'vgm' },
      { header: 'VGM Submitted', accessor: 'vgmSubmitted' },
      { header: 'Weighbridge Operator', accessor: 'weighbridgeOperator' },
      { header: 'Weigh Date', accessor: 'weighDate' }
    ],
    autoField: { key: 'weightSlipNo', prefix: 'WS' },
    fields: [
      { label: 'Loading ID', name: 'loadingId', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Dispatch Order No', name: 'dispatchOrderNo', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Order Type', name: 'orderType', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Weight Slip No', name: 'weightSlipNo', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Weigh Date & Time', name: 'weighDate', type: 'datetime-local', visibility: 'Common' },
      { label: 'Vehicle / Container No', name: 'vehicleOrContainerNo', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Gross Weight Kg', name: 'grossWeight', type: 'number', visibility: 'Common' },
      { label: 'Tare Weight Kg', name: 'tareWeight', type: 'number', visibility: 'Common' },
      { label: 'Net Weight Kg (auto)', name: 'netWeight', type: 'number', visibility: 'Common' },
      { label: 'Weighbridge ID', name: 'weighbridgeId', type: 'text', visibility: 'Common' },
      { label: 'Weighbridge Operator', name: 'weighbridgeOperator', type: 'text', visibility: 'Common' },
      { label: 'Variance vs Loading MT (auto)', name: 'varianceMt', type: 'number', visibility: 'Common' },
      { label: 'Variance Reason (if >0.5%)', name: 'varianceReason', type: 'text', visibility: 'Common' },
      { label: 'VGM (Verified Gross Mass) Kg', name: 'vgm', type: 'number', visibility: 'Export' },
      { label: 'VGM Submitted to Shipping Line', name: 'vgmSubmitted', type: 'select', options: ['Yes', 'No'], visibility: 'Export' },
      { label: 'Remarks', name: 'remarks', type: 'text', visibility: 'Common' }
    ]
  },
  {
    file: 'DispatchDocuments.jsx', name: 'DispatchDocuments', title: 'Stage 12 - Dispatch Documents', action: 'Generate Docs', modalTitle: 'Document Generation', storageKey: 'dispatch_12_history',
    pendingCols: [
      { header: 'Weight Slip No', accessor: 'weightSlipNo' },
      { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' },
      { header: 'Sales Order No', accessor: 'salesOrderNo' },
      { header: 'Order Type', accessor: 'orderType' },
      { header: 'Customer Name', accessor: 'customerName' },
      { header: 'Vehicle / Container No', accessor: 'vehicleOrContainerNo' },
      { header: 'Net Weight Kg', accessor: 'netWeight' },
      { header: 'Weigh Date', accessor: 'weighDate' }
    ],
    historyCols: [
      { header: 'Doc Bundle ID', accessor: 'docBundleId' },
      { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' },
      { header: 'Sales Order No', accessor: 'salesOrderNo' },
      { header: 'Order Type', accessor: 'orderType' },
      { header: 'Customer Name', accessor: 'customerName' },
      { header: 'Document Date', accessor: 'documentDate' },
      { header: 'Invoice No (INV/CI)', accessor: 'invoiceOrCiNo' },
      { header: 'E-Way Bill No (DOM)', accessor: 'ewayBillNo' },
      { header: 'Delivery Challan No (DOM)', accessor: 'dcNo' },
      { header: 'Shipping Bill No (EXP)', accessor: 'shippingBillNo' },
      { header: 'BL No (EXP)', accessor: 'blNo' },
      { header: 'COO No (EXP)', accessor: 'cooNo' },
      { header: 'Gate Pass No', accessor: 'gatePassNo' },
      { header: 'Compiled By', accessor: 'compiledBy' }
    ],
    autoField: { key: 'docBundleId', prefix: 'DOC' },
    fields: [
      { label: 'Doc Bundle ID', name: 'docBundleId', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Document Date', name: 'documentDate', type: 'date', visibility: 'Common' },
      { label: 'Order Type', name: 'orderType', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Tax Invoice No (auto)', name: 'taxInvoiceNo', type: 'text', readOnly: true, visibility: 'Domestic' },
      { label: 'Invoice Date', name: 'invoiceDate', type: 'date', visibility: 'Domestic' },
      { label: 'Customer GSTIN', name: 'customerGstin', type: 'text', readOnly: true, visibility: 'Domestic' },
      { label: 'HSN Code', name: 'hsnCode', type: 'text', visibility: 'Domestic' },
      { label: 'Rice Grade', name: 'riceGrade', type: 'text', readOnly: true, visibility: 'Domestic' },
      { label: 'Quantity MT', name: 'qtyMt', type: 'number', visibility: 'Domestic' },
      { label: 'Rate ₹/MT', name: 'rateInr', type: 'number', visibility: 'Domestic' },
      { label: 'Basic Amount ₹ (auto)', name: 'basicAmountInr', type: 'number', readOnly: true, visibility: 'Domestic' },
      { label: 'GST Rate %', name: 'gstRate', type: 'number', visibility: 'Domestic' },
      { label: 'CGST ₹ (intra-state, auto)', name: 'cgst', type: 'number', readOnly: true, visibility: 'Domestic' },
      { label: 'SGST ₹ (intra-state, auto)', name: 'sgst', type: 'number', readOnly: true, visibility: 'Domestic' },
      { label: 'IGST ₹ (inter-state, auto)', name: 'igst', type: 'number', readOnly: true, visibility: 'Domestic' },
      { label: 'Packing/Freight Charges ₹', name: 'freightChargesInr', type: 'number', visibility: 'Domestic' },
      { label: 'Grand Total ₹ (auto)', name: 'grandTotalInr', type: 'number', readOnly: true, visibility: 'Domestic' },
      { label: 'Payment Due Date', name: 'paymentDueDate', type: 'date', visibility: 'Domestic' },
      { label: 'E-Way Bill No (auto)', name: 'ewayBillNo', type: 'text', readOnly: true, visibility: 'Domestic' },
      { label: 'EWB Valid Till (auto)', name: 'ewbValidTill', type: 'date', visibility: 'Domestic' },
      { label: 'Transport Distance km', name: 'transportDistance', type: 'number', visibility: 'Domestic' },
      { label: 'Mode of Transport', name: 'modeOfTransport', type: 'text', visibility: 'Domestic' },
      { label: 'Delivery Challan No (auto)', name: 'dcNo', type: 'text', readOnly: true, visibility: 'Domestic' },
      { label: 'LR / GR No', name: 'lrNo', type: 'text', visibility: 'Domestic' },
      { label: 'Transporter Name', name: 'transporterName', type: 'text', readOnly: true, visibility: 'Domestic' },
      { label: 'Commercial Invoice No (auto)', name: 'ciNo', type: 'text', readOnly: true, visibility: 'Export' },
      { label: 'CI Date', name: 'ciDate', type: 'date', visibility: 'Export' },
      { label: 'Currency', name: 'currency', type: 'text', readOnly: true, visibility: 'Export' },
      { label: 'Price $/MT', name: 'priceUsd', type: 'number', visibility: 'Export' },
      { label: 'Total Value $ (auto)', name: 'totalValueUsd', type: 'number', readOnly: true, visibility: 'Export' },
      { label: 'Packing List No (auto)', name: 'packingListNo', type: 'text', readOnly: true, visibility: 'Export' },
      { label: 'No. of Bags', name: 'noOfBagsExport', type: 'number', visibility: 'Export' },
      { label: 'Net Weight MT', name: 'netWeightMt', type: 'number', visibility: 'Export' },
      { label: 'Gross Weight MT', name: 'grossWeightMt', type: 'number', visibility: 'Export' },
      { label: 'Marks & Numbers', name: 'marksNumbers', type: 'text', visibility: 'Export' },
      { label: 'Shipping Bill No (auto)', name: 'shippingBillNo', type: 'text', readOnly: true, visibility: 'Export' },
      { label: 'Shipping Bill Date', name: 'sbDate', type: 'date', visibility: 'Export' },
      { label: 'Customs House Location', name: 'customsLocation', type: 'text', visibility: 'Export' },
      { label: 'IEC Code', name: 'iecCode', type: 'text', visibility: 'Export' },
      { label: 'GSTIN (Exporter)', name: 'gstinExporter', type: 'text', visibility: 'Export' },
      { label: 'FOB Value $', name: 'fobValue', type: 'number', visibility: 'Export' },
      { label: 'Drawback Claim', name: 'drawbackClaim', type: 'select', options: ['Yes', 'No'], visibility: 'Export' },
      { label: 'Drawback Amount ₹', name: 'drawbackAmount', type: 'number', visibility: 'Export' },
      { label: 'RoDTEP Claim', name: 'rodtepClaim', type: 'select', options: ['Yes', 'No'], visibility: 'Export' },
      { label: 'RoDTEP Amount ₹', name: 'rodtepAmount', type: 'number', visibility: 'Export' },
      { label: 'LEO Date', name: 'leoDate', type: 'date', visibility: 'Export' },
      { label: 'Certificate of Origin No (auto)', name: 'cooNo', type: 'text', readOnly: true, visibility: 'Export' },
      { label: 'COO Issuing Authority', name: 'cooAuth', type: 'select', options: ['APEDA', 'Chamber of Commerce'], visibility: 'Export' },
      { label: 'Country of Origin', name: 'countryOfOrigin', type: 'text', visibility: 'Export' },
      { label: 'COO Validity Date', name: 'cooValidity', type: 'date', visibility: 'Export' },
      { label: 'Fumigation Certificate No', name: 'fumigationCertNo', type: 'text', readOnly: true, visibility: 'Export' },
      { label: 'Phytosanitary Certificate No', name: 'phytoCertNo', type: 'text', visibility: 'Export' },
      { label: 'Phyto Issuing Authority (Agriculture Dept)', name: 'phytoAuth', type: 'text', visibility: 'Export' },
      { label: 'Bill of Lading No (auto)', name: 'blNo', type: 'text', readOnly: true, visibility: 'Export' },
      { label: 'BL Date', name: 'blDate', type: 'date', visibility: 'Export' },
      { label: 'BL Type', name: 'blType', type: 'select', options: ['Original', 'Telex Release'], visibility: 'Export' },
      { label: 'Vessel Name', name: 'vesselName', type: 'text', readOnly: true, visibility: 'Export' },
      { label: 'Voyage No', name: 'voyageNo', type: 'text', readOnly: true, visibility: 'Export' },
      { label: 'Shipper Name', name: 'shipperName', type: 'text', visibility: 'Export' },
      { label: 'Consignee Name', name: 'consigneeName', type: 'text', visibility: 'Export' },
      { label: 'Notify Party', name: 'notifyParty', type: 'text', visibility: 'Export' },
      { label: 'Port of Loading', name: 'portOfLoading', type: 'text', readOnly: true, visibility: 'Export' },
      { label: 'Port of Discharge', name: 'portOfDischarge', type: 'text', readOnly: true, visibility: 'Export' },
      { label: 'Freight Terms', name: 'freightTerms', type: 'select', options: ['Prepaid', 'Collect'], visibility: 'Export' },
      { label: 'No. of Original BL Copies', name: 'blCopies', type: 'number', visibility: 'Export' },
      { label: 'Insurance Policy No', name: 'insPolicyNo', type: 'text', visibility: 'Export' },
      { label: 'Insurance Company', name: 'insCompany', type: 'text', visibility: 'Export' },
      { label: 'Sum Insured $', name: 'sumInsured', type: 'number', visibility: 'Export' },
      { label: 'SWIFT Code / IBAN', name: 'swiftIban', type: 'text', visibility: 'Export' },
      { label: 'Bank Reference No', name: 'bankRefNo', type: 'text', visibility: 'Export' },
      { label: 'LC No (if applicable)', name: 'lcNo', type: 'text', visibility: 'Export' },
      { label: 'Gate Pass No (auto)', name: 'gatePassNo', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Seal / Lock No', name: 'sealLockNo', type: 'text', visibility: 'Common' },
      { label: 'Documents Compiled By', name: 'compiledBy', type: 'text', visibility: 'Common' }
    ]
  },
  {
    file: 'GatePass.jsx', name: 'GatePass', title: 'Stage 13 - Gate Pass', action: 'Issue Gate Pass', modalTitle: 'Gate Pass Details', storageKey: 'dispatch_13_history',
    pendingCols: [
      { header: 'Doc Bundle ID', accessor: 'docBundleId' },
      { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' },
      { header: 'Sales Order No', accessor: 'salesOrderNo' },
      { header: 'Order Type', accessor: 'orderType' },
      { header: 'Customer Name', accessor: 'customerName' },
      { header: 'Vehicle / Container No', accessor: 'vehicleOrContainerNo' },
      { header: 'Invoice No / CI No', accessor: 'invoiceOrCiNo' },
      { header: 'Net Weight Kg', accessor: 'netWeight' },
      { header: 'Document Date', accessor: 'documentDate' }
    ],
    historyCols: [
      { header: 'Gate Pass No', accessor: 'gatePassNo' },
      { header: 'Doc Bundle ID', accessor: 'docBundleId' },
      { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' },
      { header: 'Sales Order No', accessor: 'salesOrderNo' },
      { header: 'Order Type', accessor: 'orderType' },
      { header: 'Gate Pass Issue Date & Time', accessor: 'gatePassDate' },
      { header: 'Vehicle / Container No', accessor: 'vehicleOrContainerNo' },
      { header: 'Driver Name', accessor: 'driverName' },
      { header: 'Invoice Ref', accessor: 'invoiceRef' },
      { header: 'No. of Bags', accessor: 'noOfBags' },
      { header: 'Net Weight Kg', accessor: 'netWeight' },
      { header: 'Destination', accessor: 'destination' },
      { header: 'Exit Gate', accessor: 'exitGate' },
      { header: 'Security Guard', accessor: 'securityName' },
      { header: 'Issued By', accessor: 'issuedBy' }
    ],
    autoField: { key: 'gatePassNo', prefix: 'GP' },
    fields: [
      { label: 'Doc Bundle ID', name: 'docBundleId', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Dispatch Order No', name: 'dispatchOrderNo', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Sales Order No', name: 'salesOrderNo', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Order Type', name: 'orderType', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Gate Pass No', name: 'gatePassNo', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Gate Pass Issue Date & Time', name: 'gatePassDate', type: 'datetime-local', visibility: 'Common' },
      { label: 'Vehicle / Container No', name: 'vehicleOrContainerNo', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Driver Name', name: 'driverName', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Invoice Reference', name: 'invoiceRef', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Delivery Challan Ref (DOM)', name: 'dcRef', type: 'text', readOnly: true, visibility: 'Domestic' },
      { label: 'Shipping Bill Ref (EXP)', name: 'sbRef', type: 'text', readOnly: true, visibility: 'Export' },
      { label: 'No. of Bags', name: 'noOfBags', type: 'number', visibility: 'Common' },
      { label: 'Net Weight Kg', name: 'netWeight', type: 'number', readOnly: true, visibility: 'Common' },
      { label: 'Destination (Delivery Addr / Port)', name: 'destination', type: 'text', visibility: 'Common' },
      { label: 'Exit Gate No', name: 'exitGate', type: 'text', visibility: 'Common' },
      { label: 'Security Guard Name', name: 'securityName', type: 'text', visibility: 'Common' },
      { label: 'Security Guard ID', name: 'securityId', type: 'text', visibility: 'Common' },
      { label: 'Seal No (Export)', name: 'sealNo', type: 'text', readOnly: true, visibility: 'Export' },
      { label: 'Issued By', name: 'issuedBy', type: 'text', visibility: 'Common' },
      { label: 'Outward Time', name: 'outwardTime', type: 'time', visibility: 'Common' }
    ]
  },
  {
    file: 'DispatchConfirmation.jsx', name: 'DispatchConfirmation', title: 'Stage 14 - Dispatch Confirmation & Delivery', action: 'Confirm', modalTitle: 'Dispatch Confirmation Details', storageKey: 'dispatch_14_history',
    pendingCols: [
      { header: 'Gate Pass No', accessor: 'gatePassNo' },
      { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' },
      { header: 'Sales Order No', accessor: 'salesOrderNo' },
      { header: 'Order Type', accessor: 'orderType' },
      { header: 'Customer Name', accessor: 'customerName' },
      { header: 'Vehicle / Container No', accessor: 'vehicleOrContainerNo' },
      { header: 'Gate Pass Issue Date', accessor: 'gatePassDate' },
      { header: 'Net Weight Kg', accessor: 'netWeight' }
    ],
    historyCols: [
      { header: 'Confirmation ID', accessor: 'confirmationId' },
      { header: 'Gate Pass No', accessor: 'gatePassNo' },
      { header: 'Sales Order No', accessor: 'salesOrderNo' },
      { header: 'Order Type', accessor: 'orderType' },
      { header: 'Customer Name', accessor: 'customerName' },
      { header: 'Delivery / Shipment Date', accessor: 'deliveryDate' },
      { header: 'Bags Received (DOM)', accessor: 'bagsReceived' },
      { header: 'Condition (DOM)', accessor: 'arrivalCondition' },
      { header: 'Vessel Departed (EXP)', accessor: 'vesselDeparted' },
      { header: 'BL No (EXP)', accessor: 'blNo' },
      { header: 'Shipment Status (EXP)', accessor: 'shipmentStatus' },
      { header: 'FIRC No (EXP)', accessor: 'fircNo' },
      { header: 'Delivery Status', accessor: 'deliveryStatus' },
      { header: 'Confirmed By', accessor: 'confirmedBy' }
    ],
    autoField: { key: 'confirmationId', prefix: 'CNF' },
    fields: [
      { label: 'Gate Pass No', name: 'gatePassNo', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Dispatch Order No', name: 'dispatchOrderNo', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Sales Order No', name: 'salesOrderNo', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Order Type', name: 'orderType', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Confirmation ID', name: 'confirmationId', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Actual Delivery Date', name: 'actualDelivery', type: 'date', visibility: 'Domestic' },
      { label: 'Received By (Name)', name: 'receivedBy', type: 'text', visibility: 'Domestic' },
      { label: 'Receiver Phone', name: 'receiverPhone', type: 'text', visibility: 'Domestic' },
      { label: 'No. of Bags Received', name: 'bagsReceived', type: 'number', visibility: 'Domestic' },
      { label: 'Net Weight Received Kg', name: 'netWeightReceived', type: 'number', visibility: 'Domestic' },
      { label: 'Condition on Arrival', name: 'arrivalCondition', type: 'select', options: ['Good', 'Damaged', 'Short'], visibility: 'Domestic' },
      { label: 'Shortage Bags', name: 'shortageBags', type: 'number', visibility: 'Domestic' },
      { label: 'Shortage Weight Kg', name: 'shortageWeight', type: 'number', visibility: 'Domestic' },
      { label: 'POD Document Ref', name: 'podRef', type: 'text', visibility: 'Domestic' },
      { label: 'Driver Confirmation', name: 'driverConfirmation', type: 'select', options: ['Yes', 'No'], visibility: 'Domestic' },
      { label: 'Vessel Departed', name: 'vesselDeparted', type: 'select', options: ['Yes', 'No'], visibility: 'Export' },
      { label: 'Actual ETD', name: 'actualEtd', type: 'date', visibility: 'Export' },
      { label: 'Vessel Name', name: 'vesselName', type: 'text', readOnly: true, visibility: 'Export' },
      { label: 'Voyage No', name: 'voyageNo', type: 'text', readOnly: true, visibility: 'Export' },
      { label: 'BL No', name: 'blNo', type: 'text', readOnly: true, visibility: 'Export' },
      { label: 'Shipment Status', name: 'shipmentStatus', type: 'select', options: ['On Board', 'In Transit', 'Arrived'], visibility: 'Export' },
      { label: 'FIRC No (if payment received)', name: 'fircNo', type: 'text', visibility: 'Export' },
      { label: 'FIRC Date', name: 'fircDate', type: 'date', visibility: 'Export' },
      { label: 'Delivery / Shipment Status', name: 'deliveryStatus', type: 'select', options: ['Complete', 'Partial', 'Disputed'], visibility: 'Common' },
      { label: 'Customer / Buyer Feedback', name: 'feedback', type: 'text', visibility: 'Common' },
      { label: 'Outstanding Issues', name: 'outstandingIssues', type: 'text', visibility: 'Common' },
      { label: 'Confirmed By', name: 'confirmedBy', type: 'text', visibility: 'Common' }
    ]
  },
  {
    file: 'BillingAndClosure.jsx', name: 'BillingAndClosure', title: 'Stage 15 - Billing & Order Closure', action: 'Close Order', modalTitle: 'Order Closure Details', storageKey: 'dispatch_15_history',
    pendingCols: [
      { header: 'Confirmation ID', accessor: 'confirmationId' },
      { header: 'Gate Pass No', accessor: 'gatePassNo' },
      { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' },
      { header: 'Sales Order No', accessor: 'salesOrderNo' },
      { header: 'Order Type', accessor: 'orderType' },
      { header: 'Customer Name', accessor: 'customerName' },
      { header: 'Invoice No / CI No', accessor: 'invoiceOrCiNo' },
      { header: 'Total Invoice Value', accessor: 'invoiceValue' },
      { header: 'Delivery Status', accessor: 'deliveryStatus' },
      { header: 'Confirmed By', accessor: 'confirmedBy' }
    ],
    historyCols: [
      { header: 'Closure ID', accessor: 'closureId' },
      { header: 'Sales Order No', accessor: 'salesOrderNo' },
      { header: 'Order Type', accessor: 'orderType' },
      { header: 'Customer Name', accessor: 'customerName' },
      { header: 'Closure Date', accessor: 'closureDate' },
      { header: 'Invoice Value', accessor: 'invoiceValue' },
      { header: 'Payment Received', accessor: 'paymentReceived' },
      { header: 'Outstanding Balance', accessor: 'outstandingBalance' },
      { header: 'FIRC No (EXP)', accessor: 'fircNo' },
      { header: 'BRC No (EXP)', accessor: 'brcNo' },
      { header: 'Drawback ₹ (EXP)', accessor: 'drawbackReceived' },
      { header: 'RoDTEP ₹ (EXP)', accessor: 'rodtepReceived' },
      { header: 'Dispute', accessor: 'anyDispute' },
      { header: 'Order Status', accessor: 'orderStatus' },
      { header: 'Closed By', accessor: 'closedBy' }
    ],
    autoField: { key: 'closureId', prefix: 'CLS' },
    fields: [
      { label: 'Confirmation ID', name: 'confirmationId', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Sales Order No', name: 'salesOrderNo', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Order Type', name: 'orderType', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Closure ID', name: 'closureId', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Closure Date', name: 'closureDate', type: 'date', visibility: 'Common' },
      { label: 'Invoice No / CI No', name: 'invoiceOrCiNo', type: 'text', readOnly: true, visibility: 'Common' },
      { label: 'Invoice Value ₹ or $', name: 'invoiceValue', type: 'number', readOnly: true, visibility: 'Common' },
      { label: 'Advance Received ₹', name: 'advanceReceived', type: 'number', visibility: 'Common' },
      { label: 'Payment Mode', name: 'paymentMode', type: 'select', options: ['NEFT', 'RTGS', 'Cheque', 'LC', 'TT'], visibility: 'Common' },
      { label: 'Payment Received ₹ or $', name: 'paymentReceived', type: 'number', visibility: 'Common' },
      { label: 'Outstanding Balance ₹ or $ (auto)', name: 'outstandingBalance', type: 'number', readOnly: true, visibility: 'Common' },
      { label: 'Payment Due Date', name: 'paymentDueDate', type: 'date', visibility: 'Common' },
      { label: 'Days Overdue (auto)', name: 'daysOverdue', type: 'number', readOnly: true, visibility: 'Common' },
      { label: 'CGST / SGST / IGST Paid ₹', name: 'gstPaid', type: 'number', visibility: 'Domestic' },
      { label: 'TDS Deducted ₹', name: 'tdsDeducted', type: 'number', visibility: 'Domestic' },
      { label: 'Forex Rate ₹/$ at Receipt', name: 'forexRate', type: 'number', visibility: 'Export' },
      { label: 'INR Equivalent ₹ (auto)', name: 'inrEquivalent', type: 'number', readOnly: true, visibility: 'Export' },
      { label: 'FIRC No', name: 'fircNo', type: 'text', readOnly: true, visibility: 'Export' },
      { label: 'BRC No (Bank Realization Certificate)', name: 'brcNo', type: 'text', visibility: 'Export' },
      { label: 'BRC Date', name: 'brcDate', type: 'date', visibility: 'Export' },
      { label: 'BRC Amount $', name: 'brcAmount', type: 'number', visibility: 'Export' },
      { label: 'Drawback Received ₹', name: 'drawbackReceived', type: 'number', visibility: 'Export' },
      { label: 'RoDTEP Received ₹', name: 'rodtepReceived', type: 'number', visibility: 'Export' },
      { label: 'Any Dispute', name: 'anyDispute', type: 'select', options: ['Yes', 'No'], visibility: 'Common' },
      { label: 'Disputed Amount ₹ or $', name: 'disputedAmount', type: 'number', visibility: 'Common' },
      { label: 'Dispute Reason', name: 'disputeReason', type: 'text', visibility: 'Common' },
      { label: 'Dispute Resolved', name: 'disputeResolved', type: 'select', options: ['Yes', 'No'], visibility: 'Common' },
      { label: 'Order Status', name: 'orderStatus', type: 'select', options: ['Completed', 'Partial', 'Disputed', 'Written-off'], visibility: 'Common' },
      { label: 'Closed By', name: 'closedBy', type: 'text', visibility: 'Common' },
      { label: 'Closure Remarks', name: 'closureRemarks', type: 'text', visibility: 'Common' }
    ]
  }
];

const generateDummyData = () => Array.from({ length: 40 }, (_, i) => {
  const orderType = i % 2 === 0 ? 'Export' : 'Domestic';
  return {
    id: i + 1,
    salesOrderNo: `SO-00${(i + 1).toString().padStart(2, '0')}`,
    orderDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
    orderType,
    customerName: `Customer ${i + 1}`,
    riceGrade: ['Basmati 1121', 'Sella', 'Non-Basmati PR11'][i % 3],
    quantityMt: 20 + (i % 30),
    price: orderType === 'Export' ? 850 + (i % 50) : 42000 + (i * 100),
    totalOrderValue: orderType === 'Export' ? (850 + i % 50) * (20 + i % 30) : (42000 + i * 100) * (20 + i % 30),
    expectedDeliveryDate: `2026-07-${(i % 28 + 5).toString().padStart(2, '0')}`,
    priority: i % 3 === 0 ? 'Urgent' : 'Normal',
    receivedBy: 'Sales Team',
    deliveryAddress: `Warehouse ${i + 1}, City`,
    customerGstin: `22AAAAA000${i}A1Z5`,
    portOfLoading: 'Nhava Sheva',
    portOfDestination: 'Dubai Port',
    incoterms: 'FOB',
    currency: 'USD',
    paymentTerms: 'LC',
    buyerCountry: 'UAE',
    approvalId: `APR-00${(i + 1).toString().padStart(2, '0')}`,
    approvedQty: 20 + (i % 30),
    approvedPrice: orderType === 'Export' ? 850 + i % 50 : 42000 + i * 100,
    approvedTotalValue: orderType === 'Export' ? (850 + i % 50) * (20 + i % 30) : (42000 + i * 100) * (20 + i % 30),
    approvalStatus: 'Approved',
    approvedBy: 'Manager',
    approvalDate: `2026-06-${(i % 28 + 2).toString().padStart(2, '0')}`,
    stockCheckId: `SCK-00${(i + 1).toString().padStart(2, '0')}`,
    availableFgStock: 50 + i,
    availableLotNos: `LT-00${(i + 1).toString().padStart(2, '0')}`,
    availableBatchNos: `BT-00${(i + 1).toString().padStart(2, '0')}`,
    availableWarehouse: `Godown ${(i % 3) + 1}`,
    stockSufficient: 'Yes',
    shortfallMt: 0,
    checkedBy: 'Warehouse Team',
    checkDate: `2026-06-${(i % 28 + 3).toString().padStart(2, '0')}`,
    reservationId: `RSV-00${(i + 1).toString().padStart(2, '0')}`,
    lotNo: `LT-00${(i + 1).toString().padStart(2, '0')}`,
    batchNo: `BT-00${(i + 1).toString().padStart(2, '0')}`,
    warehouse: `Godown ${(i % 3) + 1}`,
    reservedQtyMt: 20 + (i % 30),
    bagsReserved: (20 + i % 30) * 20,
    fefoDate: `2026-09-${(i % 28 + 1).toString().padStart(2, '0')}`,
    reservedBy: 'Store Manager',
    dispatchPlanId: `DP-00${(i + 1).toString().padStart(2, '0')}`,
    plannedDispatchDate: `2026-07-${(i % 28 + 3).toString().padStart(2, '0')}`,
    plannedBy: 'Logistics',
    routeOrCfs: orderType === 'Export' ? 'CFS Nhava Sheva' : 'Route A - City 1 to City 2',
    packingInstructionId: `PKI-00${(i + 1).toString().padStart(2, '0')}`,
    bagType: 'PP',
    bagSize: '25kg',
    brandLabel: 'Rice Mill Brand',
    packingSupervisor: 'Packing Lead',
    instructionDate: `2026-07-${(i % 28 + 1).toString().padStart(2, '0')}`,
    qcClearanceId: `QCC-00${(i + 1).toString().padStart(2, '0')}`,
    moisture: 12.5,
    broken: 3.2,
    qcResult: 'Pass',
    qcApproval: 'Yes',
    qcInspector: 'QC Officer',
    clearanceDate: `2026-07-${(i % 28 + 2).toString().padStart(2, '0')}`,
    labCertNo: orderType === 'Export' ? `LAB-00${i + 1}` : '',
    eiaCertNo: orderType === 'Export' ? `EIA-00${i + 1}` : '',
    dispatchOrderNo: `DO-00${(i + 1).toString().padStart(2, '0')}`,
    qtyToDispatch: 20 + (i % 30),
    noOfBags: (20 + i % 30) * 20,
    doDate: `2026-07-${(i % 28 + 3).toString().padStart(2, '0')}`,
    doIssuedBy: 'Dispatch Manager',
    allocationId: `VCA-00${(i + 1).toString().padStart(2, '0')}`,
    vehicleOrContainerNo: orderType === 'Export' ? `MSCU${1234567 + i}` : `MH01AB${1000 + i}`,
    driverOrShippingLine: orderType === 'Export' ? 'MSC Shipping' : 'Driver Ramesh',
    transporterOrAgent: orderType === 'Export' ? 'Freight Forwarder XYZ' : 'Transporter ABC',
    totalFreight: orderType === 'Export' ? 1500 + i * 10 : 25000 + i * 500,
    expectedDeparture: `2026-07-${(i % 28 + 4).toString().padStart(2, '0')}`,
    etaDate: `2026-07-${(i % 28 + 10).toString().padStart(2, '0')}`,
    allocatedBy: 'Logistics Officer',
    allocationDate: `2026-07-${(i % 28 + 3).toString().padStart(2, '0')}`,
    loadingId: `LD-00${(i + 1).toString().padStart(2, '0')}`,
    bagsLoaded: (20 + i % 30) * 20,
    totalLoadedWeight: 20 + (i % 30),
    loadingSupervisor: 'Loading In-charge',
    loadingDate: `2026-07-${(i % 28 + 4).toString().padStart(2, '0')}`,
    fumigationDone: orderType === 'Export' ? 'Yes' : 'No',
    weightSlipNo: `WS-00${(i + 1).toString().padStart(2, '0')}`,
    grossWeight: (20 + i % 30) * 1000 + 5000,
    tareWeight: 5000,
    netWeight: (20 + i % 30) * 1000,
    varianceMt: 0,
    weighbridgeOperator: 'Weighbridge Operator',
    weighDate: `2026-07-${(i % 28 + 4).toString().padStart(2, '0')}`,
    docBundleId: `DOC-00${(i + 1).toString().padStart(2, '0')}`,
    invoiceOrCiNo: orderType === 'Export' ? `CI-00${(i + 1).toString().padStart(2, '0')}` : `INV-00${(i + 1).toString().padStart(2, '0')}`,
    ewayBillNo: orderType === 'Domestic' ? `EWB-00${(i + 1).toString().padStart(2, '0')}` : '',
    dcNo: orderType === 'Domestic' ? `DC-00${(i + 1).toString().padStart(2, '0')}` : '',
    shippingBillNo: orderType === 'Export' ? `SB-00${(i + 1).toString().padStart(2, '0')}` : '',
    blNo: orderType === 'Export' ? `BL-00${(i + 1).toString().padStart(2, '0')}` : '',
    cooNo: orderType === 'Export' ? `COO-00${(i + 1).toString().padStart(2, '0')}` : '',
    gatePassNo: `GP-00${(i + 1).toString().padStart(2, '0')}`,
    compiledBy: 'Documentation Team',
    documentDate: `2026-07-${(i % 28 + 4).toString().padStart(2, '0')}`,
    confirmationId: `CNF-00${(i + 1).toString().padStart(2, '0')}`,
    deliveryStatus: 'Complete',
    confirmedBy: 'Admin',
    vesselDeparted: orderType === 'Export' ? 'Yes' : '',
    shipmentStatus: orderType === 'Export' ? 'On Board' : '',
    fircNo: orderType === 'Export' ? `FIRC-00${i + 1}` : '',
    closureId: `CLS-00${(i + 1).toString().padStart(2, '0')}`,
    invoiceValue: orderType === 'Export' ? (850 + i % 50) * (20 + i % 30) : (42000 + i * 100) * (20 + i % 30),
    paymentReceived: orderType === 'Export' ? (850 + i % 50) * (20 + i % 30) : (42000 + i * 100) * (20 + i % 30),
    outstandingBalance: 0,
    orderStatus: 'Completed',
    closedBy: 'Finance',
    status: 'Completed'
  };
});

const template = (stage) => `import React, { useState, useEffect } from 'react';
import { Search, Play, Plus } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input, Label, Select } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import DataTable from '../../components/DataTable';
import { usePagination } from '../../hooks/usePagination';
import { Modal } from '../../components/ui/Modal';
import { PageTabs } from '../../components/PageTabs';

const DUMMY_DATA = ${JSON.stringify(generateDummyData(), null, 2)};

export const ${stage.name} = () => {
  const getInitialData = () => {
    let master = JSON.parse(localStorage.getItem('dispatch_master'));
    let rawPending = JSON.parse(localStorage.getItem('${stage.readFrom}')) || [];
    const rawHistory = JSON.parse(localStorage.getItem('${stage.storageKey}')) || [];
    
    if (!master || master.length === 0) {
      master = DUMMY_DATA;
      localStorage.setItem('dispatch_master', JSON.stringify(master));
      
      const initialIds = Array.from({length: 40}, (_, index) => index + 1);
      localStorage.setItem('dispatch_0_history', JSON.stringify(initialIds));
      rawPending = initialIds;
      
      for(let i=1; i<=15; i++) {
        const numItems = Math.max(0, (16 - i) * 2); 
        const ids = Array.from({length: numItems}, (_, index) => index + 1);
        localStorage.setItem(\`dispatch_\${i}_history\`, JSON.stringify(ids));
      }
    }
    
    const resolvedPending = rawPending.map(id => master.find(m => m.id === id)).filter(Boolean);
    const resolvedHistory = rawHistory.map(id => master.find(m => m.id === id)).filter(Boolean);
    
    const pending = resolvedPending.filter(p => !rawHistory.includes(p.id));
    return { pending, history: resolvedHistory };
  };

  const initial = getInitialData();
  const [pendingItems, setPendingItems] = useState(initial.pending);
  const [historyItems, setHistoryItems] = useState(initial.history);
  
  const [activeTab, setActiveTab] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({});

  const displayData = activeTab === 'pending' ? pendingItems : historyItems;
  const filteredData = displayData.filter(item =>
    Object.values(item).some(val => String(val).toLowerCase().includes(searchTerm.toLowerCase()))
  );
  const pagination = usePagination(filteredData, 10);

  const handleActionClick = (item) => {
    setSelectedItem(item);
    const autoKey = '${stage.autoField.key}';
    const prefix = '${stage.autoField.prefix}';
    const num = String(historyItems.length + 1).padStart(4, '0');
    const autoVal = prefix + '-' + num;
    
    // Extra auto-fields for Stage 12
    const extraAuto = {};
    if ('${stage.name}' === 'DispatchDocuments') {
      const n = String(historyItems.length + 1).padStart(4, '0');
      extraAuto.taxInvoiceNo = 'INV-' + n;
      extraAuto.ewayBillNo = 'EWB-' + n;
      extraAuto.dcNo = 'DC-' + n;
      extraAuto.ciNo = 'CI-' + n;
      extraAuto.packingListNo = 'PL-' + n;
      extraAuto.shippingBillNo = 'SB-' + n;
      extraAuto.cooNo = 'COO-' + n;
      extraAuto.blNo = 'BL-' + n;
      extraAuto.gatePassNo = 'GP-' + n;
    }

    setFormData({ ...item, [autoKey]: autoVal, ...extraAuto });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    let isNew = false;
    let processedItem = { ...formData, status: 'Completed' };
    
    if (selectedItem) {
      processedItem = { ...selectedItem, ...formData, status: 'Completed' };
    } else {
      isNew = true;
      processedItem.id = Date.now();
    }
    
    const master = JSON.parse(localStorage.getItem('dispatch_master')) || [];
    if (isNew) {
      master.unshift(processedItem);
    } else {
      const idx = master.findIndex(m => m.id === processedItem.id);
      if (idx >= 0) master[idx] = processedItem;
    }
    localStorage.setItem('dispatch_master', JSON.stringify(master));

    const rawHistory = JSON.parse(localStorage.getItem('${stage.storageKey}')) || [];
    if (!rawHistory.includes(processedItem.id)) {
      rawHistory.unshift(processedItem.id);
      localStorage.setItem('${stage.storageKey}', JSON.stringify(rawHistory));
    }
    
    if (isNew) {
       const rawPending = JSON.parse(localStorage.getItem('${stage.readFrom}')) || [];
       rawPending.unshift(processedItem.id);
       localStorage.setItem('${stage.readFrom}', JSON.stringify(rawPending));
    }
    
    setHistoryItems([processedItem, ...historyItems]);
    if (selectedItem) {
      setPendingItems(pendingItems.filter(p => p.id !== selectedItem.id));
    }
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const allFields = ${JSON.stringify(stage.fields)};

  const actionColumn = {
    header: 'Action',
    className: 'text-right',
    cell: (row) => (
      <div className="flex justify-end">
        <Button size="sm" onClick={() => handleActionClick(row)} className="flex items-center gap-1 bg-primary text-white">
          <Play size={14} /> ${stage.action}
        </Button>
      </div>
    )
  };

  const pendingCols = ${JSON.stringify(stage.pendingCols)};
  const historyCols = ${JSON.stringify(stage.historyCols)};
  const columns = activeTab === 'pending' ? [actionColumn, ...pendingCols] : historyCols;

  const domesticCount = pendingItems.filter(i => i.orderType === 'Domestic').length;
  const exportCount = pendingItems.filter(i => i.orderType === 'Export').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-3">
        <h2 className="text-2xl font-bold text-slate-800">${stage.title}</h2>
        ${stage.name === 'SalesOrder' ? `
        <Button onClick={() => { setSelectedItem(null); setFormData({ salesOrderNo: 'SO-NEW-' + Math.floor(Math.random()*10000) }); setIsModalOpen(true); }} className="flex items-center gap-2">
          <Plus size={16} /> Create New Order
        </Button>
        ` : ''}
        <div className="flex gap-3 text-sm">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg text-blue-700">
            <span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>
            Domestic: <strong>{domesticCount}</strong>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg text-green-700">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
            Export: <strong>{exportCount}</strong>
          </div>
        </div>
      </div>

      <PageTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <Card>
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input type="text" placeholder="Search..." value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
          </div>
        </div>
        <DataTable columns={columns} data={pagination.paginatedData}
          currentPage={pagination.currentPage} totalPages={pagination.totalPages}
          itemsPerPage={pagination.itemsPerPage} onPageChange={pagination.setCurrentPage}
          onItemsPerPageChange={pagination.setItemsPerPage} totalResults={pagination.totalResults} />
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="${stage.modalTitle} Details" size="4xl">
        <div className="p-6 max-h-[85vh] overflow-y-auto">
          {/* Color Legend */}
          <div className="flex gap-4 mb-6 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-blue-100 border border-blue-300 inline-block"></span> 🔵 Blue = Domestic only</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-300 inline-block"></span> 🟢 Green = Export only</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-slate-100 border border-slate-300 inline-block"></span> ⚫ Grey = Common to both</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {allFields.map((f, idx) => {
              const orderType = formData.orderType || '';
              if (f.visibility === 'Domestic' && orderType !== 'Domestic') return null;
              if (f.visibility === 'Export' && orderType !== 'Export') return null;

              let inputClass = f.readOnly 
                ? 'w-full mt-1.5 bg-slate-50 text-slate-600 cursor-not-allowed rounded-md border-slate-200'
                : 'w-full mt-1.5 bg-white text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm border-slate-300';
                
              if (f.visibility === 'Domestic') {
                inputClass = f.readOnly ? 'w-full mt-1.5 bg-blue-50 text-blue-900 cursor-not-allowed rounded-md border-blue-200' : 'w-full mt-1.5 bg-white text-blue-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm border-blue-300';
              } else if (f.visibility === 'Export') {
                inputClass = f.readOnly ? 'w-full mt-1.5 bg-emerald-50 text-emerald-900 cursor-not-allowed rounded-md border-emerald-200' : 'w-full mt-1.5 bg-white text-emerald-900 focus:ring-emerald-500 focus:border-emerald-500 rounded-md shadow-sm border-emerald-300';
              }

              return (
                <div key={idx} className="space-y-1">
                  <Label className="text-sm font-medium text-slate-700">{f.label}</Label>
                  {f.type === 'select' ? (
                    <Select value={formData[f.name] || ''} disabled={f.readOnly}
                      onChange={(e) => !f.readOnly && setFormData({ ...formData, [f.name]: e.target.value })}
                      className={inputClass}>
                      <option value="">Select...</option>
                      {(f.options || []).map((opt, oi) => <option key={oi} value={opt}>{opt}</option>)}
                    </Select>
                  ) : (
                    <Input type={f.type} value={formData[f.name] || ''} readOnly={f.readOnly}
                      onChange={(e) => !f.readOnly && setFormData({ ...formData, [f.name]: e.target.value })}
                      className={inputClass} />
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex justify-end gap-3 pt-8 border-t border-slate-100 mt-8">
            <Button onClick={() => setIsModalOpen(false)} variant="outline" className="px-6">Cancel</Button>
            <Button onClick={handleSave} className="px-6 bg-blue-600 hover:bg-blue-700 text-white shadow-sm">Save Details</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
`;

const dir = path.join(__dirname, 'src', 'modules', 'dispatch');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

stages.forEach((stage, idx) => {
  stage.storageKey = `dispatch_${idx + 1}_history`;
  stage.readFrom = `dispatch_${idx}_history`;
  fs.writeFileSync(path.join(dir, stage.file), template(stage));
  console.log(`Created ${stage.file}`);
});
