"use client";

import { useState, useCallback } from "react";
import { PDFViewer, pdf } from "@react-pdf/renderer";
import { GRADE_LEVELS } from "@/config/company";
import { PaymentMethod } from "@/lib/types";
import type { MoneyReceiptFormState } from "@/lib/types";
import { mapMoneyReceiptToReportTableData, numberToWords } from "@/lib/utils";
import GenericPDFDocument from "@/components/pdf/GenericPDFDocument";

function getDefaultForm(): MoneyReceiptFormState {
  const today = new Date().toISOString().split("T")[0];
  return {
    receiptNo: `AEV-RCT-${Date.now().toString(36).toUpperCase()}`,
    studentName: "",
    grade: "EY1",
    payerName: "",
    amount: 0,
    date: today,
    paymentMethod: PaymentMethod.Cash,
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

  const handleGenerate = useCallback(async () => {
    const data = mapMoneyReceiptToReportTableData(
      form
    );
    const blob = await pdf(<GenericPDFDocument reportTableData={data} />).toBlob();
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  }, [form]);

  const reportData = mapMoneyReceiptToReportTableData(
    form
  );

  const amountInWords = form.amount > 0 ? numberToWords(form.amount) : "";

  const methods = Object.values(PaymentMethod);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-8 py-4 border-b border-neutral-300 bg-white">
        <div>
          <h2 className="text-sm font-medium text-neutral-900">
            Money Receipt
          </h2>
          <p className="text-xs text-neutral-600 mt-0.5">
            Issue a payment receipt for a student — Aevitas
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPDF((v) => !v)}
            className="px-3 py-1.5 text-xs font-medium text-neutral-700 hover:text-neutral-900 border border-neutral-400 rounded-md hover:bg-neutral-200 transition-colors"
          >
            {showPDF ? "Close preview" : "Preview"}
          </button>
          <button
            onClick={handleGenerate}
            disabled={!form.payerName || form.amount <= 0}
            className="px-4 py-1.5 text-xs font-medium text-white bg-neutral-900 rounded-md hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Generate PDF
          </button>
        </div>
      </div>

      <div className="flex-1 flex min-h-0">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto px-8 py-8 space-y-8">
            <section>
              <h3 className="text-xs font-medium text-neutral-600 uppercase tracking-wider mb-4">
                Receipt Details
              </h3>
              <div className="grid grid-cols-2 gap-6">
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
              </div>
            </section>

            <section>
              <h3 className="text-xs font-medium text-neutral-600 uppercase tracking-wider mb-4">
                Student Info
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
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

            <section>
              <h3 className="text-xs font-medium text-neutral-600 uppercase tracking-wider mb-4">
                Amount
              </h3>
              <div className="max-w-xs">
                <label className="block text-xs text-neutral-700 mb-1.5">
                  Amount (BDT)
                </label>
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  value={form.amount || ""}
                  onChange={(e) =>
                    updateField(
                      "amount",
                      Math.max(0, Number(e.target.value) || 0)
                    )
                  }
                  placeholder="0.00"
                  className="w-full text-sm bg-transparent border-b border-neutral-400 pb-1.5 text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:border-neutral-900 transition-colors"
                />
                {amountInWords && (
                  <p className="mt-2 text-xs text-neutral-600">
                    {amountInWords} Taka only
                  </p>
                )}
              </div>
            </section>

            <section>
              <h3 className="text-xs font-medium text-neutral-600 uppercase tracking-wider mb-4">
                Payment Method
              </h3>
              <div className="flex gap-1.5">
                {methods.map((method) => {
                  const isSelected = form.paymentMethod === method;
                  return (
                    <button
                      key={method}
                      onClick={() => updateField("paymentMethod", method)}
                      className={`px-3 py-2 text-xs font-medium rounded-md border transition-colors ${
                        isSelected
                          ? "border-neutral-900 bg-neutral-900 text-white"
                          : "border-neutral-400 text-neutral-700 hover:border-neutral-500 hover:text-neutral-900"
                      }`}
                    >
                      {method}
                    </button>
                  );
                })}
              </div>
            </section>
          </div>
        </div>

        {showPDF && (
          <div className="w-[480px] shrink-0 border-l border-neutral-300 bg-white">
            <PDFViewer
              style={{ width: "100%", height: "100%", border: "none" }}
              showToolbar
            >
              <GenericPDFDocument reportTableData={reportData} />
            </PDFViewer>
          </div>
        )}
      </div>
    </div>
  );
}
