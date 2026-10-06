import Hero from "@/components/Hero";
import MyListRow from "@/components/MyListRow";
import SectionGrid from "@/components/SectionGrid";
import { tmdb } from "@/lib/tmdb";

export const revalidate = 1800;
export const runtime = 'edge';

export default async function HomePage() {
  const [t, p, r, u, n] = await Promise.all([
    tmdb.trending("week"),
    tmdb.popular(),
    tmdb.topRated(),
    tmdb.upcoming(),
    tmdb.nowPlaying(),
  ]);

  return (
    <>
      <Hero movies={t?.results} />

      {/* My List row — horizontal scroll of trending */}
      <MyListRow
        movies={t?.results}
        title="My List"
        href="/reading-list"
      />

      <div className="bg-[#0a0a0f]">
        <SectionGrid
          eyebrow="Trending"
          title="Trending this week"
          subtitle="What the world is watching right now"
          movies={t?.results}
          href="/movies"
        />
        <SectionGrid
          eyebrow="Popular"
          title="Box office hits"
          subtitle="Big screen energy worth a closer look"
          movies={p?.results}
          href="/movies"
        />
        <SectionGrid
          eyebrow="Critics' pick"
          title="Highly rated"
          subtitle="Acclaim across every screen"
          movies={r?.results}
          href="/movies"
        />
        <SectionGrid
          eyebrow="Coming soon"
          title="On the horizon"
          subtitle="Upcoming releases to keep on your list"
          movies={u?.results}
          href="/movies"
        />
        <SectionGrid
          eyebrow="In cinemas"
          title="Now showing"
          subtitle="Currently playing on the big screen"
          movies={n?.results}
          href="/movies"
        />
      </div>
    </>
  );
}