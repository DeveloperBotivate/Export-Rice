import React, { useState, useEffect } from 'react';
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
    return {
      id: i + 1,
      contractNo: `EC-00${(i + 1).toString().padStart(2, '0')}`,
      contractDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      buyerName: `Buyer ${i+1}`,
      buyerCountry: ['USA', 'UK', 'UAE', 'Singapore'][Math.floor(Math.random() * 4)],
      riceGrade: ['Basmati', 'Non-Basmati'][Math.floor(Math.random() * 2)],
      quantity: Math.floor(Math.random() * 50) + 10,
      incoterms: ['FOB', 'CIF', 'CNF', 'EXW'][Math.floor(Math.random() * 4)],
      portOfLoading: 'Mundra',
      portOfDestination: 'Jebel Ali',
      shipmentDate: `2026-07-${(i % 28 + 1).toString().padStart(2, '0')}`,
      paymentTerms: 'LC',
      
      packingListNo: `PL-00${(i + 1).toString().padStart(2, '0')}`,
      plDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      noOfBags: 1000,
      netWeight: 25,
      grossWeight: 25.5,
      lotNumbers: 'LOT123',
      batchNumbers: 'B123',
      preparedBy: 'Packing Team',
      
      bookingRefNo: `CB-00${(i + 1).toString().padStart(2, '0')}`,
      shippingLine: 'Maersk',
      containerType: '20ft',
      noOfContainers: 2,
      etd: `2026-07-${(i % 28 + 1).toString().padStart(2, '0')}`,
      eta: `2026-07-${(i % 28 + 15).toString().padStart(2, '0')}`,
      totalFreight: 2000,
      doReceived: 'Y',
      bookingDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      bookedBy: 'Logistics',
      
      loadingId: `CL-00${(i + 1).toString().padStart(2, '0')}`,
      containerNumber: 'MSKU1234567',
      sealNumber: 'SEAL123',
      tareWeight: 2.2,
      netWeightLoaded: 25,
      bagsLoaded: 1000,
      loadingDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      loadingSurveyor: 'SGS',
      cfsName: 'Mundra CFS',
      fumigationDone: 'Y',
      
      shippingLineName: 'Maersk',
      vesselName: 'Maersk Sealand',
      imoNumber: '9123456',
      voyageNumber: 'V001',
      portAgentName: 'Agent X',
      vgmSubmitted: 'Y',
      siSubmitted: 'Y',
      siDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      confirmedDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      
      shippingBillNo: `SB-00${(i + 1).toString().padStart(2, '0')}`,
      shippingBillDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      customsHouse: 'Mundra Port',
      iecCode: 'IEC123456',
      fobValue: 50000,
      drawbackClaim: 'Y',
      drawbackAmount: 10000,
      rodtepAmount: 5000,
      leoDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      chaName: 'CHA Partners',
      filedDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      
      blNumber: `BL-00${(i + 1).toString().padStart(2, '0')}`,
      blDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      blType: 'Original',
      shipper: 'Rice Mill Export',
      consignee: `Buyer ${i+1}`,
      notifyParty: 'Bank XYZ',
      portOfDischarge: 'Jebel Ali',
      noOfPackages: 1000,
      freightTerms: 'Prepaid',
      originalBlCopies: 3,
      
      cooNumber: `COO-00${(i + 1).toString().padStart(2, '0')}`,
      issuingAuthority: 'APEDA',
      certificateType: 'Non-Preferential',
      countryOfOrigin: 'India',
      issueDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      validityDate: `2026-12-${(i % 28 + 1).toString().padStart(2, '0')}`,
      issuedBy: 'Authority Off',
      
      exportInvoiceNo: `EI-00${(i + 1).toString().padStart(2, '0')}`,
      invoiceDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      invoiceAmount: 50000,
      inrEquivalent: 4100000,
      insurancePolicyNo: 'POL123456',
      sumInsured: 55000,
      portCharges: 15000,
      customClearance: 10000,
      bankRefNo: 'BRN123',
      swiftCode: 'SWIFT123',
      lcNo: 'LC123456',
      docSubmissionDate: `2026-07-${(i % 28 + 1).toString().padStart(2, '0')}`,
      submittedBy: 'Finance Dept',
      
      paymentId: `EP-00${(i + 1).toString().padStart(2, '0')}`,
      receiptDate: `2026-07-${(i % 28 + 1).toString().padStart(2, '0')}`,
      amountReceived: 50000,
      forexRate: 82.5,
      fircNo: 'FIRC123',
      fircDate: `2026-07-${(i % 28 + 1).toString().padStart(2, '0')}`,
      outstanding: 0,
      paymentMode: 'LC',
      paymentStatus: 'Full',
      receivedBy: 'Finance',
      
      status: 'Completed'
    };
  });
};

