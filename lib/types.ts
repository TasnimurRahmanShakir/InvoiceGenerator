export interface ReportHeaderDto {
  companyName: string;
  address: string;
  mobile?: string;
  title: string;
  dateLabel?: string;
}

export interface StudentInfoDto {
  studentName: string;
  studentId: string;
  grade: string;
  parentName: string;
  parentMobile: string;
}

export interface PaymentMethodRow {
  method: string;
  details: string;
}

export interface ReportColumnDto {
  key: string;
  title: string;
  widthWeight: number;
  alignment?: "left" | "center" | "right";
}

export interface ReportCellDto {
  text: string;
  alignment?: "left" | "center" | "right";
  rowSpan?: number;
  colSpan?: number;
  isBold?: boolean;
  isItalic?: boolean;
  textColor?: string;
  backgroundColor?: string;
}

export interface ReportRowDto {
  cells: ReportCellDto[];
  isSubTotal?: boolean;
  isGrandTotal?: boolean;
}

export interface SignatureData {
  label: string;
  name?: string;
}

export interface ReportFooterDto {
  inWords?: string;
  notes?: string;
  paymentInfo?: PaymentMethodRow[];
  signatures: SignatureData[];
}

export interface ReportTableData {
  header: ReportHeaderDto;
  studentInfo?: StudentInfoDto;
  columns: ReportColumnDto[];
  rows: ReportRowDto[];
  footer: ReportFooterDto;
}

export enum PaymentMethod {
  Cash = "Cash",
  Cheque = "Cheque",
  BKash = "BKash",
  Card = "Card",
}

export interface SchoolFeeItem {
  id: string;
  name: string;
  category: string;
  feeType: "one-time" | "annual" | "monthly" | "per-subject";
  unitLabel: string;
  minGrade: string;
  maxGrade: string;
  unitPrice: number;
}

export interface FeeLineItem {
  feeItemId: string;
  description: string;
  category: string;
  feeType: string;
  unitLabel: string;
  quantity: number;
  unitPrice: number;
  year?: string;
  months?: string;
}

export interface InvoiceFormState {
  invoiceNo: string;
  date: string;
  studentName: string;
  studentId: string;
  grade: string;
  parentName: string;
  parentMobile: string;
  discount: number;
  items: FeeLineItem[];
}

export interface PaymentMethodDetail {
  method: string;
  checked: boolean;
  details: string;
}

export interface MoneyReceiptFormState {
  receiptNo: string;
  invoiceNo: string;
  studentName: string;
  studentId: string;
  grade: string;
  payerName: string;
  purpose: string;
  amount: number;
  date: string;
  receiverName: string;
  paymentMethods: PaymentMethodDetail[];
}
