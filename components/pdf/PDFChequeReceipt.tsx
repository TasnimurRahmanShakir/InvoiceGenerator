"use client";

import { Document, Page, View, Text, Image, StyleSheet } from "@react-pdf/renderer";
import { MoneyReceiptFormState } from "@/lib/types";
import { numberToWords } from "@/lib/utils";

const styles = StyleSheet.create({
  page: {
    paddingLeft: 48,
    paddingRight: 48,
    paddingTop: 48,
    paddingBottom: 28,
    fontFamily: "Helvetica",
    fontSize: 7.5,
    color: "#424242",
  },
  half: {
    flex: 1,
    justifyContent: "flex-start",
  },
  receiptBorder: {
    border: "1pt solid #a3a3a3",
    padding: 10,
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  logoBox: {
    width: 36,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  logoImg: {
    width: 36,
    height: 28,
    objectFit: "contain",
  },
  hdrCenter: {
    flex: 1,
  },
  companyName: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#0a2351",
    textAlign: "center",
  },
  tagline: {
    fontSize: 6.5,
    color: "#737373",
    textAlign: "center",
  },
  hdrRight: {
    alignItems: "flex-end",
  },
  hdrLabel: {
    fontSize: 6.5,
    color: "#737373",
  },
  hdrValue: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    color: "#171717",
    marginBottom: 1,
  },
  title: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#0a2351",
    textAlign: "center",
    marginBottom: 6,
  },
  copyLabel: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    color: "#0a2351",
    textAlign: "center",
    marginBottom: 4,
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  chequeBox: {
    border: "1pt solid #171717",
    padding: 8,
    marginBottom: 6,
  },
  payRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  payLabel: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#171717",
    marginRight: 6,
  },
  payName: {
    fontSize: 8,
    color: "#171717",
    borderBottom: "1pt solid #171717",
    flex: 1,
    paddingBottom: 1,
  },
  amountRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  sumLabel: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#171717",
    marginRight: 6,
  },
  sumValue: {
    fontSize: 8,
    color: "#171717",
    borderBottom: "1pt solid #171717",
    flex: 1,
    paddingBottom: 1,
  },
  amountBox: {
    border: "1pt solid #171717",
    padding: "3 7",
    marginLeft: 8,
    minWidth: 70,
    alignItems: "center",
  },
  amountBoxText: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#171717",
  },
  takaOnly: {
    fontSize: 7,
    color: "#424242",
    textAlign: "right",
    marginBottom: 6,
  },
  innerDivider: {
    borderBottom: "1pt solid #d4d4d4",
    marginVertical: 5,
  },
  infoRow: {
    flexDirection: "row",
    gap: 3,
    marginBottom: 1,
    fontSize: 7,
    color: "#424242",
  },
  infoValue: {
    fontFamily: "Helvetica-Bold",
    color: "#171717",
  },
  sectionLabel: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    color: "#0a2351",
    marginBottom: 3,
  },
  methodRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  checkMark: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#0a2351",
    width: 14,
  },
  methodName: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    color: "#171717",
    width: 60,
  },
  methodDetails: {
    fontSize: 7,
    color: "#525252",
    flex: 1,
  },
  sigRow: {
    flexDirection: "row",
    marginTop: "auto",
    paddingTop: 4,
  },
  sigBlock: {
    flex: 1,
    alignItems: "center",
    paddingTop: 4,
  },
  sigLine: {
    width: "60%",
    borderBottom: "1pt solid #424242",
    marginBottom: 2,
  },
  sigLabel: {
    fontSize: 7,
    color: "#424242",
    textAlign: "center",
  },
  cutLine: {
    borderBottom: "1pt dashed #9ca3af",
    marginVertical: 8,
    textAlign: "center",
  },
  cutText: {
    fontSize: 6,
    color: "#9ca3af",
    textAlign: "center",
    marginTop: -9,
  },
  pageFooter: {
    position: "absolute",
    bottom: 10,
    left: 48,
    right: 48,
    textAlign: "center",
    fontSize: 6.5,
    color: "#9ca3af",
  },
});

