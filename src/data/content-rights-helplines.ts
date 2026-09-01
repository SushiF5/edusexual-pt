export interface Helpline {
  id: string;
  name: string;
  entity: string;
  phone: string;
  rawPhone: string;
  hours: string;
  cost: "Gratuito" | "Custo de chamada local" | "Custo de chamada fixa nacional" | "Custo de chamada móvel nacional";
  isAnonymous: boolean;
  description: string;
  badge: string;
  whatsapp?: string;
  website?: string;
  audience: ("criancas" | "jovens" | "adultos")[];
}

export interface LegalRight {
  id: string;
  title: string;
  legalBasis: string;
  summary: string;
  practicalApplication: string;
  targetAudience: string;
}

export const helplinesData: Helpline[] = [
  {
    id: "sexualidade-em-linha",
    name: "Sexualidade em Linha (IPDJ / APF)",
    entity: "Instituto Português do Desporto e Juventude / Associação para o Planeamento da Família",
    phone: "808 222 003",
    rawPhone: "808222003",
    hours: "Segunda a Sexta: 11h às 19h | Sábado: 10h às 17h",
    cost: "Custo de chamada local",
    isAnonymous: true,
    description: "Linha nacional de referência para tirar todas as dúvidas sobre sexualidade, métodos contracetivos, infeções, relações, afetos e orientação sexual com psicólogos e profissionais treinados.",
    badge: "Referência Nacional",
    website: "https://ipdj.gov.pt/sexualidade-em-linha",
    audience: ["jovens", "adultos"]
  },
  {
    id: "sns24",
    name: "SNS 24 — Triagem e Saúde",
    entity: "Serviço Nacional de Saúde",
    phone: "808 24 24 24",
    rawPhone: "808242424",
    hours: "24 horas por dia, 365 dias por ano",
    cost: "Custo de chamada local",
    isAnonymous: false,
    description: "Linha oficial do Ministério da Saúde para aconselhamento clínico, triagem médica, encaminhamento para urgências ou centros de saúde, e apoio psicológico.",
    badge: "24 Horas",
    website: "https://www.sns24.gov.pt",
    audience: ["criancas", "jovens", "adultos"]
  },
  {
    id: "sos-crianca",
    name: "SOS Criança (IAC)",
    entity: "Instituto de Apoio à Criança",
    phone: "116 111",
    rawPhone: "116111",
    hours: "Segunda a Sexta: 9h às 19h",
    cost: "Gratuito",
    isAnonymous: true,
    description: "Linha de escuta, apoio psicológico e proteção para crianças e jovens até aos 18 anos sobre problemas na família, escola, medos, abusos ou dúvidas íntimas.",
    badge: "Grátis Crianças",
    website: "https://iacrianca.pt",
    audience: ["criancas", "jovens"]
  },
  {
    id: "apav",
    name: "Linha de Apoio à Vítima (APAV)",
    entity: "Associação Portuguesa de Apoio à Vítima",
    phone: "116 006",
    rawPhone: "116006",
    hours: "Dias úteis: 8h às 22h",
    cost: "Gratuito",
    isAnonymous: true,
    description: "Apoio emocional, psicológico e jurídico gratuito e confidencial para vítimas de violência no namoro, violência doméstica, abuso ou assédio sexual.",
    badge: "Apoio Confidencial",
    website: "https://apav.pt",
    audience: ["jovens", "adultos"]
  },
  {
    id: "linha-juventude",
    name: "Linha Juventude",
    entity: "IPDJ",
    phone: "800 208 020",
    rawPhone: "800208020",
    hours: "Dias úteis: 9h às 18h",
    cost: "Gratuito",
    isAnonymous: true,
    description: "Informação geral para jovens sobre programas, apoios sociais, saúde e direitos civis.",
    badge: "Chamada Gratuita",
    website: "https://ipdj.gov.pt",
    audience: ["jovens"]
  },
  {
    id: "rede-ex-aequo",
    name: "Linha e Apoio LGBTI+ (Rede ex aequo / ILGA)",
    entity: "Associação de Jovens LGBTI e Apoiantes",
    phone: "968 896 885",
    rawPhone: "968896885",
    hours: "Atendimento por marcação e apoio online",
    cost: "Custo de chamada móvel nacional",
    isAnonymous: true,
    description: "Espaço seguro de entreajuda para jovens lésbicas, gays, bissexuais, trans, intersexo e apoiantes com dúvidas sobre orientação sexual, identidade e 'sair do armário'.",
    badge: "Comunidade LGBTI+",
    website: "https://www.rea.pt",
    audience: ["jovens", "adultos"]
  },
  {
    id: "emergencia-112",
    name: "Número Nacional de Emergência",
    entity: "Proteção Civil e Emergência Médica (INEM / PSP / GNR)",
    phone: "112",
    rawPhone: "112",
    hours: "24/7 permanente",
    cost: "Gratuito",
    isAnonymous: false,
    description: "Para situações de perigo iminente de vida, agressões físicas em curso ou emergências médicas graves.",
    badge: "Emergência 112",
    audience: ["criancas", "jovens", "adultos"]
  }
];

