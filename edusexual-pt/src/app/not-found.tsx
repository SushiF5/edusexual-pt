export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">🔍</div>
        <h1 className="text-3xl font-heading font-bold text-primary mb-4">Página não encontrada</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          O URL que procuras não existe. Verifica se está correto ou volta à página inicial.
        </p>
        <a href="/" className="btn-primary inline-block">
          Voltar ao início
        </a>
      </div>
    </div>
  );
}
