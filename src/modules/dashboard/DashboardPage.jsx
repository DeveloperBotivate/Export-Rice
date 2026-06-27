import React, { useEffect, useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line
} from 'recharts';
import { Target, TrendingUp, Warehouse, Truck } from 'lucide-react';
const MockDB = { get: async () => [], getAll: async () => [], add: async (t, data) => ({ id: Date.now(), ...data }), create: async (t, data) => ({ id: Date.now(), ...data }), update: async (t, id, data) => ({ id, ...data }), delete: async () => true };

const KPICard = ({ title, value, subtitle, icon: Icon, trend }) => (
  <Card className="p-6">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
        <p className={`text-sm mt-2 ${trend === 'up' ? 'text-green-600' : 'text-slate-500'}`}>
          {subtitle}
        </p>
      </div>
      <div className="p-3 bg-primary/10 text-primary rounded-lg">
        <Icon size={24} />
      </div>
    </div>
  </Card>
);

const data = [
  { name: 'Mon', procurement: 4000, target: 5000 },
  { name: 'Tue', procurement: 3000, target: 5000 },
  { name: 'Wed', procurement: 5500, target: 5000 },
  { name: 'Thu', procurement: 4500, target: 5000 },
  { name: 'Fri', procurement: 6000, target: 5000 },
  { name: 'Sat', procurement: 7000, target: 5000 },
  { name: 'Sun', procurement: 6500, target: 5000 },
];

export const DashboardPage = () => {
  const [stats, setStats] = useState({ inventory: 0, vehicles: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const inventory = await MockDB.get('inventory');
      const vehicles = await MockDB.get('vehicles');
      setStats({
        inventory: inventory.length,
        vehicles: vehicles.length
      });
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          title="Daily Procurement" 
          value="6,500 MT" 
          subtitle="+12% from yesterday"
          icon={TrendingUp}
          trend="up"
        />
        <KPICard 
          title="Active Vehicles" 
          value={stats.vehicles} 
          subtitle="Currently in transit"
          icon={Truck}
        />
        <KPICard 
          title="Inventory Lots" 
          value={stats.inventory} 
          subtitle="Across all godowns"
          icon={Warehouse}
        />
        <KPICard 
          title="Monthly Target" 
          value="85%" 
          subtitle="15,000 MT remaining"
          icon={Target}
          trend="up"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Procurement vs Target (Weekly)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{fill: '#f1f5f9'}}
                />
                <Bar dataKey="procurement" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="target" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">AI Demand Forecast</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="procurement" stroke="var(--color-primary)" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';