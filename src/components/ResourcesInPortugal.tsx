import { useI18n } from "@/i18n/context";

export default function ResourcesInPortugal() {
  const { t } = useI18n();
  return (
    <div className="card space-y-6">
      <h3 className="text-xl font-heading font-bold text-primary">{t.helplinesAdulto}</h3>
      {/* hardcoded for simplicity, could pull from data later */}
      <ul className="space-y-4">
        <li><strong>APAV:</strong> 800 200 2200</li>
        <li><strong>SOS Criança:</strong> 116 111</li>
        <li><strong>Linha Saúde Sexual / SNS 24:</strong> 808 200 204</li>
      </ul>
    </div>
  );
}
