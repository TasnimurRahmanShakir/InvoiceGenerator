"use client";

import dynamic from "next/dynamic";

const InvoiceForm = dynamic(
  () => import("@/components/invoice/InvoiceForm"),
  { ssr: false }
);

export default function InvoicePage() {
  return <InvoiceForm />;
}
