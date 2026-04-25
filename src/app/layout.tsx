import type { Metadata } from "next";
import "./globals.css";

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
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-PT">
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}