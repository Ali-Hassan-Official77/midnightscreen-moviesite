"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search, Loader2 } from "lucide-react";
import { tmdbImage, mediaTitle, mediaDate } from "@/lib/tmdb";

export default function SearchBar({ autoFocus = false }) {
  const [q, setQ] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    const t = setTimeout(async () => {
      try {
        const r = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
        const d = await r.json();
        setResults((d.results || []).slice(0, 6));
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(t);
  }, [q]);

  useEffect(() => {
    const f = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", f);
    return () => document.removeEventListener("mousedown", f);
  }, []);

  function submit(e) {
    e.preventDefault();
    if (!q.trim()) return;
    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(q.trim())}`);
  }

  return (
    <div ref={ref} className="relative w-full">
      <form onSubmit={submit}>
        <label htmlFor="site-search" className="sr-only">Search</label>
        <div className="relative flex items-center">
          <Search size={15} className="absolute left-3.5 text-amber-200/40 pointer-events-none" />
          <input
            id="site-search"
            type="search"
            value={q}
            autoFocus={autoFocus}
            onChange={(e) => {
              setQ(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            placeholder="Search the collection..."
            className="w-full bg-amber-200/[.03] border border-amber-200/10 focus:border-amber-300/50 rounded-full pl-10 pr-9 py-2.5 text-sm text-amber-50 placeholder:text-amber-100/25 outline-none transition-colors focus:bg-amber-200/[.06]"
          />
          {loading && (
            <Loader2 size={14} className="absolute right-3.5 animate-spin text-amber-300" />
          )}
        </div>
      </form>

      {open && q.trim() && (
        <div className="absolute mt-2 w-full rounded-2xl border border-amber-200/10 bg-[#0d0d14]/98 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,.6)] overflow-hidden z-50">
          {results.length === 0 && !loading && (
            <p className="px-4 py-3 text-sm text-amber-50/40">No titles found.</p>
          )}
          <ul>
            {results.map((x) => (
              <li key={`${x.media_type || "movie"}-${x.id}`}>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setQ("");
                    router.push(`/movie/${x.id}`);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-amber-200/[.05] text-left transition-colors"
                >
                  <div className="relative shrink-0 rounded overflow-hidden bg-amber-200/5" style={{ width: 36, height: 52 }}>
                    {x.poster_path && (
                      <Image
                        src={tmdbImage(x.poster_path, "w92")}
                        alt=""
                        fill
                        sizes="36px"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <span className="min-w-0">
                    <span className="block text-sm text-amber-50 truncate">{mediaTitle(x)}</span>
                    <span className="block text-xs text-amber-100/35">
                      {String(mediaDate(x)).slice(0, 4)}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
          {results.length > 0 && (
            <button
              type="button"
              onClick={submit}
              className="w-full text-center text-xs text-amber-300/70 hover:text-amber-300 py-2.5 border-t border-amber-200/10 transition-colors"
            >
              See all results
            </button>
          )}
        </div>
      )}
    </div>
  );
}