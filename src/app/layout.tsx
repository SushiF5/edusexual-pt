import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EduSexual PT - Educação Sexual em Português",
  description: "Recursos de educação sexual para jovens em Portugal. Tira dúvidas, faz quizzes e aprende de forma anónima.",
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