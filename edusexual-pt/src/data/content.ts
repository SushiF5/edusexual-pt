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
      },
      {
        id: "crescer-corpo",
        title: "O que acontece quando cresço?",
        category: "Corpo",
        content: `À medida que cresces, o teu corpo vai mudar. Isso chama-se puberdade e é algo que acontece a toda a gente!

Algumas coisas que podem acontecer:
- Ficas mais alto(a) e mais forte.
- Começam a crescer pelos em novas partes do corpo.
- A tua pele pode ficar mais oleosa (e às vezes surgem borbulhas — é normal!).
- As meninas começam a ter a menstruação e os meninos começam a ter a voz mais grave.

Cada pessoa cresce ao seu ritmo. O teu amigo pode crescer mais rápido que tu, e tudo bem! O teu corpo tem o seu próprio calendário e não há motivo para te preocupares.`
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
      },
      {
        id: "pedir-ajuda",
        title: "Como pedir ajuda se algo está errado",
        category: "Segurança",
        content: `Se alguma coisa te deixa triste, com medo ou confuso, é muito importante pedires ajuda. Nunca estás sozinho(a)!

A quem podes pedir ajuda:
- Ao teu pai ou mãe, ou a outro adulto de família em quem confies.
- A um professor ou professora na escola.
- Ao psicólogo da escola.
- A um médico ou enfermeiro.
- À Linha SOS Criança: 116 111 (é grátis e ninguém sabe que ligaste).

Lembra-te: se a primeira pessoa a quem pedes ajuda não te ouvir, pede a outra, e outra, até alguém te ajude. Tu mereces ser ouvido(a) e protegido(a).`
      },
      {
        id: "seguranca-online",
        title: "Regras de segurança na internet",
        category: "Segurança",
        content: `A internet é divertida, mas também tem regras para te manteres seguro(a):

1. Nunca partilhes o teu nome completo, morada ou escola com pessoas que não conheces online.
2. Se alguém que não conheces te pede fotos ou para encontrares, diz NÃO e conta a um adulto.
3. Não guardes segredos sobre coisas que acontecem online — conta sempre a um adulto de confiança.
4. Se vires algo que te deixa desconfortável, fecha a página e conta a um adulto.
5. Usa as definições de privacidade e não aceites pedidos de amizade de desconhecidos.

Lembra-te: na internet, as pessoas podem não ser quem dizem ser. Se algo parece estranho, provavelmente é!`
      }
    ]
  },
  {
    id: "emocoes-criancas",
    title: "Emoções e Relações",
    slug: "emocoes-relacoes",
    description: "As tuas emoções importam e as amizades também!",
    icon: "💬",
    audience: "criancas",
    articles: [
      {
        id: "emocoes-importantes",
        title: "As minhas emoções são importantes",
        category: "Emoções",
        content: `As emoções são como sinais que o corpo nos dá. Quando estás feliz, o coração parece saltar. Quando estás triste, parece que tudo pesa. Quando estás com medo, o coração bate mais rápido.

Todas as emoções são importantes — mesmo as que nos fazem sentir mal. Sentir tristeza não significa que sejas fraco(a). Sentir raiva não significa que sejas mau(a). O que importa é o que fazes com essas emoções.

Dica: Quando sentires uma emoção forte, para um momento, respira fundo e pensa: "O que é que estou a sentir? Porquê?" Dar nome às emoções ajuda-te a compreendê-las melhor.`
      },
      {
        id: "amizade-bom-amigo",
        title: "Amizade: o que é ser um bom amigo?",
        category: "Amizade",
        content: `Um bom amigo é alguém que:
- Te respeita e nunca te força a fazer algo que não queres.
- Te ouve quando precisas de falar.
- Te inclui nos jogos e atividades.
- Não diz mal de ti aos outros.
- Diz a verdade, mesmo quando é difícil.
- Fica do teu lado nos dias maus.

Tu também deves ser assim com os teus amigos! A amizade é uma via de mão dupla — trata os outros como gostavas de ser tratado.

Se um "amigo" te manda, te insulta ou te exclui, talvez não seja um verdadeiro amigo. E tudo bem — podes encontrar amigos melhores!`
      },
      {
        id: "respeitar-sentimentos",
        title: "Respeitar os sentimentos dos outros",
        category: "Emoções",
        content: `Assim como os teus sentimentos são importantes, os sentimentos dos outros também são!

Isto significa que:
- Se alguém diz "Não quero brincar", respeitamos.
- Se alguém está triste, não rimos dessa pessoa.
- Se alguém está com medo, não o forçamos a fazer algo.
- Se alguém se magoou, perguntamos como podemos ajudar.

Não precisas de concordar com tudo o que os outros sentem, mas deves sempre respeitar. Tratar os outros com bondade faz de ti uma pessoa incrível!`
      },
      {
        id: "triste-confuso",
        title: "Quando me sinto triste ou confuso",
        category: "Emoções",
        content: `Há dias em que nos sentimos triste, confuso ou simplesmente "não estamos para aí". Isso acontece a toda a gente — até aos adultos!

O que podes fazer:
- Fala com alguém em quem confies (pai, mãe, professor, amigo).
- Faz algo que gostes: desenhar, ouvir música, brincar, passear.
- Escreve o que sentes num papel — às vezes, pôr os sentimentos em palavras ajuda.
- Lembra-te: os maus dias passam. Não são para sempre.

Se te sentes assim muitas vezes, é importante contar a um adulto. Pedir ajuda é um sinal de coragem, não de fraqueza.`
      }
    ]
  },
  {
    id: "familias-criancas",
    title: "Famílias",
    slug: "familias",
    description: "Todas as famílias são especiais!",
    icon: "👨‍👩‍👧",
    audience: "criancas",
    articles: [
      {
        id: "familias-diferentes",
        title: "As famílias são diferentes e todas são especiais",
        category: "Família",
        content: `Sabias que não há duas famílias iguais? Cada família é única e isso é bonito!

Algumas famílias têm pai e mãe. Outras têm duas mães ou dois pais. Há famílias onde as crianças vivem só com a mãe ou só com o pai. Outras vivem com os avós, tios ou pessoas adotivas. Há famílias grandes e famílias pequenas.

O que torna uma família especial não é como ela é formada, mas sim o amor e o cuidado que as pessoas têm umas pelas outras. A tua família é especial porque é a TUA família!`
      },
      {
        id: "tipos-familias",
        title: "Há famílias de muitos modos",
        category: "Família",
        content: `Na tua escola, provavelmente existem muitos tipos de famílias:

- Famílias com pai e mãe.
- Famílias com duas mães ou dois pais.
- Famílias monoparentais (só com a mãe ou só com o pai).
- Famílias adotivas (onde os filhos foram adotados com muito amor).
- Famílias de acolhimento (que cuidam de crianças temporariamente).
- Famílias com padrastos e madrastos.
- Famílias onde os avós criam os netos.

Todas estas famílias são verdadeiras e todas merecem respeito. Nunca deves gozar com a família de alguém — cada pessoa tem a sua história e o seu amor.`
      },
      {
        id: "de-onde-vem-bebes",
        title: "Bébés: de onde vêm?",
        category: "Família",
        content: `Esta é uma pergunta que muitas crianças fazem! A resposta verdadeira e simples é:

Um bebé começa a formar-se quando uma parte do corpo do pai (o espermatozoide) se junta a uma parte do corpo da mãe (o óvulo). Isso acontece dentro do corpo da mãe, numa zona especial chamada útero, que é como uma "sala de espera" muito confortável onde o bebé cresce durante 9 meses.

Alguns bébés nascem da barriga da mãe, outros vêm através de adoção ou de outras formas. O que importa é que todo o bebé é fruto de amor e cuidado.`
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
content: `A menstruação é a descamação do revestimento do útero (endométrio) quando não ocorre a fecundação de um óvulo. É uma parte natural e saudável do corpo feminino.

O ciclo menstrual dura, em média, 28 dias, mas pode variar muito — entre 21 e 35 dias é considerado normal, especialmente nos primeiros anos após a menarca (primeira menstruação).

O ciclo divide-se em fases:

1. Fase folicular (dias 1-13): O corpo prepara-se para a ovulação. As hormonas FSH e estrogénio estimulam o crescimento de um folículo no ovário. O endométrio começa a espessar-se.

2. Ovulação (cerca do dia 14): O ovário liberta um óvulo maduro que viaja pelas trompas de Falópio. É o ponto mais fértil do ciclo. Algumas mulheres sentem uma leve dor no lado do abdómen (dor de ovulação ou "mittelschmerz").

3. Fase lútea (dias 15-28): O corpo prepara-se para uma possível gravidez. O endométrio continua a espessar-se. Se não houver fecundação, os níveis de progesterona caem, o endométrio se descama e a menstruação recomeça.

Sintomas comuns ao longo do ciclo:
- Antes da menstruação (PMS): cólicas, inchaço, acne, alterações de humor, dores de cabeça, sensibilidade nas mamas.
- Durante a menstruação: cólicas (dismenorreia), cansaço, alterações de humor.

Gestão da higiene menstrual:
- Pensos higiénicos: fáceis de usar, existem de vários tamanhos e absorções.
- Tampões: inseridos na vagina, devem ser trocados a cada 4-8 horas para prevenir a Síndrome do Choque Tóxico (SCT).
- Copas menstruais: reutilizáveis, ecológicas e económicas. Podem ser usadas até 12 horas.
- Cuecas menstruais: absorvem o fluxo sem necessidade de produto adicional.

Quando consultar um médico:
- Ciclos inferiores a 21 ou superiores a 35 dias de forma regular.
- Hemorragias muito abundantes (mudar penso/tampão a cada 1-2 horas).
- Dor intensa que não melhora com analgésicos.
- Ausência de menstruação durante 3+ meses (sem gravidez).
- Sangramento entre menstruações.

O mais importante: cada corpo é diferente. O teu ciclo é teu — aprende a conhecê-lo e não te compares com as outras.`
      },
      {
        id: "mudancas-masculinas",
        title: "Mudanças no corpo masculino",
        category: "Anatomia",
        content: `Durante a puberdade, os rapazes notam o crescimento dos testículos e do pénis, o surgimento de pelos no rosto e corpo, e a voz que se torna mais grave.
        
As poluções noturnas (ejaculações involuntárias durante o sono) são normais e fazem parte do amadurecimento do sistema reprodutor masculino.`
      },
      {
        id: "sistema-feminino",
        title: "O Sistema Reprodutor Feminino",
        category: "Anatomia",
        content: `O sistema reprodutor feminino é composto por:
        - Vulva: a parte externa (inclui os lábios e o clitóris).
        - Vagina: o canal que liga a vulva ao útero.
        - Útero: onde o bebé cresce durante a gravidez.
        - Trompas de Falópio: ligam os ovários ao útero.
        - Ovários: onde são produzidos os óvulos e hormonas como o estrogénio.`
      },
      {
        id: "sistema-masculino",
        title: "O Sistema Reprodutor Masculino",
        category: "Anatomia",
        content: `O sistema reprodutor masculino é composto por:
        - Pénis: órgão utilizado para a micção e relação sexual.
        - Testículos: produzem espermatozoides e testosterona.
        - Epidídimo: onde os espermatozoides amadurecem.
        - Vasos deferentes: transportam os espermatozoides para a uretra.
        - Próstata e Vesículas Seminais: produzem o líquido seminal que protege e nutre os espermatozoides.`
      },
      {
        id: "primeira-vez-mitos",
        title: "A Primeira Vez: Mitos e Realidades",
        category: "Educação",
        content: `Existe muita pressão social sobre a "primeira vez", mas a realidade é diferente dos filmes:
- Mito: Tem de ser perfeita. / Realidade: Muitas vezes é estranho, desajeitado ou até engraçado.
- Mito: A rapariga tem de sangrar. / Realidade: O hímen é elástico e nem sempre sangra; algumas pessoas já nascem com ele mais aberto.
- Mito: Apenas a rapariga deve decidir. / Realidade: O consentimento deve ser mútuo e entusiasta de ambas as partes.`
      },
      {
        id: "mudancas-femininas",
        title: "Mudanças no corpo feminino durante a puberdade",
        category: "Anatomia",
        content: `Durante a puberdade, o corpo das raparigas passa por várias transformações:

- Crescimento das mamas: Costuma ser o primeiro sinal, iniciando entre os 8 e os 13 anos. Uma mama pode crescer antes da outra — é normal.
- Pelos corporais: Surgem pelos na zona pubiana, nas axilas e nas pernas.
- Menstruação: A primeira menstruação (menarca) aparece habitualmente entre os 11 e os 13 anos. Os primeiros ciclos podem ser irregulares.
- Alterações na pele: A produção de sebo aumenta, podendo causar acne.
- Alargamento das ancas: O corpo prepara-se para a possível gravidez.
- Crescimento acelerado: Pode haver um "estirão" de altura.

Cada rapariga tem o seu ritmo. Não te compares com as amigas — o teu corpo está no tempo certo para ti.`
      },
      {
        id: "erecoes-ejaculacoes",
        title: "Ereções e Ejaculações: o que é normal?",
        category: "Anatomia",
        content: `Durante a puberdade, os rapazes experienciam mudanças que podem surpreender:

- Ereções espontâneas: Acontecem sem estímulo sexual — no meio da aula, ao acordar, durante o desporto. São causadas por hormonas e são completamente normais. Com o tempo, tornam-se menos frequentes.
- Poluções noturnas: Ejaculações durante o sono (também chamadas "sonhos húmidos"). São normais e o corpo limpa-se sozinho.
- Tamanho do pénis: Varia muito entre pessoas. O tamanho não afeta a função sexual nem o prazer. O pénis continua a crescer até aos 18-21 anos.
- Prepúcio: A pele que cobre a ponta do pénis. Em algumas pessoas é mais apertado (fimose), o que pode ser tratado medicalmente se causar desconforto.

O mais importante: não te compares com o que vês na pornografia — esses corpos não representam a média real.`
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
content: `Os métodos contracetivos dividem-se em vários tipos. Conhecer as opções ajuda-te a fazer uma escolha informada com o teu médico.

1. Métodos de Barreira — impedem o contacto entre o esperma e o óvulo:
- Preservativo masculino: O ÚNICO método que protege simultaneamente de gravidez e IST. Eficácia: 98% (uso correto). Disponível grátis nos Centros de Saúde e na APF.
- Preservativo feminino: Colocado dentro da vagina, dá mais controlo à pessoa que o usa. Eficácia: 95% (uso correto).
- Diafragma: Capa de silicone que cobre o colo do útero. Requer ajuste médico. Não protege de IST.

2. Métodos Hormonais — impedem a ovulação:
- Pílula combinada: Tomada diariamente, 21 dias + 7 de pausa. Eficácia: 99,7%. Pode causar efeitos secundários (náuseas, alterações de humor).
- Pílula minipílula (só progesterona): Adequada para mulheres que não podem tomar estrogénio. Deve ser tomada sempre à mesma hora (tolerância de 3 horas).
- Anel vaginal: Colocado uma vez por mês, liberta hormonas gradualmente.
- Adesivo contracetivo: Aplicado na pele semanalmente.
- Injeção (Depo-Provera): Administrada a cada 3 meses. Pode causar aumento de peso e atraso no regresso da fertilidade.

3. Métodos de Longa Duração — os mais eficazes e "esquece-e-fica":
- DIU de cobre: Sem hormonas, dura até 10 anos. Eficácia: 99%. Pode causar menstruações mais abundantes.
- DIU hormonal (Mirena): Liberta progesterona localmente, dura até 5 anos. Reduz o fluxo menstrual.
- Implante subcutâneo: Varetinha colocada no braço, dura 3 anos. Eficácia: 99,95% — o método mais eficaz que existe.

4. Métodos Comportamentais — menos fiáveis:
- Coito interrompido ("retirar antes"): Eficácia real de apenas 78%. Não é fiável nem protege de IST.
- Métodos de awarenss da fertilidade (temperatura, muco): Exigem formação e disciplina. Eficácia: 75-88%.

5. Contraceção de Emergência:
- Pílula do dia seguinte: Tomada até 72h após a relação (quanto mais cedo, mais eficaz). Não é método regular.
- DIU de cobre como emergência: Pode ser inserido até 5 dias após a relação, sendo a forma mais eficaz de contraceção de emergência.

Importante saber:
- Nenhum método é 100% eficaz, exceto a abstinência.
- A dupla proteção (preservativo + outro método) é a melhor estratégia.
- A escolha do método deve ser feita com apoio médico, dependendo da saúde, idade e estilo de vida de cada pessoa.
- Podes obter contracepção gratuita nos Centros de Saúde (SNS) e na APF.
- Tens direito à confidencialidade — não precisas de autorização dos pais para marcar consulta de planeamento familiar.`
      },
      {
        id: "preservativo-guia",
        title: "Preservativo: Como usar corretamente",
        category: "Guia",
        content: `Para que o preservativo seja eficaz, segue estes passos:
        1. Verifica a data de validade e se a embalagem tem ar (está selada).
        2. Abre com a mão (nunca uses dentes ou tesouras para não furar).
        3. Aperta a ponta para retirar o ar antes de colocar.
        4. Desenrola até à base do pénis ereto.
        5. Após a ejaculação, segura a base e retira com cuidado.`
      },
      {
        id: "pilula-detalhes",
        title: "A Pílula Contracetiva",
        category: "Contracepção",
        content: `A pílula é um método hormonal que impede a ovulação. 
        
Para funcionar, deve ser tomada todos os dias aproximadamente à mesma hora. Se esqueceres uma pílula, deves ler o folheto ou contactar o teu médico para saber como proceder. A pílula NÃO protege contra IST.`
      },
      {
        id: "pilula-dia-seguinte",
        title: "Contraceção de Emergência",
        category: "Contracepção",
        content: `A pílula do dia seguinte deve ser usada apenas em emergências (ex: rutura do preservativo ou esquecimento da pílula).

Ela não é um método regular e não é abortiva. Quanto mais cedo for tomada após a relação, maior a sua eficácia. Pode ser obtida nas farmácias ou centros de saúde.`
      },
      {
        id: "preservativo-feminino",
        title: "Preservativo Feminino",
        category: "Contracepção",
        content: `O preservativo feminino é um dispositivo de poliuretano ou nitrilo que se coloca dentro da vagina antes da relação sexual.

Vantagens:
- Pode ser colocado até 8 horas antes da relação.
- Não depende da ereção do parceiro para ficar no lugar.
- Protege contra gravidez e IST (tal como o preservativo masculino).
- Dá mais controlo à pessoa que o usa.

Como usar: O preservativo feminino tem dois anéis — o anel interno é inserido na vagina (como um tampão), e o anel externo fica fora da vagina. Pode parecer estranho da primeira vez, mas com prática torna-se fácil.

Onde conseguir: Em algumas farmácias e centros de planeamento familiar (nem sempre é tão fácil de encontrar como o masculino, mas está disponível).`
      },
      {
        id: "diu-implante",
        title: "DIU e Implante: métodos de longa duração",
        category: "Contracepção",
        content: `**DIU (Dispositivo Intra-Uterino):**
- É um pequeno dispositivo em forma de T que é colocado dentro do útero por um profissional de saúde.
- Existem dois tipos: hormonal (Mirena, Jaydess) e de cobre (sem hormonas).
- Dura entre 3 e 10 anos, consoante o tipo.
- Eficácia: Mais de 99%.
- Vantagem: Colocas e esqueces — não há risco de esquecimento como na pílula.
- Pode ser removido a qualquer momento se quiseres engravidar.

**Implante Subdérmico:**
- Uma pequena vareta do tamanho de um fósforo colocada sob a pele do braço.
- Liberta hormonas que impedem a ovulação.
- Dura até 3 anos.
- Eficácia: Mais de 99%.
- Vantagem: Muito discreto, não interfere com as relações sexuais.

Ambos são reversíveis — ao remover, a fertilidade regressa rapidamente. Fala com o teu médico ou com o centro de planeamento familiar para saber qual é o melhor para ti.`
      },
      {
        id: "comparacao-metodos",
        title: "Comparação de Métodos: Eficácia e Vantagens",
        category: "Contracepção",
        content: `| Método | Eficácia (uso correto) | Eficácia (uso típico) | Protege de IST? |
|---|---|---|---|
| Preservativo masculino | 98% | 85% | ✅ Sim |
| Preservativo feminino | 95% | 79% | ✅ Sim |
| Pílula combinada | 99%+ | 91% | ❌ Não |
| Implante | 99%+ | 99%+ | ❌ Não |
| DIU hormonal | 99%+ | 99%+ | ❌ Não |
| DIU cobre | 99%+ | 99%+ | ❌ Não |
| Pílula do dia seguinte | 85-95%* | — | ❌ Não |

*Se tomada nas primeiras 24h. Eficácia diminui com o tempo.

**Regra de ouro**: O preservativo é o ÚNICO método que protege contra IST. Se usas outro método (pílula, DIU, implante), recomenda-se também usar preservativo para proteção dupla.`
      },
      {
        id: "mitos-contracepcao",
        title: "Mitos sobre Contracepção que Precisas de Esquecer",
        category: "Contracepção",
        content: `Mito 1: "A pílula faz engordar."
Realidade: Os contraceptivos hormonais modernos têm doses muito baixas e a maioria das pessoas não ganha peso significativo.

Mito 2: "O DIU é só para mulheres que já tiveram filhos."
Realidade: O DIU pode ser usado por qualquer pessoa, independentemente de ter ou não filhos.

Mito 3: "Se tomares a pílula durante anos, vais ficar infértil."
Realidade: A fertilidade regressa rapidamente após parar a pílula. Não causa infertilidade.

Mito 4: "O preservativo estraga o prazer."
Realidade: Há preservativos de muitos tipos (ultrafinos, texturizados, com lubrificante). O "desconforto" é muitas vezes psicologico — e um preservativo é sempre melhor do que uma gravidez ou IST não planeada.

Mito 5: "Não podes engravidar na primeira relação."
Realidade: Podes engravidar em QUALQUER relação sexual sem proteção, seja a primeira ou a centésima.

Mito 6: "O coito interrompido (retirar antes) funciona."
Realidade: O líquido pré-ejaculatório pode conter espermatozoides. Este método tem uma eficácia de apenas 78% no uso típico — não é confiável.`
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
content: `A prevenção das IST (Infeções Sexualmente Transmissíveis) é essencial para uma vida sexual saudável. Aqui estão as estratégias mais eficazes:

1. Preservativo — a tua melhor defesa:
- O preservativo masculino e feminino são os ÚNICOS métodos contracetivos que protegem contra a maioria das IST.
- Deve ser usado em TODA a relação sexual — desde o início ao fim, não só antes da ejaculação.
- Eficácia: Reduz o risco de VIH em 80-95%, gonorreia, clamídia e herpes quando usado corretamente.
- Atenção: O preservativo NÃO protege completamente contra IST transmitidas por contacto pele-com-pele em áreas não cobertas (HPV, herpes, sífilis).

2. Vacinação — proteção antes da exposição:
- HPV: A vacina é recomendada para rapazes e raparigas entre os 9 e os 18 anos. Protege contra as estirpes que causam cancro do colo do útero, cancro anal e verrugas genitais. Em Portugal, é gratuita no SNS.
- Hepatite B: A vacina faz parte do Plano Nacional de Vacinação e é dada na infância. Se não tomaste, podes tomá-la em qualquer idade.
- Hepatite A: Recomendada para homens que fazem sexo com homens (HSH) e pessoas que viajam para zonas endémicas.

3. Comunicação com o(a) parceiro(a):
- Falar abertamente sobre saúde sexual não é "estranho" — é sinal de respeito e maturidade.
- Pergunte: "Quando foi a última vez que fizeste um teste de IST?" e "Usamos sempre proteção?"
- Partilhar o historial sexual é uma responsabilidade de ambas as partes.
- Se não consegues falar sobre IST com alguém, talvez ainda não estejas pronto(a) para ter relações sexuais com essa pessoa.

4. Rastreio regular — saber é proteger:
- Faz testes de IST: Ao iniciar uma nova relação; anualmente se tens vida sexual ativa; a cada 3-6 meses se tens múltiplos parceiros.
- Os testes são confidenciais e muitos são gratuitos (Centros de Saúde, APF).
- Algumas IST (clamídia, gonorreia) podem ser assintomáticas — não esperes por sintomas para fazer testes.

5. Práticas sexuais mais seguras:
- Evita partilhar brinquedos sexuais (ou usa preservativo sobre eles).
- Usa proteção no sexo oral (preservativo ou barreira de latex).
- Não partilhes agulhas ou seringas.
- Limita o número de parceiros sexuais — quanto mais parceiros, maior o risco.
- A profilaxia pré-exposição (PrEP) está disponível em Portugal para pessoas com risco elevado de VIH. Pergunta no teu Centro de Saúde.

6. Se achares que foste exposto(a):
- Faz teste o mais rápido possível.
- Para VIH, existe a Profilaxia Pós-Exposição (PEP) — deve ser iniciada nas primeiras 72 horas após a exposição.
- Informa o(a) parceiro(a) — é uma questão de responsabilidade e respeito.
- Não tenhas relações sexuais até saberes o resultado.

Lembra-te: prevenir é sempre mais fácil do que tratar. A tua saúde sexual é tão importante como qualquer outra parte da tua saúde.`
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
      },
      {
        id: "clamidia",
        title: "Clamídia: a IST mais comum em jovens",
        category: "Saúde",
        content: `A clamídia é uma infeção bacteriana (causada pela Chlamydia trachomatis) e é a IST mais reportada em jovens em Portugal e na Europa.

Sintomas: Muitas vezes NÃO apresenta sintomas. Quando surgem, podem incluir:
- Corrimento anormal (vaginal ou peniano)
- Ardor ao urinar
- Dor durante as relações sexuais
- Sangramento fora do período menstrual

Tratamento: Curável com antibióticos prescritos por um médico. É fundamental que o(a) parceiro(a) também seja tratado(a) para evitar reinfecção.

Se não for tratada, a clamídia pode causar infertilidade e doença inflamatória pélvica. Por isso, o rastreio é essencial — especialmente se tiveres menos de 25 anos e vida sexual ativa.`
      },
      {
        id: "herpes-genital",
        title: "Herpes Genital",
        category: "Saúde",
        content: `O herpes genital é causado pelo vírus HSV (Herpes Simplex Virus), sobretudo o tipo 2 (HSV-2), embora o HSV-1 (herpes labial) também possa causar herpes genital através do sexo oral.

Sintomas:
- Pequenas bolhas ou feridas na zona genital, anal ou oral
- Comichão, ardor ou formigueiro antes de surgirem as feridas
- Sintomas gripais na primeira infeção (febre, dores musculares)

Importante saber:
- O vírus permanece no corpo para sempre, mas os surtos tendem a diminuir com o tempo.
- Não há cura, mas existem medicamentos antivirais que reduzem a frequência e gravidade dos surtos.
- Podes transmitir o herpes mesmo sem ter feridas visíveis (embora o risco seja menor).
- Usar preservativo reduz o risco, mas não elimina completamente, pois o vírus pode estar em zonas não cobertas pelo preservativo.

Se suspeitas de herpes, consulta um médico. Não tenhas vergonha — é uma infeção muito comum.`
      },
      {
        id: "sifilis-gonorreia",
        title: "Sífilis e Gonorreia",
        category: "Saúde",
        content: `Sífilis e gonorreia são duas IST bacterianas que estão a aumentar em Portugal, especialmente em jovens.

**Sífilis** (causada pela bactéria Treponema pallidum):
- Fase 1: Aparece uma ferida indolor (cancro) na zona genital, anal ou oral.
- Fase 2: Erupção cutânea no corpo, febre, dores musculares e gânglios aumentados.
- Fase latente: Sem sintomas, mas a bactéria continua no corpo.
- Fase 3 (se não tratada): Pode afetar o cérebro, coração e outros órgãos — muito grave.

**Gonorreia** (causada pela bactéria Neisseria gonorrhoeae):
- Sintomas: Corrimento amarelo/verdeoso, ardor ao urinar, dor pélvica.
- Muitas pessoas (especialmente mulheres) não apresentam sintomas.
- Se não tratada, pode causar infertilidade.

Ambas são curáveis com antibióticos, mas é crucial tratar cedo. Se não tratadas, podem ter consequências graves e permanentes. Faz rastreio regular!`
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
      },
      {
        id: "amor-vs-atracao",
        title: "Amor e Atração: diferenças",
        category: "Psicologia",
        content: `É comum confundir amor e atração, mas são coisas diferentes:

- **Atração** é o impulso inicial — física, emocional ou intelectual. Pode ser intensa e passageira.
- **Apaixonação** é o estado emocional intenso do início da relação. O corpo produz dopamina e noradrenalina — é como uma "embriaguez" natural. Dura habitualmente de 6 meses a 2 anos.
- **Amor** é mais profundo e duradouro. Envolve compromisso, respeito, conhecimento mútuo e cuidado. O amor constrói-se com o tempo.

Podes sentir atração sem amor (como numa "paixão" passageira) e podes amar alguém sem sentir atração (como numa relação assexual romântica).

Saber a diferença ajuda-te a tomar decisões mais conscientes sobre as tuas relações.`
      },
      {
        id: "comunicacao-relacoes",
        title: "Comunicação nas Relações",
        category: "Psicologia",
        content: `A comunicação é a base de qualquer relação saudável. Aqui vão dicas práticas:

1. **Fala na primeira pessoa**: Em vez de "Tu nunca me ouves", tenta "Eu sinto-me sozinho(a) quando não partilhamos o nosso dia". Isso evita que a outra pessoa se sinta atacada.

2. **Ouve ativamente**: Não penses na resposta enquanto a outra pessoa fala. Ouve de verdade e depois responde.

3. **Não acumules ressentimentos**: Se algo te incomoda, fala disso cedo. Guardar frustrações só faz com que exploda mais tarde.

4. **Usa o "tempo de pausa"**: Se a conversa está a ficar demasiado aquecida, combinem fazer uma pausa de 15-30 minutos e voltar ao assunto quando estiverem mais calmos.

5. **Verifica se entendeste**: "Então, o que estás a dizer é que te sentiste ignorado quando..." — isto evita muitos mal-entendidos.

6. **Não leias a mente**: Não assumas que a outra pessoa sabe o que sentes. Diz-lhe.`
      },
      {
        id: "fim-relacao",
        title: "Fim de Relação: como lidar",
        category: "Apoio",
        content: `Terminar uma relação ou ser deixado(a) é doloroso, mas faz parte da vida. Aqui vão algumas orientações:

Se és tu quem termina:
- Sê honesto(a) mas respeitoso(a). Evita mensagens de texto se a relação foi longa.
- Não dê falsas esperanças — se é um fim, sê claro(a).
- Não contes pormenores íntimos da relação a outros.

Se és tu quem foi deixado(a):
- É normal sentir tristeza, raiva, confusão. Deixa sair as emoções.
- Evita contactar a pessoa constantemente — o "espaço" ajuda ambos.
- Não vás para redes sociais ver o que a pessoa faz — isso só prolonga o sofrimento.
- Fala com amigos de confiança ou com um psicólogo.
- Preenche o teu tempo com coisas que gostas: desporto, hobbies, amigos.
- O tempo cura, mas o processo não é linear — hás de ter bons e maus dias.

Em ambos os casos: respeita o espaço da outra pessoa e não partilhes pormenores íntimos da relação com terceiros.`
      },
      {
        id: "ciumes",
        title: "Ciúmes: quando é demais?",
        category: "Psicologia",
        content: `Um pouco de ciúme pode ser normal — mostra que nos importamos. Mas quando os ciúmes controlam a relação, tornam-se tóxicos.

Ciúmes saudáveis vs. ciúmes tóxicos:
- Saudáveis: Sentes um leve desconforto, mas confias na pessoa e falas sobre isso abertamente.
- Tóxicos: Revistas o telemóvel da pessoa, exiges saber onde está a toda a hora, proíbes amizades, ameaças ou chantas emocionais.

Se tens ciúmes excessivos:
- Reconhece que o ciúme fala mais dos teus medos do que do comportamento da outra pessoa.
- Fala sobre os teus sentimentos sem acusar.
- Considera apoio psicológico — a terapia ajuda muito.

Se és vítima de ciúmes controladores:
- Isso não é amor, é controlo.
- Não te isoles. Conta a alguém de confiança.
- Ninguém tem o direito de controlar a tua vida, as tuas amizades ou o teu telemóvel.`
      },
      {
        id: "primeira-relacao",
        title: "Primeira Relação Sexual: como saber se estás pronto(a)?",
        category: "Psicologia",
        content: `Não existe uma idade "certa" para ter a primeira relação sexual. A decisão é tua e só tua.

Sinais de que podes estar pronto(a):
- Queres fazê-lo por tua vontade, não por pressão de ninguém.
- Conversaste com o(a) parceiro(a) sobre proteção (preservativo, contracepção).
- Sentes-te confortável para falar abertamente sobre o que queres e não queres.
- Sabes que podes mudar de ideia a qualquer momento.
- Não estás a fazê-lo para "provar" algo ou para ser aceite.

Sinais de que NÃO estás pronto(a):
- Sentires pressão do(a) parceiro(a) ou dos amigos.
- Ter medo de dizer "não".
- Não saber como proteger-te.
- Fazê-lo para não perder a pessoa.

Lembra-te: esperar não é "ser quadrado(a)" — é ser inteligente. A primeira vez deve ser uma experiência positiva, não algo que fazes para "tirar isso de cima".`
      },
      {
        id: "relacoes-distancia",
        title: "Relações à Distância",
        category: "Psicologia",
        content: `Uma relação à distância pode funcionar, mas exige mais esforço e comunicação:

Dicas para manter a relação saudável:
- Estabelece rotinas de comunicação (videochamadas, mensagens), mas sem ser controlador(a).
- Planeia encontros regulares — ter algo para onde olhar ajuda muito.
- Confia na pessoa. A distância não é desculpa para controlar.
- Mantém a tua vida social e hobbies — a tua vida não pode depender só da relação.
- Seja honesto(a) sobre sentimentos de saudade, frustração ou solidão.
- Partilha experiências mesmo à distância (ver o mesmo filme, ouvir a mesma playlist).

Quando a distância é um problema:
- Se um de vós não quer estar na relação à distância, é melhor ser honesto.
- Se a relação se torna fonte de ansiedade constante, avalia se vale a pena.
- Não há problema em terminar se a distância não funciona para ti — não és "fraco(a)" por isso.`
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
3. Consciente: Alguém sob efeito de álcool ou drogas não pode dar consentimento válido.
4. Entusiástico: Um "sim" relutante ou por pressão não é consentimento. O "sim" deve ser dado de vontade própria, com vontade.

Regra de ouro: Se não tens a certeza, pergunta. "Posso beijar-te?" não estraga o momento — mostra respeito.`
      },
      {
        id: "pressao-dos-outros",
        title: "Pressão dos Outros: como resistir",
        category: "Apoio",
        content: `A pressão para ter relações sexuais pode vir de muitas partes: o(a) parceiro(a), amigos, redes sociais, pornografia.

Tipos de pressão:
- Direta: "Se me amas, fazes isto." / "Toda a gente já fez."
- Indireta: Olhares, comparações, fazer-te sentir "atrasado(a)".
- Autopressão: "Já tenho X anos e ainda não fiz nada, há algo de errado comigo."

Como resistir:
- Lembra-te: não há idade "certa" para começar. Cada pessoa tem o seu tempo.
- Um(a) parceiro(a) que te pressiona não está a respeitar os teus limites.
- Podes dizer "Não" sem dar explicações. "Não estou pronto(a)" é razão suficiente.
- A decisão é TUA. Alguém que te ama respeita o teu tempo.
- Se precisares, afasta-te da situação e fala com alguém de confiança.`
      },
      {
        id: "alcool-consentimento",
        title: "Álcool e Consentimento",
        category: "Ética",
        content: `O álcool afeta a capacidade de tomar decisões conscientes. Por isso:

- Uma pessoa embriagada NÃO pode dar consentimento válido. Ponto.
- Aproveitar-se do estado de embriaguez de alguém para ter atividade sexual é violação.
- Se tu próprio(a) estás embriagado(a), também não podes dar consentimento de forma consciente.

Práticas seguras:
- Se vais sair à noite, combina com os teus amigos: olhem uns pelos outros.
- Se vês alguém a ser levado(a) por uma pessoa enquanto está claramente embriagado(a), intervém ou pede ajuda.
- A responsabilidade é sempre de quem pratica a agressão, nunca da vítima — independentemente do que ela usa, bebe ou faz.

Em Portugal, o Código Penal (art.º 163.º) pune quem constranger outra pessoa a prática de ato sexual quando esta, por qualquer causa, não tem capacidade para resistir.`
      },
      {
        id: "lei-consentimento-pt",
        title: "A Lei do Consentimento em Portugal",
        category: "Lei",
        content: `Em Portugal, a lei protege o consentimento sexual:

- **Idade legal para relações sexuais**: 14 anos (com pessoa até 5 anos mais velha). A partir dos 16 anos, não há limite de idade do parceiro.
- **Violação (art.º 163.º do Código Penal)**: Quem constranger outra pessoa a prática de ato sexual, utilizando meios de força ou ameaça, ou quando a pessoa não tem capacidade para resistir, é punido com prisão de 1 a 8 anos.
- **Abuso de menores**: Relações sexuais com menores de 14 anos são sempre crime, independentemente do consentimento.
- **Consentimento retirado**: Se uma pessoa retira o consentimento durante o ato e a outra pessoa continua, isso é violação.
- **Comunicações não desejadas**: Enviar fotos íntimas sem consentimento (revenge porn) é crime desde 2015 (art.º 190.º-A do Código Penal).

Se foste vítima de qualquer forma de violência sexual, denuncia:
- GNRC: 217 809 200
- APAV: 800 200 2200 (gratuito)
- Em caso de emergência: 112`
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
      },
      {
        id: "espetro-sexualidade",
        title: "O Espetro da Sexualidade",
        category: "Identidade",
        content: `A sexualidade não é preto e branco — é um espetro. A escala de Kinsey (de 0 a 6) já nos anos 40 mostrou que muitas pessoas não são exclusivamente heterossexuais ou homossexuais.

Algumas orientações no espetro:
- Heterossexual: Atração pelo género oposto.
- Homossexual: Atração pelo mesmo género (gay/lésbica).
- Bissexual: Atração por mais do que um género.
- Pansexual: Atração independente do género da pessoa.
- Assexual: Pouca ou nenhuma atração sexual (mas pode ter atração romântica).
- Demissexual: Atração sexual apenas após uma forte ligação emocional.

A orientação pode mudar ao longo da vida — e isso é normal. Não precisas de te rotular se não quiseres. Explorar e questionar faz parte do processo.`
      },
      {
        id: "pessoas-trans",
        title: "Pessoas Trans: o que precisas de saber",
        category: "Identidade",
        content: `Uma pessoa transgénero (trans) é alguém cuja identidade de género não corresponde ao sexo que lhe foi atribuído ao nascer.

Por exemplo: uma pessoa que nasceu com corpo de rapaz, mas se identifica como mulher, é uma mulher trans. O inverso é um homem trans.

O que deves saber:
- Ser trans não é uma doença, uma escolha nem uma "moda". É uma identidade profunda e validada pela comunidade médica e científica internacional.
- A transição pode ser social (mudar nome, pronome, roupa), médica (hormonas, cirurgias) ou ambas — ou nenhuma. Cada pessoa decide o que é melhor para si.
- Em Portugal, a Lei n.º 38/2018 permite a retificação do registo civil (nome e género) sem necessidade de diagnóstico médico ou cirurgia, a partir dos 16 anos.
- Usar o nome e os pronomes certos é um sinal de respeito básico.

Se és trans ou estás a questionar a tua identidade, existem recursos de apoio em Portugal (ILGA Portugal, Opus Diversidades, Panteras Rosa).`
      },
      {
        id: "ser-nao-binario",
        title: "Ser Não-Binário",
        category: "Identidade",
        content: `Nem toda a gente se identifica exclusivamente como homem ou mulher. Pessoas não-binárias sentem que a sua identidade de género está fora do binário tradicional.

O não-binário é um termo guarda-chuva que inclui:
- Pessoas agénero: não se identificam com nenhum género.
- Pessoas bigénero: identificam-se com dois géneros.
- Pessoas fluidas de género: a sua identidade muda ao longo do tempo.
- E muitas outras experiências.

Em Portugal, desde 2018, é possível identificar-se como não-binário no registo civil (com a opção "X" ou alteração de nome).

Usar os pronomes corretos (ele, ela, elu — ou outros que a pessoa preferir) é essencial para respeitar a identidade de cada um. Se não tens a certeza, pergunta com respeito — a maioria das pessoas não-binárias prefere que perguntes a que assumes errado.`
      },
      {
        id: "coming-out",
        title: "Coming Out: como apoiar quem assume",
        category: "Apoio",
        content: `"Coming out" é o processo de partilhar a orientação sexual ou identidade de género com outras pessoas. Não é um evento único — pode acontecer muitas vezes ao longo da vida.

Se estás a fazer coming out:
- Fazê-lo no teu tempo e da forma que te sentir seguro(a). Não há pressa.
- Nem toda a gente precisa de saber ao mesmo tempo. Podes começar com pessoas de confiança.
- Se receias uma reação negativa, prepara um plano de segurança (onde ficar, quem contactar).
- Não é "uma fase" e não deves ser tratado(a) como tal.

Se alguém te faz coming out:
- Ouve sem julgar. Diz algo simples como "Obrigado por partilhares comigo".
- Não faças perguntas intrusivas sobre o corpo ou a vida sexual da pessoa.
- Não digas "Eu sempre soube!" ou "Tens a certeza?" — isso pode ser invalidante.
- Pergunta como podes apoiar. Respeita a privacidade — não contes a outros sem permissão.
- Continua a tratar a pessoa da mesma forma. A orientação/identidade é só uma parte de quem ela é.

Recursos: ILGA Portugal, Opus Diversidades, Panteras Rosa, GRES.`
      },
      {
        id: "recursos-lgbtqi",
        title: "Recursos LGBTQI+ em Portugal",
        category: "Recursos",
        content: `Se és LGBTQI+ ou estás a questionar a tua identidade/orientação, existem organizações em Portugal que podem ajudar:

- **ILGA Portugal**: A maior associação LGBTQI+ portuguesa. Apoio psicológico, jurídico e grupos de convívio. ilga.pt
- **Opus Diversidades**: Apoio a pessoas LGBTQI+ com foco em saúde mental e bem-estar.
- **Panteras Rosa**: Associação focada em direitos LGBTQI+ e ativismo.
- **GRES (Grupo de Reflexão sobre Saúde Sexual)**: Consultas e aconselhamento.
- **APF**: Atendimento sem discriminação, incluindo pessoas LGBTQI+.
- **Linha do Arco-Íris**: Apoio telefónico e online para pessoas LGBTQI+.

Lembra-te: não estás sozinho(a). Pedir ajuda é um sinal de coragem, não de fraqueza.`
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
      },
      {
        id: "teste-gravidez",
        title: "Teste de Gravidez: Quando e Como Fazer",
        category: "Saúde",
        content: `Deves fazer um teste de gravidez se tens atraso na menstruação ou outros sintomas (náuseas, mamas sensíveis, cansaço).

Tipos de teste:
- Teste de urina (farmácia): Fiável a partir do 1.º dia de atraso. Custo ~5-15€. Usa a primeira urina da manhã para maior precisão.
- Teste de sangue: Mais preciso, deteta gravidez mais cedo (cerca de 10 dias após a conceção). Disponível no SNS ou laboratórios.
- No Centro de Saúde/SNS: Gratuito e confidencial.

Como usar o teste de farmácia:
1. Lê as instruções (cada marca varia).
2. Colhe urina (preferência pela primeira da manhã).
3. Espera o tempo indicado (3-5 minutos).
4. Lê o resultado.

Se positivo, marca consulta no Centro de Saúde para confirmação e aconselhamento.`
      },
      {
        id: "opcoes-gravidez-nao-planeada",
        title: "Opções perante uma Gravidez Não Planeada",
        category: "Apoio",
        content: `Se descobrires que estás grávida e não estava planeado, respira fundo — tens opções e tempo para decidir.

As tuas opções:
1. Continuar a gravidez e criar o bebé: Há apoios do Estado (abono de família, subsídio parental, pré-natal gratuito no SNS).
2. Continuar a gravidez e dar o bebé para adoção: Uma opção válida e respeitável.
3. Interrupção Voluntária da Gravidez (IVG): Legal e gratuita no SNS até às 10 semanas. Confidencial e segura.

O que fazer agora:
- Fala com alguém de confiança.
- Contacta o Centro de Saúde ou a APF para aconselhamento gratuito.
- A decisão é TUA. Ninguém pode forçar-te.

A APAV e a APF oferecem apoio psicológico gratuito neste processo.`
      },
      {
        id: "gravidez-adolescencia",
        title: "Gravidez na Adolescência: Riscos e Apoios",
        category: "Saúde",
        content: `Uma gravidez na adolescência traz desafios específicos:

Riscos para a saúde:
- Maior risco de pré-eclâmpsia e anemia.
- Parto prematuro e baixo peso do bebé.
- Menos probabilidade de fazer pré-natal adequado.

Desafios sociais:
- Interromper ou atrasar os estudos.
- Dependência financeira da família.
- Pressão social e estigma.

Apoios disponíveis em Portugal:
- Consultas de pré-natal gratuitas no SNS.
- Subsídio parental (mesmo para menores trabalhadoras).
- Abono de família.
- APF: Aconselhamento e acompanhamento.

O mais importante: procura ajuda médica o mais cedo possível — independentemente da tua decisão. O pré-natal é essencial.`
      },
      {
        id: "pre-natal",
        title: "Pré-Natal: Cuidados na Gravidez",
        category: "Saúde",
        content: `O acompanhamento pré-natal é fundamental e gratuito no SNS.

O que inclui:
- Consultas regulares (mensais no início, quinzenais no final).
- Ecografias (habitualmente 3 durante a gravidez).
- Análises de sangue e urina.
- Vacinação (incluindo tosse convulsa no 3.º trimestre).
- Suplementos (ácido fólico, ferro se necessário).

Cuidados importantes:
- Não fumar, não beber álcool, não usar drogas.
- Alimentação equilibrada (ferro, cálcio, ácido fólico).
- Atividade física moderada (com autorização médica).
- Evitar alimentos crus ou não pasteurizados.

Assim que souberes que estás grávida, contacta o teu Centro de Saúde para marcar a primeira consulta.`
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
      },
      {
        id: "transtornos-alimentares",
        title: "Transtornos Alimentares e Sexualidade",
        category: "Psicologia",
        content: `Os transtornos alimentares (anorexia, bulimia, compulsão alimentar) afetam profundamente a sexualidade:

Impacto físico:
- Diminuição da libido (desejo sexual).
- Perturbações hormonais (irregularidades menstruais ou ausência de menstruação).
- Secura vaginal, que pode tornar as relações dolorosas.
- Fadiga e falta de energia.

Impacto emocional:
- Baixa autoestima e vergonha do corpo.
- Dificuldade em intimidade e confiança.
- Evitar relações sexuais por medo de ser julgado(a).

Se sofres de um transtorno alimentar:
- Não estás sozinho(a). Pedir ajuda é coragem.
- Procura ajuda profissional: médico de família, psicólogo, ou o SOS Tutão (linha de apoio para transtornos alimentares).
- O tratamento existe e funciona — quanto mais cedo, melhor.

Se conheces alguém nesta situação:
- Não faças comentários sobre o corpo ou a alimentação.
- Ouve sem julgar e encaminha para ajuda profissional.`
      },
      {
        id: "normalidade-corpos",
        title: "A Normalidade dos Corpos: Não Existe Corpo Perfeito",
        category: "Educação",
        content: `A "normalidade" dos corpos é um mito. Não existe um corpo perfeito — existe uma enorme variedade de corpos saudáveis.

O que é "normal":
- Mamas de tamanhos diferentes.
- Pénis de tamanhos e formas variados.
- Pelos corporais (todas as pessoas têm — a quantidade varia).
- Pequenas assimetrias no corpo (um ombro mais alto, uma perna ligeiramente mais comprida).
- Cor de pele, marcas, cicatrizes, sardas — tudo é variação natural.

O que NÃO é normal:
- Comparares-te constantemente com corpos de redes sociais ou pornografia.
- Sentires que o teu corpo nunca é suficiente.
- Fazeres dietas extremas ou exercício excessivo para mudar a tua aparência.

Lembra-te: o teu valor não se mede pela tua aparência. Um corpo saudável é um corpo que te permite viver, amar, aprender e ser feliz.`
      }
    ]
  },
  {
    id: "saude-higiene-jovens",
    title: "Saúde Sexual e Higiene",
    slug: "saude-higiene",
    description: "Cuidados diários e bem-estar",
    icon: "🧼",
    audience: "jovens",
    articles: [
      {
        id: "higiene-intima",
        title: "Higiene Íntima: O que fazer",
        category: "Saúde",
        content: `A higiene íntima deve ser simples. Para a maioria das pessoas, lavar a zona externa com água e um sabonete neutro é suficiente.
        
Atenção: evitar duchas vaginais ou sabonetes com perfumes fortes, pois podem alterar o pH natural e causar infeções. O corpo tem a sua própria forma de se equilibrar.`
      },
      {
        id: "quando-medico",
        title: "Quando deves consultar um médico?",
        category: "Saúde",
        content: `Deves procurar ajuda médica se notares:
- Alterações no odor ou cor dos fluxos vaginais ou penianos.
- Comichão, ardor ou feridas na zona genital.
- Dor durante a relação sexual.
- Mudanças súbitas no ciclo menstrual.

Não tenhas vergonha: os médicos e enfermeiros estão habituados e estão lá para ajudar.`
      },
      {
        id: "consulta-planeamento-familiar",
        title: "Consulta de Planeamento Familiar: o que esperar",
        category: "Saúde",
        content: `A consulta de planeamento familiar é gratuita no SNS e é para TODOS — homens e mulheres, jovens e adultos.

O que acontece na consulta:
- O profissional de saúde pergunta sobre o teu histórico de saúde e vida sexual.
- Podes pedir o método contracetivo mais adequado para ti.
- Podes fazer rastreio de IST.
- Podes esclarecer dúvidas sobre sexualidade sem ser julgado(a).

O que NÃO acontece:
- Ninguém te vai julgar pelo número de parceiros.
- Ninguém vai contar aos teus pais (a consulta é confidencial, mesmo se fores menor).
- Não te vão fazer exames invasivos sem o teu consentimento.

Como marcar: Contacta o teu Centro de Saúde e pede uma consulta de planeamento familiar. Também podes ir à APF.

Prepara-te: Anota as dúvidas que tens antes da consulta. Não tenhas vergonha de perguntar — o profissional está ali para te ajudar.`
      },
      {
        id: "preservativo-passo-passo",
        title: "Como Colocar o Preservativo: Passo a Passo",
        category: "Guia",
        content: `Colocar o preservativo corretamente é essencial para a sua eficácia. Segue estes passos:

Antes de começar:
- Verifica a data de validade na embalagem.
- Confirma que a embilagem tem ar (está selada) — se não tiver, pode estar furado.
- Tem sempre um preservativo de reserva.

Passo a passo:
1. Abre a embalagem com os dedos (nunca com dentes, tesouras ou unhas compridas).
2. Certifica-te de que o preservativo está do lado certo (deve desenrolar facilmente).
3. Aperta a ponta (reservatório) para tirar o ar antes de colocar no pénis ereto.
4. Desenrola até à base do pénis — deve ficar justo mas não apertado.
5. Usa lubrificante à base de água (nunca vaselina ou óleos — destroem o látex).

Após a ejaculação:
6. Segura a base do preservativo enquanto retiras o pénis (antes de este perder a ereção).
7. Retira com cuidado, vira o preservativo e elimina no lixo (nunca no sanita).

Erros comuns a evitar:
- Colocar o preservativo do lado errado e depois virar — pode transferir fluidos. Usa um novo.
- Não apertar a ponta — fica ar preso e o preservativo pode rebentar.
- Usar dois preservativos ao mesmo tempo — o atrito entre eles faz rasgar.`
      }
    ]
  },
  {
    id: "sexualidade-prazer",
    title: "Sexualidade e Prazer",
    slug: "sexualidade-prazer",
    description: "Informação honesta sobre o teu corpo e prazer",
    icon: "💫",
    audience: "jovens",
    articles: [
      {
        id: "masturbacao",
        title: "Masturbação: é normal?",
        category: "Saúde Sexual",
        content: `A masturbação é uma prática normal e saudável que a maioria das pessoas faz em alguma altura da vida. É uma forma de conhecer o teu corpo, descobrir o que te dá prazer e aliviar tensão.

O que deves saber:
- Não causa doenças, infertilidade, cegueira ou problemas mentais — esses são mitos antigos sem qualquer base científica.
- Não há uma frequência "certa" ou "errada". Cada pessoa é diferente.
- É uma atividade privada e pessoal — ninguém tem o direito de te envergonhar por isso.
- Se sentires que interfere com o teu dia-a-dia (estudos, relações, atividades), pode ser útil falar com um profissional de saúde.

A masturbação também é uma forma segura de explorar a sexualidade sem riscos de gravidez ou IST.`
      },
      {
        id: "prazer-sexual",
        title: "Prazer Sexual: o que ninguém te ensina",
        category: "Educação",
        content: `O prazer sexual é uma parte natural da sexualidade, mas raramente se fala dele de forma aberta e honesta.

Pontos importantes:
- O prazer não é apenas físico — envolve também a mente, as emoções e a conexão com a outra pessoa (ou contigo mesmo).
- Cada corpo é diferente: o que funciona para uma pessoa pode não funcionar para outra. A comunicação é essencial.
- O clitóris tem mais de 8.000 terminações nervosas e é o principal órgão do prazer feminino — a penetração sozinha não é suficiente para a maioria das mulheres.
- O prazer masculino não se resume à ejaculação — explorar outras zonas erógenas enriquece a experiência.
- A excitação não é linear — há alturas em que o corpo responde mais e outras em que não. Isso é normal.
- O consentimento e o prazer andam de mãos dadas: uma relação sexual sem consentimento não tem prazer, tem violência.`
      },
      {
        id: "corpo-resposta-sexual",
        title: "O Corpo e a Resposta Sexual",
        category: "Anatomia",
        content: `A resposta sexual do corpo segue habitualmente 4 fases (modelo de Masters e Johnson):

1. Excitação: O fluxo sanguíneo aumenta para os órgãos genitais. O pénis endurece (ereção), a vagina lubrifica-se e o clitóris incha. A frequência cardíaca e a respiração aumentam.

2. Platô: A excitação atinge o ponto mais alto. O corpo prepara-se para o orgasmo. A tensão muscular e sexual aumenta.

3. Orgasmo: Libertação súbita da tensão sexual. Contrações musculares rítmicas nos órgãos genitais. Sensação intensa de prazer. Nem toda a gente atinge o orgasmo sempre — e isso é normal.

4. Resolução: O corpo regressa ao estado de repouso. Os homens costumam ter um "período refratário" (tempo antes de poder ter outra ereção). As mulheres podem ser capazes de ter múltiplos orgasmos seguidos.

Importante: Estas fases não são uma regra rígida. Cada pessoa, e cada experiência, é diferente.`
      },
      {
        id: "pornografia-vs-realidade",
        title: "Pornografia vs. Realidade: o que precisas de saber",
        category: "Alerta",
        content: `A pornografia é entretenimento, não educação sexual. Aqui estão as principais diferenças entre o que vês e a realidade:

Corpos:
- Porno: Corpos "perfeitos", pénis grandes, seios implantados, sem pelos.
- Realidade: Corpos de todos os tamanhos e formas, com pelos, imperfeições e individualidade.

Desempenho:
- Porno: Atos que duram muito tempo, posições acrobáticas, ereções constantes.
- Realidade: A duração média da penetração é de 5-7 minutos; posições desconfortáveis não são prazerosas; ereções vão e vêm.

Consentimento:
- Porno: Raramente se pede consentimento. Tudo parece "automático".
- Realidade: O consentimento é essencial, explícito e contínuo. Comunicação antes, durante e depois.

Prazer feminino:
- Porno: A mulher atinge o orgasmo facilmente apenas com penetração.
- Realidade: Cerca de 70-80% das mulheres precisam de estimulação clitoridiana direta para atingir o orgasmo.

O que fazer: Usar a pornografia como entretenimento é uma escolha pessoal, mas nunca a uses como guia de como a sexualidade funciona na vida real. A educação sexual de qualidade é a melhor ferramenta.`
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
      },
      {
        id: "perguntas-dificeis",
        title: "Respostas a Perguntas Difíceis das Crianças",
        category: "Pedagogia",
        content: `As crianças fazem perguntas que podem surpreender. O importante é responder com honestidade e calma:

"De onde vêm os bebés?"
- 3-5 anos: "Um bebé cresce dentro da barriga da mãe, numa zona chamada útero."
- 6-9 anos: "O pai contribui com uma célula (espermatozoide) e a mãe com outra (óvulo). Juntam-se e formam um bebé."
- 10+ anos: Podes explicar o processo reprodutivo com mais detalhe científico.

"O que é o sexo?"
- Responde de forma simples e adequada à idade: "É uma forma de intimidade entre adultos que também pode criar um bebé."

"Porque é que o meu corpo é diferente do do meu amigo?"
- "Cada pessoa é única. Os corpos são diferentes tal como as caras — e isso é normal e bonito."

Regras de ouro:
- Não mentir. Se não souberes, diz "Vou pesquisar e depois respondo."
- Não rir da pergunta. Se rires, a criança vai aprender que não deve perguntar.
- Responde só ao que foi perguntado — não dês mais informação do que a criança pediu.`
      },
      {
        id: "ambiente-confianca",
        title: "Como Criar um Ambiente de Confiança em Casa",
        category: "Pedagogia",
        content: `Para que as crianças e jovens falem abertamente sobre sexualidade, precisam de sentir que o ambiente em casa é seguro:

1. Seja abordável: Mostre que está disponível para conversar sem julgamentos.
2. Não reaja com choque: Se a criança partilhar algo que a surpreende, mantenha a calma. Uma reação negativa fecha a comunicação.
3. Normalize o tema: Falar sobre o corpo, sentimentos e relações deve ser tão normal como falar sobre a escola ou o jantar.
4. Respeite a privacidade: A partir da pré-adolescência, bata à porta antes de entrar no quarto.
5. Não force conversas: Esteja disponível, mas não pressionar. O diálogo acontece naturalmente quando há confiança.
6. Seja o exemplo: Trate o seu parceiro/a com respeito — as crianças aprendem pelo que veem.`
      },
      {
        id: "linguagem-correta",
        title: "A Importância da Linguagem Correta (Nomes Anatómicos)",
        category: "Pedagogia",
        content: `Usar os nomes anatómicos corretos (vulva, pénis, testículos, vagina, útero) em vez de eufemismos ("pássaro", "pilinha", "coiso") é fundamental por várias razões:

1. Proteção: Se uma criança disser "o senhor tocou na minha vulva", um adulto entende imediatamente o que aconteceu. Se disser "tocou no meu pilinha", pode haver mal-entendidos.

2. Reduz a vergonha: Quando usamos nomes corretos desde cedo, as crianças crescem sem sentir que essas partes do corpo são "tabu" ou "sujas".

3. Comunicação médica: Em caso de dor ou problema de saúde, a criança consegue explicar exatamente o que sente e onde.

4. Respeito pelo corpo: Usar os nomes certos ensina que todas as partes do corpo merecem respeito — não há partes de que envergonhar.`
      },
      {
        id: "filhos-internet",
        title: "Filhos e Internet: Como Proteger sem Espiar",
        category: "Proteção",
        content: `Equilibrar a proteção com a privacidade do jovem é um desafio. Algumas orientações:

1. Eduque antes de controlar: Explique os riscos (grooming, cyberbullying, conteúdo inapropriado) e ensine o que fazer se algo correr mal.

2. Acordem regras juntos: Em vez de impor, negoceie. Ex: "Não partilhas fotos íntimas" / "Se alguém te incomoda online, diz-me."

3. Use ferramentas de controlo parental com transparência: Não espie secretamente. Diga ao jovem que usa filtros e explique porquê.

4. Respeite a privacidade progressiva: Um adolescente de 15 anos precisa de mais privacidade do que uma criança de 9. Adapte.

5. Mantenha o diálogo: A melhor proteção é um jovem que se sente à vontade para contar se algo correu mal online.

6. Saiba os sinais de alerta: O jovem esconde o ecrã quando se aproxima, fica ansioso após usar o telemóvel, tem amigos online desconhecidos.`
      },
      {
        id: "falar-pornografia",
        title: "Como Falar de Pornografia com os Filhos",
        category: "Educação",
        content: `A maioria dos jovens já viu pornografia antes dos 15 anos. Ignorar isto não vai fazer desaparecer. Falar abertamente é essencial:

Como abordar:
- Não entre em pânico e não castigue. Ver pornografia é comum e não significa que o jovem tenha um problema.
- Aborde o tema naturalmente: "Sabemos que há conteúdo sexual online. Se alguma vez vires algo que te confunde, podes falar connosco."
- Seja direto(a) sobre as diferenças entre pornografia e realidade (consentimento, corpos, prazer real vs. encenado).

Mensagens-chave a transmitir:
- A pornografia NÃO é educação sexual — é entretenimento encenado.
- Os corpos na pornografia não representam a maioria das pessoas.
- O consentimento, o respeito e a comunicação não aparecem na pornografia, mas são essenciais na vida real.
- Não há problema em ter curiosidade — mas é importante ter informação de qualidade para distinguir fantasia de realidade.`
      },
      {
        id: "orientacao-filho",
        title: "Orientação Sexual do Filho: Como Reagir e Apoiar",
        category: "Apoio",
        content: `Se o seu filho(a) partilhar a orientação sexual ou identidade de género, a sua reação tem um impacto enorme no bem-estar dele(a):

O que FAZER:
- Dizer "Obrigado por partilhares comigo" ou "Eu amo-te independentemente do que me contas."
- Ouvir sem interromper.
- Perguntar como pode apoiar.
- Respeitar o nome e os pronomes que a pessoa prefere.
- Procurar informação (ILGA Portugal, Opus Diversidades).

O que NÃO FAZER:
- Não diga "É só uma fase" — mesmo que seja, a experiência atual é real.
- Não diga "Eu sempre soube" — pode ser invalidante.
- Não conte a outros sem permissão — o coming out é da pessoa.
- Não tente "converter" ou "curar" — a orientação/identidade não é uma doença.
- Não compare com outros: "O teu primo também é gay" não é útil.

Impacto: Estudos mostram que jovens LGBTQI+ com famílias aceitantes têm 40% menos risco de depressão e tentativas de suicídio. A sua aceitação pode salvar a vida do seu filho(a).`
      }
    ]
  },
  {
    id: "educacao-sexual-escola",
    title: "Educação Sexual na Escola",
    slug: "educacao-sexual-escola",
    description: "O que diz a lei e como funciona na prática",
    icon: "🏫",
    audience: "adultos",
    articles: [
      {
        id: "lei-educacao-sexual",
        title: "O que Diz a Lei sobre Educação Sexual em Portugal",
        category: "Lei",
        content: `A educação sexual é obrigatória nas escolas portuguesas desde 2001:

- Lei n.º 129/99 (alterada pela Lei n.º 60/2002): Estabelece o regime jurídico da educação sexual nas escolas.
- É obrigatória no ensino básico e secundário.
- Deve ser ministrada de forma integrada, transversal e adaptada à idade.
- As escolas devem elaborar um Projeto de Educação Sexual em parceria com a comunidade educativa.

O que a lei prevê:
- A educação sexual não se limita à biologia — aborda também afetos, relações, igualdade de género e prevenção de violência.
- Os pais podem acompanhar o projeto da escola mas NÃO podem impedir a participação do filho(a).
- A escola deve informar os pais sobre o conteúdo programático.`
      },
      {
        id: "curriculo-dge",
        title: "Educação Sexual no Currículo: Orientações da DGE",
        category: "Pedagogia",
        content: `A Direção-Geral da Educação (DGE) publicou orientações para a educação sexual nas escolas:

Áreas temáticas por ciclo:
- 1.º ciclo (1.-4.º ano): Diferenças entre corpos, regras de privacidade, diversidade familiar.
- 2.º ciclo (5.-6.º ano): Puberdade, higiene, relações saudáveis, prevenção de abuso.
- 3.º ciclo (7.-9.º ano): Contracepção, IST, consentimento, identidade de género, orientação sexual.
- Secundário (10.-12.º ano): Relações íntimas, sexualidade responsável, direitos sexuais e reprodutivos, literacia mediática.

A DGE disponibiliza recursos em: dge.mec.pt

O desafio: Muitas escolas não cumprem integralmente a lei por falta de formação dos docentes ou por resistência interna. Os pais podem e devem exigir o cumprimento.`
      },
      {
        id: "professores-abordagem",
        title: "Como os Professores Podem Abordar o Tema",
        category: "Pedagogia",
        content: `Para os professores que implementam educação sexual, aqui vão dicas práticas:

1. Crie um ambiente seguro: Estabeleça regras — sem risadas, sem gozos, respeito mútuo. As perguntas são sempre válidas.

2. Use a "caixa de perguntas": Os alunos escrevem perguntas anonimamente num papel e depositam numa caixa. Isto permite responder a dúvidas que teriam vergonha de fazer em voz alta.

3. Adapte a linguagem: Use termos científicos mas acessíveis. Evite jargão.

4. Seja inclusivo: Não assuma que todos os alunos são heterossexuais ou cisgénero. Use linguagem inclusiva.

5. Conheça os seus limites: Se uma pergunta envolve assuntos fora da sua formação, encaminhe para o profissional adequado (psicólogo, enfermeiro).

6. Evite o medo: Não use mensagens de terror ("Se não usares preservativo, vais morrer"). Eduque de forma positiva e informada.

7. Recursos: A DGE e a APF disponibilham materiais pedagógicos gratuitos.`
      },
      {
        id: "recursos-pedagogicos",
        title: "Recursos Pedagógicos para Educadores",
        category: "Recursos",
        content: `Recursos gratuitos para educação sexual em Portugal:

Instituições:
- DGE (dge.mec.pt): Orientações curriculares, guiões de sessão e materiais.
- APF (apf.pt): Manuais, jogos e workshops para escolas.
- DGS (dgs.pt): Guias de saúde sexual e reprodutiva.
- OMS (who.int): Diretrizes internacionais de educação sexual.

Materiais disponíveis:
- Guiões de sessão estruturados por idade.
- Jogos de role-play para praticar o consentimento.
- Fichas de trabalho sobre contracepção e IST.
- Vídeos educativos curtos.
- Posters para a sala de aula.

Plataformas online:
- SexoComCiência (APF): Informação validada cientificamente.
- Escola de Sexualidade (DGE): Plataforma de recursos para docentes.`
      },
      {
        id: "atividades-sala-aula",
        title: "Atividades e Dinâmicas de Grupo para a Sala de Aula",
        category: "Pedagogia",
        content: `Atividades práticas para educação sexual na sala de aula:

1. Caixa de Perguntas Anónimas: Os alunos escrevem dúvidas em papeis e colocam numa caixa. O professor responde de forma informativa e sem julgamento.

2. Verdadeiro ou Falso: Apresentar afirmações ("A masturbação causa cegueira", "A pílula protege de IST") e os alunos debatem antes de revelar a resposta.

3. Role-Play do Consentimento: Simular situações em que se pede e dá (ou não) consentimento. Discutir em grupo como cada pessoa se sentiu.

4. Linha do Continuum: Colocar afirmações numa linha de "Concordo totalmente" a "Discordo totalmente" (ex: "Se amas alguém, fazes tudo o que a pessoa quer"). Os alunos posicionam-se e justificam.

5. Análise de Mídia: Comparar imagens de redes sociais vs. realidade, ou cenas de séries/filmes — discutir o que é real e o que é ficção.

6. Mapa de Recursos: Os alunos investigam e criam um mapa com os recursos de saúde sexual disponíveis na sua zona (centros de saúde, APF, linhas de apoio).`
      }
    ]
  },
  {
    id: "protecao-prevencao",
    title: "Proteção e Prevenção",
    slug: "protecao-prevencao",
    description: "Prevenir o abuso e proteger as crianças",
    icon: "🛡️",
    audience: "adultos",
    articles: [
      {
        id: "identificar-abuso",
        title: "Como Identificar Sinais de Abuso Sexual em Crianças",
        category: "Proteção",
        content: `O abuso sexual infantil é mais comum do que se pensa e, na maioria dos casos, o agressor é alguém conhecido da criança (familiar, amigo, professor). Estar atento é essencial:

Sinais comportamentais:
- Mudanças súbitas de humor (agressividade, isolamento, medo).
- Regressões (voltar a fazer chichi na cama, chuchar o dedo).
- Conhecimento sexual desadequado para a idade.
- Medo ou relutância em ficar com uma pessoa específica.
- Pesadelos frequentes, dificuldade em dormir.
- Desempenho escolar a cair subitamente.

Sinais físicos:
- Dor, vermelhidão ou feridas na zona genital.
- Infeções urinárias recorrentes.
- Dificuldade em sentar-se ou caminhar.
- Roupa interior manchada ou rasgada.

Importante: Estes sinais podem ter outras causas. Não acuse sem provas, mas não ignore — investigue com profissionais.`
      },
      {
        id: "o-que-fazer-abuso",
        title: "O que Fazer se Suspeitar de Abuso",
        category: "Proteção",
        content: `Se suspeita de abuso sexual de uma criança, aja com urgência mas com cuidado:

Passos a seguir:
1. Oua a criança: Se ela disser algo, ouça sem interromper, sem pressionar e sem fazer perguntas que sugiram a resposta.
2. Não lave roupas ou o corpo da criança: Pode destruir provas.
3. Registe o que a criança disse: Use as palavras exatas dela, sem interpretar.
4. Contacte as autoridades:
   - PSP ou GNR (emergência: 112)
   - CPCJ (Comissão de Proteção de Crianças e Jovens)
   - APAV: 800 200 2200 (gratuito)
   - SOS Criança: 116 111
5. Procure apoio médico: Leve a criança ao hospital para avaliação.

O que NÃO fazer:
- Não confronte o alegado agressor diretamente.
- Não faça a criança repetir a história múltiplas vezes (é traumatizante).
- Não prometa o que não pode cumprir ("Vais ver que tudo fica bem").
- Não guarde silêncio para "proteger a família" — proteja a criança.`
      },
      {
        id: "grooming-online-reconhecer",
        title: "Grooming Online: Como Reconhecer Predadores",
        category: "Proteção",
        content: `Grooming é o processo pelo qual um adulto manipula uma criança ou jovem online para obter confiança e, posteriormente, abusar sexualmente dela.

Sinais de grooming:
- O adulto faz-se passar por jovem (usa foto de adolescente).
- Demonstra muito interesse e atenção (elogios constantes, presentes online).
- Pede segredo: "Não contes aos teus pais sobre nós."
- Pede fotos progressivamente mais íntimas (começa por fotos normais).
- Usa chantagem emocional: "Se não me enviares isso, digo a toda a gente o que me contaste."
- Isola a vítima dos amigos e família.

Como prevenir:
- Fale com os filhos sobre o grooming de forma adequada à idade.
- Ensine: "Na internet, as pessoas podem não ser quem dizem ser."
- Incentive: "Se alguém te pede segredos ou fotos, conta logo."
- Mantenha o diálogo aberto — a criança precisa de saber que pode pedir ajuda sem ser castigada.`
      },
      {
        id: "regras-seguranca-corporal",
        title: "Ensinar Regras de Segurança Corporal às Crianças",
        category: "Proteção",
        content: `Desde cedo, as crianças podem aprender regras simples de segurança corporal:

As 5 regras de segurança do corpo:
1. O meu corpo é MEU — ninguém toca nas minhas partes privadas sem razão de saúde.
2. Digo NÃO se algo me deixa desconfortável — mesmo a um adulto.
3. Os segredos sobre o meu corpo são MAUS — conto sempre a um adulto de confiança.
4. Se a primeira pessoa não me ajudar, conto a OUTRA — até alguém me ouvir.
5. Nunca é CULPA minha se alguém me magoa.

Como ensinar:
- Use os nomes corretos das partes do corpo (vulva, pénis) — retira o estigma.
- Pratique cenários: "O que fazes se alguém te pede um segredo sobre o teu corpo?"
- Crie uma lista de "adultos de confiança" com a criança (3-5 pessoas).
- Repita as regras regularmente — uma conversa não chega.
- Livros infantis sobre o tema podem ajudar (ex: "O Meu Corpo é Meu").`
      },
      {
        id: "linhas-apoio-instituicoes",
        title: "Linhas de Apoio e Instituições em Portugal",
        category: "Recursos",
        content: `Se precisa de ajuda ou informação, existem recursos gratuitos em Portugal:

Linhas de Apoio (gratuitas e anónimas):
- APAV (Apoio à Vítima): 800 200 2200
- SOS Criança: 116 111
- Linha Emergência Social: 144
- Linha de Apoio à Mulher Vítima de Violência: 800 200 219
- Emergência: 112

Instituições:
- APF (Associação para o Planeamento da Família): Consultas, contracepção, aconselhamento.
- ILGA Portugal: Apoio à comunidade LGBTQI+.
- Opus Diversidades: Apoio LGBTQI+ e saúde mental.
- Panteras Rosa: Direitos LGBTQI+.
- CPCJ (Comissão de Proteção de Crianças e Jovens): Proteção de menores.
- CASO: Centro de Atendimento a Vítimas de Abuso Sexual.

Serviços de Saúde:
- Centros de Saúde (SNS): Planeamento familiar, rastreios, consultas jovens.
- Consultas Jovens: Atendimento específico para adolescentes.
- Gabinetes de Apoio ao Estudante: Nas escolas.`
      }
    ]
  },
  {
    id: "sexualidade-vida",
    title: "Sexualidade ao Longo da Vida",
    slug: "sexualidade-vida",
    description: "A sexualidade muda, mas não desaparece",
    icon: "🌿",
    audience: "adultos",
    articles: [
      {
        id: "sexualidade-gravidez",
        title: "Sexualidade na Gravidez",
        category: "Saúde",
        content: `A sexualidade durante a gravidez é segura na maioria dos casos, mas passa por mudanças naturais:

O que é normal:
- Variação do desejo: Algumas mulheres sentem mais desejo (devido ao aumento de fluxo sanguíneo pélvico), outras sentem menos (náuseas, cansaço, medo).
- Mudanças físicas: Seios mais sensíveis, maior lubrificação vaginal ou, pelo contrário, secura.
- O bebé NÃO é afetado pela relação sexual — está protegido pelo útero, pelo líquido amniótico e pelo tampão mucoso.

Quando evitar relações sexuais:
- Hemorragia vaginal de causa não esclarecida.
- Risco de parto prematuro.
- Placenta prévia.
- Rotura prematura das membranas.
- O médico pode aconselhar repouso sexual em situações específicas.

Dica: Comuniquem abertamente. Há muitas formas de intimidade além da penetração.`
      },
      {
        id: "sexualidade-pos-parto",
        title: "Sexualidade Após o Parto",
        category: "Saúde",
        content: `O retorno à atividade sexual após o parto varia muito de mulher para mulher:

O que esperar:
- O período de recuperação médico é geralmente de 4-6 semanas (até o loquio terminar e a cicatrização estar completa).
- O desejo pode demorar a regressar — a fadiga, as hormonas e a adaptação ao bebé são fatores.
- Secura vaginal é comum (especialmente se amamentar — a prolactina reduz o estrogénio).
- Possível dor na primeira relação após o parto — use lubrificante e vá devagar.

Recomendações:
- Não tenham pressa. Cada casal tem o seu tempo.
- Experimentem outras formas de intimidade (massagens, carícias) enquanto a penetração não é confortável.
- Usem contraceção — a amamentação NÃO é um método contracetivo fiável.
- Se a dor persistir após 6 semanas, consulte o médico.`
      },
      {
        id: "menopausa-sexualidade",
        title: "Menopausa e Sexualidade",
        category: "Saúde",
        content: `A menopausa (habitualmente entre os 45 e os 55 anos) traz mudanças que podem afetar a sexualidade:

Mudanças comuns:
- Secura vaginal: A diminuição do estrogénio reduz a lubrificação natural. Lubrificantes e cremes de estrogénio local podem ajudar muito.
- Redução do desejo: As mudanças hormonais podem diminuir a libido.
- Alterações de humor e autoestima: As mudanças no corpo podem afetar a autoimagem.
- Dor durante a relação: Devido à secura e ao adelgaçamento da parede vaginal.

O que ajuda:
- Lubrificantes à base de água ou silicone.
- Terapia hormonal (conversar com o médico sobre riscos e benefícios).
- Comunicação com o parceiro(a).
- Atividade sexual regular — "usa-se ou perde-se" aplica-se parcialmente: a atividade sexual mantém a elasticidade e lubrificação.
- Consulta de ginecologia para avaliação individualizada.`
      },
      {
        id: "sexualidade-terceira-idade",
        title: "Sexualidade na Terceira Idade",
        category: "Saúde",
        content: `A sexualidade não tem data de validade. Muitas pessoas continuam a ter uma vida sexual ativa e satisfatória após os 60, 70 e 80 anos.

Mudanças naturais:
- Homens: Ereções podem demorar mais a conseguir e ser menos firmes. O período refratário é mais longo.
- Mulheres: Menos lubrificação e alterações na elasticidade vaginal.
- Ambos: O desejo pode ser diferente — menos urgente, mas não menos genuíno.

Desafios comuns:
- Doenças crónicas (diabetes, hipertensão) e medicações que afetam a função sexual.
- Perda do parceiro(a) — luto e solidão.
- Estigma social: "Idosos não fazem sexo" — é um preconceito.
- Menor privacidade em lares de idosos.

O que ajuda:
- Consulta médica: Muitos problemas têm solução (medicação para disfunção erétil, lubrificantes, terapia hormonal).
- Comunicação com o parceiro(a) ou profissional de saúde.
- Adaptar as expectativas: A sexualidade pode ser diferente mas continua prazerosa.`
      },
      {
        id: "desejo-muda",
        title: "Quando o Desejo Muda: Fatores Físicos e Emocionais",
        category: "Saúde",
        content: `A variação do desejo sexual ao longo da vida é normal. No entanto, uma mudança significativa e persistente pode ter causas identificáveis:

Fatores físicos:
- Hormonais: Menopausa, pós-parto, problemas na tiroide.
- Medicação: Antidepressivos (SSRIs), anti-hipertensivos, contracetivos orais.
- Doenças: Diabetes, doenças cardiovasculares, depressão.
- Substâncias: Álcool, tabaco e drogas podem afetar o desejo e a função sexual.

Fatores emocionais:
- Stress (trabalho, finanças, família).
- Problemas na relação (conflitos não resolvidos, falta de comunicação).
- Baixa autoestima ou imagem corporal negativa.
- Traumas passados (abuso, relações anteriores tóxicas).

O que fazer:
- Consulte um médico para descartar causas físicas.
- Reveja a medicação com o médico (pode haver alternativas).
- Considere terapia individual ou de casal.
- Fale abertamente com o parceiro(a) — o silêncio é o maior inimigo da intimidade.
- Não se culpe — as flutuações do desejo são parte da vida.`
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
  },
  {
    question: "O tamanho do pénis importa?",
    answer: "Não. A maioria das mulheres atinge o orgasmo através da estimulação do clitóris (parte externa), não pela penetração profunda. A comunicação, o respeito e a atenção ao prazer do parceiro são muito mais importantes do que qualquer medida."
  },
  {
    question: "É possível engravidar durante a menstruação?",
    answer: "Sim, embora seja menos provável. Os espermatozoides podem sobreviver no corpo até 5 dias, e se ovulares cedo, a fertilização é possível. Além disso, o que parece menstruação pode ser sangramento de ovulação. Por isso, use sempre proteção."
  },
  {
    question: "A pílula do dia seguinte faz mal se tomar muitas vezes?",
    answer: "Não é abortiva nem causa danos permanentes, mas não deve ser usada como método regular. Tomá-la repetidamente pode causar irregularidades no ciclo menstrual e é menos eficaz que a contraceção regular. Se precisas frequentemente, consulta um médico sobre métodos contracetivos adequados para ti."
  },
  {
    question: "Como falar com os meus pais sobre sexualidade?",
    answer: "Escolhe um momento calmo, sem pressa. Podes começar com algo como 'Tenho algumas dúvidas sobre...' ou usar um programa de TV ou notícia como desculpa para iniciar a conversa. Se não te sentes confortável com os teus pais, fala com um professor, enfermeiro do escola ou outro adulto de confiança."
  },
  {
    question: "Onde posso fazer um teste de gravidez grátis?",
    answer: "Nos Centros de Saúde do SNS (Serviço Nacional de Saúde) podes fazer um teste de gravidez gratuito. Também nas consultas de Planeamento Familiar e na APF. Testes de farmácia são acessíveis (a partir de ~5€) e fiáveis a partir do primeiro dia de atraso da menstruação."
  },
  {
    question: "É normal ter fantasias sexuais?",
    answer: "Sim, é completamente normal. As fantasias sexuais são uma parte natural da sexualidade e não significam que queiras vivê-las na realidade. Ter fantasias não te torna uma pessoa 'estranha' ou 'perigosa' — é algo que a maioria das pessoas experiencia."
  },
  {
    question: "A pornografia representa a realidade?",
    answer: "Não. A pornografia é entretenimento encenado, com atores profissionais, edição de vídeo e atos planeados. Não mostra consentimento real, corpos médios, diálogo honesto nem o prazer real (especialmente feminino). Usar pornografia como educação sexual é como aprender a conduzir vendo filmes de ação — não reflete a realidade."
  },
  {
    question: "A orientação sexual pode mudar ao longo da vida?",
    answer: "Sim, pode. A sexualidade é fluida e algumas pessoas notam mudanças na sua atração ao longo dos anos. Isso não significa que a orientação anterior era 'falsa' — significa que descobriram algo novo sobre si mesmas. Cada experiência é válida."
  },
  {
    question: "Onde encontrar apoio se sou LGBTQI+?",
    answer: "Em Portugal, existem várias organizações: ILGA Portugal (apoio psicológico e jurídico), Opus Diversidades, Panteras Rosa, GRES e a APF. Também podes contactar a Linha do Arco-Íris. Nenhuma destas linhas requer identificação e são gratuitas."
  },
  {
    question: "A que idade devo começar a falar sobre sexualidade com o meu filho?",
    answer: "Desde cedo! Aos 2-3 anos, pode usar os nomes anatómicos corretos. Aos 3-5, falar de privacidade e limites corporais. A educação sexual é um processo gradual que acompanha o desenvolvimento da criança — não uma 'conversa' única na adolescência."
  },
  {
    question: "Se eu falar de sexo, não vai estimular o meu filho a experimentar?",
    answer: "Não. Estudos internacionais (OMS, UNESCO, OMS) demonstram que a educação sexual de qualidade NÃO adianta o início da atividade sexual. Pelo contrário: jovens informados tendem a iniciar mais tarde, com mais proteção e melhores decisões."
  },
  {
    question: "O meu filho brinca com os órgãos genitais. É normal?",
    answer: "Sim, é completamente normal em crianças pequenas. A exploração do corpo é uma fase natural do desenvolvimento. Não deve castigar ou envergonhar a criança — simplesmente redirecione a atenção para outra atividade e explique que isso se faz em privado."
  },
  {
    question: "Como explicar de onde vêm os bebés a uma criança?",
    answer: "Adapte à idade: aos 3-5 anos, 'O bebé cresce na barriga da mãe.' Aos 6-9, 'Um óvulo da mãe e um espermatozoide do pai juntam-se.' Aos 10+, pode explicar o processo com mais detalhe científico. Seja honesto mas não dê mais informação do que a criança pediu."
  },
  {
    question: "O que fazer se a criança diz que foi tocada?",
    answer: "Oua sem interromper, acredite na criança, não a culpe. Diga 'Obrigado por me contares' e 'Não foi culpa tua.' Contacte as autoridades (PSP/GNR), a CPCJ ou a APAV (800 200 2200). Não lave a criança ou as roupas — pode destruir provas. Não confronte o alegado agressor."
  },
  {
    question: "Como saber a minha orientação sexual?",
    answer: "Não há um teste. A orientação sexual é sobre quem te atrai emocional, romântica e/ou sexualmente. Pode demorar tempo a descobrir — e pode mudar. Não te pressiones para te rotularares. Explorar, questionar e experimentar são processos normais. Se precisares de apoio, fala com alguém de confiança ou contacta a ILGA Portugal."
  },
  {
    question: "Como fazer coming out para a família?",
    answer: "Não há uma forma 'certa'. Faz no teu tempo, quando te sentires seguro(a). Pode ajudar: escolher um momento calmo; começar com uma pessoa de confiança; ter um plano de segurança (onde ficar se a reação for negativa). Prepara-te para perguntas, mas não te sintas obrigado(a) a responder a tudo. Se precisares de apoio antes ou depois, a ILGA Portugal e a Linha do Arco-Íris estão disponíveis."
  },
  {
    question: "Será que a minha orientação é 'só uma fase'?",
    answer: "A orientação sexual pode ser fluida e evoluir ao longo da vida — mas isso não significa que o que sentes agora não é real. Mesmo que mude no futuro, os teus sentimentos atuais são válidos e merecem respeito. Não precises de justificar a tua orientação a ninguém."
  }
];

export interface Guide {
  id: string;
  title: string;
  description: string;
  icon: string;
  audience: "criancas" | "jovens" | "adultos" | "todos";
  sections: { heading: string; body: string }[];
}

export const guides: Guide[] = [
  {
    id: "guia-pais-conversar",
    title: "Guia para Pais: Como Falar de Sexualidade",
    description: "Um guia prático para iniciar conversas sobre sexualidade com os teus filhos, adaptado a cada idade.",
    icon: "👨‍👩‍👧‍👦",
    audience: "adultos",
    sections: [
      {
        heading: "Por onde começar?",
        body: "Não esperes pela pergunta perfeita. A educação sexual começa cedo: nomes corretos das partes do corpo aos 2-3 anos, limites e consentimento aos 4-5, reprodução aos 6-8. O importante é criar um ambiente onde a criança se sinta segura para perguntar.\n\nDica: Usa oportunidades do dia a dia — uma cena de série, uma notícia, uma pergunta inesperada — para iniciar a conversa de forma natural."
      },
      {
        heading: "Adapta a linguagem à idade",
        body: "3-5 anos: Nomes anatómicos corretos, toques bons vs. maus, quem pode tocar nas partes íntimas (só médico com pai/mãe presente).\n\n6-9 anos: De onde vêm os bebés (adaptado), puberdade (brevemente), diferenças entre famílias.\n\n10-12 anos: Puberdade em detalhe, menstruação, consentimento, segurança online.\n\n13+: Contracepção, IST, relações saudáveis, pornografia vs. realidade, orientação sexual e identidade de género."
      },
      {
        heading: "O que NÃO fazer",
        body: "— Não mentir ou inventar histórias ('os bebés vêm da cegonha').\n— Não envergonhar a criança por perguntar.\n— Não ignorar perguntas — se não sabes a resposta, diz 'Vou pesquisar e depois falamos.'\n— Não usar a conversa como interrogatório.\n— Não assumir a orientação sexual do teu filho."
      },
      {
        heading: "Recursos em Portugal",
        body: "— APF (apf.pt): Consultas de planeamento familiar, materiais pedagógicos.\n— DGE (dge.mec.pt): Guias curriculares para educação sexual nas escolas.\n— DGS (dgs.pt): Informação de saúde sexual.\n— Linha Criança: 116 111 (grátis).\n— APAV: 800 200 2200 (apoio vítimas)."
      }
    ]
  },
  {
    id: "guia-professores-sala-aula",
    title: "Guia para Professores: Educação Sexual na Sala de Aula",
    description: "Estratégias e atividades para abordar a educação sexual de forma pedagógica e inclusiva.",
    icon: "📚",
    audience: "adultos",
    sections: [
      {
        heading: "O que diz a lei",
        body: "A educação sexual é obrigatória nas escolas portuguesas (Lei n.º 60/2013, alterada pela Lei n.º 115/2019). Deve ser lecionada de forma transversal ou em área disciplinar específica, com um mínimo de 6 sessões por ano.\n\nOs temas obrigatórios incluem: desenvolvimento humano, relações interpessoais, habilidades pessoais, saúde sexual e comportamento sexual."
      },
      {
        heading: "Criar um espaço seguro",
        body: "— Estabelecer regras de respeito: não há perguntas estúpidas, não se ri das dúvidas dos outros.\n— Usar a 'caixa de perguntas' anónimas para alunos mais tímidos.\n— Não forçar participação — observar é também aprender.\n— Garantir linguagem inclusiva (não assumir heterossexualidade ou identidade binária).\n— Informar sobre linhas de apoio no final de cada sessão."
      },
      {
        heading: "Atividades práticas",
        body: "1. Muro de Mitos — Escrever mitos comuns em post-its e debater cada um.\n2. Linha do Consentimento — Exercício com cenários: 'É consentimento?' (sim/não/talvez).\n3. Caixa de Perguntas — Alunos escrevem dúvidas anonimamente; professor responde na aula seguinte.\n4. Role-play — Simular situações de pressão de pares e estratégias de recusa.\n5. Quiz interativo — Usar plataformas como Kahoot com perguntas do EduSexual PT."
      },
      {
        heading: "Recursos pedagógicos",
        body: "— DGE: 'Educação para a Sexualidade' — guiões de sessões por ano de escolaridade.\n— APF: Manuais e fichas de trabalho gratuitos.\n— WHO/OMS: 'Standards for Sexuality Education in Europe' — enquadramento europeu.\n— Plataforma EduSexual PT — conteúdo adaptado por idade, quizzes e FAQ."
      }
    ]
  },
  {
    id: "guia-jovens-proteger",
    title: "Guia para Jovens: Como Proteger-te",
    description: "Tudo o que precisas de saber sobre contracepção, IST e consentimento num só guia.",
    icon: "🛡️",
    audience: "jovens",
    sections: [
      {
        heading: "Dupla proteção",
        body: "A dupla proteção significa usar preservativo (masculino ou feminino) PARA ALÉM de outro método contracetivo. Porquê?\n\n— Pílula/DIU/implante → previne gravidez, NÃO previne IST.\n— Preservativo → previne IST E gravidez (quando bem usado).\n\nA melhor combinação: preservativo + pílula/DIU/implante = proteção máxima."
      },
      {
        heading: "Consentimento em 4 pontos",
        body: "1. Entusiasta — Um 'sim' claro e querido, não um 'bem...' ou 'se queres...'.\n2. Informado — Saber o que vai acontecer, sem surpresas.\n3. Revogável — Podes mudar de ideia a qualquer momento, mesmo a meio.\n4. Mútuo — Todas as pessoas envolvidas têm de concordar.\n\nÁlcool/drogas invalidam o consentimento. Se a pessoa não consegue responder com clareza, é NÃO."
      },
      {
        heading: "IST: o que fazer",
        body: "— Faz rastreio pelo menos 1x por ano se tens vida sexual ativa.\n— Muitas IST não têm sintomas — só descobres com teste.\n— Locais grátis: Centro de Saúde, APF, consultas de planeamento familiar.\n— Se der positivo: não entres em pânico, a maioria trata-se. Fala com o médico e informa o(s) parceiro(s).\n— Vacina HPV: disponível no SNS para mulheres até 45 anos e homens até 26 (verificar critérios atuais)."
      },
      {
        heading: "Linhas de apoio",
        body: "— SNS 24: 808 200 204 (saúde).\n— APF: Consultas de planeamento familiar grátis.\n— Linha do Arco-Íris: apoio LGBTQI+.\n— APAV: 800 200 2200 (apoio vítimas de crime).\n— Voz de Apoio: 21 354 4090."
      }
    ]
  },
  {
    id: "guia-criancas-seguranca",
    title: "Guia para Crianças: As Regras da Segurança",
    description: "Regras simples para te manteres seguro e saberes quando pedir ajuda.",
    icon: "🦸",
    audience: "criancas",
    sections: [
      {
        heading: "As 5 regras do teu corpo",
        body: "1. O teu corpo é TEU — ninguém te pode tocar sem o teu permissão.\n2. As partes cobertas pelo fato de banho são PRIVADAS — só tu, os teus pais (para te lavar) ou o médico (com os teus pais presentes) podem ver ou tocar.\n3. Se alguém te pede para guardar um segredo que te deixa triste ou com medo — CONTA a um adulto de confiança.\n4. Dizer NÃO não é ser mal-educado — é proteger-te!\n5. Se alguém te faz sentir desconfortável, PODES sempre contar — nunca é culpa tua."
      },
      {
        heading: "Quando pedir ajuda",
        body: "Pede ajuda a um adulto de confiança quando:\n— Alguém te pede para fazer algo que te parece errado.\n— Alguém te ameaça ou te diz para não contares nada.\n— Sentes medo, tristeza ou confusão sobre algo que aconteceu.\n— Alguém na internet te pede fotos ou para te encontrares.\n\nAdultos de confiança: pais, professores, médicos, ou liga para a Linha Criança (116 111)."
      },
      {
        heading: "Segurança na internet",
        body: "— Nunca partilhes fotos tuas com desconhecidos.\n— Não digas onde moras ou onde estudas online.\n— Se alguém te pede segredos na internet — conta aos teus pais.\n— Podes sempre bloquear alguém que te incomoda.\n— O que está online pode ficar para sempre — pensa antes de publicar."
      },
      {
        heading: "Ligações importantes",
        body: "— Linha Criança: 116 111 (grátis, pode ligar de qualquer telemóvel).\n— SOS Criança: 21 793 1629.\n— Emergência: 112.\n— Fala sempre com um adulto de confiança — pais, professores, ou liga para estas linhas."
      }
    ]
  }
];
