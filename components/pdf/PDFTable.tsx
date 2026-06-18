"use client";

import { Text, View } from "@react-pdf/renderer";
import type { ReportRowDto, ReportColumnDto, ReportCellDto } from "@/lib/types";

const ROW_HEIGHT = 24;

interface SpanInfo {
  rowIndex: number;
  colIndex: number;
  rowSpan: number;
  colSpan: number;
  cell: ReportCellDto;
}

interface SpanRowResult {
  flatRows: (ReportCellDto | null)[][];
  spans: SpanInfo[];
}

function resolveSpans(rows: ReportRowDto[], colCount: number): SpanRowResult {
  const activeSpans: (SpanInfo | null)[] = new Array(colCount).fill(null);
  const spans: SpanInfo[] = [];
  const flatRows: (ReportCellDto | null)[][] = [];

  for (let ri = 0; ri < rows.length; ri++) {
    const row = rows[ri];
    const flatRow: (ReportCellDto | null)[] = new Array(colCount).fill(null);

    let colIndex = 0;

    while (colIndex < colCount && activeSpans[colIndex]) {
      colIndex++;
    }

    for (let ci = 0; ci < row.cells.length && colIndex < colCount; ci++) {
      const cell = row.cells[ci];
      const colSpan = cell.colSpan || 1;
      const rowSpan = cell.rowSpan || 1;

      if (rowSpan === 0) {
        colIndex += colSpan;
        while (colIndex < colCount && activeSpans[colIndex]) {
          colIndex++;
        }
        continue;
      }

      for (let s = 0; s < colSpan && colIndex + s < colCount; s++) {
        flatRow[colIndex + s] = s === 0 ? cell : null;
      }

      if (rowSpan > 1) {
        const span: SpanInfo = {
          rowIndex: ri,
          colIndex,
          rowSpan,
          colSpan,
          cell,
        };
        spans.push(span);
        for (let s = 0; s < colSpan && colIndex + s < colCount; s++) {
          activeSpans[colIndex + s] = span;
        }
      }

      colIndex += colSpan;

      while (colIndex < colCount && activeSpans[colIndex]) {
        colIndex++;
      }
    }

    for (let c = 0; c < colCount; c++) {
      if (activeSpans[c]) {
        const span = activeSpans[c]!;
        if (ri >= span.rowIndex + span.rowSpan - 1) {
          activeSpans[c] = null;
        }
      }
    }

    flatRows.push(flatRow);
  }

  return { flatRows, spans };
}

function getCellStyle(
  cell: ReportCellDto,
  rowIndex: number,
  isSubTotal: boolean,
  isGrandTotal: boolean,
  colWidth: string
) {
  let bgColor = "#FFFFFF";

  if (isGrandTotal) {
    bgColor = "#EEEEEE";
  } else if (isSubTotal) {
    bgColor = "#E3F2FD";
  } else if (rowIndex % 2 === 1) {
    bgColor = "#F8F9FA";
  }

  if (cell.backgroundColor) {
    bgColor = cell.backgroundColor;
  }

  return {
    width: colWidth,
    paddingVertical: 4,
    paddingHorizontal: 5,
    backgroundColor: bgColor,
    border: "0.5pt solid #DEE2E6",
    justifyContent: "center" as const,
  };
}

function getTextStyle(
  cell: ReportCellDto,
  isSubTotal: boolean,
  isGrandTotal: boolean,
  colKey?: string
) {
  const color = cell.textColor
    ? cell.textColor
    : isGrandTotal
      ? "#1a237e"
      : "#424242";

  const isDescription = colKey === "description" && cell.text.trim().length > 0;

  return {
    fontSize: isSubTotal ? 8 : 9,
    color,
    fontWeight: (cell.isBold || isSubTotal || isGrandTotal || isDescription ? "bold" : "normal") as "bold" | "normal",
    fontStyle: (cell.isItalic ? "italic" : "normal") as "italic" | "normal",
    textAlign: (cell.alignment === "right"
      ? "right"
      : cell.alignment === "center"
        ? "center"
        : "left") as "left" | "center" | "right",
  };
}

interface PDFTableProps {
  columns: ReportColumnDto[];
  rows: ReportRowDto[];
}

