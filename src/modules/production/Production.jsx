import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, Factory } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';

const productionPages = [
  { path: 'planning', name: 'Production Planning', icon: ClipboardList, desc: 'Plan production runs' },
  { path: 'module', name: 'Production Module', icon: Factory, desc: 'Manage active production' },
];

export const Production = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Production Management</h2>
        <p className="text-slate-500">Select a production operation to manage.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {productionPages.map((page) => (
          <Card 
            key={page.path}
            onClick={() => navigate(`/production/${page.path}`)}
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
