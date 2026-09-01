export interface StiItem {
  id: string;
  name: string;
  type: "Bactéria" | "Vírus" | "Parasita" | "Fungo";
  transmission: string;
  symptoms: {
    common: string[];
    asymptomaticNote: string;
  };
  windowPeriodDays: {
    min: number;
    recommended: number;
    description: string;
  };
  treatment: string;
  prevention: string;
  snsCoverage: string;
  urgentNotice?: string;
}

export interface TestingCenter {
  id: string;
  name: string;
  region: "Norte" | "Centro" | "Lisboa e Vale do Tejo" | "Alentejo" | "Algarve" | "Ilhas";
  city: string;
  address: string;
  phone: string;
  features: string[];
  isAnonymous: boolean;
  isFree: boolean;
  website: string;
}

export const STIS_DATA: StiItem[] = [
  {
    id: "chlamydia",
    name: "Clamídia (Chlamydia trachomatis)",
    type: "Bactéria",
    transmission: "Relações sexuais desprotegidas (vaginais, anais, orais) e durante o parto.",
    symptoms: {
      common: [
        "Corrimento vaginal ou uretral invulgar ou com odor",
        "Ardor ou dor ao urinar",
        "Dor abdominal baixa ou nos testículos",
        "Sangramento fora da menstruação ou após a relação sexual",
      ],
      asymptomaticNote: "Mais de 70% das mulheres e 50% dos homens não apresentam quaisquer sintomas iniciais ('infeção silenciosa').",
    },
    windowPeriodDays: {
      min: 14,
      recommended: 21,
      description: "Teste de urina ou zaragatoa fiável cerca de 2 a 3 semanas após a exposição.",
    },
    treatment: "Tratamento antibiótico oral simples e muito eficaz prescrito pelo médico. Ambos os parceiros devem ser tratados simultaneamente.",
    prevention: "Uso correto e consistente do preservativo em todas as relações sexuais.",
    snsCoverage: "Rastreio e tratamento 100% gratuitos e confidenciais nos Centros de Saúde e CADs do SNS.",
  },
  {
    id: "gonorrhea",
    name: "Gonorreia / Blenorragia",
    type: "Bactéria",
    transmission: "Relações vaginais, anais ou orais desprotegidas.",
    symptoms: {
      common: [
        "Corrimento espesso, amarelado ou esverdeado da uretra/vagina",
        "Dor ou sensação de queimadura intensa ao urinar",
        "Dor de garganta persistente (gonorreia faríngea)",
        "Inflamação ou dor nos testículos",
      ],
      asymptomaticNote: "Frequentemente assintomática em mulheres e na garganta/reto.",
    },
    windowPeriodDays: {
      min: 7,
      recommended: 14,
      description: "Pode ser detetada a partir de 1 a 2 semanas após o contacto.",
    },
    treatment: "Antibiótico específico administrado por profissional de saúde. Não te automediques para evitar resistências bacterianas.",
    prevention: "Preservativo em todas as práticas sexuais e barreiras de látex para sexo oral.",
    snsCoverage: "Diagnóstico e tratamento totalmente cobertos pelo SNS.",
  },
  {
    id: "hiv",
    name: "VIH (Vírus da Imunodeficiência Humana)",
    type: "Vírus",
    transmission: "Fluidos corporais (sangue, sémen, fluidos vaginais/anais e leite materno) através de sexo desprotegido ou partilha de seringas.",
    symptoms: {
      common: [
        "Fase aguda (2 a 4 semanas após infeção): febre, gânglios inflamados, cansaço e erupção cutânea tipo gripe",
        "Fase de latência: sem sintomas durante anos enquanto o vírus enfraquece o sistema imunitário se não for tratado",
      ],
      asymptomaticNote: "Uma pessoa seropositiva em tratamento antirretroviral com carga viral indetetável NÃO transmite o vírus (I=I: Indetetável = Intransmissível).",
    },
    windowPeriodDays: {
      min: 30,
      recommended: 90,
      description: "Testes rápidos de 4ª geração detetam anticorpos e antigénio p24 a partir de 4 a 6 semanas (com confirmação aos 90 dias para 100% de certeza).",
    },
    treatment: "Terapia Antirretroviral (TARV) diária de elevada eficácia. Permite uma vida longa, saudável e sem transmissão.",
    prevention: "Preservativo, PrEP (Profilaxia Pré-Exposição diária gratuita no SNS) e PEP (Profilaxia Pós-Exposição até 72h após risco).",
    snsCoverage: "Testes rápidos anónimos e gratuitos em todo o país; tratamento integral e gratuito no SNS.",
    urgentNotice: "Tiveste uma exposição de risco nas últimas 72 horas? Dirige-te de imediato a uma Urgência Hospitalar ou CAD para iniciar a PEP (Profilaxia Pós-Exposição)!",
  },
  {
    id: "hpv",
    name: "HPV (Vírus do Papiloma Humano)",
    type: "Vírus",
    transmission: "Contacto direto pele-com-pele ou mucosa-com-mucosa na região genital/anal durante a atividade sexual.",
    symptoms: {
      common: [
        "Verrugas genitais (condilomas) de textura tipo couve-flor na pele ou mucosas",
        "Tipos de alto risco oncológico geralmente não causam verrugas visíveis, mas podem provocar alterações no colo do útero, ânus ou orofaringe",
      ],
      asymptomaticNote: "Cerca de 80% das pessoas sexualmente ativas contactam com o HPV ao longo da vida, e o sistema imunitário elimina a maioria naturalmente.",
    },
    windowPeriodDays: {
      min: 30,
      recommended: 90,
      description: "As lesões/verrugas podem surgir semanas a meses após a exposição. Rastreio por citologia/teste HPV em consultas ginecológicas.",
    },
    treatment: "Tratamento tópico ou remoção médica de verrugas. Monitorização de lesões pré-cancerosas.",
    prevention: "Vacina Nonavalente do HPV (incluída no Programa Nacional de Vacinação em Portugal para raparigas e rapazes aos 10 anos) e preservativo.",
    snsCoverage: "Vacinação gratuita no PNV; rastreio de cancro do colo do útero gratuito nos Cuidados de Saúde Primários.",
  },
  {
    id: "syphilis",
    name: "Sífilis (Treponema pallidum)",
    type: "Bactéria",
    transmission: "Contacto direto com ferida de sífilis (cancro duro) durante sexo desprotegido vaginal, anal ou oral.",
    symptoms: {
      common: [
        "Fase primária: Pequena ferida ou úlcera indolor (cancro duro) nos genitais, ânus, boca ou lábios que cicatriza sozinha",
        "Fase secundária: Manchas avermelhadas nas palmas das mãos e plantas dos pés, febre, mal-estar",
      ],
      asymptomaticNote: "Mesmo que a ferida desapareça, a bactéria continua no organismo se não for tratada, progredindo para fases graves.",
    },
    windowPeriodDays: {
      min: 21,
      recommended: 45,
      description: "Teste de sangue / teste rápido fiável a partir de 3 a 6 semanas após a infeção.",
    },
    treatment: "Injeções de Penicilina benzatínica com 100% de eficácia curativa quando diagnosticada precocemente.",
    prevention: "Uso de preservativo e rastreios sexuais regulares.",
    snsCoverage: "Diagnóstico e cura integralmente assegurados pelo SNS.",
  },
  {
    id: "hsv",
    name: "Herpes Genital (HSV-1 / HSV-2)",
    type: "Vírus",
    transmission: "Contacto com pele/mucosas infectadas durante relações sexuais ou sexo oral (mesmo sem feridas ativas visíveis).",
    symptoms: {
      common: [
        "Pequenas bolhas dolorosas que se rompem formando crostas na área genital, nádegas ou boca",
        "Comichão, ardor, formigueiro e sensação de queimadura antes do aparecimento das lesões",
      ],
      asymptomaticNote: "O vírus permanece no corpo em estado latente nos gânglios nervosos, podendo ter reativações periódicas.",
    },
    windowPeriodDays: {
      min: 14,
      recommended: 30,
      description: "Diagnóstico geralmente clínico através de observação médica direta das lesões ou teste de zaragatoa durante surto ativo.",
    },
    treatment: "Medicamentos antivirais orais que encurtam a duração do surto, aliviam a dor e reduzem a probabilidade de contágio.",
    prevention: "Evitar relações sexuais durante surtos visíveis; uso regular de preservativo e antivirais diários para casos frequentes.",
    snsCoverage: "Acompanhamento médico no Centro de Saúde e prescrição comparticipada de antivirais.",
  },
];

