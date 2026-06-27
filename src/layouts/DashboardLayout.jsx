import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { 
  LayoutDashboard, Database, Target, ShoppingCart, Warehouse, Truck, 
  Scale, TestTube, Factory, Settings, Menu, Bell, User, LogOut,
  LineChart, Map, Cog, Package, Globe, FileText, BarChart, ShieldCheck, Calculator,
  ChevronDown
} from 'lucide-react';

const SidebarLink = ({ to, icon: Icon, label, isActive, isSidebarOpen }) => (
  <Link 
    to={to} 
    className={`flex items-center gap-3 px-3 py-2.5 mx-2 rounded-lg transition-all duration-200 ${
      isActive 
        ? 'bg-primary text-primary-foreground shadow-sm' 
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    }`}
    title={!isSidebarOpen ? label : ''}
  >
    <Icon size={18} className="shrink-0" />
    {isSidebarOpen && <span className="font-medium text-sm whitespace-nowrap truncate">{label}</span>}
  </Link>
);

export const DashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedGroup, setExpandedGroup] = useState(null);

  const currentUser = (() => {
    try { return JSON.parse(localStorage.getItem('rm_user')) || { role: 'Admin User', id: 'admin' }; }
    catch { return { role: 'Admin User', id: 'admin' }; }
  })();

  const handleLogout = () => {
    localStorage.removeItem('rm_user');
    navigate('/login');
  };

  // Auto-expand group if it contains the active link
  React.useEffect(() => {
    navGroups.forEach(group => {
      if (group.links.some(l => location.pathname === l.path)) {
        setExpandedGroup(group.title);
      }
    });
  }, [location.pathname]);

  const toggleGroup = (title) => {
    if (!isSidebarOpen) setSidebarOpen(true);
    setExpandedGroup(prev => prev === title ? null : title);
  };

  const navGroups = [
    {
      title: "Core System",
      links: [
        { path: '/', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/master', label: 'Master Management', icon: Database },
        { path: '/targets', label: 'Target Management', icon: Target },
      ]
    },
    {
      title: "Procurement",
      links: [
        { path: '/procurement-planning', label: 'Procurement Planning', icon: LineChart },
        { path: '/procurement-approval', label: 'Procurement Approval', icon: Target },
        { path: '/mandi-selection', label: 'Mandi Selection', icon: Map },
        { path: '/market-price', label: 'Current Market Price', icon: BarChart },
        { path: '/government-msp', label: 'Government MSP', icon: Database },
        { path: '/lab-quality', label: 'Lab Quality', icon: TestTube },
        { path: '/final-approval', label: 'Approval', icon: ShieldCheck },
        { path: '/transportation-cost', label: 'Transportation Cost', icon: Truck },
        { path: '/purchase-requirement', label: 'Purchase Requirement', icon: ShoppingCart },
      ]
    },
    {
      title: "Purchase Execution",
      links: [
        { path: '/purchase-request', label: 'Purchase Request', icon: ShoppingCart },
        { path: '/purchase-order', label: 'Purchase Order', icon: Target },
        { path: '/agent-assignment', label: 'Agent Assignment', icon: User },
        { path: '/vehicle-assignment', label: 'Vehicle Assignment', icon: Truck },
        { path: '/mandi-selection-purchase', label: 'Mandi Selection', icon: Map },
        { path: '/purchase-challan', label: 'Purchase Challan', icon: FileText },
        { path: '/gate-entry-purchase', label: 'Gate Entry', icon: ShieldCheck },
        { path: '/gross-weight', label: 'Gross Weight', icon: Scale },
        { path: '/purchase-closure', label: 'Purchase Closure', icon: Database },
      ]
    },
    {
      title: "Inventory Management",
      links: [
        { path: '/inventory', label: 'Inventory Management', icon: Warehouse },
      ]
    },
    {
      title: "Manufacturing",
      links: [
        { path: '/production-planning', label: 'Production Planning', icon: Calculator },
        { path: '/actual-production', label: 'Actual Production', icon: Factory },
        { path: '/paddy-cleaning', label: 'Paddy Cleaning', icon: Cog },
        { path: '/dehusking', label: 'Dehusking', icon: Cog },
        { path: '/separation', label: 'Separation', icon: Package },
        { path: '/polishing', label: 'Polishing', icon: Settings },
        { path: '/grading', label: 'Grading', icon: Database },
        { path: '/color-sorting', label: 'Color Sorting', icon: TestTube },
        { path: '/expected-vs-actual', label: 'Expected vs Actual', icon: BarChart },
      ]
    },
    {
      title: "Packing & Finished Goods",
      links: [
        { path: '/packing-order', label: 'Packing Order', icon: Package },
        { path: '/bag-selection', label: 'Bag Selection', icon: Settings },
        { path: '/barcode', label: 'Barcode Generation', icon: Database },
        { path: '/qrcode', label: 'QR Code Generation', icon: TestTube },
        { path: '/batch-number', label: 'Batch Number', icon: Factory },
        { path: '/lot-number', label: 'Lot Number', icon: Database },
        { path: '/weight-verification', label: 'Weight Verification', icon: Scale },
        { path: '/packing-qc', label: 'Packing QC', icon: ShieldCheck },
        { path: '/finished-goods', label: 'Finished Goods Inventory', icon: Warehouse },
      ]
    },
    {
      title: "Sales",
      links: [
        { path: '/order-receive', label: 'Order Receive', icon: ShoppingCart },
        { path: '/sent-quotation', label: 'Sent Quotation', icon: FileText },
        { path: '/order-follow-up', label: 'Order Follow-up', icon: Target },
        { path: '/order-approval', label: 'Order Approval', icon: ShieldCheck },
        { path: '/order-completion', label: 'Order Completion', icon: Database },
      ]
    },
    {
      title: "Export Management",
      links: [
        { path: '/export-contract', label: 'Export Contract', icon: FileText },
        { path: '/packing-list', label: 'Packing List', icon: Package },
        { path: '/container-booking', label: 'Container Booking', icon: Globe },
        { path: '/container-loading', label: 'Container Loading', icon: Truck },
        { path: '/shipping-line', label: 'Shipping Line', icon: Map },
        { path: '/shipping-bill', label: 'Shipping Bill', icon: FileText },
        { path: '/bill-of-lading', label: 'Bill of Lading', icon: FileText },
        { path: '/certificate-of-origin', label: 'Certificate of Origin', icon: ShieldCheck },
        { path: '/export-documentation', label: 'Documentation & Bank', icon: Database },
        { path: '/export-payment', label: 'Export Payment', icon: Calculator },
      ]
    },
    {
      title: "Dispatch",
      links: [
        { path: '/dispatch-order', label: 'Dispatch Order', icon: Truck },
        { path: '/stock-reservation', label: 'Stock Reservation', icon: Package },
        { path: '/picking-list', label: 'Picking List', icon: FileText },
        { path: '/loading', label: 'Loading', icon: Package },
        { path: '/vehicle-assignment-dispatch', label: 'Vehicle Assignment', icon: Truck },
        { path: '/dispatch-weight', label: 'Dispatch Weight', icon: Map },
        { path: '/delivery-challan', label: 'Delivery Challan', icon: FileText },
        { path: '/invoice', label: 'Invoice', icon: FileText },
        { path: '/gate-pass', label: 'Gate Pass', icon: ShieldCheck },
        { path: '/e-way-bill', label: 'E-Way Bill', icon: FileText },
        { path: '/pod', label: 'POD', icon: ShieldCheck },
        { path: '/delivery-confirmation', label: 'Delivery Confirmation', icon: Database },
      ]
    },
    {
      title: "Finance & Payments",
      links: [
        { path: '/accounts-receivable', label: 'Accounts Receivable', icon: Calculator },
        { path: '/accounts-payable', label: 'Accounts Payable', icon: Calculator },
        { path: '/vendor-payments', label: 'Vendor Payments', icon: Globe },
        { path: '/transporter-payments', label: 'Transporter Payments', icon: Truck },
        { path: '/agent-commission', label: 'Agent Commission', icon: Database },
        { path: '/sales-commission', label: 'Sales Commission', icon: Database },
        { path: '/purchase-commission', label: 'Purchase Commission', icon: Database },
        { path: '/broker-commission', label: 'Broker Commission', icon: Globe },
        { path: '/export-payment-tracking', label: 'Export Payment Tracking', icon: Globe },
        { path: '/domestic-payment-tracking', label: 'Domestic Payment Tracking', icon: Database },
        { path: '/profit-and-loss', label: 'Profit & Loss', icon: Calculator },
        { path: '/bank-reconciliation', label: 'Bank Reconciliation', icon: Database },
      ]
    },
    {
      title: "Audit & Reports",
      links: [
        { path: '/documents', label: 'Document Management', icon: FileText },
        { path: '/reports', label: 'Reporting', icon: BarChart },
        { path: '/traceability', label: 'Traceability & Audit', icon: ShieldCheck },
      ]
    }
  ];

  // Filter groups by role access — '*' means full access (admin only)
  const visibleGroups = currentUser.allowedGroups?.[0] === '*'
    ? navGroups
    : navGroups.filter(g => (currentUser.allowedGroups || []).includes(g.title));

  const getActiveLabel = () => {
    for (const group of visibleGroups) {
      const link = group.links.find(l => l.path === location.pathname);
      if (link) return link.label;
    }
    return 'Dashboard';
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-16'
        } bg-white border-r border-slate-200 flex flex-col transition-all duration-300 shadow-sm z-20 shrink-0`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 shrink-0">
          {isSidebarOpen && (
            <span className="font-bold text-lg text-primary tracking-tight truncate">Enterprise ERP</span>
          )}
          <Button 
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className={`text-slate-500 hover:bg-slate-100 ${!isSidebarOpen && 'mx-auto'}`}
          >
            <Menu size={20} />
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto py-3 space-y-4">
          {visibleGroups.map((group, idx) => {
            const isExpanded = expandedGroup === group.title;
            return (
              <div key={idx}>
                {isSidebarOpen ? (
                  <div 
                    className="px-5 mb-2 flex items-center justify-between cursor-pointer text-slate-500 hover:text-slate-800 transition-colors"
                    onClick={() => toggleGroup(group.title)}
                  >
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      {group.title}
                    </span>
                    <ChevronDown size={14} className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                  </div>
                ) : (
                  <div 
                    className="px-5 mb-2 flex justify-center cursor-pointer text-slate-500 hover:text-slate-800"
                    onClick={() => toggleGroup(group.title)}
                    title={group.title}
                  >
                    <ChevronDown size={14} />
                  </div>
                )}
                
                <div className={`space-y-0.5 overflow-hidden transition-all duration-300 ${isExpanded || !isSidebarOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  {group.links.map((link) => (
                    <SidebarLink 
                      key={link.path}
                      to={link.path}
                      icon={link.icon}
                      label={link.label}
                      isActive={location.pathname === link.path}
                      isSidebarOpen={isSidebarOpen}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </nav>

        <div className="p-3 border-t border-slate-200 shrink-0">
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 px-3 py-2.5 mx-2 rounded-lg w-[calc(100%-16px)] transition-all duration-200 text-red-500 hover:bg-red-50 hover:text-red-600 ${!isSidebarOpen ? 'justify-center' : ''}`}
            title={!isSidebarOpen ? 'Logout' : ''}
          >
            <LogOut size={18} className="shrink-0" />
            {isSidebarOpen && <span className="font-medium text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm z-10 shrink-0">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-slate-800">
              {getActiveLabel()}
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-primary relative rounded-full">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full"></span>
            </Button>
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            <div className="flex items-center gap-3 cursor-pointer">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg shadow-sm ${currentUser.avatar || 'bg-primary/10'}`}>
                {currentUser.icon || '👤'}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-slate-700 capitalize">{currentUser.id}</p>
                <p className="text-xs text-slate-500">{currentUser.role}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
          <div className="max-w-7xl mx-auto w-full pb-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
