import Link from "next/link";
import { tmdb } from "@/lib/tmdb";

export const revalidate = 3600;
export const runtime = 'edge';
export default async function GenresPage() {
  let genres = [];

  try {
    const data = await tmdb.genres();

    // TMDB normally returns { results: [...] }
    // But never allow the page to crash if API response is unexpected.
    genres = Array.isArray(data?.genres)
      ? data.genres
      : Array.isArray(data?.results)
        ? data.results
        : [];
  } catch (error) {
    console.error("Genres page error:", error);
  }

  return (
    <main className="min-h-screen bg-[#05070b] px-5 py-16 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">

        <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/70">
          Explore by mood
        </p>

        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Every genre. One place.
        </h1>

        <p className="mt-4 max-w-2xl text-white/45">
          Choose a category and discover movies curated around your favorite
          genres.
        </p>

        {genres.length > 0 ? (
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {genres.map((genre, index) => (
              <Link
                key={genre.id}
                href={`/genre/${genre.id}`}
                className="group relative min-h-36 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/[0.08]"
              >
                <span className="text-xs text-white/25">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h2 className="mt-10 text-xl font-medium">
                  {genre.name}
                </h2>

                <span className="mt-2 block text-xs text-cyan-300 opacity-0 transition-opacity duration-300 group-hover:opacity-70">
                  Explore →
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.03] p-8">
            <h2 className="text-xl font-medium">
              Genres are temporarily unavailable
            </h2>

            <p className="mt-2 text-sm leading-6 text-white/40">
              Please check your TMDB API configuration and try again.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}