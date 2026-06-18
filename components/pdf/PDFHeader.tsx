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
    justifyContent: "space-between",
  },
  leftCol: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  rightCol: {
    alignItems: "flex-end",
    justifyContent: "flex-start",
    marginRight: 0,    
    paddingRight: 0,   
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0a2351",
    textAlign: "left",
    marginBottom: 6,
  },
  infoTextLeft: {
    fontSize: 10,
    color: "#424242",
    textAlign: "left",
    marginBottom: 2,
  },
  logoImg: {
    width: 130,
    height: 50,
    objectFit: "contain",
    marginBottom: 4,
    marginRight: 0,    // Logo strictly attached to the right edge
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#DEE2E6",
    borderBottomStyle: "solid",
    marginTop: 12,
  },
});

export default function PDFHeader({ header }: { header: ReportHeaderDto }) {
  const dateLines = header.dateLabel?.split("\n") ?? [];

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        
        {/* Left Side: Title, Date, Invoice No */}
        <View style={styles.leftCol}>
          <Text style={styles.title}>{header.title}</Text>
          {dateLines.map((line, i) => (
            <Text key={i} style={styles.infoTextLeft}>
              {line}
            </Text>
          ))}
        </View>

        {/* Right Side: Logo */}
        <View style={styles.rightCol}>
          <Image style={styles.logoImg} src="/AEVITAS.png" />
        </View>

      </View>

      <View style={styles.divider} />
    </View>
  );
}