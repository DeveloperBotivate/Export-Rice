const fs = require('fs');
const path = require('path');

const stages = [
  {
    file: 'ActualProduction.jsx', name: 'ActualProduction', title: 'Stage 2 - Actual Production', action: 'Start Production', modalTitle: 'Start Actual Production',
    pendingCols: [
      { header: 'Production Order No', accessor: 'productionOrderNo' }, { header: 'Plan Date', accessor: 'planDate' },
      { header: 'Paddy Grade', accessor: 'paddyGrade' }, { header: 'Planned Input Qty (MT)', accessor: 'plannedInputQty' },
      { header: 'Expected Recovery %', accessor: 'recoveryTarget' }, { header: 'Machine Assigned', accessor: 'machineAssigned' },
      { header: 'Shift', accessor: 'shift' }
    ],
    historyCols: [
      { header: 'Production Order No', accessor: 'productionOrderNo' }, { header: 'Paddy Grade', accessor: 'paddyGrade' },
      { header: 'Planned Qty (MT)', accessor: 'plannedInputQty' }, { header: 'Actual Start Date', accessor: 'actualStartDate' },
      { header: 'Actual Start Time', accessor: 'actualStartTime' }, { header: 'Machine ID', accessor: 'machineAssigned' },
      { header: 'Operator Name', accessor: 'operatorAssigned' }, { header: 'Shift', accessor: 'shift' },
      { header: 'Status', accessor: 'status' }
    ],
    fields: [
      { label: 'Production Order No', name: 'productionOrderNo', type: 'text', readOnly: true },
      { label: 'Actual Start Date', name: 'actualStartDate', type: 'date' },
      { label: 'Actual Start Time', name: 'actualStartTime', type: 'time' },
      { label: 'Machine ID', name: 'machineAssigned', type: 'text' },
      { label: 'Operator Name', name: 'operatorAssigned', type: 'text' },
      { label: 'Shift', name: 'shift', type: 'select', options: ['Morning', 'Evening', 'Night'] },
      { label: 'Remarks', name: 'remarks', type: 'text' }
    ]
  },
  {
    file: 'PaddyCleaning.jsx', name: 'PaddyCleaning', title: 'Stage 2.1 - Paddy Cleaning', action: 'Process Cleaning', modalTitle: 'Paddy Cleaning Details',
    pendingCols: [
      { header: 'Production Order No', accessor: 'productionOrderNo' }, { header: 'Paddy Grade', accessor: 'paddyGrade' },
      { header: 'Planned Input Qty (MT)', accessor: 'plannedInputQty' }, { header: 'Actual Start Date', accessor: 'actualStartDate' },
      { header: 'Machine ID', accessor: 'machineAssigned' }, { header: 'Operator Name', accessor: 'operatorAssigned' }
    ],
    historyCols: [
      { header: 'Cleaning ID', accessor: 'cleaningId' }, { header: 'Production Order No', accessor: 'productionOrderNo' },
      { header: 'Input Qty (MT)', accessor: 'cleaningInputQty' }, { header: 'Cleaned Output (MT)', accessor: 'cleanedOutput' },
      { header: 'Dust Wastage (Kg)', accessor: 'dustWastage' }, { header: 'Stone Wastage (Kg)', accessor: 'stoneWastage' },
      { header: 'Foreign Matter (Kg)', accessor: 'foreignMatter' }, { header: 'Date', accessor: 'cleaningDate' },
      { header: 'Operator', accessor: 'cleaningOperator' }
    ],
    fields: [
      { label: 'Production Order No', name: 'productionOrderNo', type: 'text', readOnly: true },
      { label: 'Cleaning ID', name: 'cleaningId', type: 'text' },
      { label: 'Date & Time', name: 'cleaningDate', type: 'datetime-local' },
      { label: 'Input Quantity (MT)', name: 'cleaningInputQty', type: 'number' },
      { label: 'Cleaned Output (MT)', name: 'cleanedOutput', type: 'number' },
      { label: 'Wastage — Dust (Kg)', name: 'dustWastage', type: 'number' },
      { label: 'Wastage — Stones (Kg)', name: 'stoneWastage', type: 'number' },
      { label: 'Foreign Matter Removed (Kg)', name: 'foreignMatter', type: 'number' },
      { label: 'Machine ID', name: 'cleaningMachine', type: 'text' },
      { label: 'Operator', name: 'cleaningOperator', type: 'text' },
      { label: 'Remarks', name: 'remarks', type: 'text' }
    ]
  },
  {
    file: 'Dehusking.jsx', name: 'Dehusking', title: 'Stage 2.2 - Dehusking', action: 'Process Dehusking', modalTitle: 'Dehusking Details',
    pendingCols: [
      { header: 'Cleaning ID', accessor: 'cleaningId' }, { header: 'Production Order No', accessor: 'productionOrderNo' },
      { header: 'Cleaned Output (MT)', accessor: 'cleanedOutput' }, { header: 'Date', accessor: 'cleaningDate' },
      { header: 'Operator', accessor: 'cleaningOperator' }
    ],
    historyCols: [
      { header: 'Dehusking ID', accessor: 'dehuskingId' }, { header: 'Cleaning ID', accessor: 'cleaningId' },
      { header: 'Production Order No', accessor: 'productionOrderNo' }, { header: 'Input Qty (MT)', accessor: 'dehuskingInputQty' },
      { header: 'Brown Rice Output (MT)', accessor: 'brownRiceOutput' }, { header: 'Husk Output (MT)', accessor: 'huskOutput' },
      { header: 'Efficiency %', accessor: 'dehuskingEfficiency' }, { header: 'Date', accessor: 'dehuskingDate' },
      { header: 'Operator', accessor: 'dehuskingOperator' }
    ],
    fields: [
      { label: 'Cleaning ID', name: 'cleaningId', type: 'text', readOnly: true },
      { label: 'Production Order No', name: 'productionOrderNo', type: 'text', readOnly: true },
      { label: 'Dehusking ID', name: 'dehuskingId', type: 'text' },
      { label: 'Input Quantity (MT)', name: 'dehuskingInputQty', type: 'number' },
      { label: 'Brown Rice Output (MT)', name: 'brownRiceOutput', type: 'number' },
      { label: 'Rice Husk Generated (MT)', name: 'huskOutput', type: 'number' },
      { label: 'Dehusking Efficiency (%)', name: 'dehuskingEfficiency', type: 'number' },
      { label: 'Rubber Roll ID', name: 'rubberRollId', type: 'text' },
      { label: 'Machine RPM', name: 'machineRpm', type: 'number' },
      { label: 'Operator', name: 'dehuskingOperator', type: 'text' },
      { label: 'Date & Time', name: 'dehuskingDate', type: 'datetime-local' },
      { label: 'Remarks', name: 'remarks', type: 'text' }
    ]
  },
  {
    file: 'Separation.jsx', name: 'Separation', title: 'Stage 2.3 - Separation', action: 'Process Separation', modalTitle: 'Separation Details',
    pendingCols: [
      { header: 'Dehusking ID', accessor: 'dehuskingId' }, { header: 'Production Order No', accessor: 'productionOrderNo' },
      { header: 'Brown Rice Output (MT)', accessor: 'brownRiceOutput' }, { header: 'Efficiency %', accessor: 'dehuskingEfficiency' },
      { header: 'Date', accessor: 'dehuskingDate' }, { header: 'Operator', accessor: 'dehuskingOperator' }
    ],
    historyCols: [
      { header: 'Separation ID', accessor: 'separationId' }, { header: 'Dehusking ID', accessor: 'dehuskingId' },
      { header: 'Production Order No', accessor: 'productionOrderNo' }, { header: 'Input Brown Rice (MT)', accessor: 'separationInputQty' },
      { header: 'Separated Brown Rice (MT)', accessor: 'separatedBrownRice' }, { header: 'Paddy Returned (MT)', accessor: 'paddyReturned' },
      { header: 'Efficiency %', accessor: 'separationEfficiency' }, { header: 'Date', accessor: 'separationDate' },
      { header: 'Operator', accessor: 'separationOperator' }
    ],
    fields: [
      { label: 'Dehusking ID', name: 'dehuskingId', type: 'text', readOnly: true },
      { label: 'Production Order No', name: 'productionOrderNo', type: 'text', readOnly: true },
      { label: 'Separation ID', name: 'separationId', type: 'text' },
      { label: 'Input — Brown Rice (MT)', name: 'separationInputQty', type: 'number' },
      { label: 'Separated Brown Rice (MT)', name: 'separatedBrownRice', type: 'number' },
      { label: 'Paddy Returned for Dehusking (MT)', name: 'paddyReturned', type: 'number' },
      { label: 'Paddy Separator Machine ID', name: 'separatorMachineId', type: 'text' },
      { label: 'Efficiency (%)', name: 'separationEfficiency', type: 'number' },
      { label: 'Operator', name: 'separationOperator', type: 'text' },
      { label: 'Date & Time', name: 'separationDate', type: 'datetime-local' },
      { label: 'Remarks', name: 'remarks', type: 'text' }
    ]
  },
  {
    file: 'Polishing.jsx', name: 'Polishing', title: 'Stage 2.4 - Polishing', action: 'Process Polishing', modalTitle: 'Polishing Details',
    pendingCols: [
      { header: 'Separation ID', accessor: 'separationId' }, { header: 'Production Order No', accessor: 'productionOrderNo' },
      { header: 'Separated Brown Rice (MT)', accessor: 'separatedBrownRice' }, { header: 'Date', accessor: 'separationDate' },
      { header: 'Operator', accessor: 'separationOperator' }
    ],
    historyCols: [
      { header: 'Polishing ID', accessor: 'polishingId' }, { header: 'Separation ID', accessor: 'separationId' },
      { header: 'Production Order No', accessor: 'productionOrderNo' }, { header: 'Input (MT)', accessor: 'polishingInputQty' },
      { header: 'White Rice Output (MT)', accessor: 'whiteRiceOutput' }, { header: 'Bran Output (MT)', accessor: 'branOutput' },
      { header: 'Polish Output (MT)', accessor: 'polishOutput' }, { header: 'Polishing Degree %', accessor: 'polishingDegree' },
      { header: 'Date', accessor: 'polishingDate' }, { header: 'Operator', accessor: 'polishingOperator' }
    ],
    fields: [
      { label: 'Separation ID', name: 'separationId', type: 'text', readOnly: true },
      { label: 'Production Order No', name: 'productionOrderNo', type: 'text', readOnly: true },
      { label: 'Polishing ID', name: 'polishingId', type: 'text' },
      { label: 'Input — Brown Rice (MT)', name: 'polishingInputQty', type: 'number' },
      { label: 'White Rice Output (MT)', name: 'whiteRiceOutput', type: 'number' },
      { label: 'Rice Bran Generated (MT)', name: 'branOutput', type: 'number' },
      { label: 'Rice Polish Generated (MT)', name: 'polishOutput', type: 'number' },
      { label: 'Polishing Degree (%)', name: 'polishingDegree', type: 'number' },
      { label: 'Machine ID', name: 'polishingMachineId', type: 'text' },
      { label: 'Water Used (L)', name: 'waterUsed', type: 'number' },
      { label: 'Operator', name: 'polishingOperator', type: 'text' },
      { label: 'Date & Time', name: 'polishingDate', type: 'datetime-local' },
      { label: 'Remarks', name: 'remarks', type: 'text' }
    ]
  },
  {
    file: 'Grading.jsx', name: 'Grading', title: 'Stage 2.5 - Grading', action: 'Process Grading', modalTitle: 'Grading Details',
    pendingCols: [
      { header: 'Polishing ID', accessor: 'polishingId' }, { header: 'Production Order No', accessor: 'productionOrderNo' },
      { header: 'White Rice Output (MT)', accessor: 'whiteRiceOutput' }, { header: 'Date', accessor: 'polishingDate' },
      { header: 'Operator', accessor: 'polishingOperator' }
    ],
    historyCols: [
      { header: 'Grading ID', accessor: 'gradingId' }, { header: 'Polishing ID', accessor: 'polishingId' },
      { header: 'Production Order No', accessor: 'productionOrderNo' }, { header: 'Input (MT)', accessor: 'gradingInputQty' },
      { header: 'Grade A (MT)', accessor: 'gradeARice' }, { header: 'Grade B (MT)', accessor: 'gradeBRice' },
      { header: 'Broken Rice (MT)', accessor: 'brokenRice' }, { header: 'Small Broken (MT)', accessor: 'smallBroken' },
      { header: 'Date', accessor: 'gradingDate' }, { header: 'Operator', accessor: 'gradingOperator' }
    ],
    fields: [
      { label: 'Polishing ID', name: 'polishingId', type: 'text', readOnly: true },
      { label: 'Production Order No', name: 'productionOrderNo', type: 'text', readOnly: true },
      { label: 'Grading ID', name: 'gradingId', type: 'text' },
      { label: 'Input — White Rice (MT)', name: 'gradingInputQty', type: 'number' },
      { label: 'Grade A Rice (MT)', name: 'gradeARice', type: 'number' },
      { label: 'Grade B Rice (MT)', name: 'gradeBRice', type: 'number' },
      { label: 'Broken Rice (MT)', name: 'brokenRice', type: 'number' },
      { label: 'Small Broken (MT)', name: 'smallBroken', type: 'number' },
      { label: 'Grading Machine ID', name: 'gradingMachineId', type: 'text' },
      { label: 'Sieve Size Used', name: 'sieveSize', type: 'text' },
      { label: 'Operator', name: 'gradingOperator', type: 'text' },
      { label: 'Date & Time', name: 'gradingDate', type: 'datetime-local' },
      { label: 'Remarks', name: 'remarks', type: 'text' }
    ]
  },
  {
    file: 'ColorSorting.jsx', name: 'ColorSorting', title: 'Stage 2.6 - Color Sorting', action: 'Process Sorting', modalTitle: 'Color Sorting Details',
    pendingCols: [
      { header: 'Grading ID', accessor: 'gradingId' }, { header: 'Production Order No', accessor: 'productionOrderNo' },
      { header: 'Grade A Qty (MT)', accessor: 'gradeARice' }, { header: 'Grade B Qty (MT)', accessor: 'gradeBRice' },
      { header: 'Broken Rice (MT)', accessor: 'brokenRice' }, { header: 'Date', accessor: 'gradingDate' },
      { header: 'Operator', accessor: 'gradingOperator' }
    ],
    historyCols: [
      { header: 'Color Sort ID', accessor: 'colorSortId' }, { header: 'Grading ID', accessor: 'gradingId' },
      { header: 'Production Order No', accessor: 'productionOrderNo' }, { header: 'Input (MT)', accessor: 'colorSortInputQty' },
      { header: 'Sorted Output (MT)', accessor: 'sortedOutput' }, { header: 'Rejection (MT)', accessor: 'rejection' },
      { header: 'Rejection %', accessor: 'rejectionPercent' }, { header: 'Date', accessor: 'colorSortDate' },
      { header: 'Operator', accessor: 'colorSortOperator' }
    ],
    fields: [
      { label: 'Grading ID', name: 'gradingId', type: 'text', readOnly: true },
      { label: 'Production Order No', name: 'productionOrderNo', type: 'text', readOnly: true },
      { label: 'Color Sort ID', name: 'colorSortId', type: 'text' },
      { label: 'Input Quantity (MT)', name: 'colorSortInputQty', type: 'number' },
      { label: 'Sorted Rice Output (MT)', name: 'sortedOutput', type: 'number' },
      { label: 'Rejection/Discard (MT)', name: 'rejection', type: 'number' },
      { label: 'Color Sorter Machine ID', name: 'colorSorterMachineId', type: 'text' },
      { label: 'No. of Passes', name: 'noOfPasses', type: 'number' },
      { label: 'Rejection %', name: 'rejectionPercent', type: 'number' },
      { label: 'Operator', name: 'colorSortOperator', type: 'text' },
      { label: 'Date & Time', name: 'colorSortDate', type: 'datetime-local' },
      { label: 'Remarks', name: 'remarks', type: 'text' }
    ]
  },
  {
    file: 'ExpectedVsActual.jsx', name: 'ExpectedVsActual', title: 'Stage 3 - Expected vs Actual (Inventory)', action: 'Close Production', modalTitle: 'Production Closure',
    pendingCols: [
      { header: 'Color Sort ID', accessor: 'colorSortId' }, { header: 'Production Order No', accessor: 'productionOrderNo' },
      { header: 'Planned Input (MT)', accessor: 'plannedInputQty' }, { header: 'Expected Rice Output (MT)', accessor: 'expectedPremiumRice' },
      { header: 'Sorted Output (MT)', accessor: 'sortedOutput' }, { header: 'Rejection (MT)', accessor: 'rejection' },
      { header: 'Date', accessor: 'colorSortDate' }
    ],
    historyCols: [
      { header: 'Production Order No', accessor: 'productionOrderNo' }, { header: 'Planned Input (MT)', accessor: 'plannedInputQty' },
      { header: 'Actual Input (MT)', accessor: 'actualTotalInput' }, { header: 'Expected Output (MT)', accessor: 'expectedPremiumRice' },
      { header: 'Actual Output (MT)', accessor: 'actualRiceOutput' }, { header: 'Variance (MT)', accessor: 'variance' },
      { header: 'Recovery %', accessor: 'actualRecoveryPercent' }, { header: 'Actual Bran (MT)', accessor: 'actualBran' },
      { header: 'Actual Husk (MT)', accessor: 'actualHusk' }, { header: 'Machine Hold', accessor: 'machineHold' },
      { header: 'Closure Date', accessor: 'closureDate' }, { header: 'Closed By', accessor: 'closedBy' },
      { header: 'Status', accessor: 'status' }
    ],
    fields: [
      { label: 'Production Order No', name: 'productionOrderNo', type: 'text', readOnly: true },
      { label: 'Color Sort ID', name: 'colorSortId', type: 'text', readOnly: true },
      { label: 'Actual Total Input (MT)', name: 'actualTotalInput', type: 'number' },
      { label: 'Actual Rice Output (MT)', name: 'actualRiceOutput', type: 'number' },
      { label: 'Actual Bran (MT)', name: 'actualBran', type: 'number' },
      { label: 'Actual Husk (MT)', name: 'actualHusk', type: 'number' },
      { label: 'Actual Polish (MT)', name: 'actualPolish', type: 'number' },
      { label: 'Actual Broken Rice (MT)', name: 'actualBrokenRice', type: 'number' },
      { label: 'Recovery %', name: 'actualRecoveryPercent', type: 'number', readOnly: true },
      { label: 'Expected Recovery %', name: 'recoveryTarget', type: 'number', readOnly: true },
      { label: 'Variance (MT)', name: 'variance', type: 'number', readOnly: true },
      { label: 'Machine Hold (Yes/No)', name: 'machineHold', type: 'select', options: ['Yes', 'No'] },
      { label: 'Hold Reason', name: 'holdReason', type: 'text' },
      { label: 'Inventory Transfer Ref', name: 'inventoryTransferRef', type: 'text' },
      { label: 'Closed By', name: 'closedBy', type: 'text' }
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
    
    return {
      id: i + 1,
      productionOrderNo: \`PRD-2026-\${(i + 1).toString().padStart(4, '0')}\`,
      planDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      paddyGrade: ['Grade A', 'Grade B', 'Grade C'][Math.floor(Math.random() * 3)],
      sourceStockId: \`STK-\${Math.floor(Math.random() * 1000)}\`,
      lotNo: \`LOT-\${i+1}\`,
      batchNo: \`BATCH-\${i+1}\`,
      plannedInputQty: qty,
      expectedPremiumRice: (qty * 0.6).toFixed(2),
      expectedBrokenRice: (qty * 0.1).toFixed(2),
      expectedBran: (qty * 0.08).toFixed(2),
      expectedHusk: (qty * 0.2).toFixed(2),
      expectedPolish: (qty * 0.02).toFixed(2),
      recoveryTarget: 60,
      machineAssigned: \`MCH-\${Math.floor(Math.random() * 10)}\`,
      operatorAssigned: 'Ramesh Operator',
      shift: ['Morning', 'Evening', 'Night'][Math.floor(Math.random() * 3)],
      productionDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      plannedBy: 'Production Head',
      
      actualStartDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      actualStartTime: '08:00 AM',
      
      cleaningId: \`CLN-\${(i + 1).toString().padStart(4, '0')}\`,
      cleaningDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}T10:00\`,
      cleaningInputQty: qty,
      cleanedOutput: (qty * 0.98).toFixed(2),
      dustWastage: Math.floor(Math.random() * 50) + 10,
      stoneWastage: Math.floor(Math.random() * 20) + 5,
      foreignMatter: Math.floor(Math.random() * 30) + 5,
      cleaningMachine: \`CLN-MCH-\${Math.floor(Math.random() * 5)}\`,
      cleaningOperator: 'Suresh Cleaner',

      dehuskingId: \`DHK-\${(i + 1).toString().padStart(4, '0')}\`,
      dehuskingInputQty: (qty * 0.98).toFixed(2),
      brownRiceOutput: (qty * 0.78).toFixed(2),
      huskOutput: (qty * 0.2).toFixed(2),
      dehuskingEfficiency: 95,
      rubberRollId: \`RR-\${Math.floor(Math.random() * 100)}\`,
      machineRpm: 1200,
      dehuskingOperator: 'Anil Husker',
      dehuskingDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}T12:00\`,

      separationId: \`SEP-\${(i + 1).toString().padStart(4, '0')}\`,
      separationInputQty: (qty * 0.78).toFixed(2),
      separatedBrownRice: (qty * 0.75).toFixed(2),
      paddyReturned: (qty * 0.03).toFixed(2),
      separatorMachineId: \`SEP-MCH-\${Math.floor(Math.random() * 5)}\`,
      separationEfficiency: 98,
      separationOperator: 'Vijay Separator',
      separationDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}T14:00\`,

      polishingId: \`POL-\${(i + 1).toString().padStart(4, '0')}\`,
      polishingInputQty: (qty * 0.75).toFixed(2),
      whiteRiceOutput: (qty * 0.65).toFixed(2),
      branOutput: (qty * 0.08).toFixed(2),
      polishOutput: (qty * 0.02).toFixed(2),
      polishingDegree: 12,
      polishingMachineId: \`POL-MCH-\${Math.floor(Math.random() * 5)}\`,
      waterUsed: Math.floor(Math.random() * 500) + 100,
      polishingOperator: 'Mohan Polisher',
      polishingDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}T16:00\`,

      gradingId: \`GRD-\${(i + 1).toString().padStart(4, '0')}\`,
      gradingInputQty: (qty * 0.65).toFixed(2),
      gradeARice: (qty * 0.5).toFixed(2),
      gradeBRice: (qty * 0.1).toFixed(2),
      brokenRice: (qty * 0.03).toFixed(2),
      smallBroken: (qty * 0.02).toFixed(2),
      gradingMachineId: \`GRD-MCH-\${Math.floor(Math.random() * 5)}\`,
      sieveSize: '3.5mm',
      gradingOperator: 'Karan Grader',
      gradingDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}T18:00\`,

      colorSortId: \`CS-\${(i + 1).toString().padStart(4, '0')}\`,
      colorSortInputQty: (qty * 0.5).toFixed(2),
      sortedOutput: (qty * 0.49).toFixed(2),
      rejection: (qty * 0.01).toFixed(2),
      colorSorterMachineId: \`CS-MCH-\${Math.floor(Math.random() * 5)}\`,
      noOfPasses: 2,
      rejectionPercent: 2,
      colorSortOperator: 'Raj Sorter',
      colorSortDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}T20:00\`,

      actualTotalInput: qty,
      actualRiceOutput: (qty * 0.49).toFixed(2),
      actualBran: (qty * 0.08).toFixed(2),
      actualHusk: (qty * 0.2).toFixed(2),
      actualPolish: (qty * 0.02).toFixed(2),
      actualBrokenRice: (qty * 0.03).toFixed(2),
      actualRecoveryPercent: 58,
      variance: -0.5,
      machineHold: 'No',
      holdReason: '',
      inventoryTransferRef: \`TRF-\${Math.floor(Math.random() * 1000)}\`,
      closedBy: 'Production Head',
      closureDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,

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
    ${stage.name === 'PaddyCleaning' ? `autoFields = { cleaningId: 'CLN-' + Math.floor(Math.random()*10000) };` : ''}
    ${stage.name === 'Dehusking' ? `autoFields = { dehuskingId: 'DHK-' + Math.floor(Math.random()*10000) };` : ''}
    ${stage.name === 'Separation' ? `autoFields = { separationId: 'SEP-' + Math.floor(Math.random()*10000) };` : ''}
    ${stage.name === 'Polishing' ? `autoFields = { polishingId: 'POL-' + Math.floor(Math.random()*10000) };` : ''}
    ${stage.name === 'Grading' ? `autoFields = { gradingId: 'GRD-' + Math.floor(Math.random()*10000) };` : ''}
    ${stage.name === 'ColorSorting' ? `autoFields = { colorSortId: 'CS-' + Math.floor(Math.random()*10000) };` : ''}
    
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
      ${stage.name === 'ExpectedVsActual' ? `
      const input = parseFloat(formData.actualTotalInput) || 0;
      const output = parseFloat(formData.actualRiceOutput) || 0;
      const expectedOutput = parseFloat(selectedItem?.expectedPremiumRice) || 0;
      
      const recovery = input > 0 ? ((output / input) * 100).toFixed(2) : 0;
      const variance = (output - expectedOutput).toFixed(2);
      
      if (formData.actualRecoveryPercent !== recovery || formData.variance !== variance) {
        setFormData(prev => ({ ...prev, actualRecoveryPercent: recovery, variance: variance }));
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
    productionOrderNo: \`PRD-2026-\${(i + 1).toString().padStart(4, '0')}\`,
    planDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
    paddyGrade: ['Grade A', 'Grade B', 'Grade C'][Math.floor(Math.random() * 3)],
    sourceStockId: \`STK-\${Math.floor(Math.random() * 1000)}\`,
    lotNo: \`LOT-\${i+1}\`,
    batchNo: \`BATCH-\${i+1}\`,
    plannedInputQty: Math.floor(Math.random() * 50) + 10,
    expectedPremiumRice: (Math.floor(Math.random() * 50) * 0.6).toFixed(2),
    expectedBrokenRice: (Math.floor(Math.random() * 50) * 0.1).toFixed(2),
    expectedBran: (Math.floor(Math.random() * 50) * 0.08).toFixed(2),
    expectedHusk: (Math.floor(Math.random() * 50) * 0.2).toFixed(2),
    expectedPolish: (Math.floor(Math.random() * 50) * 0.02).toFixed(2),
    recoveryTarget: 60,
    machineAssigned: \`MCH-\${Math.floor(Math.random() * 10)}\`,
    operatorAssigned: 'Ramesh Operator',
    shift: ['Morning', 'Evening', 'Night'][Math.floor(Math.random() * 3)],
    productionDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
    plannedBy: 'Production Head'
  }));
};

export const ProductionPlanning = () => {
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
    setFormData({ productionOrderNo: 'PRD-' + Math.floor(Math.random()*10000) });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    const newItem = { ...formData, id: Date.now() };
    setHistoryItems([newItem, ...historyItems]);
    setIsModalOpen(false);
  };

  const columns = [
    { header: 'Production Order No', accessor: 'productionOrderNo' },
    { header: 'Plan Date', accessor: 'planDate' },
    { header: 'Paddy Grade', accessor: 'paddyGrade' },
    { header: 'Source Stock ID', accessor: 'sourceStockId' },
    { header: 'Lot No', accessor: 'lotNo' },
    { header: 'Batch No', accessor: 'batchNo' },
    { header: 'Planned Input Qty (MT)', accessor: 'plannedInputQty' },
    { header: 'Expected Rice Output (MT)', accessor: 'expectedPremiumRice' },
    { header: 'Expected Bran (MT)', accessor: 'expectedBran' },
    { header: 'Expected Husk (MT)', accessor: 'expectedHusk' },
    { header: 'Recovery % Target', accessor: 'recoveryTarget' },
    { header: 'Machine Assigned', accessor: 'machineAssigned' },
    { header: 'Shift', accessor: 'shift' },
    { header: 'Planned By', accessor: 'plannedBy' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Stage 1 - Production Planning</h2>
        <Button onClick={handleCreateNew} className="flex items-center gap-2">
          <Plus size={16} /> Create Production Plan
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
        title="Create Production Plan"
      >
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Production Order No</Label>
              <Input type="text" value={formData.productionOrderNo || ''} readOnly className="bg-slate-100" />
            </div>
            <div className="space-y-1.5">
              <Label>Plan Date</Label>
              <Input type="date" value={formData.planDate || ''} onChange={(e) => setFormData({...formData, planDate: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Paddy Grade Input</Label>
              <Input type="text" value={formData.paddyGrade || ''} onChange={(e) => setFormData({...formData, paddyGrade: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Source Stock ID</Label>
              <Input type="text" value={formData.sourceStockId || ''} onChange={(e) => setFormData({...formData, sourceStockId: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Lot No</Label>
              <Input type="text" value={formData.lotNo || ''} onChange={(e) => setFormData({...formData, lotNo: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Batch No</Label>
              <Input type="text" value={formData.batchNo || ''} onChange={(e) => setFormData({...formData, batchNo: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Planned Input Quantity (MT)</Label>
              <Input type="number" value={formData.plannedInputQty || ''} onChange={(e) => setFormData({...formData, plannedInputQty: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Expected Output — Premium Rice (MT)</Label>
              <Input type="number" value={formData.expectedPremiumRice || ''} onChange={(e) => setFormData({...formData, expectedPremiumRice: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Expected Output — Broken Rice (MT)</Label>
              <Input type="number" value={formData.expectedBrokenRice || ''} onChange={(e) => setFormData({...formData, expectedBrokenRice: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Expected Bran (MT)</Label>
              <Input type="number" value={formData.expectedBran || ''} onChange={(e) => setFormData({...formData, expectedBran: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Expected Husk (MT)</Label>
              <Input type="number" value={formData.expectedHusk || ''} onChange={(e) => setFormData({...formData, expectedHusk: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Expected Polish (MT)</Label>
              <Input type="number" value={formData.expectedPolish || ''} onChange={(e) => setFormData({...formData, expectedPolish: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Recovery % Target</Label>
              <Input type="number" value={formData.recoveryTarget || ''} onChange={(e) => setFormData({...formData, recoveryTarget: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Machine Assigned</Label>
              <Input type="text" value={formData.machineAssigned || ''} onChange={(e) => setFormData({...formData, machineAssigned: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Operator Assigned</Label>
              <Input type="text" value={formData.operatorAssigned || ''} onChange={(e) => setFormData({...formData, operatorAssigned: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Shift</Label>
              <Select value={formData.shift || ''} onChange={(e) => setFormData({...formData, shift: e.target.value})}>
                <option value="">Select Shift</option>
                <option value="Morning">Morning</option>
                <option value="Evening">Evening</option>
                <option value="Night">Night</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Production Date</Label>
              <Input type="date" value={formData.productionDate || ''} onChange={(e) => setFormData({...formData, productionDate: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Planned By</Label>
              <Input type="text" value={formData.plannedBy || ''} onChange={(e) => setFormData({...formData, plannedBy: e.target.value})} />
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
fs.writeFileSync(path.join('c:/Users/devel/Downloads/Rice Mill/src/modules/production', 'ProductionPlanning.jsx'), stage1Template());
console.log('Created ProductionPlanning.jsx');

// Write Stages 2-9
stages.forEach(stage => {
  const filePath = path.join('c:/Users/devel/Downloads/Rice Mill/src/modules/production', stage.file);
  fs.writeFileSync(filePath, template(stage));
  console.log('Created ' + stage.file);
});
