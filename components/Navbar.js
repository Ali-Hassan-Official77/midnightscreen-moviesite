"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, Bookmark, ChevronDown, Compass, Film, Tv, Sparkles } from "lucide-react";
import Logo from "@/components/Logo";
import SearchBar from "@/components/SearchBar";

const GENRES = [
  [28, "Action"], [12, "Adventure"], [16, "Animation"], [35, "Comedy"],
  [80, "Crime"], [99, "Documentary"], [18, "Drama"], [14, "Fantasy"],
  [27, "Horror"], [9648, "Mystery"], [10749, "Romance"], [878, "Sci-Fi"],
  [53, "Thriller"], [10752, "War"], [37, "Western"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [genres, setGenres] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-amber-200/10 bg-[#0a0a0f]/95 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,.4)]"
          : "border-transparent bg-[#0a0a0f]/70 backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="h-[78px] flex items-center justify-between gap-5">
          <Logo />

          <nav className="hidden lg:flex items-center gap-1 text-sm text-amber-50/60">
            <NavLink href="/" icon={<Compass size={14} />} label="Discover" />
            <NavLink href="/movies" icon={<Film size={14} />} label="Movies" />
            <NavLink href="/web-series" icon={<Tv size={14} />} label="Series" />

            <div
              className="relative"
              onMouseEnter={() => setGenres(true)}
              onMouseLeave={() => setGenres(false)}
            >
              <button className="flex items-center gap-1.5 hover:text-amber-100 px-3 py-2 rounded-full transition-colors">
                <Sparkles size={14} /> Genres
                <ChevronDown size={13} className={`transition-transform ${genres ? "rotate-180" : ""}`} />
              </button>
              {genres && (
                <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[560px] rounded-2xl border border-amber-200/10 bg-[#0d0d14]/98 backdrop-blur-2xl p-4 shadow-[0_20px_60px_rgba(0,0,0,.6)] grid grid-cols-3 gap-1">
                  {GENRES.map(([id, name]) => (
                    <Link
                      key={id}
                      href={`/genre/${id}`}
                      className="rounded-lg px-3 py-2 text-xs text-amber-50/55 hover:bg-gradient-to-r hover:from-amber-300/10 hover:to-rose-500/10 hover:text-amber-100 transition-colors"
                    >
                      {name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <NavLink href="/reading-list" icon={<Bookmark size={14} />} label="My List" />
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <div className="w-60 lg:w-72">
              <SearchBar />
            </div>
            <Link
              href="/reading-list"
              className="grid place-items-center h-10 w-10 rounded-full border border-amber-200/10 bg-amber-200/[.02] text-amber-100/60 hover:text-amber-200 hover:border-amber-200/30 transition-colors"
              aria-label="My list"
            >
              <Bookmark size={16} />
            </Link>
          </div>

          <button
            className="lg:hidden p-2 text-amber-50/70 hover:text-amber-100"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-amber-200/10 bg-[#0d0d14] px-5 py-5 space-y-5">
          <SearchBar />
          <div className="grid grid-cols-2 gap-2">
            <Link href="/" className="mobile-nav">Discover</Link>
            <Link href="/movies" className="mobile-nav">Movies</Link>
            <Link href="/web-series" className="mobile-nav">Series</Link>
            <Link href="/genres" className="mobile-nav">All Genres</Link>
            <Link href="/reading-list" className="mobile-nav col-span-2">My List</Link>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({ href, icon, label }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-1.5 hover:text-amber-100 px-3 py-2 rounded-full transition-colors"
    >
      {icon} {label}
    </Link>
  );
}