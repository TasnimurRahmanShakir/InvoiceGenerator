"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    {
      href: "/",
      label: "Fee Invoice",
      svg: (
        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      href: "/money-receipt",
      label: "Money Receipt",
      svg: (
        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          w-56 h-full bg-white border-r border-neutral-300 flex flex-col shrink-0
          transition-transform duration-200
          md:relative md:translate-x-0
          fixed inset-y-0 left-0 z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between px-5 py-6">
          <h1 className="text-sm font-semibold text-neutral-900 tracking-tight">
            Aevitas
          </h1>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden p-1 rounded text-neutral-500 hover:text-neutral-900"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 px-3 space-y-0.5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-2.5 px-3 py-2 text-sm rounded-md transition-colors ${
                pathname === link.href
                  ? "bg-neutral-200 text-neutral-900 font-medium"
                  : "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-200"
              }`}
            >
              {link.svg}
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="px-5 py-4 text-[11px] text-neutral-600 border-t border-neutral-200">
          &copy; 2026 Aevitas
        </div>
      </aside>

      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-3 left-3 z-20 p-2 rounded-md bg-white border border-neutral-300 shadow-sm"
        aria-label="Open menu"
      >
        <svg className="w-5 h-5 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>
    </>
  );
}
