"use client";

import { Bookmark } from "lucide-react";
import { useReadingList } from "@/lib/useReadingList";

export default function SaveButton({ movieId, variant = "icon" }) {
  const { isSaved, toggle } = useReadingList();
  const saved = isSaved(movieId);

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggle(movieId);
        }}
        aria-pressed={saved}
        aria-label={saved ? "Remove from list" : "Add to list"}
        className={`absolute top-3 right-3 z-10 grid place-items-center w-9 h-9 rounded-full backdrop-blur-md border transition-all duration-300 ${
          saved
            ? "bg-gradient-to-br from-amber-300 to-amber-200 text-[#0a0a0f] border-amber-200 shadow-[0_4px_20px_rgba(245,185,66,.4)]"
            : "bg-black/40 text-amber-50/80 border-amber-200/15 hover:bg-amber-200/10 hover:border-amber-200/30"
        }`}
      >
        <Bookmark size={15} fill={saved ? "currentColor" : "none"} />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => toggle(movieId)}
      aria-pressed={saved}
      className={`inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm transition-all duration-300 ${
        saved
          ? "border-amber-300 bg-gradient-to-r from-amber-300 to-amber-200 text-[#0a0a0f] shadow-[0_8px_30px_rgba(245,185,66,.3)]"
          : "border-amber-200/15 bg-amber-200/[.03] text-amber-50/75 hover:border-amber-200/40 hover:text-amber-50"
      }`}
    >
      <Bookmark size={16} fill={saved ? "currentColor" : "none"} />
      {saved ? "In My List" : "Save to My List"}
    </button>
  );
}