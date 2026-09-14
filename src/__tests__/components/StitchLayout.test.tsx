import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import StitchLayout from "@/components/StitchLayout";

describe("StitchLayout", () => {
  const onClose = jest.fn();

  beforeEach(() => {
    onClose.mockClear();
  });

  it("renders with heading and iframe", () => {
    render(<StitchLayout htmlUrl="https://example.com" onClose={onClose} />);
    expect(screen.getByText("Layout Dinâmico (Stitch)")).toBeInTheDocument();
    expect(screen.getByTitle("Stitch Layout")).toBeInTheDocument();
  });

  it("shows loading spinner while loading", () => {
    render(<StitchLayout htmlUrl="https://example.com" onClose={onClose} />);
    expect(screen.getByText("A carregar o design...")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    render(<StitchLayout htmlUrl="https://example.com" onClose={onClose} />);
    const closeBtn = screen.getByRole("button");
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("passes htmlUrl to iframe src", () => {
    render(<StitchLayout htmlUrl="https://example.com/test" onClose={onClose} />);
    const iframe = screen.getByTitle("Stitch Layout") as HTMLIFrameElement;
    expect(iframe.src).toBe("https://example.com/test");
  });
});
