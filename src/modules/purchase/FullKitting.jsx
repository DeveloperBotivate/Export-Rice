import React, { useState, useEffect } from 'react';
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
      indentNo: `IND-00${(i + 1).toString().padStart(2, '0')}`,
      indentDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      purchaseType: orderType,
      agencyMandi: isGov ? 'FCI' : 'Local Mandi',
      paddyGrade: ['Grade A', 'Grade B', 'Common'][Math.floor(Math.random() * 3)],
      qtyMt: Math.floor(Math.random() * 50) + 10,
      rate: Math.floor(Math.random() * 500) + 2000,
      requiredByDate: `2026-07-${(i % 28 + 1).toString().padStart(2, '0')}`,
      requestedBy: `User ${i+1}`,
      
      approvalId: `APR-00${(i + 1).toString().padStart(2, '0')}`,
      approvedQty: Math.floor(Math.random() * 50) + 10,
      approvedRate: Math.floor(Math.random() * 500) + 2000,
      approvedBudget: 100000,
      approvedBy: 'Manager',
      approvalDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      priority: 'High',
      approvalStatus: 'Approved',
      
      poNumber: `PO-00${(i + 1).toString().padStart(2, '0')}`,
      poDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      agencyVendorName: isGov ? 'FCI' : 'Farmer Singh',
      totalPoValue: 100000,
      paymentTerms: 'Advance',
      poValidityDate: `2026-07-${(i % 28 + 1).toString().padStart(2, '0')}`,
      createdBy: 'Buyer',
      
      logisticsId: `LOG-00${(i + 1).toString().padStart(2, '0')}`,
      vehicleNumber: 'PB01A1234',
      vehicleType: 'Truck',
      driverName: 'Driver X',
      transporterName: 'Trans Y',
      route: 'Mandi-Mill',
      distance: 50,
      freightRate: 100,
      totalFreight: 5000,
      expectedDeparture: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      expectedArrival: `2026-06-${(i % 28 + 2).toString().padStart(2, '0')}`,
      
      poEntryId: `POE-00${(i + 1).toString().padStart(2, '0')}`,
      entryDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      location: 'Gate 1',
      lotNo: 'L-123',
      noOfBags: 500,
      grossWeight: 25000,
      moisture: 14.5,
      paddyGradeVerified: 'Yes',
      recordedBy: 'Guard',
      
      advanceId: `ADV-00${(i + 1).toString().padStart(2, '0')}`,
      paymentDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      payeeName: isGov ? 'FCI' : 'Farmer Singh',
      advanceAmount: 20000,
      tdsAmount: 0,
      netPaid: 20000,
      paymentMode: 'NEFT',
      utrNo: 'UTR123456',
      paidBy: 'Finance',
      
      liftId: `LIFT-00${(i + 1).toString().padStart(2, '0')}`,
      liftDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      netWeight: 24500,
      liftedFrom: 'Mandi',
      supervisor: 'Supervisor A',
      
      labReportId: `LAB-00${(i + 1).toString().padStart(2, '0')}`,
      labName: 'Inhouse',
      testDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      broken: 2.1,
      chalky: 1.5,
      foreignMatter: 0.5,
      gradeResult: 'A',
      recovery: 67,
      labResult: 'Pass',
      approved: i % 5 === 0 ? 'No' : 'Yes',
      technician: 'Tech 1',
      
      kittingId: `FK-00${(i + 1).toString().padStart(2, '0')}`,
      challanNo: `CHL-00${(i + 1).toString().padStart(2, '0')}`,
      kittingDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      totalAmount: 100000,
      advancePaid: 20000,
      balancePaid: 80000,
      netPayable: 80000,
      
      closureId: `PC-00${(i + 1).toString().padStart(2, '0')}`,
      closureDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
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

