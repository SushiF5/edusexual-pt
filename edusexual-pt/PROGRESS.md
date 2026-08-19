# PROGRESS.md — EduSexual PT

Log de execuções e melhorias implementadas.

## Execução — 19 Ago 2026 (2)

### Melhoria: Expansão de áudios para Crianças e Adultos

Concluída a melhoria pendente "Expandir áudios para as secções Crianças e
Adultos". Até agora, os MP3 cobriam apenas a secção Jovens (75 ficheiros).
Foram agora gerados e vinculados os áudios de todas as fichas das secções
Crianças (17) e Adultos (24), totalizando 116 MP3 no disco.

### Implementado

1. **Geração de áudios** (`gerar_audios2.py`):
   - O script já percorre as três secções (Crianças, Jovens, Adultos) e
     seleciona a voz adequada (Raquel para Crianças/Jovens, Duarte para
     Adultos). Apenas faltavam gerar os ficheiros das duas secções novas —
     executado com sucesso (116 MP3 no total).
   - Os grupos-pai (ex.: `corpo-criancas`, `guia-pais`) não têm `content:`
     próprio, pelo que são corretamente ignorados pelo extrator.

2. **Vinculação de `audioUrl`** (`src/data/content-topics.ts`):
   - Adicionado `audioUrl: "/audio/MP3/<id>.mp3"` a 33 fichas das secções
     Crianças e Adultos (colocado antes de `content:`, seguindo a
     convenção canónica).
   - Resultado: 108 referências `audioUrl` locais, 0 apontando para
     ficheiros em falta (100% das fichas com MP3 gerado estão vinculadas).

### Verificação

- 232 testes passam (suite completa, incluindo integridade de conteúdo que
  valida `audioUrl` → ficheiro existente).
- Auditoria: nenhum `audioUrl` aponta para ficheiro inexistente.

### Próximas melhorias pendentes (sugeridas)

- [ ] Lazy loading de conteúdo por audiência
- [ ] Acessibilidade WCAG 2.1 completa (auditoria)
- [ ] Testes E2E (Playwright)

---

## Execução — 19 Ago 2026

### Melhoria: Modo de Revisão do Quiz

Após terminar o quiz, os utilizadores podiam ver apenas a pontuação. Adicionei
uma secção de **revisão** que lista cada pergunta com a resposta dada, a
resposta correta (quando errou) e a explicação — reforçando a aprendizagem.

### Implementado

1. **Secção de revisão** (`src/components/QuizTab.tsx`):
   - Registo das respostas dadas (`userAnswers`) ao longo do quiz.
   - Ecrã de resultado agora inclui uma lista ordenada (`<ol>`) com, para cada
     pergunta: a resposta escolhida (✓/✗), a resposta correta (só quando
     errada) e a explicação.
   - Filtro opcional "Mostrar apenas as que errei" (`checkbox` com
     `reviewOnlyWrong`) para rever só os erros.
   - Semântica acessível: `<section aria-labelledby>`, `<ol>`, `aria-label`.

2. **Persistência** (`QuizTab.tsx`): `userAnswers` passou a ser guardado/
   restaurado em `localStorage` juntamente com o estado do quiz.

3. **i18n** (`src/i18n/translations.ts`): novas chaves `quizReviewTitle`,
   `quizReviewIntro`, `quizYourAnswer`, `quizCorrectAnswerLabel`,
   `quizNotAnswered`, `quizReviewOnlyWrong` em PT/EN/ES (paridade mantida).

4. **Testes** (`src/__tests__/components/QuizTab.test.tsx`): 3 novos testes
   cobrem a secção de revisão, a marcação de erro/correto e o filtro.

### Verificação

- 232 testes passam (suite completa, incluindo integridade i18n e QuizTab).
- `tsc --noEmit` limpo nos ficheiros alterados (erros pré-existentes apenas no
  ficheiro de teste `translations.integrity.test.ts`, não tocado).

### Próximas melhorias pendentes (sugeridas)

- [ ] Expandir áudios para as secções Crianças e Adultos (o script cobre só Jovens)
- [ ] Lazy loading de conteúdo por audiência
- [ ] Acessibilidade WCAG 2.1 completa (auditoria)
- [ ] Testes E2E (Playwright)

---

## Execução — 18 Ago 2026 (2)

### Melhoria: Cobertura total de áudios dos artigos (Jovens)

Concluída a tarefa pendente "Gerar os MP3 em falta" referida na execução
anterior. Foram gerados os 11 ficheiros MP3 que faltavam para a secção
Jovens e vinculados via `audioUrl` no `content-topics.ts`.

### Implementado

1. **Geração de áudios** (`gerar_audios2.py`):
   - Corrigido o *parser* de extração: o regex global original dava falsos
     negativos (falhava em 11 artigos que têm `category` entre `title` e
     `content`), pelo que não eram gerados. Substituído por extração
     isolada por `id:` (bloco-a-bloco), robusta e sem omissões.
   - Gerados 11 MP3: `puberdade`, `metodos-contracetivos`, `o-que-sao-ist`,
     `relacao-saudavel`, `regra-sim`, `orientacao-sexual`,
     `como-acontece-gravidez`, `imagem-corporal`, `higiene-intima`,
     `masturbacao`, `linhas-apoio`.

