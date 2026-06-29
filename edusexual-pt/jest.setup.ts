import "@testing-library/jest-dom";

if (typeof globalThis.Request === "undefined") {
  globalThis.Request = class Request {
    url: string;
    method: string;
    headers: Headers;
    private _body: string;

    constructor(url: string, init?: RequestInit) {
      this.url = url;
      this.method = init?.method || "GET";
      this.headers = new Headers((init?.headers as Record<string, string>) || {});
      this._body = (init?.body as string) || "";
    }

    async json() {
      return JSON.parse(this._body);
    }
  } as any;
}

if (typeof globalThis.Response === "undefined") {
  globalThis.Response = class Response {
    status: number;
    private _body: string;

    constructor(body: string, init?: ResponseInit) {
      this._body = body;
      this.status = init?.status || 200;
    }

    async json() {
      return JSON.parse(this._body);
    }
  } as any;
}