interface Props {
  formState: MoneyReceiptFormState;
}

function ReceiptHalf({ formState, copyLabel }: Props & { copyLabel: string }) {
  const inWords = formState.amount > 0 ? numberToWords(formState.amount) : "";
  const checkedMethods = formState.paymentMethods.filter((m) => m.checked);

  return (
    <View style={styles.receiptBorder}>
      <View style={styles.copyLabel}>
        <Text>{copyLabel}</Text>
      </View>

      <View style={styles.headerRow}>
        <View style={styles.logoBox}>
          <Image style={styles.logoImg} src="/file.svg" />
        </View>
        <View style={styles.hdrCenter}>
          <Text style={styles.companyName}>Aevitas International School</Text>
          <Text style={styles.tagline}>International School</Text>
        </View>
        <View style={styles.hdrRight}>
          <Text style={styles.hdrLabel}>Receipt No</Text>
          <Text style={styles.hdrValue}>{formState.receiptNo}</Text>
          {formState.invoiceNo ? (
            <>
              <Text style={[styles.hdrLabel, { marginTop: 2 }]}>Invoice No</Text>
              <Text style={styles.hdrValue}>{formState.invoiceNo}</Text>
            </>
          ) : null}
          <Text style={[styles.hdrLabel, { marginTop: 2 }]}>Date</Text>
          <Text style={styles.hdrValue}>{formState.date}</Text>
        </View>
      </View>

      <Text style={styles.title}>MONEY RECEIPT</Text>

      <View style={styles.chequeBox}>
        <View style={styles.payRow}>
          <Text style={styles.payLabel}>PAY</Text>
          <Text style={styles.payName}>{formState.payerName}</Text>
        </View>

        <View style={styles.amountRow}>
          <Text style={styles.sumLabel}>The sum of Taka</Text>
          <Text style={styles.sumValue}>{inWords}</Text>
          <View style={styles.amountBox}>
            <Text style={styles.amountBoxText}>
              BDT {formState.amount.toLocaleString()}
            </Text>
          </View>
        </View>

        <Text style={styles.takaOnly}>Taka only</Text>

        <View style={styles.innerDivider} />

        <View style={styles.infoRow}>
          <Text>Student Name:</Text>
          <Text style={styles.infoValue}>{formState.studentName}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text>Student ID:</Text>
          <Text style={styles.infoValue}>{formState.studentId}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text>Grade:</Text>
          <Text style={styles.infoValue}>{formState.grade}</Text>
        </View>
      </View>

      {checkedMethods.length > 0 && (
        <View>
          <Text style={styles.sectionLabel}>Payment Method</Text>
          {checkedMethods.map((method, idx) => (
            <View key={idx} style={styles.methodRow}>
              <Text style={styles.checkMark}>✓</Text>
              <Text style={styles.methodName}>{method.method}</Text>
              <Text style={styles.methodDetails}>{method.details}</Text>
            </View>
          ))}
        </View>
      )}

      <View style={styles.sigRow}>
        <View style={styles.sigBlock}>
          <View style={styles.sigLine} />
          <Text style={styles.sigLabel}>Authorized Signature</Text>
        </View>
        <View style={styles.sigBlock}>
          <View style={styles.sigLine} />
          <Text style={styles.sigLabel}>Accounts Signature</Text>
        </View>
      </View>
    </View>
  );
}

export default function PDFChequeReceipt({ formState }: Props) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.half}>
          <ReceiptHalf formState={formState} copyLabel="STUDENT COPY" />
        </View>

        <View style={styles.cutLine}>
          <Text style={styles.cutText}>- - - - - - - - - - - CUT HERE - - - - - - - - - - -</Text>
        </View>

        <View style={styles.half}>
          <ReceiptHalf formState={formState} copyLabel="ACCOUNTS COPY" />
        </View>

        <Text style={styles.pageFooter} render={({ pageNumber, totalPages }) => (
          `Page ${pageNumber} of ${totalPages} | Aevitas - Receipt`
        )} fixed />
      </Page>
    </Document>
  );
}
