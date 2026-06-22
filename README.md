# Invoice Generator

A web application for **Aevitas International School** (Dhaka, Bangladesh) to generate fee invoices and money receipts as downloadable PDF documents.

Built with [Next.js](https://nextjs.org/) (App Router) and [@react-pdf/renderer](https://react-pdf.org/).

## Features

- **Fee Invoice** — Generate itemized fee invoices with student info, grade-appropriate fee items (admission, tuition, session fees, etc.), discounts, and amount-in-words.
- **Money Receipt** — Generate payment acknowledgment receipts with dual copies (Student Copy + Accounts Copy) separated by a cut line, supporting multiple payment methods.

## Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js](https://nextjs.org/) 16 (App Router) | Full-stack React framework |
| [React](https://react.dev/) 19 | UI library |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) v4 | Utility-first CSS |
| [@react-pdf/renderer](https://react-pdf.org/) | Client-side PDF generation |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to use the app.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## Project Structure

```
├── app/                          # App Router pages
│   ├── layout.tsx                # Root layout (Geist font, Sidebar)
│   ├── page.tsx                  # / — Fee Invoice
│   └── money-receipt/
│       └── page.tsx              # /money-receipt — Money Receipt
├── components/
│   ├── invoice/InvoiceForm.tsx   # Fee invoice form
│   ├── layout/Sidebar.tsx        # Navigation sidebar
│   ├── money-receipt/MoneyReceiptForm.tsx
│   └── pdf/                      # PDF building blocks
│       ├── GenericPDFDocument.tsx
│       ├── PDFChequeReceipt.tsx
│       ├── PDFFooter.tsx
│       ├── PDFHeader.tsx
│       ├── PDFPaymentInfo.tsx
│       ├── PDFStudentInfo.tsx
│       └── PDFTable.tsx
├── config/
│   └── company.ts                # School configuration
├── data/
│   └── cost-map.ts               # Fee catalog
├── lib/
│   ├── types.ts                  # TypeScript definitions
│   └── utils.ts                  # Utilities (number-to-words, table mapping)
└── public/
    ├── AEVITAS.png               # School logo
    └── Aevitas_Watermark.png     # PDF watermark
```
