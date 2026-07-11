import { GET } from "@/app/api/pdf/route";
import { guides } from "@/data/content";

jest.mock("next/server", () => {
  function MockNextResponse(body: string, init?: { status?: number; headers?: Record<string, string> }) {
    this.body = body;
    this.status = init?.status || 200;
  }
  MockNextResponse.prototype.text = function () { return Promise.resolve(this.body); };
  MockNextResponse.prototype.json = function () { return Promise.resolve(JSON.parse(this.body)); };
  MockNextResponse.json = jest.fn((body: unknown, init?: { status?: number }) => ({
    body: JSON.stringify(body),
    status: init?.status || 200,
    text: () => Promise.resolve(JSON.stringify(body)),
    json: () => Promise.resolve(body),
  }));
  return { NextResponse: MockNextResponse as any };
});

jest.mock("next/headers", () => ({
  headers: jest.fn(() => new Map([["x-forwarded-for", "127.0.0.1"]])),
}));

describe("/api/pdf", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it("returns 400 when id parameter is missing", async () => {
    const req = new Request("http://localhost/api/pdf");
    const response = await GET(req);
    expect(response.status).toBe(400);
  });

  it("returns 404 when guide is not found", async () => {
    const req = new Request("http://localhost/api/pdf?id=nonexistent");
    const response = await GET(req);
    expect(response.status).toBe(404);
  });

  it("returns HTML with guide content for valid id", async () => {
    const validGuide = guides[0];
    const req = new Request(`http://localhost/api/pdf?id=${validGuide.id}`);
    const response = await GET(req);
    expect(response.status).toBe(200);
    const html = await response.text();
    expect(html).toContain("<!DOCTYPE html>");
    expect(html).toContain(validGuide.title);
    expect(html).toContain(validGuide.description);
    expect(html).toContain("EduSexual PT");
    expect(html).toContain("edusexual.pt");
  });

  it("includes all guide section headings in HTML", async () => {
    const guide = guides.find((g) => g.sections.length > 0);
    if (!guide) return;
    const req = new Request(`http://localhost/api/pdf?id=${guide.id}`);
    const response = await GET(req);
    const html = await response.text();
    guide.sections.forEach((section) => {
      expect(html).toContain(section.heading);
    });
  });
});