import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FilePlus2, Pencil, Save, Trash, Eye, 
  Calendar, Loader2, ClipboardList
} from 'lucide-react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { PDFViewer } from '@react-pdf/renderer';
import POPdf from './POPdf';
import SearchableDropdown from '../../components/SearchableDropdown';
import ModalForm from '../../components/ModalForm';

const cn = (...classes) => classes.filter(Boolean).join(' ');

// Helper functions that might be in utils in the original project
const formatDate = (date) => new Date(date).toLocaleDateString('en-IN');
const formatDateTime = (date) => new Date(date).toISOString();
const calculateTotal = (rate, gst, discount, qty) => {
  const base = rate * qty;
  const afterDiscount = base - (base * (discount / 100));
  return afterDiscount + (afterDiscount * (gst / 100));
};
const calculateSubtotal = (items) => items.reduce((acc, i) => {
  const base = i.rate * i.quantity;
  return acc + (base - (base * ((i.discountPercent || 0) / 100)));
}, 0);
const calculateTotalGst = (items) => items.reduce((acc, i) => {
  const base = i.rate * i.quantity;
  const afterDiscount = base - (base * ((i.discountPercent || 0) / 100));
  return acc + (afterDiscount * ((i.gstPercent || 0) / 100));
}, 0);
const calculateGrandTotal = (items) => calculateSubtotal(items) + calculateTotalGst(items);

function generatePoNumber(poNumbers, today = new Date()) {
    const fyStart = today.getMonth() < 3 ? today.getFullYear() - 1 : today.getFullYear();
    const fy = `${(fyStart % 100).toString().padStart(2, '0')}-${((fyStart + 1) % 100).toString().padStart(2, '0')}`;
    const prefix = `RiceMill/PO/${fy}/`;
    const numbersInFY = poNumbers
        .filter((po) => typeof po === 'string' && po.includes(`/${fy}/`))
        .map((po) => {
            const match = po.match(/\/(\d+)(?:-\d+)?$/);
            return match ? parseInt(match[1], 10) : null;
        })
        .filter((n) => n !== null);
    const next = numbersInFY.length > 0 ? Math.max(...numbersInFY) + 1 : 1;
    return `${prefix}${next}`;
}

const schema = z.object({
  poNumber: z.string().min(1, "PO Number is required"),
  poDate: z.coerce.date(),
  firmName: z.string().min(1, "Firm Name is required"),
  supplierName: z.string().min(1, "Supplier is required"),
  supplierAddress: z.string().min(1, "Address is required"),
  gstin: z.string(),
  companyEmail: z.string().email().or(z.literal("")),
  description: z.string().optional(),
  indents: z.array(z.object({
    id: z.string().or(z.number()),
    indentNumber: z.string(),
    productName: z.string(),
    specifications: z.string(),
    gst: z.coerce.number(),
    discount: z.coerce.number().default(0),
    quantity: z.coerce.number(),
    unit: z.string(),
    rate: z.coerce.number(),
    paymentTerm: z.string(),
    numberOfDays: z.coerce.number().optional(),
  })).min(1, "At least one item is required"),
  terms: z.array(z.string()).optional(),
  deliveryDate: z.coerce.date(),
  siteEngineerName: z.string().optional(),
  siteEngineerEmail: z.string().optional(),
  siteEngineerPhoneNo: z.string().optional(),
  quotationNumber: z.string().optional(),
  quotationDate: z.coerce.date().optional(),
  ourEnqNo: z.string().optional(),
  enquiryDate: z.coerce.date().optional(),
  preparedBy: z.string().min(1, "Prepared By is required"),
  approvedBy: z.string().min(1, "Approved By is required"),
});

const Card = ({ children, className }) => (
  <div className={cn("bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden", className)}>
    {children}
  </div>
);
const CardHeader = ({ children, className }) => (
  <div className={cn("px-4 py-3 border-b border-slate-100 bg-slate-50", className)}>{children}</div>
);
const CardTitle = ({ children, className }) => (
  <h3 className={cn("text-sm font-semibold text-slate-700", className)}>{children}</h3>
);
const CardContent = ({ children, className }) => (
  <div className={cn("p-4", className)}>{children}</div>
);

