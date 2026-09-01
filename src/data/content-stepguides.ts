export interface StepItem {
  number: number;
  title: string;
  instruction: string;
  tip?: string;
  warning?: string;
  icon: string;
}

export interface StepGuide {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  badge: string;
  estimatedTime: string;
  steps: StepItem[];
  commonMistakes: string[];
}

export const stepGuidesData: StepGuide[] = [
  {
    id: "preservativo-externo-passos",
    title: "Como Colocar o Preservativo Externo Corretamente",
    subtitle: "8 passos essenciais para garantir 98% de proteção contra gravidez e ISTs.",
    icon: "🛡️",
    badge: "Essencial",
    estimatedTime: "1 minuto",
    steps: [
      {
        number: 1,
        title: "Verificar a Validade e Embalagem",
        instruction: "Confirma a data de validade na embalagem e procura pelo selo de qualidade CE ou ISO. Certifica-te de que a bolsa tem ar no interior (efeito almofada) e não está furada.",
        tip: "Nunca guardes preservativos soltos na carteira ou no porta-luvas do carro (o calor e a fricção degradam o látex).",
        icon: "📅"
      },
      {
        number: 2,
        title: "Abrir a Embalagem com Cuidado",
        instruction: "Empurra o preservativo para o lado oposto e rasga a embalagem pela ranhura serrilhada usando apenas os dedos.",
        warning: "NUNCA uses dentes, tesouras, unhas compridas ou objetos afiados para abrir.",
        icon: "✂️"
      },
      {
        number: 3,
        title: "Verificar a Posição do Rolo",
        instruction: "O preservativo deve parecer um 'pequeno chapéu mexicano' com o bordo enrolado virado para fora. Se parecer uma 'tigela' com o bordo para dentro, está do avesso.",
        tip: "Se o colocares na posição errada e ele tocar no pénis, deita-o fora e usa um novo.",
        icon: "🎩"
      },
      {
        number: 4,
        title: "Apertar o Depósito (Ponta)",
        instruction: "Com as pontas dos dedos indicador e polegar, aperta o reservatório na ponta do preservativo para expulsar todo o ar.",
        warning: "O ar retido na ponta pode fazer o preservativo rebentar com a pressão durante a relação.",
        icon: "🤏"
      },
      {
        number: 5,
        title: "Desenrolar até à Base do Pénis Ereto",
        instruction: "Mantendo o depósito apertado, encosta o preservativo no topo da glande e desenrola suavemente a toda a extensão até à base do pénis ereto.",
        tip: "Se houver prepúcio, puxa-o suavemente para trás antes de desenrolar.",
        icon: "⬇️"
      },
      {
        number: 6,
        title: "Usar Lubrificante Adequado (Opcional mas Recomendado)",
        instruction: "Aplica lubrificante à base de água ou silicone no exterior do preservativo para reduzir o atrito e aumentar o conforto e o prazer.",
        warning: "NUNCA uses óleos corporais, vaselina, manteiga ou cremes hidratantes, pois destroem o látex em segundos.",
        icon: "💧"
      },
      {
        number: 7,
        title: "Retirar Logo Após a Ejaculação",
        instruction: "Logo após a ejaculação e antes que o pénis perca a ereção, segura firmemente no anel de látex na base do pénis e retira-te da outra pessoa.",
        tip: "Isto impede que o preservativo escorregue ou que haja derrame de sémen.",
        icon: "✋"
      },
      {
        number: 8,
        title: "Dar um Nó e Deitar no Lixo",
        instruction: "Dá um nó no preservativo e deita-o no caixote do lixo comum enrolado num lenço de papel.",
        warning: "Nunca deites preservativos na sanita, pois entopem os esgotos e poluem o meio ambiente.",
        icon: "🗑️"
      }
    ],
    commonMistakes: [
      "Desenrolar o preservativo antes de colocá-lo no pénis.",
      "Esquecer de apertar o reservatório para retirar o ar.",
      "Colocar o preservativo apenas a meio da relação (o líquido pré-ejaculatório transmite ISTs e pode ter espermatozoides).",
      "Usar lubrificantes gordurosos (óleo de bebé, azeite, loções)."
    ]
  },
  {
    id: "pilula-dia-seguinte-passos",
    title: "Guia de Uso da Contraceção de Emergência",
    subtitle: "O que fazer passo a passo após uma relação sexual de risco ou falha de método.",
    icon: "⚡",
    badge: "Urgência",
    estimatedTime: "2 minutos",
    steps: [
      {
        number: 1,
        title: "Avaliar a Situação de Risco",
        instruction: "Recomendada se o preservativo rasgou, escorregou, se houve esquecimento da pílula habitual por mais de 12h/24h ou relação desprotegida.",
        tip: "A pílula de emergência destina-se a imprevistos pontuais e não deve substituir um método regular.",
        icon: "🔍"
      },
      {
        number: 2,
        title: "Identificar o Tipo de Pílula e Prazo",
        instruction: "Existem dois tipos principais em Portugal: Levonorgestrel (eficaz até 72 horas / 3 dias) e Acetato de Ulipristal (eficaz até 120 horas / 5 dias).",
        tip: "Quanto mais cedo for tomada (idealmente nas primeiras 12 a 24 horas), maior é a eficácia.",
        icon: "⏱️"
      },
      {
        number: 3,
        title: "Obter a Pílula Gratuitamente ou na Farmácia",
        instruction: "Podes obtê-la gratuitamente e sem marcação em qualquer Centro de Saúde / USF ou Serviço de Urgência em Portugal, ou comprá-la em qualquer farmácia sem receita.",
        tip: "Não é necessária autorização parental para jovens.",
        icon: "🏥"
      },
      {
        number: 4,
        title: "Tomar o Comprimido com Água",
        instruction: "Engole o comprimido único com um copo de água.",
        warning: "Se vomitares nas 3 horas seguintes à toma, deves tomar outro comprimido imediatamente pois o organismo pode não tê-lo absorvido.",
        icon: "🥛"
      },
      {
        number: 5,
        title: "Continuar a Usar Preservativo até à Próxima Menstruação",
        instruction: "A pílula do dia seguinte não protege relações sexuais que ocorram nos dias posteriores. Mantém o uso rigoroso de preservativo.",
        tip: "A tua próxima menstruação pode adiantar ou atrasar alguns dias.",
        icon: "🛡️"
      },
      {
        number: 6,
        title: "Fazer Teste de Gravidez se Houver Atraso Superior a 7 Dias",
        instruction: "Se a menstruação atrasar mais de uma semana ou for anormalmente reduzida, faz um teste de gravidez de urina para confirmação.",
        icon: "🧪"
      }
    ],
    commonMistakes: [
      "Esperar até ao último dia do prazo (a eficácia cai a cada hora que passa).",
      "Achar que substitui o método contracetivo diário.",
      "Acreditar que protege contra Infeções Sexualmente Transmissíveis."
    ]
  },
  {
    id: "autoexame-sinais-alerta",
    title: "Guia de Autoexame e Sinais de Alerta Genital",
    subtitle: "Como conhecer o teu corpo e reconhecer sinais que merecem observação médica.",
    icon: "🩺",
    badge: "Saúde Preventiva",
    estimatedTime: "3 minutos",
    steps: [
      {
        number: 1,
        title: "Observação Visual da Pele e Mucosas",
        instruction: "Com boa iluminação (e se necessário com o auxílio de um pequeno espelho), observa a região genital externa (vulva, pénis, testículos, virilhas e ânus).",
        tip: "Conhecer a tua aparência habitual ajuda a identificar rapidamente qualquer alteração.",
        icon: "🪞"
      },
      {
        number: 2,
        title: "Palpação Suave dos Testículos (Anatomia Masculina)",
        instruction: "Durante ou após um banho morno (quando o escroto está relaxado), desliza cada testículo suavemente entre o polegar e os restantes dedos.",
        warning: "Atenção a nódulos duros e indolores, inchaço súbito ou sensação de peso invulgar.",
        icon: "🥚"
      },
      {
        number: 3,
        title: "Atenção a Feridas, Úlceras ou Verrugas",
        instruction: "Verifica se existem pequenas feridas abertas, bolhas com líquido, saliências semelhantes a verrugas ou manchas avermelhadas.",
        tip: "Mesmo que uma ferida genital não cause dor (típico da sífilis primária), exige sempre ida ao médico.",
        icon: "🔎"
      },
      {
        number: 4,
        title: "Monitorizar Corrimentos e Odores Anormais",
        instruction: "Observa corrimentos com cor amarelada/esverdeada, consistência tipo queijo fresco, odor forte ou associados a ardor e comichão intensa.",
        icon: "💧"
      },
      {
        number: 5,
        title: "Marcar Consulta no Centro de Saúde",
        instruction: "Ao detetares qualquer alteração suspeita, não tentes auto-medicar-te nem aplicar pomadas caseiras. Contacta o SNS 24 (808 24 24 24) ou o teu Centro de Saúde.",
        icon: "📞"
      }
    ],
    commonMistakes: [
      "Ignorar uma ferida porque 'não dói' e desapareceu sozinha (muitas ISTs evoluem silenciosamente).",
      "Sentir vergonha de procurar ajuda médica.",
      "Usar antibióticos ou pomadas de outras pessoas sem prescrição médica."
    ]
  }
];
