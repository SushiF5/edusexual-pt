# EduSexual PT

Portal de educação sexual em português para todas as idades.

## Estrutura do Projeto

```
edusexual-pt/           # Projeto principal (Next.js 14 + TypeScript + Tailwind CSS)
├── src/
│   ├── app/              # App Router (Next.js)
│   ├── components/       # Componentes React (tabs, layout, etc.)
│   ├── data/            # Conteúdo (artigos, quiz, FAQ, guias)
│   ├── i18n/            # Internacionalização (PT/EN/ES)
│   └── lib/             # Utilitários (Stitch SDK)
├── public/              # Ficheiros estáticos
└── package.json

edusexual-pt-github/   # Clone do repositório GitHub (referência)
stitch_portal_educa_o_sexual/  # Designs exportados do Google Stitch
```

## Funcionalidades

- ✅ Página inicial com artigos por audiência (Crianças / Jovens / Adultos)
- ✅ Quiz interativo com 24 perguntas
- ✅ FAQ com 23 perguntas frequentes
- ✅ Formulário de dúvidas anónimas (via Telegram)
- ✅ Podcast integrado (Spotify + RSS)
- ✅ Guias para download/impressão (PDF)
- ✅ Alternância de idioma (PT/EN/ES)
- ✅ Modo escuro
- ✅ Geração de áudios (Python + Edge TTS)

## Configuração

1. **Instalar dependências:**
   ```bash
   cd edusexual-pt
   npm install
   ```

2. **Variáveis de ambiente** (`.env.local`):
   ```
   # Stitch AI
   STITCH_API_KEY=sua_key_aqui
   STITCH_PROJECT_ID=seu_project_id

   # Telegram Bot
   TELEGRAM_BOT_TOKEN=token_do_botfather
   TELEGRAM_CHAT_ID=chat_id
   ```

3. **Gerar áudios:**
   ```bash
   cd edusexual-pt
   pip install edge-tts asyncio
   python ../gerar_audios2.py
   ```

4. **Desenvolvimento:**
   ```bash
   npm run dev
   ```

5. **Build:**
   ```bash
   npm run build
   ```

## Deploy na Vercel

1. Conectar repositório ao Vercel
2. Adicionar variáveis de ambiente:
   - `STITCH_API_KEY`
   - `STITCH_PROJECT_ID`
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`
3. Deploy automático no push para `master`

## Conteúdo

O conteúdo está em `src/data/content.ts` e `src/data/content-backlog.md`.

### Temas:
- Anatomia e Fisiologia
- Contracepção
- IST (Infeções Sexualmente Transmissíveis)
- Relações e Afetos
- Consentimento e Limites
- Orientação Sexual e Identidade de Género
- Gravidez e Planeamento Familiar
- Recursos em Portugal

### Fontes:
- APF (Associação para o Planeamento da Família)
- DGS (Direção-Geral da Saúde)
- DGE (Direção-Geral da Educação)
- OMS (Organização Mundial de Saúde)

## Tecnologias

- **Frontend:** Next.js 14, React 19, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes
- **Validação:** Zod
- **Áudio:** Microsoft Edge TTS (Python)
- **Design:** Google Stitch AI
- **Deploy:** Vercel

## Melhorias Implementadas

- ✅ Corrigido MIME type do AudioPlayer (wav → mpeg)
- ✅ Validação Zod nas APIs (Telegram, Stitch)
- ✅ Stitch SDK com fallback para env vars em falta
- ✅ Componentes refatorados (page.tsx monolítico → tabs separadas)
- ✅ Spinner de loading no botão de dúvidas
- ✅ StitchLayout limpa estado ao fechar
- ✅ Caminhos corrigidos no script Python
- ✅ Acessibilidade (aria-labels, roles, etc.)

## Próximos Passos

- [ ] Adicionar testes (Jest/Playwright)
- [ ] Gerar PDFs para download (além de print CSS)
- [ ] Expandir áudios para todos os artigos
- [ ] Lazy loading de conteúdo por audiência
- [ ] Melhorar cobertura de acessibilidade (WCAG 2.1)
