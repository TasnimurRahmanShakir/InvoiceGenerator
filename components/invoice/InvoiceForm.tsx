"use client";

import { useState, useCallback } from "react";
import {
  InvoiceFormState,
  FeeLineItem,
} from "@/lib/types";
import { getFeesForGrade } from "@/data/cost-map";
import { mapInvoiceToReportTableData } from "@/lib/utils";
import GenericPDFDocument from "@/components/pdf/GenericPDFDocument";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { GRADE_LEVELS } from "@/config/company";

function getDefaultForm(): InvoiceFormState {
  return {
    invoiceNo: `AEV-INV-${Date.now().toString(36).toUpperCase()}`,
    date: new Date().toISOString().split("T")[0],
    studentName: "",
    studentId: "",
    grade: "EY1",
    parentName: "",
    parentMobile: "",
    discount: 0,
    items: [],
  };
}

export default function InvoiceForm() {
  const [formState, setFormState] =
    useState<InvoiceFormState>(getDefaultForm);
  const [showPDF, setShowPDF] = useState(false);

  const availableFees = formState.grade
    ? getFeesForGrade(formState.grade)
    : [];

  const updateField = useCallback(
    <K extends keyof InvoiceFormState>(
      field: K,
      value: InvoiceFormState[K]
    ) => {
      setFormState((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleGradeChange = (grade: string) => {
    setFormState((prev) => {
      const applicableIds = new Set(
        getFeesForGrade(grade).map((f) => f.id)
      );
      return {
        ...prev,
        grade,
        items: prev.items.filter((item) => applicableIds.has(item.feeItemId)),
      };
    });
  };

  const handleAddItem = useCallback(() => {
    setFormState((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        { feeItemId: "", description: "", category: "", feeType: "", unitLabel: "", quantity: 1, unitPrice: 0, year: "", months: "" },
      ],
    }));
  }, []);

  const handleRemoveItem = useCallback((index: number) => {
    setFormState((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  }, []);

  const handleItemChange = useCallback(
    (index: number, field: keyof FeeLineItem, value: string | number) => {
      setFormState((prev) => {
        const items = [...prev.items];
        const updatedItem = { ...items[index], [field]: value };

        if (field === "feeItemId") {
          const feeItem = availableFees.find((f) => f.id === value);
          if (feeItem) {
            updatedItem.description = feeItem.name;
            updatedItem.category = feeItem.category;
            updatedItem.feeType = feeItem.feeType;
            updatedItem.unitLabel = feeItem.unitLabel;
            updatedItem.unitPrice = feeItem.unitPrice;
            updatedItem.quantity = 1;
          }
        }

        items[index] = updatedItem;
        return { ...prev, items };
      });
    },
    [availableFees]
  );

  const reportTableData = mapInvoiceToReportTableData(formState);

  const itemsTotal = formState.items.reduce(
    (s, i) => s + i.unitPrice * i.quantity,
    0
  );
  const grandTotal = formState.discount > 0
    ? itemsTotal - formState.discount
    : itemsTotal;

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between gap-3 px-4 md:px-8 py-4 border-b border-neutral-300 bg-white">
        <div className="min-w-0">
          <h2 className="text-sm font-medium text-neutral-900">
            Fee Invoice
          </h2>
          <p className="text-xs text-neutral-600 mt-0.5 truncate">
            Create an invoice for a student — Aevitas
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setShowPDF((v) => !v)}
            className="px-3 py-1.5 text-xs font-medium text-neutral-700 hover:text-neutral-900 border border-neutral-400 rounded-md hover:bg-neutral-200 transition-colors"
          >
            {showPDF ? "Close" : "Preview"}
          </button>
          <PDFDownloadLink
            document={<GenericPDFDocument reportTableData={reportTableData} />}
            fileName={`Invoice_${formState.invoiceNo || "draft"}.pdf`}
            className="px-4 py-1.5 text-xs font-medium text-white bg-neutral-900 rounded-md hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
          >
            {({ loading }) => (loading ? "Loading..." : "PDF")}
          </PDFDownloadLink>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row min-h-0">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto px-4 md:px-8 py-6 md:py-8 space-y-6 md:space-y-8">
          {/* Invoice Details */}
          <section>
            <h3 className="text-xs font-medium text-neutral-600 uppercase tracking-wider mb-4">
              Invoice Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-xs text-neutral-700 mb-1.5">
                  Invoice No
                </label>
                <input
                  type="text"
                  value={formState.invoiceNo}
                  onChange={(e) => updateField("invoiceNo", e.target.value)}
                  className="w-full text-sm bg-transparent border-b border-neutral-400 pb-1.5 text-neutral-900 focus:outline-none focus:border-neutral-900 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-neutral-700 mb-1.5">
                  Date
                </label>
                <input
                  type="date"
                  value={formState.date}
                  onChange={(e) => updateField("date", e.target.value)}
                  className="w-full text-sm bg-transparent border-b border-neutral-400 pb-1.5 text-neutral-900 focus:outline-none focus:border-neutral-900 transition-colors"
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
              <div>
                <label className="block text-xs text-neutral-700 mb-1.5">
                  Grade
                </label>
                <select
                  value={formState.grade}
                  onChange={(e) => handleGradeChange(e.target.value)}
                  className="w-full text-sm bg-transparent border-b border-neutral-400 pb-1.5 text-neutral-900 focus:outline-none focus:border-neutral-900 transition-colors"
                >
                  {GRADE_LEVELS.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
              <div />
              <div>
                <label className="block text-xs text-neutral-700 mb-1.5">
                  Student Name
                </label>
                <input
                  type="text"
                  value={formState.studentName}
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
                  value={formState.studentId}
                  onChange={(e) => updateField("studentId", e.target.value)}
                  placeholder="STU-001"
                  className="w-full text-sm bg-transparent border-b border-neutral-400 pb-1.5 text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:border-neutral-900 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-neutral-700 mb-1.5">
                  Parent Name
                </label>
                <input
                  type="text"
                  value={formState.parentName}
                  onChange={(e) => updateField("parentName", e.target.value)}
                  placeholder="Full name"
                  className="w-full text-sm bg-transparent border-b border-neutral-400 pb-1.5 text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:border-neutral-900 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-neutral-700 mb-1.5">
                  Parent Mobile
                </label>
                <input
                  type="text"
                  value={formState.parentMobile}
                  onChange={(e) => updateField("parentMobile", e.target.value)}
                  placeholder="01XXXXXXXXX"
                  className="w-full text-sm bg-transparent border-b border-neutral-400 pb-1.5 text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:border-neutral-900 transition-colors"
                />
              </div>
            </div>
          </section>

          {/* Fee Items */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-medium text-neutral-600 uppercase tracking-wider">
                Fee Items
              </h3>
              <button
                type="button"
                onClick={handleAddItem}
                className="text-xs font-medium text-neutral-700 hover:text-neutral-900 border border-neutral-400 px-2.5 py-1 rounded-md hover:bg-neutral-100 transition-colors"
              >
                + Add Item
              </button>
            </div>

            {formState.items.map((item, index) => {
              const currentFee = availableFees.find((f) => f.id === item.feeItemId);
              const showMonths = currentFee?.feeType === "monthly";
              return (
                <div
                  key={index}
                  className="grid grid-cols-2 md:grid-cols-7 gap-3 md:gap-4 mb-4 pb-4 border-b border-neutral-200 items-end"
                >
                  <div className="col-span-2 md:col-span-2">
                    <label className="block text-xs text-neutral-700 mb-1.5">
                      Fee
                    </label>
                    <select
                      value={item.feeItemId}
                      onChange={(e) => handleItemChange(index, "feeItemId", e.target.value)}
                      className="w-full text-sm bg-transparent border-b border-neutral-400 pb-1.5 text-neutral-900 focus:outline-none focus:border-neutral-900 transition-colors"
                    >
                      <option value="">Select fee</option>
                      {availableFees.map((fee) => (
                        <option key={fee.id} value={fee.id}>
                          {fee.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-700 mb-1.5">
                      Year
                    </label>
                    <select
                      value={item.year || ""}
                      onChange={(e) => handleItemChange(index, "year", e.target.value)}
                      className="w-full text-sm bg-transparent border-b border-neutral-400 pb-1.5 text-neutral-900 focus:outline-none focus:border-neutral-900 transition-colors"
                    >
                      <option value="">Select</option>
                      {[2025, 2026, 2027, 2028, 2029, 2030].map((y) => (
                        <option key={y} value={String(y)}>{y}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-700 mb-1.5">
                      Months
                    </label>
                    <input
                      type="text"
                      value={item.months || ""}
                      onChange={(e) => handleItemChange(index, "months", e.target.value)}
                      placeholder={showMonths ? "Jan, Feb..." : "—"}
                      disabled={!showMonths}
                      className="w-full text-sm bg-transparent border-b border-neutral-400 pb-1.5 text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:border-neutral-900 transition-colors disabled:opacity-40"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-700 mb-1.5">
                      Qty
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(index, "quantity", Math.max(1, parseInt(e.target.value) || 1))
                      }
                      className="w-full text-sm bg-transparent border-b border-neutral-400 pb-1.5 text-neutral-900 focus:outline-none focus:border-neutral-900 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-700 mb-1.5">
                      Rate
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={item.unitPrice}
                      onChange={(e) =>
                        handleItemChange(index, "unitPrice", Math.max(0, parseFloat(e.target.value) || 0))
                      }
                      className="w-full text-sm bg-transparent border-b border-neutral-400 pb-1.5 text-neutral-900 focus:outline-none focus:border-neutral-900 transition-colors"
                    />
                  </div>
                  <div className="text-right">
                    <label className="block text-xs text-neutral-700 mb-1.5">
                      Amount
                    </label>
                    <p className="text-sm text-neutral-900 pt-1">
                      {(item.unitPrice * item.quantity).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-end pb-1 md:pb-1.5">
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(index)}
                      className="text-xs text-neutral-500 hover:text-red-600 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}

            {formState.items.length === 0 && (
              <p className="text-xs text-neutral-500 text-center py-8">
                No fee items added. Click &quot;+ Add Item&quot; to begin.
              </p>
            )}
          </section>

          {/* Fee Summary */}
          {formState.items.length > 0 && (
            <section className="border-t border-neutral-300 pt-4">
              {formState.discount > 0 && (
                <>
                  <div className="flex justify-between text-sm text-neutral-700 mb-2">
                    <span>Sub Total</span>
                    <span>{itemsTotal.toLocaleString()} BDT</span>
                  </div>
                  <div className="flex justify-between text-sm text-neutral-700 mb-2">
                    <span>Discount</span>
                    <span className="text-green-700">
                      - {formState.discount.toLocaleString()} BDT
                    </span>
                  </div>
                </>
              )}
              <div className="flex justify-between text-sm font-semibold text-neutral-900">
                <span>{formState.discount > 0 ? "Grand Total" : "Total"}</span>
                <span>{grandTotal.toLocaleString()} BDT</span>
              </div>
              <div className="mt-4">
                <label className="block text-xs text-neutral-700 mb-1.5">
                  Discount (BDT)
                </label>
                <input
                  type="number"
                  min={0}
                  value={formState.discount}
                  onChange={(e) =>
                    updateField("discount", Math.max(0, Number(e.target.value) || 0))
                  }
                  placeholder="0"
                  className="w-full max-w-[160px] text-sm bg-transparent border-b border-neutral-400 pb-1.5 text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:border-neutral-900 transition-colors"
                />
              </div>
            </section>
          )}
        </div>
        </div>

        {showPDF && (
          <div className="w-full md:w-[480px] h-80 md:h-auto shrink-0 border-t md:border-t-0 md:border-l border-neutral-300 bg-white">
            <PDFViewer
              style={{ width: "100%", height: "100%", border: "none" }}
              showToolbar
            >
              <GenericPDFDocument reportTableData={reportTableData} />
            </PDFViewer>
          </div>
        )}
      </div>
    </div>
  );
}
