export interface MythItem {
  id: string;
  statement: string;
  isTrue: boolean;
  category: "contracecao" | "ists" | "prazer" | "gravidez" | "relacoes";
  categoryLabel: string;
  explanation: string;
  scientificContext: string;
}

export const mythsDatabase: MythItem[] = [
  {
    id: "m1",
    statement: "Usar dois preservativos em simultâneo oferece o dobro da proteção.",
    isTrue: false,
    category: "contracecao",
    categoryLabel: "Contraceção",
    explanation: "Falso! Usar dois preservativos juntos aumenta o atrito entre as superfícies de látex, facilitando que rasguem ou saiam do lugar.",
    scientificContext: "A Organização Mundial da Saúde (OMS) e a DGS recomendam o uso de apenas um preservativo de cada vez, garantindo a sua integridade estrutural."
  },
  {
    id: "m2",
    statement: "É impossível engravidar na primeira relação sexual.",
    isTrue: false,
    category: "gravidez",
    categoryLabel: "Gravidez & Fertilidade",
    explanation: "Falso! A fertilidade depende da ocorrência de ovulação, não do número de relações sexuais anteriores.",
    scientificContext: "Se houver penetração vaginal com ejaculação ou fluido pré-ejaculatório fértil durante o período periovulatório, existe probabilidade de fecundação desde a primeiríssima relação."
  },
  {
    id: "m3",
    statement: "A maioria das Infeções Sexualmente Transmissíveis (ISTs) pode não apresentar sintomas visíveis.",
    isTrue: true,
    category: "ists",
    categoryLabel: "ISTs & Prevenção",
    explanation: "Verdadeiro! Infeções como Clamídia, Gonorreia, HPV, Hepatite B e VIH são frequentemente assintomáticas nas fases iniciais.",
    scientificContext: "Até 70% das mulheres e 50% dos homens com clamídia não manifestam sintomas, podendo transmitir a infeção sem saber. Rastreios e análises periódicas são fundamentais."
  },
  {
    id: "m4",
    statement: "Lavar a vagina com duche vaginal ou água logo após o sexo previne a gravidez.",
    isTrue: false,
    category: "contracecao",
    categoryLabel: "Contraceção",
    explanation: "Falso! Os espermatozoides atingem o colo do útero em questão de segundos. O duche não previne a gravidez e ainda destrói a flora bacteriana protetora.",
    scientificContext: "Os duches vaginais aumentam o risco de vaginites e doença inflamatória pélvica ao alterar o pH e a microbiota natural da vagina."
  },
  {
    id: "m5",
    statement: "O método do coito interrompido ('tirar antes') não é um método seguro para evitar gravidez ou ISTs.",
    isTrue: true,
    category: "contracecao",
    categoryLabel: "Contraceção",
    explanation: "Verdadeiro! O líquido pré-ejaculatório pode conter espermatozoides viáveis e transmite vírus e bactérias causadores de ISTs.",
    scientificContext: "O coito interrompido apresenta uma taxa de falha real de cerca de 22% ao ano e oferece zero proteção contra infeções como VIH, Sífilis ou HPV."
  },
  {
    id: "m6",
    statement: "A pílula do dia seguinte provoca aborto.",
    isTrue: false,
    category: "contracecao",
    categoryLabel: "Contraceção",
    explanation: "Falso! A contraceção de emergência atua adiando ou inibindo a libertação do óvulo (ovulação). Não tem efeito se a gravidez já estiver implantada.",
    scientificContext: "Segundo a Federação Internacional de Ginecologia e Obstetrícia (FIGO), o levonorgestrel e o acetato de ulipristal não são abortivos e não interrompem uma gravidez em curso."
  },
  {
    id: "m7",
    statement: "O preservativo deve ser desenrolado antes de se colocar no pénis.",
    isTrue: false,
    category: "contracecao",
    categoryLabel: "Contraceção",
    explanation: "Falso! O preservativo deve ser encostado no topo da glande e desenrolado diretamente sobre o pénis ereto.",
    scientificContext: "Se o desenrolares antes, é praticamente impossível vesti-lo sem danificar o látex ou criar bolhas de ar."
  },
  {
    id: "m8",
    statement: "O consentimento dado no início de um momento íntimo pode ser retirado a qualquer instante.",
    isTrue: true,
    category: "relacoes",
    categoryLabel: "Relações & Consentimento",
    explanation: "Verdadeiro! O consentimento é contínuo, informado e livre. Qualquer pessoa tem o direito absoluto de parar a qualquer momento.",
    scientificContext: "O respeito pela autonomia corporal é o pilar ético e legal de qualquer relação sexual saudável e segura."
  },
  {
    id: "m9",
    statement: "As consultas de planeamento familiar nos Centros de Saúde em Portugal são pagas.",
    isTrue: false,
    category: "contracecao",
    categoryLabel: "Direitos & SNS",
    explanation: "Falso! Todas as consultas de Saúde Sexual e Planeamento Familiar são totalmente gratuitas e isentas de taxas moderadoras no SNS para qualquer cidadão.",
    scientificContext: "A Lei n.º 3/84 e a Lei n.º 60/2009 garantem o acesso universal e gratuito a cuidados de saúde reprodutiva e métodos contracetivos em Portugal."
  },
  {
    id: "m10",
    statement: "O vírus do HPV (Papilomavírus Humano) pode ser prevenido através de vacina gratuita em Portugal.",
    isTrue: true,
    category: "ists",
    categoryLabel: "ISTs & Prevenção",
    explanation: "Verdadeiro! A vacina nonavalente contra o HPV faz parte do Programa Nacional de Vacinação (PNV) e é administrada gratuitamente a raparigas e rapazes aos 10 anos.",
    scientificContext: "A vacinação previne até 90% dos cancros do colo do útero, orofaringe, ânus e verrugas genitais associados aos tipos de HPV de alto risco."
  },
  {
    id: "m11",
    statement: "A pílula contracetiva protege contra infeções sexualmente transmissíveis.",
    isTrue: false,
    category: "ists",
    categoryLabel: "ISTs & Prevenção",
    explanation: "Falso! A pílula atua exclusivamente no sistema reprodutivo feminino para prevenir a ovulação, não oferecendo qualquer barreira contra vírus ou bactérias.",
    scientificContext: "A prática recomendada pelas entidades de saúde é a Dupla Proteção: método hormonal/LARC para eficácia contracetiva + preservativo para proteção contra ISTs."
  },
  {
    id: "m12",
    statement: "A masturbação é uma prática natural, saudável e sem prejuízos para a saúde física ou mental.",
    isTrue: true,
    category: "prazer",
    categoryLabel: "Prazer & Corpo",
    explanation: "Verdadeiro! A masturbação é uma forma segura de autodescoberta do corpo, alívio de tensão e bem-estar, desprovida de riscos de gravidez ou ISTs.",
    scientificContext: "Estudos médicos desmistificam quaisquer crenças antigas sobre malefícios físicos, comprovando que a resposta sexual estimula a libertação de endorfinas e relaxamento."
  }
];
