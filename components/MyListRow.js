"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { tmdbImage, mediaTitle, mediaDate } from "@/lib/tmdb";
import RatingBadge from "@/components/RatingBadge";

export default function MyListRow({ movies = [], title = "My List", href = "/reading-list" }) {
  if (!movies?.length) return null;

  return (
    <section className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-14 py-8">
      {/* Header */}
      <div className="flex items-end justify-between mb-5">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
          {title}
        </h2>
        <Link
          href={href}
          className="group flex items-center gap-1 text-xs font-medium text-white/50 hover:text-amber-200 transition-colors"
        >
          View all
          <ChevronRight size={14} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Horizontal scroll row */}
      <div className="row-scroll flex gap-4 overflow-x-auto pb-4 -mx-1 px-1 snap-x snap-mandatory">
        {movies.slice(0, 10).map((m) => (
          <PosterTile key={m.id} movie={m} />
        ))}
      </div>
    </section>
  );
}

function PosterTile({ movie }) {
  const poster = tmdbImage(movie.poster_path, "w500");
  const title = mediaTitle(movie);
  const year = String(mediaDate(movie)).slice(0, 4);

  return (
    <Link
      href={`/movie/${movie.id}`}
      className="group relative shrink-0 w-[150px] sm:w-[170px] snap-start"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg border border-white/10 bg-[#0d0d14] shadow-[0_8px_24px_rgba(0,0,0,.4)] transition-all duration-300 group-hover:border-amber-300/50 group-hover:shadow-[0_12px_40px_rgba(245,185,66,.2)]">
        {poster ? (
          <Image
            src={poster}
            alt={title}
            fill
            sizes="170px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full place-items-center text-white/30 text-xs">
            No artwork
          </div>
        )}

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

        {/* Rating badge bottom-left */}
        <div className="absolute bottom-2 left-2">
          <span className="inline-flex items-center gap-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-bold text-amber-300 backdrop-blur-sm">
            ★ {Number(movie.vote_average || 0).toFixed(1)}
          </span>
        </div>

        {/* Hover play overlay */}
        <div className="absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-amber-300/95 text-[#0a0a0f] shadow-[0_0_30px_rgba(245,185,66,.6)]">
            <svg viewBox="0 0 24 24" className="h-5 w-5 translate-x-0.5" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <h3 className="text-sm font-semibold text-white line-clamp-1 group-hover:text-amber-200 transition-colors">
          {title}
        </h3>
        <p className="mt-0.5 text-xs text-white/40">{year}</p>
      </div>
    </Link>
  );
}