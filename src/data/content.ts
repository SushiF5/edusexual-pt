export interface Topic {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  audience: "criancas" | "jovens" | "adultos";
  articles: Article[];
}

export interface Article {
  id: string;
  title: string;
  content: string;
  category: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  topic: string;
  audience: "criancas" | "jovens" | "adultos";
}

export const topics: Topic[] = [
  // --- SECÇÃO CRIANÇAS ---
  {
    id: "corpo-criancas",
    title: "Conhecer o meu Corpo",
    slug: "corpo-criancas",
    description: "Aprende os nomes das partes do corpo e como cuidar de ti.",
    icon: "🧑‍🤝‍🧑",
    audience: "criancas",
    articles: [
      {
        id: "partes-corpo",
        title: "O meu corpo é único",
        category: "Corpo",
        content: `O teu corpo é a tua casa! Assim como uma casa tem várias divisões, o teu corpo tem várias partes. Algumas partes toda a gente vê, como a cara e as mãos. Outras partes são privadas e ficam tapadas pelo fato de banho.

É importante saberes que o teu corpo pertence-te a ti. Ninguém deve tocar nas tuas partes privadas sem a tua autorização, a menos que seja por uma questão de saúde (como o médico ou os pais para te limparem).`
      },
      {
        id: "toques-seguros",
        title: "Toques bons e toques confusos",
        category: "Segurança",
        content: `Existem toques que nos fazem sentir bem, como um abraço da avó ou um "passa aqui" de um amigo. Esses são toques bons!

Mas se algum toque te deixar confuso, triste ou com medo, deves dizer "Não!" e contar logo a um adulto em quem confies (como o pai, a mãe ou um professor). Não deves guardar segredos que te deixem desconfortável.`
      }
    ]
  },
  // --- SECÇÃO JOVENS (Existente) ---
  {
    id: "anatomia",
    title: "Anatomia e Fisiologia",
    slug: "anatomia-fisiologia",
    description: "Compreende o corpo humano e as suas mudanças",
    icon: "🫀",
    audience: "jovens",
    articles: [
      {
        id: "puberdade",
        title: "O que é a puberdade?",
        category: "Anatomia",
        content: `A puberdade é o período de transição entre a infância e a idade adulta... (nas raparigas 8-13 anos, nos rapazes 9-14 anos).`
      }
    ]
  },
  {
    id: "contracepcao",
    title: "Contracepção",
    slug: "contracepcao",
    description: "Métodos para prevenir a gravidez",
    icon: "🛡️",
    audience: "jovens",
    articles: [
      {
        id: "metodos-contraceptivos",
        title: "Métodos contracetivos",
        category: "Contracepção",
        content: `Os métodos contracetivos dividem-se em vários tipos: barreira, hormonais e longa duração...`
      }
    ]
  },
  // --- SECÇÃO ADULTOS/PAIS ---
  {
    id: "guia-pais",
    title: "Guia para Pais e Educadores",
    slug: "guia-pais",
    description: "Como falar sobre sexualidade com os mais novos.",
    icon: "👨‍👩-👧‍👦",
    audience: "adultos",
    articles: [
      {
        id: "como-falar",
        title: "Como iniciar a conversa",
        category: "Educação",
        content: `Falar sobre sexualidade não deve ser um evento único (a "conversa"), mas sim um diálogo contínuo.

Dicas para pais:
1. Use nomes anatomicamente corretos (ex: vulva, pénis) desde cedo. Isto retira o estigma e dá ferramentas à criança para se proteger.
2. Aproveite momentos do dia-a-dia (um anúncio na TV, uma gravidez na família) para falar sobre o tema de forma natural.
3. Se não souber a resposta, diga "Vou investigar e depois respondo-te".`
      },
      {
        id: "sinais-alerta",
        title: "Sinais de Alerta: Abuso Sexual",
        category: "Proteção",
        content: `É fundamental estar atento a mudanças súbitas no comportamento da criança:
- Pesadelos frequentes ou medo de dormir sozinho.
- Comportamentos sexuais desadequados para a idade.
- Isolamento ou medo de uma pessoa específica.
- Regressões (voltar a fazer chichi na cama).

Mantenha sempre um canal de comunicação aberto e sem julgamentos.`
      }
    ]
  }
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: "qc1",
    audience: "criancas",
    topic: "Segurança",
    question: "O que deves fazer se alguém te tocar de uma maneira que não gostas?",
    options: ["Ficar calado", "Dizer 'Não' e contar a um adulto de confiança", "Esconder-me", "Fugir para longe"],
    correctAnswer: 1,
    explanation: "O teu corpo é teu! Se algo te deixa desconfortável, deves sempre contar a alguém em quem confies."
  },
  {
    id: "q1",
    audience: "jovens",
    topic: "Contracepção",
    question: "Qual é o único método contracetivo que protege simultaneamente de gravidez e de IST?",
    options: ["Pílula", "Preservativo", "DIU", "Espermicida"],
    correctAnswer: 1,
    explanation: "O preservativo é o único método que cria uma barreira física contra gravidez e IST."
  },
  {
    id: "qa1",
    audience: "adultos",
    topic: "Educação",
    question: "A partir de que idade se deve começar a falar sobre limites e consentimento?",
    options: ["Só na adolescência", "Desde que a criança começa a interagir socialmente", "Aos 18 anos", "Nunca"],
    correctAnswer: 1,
    explanation: "Conceitos de limites corporais e consentimento podem e devem ser ensinados desde a infância, adaptando a linguagem."
  }
];

export const frequentlyAskedQuestions = [
  {
    question: "É normal ter dúvidas sobre sexualidade?",
    answer: "Sim, é completamente normal. Todos passam por um processo de descoberta e aprendizagem."
  }
];
