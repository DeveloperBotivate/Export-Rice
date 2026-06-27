import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './layouts/DashboardLayout';

import { DashboardPage } from './modules/dashboard/DashboardPage';
import { LoginPage } from './modules/auth/LoginPage';
import { ProcurementPlanning } from './modules/procurement/ProcurementPlanning';
import { ProcurementList } from './modules/procurement/ProcurementList';
import { ProcurementApproval } from './modules/procurement/ProcurementApproval';
import { MandiSelection } from './modules/procurement/MandiSelection';
import { MarketPrice } from './modules/procurement/MarketPrice';
import { GovernmentMSP } from './modules/procurement/GovernmentMSP';
import { LabQuality } from './modules/procurement/LabQuality';
import { FinalApproval } from './modules/procurement/FinalApproval';
import { TransportationCost } from './modules/procurement/TransportationCost';
import { PurchaseRequirement } from './modules/procurement/PurchaseRequirement';
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
import { OrderReceive } from './modules/sales/OrderReceive';
import { SentQuotation } from './modules/sales/SentQuotation';
import { OrderFollowUp } from './modules/sales/OrderFollowUp';
import { OrderApproval } from './modules/sales/OrderApproval';
import { OrderCompletion } from './modules/sales/OrderCompletion';
import { ExportContract } from './modules/export/ExportContract';
import { PackingList } from './modules/export/PackingList';
import { ContainerBooking } from './modules/export/ContainerBooking';
import { ContainerLoading } from './modules/export/ContainerLoading';
import { ShippingLine } from './modules/export/ShippingLine';
import { ShippingBill } from './modules/export/ShippingBill';
import { BillOfLading } from './modules/export/BillOfLading';
import { CertificateOfOrigin } from './modules/export/CertificateOfOrigin';
import { ExportDocumentation } from './modules/export/ExportDocumentation';
import { ExportPayment } from './modules/export/ExportPayment';

