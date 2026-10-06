import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MovieCard from "@/components/MovieCard";

export default function SectionGrid({ title, subtitle, movies = [], href, eyebrow = "Curated" }) {
  if (!movies?.length) return null;

  return (
    <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
      <div className="flex items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-amber-300/60">
            <span className="h-px w-6 bg-amber-300/40" />
            {eyebrow}
          </div>
          <h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-amber-50">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1.5 text-sm text-amber-50/35">{subtitle}</p>
          )}
        </div>
        {href && (
          <Link
            href={href}
            className="group hidden sm:inline-flex items-center gap-1.5 text-xs text-amber-100/50 hover:text-amber-200 transition-colors"
          >
            View all
            <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies.slice(0, 12).map((m, i) => (
          <MovieCard key={m.id} movie={m} priority={i < 2} />
        ))}
      </div>
    </section>
  );
}