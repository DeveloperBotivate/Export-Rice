import React, { useState } from 'react';
import { Target as TargetIcon, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input, Label, Select, Textarea } from '../../components/ui/Input';

const dummyTargets = [
  { level: 'State', achieved: 45000, target: 50000, color: 'primary' },
  { level: 'District', achieved: 12000, target: 15000, color: 'blue' },
  { level: 'Mandi', achieved: 4500, target: 5000, color: 'green' },
];

const dummyMandis = [
  { name: 'Karnal Mandi', achieved: 1200, target: 1500 },
  { name: 'Kurukshetra Mandi', achieved: 900, target: 1200 },
  { name: 'Ambala Mandi', achieved: 850, target: 1000 },
  { name: 'Kaithal Mandi', achieved: 700, target: 800 },
  { name: 'Panipat Mandi', achieved: 600, target: 600 },
  { name: 'Rohtak Mandi', achieved: 250, target: 500 },
];

export const Target = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const targets = dummyTargets.slice(0, 3);

  const handleSave = () => {
    console.log('Saved target:', formData);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">Target Management</h2>
          <p className="text-sm text-slate-500">Monitor hierarchical procurement targets and achievements</p>
        </div>
        <Button onClick={() => { setFormData({}); setIsModalOpen(true); }}>
          <TargetIcon size={18} />
          Set New Target
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {targets.map((t, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-32 h-32 bg-${t.color}-50 rounded-bl-full -mr-16 -mt-16 z-0`}></div>
            <div className="relative z-10">
              <h3 className="text-lg font-semibold text-slate-800">{t.level} Target</h3>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold text-slate-900">{t.achieved.toLocaleString()}</p>
                  <p className="text-sm text-slate-500">of {t.target.toLocaleString()} MT</p>
                </div>
                <div className="text-right">
                  <div className={`flex items-center gap-1 text-sm font-medium ${
                    (t.achieved/t.target) > 0.8 ? 'text-green-600' : 'text-amber-600'
                  }`}>
                    {(t.achieved/t.target) > 0.8 ? <TrendingUp size={16}/> : <TrendingDown size={16}/>}
                    {((t.achieved/t.target)*100).toFixed(1)}%
                  </div>
                </div>
              </div>
              
              <div className="mt-4 h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-${t.color === 'primary' ? 'primary' : t.color + '-500'}`}
                  style={{ width: `${(t.achieved/t.target)*100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mt-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-6">Mandi Level Performance</h3>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {dummyMandis.map((mandi, idx) => (
            <div key={idx} className="flex items-center gap-4 p-4 border border-slate-100 rounded-lg hover:border-primary/20 transition-colors">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold">
                {idx + 1}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-medium text-slate-800">{mandi.name}</h4>
                  <span className="text-sm font-medium text-slate-600">{mandi.achieved.toLocaleString()} / {mandi.target.toLocaleString()} MT</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary"
                    style={{ width: `${(mandi.achieved/mandi.target)*100}%` }}
                  ></div>
                </div>
              </div>
              <Button className="p-2 text-slate-400 hover:text-primary transition-colors">
                <ArrowRight size={20} />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Set New Target Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Set New Target"
      >
        <div className="p-6 space-y-4">
          <div className="space-y-1.5">
            <Label>Target Level</Label>
            <Select 
              value={formData.level || ''} 
              onChange={(e) => setFormData({...formData, level: e.target.value})}
            >
              <option value="">Select Level</option>
              <option value="State">State</option>
              <option value="District">District</option>
              <option value="Mandi">Mandi</option>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Target Name/Region</Label>
            <Input 
              value={formData.name || ''} 
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="e.g. Karnal District"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Target Quantity (MT)</Label>
            <Input 
              type="number"
              value={formData.quantity || ''} 
              onChange={(e) => setFormData({...formData, quantity: e.target.value})}
              placeholder="Enter quantity"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Start Date</Label>
              <Input 
                type="date"
                value={formData.startDate || ''} 
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
              />
            </div>
            <div className="space-y-1.5">
              <Label>End Date</Label>
              <Input 
                type="date"
                value={formData.endDate || ''} 
                onChange={(e) => setFormData({...formData, endDate: e.target.value})}
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Description</Label>
            <Textarea 
              value={formData.description || ''} 
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Enter details..."
            />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
            <Button onClick={() => setIsModalOpen(false)} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Target
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
};
