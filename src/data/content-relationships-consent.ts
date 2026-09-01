export interface FlagItem {
  id: string;
  type: "green" | "yellow" | "red";
  title: string;
  category: "comunicacao" | "limites" | "digital" | "intimidade" | "amigos";
  description: string;
  example: string;
  advice: string;
}

export interface ConsentPrinciple {
  letter: string;
  word: string;
  translation: string;
  explanation: string;
  practicalExample: string;
  mythVsFact: {
    myth: string;
    fact: string;
  };
}

export interface CommunicationScript {
  id: string;
  scenario: string;
  category: "limites" | "contracepcao" | "digital" | "desconforto";
  whatToSay: string;
  whyItWorks: string;
}

export const CONSENT_FRIES: ConsentPrinciple[] = [
  {
    letter: "F",
    word: "Freely Given",
    translation: "Livremente Concedido",
    explanation: "Uma decisão tomada sem pressão, medo, chantagem emocional, manipulação ou efeito de substâncias (álcool/drogas).",
    practicalExample: "Dizer 'sim' porque realmente se quer, e não para 'evitar uma discussão' ou por cansaço de insistências.",
    mythVsFact: {
      myth: "Se alguém não disse 'não', significa que consente.",
      fact: "A ausência de um 'não' ou o silêncio NÃO é consentimento. O consentimento requer entusiasmo mútuo e clareza.",
    },
  },
  {
    letter: "R",
    word: "Reversible",
    translation: "Reversível a Qualquer Momento",
    explanation: "Podes mudar de ideias a qualquer segundo — antes, no início ou durante qualquer ato íntimo. Parar é um direito absoluto.",
    practicalExample: "Estar a beijar alguém e decidir que não queres avançar mais. A outra pessoa deve parar imediatamente e com respeito.",
    mythVsFact: {
      myth: "Se começámos, temos de terminar.",
      fact: "Ninguém 'deve' sexo ou intimidade a ninguém. Consentir num momento não obriga a continuar no minuto seguinte.",
    },
  },
  {
    letter: "I",
    word: "Informed",
    translation: "Informado",
    explanation: "Ambas as pessoas sabem exatamente o que vai acontecer e concordam com os detalhes (por exemplo, uso de preservativo, métodos de proteção, limites).",
    practicalExample: "Retirar o preservativo durante a relação sem o consentimento da outra pessoa ('stealthing') é uma violação grave e crime.",
    mythVsFact: {
      myth: "O preservativo não precisa de ser combinado com antecedência.",
      fact: "O acordo sobre contraceção e proteção contra ISTs faz parte essencial do consentimento informado.",
    },
  },
  {
    letter: "E",
    word: "Enthusiastic",
    translation: "Entusiasmado & Mútuo",
    explanation: "O sexo e a intimidade devem ser algo que ambas as partes desejam com vontade real, e não algo que se 'tolera' ou se faz 'por obrigação'.",
    practicalExample: "Se a outra pessoa parece hesitante, tensa ou distante, deves parar e perguntar: 'Está tudo bem? Queres continuar?'.",
    mythVsFact: {
      myth: "A insistência até a outra pessoa ceder faz parte do jogo da sedução.",
      fact: "Insistir repetidamente até vencer pelo cansaço é coerção, não consentimento.",
    },
  },
  {
    letter: "S",
    word: "Specific",
    translation: "Específico",
    explanation: "Consentir num determinado ato (ex: dar as mãos ou beijar) não significa consentir noutros atos, nem consentir hoje significa consentir amanhã.",
    practicalExample: "Enviar uma fotografia íntima (nude) a alguém não autoriza essa pessoa a partilhá-la com terceiros, nem dá direito a contactos físicos.",
    mythVsFact: {
      myth: "Num relacionamento ou casamento, o consentimento está sempre implícito.",
      fact: "O estatuto de casal ou namoro não anula a necessidade de consentimento em cada momento.",
    },
  },
];

