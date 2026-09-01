export interface GlossaryTerm {
  id: string;
  term: string;
  category: "anatomia" | "saude" | "identidade" | "direitos" | "relacoes";
  categoryLabel: string;
  definition: string;
  detailedContext: string;
  tags: string[];
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    id: "consentimento",
    term: "Consentimento",
    category: "relacoes",
    categoryLabel: "Relações & Consentimento",
    definition: "Acordo mútuo, explícito, livre, consciente e revogável a qualquer momento entre todas as pessoas envolvidas num ato íntimo ou sexual.",
    detailedContext: "Não há consentimento sob coação, chantagem, medo ou se alguém estiver sob o efeito de substâncias que impeçam a tomada de decisão lúcida. A ausência de um 'não' não significa 'sim'.",
    tags: ["limites", "respeito", "lei", "autonomia"]
  },
  {
    id: "prep",
    term: "PrEP (Profilaxia Pré-Exposição)",
    category: "saude",
    categoryLabel: "Saúde & Prevenção",
    definition: "Toma de medicação antirretroviral antes de uma possível exposição ao VIH, reduzindo o risco de infeção por via sexual em mais de 99%.",
    detailedContext: "Disponível gratuitamente em consultas de especialidade nos hospitais do SNS em Portugal. Destina-se a pessoas com vida sexual ativa com maior probabilidade de exposição ao vírus.",
    tags: ["vih", "ists", "sns", "medicamento"]
  },
  {
    id: "pep",
    term: "PEP (Profilaxia Pós-Exposição)",
    category: "saude",
    categoryLabel: "Saúde & Prevenção",
    definition: "Tratamento de emergência com antirretrovirais iniciado até 72 horas após uma potencial exposição ao VIH (ex: preservativo rasgado ou agressão sexual).",
    detailedContext: "Dura 28 dias e deve ser iniciado o mais rápido possível nas urgências hospitalares do SNS, onde é fornecido gratuitamente.",
    tags: ["vih", "emergencia", "urgencias", "72h"]
  },
  {
    id: "dupla-protecao",
    term: "Dupla Proteção",
    category: "saude",
    categoryLabel: "Saúde & Prevenção",
    definition: "A estratégia combinada de usar preservativo (para evitar ISTs) juntamente com outro método de alta eficácia (pílula, implante, DIU) para prevenção de gravidez não planeada.",
    detailedContext: "É o padrão de ouro recomendado pelas autoridades de saúde como a DGS e OMS para pessoas com vida sexual ativa.",
    tags: ["contracecao", "preservativo", "saude"]
  },
  {
    id: "clitoris",
    term: "Clitóris",
    category: "anatomia",
    categoryLabel: "Anatomia & Corpo",
    definition: "Órgão genital da anatomia feminina cuja única função biológica conhecida é proporcionar prazer e estimulação sexual.",
    detailedContext: "Possui uma pequena glande visível na parte superior da vulva e uma vasta estrutura interna com mais de 8.000 terminações nervosas sensíveis que se estende ao redor da vagina.",
    tags: ["vulva", "prazer", "anatomia"]
  },
  {
    id: "hpv",
    term: "HPV (Papilomavírus Humano)",
    category: "saude",
    categoryLabel: "Saúde & Prevenção",
    definition: "Grupo de mais de 200 vírus transmitidos por contacto pele com pele nas áreas genitais, alguns dos quais podem causar verrugas ou lesões oncológicas.",
    detailedContext: "A vacina nonavalente incluída no Programa Nacional de Vacinação (PNV) em Portugal protege contra as estirpes oncogénicas mais graves. O rastreio regular (citologia/Papanicolau) é fundamental.",
    tags: ["vacina", "cancro", "colo do utero", "pnv"]
  },
  {
    id: "janela-imunologica",
    term: "Janela Imunológica",
    category: "saude",
    categoryLabel: "Saúde & Prevenção",
    definition: "O intervalo de tempo entre o momento do contágio por uma infeção (como o VIH ou Hepatite) e a produção de anticorpos detetáveis num teste laboratorial.",
    detailedContext: "Para os testes rápidos de 4ª geração de VIH, a janela é habitualmente de 4 semanas. Durante a janela, o teste pode dar um falso negativo mesmo que o vírus esteja presente.",
    tags: ["testes", "rastreio", "laboratorio", "vih"]
  },
  {
    id: "identidade-genero",
    term: "Identidade de Género",
    category: "identidade",
    categoryLabel: "Identidade & Género",
    definition: "A vivência interna, individual e sentida do género de cada pessoa, que pode ou não corresponder ao sexo atribuído à nascença.",
    detailedContext: "Inclui pessoas cisgénero, transgénero, não-binárias, entre outras expressões. Não deve ser confundida com a orientação sexual.",
    tags: ["trans", "cis", "nao-binario", "diversidade"]
  },
  {
    id: "orientacao-sexual",
    term: "Orientação Sexual",
    category: "identidade",
    categoryLabel: "Identidade & Género",
    definition: "A atração afetiva, romântica e/ou sexual duradoura que uma pessoa sente por outras pessoas (heterossexualidade, homossexualidade, bissexualidade, assexualidade, pansexualidade, etc.).",
    detailedContext: "É uma componente natural da personalidade humana e não uma escolha ou preferência passível de alteração forçada.",
    tags: ["lgbtqi+", "afeto", "atração"]
  },
  {
    id: "ovulacao",
    term: "Ovulação",
    category: "anatomia",
    categoryLabel: "Anatomia & Corpo",
    definition: "O processo biológico em que um ovócito maduro é libertado por um dos ovários para a trompa de Falópio, onde pode ser fecundado.",
    detailedContext: "Ocorre geralmente a meio do ciclo menstrual (por volta do 14º dia num ciclo típico de 28 dias). O óvulo tem uma sobrevida média de 12 a 24 horas.",
    tags: ["ciclo", "fertilidade", "trompas", "ovarios"]
  },
  {
    id: "endometrio",
    term: "Endométrio",
    category: "anatomia",
    categoryLabel: "Anatomia & Corpo",
    definition: "O tecido que reveste o interior da parede do útero, cuja espessura varia durante o ciclo sob influência hormonal e que é expelido durante a menstruação se não houver gravidez.",
    detailedContext: "A endometriose é uma condição médica onde células semelhantes às do endométrio crescem fora do útero, podendo provocar dores intensas.",
    tags: ["utero", "menstruacao", "endometriose"]
  },
  {
    id: "sigilo-medico",
    term: "Sigilo Médico & Confidencialidade",
    category: "direitos",
    categoryLabel: "Direitos & Legislação",
    definition: "Dever legal e deontológico que obriga médicos e enfermeiros a manter em estrita confidencialidade qualquer informação clínica ou conversa tida em consulta.",
    detailedContext: "Em Portugal, jovens a partir dos 14/16 anos podem comparecer a consultas de planeamento familiar sem os pais, e os profissionais de saúde estão legalmente vinculados ao sigilo.",
    tags: ["lei", "sns", "privacidade", "jovens"]
  },
  {
    id: "planeamento-familiar",
    term: "Consultas de Planeamento Familiar",
    category: "direitos",
    categoryLabel: "Direitos & Legislação",
    definition: "Serviço público e gratuito de saúde oferecido nos Centros de Saúde e USF em Portugal para aconselhamento reprodutivo, prescrição e fornecimento de contracetivos.",
    detailedContext: "Acesso universal a qualquer pessoa residente em Portugal, independentemente da nacionalidade, idade ou estado civil, sem cobrança de taxas moderadoras.",
    tags: ["sns", "gratis", "centro de saude", "apoio"]
  },
  {
    id: "diu",
    term: "DIU (Dispositivo Intrauterino)",
    category: "saude",
    categoryLabel: "Saúde & Prevenção",
    definition: "Pequeno dispositivo maleável em forma de T inserido no útero para prevenir a gravidez por períodos de 3 a 10 anos.",
    detailedContext: "Pode ser hormonal (liberta levonorgestrel) ou de cobre (não-hormonal). É um dos métodos reversíveis com maior taxa de sucesso no mundo.",
    tags: ["larc", "utero", "eficacia"]
  },
  {
    id: "esmegma",
    term: "Esmegma",
    category: "anatomia",
    categoryLabel: "Anatomia & Corpo",
    definition: "Substância natural e esbranquiçada composta por células mortas da pele e secreções sebáceas acumuladas sob o prepúcio ou entre os pequenos lábios.",
    detailedContext: "Não é uma doença nem uma infeção, mas a sua remoção com lavagem diária suave com água morna é essencial para manter a higiene e evitar odores ou inflamações.",
    tags: ["higiene", "prepucio", "vulva"]
  },
  {
    id: "sexting-consentimento",
    term: "Consentimento Digital & Sexting",
    category: "relacoes",
    categoryLabel: "Relações & Consentimento",
    definition: "A troca consciente e consensual de mensagens, fotos ou vídeos íntimos entre pessoas, com o compromisso absoluto de nunca partilhar com terceiros.",
    detailedContext: "A partilha não autorizada de imagens íntimas sem o consentimento da pessoa constitui um crime de devassa da vida privada previsto no Código Penal Português (Artigo 192º).",
    tags: ["segurança online", "nudes", "crime", "privacidade"]
  }
];
