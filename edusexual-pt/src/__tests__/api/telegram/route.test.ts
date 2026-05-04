import { POST } from "@/app/api/telegram/route";
import { NextResponse } from "next/server";

// Mock NextResponse
jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn((body, init) => ({ body, status: init?.status || 200 })),
  },
}));

describe("/api/telegram", () => {
  beforeEach(() => {
    process.env.TELEGRAM_BOT_TOKEN = "test-token";
    process.env.TELEGRAM_CHAT_ID = "123456";
  });

  afterEach(() => {
    delete process.env.TELEGRAM_BOT_TOKEN;
    delete process.env.TELEGRAM_CHAT_ID;
  });

  it("should return error if question is missing", async () => {
    const req = {
      json: jest.fn().mockResolvedValue({ name: "Test", audience: "jovens" }),
    } as unknown as Request;

    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("should return error if audience is invalid", async () => {
    const req = {
      json: jest.fn().mockResolvedValue({ question: "Test question", audience: "invalid" }),
    } as unknown as Request;

    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("should return success when valid data is provided", async () => {
    const req = {
      json: jest.fn().mockResolvedValue({
        name: "Test User",
        question: "What is consent?",
        audience: "jovens",
      }),
    } as unknown as Request;

    const res = await POST(req);
    // Will fail to send to Telegram but should return success due to fallback
    expect(res.status).toBe(200);
  });

  it("should handle missing env vars gracefully", async () => {
    delete process.env.TELEGRAM_BOT_TOKEN;
    delete process.env.TELEGRAM_CHAT_ID;

    const req = {
      json: jest.fn().mockResolvedValue({
        question: "Test",
        audience: "jovens",
      }),
    } as unknown as Request;

    const res = await POST(req);
    expect(res.status).toBe(200); // Should return fallback success
  });
});