2. **Vinculação de `audioUrl`** (`src/data/content-topics.ts`):
   - Adicionado `audioUrl: "/audio/MP3/<id>.mp3"` a cada um dos 11 artigos
     (colocado após `category:`, seguindo a convenção canónica).
   - Resultado: 75 referências `audioUrl` locais, 0 apontando para ficheiros
     em falta (100% dos artigos com MP3 gerado estão vinculados).

### Verificação

- 229 testes passam (inclui integridade de conteúdo que valida `audioUrl`
  → ficheiro existente, e testes do `HomeTab`/`AudioPlayer`).
- `npx tsc --noEmit` limpo nos ficheiros alterados (erros pré-existentes
  apenas em ficheiros de teste não tocados: `pdf/route.test.ts`,
  `PodcastTab.test.tsx`).
- Auditoria: nenhum `audioUrl` aponta para ficheiro inexistente.

### Próximas melhorias pendentes (sugeridas)

- [ ] Lazy loading de conteúdo por audiência
- [ ] Acessibilidade WCAG 2.1 completa (auditoria)
- [ ] Testes E2E (Playwright)
- [ ] Expandir áudios para as secções Crianças e Adultos (o script cobre só Jovens)

---

## Execução — 18 Ago 2026

### Melhoria: Expansão dos áudios dos artigos (vinculação completa)

O objetivo pendente "Expandir áudios para todos os artigos" foi concluído: todos os
artigos cujo ficheiro MP3 existe em `public/audio/MP3/` agora têm `audioUrl` e
apresentam o `AudioPlayer` na respetiva secção (componente `HomeTab`).

Foram corrigidas também inconsistências de indentação em blocos de artigos
introduzidas por alterações não finalizadas, normalizando a formatação para o
padrão canónico (6 espaços no `{`, 8 nas propriedades).

### Implementado

1. **Vinculação de áudios** (`src/data/content-topics.ts`):
   - 19 artigos passaram a referenciar o respetivo MP3 (`audioUrl`).
   - Apenas se ligam ficheiros que **existem** no disco — evita-se players
     quebrados (404). Artigos sem MP3 correspondente mantêm-se sem áudio.
   - Resultado: 64 referências `audioUrl` locais, 0 apontando para ficheiros
     inexistentes.

2. **Normalização de indentação** dos blocos de artigo (formatação canónica).

### Verificação

- 229 testes passam (HomeTab inclui os players de áudio por artigo).
- `tsc --noEmit` limpo em `content-topics.ts` (erros pré-existentes apenas no
  ficheiro de teste `translations.integrity.test.ts`, não tocado).
- Auditoria: nenhum `audioUrl` aponta para ficheiro em falta.

### Próximas melhorias pendentes (sugeridas)

- [ ] Gerar os MP3 em falta (ex.: `puberdade`, `metodos-contracetivos`,
      `o-que-sao-ist`) via `gerar_audios2.py` para cobrir 100% dos artigos
- [ ] Lazy loading de conteúdo por audiência
- [ ] Acessibilidade WCAG 2.1 completa (auditoria)
- [ ] Testes E2E (Playwright)

---

## Execução — 17 Ago 2026 (2)

### Melhoria: Pesquisa na FAQ

A FAQ só permitia filtrar por audiência. Adicionei uma caixa de pesquisa
para os utilizadores encontrarem perguntas por palavra-chave (pergunta ou
resposta), além do filtro existente por audiência.

### Implementado

1. **Pesquisa na FAQ** (`src/components/FaqTab.tsx`):
   - Campo de pesquisa (`type="search"`) com `aria-label` e ícone.
   - Filtra por `question` e `answer` (case-insensitive), mantendo o
     filtro por audiência.
   - Estado vazio dedicado (`noFaqFound` + `tryOtherTerms`) com live region.

2. **Chaves i18n** (`src/i18n/translations.ts`): `searchFaq` e `noFaqFound`
   adicionadas em PT, EN e ES (mantém paridade validada pelos testes).

3. **Testes** (`src/__tests__/components/FaqTab.test.tsx`):
   - Filtragem por pesquisa (mostra/esconde corretamente).
   - Estado vazio quando não há correspondência.

### Verificação

- 229 testes passam (incluindo integridade i18n e testes da FAQ).
- TypeScript limpo nos ficheiros alterados.

### Próximas melhorias pendentes (sugeridas)

- [ ] Expandir áudios para todos os artigos (ciclo-menstrual, contraceção, IST)
- [ ] Lazy loading de conteúdo por audiência
- [ ] Acessibilidade WCAG 2.1 completa (auditoria)
- [ ] Testes E2E (Playwright)

---

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
