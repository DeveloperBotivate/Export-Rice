import React, { useState, useEffect } from 'react';
import { Search, Plus, Filter, Clock, History as HistoryIcon, Package, TrendingUp, ChevronDown, ChevronUp, Eye } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input, Label, Select } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Modal } from '../../components/ui/Modal';

const getVal = (item, keyStr) => {
  if (!keyStr) return '-';
  const keys = keyStr.split('|');
  for (let k of keys) {
    if (item[k] !== undefined && item[k] !== null && item[k] !== '') return item[k];
  }
  return '-';
};

export const Lift = () => {
  const getInitialData = () => {
    let masterData = JSON.parse(localStorage.getItem('purchase_master_v6')) || [];
    const resolveItems = (rawArray) => {
      return rawArray.map(item => typeof item === 'number' ? masterData.find(m => m.id === item) : item).filter(Boolean);
    };

    const rawPending = JSON.parse(localStorage.getItem('purchase_7_history')) || [];
    const rawHistory = JSON.parse(localStorage.getItem('purchase_8_history')) || [];

    const pending = resolveItems(rawPending);
    const history = resolveItems(rawHistory);

    // Items that have not yet been fully lifted
    const unresolvedPending = pending.filter(p => {
      const liftData = JSON.parse(localStorage.getItem(`lift_data_${p.id}`)) || { totalLifted: 0 };
      const totalQty = parseFloat(p.qtyMT) || 0;
      return liftData.totalLifted < totalQty;
    });

    return { pending: unresolvedPending, history };
  };

  const initial = getInitialData();
  const [items, setItems] = useState(initial.pending);
  const [historyItems, setHistoryItems] = useState(initial.history);
  const [activeTab, setActiveTab] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  // Group Lift Modal States
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [selectedPaddyGrade, setSelectedPaddyGrade] = useState('');
  const [groupedFormData, setGroupedFormData] = useState({
    supervisor: 'Amit',
    remarks: '',
    vehicleNumber: '',
    driverName: ''
  });
  // State for rows inside group modal
  const [modalItems, setModalItems] = useState([]);

  // History expanded state
  const [expandedHistoryId, setExpandedHistoryId] = useState(null);

  const getLiftStats = (item) => {
    const liftData = JSON.parse(localStorage.getItem(`lift_data_${item.id}`)) || { totalLifted: 0, liftCount: 0 };
    const totalQty = parseFloat(item.qtyMT) || 0;
    return {
      totalLifted: liftData.totalLifted,
      liftCount: liftData.liftCount,
      remaining: Math.max(0, totalQty - liftData.totalLifted),
      percent: totalQty > 0 ? Math.round((liftData.totalLifted / totalQty) * 100) : 0,
    };
  };

  // Get unique paddy grades from pending items
  const uniqueGrades = [...new Set(items.map(i => i.paddyGrade || 'Standard').filter(Boolean))];

  const handleOpenGroupModal = () => {
    setIsGroupModalOpen(true);
    setSelectedPaddyGrade('');
    setModalItems([]);
    setGroupedFormData({
      liftId: `LIFT-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)}`,
      liftDate: new Date().toISOString().slice(0, 16),
      supervisor: 'Amit',
      remarks: '',
      vehicleNumber: '',
      driverName: ''
    });
  };

  useEffect(() => {
    if (selectedPaddyGrade) {
      const filtered = items.filter(i => (i.paddyGrade || 'Standard') === selectedPaddyGrade);
      setModalItems(filtered.map(i => {
        const stats = getLiftStats(i);
        return {
          ...i,
          _checked: false,
          _liftQtyMT: '', // User will input this
          _stats: stats
        };
      }));
    } else {
      setModalItems([]);
    }
  }, [selectedPaddyGrade, items]);

  const handleModalItemChange = (index, field, value) => {
    const newItems = [...modalItems];
    newItems[index][field] = value;
    setModalItems(newItems);
  };

  const handleGroupSave = () => {
    const selected = modalItems.filter(i => i._checked);
    if (selected.length === 0) {
      alert("Please select at least one PO/DO to lift.");
      return;
    }

    let hasError = false;
    selected.forEach(i => {
      const liftQty = parseFloat(i._liftQtyMT) || 0;
      if (liftQty <= 0 || liftQty > i._stats.remaining) {
        alert(`Invalid lift quantity for PO: ${getVal(i, 'poNumber|poDoNumber')}`);
        hasError = true;
      }
    });

    if (hasError) return;

    const liftedItemsData = [];
    let totalGroupLiftQty = 0;

    selected.forEach(i => {
      const liftQty = parseFloat(i._liftQtyMT);
      totalGroupLiftQty += liftQty;
      
      const newTotalLifted = i._stats.totalLifted + liftQty;
      const newRemaining = Math.max(0, parseFloat(i.qtyMT || 0) - newTotalLifted);
      const newLiftNo = i._stats.liftCount + 1;

      liftedItemsData.push({
        id: i.id, // reference to the original PO/DO id
        poNumber: getVal(i, 'poNumber|poDoNumber|doNumber'),
        vendorName: getVal(i, 'vendorName|agencyName|supplierName'),
        purchaseType: i.purchaseType,
        liftedFrom: i.liftedFrom || '',
        totalQtyMT: i.qtyMT,
        liftQtyMT: liftQty,
        liftNo: newLiftNo,
        remainingAfterLiftMT: newRemaining
      });

      // Update lift tracking data in localstorage for each PO/DO
      const liftData = {
        totalLifted: newTotalLifted,
        liftCount: newLiftNo,
        lastLiftId: groupedFormData.liftId,
        fully: newRemaining <= 0,
      };
      localStorage.setItem(`lift_data_${i.id}`, JSON.stringify(liftData));
    });

    // Create Group Lift Record
    const groupLiftRecord = {
      ...groupedFormData,
      id: groupedFormData.liftId, // Using liftId as the unique id for the grouped record
      isGroupedLift: true,
      paddyGrade: selectedPaddyGrade,
      totalGroupLiftQtyMT: totalGroupLiftQty,
      items: liftedItemsData,
      status: 'Group Lifted',
      liftCompletedAt: new Date().toISOString()
    };

    // Save to purchase_8_history
    const rawHistory = JSON.parse(localStorage.getItem('purchase_8_history')) || [];
    rawHistory.push(groupLiftRecord);
    localStorage.setItem('purchase_8_history', JSON.stringify(rawHistory));

    // Push to masterData 
    const masterData = JSON.parse(localStorage.getItem('purchase_master_v6')) || [];
    masterData.push(groupLiftRecord);
    localStorage.setItem('purchase_master_v6', JSON.stringify(masterData));

    setHistoryItems([...historyItems, groupLiftRecord]);

    // Refresh pending items 
    // Filter out fully lifted items, update _remaining for partially lifted
    const updatedItems = items.filter(item => {
      const checkedItem = selected.find(s => s.id === item.id);
      if (checkedItem) {
        const liftQty = parseFloat(checkedItem._liftQtyMT);
        const newTotalLifted = checkedItem._stats.totalLifted + liftQty;
        const totalQty = parseFloat(item.qtyMT || 0);
        return newTotalLifted < totalQty;
      }
      return true; // Not selected, keep it
    });
    setItems(updatedItems);

    setIsGroupModalOpen(false);
  };

  const getRowClass = (type) => {
    if (type === 'Domestic' || type === 'Government') return 'bg-blue-50/50 hover:bg-blue-100/60 transition-colors border-l-4 border-l-blue-400';
    if (type === 'Export' || type === 'Market') return 'bg-emerald-50/50 hover:bg-emerald-100/60 transition-colors border-l-4 border-l-emerald-400';
    return 'hover:bg-slate-50 transition-colors';
  };

  const filteredPending = items.filter(item =>
    (selectedType === 'All' || item.purchaseType === selectedType) &&
    (!searchTerm || JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredHistory = historyItems.filter(item =>
    (!searchTerm || JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Lift (Grouped)</h1>
          <p className="text-slate-500">Manage paddy lifting — batch multiple PO/DOs by Paddy Grade</p>
        </div>
        <Button onClick={handleOpenGroupModal} className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create Lift
        </Button>
      </div>

      <div className="border-b border-slate-200 mb-6">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab('pending')}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'pending' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            <Clock className="w-4 h-4" />
            Pending Action <span className="ml-1 bg-amber-100 text-amber-700 rounded-full px-2 py-0.5 text-xs font-bold">{items.length}</span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'history' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            <HistoryIcon className="w-4 h-4" />
            History / Completed <span className="ml-1 bg-slate-100 text-slate-600 rounded-full px-2 py-0.5 text-xs font-bold">{historyItems.length}</span>
          </button>
        </div>
      </div>

      <Card className="p-0 border-0 shadow-sm ring-1 ring-slate-200 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white">
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <Input className="pl-9 bg-slate-50 border-slate-200" placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
          <Select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="w-48 bg-slate-50 border-slate-200">
            <option value="All">All Types</option>
            <option value="Market">Market (Mkt)</option>
            <option value="Government">Government (Gov)</option>
          </Select>
        </div>

        <div className="overflow-x-auto bg-white">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-slate-600 bg-slate-50 uppercase tracking-wide border-b border-slate-200">
              <tr>
                {activeTab === 'pending' ? (
                  <>
                    <th className="px-6 py-4 font-bold">PO/DO Number</th>
                    <th className="px-6 py-4 font-bold">Vendor / Agency</th>
                    <th className="px-6 py-4 font-bold">Paddy Grade</th>
                    <th className="px-6 py-4 font-bold">Purchase Type</th>
                    <th className="px-6 py-4 font-bold">Total Qty MT</th>
                    <th className="px-6 py-4 font-bold">Lifted MT</th>
                    <th className="px-6 py-4 font-bold text-amber-700">Pending Qty MT</th>
                    <th className="px-6 py-4 font-bold">Lift Progress</th>
                  </>
                ) : (
                  <>
                    <th className="px-6 py-4 font-bold"></th>
                    <th className="px-6 py-4 font-bold">Lift ID</th>
                    <th className="px-6 py-4 font-bold">Lift Date</th>
                    <th className="px-6 py-4 font-bold">Paddy Grade</th>
                    <th className="px-6 py-4 font-bold">Vehicle No</th>
                    <th className="px-6 py-4 font-bold">Driver</th>
                    <th className="px-6 py-4 font-bold">Total Lift Qty MT</th>
                    <th className="px-6 py-4 font-bold">POs Lifted</th>
                    <th className="px-6 py-4 font-bold">Supervisor</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {activeTab === 'pending' && (
                <>
                  {filteredPending.map((item, index) => {
                    const stats = getLiftStats(item);
                    return (
                      <tr key={index} className={getRowClass(item.purchaseType)}>
                        <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'poNumber|poDoNumber|doNumber')}</td>
                        <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'vendorName|agencyName|supplierName')}</td>
                        <td className="px-6 py-4 font-medium text-slate-700">{item.paddyGrade || 'Standard'}</td>
                        <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'purchaseType')}</td>
                        <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'qtyMT')}</td>
                        <td className="px-6 py-4 font-medium text-emerald-600 font-bold">{stats.totalLifted}</td>
                        <td className="px-6 py-4 font-medium text-amber-600 font-bold">{stats.remaining}</td>
                        <td className="px-6 py-4 w-36">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-slate-200 rounded-full h-2">
                              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${Math.min(100, stats.percent)}%` }}></div>
                            </div>
                            <span className="text-xs text-slate-600 font-medium w-10">{stats.percent}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredPending.length === 0 && (
                    <tr><td colSpan="8" className="px-6 py-12 text-center text-slate-500">No pending lift records found</td></tr>
                  )}
                </>
              )}

              {activeTab === 'history' && (
                <>
                  {filteredHistory.map((item, index) => (
                    <React.Fragment key={index}>
                      <tr className={item.isGroupedLift ? getRowClass('Export') : getRowClass(item.purchaseType)}>
                        <td className="px-6 py-4">
                          {item.isGroupedLift && (
                            <button onClick={() => setExpandedHistoryId(expandedHistoryId === item.id ? null : item.id)} className="text-slate-400 hover:text-blue-600 transition-colors">
                              {expandedHistoryId === item.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                            </button>
                          )}
                        </td>
                        <td className="px-6 py-4 font-bold text-slate-800">{getVal(item, 'liftId')}</td>
                        <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'liftDate')?.substring(0,10)}</td>
                        <td className="px-6 py-4 font-medium text-slate-700">{item.paddyGrade || '-'}</td>
                        <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'vehicleNumber')}</td>
                        <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'driverName')}</td>
                        <td className="px-6 py-4 font-bold text-emerald-600">{item.isGroupedLift ? item.totalGroupLiftQtyMT : getVal(item, 'liftQtyMT')}</td>
                        <td className="px-6 py-4">
                          <span className="bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-xs font-bold">
                            {item.isGroupedLift ? (item.items?.length || 0) : 1} POs
                          </span>
                        </td>
                        <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'supervisor')}</td>
                      </tr>
                      {item.isGroupedLift && expandedHistoryId === item.id && (
                        <tr>
                          <td colSpan="9" className="p-0 border-b border-slate-200">
                            <div className="bg-slate-50 p-6 shadow-inner">
                              <h4 className="text-sm font-bold text-slate-700 mb-3">Associated PO/DOs for this Lift</h4>
                              <table className="w-full text-sm bg-white rounded-lg overflow-hidden border border-slate-200">
                                <thead className="bg-slate-100 text-slate-600">
                                  <tr>
                                    <th className="px-4 py-2 font-semibold text-left">PO Number</th>
                                    <th className="px-4 py-2 font-semibold text-left">Vendor</th>
                                    <th className="px-4 py-2 font-semibold text-left">Purchase Type</th>
                                    <th className="px-4 py-2 font-semibold text-right">Lifted MT in this Batch</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                  {item.items?.map((subItem, idx) => (
                                    <tr key={idx}>
                                      <td className="px-4 py-2 font-medium text-slate-800">{subItem.poNumber}</td>
                                      <td className="px-4 py-2 text-slate-600">{subItem.vendorName}</td>
                                      <td className="px-4 py-2 text-slate-600">{subItem.purchaseType}</td>
                                      <td className="px-4 py-2 font-bold text-emerald-600 text-right">{subItem.liftQtyMT} MT</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                  {filteredHistory.length === 0 && (
                    <tr><td colSpan="9" className="px-6 py-12 text-center text-slate-500">No lift history found</td></tr>
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Create Group Lift Modal */}
      <Modal isOpen={isGroupModalOpen} onClose={() => setIsGroupModalOpen(false)} title="Create Group Lift" size="5xl">
        <div className="max-h-[85vh] overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Select Paddy Grade to Filter</Label>
              <Select 
                value={selectedPaddyGrade} 
                onChange={(e) => setSelectedPaddyGrade(e.target.value)}
                className="w-full mt-1.5 bg-white border-slate-300"
              >
                <option value="">-- Select Grade --</option>
                {uniqueGrades.map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Lift ID (Auto)</Label>
              <Input type="text" value={groupedFormData.liftId} readOnly className="w-full mt-1.5 bg-slate-100 border-slate-200 cursor-not-allowed" />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Lift Date</Label>
              <Input type="datetime-local" value={groupedFormData.liftDate} onChange={(e) => setGroupedFormData({...groupedFormData, liftDate: e.target.value})} className="w-full mt-1.5 bg-white border-slate-300" />
            </div>
          </div>

          {selectedPaddyGrade && (
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
                <h3 className="font-semibold text-slate-800">Pending PO/DOs for '{selectedPaddyGrade}'</h3>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-bold">{modalItems.length} Available</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left whitespace-nowrap">
                  <thead className="bg-slate-50 text-slate-600 text-xs uppercase">
                    <tr>
                      <th className="px-4 py-3 font-bold text-center">Action</th>
                      <th className="px-4 py-3 font-bold">PO/DO Number</th>
                      <th className="px-4 py-3 font-bold">Type</th>
                      <th className="px-4 py-3 font-bold">Lifted From</th>
                      <th className="px-4 py-3 font-bold">Total Qty</th>
                      <th className="px-4 py-3 font-bold">Prev Lifted</th>
                      <th className="px-4 py-3 font-bold text-amber-700">Pending MT</th>
                      <th className="px-4 py-3 font-bold text-blue-700">Lift Qty MT</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {modalItems.map((mi, idx) => (
                      <tr key={idx} className={mi._checked ? 'bg-blue-50/30' : ''}>
                        <td className="px-4 py-3 text-center">
                          <input 
                            type="checkbox" 
                            checked={mi._checked}
                            onChange={(e) => handleModalItemChange(idx, '_checked', e.target.checked)}
                            className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                          />
                        </td>
                        <td className="px-4 py-3 font-medium">{getVal(mi, 'poNumber|poDoNumber|doNumber')}</td>
                        <td className="px-4 py-3">{mi.purchaseType}</td>
                        <td className="px-4 py-3">{mi.liftedFrom || '-'}</td>
                        <td className="px-4 py-3">{mi.qtyMT}</td>
                        <td className="px-4 py-3 text-emerald-600">{mi._stats.totalLifted}</td>
                        <td className="px-4 py-3 text-amber-600 font-bold">{mi._stats.remaining}</td>
                        <td className="px-4 py-3">
                          <Input 
                            type="number" 
                            min="0"
                            max={mi._stats.remaining}
                            disabled={!mi._checked}
                            value={mi._liftQtyMT}
                            onChange={(e) => handleModalItemChange(idx, '_liftQtyMT', e.target.value)}
                            placeholder="Qty MT"
                            className={`w-28 text-sm ${mi._checked ? 'border-blue-300 bg-white focus:ring-blue-500 focus:border-blue-500' : 'bg-slate-100 border-slate-200 opacity-50'}`}
                          />
                        </td>
                      </tr>
                    ))}
                    {modalItems.length === 0 && (
                      <tr><td colSpan="8" className="px-4 py-8 text-center text-slate-500">No pending items for this grade.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Vehicle Number</Label>
              <Input type="text" value={groupedFormData.vehicleNumber} onChange={(e) => setGroupedFormData({...groupedFormData, vehicleNumber: e.target.value})} className="w-full mt-1.5 bg-white border-slate-300" />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Driver Name</Label>
              <Input type="text" value={groupedFormData.driverName} onChange={(e) => setGroupedFormData({...groupedFormData, driverName: e.target.value})} className="w-full mt-1.5 bg-white border-slate-300" />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Supervisor</Label>
              <Input type="text" value={groupedFormData.supervisor} onChange={(e) => setGroupedFormData({...groupedFormData, supervisor: e.target.value})} className="w-full mt-1.5 bg-white border-slate-300" />
            </div>
            <div className="space-y-1 md:col-span-3">
              <Label className="text-sm font-medium text-slate-700">Remarks</Label>
              <Input type="text" value={groupedFormData.remarks} onChange={(e) => setGroupedFormData({...groupedFormData, remarks: e.target.value})} className="w-full mt-1.5 bg-white border-slate-300" placeholder="Any additional notes..." />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-slate-100">
            <Button onClick={() => setIsGroupModalOpen(false)} variant="outline" className="px-6">Cancel</Button>
            <Button onClick={handleGroupSave} className="px-6 bg-blue-600 hover:bg-blue-700 text-white shadow-sm" disabled={!selectedPaddyGrade || modalItems.filter(i => i._checked).length === 0}>
              Save Lift
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
