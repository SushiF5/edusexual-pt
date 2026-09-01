export interface ContraceptiveMethod {
  id: string;
  name: string;
  category: "barreira" | "hormonal" | "intrauterino" | "emergencia" | "permanente" | "natural";
  categoryLabel: string;
  icon: string;
  typicalEfficacy: number; // Percentage (e.g. 87 for 87%)
  perfectEfficacy: number; // Percentage (e.g. 98 for 98%)
  protectsSTIs: boolean;
  requiresPrescription: boolean;
  freeInSNS: boolean;
  duration: string;
  howItWorks: string;
  pros: string[];
  cons: string[];
  howToUse: string;
  snsNotes: string;
}

export const contraceptiveMethods: ContraceptiveMethod[] = [
  {
    id: "preservativo-externo",
    name: "Preservativo Externo (Masculino)",
    category: "barreira",
    categoryLabel: "Método de Barreira",
    icon: "🛡️",
    typicalEfficacy: 87,
    perfectEfficacy: 98,
    protectsSTIs: true,
    requiresPrescription: false,
    freeInSNS: true,
    duration: "Uso único (por cada relação)",
    howItWorks: "Bainha de látex ou poliuretano colocada no pénis ereto que retém o sémen e impede a transmissão de fluidos biológicos e bactérias/vírus.",
    pros: [
      "Único método (junto com o preservativo interno) que protege contra ISTs e VIH",
      "Fácil de transportar, comprar e utilizar",
      "Não contém hormonas e não tem efeitos secundários sistémicos",
      "Disponível gratuitamente no SNS em Portugal"
    ],
    cons: [
      "Pode rasgar se mal colocado ou se usado com lubrificantes à base de óleo/vaselina",
      "Exige colocação no momento da relação",
      "Pessoas com alergia ao látex devem usar versões de poliuretano/poliisopreno"
    ],
    howToUse: "Verificar o prazo de validade e o selo CE. Abrir com os dedos (nunca dentes/tesoura). Apertar a ponta (depósito) para retirar o ar e desenrolar até à base do pénis ereto. Retirar logo após a ejaculação segurando na base.",
    snsNotes: "Distribuído gratuitamente em Centros de Saúde, Consultas de Planeamento Familiar, Espaços Jovens do IPDJ e associações como a APF e GAT."
  },
  {
    id: "preservativo-interno",
    name: "Preservativo Interno (Feminino)",
    category: "barreira",
    categoryLabel: "Método de Barreira",
    icon: "🌸",
    typicalEfficacy: 79,
    perfectEfficacy: 95,
    protectsSTIs: true,
    requiresPrescription: false,
    freeInSNS: true,
    duration: "Uso único (por cada relação)",
    howItWorks: "Bolsa de nitrilo macio com dois anéis flexíveis que se insere na vagina ou no ânus antes da relação, criando uma barreira física protetora.",
    pros: [
      "Protege contra gravidez e infeções sexualmente transmissíveis (ISTs)",
      "Pode ser colocado até 8 horas antes da relação sexual",
      "Não depende da ereção e não aperta o pénis",
      "Adequado para quem tem alergia ao látex"
    ],
    cons: [
      "Menos acessível em supermercados que o externo",
      "Requer prática para colocação confortável",
      "Não deve ser usado em simultâneo com o preservativo externo"
    ],
    howToUse: "Apertar o anel interior e introduzir profundamente na vagina, deixando o anel exterior à volta da vulva. Guiar o pénis para o interior da bolsa durante a penetração.",
    snsNotes: "Disponibilizado gratuitamente em consultas de Saúde Sexual e Reprodutiva do SNS e associações parceiras."
  },
  {
    id: "pilula-combinada",
    name: "Pílula Contracetiva Combinada",
    category: "hormonal",
    categoryLabel: "Método Hormonal",
    icon: "💊",
    typicalEfficacy: 93,
    perfectEfficacy: 99.7,
    protectsSTIs: false,
    requiresPrescription: true,
    freeInSNS: true,
    duration: "Toma diária (comprimido oral)",
    howItWorks: "Contém estrogénio e progestagénio que inibem a ovulação, tornam o muco cervical mais espesso (dificultando a passagem de espermatozoides) e alteram o endométrio.",
    pros: [
      "Elevadíssima eficácia quando tomada com regularidade",
      "Regula o ciclo menstrual, reduz fluxo e cólicas menstruais",
      "Totalmente reversível ao parar a toma"
    ],
    cons: [
      "NÃO protege contra ISTs (deve ser combinada com preservativo - Dupla Proteção)",
      "Exige disciplina diária rigorosa no mesmo horário",
      "Eficácia pode diminuir em caso de vómitos, diarreia grave ou certos antibióticos"
    ],
    howToUse: "Tomar 1 comprimido todos os dias à mesma hora durante 21 ou 28 dias conforme a embalagem prescrita pelo médico.",
    snsNotes: "Prescrita e fornecida gratuitamente a utentes em consultas de planeamento familiar no SNS."
  },
  {
    id: "implante-subcutaneo",
    name: "Implante Subcutâneo",
    category: "hormonal",
    categoryLabel: "Método Hormonal de Longa Duração (LARC)",
    icon: "📍",
    typicalEfficacy: 99.9,
    perfectEfficacy: 99.9,
    protectsSTIs: false,
    requiresPrescription: true,
    freeInSNS: true,
    duration: "Até 3 anos",
    howItWorks: "Pequena haste flexível de cerca de 4 cm inserida sob a pele do braço por um profissional de saúde, libertando progestagénio de forma contínua.",
    pros: [
      "O método mais eficaz existente (não depende da memória do utilizador)",
      "Proteção contínua durante 3 anos",
      "Pode ser removido a qualquer momento, com retorno imediato da fertilidade",
      "Pode ser usado durante a amamentação"
    ],
    cons: [
      "NÃO protege contra ISTs",
      "Requer pequeno procedimento médico para colocação e remoção",
      "Pode alterar o padrão de hemorragia (ausência de menstruação ou pequenos sangramentos)"
    ],
    howToUse: "Colocado no braço por um médico ou enfermeiro treinado sob anestesia local. O utilizador não precisa de fazer mais nada até à data de substituição.",
    snsNotes: "Totalmente comparticipado e colocado gratuitamente em consultas de Saúde Sexual do SNS."
  },
  {
    id: "diu-hormonal",
    name: "DIU / SIU Hormonal (ex: Mirena/Jaydess)",
    category: "intrauterino",
    categoryLabel: "Dispositivo Intrauterino",
    icon: "⚓",
    typicalEfficacy: 99.8,
    perfectEfficacy: 99.8,
    protectsSTIs: false,
    requiresPrescription: true,
    freeInSNS: true,
    duration: "3 a 8 anos (conforme o modelo)",
    howItWorks: "Dispositivo em forma de T colocado no útero que liberta pequenas quantidades locais de levonorgestrel, espessando o muco e impedindo a nidação.",
    pros: [
      "Eficácia superior a 99% de longa duração",
      "Diminui significativamente o fluxo e dores menstruais",
      "Comodidade total sem necessidade de intervenção diária"
    ],
    cons: [
      "NÃO previne infeções sexualmente transmissíveis",
      "Colocação pode causar desconforto temporário",
      "Exige consulta médica para colocação e controlo ecográfico"
    ],
    howToUse: "Introduzido na cavidade uterina por médico ginecologista ou médico de família.",
    snsNotes: "Disponível no SNS com colocação gratuita mediante avaliação médica."
  },
  {
    id: "diu-cobre",
    name: "DIU de Cobre (Não-Hormonal)",
    category: "intrauterino",
    categoryLabel: "Dispositivo Intrauterino Não-Hormonal",
    icon: "🧲",
    typicalEfficacy: 99.2,
    perfectEfficacy: 99.4,
    protectsSTIs: false,
    requiresPrescription: true,
    freeInSNS: true,
    duration: "5 a 10 anos",
    howItWorks: "Dispositivo com fios de cobre que liberta iões de cobre no útero, tendo um efeito espermicida que impede a fecundação sem qualquer hormona.",
    pros: [
      "100% livre de hormonas sintéticas",
      "Não altera o ciclo hormonal natural nem o humor",
      "Duração longa de até 10 anos e reversibilidade imediata",
      "Pode ser usado como contraceção de emergência até 5 dias após relação desprotegida"
    ],
    cons: [
      "NÃO previne ISTs",
      "Pode aumentar o fluxo menstrual e as cólicas nos primeiros meses"
    ],
    howToUse: "Colocado por médico no Centro de Saúde ou Hospital.",
    snsNotes: "Disponibilizado pelo SNS sem custos em consultas de planeamento familiar."
  },
  {
    id: "anel-vaginal",
    name: "Anel Vaginal",
    category: "hormonal",
    categoryLabel: "Método Hormonal Combinado",
    icon: "⭕",
    typicalEfficacy: 93,
    perfectEfficacy: 99.7,
    protectsSTIs: false,
    requiresPrescription: true,
    freeInSNS: false,
    duration: "3 semanas (21 dias + 7 dias de pausa)",
    howItWorks: "Anel flexível e transparente colocado na vagina que liberta estrogénio e progestagénio de forma contínua através da mucosa vaginal.",
    pros: [
      "Apenas necessita de intervenção 2 vezes por mês (colocar e retirar)",
      "Menor probabilidade de esquecimento do que a pílula diária",
      "Excelente controlo do ciclo menstrual"
    ],
    cons: [
      "NÃO protege contra ISTs",
      "Geralmente não é gratuito no SNS (comparticipado em farmácia)",
      "Requer habituação à auto-colocação"
    ],
    howToUse: "Introduzido na vagina como um tampão. Fica 3 semanas consecutivas. Retira-se no mesmo dia da semana, faz-se 7 dias de pausa (onde ocorre a menstruação) e insere-se um novo anel.",
    snsNotes: "Disponível em farmácias com receita médica."
  },
  {
    id: "adesivo-transdermico",
    name: "Adesivo Contracetivo Transdérmico",
    category: "hormonal",
    categoryLabel: "Método Hormonal Combinado",
    icon: "🩹",
    typicalEfficacy: 93,
    perfectEfficacy: 99.7,
    protectsSTIs: false,
    requiresPrescription: true,
    freeInSNS: false,
    duration: "Mudança semanal (3 semanas + 1 semana de pausa)",
    howItWorks: "Pequeno adesivo colado na pele limpa e seca (nádegas, abdómen, braço ou tronco) que liberta hormonas diretamente para a corrente sanguínea.",
    pros: [
      "Mudança semanal em vez de diária",
      "Não perde eficácia em caso de vómitos ou diarreia",
      "Fácil aplicação e visualização"
    ],
    cons: [
      "NÃO protege contra ISTs",
      "Pode descolar se houver fricção excessiva",
      "Pode causar irritação cutânea local em peles sensíveis"
    ],
    howToUse: "Colar 1 adesivo novo por semana durante 3 semanas consecutivas. Fazer 1 semana de intervalo sem adesivo.",
    snsNotes: "Vendido em farmácia sob prescrição médica."
  },
  {
    id: "contracecao-emergencia",
    name: "Pílula do Dia Seguinte (Contraceção de Emergência)",
    category: "emergencia",
    categoryLabel: "Método de Emergência (Não Regular)",
    icon: "⚡",
    typicalEfficacy: 85,
    perfectEfficacy: 95,
    protectsSTIs: false,
    requiresPrescription: false,
    freeInSNS: true,
    duration: "Uso pontual de emergência",
    howItWorks: "Dose hormonal concentrada (Levonorgestrel até 72h ou Acetato de Ulipristal até 120h) que adia ou inibe a ovulação caso esta ainda não tenha ocorrido.",
    pros: [
      "Permite evitar uma gravidez não planeada após falha de método (ex: preservativo roto/esquecimento da pílula)",
      "Acesso livre sem receita obrigatória em Portugal",
      "Gratuita nos Centros de Saúde e Serviços de Urgência"
    ],
    cons: [
      "NÃO protege contra ISTs",
      "NÃO é um método regular (tem menor eficácia que métodos habituais)",
      "Quanto mais tarde for tomada, menor é a eficácia",
      "Pode provocar náuseas, cefaleias ou alteração temporária da data da menstruação"
    ],
    howToUse: "Tomar o mais depressa possível após a relação de risco (idealmente nas primeiras 12 a 24 horas). Se ocorrer vómito nas primeiras 3 horas, deve repetir-se a toma.",
    snsNotes: "Fornecida gratuitamente e sem burocracia nos Centros de Saúde / USF e Urgências Hospitalares em Portugal, ou comprada diretamente em farmácias."
  }
];
