export type Locale = "pt" | "en" | "es";

export const localeNames: Record<Locale, string> = {
  pt: "PT",
  en: "EN",
  es: "ES",
};

export const locales: Locale[] = ["pt", "en", "es"];

type TranslationKeys = {
  home: string;
  skipToContent: string;
  profile: string;
  changeProfile: string;
  darkMode: string;
  lightMode: string;
  openMenu: string;
  closeMenu: string;
  selectProfile: string;
  welcomeTitle: string;
  welcomeSubtitle: string;
  children: string;
  youth: string;
  adults: string;
  childrenDesc: string;
  youthDesc: string;
  adultsDesc: string;
  portalLabel: string;
  heroTitleCrianca: string;
  heroTitleJovem: string;
  heroTitleAdulto: string;
  heroDescCrianca: string;
  heroDescJovem: string;
  heroDescAdulto: string;
  startQuiz: string;
  askQuestion: string;
  exploreTopics: string;
  exploreTopicsDesc: string;
  podcastTitle: string;
  podcastSubtitle: string;
  listenOnSpotify: string;
  allEpisodes: string;
  loadingEpisodes: string;
  noEpisodes: string;
  followOnSpotify: string;
  followPodcast: string;
  closePlayer: string;
  resourcesTitle: string;
  resourcesSubtitle: string;
  openGuide: string;
  noGuides: string;
  saveAsPdf: string;
  viewAllGuides: string;
  howToPdfTitle: string;
  howToPdfDesc: string;
  download: string;
  questionOf: string;
  points: string;
  next: string;
  seeResult: string;
  quizFinished: string;
  quizPerfect: string;
  quizGood: string;
  quizTryAgain: string;
  tryAgain: string;
  noQuizQuestions: string;
  faqTitle: string;
  faqDescCrianca: string;
  faqDescJovem: string;
  faqDescAdulto: string;
  doubtsTitle: string;
  doubtsSubtitle: string;
  yourName: string;
  yourNameOptional: string;
  yourQuestion: string;
  namePlaceholderCrianca: string;
  namePlaceholderJovem: string;
  namePlaceholderAdulto: string;
  questionPlaceholderCrianca: string;
  questionPlaceholderJovem: string;
  questionPlaceholderAdulto: string;
  submitting: string;
  submitQuestion: string;
  anonymousNote: string;
  questionSent: string;
  questionSentDesc: string;
  sendAnother: string;
  helplinesCrianca: string;
  helplinesJovem: string;
  helplinesAdulto: string;
  footerAbout: string;
  navigate: string;
  officialSources: string;
  footerDisclaimer: string;
  footerCopyright: string;
  audioNotSupported: string;
  audioPlayer: string;
  listen: string;
  ep: string;
  spotify: string;
  hearOnSpotify: string;
  searchTopics: string;
  shortcutsTitle: string;
  shortcutHome: string;
  shortcutPodcast: string;
  shortcutResources: string;
  shortcutQuiz: string;
  shortcutSearch: string;
  shortcutNavigateTabs: string;
  shortcutToggleHelp: string;
  shortcutClose: string;
  noTopicsFound: string;
  tryOtherTerms: string;
  podcastLoadError: string;
  retry: string;
  questionSendError: string;
  tabPodcast: string;
  tabQuiz: string;
  tabFaq: string;
  tabResources: string;
  tabDoubts: string;
  loadingContent: string;
  notFoundTitle: string;
  notFoundDesc: string;
  notFoundBack: string;
  errorTitle: string;
  errorDesc: string;
  errorBack: string;
};

