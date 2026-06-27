import React from 'react';
import { Search, Link as LinkIcon, Download, FileText } from 'lucide-react';

export const Reporting = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">Traceability & Document Generation</h2>
          <p className="text-sm text-slate-500">Track paddy lifecycle and generate export/domestic documents</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-semibold text-slate-800 mb-6 flex items-center gap-2">
            <Search size={18} />
            Traceability Engine
          </h3>
          <div className="flex gap-4 mb-8">
            <Input 
              type="text" 
              placeholder="Enter Lot ID, Vehicle No, or PO ID..." 
              
            />
            <Button >
              Trace
            </Button>
          </div>

          <div className="relative pl-6 border-l-2 border-slate-200 space-y-8 pb-4">
            <div className="relative">
              <div className="absolute -left-[33px] bg-green-500 w-4 h-4 rounded-full border-4 border-white"></div>
              <h4 className="font-semibold text-slate-800">Purchase Order (PO-001)</h4>
              <p className="text-sm text-slate-500">Farmer: Rajesh Kumar | Mandi: Moga | Date: 2026-06-25</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[33px] bg-blue-500 w-4 h-4 rounded-full border-4 border-white"></div>
              <h4 className="font-semibold text-slate-800">Gate Entry & Weighbridge (GE-105)</h4>
              <p className="text-sm text-slate-500">Vehicle: PB10 AB 1234 | Gross: 20000 KG | Tare: 5000 KG</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[33px] bg-purple-500 w-4 h-4 rounded-full border-4 border-white"></div>
              <h4 className="font-semibold text-slate-800">Quality Lab Test (LAB-882)</h4>
              <p className="text-sm text-slate-500">Moisture: 13.5% | Broken: 2% | Status: Approved</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[33px] bg-slate-300 w-4 h-4 rounded-full border-4 border-white"></div>
              <h4 className="font-semibold text-slate-400">Production & Packing</h4>
              <p className="text-sm text-slate-400">Pending</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="p-4 border-b border-slate-200 bg-slate-50">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
              <FileText size={18} />
              Generate Documents
            </h3>
          </div>
          <div className="p-4 space-y-3 flex-1">
            {[
              'Purchase Register',
              'Digital Lab Certificate',
              'Delivery Challan',
              'Commercial Invoice',
              'Packing List',
              'Certificate of Origin'
            ].map((doc, idx) => (
              <Button key={idx} className="w-full flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:border-primary/30 hover:bg-slate-50 transition-colors group">
                <span className="font-medium text-slate-700 text-sm group-hover:text-primary">{doc}</span>
                <Download size={16} className="text-slate-400 group-hover:text-primary" />
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

import { Button } from '../../components/ui/Button';
import { Input, Select, Textarea } from '../../components/ui/Input';