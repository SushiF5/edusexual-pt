import { renderHook, act } from "@testing-library/react";
import { useKeyboardShortcuts } from "@/lib/useKeyboardShortcuts";

function pressKey(key: string) {
  document.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true }));
}

describe("useKeyboardShortcuts", () => {
  const defaultProps = {
    activeTab: "home" as const,
    setActiveTab: jest.fn(),
    showAudienceSelector: false,
    setShowAudienceSelector: jest.fn(),
    setMobileMenuOpen: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns helpOpen and setHelpOpen", () => {
    const { result } = renderHook(() => useKeyboardShortcuts(defaultProps));
    expect(result.current.helpOpen).toBe(false);
    expect(typeof result.current.setHelpOpen).toBe("function");
  });

  it("sets activeTab to home on 'h' key", () => {
    renderHook(() => useKeyboardShortcuts(defaultProps));
    act(() => pressKey("h"));
    expect(defaultProps.setActiveTab).toHaveBeenCalledWith("home");
  });

  it("sets activeTab to podcast on 'p' key", () => {
    renderHook(() => useKeyboardShortcuts(defaultProps));
    act(() => pressKey("p"));
    expect(defaultProps.setActiveTab).toHaveBeenCalledWith("podcast");
  });

  it("sets activeTab to recursos on 'r' key", () => {
    renderHook(() => useKeyboardShortcuts(defaultProps));
    act(() => pressKey("r"));
    expect(defaultProps.setActiveTab).toHaveBeenCalledWith("recursos");
  });

  it("sets activeTab to quiz on 'q' key", () => {
    renderHook(() => useKeyboardShortcuts(defaultProps));
    act(() => pressKey("q"));
    expect(defaultProps.setActiveTab).toHaveBeenCalledWith("quiz");
  });

  it("toggles help on '?' key", () => {
    const { result } = renderHook(() => useKeyboardShortcuts(defaultProps));
    act(() => pressKey("?"));
    expect(result.current.helpOpen).toBe(true);
    act(() => pressKey("?"));
    expect(result.current.helpOpen).toBe(false);
  });

  it("closes mobile menu on Escape", () => {
    renderHook(() => useKeyboardShortcuts(defaultProps));
    act(() => pressKey("Escape"));
    expect(defaultProps.setMobileMenuOpen).toHaveBeenCalledWith(false);
  });

  it("closes audience selector on Escape", () => {
    const props = { ...defaultProps, showAudienceSelector: true };
    renderHook(() => useKeyboardShortcuts(props));
    act(() => pressKey("Escape"));
    expect(defaultProps.setShowAudienceSelector).toHaveBeenCalledWith(false);
  });

  it("navigates to tab by number keys 1-6", () => {
    renderHook(() => useKeyboardShortcuts(defaultProps));
    const tabs = ["home", "podcast", "recursos", "quiz", "faq", "duvidas"];
    for (let i = 0; i < tabs.length; i++) {
      act(() => pressKey(String(i + 1)));
      expect(defaultProps.setActiveTab).toHaveBeenCalledWith(tabs[i]);
    }
  });

  it("ignores keyboard events in input fields", () => {
    const input = document.createElement("input");
    document.body.appendChild(input);
    input.focus();

    const event = new KeyboardEvent("keydown", {
      key: "h",
      bubbles: true,
      cancelable: true,
    });
    Object.defineProperty(event, "target", { value: input });
    act(() => document.dispatchEvent(event));

    expect(defaultProps.setActiveTab).not.toHaveBeenCalled();
    document.body.removeChild(input);
  });
});
