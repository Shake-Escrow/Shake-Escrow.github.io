import { useLocale, type Locale } from '../context/LocaleContext';

import enSite    from '../content/en/sitecontent.json';
import esSite    from '../content/es/sitecontent.json';
import uzSite    from '../content/uz/sitecontent.json';
import enEula    from '../content/en/eula.json';
import esEula    from '../content/es/eula.json';
import uzEula    from '../content/uz/eula.json';
import enPrivacy from '../content/en/privacy.json';
import esPrivacy from '../content/es/privacy.json';
import uzPrivacy from '../content/uz/privacy.json';
import enTos     from '../content/en/tos.json';
import esTos     from '../content/es/tos.json';
import uzTos     from '../content/uz/tos.json';

const registry: Record<Locale, {
  sitecontent: typeof enSite;
  eula: typeof enEula;
  privacy: typeof enPrivacy;
  tos: typeof enTos;
}> = {
  en: { sitecontent: enSite, eula: enEula, privacy: enPrivacy, tos: enTos },
  es: { sitecontent: esSite as typeof enSite, eula: esEula as typeof enEula, privacy: esPrivacy as typeof enPrivacy, tos: esTos as typeof enTos },
  uz: { sitecontent: uzSite as typeof enSite, eula: uzEula as typeof enEula, privacy: uzPrivacy as typeof enPrivacy, tos: uzTos as typeof enTos },
};

type ContentKey = keyof typeof registry.en;

export function useContent<K extends ContentKey>(key: K): typeof registry['en'][K] {
  const { locale } = useLocale();
  return (registry[locale] ?? registry.en)[key];
}
