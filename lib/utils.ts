import { ReportTableData, FeeLineItem, InvoiceFormState, ReportRowDto } from "./types";

const MONTHS_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const numberToWords = (num: number): string => {
  if (num === 0) return "Zero";
  const ones = [
    "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
    "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
    "Seventeen", "Eighteen", "Nineteen",
  ];
  const tens = [
    "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty",
    "Ninety",
  ];
  const convertBelow1000 = (n: number): string => {
    if (n === 0) return "";
    const h = Math.floor(n / 100);
    const r = n % 100;
    let s = "";
    if (h > 0) s += ones[h] + " Hundred ";
    if (r > 0) {
      if (r < 20) s += ones[r] + " ";
      else s += tens[Math.floor(r / 10)] + " " + ones[r % 10] + " ";
    }
    return s.trim();
  };
  let result = "";
  const crore = Math.floor(num / 10000000);
  const lakh = Math.floor((num % 10000000) / 100000);
  const thousand = Math.floor((num % 100000) / 1000);
  const hundred = Math.floor((num % 1000) / 100);
  const remainder = num % 100;
  if (crore > 0) result += convertBelow1000(crore) + " Crore ";
  if (lakh > 0) result += convertBelow1000(lakh) + " Lakh ";
  if (thousand > 0) result += convertBelow1000(thousand) + " Thousand ";
  if (hundred > 0) result += ones[hundred] + " Hundred ";
  if (remainder > 0) {
    if (remainder < 20) result += ones[remainder];
    else result += tens[Math.floor(remainder / 10)] + " " + ones[remainder % 10];
  }
  return result.trim() + " Taka Only.";
};

export const getPeriodDisplay = (item: FeeLineItem): string => {
  const parts: string[] = [];
  if (item.feeType === "one-time") {
    parts.push("One-time");
  } else if (item.feeType === "annual") {
    parts.push("Annual");
  } else if (item.feeType === "monthly") {
    if (item.months) {
      parts.push(item.months);
    } else {
      parts.push("Monthly");
    }
  } else if (item.feeType === "per-subject") {
    parts.push(`Subject(${item.quantity})`);
  }
  if (item.year) {
    parts.push(item.year);
  }
  return parts.join(" ");
};

export const mapInvoiceToReportTableData = (
  formState: InvoiceFormState
): ReportTableData => {
  const hasDiscount = formState.discount > 0;
  const hasAdmission = formState.items.some((i) => i.feeItemId === "ADMISSION");
  const discountApplicable = hasDiscount && hasAdmission;

  const admissionItem = formState.items.find((i) => i.feeItemId === "ADMISSION");
  const admissionFee = admissionItem ? admissionItem.unitPrice * admissionItem.quantity : 0;
  const otherItems = formState.items.filter((i) => i.feeItemId !== "ADMISSION");
  const otherTotal = otherItems.reduce((s, i) => s + i.unitPrice * i.quantity, 0);
  const discountedAdmission = discountApplicable ? admissionFee - formState.discount : admissionFee;
  const grandTotal = discountedAdmission + otherTotal;

  let sl = 0;
  const rows: ReportRowDto[] = [];

  if (admissionItem) {
    sl++;
    rows.push({
      cells: [
        { text: String(sl), alignment: "center" as const },
        { text: admissionItem.description },
        { text: getPeriodDisplay(admissionItem), alignment: "center" as const },
        { text: `${admissionItem.quantity} ${admissionItem.unitLabel}`, alignment: "center" as const },
        { text: admissionItem.unitPrice.toLocaleString(), alignment: "right" as const },
        { text: admissionFee.toLocaleString(), alignment: "right" as const },
      ],
    });
  }

  if (discountApplicable) {
    rows.push({
      cells: [
        { text: "" },
        { text: "Discount on Admission" },
        { text: "", alignment: "center" as const },
        { text: "" },
        { text: "", alignment: "right" as const },
        { text: `-${formState.discount.toLocaleString()}`, alignment: "right" as const, isBold: true },
      ],
    });
    rows.push({
      cells: [
        { text: "" },
        { text: "" },
        { text: "" },
        { text: "" },
        { text: "Sub Total (Admission)", alignment: "right" as const, isBold: true },
        { text: discountedAdmission.toLocaleString(), alignment: "right" as const, isBold: true },
      ],
      isSubTotal: true,
    });
  }

  for (const item of otherItems) {
    sl++;
    rows.push({
      cells: [
        { text: String(sl), alignment: "center" as const },
        { text: item.description },
        { text: getPeriodDisplay(item), alignment: "center" as const },
        { text: `${item.quantity} ${item.unitLabel}`, alignment: "center" as const },
        { text: item.unitPrice.toLocaleString(), alignment: "right" as const },
        {
          text: (item.unitPrice * item.quantity).toLocaleString(),
          alignment: "right" as const,
        },
      ],
    });
  }

  rows.push({
    cells: [
      { text: "" },
      { text: "" },
      { text: "" },
      { text: "" },
      { text: "Grand Total", alignment: "right" as const, isBold: true },
      {
        text: grandTotal.toLocaleString(),
        alignment: "right" as const,
        isBold: true,
      },
    ],
    isGrandTotal: true,
  });

  return {
    header: {
      title: "INVOICE",
      companyName: "Aevitas International School",
      address: "Plot: 32, Block: A, Aftabnagar Main Road, Dhaka 1212",
      mobile: "+880 1717-539859",
      dateLabel: `Invoice No: ${formState.invoiceNo}  \n  Date: ${formState.date}`,
    },
    studentInfo: {
      studentName: formState.studentName,
      studentId: formState.studentId,
      grade: formState.grade,
      parentName: formState.parentName,
      parentMobile: formState.parentMobile,
    },
    columns: [
      { key: "sl", title: "SL", widthWeight: 0.5, alignment: "center" },
      { key: "description", title: "Description", widthWeight: 3 },
      { key: "type", title: "Type", widthWeight: 1.5, alignment: "center" },
      { key: "qty", title: "Qty", widthWeight: 1, alignment: "center" },
      { key: "rate", title: "Rate", widthWeight: 1, alignment: "right" },
      { key: "amount", title: "Amount", widthWeight: 1, alignment: "right" },
    ],
    rows,
    footer: {
      inWords: numberToWords(grandTotal),
      notes: "Payment Terms: 100% payable at the time of admission.\nLate Fee: Tk. 100 per day will be charged for late payment.",
      paymentInfo: [
        { method: "Dutch-Bangla Bank Ltd.", details: "Name         : Aevitas International School\nA/C  No      : XXXX-XXXX-XXXX\nBranch        : Banani, Dhaka\nRouting No : XXXXXXXXX" },
        { method: "bKash", details: "A/C No: XXXXXXXXXX" },
        { method: "Rocket", details: "A/C No: XXXXXXXXXX" },
        { method: "Nagad", details: "A/C No: XXXXXXXXXX" },
      ],
      signatures: [
        { label: "Guardian Signature" },
        { label: "Accounts Signature" },
      ],
    },
  };
};

export { numberToWords };
