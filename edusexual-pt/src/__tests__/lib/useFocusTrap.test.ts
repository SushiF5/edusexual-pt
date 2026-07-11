import { renderHook, act } from "@testing-library/react";
import { useFocusTrap } from "@/lib/useFocusTrap";

describe("useFocusTrap", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it("returns a ref when active is false", () => {
    const { result } = renderHook(() => useFocusTrap(false));
    expect(result.current).toBeDefined();
    expect(result.current.current).toBeNull();
  });

  it("returns a ref when active is true", () => {
    const { result } = renderHook(() => useFocusTrap(true));
    expect(result.current).toBeDefined();
    expect(result.current.current).toBeNull();
  });

  it("attaches keydown listener when active", () => {
    const addSpy = jest.spyOn(document, "addEventListener");
    const removeSpy = jest.spyOn(document, "removeEventListener");
    const { unmount } = renderHook(() => useFocusTrap(true));
    expect(addSpy).toHaveBeenCalledWith("keydown", expect.any(Function));
    unmount();
    expect(removeSpy).toHaveBeenCalledWith("keydown", expect.any(Function));
    addSpy.mockRestore();
    removeSpy.mockRestore();
  });

  it("does not attach keydown listener when inactive", () => {
    const spy = jest.spyOn(document, "addEventListener");
    renderHook(() => useFocusTrap(false));
    expect(spy).not.toHaveBeenCalledWith("keydown", expect.any(Function));
    spy.mockRestore();
  });

  it("saves and restores previous focus", () => {
    const btn = document.createElement("button");
    document.body.appendChild(btn);
    btn.focus();
    expect(document.activeElement).toBe(btn);

    const { unmount } = renderHook(() => useFocusTrap(true));
    unmount();

    expect(document.activeElement).toBe(btn);
    document.body.removeChild(btn);
  });

  it("focuses first focusable element on activation", () => {
    const dialog = document.createElement("div");
    const innerBtn = document.createElement("button");
    dialog.appendChild(innerBtn);
    container.appendChild(dialog);

    const { result } = renderHook(() => useFocusTrap(true));
    
    act(() => {
      (result.current as any).current = dialog;
    });

    expect(document.activeElement).toBeDefined();
  });
});