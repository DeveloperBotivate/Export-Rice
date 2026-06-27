import React, { useState } from 'react';
import { X, ArrowRight, Paperclip, CheckCircle } from 'lucide-react';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';
import { Input, Select, Textarea, Label } from './ui/Input';

export const StageTransitionModal = ({ isOpen, onClose, currentStage, nextStages, recordId, onConfirm }) => {
  const [selectedStage, setSelectedStage] = useState('');
  const [remarks, setRemarks] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedStage) return alert('Please select a stage');
    onConfirm(recordId, selectedStage, remarks);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Stage Transition">
      <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <Label className="mb-1">Record ID</Label>
            <div className="font-mono font-medium text-slate-800">{recordId}</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="mb-1">From Stage</Label>
              <div className="px-3 py-2 bg-slate-100 rounded-lg text-sm text-slate-500 flex items-center gap-2 border border-slate-200">
                <CheckCircle size={16} className="text-green-500"/>
                {currentStage} (Locked)
              </div>
            </div>
            <div>
              <Label className="mb-1">To Stage <span className="text-red-500">*</span></Label>
              <Select 
                required
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value)}
              >
                <option value="">Select next stage...</option>
                {nextStages.map(stage => (
                  <option key={stage} value={stage}>{stage}</option>
                ))}
              </Select>
            </div>
          </div>

          <div>
            <Label className="mb-1">Remarks <span className="text-red-500">*</span></Label>
            <Textarea 
              required
              rows={3}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Enter transition remarks or findings..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="mb-1">Approved By</Label>
              <Select>
                <option>System Admin</option>
                <option>Manager</option>
                <option>QC Lead</option>
              </Select>
            </div>
            <div>
              <Label className="mb-1">Date</Label>
              <Input 
                type="date" 
                defaultValue={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          <div>
            <Label className="mb-1">Attachments</Label>
            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" className="border-dashed text-slate-500 hover:text-primary">
                <Paperclip size={16} />
                Upload Document
              </Button>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
            <Button 
              type="button" 
              variant="ghost"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit">
              Confirm Transition
              <ArrowRight size={16} />
            </Button>
          </div>
        </form>
    </Modal>
  );
};
