"use client";

import { useState, useCallback } from "react";
import { PDFViewer, pdf } from "@react-pdf/renderer";
import { GRADE_LEVELS } from "@/config/company";
import type { MoneyReceiptFormState, PaymentMethodDetail } from "@/lib/types";
import { numberToWords } from "@/lib/utils";
import PDFChequeReceipt from "@/components/pdf/PDFChequeReceipt";

const DEFAULT_METHODS: PaymentMethodDetail[] = [
  { method: "Cash", checked: false, details: "" },
  { method: "Cheque", checked: false, details: "" },
  { method: "MFS", checked: false, details: "" },
  { method: "Bank Transfer", checked: false, details: "" },
];

function getDefaultForm(): MoneyReceiptFormState {
  const today = new Date().toISOString().split("T")[0];
  return {
    receiptNo: `AIS-MR-${Date.now().toString(36).toUpperCase()}`,
    invoiceNo: "",
    studentName: "",
    studentId: "",
    grade: "EY1",
    payerName: "",
    purpose: "",
    amount: 0,
    date: today,
    receiverName: "",
    paymentMethods: DEFAULT_METHODS.map((m) => ({ ...m })),
  };
}

export default function MoneyReceiptForm() {
  const [form, setForm] = useState<MoneyReceiptFormState>(getDefaultForm);
  const [showPDF, setShowPDF] = useState(false);

  const updateField = useCallback(
    <K extends keyof MoneyReceiptFormState>(
      field: K,
      value: MoneyReceiptFormState[K]
    ) => {
      setForm((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const toggleMethod = useCallback((index: number) => {
    setForm((prev) => {
      const methods = [...prev.paymentMethods];
      methods[index] = { ...methods[index], checked: !methods[index].checked };
      return { ...prev, paymentMethods: methods };
    });
  }, []);

  const amountInWords = form.amount > 0 ? numberToWords(form.amount) : "";

  const handleGenerate = useCallback(async () => {
    const blob = await pdf(<PDFChequeReceipt formState={form} />).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Receipt-${form.receiptNo}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  }, [form]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between gap-3 px-4 md:px-8 py-4 border-b border-neutral-300 bg-white">
        <div className="min-w-0">
          <h2 className="text-sm font-medium text-neutral-900">
            Money Receipt
          </h2>
          <p className="text-xs text-neutral-600 mt-0.5 truncate">
            Issue a payment receipt — Aevitas
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setShowPDF((v) => !v)}
            className="px-3 py-1.5 text-xs font-medium text-neutral-700 hover:text-neutral-900 border border-neutral-400 rounded-md hover:bg-neutral-200 transition-colors"
          >
            {showPDF ? "Close" : "Preview"}
          </button>
          <button
            onClick={handleGenerate}
            disabled={!form.payerName || !form.receiverName || form.amount <= 0}
            className="px-4 py-1.5 text-xs font-medium text-white bg-neutral-900 rounded-md hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
          >
            PDF
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row min-h-0">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto px-4 md:px-8 py-6 md:py-8 space-y-6 md:space-y-8">
            {/* Receipt Details */}
            <section>
              <h3 className="text-xs font-medium text-neutral-600 uppercase tracking-wider mb-4">
                Receipt Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-xs text-neutral-700 mb-1.5">
                    Receipt No
                  </label>
                  <input
                    type="text"
                    value={form.receiptNo}
                    onChange={(e) => updateField("receiptNo", e.target.value)}
                    className="w-full text-sm bg-transparent border-b border-neutral-400 pb-1.5 text-neutral-900 focus:outline-none focus:border-neutral-900 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-700 mb-1.5">
                    Date
                  </label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => updateField("date", e.target.value)}
                    className="w-full text-sm bg-transparent border-b border-neutral-400 pb-1.5 text-neutral-900 focus:outline-none focus:border-neutral-900 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-700 mb-1.5">
                    Invoice No
                  </label>
                  <input
                    type="text"
                    value={form.invoiceNo}
                    onChange={(e) => updateField("invoiceNo", e.target.value)}
                    placeholder="Optional"
                    className="w-full text-sm bg-transparent border-b border-neutral-400 pb-1.5 text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:border-neutral-900 transition-colors"
                  />
                </div>
              </div>
            </section>

            {/* Student Info */}
            <section>
              <h3 className="text-xs font-medium text-neutral-600 uppercase tracking-wider mb-4">
                Student Info
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="md:col-span-2">
                  <label className="block text-xs text-neutral-700 mb-1.5">
                    Student Name
                  </label>
                  <input
                    type="text"
                    value={form.studentName}
                    onChange={(e) => updateField("studentName", e.target.value)}
                    placeholder="Full name"
                    className="w-full text-sm bg-transparent border-b border-neutral-400 pb-1.5 text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:border-neutral-900 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-700 mb-1.5">
                    Student ID
                  </label>
                  <input
                    type="text"
                    value={form.studentId}
                    onChange={(e) => updateField("studentId", e.target.value)}
                    placeholder="STU-001"
                    className="w-full text-sm bg-transparent border-b border-neutral-400 pb-1.5 text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:border-neutral-900 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-700 mb-1.5">
                    Grade
                  </label>
                  <select
                    value={form.grade}
                    onChange={(e) => updateField("grade", e.target.value)}
                    className="w-full text-sm bg-transparent border-b border-neutral-400 pb-1.5 text-neutral-900 focus:outline-none focus:border-neutral-900 transition-colors"
                  >
                    {GRADE_LEVELS.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-neutral-700 mb-1.5">
                    Payer Name
                  </label>
                  <input
                    type="text"
                    value={form.payerName}
                    onChange={(e) => updateField("payerName", e.target.value)}
                    placeholder="Full name"
                    className="w-full text-sm bg-transparent border-b border-neutral-400 pb-1.5 text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:border-neutral-900 transition-colors"
                  />
                </div>
              </div>
            </section>

            {/* Amount */}
            <section>
              <h3 className="text-xs font-medium text-neutral-600 uppercase tracking-wider mb-4">
                Payment
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-xs text-neutral-700 mb-1.5">
                    Purpose
                  </label>
                  <input
                    type="text"
                    value={form.purpose}
                    onChange={(e) => updateField("purpose", e.target.value)}
                    placeholder='e.g. "Tuition fee June 2026"'
                    className="w-full text-sm bg-transparent border-b border-neutral-400 pb-1.5 text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:border-neutral-900 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-700 mb-1.5">
                    Amount (BDT)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={form.amount || ""}
                    onChange={(e) =>
                      updateField(
                        "amount",
                        Math.max(0, Number(e.target.value) || 0)
                      )
                    }
                    placeholder="0"
                    className="w-full text-sm bg-transparent border-b border-neutral-400 pb-1.5 text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:border-neutral-900 transition-colors"
                  />
                  {amountInWords && (
                    <p className="mt-2 text-xs text-neutral-600">
                      {amountInWords}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Payment Method */}
            <section>
              <h3 className="text-xs font-medium text-neutral-600 uppercase tracking-wider mb-4">
                Payment Method
              </h3>
              <div className="flex flex-wrap gap-2">
                {form.paymentMethods.map((method, idx) => (
                  <button
                    key={method.method}
                    type="button"
                    onClick={() => toggleMethod(idx)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-150 border ${
                      method.checked
                        ? "bg-neutral-900 text-white border-neutral-900"
                        : "bg-white text-neutral-700 border-neutral-300 hover:border-neutral-500 hover:text-neutral-900"
                    }`}
                  >
                    {method.checked && (
                      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                    {method.method}
                  </button>
                ))}
              </div>
            </section>

            {/* Receiver */}
            <section>
              <h3 className="text-xs font-medium text-neutral-600 uppercase tracking-wider mb-4">
                Receiver
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-xs text-neutral-700 mb-1.5">
                    Receiver Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.receiverName}
                    onChange={(e) => updateField("receiverName", e.target.value)}
                    placeholder="Name of person receiving"
                    className="w-full text-sm bg-transparent border-b border-neutral-400 pb-1.5 text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:border-neutral-900 transition-colors"
                  />
                </div>
              </div>
            </section>
          </div>
        </div>

        {showPDF && (
          <div className="w-full md:w-120 h-80 md:h-auto shrink-0 border-t md:border-t-0 md:border-l border-neutral-300 bg-white">
            <PDFViewer
              style={{ width: "100%", height: "100%", border: "none" }}
              showToolbar
            >
              <PDFChequeReceipt formState={form} />
            </PDFViewer>
          </div>
        )}
      </div>
    </div>
  );
}