export const RELATIONSHIP_FLAGS: FlagItem[] = [
  {
    id: "g1",
    type: "green",
    title: "Respeito pelos teus 'Nãos' e Limites",
    category: "limites",
    description: "Quando dizes que não queres fazer algo, a pessoa aceita com calma e carinho, sem fazer birras, chantagem ou culpabilização.",
    example: "'Sem problema nenhum! Fazemos outra coisa qualquer que nos apeteça aos dois.'",
    advice: "Este é o pilar fundamental de qualquer relação saudável.",
  },
  {
    id: "g2",
    type: "green",
    title: "Apoio à tua Individualidade e Amigos",
    category: "amigos",
    description: "Incentiva-te a passar tempo com os teus amigos, família, passatempos e projetos pessoais sem ciúmes tóxicos.",
    example: "'Diverte-te imenso no jantar com as tuas amigas! Depois conta-me como correu.'",
    advice: "Numa relação saudável, somam-se vidas, não se anulam identidades.",
  },
  {
    id: "g3",
    type: "green",
    title: "Comunicação Aberta e Sem Medo",
    category: "comunicacao",
    description: "Podes expressar dúvidas, desconfortos ou opiniões diferentes sem receio de reações agressivas ou de 'castigos do silêncio'.",
    example: "Conseguem conversar sobre sentimentos difíceis com empatia e escuta ativa.",
    advice: "Resolver conflitos com diálogo e respeito fortalece a intimidade.",
  },
  {
    id: "y1",
    type: "yellow",
    title: "Insistência Leve após Recusa",
    category: "limites",
    description: "A pessoa não reage com agressividade explícita, mas faz beicinho, comentários tristes ou tenta convencer-te repetidamente a ceder.",
    example: "'Tens a certeza? Mas eu queria tanto... se gostasses mesmo de mim fazias isto.'",
    advice: "Sinal de atenção. Conversa claramente sobre como essa chantagem te faz sentir desconfortável. Se continuar, torna-se um sinal vermelho.",
  },
  {
    id: "y2",
    type: "yellow",
    title: "Expectativa de Resposta Imediata em Mensagens",
    category: "digital",
    description: "Fica ansioso/a ou envia pontos de interrogação se demoras mais de alguns minutos a responder no WhatsApp/Instagram.",
    example: "'Viste a mensagem há 10 minutos e não respondes? Estás a falar com quem?'",
    advice: "Define limites saudáveis de tempo de ecrã e privacidade digital desde o início.",
  },
  {
    id: "r1",
    type: "red",
    title: "Controlo Digital e Pedido de Passes",
    category: "digital",
    description: "Exige ver as tuas mensagens, saber a password do teu telemóvel, ou pede que desinstales redes sociais ou cortes amizades.",
    example: "'Se não tens nada a esconder, dá-me a tua password do telemóvel.'",
    advice: "Privacidade não é segredo. Em Portugal e na lei, a violação de correspondência e invasão digital são proibidas e constituem abuso.",
  },
  {
    id: "r2",
    type: "red",
    title: "Partilha ou Ameaça com Fotografias Íntimas (Nudes)",
    category: "digital",
    description: "Ameaçar partilhar ou partilhar fotos/vídeos íntimos sem autorização expressa.",
    example: "'Se acabares comigo, envio estas fotos para o teu grupo de amigos ou escola.'",
    advice: "CRIME PÚBLICO em Portugal (Art. 199.º do Código Penal). Contacta de imediato a APAV (116 006), a Linha SOS Criança (116 111) ou as autoridades (PJ / PSP / GNR).",
  },
  {
    id: "r3",
    type: "red",
    title: "Isolamento Social Forçado",
    category: "amigos",
    description: "Critica constantemente todos os teus amigos e familiares para que passes a depender exclusivamente da relação.",
    example: "'Os teus amigos não prestam e só te querem afastar de mim; escolhe entre eles ou eu.'",
    advice: "O isolamento é uma das principais táticas de relacionamentos abusivos. Procura apoio junto de pessoas de confiança ou linhas de apoio.",
  },
  {
    id: "r4",
    type: "red",
    title: "Violência Física, Verbal, Psicológica ou Sexual",
    category: "intimidade",
    description: "Qualquer agressão, insulto, humilhação pública, destruição de objetos pessoais ou coerção sexual.",
    example: "Agarrar com força, empurrar, gritar insultos, forçar toques indesejados.",
    advice: "Procura ajuda urgente e segura. Liga para a APAV (116 006) ou 112 se estiveres em perigo imediato.",
  },
];

export const COMMUNICATION_SCRIPTS: CommunicationScript[] = [
  {
    id: "cs1",
    scenario: "Propor o uso de preservativo sem vergonha",
    category: "contracepcao",
    whatToSay: "'Adoro estar contigo e quero muito que nos divirtamos ao máximo, por isso a minha regra é usarmos sempre preservativo. Tenho aqui comigo, queres colocar tu ou coloco eu?'",
    whyItWorks: "Normaliza o preservativo como uma parte natural, responsável e sensual da intimidade, sem espaço para hesitações.",
  },
  {
    id: "cs2",
    scenario: "Colocar um travão quando o ritmo está rápido demais",
    category: "limites",
    whatToSay: "'Gosto muito de estar aqui contigo, mas hoje quero ficar apenas pelos beijos/abraços. Vamos com calma no nosso próprio ritmo, está bem?'",
    whyItWorks: "Reafirma o afeto ao mesmo tempo que estabelece uma fronteira clara e intransigente sobre o teu conforto físico.",
  },
  {
    id: "cs3",
    scenario: "Recusar o envio de fotografias íntimas (nudes)",
    category: "digital",
    whatToSay: "'Gosto muito de ti, mas não me sinto confortável a tirar nem a enviar fotografias íntimas. Prefiro que desfrutemos quando estivermos juntos pessoalmente.'",
    whyItWorks: "Deixa claro que a recusa não é falta de carinho, mas sim um limite pessoal e inviolável de segurança digital.",
  },
  {
    id: "cs4",
    scenario: "Falar sobre fazer rastreio de ISTs em conjunto",
    category: "contracepcao",
    whatToSay: "'Que tal aproveitarmos esta semana para irmos ambos fazer um rastreio de rotina de ISTs ao Centro de Saúde? É gratuito, rápido e deixa-nos a ambos 100% tranquilos.'",
    whyItWorks: "Transforma o rastreio num ato conjunto de cuidado mútuo e maturidade, eliminando o estigma.",
  },
];
