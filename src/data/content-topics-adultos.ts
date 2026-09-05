import { Topic } from "./content-types";

export const topicsAdultos: Topic[] = [
  {
    id: "guia-pais",
    title: "Guia para Pais e Educadores",
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
      {id: "sinais-alerta",
        title: "Sinais de Alerta: Abuso Sexual",
        category: "Proteção",
        audioUrl: "/audio/MP3/sinais-alerta.mp3",

        content: `É fundamental estar atento a mudanças súbitas no comportamento da criança:
        - Pesadelos frequentes ou medo de dormir sozinho.
        - Comportamentos sexuais desadequados para a idade.
        - Isolamento ou medo de uma pessoa específica.
        - Regressões (voltar a fazer chichi na cama).
        
Mantenha sempre um canal de comunicação aberto e sem julgamentos.`
      },
      {id: "educacao-idade",
        title: "Educação Sexual por Idade",
        category: "Pedagogia",
        audioUrl: "/audio/MP3/educacao-idade.mp3",

        content: `A abordagem deve adaptar-se ao desenvolvimento da criança:
- 3-6 anos: Nomes das partes do corpo, privacidade e consentimento básico.
- 6-11 anos: Mudanças do corpo, diversidade familiar, higiene.
- 12+ anos: Puberdade, contraceção, IST, relações saudáveis.`
      },
      {id: "perguntas-dificeis",
        title: "Respostas a Perguntas Difíceis das Crianças",
        category: "Pedagogia",
        audioUrl: "/audio/MP3/perguntas-dificeis.mp3",

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
- Não rias da pergunta. Se rires, a criança vai aprender que não deve perguntar.
- Responde só ao que foi perguntado — não dês mais informação do que a criança pediu.`
      },
      {id: "ambiente-confianca",
        title: "Como Criar um Ambiente de Confiança em Casa",
        category: "Pedagogia",
        audioUrl: "/audio/MP3/ambiente-confianca.mp3",

        content: `Para que as crianças e jovens falem abertamente sobre sexualidade, precisam de sentir que o ambiente em casa é seguro:

1. Seja abordável: Mostre que está disponível para conversar sem julgamentos.
2. Não reaja com choque: Se a criança partilhar algo que a surpreende, mantenha a calma. Uma reação negativa fecha a comunicação.
3. Normalize o tema: Falar sobre o corpo, sentimentos e relações deve ser tão normal como falar sobre a escola ou o jantar.
4. Respeite a privacidade: A partir da pré-adolescência, bata à porta antes de entrar no quarto.
5. Não force conversas: Esteja disponível, mas não pressione. O diálogo acontece naturalmente quando há confiança.
6. Seja o exemplo: Trate o seu parceiro/a com respeito — as crianças aprendem pelo que veem.`
      },
      {id: "linguagem-correta",
        title: "A Importância da Linguagem Correta (Nomes Anatómicos)",
        category: "Pedagogia",
        audioUrl: "/audio/MP3/linguagem-correta.mp3",

        content: `Usar os nomes anatómicos corretos (vulva, pénis, testículos, vagina, útero) em vez de eufemismos ("pássaro", "pilinha", "coiso") é fundamental por várias razões:

1. Proteção: Se uma criança disser "o senhor tocou na minha vulva", um adulto entende imediatamente o que aconteceu. Se disser "tocou no meu pilinha", pode haver mal-entendidos.

2. Reduz a vergonha: Quando usamos nomes corretos desde cedo, as crianças crescem sem sentir que essas partes do corpo são "tabu" ou "sujas".

3. Comunicação médica: Em caso de dor ou problema de saúde, a criança consegue explicar exatamente o que sente e onde.

4. Respeito pelo corpo: Usar os nomes certos ensina que todas as partes do corpo merecem respeito — não há partes de que envergonhar.`
      },
      {id: "filhos-internet",
        title: "Filhos e Internet: Como Proteger sem Espiar",
        category: "Proteção",
        audioUrl: "/audio/MP3/filhos-internet.mp3",

        content: `Equilibrar a proteção com a privacidade do jovem é um desafio. Algumas orientações:

1. Eduque antes de controlar: Explique os riscos (grooming, cyberbullying, conteúdo inapropriado) e ensine o que fazer se algo correr mal.

2. Acordem regras juntos: Em vez de impor, negoceie. Ex: "Não partilhas fotos íntimas" / "Se alguém te incomoda online, diz-me."

3. Use ferramentas de controlo parental com transparência: Não espie secretamente. Diga ao jovem que usa filtros e explique porquê.

4. Respeite a privacidade progressiva: Um adolescente de 15 anos precisa de mais privacidade do que uma criança de 9. Adapte.

5. Mantenha o diálogo: A melhor proteção é um jovem que se sente à vontade para contar se algo correu mal online.

6. Saiba os sinais de alerta: O jovem esconde o ecrã quando se aproxima, fica ansioso após usar o telemóvel, tem amigos online desconhecidos.`
      },
      {id: "falar-pornografia",
        title: "Como Falar de Pornografia com os Filhos",
        category: "Educação",
        audioUrl: "/audio/MP3/falar-pornografia.mp3",

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
      {id: "orientacao-filho",
        title: "Orientação Sexual do Filho: Como Reagir e Apoiar",
        category: "Apoio",
        audioUrl: "/audio/MP3/orientacao-filho.mp3",

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
- Não conte a outros sem permissão — a partilha é da pessoa.
- Não tente "converter" ou "curar" — a orientação/identidade não é uma doença.
- Não compare com outros: "O teu primo também é gay" não é útil.

Impacto: Estudos mostram que jovens LGBTQI+ com famílias aceitantes têm 40% menos risco de depressão e tentativas de suicídio. A sua aceitação pode salvar a vida do seu filho(a).`
      },
    ]
  },
  {
    id: "educacao-sexual-escola",
    title: "Educação Sexual na Escola",
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
- Os pais podem acompanhar o projeto da escola mas NÃO podem impedir a participação do(a) filho(a).
- A escola deve informar os pais sobre o conteúdo programático.`
      },
      {id: "curriculo-dge",
        title: "Educação Sexual no Currículo: Orientações da DGE",
        category: "Pedagogia",
        audioUrl: "/audio/MP3/curriculo-dge.mp3",

        content: `A Direção-Geral da Educação (DGE) publicou orientações para a educação sexual nas escolas:

Áreas temáticas por ciclo:
- 1.º ciclo (1.-4.º ano): Diferenças entre corpos, regras de privacidade, diversidade familiar.
- 2.º ciclo (5.-6.º ano): Puberdade, higiene, relações saudáveis, prevenção de abuso.
- 3.º ciclo (7.-9.º ano): Contracepção, IST, consentimento, identidade de género, orientação sexual.
- Secundário (10.-12.º ano): Relações íntimas, sexualidade responsável, direitos sexuais e reprodutivos, literacia mediática.

A DGE disponibiliza recursos em: dge.mec.pt

O desafio: Muitas escolas não cumprem integralmente a lei por falta de formação dos docentes ou por resistência interna. Os pais podem e devem exigir o cumprimento.`
      },
      {id: "professores-abordagem",
        title: "Como os Professores Podem Abordar o Tema",
        category: "Pedagogia",
        audioUrl: "/audio/MP3/professores-abordagem.mp3",

        content: `Para os professores que implementam educação sexual, aqui vão dicas práticas:

1. Crie um ambiente seguro: Estabeleça regras — sem risadas, sem gozos, respeito mútuo. As perguntas são sempre válidas.

2. Use a "caixa de perguntas": Os alunos escrevem perguntas anonimamente num papel e depositam numa caixa. Isto permite responder a dúvidas que teriam vergonha de fazer em voz alta.

3. Adapte a linguagem: Use termos científicos mas acessíveis. Evite jargão.

4. Seja inclusivo: Não assuma que todos os alunos são heterossexuais ou cisgénero. Use linguagem inclusiva.

5. Conheça os seus limites: Se uma pergunta envolve assuntos fora da sua formação, encaminhe para o profissional adequado (psicólogo, enfermeiro).

6. Evite o medo: Não use mensagens de terror ("Se não usares preservativo, vais morrer"). Eduque de forma positiva e informada.

7. Recursos: A DGE e a APF disponibilizam materiais pedagógicos gratuitos.`
      },
      {id: "recursos-pedagogicos",
        title: "Recursos Pedagógicos para Educadores",
        category: "Recursos",
        audioUrl: "/audio/MP3/recursos-pedagogicos.mp3",

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
      {id: "atividades-sala-aula",
        title: "Atividades e Dinâmicas de Grupo para a Sala de Aula",
        category: "Pedagogia",
        audioUrl: "/audio/MP3/atividades-sala-aula.mp3",

        content: `Atividades práticas para educação sexual na sala de aula:

1. Caixa de Perguntas Anónimas: Os alunos escrevem dúvidas em papéis e colocam numa caixa. O professor responde de forma informativa e sem julgamento.

2. Verdadeiro ou Falso: Apresentar afirmações ("A masturbação causa cegueira", "A pílula protege de IST") e os alunos debatem antes de revelar a resposta.

3. Role-Play do Consentimento: Simular situações em que se pede e dá (ou não) consentimento. Discutir em grupo como cada pessoa se sentiu.

4. Linha do Continuum: Colocar afirmações numa linha de "Concordo totalmente" a "Discordo totalmente" (ex: "Se amas alguém, fazes tudo o que a pessoa quer"). Os alunos posicionam-se e justificam.

5. Análise de Mídia: Comparar imagens de redes sociais vs. realidade, ou cenas de séries/filmes — discutir o que é real e o que é ficção.

6. Mapa de Recursos: Os alunos investigam e criam um mapa com os recursos de saúde sexual disponíveis na sua zona (centros de saúde, APF, linhas de apoio).`
      },
    ]
  },
  {
    id: "protecao-prevencao",
    title: "Proteção e Prevenção",
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
      {id: "o-que-fazer-abuso",
        title: "O que Fazer se Suspeitar de Abuso",
        category: "Proteção",
        audioUrl: "/audio/MP3/o-que-fazer-abuso.mp3",

        content: `Se suspeita de abuso sexual de uma criança, aja com urgência mas com cuidado:

Passos a seguir:
1. Ouça a criança: Se ela disser algo, ouça sem interromper, sem pressionar e sem fazer perguntas que sugiram a resposta.
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
      {id: "grooming-online-reconhecer",
        title: "Grooming Online: Como Reconhecer Predadores",
        category: "Proteção",
        audioUrl: "/audio/MP3/grooming-online-reconhecer.mp3",

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
      {id: "regras-seguranca-corporal",
        title: "Ensinar Regras de Segurança Corporal às Crianças",
        category: "Proteção",
        audioUrl: "/audio/MP3/regras-seguranca-corporal.mp3",

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
      {id: "linhas-apoio-instituicoes",
        title: "Linhas de Apoio e Instituições em Portugal",
        category: "Recursos",
        audioUrl: "/audio/MP3/linhas-apoio-instituicoes.mp3",

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
      },
    ]
  },
  {
    id: "sexualidade-vida",
    title: "Sexualidade ao Longo da Vida",
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
      {id: "sexualidade-pos-parto",
        title: "Sexualidade Após o Parto",
        category: "Saúde",
        audioUrl: "/audio/MP3/sexualidade-pos-parto.mp3",

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
      {id: "menopausa-sexualidade",
        title: "Menopausa e Sexualidade",
        category: "Saúde",
        audioUrl: "/audio/MP3/menopausa-sexualidade.mp3",

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
      {id: "sexualidade-terceira-idade",
        title: "Sexualidade na Terceira Idade",
        category: "Saúde",
        audioUrl: "/audio/MP3/sexualidade-terceira-idade.mp3",

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
      {id: "desejo-muda",
        title: "Quando o Desejo Muda: Fatores Físicos e Emocionais",
        category: "Saúde",
        audioUrl: "/audio/MP3/desejo-muda.mp3",

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
      },
    ]
  }
];

export default topicsAdultos;
