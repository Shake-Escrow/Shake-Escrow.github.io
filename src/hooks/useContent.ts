import { useLocale, type Locale } from '../context/LocaleContext';

import enSite    from '../content/en/sitecontent.json';
import esSite    from '../content/es/sitecontent.json';
import enEula    from '../content/en/eula.json';
import esEula    from '../content/es/eula.json';
import enPrivacy from '../content/en/privacy.json';
import esPrivacy from '../content/es/privacy.json';
import enTos     from '../content/en/tos.json';
import esTos     from '../content/es/tos.json';

const registry: Record<Locale, {
  sitecontent: typeof enSite;
  eula: typeof enEula;
  privacy: typeof enPrivacy;
  tos: typeof enTos;
}> = {
  en: { sitecontent: enSite, eula: enEula, privacy: enPrivacy, tos: enTos },
  es: { sitecontent: esSite as typeof enSite, eula: esEula as typeof enEula, privacy: esPrivacy as typeof enPrivacy, tos: esTos as typeof enTos },
};

type ContentKey = keyof typeof registry.en;

export function useContent<K extends ContentKey>(key: K): typeof registry['en'][K] {
  const { locale } = useLocale();
  return (registry[locale] ?? registry.en)[key];
}
