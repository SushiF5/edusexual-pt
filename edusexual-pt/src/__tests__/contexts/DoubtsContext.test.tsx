import { renderHook, act } from "@testing-library/react";
import { DoubtsProvider, useDoubts } from "@/contexts/DoubtsContext";

describe("DoubtsContext", () => {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <DoubtsProvider>{children}</DoubtsProvider>;
  }

  it("provides default empty questionForm", () => {
    const { result } = renderHook(() => useDoubts(), { wrapper: Wrapper });
    expect(result.current.questionForm).toEqual({ name: "", question: "" });
  });

  it("provides default submitted as false", () => {
    const { result } = renderHook(() => useDoubts(), { wrapper: Wrapper });
    expect(result.current.submitted).toBe(false);
  });

  it("provides default isSending as false", () => {
    const { result } = renderHook(() => useDoubts(), { wrapper: Wrapper });
    expect(result.current.isSending).toBe(false);
  });

  it("updates questionForm via setQuestionForm", () => {
    const { result } = renderHook(() => useDoubts(), { wrapper: Wrapper });
    act(() => {
      result.current.setQuestionForm({ name: "Ana", question: "Dúvida" });
    });
    expect(result.current.questionForm.name).toBe("Ana");
    expect(result.current.questionForm.question).toBe("Dúvida");
  });

  it("updates submitted via setSubmitted", () => {
    const { result } = renderHook(() => useDoubts(), { wrapper: Wrapper });
    act(() => { result.current.setSubmitted(true); });
    expect(result.current.submitted).toBe(true);
  });

  it("updates isSending via setIsSending", () => {
    const { result } = renderHook(() => useDoubts(), { wrapper: Wrapper });
    act(() => { result.current.setIsSending(true); });
    expect(result.current.isSending).toBe(true);
  });

  it("updates questionForm partially via setQuestionForm", () => {
    const { result } = renderHook(() => useDoubts(), { wrapper: Wrapper });
    act(() => {
      result.current.setQuestionForm((prev) => ({ ...prev, name: "Novo" }));
    });
    expect(result.current.questionForm.name).toBe("Novo");
    expect(result.current.questionForm.question).toBe("");
  });
});