const pt: TranslationKeys = {
  skipToContent: "Saltar para o conteúdo principal",
  profile: "Perfil",
  changeProfile: "Mudar Perfil",
  darkMode: "Modo Escuro",
  lightMode: "Modo Claro",
  openMenu: "Abrir menu",
  closeMenu: "Fechar menu",
  selectProfile: "Selecionar perfil",
  welcomeTitle: "Bem-vindo ao EduSexual PT",
  welcomeSubtitle: "Escolhe o teu perfil para uma experiência personalizada:",
  children: "Crianças",
  youth: "Jovens",
  adults: "Adultos / Educadores",
  childrenDesc: "Aprende sobre o teu corpo de forma divertida.",
  youthDesc: "Dúvidas sobre sexualidade e relações.",
  adultsDesc: "Guia para educadores e pais.",
  portalLabel: "Portal de Educação Sexual",
  home: "Início",
  heroTitleCrianca: "Vamos aprender sobre o nosso corpo?",
  heroTitleJovem: "Sexualidade sem Tabus e com Segurança",
  heroTitleAdulto: "Guia para Adultos e Educadores",
  heroDescCrianca: "Um espaço divertido e seguro para descobrires como o teu corpo é especial.",
  heroDescJovem: "Um espaço 100% anónimo para aprenderes sobre saúde, relações e o teu corpo.",
  heroDescAdulto: "Informação técnica e pedagógica baseada em fontes oficiais para apoiar a educação.",
  startQuiz: "Começar Quiz",
  askQuestion: "Tira Dúvidas",
  exploreTopics: "O que queres explorar hoje?",
  exploreTopicsDesc: "Temos conteúdo especializado preparado para o teu perfil. Escolhe um tema para começar a ler.",
  podcastTitle: "Descomplicando",
  podcastSubtitle: "O podcast da EduSexual PT. Sofia e André descomplicam temas de educação sexual sem tabus, com conversas abertas e informação validada.",
  listenOnSpotify: "Ouve no Spotify ou diretamente aqui:",
  allEpisodes: "Todos os Episódios",
  loadingEpisodes: "A carregar episódios...",
  noEpisodes: "Não foi possível carregar os episódios.",
  followOnSpotify: "Segue o podcast no Spotify para não perder nenhum episódio!",
  followPodcast: "Seguir no Spotify 🎧",
  closePlayer: "Fechar player",
  resourcesTitle: "Guias e Recursos",
  resourcesSubtitle: "Guias práticos para descarregar e partilhar. Podes imprimir ou guardar como PDF.",
  openGuide: "Abrir guia →",
  noGuides: "Ainda não há guias disponíveis para este perfil.",
  saveAsPdf: "Guardar como PDF",
  viewAllGuides: "Ver todos os guias",
  howToPdfTitle: "Como guardar como PDF?",
  howToPdfDesc: 'Abre um guia, clica em "Guardar como PDF" e o browser vai abrir a janela de impressão. Aí, escolhe "Guardar como PDF" em vez de imprimir.',
  download: "Download HTML",
  questionOf: "Pergunta",
  points: "Pontos",
  next: "Seguinte",
  seeResult: "Ver Resultado",
  quizFinished: "Quiz Terminado!",
  quizPerfect: "Parabéns! Acertaste tudo!",
  quizGood: "Bom resultado! Continua a aprender.",
  quizTryAgain: "Não desanimes! Explora os temas e tenta de novo.",
  tryAgain: "Tentar de novo",
  noQuizQuestions: "Ainda não há perguntas para este perfil.",
  faqTitle: "Perguntas Frequentes",
  faqDescCrianca: "Respostas simples para as tuas dúvidas.",
  faqDescJovem: "Esclarece as tuas dúvidas com as perguntas mais comuns.",
  faqDescAdulto: "Dúvidas comuns de pais e educadores.",
  doubtsTitle: "Tira as tuas Dúvidas",
  doubtsSubtitle: "Envia a tua pergunta de forma 100% anónima. Não guardamos nenhuns dados pessoais.",
  yourName: "Como te queres chamar?",
  yourNameOptional: "Como te queres chamar? (Opcional)",
  yourQuestion: "A tua pergunta",
  namePlaceholderCrianca: "Ex: Explorador(a)",
  namePlaceholderJovem: "Ex: Jovem Curioso",
  namePlaceholderAdulto: "Ex: Pai/Mãe",
  questionPlaceholderCrianca: "O que queres saber?",
  questionPlaceholderJovem: "Escreve aqui o que queres saber...",
  questionPlaceholderAdulto: "Escreva aqui a sua pergunta...",
  submitting: "A enviar...",
  submitQuestion: "Submeter Pergunta Anónima",
  anonymousNote: "🔒 A tua pergunta é anónima. Não recolhemos dados pessoais.",
  questionSent: "Pergunta Enviada!",
  questionSentDesc: "Obrigado pela tua confiança. A tua pergunta será analisada pela nossa equipa e poderá ser adicionada ao FAQ brevemente.",
  sendAnother: "Enviar outra pergunta",
  helplinesCrianca: "📞 Precisas de ajuda?",
  helplinesJovem: "📞 Linhas de apoio em Portugal",
  helplinesAdulto: "📞 Linhas de apoio em Portugal",
  footerAbout: "Portal de educação sexual em português. Conteúdo validado, 100% anónimo, para todas as idades.",
  navigate: "Navegar",
  officialSources: "Fontes Oficiais",
  footerDisclaimer: "Conteúdo informativo. Não substitui aconselhamento médico.",
  footerCopyright: "EduSexual PT — Educação Sexual para Todas as Idades",
  audioNotSupported: "O teu browser não suporta áudio.",
  audioPlayer: "Player de áudio",
  listen: "Ouvir",
  ep: "Ep.",
  spotify: "Spotify",
  hearOnSpotify: "Ouve no Spotify ↗",
  searchTopics: "Pesquisar temas...",
  shortcutsTitle: "Atalhos do Teclado",
  shortcutHome: "Início",
  shortcutPodcast: "Podcast",
  shortcutResources: "Recursos",
  shortcutQuiz: "Quiz",
  shortcutSearch: "Pesquisar",
  shortcutNavigateTabs: "Navegar por abas",
  shortcutToggleHelp: "Mostrar/ocultar ajuda",
  shortcutClose: "Fechar",
  noTopicsFound: "Nenhum tema encontrado para",
  tryOtherTerms: "Tenta com outros termos de pesquisa.",
  podcastLoadError: "Erro ao carregar episódios.",
  retry: "Tentar novamente",
  questionSendError: "Erro ao enviar pergunta. Tenta novamente.",
  tabPodcast: "Podcast",
  tabQuiz: "Quiz",
  tabFaq: "FAQ",
  tabResources: "Recursos",
  tabDoubts: "Dúvidas",
  loadingContent: "A carregar conteúdo",
  notFoundTitle: "Página não encontrada",
  notFoundDesc: "O URL que procuras não existe. Verifica se está correto ou volta à página inicial.",
  notFoundBack: "Voltar ao início",
  errorTitle: "Algo correu mal",
  errorDesc: "Ocorreu um erro inesperado. Tenta novamente ou volta à página inicial.",
  errorBack: "Voltar ao início",
};

