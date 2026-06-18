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
    fontSize: 10,
    color: "#424242",
  },
  pageFooter: {
    position: "absolute",
    bottom: 12,
    left: 58,
    right: 58,
    paddingTop: 4,
    borderTopWidth: 1.5,
    borderTopColor: "#DEE2E6",
    borderTopStyle: "solid",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    fontSize: 9,
    color: "#757575",
  },
  footerInfo: {
    flexDirection: "row",
    gap: 4,
  },
  footerPageNum: {
    textAlign: "right",
  },
  contentWrap: {
    flexGrow: 1,
  },
  signatureRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signatureBlock: {
    width: 160,
    alignItems: "center",
    paddingTop: 10,
  },
  signatureLine: {
    width: "60%",
    borderBottom: "1pt solid #424242",
    marginBottom: 4,
  },
  signatureLabel: {
    fontSize: 10,
    color: "#424242",
    textAlign: "center",
  },
  signatureName: {
    fontSize: 10,
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

        <View style={styles.pageFooter} fixed>
          <View style={styles.footerInfo}>
            {data.header.address ? <Text>{data.header.address}</Text> : null}
            {data.header.address && data.header.mobile ? <Text>|</Text> : null}
            {data.header.mobile ? <Text>Mobile: {data.header.mobile}</Text> : null}
          </View>
          <Text style={styles.footerPageNum} render={({ pageNumber, totalPages }) => (
            `Page ${pageNumber} of ${totalPages}`
          )} />
        </View>
      </Page>
    </Document>
  );
}
