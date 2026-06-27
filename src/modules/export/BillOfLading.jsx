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
    if ('BillOfLading' === 'PackingList') autoFields = { packingListNo: 'PL-00' + Math.floor(Math.random()*100) };
    if ('BillOfLading' === 'ContainerBooking') autoFields = { bookingRefNo: 'CB-00' + Math.floor(Math.random()*100) };
    if ('BillOfLading' === 'ContainerLoading') autoFields = { loadingId: 'CL-00' + Math.floor(Math.random()*100) };
    if ('BillOfLading' === 'ShippingBill') autoFields = { shippingBillNo: 'SB-00' + Math.floor(Math.random()*100) };
    if ('BillOfLading' === 'BillOfLading') autoFields = { blNumber: 'BL-00' + Math.floor(Math.random()*100) };
    if ('BillOfLading' === 'CertificateOfOrigin') autoFields = { cooNumber: 'COO-00' + Math.floor(Math.random()*100) };
    if ('BillOfLading' === 'InsuranceAndInvoice') autoFields = { exportInvoiceNo: 'EI-00' + Math.floor(Math.random()*100) };
    if ('BillOfLading' === 'ExportPayment') autoFields = { paymentId: 'EP-00' + Math.floor(Math.random()*100) };
    
    const readOnlyFields = ["shippingBillNo","contractNo","blNumber","portOfLoading","portOfDischarge","vesselName","voyageNumber"];
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
          Create BL
        </Button>
      </div>
    )
  };

  const pendingCols = [{"header":"Shipping Bill No","accessor":"shippingBillNo"},{"header":"Loading ID","accessor":"loadingId"},{"header":"Contract No","accessor":"contractNo"},{"header":"Vessel Name","accessor":"vesselName"},{"header":"Voyage No","accessor":"voyageNumber"},{"header":"Container Number","accessor":"containerNumber"},{"header":"LEO Date","accessor":"leoDate"},{"header":"FOB Value ($)","accessor":"fobValue"}];
  const historyCols = [{"header":"BL Number","accessor":"blNumber"},{"header":"Shipping Bill No","accessor":"shippingBillNo"},{"header":"Contract No","accessor":"contractNo"},{"header":"BL Date","accessor":"blDate"},{"header":"BL Type","accessor":"blType"},{"header":"Shipper","accessor":"shipper"},{"header":"Consignee","accessor":"consignee"},{"header":"Notify Party","accessor":"notifyParty"},{"header":"Port of Loading","accessor":"portOfLoading"},{"header":"Port of Discharge","accessor":"portOfDischarge"},{"header":"No. of Packages","accessor":"noOfPackages"},{"header":"Gross Weight (MT)","accessor":"grossWeight"},{"header":"Freight Terms","accessor":"freightTerms"},{"header":"Original BL Copies","accessor":"originalBlCopies"}];

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
                value={formData.shipper || ''} 
                onChange={(e) => setFormData({...formData, shipper: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Consignee Name & Address</Label>
              <Input 
                type="text"
                value={formData.consignee || ''} 
                onChange={(e) => setFormData({...formData, consignee: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Notify Party 1</Label>
              <Input 
                type="text"
                value={formData.notifyParty || ''} 
                onChange={(e) => setFormData({...formData, notifyParty: e.target.value})}
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
                value={formData.portOfDischarge || ''} 
                onChange={(e) => setFormData({...formData, portOfDischarge: e.target.value})}
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
                value={formData.voyageNumber || ''} 
                onChange={(e) => setFormData({...formData, voyageNumber: e.target.value})}
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
                value={formData.grossWeight || ''} 
                onChange={(e) => setFormData({...formData, grossWeight: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Measurement (CBM)</Label>
              <Input 
                type="number"
                value={formData.measurement || ''} 
                onChange={(e) => setFormData({...formData, measurement: e.target.value})}
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
