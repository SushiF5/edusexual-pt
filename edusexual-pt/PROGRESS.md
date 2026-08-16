# PROGRESS.md — EduSexual PT

Log de execuções e melhorias implementadas.

## Execução — 17 Ago 2026

### Próxima melhoria: Expansão do Quiz e FAQ

Após analisar o conteúdo existente, identifiquei lacunas no quiz para jovens:
os temas **Relações e Afetos** e **Consentimento** (para além de **Sexualidade e Prazer**)
estavam sub-representados — apenas 2 de 13 perguntas cobrindo consentimento e nenhuma
sobre relações saudáveis/toxicas, amor vs. atração, ciúmes, ou prazer feminino.

### Implementado

1. **4 novas perguntas de quiz** (`src/data/content-quiz.ts`):
   - `q14` — Relações e Afetos: sinais de relação tóxica
   - `q15` — Relações e Afetos: diferença entre atração e amor
   - `q16` — Consentimento: consentimento é específico por atividade
   - `q17` — Relações e Afetos: ciúme saudável vs. tóxico
   - `q18` — Sexualidade e Prazer: estimulação clitoriana e prazer feminino

2. **4 novas entradas de FAQ** (`src/data/content-faq.ts`):
   - `faq-relacao-toxica` — Como reconhecer uma relação tóxica
   - `faq-amor-atracao` — Diferença entre atração e amov
   - `faq-consentimento-por-ato` — Consentimento é por atividade, não global
   - `faq-ciumes-saudavel` — Como lidar com ciúmes de forma saudável
   - `faq-orgasmo-feminino` — Realidade do prazer feminino e penetração

### Verificação

- Todos os 227 testes passam (incluindo testes de integridade de conteúdo
  que validam IDs únicos e campos obrigatórios).

### Decisões adotadas

- Mantive a convenção de IDs (`q14`–`q18` após `q13`).
- As perguntas cobrem temas já presentes nos artigos (q14 → artigo `sinais-toxicos`,
  q15 → artigo `amor-vs-atracao`, q16 → artigo `regra-sim`, q17 → artigo `ciumes`,
  q18 → artigo `prazer-sexual`).
- FAQ mantém o formato `faq-*` com audiência `["jovens"]`.
