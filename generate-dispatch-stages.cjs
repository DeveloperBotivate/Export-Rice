const fs = require('fs');
const path = require('path');

const stages = [
  {
    file: 'StockReservation.jsx', name: 'StockReservation', title: 'Stage 2 - Stock Reservation', action: 'Reserve Stock', modalTitle: 'Stock Reservation Details',
    pendingCols: [
      { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' }, { header: 'Order Date', accessor: 'orderDate' },
      { header: 'Order Type', accessor: 'orderType' }, { header: 'Customer Name', accessor: 'customerName' },
      { header: 'Rice Grade', accessor: 'riceGrade' }, { header: 'Quantity (MT)', accessor: 'quantity' },
      { header: 'No. of Bags', accessor: 'noOfBags' }, { header: 'Required Dispatch Date', accessor: 'reqDispatchDate' },
      { header: 'Priority', accessor: 'priority' }
    ],
    historyCols: [
      { header: 'Reservation ID', accessor: 'reservationId' }, { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' },
      { header: 'Customer Name', accessor: 'customerName' }, { header: 'FG Stock ID', accessor: 'fgStockId' },
      { header: 'Rice Grade', accessor: 'riceGrade' }, { header: 'Lot No', accessor: 'lotNo' },
      { header: 'Batch No', accessor: 'batchNo' }, { header: 'Reserved Qty (MT)', accessor: 'reservedQty' },
      { header: 'No. of Bags', accessor: 'reservedBags' }, { header: 'Warehouse', accessor: 'warehouse' },
      { header: 'Go-down', accessor: 'godown' }, { header: 'Rack/Bin', accessor: 'rackBin' },
      { header: 'Reservation Date', accessor: 'reservationDate' }, { header: 'Reserved By', accessor: 'reservedBy' }
    ],
    fields: [
      { label: 'Dispatch Order No', name: 'dispatchOrderNo', type: 'text', readOnly: true },
      { label: 'Reservation ID', name: 'reservationId', type: 'text', readOnly: true },
      { label: 'Reservation Date', name: 'reservationDate', type: 'date' },
      { label: 'FG Stock ID', name: 'fgStockId', type: 'text' },
      { label: 'Rice Grade', name: 'riceGrade', type: 'text', readOnly: true },
      { label: 'Lot No', name: 'lotNo', type: 'text' },
      { label: 'Batch No', name: 'batchNo', type: 'text' },
      { label: 'Warehouse', name: 'warehouse', type: 'text' },
      { label: 'Go-down', name: 'godown', type: 'text' },
      { label: 'Rack/Bin', name: 'rackBin', type: 'text' },
      { label: 'Available Stock (MT)', name: 'availableStock', type: 'number' },
      { label: 'Reserved Quantity (MT)', name: 'reservedQty', type: 'number' },
      { label: 'No. of Bags Reserved', name: 'reservedBags', type: 'number' },
      { label: 'Reserved By', name: 'reservedBy', type: 'text' },
      { label: 'Expiry/FEFO Date', name: 'fefoDate', type: 'date' },
      { label: 'Remarks', name: 'remarks', type: 'text' }
    ]
  },
  {
    file: 'PickingList.jsx', name: 'PickingList', title: 'Stage 3 - Picking List', action: 'Create Pick List', modalTitle: 'Pick List Details',
    pendingCols: [
      { header: 'Reservation ID', accessor: 'reservationId' }, { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' },
      { header: 'Customer Name', accessor: 'customerName' }, { header: 'Rice Grade', accessor: 'riceGrade' },
      { header: 'Reserved Qty (MT)', accessor: 'reservedQty' }, { header: 'No. of Bags', accessor: 'reservedBags' },
      { header: 'Lot No', accessor: 'lotNo' }, { header: 'Batch No', accessor: 'batchNo' },
      { header: 'Warehouse', accessor: 'warehouse' }, { header: 'Go-down', accessor: 'godown' },
      { header: 'Rack/Bin', accessor: 'rackBin' }, { header: 'Reservation Date', accessor: 'reservationDate' }
    ],
    historyCols: [
      { header: 'Pick List No', accessor: 'pickListNo' }, { header: 'Reservation ID', accessor: 'reservationId' },
      { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' }, { header: 'Customer Name', accessor: 'customerName' },
      { header: 'Warehouse', accessor: 'warehouse' }, { header: 'Go-down', accessor: 'godown' },
      { header: 'Rack/Bin', accessor: 'rackBin' }, { header: 'Rice Grade', accessor: 'riceGrade' },
      { header: 'Lot No', accessor: 'lotNo' }, { header: 'Batch No', accessor: 'batchNo' },
      { header: 'Picked Qty (MT)', accessor: 'pickedQty' }, { header: 'No. of Bags', accessor: 'pickedBags' },
      { header: 'Pick Date', accessor: 'pickDate' }, { header: 'Picked By', accessor: 'pickedBy' },
      { header: 'Supervisor', accessor: 'supervisor' }
    ],
    fields: [
      { label: 'Reservation ID', name: 'reservationId', type: 'text', readOnly: true },
      { label: 'Dispatch Order No', name: 'dispatchOrderNo', type: 'text', readOnly: true },
      { label: 'Pick List No', name: 'pickListNo', type: 'text', readOnly: true },
      { label: 'Pick Date', name: 'pickDate', type: 'date' },
      { label: 'Warehouse', name: 'warehouse', type: 'text', readOnly: true },
      { label: 'Go-down/Rack/Bin', name: 'location', type: 'text', readOnly: true },
      { label: 'Item Name', name: 'itemName', type: 'text' },
      { label: 'Rice Grade', name: 'riceGrade', type: 'text', readOnly: true },
      { label: 'Lot No', name: 'lotNo', type: 'text', readOnly: true },
      { label: 'Batch No', name: 'batchNo', type: 'text', readOnly: true },
      { label: 'Quantity to Pick (MT)', name: 'pickedQty', type: 'number' },
      { label: 'No. of Bags', name: 'pickedBags', type: 'number' },
      { label: 'Picked By', name: 'pickedBy', type: 'text' },
      { label: 'Supervisor Name', name: 'supervisor', type: 'text' },
      { label: 'Picker Remarks', name: 'pickerRemarks', type: 'text' }
    ]
  },
  {
    file: 'Loading.jsx', name: 'Loading', title: 'Stage 4 - Loading', action: 'Load Vehicle', modalTitle: 'Loading Details',
    pendingCols: [
      { header: 'Pick List No', accessor: 'pickListNo' }, { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' },
      { header: 'Customer Name', accessor: 'customerName' }, { header: 'Rice Grade', accessor: 'riceGrade' },
      { header: 'Picked Qty (MT)', accessor: 'pickedQty' }, { header: 'No. of Bags', accessor: 'pickedBags' },
      { header: 'Lot No', accessor: 'lotNo' }, { header: 'Batch No', accessor: 'batchNo' },
      { header: 'Pick Date', accessor: 'pickDate' }, { header: 'Picked By', accessor: 'pickedBy' }
    ],
    historyCols: [
      { header: 'Loading ID', accessor: 'loadingId' }, { header: 'Pick List No', accessor: 'pickListNo' },
      { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' }, { header: 'Customer Name', accessor: 'customerName' },
      { header: 'Vehicle Number', accessor: 'vehicleNumber' }, { header: 'No. of Bags Loaded', accessor: 'bagsLoaded' },
      { header: 'Total Loaded Weight (MT)', accessor: 'weightLoaded' }, { header: 'Shortage (MT)', accessor: 'shortage' },
      { header: 'Loading Date', accessor: 'loadingDate' }, { header: 'Loading Supervisor', accessor: 'loadingSupervisor' }
    ],
    fields: [
      { label: 'Pick List No', name: 'pickListNo', type: 'text', readOnly: true },
      { label: 'Dispatch Order No', name: 'dispatchOrderNo', type: 'text', readOnly: true },
      { label: 'Loading ID', name: 'loadingId', type: 'text', readOnly: true },
      { label: 'Loading Date & Time', name: 'loadingDate', type: 'datetime-local' },
      { label: 'Vehicle Number', name: 'vehicleNumber', type: 'text' },
      { label: 'Driver Name', name: 'driverName', type: 'text' },
      { label: 'No. of Bags Loaded', name: 'bagsLoaded', type: 'number' },
      { label: 'Total Loaded Weight (MT)', name: 'weightLoaded', type: 'number' },
      { label: 'Loading Platform/Bay', name: 'loadingBay', type: 'text' },
      { label: 'Loading Supervisor', name: 'loadingSupervisor', type: 'text' },
      { label: 'Stacking Pattern', name: 'stackingPattern', type: 'text' },
      { label: 'Shortage (MT)', name: 'shortage', type: 'number' },
      { label: 'Shortage Reason', name: 'shortageReason', type: 'text' },
      { label: 'Loading Remarks', name: 'remarks', type: 'text' }
    ]
  },
  {
    file: 'VehicleAssignment.jsx', name: 'VehicleAssignment', title: 'Stage 5 - Vehicle Assignment', action: 'Assign Vehicle', modalTitle: 'Vehicle Details',
    pendingCols: [
      { header: 'Loading ID', accessor: 'loadingId' }, { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' },
      { header: 'Customer Name', accessor: 'customerName' }, { header: 'Vehicle Number', accessor: 'vehicleNumber' },
      { header: 'No. of Bags Loaded', accessor: 'bagsLoaded' }, { header: 'Total Loaded Weight (MT)', accessor: 'weightLoaded' },
      { header: 'Loading Date', accessor: 'loadingDate' }, { header: 'Loading Supervisor', accessor: 'loadingSupervisor' }
    ],
    historyCols: [
      { header: 'Loading ID', accessor: 'loadingId' }, { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' },
      { header: 'Vehicle Number', accessor: 'vehicleNumber' }, { header: 'Vehicle Type', accessor: 'vehicleType' },
      { header: 'Driver Name', accessor: 'driverName' }, { header: 'Driver Phone', accessor: 'driverPhone' },
      { header: 'Transporter Name', accessor: 'transporterName' }, { header: 'Vehicle Capacity (MT)', accessor: 'vehicleCapacity' },
      { header: 'Route', accessor: 'route' }, { header: 'Freight Rate (₹/MT)', accessor: 'freightRate' },
      { header: 'Total Freight (₹)', accessor: 'totalFreight' }, { header: 'Expected Departure', accessor: 'expectedDeparture' },
      { header: 'Expected Delivery Date', accessor: 'expectedDelivery' }, { header: 'Assigned Date', accessor: 'assignedDate' }
    ],
    fields: [
      { label: 'Loading ID', name: 'loadingId', type: 'text', readOnly: true },
      { label: 'Dispatch Order No', name: 'dispatchOrderNo', type: 'text', readOnly: true },
      { label: 'Vehicle Number', name: 'vehicleNumber', type: 'text' },
      { label: 'Vehicle Type', name: 'vehicleType', type: 'select', options: ['Truck', 'Container', 'Tempo'] },
      { label: 'Vehicle Make/Model', name: 'vehicleMake', type: 'text' },
      { label: 'Driver Name', name: 'driverName', type: 'text' },
      { label: 'Driver Phone', name: 'driverPhone', type: 'text' },
      { label: 'Driver License No', name: 'driverLicense', type: 'text' },
      { label: 'Driver License Expiry', name: 'driverLicenseExpiry', type: 'date' },
      { label: 'Transporter Name', name: 'transporterName', type: 'text' },
      { label: 'Transporter Phone', name: 'transporterPhone', type: 'text' },
      { label: 'Transporter GSTIN', name: 'transporterGst', type: 'text' },
      { label: 'Vehicle Capacity (MT)', name: 'vehicleCapacity', type: 'number' },
      { label: 'Route (Mill → Dest)', name: 'route', type: 'text' },
      { label: 'Expected Departure Date', name: 'expectedDeparture', type: 'datetime-local' },
      { label: 'Expected Delivery Date', name: 'expectedDelivery', type: 'date' },
      { label: 'Freight Rate (₹/MT)', name: 'freightRate', type: 'number' },
      { label: 'Total Freight Amount (₹)', name: 'totalFreight', type: 'number', readOnly: true },
      { label: 'Advance to Driver (₹)', name: 'advanceDriver', type: 'number' },
      { label: 'Remarks', name: 'remarks', type: 'text' }
    ]
  },
  {
    file: 'DispatchWeight.jsx', name: 'DispatchWeight', title: 'Stage 6 - Dispatch Weight', action: 'Record Weight', modalTitle: 'Weight Details',
    pendingCols: [
      { header: 'Loading ID', accessor: 'loadingId' }, { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' },
      { header: 'Customer Name', accessor: 'customerName' }, { header: 'Vehicle Number', accessor: 'vehicleNumber' },
      { header: 'Driver Name', accessor: 'driverName' }, { header: 'Transporter Name', accessor: 'transporterName' },
      { header: 'Total Loaded Weight (MT)', accessor: 'weightLoaded' }, { header: 'Route', accessor: 'route' },
      { header: 'Expected Departure', accessor: 'expectedDeparture' }
    ],
    historyCols: [
      { header: 'Weight Slip No', accessor: 'weightSlipNo' }, { header: 'Loading ID', accessor: 'loadingId' },
      { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' }, { header: 'Customer Name', accessor: 'customerName' },
      { header: 'Vehicle Number', accessor: 'vehicleNumber' }, { header: 'Gross Weight (Kg)', accessor: 'grossWeight' },
      { header: 'Tare Weight (Kg)', accessor: 'tareWeight' }, { header: 'Net Weight (Kg)', accessor: 'netWeight' },
      { header: 'Variance %', accessor: 'variance' }, { header: 'Weighbridge ID', accessor: 'weighbridgeId' },
      { header: 'Operator', accessor: 'operator' }, { header: 'Weigh Date', accessor: 'weighDate' }
    ],
    fields: [
      { label: 'Loading ID', name: 'loadingId', type: 'text', readOnly: true },
      { label: 'Dispatch Order No', name: 'dispatchOrderNo', type: 'text', readOnly: true },
      { label: 'Vehicle Number', name: 'vehicleNumber', type: 'text', readOnly: true },
      { label: 'Weight Slip No', name: 'weightSlipNo', type: 'text', readOnly: true },
      { label: 'Weigh Date & Time', name: 'weighDate', type: 'datetime-local' },
      { label: 'Gross Weight (Kg)', name: 'grossWeight', type: 'number' },
      { label: 'Tare Weight (Kg)', name: 'tareWeight', type: 'number' },
      { label: 'Net Weight (Kg)', name: 'netWeight', type: 'number', readOnly: true },
      { label: 'Weighbridge ID', name: 'weighbridgeId', type: 'text' },
      { label: 'Weighbridge Operator', name: 'operator', type: 'text' },
      { label: 'Variance vs Pick List (%)', name: 'variance', type: 'number', readOnly: true },
      { label: 'Variance Reason', name: 'varianceReason', type: 'text' },
      { label: 'Remarks', name: 'remarks', type: 'text' }
    ]
  },
  {
    file: 'DeliveryChallan.jsx', name: 'DeliveryChallan', title: 'Stage 7 - Delivery Challan', action: 'Create Challan', modalTitle: 'Challan Details',
    pendingCols: [
      { header: 'Weight Slip No', accessor: 'weightSlipNo' }, { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' },
      { header: 'Customer Name', accessor: 'customerName' }, { header: 'Vehicle Number', accessor: 'vehicleNumber' },
      { header: 'Driver Name', accessor: 'driverName' }, { header: 'Net Weight (Kg)', accessor: 'netWeight' },
      { header: 'Weigh Date', accessor: 'weighDate' }
    ],
    historyCols: [
      { header: 'Challan No', accessor: 'challanNo' }, { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' },
      { header: 'Weight Slip No', accessor: 'weightSlipNo' }, { header: 'Challan Date', accessor: 'challanDate' },
      { header: 'Customer Name', accessor: 'customerName' }, { header: 'Customer GSTIN', accessor: 'customerGst' },
      { header: 'Rice Grade', accessor: 'riceGrade' }, { header: 'Quantity (MT)', accessor: 'quantity' },
      { header: 'No. of Bags', accessor: 'noOfBags' }, { header: 'Net Weight (Kg)', accessor: 'netWeight' },
      { header: 'Vehicle No', accessor: 'vehicleNumber' }, { header: 'Driver Name', accessor: 'driverName' },
      { header: 'Destination', accessor: 'destination' }, { header: 'Purpose', accessor: 'purpose' },
      { header: 'Created By', accessor: 'createdBy' }
    ],
    fields: [
      { label: 'Dispatch Order No', name: 'dispatchOrderNo', type: 'text', readOnly: true },
      { label: 'Weight Slip No', name: 'weightSlipNo', type: 'text', readOnly: true },
      { label: 'Vehicle Number', name: 'vehicleNumber', type: 'text', readOnly: true },
      { label: 'Driver Name', name: 'driverName', type: 'text', readOnly: true },
      { label: 'Delivery Challan No', name: 'challanNo', type: 'text', readOnly: true },
      { label: 'Challan Date', name: 'challanDate', type: 'date' },
      { label: 'Customer Name', name: 'customerName', type: 'text', readOnly: true },
      { label: 'Customer Address', name: 'customerAddress', type: 'text', readOnly: true },
      { label: 'Customer GSTIN', name: 'customerGst', type: 'text', readOnly: true },
      { label: 'Item Description', name: 'itemDescription', type: 'text' },
      { label: 'Rice Grade', name: 'riceGrade', type: 'text', readOnly: true },
      { label: 'Quantity (MT)', name: 'quantity', type: 'number', readOnly: true },
      { label: 'No. of Bags', name: 'noOfBags', type: 'number' },
      { label: 'Net Weight (Kg)', name: 'netWeight', type: 'number', readOnly: true },
      { label: 'Destination', name: 'destination', type: 'text', readOnly: true },
      { label: 'Purpose', name: 'purpose', type: 'select', options: ['Sale', 'Loan', 'Exhibition'] },
      { label: 'Created By', name: 'createdBy', type: 'text' }
    ]
  },
  {
    file: 'Invoice.jsx', name: 'Invoice', title: 'Stage 8 - Invoice', action: 'Create Invoice', modalTitle: 'Invoice Details',
    pendingCols: [
      { header: 'Challan No', accessor: 'challanNo' }, { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' },
      { header: 'Customer Name', accessor: 'customerName' }, { header: 'Customer GSTIN', accessor: 'customerGst' },
      { header: 'Rice Grade', accessor: 'riceGrade' }, { header: 'Quantity (MT)', accessor: 'quantity' },
      { header: 'Net Weight (Kg)', accessor: 'netWeight' }, { header: 'Challan Date', accessor: 'challanDate' }
    ],
    historyCols: [
      { header: 'Invoice No', accessor: 'invoiceNo' }, { header: 'Challan No', accessor: 'challanNo' },
      { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' }, { header: 'Invoice Date', accessor: 'invoiceDate' },
      { header: 'Invoice Type', accessor: 'invoiceType' }, { header: 'Customer Name', accessor: 'customerName' },
      { header: 'Customer GSTIN', accessor: 'customerGst' }, { header: 'Rice Grade', accessor: 'riceGrade' },
      { header: 'Qty (MT)', accessor: 'quantity' }, { header: 'Rate (₹/MT)', accessor: 'rate' },
      { header: 'Basic Amount (₹)', accessor: 'basicAmount' }, { header: 'CGST (₹)', accessor: 'cgst' },
      { header: 'SGST (₹)', accessor: 'sgst' }, { header: 'IGST (₹)', accessor: 'igst' },
      { header: 'Grand Total (₹)', accessor: 'grandTotal' }, { header: 'Payment Due Date', accessor: 'paymentDueDate' },
      { header: 'Created By', accessor: 'createdBy' }
    ],
    fields: [
      { label: 'Challan No', name: 'challanNo', type: 'text', readOnly: true },
      { label: 'Dispatch Order No', name: 'dispatchOrderNo', type: 'text', readOnly: true },
      { label: 'Invoice No', name: 'invoiceNo', type: 'text', readOnly: true },
      { label: 'Invoice Date', name: 'invoiceDate', type: 'date' },
      { label: 'Invoice Type', name: 'invoiceType', type: 'select', options: ['Tax Invoice', 'Proforma'] },
      { label: 'Customer Name', name: 'customerName', type: 'text', readOnly: true },
      { label: 'Customer GSTIN', name: 'customerGst', type: 'text', readOnly: true },
      { label: 'Customer Billing Address', name: 'billingAddress', type: 'text' },
      { label: 'Customer Shipping Address', name: 'shippingAddress', type: 'text' },
      { label: 'HSN Code', name: 'hsnCode', type: 'text' },
      { label: 'Rice Grade', name: 'riceGrade', type: 'text', readOnly: true },
      { label: 'Quantity (MT)', name: 'quantity', type: 'number', readOnly: true },
      { label: 'Rate (₹/MT)', name: 'rate', type: 'number' },
      { label: 'Basic Amount (₹)', name: 'basicAmount', type: 'number', readOnly: true },
      { label: 'Packing Charges (₹)', name: 'packingCharges', type: 'number' },
      { label: 'Loading Charges (₹)', name: 'loadingCharges', type: 'number' },
      { label: 'Freight Charges (₹)', name: 'freightCharges', type: 'number' },
      { label: 'Other Charges (₹)', name: 'otherCharges', type: 'number' },
      { label: 'Total Taxable Value (₹)', name: 'taxableValue', type: 'number', readOnly: true },
      { label: 'Supply Type', name: 'supplyType', type: 'select', options: ['Intra-State', 'Inter-State'] },
      { label: 'GST Rate (%)', name: 'gstRate', type: 'number' },
      { label: 'CGST (₹)', name: 'cgst', type: 'number', readOnly: true },
      { label: 'SGST (₹)', name: 'sgst', type: 'number', readOnly: true },
      { label: 'IGST (₹)', name: 'igst', type: 'number', readOnly: true },
      { label: 'Round Off (₹)', name: 'roundOff', type: 'number' },
      { label: 'Grand Total (₹)', name: 'grandTotal', type: 'number', readOnly: true },
      { label: 'Payment Due Date', name: 'paymentDueDate', type: 'date' },
      { label: 'Credit Days', name: 'creditDays', type: 'number' },
      { label: 'Bank Account Details', name: 'bankDetails', type: 'text' },
      { label: 'Created By', name: 'createdBy', type: 'text' }
    ]
  },
  {
    file: 'GatePass.jsx', name: 'GatePass', title: 'Stage 9 - Gate Pass', action: 'Issue Pass', modalTitle: 'Gate Pass Details',
    pendingCols: [
      { header: 'Invoice No', accessor: 'invoiceNo' }, { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' },
      { header: 'Customer Name', accessor: 'customerName' }, { header: 'Vehicle Number', accessor: 'vehicleNumber' },
      { header: 'Driver Name', accessor: 'driverName' }, { header: 'Grand Total (₹)', accessor: 'grandTotal' },
      { header: 'Invoice Date', accessor: 'invoiceDate' }, { header: 'Payment Due Date', accessor: 'paymentDueDate' }
    ],
    historyCols: [
      { header: 'Gate Pass No', accessor: 'gatePassNo' }, { header: 'Invoice No', accessor: 'invoiceNo' },
      { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' }, { header: 'Issue Date & Time', accessor: 'issueDate' },
      { header: 'Vehicle No', accessor: 'vehicleNumber' }, { header: 'Driver Name', accessor: 'driverName' },
      { header: 'No. of Bags', accessor: 'noOfBags' }, { header: 'Net Weight (Kg)', accessor: 'netWeight' },
      { header: 'Destination', accessor: 'destination' }, { header: 'Gate', accessor: 'gateNo' },
      { header: 'Security Guard Name', accessor: 'guardName' }, { header: 'Issued By', accessor: 'issuedBy' }
    ],
    fields: [
      { label: 'Invoice No', name: 'invoiceNo', type: 'text', readOnly: true },
      { label: 'Dispatch Order No', name: 'dispatchOrderNo', type: 'text', readOnly: true },
      { label: 'Gate Pass No', name: 'gatePassNo', type: 'text', readOnly: true },
      { label: 'Issue Date & Time', name: 'issueDate', type: 'datetime-local' },
      { label: 'Vehicle No', name: 'vehicleNumber', type: 'text', readOnly: true },
      { label: 'Driver Name', name: 'driverName', type: 'text', readOnly: true },
      { label: 'Driver Phone', name: 'driverPhone', type: 'text', readOnly: true },
      { label: 'Invoice Reference', name: 'invoiceRef', type: 'text', readOnly: true },
      { label: 'Delivery Challan Ref', name: 'challanRef', type: 'text', readOnly: true },
      { label: 'No. of Bags', name: 'noOfBags', type: 'number' },
      { label: 'Net Weight (Kg)', name: 'netWeight', type: 'number' },
      { label: 'Destination', name: 'destination', type: 'text' },
      { label: 'Gate (Exit Gate No)', name: 'gateNo', type: 'text' },
      { label: 'Security Guard Name', name: 'guardName', type: 'text' },
      { label: 'Security Guard ID', name: 'guardId', type: 'text' },
      { label: 'Issued By', name: 'issuedBy', type: 'text' }
    ]
  },
  {
    file: 'EWayBill.jsx', name: 'EWayBill', title: 'Stage 10 - E-Way Bill', action: 'Generate EWB', modalTitle: 'E-Way Bill Details',
    pendingCols: [
      { header: 'Gate Pass No', accessor: 'gatePassNo' }, { header: 'Invoice No', accessor: 'invoiceNo' },
      { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' }, { header: 'Customer Name', accessor: 'customerName' },
      { header: 'Customer GSTIN', accessor: 'customerGst' }, { header: 'Vehicle Number', accessor: 'vehicleNumber' },
      { header: 'Grand Total (₹)', accessor: 'grandTotal' }, { header: 'Issue Date', accessor: 'issueDate' }
    ],
    historyCols: [
      { header: 'EWB No', accessor: 'ewbNo' }, { header: 'Gate Pass No', accessor: 'gatePassNo' },
      { header: 'Invoice No', accessor: 'invoiceNo' }, { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' },
      { header: 'Customer Name', accessor: 'customerName' }, { header: 'Customer GSTIN', accessor: 'customerGst' },
      { header: 'EWB Date', accessor: 'ewbDate' }, { header: 'Valid Till', accessor: 'validTill' },
      { header: 'Total Value (₹)', accessor: 'totalValue' }, { header: 'Distance (km)', accessor: 'distance' },
      { header: 'Mode of Transport', accessor: 'modeOfTransport' }, { header: 'Transporter ID', accessor: 'transporterId' },
      { header: 'Generated By', accessor: 'generatedBy' }
    ],
    fields: [
      { label: 'Gate Pass No', name: 'gatePassNo', type: 'text', readOnly: true },
      { label: 'Invoice No', name: 'invoiceNo', type: 'text', readOnly: true },
      { label: 'Dispatch Order No', name: 'dispatchOrderNo', type: 'text', readOnly: true },
      { label: 'E-Way Bill No', name: 'ewbNo', type: 'text', readOnly: true },
      { label: 'Generation Date & Time', name: 'ewbDate', type: 'datetime-local' },
      { label: 'Valid Till', name: 'validTill', type: 'date', readOnly: true },
      { label: 'GSTIN Supplier', name: 'supplierGst', type: 'text' },
      { label: 'GSTIN Recipient', name: 'customerGst', type: 'text', readOnly: true },
      { label: 'Invoice Reference', name: 'invoiceRef', type: 'text', readOnly: true },
      { label: 'HSN Code', name: 'hsnCode', type: 'text', readOnly: true },
      { label: 'Total Taxable Value (₹)', name: 'taxableValue', type: 'number', readOnly: true },
      { label: 'GST Amount (₹)', name: 'gstAmount', type: 'number', readOnly: true },
      { label: 'Grand Total (₹)', name: 'grandTotal', type: 'number', readOnly: true },
      { label: 'Vehicle No', name: 'vehicleNumber', type: 'text', readOnly: true },
      { label: 'Transport Distance (km)', name: 'distance', type: 'number' },
      { label: 'Mode of Transport', name: 'modeOfTransport', type: 'select', options: ['Road', 'Rail', 'Air', 'Ship'] },
      { label: 'Transporter ID (GSTIN)', name: 'transporterId', type: 'text' },
      { label: 'Part B Updated (Y/N)', name: 'partBUpdated', type: 'select', options: ['Y', 'N'] },
      { label: 'Generated By', name: 'generatedBy', type: 'text' }
    ]
  },
  {
    file: 'POD.jsx', name: 'POD', title: 'Stage 11 - Proof of Delivery (POD)', action: 'Record POD', modalTitle: 'POD Details',
    pendingCols: [
      { header: 'EWB No', accessor: 'ewbNo' }, { header: 'Gate Pass No', accessor: 'gatePassNo' },
      { header: 'Invoice No', accessor: 'invoiceNo' }, { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' },
      { header: 'Customer Name', accessor: 'customerName' }, { header: 'Vehicle Number', accessor: 'vehicleNumber' },
      { header: 'Grand Total (₹)', accessor: 'grandTotal' }, { header: 'EWB Date', accessor: 'ewbDate' },
      { header: 'Valid Till', accessor: 'validTill' }, { header: 'Expected Delivery Date', accessor: 'expectedDelivery' }
    ],
    historyCols: [
      { header: 'POD ID', accessor: 'podId' }, { header: 'EWB No', accessor: 'ewbNo' },
      { header: 'Invoice No', accessor: 'invoiceNo' }, { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' },
      { header: 'Customer Name', accessor: 'customerName' }, { header: 'Actual Delivery Date', accessor: 'actualDeliveryDate' },
      { header: 'Received By', accessor: 'receivedBy' }, { header: 'No. of Bags Received', accessor: 'bagsReceived' },
      { header: 'Net Weight Received (Kg)', accessor: 'weightReceived' }, { header: 'Condition', accessor: 'condition' },
      { header: 'Shortage (Bags)', accessor: 'shortageBags' }, { header: 'Shortage (Kg)', accessor: 'shortageKg' },
      { header: 'Driver Confirmation', accessor: 'driverConfirmation' }
    ],
    fields: [
      { label: 'EWB No', name: 'ewbNo', type: 'text', readOnly: true },
      { label: 'Invoice No', name: 'invoiceNo', type: 'text', readOnly: true },
      { label: 'Dispatch Order No', name: 'dispatchOrderNo', type: 'text', readOnly: true },
      { label: 'POD ID', name: 'podId', type: 'text', readOnly: true },
      { label: 'Actual Delivery Date', name: 'actualDeliveryDate', type: 'date' },
      { label: 'Actual Delivery Time', name: 'actualDeliveryTime', type: 'time' },
      { label: 'Received By (Name)', name: 'receivedBy', type: 'text' },
      { label: 'Receiver Designation', name: 'receiverDesignation', type: 'text' },
      { label: 'Receiver Phone', name: 'receiverPhone', type: 'text' },
      { label: 'No. of Bags Received', name: 'bagsReceived', type: 'number' },
      { label: 'Net Weight Received (Kg)', name: 'weightReceived', type: 'number' },
      { label: 'Condition on Arrival', name: 'condition', type: 'select', options: ['Good', 'Damaged', 'Short'] },
      { label: 'Shortage — No. of Bags', name: 'shortageBags', type: 'number' },
      { label: 'Shortage — Weight (Kg)', name: 'shortageKg', type: 'number' },
      { label: 'Damage Description', name: 'damageDescription', type: 'text' },
      { label: 'POD Document Ref', name: 'podDocRef', type: 'text' },
      { label: 'Driver Confirmation', name: 'driverConfirmation', type: 'select', options: ['Y', 'N'] },
      { label: 'Remarks', name: 'remarks', type: 'text' }
    ]
  },
  {
    file: 'DeliveryConfirmation.jsx', name: 'DeliveryConfirmation', title: 'Stage 12 - Delivery Confirmation', action: 'Confirm', modalTitle: 'Delivery Confirmation Details',
    pendingCols: [
      { header: 'POD ID', accessor: 'podId' }, { header: 'Invoice No', accessor: 'invoiceNo' },
      { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' }, { header: 'Customer Name', accessor: 'customerName' },
      { header: 'Actual Delivery Date', accessor: 'actualDeliveryDate' }, { header: 'Condition', accessor: 'condition' },
      { header: 'Shortage (Bags)', accessor: 'shortageBags' }, { header: 'Shortage (Kg)', accessor: 'shortageKg' },
      { header: 'No. of Bags Received', accessor: 'bagsReceived' }, { header: 'Net Weight Received', accessor: 'weightReceived' }
    ],
    historyCols: [
      { header: 'Confirmation ID', accessor: 'confirmationId' }, { header: 'POD ID', accessor: 'podId' },
      { header: 'Invoice No', accessor: 'invoiceNo' }, { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' },
      { header: 'Customer Name', accessor: 'customerName' }, { header: 'Confirmation Date', accessor: 'confirmationDate' },
      { header: 'Delivery Status', accessor: 'deliveryStatus' }, { header: 'Customer Rating', accessor: 'customerRating' },
      { header: 'Invoice Amount (₹)', accessor: 'invoiceAmount' }, { header: 'Outstanding Amount (₹)', accessor: 'outstanding' },
      { header: 'Disputed Amount (₹)', accessor: 'disputedAmount' }, { header: 'Dispute Reason', accessor: 'disputeReason' },
      { header: 'Resolved', accessor: 'resolved' }, { header: 'Closed By', accessor: 'closedBy' }
    ],
    fields: [
      { label: 'POD ID', name: 'podId', type: 'text', readOnly: true },
      { label: 'Invoice No', name: 'invoiceNo', type: 'text', readOnly: true },
      { label: 'Dispatch Order No', name: 'dispatchOrderNo', type: 'text', readOnly: true },
      { label: 'Confirmation ID', name: 'confirmationId', type: 'text', readOnly: true },
      { label: 'Confirmation Date', name: 'confirmationDate', type: 'date' },
      { label: 'Customer Name', name: 'customerName', type: 'text', readOnly: true },
      { label: 'Delivery Status', name: 'deliveryStatus', type: 'select', options: ['Complete', 'Partial', 'Disputed'] },
      { label: 'Customer Feedback/Rating (1-5)', name: 'customerRating', type: 'number' },
      { label: 'Invoice Amount (₹)', name: 'invoiceAmount', type: 'number', readOnly: true },
      { label: 'Amount Received so far (₹)', name: 'amountReceived', type: 'number' },
      { label: 'Outstanding Amount (₹)', name: 'outstanding', type: 'number', readOnly: true },
      { label: 'Disputed Amount (₹)', name: 'disputedAmount', type: 'number' },
      { label: 'Dispute Reason', name: 'disputeReason', type: 'text' },
      { label: 'Dispute Reference No', name: 'disputeRefNo', type: 'text' },
      { label: 'Resolved', name: 'resolved', type: 'select', options: ['Y', 'N'] },
      { label: 'Closed By', name: 'closedBy', type: 'text' },
      { label: 'Remarks', name: 'remarks', type: 'text' }
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
    const qty = Math.floor(Math.random() * 50) + 10;
    const bags = qty * 40;
    const rate = 45000;
    const freight = qty * 1500;
    const basic = qty * rate;
    const tax = basic * 0.05;
    
    return {
      id: i + 1,
      dispatchOrderNo: \`DO-\${(i + 1).toString().padStart(4, '0')}\`,
      orderDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      orderType: 'Domestic',
      customerName: \`Customer \${i+1}\`,
      customerGst: \`27AAAC\${i}1234K1Z1\`,
      riceGrade: 'Premium Basmati',
      quantity: qty,
      noOfBags: bags,
      reqDispatchDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      priority: 'Normal',
      
      reservationId: \`SR-\${(i + 1).toString().padStart(4, '0')}\`,
      fgStockId: \`FG-\${(i + 1).toString().padStart(4, '0')}\`,
      lotNo: \`LT-\${i+1}\`,
      batchNo: \`BT-\${i+1}\`,
      reservedQty: qty,
      reservedBags: bags,
      warehouse: 'Main WH',
      godown: 'Godown 1',
      rackBin: 'R1-B2',
      reservationDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      reservedBy: 'WH Manager',

      pickListNo: \`PK-\${(i + 1).toString().padStart(4, '0')}\`,
      pickedQty: qty,
      pickedBags: bags,
      pickDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      pickedBy: 'Picker 1',
      supervisor: 'Super 1',

      loadingId: \`LD-\${(i + 1).toString().padStart(4, '0')}\`,
      vehicleNumber: \`MH 43 AB \${(1000 + i)}\`,
      bagsLoaded: bags,
      weightLoaded: qty,
      shortage: 0,
      loadingDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}T10:00\`,
      loadingSupervisor: 'Super 1',

      vehicleType: 'Truck',
      driverName: 'Ramu',
      driverPhone: '9876543210',
      transporterName: 'ABC Logistics',
      vehicleCapacity: 25,
      route: 'Mill -> Mumbai',
      freightRate: 1500,
      totalFreight: freight,
      expectedDeparture: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}T12:00\`,
      expectedDelivery: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      assignedDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,

      weightSlipNo: \`DW-\${(i + 1).toString().padStart(4, '0')}\`,
      grossWeight: qty * 1000 + 8000,
      tareWeight: 8000,
      netWeight: qty * 1000,
      variance: 0,
      weighbridgeId: 'WB-01',
      operator: 'WB Op',
      weighDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,

      challanNo: \`DC-\${(i + 1).toString().padStart(4, '0')}\`,
      challanDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      destination: 'Mumbai',
      purpose: 'Sale',
      createdBy: 'Dispatch Clerk',

      invoiceNo: \`INV-\${(i + 1).toString().padStart(4, '0')}\`,
      invoiceDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      invoiceType: 'Tax Invoice',
      rate: rate,
      basicAmount: basic,
      cgst: tax / 2,
      sgst: tax / 2,
      igst: 0,
      grandTotal: basic + tax,
      paymentDueDate: \`2026-07-\${(i % 28 + 1).toString().padStart(2, '0')}\`,

      gatePassNo: \`GP-\${(i + 1).toString().padStart(4, '0')}\`,
      issueDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}T14:00\`,
      gateNo: 'Gate 2',
      guardName: 'Security 1',
      issuedBy: 'Dispatch Head',

      ewbNo: \`EWB-\${(i + 1).toString().padStart(4, '0')}\`,
      ewbDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}T14:00\`,
      validTill: \`2026-06-\${(i % 28 + 3).toString().padStart(2, '0')}\`,
      totalValue: basic + tax,
      distance: 350,
      modeOfTransport: 'Road',
      transporterId: '27AABCT1234L1Z',
      generatedBy: 'Finance Exec',

      podId: \`POD-\${(i + 1).toString().padStart(4, '0')}\`,
      actualDeliveryDate: \`2026-06-\${(i % 28 + 2).toString().padStart(2, '0')}\`,
      receivedBy: 'Cust Store',
      bagsReceived: bags,
      weightReceived: qty * 1000,
      condition: 'Good',
      shortageBags: 0,
      shortageKg: 0,
      driverConfirmation: 'Y',

      confirmationId: \`CF-\${(i + 1).toString().padStart(4, '0')}\`,
      confirmationDate: \`2026-06-\${(i % 28 + 2).toString().padStart(2, '0')}\`,
      deliveryStatus: 'Complete',
      customerRating: 5,
      invoiceAmount: basic + tax,
      outstanding: basic + tax,
      disputedAmount: 0,
      disputeReason: '',
      resolved: 'Y',
      closedBy: 'Sales Exec',

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
    ${stage.name === 'StockReservation' ? `autoFields = { reservationId: 'SR-' + Math.floor(Math.random()*10000) };` : ''}
    ${stage.name === 'PickingList' ? `autoFields = { pickListNo: 'PK-' + Math.floor(Math.random()*10000), location: item.godown + '/' + item.rackBin };` : ''}
    ${stage.name === 'Loading' ? `autoFields = { loadingId: 'LD-' + Math.floor(Math.random()*10000) };` : ''}
    ${stage.name === 'DispatchWeight' ? `autoFields = { weightSlipNo: 'DW-' + Math.floor(Math.random()*10000) };` : ''}
    ${stage.name === 'DeliveryChallan' ? `autoFields = { challanNo: 'DC-' + Math.floor(Math.random()*10000) };` : ''}
    ${stage.name === 'Invoice' ? `autoFields = { invoiceNo: 'INV-' + Math.floor(Math.random()*10000) };` : ''}
    ${stage.name === 'GatePass' ? `autoFields = { gatePassNo: 'GP-' + Math.floor(Math.random()*10000), invoiceRef: item.invoiceNo, challanRef: item.challanNo };` : ''}
    ${stage.name === 'EWayBill' ? `autoFields = { ewbNo: 'EWB-' + Math.floor(Math.random()*10000), invoiceRef: item.invoiceNo, taxableValue: item.basicAmount, gstAmount: item.cgst + item.sgst + item.igst, grandTotal: item.grandTotal };` : ''}
    ${stage.name === 'POD' ? `autoFields = { podId: 'POD-' + Math.floor(Math.random()*10000) };` : ''}
    ${stage.name === 'DeliveryConfirmation' ? `autoFields = { confirmationId: 'CF-' + Math.floor(Math.random()*10000) };` : ''}
    
    const readOnlyFields = ${JSON.stringify(stage.fields.filter(f => f.readOnly).map(f => f.name))};
    const initialFormData = {};
    readOnlyFields.forEach(field => {
      initialFormData[field] = item[field];
    });
    
    setFormData({ ...initialFormData, ...autoFields });
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (isModalOpen && formData) {
      ${stage.name === 'VehicleAssignment' ? `
      const qty = parseFloat(selectedItem.weightLoaded) || 0;
      const rate = parseFloat(formData.freightRate) || 0;
      const total = qty * rate;
      if (formData.totalFreight !== total) {
        setFormData(prev => ({ ...prev, totalFreight: total }));
      }
      ` : ''}
      ${stage.name === 'DispatchWeight' ? `
      const gw = parseFloat(formData.grossWeight) || 0;
      const tw = parseFloat(formData.tareWeight) || 0;
      const nw = gw - tw;
      const targetNw = parseFloat(selectedItem.weightLoaded) * 1000 || 1;
      const variance = ((nw - targetNw) / targetNw) * 100;
      if (formData.netWeight !== nw || formData.variance !== variance) {
        setFormData(prev => ({ ...prev, netWeight: nw, variance: variance.toFixed(2) }));
      }
      ` : ''}
      ${stage.name === 'Invoice' ? `
      const qty = parseFloat(selectedItem.quantity) || 0;
      const rate = parseFloat(formData.rate) || 0;
      const basic = qty * rate;
      const others = (parseFloat(formData.packingCharges)||0) + (parseFloat(formData.loadingCharges)||0) + (parseFloat(formData.freightCharges)||0) + (parseFloat(formData.otherCharges)||0);
      const taxVal = basic + others;
      const gstRate = parseFloat(formData.gstRate) || 0;
      const isInter = formData.supplyType === 'Inter-State';
      const taxAmt = taxVal * (gstRate / 100);
      const cgst = isInter ? 0 : taxAmt / 2;
      const sgst = isInter ? 0 : taxAmt / 2;
      const igst = isInter ? taxAmt : 0;
      const round = parseFloat(formData.roundOff) || 0;
      const grand = taxVal + taxAmt + round;
      
      if (formData.basicAmount !== basic || formData.taxableValue !== taxVal || formData.cgst !== cgst || formData.sgst !== sgst || formData.igst !== igst || formData.grandTotal !== grand) {
        setFormData(prev => ({ ...prev, basicAmount: basic, taxableValue: taxVal, cgst, sgst, igst, grandTotal: grand }));
      }
      ` : ''}
      ${stage.name === 'DeliveryConfirmation' ? `
      const inv = parseFloat(selectedItem.grandTotal) || 0;
      const rec = parseFloat(formData.amountReceived) || 0;
      const disp = parseFloat(formData.disputedAmount) || 0;
      const out = inv - rec - disp;
      if (formData.outstanding !== out || formData.invoiceAmount !== inv) {
        setFormData(prev => ({ ...prev, outstanding: out, invoiceAmount: inv }));
      }
      ` : ''}
    }
  }, [formData, isModalOpen, selectedItem]);

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
    dispatchOrderNo: \`DO-\${(i + 1).toString().padStart(4, '0')}\`,
    orderDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
    orderType: 'Domestic',
    salesOrderRef: \`SO-\${(i + 1).toString().padStart(4, '0')}\`,
    customerName: \`Customer \${i+1}\`,
    customerGst: \`27AAAC\${i}1234K1Z1\`,
    riceGrade: 'Premium Basmati',
    quantity: Math.floor(Math.random() * 50) + 10,
    noOfBags: (Math.floor(Math.random() * 50) + 10) * 40,
    reqDispatchDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
    priority: 'Normal',
    createdBy: 'Sales Exec',
    status: 'Active'
  }));
};

export const DispatchOrder = () => {
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
    setFormData({ dispatchOrderNo: 'DO-' + Math.floor(Math.random()*10000) });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    const newItem = { ...formData, id: Date.now(), status: 'Active' };
    setHistoryItems([newItem, ...historyItems]);
    setIsModalOpen(false);
  };

  const columns = [
    { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' },
    { header: 'Order Date', accessor: 'orderDate' },
    { header: 'Order Type', accessor: 'orderType' },
    { header: 'Sales Order Ref', accessor: 'salesOrderRef' },
    { header: 'Customer Name', accessor: 'customerName' },
    { header: 'Customer GSTIN', accessor: 'customerGst' },
    { header: 'Rice Grade', accessor: 'riceGrade' },
    { header: 'Quantity (MT)', accessor: 'quantity' },
    { header: 'No. of Bags', accessor: 'noOfBags' },
    { header: 'Req Dispatch Date', accessor: 'reqDispatchDate' },
    { header: 'Priority', accessor: 'priority' },
    { header: 'Created By', accessor: 'createdBy' },
    { header: 'Status', accessor: 'status' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Stage 1 - Dispatch Order</h2>
        <Button onClick={handleCreateNew} className="flex items-center gap-2">
          <Plus size={16} /> Receive Order
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
        title="Receive Dispatch Order"
      >
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Dispatch Order No</Label>
              <Input type="text" value={formData.dispatchOrderNo || ''} readOnly className="bg-slate-100" />
            </div>
            <div className="space-y-1.5">
              <Label>Order Date</Label>
              <Input type="date" value={formData.orderDate || ''} onChange={(e) => setFormData({...formData, orderDate: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Order Type</Label>
              <Select value={formData.orderType || ''} onChange={(e) => setFormData({...formData, orderType: e.target.value})}>
                <option value="">Select Type</option>
                <option value="Domestic">Domestic</option>
                <option value="Export">Export</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Sales Order Ref</Label>
              <Input type="text" value={formData.salesOrderRef || ''} onChange={(e) => setFormData({...formData, salesOrderRef: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Customer Name</Label>
              <Input type="text" value={formData.customerName || ''} onChange={(e) => setFormData({...formData, customerName: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Customer Phone</Label>
              <Input type="text" value={formData.customerPhone || ''} onChange={(e) => setFormData({...formData, customerPhone: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Customer GSTIN</Label>
              <Input type="text" value={formData.customerGst || ''} onChange={(e) => setFormData({...formData, customerGst: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Delivery Address</Label>
              <Input type="text" value={formData.deliveryAddress || ''} onChange={(e) => setFormData({...formData, deliveryAddress: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Delivery State</Label>
              <Input type="text" value={formData.deliveryState || ''} onChange={(e) => setFormData({...formData, deliveryState: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Delivery Pin Code</Label>
              <Input type="text" value={formData.deliveryPinCode || ''} onChange={(e) => setFormData({...formData, deliveryPinCode: e.target.value})} />
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
              <Input type="date" value={formData.reqDispatchDate || ''} onChange={(e) => setFormData({...formData, reqDispatchDate: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Priority</Label>
              <Select value={formData.priority || ''} onChange={(e) => setFormData({...formData, priority: e.target.value})}>
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

// Write Stage 1
fs.writeFileSync(path.join('c:/Users/devel/Downloads/Rice Mill/src/modules/dispatch', 'DispatchOrder.jsx'), stage1Template());
console.log('Created DispatchOrder.jsx');

// Write Stages 2-12
stages.forEach(stage => {
  const filePath = path.join('c:/Users/devel/Downloads/Rice Mill/src/modules/dispatch', stage.file);
  fs.writeFileSync(filePath, template(stage));
  console.log('Created ' + stage.file);
});