const en: TranslationKeys = {
  skipToContent: "Skip to main content",
  profile: "Profile",
  changeProfile: "Change Profile",
  darkMode: "Dark Mode",
  lightMode: "Light Mode",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  selectProfile: "Select profile",
  welcomeTitle: "Welcome to EduSexual PT",
  welcomeSubtitle: "Choose your profile for a personalized experience:",
  children: "Children",
  youth: "Youth",
  adults: "Adults / Educators",
  childrenDesc: "Learn about your body in a fun way.",
  youthDesc: "Questions about sexuality and relationships.",
  adultsDesc: "Guide for educators and parents.",
  portalLabel: "Sexual Education Portal",
  home: "Home",
  heroTitleCrianca: "Shall we learn about our body?",
  heroTitleJovem: "Sexuality Without Taboos, With Safety",
  heroTitleAdulto: "Guide for Adults and Educators",
  heroDescCrianca: "A fun and safe space to discover how special your body is.",
  heroDescJovem: "A 100% anonymous space to learn about health, relationships and your body.",
  heroDescAdulto: "Technical and pedagogical information based on official sources to support education.",
  startQuiz: "Start Quiz",
  askQuestion: "Ask a Question",
  exploreTopics: "What do you want to explore today?",
  exploreTopicsDesc: "We have specialized content prepared for your profile. Choose a topic to start reading.",
  podcastTitle: "Descomplicando",
  podcastSubtitle: "The EduSexual PT podcast. Sofia and André break down sexual education topics without taboos, with open conversations and validated information.",
  listenOnSpotify: "Listen on Spotify or directly here:",
  allEpisodes: "All Episodes",
  loadingEpisodes: "Loading episodes...",
  noEpisodes: "Could not load episodes.",
  followOnSpotify: "Follow the podcast on Spotify so you don't miss an episode!",
  followPodcast: "Follow on Spotify 🎧",
  closePlayer: "Close player",
  resourcesTitle: "Guides and Resources",
  resourcesSubtitle: "Practical guides to download and share. You can print or save as PDF.",
  openGuide: "Open guide →",
  noGuides: "No guides available for this profile yet.",
  saveAsPdf: "Save as PDF",
  viewAllGuides: "View all guides",
  howToPdfTitle: "How to save as PDF?",
  howToPdfDesc: 'Open a guide, click "Save as PDF" and the browser will open the print dialog. Choose "Save as PDF" instead of printing.',
  download: "Download HTML",
  questionOf: "Question",
  points: "Points",
  next: "Next",
  seeResult: "See Result",
  quizFinished: "Quiz Finished!",
  quizPerfect: "Congratulations! You got everything right!",
  quizGood: "Good result! Keep learning.",
  quizTryAgain: "Don't give up! Explore the topics and try again.",
  tryAgain: "Try again",
  noQuizQuestions: "No questions available for this profile yet.",
  faqTitle: "Frequently Asked Questions",
  faqDescCrianca: "Simple answers to your questions.",
  faqDescJovem: "Clarify your doubts with the most common questions.",
  faqDescAdulto: "Common questions from parents and educators.",
  doubtsTitle: "Ask Your Questions",
  doubtsSubtitle: "Send your question 100% anonymously. We don't store any personal data.",
  yourName: "What would you like to be called?",
  yourNameOptional: "What would you like to be called? (Optional)",
  yourQuestion: "Your question",
  namePlaceholderCrianca: "e.g. Explorer",
  namePlaceholderJovem: "e.g. Curious Youth",
  namePlaceholderAdulto: "e.g. Parent",
  questionPlaceholderCrianca: "What do you want to know?",
  questionPlaceholderJovem: "Write what you want to know here...",
  questionPlaceholderAdulto: "Write your question here...",
  submitting: "Submitting...",
  submitQuestion: "Submit Anonymous Question",
  anonymousNote: "🔒 Your question is anonymous. We don't collect personal data.",
  questionSent: "Question Sent!",
  questionSentDesc: "Thank you for your trust. Your question will be reviewed by our team and may be added to the FAQ soon.",
  sendAnother: "Send another question",
  helplinesCrianca: "📞 Need help?",
  helplinesJovem: "📞 Helplines in Portugal",
  helplinesAdulto: "📞 Helplines in Portugal",
  footerAbout: "Sexual education portal in Portuguese. Validated content, 100% anonymous, for all ages.",
  navigate: "Navigate",
  officialSources: "Official Sources",
  footerDisclaimer: "Informational content. Does not replace medical advice.",
  footerCopyright: "EduSexual PT — Sexual Education for All Ages",
  audioNotSupported: "Your browser doesn't support audio.",
  audioPlayer: "Audio player",
  listen: "Listen",
  ep: "Ep.",
  spotify: "Spotify",
  hearOnSpotify: "Listen on Spotify ↗",
  searchTopics: "Search topics...",
  shortcutsTitle: "Keyboard Shortcuts",
  shortcutHome: "Home",
  shortcutPodcast: "Podcast",
  shortcutResources: "Resources",
  shortcutQuiz: "Quiz",
  shortcutSearch: "Search",
  shortcutNavigateTabs: "Navigate tabs",
  shortcutToggleHelp: "Toggle help",
  shortcutClose: "Close",
  noTopicsFound: "No topics found for",
  tryOtherTerms: "Try other search terms.",
  podcastLoadError: "Error loading episodes.",
  retry: "Try again",
  questionSendError: "Error sending question. Please try again.",
  tabPodcast: "Podcast",
  tabQuiz: "Quiz",
  tabFaq: "FAQ",
  tabResources: "Resources",
  tabDoubts: "Doubts",
  loadingContent: "Loading content",
  notFoundTitle: "Page not found",
  notFoundDesc: "The URL you're looking for doesn't exist. Check if it's correct or go back to the homepage.",
  notFoundBack: "Back to homepage",
  errorTitle: "Something went wrong",
  errorDesc: "An unexpected error occurred. Try again or go back to the homepage.",
  errorBack: "Back to homepage",
};

