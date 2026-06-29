# EduSexual PT - Estado do Projeto

## Ficheiros do Projeto

```
edusexual-pt/
├── src/
│   ├── app/
│   │   ├── globals.css      # Estilos globais (Tailwind)
│   │   ├── layout.tsx       # Layout principal
│   │   └── page.tsx         # Página principal (SPA com tabs)
│   └── data/
│       └── content.ts       # Conteúdo: artigos, quizzes, FAQ
├── public/                  # Ficheiros estáticos
├── package.json             # Dependências
├── tailwind.config.ts       # Configuração Tailwind
├── tsconfig.json           # Configuração TypeScript
├── next.config.mjs         # Configuração Next.js
└── postcss.config.js       # Configuração PostCSS
```

## Funcionalidades Implementadas

1. **Página Inicial** - Introdução e temas
2. **Quiz Interativo** - 12 perguntas com feedback
3. **FAQ** - Accordion com perguntas frequentes
4. **Tira Dúvidas** - Formulário anónimo
5. **Recursos** - Linhas de apoio e serviços em Portugal

## Temas de Conteúdo

- Anatomia e Fisiologia
- Contracepção
- Infeções Sexualmente Transmissíveis (IST)
- Relações e Afetos
- Orientação Sexual e Identidade de Género
- Gravidez e Planeamento Familiar
- Recursos em Portugal

## Bugs Corrigidos

- [x] Erro de sintaxe em content.ts - aspas dentro de template literals
- [x] Caracteres inválidos (chinês) removidos

## Próximos Passos

- Adicionar mais artigos
- Melhorar o design
- Adicionar vídeos
- Sistema de perguntas com Supabase (opcional)

## Links

- GitHub: https://github.com/SushiF5/edusexual-pt
- Vercel: (deploy em andamento)

## Notas

- Sem recolha de dados pessoais
- 100% anónimo
- Informação baseada em fontes oficiais (APF, DGS, DGE)