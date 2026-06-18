"use client";

import { Document, Page, View, Text, StyleSheet, Svg, Path, Circle, Line, G } from "@react-pdf/renderer";
import { MoneyReceiptFormState, ReportHeaderDto } from "@/lib/types";
import { numberToWords } from "@/lib/utils";
import PDFHeader from "./PDFHeader";

const styles = StyleSheet.create({
  page: {
    paddingLeft: 48,
    paddingRight: 48,
    paddingTop: 48,
    paddingBottom: 28,
    fontFamily: "Helvetica",
    fontSize: 8.5,
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
  copyLabel: {
    fontSize: 8,
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
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#171717",
    marginRight: 6,
  },
  payName: {
    fontSize: 9,
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
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#171717",
    marginRight: 6,
  },
  sumValue: {
    fontSize: 9,
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
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#171717",
  },
  purposeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  purposeLabel: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#171717",
    marginRight: 6,
  },
  purposeValue: {
    fontSize: 9,
    color: "#171717",
    borderBottom: "1pt solid #171717",
    flex: 1,
    paddingBottom: 1,
  },
  innerDivider: {
    borderBottom: "1pt solid #d4d4d4",
    marginVertical: 5,
  },
  infoRow: {
    flexDirection: "row",
    gap: 3,
    marginBottom: 1,
    fontSize: 8,
    color: "#424242",
  },
  infoValue: {
    fontFamily: "Helvetica-Bold",
    color: "#171717",
  },
  sectionLabel: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#0a2351",
    marginBottom: 3,
  },
  methodsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    alignItems: "center",
  },
  methodPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  methodName: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#171717",
  },
  methodUnchecked: {
    color: "#a3a3a3",
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
    fontSize: 8,
    color: "#424242",
    textAlign: "center",
  },
  receiptFooter: {
    borderTopWidth: 1.5,
    borderTopColor: "#DEE2E6",
    borderTopStyle: "solid",
    paddingTop: 3,
    marginTop: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 7.5,
    color: "#757575",
  },
  footerInfo: {
    flexDirection: "row",
    gap: 4,
  },
  cutLine: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    gap: 6,
  },
  cutDash: {
    flex: 1,
    borderBottom: "1pt dashed #9ca3af",
  },
  shortDash: {
    width: 24, 
    borderBottomWidth: 1,
    borderBottomColor: "#9ca3af",
    borderBottomStyle: "dashed",
  },
});

interface Props {
  formState: MoneyReceiptFormState;
}

function ReceiptHalf({ formState, copyLabel }: Props & { copyLabel: string }) {
  const inWords = formState.amount > 0 ? numberToWords(formState.amount) : "";

  const dateParts: string[] = [];
  dateParts.push(`Receipt No: ${formState.receiptNo}`);
  if (formState.invoiceNo) {
    dateParts.push(`Invoice No: ${formState.invoiceNo}`);
  }
  dateParts.push(`Date: ${formState.date}`);

  const headerData: ReportHeaderDto = {
    title: "MONEY RECEIPT",
    companyName: "Aevitas International School",
    address: "House 66, Road 18, Block B, Banani, Dhaka 1213",
    mobile: "+880 1711-111111",
    dateLabel: dateParts.join("\n"),
  };

  return (
    <View style={styles.receiptBorder}>
      <View style={styles.copyLabel}>
        <Text>{copyLabel}</Text>
      </View>
      <PDFHeader header={headerData} />

      <View style={styles.chequeBox}>
          <View style={styles.payRow}>
            <Text style={styles.payLabel}>Payment From</Text>
            <Text style={styles.payName}>{formState.payerName}</Text>
          </View>

          <View style={styles.amountRow}>
            <Text style={styles.sumLabel}>Amount in words</Text>
            <Text style={styles.sumValue}>{inWords}</Text>
            <View style={styles.amountBox}>
              <Text style={styles.amountBoxText}>
                BDT {formState.amount.toLocaleString()}
              </Text>
            </View>
          </View>

          {formState.purpose ? (
            <View style={styles.purposeRow}>
              <Text style={styles.purposeLabel}>Payment Purpose</Text>
              <Text style={styles.purposeValue}>{formState.purpose}</Text>
            </View>
          ) : null}

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

        <View>
            <Text style={styles.sectionLabel}>Payment Method</Text>
            <View style={styles.methodsRow}>
              {formState.paymentMethods.map((method, idx) => (
                <View key={idx} style={styles.methodPill}>
                  {method.checked && (
                    <Svg width={8} height={8} viewBox="0 0 24 24">
                      <Path
                        d="M5 13l4 4L19 7"
                        stroke="#0a2351"
                        strokeWidth={3}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Svg>
                  )}
                  <Text style={[styles.methodName, ...(method.checked ? [] : [styles.methodUnchecked])]}>
                    {method.method}
                  </Text>
                </View>
              ))}
            </View>
          </View>

        <View style={styles.sigRow}>
          <View style={styles.sigBlock}>
            <View style={styles.sigLine} />
            <Text style={styles.sigLabel}>Received By {formState.receiverName}</Text>
          </View>
        </View>

        <View style={styles.receiptFooter}>
          <View style={styles.footerInfo}>
            <Text>Plot: 32, Block: A, Aftabnagar Main Road, Dhaka 1212</Text>
            <Text> | </Text>
            <Text>Mobile: +880 1717-539859</Text>
          </View>
          <Text render={({ pageNumber, totalPages }) => (
            `Page ${pageNumber} of ${totalPages}`
          )} />
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
          {/* শুরুর ছোট ড্যাশ লাইন */}
          <View style={styles.shortDash} />

          {/* বামের কাঁচি (ডানদিকে মুখ করা - 90 Degree Rotate) */}
          <Svg width={14} height={14} viewBox="0 0 16 16">
            <G transform="rotate(90, 8, 8)">
              <Path
                d="M3.5 3.5c-.614-.884-.074-1.962.858-2.5L8 7.226 11.642 1c.932.538 1.472 1.616.858 2.5L8.81 8.61l1.556 2.661a2.5 2.5 0 1 1-.794.637L8 9.73l-1.572 2.177a2.5 2.5 0 1 1-.794-.637L7.19 8.61zm2.5 10a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0m7 0a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"
                stroke="#9ca3af" strokeWidth={0.5} fill="none"
              />
            </G>
          </Svg>

          {/* মাঝখানের লম্বা ড্যাশ লাইন */}
          <View style={styles.cutDash} />

          {/* ডানের কাঁচি (বামদিকে মুখ করা - Negative 90 Degree Rotate) */}
          <Svg width={14} height={14} viewBox="0 0 16 16">
            <G transform="rotate(-90, 8, 8)">
              <Path
                d="M3.5 3.5c-.614-.884-.074-1.962.858-2.5L8 7.226 11.642 1c.932.538 1.472 1.616.858 2.5L8.81 8.61l1.556 2.661a2.5 2.5 0 1 1-.794.637L8 9.73l-1.572 2.177a2.5 2.5 0 1 1-.794-.637L7.19 8.61zm2.5 10a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0m7 0a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"
                stroke="#9ca3af" strokeWidth={0.5} fill="none"
              />
            </G>
          </Svg>

          {/* শেষের ছোট ড্যাশ লাইন */}
          <View style={styles.shortDash} />
        </View>

        <View style={styles.half}>
          <ReceiptHalf formState={formState} copyLabel="ACCOUNTS COPY" />
        </View>
      </Page>
    </Document>
  );
}