export const CreatePO = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState('create');
  const [indentsData, setIndentsData] = useState([]);
  const [poMaster, setPoMaster] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [isEditingDestination, setIsEditingDestination] = useState(false);
  const [destinationAddress, setDestinationAddress] = useState('');

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      poNumber: '', poDate: new Date(), firmName: '', supplierName: '', supplierAddress: '',
      gstin: '', companyEmail: '', description: '', indents: [], terms: [], deliveryDate: new Date(),
      siteEngineerName: '', siteEngineerEmail: '', siteEngineerPhoneNo: '', quotationNumber: '',
      quotationDate: new Date(), ourEnqNo: '', enquiryDate: new Date(), preparedBy: 'System User', approvedBy: '',
    }
  });

  const { fields: itemFields, remove: removeItem } = useFieldArray({ control: form.control, name: 'indents' });
  const { fields: termFields, append: appendTerm, remove: removeTerm } = useFieldArray({ control: form.control, name: 'terms' });

  const loadAllData = useCallback(() => {
    setLoading(true);
    try {
      const rawPending = JSON.parse(localStorage.getItem('purchase_3_history')) || [];
      const rawHistory = JSON.parse(localStorage.getItem('purchase_4_history')) || [];
      
      const masterData = JSON.parse(localStorage.getItem('purchase_master_v6')) || [];
      const resolveItems = (rawArray) => rawArray.map(item => typeof item === 'number' ? masterData.find(m => m.id === item) : item).filter(Boolean);

      const pendingItems = resolveItems(rawPending);
      const historyItems = resolveItems(rawHistory);
      
      const historyIds = historyItems.map(h => h.id);
      const pendingMarket = pendingItems.filter(p => p.purchaseType === 'Market' && !historyIds.includes(p.id));
      
      const uniqueVendors = [...new Set(pendingMarket.map(i => i.agencyName || i.vendorName || i.brokerName).filter(Boolean))].map(name => ({ name, address: 'Market Supplier Address', gst: '27XYZ0000', email: 'vendor@market.com' }));
      const allCompanies = [{ name: 'Rice Mill Export Inc.', address: 'Mill Road, Punjab', phone: '9999999999', email: 'contact@ricemill.com', gst: '27AAAAA0000A1Z5', pan: 'AAAAA0000A' }];
      const allTerms = [{ content: '1. Quality subject to Final QC at mill.' }, { content: '2. Payment as per agreed terms.' }];

      setIndentsData(pendingMarket);
      setPoMaster(rawHistory);
      setVendors(uniqueVendors);
      setCompanies(allCompanies);

      if (form.getValues('terms').length === 0) {
        form.setValue('terms', allTerms.map(t => t.content));
      }
      if (allCompanies[0]?.name) {
        form.setValue('firmName', allCompanies[0].name);
      }
      form.setValue('poNumber', generatePoNumber(historyItems.map(p => p.poNumber)));
    } catch (err) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [form]);

  useEffect(() => { loadAllData(); }, [loadAllData]);

  const watchedSupplier = form.watch('supplierName');
  
  useEffect(() => {
    if (!watchedSupplier) return;
    const vendor = vendors.find(v => v.name === watchedSupplier);
    if (vendor) {
      form.setValue('supplierAddress', vendor.address || '');
      form.setValue('gstin', vendor.gst || '');
      form.setValue('companyEmail', vendor.email || '');
    }
    const matchingItems = indentsData.filter(i => (i.agencyName || i.vendorName || i.brokerName) === watchedSupplier).map(item => ({
      id: item.id,
      indentNumber: item.indentNo || `IND-${item.id}`,
      productName: item.paddyGrade || item.mktPaddyGrade || 'Paddy',
      specifications: 'Market Purchase',
      gst: 0,
      discount: 0,
      quantity: item.approvedQtyMT || item.qtyMT || 0,
      unit: 'MT',
      rate: item.approvedRate || item.rate || 0,
      paymentTerm: 'Advance',
    }));
    form.setValue('indents', matchingItems);
  }, [watchedSupplier, vendors, indentsData, form]);

  const handlePreview = async () => {
    const isValid = await form.trigger();
    if (!isValid) {
      toast.error("Please fill all required fields");
      return;
    }
    const values = form.getValues();
    const company = companies[0];
    const mappedItems = values.indents.map(i => ({ quantity: i.quantity, rate: i.rate, discountPercent: i.discount, gstPercent: i.gst }));
    
    setPreviewData({
      companyName: company.name,
      companyAddress: company.address,
      companyPhone: company.phone,
      companyEmail: company.email,
      companyGstin: company.gst,
      companyPan: company.pan,
      supplierName: values.supplierName,
      supplierAddress: values.supplierAddress,
      supplierGstin: values.gstin,
      supplierEmail: values.companyEmail,
      poNumber: values.poNumber,
      poDate: formatDate(values.poDate),
      deliveryDate: formatDate(values.deliveryDate),
      projectName: "Rice Mill Operations",
      deliveryAddress: destinationAddress || 'Mill Warehouse',
      items: values.indents.map(i => ({
        internalCode: i.indentNumber, product: i.productName, paymentTerm: i.paymentTerm,
        qty: i.quantity, unit: i.unit, rate: i.rate, gst: i.gst, discount: i.discount,
        amount: calculateTotal(i.rate, i.gst, i.discount, i.quantity)
      })),
      subtotal: calculateSubtotal(mappedItems),
      totalGst: calculateTotalGst(mappedItems),
      totalAmount: calculateGrandTotal(mappedItems),
      terms: values.terms.map((t, i) => ({ num: i + 1, text: t })),
      preparedBy: values.preparedBy,
      approvedBy: values.approvedBy,
      companyLogo: null // Disable logo for now
    });
    setShowPreview(true);
  };

  const onSubmit = async (values) => {
    try {
      const rawHistory = JSON.parse(localStorage.getItem('purchase_4_history')) || [];
      values.indents.forEach(item => {
         const newRecord = {
            id: item.id, // match pending id so it drops from pending list
            poDoNumber: values.poNumber,
            poNumber: values.poNumber,
            purchaseType: 'Market',
            vendorName: values.supplierName,
            indentNo: item.indentNumber,
            paddyGrade: item.productName,
            qtyMT: item.quantity,
            rate: item.rate,
            totalValue: calculateTotal(item.rate, item.gst, item.discount, item.quantity),
            poValidity: formatDate(values.deliveryDate),
            paymentTerms: item.paymentTerm,
            createdBy: values.preparedBy,
            status: 'Processed'
         };
         rawHistory.push(newRecord);
      });
      localStorage.setItem('purchase_4_history', JSON.stringify(rawHistory));
      toast.success(`Purchase Order ${values.poNumber} saved successfully`);
      form.reset();
      loadAllData();
      navigate('/po-do-entry');
    } catch (err) {
      toast.error("Failed to save PO");
    }
  };

  return (
    <div className="flex flex-col h-full min-h-0 bg-slate-50/50">
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="flex w-full p-2 bg-slate-50">
          <button type="button" onClick={() => setMode('create')} className={cn("flex-1 py-1.5 px-4 text-sm font-bold transition-all duration-200 rounded-md", mode === 'create' ? "bg-blue-50 text-blue-700 shadow-sm" : "text-slate-500 hover:bg-slate-100")}>
            Create PO (Market)
          </button>
          <div className="w-1" />
          <button type="button" onClick={() => navigate('/revise-po')} className="flex-1 py-1.5 px-4 text-sm font-bold transition-all duration-200 rounded-md text-slate-500 hover:bg-slate-100">
            Revise PO
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 lg:p-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-7xl mx-auto pb-10">
          <div className="space-y-6">
            <div className="bg-white shadow-sm border border-slate-200 rounded-xl overflow-hidden mb-6">
              <div className="flex items-center justify-center gap-6 bg-blue-50/50 p-6">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-slate-800">{companies[0]?.name}</h1>
                  <p className="text-sm text-slate-600">{companies[0]?.address}</p>
                </div>
              </div>
              <div className="border-t border-slate-100 py-2 text-center bg-white">
                <h2 className="font-bold text-slate-700 text-lg uppercase tracking-widest">Market Purchase Order</h2>
              </div>
            </div>

            <Card className="w-full">
              <CardHeader><CardTitle className="flex items-center gap-2"><ClipboardList size={18} className="text-blue-500" />Order Information</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Firm Name</label>
                      <input readOnly {...form.register('firmName')} className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Supplier / Broker Name</label>
                      <SearchableDropdown options={vendors.map(v => ({ value: v.name, label: v.name }))} value={watchedSupplier} onChange={(val) => form.setValue('supplierName', val)} placeholder="Select Supplier" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">PO Number</label>
                      <input {...form.register('poNumber')} className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Delivery Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-2.5 text-slate-400" size={16} />
                        <input type="date" value={form.watch('deliveryDate') ? formatDateTime(form.watch('deliveryDate')).split('T')[0] : ''} onChange={(e) => form.setValue('deliveryDate', new Date(e.target.value))} className="w-full h-10 pl-10 pr-3 bg-white border border-slate-200 rounded-lg text-sm outline-none" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Supplier Address</label>
                      <input {...form.register('supplierAddress')} className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-sm outline-none" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">GSTIN</label>
                      <input {...form.register('gstin')} className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-sm outline-none" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Items & Quantities</CardTitle>
                <div className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                  {watchedSupplier ? form.watch('indents').length : 0} Pending Items
                </div>
              </CardHeader>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase">Indent</th>
                      <th className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase">Item</th>
                      <th className="px-4 py-3 text-center text-[10px] font-bold text-slate-500 uppercase">Qty (MT)</th>
                      <th className="px-4 py-3 text-right text-[10px] font-bold text-slate-500 uppercase">Rate (₹)</th>
                      <th className="px-4 py-3 text-right text-[10px] font-bold text-slate-500 uppercase">Total (₹)</th>
                      <th className="px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {itemFields.map((field, index) => {
                      const row = form.watch(`indents.${index}`);
                      const amount = calculateTotal(row.rate, row.gst, row.discount, row.quantity);
                      return (
                        <tr key={field.id} className="hover:bg-slate-50/50">
                          <td className="px-4 py-4 text-xs font-medium text-slate-700">{row.indentNumber}</td>
                          <td className="px-4 py-4"><p className="text-sm font-semibold text-slate-800">{row.productName}</p></td>
                          <td className="px-4 py-4 w-24"><input type="number" {...form.register(`indents.${index}.quantity`)} className="w-full h-8 text-center border border-slate-200 rounded text-xs outline-none focus:border-blue-400" /></td>
                          <td className="px-4 py-4 w-28"><input type="number" {...form.register(`indents.${index}.rate`)} className="w-full h-8 text-right px-2 border border-slate-200 rounded text-xs outline-none focus:border-blue-400" /></td>
                          <td className="px-4 py-4 text-right"><p className="text-sm font-bold text-slate-800">₹{amount.toLocaleString('en-IN')}</p></td>
                          <td className="px-4 py-4 text-center"><button type="button" onClick={() => removeItem(index)} className="p-1.5 text-red-400 hover:text-red-600 rounded-lg hover:bg-red-50"><Trash size={16} /></button></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>

            <div className="bg-white mt-8 mb-4">
              <div className="flex w-full p-1 bg-slate-50">
                <button type="button" onClick={handlePreview} disabled={!watchedSupplier || form.watch('indents').length === 0} className="flex-1 py-2 text-sm font-bold text-blue-700 bg-blue-100 hover:bg-blue-200 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"><Eye size={18} /> Preview PDF</button>
                <div className="w-1" />
                <button type="submit" disabled={form.formState.isSubmitting || !watchedSupplier || form.watch('indents').length === 0} className="flex-1 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50">
                  {form.formState.isSubmitting ? <Loader2 size={20} className="animate-spin" /> : <Save size={18} />} Generate PO
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <ModalForm isOpen={showPreview} onClose={() => setShowPreview(false)} title="PO Document Preview" maxWidth="max-w-5xl" submitText="Generate PO" onSubmit={(e) => { e.preventDefault(); setShowPreview(false); form.handleSubmit(onSubmit)(); }}>
        <div className="bg-slate-100 p-1 rounded-lg h-[80vh] overflow-hidden">
           {previewData && (
             <PDFViewer width="100%" height="100%" style={{ border: 'none' }}>
               <POPdf {...previewData} />
             </PDFViewer>
           )}
        </div>
      </ModalForm>
    </div>
  );
};
