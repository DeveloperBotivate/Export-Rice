import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, GitBranch, Users, Truck, Car, UserCircle, Users2, Wheat } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';

const masterPages = [
  { path: 'companies', name: 'Companies', icon: Building2, desc: 'Manage company entities' },
  { path: 'branches', name: 'Branches', icon: GitBranch, desc: 'Manage branch locations' },
  { path: 'agents', name: 'Agents', icon: Users, desc: 'Manage purchasing agents' },
  { path: 'transport', name: 'Transport', icon: Truck, desc: 'Manage transport providers' },
  { path: 'vehical', name: 'Vehicles', icon: Car, desc: 'Manage vehicle records' },
  { path: 'employee', name: 'Employees', icon: UserCircle, desc: 'Manage employee details' },
  { path: 'customer', name: 'Customers', icon: Users2, desc: 'Manage customer base' },
  { path: 'rice-grades', name: 'Rice Grades', icon: Wheat, desc: 'Manage rice grading' },
];

export const Master = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Master Data Management</h2>
        <p className="text-slate-500">Select a master data category to manage records.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {masterPages.map((page) => (
          <Card 
            key={page.path}
            onClick={() => navigate(`/master/${page.path}`)}
            className="hover:shadow-md hover:border-primary/50 cursor-pointer transition-all group"
          >
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <page.icon size={24} />
              </div>
              <h3 className="font-semibold text-lg text-slate-800 mb-1">{page.name}</h3>
              <p className="text-sm text-slate-500">{page.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
