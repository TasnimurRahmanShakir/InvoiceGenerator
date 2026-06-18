"use client";

import { Text, View, StyleSheet } from "@react-pdf/renderer";
import type { PaymentMethodRow } from "@/lib/types";

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 8,
  },
  title: {
    fontSize: 11,
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
    backgroundColor: "#0a2351",
    borderRight: "0.5pt solid #0a2351",
    borderBottom: "0.5pt solid #0a2351",
  },
  headerCellWide: {
    width: "70%",
    paddingVertical: 5,
    paddingHorizontal: 6,
    backgroundColor: "#0a2351",
    borderRight: "0.5pt solid #0a2351",
    borderBottom: "0.5pt solid #0a2351",
  },
  headerText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
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
    fontSize: 10,
    color: "#424242",
  },
  detailRow: {
    flexDirection: "row",
    gap: 4,
    marginBottom: 1,
  },
  detailLabel: {
    fontSize: 10,
    color: "#525252",
    width: 80,
  },
  detailValue: {
    fontSize: 10,
    color: "#171717",
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
            <View style={[styles.dataCell, { backgroundColor: i % 2 === 1 ? "#F8F9FA" : "#FFFFFF" }]}>
              <Text style={styles.dataText}>{row.method}</Text>
            </View>
            <View style={[styles.dataCellWide, { backgroundColor: i % 2 === 1 ? "#F8F9FA" : "#FFFFFF" }]}>
              {row.details.split("\n").map((line, li) => {
                const sepIdx = line.indexOf(": ");
                if (sepIdx !== -1) {
                  const label = line.slice(0, sepIdx);
                  const value = line.slice(sepIdx + 2);
                  return (
                    <View key={li} style={styles.detailRow}>
                      <Text style={styles.detailLabel}>{label}</Text>
                      <Text style={styles.detailValue}>: {value}</Text>
                    </View>
                  );
                }
                return (
                  <Text key={li} style={styles.dataText}>{line}</Text>
                );
              })}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
