"use client";

import dynamic from "next/dynamic";

const MoneyReceiptForm = dynamic(
  () => import("@/components/money-receipt/MoneyReceiptForm"),
  { ssr: false }
);

export default function MoneyReceiptPage() {
  return <MoneyReceiptForm />;
}
