"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import MovieCard from "@/components/MovieCard";

export default function MovieGrid({ initialMovies, totalPages, fetchUrl }) {
  const [movies, setMovies] = useState(initialMovies);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  async function loadMore() {
    setLoading(true);
    try {
      const next = page + 1;
      const r = await fetch(`${fetchUrl}?page=${next}`);
      const d = await r.json();
      setMovies((p) => [...p, ...(d.results || [])]);
      setPage(next);
    } finally {
      setLoading(false);
    }
  }

  if (!movies?.length) {
    return (
      <p className="py-20 text-center text-amber-50/35">
        Nothing turned up. Try another category.
      </p>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>

      {page < totalPages && (
        <div className="flex justify-center mt-12">
          <button
            type="button"
            onClick={loadMore}
            disabled={loading}
            className="shine inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-amber-200/[.03] text-amber-200 px-7 py-3 text-sm font-medium hover:bg-amber-200/10 hover:border-amber-300/60 disabled:opacity-50 transition-all"
          >
            {loading && <Loader2 size={14} className="animate-spin" />}
            {loading ? "Loading..." : "Load more"}
          </button>
        </div>
      )}
    </div>
  );
}