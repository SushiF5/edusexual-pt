import "@testing-library/jest-dom";

if (typeof globalThis.Request === "undefined") {
  class MockRequest {
    url: string;
    method: string;
    headers: Headers;
    _body: string;

    constructor(url: string, init?: RequestInit) {
      this.url = url;
      this.method = init?.method || "GET";
      this.headers = new Headers((init?.headers as Record<string, string>) || {});
      this._body = (init?.body as string) || "";
    }

    async json() {
      return JSON.parse(this._body);
    }
  }
  globalThis.Request = MockRequest as unknown as typeof Request;
}

if (typeof globalThis.Response === "undefined") {
  class MockResponse {
    status: number;
    _body: string;

    constructor(body: string, init?: ResponseInit) {
      this._body = body;
      this.status = init?.status || 200;
    }

    async json() {
      return JSON.parse(this._body);
    }
  }
  globalThis.Response = MockResponse as unknown as typeof Response;
}
