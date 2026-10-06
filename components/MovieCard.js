"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { tmdbImage, mediaTitle, mediaDate } from "@/lib/tmdb";
import RatingBadge from "@/components/RatingBadge";
import SaveButton from "@/components/SaveButton";

export default function MovieCard({ movie, priority = false }) {
  const reduce = useReducedMotion();
  const poster = tmdbImage(movie.poster_path, "w500");

  return (
    <motion.article
      whileHover={reduce ? undefined : { y: -8 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-amber-200/[0.08] bg-gradient-to-b from-[#0d0d14] to-[#0a0a0f] shadow-[0_12px_40px_rgba(0,0,0,.3)] transition-shadow duration-500 hover:shadow-[0_20px_60px_rgba(245,185,66,.1)] hover:border-amber-200/20"
    >
      <SaveButton movieId={movie.id} />

      <Link href={`/movie/${movie.id}`}>
        <div className="relative aspect-[2/3] overflow-hidden bg-[#111620]">
          {poster ? (
            <Image
              src={poster}
              alt={`${mediaTitle(movie)} poster`}
              fill
              priority={priority}
              sizes="(max-width:640px) 45vw,(max-width:1024px) 23vw,220px"
              className="object-cover transition duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="grid h-full place-items-center text-amber-100/30 text-xs">
              No artwork
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-amber-300/[.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="absolute bottom-3 left-3">
            <RatingBadge value={movie.vote_average} />
          </div>

          {/* Gold sweep on hover */}
          <div className="pointer-events-none absolute -left-[40%] top-0 h-full w-[40%] rotate-[20deg] bg-gradient-to-r from-transparent via-amber-200/[0.12] to-transparent blur-xl transition-transform duration-[1200ms] group-hover:translate-x-[280%]" />
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-sm text-amber-50 line-clamp-1">
            {mediaTitle(movie)}
          </h3>
          <p className="mt-1 text-xs text-amber-50/35">
            {String(mediaDate(movie)).slice(0, 4)}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}