export const TESTING_CENTRES_PORTUGAL: TestingCenter[] = [
  {
    id: "cads-nacional",
    name: "Rede CAD — Centros de Aconselhamento e Deteção Precoce (SNS)",
    region: "Lisboa e Vale do Tejo",
    city: "Nacional (Lisboa, Porto, Coimbra, Faro, Évora, Funchal, Ponta Delgada)",
    address: "Instalados nos Centros de Saúde e Hospitais de todas as capitais de distrito",
    phone: "808 24 24 24 (SNS 24 para encaminhamento local)",
    features: ["Rastreio VIH, Hepatites B/C e Sífilis", "Testes Rápidos", "Aconselhamento Pré e Pós-teste", "Encaminhamento hospitalar"],
    isAnonymous: true,
    isFree: true,
    website: "https://www.dgs.pt",
  },
  {
    id: "checkpoint-lx",
    name: "CheckpointLX (GAT Portugal)",
    region: "Lisboa e Vale do Tejo",
    city: "Lisboa",
    address: "Travessa do Monte do Carmo, 2, 1200-277 Lisboa",
    phone: "+351 913 045 440",
    features: ["Testes Rápidos VIH, Sífilis, VHB, VHC", "Rastreio Clamídia e Gonorreia", "Consulta de Enfermagem", "Acesso a PrEP"],
    isAnonymous: true,
    isFree: true,
    website: "https://checkpointlx.gatportugal.org",
  },
  {
    id: "apf-norte",
    name: "APF Norte — Centro de Atendimento a Jovens",
    region: "Norte",
    city: "Porto",
    address: "Rua de Cedofeita, 411, 4050-181 Porto",
    phone: "+351 222 085 864",
    features: ["Consultas de Planeamento Familiar", "Rastreios IST", "Aconselhamento Psicológico Jovem", "Distribuição de preservativos"],
    isAnonymous: true,
    isFree: true,
    website: "https://apf.pt",
  },
  {
    id: "gat-in-mouraria",
    name: "GAT IN Mouraria",
    region: "Lisboa e Vale do Tejo",
    city: "Lisboa",
    address: "Largo das Olarias, 41, 1100-377 Lisboa",
    phone: "+351 218 873 008",
    features: ["Espaço de Saúde Comunitária", "Rastreios Rápidos", "Distribuição de Material Preventivo", "Apoio Multilingue"],
    isAnonymous: true,
    isFree: true,
    website: "https://gatportugal.org",
  },
  {
    id: "mapa-algarve",
    name: "APF Algarve / Centro de Rastreio Comunitário",
    region: "Algarve",
    city: "Faro",
    address: "Rua José de Matos, 36, 8000-502 Faro",
    phone: "+351 289 804 488",
    features: ["Rastreios Rápidos", "Aconselhamento Confidencial", "Apoio à Juventude"],
    isAnonymous: true,
    isFree: true,
    website: "https://apf.pt",
  },
];
