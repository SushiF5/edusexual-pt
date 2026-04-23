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
      },
      {
        id: "nomes-corretos",
        title: "Os nomes das partes do corpo",
        category: "Corpo",
        content: `Tal como temos um nome para o nariz e para os ouvidos, as partes privadas também têm nomes. 
        
As meninas têm a vulva e os meninos têm o pénis e os testículos. Usar os nomes certos ajuda-nos a comunicar melhor e a dizer exatamente o que se passa se tivermos algum problema ou dúvida.`
      },
      {
        id: "diferencas-corpos",
        title: "Meninos e Meninas: O que muda?",
        category: "Corpo",
        content: `Toda a gente é diferente e isso é o que torna o mundo interessante! 
        
Embora a maioria das pessoas seja menino ou menina, a maior diferença está nas partes privadas e na forma como o corpo cresce. Mas lembra-te: independentemente de sermos meninos ou meninas, todos temos sentimentos e todos merecemos respeito.`
      }
    ]
  },
  {
    id: "seguranca-criancas",
    title: "Limites e Segurança",
    slug: "seguranca-criancas",
    description: "Aprende a proteger-te e a dizer não.",
    icon: "🛡️",
    audience: "criancas",
    articles: [
      {
        id: "consentimento-criancas",
        title: "O que é o consentimento?",
        category: "Segurança",
        content: `Consentimento é uma palavra difícil, mas significa algo simples: perguntar se a outra pessoa quer e concordar com isso.
        
Por exemplo, antes de dares um abraço a um amigo, podes perguntar: "Posso dar-te um abraço?". Se ele disser "Sim", podes dar. Se disser "Não", tudo bem, respeitamos a vontade dele. O mesmo vale para ti: tu podes dizer "Não" se não quiseres um abraço!`
      },
      {
        id: "superpoder-nao",
        title: "Dizer 'Não' é um superpoder",
        category: "Segurança",
        content: `Sabias que tens um superpoder? Chama-se a palavra "NÃO".
        
Sempre que sentires que algo não está certo, ou que alguém está a fazer algo que te deixa desconfortável, podes usar o teu superpoder. Não precisas de ser educada se alguém estiver a desrespeitar o teu corpo. Diz "NÃO" com voz firme e afasta-te.`
      },
      {
        id: "segredos-bons-maus",
        title: "Segredos bons e segredos maus",
        category: "Segurança",
        content: `Há segredos que são divertidos, como uma festa surpresa para o pai ou um presente escondido. Esses são segredos bons porque nos deixam felizes!
        
Mas há segredos que nos deixam com um "nó na barriga" ou tristes. Se alguém te pedir para guardar um segredo sobre o teu corpo ou sobre algo que te deixou assustado, esse é um segredo mau. Segredos maus DEVEM ser contados a um adulto de confiança.`
      }
    ]
  },

  // --- SECÇÃO JOVENS ---
  {
    id: "anatomia-jovens",
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
        content: `A puberdade é o período de transição entre a infância e a idade adulta. É quando o corpo começa a produzir hormonas que provocam mudanças físicas e emocionais.
        
Nas raparigas, costuma acontecer entre os 8 e os 13 anos; nos rapazes, entre os 9 e os 14 anos. É normal que cada pessoa tenha o seu próprio ritmo. Não te compares com os teus amigos; o teu corpo sabe quando está pronto.`
      },
      {
        id: "ciclo-menstrual",
        title: "O ciclo menstrual explicado",
        category: "Anatomia",
        content: `A menstruação é a descamação do revestimento do útero (endométrio) quando não ocorre a fecundação de um óvulo.
        
O ciclo dura, em média, 28 dias, mas pode variar muito, especialmente nos primeiros anos. Sintomas como cólicas, acne e alterações de humor são comuns devido às hormonas. Usar pensos, tampões ou copas menstruais são formas de gerir a higiene durante estes dias.`
      },
      {
        id: "mudancas-masculinas",
        title: "Mudanças no corpo masculino",
        category: "Anatomia",
        content: `Durante a puberdade, os rapazes notam o crescimento dos testículos e do pénis, o surgimento de pelos no rosto e corpo, e a voz que se torna mais grave.
        
As poluções noturnas (ejaculações involuntárias durante o sono) são normais e fazem parte do amadurecimento do sistema reprodutor masculino.`
      }
    ]
  },
  {
    id: "contracepcao-jovens",
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
        content: `Os métodos contracetivos dividem-se em vários tipos:
        
1. Barreira: Preservativos (únicos que protegem de IST).
2. Hormonais: Pílula, implante, injeções (impedem a ovulação).
3. Longa Duração: DIU (dispositivo intra-uterino).
        
A escolha do método deve ser feita com apoio médico, dependendo da saúde e do estilo de vida de cada pessoa.`
      },
      {
        id: "pilula-dia-seguinte",
        title: "Contraceção de Emergência",
        category: "Contracepção",
        content: `A pílula do dia seguinte deve ser usada apenas em emergências (ex: rutura do preservativo ou esquecimento da pílula).
        
Ela não é um método regular e não é abortiva. Quanto mais cedo for tomada após a relação, maior a sua eficácia. Pode ser obtida nas farmácias ou centros de saúde.`
      }
    ]
  },
  {
    id: "ist-jovens",
    title: "Infeções Sexualmente Transmissíveis (IST)",
    slug: "ist",
    description: "Prevenção, sintomas e rastreio",
    icon: "⚠️",
    audience: "jovens",
    articles: [
      {
        id: "o-que-sao-ist",
        title: "O que são IST?",
        category: "Saúde",
        content: `As IST são infeções transmitidas principalmente através do contacto sexual (vaginal, anal ou oral) sem proteção. São causadas por bactérias, vírus ou parasitas.
        
Muitas IST não apresentam sintomas imediatos, o que significa que uma pessoa pode estar infetada e transmitir a infeção sem saber. Por isso, o rastreio regular é fundamental.`
      },
      {
        id: "prevencao-ist",
        title: "Como prevenir IST",
        category: "Prevenção",
        content: `A forma mais eficaz de prevenir a maioria das IST é a utilização correta e sistemática do preservativo.
        
Além disso, a vacinação (como a do HPV) e a comunicação aberta com o(a) parceiro(a) sobre a saúde sexual ajudam a reduzir os riscos.`
      },
      {
        id: "rastreio-ist",
        title: "Quando e como fazer rastreio?",
        category: "Saúde",
        content: `O rastreio de IST consiste em fazer exames (sangue, urina ou zaragatoas) para detetar infeções. 
        
Deves fazer rastreio:
- Sempre que inicias uma nova relação sexual.
- Se tiveres sintomas (corrimentos, feridas, comichão).
- Regularmente, se tiveres múltiplos parceiros.
        
Podes fazer isto no teu Centro de Saúde ou na APF.`
      },
      {
        id: "hiv-sida",
        title: "VIH e SIDA: a diferença",
        category: "Saúde",
        content: `O VIH é o vírus da Imunodeficiência Humana. Quando não é tratado, pode evoluir para a SIDA (Síndrome da Imunodeficiência Adquirida).
        
Hoje em dia, com a Terapia Antirretroviral (TARV), as pessoas com VIH podem viver vidas longas e saudáveis. Quando a carga viral é indetetável, o vírus não é transmitido (Indetetável = Intransmissível).`
      },
      {
        id: "hpv-vacina",
        title: "HPV e a Vacina",
        category: "Prevenção",
        content: `O HPV (Papilomavírus Humano) é muito comum e algumas estirpes podem causar cancro do colo do útero.
        
A vacina contra o HPV é a melhor forma de prevenção e é recomendada para rapazes e raparigas. Além da vacina, o rastreio regular (como o Papanicolau) é essencial para as mulheres.`
      }
    ]
  },
  {
    id: "relacoes-jovens",
    title: "Relações e Afetos",
    slug: "relacoes",
    description: "Amor, respeito e limites",
    icon: "❤️",
    audience: "jovens",
    articles: [
      {
        id: "relacao-saudavel",
        title: "O que é uma relação saudável?",
        category: "Psicologia",
        content: `Uma relação saudável baseia-se no respeito mútuo, na confiança, na comunicação aberta e na honestidade.
        
Numa relação saudável, sentes-te livre para seres tu próprio, tens espaço para as tuas amizades e hobbies, e as decisões são tomadas em comum, sem pressões ou manipulações.`
      },
      {
        id: "sinais-toxicos",
        title: "Sinais de uma relação tóxica",
        category: "Alerta",
        content: `Fica atento a sinais de alerta:
        - Ciúmes excessivos e controlo (ex: pedir passwords das redes sociais).
        - Pressão para ter relações sexuais antes de estares pronto(a).
        - Humilhações ou críticas constantes.
        - Isolamento dos teus amigos e família.
        
Se te sentires assim, procura ajuda de um adulto de confiança ou de um profissional.`
      }
    ]
  },
  {
    id: "consentimento-jovens",
    title: "Consentimento e Limites",
    slug: "consentimento",
    description: "A regra do 'Sim' entusiástico",
    icon: "🤝",
    audience: "jovens",
    articles: [
      {
        id: "regra-sim",
        title: "O que é o Consentimento?",
        category: "Ética",
        content: `O consentimento é um acordo livre, voluntário e entusiasta para participar numa atividade sexual. 
        
Para ser válido, o consentimento deve ser:
1. Específico: Concordar com um beijo não significa concordar com tudo o resto.
2. Reversível: Podes mudar de ideia a qualquer momento, mesmo que a atividade já tenha começado.
3. Consciente: Alguém sob efeito de álcool ou drogas não pode dar consentimento válido.`
      }
    ]
  },
  {
    id: "orientacao-jovens",
    title: "Orientação e Identidade",
    slug: "orientacao-identidade",
    description: "Diversidade sexual e de género",
    icon: "🌈",
    audience: "jovens",
    articles: [
      {
        id: "orientacao-sexual",
        title: "O que é a Orientação Sexual?",
        category: "Identidade",
        content: `A orientação sexual refere-se a quem sentimos atração emocional, romântica ou sexual. 
        
Exemplos comuns incluem a heterossexualidade, homossexualidade, bissexualidade e assexualidade. A sexualidade é um espetro e pode evoluir ao longo da vida.`
      },
      {
        id: "identidade-genero",
        title: "Identidade de Género vs. Orientação",
        category: "Identidade",
        content: `A orientação sexual é sobre QUEM nos atrai. A identidade de género é sobre QUEM nós somos.
        
A identidade de género é a perceção interna de ser homem, mulher, ambos, nenhum (não-binário) ou outro género, independentemente do sexo biológico atribuído ao nascer.`
      }
    ]
  },
  {
    id: "gravidez-jovens",
    title: "Gravidez e Planeamento",
    slug: "gravidez-planeamento",
    description: "Como acontece e que opções existem",
    icon: "🤰",
    audience: "jovens",
    articles: [
      {
        id: "como-acontece-gravidez",
        title: "Como acontece a gravidez?",
        category: "Anatomia",
        content: `A gravidez ocorre quando um espermatozoide fertiliza um óvulo. Isto acontece normalmente durante a ovulação (meio do ciclo menstrual).
        
O óvulo fertilizado viaja até ao útero, onde se implanta e começa a crescer. É por isto que o uso de contraceptivos é fundamental para quem não pretende engravidar.`
      },
      {
        id: "sinais-gravidez",
        title: "Sinais de Gravidez",
        category: "Saúde",
        content: `Os sinais variam de pessoa para pessoa, mas os mais comuns são:
        - Atraso na menstruação.
        - Náuseas e vómitos (especialmente de manhã).
        - Sensibilidade nas mamas.
        - Cansaço excessivo.
        
Se suspeitas de uma gravidez, o primeiro passo é fazer um teste de farmácia ou de sangue.`
      },
      {
        id: "ivg-portugal",
        title: "Interrupção Voluntária da Gravidez (IVG)",
        category: "Lei",
        content: `Em Portugal, a IVG é um direito legal e gratuito no SNS até às 10 semanas de gestação.
        
É um processo seguro e confidencial. Quem deseja interromper a gravidez deve dirigir-se a um centro de saúde ou hospital para receber aconselhamento e realizar o procedimento.`
      }
    ]
  },
  {
    id: "corpo-imagem-jovens",
    title: "Corpo e Imagem",
    slug: "corpo-imagem",
    description: "Autoestima e a realidade dos corpos",
    icon: "✨",
    audience: "jovens",
    articles: [
      {
        id: "imagem-corporal",
        title: "Imagem Corporal: Gostar de si mesmo",
        category: "Psicologia",
        content: `A forma como vemos o nosso corpo é influenciada por muitas coisas: família, amigos e redes sociais. 
        
É importante lembrar que a perfeição não existe. Cada corpo é diferente e tem a sua própria beleza e funcionalidade. Focar no que o teu corpo consegue FAZER (correr, abraçar, pensar) é mais saudável do que focar apenas em como ele se PARECE.`
      },
      {
        id: "redes-sociais-realidade",
        title: "Redes Sociais vs. Realidade",
        category: "Alerta",
        content: `Muitas imagens que vemos no Instagram ou TikTok usam filtros, ângulos específicos e edição (Photoshop).
        
Comparar a tua vida real com a "vida perfeita" de alguém nas redes sociais é injusto contigo. Lembra-te que as pessoas só publicam os seus melhores momentos, não as suas imperfeições.`
      }
    ]
  },
  {
    id: "recursos-portugal",
    title: "Recursos em Portugal",
    slug: "recursos-portugal",
    description: "Onde encontrar apoio e informação",
    icon: "🇵🇹",
    audience: "jovens",
    articles: [
      {
        id: "linhas-apoio",
        title: "Linhas de Apoio",
        category: "Ajuda",
        content: `Se precisares de ajuda imediata, existem várias linhas gratuitas e anónimas:
        - APAV (Apoio à Vítima): 800 200 2200
        - Linha Emergência Social: 144
        - SOS Criança: 116 111
        - Linha Saúde Sexual: Consulta o portal da DGS.`
      },
      {
        id: "instituicoes-apoio",
        title: "Instituições Especializadas",
        category: "Ajuda",
        content: `Existem organizações que oferecem apoio gratuito e especializado em saúde sexual:
        - APF (Associação para o Planeamento da Família): Consultas, contracepção e aconselhamento.
        - ILGA Portugal: Apoio especializado para a comunidade LGBTQI+.
        - Centros de Saúde (SNS): Planeamento familiar e rastreios de IST.`
      }
    ]
  },

  // --- SECÇÃO ADULTOS ---
  {
    id: "guia-pais",
    title: "Guia para Pais e Educadores",
    slug: "guia-pais",
    description: "Como falar sobre sexualidade com os mais novos.",
    icon: "👨‍👩‍👧‍👦",
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
      },
      {
        id: "educacao-idade",
        title: "Educação Sexual por Idade",
        category: "Pedagogia",
        content: `A abordagem deve adaptar-se ao desenvolvimento da criança:
        - 3-6 anos: Nomes das partes do corpo, privacidade e consentimento básico.
        - 6-11 anos: Mudanças do corpo, diversidade familiar, higiene.
        - 12+ anos: Puberdade, contraceção, IST, relações saudáveis.`
      }
    ]
  }
];

