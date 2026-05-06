"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { label: "Detail", segment: "edit" },
  { label: "Slide", segment: "slides" },
  { label: "Game", segment: "game" },
];

export function AdminBookNav({ bookId }: { bookId: string }) {
  const pathname = usePathname();

  return (
    <div className="flex gap-1 mb-6 border-b border-[#F0E6FF] pb-1">
      {TABS.map((tab) => {
        const href = `/admin/books/${bookId}/${tab.segment}`;
        const active = pathname.startsWith(href);
        return (
          <Link
            key={tab.segment}
            href={href}
            className={`px-5 py-2 rounded-t-xl text-sm font-bold transition-colors ${
              active
                ? "bg-[#FF6B6B] text-white"
                : "text-[#7C6FAA] hover:bg-[#F0E6FF]"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
