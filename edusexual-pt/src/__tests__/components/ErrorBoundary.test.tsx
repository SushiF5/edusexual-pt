import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
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

  it("resets error state when retry button clicked", () => {
    const Throws = () => { throw new Error("test"); };
    const ErrorBoundaryTest = () => {
      const [errorCount, setErrorCount] = React.useState(0);
      if (errorCount < 1) {
        setErrorCount(errorCount + 1);
        throw new Error("First error only");
      }
      return <p>Recovered!</p>;
    };

    const setStateSpy = jest.spyOn(ErrorBoundary.prototype, "setState");

    render(
      <ErrorBoundary>
        <ErrorBoundaryTest />
      </ErrorBoundary>
    );

    expect(screen.getByText("Algo correu mal ao carregar esta secção. Tenta recarregar a página.")).toBeInTheDocument();
    
    fireEvent.click(screen.getByRole("button", { name: /tentar de novo/i }));
    
    expect(setStateSpy).toHaveBeenCalledWith({ hasError: false });
    setStateSpy.mockRestore();
  });
});
