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

export const PackingList = () => {
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
    if ('PackingList' === 'PackingList') autoFields = { packingListNo: 'PL-00' + Math.floor(Math.random()*100) };
    if ('PackingList' === 'ContainerBooking') autoFields = { bookingRefNo: 'CB-00' + Math.floor(Math.random()*100) };
    if ('PackingList' === 'ContainerLoading') autoFields = { loadingId: 'CL-00' + Math.floor(Math.random()*100) };
    if ('PackingList' === 'ShippingBill') autoFields = { shippingBillNo: 'SB-00' + Math.floor(Math.random()*100) };
    if ('PackingList' === 'BillOfLading') autoFields = { blNumber: 'BL-00' + Math.floor(Math.random()*100) };
    if ('PackingList' === 'CertificateOfOrigin') autoFields = { cooNumber: 'COO-00' + Math.floor(Math.random()*100) };
    if ('PackingList' === 'InsuranceAndInvoice') autoFields = { exportInvoiceNo: 'EI-00' + Math.floor(Math.random()*100) };
    if ('PackingList' === 'ExportPayment') autoFields = { paymentId: 'EP-00' + Math.floor(Math.random()*100) };
    
    const readOnlyFields = ["contractNo","packingListNo","netWeight"];
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
          Create Packing List
        </Button>
      </div>
    )
  };

  const pendingCols = [{"header":"Contract No","accessor":"contractNo"},{"header":"Contract Date","accessor":"contractDate"},{"header":"Buyer Name","accessor":"buyerName"},{"header":"Buyer Country","accessor":"buyerCountry"},{"header":"Rice Grade","accessor":"riceGrade"},{"header":"Quantity (MT)","accessor":"quantity"},{"header":"Incoterms","accessor":"incoterms"},{"header":"Port of Loading","accessor":"portOfLoading"},{"header":"Port of Destination","accessor":"portOfDestination"},{"header":"Shipment Date","accessor":"shipmentDate"}];
  const historyCols = [{"header":"Packing List No","accessor":"packingListNo"},{"header":"Contract No","accessor":"contractNo"},{"header":"Date","accessor":"plDate"},{"header":"Buyer Name","accessor":"buyerName"},{"header":"No. of Bags","accessor":"noOfBags"},{"header":"Net Weight (MT)","accessor":"netWeight"},{"header":"Gross Weight (MT)","accessor":"grossWeight"},{"header":"Lot Numbers","accessor":"lotNumbers"},{"header":"Batch Numbers","accessor":"batchNumbers"},{"header":"Prepared By","accessor":"preparedBy"}];

  const columns = activeTab === 'pending' ? [actionColumn, ...pendingCols] : historyCols;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Stage 2 - Packing List</h2>
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
        title="Packing List Details"
      >
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            
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
              <Label>Packing List No</Label>
              <Input 
                type="text"
                value={formData.packingListNo || ''} 
                onChange={(e) => setFormData({...formData, packingListNo: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Date</Label>
              <Input 
                type="date"
                value={formData.plDate || ''} 
                onChange={(e) => setFormData({...formData, plDate: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>No. of Bags</Label>
              <Input 
                type="number"
                value={formData.noOfBags || ''} 
                onChange={(e) => setFormData({...formData, noOfBags: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Bag Size</Label>
              <Input 
                type="text"
                value={formData.bagSize || ''} 
                onChange={(e) => setFormData({...formData, bagSize: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Net Weight per Bag (Kg)</Label>
              <Input 
                type="number"
                value={formData.netWeightPerBag || ''} 
                onChange={(e) => setFormData({...formData, netWeightPerBag: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Total Net Weight (MT)</Label>
              <Input 
                type="number"
                value={formData.netWeight || ''} 
                onChange={(e) => setFormData({...formData, netWeight: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
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
              <Label>No. of Pallets/Bundles</Label>
              <Input 
                type="number"
                value={formData.noOfPallets || ''} 
                onChange={(e) => setFormData({...formData, noOfPallets: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Lot Numbers</Label>
              <Input 
                type="text"
                value={formData.lotNumbers || ''} 
                onChange={(e) => setFormData({...formData, lotNumbers: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Batch Numbers</Label>
              <Input 
                type="text"
                value={formData.batchNumbers || ''} 
                onChange={(e) => setFormData({...formData, batchNumbers: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Marks & Numbers</Label>
              <Input 
                type="text"
                value={formData.marksAndNumbers || ''} 
                onChange={(e) => setFormData({...formData, marksAndNumbers: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Country of Origin</Label>
              <Input 
                type="text"
                value={formData.countryOfOrigin || ''} 
                onChange={(e) => setFormData({...formData, countryOfOrigin: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>HS Code</Label>
              <Input 
                type="text"
                value={formData.hsCode || ''} 
                onChange={(e) => setFormData({...formData, hsCode: e.target.value})}
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
              <Label>Prepared By</Label>
              <Input 
                type="text"
                value={formData.preparedBy || ''} 
                onChange={(e) => setFormData({...formData, preparedBy: e.target.value})}
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
