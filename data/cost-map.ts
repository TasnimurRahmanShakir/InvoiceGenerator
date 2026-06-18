import type { SchoolFeeItem } from "@/lib/types";

export const FEE_CATALOG: SchoolFeeItem[] = [
  {
    id: "ADMISSION",
    name: "Admission Fee",
    category: "Administrative",
    feeType: "one-time",
    unitLabel: "once",
    minGrade: "EY1",
    maxGrade: "G12",
    unitPrice: 75000,
  },
  {
    id: "SESSION",
    name: "Session Fee",
    category: "Administrative",
    feeType: "annual",
    unitLabel: "year",
    minGrade: "EY1",
    maxGrade: "G12",
    unitPrice: 20000,
  },
  {
    id: "ECA",
    name: "ECA Fee",
    category: "Administrative",
    feeType: "annual",
    unitLabel: "year",
    minGrade: "EY1",
    maxGrade: "G10",
    unitPrice: 10000,
  },
  {
    id: "SUPPLIES-EY",
    name: "School Supplies (EY1-EY3)",
    category: "Administrative",
    feeType: "annual",
    unitLabel: "year",
    minGrade: "EY1",
    maxGrade: "EY3",
    unitPrice: 8000,
  },
  {
    id: "SUPPLIES-PRI",
    name: "School Supplies (G1-G5)",
    category: "Administrative",
    feeType: "annual",
    unitLabel: "year",
    minGrade: "G1",
    maxGrade: "G5",
    unitPrice: 10000,
  },
  {
    id: "SUPPLIES-MID",
    name: "School Supplies (G6-G10)",
    category: "Administrative",
    feeType: "annual",
    unitLabel: "year",
    minGrade: "G6",
    maxGrade: "G10",
    unitPrice: 12000,
  },
  {
    id: "TUITION-EY",
    name: "Tuition Fee (EY1-EY3)",
    category: "Tuition",
    feeType: "monthly",
    unitLabel: "month",
    minGrade: "EY1",
    maxGrade: "EY3",
    unitPrice: 7000,
  },
  {
    id: "TUITION-PRI",
    name: "Tuition Fee (G1-G3)",
    category: "Tuition",
    feeType: "monthly",
    unitLabel: "month",
    minGrade: "G1",
    maxGrade: "G3",
    unitPrice: 8000,
  },
  {
    id: "TUITION-UPRI",
    name: "Tuition Fee (G4-G5)",
    category: "Tuition",
    feeType: "monthly",
    unitLabel: "month",
    minGrade: "G4",
    maxGrade: "G5",
    unitPrice: 10000,
  },
  {
    id: "TUITION-MID1",
    name: "Tuition Fee (G6-G7)",
    category: "Tuition",
    feeType: "monthly",
    unitLabel: "month",
    minGrade: "G6",
    maxGrade: "G7",
    unitPrice: 12000,
  },
  {
    id: "TUITION-MID2",
    name: "Tuition Fee (G8-G10)",
    category: "Tuition",
    feeType: "monthly",
    unitLabel: "month",
    minGrade: "G8",
    maxGrade: "G10",
    unitPrice: 15000,
  },
  {
    id: "TUITION-SEC",
    name: "Tuition Fee (G11-G12)",
    category: "Tuition",
    feeType: "monthly",
    unitLabel: "month",
    minGrade: "G11",
    maxGrade: "G12",
    unitPrice: 18000,
  },
  {
    id: "SCIENCE-LAB",
    name: "Science Lab Fee (G8-G12)",
    category: "Tuition",
    feeType: "per-subject",
    unitLabel: "subject/month",
    minGrade: "G8",
    maxGrade: "G12",
    unitPrice: 1000,
  },
];

export function getFeesForGrade(grade: string): SchoolFeeItem[] {
  const gIdx = gradeIndex(grade);
  return FEE_CATALOG.filter((fee) => {
    const min = gradeIndex(fee.minGrade);
    const max = gradeIndex(fee.maxGrade);
    return gIdx >= min && gIdx <= max;
  });
}

function gradeIndex(grade: string): number {
  const levels = ["EY1", "EY2", "EY3", "G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "G10", "G11", "G12"];
  return levels.indexOf(grade);
}
