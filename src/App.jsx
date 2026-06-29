import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './layouts/DashboardLayout';
import { ProtectedRoute } from './components/ProtectedRoute';

import { DashboardPage } from './modules/dashboard/DashboardPage';
import { LoginPage } from './modules/auth/LoginPage';
import { PurchaseRequirement } from './modules/purchase/PurchaseRequirement';
import { SourceSelection } from './modules/purchase/SourceSelection';
import { PurchaseApproval } from './modules/purchase/PurchaseApproval';
import { CreatePODO } from './modules/purchase/CreatePODO';
import { ArrangeLogistics as PurchaseArrangeLogistics } from './modules/purchase/ArrangeLogistics';
import { SourceEntry } from './modules/purchase/SourceEntry';
import { AdvancePayment } from './modules/purchase/AdvancePayment';
import { Lift } from './modules/purchase/Lift';
import { Weighment } from './modules/purchase/Weighment';
import { MaterialReceipt } from './modules/purchase/MaterialReceipt';
import { LaboratoryReport } from './modules/purchase/LaboratoryReport';
import { AccountsVerification } from './modules/purchase/AccountsVerification';
import { FullKitting } from './modules/purchase/FullKitting';
import { PurchaseClosure } from './modules/purchase/PurchaseClosure';
import { Target } from './modules/target/Target';
import { Finance } from './modules/finance/Finance';
import { Master } from './modules/master/Master';
import { CompaniesMaster } from './modules/master/CompaniesMaster';
import { BranchesMaster } from './modules/master/BranchesMaster';
import { AgentsMaster } from './modules/master/AgentsMaster';
import { TransportMaster } from './modules/master/TransportMaster';
import { VehicalMaster } from './modules/master/VehicalMaster';
import { EmployeeMaster } from './modules/master/EmployeeMaster';
import { CustomerMaster } from './modules/master/CustomerMaster';
import { SalesOrder } from './modules/dispatch/SalesOrder';
import { OrderApproval } from './modules/dispatch/OrderApproval';
import { StockAvailabilityCheck } from './modules/dispatch/StockAvailabilityCheck';
import { StockReservation } from './modules/dispatch/StockReservation';
import { DispatchPlanning } from './modules/dispatch/DispatchPlanning';
import { PackingInstruction } from './modules/dispatch/PackingInstruction';
import { QualityClearance } from './modules/dispatch/QualityClearance';
import { DispatchOrderStage } from './modules/dispatch/DispatchOrderStage';
import { VehicleAllocation } from './modules/dispatch/VehicleAllocation';
import { Loading } from './modules/dispatch/Loading';
import { FinalWeighment } from './modules/dispatch/FinalWeighment';
import { DispatchDocuments } from './modules/dispatch/DispatchDocuments';
import { GatePass } from './modules/dispatch/GatePass';
import { DispatchConfirmation } from './modules/dispatch/DispatchConfirmation';
import { BillingAndClosure } from './modules/dispatch/BillingAndClosure';

import { AccountsReceivable } from './modules/finance/AccountsReceivable';
import { AccountsPayable } from './modules/finance/AccountsPayable';
import { VendorPayments } from './modules/finance/VendorPayments';
import { TransporterPayments } from './modules/finance/TransporterPayments';
import { AgentCommission } from './modules/finance/AgentCommission';
import { SalesCommission } from './modules/finance/SalesCommission';
import { PurchaseCommission } from './modules/finance/PurchaseCommission';
import { BrokerCommission } from './modules/finance/BrokerCommission';
import { ExportPaymentTracking } from './modules/finance/ExportPaymentTracking';
import { DomesticPaymentTracking } from './modules/finance/DomesticPaymentTracking';
import { ProfitAndLoss } from './modules/finance/ProfitAndLoss';
import { BankReconciliation } from './modules/finance/BankReconciliation';

import { DocumentManagement } from './modules/reports/DocumentManagement';
import { Reporting } from './modules/reports/Reporting';
import { Traceability } from './modules/reports/Traceability';

