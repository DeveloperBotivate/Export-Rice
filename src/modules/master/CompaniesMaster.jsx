import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input, Label } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';
import { Modal } from '../../components/ui/Modal';

const generateDummyData = () => {
  return Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    col1: `Company ${i + 1}`,
    col2: `Data ${i + 1}-A`,
    col3: `Data ${i + 1}-B`,
    col4: `Data ${i + 1}-C`,
  }));
};

export const CompaniesMaster = () => {
  const navigate = useNavigate();
  const [data] = useState(generateDummyData());
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const handleAdd = () => {
    setFormData({});
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEdit = (row) => {
    setFormData(row);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    console.log('Saved:', formData);
    setIsModalOpen(false);
  };

  const filteredData = data.filter(item => 
    Object.values(item).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/master')}>
          <ArrowLeft size={24} />
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Companies Master</h2>
          <p className="text-slate-500">Manage companies records in the system.</p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input 
            className="pl-10"
            placeholder="Search..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={handleAdd}>
          <Plus size={18} />
          Add Company
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Registration No</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-medium text-slate-900">#{row.id}</TableCell>
                <TableCell>{row.col1}</TableCell>
                <TableCell>{row.col2}</TableCell>
                <TableCell>{row.col3}</TableCell>
                <TableCell>{row.col4}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10" onClick={() => handleEdit(row)}>
                      <Edit2 size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10">
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredData.length === 0 && (
          <div className="p-8 text-center text-slate-500">
            No records found matching your search.
          </div>
        )}
      </Card>

      {/* Add/Edit Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={isEditing ? 'Edit Company' : 'Add Company'}
      >
        <div className="p-6 space-y-4">
          <div className="space-y-1.5">
            <Label>Name</Label>
            <Input 
              value={formData.col1 || ''} 
              onChange={(e) => setFormData({...formData, col1: e.target.value})}
              placeholder="Enter Name"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Registration No</Label>
            <Input 
              value={formData.col2 || ''} 
              onChange={(e) => setFormData({...formData, col2: e.target.value})}
              placeholder="Enter Registration No"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Email</Label>
            <Input 
              value={formData.col3 || ''} 
              onChange={(e) => setFormData({...formData, col3: e.target.value})}
              placeholder="Enter Email"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Phone</Label>
            <Input 
              value={formData.col4 || ''} 
              onChange={(e) => setFormData({...formData, col4: e.target.value})}
              placeholder="Enter Phone"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
            <Button onClick={() => setIsModalOpen(false)} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {isEditing ? 'Update' : 'Save'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