export const legalRightsData: LegalRight[] = [
  {
    id: "direito-planeamento-familiar",
    title: "Acesso Gratuito e Universal ao Planeamento Familiar",
    legalBasis: "Lei n.º 3/84 e Despacho Regulamentar do SNS",
    summary: "Qualquer pessoa em Portugal tem direito a aceder a consultas de saúde reprodutiva e métodos contracetivos gratuitamente em qualquer Centro de Saúde ou Unidade de Saúde Familiar (USF).",
    practicalApplication: "Não precisas de pagar taxa moderadora nem de justificar o motivo. Podes solicitar preservativos, pílula ou outros métodos diretamente ao teu médico ou enfermeiro de família.",
    targetAudience: "Todos os cidadãos e residentes em Portugal"
  },
  {
    id: "autonomia-jovens",
    title: "Autonomia e Sigilo Médico para Jovens",
    legalBasis: "Código Deontológico da Ordem dos Médicos & Parecer do Conselho Nacional de Ética",
    summary: "Jovens com maturidade psicológica (geralmente a partir dos 14 anos) têm direito ao segredo médico e a frequentar consultas de saúde sexual e reprodutiva com total confidencialidade.",
    practicalApplication: "O profissional de saúde não pode contactar os pais ou encarregados de educação para revelar o conteúdo da consulta ou a prescrição de contracetivos sem o consentimento do jovem.",
    targetAudience: "Jovens e Adolescentes"
  },
  {
    id: "educacao-sexual-escolas",
    title: "Educação Sexual Obrigatória nas Escolas",
    legalBasis: "Lei n.º 60/2009 de 6 de Agosto",
    summary: "Garante a lecionação de conteúdos de educação para a saúde e sexualidade em todos os estabelecimentos do ensino básico e secundário público em Portugal.",
    practicalApplication: "Mínimo de 6 a 12 horas por ano letivo dedicadas à promoção da igualdade, prevenção de violência no namoro, anatomia, ISTs e relacionamentos saudáveis.",
    targetAudience: "Alunos do Ensino Básico e Secundário"
  },
  {
    id: "profilaxia-pos-exposicao-pep",
    title: "Direito à PEP e Testes Rápidos em Urgência",
    legalBasis: "Norma da Direção-Geral da Saúde (DGS)",
    summary: "Qualquer pessoa exposta a situação de risco de transmissão de VIH tem direito a receber Profilaxia Pós-Exposição (PEP) gratuitamente no serviço de urgência hospitalar num prazo até 72 horas.",
    practicalApplication: "Dirige-te à urgência hospitalar mais próxima o quanto antes após o acidente (ex: preservativo roto) e solicita avaliação médica para início imediato da PEP.",
    targetAudience: "População em Geral"
  },
  {
    id: "protecao-crime-partilha-fotos",
    title: "Proteção Legal Contra Divulgação Não-Autorizada de Imagens Íntimas",
    legalBasis: "Artigo 192.º e 193.º do Código Penal Português",
    summary: "A partilha, gravação ou difusão de fotografias ou vídeos de cariz íntimo ou sexual sem consentimento expresso da pessoa é crime punível com pena de prisão até 1 ou 5 anos.",
    practicalApplication: "Se fores vítima ou conheceres alguém que esteja a ser chantageado ou tenha fotos partilhadas, podes apresentar queixa na Polícia Judiciária, PSP, GNR ou junto da APAV.",
    targetAudience: "Jovens e Adultos"
  }
];
