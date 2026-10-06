"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";

export default function TrailerButton({ youtubeKey }) {
  const [open, setOpen] = useState(false);
  if (!youtubeKey) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="shine inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-300 to-amber-200 px-6 py-3 text-sm font-semibold text-[#0a0a0f] shadow-[0_10px_30px_rgba(245,185,66,.25)] hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(245,185,66,.4)] transition-all duration-300"
      >
        <Play size={16} fill="currentColor" /> Watch trailer
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-4xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute -top-12 right-0 grid place-items-center h-10 w-10 rounded-full border border-amber-200/20 text-amber-100/70 hover:text-amber-200 hover:border-amber-200/40 transition-colors"
                aria-label="Close trailer"
              >
                <X size={18} />
              </button>
              <iframe
                className="w-full h-full rounded-2xl border border-amber-200/15 shadow-[0_20px_80px_rgba(0,0,0,.8)]"
                src={`https://www.youtube.com/embed/${youtubeKey}?autoplay=1`}
                title="Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}