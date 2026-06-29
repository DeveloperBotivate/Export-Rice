import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Eye, Download, Pencil, Filter } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Modal } from '../../components/ui/Modal';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import POPdf from './POPdf';
import { toast } from 'sonner';

const cn = (...classes) => classes.filter(Boolean).join(' ');

export const RevisePO = () => {
  const navigate = useNavigate();
  const [poList, setPoList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPO, setSelectedPO] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState('revise');

  useEffect(() => {
    try {
      const rawHistory = JSON.parse(localStorage.getItem('purchase_4_history')) || [];
      const masterData = JSON.parse(localStorage.getItem('purchase_master_v6')) || [];
      const resolveItems = (rawArray) => rawArray.map(item => typeof item === 'number' ? masterData.find(m => m.id === item) : item).filter(Boolean);
      const historyItems = resolveItems(rawHistory);
      
      // Group by poNumber since a single PO might fulfill multiple indents
      const marketPOs = historyItems.filter(h => h.purchaseType === 'Market' && (h.poNumber || h.poDoNumber));
      
      const grouped = marketPOs.reduce((acc, curr) => {
        const pNum = curr.poNumber || curr.poDoNumber;
        if (!acc[pNum]) {
          acc[pNum] = { ...curr, poNumber: pNum, indents: [], totalValue: 0, qtyMT: 0 };
        }
        acc[pNum].indents.push(curr);
        acc[pNum].totalValue += Number(curr.totalValue || curr.approvedTotalValue || 0);
        acc[pNum].qtyMT += Number(curr.qtyMT || curr.approvedQtyMT || 0);
        return acc;
      }, {});

      setPoList(Object.values(grouped));
    } catch (err) {
      console.error(err);
      toast.error('Failed to load PO History');
    }
  }, []);

  const handlePreview = (po) => {
    // Generate preview data from PO
    const previewData = {
      companyName: 'Rice Mill Export Inc.',
      companyAddress: 'Mill Road, Punjab',
      companyPhone: '9999999999',
      companyEmail: 'contact@ricemill.com',
      companyGstin: '27AAAAA0000A1Z5',
      supplierName: po.vendorName,
      supplierAddress: 'Market Supplier Address',
      supplierGstin: '27XYZ0000',
      poNumber: po.poNumber,
      poDate: new Date().toLocaleDateString('en-IN'),
      deliveryDate: po.poValidity,
      items: po.indents.map(i => ({
        internalCode: i.indentNo,
        product: i.paddyGrade,
        qty: i.qtyMT,
        rate: i.rate,
        amount: i.totalValue,
        paymentTerm: i.paymentTerms
      })),
      subtotal: po.totalValue,
      totalGst: 0,
      totalAmount: po.totalValue,
      terms: [{ num: 1, text: 'Quality subject to Final QC at mill.' }, { num: 2, text: 'Payment as per agreed terms.' }],
      preparedBy: po.createdBy,
      approvedBy: 'Director'
    };
    setSelectedPO(previewData);
    setIsModalOpen(true);
  };

  const filteredPOs = poList.filter(po => 
    po.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) || 
    po.vendorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full min-h-0 bg-slate-50/50">
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="flex w-full p-2 bg-slate-50">
          <button type="button" onClick={() => navigate('/po-creation')} className="flex-1 py-1.5 px-4 text-sm font-bold transition-all duration-200 rounded-md text-slate-500 hover:bg-slate-100">
            Create PO (Market)
          </button>
          <div className="w-1" />
          <button type="button" onClick={() => setMode('revise')} className={cn("flex-1 py-1.5 px-4 text-sm font-bold transition-all duration-200 rounded-md", mode === 'revise' ? "bg-blue-50 text-blue-700 shadow-sm" : "text-slate-500 hover:bg-slate-100")}>
            Revise PO
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 lg:p-6">
        <div className="max-w-7xl mx-auto space-y-6 pb-10">
          
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Revise Market PO</h1>
              <p className="text-slate-500">View and revise existing Market Purchase Orders</p>
            </div>
          </div>

          <Card className="p-0 border-0 shadow-sm ring-1 ring-slate-200 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white">
              <div className="relative w-64">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <Input 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 bg-slate-50 border-slate-200" 
                  placeholder="Search PO Number or Supplier..." 
                />
              </div>
            </div>

            <div className="overflow-x-auto bg-white">
              <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="text-xs text-slate-600 bg-slate-50 uppercase tracking-wide border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 font-bold">Action</th>
                    <th className="px-6 py-4 font-bold">PO Number</th>
                    <th className="px-6 py-4 font-bold">Supplier Name</th>
                    <th className="px-6 py-4 font-bold">Total Qty (MT)</th>
                    <th className="px-6 py-4 font-bold">Total Value (₹)</th>
                    <th className="px-6 py-4 font-bold">Validity</th>
                    <th className="px-6 py-4 font-bold">Created By</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredPOs.map((po, index) => (
                    <tr key={index} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button onClick={() => handlePreview(po)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="View PDF">
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-700">{po.poNumber}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{po.vendorName}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{po.qtyMT.toFixed(2)}</td>
                      <td className="px-6 py-4 font-bold text-emerald-600">₹{po.totalValue.toLocaleString('en-IN')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{po.poValidity}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{po.createdBy}</td>
                    </tr>
                  ))}
                  {filteredPOs.length === 0 && (
                    <tr><td colSpan="7" className="px-6 py-12 text-center text-slate-500">No generated Market POs found</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="PO Document Preview"
        size="4xl"
      >
        <div className="bg-slate-100 p-1 rounded-lg h-[80vh] overflow-hidden m-6">
           {selectedPO && (
             <PDFViewer width="100%" height="100%" style={{ border: 'none' }}>
               <POPdf {...selectedPO} />
             </PDFViewer>
           )}
        </div>
      </Modal>
    </div>
  );
};
