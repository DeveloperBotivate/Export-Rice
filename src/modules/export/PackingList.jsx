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
    autoFields = { packingListNo: 'PL-' + Math.floor(Math.random()*10000) };
    
    
    
    
    
    
    
    
    const readOnlyFields = ["contractNo","packingListNo","totalNetWeight"];
    const initialFormData = {};
    readOnlyFields.forEach(field => {
      initialFormData[field] = item[field];
    });
    
    setFormData({ ...initialFormData, ...autoFields });
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (isModalOpen && formData) {
      
      const bags = parseFloat(formData.noOfBags) || 0;
      const weightPerBag = parseFloat(formData.netWeightPerBag) || 0;
      const totalNW = (bags * weightPerBag) / 1000;
      if (formData.totalNetWeight !== totalNW) {
        setFormData(prev => ({ ...prev, totalNetWeight: totalNW }));
      }
      
      
      
      
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
          Create Packing List
        </Button>
      </div>
    )
  };

  const pendingCols = [{"header":"Contract No","accessor":"contractNo"},{"header":"Contract Date","accessor":"contractDate"},{"header":"Buyer Name","accessor":"buyerName"},{"header":"Buyer Country","accessor":"buyerCountry"},{"header":"Rice Grade","accessor":"riceGrade"},{"header":"Quantity (MT)","accessor":"quantity"},{"header":"Incoterms","accessor":"incoterms"},{"header":"Port of Loading","accessor":"portOfLoading"},{"header":"Port of Destination","accessor":"portOfDestination"},{"header":"Shipment Date","accessor":"shipmentDate"},{"header":"Payment Terms","accessor":"paymentTerms"}];
  const historyCols = [{"header":"Packing List No","accessor":"packingListNo"},{"header":"Contract No","accessor":"contractNo"},{"header":"Date","accessor":"plDate"},{"header":"Buyer Name","accessor":"buyerName"},{"header":"No. of Bags","accessor":"noOfBags"},{"header":"Net Weight (MT)","accessor":"totalNetWeight"},{"header":"Gross Weight (MT)","accessor":"totalGrossWeight"},{"header":"Lot Numbers","accessor":"lotNumbers"},{"header":"Batch Numbers","accessor":"batchNumbers"},{"header":"Prepared By","accessor":"preparedBy"}];

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
              <Select 
                value={formData.bagSize || ''} 
                onChange={(e) => setFormData({...formData, bagSize: e.target.value})}
                disabled={false}
                className={false ? 'bg-slate-100' : ''}
              >
                <option value="">Select Bag Size</option>
                <option value="5kg">5kg</option><option value="10kg">10kg</option><option value="25kg">25kg</option><option value="50kg">50kg</option>
              </Select>
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
                value={formData.totalNetWeight || ''} 
                onChange={(e) => setFormData({...formData, totalNetWeight: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
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
