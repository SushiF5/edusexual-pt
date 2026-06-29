"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface DoubtsContextValue {
  questionForm: { name: string; question: string };
  setQuestionForm: React.Dispatch<React.SetStateAction<{ name: string; question: string }>>;
  submitted: boolean;
  setSubmitted: (v: boolean) => void;
  isSending: boolean;
  setIsSending: (v: boolean) => void;
}

const DoubtsContext = createContext<DoubtsContextValue>({
  questionForm: { name: "", question: "" },
  setQuestionForm: () => {},
  submitted: false,
  setSubmitted: () => {},
  isSending: false,
  setIsSending: () => {},
});

export function DoubtsProvider({ children }: { children: ReactNode }) {
  const [questionForm, setQuestionForm] = useState({ name: "", question: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  return (
    <DoubtsContext.Provider value={{ questionForm, setQuestionForm, submitted, setSubmitted, isSending, setIsSending }}>
      {children}
    </DoubtsContext.Provider>
  );
}

export function useDoubts() {
  return useContext(DoubtsContext);
}