export const ShippingBill = () => {
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
    if ('ShippingBill' === 'PackingList') autoFields = { packingListNo: 'PL-00' + Math.floor(Math.random()*100) };
    if ('ShippingBill' === 'ContainerBooking') autoFields = { bookingRefNo: 'CB-00' + Math.floor(Math.random()*100) };
    if ('ShippingBill' === 'ContainerLoading') autoFields = { loadingId: 'CL-00' + Math.floor(Math.random()*100) };
    if ('ShippingBill' === 'ShippingBill') autoFields = { shippingBillNo: 'SB-00' + Math.floor(Math.random()*100) };
    if ('ShippingBill' === 'BillOfLading') autoFields = { blNumber: 'BL-00' + Math.floor(Math.random()*100) };
    if ('ShippingBill' === 'CertificateOfOrigin') autoFields = { cooNumber: 'COO-00' + Math.floor(Math.random()*100) };
    if ('ShippingBill' === 'InsuranceAndInvoice') autoFields = { exportInvoiceNo: 'EI-00' + Math.floor(Math.random()*100) };
    if ('ShippingBill' === 'ExportPayment') autoFields = { paymentId: 'EP-00' + Math.floor(Math.random()*100) };
    
    const readOnlyFields = ["loadingId","contractNo","vesselName","shippingBillNo","quantity"];
    const initialFormData = {};
    readOnlyFields.forEach(field => {
      initialFormData[field] = item[field];
    });
    
    setFormData({ ...initialFormData, ...autoFields });
    setIsModalOpen(true);
  };

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
          Create Shipping Bill
        </Button>
      </div>
    )
  };

  const pendingCols = [{"header":"Loading ID","accessor":"loadingId"},{"header":"Contract No","accessor":"contractNo"},{"header":"Shipping Line","accessor":"shippingLineName"},{"header":"Vessel Name","accessor":"vesselName"},{"header":"Voyage No","accessor":"voyageNumber"},{"header":"Container Number","accessor":"containerNumber"},{"header":"ETD","accessor":"etd"},{"header":"ETA","accessor":"eta"},{"header":"VGM Submitted","accessor":"vgmSubmitted"}];
  const historyCols = [{"header":"Shipping Bill No","accessor":"shippingBillNo"},{"header":"Loading ID","accessor":"loadingId"},{"header":"Contract No","accessor":"contractNo"},{"header":"Shipping Bill Date","accessor":"shippingBillDate"},{"header":"Customs House","accessor":"customsHouse"},{"header":"IEC Code","accessor":"iecCode"},{"header":"FOB Value ($)","accessor":"fobValue"},{"header":"Drawback Claim","accessor":"drawbackClaim"},{"header":"Drawback Amount (₹)","accessor":"drawbackAmount"},{"header":"RoDTEP Amount (₹)","accessor":"rodtepAmount"},{"header":"LEO Date","accessor":"leoDate"},{"header":"CHA Name","accessor":"chaName"},{"header":"Filed Date","accessor":"filedDate"}];

  const columns = activeTab === 'pending' ? [actionColumn, ...pendingCols] : historyCols;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Stage 6 - Shipping Bill</h2>
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
        title="Shipping Bill Details"
      >
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            
            <div className="space-y-1.5">
              <Label>Loading ID</Label>
              <Input 
                type="text"
                value={formData.loadingId || ''} 
                onChange={(e) => setFormData({...formData, loadingId: e.target.value})}
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
              <Label>Shipping Bill Number</Label>
              <Input 
                type="text"
                value={formData.shippingBillNo || ''} 
                onChange={(e) => setFormData({...formData, shippingBillNo: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Shipping Bill Date</Label>
              <Input 
                type="date"
                value={formData.shippingBillDate || ''} 
                onChange={(e) => setFormData({...formData, shippingBillDate: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Customs House Location</Label>
              <Input 
                type="text"
                value={formData.customsHouse || ''} 
                onChange={(e) => setFormData({...formData, customsHouse: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Exporter Name</Label>
              <Input 
                type="text"
                value={formData.exporterName || ''} 
                onChange={(e) => setFormData({...formData, exporterName: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>IEC Code</Label>
              <Input 
                type="text"
                value={formData.iecCode || ''} 
                onChange={(e) => setFormData({...formData, iecCode: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>GSTIN</Label>
              <Input 
                type="text"
                value={formData.gstin || ''} 
                onChange={(e) => setFormData({...formData, gstin: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>HSN Code</Label>
              <Input 
                type="text"
                value={formData.hsnCode || ''} 
                onChange={(e) => setFormData({...formData, hsnCode: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
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
              <Label>Quantity (MT)</Label>
              <Input 
                type="number"
                value={formData.quantity || ''} 
                onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>FOB Value ($)</Label>
              <Input 
                type="number"
                value={formData.fobValue || ''} 
                onChange={(e) => setFormData({...formData, fobValue: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Drawback Claim (Y/N)</Label>
              <Select 
                value={formData.drawbackClaim || ''} 
                onChange={(e) => setFormData({...formData, drawbackClaim: e.target.value})}
                disabled={false}
                className={false ? 'bg-slate-100' : ''}
              >
                <option value="">Select Drawback Claim (Y/N)</option>
                <option value="Y">Y</option><option value="N">N</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Drawback Amount (₹)</Label>
              <Input 
                type="number"
                value={formData.drawbackAmount || ''} 
                onChange={(e) => setFormData({...formData, drawbackAmount: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>RoDTEP/MEIS Claim (Y/N)</Label>
              <Select 
                value={formData.rodtepClaim || ''} 
                onChange={(e) => setFormData({...formData, rodtepClaim: e.target.value})}
                disabled={false}
                className={false ? 'bg-slate-100' : ''}
              >
                <option value="">Select RoDTEP/MEIS Claim (Y/N)</option>
                <option value="Y">Y</option><option value="N">N</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>RoDTEP Claim Amount (₹)</Label>
              <Input 
                type="number"
                value={formData.rodtepAmount || ''} 
                onChange={(e) => setFormData({...formData, rodtepAmount: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>CHA Name</Label>
              <Input 
                type="text"
                value={formData.chaName || ''} 
                onChange={(e) => setFormData({...formData, chaName: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>CHA License No</Label>
              <Input 
                type="text"
                value={formData.chaLicenseNo || ''} 
                onChange={(e) => setFormData({...formData, chaLicenseNo: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Duty Paid (₹)</Label>
              <Input 
                type="number"
                value={formData.dutyPaid || ''} 
                onChange={(e) => setFormData({...formData, dutyPaid: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Let Export Order (LEO) Date</Label>
              <Input 
                type="date"
                value={formData.leoDate || ''} 
                onChange={(e) => setFormData({...formData, leoDate: e.target.value})}
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
