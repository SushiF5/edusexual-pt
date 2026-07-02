import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DoubtsTab from "@/components/DoubtsTab";

const defaultProps = {
  audience: "jovens" as const,
  submitted: false,
  setSubmitted: jest.fn(),
  questionForm: { name: "", question: "" },
  setQuestionForm: jest.fn(),
  isSending: false,
  setIsSending: jest.fn(),
};

jest.mock("@/i18n/context", () => ({
  useI18n: () => ({
    t: {
      doubtsTitle: "Tira as tuas Dúvidas",
      doubtsSubtitle: "Envia a tua pergunta",
      yourNameOptional: "Nome",
      yourQuestion: "Pergunta",
      namePlaceholderJovem: "Nome",
      questionPlaceholderJovem: "Pergunta",
      submitting: "A enviar...",
      submitQuestion: "Enviar",
      anonymousNote: "Anónimo",
      questionSent: "Enviado!",
      questionSentDesc: "Obrigado",
      sendAnother: "Enviar outra",
      helplinesJovem: "Linhas de apoio",
      questionSendError: "Erro ao enviar",
    },
  }),
}));

describe("DoubtsTab", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders form with name and question inputs", () => {
    render(<DoubtsTab {...defaultProps} />);
    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
    expect(screen.getByLabelText("Pergunta")).toBeInTheDocument();
  });

  it("renders submit button", () => {
    render(<DoubtsTab {...defaultProps} />);
    expect(screen.getByRole("button", { name: /Enviar/i })).toBeInTheDocument();
  });

  it("disables submit when question is empty", () => {
    render(<DoubtsTab {...defaultProps} />);
    const btn = screen.getByRole("button", { name: /Enviar/i });
    expect(btn).toBeDisabled();
  });

  it("enables submit when question is filled", () => {
    const props = {
      ...defaultProps,
      questionForm: { name: "", question: "Minha pergunta" },
    };
    render(<DoubtsTab {...props} />);
    const btn = screen.getByRole("button", { name: /Enviar/i });
    expect(btn).not.toBeDisabled();
  });

  it("shows character count", () => {
    const props = {
      ...defaultProps,
      questionForm: { name: "", question: "Teste" },
    };
    render(<DoubtsTab {...props} />);
    expect(screen.getByText("5/2000")).toBeInTheDocument();
  });

  it("shows character count warning near limit", () => {
    const longQuestion = "a".repeat(1801);
    const props = {
      ...defaultProps,
      questionForm: { name: "", question: longQuestion },
    };
    render(<DoubtsTab {...props} />);
    expect(screen.getByText("1801/2000")).toBeInTheDocument();
  });

  it("shows success screen after submission", () => {
    const props = { ...defaultProps, submitted: true };
    render(<DoubtsTab {...props} />);
    expect(screen.getByText("Enviado!")).toBeInTheDocument();
    expect(screen.getByText("Enviar outra")).toBeInTheDocument();
  });

  it("shows helplines section", () => {
    render(<DoubtsTab {...defaultProps} />);
    expect(screen.getByText("Linhas de apoio")).toBeInTheDocument();
  });

  it("calls handleSubmit on form submit", async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true });
    const props = {
      ...defaultProps,
      questionForm: { name: "Teste", question: "Pergunta?" },
      setIsSending: jest.fn(),
    };
    render(<DoubtsTab {...props} />);
    fireEvent.submit(screen.getByLabelText("Pergunta"));
    await waitFor(() => {
      expect(props.setIsSending).toHaveBeenCalledWith(true);
    });
  });

  it("shows error on API failure", async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false, text: () => Promise.resolve("error") });
    const props = {
      ...defaultProps,
      questionForm: { name: "", question: "Teste" },
      setIsSending: jest.fn(),
    };
    render(<DoubtsTab {...props} />);
    fireEvent.submit(screen.getByLabelText("Pergunta"));
    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });
  });
});
