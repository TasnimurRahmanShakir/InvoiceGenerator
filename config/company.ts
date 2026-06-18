export const COMPANY = {
  name: "Aevitas",
  address: "Dhaka, Bangladesh",
  mobile: "+880 1XXX-XXXXXX",
  email: "info@aevitas.edu.bd",
  logoPlaceholder: "/logo-placeholder.png",
};

export const GRADE_LEVELS = [
  "EY1", "EY2", "EY3",
  "G1", "G2", "G3", "G4", "G5",
  "G6", "G7", "G8", "G9", "G10",
  "G11", "G12",
] as const;

export type GradeLevel = (typeof GRADE_LEVELS)[number];

export function gradeIndex(grade: GradeLevel): number {
  return GRADE_LEVELS.indexOf(grade);
}
