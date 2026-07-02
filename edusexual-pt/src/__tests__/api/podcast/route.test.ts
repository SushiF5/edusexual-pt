import { GET } from "@/app/api/podcast/route";

jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn((body: unknown, init?: { status?: number }) => ({
      body,
      status: init?.status || 200,
      json: () => Promise.resolve(body),
    })),
  },
}));

const mockRSS = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Descomplicando</title>
    <item>
      <title><![CDATA[Episódio 1 - Consentimento]]></title>
      <description><![CDATA[<p>Sobre consentimento</p>]]></description>
      <link>https://open.spotify.com/episode/123</link>
      <pubDate>Mon, 01 Jan 2025 00:00:00 GMT</pubDate>
      <itunes:duration>32:15</itunes:duration>
      <itunes:episode>1</itunes:episode>
      <itunes:season>1</itunes:season>
      <itunes:image href="https://example.com/image.jpg"/>
      <enclosure url="https://example.com/audio1.mp3" type="audio/mpeg"/>
    </item>
    <item>
      <title>Episódio 2 - Puberdade</title>
      <description>Sobre puberdade</description>
      <link>https://open.spotify.com/episode/456</link>
      <pubDate>Mon, 15 Jan 2025 00:00:00 GMT</pubDate>
      <itunes:duration>28:45</itunes:duration>
      <itunes:episode>2</itunes:episode>
      <enclosure url="https://example.com/audio2.mp3" type="audio/mpeg"/>
    </item>
  </channel>
</rss>`;

describe("Podcast API Route", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    jest.restoreAllMocks();
  });

  it("returns parsed episodes from RSS feed", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(mockRSS),
    });

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.episodes).toHaveLength(2);
    expect(data.episodes[0].title).toBe("Episódio 1 - Consentimento");
    expect(data.episodes[0].episode).toBe(1);
    expect(data.episodes[0].season).toBe(1);
    expect(data.episodes[0].audioUrl).toBe("https://example.com/audio1.mp3");
    expect(data.episodes[0].image).toBe("https://example.com/image.jpg");
    expect(data.episodes[0].duration).toBe("32:15");
  });

  it("strips HTML from descriptions", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(mockRSS),
    });

    const response = await GET();
    const data = await response.json();

    expect(data.episodes[0].description).not.toContain("<p>");
    expect(data.episodes[0].description).toBe("Sobre consentimento");
  });

  it("truncates long descriptions", async () => {
    const longDescRSS = mockRSS.replace(
      "<description><![CDATA[<p>Sobre consentimento</p>]]></description>",
      `<description><![CDATA[${"A".repeat(300)}]]></description>`
    );
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(longDescRSS),
    });

    const response = await GET();
    const data = await response.json();

    expect(data.episodes[0].description.length).toBeLessThanOrEqual(200);
    expect(data.episodes[0].description).toContain("...");
  });

  it("returns 502 when RSS fetch fails", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
    });

    const response = await GET();
    expect(response.status).toBe(502);
  });

  it("returns 500 on network error", async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error("Network error"));

    const response = await GET();
    expect(response.status).toBe(500);
  });

  it("handles items without audio gracefully", async () => {
    const noAudioRSS = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0"><channel>
      <item>
        <title>No Audio</title>
      </item>
      <item>
        <title>Has Audio</title>
        <enclosure url="https://example.com/audio.mp3" type="audio/mpeg"/>
      </item>
    </channel></rss>`;

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(noAudioRSS),
    });

    const response = await GET();
    const data = await response.json();

    expect(data.episodes).toHaveLength(1);
    expect(data.episodes[0].title).toBe("Has Audio");
  });

  it("handles missing optional fields", async () => {
    const minimalRSS = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0"><channel>
      <item>
        <title>Minimal</title>
        <enclosure url="https://example.com/min.mp3" type="audio/mpeg"/>
      </item>
    </channel></rss>`;

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(minimalRSS),
    });

    const response = await GET();
    const data = await response.json();

    expect(data.episodes[0].episode).toBeNull();
    expect(data.episodes[0].season).toBeNull();
    expect(data.episodes[0].image).toBeNull();
    expect(data.episodes[0].duration).toBe("");
    expect(data.episodes[0].link).toBe("");
  });
});
