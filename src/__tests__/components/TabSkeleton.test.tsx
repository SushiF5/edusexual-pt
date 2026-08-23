import React from "react";
import { render, screen } from "@testing-library/react";
import TabSkeleton from "@/components/TabSkeleton";

jest.mock("@/i18n/context", () => ({
  useI18n: () => ({
    t: { loadingContent: "A carregar conteúdo" },
  }),
}));

describe("TabSkeleton", () => {
  it("renders loading indicator with role status", () => {
    render(<TabSkeleton />);
    const status = screen.getByRole("status");
    expect(status).toBeInTheDocument();
    expect(status).toHaveAttribute("aria-label", "A carregar conteúdo");
  });

  it("uses default aria-label when i18n translation is empty", () => {
    // Create a separate mock for this test
    jest.resetModules();
    jest.mock("@/i18n/context", () => ({
      useI18n: () => ({
        t: { loadingContent: "" }, // Empty string - falsy
      }),
    }));
    
    // Need to re-import the component after mocking
    const TabSkeletonTest = require("@/components/TabSkeleton").default;
    
    render(<TabSkeletonTest />);
    const status = screen.getByRole("status");
    expect(status).toBeInTheDocument();
    expect(status).toHaveAttribute("aria-label", "A carregar conteúdo");
  });

  it("renders pulsing placeholder bars", () => {
    render(<TabSkeleton />);
    const pulsingElements = document.querySelectorAll(".animate-pulse");
    expect(pulsingElements.length).toBeGreaterThan(0);
  });

  it("has aria-live polite", () => {
    render(<TabSkeleton />);
    const status = screen.getByRole("status");
    expect(status).toHaveAttribute("aria-live", "polite");
  });
});