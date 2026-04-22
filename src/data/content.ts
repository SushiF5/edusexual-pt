export interface Topic {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
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
}

export const topics: Topic[] = [
  {
    id: "anatomia",
    title: "Anatomia e Fisiologia",
    slug: "anatomia-fisiologia",
    description: "Compreende o corpo humano e as suas mudanças",
    icon: "🫀",
    articles: [
      {
        id: "puberdade",
        title: "O que é a puberdade?",
        category: "Anatomia",
        content: `A puberdade é o período de transição entre a infância e a idade adulta, onde o corpo passa por várias mudanças físicas e hormonais. Geralmente começa entre os 8-13 anos nas raparigas e entre os 9-14 anos nos rapazes.

Nas raparigas, as principais mudanças incluem:
- Desenvolvimento dos seios
- Crescimento de pelos pubianos e axilares
- Primeira menstruação (menarca)
- Crescimento em altura
- Alterações na distribuição de gordura corporal

Nos rapazes, as principais mudanças incluem:
- Crescimento dos testículos
- Crescimento de pelos pubianos, axilares e faciais
- Alargamento dos ombros
- Mudança de voz
- Crescimento em altura
- Produção de esperma (ejaculação noturna ou "sonhos molhados")`
      },
      {
        id: "ciclo-menstrual",
        title: "O ciclo menstrual",
        category: "Anatomia",
        content: `O ciclo menstrual é o processo mensal que prepara o corpo da mulher para uma possível gravidez. Dura em média 28 dias, mas pode variar entre 21 e 35 dias.

Fases do ciclo:
1. Fase menstrual (dias 1-5): O revestimento do útero é expelido, causando a menstruação.
2. Fase folicular (dias 1-13): Um óvulo amadurece num dos ovários.
3. Ovulação (dia 14 aproximadamente): O óvulo é libertado e pode ser fertilizado.
4. Fase lútea (dias 15-28): O útero prepara-se para receber um óvulo fertilizado.

É normal ter sintomas como cólicas, fadiga ou alterações de humor durante o ciclo.`
      }
    ]
  },
  {
    id: "contracepcao",
    title: "Contracepção",
    slug: "contracepcao",
    description: "Métodos para prevenir a gravidez",
    icon: "🛡️",
    articles: [
      {
        id: "metodos-contraceptivos",
        title: "Métodos contracetivos",
        category: "Contracepção",
        content: `Os métodos contracetivos dividem-se em vários tipos:

**Métodos de barreira:**
- Preservativo masculino: impede que os espermatozoides entrem na vagina. Também protege contra IST.
- Preservativo feminino: inserir na vagina antes da relação.
- Diafragma: pequena barreira de silicone colocável no colo do útero.

**Métodos hormonais:**
- Pílula: toma diária que previne a ovulação.
- Implante subcutâneo: pequeño bastão libertador de hormonas no braço.
- Adesivo contracetivo: patch semanal.
- Anel vaginal: anel mensal.
- Injeção contracetiva: injeção trimestral.

**Métodos de longa duração:**
- Dispositivo intrauterino (DIU): pequenas dispositivo colo do útero, pode durar vários anos.

**Métodos naturais:**
- Método do ritmo: evitar relações nos dias férteis.
- Coito interrompido: não é método confiável.

O preservativo é o único método que protege tanto de gravidez como de IST.`
      },
      {
        id: "preservativo",
        title: "Como usar o preservativo",
        category: "Contracepção",
        content: `O preservativo é o único método que protege simultaneamente de gravidez e infeções sexualmente transmissíveis.

**Como colocar:**
1. Verifica a data de validade
2. Abre a embalagem com cuidado (não uses os dentes)
3. Coloca o preservativo na ponta do pénis ereto
4. Aperta a ponta para sair o ar
5. Desliza até à base
6. Após a ejaculação, segura na base e remove

**Cuidados importantes:**
- Usa um novo preservativo em cada relação
- Não uses dois preservativos ao mesmo tempo (podem romper)
- Guarda num local fresco e seco
- Usa apenas lubrificantes à base de água ou silicone

**O que fazer se romper:**
- Se houver risco de gravidez, consulta um profissional de saúde sobre contraceção de emergência.
- Se houver risco de IST, faz o teste passado 3 meses.`
      }
    ]
  },
  {
    id: "ist",
    title: "Infeções Sexualmente Transmissíveis",
    slug: "ist",
    description: "Protege-te das infeções",
    icon: "🦠",
    articles: [
      {
        id: "o-que-sao-ist",
        title: "O que são as IST?",
        category: "IST",
        content: `As Infeções Sexualmente Transmissíveis (IST) são infeções que se transmitem principalmente através do contacto sexual desprotegido. Existem mais de 30 bactérias, vírus e parasitas que podem causar IST.

**Tipos principais:**
- **VIH/SIDA**: Vírus que enfraquece o sistema imunitário
- **Clamídia**: Infeção bacteriana frequente, muitas vezes sem sintomas
- **Gonorreia**: Infeção bacteriana que afeta órgãos genitais, garganta e olhos
- **Sífilis**: Infeção bacteriana com fases distintas
- **Herpes genital**: Vírus que causa bolhas e úlceras
- **HPV**: Vírus que pode causar verrugas genitais e cancro
- **Hepatite B e C**: Infeções do fígado

**Sinais de alerta:**
- Feridas ou bolhas nos órgãos genitais
- Corrimento anormal
- Dor ao urinar
- Comichão ou irritação

Muitos casos não apresentam sintomas, por isso é importante fazer testes regulares.`
      },
      {
        id: "teste-ist",
        title: "Onde fazer o teste de IST?",
        category: "IST",
        content: `Em Portugal, podes fazer o teste de IST gratuitamente em vários locais:

**Serviços de Saúde:**
- Centros de Saúde (ACES)
- Hospitais públicos
- Centros de Atendimento a Jovens (CAJ)
- Planeamento Familiar

**Locais especializados:**
- APF (Associação para o Planeamento da Família)
- CheckpointLX (Lisboa) -teste rápido de VIH e sífilis
- GAT (Grupo de Ativistas em Tratamento)
- Liga Portuguesa contra o SIDA

**Testes rápidos:**
- Disponíveis em algumas organizações
- Resultado em minutos
- Confirmação laboratorial necessária se positivo

O teste é:
- Gratuito
- Anónimo
- Confidencial
- Indolor (apenas uma picadela no dedo)

Recomenda-se fazer o teste:
- Após uma relação desprotegida
- A cada 6-12 meses se ativo sexualmente
- Se tens sintomas`
      }
    ]
  },
  {
    id: "relacoes",
    title: "Relações e Afetos",
    slug: "relacoes-afetos",
    description: "Comunicar e viver relações saudáveis",
    icon: "❤️",
    articles: [
      {
        id: "relacoes-saudaveis",
        title: "O que é uma relação saudável?",
        category: "Relações",
        content: `Uma relação saudável baseia-se em respeito mútuo, confiança e comunicação aberta.

**Características de uma relação saudável:**
- Respeito pelos limites de cada um
- Comunicação aberta e honesta
- Confiança mútua
- Apoio emocional
- Tomada de decisões em conjunto
- Espaço para privacidade individual
- Igualdade na relação

**Sinais de alerta numa relação:**
- Jealousia excessiva
- Controlar onde vais ou com quem falas
- Humilhações ou insultos
- Ameaças ou violência física
- Pressão para fazer coisas que não queres

**Direitos numa relação:**
- Dizer "não" a qualquer momento
- Mudar de opinião
- Terminar a relação
- Ter privacidade
- Ser tratado com respeito

Se reconheces sinais de abuso, pede ajuda. Linha de Apoio: 800 202 048 (CAPS)
      },
      {
        id: "consentimento",
        title: "Consentimento",
        category: "Relações",
        content: "Consentimento significa dar permissão de forma livre e informada para algo. Em contexto sexual, é essencial.\n\n**Princípios do consentimento:**\n- **Livre**: Não há pressão, coerção ou ameaça\n- **Informado**: Sabes exatamente no que estás a concordar\n- **Ativo**: É um \"sim\" claro, não a ausência de \"não\"\n- **Reversível**: Podes mudar de ideia a qualquer momento\n\n**Como dar e receber consentimento:**\n- Pergunta antes de cada passo\n- Aceita um \"não\" como resposta\n- Respeita se a pessoa parecer desconfortável\n- Não assumes que \"sim\" em algo significa \"sim\" em tudo\n\n**O consentimento NÃO é:**\n- Silêncio ou passividade\n- Um \"sim\" obtido sob pressão\n- Um \"sim\" quando está bêbado/a ou inconsciente\n- Um \"sim\" do passado"
      }
    ]
  },
  {
    id: "orientacao-sexual",
    title: "Orientação Sexual e Identidade de Género",
    slug: "orientacao-sexual",
    description: "Compreende a diversidade",
    icon: "🌈",
    articles: [
      {
        id: "orientacao-sexual-o-que-e",
        title: "O que é orientação sexual?",
        category: "Orientação",
        content: "A orientação sexual refere-se à atração emocional, romântica e/ou sexual que uma pessoa sente por outras pessoas.\n\n**Tipos de orientação sexual:**\n- **Heterossexual**: Atrtação por pessoas do sexo oposto\n- **Homosexual**: Atrração por pessoas do mesmo sexo\n- **Bissexual**: Atrração por pessoas de ambos os sexos\n- **Pansexual**: Atrração por pessoas independentemente do género\n- **Assexual**: Ausência ou baixa atração sexual\n\n**É importante saber:**\n- A orientação sexual não é uma escolha\n- Não é uma doença\n- Não pode ser \"curada\" ou alterada\n- É normal e natural\n\nA descoberta da própria orientação sexual pode ser um processo. É normal ter dúvidas e questionar. O mais importante é ser autêntico consigo mesmo."
      },
      {
        id: "identidade-genero",
        title: "Identidade de género",
        category: "Orientação",
        content: `A identidade de género é a forma como a pessoa se sente e se identifica internamente, que pode ser diferente do sexo asignado ao nascimento.

**Termos importantes:**
- **Cisgénero**: Quando a identidade de género corresponde ao sexo asignado ao nascimento
- **Transgénero**: Quando a identidade de género não corresponde ao sexo asignado ao nascimento
- **Não-binário**: Quando a pessoa não se identifica nem como homem nem como mulher
- **Genderqueer**: Identidade de género fluida ou não-convencional

**Direitos em Portugal:**
- A Lei n.º 38/2018 permite a alteração de nome e género no registo civil sem requisitos médicos
- É proibida a discriminação com base na identidade de género
- O acesso a cuidados de saúde trans-specific é garantido

**Se estás a questionar-te:**
- É normal sentir confusão
- Não há pressa para definir nada
- Podes explorar à tua velocidade
- Fala com pessoas de confiança`
      }
    ]
  },
  {
    id: "gravidez",
    title: "Gravidez e Planeamento Familiar",
    slug: "gravidez",
    description: "Informações sobre reprodução",
    icon: "👶",
    articles: [
      {
        id: "gravidez-como-ocorre",
        title: "Como ocorre a gravidez?",
        category: "Gravidez",
        content: `A gravidez ocorre quando um espermatozoide fertiliza um óvulo.

**Processo:**
1. Durante a ejaculação, milhões de espermatozoides são libertados na vagina
2. Os espermatozoides nadam em direção ao óvulo
3. Se um deles atingir o óvulo, ocorre a fertilização
4. O óvulo fertilizado desloca-se para o útero
5. Implanta-se na parede do útero e começa a desenvolver-se

**Fertilidade:**
- A mulher só pode engravidar cerca de 6 dias por mês (janela fértil)
- A ovulação ocorre geralmente a meio do ciclo
- O espermatozoides podem viver até 5 dias no corpo feminino
- Um único ejaculado pode conter milhões de espermatozoides

**Sinais de gravidez:**
- Atraso na menstruação
- Náuseas
- Fadiga
- Seios doridos
- Vontade de urinar mais frequente

Um teste de gravidez pode ser feito a partir do primeiro dia de atraso menstrual.`
      },
      {
        id: "contracepcao-emergencia",
        title: "Contraceção de emergência",
        category: "Gravidez",
        content: `A contraceção de emergência é um método para prevenir a gravidez após uma relação desprotegida ou falha de contraception.

**Tipos:**
1. **Pílula do dia seguinte** (contraceção oral de emergência)
   - Mais eficaz quanto mais cedo for tomada
   - Pode ser tomada até 72h (3 dias) ou 120h (5 dias) dependendo do tipo
   - É gratuita nos centros de saúde

2. **DIU de cobre**
   - Pode ser inserido até 5 dias após a relação
   - Eficácia muito elevada
- Funciona como método contracetivo de longa duração

**Quando usar:**
- Ruptura do preservativo
- Esquecimento de tomar a pílula
- Relação sem proteção
- Violação

**Onde obter:**
- Centro de saúde
- Farmácia (com receita médica é gratuita)
- Hospital
- APF

A contraceção de emergência não protege contra IST.`
      }
    ]
  },
  {
    id: "recursos",
    title: "Recursos em Portugal",
    slug: "recursos",
    description: "Onde pedir ajuda",
    icon: "📍",
    articles: [
      {
        id: "linhas-apoio",
        title: "Linhas de apoio",
        category: "Recursos",
        content: `Em Portugal, existem várias linhas de apoio gratuitas e confidenciais:

**Saúde Sexual e Reprodutiva:**
- Linha de Saúde Sexual e Reprodutiva: 800 202 048 (gratuita)
- APF: 21 793 20 44

**VIH/SIDA:**
- Linha SIDA: 800 200 660 (gratuita)
- CheckpointLX: 21 884 10 27

**Violência:**
- Linha de Apoio a Vítimas de Violência: 800 202 148
- SOS Criança: 116 111

**Psicologia e Jovens:**
- Linha Teen: 800 500 100 (gratuita para jovens)
- Centro de Atendimento a Jovens (CAJ) - em várias cidades

**Anonimato:**
Todas as linhas respeitam a confidencialidade e anonimato. Podes identificar-te ou não, como preferires.`
      },
      {
        id: "onde-saude-sexual",
        title: "Onde ir para cuidados de saúde sexual",
        category: "Recursos",
        content: `Em Portugal, podes aceder a serviços de saúde sexual em vários locais:

**Grátis ( SNS):**
- **Centros de Saúde**: Planeamento familiar, contracção, testes
- **Hospitais**: Consultas de medicina sexual e reprodução
- **Centros de Atendimento a Jovens (CAJ)**: Serviços adaptados a jovens
- **ACES**: Serviços comunitários

**Organizações:**
- **APF**: Consultas, testes, informação
- **CheckpointLX**: Testes rápidos de VIH e sífili
- **GAT**: Apoio a pessoas com VIH
- **Médicos do Mundo**: Apoio a populações vulneráveis

**O que podes encontrar:**
- Consultas de planeamento familiar
- Testes de IST
- Contraceção (incluindo gratuita)
- Aconselhamento
- Vacinação (HPV, Hepatite B)
- Interrupção Voluntária de Gravidez (IVE)

**Não tens de ter medicação de família para aceder a estes serviços.**`
      }
    ]
  }
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    topic: "Contracepção",
    question: "Qual é o único método contracetivo que protege simultaneamente de gravidez e de IST?",
    options: ["Pílula", "Preservativo", "DIU", "Espermicida"],
    correctAnswer: 1,
    explanation: "O preservativo (masculino ou feminino) é o único método que cria uma barreira física evitando tanto a gravidez como a transmissão de infeções sexualmente transmissíveis."
  },
  {
    id: "q2",
    topic: "IST",
    question: "Qual é a infeção sexualmente transmissível causada por um vírus que enfraquece o sistema imunitário?",
    options: ["Gonorreia", "VIH/SIDA", "Clamídia", "Sífilis"],
    correctAnswer: 1,
    explanation: "O Vírus da Imunodeficiência Humana (VIH) ataca o sistema imunitário, podendo evoluir para SIDA se não for tratado."
  },
  {
    id: "q3",
    topic: "Anatomia",
    question: "Qual é a fase do ciclo menstrual em que ocorre a libertação do óvulo?",
    options: ["Fase menstrual", "Fase folicular", "Ovulação", "Fase lútea"],
    correctAnswer: 2,
    explanation: "A ovulação ocorre geralmente por volta do 14º dia do ciclo, quando o óvulo é libertado pelo ovário e pode ser fertilizado."
  },
  {
    id: "q4",
    topic: "Relações",
    question: "O que significa consentimento em contexto sexual?",
    options: [
      "Um sim que foi dado no passado",
      "Um sim obtido sob pressão",
      "Uma permissão livre, informada e ativa",
      "A ausência de um não"
    ],
    correctAnswer: 2,
    explanation: "O consentimento deve ser livre (sem pressão), informado (saber no que se está a concordar) e ativo (um sim claro). Pode ser revogado a qualquer momento."
  },
  {
    id: "q5",
    topic: "Contracepção",
    question: "Até quantas horas após uma relação desprotegida a pílula do dia seguinte pode ser tomada?",
    options: ["24 horas", "48 horas", "72 horas", "120 horas"],
    correctAnswer: 3,
    explanation: "Dependendo do tipo, a pílula do dia seguinte pode ser tomada até 72h (3 dias) ou 120h (5 dias) após a relação desprotegida. Quanto mais cedo, mais eficaz."
  },
  {
    id: "q6",
    topic: "IST",
    question: "Qual é a bactéria que causa a clamídia?",
    options: ["Vírus", "Bactéria", "Parasita", "Fungo"],
    correctAnswer: 1,
    explanation: "A clamídia é causada pela bactéria Chlamydia trachomatis. É uma das IST mais comuns e muitas vezes não apresenta sintomas."
  },
  {
    id: "q7",
    topic: "Orientação",
    question: "Qual é a orientação sexual de uma pessoa que se sente atraída por pessoas de ambos os sexos?",
    options: ["Heterossexual", "Homossexual", "Bissexual", "Assexual"],
    correctAnswer: 2,
    explanation: "A bissexualidade refere-se à atração por pessoas de mais de um género/sexo. É uma orientação sexual válida e não é uma escolha."
  },
  {
    id: "q8",
    topic: "Relações",
    question: "Qual é um sinal de uma relação saudável?",
    options: [
      "Jealousia excessiva",
      "Controlar o parceiro",
      "Respeito pelos limites",
      "Pressão para fazer coisas"
    ],
    correctAnswer: 2,
    explanation: "O respeito pelos limites do outro é fundamental numa relação saudável. Isso inclui aceitar quando a pessoa diz não e respeitar o espaço individual."
  },
  {
    id: "q9",
    topic: "Gravidez",
    question: "Quanto tempo após um atraso na menstruação se pode fazer um teste de gravidez?",
    options: [
      "Imediatamente",
      "1 dia",
      "1 semana",
      "1 mês"
    ],
    correctAnswer: 1,
    explanation: "Um teste de gravidez pode ser feito a partir do primeiro dia de atraso menstrual. Os testes detetam a hormona hCG na urina."
  },
  {
    id: "q10",
    topic: "IST",
    question: "Onde podes fazer o teste de IST gratuitamente em Portugal?",
    options: [
      "Apenas em hospitais",
      "Apenas com prescrição médica",
      "Em centros de saúde e organizações como a APF",
      "Apenas em clínicas privadas"
    ],
    correctAnswer: 2,
    explanation: "Em Portugal podes fazer testes de IST gratuitamente nos centros de saúde, hospitais, Centros de Atendimento a Jovens (CAJ) e organizações como a APF."
  },
  {
    id: "q11",
    topic: "Anatomia",
    question: "A puberdade nas raparigas geralmente começa por volta de que idade?",
    options: ["5-8 anos", "8-13 anos", "15-18 anos", "20-25 anos"],
    correctAnswer: 1,
    explanation: "A puberdade nas raparigas começa geralmente entre os 8 e os 13 anos, podendo variar de pessoa para pessoa."
  },
  {
    id: "q12",
    topic: "Contracepção",
    question: "O que acontece se usares dois preservativos ao mesmo tempo?",
    options: [
      "Maior proteção",
      "São mais confortáveis",
      "Podem romper-se",
      "Não faz diferença"
    ],
    correctAnswer: 2,
    explanation: "Usar dois preservativos ao mesmo tempo (um dentro do outro) aumenta o atrito e pode fazer com que ambos rompam. Usa apenas um de cada vez."
  }
];

export const frequentlyAskedQuestions = [
  {
    question: "É normal ter dúvidas sobre sexualidade?",
    answer: "Sim, é completamente normal. Todos passam por um processo de descoberta e aprendizaje. As dúvidas são uma parte natural do crescimento."
  },
  {
    question: "Posso engravidar na primeira vez que tenho relações?",
    answer: "Sim, é possível. A gravidez pode ocorrer em qualquer relação sexual vaginal desprotegida, independentemente de ser a primeira vez ou não."
  },
  {
    question: "Como sei se tenho uma IST?",
    answer: "Muitas IST não apresentam sintomas visíveis. A única forma de saber com certeza é fazendo um teste. Em caso de dúvida ou relação desprotegida, consulta um profissional de saúde."
  },
  {
    question: "É possível engravidar durante a menstruação?",
    answer: "Embora seja menos provável, é possível. Os espermatozoides podem viver até 5 dias no corpo feminino, por isso se tiveres um ciclo curto, a menstruação pode coincidir com a janela fértil."
  },
  {
    question: "O que fazer se o preservativo romper?",
    answer: "1. Lava a área com água morna.\n2. Consulta um centro de saúde ou farmácia sobre contraceção de emergência.\n3. Faz um teste de IST passado um tempo适当.\n4. Se houver risco de gravidez, faz um teste de gravidez 2 semanas depois."
  },
  {
    question: "A pílula protege contra IST?",
    answer: "Não. A pílula (e outros métodos hormonais) previne a gravidez mas NÃO protege contra infeções sexualmente transmissíveis. Para proteção contra IST, tens de usar preservativo."
  },
  {
    question: "Como falar com os pais sobre sexualidade?",
    answer: "Escolhe um momento tranquilo e diz que tens dúvidas. Podes começar por perguntar se podem explicar ou ajudar a encontrar informação confiável. Se for difícil, procura um profissional de saúde ou um centro de jovens."
  },
  {
    question: "É normal não ter relações sexuais até mais tarde?",
    answer: "Sim, é completamente normal. Não há uma idade certa para iniciar a vida sexual. Cada pessoa deve esperar até se sentir pronta, sem pressão de terceiros."
  }
];