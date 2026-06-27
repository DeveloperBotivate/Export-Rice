import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, Legend
} from 'recharts';
import {
  TrendingUp, TrendingDown, Warehouse, Truck, Package, ShoppingCart,
  Globe, DollarSign, Factory, AlertTriangle, CheckCircle2, Clock,
  ArrowUpRight, ArrowDownRight, Wheat, Ship, BarChart2, Users
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { useNavigate } from 'react-router-dom';

// ── Data
const weeklyProcurement = [
  { day: 'Mon', paddy: 42, target: 50 },
  { day: 'Tue', paddy: 55, target: 50 },
  { day: 'Wed', paddy: 38, target: 50 },
  { day: 'Thu', paddy: 67, target: 50 },
  { day: 'Fri', paddy: 72, target: 50 },
  { day: 'Sat', paddy: 81, target: 50 },
  { day: 'Sun', paddy: 60, target: 50 },
];

const monthlyRevenue = [
  { month: 'Jan', domestic: 42, export: 28 },
  { month: 'Feb', domestic: 55, export: 35 },
  { month: 'Mar', domestic: 61, export: 42 },
  { month: 'Apr', domestic: 48, export: 38 },
  { month: 'May', domestic: 70, export: 55 },
  { month: 'Jun', domestic: 85, export: 72 },
];

const productionTrend = [
  { week: 'W1', output: 285, recovery: 63.2 },
  { week: 'W2', output: 310, recovery: 64.8 },
  { week: 'W3', output: 295, recovery: 63.9 },
  { week: 'W4', output: 340, recovery: 65.4 },
];

const stockBreakdown = [
  { name: 'Basmati Paddy', value: 38, color: '#f59e0b' },
  { name: 'IR-36 Paddy', value: 24, color: '#3b82f6' },
  { name: 'Sona Masoori', value: 20, color: '#10b981' },
  { name: 'Sharbati', value: 18, color: '#8b5cf6' },
];

const recentActivity = [
  { id: 1, type: 'purchase', icon: ShoppingCart, color: 'text-amber-600 bg-amber-50', title: 'Purchase Order PO-0007 Created', sub: 'Harish Kumar · Karnal Mandi · 148 MT Basmati', time: '12 min ago' },
  { id: 2, type: 'production', icon: Factory, color: 'text-blue-600 bg-blue-50', title: 'Production PRD-0006 Completed', sub: 'Mill-B1 · LOT-006 · 56.1 MT Rice Output', time: '28 min ago' },
  { id: 3, type: 'export', icon: Ship, color: 'text-emerald-600 bg-emerald-50', title: 'Export Contract EC-0003 Booked', sub: 'KSA Rice Traders · Saudi Arabia · 150 MT', time: '1 hr ago' },
  { id: 4, type: 'dispatch', icon: Truck, color: 'text-indigo-600 bg-indigo-50', title: 'Dispatch DO-0005 Reached Port', sub: 'Al Dahra Trading · 100 MT · JNPT Mumbai', time: '2 hr ago' },
  { id: 5, type: 'payment', icon: DollarSign, color: 'text-green-600 bg-green-50', title: 'Payment Received ₹44.6L', sub: 'Reliance Fresh · SO-0001 · RTGS', time: '3 hr ago' },
  { id: 6, type: 'alert', icon: AlertTriangle, color: 'text-red-600 bg-red-50', title: 'E-Way Bill EWB-0001 Expired', sub: 'DO-0001 · Renewal required immediately', time: '5 hr ago' },
  { id: 7, type: 'packing', icon: Package, color: 'text-pink-600 bg-pink-50', title: 'Packing PKO-0003 Completed', sub: '3000 bags · 25kg BOPP · Lot LOT-003', time: '6 hr ago' },
];

const pendingActions = [
  { label: 'Procurement Approvals', count: 3, color: 'bg-amber-500', path: '/procurement-approval' },
  { label: 'Lab QC Pending', count: 5, color: 'bg-blue-500', path: '/lab-quality' },
  { label: 'Sales Orders Pending', count: 2, color: 'bg-sky-500', path: '/order-approval' },
  { label: 'Dispatch Pending', count: 4, color: 'bg-indigo-500', path: '/dispatch-order' },
  { label: 'Finance Payable', count: 6, color: 'bg-green-500', path: '/accounts-payable' },
  { label: 'Export Docs Pending', count: 2, color: 'bg-emerald-500', path: '/export-documentation' },
];

const exportOrders = [
  { id: 'EC-0001', buyer: 'Al Dahra (UAE)', grade: 'Premium Basmati', qty: 100, status: 'Shipped', statusColor: 'bg-emerald-100 text-emerald-700' },
  { id: 'EC-0002', buyer: 'Gulf Foods (UAE)', grade: 'Premium Basmati', qty: 80, status: 'In Transit', statusColor: 'bg-blue-100 text-blue-700' },
  { id: 'EC-0003', buyer: 'KSA Traders (KSA)', grade: 'IR-36 Rice', qty: 150, status: 'Booked', statusColor: 'bg-indigo-100 text-indigo-700' },
  { id: 'EC-0004', buyer: 'Egypt Trade Co.', grade: 'Sona Masoori', qty: 200, status: 'Booked', statusColor: 'bg-amber-100 text-amber-700' },
  { id: 'EC-0005', buyer: 'Oman Foodstuff', grade: 'Premium Basmati', qty: 60, status: 'Signed', statusColor: 'bg-purple-100 text-purple-700' },
];

// ── Components
const KPI = ({ title, value, sub, icon: Icon, iconBg, trend, trendVal, onClick }) => (
  <div onClick={onClick} className={`bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex items-start gap-4 ${onClick ? 'cursor-pointer hover:shadow-md hover:border-blue-200 transition-all duration-200' : ''}`}>
    <div className={`p-3 rounded-xl ${iconBg} shrink-0`}>
      <Icon size={22} className="text-white" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide truncate">{title}</p>
      <p className="text-2xl font-extrabold text-slate-800 mt-1 leading-tight">{value}</p>
      {sub && (
        <p className={`text-xs mt-1.5 flex items-center gap-1 font-medium ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-500' : 'text-slate-500'}`}>
          {trend === 'up' && <ArrowUpRight size={12} />}
          {trend === 'down' && <ArrowDownRight size={12} />}
          {sub}
        </p>
      )}
    </div>
  </div>
);

const SectionTitle = ({ children, sub }) => (
  <div className="mb-4">
    <h3 className="text-base font-bold text-slate-800">{children}</h3>
    {sub && <p className="text-xs text-slate-500 mt-0.5">{sub}</p>}
  </div>
);

const CHART_TOOLTIP_STYLE = {
  contentStyle: { borderRadius: '10px', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', fontSize: 12 },
  cursor: { fill: '#f1f5f9' }
};

export const DashboardPage = () => {
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="space-y-6">

      {/* ── Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white flex items-center justify-between shadow-lg">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2"><Wheat size={22} /> Rice Mill ERP — Operations Dashboard</h2>
          <p className="text-blue-100 text-sm mt-1">{today}</p>
        </div>
        <div className="hidden md:flex flex-col items-end text-right">
          <p className="text-2xl font-extrabold">June 2026</p>
          <p className="text-blue-200 text-xs mt-1">Procurement Season Active</p>
        </div>
      </div>

      {/* ── KPI Row 1 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPI title="Paddy Procured (MT)" value="546.5" sub="↑ 8% vs last week" trend="up" icon={Wheat} iconBg="bg-amber-500" onClick={() => navigate('/purchase-closure')} />
        <KPI title="Rice Output (MT)" value="405.3" sub="Avg Recovery 64.8%" trend="up" icon={Factory} iconBg="bg-blue-600" onClick={() => navigate('/actual-production')} />
        <KPI title="Active Dispatches" value="6" sub="3 Domestic · 3 Export" icon={Truck} iconBg="bg-indigo-500" onClick={() => navigate('/dispatch-order')} />
        <KPI title="Total Sales Value" value="₹2.8Cr" sub="↑ 12% vs last month" trend="up" icon={DollarSign} iconBg="bg-green-600" onClick={() => navigate('/order-completion')} />
      </div>

      {/* ── KPI Row 2 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPI title="Raw Material Stock" value="412 MT" sub="Across 3 warehouses" icon={Warehouse} iconBg="bg-orange-500" onClick={() => navigate('/inventory')} />
        <KPI title="Finished Goods" value="185 MT" sub="Ready for dispatch" icon={Package} iconBg="bg-teal-500" onClick={() => navigate('/inventory')} />
        <KPI title="Export Revenue" value="$497K" sub="5 active contracts" trend="up" icon={Globe} iconBg="bg-emerald-600" onClick={() => navigate('/export-contract')} />
        <KPI title="Accounts Receivable" value="₹1.52Cr" sub="3 pending payments" trend="down" icon={TrendingUp} iconBg="bg-rose-500" onClick={() => navigate('/accounts-receivable')} />
      </div>

      {/* ── Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Procurement vs Target */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <SectionTitle sub="Daily paddy input vs procurement target (MT)">Procurement vs Target — This Week</SectionTitle>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyProcurement} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip {...CHART_TOOLTIP_STYLE} />
                <Legend iconType="circle" iconSize={8} />
                <Bar dataKey="paddy" name="Procured (MT)" fill="#3b82f6" radius={[5, 5, 0, 0]} />
                <Bar dataKey="target" name="Target (MT)" fill="#e2e8f0" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stock Breakdown Pie */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <SectionTitle sub="Current raw material inventory by grade">Stock Breakdown</SectionTitle>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={stockBreakdown} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                  {stockBreakdown.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5 mt-1">
            {stockBreakdown.map(s => (
              <div key={s.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                  <span className="text-slate-600">{s.name}</span>
                </div>
                <span className="font-bold text-slate-800">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Revenue Trend */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <SectionTitle sub="Domestic + Export revenue (₹ Lakhs)">Monthly Revenue Trend</SectionTitle>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyRevenue}>
                <defs>
                  <linearGradient id="colDomestic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colExport" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip {...CHART_TOOLTIP_STYLE} />
                <Legend iconType="circle" iconSize={8} />
                <Area type="monotone" dataKey="domestic" name="Domestic (₹L)" stroke="#3b82f6" strokeWidth={2.5} fill="url(#colDomestic)" dot={{ r: 4, fill: '#3b82f6' }} />
                <Area type="monotone" dataKey="export" name="Export (₹L)" stroke="#10b981" strokeWidth={2.5} fill="url(#colExport)" dot={{ r: 4, fill: '#10b981' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Production Recovery */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <SectionTitle sub="Weekly rice output (MT) and recovery percentage">Production Recovery Trend</SectionTitle>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productionTrend} barCategoryGap="40%">
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis yAxisId="right" orientation="right" domain={[60, 70]} axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} unit="%" />
                <Tooltip {...CHART_TOOLTIP_STYLE} />
                <Legend iconType="circle" iconSize={8} />
                <Bar yAxisId="left" dataKey="output" name="Output (MT)" fill="#6366f1" radius={[5, 5, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="recovery" name="Recovery %" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 5, fill: '#f59e0b' }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ── Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Pending Actions */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <SectionTitle sub="Items requiring immediate attention">Pending Actions</SectionTitle>
          <div className="space-y-2.5">
            {pendingActions.map(a => (
              <button key={a.label} onClick={() => navigate(a.path)}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all group">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${a.color} shrink-0`} />
                  <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700">{a.label}</span>
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full text-white ${a.color}`}>{a.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Export Live Orders */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <SectionTitle sub="Live export contracts status">Export Orders</SectionTitle>
          <div className="space-y-3">
            {exportOrders.map(e => (
              <div key={e.id} className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">{e.buyer}</p>
                  <p className="text-xs text-slate-500">{e.id} · {e.grade} · {e.qty} MT</p>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${e.statusColor}`}>{e.status}</span>
              </div>
            ))}
          </div>
          <button onClick={() => navigate('/export-contract')} className="mt-4 w-full text-center text-xs font-semibold text-blue-600 hover:text-blue-700 py-2 border border-blue-100 rounded-xl hover:bg-blue-50 transition-colors">
            View All Contracts →
          </button>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <SectionTitle sub="Latest operations across all modules">Recent Activity</SectionTitle>
          <div className="space-y-3">
            {recentActivity.map(a => (
              <div key={a.id} className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${a.color} shrink-0 mt-0.5`}>
                  <a.icon size={13} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-800 leading-snug truncate">{a.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5 truncate">{a.sub}</p>
                </div>
                <span className="text-xs text-slate-400 whitespace-nowrap shrink-0">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};