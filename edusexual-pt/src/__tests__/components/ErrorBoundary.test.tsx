import React from "react";
import { render, screen } from "@testing-library/react";
import ErrorBoundary from "@/components/ErrorBoundary";

describe("ErrorBoundary", () => {
  it("renders children when no error", () => {
    render(
      <ErrorBoundary>
        <p>Hello</p>
      </ErrorBoundary>
    );
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("renders fallback on error", () => {
    const Throws = () => { throw new Error("test"); };
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ErrorBoundary fallback={<p>Algo correu mal</p>}>
        <Throws />
      </ErrorBoundary>
    );

    expect(screen.getByText("Algo correu mal")).toBeInTheDocument();
    spy.mockRestore();
  });
});
