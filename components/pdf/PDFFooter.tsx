"use client";

import { Text, View, StyleSheet } from "@react-pdf/renderer";
import type { ReportFooterDto } from "@/lib/types";
import PDFPaymentInfo from "./PDFPaymentInfo";

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
  inWords: {
    fontSize: 9,
    fontStyle: "italic",
    color: "#424242",
    paddingVertical: 4,
  },
  notes: {
    fontSize: 9,
    color: "#424242",
    paddingBottom: 8,
  },
});

export default function PDFFooter({ footer }: { footer: ReportFooterDto }) {
  return (
    <View style={styles.container}>
      {footer.inWords ? (
        <Text style={styles.inWords}>In Words: {footer.inWords}</Text>
      ) : null}

      {footer.notes ? (
        <Text style={styles.notes}>Notes: {footer.notes}</Text>
      ) : null}

      <PDFPaymentInfo paymentInfo={footer.paymentInfo ?? []} />
    </View>
  );
}
