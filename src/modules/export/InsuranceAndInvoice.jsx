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

export const InsuranceAndInvoice = () => {
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
    if ('InsuranceAndInvoice' === 'PackingList') autoFields = { packingListNo: 'PL-00' + Math.floor(Math.random()*100) };
    if ('InsuranceAndInvoice' === 'ContainerBooking') autoFields = { bookingRefNo: 'CB-00' + Math.floor(Math.random()*100) };
    if ('InsuranceAndInvoice' === 'ContainerLoading') autoFields = { loadingId: 'CL-00' + Math.floor(Math.random()*100) };
    if ('InsuranceAndInvoice' === 'ShippingBill') autoFields = { shippingBillNo: 'SB-00' + Math.floor(Math.random()*100) };
    if ('InsuranceAndInvoice' === 'BillOfLading') autoFields = { blNumber: 'BL-00' + Math.floor(Math.random()*100) };
    if ('InsuranceAndInvoice' === 'CertificateOfOrigin') autoFields = { cooNumber: 'COO-00' + Math.floor(Math.random()*100) };
    if ('InsuranceAndInvoice' === 'InsuranceAndInvoice') autoFields = { exportInvoiceNo: 'EI-00' + Math.floor(Math.random()*100) };
    if ('InsuranceAndInvoice' === 'ExportPayment') autoFields = { paymentId: 'EP-00' + Math.floor(Math.random()*100) };
    
    const readOnlyFields = ["cooNumber","blNumber","contractNo","exportInvoiceNo","inrEquivalent"];
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
          Update Documentation
        </Button>
      </div>
    )
  };

  const pendingCols = [{"header":"COO No","accessor":"cooNumber"},{"header":"BL Number","accessor":"blNumber"},{"header":"Contract No","accessor":"contractNo"},{"header":"Buyer Name","accessor":"buyerName"},{"header":"Buyer Country","accessor":"buyerCountry"},{"header":"Quantity (MT)","accessor":"quantity"},{"header":"FOB Value ($)","accessor":"fobValue"},{"header":"Issue Date","accessor":"issueDate"}];
  const historyCols = [{"header":"Export Invoice No","accessor":"exportInvoiceNo"},{"header":"COO No","accessor":"cooNumber"},{"header":"BL Number","accessor":"blNumber"},{"header":"Contract No","accessor":"contractNo"},{"header":"Invoice Date","accessor":"invoiceDate"},{"header":"Invoice Amount ($)","accessor":"invoiceAmount"},{"header":"INR Equivalent (₹)","accessor":"inrEquivalent"},{"header":"Insurance Policy No","accessor":"insurancePolicyNo"},{"header":"Sum Insured ($)","accessor":"sumInsured"},{"header":"Port Charges (₹)","accessor":"portCharges"},{"header":"Custom Clearance (₹)","accessor":"customClearance"},{"header":"Bank Ref No","accessor":"bankRefNo"},{"header":"SWIFT Code","accessor":"swiftCode"},{"header":"LC No","accessor":"lcNo"},{"header":"Document Submission Date","accessor":"docSubmissionDate"},{"header":"Submitted By","accessor":"submittedBy"}];

  const columns = activeTab === 'pending' ? [actionColumn, ...pendingCols] : historyCols;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Stage 9 - Insurance, Port, Invoice, Bank Advice</h2>
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
        title="Documentation & Bank Details"
      >
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            
            <div className="space-y-1.5">
              <Label>COO No</Label>
              <Input 
                type="text"
                value={formData.cooNumber || ''} 
                onChange={(e) => setFormData({...formData, cooNumber: e.target.value})}
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
              <Label>Export Invoice No</Label>
              <Input 
                type="text"
                value={formData.exportInvoiceNo || ''} 
                onChange={(e) => setFormData({...formData, exportInvoiceNo: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Invoice Date</Label>
              <Input 
                type="date"
                value={formData.invoiceDate || ''} 
                onChange={(e) => setFormData({...formData, invoiceDate: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Invoice Currency</Label>
              <Input 
                type="text"
                value={formData.invoiceCurrency || ''} 
                onChange={(e) => setFormData({...formData, invoiceCurrency: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Invoice Amount ($)</Label>
              <Input 
                type="number"
                value={formData.invoiceAmount || ''} 
                onChange={(e) => setFormData({...formData, invoiceAmount: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Conversion Rate (₹/$)</Label>
              <Input 
                type="number"
                value={formData.conversionRate || ''} 
                onChange={(e) => setFormData({...formData, conversionRate: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>INR Equivalent (₹)</Label>
              <Input 
                type="number"
                value={formData.inrEquivalent || ''} 
                onChange={(e) => setFormData({...formData, inrEquivalent: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Insurance Policy No</Label>
              <Input 
                type="text"
                value={formData.insurancePolicyNo || ''} 
                onChange={(e) => setFormData({...formData, insurancePolicyNo: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Insurance Company</Label>
              <Input 
                type="text"
                value={formData.insuranceCompany || ''} 
                onChange={(e) => setFormData({...formData, insuranceCompany: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Insurance Type</Label>
              <Select 
                value={formData.insuranceType || ''} 
                onChange={(e) => setFormData({...formData, insuranceType: e.target.value})}
                disabled={false}
                className={false ? 'bg-slate-100' : ''}
              >
                <option value="">Select Insurance Type</option>
                <option value="Marine">Marine</option><option value="All Risk">All Risk</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Sum Insured ($)</Label>
              <Input 
                type="number"
                value={formData.sumInsured || ''} 
                onChange={(e) => setFormData({...formData, sumInsured: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Insurance Premium (₹)</Label>
              <Input 
                type="number"
                value={formData.insurancePremium || ''} 
                onChange={(e) => setFormData({...formData, insurancePremium: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Port Name</Label>
              <Input 
                type="text"
                value={formData.portName || ''} 
                onChange={(e) => setFormData({...formData, portName: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Port Charges (₹)</Label>
              <Input 
                type="number"
                value={formData.portCharges || ''} 
                onChange={(e) => setFormData({...formData, portCharges: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Wharfage Charges (₹)</Label>
              <Input 
                type="number"
                value={formData.wharfageCharges || ''} 
                onChange={(e) => setFormData({...formData, wharfageCharges: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Custom Clearance Charges (₹)</Label>
              <Input 
                type="number"
                value={formData.customClearance || ''} 
                onChange={(e) => setFormData({...formData, customClearance: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Bank Name</Label>
              <Input 
                type="text"
                value={formData.bankName || ''} 
                onChange={(e) => setFormData({...formData, bankName: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Bank Branch</Label>
              <Input 
                type="text"
                value={formData.bankBranch || ''} 
                onChange={(e) => setFormData({...formData, bankBranch: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Bank Ref No</Label>
              <Input 
                type="text"
                value={formData.bankRefNo || ''} 
                onChange={(e) => setFormData({...formData, bankRefNo: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>SWIFT Code/IBAN</Label>
              <Input 
                type="text"
                value={formData.swiftCode || ''} 
                onChange={(e) => setFormData({...formData, swiftCode: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>LC No (if applicable)</Label>
              <Input 
                type="text"
                value={formData.lcNo || ''} 
                onChange={(e) => setFormData({...formData, lcNo: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>LC Expiry Date</Label>
              <Input 
                type="date"
                value={formData.lcExpiryDate || ''} 
                onChange={(e) => setFormData({...formData, lcExpiryDate: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Documents Submitted</Label>
              <Input 
                type="text"
                value={formData.documentsSubmitted || ''} 
                onChange={(e) => setFormData({...formData, documentsSubmitted: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Document Submission Date</Label>
              <Input 
                type="date"
                value={formData.docSubmissionDate || ''} 
                onChange={(e) => setFormData({...formData, docSubmissionDate: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Submitted By</Label>
              <Input 
                type="text"
                value={formData.submittedBy || ''} 
                onChange={(e) => setFormData({...formData, submittedBy: e.target.value})}
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
