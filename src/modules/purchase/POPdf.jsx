import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 10, fontFamily: 'Helvetica' },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#e2e8f0', paddingBottom: 10 },
  companyInfo: { flexDirection: 'column' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#1e293b', marginBottom: 4 },
  subtitle: { fontSize: 10, color: '#64748b' },
  poTitle: { fontSize: 16, fontWeight: 'bold', color: '#3b82f6', textTransform: 'uppercase' },
  section: { marginBottom: 15 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  label: { width: 100, color: '#64748b', fontSize: 9, textTransform: 'uppercase' },
  value: { flex: 1, color: '#1e293b', fontWeight: 'bold', fontSize: 10 },
  table: { width: '100%', marginTop: 10, borderStyle: 'solid', borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 4 },
  tableHeader: { flexDirection: 'row', backgroundColor: '#f8fafc', borderBottomWidth: 1, borderBottomColor: '#e2e8f0', padding: 6 },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#e2e8f0', padding: 6 },
  colSno: { width: '5%', textAlign: 'center' },
  colItem: { width: '40%' },
  colQty: { width: '15%', textAlign: 'center' },
  colRate: { width: '15%', textAlign: 'right' },
  colTotal: { width: '25%', textAlign: 'right' },
  headerText: { fontSize: 9, fontWeight: 'bold', color: '#475569' },
  cellText: { fontSize: 9, color: '#1e293b' },
  summary: { marginTop: 15, alignSelf: 'flex-end', width: '40%' },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  summaryLabel: { fontSize: 9, color: '#64748b' },
  summaryValue: { fontSize: 10, color: '#1e293b', fontWeight: 'bold' },
  grandTotal: { borderTopWidth: 1, borderTopColor: '#e2e8f0', paddingTop: 4, marginTop: 4, color: '#2563eb' },
  terms: { marginTop: 20 },
  termsTitle: { fontSize: 10, fontWeight: 'bold', color: '#475569', marginBottom: 5, borderBottomWidth: 1, borderBottomColor: '#e2e8f0', paddingBottom: 2 },
  termText: { fontSize: 9, color: '#64748b', marginBottom: 2 },
  signatures: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 40, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#e2e8f0' },
  sigBlock: { alignItems: 'center' },
  sigName: { fontSize: 10, fontWeight: 'bold', color: '#1e293b' },
  sigTitle: { fontSize: 9, color: '#64748b' },
});

const POPdf = ({
  companyName, companyAddress, companyPhone, companyEmail, companyGstin,
  supplierName, supplierAddress, supplierGstin, supplierEmail,
  poNumber, poDate, deliveryDate,
  items, subtotal, totalGst, totalAmount, terms, preparedBy, approvedBy
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.companyInfo}>
          <Text style={styles.title}>{companyName}</Text>
          <Text style={styles.subtitle}>{companyAddress}</Text>
          <Text style={styles.subtitle}>Ph: {companyPhone} | Email: {companyEmail}</Text>
          <Text style={styles.subtitle}>GSTIN: {companyGstin}</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.poTitle}>Purchase Order</Text>
          <Text style={[styles.subtitle, { marginTop: 4 }]}>PO No: <Text style={{ color: '#1e293b' }}>{poNumber}</Text></Text>
          <Text style={styles.subtitle}>Date: <Text style={{ color: '#1e293b' }}>{poDate}</Text></Text>
        </View>
      </View>

      {/* Supplier & Delivery */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
        <View style={{ width: '48%' }}>
          <Text style={[styles.termsTitle, { borderBottomWidth: 0 }]}>To (Supplier):</Text>
          <Text style={styles.value}>{supplierName}</Text>
          <Text style={styles.subtitle}>{supplierAddress}</Text>
          <Text style={styles.subtitle}>GSTIN: {supplierGstin}</Text>
        </View>
        <View style={{ width: '48%' }}>
          <Text style={[styles.termsTitle, { borderBottomWidth: 0 }]}>Delivery Details:</Text>
          <Text style={styles.subtitle}>Expected By: {deliveryDate}</Text>
        </View>
      </View>

      {/* Items Table */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.headerText, styles.colSno]}>#</Text>
          <Text style={[styles.headerText, styles.colItem]}>Item Description</Text>
          <Text style={[styles.headerText, styles.colQty]}>Qty (MT)</Text>
          <Text style={[styles.headerText, styles.colRate]}>Rate (₹)</Text>
          <Text style={[styles.headerText, styles.colTotal]}>Amount (₹)</Text>
        </View>
        {items?.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={[styles.cellText, styles.colSno]}>{index + 1}</Text>
            <View style={styles.colItem}>
              <Text style={[styles.cellText, { fontWeight: 'bold' }]}>{item.product}</Text>
              <Text style={[styles.cellText, { color: '#64748b', fontSize: 8 }]}>Indent: {item.internalCode}</Text>
            </View>
            <Text style={[styles.cellText, styles.colQty]}>{item.qty}</Text>
            <Text style={[styles.cellText, styles.colRate]}>{Number(item.rate).toLocaleString('en-IN')}</Text>
            <Text style={[styles.cellText, styles.colTotal]}>{Number(item.amount).toLocaleString('en-IN')}</Text>
          </View>
        ))}
      </View>

      {/* Summary */}
      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>₹{Number(subtotal).toLocaleString('en-IN')}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total GST</Text>
          <Text style={styles.summaryValue}>₹{Number(totalGst).toLocaleString('en-IN')}</Text>
        </View>
        <View style={[styles.summaryRow, styles.grandTotal]}>
          <Text style={[styles.summaryLabel, { color: '#2563eb', fontWeight: 'bold' }]}>Grand Total</Text>
          <Text style={styles.summaryValue}>₹{Number(totalAmount).toLocaleString('en-IN')}</Text>
        </View>
      </View>

      {/* Terms */}
      <View style={styles.terms}>
        <Text style={styles.termsTitle}>Terms & Conditions</Text>
        {terms?.map((term, index) => (
          <Text key={index} style={styles.termText}>{term.text}</Text>
        ))}
      </View>

      {/* Signatures */}
      <View style={styles.signatures}>
        <View style={styles.sigBlock}>
          <Text style={styles.sigName}>{preparedBy}</Text>
          <Text style={styles.sigTitle}>Prepared By</Text>
        </View>
        <View style={styles.sigBlock}>
          <Text style={styles.sigName}>{approvedBy || 'Director'}</Text>
          <Text style={styles.sigTitle}>Authorized Signatory</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default POPdf;
