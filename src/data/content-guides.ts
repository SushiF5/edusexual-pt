import { Guide } from "./content-types";

export const guides: Guide[] = [
  {
    id: "guia-pais-conversar",
    title: "Guia para Pais: Como Falar de Sexualidade",
    description: "Um guia prático para iniciar conversas sobre sexualidade com os teus filhos, adaptado a cada idade.",
    icon: "👨‍👩‍👧‍👦",
    audience: "adultos",
    sections: [
      {
        heading: "Por onde começar?",
        body: "Não esperes pela pergunta perfeita. A educação sexual começa cedo: nomes corretos das partes do corpo aos 2-3 anos, limites e consentimento aos 4-5, reprodução aos 6-8. O importante é criar um ambiente onde a criança se sinta segura para perguntar.\n\nDica: Usa oportunidades do dia a dia — uma cena de série, uma notícia, uma pergunta inesperada — para iniciar a conversa de forma natural."
      },
      {
        heading: "Adapta a linguagem à idade",
        body: "3-5 anos: Nomes anatómicos corretos, toques bons vs. maus, quem pode tocar nas partes íntimas (só médico com pai/mãe presente).\n\n6-9 anos: De onde vêm os bebés (adaptado), puberdade (brevemente), diferenças entre famílias.\n\n10-12 anos: Puberdade em detalhe, menstruação, consentimento, segurança online.\n\n13+: Contracepção, IST, relações saudáveis, pornografia vs. realidade, orientação sexual e identidade de género."
      },
      {
        heading: "O que NÃO fazer",
        body: "— Não mentir ou inventar histórias ('os bebés vêm da cegonha').\n— Não envergonhar a criança por perguntar.\n— Não ignorar perguntas — se não sabes a resposta, diz 'Vou pesquisar e depois falamos.'\n— Não usar a conversa como interrogatório.\n— Não assumir a orientação sexual do teu filho."
      },
      {
        heading: "Recursos em Portugal",
        body: "— APF (apf.pt): Consultas de planeamento familiar, materiais pedagógicos.\n— DGE (dge.mec.pt): Guias curriculares para educação sexual nas escolas.\n— DGS (dgs.pt): Informação de saúde sexual.\n— Linha Criança: 116 111 (grátis).\n— APAV: 800 200 2200 (apoio vítimas)."
      }
    ]
  },
  {
    id: "guia-professores-sala-aula",
    title: "Guia para Professores: Educação Sexual na Sala de Aula",
    description: "Estratégias e atividades para abordar a educação sexual de forma pedagógica e inclusiva.",
    icon: "📚",
    audience: "adultos",
    sections: [
      {
        heading: "O que diz a lei",
        body: "A educação sexual é obrigatória nas escolas portuguesas (Lei n.º 60/2013, alterada pela Lei n.º 115/2019). Deve ser lecionada de forma transversal ou em área disciplinar específica, com um mínimo de 6 sessões por ano.\n\nOs temas obrigatórios incluem: desenvolvimento humano, relações interpessoais, habilidades pessoais, saúde sexual e comportamento sexual."
      },
      {
        heading: "Criar um espaço seguro",
        body: "— Estabelecer regras de respeito: não há perguntas estúpidas, não se ri das dúvidas dos outros.\n— Usar a 'caixa de perguntas' anónimas para alunos mais tímidos.\n— Não forçar participação — observar é também aprender.\n— Garantir linguagem inclusiva (não assumir heterossexualidade ou identidade binária).\n— Informar sobre linhas de apoio no final de cada sessão."
      },
      {
        heading: "Atividades práticas",
        body: "1. Muro de Mitos — Escrever mitos comuns em post-its e debater cada um.\n2. Linha do Consentimento — Exercício com cenários: 'É consentimento?' (sim/não/talvez).\n3. Caixa de Perguntas — Alunos escrevem dúvidas anonimamente; professor responde na aula seguinte.\n4. Role-play — Simular situações de pressão de pares e estratégias de recusa.\n5. Quiz interativo — Usar plataformas como Kahoot com perguntas do EduSexual PT."
      },
      {
        heading: "Recursos pedagógicos",
        body: "— DGE: 'Educação para a Sexualidade' — guiões de sessões por ano de escolaridade.\n— APF: Manuais e fichas de trabalho gratuitos.\n— WHO/OMS: 'Standards for Sexuality Education in Europe' — enquadramento europeu.\n— Plataforma EduSexual PT — conteúdo adaptado por idade, quizzes e FAQ."
      }
    ]
  },
  {
    id: "guia-jovens-proteger",
    title: "Guia para Jovens: Como Proteger-te",
    description: "Tudo o que precisas de saber sobre contracepção, IST e consentimento num só guia.",
    icon: "🛡️",
    audience: "jovens",
    sections: [
      {
        heading: "Dupla proteção",
        body: "A dupla proteção significa usar preservativo (masculino ou feminino) PARA ALÉM de outro método contracetivo. Porquê?\n\n— Pílula/DIU/implante → previne gravidez, NÃO previne IST.\n— Preservativo → previne IST E gravidez (quando bem usado).\n\nA melhor combinação: preservativo + pílula/DIU/implante = proteção máxima."
      },
      {
        heading: "Consentimento em 4 pontos",
        body: "1. Entusiasta — Um 'sim' claro e querido, não um 'bem...' ou 'se queres...'.\n2. Informado — Saber o que vai acontecer, sem surpresas.\n3. Revogável — Podes mudar de ideia a qualquer momento, mesmo a meio.\n4. Mútuo — Todas as pessoas envolvidas têm de concordar.\n\nÁlcool/drogas invalidam o consentimento. Se a pessoa não consegue responder com clareza, é NÃO."
      },
      {
        heading: "IST: o que fazer",
        body: "— Faz rastreio pelo menos 1x por ano se tens vida sexual ativa.\n— Muitas IST não têm sintomas — só descobres com teste.\n— Locais grátis: Centro de Saúde, APF, consultas de planeamento familiar.\n— Se der positivo: não entres em pânico, a maioria trata-se. Fala com o médico e informa o(s) parceiro(s).\n— Vacina HPV: disponível no SNS para mulheres até 45 anos e homens até 26 (verificar critérios atuais)."
      },
      {
        heading: "Linhas de apoio",
        body: "— SNS 24: 808 200 204 (saúde).\n— APF: Consultas de planeamento familiar grátis.\n— Linha do Arco-Íris: apoio LGBTQI+.\n— APAV: 800 200 2200 (apoio vítimas de crime).\n— Voz de Apoio: 21 354 4090."
      }
    ]
  },
  {
    id: "guia-criancas-seguranca",
    title: "Guia para Crianças: As Regras da Segurança",
    description: "Regras simples para te manteres seguro e saberes quando pedir ajuda.",
    icon: "🦸",
    audience: "criancas",
    sections: [
      {
        heading: "As 5 regras do teu corpo",
        body: "1. O teu corpo é TEU — ninguém te pode tocar sem o teu permissão.\n2. As partes cobertas pelo fato de banho são PRIVADAS — só tu, os teus pais (para te lavar) ou o médico (com os teus pais presentes) podem ver ou tocar.\n3. Se alguém te pede para guardar um segredo que te deixa triste ou com medo — CONTA a um adulto de confiança.\n4. Dizer NÃO não é ser mal-educado — é proteger-te!\n5. Se alguém te faz sentir desconfortável, PODES sempre contar — nunca é culpa tua."
      },
      {
        heading: "Quando pedir ajuda",
        body: "Pede ajuda a um adulto de confiança quando:\n— Alguém te pede para fazer algo que te parece errado.\n— Alguém te ameaça ou te diz para não contares nada.\n— Sentes medo, tristeza ou confusão sobre algo que aconteceu.\n— Alguém na internet te pede fotos ou para te encontrares.\n\nAdultos de confiança: pais, professores, médicos, ou liga para a Linha Criança (116 111)."
      },
      {
        heading: "Segurança na internet",
        body: "— Nunca partilhes fotos tuas com desconhecidos.\n— Não digas onde moras ou onde estudas online.\n— Se alguém te pede segredos na internet — conta aos teus pais.\n— Podes sempre bloquear alguém que te incomoda.\n— O que está online pode ficar para sempre — pensa antes de publicar."
      },
      {
        heading: "Ligações importantes",
        body: "— Linha Criança: 116 111 (grátis, pode ligar de qualquer telemóvel).\n— SOS Criança: 21 793 1629.\n— Emergência: 112.\n— Fala sempre com um adulto de confiança — pais, professores, ou liga para estas linhas."
      }
    ]
  }
];
