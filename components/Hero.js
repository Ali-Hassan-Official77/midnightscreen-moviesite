"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import {
  Play,
  Plus,
  Star,
  Info,
  ChevronRight,
  Clock,
  Calendar,
  Volume2,
} from "lucide-react";
import { tmdbImage, mediaDate, mediaTitle } from "@/lib/tmdb";

export default function Hero({ movies = [] }) {
  const items = movies.filter(Boolean).slice(0, 5);
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (items.length < 2 || reduceMotion || isPaused) return;
    const timer = setInterval(
      () => setIndex((c) => (c + 1) % items.length),
      7000
    );
    return () => clearInterval(timer);
  }, [items.length, reduceMotion, isPaused]);

  if (!items.length) return null;

  const movie = items[index];
  const title = mediaTitle(movie);
  const year = String(mediaDate(movie) || "").slice(0, 4);
  const backdrop = tmdbImage(
    movie.backdrop_path || movie.poster_path,
    "original"
  );
  const rating = Number(movie.vote_average || 0).toFixed(1);

  return (
    <section
      className="relative isolate overflow-hidden bg-[#0a0a0f]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* =========================================================
          FULL-BLEED BACKDROP
      ========================================================== */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={`bg-${movie.id}`}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            {backdrop && (
              <Image
                src={backdrop}
                alt=""
                fill
                priority
                unoptimized
                sizes="100vw"
                className="object-cover object-[center_25%]"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f] via-[#0a0a0f]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/60 via-transparent to-transparent" />

        {/* Subtle color tint */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(245,185,66,.06),transparent_50%),radial-gradient(ellipse_at_20%_80%,rgba(225,29,72,.05),transparent_50%)]" />

        {/* Film grain */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%22.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />
      </div>

      {/* =========================================================
          CONTENT AREA
      ========================================================== */}
      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-14 pt-24 pb-12 sm:pt-32 lg:pt-40">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center min-h-[560px] lg:min-h-[640px]">

          {/* ============== LEFT — INFO ============== */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`info-${movie.id}`}
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-20 max-w-2xl"
            >
              {/* NOW PLAYING eyebrow */}
              <div className="mb-6 flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-300 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-300" />
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.42em] text-amber-200/90">
                  Now Playing
                </span>
                <span className="h-px w-12 bg-gradient-to-r from-amber-300/60 to-transparent" />
              </div>

              {/* MASSIVE TITLE — uppercase, bold, cinematic */}
              <h1 className="text-[44px] sm:text-[64px] lg:text-[76px] xl:text-[88px] font-black uppercase leading-[0.88] tracking-[-0.03em] text-white drop-shadow-[0_4px_30px_rgba(0,0,0,.6)]">
                {title}
              </h1>

              {/* Meta row: rating · year · quality badges */}
              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
                <span className="flex items-center gap-1.5 font-semibold text-amber-300">
                  <Star size={15} fill="currentColor" />
                  {rating}
                </span>

                <span className="h-4 w-px bg-white/20" />

                <span className="flex items-center gap-1.5 text-white/70">
                  <Calendar size={13} />
                  {year || "2026"}
                </span>

                <span className="h-4 w-px bg-white/20" />

                <span className="rounded border border-white/25 px-1.5 py-0.5 text-[10px] font-bold text-white/80">
                  4K
                </span>
                <span className="rounded border border-white/25 px-1.5 py-0.5 text-[10px] font-bold text-white/80">
                  HDR
                </span>
                <span className="rounded border border-white/25 px-1.5 py-0.5 text-[10px] font-bold text-white/80">
                  Dolby
                </span>
              </div>

              {/* Description — short, cinematic */}
              <p className="mt-6 max-w-xl text-sm sm:text-base leading-7 text-white/60 line-clamp-3">
                {movie.overview ||
                  "A cinematic journey waiting to unfold. Explore the story, cast, and every frame behind the screen."}
              </p>

              {/* BUTTONS — Play + Add + More Info (jaise image mein) */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href={`/movie/${movie.id}`}
                  className="group inline-flex items-center gap-2.5 rounded-md bg-gradient-to-r from-amber-300 to-amber-200 px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-[#0a0a0f] shadow-[0_8px_30px_rgba(245,185,66,.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_45px_rgba(245,185,66,.55)]"
                >
                  <Play size={16} fill="currentColor" />
                  Play Now
                </Link>

                <button
                  type="button"
                  aria-label="Add to list"
                  className="grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-white/[0.06] text-white backdrop-blur-xl transition-all duration-300 hover:border-amber-300/60 hover:bg-amber-300/10 hover:text-amber-200"
                >
                  <Plus size={20} />
                </button>

                <Link
                  href={`/movie/${movie.id}`}
                  className="group inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-medium text-white/85 backdrop-blur-xl transition-all duration-300 hover:border-white/30 hover:bg-white/[0.08] hover:text-white"
                >
                  <Info size={15} />
                  More Info
                </Link>
              </div>

              {/* Slide indicators — thin lines at bottom */}
              <div className="mt-12 flex items-center gap-3">
                {items.map((item, i) => (
                  <button
                    key={item.id || i}
                    type="button"
                    aria-label={`Show ${mediaTitle(item)}`}
                    onClick={() => setIndex(i)}
                    className="group relative h-[3px] rounded-full overflow-hidden transition-all duration-500"
                    style={{ width: i === index ? 48 : 20 }}
                  >
                    <span
                      className={`block h-full rounded-full transition-all duration-500 ${
                        i === index
                          ? "bg-gradient-to-r from-amber-300 to-amber-200 shadow-[0_0_12px_rgba(245,185,66,.8)]"
                          : "bg-white/20 group-hover:bg-white/40"
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-3 text-[10px] font-bold tracking-[0.3em] text-white/30">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(items.length).padStart(2, "0")}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ============== RIGHT — FLOATING INFO CARD ============== */}
          <div className="relative hidden lg:flex justify-end">
            <AnimatePresence mode="wait">
              <motion.div
                key={`card-${movie.id}`}
                initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduceMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-md"
              >
                {/* Glass card with rating + quick info */}
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-2xl p-6 shadow-[0_30px_80px_rgba(0,0,0,.6)]">
                  {/* Gold accent line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-300 to-transparent" />

                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-amber-200/80">
                    <Volume2 size={12} />
                    Featured Presentation
                  </div>

                  <h3 className="mt-3 text-xl font-bold text-white leading-tight">
                    {title}
                  </h3>

                  <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                    <div className="rounded-lg border border-white/10 bg-white/[0.03] py-3">
                      <div className="text-lg font-bold text-amber-300">
                        {rating}
                      </div>
                      <div className="mt-0.5 text-[9px] uppercase tracking-widest text-white/40">
                        Rating
                      </div>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-white/[0.03] py-3">
                      <div className="text-lg font-bold text-amber-300">
                        {year}
                      </div>
                      <div className="mt-0.5 text-[9px] uppercase tracking-widest text-white/40">
                        Year
                      </div>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-white/[0.03] py-3">
                      <div className="text-lg font-bold text-amber-300">
                        4K
                      </div>
                      <div className="mt-0.5 text-[9px] uppercase tracking-widest text-white/40">
                        Quality
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/movie/${movie.id}`}
                    className="group mt-5 flex items-center justify-between rounded-lg border border-amber-300/30 bg-amber-300/[0.06] px-4 py-3 text-sm text-amber-100 transition-all hover:bg-amber-300/[0.12]"
                  >
                    <span className="font-medium">View full details</span>
                    <ChevronRight
                      size={16}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* =========================================================
          BOTTOM FADE (into next section)
      ========================================================== */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent" />
    </section>
  );
}