export default function PDFTable({ columns, rows }: PDFTableProps) {
  const colCount = columns.length;
  const totalWeight = columns.reduce((sum, c) => sum + c.widthWeight, 0);

  const colWidths = columns.map(
    (c) => `${((c.widthWeight / totalWeight) * 100).toFixed(2)}%`
  );

  const { flatRows, spans } = resolveSpans(rows, colCount);

  const headerStyle = {
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: "#0a2351",
    border: "0.5pt solid #0a2351",
    justifyContent: "center" as const,
  };

  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        {columns.map((col, i) => (
          <View key={col.key} style={[headerStyle, { width: colWidths[i] }]}>
            <Text
              style={{
                fontSize: 10,
                fontWeight: "bold" as const,
                color: "#FFFFFF",
                textAlign: "center" as const,
              }}
            >
              {col.title.toUpperCase()}
            </Text>
          </View>
        ))}
      </View>

      <View style={{ position: "relative" }}>
        {flatRows.map((flatRow, ri) => {
          const originalRow = rows[ri];
          const isSub = !!originalRow.isSubTotal;
          const isGrand = !!originalRow.isGrandTotal;

          return (
            <View key={ri} style={{ flexDirection: "row" }}>
              {columns.map((col, ci) => {
                const cell = flatRow[ci];

                if (!cell) {
                  const isCovered = spans.some(
                    (s) =>
                      s.rowIndex < ri &&
                      ri < s.rowIndex + s.rowSpan &&
                      ci >= s.colIndex &&
                      ci < s.colIndex + s.colSpan
                  );
                  if (isCovered) {
                    let bg = "#FFFFFF";
                    if (ri % 2 === 1) bg = "#F8F9FA";

                    const coveringSpan = spans.find(
                      (s) =>
                        s.rowIndex < ri &&
                        ri < s.rowIndex + s.rowSpan &&
                        ci >= s.colIndex &&
                        ci < s.colIndex + s.colSpan
                    );
                    if (coveringSpan) {
                      const sr = rows[coveringSpan.rowIndex];
                      if (sr?.isGrandTotal) bg = "#EEEEEE";
                      else if (sr?.isSubTotal) bg = "#E3F2FD";
                    }

                    return (
                      <View
                        key={`${ri}-${ci}`}
                        style={{
                          width: colWidths[ci],
                          backgroundColor: bg,
                          border: "0.5pt solid #DEE2E6",
                          height: ROW_HEIGHT,
                        }}
                      />
                    );
                  }
                  return null;
                }

                const colSpan = cell.colSpan || 1;
                let spanWidth = colWidths[ci];
                if (colSpan > 1) {
                  let totalPct = 0;
                  for (let s = 0; s < colSpan; s++) {
                    if (ci + s < colWidths.length) {
                      totalPct += parseFloat(colWidths[ci + s]);
                    }
                  }
                  spanWidth = `${totalPct.toFixed(2)}%`;
                }

                return (
                  <View
                    key={`${ri}-${ci}`}
                    style={getCellStyle(cell, ri, isSub, isGrand, spanWidth)}
                  >
                    <Text style={getTextStyle(cell, isSub, isGrand, col.key)}>
                      {cell.text}
                    </Text>
                  </View>
                );
              })}
            </View>
          );
        })}

        {spans.map((span, si) => {
          let spanWidth = 0;
          for (let s = 0; s < span.colSpan; s++) {
            if (span.colIndex + s < colWidths.length) {
              spanWidth += parseFloat(colWidths[span.colIndex + s]);
            }
          }

          const height = ROW_HEIGHT * span.rowSpan;
          const leftOffset = colWidths.slice(0, span.colIndex).reduce(
            (sum, w) => sum + parseFloat(w),
            0
          );

          const spanRow = rows[span.rowIndex];
          const isSpanSub = !!spanRow?.isSubTotal;
          const isSpanGrand = !!spanRow?.isGrandTotal;

          let bgColor = "#FFFFFF";
          if (isSpanGrand) bgColor = "#EEEEEE";
          else if (isSpanSub) bgColor = "#E3F2FD";
          else if (span.rowIndex % 2 === 1) bgColor = "#F8F9FA";
          if (span.cell.backgroundColor) bgColor = span.cell.backgroundColor;

          return (
            <View
              key={`span-${si}`}
              style={{
                position: "absolute",
                left: `${leftOffset.toFixed(2)}%`,
                top: 0,
                width: `${spanWidth.toFixed(2)}%`,
                height,
                paddingVertical: 4,
                paddingHorizontal: 5,
                backgroundColor: bgColor,
                border: "0.5pt solid #DEE2E6",
                justifyContent: "center",
              }}
            >
              <Text style={getTextStyle(span.cell, isSpanSub, isSpanGrand)}>
                {span.cell.text}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