export const quizQuestions: QuizQuestion[] = [
  // CRIANÇAS
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
    id: "qc2",
    audience: "criancas",
    topic: "Corpo",
    question: "Quem pode tocar nas tuas partes privadas?",
    options: ["Qualquer pessoa", "Só as pessoas que eu quiser", "Apenas adultos de confiança por saúde ou higiene", "Ninguém nunca"],
    correctAnswer: 2,
    explanation: "O teu corpo é privado. Apenas pessoas como médicos ou pais (para higiene/saúde) podem tocar, e sempre com o teu conhecimento."
  },
  {
    id: "qc3",
    audience: "criancas",
    topic: "Segurança",
    question: "O que é um 'segredo mau'?",
    options: ["Uma festa surpresa", "Um segredo que nos deixa tristes ou com medo", "Um brinquedo escondido", "Não existem segredos maus"],
    correctAnswer: 1,
    explanation: "Segredos que nos fazem sentir mal ou desconfortáveis nunca devem ser guardados; devem ser contados a um adulto."
  },
  // JOVENS
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
    id: "q2",
    audience: "jovens",
    topic: "Anatomia",
    question: "O que é a pílula do dia seguinte?",
    options: ["Um método contracetivo regular", "Um método de emergência", "Um tratamento para IST", "Um suplemento vitamínico"],
    correctAnswer: 1,
    explanation: "A pílula do dia seguinte é para emergências e não deve substituir a contraceção regular."
  },
  {
    id: "q3",
    audience: "jovens",
    topic: "IST",
    question: "É possível ter uma IST e não apresentar quaisquer sintomas?",
    options: ["Não, as IST dão sempre sinais", "Sim, muitas IST são assintomáticas", "Só as IST bacterianas", "Só as IST virais"],
    correctAnswer: 1,
    explanation: "Sim, muitas infeções não mostram sintomas imediatos, por isso o rastreio médico é essencial."
  },
  {
    id: "q4",
    audience: "jovens",
    topic: "Consentimento",
    question: "O consentimento para uma atividade sexual pode ser retirado a qualquer momento?",
    options: ["Não, depois de dito 'sim' não muda", "Sim, pode ser retirado a qualquer momento", "Só se houver um motivo grave", "Depende da relação"],
    correctAnswer: 1,
    explanation: "O consentimento é fluido. Mesmo que tenhas dito 'sim' no início, tens o direito de mudar de ideia a qualquer momento."
  },
  {
    id: "q5",
    audience: "jovens",
    topic: "Gravidez",
    question: "Até a que semana é legal a IVG gratuita no SNS em Portugal?",
    options: ["6 semanas", "10 semanas", "14 semanas", "20 semanas"],
    correctAnswer: 1,
    explanation: "Em Portugal, a Interrupção Voluntária da Gravidez é legal e gratuita até às 10 semanas."
  },
  // ADULTOS
  {
    id: "qa1",
    audience: "adultos",
    topic: "Educação",
    question: "A partir de que idade se deve começar a falar sobre limites e consentimento?",
    options: ["Só na adolescência", "Desde que a criança começa a interagir socialmente", "Aos 18 anos", "Nunca"],
    correctAnswer: 1,
    explanation: "Conceitos de limites corporais e consentimento podem e devem ser ensinados desde a infância, adaptando a linguagem."
  },
  {
    id: "qa2",
    audience: "adultos",
    topic: "Proteção",
    question: "O que é o 'grooming' online?",
    options: ["Um tipo de jogo online", "O processo de ganhar a confiança de uma criança para abusar dela", "Aprender a usar redes sociais", "Um erro de software"],
    correctAnswer: 1,
    explanation: "Grooming é quando um adulto cria uma relação de confiança com uma criança online para a manipular e abusar dela."
  }
];

export const frequentlyAskedQuestions = [
  {
    question: "É normal ter dúvidas sobre sexualidade?",
    answer: "Sim, é completamente normal. Todos passam por um processo de descoberta e aprendizagem."
  },
  {
    question: "A masturbação é normal?",
    answer: "Sim, a masturbação é uma prática normal e saudável de autoexploração do corpo e do prazer, desde que não interfira com a vida quotidiana."
  },
  {
    question: "Como saber se estou pronto(a) para ter relações sexuais?",
    answer: "Não há uma idade 'certa'. Estás pronto(a) quando te sentes confortável, seguro(a), informado(a) sobre a proteção e quando a decisão é tua, sem pressões externas."
  },
  {
    question: "Onde posso fazer rastreio de IST grátis em Portugal?",
    answer: "Podes dirigir-te ao teu Centro de Saúde, a consultas de planeamento familiar do SNS ou a instituições como a APF (Associação para o Planeamento da Família)."
  },
  {
    question: "A primeira vez dói sempre?",
    answer: "Não. A dor pode ocorrer devido ao nervosismo, falta de lubrificação ou tensão muscular. Com relaxamento, comunicação e lubrificação, a experiência pode ser prazerosa."
  }
];
