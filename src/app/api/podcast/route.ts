import { NextResponse } from "next/server";

interface Episode {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  duration: string;
  episode: number | null;
  season: number | null;
  image: string | null;
  audioUrl: string;
}

const RSS_URL = "https://anchor.fm/s/111d0d7cc/podcast/rss";

let cachedEpisodes: Episode[] | null = null;
let cachedAt = 0;
const CACHE_TTL = 1000 * 60 * 15;

function parseRSS(xml: string): Episode[] {
  const items: Episode[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match: RegExpExecArray | null;

  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];

    const titleMatch = block.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/);
    const descMatch = block.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/);
    const linkMatch = block.match(/<link>(.*?)<\/link>/);
    const dateMatch = block.match(/<pubDate>(.*?)<\/pubDate>/);
    const durationMatch = block.match(/<itunes:duration>(.*?)<\/itunes:duration>/);
    const episodeMatch = block.match(/<itunes:episode>(.*?)<\/itunes:episode>/);
    const seasonMatch = block.match(/<itunes:season>(.*?)<\/itunes:season>/);
    const imageMatch = block.match(/<itunes:image href="(.*?)"\/>/);
    const audioMatch = block.match(/<enclosure url="(.*?)"/);

    if (titleMatch && audioMatch) {
      let description = descMatch ? descMatch[1].replace(/<[^>]*>/g, "").trim() : "";
      if (description.length > 200) description = description.slice(0, 197) + "...";

      items.push({
        title: titleMatch[1].trim(),
        description,
        link: linkMatch ? linkMatch[1] : "",
        pubDate: dateMatch ? dateMatch[1] : "",
        duration: durationMatch ? durationMatch[1] : "",
        episode: episodeMatch ? parseInt(episodeMatch[1]) : null,
        season: seasonMatch ? parseInt(seasonMatch[1]) : null,
        image: imageMatch ? imageMatch[1] : null,
        audioUrl: audioMatch[1],
      });
    }
  }

  return items;
}

export async function GET() {
  try {
    const now = Date.now();
    if (cachedEpisodes && now - cachedAt < CACHE_TTL) {
      return NextResponse.json({ episodes: cachedEpisodes });
    }

    const res = await fetch(RSS_URL, { next: { revalidate: 900 } });
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch RSS" }, { status: 502 });
    }

    const xml = await res.text();
    const episodes = parseRSS(xml);

    cachedEpisodes = episodes;
    cachedAt = now;

    return NextResponse.json({ episodes });
  } catch (error) {
    console.error("API Error fetching podcast:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