export const FullKitting = () => {
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
    if ("FullKitting" === "FullKitting" && item.approved === 'No') {
      alert("Cannot process kitting for rejected lab reports.");
      return;
    }
    
    setSelectedItem(item);
    
    let autoFields = {};
    if ("FullKitting" === "PurchaseApproval") autoFields = { approvalId: "APR-00" + Math.floor(Math.random()*100) };
    if ("FullKitting" === "CreatePO") autoFields = { poNumber: "PO-00" + Math.floor(Math.random()*100) };
    if ("FullKitting" === "ArrangeLogistics") autoFields = { logisticsId: "LOG-00" + Math.floor(Math.random()*100) };
    if ("FullKitting" === "POEntry") autoFields = { poEntryId: "POE-00" + Math.floor(Math.random()*100) };
    if ("FullKitting" === "AdvancePayment") autoFields = { advanceId: "ADV-00" + Math.floor(Math.random()*100) };
    if ("FullKitting" === "Lift") autoFields = { liftId: "LIFT-00" + Math.floor(Math.random()*100) };
    if ("FullKitting" === "LabReport") autoFields = { labReportId: "LAB-00" + Math.floor(Math.random()*100) };
    if ("FullKitting" === "FullKitting") autoFields = { kittingId: "FK-00" + Math.floor(Math.random()*100), challanNo: "CHL-00" + Math.floor(Math.random()*100) };
    if ("FullKitting" === "PurchaseClosure") autoFields = { closureId: "PC-00" + Math.floor(Math.random()*100), lotNo: "LT-00" + Math.floor(Math.random()*100), batchNo: "BT-00" + Math.floor(Math.random()*100) };
    
    const readOnlyFields = ["labReportId","liftId","poNumber","indentNo","kittingId","challanNo","agencyVendorName","noOfBags","grossWeight","tareWeight","netWeight","rate","totalAmount","netPayable","advancePaid","balancePayable"];
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
      if ("FullKitting" === "FullKitting" && row.approved === 'No') {
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
            Process Kitting
          </Button>
        </div>
      );
    }
  };

  const pendingCols = [{"header":"Lab Report ID","accessor":"labReportId"},{"header":"Lift ID","accessor":"liftId"},{"header":"PO Number","accessor":"poNumber"},{"header":"Indent No","accessor":"indentNo"},{"header":"Vehicle Number","accessor":"vehicleNumber"},{"header":"Net Weight Lifted Kg","accessor":"netWeight"},{"header":"Paddy Grade Result","accessor":"gradeResult"},{"header":"Lab Result","accessor":"labResult"},{"header":"Approved","accessor":"approved","cell":true}].map(col => {
    if (col.accessor === 'approved' && "FullKitting" === "FullKitting") {
      return {
        ...col,
        cell: (row) => (
          <span className={`px-2 py-1 rounded text-xs font-semibold ${row.approved === 'Yes' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {row.approved}
          </span>
        )
      };
    }
    return col;
  });
  
  const historyCols = [{"header":"Full Kitting ID","accessor":"kittingId"},{"header":"Challan No","accessor":"challanNo"},{"header":"Lab Report ID","accessor":"labReportId"},{"header":"PO Number","accessor":"poNumber"},{"header":"Indent No","accessor":"indentNo"},{"header":"Kitting Date","accessor":"kittingDate"},{"header":"Farmer / Agency Name","accessor":"agencyVendorName"},{"header":"No. of Bags","accessor":"noOfBags"},{"header":"Net Weight Kg","accessor":"netWeight"},{"header":"Rate ₹/Qt","accessor":"rate"},{"header":"Total Amount ₹","accessor":"totalAmount"},{"header":"Advance Paid ₹","accessor":"advancePaid"},{"header":"Balance Paid ₹","accessor":"balancePaid"},{"header":"Net Payable ₹","accessor":"netPayable"},{"header":"Paid By","accessor":"paidBy"}];

  const columns = activeTab === "pending" ? [actionColumn, ...pendingCols] : historyCols;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Stage 9 - Full Kitting</h2>
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
        title="Full Kitting Details"
      >
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            
            <div className="space-y-1.5">
              <Label>Lab Report ID</Label>
              <Input 
                type="text"
                value={formData.labReportId || ""} 
                onChange={(e) => setFormData({...formData, labReportId: e.target.value})}
                readOnly={true}
                className={true ? "bg-slate-100" : ""}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Lift ID</Label>
              <Input 
                type="text"
                value={formData.liftId || ""} 
                onChange={(e) => setFormData({...formData, liftId: e.target.value})}
                readOnly={true}
                className={true ? "bg-slate-100" : ""}
              />
            </div>
            <div className="space-y-1.5">
              <Label>PO Number</Label>
              <Input 
                type="text"
                value={formData.poNumber || ""} 
                onChange={(e) => setFormData({...formData, poNumber: e.target.value})}
                readOnly={true}
                className={true ? "bg-slate-100" : ""}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Indent No</Label>
              <Input 
                type="text"
                value={formData.indentNo || ""} 
                onChange={(e) => setFormData({...formData, indentNo: e.target.value})}
                readOnly={true}
                className={true ? "bg-slate-100" : ""}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Full Kitting ID</Label>
              <Input 
                type="text"
                value={formData.kittingId || ""} 
                onChange={(e) => setFormData({...formData, kittingId: e.target.value})}
                readOnly={true}
                className={true ? "bg-slate-100" : ""}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Kitting Date</Label>
              <Input 
                type="date"
                value={formData.kittingDate || ""} 
                onChange={(e) => setFormData({...formData, kittingDate: e.target.value})}
                readOnly={false}
                className={false ? "bg-slate-100" : ""}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Challan Number</Label>
              <Input 
                type="text"
                value={formData.challanNo || ""} 
                onChange={(e) => setFormData({...formData, challanNo: e.target.value})}
                readOnly={true}
                className={true ? "bg-slate-100" : ""}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Challan Date</Label>
              <Input 
                type="date"
                value={formData.challanDate || ""} 
                onChange={(e) => setFormData({...formData, challanDate: e.target.value})}
                readOnly={false}
                className={false ? "bg-slate-100" : ""}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Farmer / Agency Name</Label>
              <Input 
                type="text"
                value={formData.agencyVendorName || ""} 
                onChange={(e) => setFormData({...formData, agencyVendorName: e.target.value})}
                readOnly={true}
                className={true ? "bg-slate-100" : ""}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Farmer ID / Aadhaar</Label>
              <Input 
                type="text"
                value={formData.farmerId || ""} 
                onChange={(e) => setFormData({...formData, farmerId: e.target.value})}
                readOnly={false}
                className={false ? "bg-slate-100" : ""}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Village / Tehsil</Label>
              <Input 
                type="text"
                value={formData.village || ""} 
                onChange={(e) => setFormData({...formData, village: e.target.value})}
                readOnly={false}
                className={false ? "bg-slate-100" : ""}
              />
            </div>
            <div className="space-y-1.5">
              <Label>No. of Bags</Label>
              <Input 
                type="number"
                value={formData.noOfBags || ""} 
                onChange={(e) => setFormData({...formData, noOfBags: e.target.value})}
                readOnly={true}
                className={true ? "bg-slate-100" : ""}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Gross Weight Kg</Label>
              <Input 
                type="number"
                value={formData.grossWeight || ""} 
                onChange={(e) => setFormData({...formData, grossWeight: e.target.value})}
                readOnly={true}
                className={true ? "bg-slate-100" : ""}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Tare Weight Kg</Label>
              <Input 
                type="number"
                value={formData.tareWeight || ""} 
                onChange={(e) => setFormData({...formData, tareWeight: e.target.value})}
                readOnly={true}
                className={true ? "bg-slate-100" : ""}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Net Weight Kg</Label>
              <Input 
                type="number"
                value={formData.netWeight || ""} 
                onChange={(e) => setFormData({...formData, netWeight: e.target.value})}
                readOnly={true}
                className={true ? "bg-slate-100" : ""}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Rate ₹/Qt</Label>
              <Input 
                type="number"
                value={formData.rate || ""} 
                onChange={(e) => setFormData({...formData, rate: e.target.value})}
                readOnly={true}
                className={true ? "bg-slate-100" : ""}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Total Amount ₹</Label>
              <Input 
                type="number"
                value={formData.totalAmount || ""} 
                onChange={(e) => setFormData({...formData, totalAmount: e.target.value})}
                readOnly={true}
                className={true ? "bg-slate-100" : ""}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Mandi Cess %</Label>
              <Input 
                type="number"
                value={formData.cess || ""} 
                onChange={(e) => setFormData({...formData, cess: e.target.value})}
                readOnly={false}
                className={false ? "bg-slate-100" : ""}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Commission Amount ₹</Label>
              <Input 
                type="number"
                value={formData.commission || ""} 
                onChange={(e) => setFormData({...formData, commission: e.target.value})}
                readOnly={false}
                className={false ? "bg-slate-100" : ""}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Net Payable ₹</Label>
              <Input 
                type="number"
                value={formData.netPayable || ""} 
                onChange={(e) => setFormData({...formData, netPayable: e.target.value})}
                readOnly={true}
                className={true ? "bg-slate-100" : ""}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Advance Already Paid ₹</Label>
              <Input 
                type="number"
                value={formData.advancePaid || ""} 
                onChange={(e) => setFormData({...formData, advancePaid: e.target.value})}
                readOnly={true}
                className={true ? "bg-slate-100" : ""}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Balance Payable ₹</Label>
              <Input 
                type="number"
                value={formData.balancePayable || ""} 
                onChange={(e) => setFormData({...formData, balancePayable: e.target.value})}
                readOnly={true}
                className={true ? "bg-slate-100" : ""}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Balance Payment Mode</Label>
              <Select 
                value={formData.paymentMode || ""} 
                onChange={(e) => setFormData({...formData, paymentMode: e.target.value})}
                disabled={false}
                className={false ? "bg-slate-100" : ""}
              >
                <option value="">Select Balance Payment Mode</option>
                <option value="NEFT">NEFT</option><option value="RTGS">RTGS</option><option value="Cheque">Cheque</option><option value="Cash">Cash</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Balance UTR / Cheque No</Label>
              <Input 
                type="text"
                value={formData.utrNo || ""} 
                onChange={(e) => setFormData({...formData, utrNo: e.target.value})}
                readOnly={false}
                className={false ? "bg-slate-100" : ""}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Paid By</Label>
              <Input 
                type="text"
                value={formData.paidBy || ""} 
                onChange={(e) => setFormData({...formData, paidBy: e.target.value})}
                readOnly={false}
                className={false ? "bg-slate-100" : ""}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Kitting Remarks</Label>
              <Input 
                type="text"
                value={formData.remarks || ""} 
                onChange={(e) => setFormData({...formData, remarks: e.target.value})}
                readOnly={false}
                className={false ? "bg-slate-100" : ""}
              />
            </div>
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
