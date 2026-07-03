import { QuizQuestion } from "./content-types";

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
  {
    id: "qc4",
    audience: "criancas",
    topic: "Segurança",
    question: "Se alguém te pede para guardar um segredo que te deixa triste, o que deves fazer?",
    options: ["Guardar o segredo para sempre", "Contar a um adulto de confiança", "Fingir que não ouviu", "Escrever num diário e não contar a ninguém"],
    correctAnswer: 1,
    explanation: "Segredos que te deixam triste ou com medo devem ser sempre partilhados com um adulto de confiança — não és tu quem tem de guardar esse segredo."
  },
  {
    id: "qc5",
    audience: "criancas",
    topic: "Família",
    question: "As famílias podem ser diferentes?",
    options: ["Não, todas são iguais", "Sim, há famílias de muitos tipos e todas são especiais", "Só há um tipo de família", "As famílias diferentes não são normais"],
    correctAnswer: 1,
    explanation: "As famílias podem ter dois pais, duas mães, um só progenitor, avós, etc. Todas as famílias são válidas e especiais."
  },
  {
    id: "qc6",
    audience: "criancas",
    topic: "Amizade",
    question: "O que faz um bom amigo?",
    options: ["Mandar em ti", "Respeitar os teus sentimentos e ouvir-te", "Rir-se de ti", "Dizer que não podes brincar com outros"],
    correctAnswer: 1,
    explanation: "Um bom amigo respeita-te, ouve-te e faz-te sentir bem. Não te manda nem te proíbe de ter outros amigos."
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
  {
    id: "q6",
    audience: "jovens",
    topic: "Anatomia",
    question: "Qual é a idade média da primeira menstruação em Portugal?",
    options: ["8 anos", "10 anos", "12 anos", "16 anos"],
    correctAnswer: 2,
    explanation: "A primeira menstruação (menarca) ocorre em média entre os 11 e os 13 anos, sendo os 12 anos a média em Portugal."
  },
  {
    id: "q7",
    audience: "jovens",
    topic: "Contracepção",
    question: "A pílula do dia seguinte é um método contracetivo regular?",
    options: ["Sim, pode usar-se sempre", "Não, é apenas para emergências", "É mais eficaz que a pílula normal", "Substitui o preservativo"],
    correctAnswer: 1,
    explanation: "A pílula do dia seguinte é apenas para emergências. Não deve substituir a contraceção regular pois é menos eficaz e tem mais efeitos secundários."
  },
  {
    id: "q8",
    audience: "jovens",
    topic: "Saúde Sexual",
    question: "A masturbação faz mal à saúde?",
    options: ["Sim, causa problemas mentais", "Sim, pode causar infertilidade", "Não, é uma prática normal e saudável", "Só faz mal se for todos os dias"],
    correctAnswer: 2,
    explanation: "A masturbação é uma prática normal, saudável e segura. Não causa doenças, infertilidade ou problemas mentais — esses são mitos."
  },
  {
    id: "q9",
    audience: "jovens",
    topic: "Contracepção",
    question: "Qual a eficácia do preservativo quando bem usado?",
    options: ["50%", "70%", "85%", "98%"],
    correctAnswer: 3,
    explanation: "Quando usado corretamente em todas as relações, o preservativo tem 98% de eficácia. No uso típico (erros ocasionais), a eficácia desce para cerca de 85%."
  },
  {
    id: "q10",
    audience: "jovens",
    topic: "Contracepção",
    question: "A pílula contracetiva protege de IST?",
    options: ["Sim, completamente", "Sim, mas só algumas", "Não, a pílula só previne a gravidez", "Só se tomada sem esquecimentos"],
    correctAnswer: 2,
    explanation: "A pílula impede a ovulação e previne a gravidez, mas NÃO protege contra IST. Apenas o preservativo protege contra ambas."
  },
  {
    id: "q11",
    audience: "jovens",
    topic: "Identidade",
    question: "O que é o espetro da sexualidade?",
    options: ["Uma doença", "A ideia de que a sexualidade não é só heterossexual ou homossexual", "Um teste médico", "Uma fase temporária"],
    correctAnswer: 1,
    explanation: "O espetro da sexualidade reconhece que a atração não é binária — há muitas orientações entre e além de heterossexual e homossexual."
  },
  {
    id: "q12",
    audience: "jovens",
    topic: "IST",
    question: "Quando deves fazer rastreio de IST?",
    options: ["Só se tiveres sintomas", "Sempre que inicias uma nova relação sexual", "Uma vez na vida", "Só depois dos 30 anos"],
    correctAnswer: 1,
    explanation: "Deves fazer rastreio sempre que inicias uma nova relação, se tiveres múltiplos parceiros ou se notares sintomas. Prevenção é sempre melhor."
  },
  {
    id: "q13",
    audience: "jovens",
    topic: "Consentimento",
    question: "Alguém sob efeito de álcool pode dar consentimento sexual válido?",
    options: ["Sim, se disser 'sim'", "Não, o álcool afeta a capacidade de decidir conscientemente", "Depende da quantidade de álcool", "Sim, se não estiver completamente embriagado"],
    correctAnswer: 1,
    explanation: "O álcool compromete a capacidade de tomar decisões conscientes. Uma pessoa embriagada não pode dar consentimento válido."
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
  },
  {
    id: "qa3",
    audience: "adultos",
    topic: "Educação",
    question: "A que idade se deve começar a usar nomes anatómicos corretos com as crianças?",
    options: ["Só na adolescência", "Assim que a criança começa a falar", "Aos 10 anos", "Nunca é preciso"],
    correctAnswer: 1,
    explanation: "Usar os nomes corretos (vulva, pénis, etc.) desde cedo retira o estigma e dá à criança ferramentas para se proteger e comunicar."
  },
  {
    id: "qa4",
    audience: "adultos",
    topic: "Educação",
    question: "A educação sexual é obrigatória nas escolas portuguesas?",
    options: ["Não, é opcional", "Sim, é obrigatória por lei", "Só no ensino secundário", "Depende do diretor da escola"],
    correctAnswer: 1,
    explanation: "A Lei n.º 60/2002 torna a educação sexual obrigatória em todas as escolas do ensino básico e secundário em Portugal."
  },
  {
    id: "qa5",
    audience: "adultos",
    topic: "Proteção",
    question: "Se suspeitar de abuso sexual de uma criança, quem devo contactar?",
    options: ["Ninguém, não é da minha conta", "A polícia (GNR/PSP) ou a Comissão de Proteção de Crianças", "O padre da paróquia", "Esperar que a criança fale sozinha"],
    correctAnswer: 1,
    explanation: "Deves contactar as autoridades (PSP, GNR), a CPCJ ou a APAV. Não esperes — a proteção da criança é prioritária."
  },
];

