import type { Metadata } from "next";
import { Outfit, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/i18n/context";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EduSexual PT — Educação Sexual para Todas as Idades",
  description: "Portal de educação sexual em português para crianças, jovens e adultos. Conteúdo validado, quizzes, FAQ e linhas de apoio em Portugal. 100% anónimo.",
  keywords: ["educação sexual", "saúde sexual", "Portugal", "contracepção", "IST", "consentimento", "jovens", "pais", "educadores"],
  openGraph: {
    title: "EduSexual PT — Educação Sexual para Todas as Idades",
    description: "Portal de educação sexual em português. Conteúdo validado, quizzes, FAQ e linhas de apoio em Portugal.",
    url: "https://edusexual.pt",
    siteName: "EduSexual PT",
    locale: "pt_PT",
    type: "website",
    images: [{ url: "https://edusexual.pt/og-image.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "EduSexual PT — Educação Sexual",
    description: "Portal de educação sexual para crianças, jovens e adultos.",
    images: ["https://edusexual.pt/og-image.svg"],
  },
  robots: { index: true, follow: true },
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-PT" suppressHydrationWarning className={`${outfit.variable} ${sourceSans.variable}`}>
    <head>
      <meta name="theme-color" content="#2D5A5A" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="EduSexual PT" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="format-detection" content="telephone=no" />
      <link rel="manifest" href="/manifest.json" />
      <script dangerouslySetInnerHTML={{ __html: `
(function() {
  try {
    var theme = localStorage.getItem('edusexual-theme');
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
    var locale = localStorage.getItem('edusexual-locale');
    if (locale === 'en') document.documentElement.lang = 'en-GB';
    else if (locale === 'es') document.documentElement.lang = 'es-ES';
  } catch(e) {}
})();
` }} />
      </head>
      <body className="min-h-screen flex flex-col bg-background">
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
