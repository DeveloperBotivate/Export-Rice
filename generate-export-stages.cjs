const fs = require('fs');
const path = require('path');

const stages = [
  {
    file: 'PackingList.jsx', name: 'PackingList', title: 'Stage 2 - Packing List', action: 'Create Packing List', modalTitle: 'Packing List Details',
    pendingCols: [
      { header: 'Contract No', accessor: 'contractNo' }, { header: 'Contract Date', accessor: 'contractDate' },
      { header: 'Buyer Name', accessor: 'buyerName' }, { header: 'Buyer Country', accessor: 'buyerCountry' },
      { header: 'Rice Grade', accessor: 'riceGrade' }, { header: 'Quantity (MT)', accessor: 'quantity' },
      { header: 'Incoterms', accessor: 'incoterms' }, { header: 'Port of Loading', accessor: 'portOfLoading' },
      { header: 'Port of Destination', accessor: 'portOfDestination' }, { header: 'Shipment Date', accessor: 'shipmentDate' },
      { header: 'Payment Terms', accessor: 'paymentTerms' }
    ],
    historyCols: [
      { header: 'Packing List No', accessor: 'packingListNo' }, { header: 'Contract No', accessor: 'contractNo' },
      { header: 'Date', accessor: 'plDate' }, { header: 'Buyer Name', accessor: 'buyerName' },
      { header: 'No. of Bags', accessor: 'noOfBags' }, { header: 'Net Weight (MT)', accessor: 'totalNetWeight' },
      { header: 'Gross Weight (MT)', accessor: 'totalGrossWeight' }, { header: 'Lot Numbers', accessor: 'lotNumbers' },
      { header: 'Batch Numbers', accessor: 'batchNumbers' }, { header: 'Prepared By', accessor: 'preparedBy' }
    ],
    fields: [
      { label: 'Contract No', name: 'contractNo', type: 'text', readOnly: true },
      { label: 'Packing List No', name: 'packingListNo', type: 'text', readOnly: true },
      { label: 'Date', name: 'plDate', type: 'date' },
      { label: 'No. of Bags', name: 'noOfBags', type: 'number' },
      { label: 'Bag Size', name: 'bagSize', type: 'select', options: ['5kg', '10kg', '25kg', '50kg'] },
      { label: 'Net Weight per Bag (Kg)', name: 'netWeightPerBag', type: 'number' },
      { label: 'Total Net Weight (MT)', name: 'totalNetWeight', type: 'number', readOnly: true },
      { label: 'Total Gross Weight (MT)', name: 'totalGrossWeight', type: 'number' },
      { label: 'No. of Pallets/Bundles', name: 'noOfPallets', type: 'number' },
      { label: 'Lot Numbers', name: 'lotNumbers', type: 'text' },
      { label: 'Batch Numbers', name: 'batchNumbers', type: 'text' },
      { label: 'Marks & Numbers', name: 'marksAndNumbers', type: 'text' },
      { label: 'Country of Origin', name: 'countryOfOrigin', type: 'text' },
      { label: 'HS Code', name: 'hsCode', type: 'text' },
      { label: 'Description of Goods', name: 'descriptionOfGoods', type: 'text' },
      { label: 'Prepared By', name: 'preparedBy', type: 'text' }
    ]
  },
  {
    file: 'ContainerBooking.jsx', name: 'ContainerBooking', title: 'Stage 3 - Container Booking', action: 'Book Container', modalTitle: 'Booking Details',
    pendingCols: [
      { header: 'Packing List No', accessor: 'packingListNo' }, { header: 'Contract No', accessor: 'contractNo' },
      { header: 'Buyer Name', accessor: 'buyerName' }, { header: 'Rice Grade', accessor: 'riceGrade' },
      { header: 'Total Net Weight (MT)', accessor: 'totalNetWeight' }, { header: 'Total Gross Weight (MT)', accessor: 'totalGrossWeight' },
      { header: 'No. of Bags', accessor: 'noOfBags' }, { header: 'Port of Loading', accessor: 'portOfLoading' },
      { header: 'Port of Destination', accessor: 'portOfDestination' }, { header: 'Shipment Date', accessor: 'shipmentDate' }
    ],
    historyCols: [
      { header: 'Booking Ref No', accessor: 'bookingRefNo' }, { header: 'Packing List No', accessor: 'packingListNo' },
      { header: 'Contract No', accessor: 'contractNo' }, { header: 'Shipping Line', accessor: 'shippingLine' },
      { header: 'Container Type', accessor: 'containerType' }, { header: 'No. of Containers', accessor: 'noOfContainers' },
      { header: 'ETD', accessor: 'etd' }, { header: 'ETA', accessor: 'eta' },
      { header: 'Total Freight ($)', accessor: 'totalFreight' }, { header: 'DO Received', accessor: 'doReceived' },
      { header: 'Booking Date', accessor: 'bookingDate' }, { header: 'Booked By', accessor: 'bookedBy' }
    ],
    fields: [
      { label: 'Contract No', name: 'contractNo', type: 'text', readOnly: true },
      { label: 'Packing List No', name: 'packingListNo', type: 'text', readOnly: true },
      { label: 'Booking Reference No', name: 'bookingRefNo', type: 'text', readOnly: true },
      { label: 'Shipping Line', name: 'shippingLine', type: 'text' },
      { label: 'Shipping Line Agent Name', name: 'agentName', type: 'text' },
      { label: 'Agent Phone', name: 'agentPhone', type: 'text' },
      { label: 'Container Type', name: 'containerType', type: 'select', options: ['20ft', '40ft', '40HC'] },
      { label: 'No. of Containers', name: 'noOfContainers', type: 'number' },
      { label: 'Container Capacity (MT)', name: 'containerCapacity', type: 'number' },
      { label: 'Stuffing Date', name: 'stuffingDate', type: 'date' },
      { label: 'Port of Loading', name: 'portOfLoading', type: 'text', readOnly: true },
      { label: 'Port of Destination', name: 'portOfDestination', type: 'text', readOnly: true },
      { label: 'ETD', name: 'etd', type: 'date' },
      { label: 'ETA', name: 'eta', type: 'date' },
      { label: 'Freight Rate ($/Container)', name: 'freightRate', type: 'number' },
      { label: 'Total Freight ($)', name: 'totalFreight', type: 'number', readOnly: true },
      { label: 'DO (Delivery Order) Received', name: 'doReceived', type: 'select', options: ['Y', 'N'] },
      { label: 'Booking Date', name: 'bookingDate', type: 'date' },
      { label: 'Booked By', name: 'bookedBy', type: 'text' }
    ]
  },
  {
    file: 'ContainerLoading.jsx', name: 'ContainerLoading', title: 'Stage 4 - Container Loading', action: 'Load Container', modalTitle: 'Loading Details',
    pendingCols: [
      { header: 'Booking Ref No', accessor: 'bookingRefNo' }, { header: 'Contract No', accessor: 'contractNo' },
      { header: 'Packing List No', accessor: 'packingListNo' }, { header: 'Shipping Line', accessor: 'shippingLine' },
      { header: 'Container Type', accessor: 'containerType' }, { header: 'No. of Containers', accessor: 'noOfContainers' },
      { header: 'ETD', accessor: 'etd' }, { header: 'Total Freight ($)', accessor: 'totalFreight' },
      { header: 'Booked By', accessor: 'bookedBy' }
    ],
    historyCols: [
      { header: 'Loading ID', accessor: 'loadingId' }, { header: 'Booking Ref No', accessor: 'bookingRefNo' },
      { header: 'Contract No', accessor: 'contractNo' }, { header: 'Container Number', accessor: 'containerNumber' },
      { header: 'Seal Number', accessor: 'sealNumber' }, { header: 'Tare Weight (MT)', accessor: 'tareWeight' },
      { header: 'Net Weight Loaded (MT)', accessor: 'netWeightLoaded' }, { header: 'No. of Bags Loaded', accessor: 'bagsLoaded' },
      { header: 'Loading Date', accessor: 'loadingDate' }, { header: 'Loading Surveyor', accessor: 'surveyorName' },
      { header: 'CFS/ICD Name', accessor: 'cfsName' }, { header: 'Fumigation Done', accessor: 'fumigationDone' }
    ],
    fields: [
      { label: 'Booking Ref No', name: 'bookingRefNo', type: 'text', readOnly: true },
      { label: 'Contract No', name: 'contractNo', type: 'text', readOnly: true },
      { label: 'Loading ID', name: 'loadingId', type: 'text', readOnly: true },
      { label: 'Container Number', name: 'containerNumber', type: 'text' },
      { label: 'Seal Number', name: 'sealNumber', type: 'text' },
      { label: 'Tare Weight (MT)', name: 'tareWeight', type: 'number' },
      { label: 'Gross Weight Loaded (MT)', name: 'grossWeightLoaded', type: 'number' },
      { label: 'Net Weight Loaded (MT)', name: 'netWeightLoaded', type: 'number' },
      { label: 'No. of Bags Loaded', name: 'bagsLoaded', type: 'number' },
      { label: 'Lot Nos Loaded', name: 'lotsLoaded', type: 'text' },
      { label: 'Batch Nos Loaded', name: 'batchesLoaded', type: 'text' },
      { label: 'Loading Date & Time', name: 'loadingDate', type: 'datetime-local' },
      { label: 'Loading Location (CFS/ICD Name)', name: 'cfsName', type: 'text' },
      { label: 'Loading Surveyor Name', name: 'surveyorName', type: 'text' },
      { label: 'Surveyor Company', name: 'surveyorCompany', type: 'text' },
      { label: 'Fumigation Done', name: 'fumigationDone', type: 'select', options: ['Y', 'N'] },
      { label: 'Fumigation Certificate No', name: 'fumigationCertNo', type: 'text' },
      { label: 'Stuffing Remarks', name: 'stuffingRemarks', type: 'text' }
    ]
  },
  {
    file: 'ShippingLine.jsx', name: 'ShippingLine', title: 'Stage 5 - Shipping Line', action: 'Update Shipping Info', modalTitle: 'Shipping Line Details',
    pendingCols: [
      { header: 'Loading ID', accessor: 'loadingId' }, { header: 'Booking Ref No', accessor: 'bookingRefNo' },
      { header: 'Contract No', accessor: 'contractNo' }, { header: 'Container Number', accessor: 'containerNumber' },
      { header: 'Seal Number', accessor: 'sealNumber' }, { header: 'Net Weight Loaded (MT)', accessor: 'netWeightLoaded' },
      { header: 'Loading Date', accessor: 'loadingDate' }, { header: 'Surveyor', accessor: 'surveyorName' }
    ],
    historyCols: [
      { header: 'Loading ID', accessor: 'loadingId' }, { header: 'Contract No', accessor: 'contractNo' },
      { header: 'Shipping Line Name', accessor: 'shippingLine' }, { header: 'Vessel Name', accessor: 'vesselName' },
      { header: 'IMO No', accessor: 'imoNo' }, { header: 'Voyage Number', accessor: 'voyageNo' },
      { header: 'ETD', accessor: 'etd' }, { header: 'ETA', accessor: 'eta' },
      { header: 'Port Agent Name', accessor: 'portAgent' }, { header: 'VGM Submitted', accessor: 'vgmSubmitted' },
      { header: 'SI Submitted', accessor: 'siSubmitted' }, { header: 'SI Date', accessor: 'siDate' },
      { header: 'Confirmed Date', accessor: 'confirmedDate' }
    ],
    fields: [
      { label: 'Loading ID', name: 'loadingId', type: 'text', readOnly: true },
      { label: 'Contract No', name: 'contractNo', type: 'text', readOnly: true },
      { label: 'Shipping Line Name', name: 'shippingLine', type: 'text', readOnly: true },
      { label: 'Vessel Name', name: 'vesselName', type: 'text' },
      { label: 'IMO Number', name: 'imoNo', type: 'text' },
      { label: 'Voyage Number', name: 'voyageNo', type: 'text' },
      { label: 'ETD', name: 'etd', type: 'date' },
      { label: 'ETA', name: 'eta', type: 'date' },
      { label: 'Port of Loading', name: 'portOfLoading', type: 'text', readOnly: true },
      { label: 'Port of Discharge', name: 'portOfDestination', type: 'text', readOnly: true },
      { label: 'Next Transshipment Port', name: 'transshipmentPort', type: 'text' },
      { label: 'Port Agent Name', name: 'portAgent', type: 'text' },
      { label: 'Port Agent Contact', name: 'portAgentContact', type: 'text' },
      { label: 'Cut-off Date', name: 'cutOffDate', type: 'date' },
      { label: 'VGM Submitted', name: 'vgmSubmitted', type: 'select', options: ['Y', 'N'] },
      { label: 'VGM Weight (MT)', name: 'vgmWeight', type: 'number' },
      { label: 'SI (Shipping Instruction) Submitted', name: 'siSubmitted', type: 'select', options: ['Y', 'N'] },
      { label: 'SI Submission Date', name: 'siDate', type: 'date' },
      { label: 'Confirmed Date', name: 'confirmedDate', type: 'date' }
    ]
  },
  {
    file: 'ShippingBill.jsx', name: 'ShippingBill', title: 'Stage 6 - Shipping Bill', action: 'File Shipping Bill', modalTitle: 'Shipping Bill Details',
    pendingCols: [
      { header: 'Loading ID', accessor: 'loadingId' }, { header: 'Contract No', accessor: 'contractNo' },
      { header: 'Shipping Line', accessor: 'shippingLine' }, { header: 'Vessel Name', accessor: 'vesselName' },
      { header: 'Voyage No', accessor: 'voyageNo' }, { header: 'Container Number', accessor: 'containerNumber' },
      { header: 'ETD', accessor: 'etd' }, { header: 'ETA', accessor: 'eta' },
      { header: 'VGM Submitted', accessor: 'vgmSubmitted' }
    ],
    historyCols: [
      { header: 'Shipping Bill No', accessor: 'shippingBillNo' }, { header: 'Loading ID', accessor: 'loadingId' },
      { header: 'Contract No', accessor: 'contractNo' }, { header: 'Shipping Bill Date', accessor: 'shippingBillDate' },
      { header: 'Customs House', accessor: 'customsHouse' }, { header: 'IEC Code', accessor: 'iecCode' },
      { header: 'FOB Value ($)', accessor: 'fobValue' }, { header: 'Drawback Claim', accessor: 'drawbackClaim' },
      { header: 'Drawback Amount (₹)', accessor: 'drawbackAmount' }, { header: 'RoDTEP Amount (₹)', accessor: 'rodtepAmount' },
      { header: 'LEO Date', accessor: 'leoDate' }, { header: 'CHA Name', accessor: 'chaName' },
      { header: 'Filed Date', accessor: 'filedDate' }
    ],
    fields: [
      { label: 'Loading ID', name: 'loadingId', type: 'text', readOnly: true },
      { label: 'Contract No', name: 'contractNo', type: 'text', readOnly: true },
      { label: 'Vessel Name', name: 'vesselName', type: 'text', readOnly: true },
      { label: 'Shipping Bill Number', name: 'shippingBillNo', type: 'text', readOnly: true },
      { label: 'Shipping Bill Date', name: 'shippingBillDate', type: 'date' },
      { label: 'Customs House Location', name: 'customsHouse', type: 'text' },
      { label: 'Exporter Name', name: 'exporterName', type: 'text' },
      { label: 'IEC Code', name: 'iecCode', type: 'text' },
      { label: 'GSTIN', name: 'gstin', type: 'text' },
      { label: 'HSN Code', name: 'hsCode', type: 'text' },
      { label: 'Description of Goods', name: 'descriptionOfGoods', type: 'text' },
      { label: 'Quantity (MT)', name: 'quantity', type: 'number', readOnly: true },
      { label: 'FOB Value ($)', name: 'fobValue', type: 'number' },
      { label: 'Drawback Claim', name: 'drawbackClaim', type: 'select', options: ['Y', 'N'] },
      { label: 'Drawback Amount (₹)', name: 'drawbackAmount', type: 'number' },
      { label: 'RoDTEP/MEIS Claim', name: 'rodtepClaim', type: 'select', options: ['Y', 'N'] },
      { label: 'RoDTEP Claim Amount (₹)', name: 'rodtepAmount', type: 'number' },
      { label: 'CHA Name', name: 'chaName', type: 'text' },
      { label: 'CHA License No', name: 'chaLicense', type: 'text' },
      { label: 'Duty Paid (₹)', name: 'dutyPaid', type: 'number' },
      { label: 'Let Export Order (LEO) Date', name: 'leoDate', type: 'date' },
      { label: 'Filed Date', name: 'filedDate', type: 'date' }
    ]
  },
  {
    file: 'BillOfLading.jsx', name: 'BillOfLading', title: 'Stage 7 - Bill of Lading', action: 'Create BL', modalTitle: 'Bill of Lading Details',
    pendingCols: [
      { header: 'Shipping Bill No', accessor: 'shippingBillNo' }, { header: 'Loading ID', accessor: 'loadingId' },
      { header: 'Contract No', accessor: 'contractNo' }, { header: 'Vessel Name', accessor: 'vesselName' },
      { header: 'Voyage No', accessor: 'voyageNo' }, { header: 'Container Number', accessor: 'containerNumber' },
      { header: 'LEO Date', accessor: 'leoDate' }, { header: 'FOB Value ($)', accessor: 'fobValue' }
    ],
    historyCols: [
      { header: 'BL Number', accessor: 'blNumber' }, { header: 'Shipping Bill No', accessor: 'shippingBillNo' },
      { header: 'Contract No', accessor: 'contractNo' }, { header: 'BL Date', accessor: 'blDate' },
      { header: 'BL Type', accessor: 'blType' }, { header: 'Shipper', accessor: 'shipperName' },
      { header: 'Consignee', accessor: 'consigneeName' }, { header: 'Notify Party', accessor: 'notifyParty1' },
      { header: 'Port of Loading', accessor: 'portOfLoading' }, { header: 'Port of Discharge', accessor: 'portOfDestination' },
      { header: 'No. of Packages', accessor: 'noOfPackages' }, { header: 'Gross Weight (MT)', accessor: 'totalGrossWeight' },
      { header: 'Freight Terms', accessor: 'freightTerms' }, { header: 'Original BL Copies', accessor: 'originalBlCopies' }
    ],
    fields: [
      { label: 'Shipping Bill No', name: 'shippingBillNo', type: 'text', readOnly: true },
      { label: 'Contract No', name: 'contractNo', type: 'text', readOnly: true },
      { label: 'BL Number', name: 'blNumber', type: 'text', readOnly: true },
      { label: 'BL Date', name: 'blDate', type: 'date' },
      { label: 'BL Type', name: 'blType', type: 'select', options: ['Original', 'Telex Release', 'Sea Waybill'] },
      { label: 'Shipper Name & Address', name: 'shipperName', type: 'text' },
      { label: 'Consignee Name & Address', name: 'consigneeName', type: 'text' },
      { label: 'Notify Party 1', name: 'notifyParty1', type: 'text' },
      { label: 'Notify Party 2', name: 'notifyParty2', type: 'text' },
      { label: 'Port of Loading', name: 'portOfLoading', type: 'text', readOnly: true },
      { label: 'Port of Discharge', name: 'portOfDestination', type: 'text', readOnly: true },
      { label: 'Place of Delivery', name: 'placeOfDelivery', type: 'text' },
      { label: 'Vessel Name', name: 'vesselName', type: 'text', readOnly: true },
      { label: 'Voyage Number', name: 'voyageNo', type: 'text', readOnly: true },
      { label: 'Description of Goods', name: 'descriptionOfGoods', type: 'text' },
      { label: 'No. of Packages', name: 'noOfPackages', type: 'number' },
      { label: 'Total Gross Weight (MT)', name: 'totalGrossWeight', type: 'number' },
      { label: 'Measurement (CBM)', name: 'measurementCBM', type: 'number' },
      { label: 'Freight Terms', name: 'freightTerms', type: 'select', options: ['Prepaid', 'Collect'] },
      { label: 'Freight Amount ($)', name: 'freightAmount', type: 'number' },
      { label: 'No. of Original BL Copies', name: 'originalBlCopies', type: 'number' },
      { label: 'Special Instructions', name: 'specialInstructions', type: 'text' }
    ]
  },
  {
    file: 'CertificateOfOrigin.jsx', name: 'CertificateOfOrigin', title: 'Stage 8 - Certificate of Origin', action: 'Generate COO', modalTitle: 'Certificate of Origin Details',
    pendingCols: [
      { header: 'BL Number', accessor: 'blNumber' }, { header: 'Shipping Bill No', accessor: 'shippingBillNo' },
      { header: 'Contract No', accessor: 'contractNo' }, { header: 'Buyer Name', accessor: 'buyerName' },
      { header: 'Buyer Country', accessor: 'buyerCountry' }, { header: 'Vessel Name', accessor: 'vesselName' },
      { header: 'BL Date', accessor: 'blDate' }, { header: 'No. of Packages', accessor: 'noOfPackages' },
      { header: 'Gross Weight (MT)', accessor: 'totalGrossWeight' }
    ],
    historyCols: [
      { header: 'COO No', accessor: 'cooNo' }, { header: 'BL Number', accessor: 'blNumber' },
      { header: 'Contract No', accessor: 'contractNo' }, { header: 'Issuing Authority', accessor: 'issuingAuthority' },
      { header: 'Certificate Type', accessor: 'certificateType' }, { header: 'Country of Origin', accessor: 'countryOfOrigin' },
      { header: 'Buyer Country', accessor: 'buyerCountry' }, { header: 'Quantity (MT)', accessor: 'quantity' },
      { header: 'FOB Value ($)', accessor: 'fobValue' }, { header: 'Issue Date', accessor: 'issueDate' },
      { header: 'Validity Date', accessor: 'validityDate' }, { header: 'Issued By', accessor: 'issuedBy' }
    ],
    fields: [
      { label: 'BL Number', name: 'blNumber', type: 'text', readOnly: true },
      { label: 'Contract No', name: 'contractNo', type: 'text', readOnly: true },
      { label: 'COO Number', name: 'cooNo', type: 'text', readOnly: true },
      { label: 'Issue Date', name: 'issueDate', type: 'date' },
      { label: 'Issuing Authority', name: 'issuingAuthority', type: 'select', options: ['APEDA', 'Chamber of Commerce', 'FIEO'] },
      { label: 'Certificate Type', name: 'certificateType', type: 'select', options: ['Preferential', 'Non-Preferential'] },
      { label: 'Country of Origin', name: 'countryOfOrigin', type: 'text' },
      { label: 'Buyer Country', name: 'buyerCountry', type: 'text', readOnly: true },
      { label: 'Buyer Name', name: 'buyerName', type: 'text', readOnly: true },
      { label: 'HSN Code', name: 'hsCode', type: 'text' },
      { label: 'Description of Goods', name: 'descriptionOfGoods', type: 'text' },
      { label: 'Quantity (MT)', name: 'quantity', type: 'number' },
      { label: 'FOB Value ($)', name: 'fobValue', type: 'number' },
      { label: 'Issued By', name: 'issuedBy', type: 'text' },
      { label: 'Validity Date', name: 'validityDate', type: 'date' },
      { label: 'Authentication No', name: 'authenticationNo', type: 'text' },
      { label: 'Stamp/Seal Reference', name: 'stampSealRef', type: 'text' }
    ]
  },
  {
    file: 'ExportDocumentation.jsx', name: 'ExportDocumentation', title: 'Stage 9 - Export Documentation', action: 'Process Docs', modalTitle: 'Documentation & Bank Advice',
    pendingCols: [
      { header: 'COO No', accessor: 'cooNo' }, { header: 'BL Number', accessor: 'blNumber' },
      { header: 'Contract No', accessor: 'contractNo' }, { header: 'Buyer Name', accessor: 'buyerName' },
      { header: 'Buyer Country', accessor: 'buyerCountry' }, { header: 'Quantity (MT)', accessor: 'quantity' },
      { header: 'FOB Value ($)', accessor: 'fobValue' }, { header: 'Issue Date', accessor: 'issueDate' }
    ],
    historyCols: [
      { header: 'Export Invoice No', accessor: 'exportInvoiceNo' }, { header: 'COO No', accessor: 'cooNo' },
      { header: 'BL Number', accessor: 'blNumber' }, { header: 'Contract No', accessor: 'contractNo' },
      { header: 'Invoice Date', accessor: 'invoiceDate' }, { header: 'Invoice Amount ($)', accessor: 'invoiceAmount' },
      { header: 'INR Equivalent (₹)', accessor: 'inrEquivalent' }, { header: 'Insurance Policy No', accessor: 'insurancePolicyNo' },
      { header: 'Sum Insured ($)', accessor: 'sumInsured' }, { header: 'Port Charges (₹)', accessor: 'portCharges' },
      { header: 'Custom Clearance (₹)', accessor: 'customClearance' }, { header: 'Bank Ref No', accessor: 'bankRefNo' },
      { header: 'SWIFT Code', accessor: 'swiftCode' }, { header: 'LC No', accessor: 'lcNo' },
      { header: 'Doc Submission Date', accessor: 'docSubmissionDate' }, { header: 'Submitted By', accessor: 'submittedBy' }
    ],
    fields: [
      { label: 'COO No', name: 'cooNo', type: 'text', readOnly: true },
      { label: 'BL Number', name: 'blNumber', type: 'text', readOnly: true },
      { label: 'Contract No', name: 'contractNo', type: 'text', readOnly: true },
      { label: 'Export Invoice No', name: 'exportInvoiceNo', type: 'text', readOnly: true },
      { label: 'Invoice Date', name: 'invoiceDate', type: 'date' },
      { label: 'Invoice Currency', name: 'invoiceCurrency', type: 'select', options: ['USD', 'EUR', 'GBP'] },
      { label: 'Invoice Amount', name: 'invoiceAmount', type: 'number' },
      { label: 'Conversion Rate (₹/Curr)', name: 'conversionRate', type: 'number' },
      { label: 'INR Equivalent (₹)', name: 'inrEquivalent', type: 'number', readOnly: true },
      { label: 'Insurance Policy No', name: 'insurancePolicyNo', type: 'text' },
      { label: 'Insurance Company', name: 'insuranceCompany', type: 'text' },
      { label: 'Insurance Type', name: 'insuranceType', type: 'select', options: ['Marine', 'All Risk'] },
      { label: 'Sum Insured', name: 'sumInsured', type: 'number' },
      { label: 'Insurance Premium (₹)', name: 'insurancePremium', type: 'number' },
      { label: 'Port Name', name: 'portName', type: 'text' },
      { label: 'Port Charges (₹)', name: 'portCharges', type: 'number' },
      { label: 'Wharfage Charges (₹)', name: 'wharfageCharges', type: 'number' },
      { label: 'Custom Clearance Charges (₹)', name: 'customClearance', type: 'number' },
      { label: 'Bank Name', name: 'bankName', type: 'text' },
      { label: 'Bank Branch', name: 'bankBranch', type: 'text' },
      { label: 'Bank Ref No', name: 'bankRefNo', type: 'text' },
      { label: 'SWIFT Code/IBAN', name: 'swiftCode', type: 'text' },
      { label: 'LC No (if applicable)', name: 'lcNo', type: 'text' },
      { label: 'LC Expiry Date', name: 'lcExpiryDate', type: 'date' },
      { label: 'Documents Submitted', name: 'docsSubmitted', type: 'text', placeholder: 'BL, Invoice, COO...' },
      { label: 'Document Submission Date', name: 'docSubmissionDate', type: 'date' },
      { label: 'Submitted By', name: 'submittedBy', type: 'text' }
    ]
  },
  {
    file: 'ExportPayment.jsx', name: 'ExportPayment', title: 'Stage 10 - Export Payment', action: 'Record Payment', modalTitle: 'Payment Details',
    pendingCols: [
      { header: 'Export Invoice No', accessor: 'exportInvoiceNo' }, { header: 'Contract No', accessor: 'contractNo' },
      { header: 'Buyer Name', accessor: 'buyerName' }, { header: 'Buyer Country', accessor: 'buyerCountry' },
      { header: 'Invoice Amount ($)', accessor: 'invoiceAmount' }, { header: 'Invoice Date', accessor: 'invoiceDate' },
      { header: 'Bank Ref No', accessor: 'bankRefNo' }, { header: 'LC No', accessor: 'lcNo' },
      { header: 'Doc Submission Date', accessor: 'docSubmissionDate' }, { header: 'Outstanding', accessor: 'outstandingInitial' }
    ],
    historyCols: [
      { header: 'Payment ID', accessor: 'paymentId' }, { header: 'Export Invoice No', accessor: 'exportInvoiceNo' },
      { header: 'Contract No', accessor: 'contractNo' }, { header: 'Buyer Name', accessor: 'buyerName' },
      { header: 'Receipt Date', accessor: 'receiptDate' }, { header: 'Amount Received', accessor: 'amountReceived' },
      { header: 'INR Equivalent (₹)', accessor: 'inrEquivalent' }, { header: 'Forex Rate', accessor: 'forexRate' },
      { header: 'FIRC No', accessor: 'fircNo' }, { header: 'FIRC Date', accessor: 'fircDate' },
      { header: 'Outstanding', accessor: 'outstanding' }, { header: 'Payment Mode', accessor: 'paymentMode' },
      { header: 'Payment Status', accessor: 'paymentStatus' }, { header: 'Bank Ref No', accessor: 'bankRefNo' },
      { header: 'Received By', accessor: 'receivedBy' }
    ],
    fields: [
      { label: 'Export Invoice No', name: 'exportInvoiceNo', type: 'text', readOnly: true },
      { label: 'Contract No', name: 'contractNo', type: 'text', readOnly: true },
      { label: 'Buyer Name', name: 'buyerName', type: 'text', readOnly: true },
      { label: 'Payment ID', name: 'paymentId', type: 'text', readOnly: true },
      { label: 'Receipt Date', name: 'receiptDate', type: 'date' },
      { label: 'Amount Received', name: 'amountReceived', type: 'number' },
      { label: 'Forex Rate (₹/Curr)', name: 'forexRate', type: 'number' },
      { label: 'INR Equivalent (₹)', name: 'inrEquivalent', type: 'number', readOnly: true },
      { label: 'Payment Mode', name: 'paymentMode', type: 'select', options: ['LC', 'TT', 'DA', 'CAD'] },
      { label: 'Bank Name', name: 'bankName', type: 'text' },
      { label: 'Bank Reference No', name: 'bankRefNo', type: 'text' },
      { label: 'FIRC No', name: 'fircNo', type: 'text' },
      { label: 'FIRC Date', name: 'fircDate', type: 'date' },
      { label: 'Outstanding', name: 'outstanding', type: 'number', readOnly: true },
      { label: 'Penalty/Deduction', name: 'deduction', type: 'number' },
      { label: 'Reason for Deduction', name: 'deductionReason', type: 'text' },
      { label: 'Payment Status', name: 'paymentStatus', type: 'select', options: ['Full', 'Partial', 'Overdue'] },
      { label: 'Received By', name: 'receivedBy', type: 'text' },
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
    const price = Math.floor(Math.random() * 500) + 400; // USD price
    
    return {
      id: i + 1,
      contractNo: \`EC-2026-\${(i + 1).toString().padStart(4, '0')}\`,
      contractDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      buyerName: \`Global Buyer \${i+1}\`,
      buyerCountry: ['UAE', 'UK', 'USA', 'Saudi Arabia', 'Singapore'][Math.floor(Math.random() * 5)],
      buyerAddress: 'International Ave 101',
      buyerContactPerson: 'Mr. Smith',
      buyerEmail: \`contact@global\${i+1}.com\`,
      buyerPhone: \`+1 555 010\${i}\`,
      incoterms: ['FOB', 'CIF', 'CNF', 'EXW'][Math.floor(Math.random() * 4)],
      riceGrade: ['Premium Basmati', '1121 Sella', 'IR64'][Math.floor(Math.random() * 3)],
      quantity: qty,
      price: price,
      totalContractValue: qty * price,
      portOfLoading: 'Mundra Port',
      portOfDestination: 'Jebel Ali',
      shipmentDate: \`2026-07-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      paymentTerms: ['LC', 'TT', 'DA', 'CAD'][Math.floor(Math.random() * 4)],
      createdBy: 'Export Manager',

      packingListNo: \`PL-\${(i + 1).toString().padStart(4, '0')}\`,
      plDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      noOfBags: qty * 40,
      totalNetWeight: qty,
      totalGrossWeight: qty + 0.5,
      lotNumbers: \`LT-\${i+1}\`,
      batchNumbers: \`BT-\${i+1}\`,
      preparedBy: 'Warehouse Exec',

      bookingRefNo: \`CB-\${(i + 1).toString().padStart(4, '0')}\`,
      shippingLine: 'Maersk',
      containerType: '40ft',
      noOfContainers: Math.ceil(qty / 25),
      etd: \`2026-07-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      eta: \`2026-08-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      totalFreight: 1500,
      doReceived: 'Y',
      bookingDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      bookedBy: 'Logistics Head',

      loadingId: \`CL-\${(i + 1).toString().padStart(4, '0')}\`,
      containerNumber: \`MSKU\${(i+1).toString().padStart(6, '0')}\`,
      sealNumber: \`SL\${(i+1).toString().padStart(5, '0')}\`,
      tareWeight: 3.5,
      netWeightLoaded: qty,
      bagsLoaded: qty * 40,
      loadingDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}T10:00\`,
      surveyorName: 'Surveyor Co',
      cfsName: 'CFS Mundra',
      fumigationDone: 'Y',

      vesselName: 'MSC Anna',
      imoNo: '9845312',
      voyageNo: 'V-045W',
      portAgent: 'Ocean Agents Ltd',
      vgmSubmitted: 'Y',
      siSubmitted: 'Y',
      siDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      confirmedDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,

      shippingBillNo: \`SB-\${(i + 1).toString().padStart(4, '0')}\`,
      shippingBillDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      customsHouse: 'INMUN1',
      iecCode: '0384758392',
      fobValue: qty * price,
      drawbackClaim: 'Y',
      drawbackAmount: 5000,
      rodtepAmount: 2000,
      leoDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      chaName: 'CHA Services',
      filedDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,

      blNumber: \`BL-\${(i + 1).toString().padStart(4, '0')}\`,
      blDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      blType: 'Original',
      shipperName: 'Rice Mill Ltd',
      consigneeName: \`Global Buyer \${i+1}\`,
      notifyParty1: 'Same as Consignee',
      noOfPackages: qty * 40,
      freightTerms: 'Prepaid',
      originalBlCopies: 3,

      cooNo: \`COO-\${(i + 1).toString().padStart(4, '0')}\`,
      issuingAuthority: 'APEDA',
      certificateType: 'Non-Preferential',
      countryOfOrigin: 'India',
      issueDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      validityDate: \`2026-12-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      issuedBy: 'Auth Officer',

      exportInvoiceNo: \`EI-\${(i + 1).toString().padStart(4, '0')}\`,
      invoiceDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      invoiceAmount: qty * price,
      inrEquivalent: qty * price * 83.5,
      insurancePolicyNo: \`POL-\${(i+1).toString().padStart(5, '0')}\`,
      sumInsured: qty * price * 1.1,
      portCharges: 15000,
      customClearance: 5000,
      bankRefNo: \`BRN-\${(i+1).toString().padStart(5, '0')}\`,
      swiftCode: 'SBININBB',
      lcNo: \`LC-\${(i+1).toString().padStart(5, '0')}\`,
      docSubmissionDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      submittedBy: 'Finance Head',

      outstandingInitial: qty * price,

      paymentId: \`EP-\${(i + 1).toString().padStart(4, '0')}\`,
      receiptDate: \`2026-07-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      amountReceived: qty * price,
      forexRate: 83.5,
      fircNo: \`FIRC-\${(i+1).toString().padStart(5, '0')}\`,
      fircDate: \`2026-07-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      outstanding: 0,
      paymentMode: 'TT',
      paymentStatus: 'Full',
      receivedBy: 'Finance Head',

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
    ${stage.name === 'PackingList' ? `autoFields = { packingListNo: 'PL-' + Math.floor(Math.random()*10000) };` : ''}
    ${stage.name === 'ContainerBooking' ? `autoFields = { bookingRefNo: 'CB-' + Math.floor(Math.random()*10000) };` : ''}
    ${stage.name === 'ContainerLoading' ? `autoFields = { loadingId: 'CL-' + Math.floor(Math.random()*10000) };` : ''}
    ${stage.name === 'ShippingBill' ? `autoFields = { shippingBillNo: 'SB-' + Math.floor(Math.random()*10000) };` : ''}
    ${stage.name === 'BillOfLading' ? `autoFields = { blNumber: 'BL-' + Math.floor(Math.random()*10000) };` : ''}
    ${stage.name === 'CertificateOfOrigin' ? `autoFields = { cooNo: 'COO-' + Math.floor(Math.random()*10000) };` : ''}
    ${stage.name === 'ExportDocumentation' ? `autoFields = { exportInvoiceNo: 'EI-' + Math.floor(Math.random()*10000) };` : ''}
    ${stage.name === 'ExportPayment' ? `autoFields = { paymentId: 'EP-' + Math.floor(Math.random()*10000) };` : ''}
    
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
      ${stage.name === 'PackingList' ? `
      const bags = parseFloat(formData.noOfBags) || 0;
      const weightPerBag = parseFloat(formData.netWeightPerBag) || 0;
      const totalNW = (bags * weightPerBag) / 1000;
      if (formData.totalNetWeight !== totalNW) {
        setFormData(prev => ({ ...prev, totalNetWeight: totalNW }));
      }
      ` : ''}
      ${stage.name === 'ContainerBooking' ? `
      const containers = parseFloat(formData.noOfContainers) || 0;
      const rate = parseFloat(formData.freightRate) || 0;
      const total = containers * rate;
      if (formData.totalFreight !== total) {
        setFormData(prev => ({ ...prev, totalFreight: total }));
      }
      ` : ''}
      ${stage.name === 'ExportDocumentation' ? `
      const amt = parseFloat(formData.invoiceAmount) || 0;
      const rate = parseFloat(formData.conversionRate) || 0;
      const inr = amt * rate;
      if (formData.inrEquivalent !== inr) {
        setFormData(prev => ({ ...prev, inrEquivalent: inr }));
      }
      ` : ''}
      ${stage.name === 'ExportPayment' ? `
      const amtRec = parseFloat(formData.amountReceived) || 0;
      const rate = parseFloat(formData.forexRate) || 0;
      const inr = amtRec * rate;
      
      const invAmt = parseFloat(selectedItem.invoiceAmount) || 0;
      const deduct = parseFloat(formData.deduction) || 0;
      const out = invAmt - amtRec - deduct;
      
      if (formData.inrEquivalent !== inr || formData.outstanding !== out) {
        setFormData(prev => ({ ...prev, inrEquivalent: inr, outstanding: out }));
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

const stage1Template = () => `import React, { useState, useEffect } from 'react';
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
    contractNo: \`EC-2026-\${(i + 1).toString().padStart(4, '0')}\`,
    contractDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
    buyerName: \`Global Buyer \${i+1}\`,
    buyerCountry: ['UAE', 'UK', 'USA', 'Saudi Arabia', 'Singapore'][Math.floor(Math.random() * 5)],
    incoterms: ['FOB', 'CIF', 'CNF', 'EXW'][Math.floor(Math.random() * 4)],
    riceGrade: ['Premium Basmati', '1121 Sella', 'IR64'][Math.floor(Math.random() * 3)],
    quantity: Math.floor(Math.random() * 50) + 10,
    price: Math.floor(Math.random() * 500) + 400,
    totalContractValue: (Math.floor(Math.random() * 50) + 10) * (Math.floor(Math.random() * 500) + 400),
    portOfLoading: 'Mundra Port',
    portOfDestination: 'Jebel Ali',
    shipmentDate: \`2026-07-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
    paymentTerms: ['LC', 'TT', 'DA', 'CAD'][Math.floor(Math.random() * 4)],
    createdBy: 'Export Manager',
    status: 'Active'
  }));
};

export const ExportContract = () => {
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
    setFormData({ contractNo: 'EC-' + Math.floor(Math.random()*10000) });
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (isModalOpen && formData) {
      const qty = parseFloat(formData.quantity) || 0;
      const price = parseFloat(formData.price) || 0;
      const total = qty * price;
      if (formData.totalContractValue !== total) {
        setFormData(prev => ({ ...prev, totalContractValue: total }));
      }
    }
  }, [formData, isModalOpen]);

  const handleSave = () => {
    const newItem = { ...formData, id: Date.now(), status: 'Active' };
    setHistoryItems([newItem, ...historyItems]);
    setIsModalOpen(false);
  };

  const columns = [
    { header: 'Contract No', accessor: 'contractNo' },
    { header: 'Contract Date', accessor: 'contractDate' },
    { header: 'Buyer Name', accessor: 'buyerName' },
    { header: 'Buyer Country', accessor: 'buyerCountry' },
    { header: 'Incoterms', accessor: 'incoterms' },
    { header: 'Rice Grade', accessor: 'riceGrade' },
    { header: 'Quantity (MT)', accessor: 'quantity' },
    { header: 'Price ($/MT)', accessor: 'price' },
    { header: 'Total Contract Value ($)', accessor: 'totalContractValue' },
    { header: 'Port of Loading', accessor: 'portOfLoading' },
    { header: 'Port of Destination', accessor: 'portOfDestination' },
    { header: 'Shipment Date', accessor: 'shipmentDate' },
    { header: 'Payment Terms', accessor: 'paymentTerms' },
    { header: 'Created By', accessor: 'createdBy' },
    { header: 'Status', accessor: 'status' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Stage 1 - Export Contract</h2>
        <Button onClick={handleCreateNew} className="flex items-center gap-2">
          <Plus size={16} /> Create Export Contract
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
        title="Create Export Contract"
      >
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Contract No</Label>
              <Input type="text" value={formData.contractNo || ''} readOnly className="bg-slate-100" />
            </div>
            <div className="space-y-1.5">
              <Label>Contract Date</Label>
              <Input type="date" value={formData.contractDate || ''} onChange={(e) => setFormData({...formData, contractDate: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Buyer Name</Label>
              <Input type="text" value={formData.buyerName || ''} onChange={(e) => setFormData({...formData, buyerName: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Buyer Country</Label>
              <Input type="text" value={formData.buyerCountry || ''} onChange={(e) => setFormData({...formData, buyerCountry: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Buyer Address</Label>
              <Input type="text" value={formData.buyerAddress || ''} onChange={(e) => setFormData({...formData, buyerAddress: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Buyer Contact Person</Label>
              <Input type="text" value={formData.buyerContactPerson || ''} onChange={(e) => setFormData({...formData, buyerContactPerson: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Buyer Email</Label>
              <Input type="text" value={formData.buyerEmail || ''} onChange={(e) => setFormData({...formData, buyerEmail: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Buyer Phone</Label>
              <Input type="text" value={formData.buyerPhone || ''} onChange={(e) => setFormData({...formData, buyerPhone: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Incoterms</Label>
              <Select value={formData.incoterms || ''} onChange={(e) => setFormData({...formData, incoterms: e.target.value})}>
                <option value="">Select Incoterms</option>
                <option value="FOB">FOB</option>
                <option value="CIF">CIF</option>
                <option value="CNF">CNF</option>
                <option value="EXW">EXW</option>
              </Select>
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
              <Label>Price ($/MT)</Label>
              <Input type="number" value={formData.price || ''} onChange={(e) => setFormData({...formData, price: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Total Contract Value ($)</Label>
              <Input type="number" value={formData.totalContractValue || ''} readOnly className="bg-slate-100" />
            </div>
            <div className="space-y-1.5">
              <Label>Port of Loading</Label>
              <Input type="text" value={formData.portOfLoading || ''} onChange={(e) => setFormData({...formData, portOfLoading: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Port of Destination</Label>
              <Input type="text" value={formData.portOfDestination || ''} onChange={(e) => setFormData({...formData, portOfDestination: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Shipment Date</Label>
              <Input type="date" value={formData.shipmentDate || ''} onChange={(e) => setFormData({...formData, shipmentDate: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Payment Terms</Label>
              <Select value={formData.paymentTerms || ''} onChange={(e) => setFormData({...formData, paymentTerms: e.target.value})}>
                <option value="">Select Payment Terms</option>
                <option value="LC">LC</option>
                <option value="TT">TT</option>
                <option value="DA">DA</option>
                <option value="CAD">CAD</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>LC/TT Reference No</Label>
              <Input type="text" value={formData.lcTtRefNo || ''} onChange={(e) => setFormData({...formData, lcTtRefNo: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Currency</Label>
              <Input type="text" value={formData.currency || ''} onChange={(e) => setFormData({...formData, currency: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Tolerance (±%)</Label>
              <Input type="number" value={formData.tolerance || ''} onChange={(e) => setFormData({...formData, tolerance: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Special Conditions</Label>
              <Input type="text" value={formData.specialConditions || ''} onChange={(e) => setFormData({...formData, specialConditions: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Created By</Label>
              <Input type="text" value={formData.createdBy || ''} onChange={(e) => setFormData({...formData, createdBy: e.target.value})} />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
            <Button onClick={() => setIsModalOpen(false)} variant="outline">Cancel</Button>
            <Button onClick={handleSave}>Save Contract</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
`;

// Write Stage 1
fs.writeFileSync(path.join('c:/Users/devel/Downloads/Rice Mill/src/modules/export', 'ExportContract.jsx'), stage1Template());
console.log('Created ExportContract.jsx');

// Write Stages 2-10
stages.forEach(stage => {
  const filePath = path.join('c:/Users/devel/Downloads/Rice Mill/src/modules/export', stage.file);
  fs.writeFileSync(filePath, template(stage));
  console.log('Created ' + stage.file);
});
