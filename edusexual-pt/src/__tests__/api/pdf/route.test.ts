import { GET } from "@/app/api/pdf/route";
import { guides } from "@/data/content";
import type { NextRequest } from "next/server";

jest.mock("next/server", () => {
  class MockNextResponse {
    body: string | Buffer | Uint8Array;
    status: number;
    headers: Map<string, string>;
    constructor(
      body: string | Buffer | Uint8Array,
      init?: { status?: number; headers?: Record<string, string> }
    ) {
      this.body = body;
      this.status = init?.status || 200;
      this.headers = new Map(Object.entries(init?.headers || {}));
    }
    text() {
      if (Buffer.isBuffer(this.body)) return Promise.resolve(this.body.toString("latin1"));
      if (this.body instanceof Uint8Array) {
        return Promise.resolve(Buffer.from(this.body).toString("latin1"));
      }
      return Promise.resolve(this.body as string);
    }
    static json = jest.fn((body: unknown, init?: { status?: number }) => ({
      body: JSON.stringify(body),
      status: init?.status || 200,
      text: () => Promise.resolve(JSON.stringify(body)),
      json: () => Promise.resolve(body),
    }));
  }
  return { NextResponse: MockNextResponse as any };
});

jest.mock("next/headers", () => ({
  headers: jest.fn(() => new Map([["x-forwarded-for", "127.0.0.1"]])),
}));

jest.mock("@/lib/pdf", () => ({
  Document: ({ children }: { children: React.ReactNode }) => children,
  Page: ({ children }: { children: React.ReactNode }) => children,
  View: ({ children }: { children: React.ReactNode }) => children,
  Text: ({ children }: { children: React.ReactNode }) => children,
  StyleSheet: { create: (s: Record<string, unknown>) => s },
  pdf: jest.fn(() => ({
    toBlob: async () => {
      const bytes = new Uint8Array(
        Buffer.from("%PDF-1.4\nMock PDF content\n%%EOF")
      );
      return { arrayBuffer: async () => bytes.buffer };
    },
  })),
}));

describe("/api/pdf", () => {
  it("returns 400 when id parameter is missing", async () => {
    const req = new Request("http://localhost/api/pdf") as unknown as NextRequest;
    const response = await GET(req);
    expect(response.status).toBe(400);
  });

  it("returns 404 when guide is not found", async () => {
    const req = new Request("http://localhost/api/pdf?id=nonexistent") as unknown as NextRequest;
    const response = await GET(req);
    expect(response.status).toBe(404);
  });

  it("returns a downloadable PDF for a valid id", async () => {
    const validGuide = guides[0];
    const safeId = validGuide.id.replace(/[^a-zA-Z0-9_-]/g, "");
    const req = new Request(`http://localhost/api/pdf?id=${validGuide.id}`) as unknown as NextRequest;
    const response = await GET(req);

    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe("application/pdf");
    expect(response.headers.get("Content-Disposition")).toContain(
      `filename="${safeId}.pdf"`
    );

    const pdf = await response.text();
    expect(pdf.startsWith("%PDF")).toBe(true);
  });
});
