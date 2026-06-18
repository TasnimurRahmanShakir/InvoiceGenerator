"use client";

import { Text, View, Image, StyleSheet } from "@react-pdf/renderer";
import type { ReportHeaderDto } from "@/lib/types";

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  logoBox: {
    width: 80,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  logoImg: {
    width: 80,
    height: 50,
    objectFit: "contain",
  },
  centerCol: {
    flex: 1,
  },
  companyName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0a2351",
    textAlign: "center",
  },
  tagline: {
    fontSize: 8,
    color: "#666",
    textAlign: "center",
    marginTop: 1,
  },
  address: {
    fontSize: 9,
    color: "#424242",
    textAlign: "center",
    marginTop: 2,
  },
  mobile: {
    fontSize: 9,
    color: "#424242",
    textAlign: "center",
  },
  title: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#0a2351",
    textAlign: "center",
    marginTop: 5,
  },
  dateCol: {
    width: 120,
    alignItems: "flex-end",
  },
  dateText: {
    fontSize: 9,
    color: "#424242",
    textAlign: "right",
  },
  divider: {
    borderBottom: "1pt solid #DEE2E6",
    marginTop: 8,
  },
});

export default function PDFHeader({ header }: { header: ReportHeaderDto }) {
  const dateLines = header.dateLabel?.split("\n") ?? [];

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.logoBox}>
          <Image style={styles.logoImg} src="/file.svg" />
        </View>

        <View style={styles.centerCol}>
          <Text style={styles.companyName}>{header.companyName}</Text>
          <Text style={styles.tagline}>International School</Text>
          <Text style={styles.address}>{header.address}</Text>
          {header.mobile ? <Text style={styles.mobile}>Mobile: {header.mobile}</Text> : null}
          <Text style={styles.title}>{header.title}</Text>
        </View>

        <View style={styles.dateCol}>
          {dateLines.map((line, i) => (
            <Text key={i} style={styles.dateText}>{line}</Text>
          ))}
        </View>
      </View>

      <View style={styles.divider} />
    </View>
  );
}
