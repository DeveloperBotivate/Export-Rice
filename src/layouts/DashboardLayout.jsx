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
  const [expandedSubMenu, setExpandedSubMenu] = useState(null);

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
      const hasActive = group.links.some(l => 
        location.pathname === l.path || 
        (l.subLinks && l.subLinks.some(sl => location.pathname === sl.path))
      );
      if (hasActive) {
        setExpandedGroup(group.title);
      }
      group.links.forEach(l => {
        if (l.subLinks && l.subLinks.some(sl => location.pathname === sl.path)) {
          setExpandedSubMenu(l.label);
        }
      });
    });
  }, [location.pathname]);

  const toggleGroup = (title) => {
    if (!isSidebarOpen) setSidebarOpen(true);
    setExpandedGroup(prev => prev === title ? null : title);
  };

  const toggleSubMenu = (label) => {
    if (!isSidebarOpen) setSidebarOpen(true);
    setExpandedSubMenu(prev => prev === label ? null : label);
  };

  const navGroups = [
    {
      title: "Purchase",
      links: [
        { path: '/purchase-requirement', label: 'Purchase Requirement', icon: ShoppingCart },
        { path: '/source-selection', label: 'Source Selection', icon: Map },
        { path: '/purchase-approval', label: 'Purchase Approval', icon: ShieldCheck },
        { path: '/po-creation', label: 'Create PO (Market)', icon: FileText },
        { path: '/revise-po', label: 'Revise PO (Market)', icon: FileText },
        { path: '/arrange-logistics-purchase', label: 'Arrange Logistics', icon: Truck },
        { path: '/source-entry', label: 'Source Entry', icon: Target },
        { path: '/advance-payment', label: 'Advance Payment', icon: Calculator },
        { path: '/lift', label: 'Lift', icon: Map },
        { path: '/weighment', label: 'Weighment', icon: Scale },
        { path: '/material-receipt', label: 'Material Receipt', icon: Database },
        { path: '/laboratory-report', label: 'Laboratory Report', icon: TestTube },
        { path: '/accounts-verification', label: 'Accounts Verification', icon: Calculator },
        { path: '/full-kitting', label: 'Full Kitting', icon: Package },
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
      title: "Production",
      links: [
        { path: '/production-planning', label: 'Production Planning', icon: Calculator },
        { path: '/production-order', label: 'Production Order', icon: FileText },
        { path: '/batch-creation', label: 'Batch Creation', icon: Factory },
        { path: '/raw-material-issue', label: 'Raw Material Issue', icon: Database },
        { path: '/pre-qc', label: 'Pre-Process QC', icon: TestTube },
        { 
          label: 'Milling Process', 
          icon: Cog,
          subLinks: [
            { path: '/paddy-cleaning', label: '1. Paddy Cleaning' },
            { path: '/dehusking', label: '2. Dehusking' },
            { path: '/separation', label: '3. Separation' },
            { path: '/polishing', label: '4. Polishing' },
            { path: '/grading', label: '5. Grading' },
            { path: '/color-sorting', label: '6. Color Sorting' }
          ]
        },
        { path: '/final-qc', label: 'Final QC', icon: ShieldCheck },
        { path: '/yield-calculation', label: 'Yield Calculation', icon: BarChart },
        { path: '/finished-goods-entry', label: 'Finished Goods Entry', icon: Package },
        { path: '/packing', label: 'Packing', icon: Settings },
        { path: '/fg-warehouse-entry', label: 'FG Warehouse Entry', icon: Warehouse },
        { path: '/production-closure', label: 'Production Closure', icon: ShieldCheck },
      ]
    },
    {
      title: "Order & Dispatch",
      links: [
        { path: '/sales-order', label: 'Sales Order', icon: ShoppingCart },
        { path: '/order-approval', label: 'Order Approval', icon: ShieldCheck },
        { path: '/stock-availability-check', label: 'Stock Availability', icon: Database },
        { path: '/stock-reservation', label: 'Stock Reservation', icon: Warehouse },
        { path: '/dispatch-planning', label: 'Dispatch Planning', icon: LineChart },
        { path: '/packing-instruction', label: 'Packing Instruction', icon: Package },
        { path: '/quality-clearance', label: 'Quality Clearance', icon: TestTube },
        { path: '/dispatch-order', label: 'Dispatch Order', icon: FileText },
        { path: '/vehicle-allocation', label: 'Vehicle / Container', icon: Truck },
        { path: '/loading', label: 'Loading', icon: Cog },
        { path: '/final-weighment', label: 'Final Weighment', icon: Scale },
        { path: '/dispatch-documents', label: 'Dispatch Documents', icon: Globe },
        { path: '/gate-pass', label: 'Gate Pass', icon: ShieldCheck },
        { path: '/dispatch-confirmation', label: 'Dispatch Confirmation', icon: Settings },
        { path: '/billing-closure', label: 'Billing & Closure', icon: Calculator },
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
    },
    {
      title: "Core System",
      links: [
        { path: '/master', label: 'Master Management', icon: Database },
        { path: '/targets', label: 'Target Management', icon: Target },
      ]
    }
  ];

  // Filter groups by role access — '*' means full access (admin only)
  const visibleGroups = currentUser.allowedGroups?.[0] === '*'
    ? navGroups
    : navGroups.filter(g => (currentUser.allowedGroups || []).includes(g.title));

  const getActiveLabel = () => {
    for (const group of visibleGroups) {
      for (const link of group.links) {
        if (link.path === location.pathname) return link.label;
        if (link.subLinks) {
          const sub = link.subLinks.find(sl => sl.path === location.pathname);
          if (sub) return sub.label;
        }
      }
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
            <span className="font-bold text-lg text-primary tracking-tight truncate">🌾 Rice Mill Pro</span>
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
          <div className="mb-4">
            <SidebarLink 
              to="/"
              icon={LayoutDashboard}
              label="Dashboard"
              isActive={location.pathname === '/'}
              isSidebarOpen={isSidebarOpen}
            />
          </div>

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
                
                <div className={`space-y-0.5 overflow-hidden transition-all duration-300 ${isExpanded || !isSidebarOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  {group.links.map((link) => (
                    <React.Fragment key={link.label}>
                      {link.subLinks ? (
                        <div className="mb-1">
                          <div 
                            className={`flex items-center justify-between px-3 py-2 mx-2 rounded-lg text-slate-700 font-semibold mt-1 cursor-pointer transition-colors ${isSidebarOpen ? 'bg-slate-50 border border-slate-100 hover:bg-slate-100' : 'justify-center hover:bg-slate-100'}`} 
                            title={!isSidebarOpen ? link.label : ''}
                            onClick={() => toggleSubMenu(link.label)}
                          >
                            <div className="flex items-center gap-3">
                              <link.icon size={18} className="shrink-0 text-slate-500" />
                              {isSidebarOpen && <span className="text-sm">{link.label}</span>}
                            </div>
                            {isSidebarOpen && (
                              <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${expandedSubMenu === link.label ? 'rotate-180' : ''}`} />
                            )}
                          </div>
                          <div className={`space-y-0.5 overflow-hidden transition-all duration-300 ${expandedSubMenu === link.label || !isSidebarOpen ? 'max-h-[500px] opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                            <div className={`${isSidebarOpen ? 'ml-6 border-l-2 border-slate-100 pl-2' : ''}`}>
                              {link.subLinks.map(sub => (
                                <SidebarLink 
                                  key={sub.path}
                                  to={sub.path}
                                  icon={() => <div className={`w-1.5 h-1.5 rounded-full mx-1 shrink-0 ${location.pathname === sub.path ? 'bg-primary' : 'bg-slate-300'}`} />}
                                  label={sub.label}
                                  isActive={location.pathname === sub.path}
                                  isSidebarOpen={isSidebarOpen}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <SidebarLink 
                          to={link.path}
                          icon={link.icon}
                          label={link.label}
                          isActive={location.pathname === link.path}
                          isSidebarOpen={isSidebarOpen}
                        />
                      )}
                    </React.Fragment>
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
