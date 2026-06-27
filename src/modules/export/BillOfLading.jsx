import React, { useState, useEffect } from 'react';
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
      contractNo: `EC-2026-${(i + 1).toString().padStart(4, '0')}`,
      contractDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      buyerName: `Global Buyer ${i+1}`,
      buyerCountry: ['UAE', 'UK', 'USA', 'Saudi Arabia', 'Singapore'][Math.floor(Math.random() * 5)],
      buyerAddress: 'International Ave 101',
      buyerContactPerson: 'Mr. Smith',
      buyerEmail: `contact@global${i+1}.com`,
      buyerPhone: `+1 555 010${i}`,
      incoterms: ['FOB', 'CIF', 'CNF', 'EXW'][Math.floor(Math.random() * 4)],
      riceGrade: ['Premium Basmati', '1121 Sella', 'IR64'][Math.floor(Math.random() * 3)],
      quantity: qty,
      price: price,
      totalContractValue: qty * price,
      portOfLoading: 'Mundra Port',
      portOfDestination: 'Jebel Ali',
      shipmentDate: `2026-07-${(i % 28 + 1).toString().padStart(2, '0')}`,
      paymentTerms: ['LC', 'TT', 'DA', 'CAD'][Math.floor(Math.random() * 4)],
      createdBy: 'Export Manager',

      packingListNo: `PL-${(i + 1).toString().padStart(4, '0')}`,
      plDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      noOfBags: qty * 40,
      totalNetWeight: qty,
      totalGrossWeight: qty + 0.5,
      lotNumbers: `LT-${i+1}`,
      batchNumbers: `BT-${i+1}`,
      preparedBy: 'Warehouse Exec',

      bookingRefNo: `CB-${(i + 1).toString().padStart(4, '0')}`,
      shippingLine: 'Maersk',
      containerType: '40ft',
      noOfContainers: Math.ceil(qty / 25),
      etd: `2026-07-${(i % 28 + 1).toString().padStart(2, '0')}`,
      eta: `2026-08-${(i % 28 + 1).toString().padStart(2, '0')}`,
      totalFreight: 1500,
      doReceived: 'Y',
      bookingDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      bookedBy: 'Logistics Head',

      loadingId: `CL-${(i + 1).toString().padStart(4, '0')}`,
      containerNumber: `MSKU${(i+1).toString().padStart(6, '0')}`,
      sealNumber: `SL${(i+1).toString().padStart(5, '0')}`,
      tareWeight: 3.5,
      netWeightLoaded: qty,
      bagsLoaded: qty * 40,
      loadingDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}T10:00`,
      surveyorName: 'Surveyor Co',
      cfsName: 'CFS Mundra',
      fumigationDone: 'Y',

      vesselName: 'MSC Anna',
      imoNo: '9845312',
      voyageNo: 'V-045W',
      portAgent: 'Ocean Agents Ltd',
      vgmSubmitted: 'Y',
      siSubmitted: 'Y',
      siDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      confirmedDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,

      shippingBillNo: `SB-${(i + 1).toString().padStart(4, '0')}`,
      shippingBillDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      customsHouse: 'INMUN1',
      iecCode: '0384758392',
      fobValue: qty * price,
      drawbackClaim: 'Y',
      drawbackAmount: 5000,
      rodtepAmount: 2000,
      leoDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      chaName: 'CHA Services',
      filedDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,

      blNumber: `BL-${(i + 1).toString().padStart(4, '0')}`,
      blDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      blType: 'Original',
      shipperName: 'Rice Mill Ltd',
      consigneeName: `Global Buyer ${i+1}`,
      notifyParty1: 'Same as Consignee',
      noOfPackages: qty * 40,
      freightTerms: 'Prepaid',
      originalBlCopies: 3,

      cooNo: `COO-${(i + 1).toString().padStart(4, '0')}`,
      issuingAuthority: 'APEDA',
      certificateType: 'Non-Preferential',
      countryOfOrigin: 'India',
      issueDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      validityDate: `2026-12-${(i % 28 + 1).toString().padStart(2, '0')}`,
      issuedBy: 'Auth Officer',

      exportInvoiceNo: `EI-${(i + 1).toString().padStart(4, '0')}`,
      invoiceDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      invoiceAmount: qty * price,
      inrEquivalent: qty * price * 83.5,
      insurancePolicyNo: `POL-${(i+1).toString().padStart(5, '0')}`,
      sumInsured: qty * price * 1.1,
      portCharges: 15000,
      customClearance: 5000,
      bankRefNo: `BRN-${(i+1).toString().padStart(5, '0')}`,
      swiftCode: 'SBININBB',
      lcNo: `LC-${(i+1).toString().padStart(5, '0')}`,
      docSubmissionDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      submittedBy: 'Finance Head',

      outstandingInitial: qty * price,

      paymentId: `EP-${(i + 1).toString().padStart(4, '0')}`,
      receiptDate: `2026-07-${(i % 28 + 1).toString().padStart(2, '0')}`,
      amountReceived: qty * price,
      forexRate: 83.5,
      fircNo: `FIRC-${(i+1).toString().padStart(5, '0')}`,
      fircDate: `2026-07-${(i % 28 + 1).toString().padStart(2, '0')}`,
      outstanding: 0,
      paymentMode: 'TT',
      paymentStatus: 'Full',
      receivedBy: 'Finance Head',

      status: 'Completed'
    };
  });
};

export const BillOfLading = () => {
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
    
    
    
    
    autoFields = { blNumber: 'BL-' + Math.floor(Math.random()*10000) };
    
    
    
    
    const readOnlyFields = ["shippingBillNo","contractNo","blNumber","portOfLoading","portOfDestination","vesselName","voyageNo"];
    const initialFormData = {};
    readOnlyFields.forEach(field => {
      initialFormData[field] = item[field];
    });
    
    setFormData({ ...initialFormData, ...autoFields });
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (isModalOpen && formData) {
      
      
      
      
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
          Create BL
        </Button>
      </div>
    )
  };

  const pendingCols = [{"header":"Shipping Bill No","accessor":"shippingBillNo"},{"header":"Loading ID","accessor":"loadingId"},{"header":"Contract No","accessor":"contractNo"},{"header":"Vessel Name","accessor":"vesselName"},{"header":"Voyage No","accessor":"voyageNo"},{"header":"Container Number","accessor":"containerNumber"},{"header":"LEO Date","accessor":"leoDate"},{"header":"FOB Value ($)","accessor":"fobValue"}];
  const historyCols = [{"header":"BL Number","accessor":"blNumber"},{"header":"Shipping Bill No","accessor":"shippingBillNo"},{"header":"Contract No","accessor":"contractNo"},{"header":"BL Date","accessor":"blDate"},{"header":"BL Type","accessor":"blType"},{"header":"Shipper","accessor":"shipperName"},{"header":"Consignee","accessor":"consigneeName"},{"header":"Notify Party","accessor":"notifyParty1"},{"header":"Port of Loading","accessor":"portOfLoading"},{"header":"Port of Discharge","accessor":"portOfDestination"},{"header":"No. of Packages","accessor":"noOfPackages"},{"header":"Gross Weight (MT)","accessor":"totalGrossWeight"},{"header":"Freight Terms","accessor":"freightTerms"},{"header":"Original BL Copies","accessor":"originalBlCopies"}];

  const columns = activeTab === 'pending' ? [actionColumn, ...pendingCols] : historyCols;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Stage 7 - Bill of Lading</h2>
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
        title="Bill of Lading Details"
      >
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            
            <div className="space-y-1.5">
              <Label>Shipping Bill No</Label>
              <Input 
                type="text"
                value={formData.shippingBillNo || ''} 
                onChange={(e) => setFormData({...formData, shippingBillNo: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Contract No</Label>
              <Input 
                type="text"
                value={formData.contractNo || ''} 
                onChange={(e) => setFormData({...formData, contractNo: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>BL Number</Label>
              <Input 
                type="text"
                value={formData.blNumber || ''} 
                onChange={(e) => setFormData({...formData, blNumber: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>BL Date</Label>
              <Input 
                type="date"
                value={formData.blDate || ''} 
                onChange={(e) => setFormData({...formData, blDate: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>BL Type</Label>
              <Select 
                value={formData.blType || ''} 
                onChange={(e) => setFormData({...formData, blType: e.target.value})}
                disabled={false}
                className={false ? 'bg-slate-100' : ''}
              >
                <option value="">Select BL Type</option>
                <option value="Original">Original</option><option value="Telex Release">Telex Release</option><option value="Sea Waybill">Sea Waybill</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Shipper Name & Address</Label>
              <Input 
                type="text"
                value={formData.shipperName || ''} 
                onChange={(e) => setFormData({...formData, shipperName: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Consignee Name & Address</Label>
              <Input 
                type="text"
                value={formData.consigneeName || ''} 
                onChange={(e) => setFormData({...formData, consigneeName: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Notify Party 1</Label>
              <Input 
                type="text"
                value={formData.notifyParty1 || ''} 
                onChange={(e) => setFormData({...formData, notifyParty1: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Notify Party 2</Label>
              <Input 
                type="text"
                value={formData.notifyParty2 || ''} 
                onChange={(e) => setFormData({...formData, notifyParty2: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Port of Loading</Label>
              <Input 
                type="text"
                value={formData.portOfLoading || ''} 
                onChange={(e) => setFormData({...formData, portOfLoading: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Port of Discharge</Label>
              <Input 
                type="text"
                value={formData.portOfDestination || ''} 
                onChange={(e) => setFormData({...formData, portOfDestination: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Place of Delivery</Label>
              <Input 
                type="text"
                value={formData.placeOfDelivery || ''} 
                onChange={(e) => setFormData({...formData, placeOfDelivery: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Vessel Name</Label>
              <Input 
                type="text"
                value={formData.vesselName || ''} 
                onChange={(e) => setFormData({...formData, vesselName: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Voyage Number</Label>
              <Input 
                type="text"
                value={formData.voyageNo || ''} 
                onChange={(e) => setFormData({...formData, voyageNo: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Description of Goods</Label>
              <Input 
                type="text"
                value={formData.descriptionOfGoods || ''} 
                onChange={(e) => setFormData({...formData, descriptionOfGoods: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>No. of Packages</Label>
              <Input 
                type="number"
                value={formData.noOfPackages || ''} 
                onChange={(e) => setFormData({...formData, noOfPackages: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Total Gross Weight (MT)</Label>
              <Input 
                type="number"
                value={formData.totalGrossWeight || ''} 
                onChange={(e) => setFormData({...formData, totalGrossWeight: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Measurement (CBM)</Label>
              <Input 
                type="number"
                value={formData.measurementCBM || ''} 
                onChange={(e) => setFormData({...formData, measurementCBM: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Freight Terms</Label>
              <Select 
                value={formData.freightTerms || ''} 
                onChange={(e) => setFormData({...formData, freightTerms: e.target.value})}
                disabled={false}
                className={false ? 'bg-slate-100' : ''}
              >
                <option value="">Select Freight Terms</option>
                <option value="Prepaid">Prepaid</option><option value="Collect">Collect</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Freight Amount ($)</Label>
              <Input 
                type="number"
                value={formData.freightAmount || ''} 
                onChange={(e) => setFormData({...formData, freightAmount: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>No. of Original BL Copies</Label>
              <Input 
                type="number"
                value={formData.originalBlCopies || ''} 
                onChange={(e) => setFormData({...formData, originalBlCopies: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Special Instructions</Label>
              <Input 
                type="text"
                value={formData.specialInstructions || ''} 
                onChange={(e) => setFormData({...formData, specialInstructions: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
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
