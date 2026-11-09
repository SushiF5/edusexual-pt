TAREFA: Manter projeto saudável - todos os testes passam, typecheck limpo. Próximas áreas: auditoria WCAG 2.1 completa, testes E2E para PodcastTab/ResourcesTab, expansão de áudios para todas as audiências.

TESTES: npm test → 41 suites passed, 462 tests passed (sem regressões)
       npx tsc --noEmit → limpo (sem erros)
       npm run lint → sem avisos

COMMIT: c8f5110 + 1 ficheiro alterado
       - src/app/layout.tsx (adicionadas 3 novas entradas de FAQ para audiência adulta: saúde sexual, contracetivo, menopausa)

PUSH: OK (confirmação: git push origin main → c8f5110 main -> main)

PRÓXIMO: Continuar com melhorias de acessibilidade WCAG 2.1 (audit: contraste, foco visível, landmarks) ou implementar testes E2E para separadores Podcast e Resources, conforme pendências listadas no PROGRESS.md.