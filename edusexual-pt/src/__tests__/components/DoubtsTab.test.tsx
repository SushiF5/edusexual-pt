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

const baseT = {
  doubtsTitle: "Tira as tuas Dúvidas",
  doubtsSubtitle: "Envia a tua pergunta",
  yourNameOptional: "Nome",
  yourQuestion: "Pergunta",
  namePlaceholderCrianca: "Nome crianca",
  namePlaceholderJovem: "Nome",
  namePlaceholderAdulto: "Nome adulto",
  questionPlaceholderCrianca: "Pergunta crianca",
  questionPlaceholderJovem: "Pergunta",
  questionPlaceholderAdulto: "Pergunta adulto",
  submitting: "A enviar...",
  submitQuestion: "Enviar",
  anonymousNote: "Anónimo",
  questionSent: "Enviado!",
  questionSentDesc: "Obrigado",
  sendAnother: "Enviar outra",
  helplinesCrianca: "Linhas crianca",
  helplinesJovem: "Linhas de apoio",
  helplinesAdulto: "Linhas adulto",
  questionSendError: "Erro ao enviar",
  nameHelp: "Ajuda nome",
  questionHelp: "Ajuda pergunta",
};

jest.mock("@/i18n/context", () => ({
  useI18n: () => ({ t: baseT }),
}));

describe("DoubtsTab", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
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

  it("shows error when fetch throws", async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error("network"));
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
    expect(props.setSubmitted).toHaveBeenCalledWith(false);
  });

  it("sets submitted=true on success", async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true });
    const props = {
      ...defaultProps,
      questionForm: { name: "Teste", question: "Pergunta?" },
      setIsSending: jest.fn(),
      setSubmitted: jest.fn(),
    };
    render(<DoubtsTab {...props} />);
    fireEvent.submit(screen.getByLabelText("Pergunta"));
    await waitFor(() => {
      expect(props.setSubmitted).toHaveBeenCalledWith(true);
    });
  });

  it("does not submit when question is empty", async () => {
    global.fetch = jest.fn();
    const props = { ...defaultProps, setIsSending: jest.fn() };
    render(<DoubtsTab {...props} />);
    fireEvent.submit(screen.getByLabelText("Pergunta"));
    expect(global.fetch).not.toHaveBeenCalled();
    expect(props.setIsSending).not.toHaveBeenCalled();
  });

  it("resets form when clicking send another", () => {
    const setSubmitted = jest.fn();
    const setQuestionForm = jest.fn();
    render(
      <DoubtsTab
        {...defaultProps}
        submitted
        setSubmitted={setSubmitted}
        setQuestionForm={setQuestionForm}
      />
    );
    fireEvent.click(screen.getByText("Enviar outra"));
    expect(setSubmitted).toHaveBeenCalledWith(false);
    expect(setQuestionForm).toHaveBeenCalledWith({ name: "", question: "" });
  });

  it("calls setQuestionForm with name on name input change", () => {
    const setQuestionForm = jest.fn();
    render(<DoubtsTab {...defaultProps} setQuestionForm={setQuestionForm} />);
    fireEvent.change(screen.getByLabelText("Nome"), { target: { value: "Ana" } });
    expect(setQuestionForm).toHaveBeenCalled();
  });

  it("calls setQuestionForm with question on textarea change", () => {
    const setQuestionForm = jest.fn();
    render(<DoubtsTab {...defaultProps} setQuestionForm={setQuestionForm} />);
    fireEvent.change(screen.getByLabelText("Pergunta"), { target: { value: "Dúvida?" } });
    expect(setQuestionForm).toHaveBeenCalled();
  });

  it("renders name placeholder for criancas audience", () => {
    render(<DoubtsTab {...defaultProps} audience="criancas" />);
    expect(screen.getByPlaceholderText("Nome crianca")).toBeInTheDocument();
  });

  it("renders name placeholder for adultos audience", () => {
    render(<DoubtsTab {...defaultProps} audience="adultos" />);
    expect(screen.getByPlaceholderText("Nome adulto")).toBeInTheDocument();
  });

  it("renders question placeholder for criancas audience", () => {
    render(<DoubtsTab {...defaultProps} audience="criancas" />);
    const textarea = screen.getByLabelText("Pergunta");
    expect(textarea).toHaveAttribute("placeholder", "Pergunta crianca");
  });

  it("renders question placeholder for adultos audience", () => {
    render(<DoubtsTab {...defaultProps} audience="adultos" />);
    const textarea = screen.getByLabelText("Pergunta");
    expect(textarea).toHaveAttribute("placeholder", "Pergunta adulto");
  });

  it("renders criancas helplines section", () => {
    render(<DoubtsTab {...defaultProps} audience="criancas" />);
    expect(screen.getByText("Linhas crianca")).toBeInTheDocument();
    expect(screen.getByText(/Linha Criança/)).toBeInTheDocument();
    expect(screen.getByText(/SOS Criança/)).toBeInTheDocument();
  });

  it("renders adultos helplines section", () => {
    render(<DoubtsTab {...defaultProps} audience="adultos" />);
    expect(screen.getByText("Linhas adulto")).toBeInTheDocument();
    expect(screen.getByText(/APAV/)).toBeInTheDocument();
    expect(screen.getByText(/CPCJ/)).toBeInTheDocument();
  });

  it("renders jovens helplines section", () => {
    render(<DoubtsTab {...defaultProps} audience="jovens" />);
    expect(screen.getByText("Linhas de apoio")).toBeInTheDocument();
    expect(screen.getByText(/SNS 24/)).toBeInTheDocument();
    expect(screen.getByText(/Linha do Arco-Íris/)).toBeInTheDocument();
  });

  it("shows spinner and submitting text when isSending", () => {
    render(<DoubtsTab {...defaultProps} isSending questionForm={{ name: "", question: "x" }} />);
    expect(screen.getByText("A enviar...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /A enviar/i })).toHaveAttribute("aria-busy", "true");
  });

  it("shows title and subtitle", () => {
    render(<DoubtsTab {...defaultProps} />);
    expect(screen.getByText("Tira as tuas Dúvidas")).toBeInTheDocument();
    expect(screen.getByText("Envia a tua pergunta")).toBeInTheDocument();
  });

  it("renders anonymous note", () => {
    render(<DoubtsTab {...defaultProps} />);
    expect(screen.getByText("Anónimo")).toBeInTheDocument();
  });

  it("sets aria-busy on submit button when sending", () => {
    render(<DoubtsTab {...defaultProps} isSending questionForm={{ name: "", question: "x" }} />);
    expect(screen.getByRole("button", { name: /A enviar/i })).toHaveAttribute("aria-busy", "true");
  });

  it("does not call fetch when already sending", async () => {
    global.fetch = jest.fn();
    const props = {
      ...defaultProps,
      isSending: true,
      questionForm: { name: "", question: "Teste" },
      setIsSending: jest.fn(),
    };
    render(<DoubtsTab {...props} />);
    fireEvent.submit(screen.getByLabelText("Pergunta"));
    expect(global.fetch).not.toHaveBeenCalled();
    expect(props.setIsSending).not.toHaveBeenCalled();
  });

  it("success screen has role=status", () => {
    render(<DoubtsTab {...defaultProps} submitted />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("character count has aria-live=polite", () => {
    render(<DoubtsTab {...defaultProps} questionForm={{ name: "", question: "x" }} />);
    const live = screen.getByText("1/2000");
    expect(live).toHaveAttribute("aria-live", "polite");
  });
});