import { RiceGrades } from './modules/master/RiceGrades';
import { InventoryLedger } from './modules/inventory/InventoryLedger';
import { ProductionPlanning } from './modules/production/ProductionPlanning';
import { ProductionOrder } from './modules/production/ProductionOrder';
import { BatchCreation } from './modules/production/BatchCreation';
import { RawMaterialIssue } from './modules/production/RawMaterialIssue';
import { PreQC } from './modules/production/PreQC';
import { PaddyCleaning } from './modules/production/PaddyCleaning';
import { Dehusking } from './modules/production/Dehusking';
import { Separation } from './modules/production/Separation';
import { Polishing } from './modules/production/Polishing';
import { Grading } from './modules/production/Grading';
import { ColorSorting } from './modules/production/ColorSorting';
import { FinalQC } from './modules/production/FinalQC';
import { YieldCalculation } from './modules/production/YieldCalculation';
import { FinishedGoodsEntry } from './modules/production/FinishedGoodsEntry';
import { Packing } from './modules/production/Packing';
import { FGWarehouseEntry } from './modules/production/FGWarehouseEntry';
import { ProductionClosure } from './modules/production/ProductionClosure';
// Purchase imports consolidated above

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route index element={<DashboardPage />} />
          
          {/* Legacy procurement routes removed */}
          <Route path="targets" element={<Target />} />
          
          <Route path="finance" element={<Finance />} />
          
          <Route path="master">
            <Route index element={<Master />} />
            <Route path="companies" element={<CompaniesMaster />} />
            <Route path="branches" element={<BranchesMaster />} />
            <Route path="agents" element={<AgentsMaster />} />
            <Route path="transport" element={<TransportMaster />} />
            <Route path="vehical" element={<VehicalMaster />} />
            <Route path="employee" element={<EmployeeMaster />} />
            <Route path="customer" element={<CustomerMaster />} />
            <Route path="rice-grades" element={<RiceGrades />} />
          </Route>
          
          <Route path="production-planning" element={<ProductionPlanning />} />
          <Route path="production-order" element={<ProductionOrder />} />
          <Route path="batch-creation" element={<BatchCreation />} />
          <Route path="raw-material-issue" element={<RawMaterialIssue />} />
          <Route path="pre-qc" element={<PreQC />} />
          <Route path="paddy-cleaning" element={<PaddyCleaning />} />
          <Route path="dehusking" element={<Dehusking />} />
          <Route path="separation" element={<Separation />} />
          <Route path="polishing" element={<Polishing />} />
          <Route path="grading" element={<Grading />} />
          <Route path="color-sorting" element={<ColorSorting />} />
          <Route path="final-qc" element={<FinalQC />} />
          <Route path="yield-calculation" element={<YieldCalculation />} />
          <Route path="finished-goods-entry" element={<FinishedGoodsEntry />} />
          <Route path="packing" element={<Packing />} />
          <Route path="fg-warehouse-entry" element={<FGWarehouseEntry />} />
          <Route path="production-closure" element={<ProductionClosure />} />
          
          <Route path="purchase-requirement" element={<PurchaseRequirement />} />
          <Route path="source-selection" element={<SourceSelection />} />
          <Route path="purchase-approval" element={<PurchaseApproval />} />
          <Route path="po-do-entry" element={<CreatePODO />} />
          <Route path="arrange-logistics-purchase" element={<PurchaseArrangeLogistics />} />
          <Route path="source-entry" element={<SourceEntry />} />
          <Route path="advance-payment" element={<AdvancePayment />} />
          <Route path="lift" element={<Lift />} />
          <Route path="weighment" element={<Weighment />} />
          <Route path="material-receipt" element={<MaterialReceipt />} />
          <Route path="laboratory-report" element={<LaboratoryReport />} />
          <Route path="accounts-verification" element={<AccountsVerification />} />
          <Route path="full-kitting" element={<FullKitting />} />
          <Route path="purchase-closure" element={<PurchaseClosure />} />
          <Route path="sales-order" element={<SalesOrder />} />
          <Route path="order-approval" element={<OrderApproval />} />
          <Route path="stock-availability-check" element={<StockAvailabilityCheck />} />
          <Route path="stock-reservation" element={<StockReservation />} />
          <Route path="dispatch-planning" element={<DispatchPlanning />} />
          <Route path="packing-instruction" element={<PackingInstruction />} />
          <Route path="quality-clearance" element={<QualityClearance />} />
          <Route path="dispatch-order" element={<DispatchOrderStage />} />
          <Route path="vehicle-allocation" element={<VehicleAllocation />} />
          <Route path="loading" element={<Loading />} />
          <Route path="final-weighment" element={<FinalWeighment />} />
          <Route path="dispatch-documents" element={<DispatchDocuments />} />
          <Route path="gate-pass" element={<GatePass />} />
          <Route path="dispatch-confirmation" element={<DispatchConfirmation />} />
          <Route path="billing-closure" element={<BillingAndClosure />} />

          <Route path="accounts-receivable" element={<AccountsReceivable />} />
          <Route path="accounts-payable" element={<AccountsPayable />} />
          <Route path="vendor-payments" element={<VendorPayments />} />
          <Route path="transporter-payments" element={<TransporterPayments />} />
          <Route path="agent-commission" element={<AgentCommission />} />
          <Route path="sales-commission" element={<SalesCommission />} />
          <Route path="purchase-commission" element={<PurchaseCommission />} />
          <Route path="broker-commission" element={<BrokerCommission />} />
          <Route path="export-payment-tracking" element={<ExportPaymentTracking />} />
          <Route path="domestic-payment-tracking" element={<DomesticPaymentTracking />} />
          <Route path="profit-and-loss" element={<ProfitAndLoss />} />
          <Route path="bank-reconciliation" element={<BankReconciliation />} />
          
          <Route path="inventory" element={<InventoryLedger />} />

          <Route path="documents" element={<DocumentManagement />} />
          <Route path="reports" element={<Reporting />} />
          <Route path="traceability" element={<Traceability />} />

          <Route path="*" element={<div className="p-6">404 - Module Not Found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
