<div align="center">

# 🧠 EduSexual PT

**Portal de Educação Sexual em Português Europeu**

Um espaço seguro, anónimo e acessível para aprender sobre saúde sexual e relações — sem tabus, com informação validada.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/Licença-Privado-red)]()

[🔗 Site](https://edusexual-pt.vercel.app) · [🎧 Podcast](https://podcasters.spotify.com/pod/show/edusexual) · [📋 Repo](https://github.com/SushiF5/edusexual-pt)

</div>

---

## ✨ Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| 🎯 **Perfis de Audiência** | Conteúdo adaptado para **Crianças**, **Jovens** e **Adultos/Educadores** |
| 📖 **Artigos Educativos** | Temas como anatomia, contracepção, IST, consentimento, identidade de género e mais |
| 🧠 **Quiz Interativo** | Testa os teus conhecimentos com feedback imediato e explicações |
| ❓ **FAQ** | Perguntas frequentes filtradas por perfil de audiência |
| 💬 **Tira Dúvidas** | Envio anónimo de perguntas via Telegram |
| 🎙️ **Podcast** | Integração com Spotify — episódios do "Descomplicando" com player integrado |
| 📋 **Guias e Recursos** | Guias descarregáveis/imprimíveis por perfil |
| 🌙 **Modo Escuro** | Toggle dark/light com persistência em localStorage |
| ♿ **Acessibilidade** | WCAG 2.1 — focus-visible rings, aria-live, roles semânticos |
| 📱 **Responsivo** | Menu hamburger, layouts adaptados a mobile e desktop |

## 🎨 Design

- **Primária:** `#2D5A5A` (verde escuro profissional)
- **Secundária:** `#F4A261` (laranja acolhedor)
- **Fundo:** `#FAFAF9` (creme claro)
- **Accent:** `#E9C46A` (amarelo suave)
- **Tipografia:** Outfit (headings) + Source Sans 3 (body)

## 🛠️ Stack Técnica

- **Framework:** Next.js 16 (App Router)
- **Linguagem:** TypeScript
- **Estilo:** Tailwind CSS 3
- **APIs internas:** Podcast RSS, Telegram Bot, Google Stitch SDK
- **Deploy:** Vercel

## 🚀 Começar

```bash
# Clonar o repositório
git clone https://github.com/SushiF5/edusexual-pt.git
cd edusexual-pt

# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev
```

O site estará disponível em **http://localhost:3000**

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── api/
│   │   ├── podcast/        # RSS feed do podcast
│   │   ├── stitch/         # Geração de layouts com Stitch SDK
│   │   └── telegram/       # Envio anónimo de perguntas
│   ├── globals.css         # Estilos globais (Tailwind)
│   ├── layout.tsx          # Layout raiz com SEO e dark mode
│   └── page.tsx            # SPA principal com tabs
├── components/
│   └── StitchLayout.tsx    # Modal de layout gerado pelo Stitch
├── data/
│   ├── content.ts          # Artigos, quizzes, FAQ, guias
│   └── content-backlog.md  # Conteúdo planeado
└── lib/
    └── stitch.ts           # Utilitários do Stitch SDK
```

## 📚 Temas de Conteúdo

1. Anatomia e Fisiologia
2. Contracepção e Métodos Preventivos
3. Infeções Sexualmente Transmissíveis (IST)
4. Relações e Afetos
5. Orientação Sexual e Identidade de Género
6. Consentimento e Limites
7. Gravidez e Planeamento Familiar
8. Recursos e Linhas de Apoio em Portugal

## 🔒 Privacidade

- **Sem registo** — não há contas, logins ou passwords
- **100% anónimo** — o formulário de dúvidas não recolhe dados pessoais
- **Informação validada** — baseada em fontes oficiais:
  - [APF](https://apf.pt) — Associação para o Planeamento da Família
  - [DGS](https://dgs.pt) — Direção-Geral da Saúde
  - [DGE](https://dge.mec.pt) — Direção-Geral da Educação
  - [OMS](https://who.int) — Organização Mundial de Saúde

## ⚕️ Aviso

Este site fornece informação educacional geral. Não substitui aconselhamento médico personalizado. Para questões de saúde, consulta um profissional de saúde.

## 📄 Licença

Projeto privado. Todos os direitos reservados.