const es: TranslationKeys = {
  skipToContent: "Saltar al contenido principal",
  profile: "Perfil",
  changeProfile: "Cambiar Perfil",
  darkMode: "Modo Oscuro",
  lightMode: "Modo Claro",
  openMenu: "Abrir menú",
  closeMenu: "Cerrar menú",
  selectProfile: "Seleccionar perfil",
  welcomeTitle: "Bienvenido a EduSexual PT",
  welcomeSubtitle: "Elige tu perfil para una experiencia personalizada:",
  children: "Niños",
  youth: "Jóvenes",
  adults: "Adultos / Educadores",
  childrenDesc: "Aprende sobre tu cuerpo de forma divertida.",
  youthDesc: "Dudas sobre sexualidad y relaciones.",
  adultsDesc: "Guía para educadores y padres.",
  portalLabel: "Portal de Educación Sexual",
  home: "Inicio",
  heroTitleCrianca: "¿Vamos a aprender sobre nuestro cuerpo?",
  heroTitleJovem: "Sexualidad Sin Tabúes, Con Seguridad",
  heroTitleAdulto: "Guía para Adultos y Educadores",
  heroDescCrianca: "Un espacio divertido y seguro para descubrir lo especial que es tu cuerpo.",
  heroDescJovem: "Un espacio 100% anónimo para aprender sobre salud, relaciones y tu cuerpo.",
  heroDescAdulto: "Información técnica y pedagógica basada en fuentes oficiales para apoyar la educación.",
  startQuiz: "Empezar Quiz",
  askQuestion: "Haz tu Pregunta",
  exploreTopics: "¿Qué quieres explorar hoy?",
  exploreTopicsDesc: "Tenemos contenido especializado preparado para tu perfil. Elige un tema para empezar a leer.",
  podcastTitle: "Descomplicando",
  podcastSubtitle: "El podcast de EduSexual PT. Sofía y André desmitifican temas de educación sexual sin tabúes, con conversaciones abiertas e información validada.",
  listenOnSpotify: "Escucha en Spotify o directamente aquí:",
  allEpisodes: "Todos los Episodios",
  loadingEpisodes: "Cargando episodios...",
  noEpisodes: "No se pudieron cargar los episodios.",
  followOnSpotify: "¡Sigue el podcast en Spotify para no perderte ningún episodio!",
  followPodcast: "Seguir en Spotify 🎧",
  closePlayer: "Cerrar reproductor",
  resourcesTitle: "Guías y Recursos",
  resourcesSubtitle: "Guías prácticas para descargar y compartir. Puedes imprimir o guardar como PDF.",
  openGuide: "Abrir guía →",
  noGuides: "Aún no hay guías disponibles para este perfil.",
  saveAsPdf: "Guardar como PDF",
  viewAllGuides: "Ver todas las guías",
  howToPdfTitle: "¿Cómo guardar como PDF?",
  howToPdfDesc: 'Abre una guía, haz clic en "Guardar como PDF" y el navegador abrirá la ventana de impresión. Elige "Guardar como PDF" en vez de imprimir.',
  download: "Descargar HTML",
  questionOf: "Pregunta",
  points: "Puntos",
  next: "Siguiente",
  seeResult: "Ver Resultado",
  quizFinished: "¡Quiz Terminado!",
  quizPerfect: "¡Felicidades! ¡Acertaste todo!",
  quizGood: "¡Buen resultado! Sigue aprendiendo.",
  quizTryAgain: "¡No te desanimes! Explora los temas e inténtalo de nuevo.",
  tryAgain: "Intentar de nuevo",
  noQuizQuestions: "Aún no hay preguntas para este perfil.",
  faqTitle: "Preguntas Frecuentes",
  faqDescCrianca: "Respuestas simples para tus dudas.",
  faqDescJovem: "Aclara tus dudas con las preguntas más comunes.",
  faqDescAdulto: "Dudas comunes de padres y educadores.",
  doubtsTitle: "Haz tus Preguntas",
  doubtsSubtitle: "Envía tu pregunta 100% de forma anónima. No guardamos ningún dato personal.",
  yourName: "¿Cómo te llamas?",
  yourNameOptional: "¿Cómo te llamas? (Opcional)",
  yourQuestion: "Tu pregunta",
  namePlaceholderCrianca: "Ej: Explorador(a)",
  namePlaceholderJovem: "Ej: Joven Curioso",
  namePlaceholderAdulto: "Ej: Padre/Madre",
  questionPlaceholderCrianca: "¿Qué quieres saber?",
  questionPlaceholderJovem: "Escribe aquí lo que quieres saber...",
  questionPlaceholderAdulto: "Escribe aquí tu pregunta...",
  submitting: "Enviando...",
  submitQuestion: "Enviar Pregunta Anónima",
  anonymousNote: "🔒 Tu pregunta es anónima. No recogemos datos personales.",
  questionSent: "¡Pregunta Enviada!",
  questionSentDesc: "Gracias por tu confianza. Tu pregunta será revisada por nuestro equipo y podrá ser añadida al FAQ pronto.",
  sendAnother: "Enviar otra pregunta",
  helplinesCrianca: "📞 ¿Necesitas ayuda?",
  helplinesJovem: "📞 Líneas de apoyo en Portugal",
  helplinesAdulto: "📞 Líneas de apoyo en Portugal",
  footerAbout: "Portal de educación sexual en portugués. Contenido validado, 100% anónimo, para todas las edades.",
  navigate: "Navegar",
  officialSources: "Fuentes Oficiales",
  footerDisclaimer: "Contenido informativo. No sustituye el asesoramiento médico.",
  footerCopyright: "EduSexual PT — Educación Sexual para Todas las Edades",
  audioNotSupported: "Tu navegador no soporta audio.",
  audioPlayer: "Reproductor de audio",
  listen: "Escuchar",
  ep: "Ep.",
  spotify: "Spotify",
  hearOnSpotify: "Escucha en Spotify ↗",
  searchTopics: "Buscar temas...",
  shortcutsTitle: "Atajos de Teclado",
  shortcutHome: "Inicio",
  shortcutPodcast: "Podcast",
  shortcutResources: "Recursos",
  shortcutQuiz: "Quiz",
  shortcutSearch: "Buscar",
  shortcutNavigateTabs: "Navegar pestañas",
  shortcutToggleHelp: "Mostrar/ocultar ayuda",
  shortcutClose: "Cerrar",
  noTopicsFound: "No se encontraron temas para",
  tryOtherTerms: "Intenta con otros términos de búsqueda.",
  podcastLoadError: "Error al cargar episodios.",
  retry: "Intentar de nuevo",
  questionSendError: "Error al enviar pregunta. Por favor, inténtalo de nuevo.",
  tabPodcast: "Podcast",
  tabQuiz: "Quiz",
  tabFaq: "FAQ",
  tabResources: "Recursos",
  tabDoubts: "Dudas",
  loadingContent: "Cargando contenido",
  notFoundTitle: "Página no encontrada",
  notFoundDesc: "La URL que buscas no existe. Verifica si es correcta o vuelve a la página de inicio.",
  notFoundBack: "Volver al inicio",
  errorTitle: "Algo salió mal",
  errorDesc: "Ocurrió un error inesperado. Inténtalo de nuevo o vuelve a la página de inicio.",
  errorBack: "Volver al inicio",
};

export const translations: Record<Locale, TranslationKeys> = { pt, en, es };

export type T = TranslationKeys;
