"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">⚠️</div>
        <h1 className="text-3xl font-heading font-bold text-primary mb-4">Algo correu mal</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          Ocorreu um erro inesperado. Tenta novamente ou volta à página inicial.
        </p>
        {error.digest && (
          <p className="text-xs text-gray-400 mb-6 font-mono">Erro: {error.digest}</p>
        )}
        <div className="flex gap-4 justify-center">
          <button onClick={reset} className="btn-primary">
            Tentar novamente
          </button>
          <a href="/" className="btn-secondary">
            Voltar ao início
          </a>
        </div>
      </div>
    </div>
  );
}
