import React from "react";
import { render, screen, act } from "@testing-library/react";
import { LazySection } from "@/components/LazySection";

jest.mock("@/i18n/context", () => ({
  useI18n: () => ({
    t: {
      loadingTopic: "A carregar tópico…",
    },
  }),
}));

describe("LazySection", () => {
  it("renders children immediately when IntersectionObserver is unavailable", () => {
    render(
      <LazySection title="Test Topic">
        <div data-testid="child">Topic content</div>
      </LazySection>
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(screen.getByText("Topic content")).toBeInTheDocument();
  });

  it("renders skeleton placeholder when IntersectionObserver is available", () => {
    const mockObserver = {
      observe: jest.fn(),
      disconnect: jest.fn(),
    };
    const originalIO = (globalThis as any).IntersectionObserver;
    (globalThis as any).IntersectionObserver = jest.fn(() => mockObserver);

    render(
      <LazySection title="Test Topic">
        <div data-testid="child">Topic content</div>
      </LazySection>
    );

    expect(screen.queryByTestId("child")).not.toBeInTheDocument();
    expect(screen.getByRole("status", { name: /a carregar tópico…: test topic/i })).toBeInTheDocument();

    (globalThis as any).IntersectionObserver = originalIO;
  });

  it("renders children after intersection is triggered", () => {
    let intersectCallback: (entries: any[]) => void = () => {};
    const mockObserver = {
      observe: jest.fn(),
      disconnect: jest.fn(),
    };
    const originalIO = (globalThis as any).IntersectionObserver;
    (globalThis as any).IntersectionObserver = jest.fn((cb: any) => {
      intersectCallback = cb;
      return mockObserver;
    });

    render(
      <LazySection title="Test Topic">
        <div data-testid="child">Topic content</div>
      </LazySection>
    );

    expect(screen.queryByTestId("child")).not.toBeInTheDocument();

    act(() => {
      intersectCallback([{ isIntersecting: true }]);
    });

    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();

    (globalThis as any).IntersectionObserver = originalIO;
  });

  it("uses loadingTopic label when title is not provided", () => {
    const mockObserver = {
      observe: jest.fn(),
      disconnect: jest.fn(),
    };
    const originalIO = (globalThis as any).IntersectionObserver;
    (globalThis as any).IntersectionObserver = jest.fn(() => mockObserver);

    render(
      <LazySection>
        <div data-testid="child">Content</div>
      </LazySection>
    );

    expect(screen.getByRole("status", { name: /a carregar tópico…/i })).toBeInTheDocument();

    (globalThis as any).IntersectionObserver = originalIO;
  });
});
