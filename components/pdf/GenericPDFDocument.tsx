"use client";

import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { ReportTableData } from "@/lib/types";
import PDFHeader from "./PDFHeader";
import PDFStudentInfo from "./PDFStudentInfo";
import PDFTable from "./PDFTable";
import PDFFooter from "./PDFFooter";

const styles = StyleSheet.create({
  page: {
    paddingLeft: 58,
    paddingRight: 58,
    paddingTop: 72,
    paddingBottom: 36,
    fontFamily: "Helvetica",
    fontSize: 9,
    color: "#424242",
  },
  pageFooter: {
    position: "absolute",
    bottom: 12,
    left: 58,
    right: 58,
    textAlign: "center",
    fontSize: 8,
    color: "#757575",
  },
  contentWrap: {
    flexGrow: 1,
  },
  signatureRow: {
    flexDirection: "row",
  },
  signatureBlock: {
    flex: 1,
    alignItems: "center",
    paddingTop: 10,
  },
  signatureLine: {
    width: "60%",
    borderBottom: "1pt solid #424242",
    marginBottom: 4,
  },
  signatureLabel: {
    fontSize: 9,
    color: "#424242",
    textAlign: "center",
  },
  signatureName: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#212121",
    textAlign: "center",
  },
});

export default function GenericPDFDocument({
  reportTableData: data,
}: {
  reportTableData: ReportTableData;
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.contentWrap}>
          <PDFHeader header={data.header} />

          {data.studentInfo ? <PDFStudentInfo studentInfo={data.studentInfo} /> : null}

          <View style={{ height: 8 }} />

          <PDFTable columns={data.columns} rows={data.rows} />

          <PDFFooter footer={data.footer} />
        </View>

        {data.footer.signatures.length > 0 ? (
          <View style={styles.signatureRow}>
            {data.footer.signatures.map((sig, i) => (
              <View key={i} style={styles.signatureBlock}>
                <View style={styles.signatureLine} />
                <Text style={styles.signatureLabel}>{sig.label}</Text>
                {sig.name ? <Text style={styles.signatureName}>{sig.name}</Text> : null}
              </View>
            ))}
          </View>
        ) : null}

        <Text style={styles.pageFooter} render={({ pageNumber, totalPages }) => (
          `Page ${pageNumber} of ${totalPages} | Aevitas - Invoice`
        )} fixed />
      </Page>
    </Document>
  );
}
