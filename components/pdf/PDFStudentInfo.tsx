import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { StudentInfoDto } from "@/lib/types";

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#d4d4d4",
    borderBottomStyle: "solid",
  },
  row: {
    flexDirection: "row",
    gap: 4,
  },
  label: {
    fontSize: 9,
    fontFamily: "Helvetica",
    color: "#525252",
    width: 72,
  },
  value: {
    fontSize: 9,
    fontFamily: "Helvetica",
    color: "#171717",
  },
  nameValue: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#171717",
  },
});

interface Props {
  studentInfo: StudentInfoDto;
}

export default function PDFStudentInfo({ studentInfo }: Props) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        <Text style={styles.label}>Student Name</Text>
        <Text style={styles.nameValue}>: {studentInfo.studentName}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Student ID</Text>
        <Text style={styles.value}>: {studentInfo.studentId}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Grade</Text>
        <Text style={styles.value}>: {studentInfo.grade}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Parent Name</Text>
        <Text style={styles.value}>: {studentInfo.parentName}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Parent Mobile</Text>
        <Text style={styles.value}>: {studentInfo.parentMobile}</Text>
      </View>
    </View>
  );
}
