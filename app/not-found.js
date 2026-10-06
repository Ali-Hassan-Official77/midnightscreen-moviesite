import Link from "next/link";
export const runtime = 'edge';
export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-5">
      <div className="mb-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-amber-200/50">
        <span className="h-px w-8 bg-amber-300/40" />
        Reel not found
        <span className="h-px w-8 bg-amber-300/40" />
      </div>
      <h1 className="text-5xl sm:text-6xl font-semibold tracking-[-0.04em] text-amber-50">
        This scene was <span className="gold-gradient">cut</span>
      </h1>
      <p className="mt-5 max-w-md text-sm leading-7 text-amber-50/40">
        The title you're looking for isn't in our archive. It may have been pulled,
        or the link may be out of date.
      </p>
      <Link
        href="/"
        className="mt-9 shine inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-300 to-amber-200 px-7 py-3.5 text-sm font-semibold text-[#0a0a0f] shadow-[0_10px_40px_rgba(245,185,66,.25)] hover:-translate-y-0.5 transition-all duration-300"
      >
        Back to MidnightScreen
      </Link>
    </div>
  );
}