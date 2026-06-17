import { useI18n, LANGUAGES, type LangCode } from "@/lib/i18n";

export function LanguageSwitcher() {
  const { lang, setLang, t } = useI18n();
  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="sr-only">{t("lang.label")}</span>
      <span aria-hidden="true" className="font-bold">🌐</span>
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value as LangCode)}
        aria-label={t("lang.label")}
        className="border-2 border-background bg-foreground px-2 py-1 font-semibold text-background"
      >
        {LANGUAGES.map((l) => (
          <option key={l.code} value={l.code} className="text-foreground">
            {l.label}
          </option>
        ))}
      </select>
    </label>
  );
}
