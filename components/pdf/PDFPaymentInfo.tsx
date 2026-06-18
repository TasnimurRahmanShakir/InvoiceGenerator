"use client";

import { Text, View, StyleSheet } from "@react-pdf/renderer";
import type { PaymentMethodRow } from "@/lib/types";

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 8,
  },
  title: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#0a2351",
    marginBottom: 6,
  },
  table: {
    borderTop: "0.5pt solid #DEE2E6",
    borderLeft: "0.5pt solid #DEE2E6",
  },
  row: {
    flexDirection: "row",
  },
  headerCell: {
    width: "30%",
    paddingVertical: 5,
    paddingHorizontal: 6,
    backgroundColor: "#F5F5F5",
    borderRight: "0.5pt solid #DEE2E6",
    borderBottom: "0.5pt solid #DEE2E6",
  },
  headerCellWide: {
    width: "70%",
    paddingVertical: 5,
    paddingHorizontal: 6,
    backgroundColor: "#F5F5F5",
    borderRight: "0.5pt solid #DEE2E6",
    borderBottom: "0.5pt solid #DEE2E6",
  },
  headerText: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#212121",
  },
  dataCell: {
    width: "30%",
    paddingVertical: 5,
    paddingHorizontal: 6,
    borderRight: "0.5pt solid #DEE2E6",
    borderBottom: "0.5pt solid #DEE2E6",
  },
  dataCellWide: {
    width: "70%",
    paddingVertical: 5,
    paddingHorizontal: 6,
    borderRight: "0.5pt solid #DEE2E6",
    borderBottom: "0.5pt solid #DEE2E6",
  },
  dataText: {
    fontSize: 9,
    color: "#424242",
  },
});

export default function PDFPaymentInfo({
  paymentInfo,
}: {
  paymentInfo: PaymentMethodRow[];
}) {
  if (!paymentInfo || paymentInfo.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Information</Text>
      <View style={styles.table}>
        <View style={styles.row}>
          <View style={styles.headerCell}>
            <Text style={styles.headerText}>Payment Method</Text>
          </View>
          <View style={styles.headerCellWide}>
            <Text style={styles.headerText}>Account Details</Text>
          </View>
        </View>
        {paymentInfo.map((row, i) => (
          <View style={styles.row} key={i}>
            <View style={styles.dataCell}>
              <Text style={styles.dataText}>{row.method}</Text>
            </View>
            <View style={styles.dataCellWide}>
              <Text style={styles.dataText}>{row.details}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
