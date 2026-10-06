import Link from "next/link";
import { Mail, MapPin, Instagram, Twitter, Youtube } from "lucide-react";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="relative border-t border-amber-200/10 bg-[#08080c] text-amber-50 overflow-hidden">
      {/* Decorative gradient */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-80 w-[800px] bg-gradient-to-b from-amber-300/[.06] to-transparent blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 py-16">
        <div className="grid md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-10">
          <div>
            <Logo />
            <p className="mt-6 max-w-sm text-sm leading-7 text-amber-50/40">
              Cinema after dark. A curated discovery platform for films, series, and stories worth remembering — designed for those who take their watching seriously.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {[Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid place-items-center h-9 w-9 rounded-full border border-amber-200/10 text-amber-100/50 hover:text-amber-200 hover:border-amber-200/30 transition-colors"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-amber-200/50">Explore</h3>
            <div className="mt-5 grid gap-3 text-sm text-amber-50/55">
              <Link href="/" className="hover:text-amber-100 transition-colors">Discover</Link>
              <Link href="/movies" className="hover:text-amber-100 transition-colors">All Movies</Link>
              <Link href="/genres" className="hover:text-amber-100 transition-colors">Genres</Link>
              <Link href="/web-series" className="hover:text-amber-100 transition-colors">Web Series</Link>
            </div>
          </div>

          <div>
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-amber-200/50">Account</h3>
            <div className="mt-5 grid gap-3 text-sm text-amber-50/55">
              <Link href="/reading-list" className="hover:text-amber-100 transition-colors">My List</Link>
              <Link href="/about" className="hover:text-amber-100 transition-colors">About</Link>
              <Link href="/contact" className="hover:text-amber-100 transition-colors">Contact</Link>
              <Link href="/privacy" className="hover:text-amber-100 transition-colors">Privacy</Link>
            </div>
          </div>

          <div>
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-amber-200/50">Studio</h3>
            <div className="mt-5 space-y-3 text-sm text-amber-50/55">
              <p className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 text-amber-300/60 shrink-0" />
                Rawalpindi, Pakistan
              </p>
              <a
                href="mailto:hello@midnightscreen.com"
                className="flex items-center gap-2 hover:text-amber-200 transition-colors"
              >
                <Mail size={14} className="text-amber-300/60" />
                ikkamartty83bila@midnightscreen.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-amber-200/10 flex flex-col sm:flex-row gap-3 justify-between text-xs text-amber-100/30">
          <span>© {new Date().getFullYear()} MidnightScreen. All rights reserved.</span>
          <span>Movie data & artwork powered by TMDB.</span>
        </div>
      </div>
    </footer>
  );
}