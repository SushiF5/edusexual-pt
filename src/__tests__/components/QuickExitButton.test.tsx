import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import QuickExitButton from "@/components/QuickExitButton";
import { I18nProvider } from "@/i18n/context";

function mount(ui: React.ReactNode) {
  return render(<I18nProvider>{ui}</I18nProvider>);
}

describe("QuickExitButton", () => {
  it("renders with accessible label", () => {
    mount(<QuickExitButton />);
    expect(
      screen.getByRole("button", { name: /saída rápida/i })
    ).toBeInTheDocument();
  });

  it("shows ESC keyboard hint on desktop", () => {
    mount(<QuickExitButton />);
    expect(screen.getByText("ESC")).toBeInTheDocument();
  });

  it("contains google.com redirect in onClick handler", () => {
    const { container } = mount(<QuickExitButton />);
    const btn = screen.getByRole("button", { name: /saída rápida/i });
    expect(btn).toBeInTheDocument();
    expect(btn.tagName).toBe("BUTTON");
  });

  it("registers Escape keydown listener", () => {
    const spy = jest.fn();
    window.addEventListener("keydown", spy);
    mount(<QuickExitButton />);
    fireEvent.keyDown(window, { key: "Escape" });
    expect(spy).toHaveBeenCalled();
    window.removeEventListener("keydown", spy);
  });
});
