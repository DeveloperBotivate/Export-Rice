export const ensurePurchaseDummyData = () => {
  const v = 'v6'; // Force new version to wipe out old cache issues
  let masterData = JSON.parse(localStorage.getItem(`purchase_master_${v}`));
  
  if (!masterData || masterData.length === 0) {
    const dummyDataArray = [];
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
        liftId: "LIFT-" + i.toString().padStart(4, '0'), liftDate: '2023-10-22T08:00', grossWeight: 30000, tareWeight: 10000, netWeight: 20000, moisture: 17.4, liftedFrom: 'Karnal Godown', supervisor: 'Amit', liftNo: 1, liftQtyMT: 300 + i*10, remainingAfterLiftMT: 0, status: 'Fully Lifted',
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
    
    localStorage.setItem(`purchase_master_${v}`, JSON.stringify(dummyDataArray));
    
    for(let i=1; i<=14; i++) {
      const numItems = Math.max(2, Math.round(40 * (15 - i) / 14)); 
      const ids = Array.from({length: numItems}, (_, index) => index + 1);
      localStorage.setItem(`purchase_${i}_history`, JSON.stringify(ids));
      
      if (i >= 8) {
        ids.forEach(id => {
          const item = dummyDataArray.find(d => d.id === id);
          if (item) {
            localStorage.setItem(`lift_data_${id}`, JSON.stringify({
              totalLifted: item.qtyMT,
              liftCount: 1
            }));
          }
        });
      }
    }
  }
};
