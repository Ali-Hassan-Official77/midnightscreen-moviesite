import { Star } from "lucide-react";
import { formatRating } from "@/lib/utils";

export default function RatingBadge({ value, size = "sm" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium text-amber-200 ${
        size === "lg" ? "text-base" : "text-xs"
      }`}
    >
      <Star size={size === "lg" ? 16 : 13} fill="currentColor" className="text-amber-300" />
      {formatRating(value)}
    </span>
  );
}