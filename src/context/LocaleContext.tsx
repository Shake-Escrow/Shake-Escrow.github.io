import React, { createContext, useContext, useEffect, useState } from 'react';

export type Locale = 'en' | 'es';

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: 'en',
  setLocale: () => {},
});

const STORAGE_KEY = 'shake-locale';

function isLocale(value: string | null): value is Locale {
  return value === 'en' || value === 'es';
}

function getUrlLocale(): Locale | null {
  try {
    const urlLocale = new URLSearchParams(window.location.search).get('lang');
    if (isLocale(urlLocale)) return urlLocale;
  } catch {
    // window unavailable
  }

  return null;
}

function getBrowserLocale(): Locale {
  try {
    const browserLocales = [
      navigator.language,
      ...(navigator.languages ?? []),
    ].filter(Boolean);

    if (browserLocales.some((language) => language.toLowerCase().startsWith('es'))) {
      return 'es';
    }
  } catch {
    // navigator unavailable
  }

  return 'en';
}

function getInitialLocale(): Locale {
  const urlLocale = getUrlLocale();
  if (urlLocale) {
    try { localStorage.setItem(STORAGE_KEY, urlLocale); } catch { /* ignore */ }
    return urlLocale;
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isLocale(saved)) return saved;
  } catch {
    // localStorage unavailable
  }

  return getBrowserLocale();
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (next: Locale) => {
    try { localStorage.setItem(STORAGE_KEY, next); } catch { /* ignore */ }
    setLocaleState(next);
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
