import { useI18n } from "@/i18n/context";
import { helplinesData, legalRightsData } from "@/data/content-rights-helplines";

export default function ResourcesInPortugal() {
  const { t } = useI18n();

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Emergency Notice */}
      <div className="card bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl" role="img" aria-hidden="true">🚨</span>
          <div>
            <h3 className="font-heading font-bold text-red-800 dark:text-red-200">
              {t.emergencyNotice}
            </h3>
            <p className="text-sm text-red-700 dark:text-red-300 mt-1">
              Em caso de emergência médica imediata ou perigo iminente, liga sempre 112.
            </p>
          </div>
        </div>
      </div>

      {/* Helplines Directory */}
      <div className="card space-y-6">
        <h3 className="text-xl font-heading font-bold text-primary">{t.helplinesDirectory}</h3>
        <ul className="space-y-3" role="list">
          {helplinesData.map((helpline) => (
            <li key={helpline.id} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-primary/30 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl" role="img" aria-hidden="true">
                    {helpline.cost === "Gratuito" ? "🆓" : helpline.cost === "Custo de chamada local" ? "📞" : "📱"}
                  </span>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{helpline.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{helpline.entity}</p>
                  </div>
                </div>
                <div className="flex flex-col sm:items-end gap-1 text-sm">
                  <span className="font-mono font-semibold text-primary">
                    <a href={`tel:${helpline.rawPhone}`} className="hover:underline">
                      {helpline.phone}
                    </a>
                  </span>
                  <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light">
                    {helpline.cost}
                  </span>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{helpline.description}</p>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
                <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                  🕐 {helpline.hours}
                </span>
                {helpline.isAnonymous && (
                  <span className="px-2 py-0.5 rounded-full bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300">
                    🔒 Anónimo
                  </span>
                )}
                {helpline.whatsapp && (
                  <a href={helpline.whatsapp} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1">
                    WhatsApp
                  </a>
                )}
                {helpline.website && (
                  <a href={helpline.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1">
                    🌐 Site
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Free Services Note */}
      <div className="card bg-accent/10 border-accent text-center">
        <span className="text-2xl" role="img" aria-hidden="true">🏥</span>
        <h3 className="font-heading font-semibold text-primary mt-2 mb-2">{t.freeInSns}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Consultas de Planeamento Familiar e contracetivos são 100% gratuitos em qualquer Centro de Saúde / USF em Portugal.
        </p>
      </div>

      {/* Legal Rights */}
      <div className="card space-y-6">
        <h3 className="text-xl font-heading font-bold text-primary">Os Teus Direitos</h3>
        <ul className="space-y-4" role="list">
          {legalRightsData.map((right) => (
            <li key={right.id} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
              <div className="flex items-start gap-3">
                <span className="text-2xl mt-0.5" role="img" aria-hidden="true">⚖️</span>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 dark:text-white">{right.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{right.legalBasis}</p>
                  <p className="text-gray-700 dark:text-gray-300 mt-2">{right.summary}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    <strong>Na prática:</strong> {right.practicalApplication}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">{right.targetAudience}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