import { DispatchOrder } from './modules/dispatch/DispatchOrder';
import { StockReservation } from './modules/dispatch/StockReservation';
import { PickingList } from './modules/dispatch/PickingList';
import { Loading } from './modules/dispatch/Loading';
import { VehicleAssignment as DispatchVehicleAssignment } from './modules/dispatch/VehicleAssignment';
import { DispatchWeight } from './modules/dispatch/DispatchWeight';
import { DeliveryChallan } from './modules/dispatch/DeliveryChallan';
import { Invoice } from './modules/dispatch/Invoice';
import { GatePass } from './modules/dispatch/GatePass';
import { EWayBill } from './modules/dispatch/EWayBill';
import { POD } from './modules/dispatch/POD';
import { DeliveryConfirmation } from './modules/dispatch/DeliveryConfirmation';

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
import { ActualProduction } from './modules/production/ActualProduction';
import { PaddyCleaning } from './modules/production/PaddyCleaning';
import { Dehusking } from './modules/production/Dehusking';
import { Separation } from './modules/production/Separation';
import { Polishing } from './modules/production/Polishing';
import { Grading } from './modules/production/Grading';
import { ColorSorting } from './modules/production/ColorSorting';
import { ExpectedVsActual } from './modules/production/ExpectedVsActual';
import { PackingOrder } from './modules/packing/PackingOrder';
import { BagSelection } from './modules/packing/BagSelection';
import { Barcode } from './modules/packing/Barcode';
import { QRCodeStage } from './modules/packing/QRCodeStage';
import { BatchNumber } from './modules/packing/BatchNumber';
import { LotNumber } from './modules/packing/LotNumber';
import { WeightVerification } from './modules/packing/WeightVerification';
import { PackingQC } from './modules/packing/PackingQC';
import { FinishedGoodsInventory } from './modules/packing/FinishedGoodsInventory';
import { PurchaseRequest } from './modules/purchase/PurchaseRequest';
import { PurchaseOrder } from './modules/purchase/PurchaseOrder';
import { AgentAssignment } from './modules/purchase/AgentAssignment';
import { VehicleAssignment } from './modules/purchase/VehicleAssignment';
import { MandiSelectionPurchase } from './modules/purchase/MandiSelectionPurchase';
import { PurchaseChallan } from './modules/purchase/PurchaseChallan';
import { GateEntryPurchase } from './modules/purchase/GateEntryPurchase';
import { GrossWeight } from './modules/purchase/GrossWeight';
import { PurchaseClosure } from './modules/purchase/PurchaseClosure';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          
          <Route path="procurement-planning" element={<ProcurementPlanning />} />
          <Route path="procurement" element={<ProcurementList />} />
          <Route path="procurement-approval" element={<ProcurementApproval />} />
          <Route path="mandi-selection" element={<MandiSelection />} />
          <Route path="market-price" element={<MarketPrice />} />
          <Route path="government-msp" element={<GovernmentMSP />} />
          <Route path="lab-quality" element={<LabQuality />} />
          <Route path="final-approval" element={<FinalApproval />} />
          <Route path="transportation-cost" element={<TransportationCost />} />
          <Route path="purchase-requirement" element={<PurchaseRequirement />} />
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
          <Route path="actual-production" element={<ActualProduction />} />
          <Route path="paddy-cleaning" element={<PaddyCleaning />} />
          <Route path="dehusking" element={<Dehusking />} />
          <Route path="separation" element={<Separation />} />
          <Route path="polishing" element={<Polishing />} />
          <Route path="grading" element={<Grading />} />
          <Route path="color-sorting" element={<ColorSorting />} />
          <Route path="expected-vs-actual" element={<ExpectedVsActual />} />

          <Route path="packing-order" element={<PackingOrder />} />
          <Route path="bag-selection" element={<BagSelection />} />
          <Route path="barcode" element={<Barcode />} />
          <Route path="qrcode" element={<QRCodeStage />} />
          <Route path="batch-number" element={<BatchNumber />} />
          <Route path="lot-number" element={<LotNumber />} />
          <Route path="weight-verification" element={<WeightVerification />} />
          <Route path="packing-qc" element={<PackingQC />} />
          <Route path="finished-goods" element={<FinishedGoodsInventory />} />
          
          <Route path="purchase-request" element={<PurchaseRequest />} />
          <Route path="purchase-order" element={<PurchaseOrder />} />
          <Route path="agent-assignment" element={<AgentAssignment />} />
          <Route path="vehicle-assignment" element={<VehicleAssignment />} />
          <Route path="mandi-selection-purchase" element={<MandiSelectionPurchase />} />
          <Route path="purchase-challan" element={<PurchaseChallan />} />
          <Route path="gate-entry-purchase" element={<GateEntryPurchase />} />
          <Route path="gross-weight" element={<GrossWeight />} />
          <Route path="purchase-closure" element={<PurchaseClosure />} />
          <Route path="order-receive" element={<OrderReceive />} />
          <Route path="sent-quotation" element={<SentQuotation />} />
          <Route path="order-follow-up" element={<OrderFollowUp />} />
          <Route path="order-approval" element={<OrderApproval />} />
          <Route path="order-completion" element={<OrderCompletion />} />
          
          <Route path="export-contract" element={<ExportContract />} />
          <Route path="packing-list" element={<PackingList />} />
          <Route path="container-booking" element={<ContainerBooking />} />
          <Route path="container-loading" element={<ContainerLoading />} />
          <Route path="shipping-line" element={<ShippingLine />} />
          <Route path="shipping-bill" element={<ShippingBill />} />
          <Route path="bill-of-lading" element={<BillOfLading />} />
          <Route path="certificate-of-origin" element={<CertificateOfOrigin />} />
          <Route path="export-documentation" element={<ExportDocumentation />} />
          <Route path="export-payment" element={<ExportPayment />} />
          
          <Route path="dispatch-order" element={<DispatchOrder />} />
          <Route path="stock-reservation" element={<StockReservation />} />
          <Route path="picking-list" element={<PickingList />} />
          <Route path="loading" element={<Loading />} />
          <Route path="vehicle-assignment-dispatch" element={<DispatchVehicleAssignment />} />
          <Route path="dispatch-weight" element={<DispatchWeight />} />
          <Route path="delivery-challan" element={<DeliveryChallan />} />
          <Route path="invoice" element={<Invoice />} />
          <Route path="gate-pass" element={<GatePass />} />
          <Route path="e-way-bill" element={<EWayBill />} />
          <Route path="pod" element={<POD />} />
          <Route path="delivery-confirmation" element={<DeliveryConfirmation />} />

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
