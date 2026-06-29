import { checkRateLimit } from "@/lib/rateLimit";

describe("rateLimit", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should allow first request", () => {
    expect(checkRateLimit("192.168.1.1", 3, 60000)).toBe(true);
  });

  it("should block after max requests", () => {
    const ip = "10.0.0.1";
    expect(checkRateLimit(ip, 2, 60000)).toBe(true);
    expect(checkRateLimit(ip, 2, 60000)).toBe(true);
    expect(checkRateLimit(ip, 2, 60000)).toBe(false);
  });

  it("should reset after window expires", () => {
    const ip = "10.0.0.2";
    expect(checkRateLimit(ip, 1, 60000)).toBe(true);
    expect(checkRateLimit(ip, 1, 60000)).toBe(false);

    jest.advanceTimersByTime(60001);
    expect(checkRateLimit(ip, 1, 60000)).toBe(true);
  });

  it("should treat different IPs separately", () => {
    expect(checkRateLimit("ip-a", 1, 60000)).toBe(true);
    expect(checkRateLimit("ip-b", 1, 60000)).toBe(true);
    expect(checkRateLimit("ip-a", 1, 60000)).toBe(false);
    expect(checkRateLimit("ip-b", 1, 60000)).toBe(false);
  });
});
