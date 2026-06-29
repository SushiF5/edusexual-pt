import { POST } from "@/app/api/telegram/route";

jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn((body: any, init?: { status?: number }) => ({
      body,
      status: init?.status || 200,
      json: () => Promise.resolve(body),
    })),
  },
}));

jest.mock("next/headers", () => ({
  headers: jest.fn(() => new Map([["x-forwarded-for", "127.0.0.1"]])),
}));

describe("/api/telegram", () => {
  beforeEach(() => {
    process.env.TELEGRAM_BOT_TOKEN = "test-token";
    process.env.TELEGRAM_CHAT_ID = "123456";
    jest.clearAllMocks();
  });

  afterEach(() => {
    delete process.env.TELEGRAM_BOT_TOKEN;
    delete process.env.TELEGRAM_CHAT_ID;
  });

  it("should return 422 if question is missing", async () => {
    const req = {
      json: jest.fn().mockResolvedValue({ name: "Test", audience: "jovens" }),
    } as unknown as Request;

    const res = await POST(req);
    expect(res.status).toBe(422);
  });

  it("should return 422 if audience is invalid", async () => {
    const req = {
      json: jest.fn().mockResolvedValue({ question: "Test question", audience: "invalid" }),
    } as unknown as Request;

    const res = await POST(req);
    expect(res.status).toBe(422);
  });

  it("should return fallback success when env vars missing", async () => {
    delete process.env.TELEGRAM_BOT_TOKEN;
    delete process.env.TELEGRAM_CHAT_ID;

    const req = {
      json: jest.fn().mockResolvedValue({ question: "Test", audience: "jovens" }),
    } as unknown as Request;

    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(res.body.fallback).toBe(true);
  });
});
