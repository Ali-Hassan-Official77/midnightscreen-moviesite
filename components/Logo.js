import Link from "next/link";

export default function Logo({ compact = false }) {
  return (
    <Link href="/" className="flex items-center gap-3 shrink-0 group" aria-label="MidnightScreen home">
      <span className="relative grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-amber-300/10 to-rose-500/10 border border-amber-200/15 overflow-hidden">
        <span className="absolute inset-0 bg-gradient-to-br from-amber-300/20 to-rose-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <svg viewBox="0 0 32 32" className="relative h-6 w-6">
          <defs>
            <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f5b942" />
              <stop offset="100%" stopColor="#e11d48" />
            </linearGradient>
          </defs>
          <path d="M16 4 L26 16 L16 28 L6 16 Z" fill="none" stroke="url(#logoGrad)" strokeWidth="1.8" strokeLinejoin="round" />
          <circle cx="16" cy="16" r="3" fill="url(#logoGrad)" />
        </svg>
      </span>
      {!compact && (
        <span className="leading-tight">
          <span className="block text-[16px] font-semibold tracking-[.18em] text-amber-50">
            MIDNIGHT<span className="gold-gradient">SCREEN</span>
          </span>
          <span className="block mt-0.5 text-[9px] tracking-[.3em] text-amber-100/40 font-medium">
            CINEMA AFTER DARK
          </span>
        </span>
      )}
    </Link>
  );
}