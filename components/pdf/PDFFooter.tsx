"use client";

import { Text, View, StyleSheet } from "@react-pdf/renderer";
import type { ReportFooterDto } from "@/lib/types";
import PDFPaymentInfo from "./PDFPaymentInfo";

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
  inWords: {
    fontSize: 10,
    fontStyle: "italic",
    color: "#424242",
    paddingVertical: 4,
  },
  noteLine: {
    fontSize: 10,
    color: "#424242",
    marginBottom: 2,
    paddingLeft: 6,
  },
  noteLabel: {
    fontWeight: "bold",
    color: "#424242",
  },
});

const PAYMENT_TERMS_LABEL = "Payment Terms:";

function renderNoteLines(notes: string) {
  const lines = notes.split("\n");
  const elements: React.ReactNode[] = [];

  lines.forEach((line, i) => {
    if (i === 0 && line.startsWith(PAYMENT_TERMS_LABEL)) {
      const rest = line.slice(PAYMENT_TERMS_LABEL.length).trim();
      elements.push(
        <Text key={`label-${i}`} style={[styles.noteLine, { paddingLeft: 0 }]}>
          <Text style={styles.noteLabel}>{PAYMENT_TERMS_LABEL}</Text>
        </Text>
      );
      if (rest) {
        elements.push(
          <Text key={`item-${i}`} style={styles.noteLine}>
            <Text>{"\u2022"} {rest}</Text>
          </Text>
        );
      }
    } else {
      elements.push(
        <Text key={i} style={styles.noteLine}>
          <Text>{"\u2022"} {line}</Text>
        </Text>
      );
    }
  });

  return elements;
}

export default function PDFFooter({ footer }: { footer: ReportFooterDto }) {
  return (
    <View style={styles.container}>
      {footer.inWords ? (
        <Text style={styles.inWords}>In Words: {footer.inWords}</Text>
      ) : null}

      {footer.notes ? renderNoteLines(footer.notes) : null}

      <PDFPaymentInfo paymentInfo={footer.paymentInfo ?? []} />
    </View>
  );
}
