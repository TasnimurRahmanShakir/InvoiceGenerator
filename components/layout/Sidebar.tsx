"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 h-full bg-white border-r border-neutral-300 flex flex-col shrink-0">
      <div className="px-5 py-6">
        <h1 className="text-sm font-semibold text-neutral-900 tracking-tight">
          Aevitas
        </h1>
      </div>

      <nav className="flex-1 px-3 space-y-0.5">
        <Link
          href="/"
          className={`flex items-center gap-2.5 px-3 py-2 text-sm rounded-md transition-colors ${
            pathname === "/"
              ? "bg-neutral-200 text-neutral-900 font-medium"
              : "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-200"
          }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Fee Invoice
        </Link>
        <Link
          href="/money-receipt"
          className={`flex items-center gap-2.5 px-3 py-2 text-sm rounded-md transition-colors ${
            pathname === "/money-receipt"
              ? "bg-neutral-200 text-neutral-900 font-medium"
              : "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-200"
          }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Money Receipt
        </Link>
      </nav>

      <div className="px-5 py-4 text-[11px] text-neutral-600 border-t border-neutral-200">
        &copy; 2026 Aevitas
      </div>
    </aside>
  );
}
