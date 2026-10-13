# Content & Translations

This directory contains all translatable text for the Shake website, organized by locale.

```
src/content/
├── en/               ← canonical (English) — source of truth
│   ├── sitecontent.json
│   ├── eula.json
│   ├── privacy.json
│   └── tos.json
├── es/               ← Spanish
│   ├── sitecontent.json
│   ├── eula.json
│   ├── privacy.json
│   └── tos.json
├── uz/               ← Uzbek
│   ├── sitecontent.json
│   ├── eula.json
│   ├── privacy.json
│   └── tos.json
└── README.md         ← this file
```

## File roles

| File | Contains |
|---|---|
| `sitecontent.json` | All UI text: navbar, hero, feature sections, FAQ, footer, form labels, CTAs |
| `eula.json` | End User License Agreement |
| `privacy.json` | Privacy Policy |
| `tos.json` | Terms of Service |

The `en/` directory is the canonical version. All other locales must mirror its structure exactly — same keys, same array lengths.

---

## Adding a new language

### 1. Create the locale directory

```
src/content/<locale-code>/
```

Use an [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) two-letter code (e.g. `fr` for French, `pt` for Portuguese).

### 2. Copy the English files

```bash
cp src/content/en/sitecontent.json src/content/<locale-code>/sitecontent.json
cp src/content/en/eula.json        src/content/<locale-code>/eula.json
cp src/content/en/privacy.json     src/content/<locale-code>/privacy.json
cp src/content/en/tos.json         src/content/<locale-code>/tos.json
```

### 3. Translate the values — not the keys

Only translate the **values** in each JSON file. Never change:

- Key names (`"headline"`, `"title"`, `"content"`, etc.)
- HTML tags inside strings (`<strong>`, `<ul>`, `<li>`, etc.)
- Inline markdown links (`[link text](url)`)
- Proper names: `Shake Defi, Inc.`, `Coinbase`, `Persona`, `Rubic`, `Azure KeyVault`, `Microsoft Entra ID`
- Technical terms: `blockchain`, `smart contract`, `USDC`, `ETH`, `Bitcoin`, `KYC`, `AML`, `API`, `DEX`
- URLs, email addresses, physical addresses
- Smart contract addresses
- Dates (translate the format if needed, e.g. `"April 16, 2026"` → `"16 avril 2026"`)
- The `"path"` values inside navbar/footer link objects (these are URL routes, not display text)

### 4. Wire the locale into the app

Three files need to be updated to make the new locale selectable at runtime.

**a) `src/context/LocaleContext.tsx` — add the locale to the type union**

```ts
// Before
export type Locale = 'en' | 'es';

// After (example adding French)
export type Locale = 'en' | 'es' | 'fr';
```

**b) `src/hooks/useContent.ts` — import the new JSON files and add them to the registry**

```ts
// 1. Import each new JSON file at the top of the file
import frSite    from '../content/fr/sitecontent.json';
import frEula    from '../content/fr/eula.json';
import frPrivacy from '../content/fr/privacy.json';
import frTos     from '../content/fr/tos.json';

// 2. Add the new locale to the registry object
const registry = {
  en: { sitecontent: enSite, eula: enEula, privacy: enPrivacy, tos: enTos },
  es: { sitecontent: esSite as typeof enSite, eula: esEula as typeof enEula, privacy: esPrivacy as typeof enPrivacy, tos: esTos as typeof enTos },
  fr: { sitecontent: frSite as typeof enSite, eula: frEula as typeof enEula, privacy: frPrivacy as typeof enPrivacy, tos: frTos as typeof enTos },
};
```

The `as typeof en*` casts are necessary because TypeScript infers JSON types literally. The English files are the canonical shape; other locales are cast to match.

**c) `src/components/layout/navbar.tsx` — add the language to the picker**

```tsx
const languages: { code: string; locale: Locale; label: string; region: string }[] = [
  { code: 'EN', locale: 'en', label: 'English',  region: 'United States' },
  { code: 'ES', locale: 'es', label: 'Español',  region: 'Latinoamérica' },
  { code: 'FR', locale: 'fr', label: 'Français', region: 'France' },  // new entry
];
```

Once all three changes are in place, selecting the new language in the navbar will immediately swap every piece of site content to the translated version. The selected locale is persisted to `localStorage` under the key `shake-locale`, so the user's choice survives page refreshes.

### 5. Verify completeness

Run the translation checker to confirm no keys are missing:

```bash
npm run check-translations
```

A passing check prints `All translations complete for: es, fr, ...`. Any missing keys are printed with their full path so you know exactly what to add.

This check also runs automatically in CI before every deploy to `main` — a missing key will block the deployment.

---

## Keeping translations in sync

When a key is **added or removed** from any `en/` file, the same change must be made to all locale files before merging to `main`. The CI check (`npm run check-translations`) will catch any drift.

When a key's **value** changes in English (e.g. updated legal text), update the corresponding value in each locale file manually. The checker only validates structure, not whether the content is up to date.

## Legal source synchronization and publication

The ToS and privacy policy sources are `legal/json_en`, `legal/json_es`, and `legal/json_uz` in the parent Shake workspace. Mirror each language into this repository's `src/content/<language>/tos.json` and `privacy.json`. Preserve the same section numbers, versions and approved retention schedule across languages. The app mirrors these sources into `Shake-MobileApp/assets/legaldocs/<language>`; from that app repository, run `node scripts/sync-nft-signing-legal.cjs` to refresh all three languages.

Source revisions marked `publicationStatus: not_published` display a localized pending-publication notice. The user selected October 13, 2026 as the effective date for these ToS/privacy revisions. The user authorized publication of these supporting ToS/privacy revisions; their sources are marked approved for publication and their effective dates match across legal, website and mobile copies. Verify the Pages deployment separately from source approval. The full NFT ownership declaration/public archive and runtime acceptance enforcement remain separate work. The October 13 NFT acceptance retention schedule is approved: ongoing recognized ownership, then four years after recorded ownership ends and related obligations finish, longer only for unresolved disputes or applicable legal requirements, followed by deletion or minimization. Its backend enforcement is separately planned. Signing-photo rules remain separate.

Before publishing, run `npm run check-translations`, `npx tsc -p tsconfig.app.json --noEmit`, and `npm run build:full`. The build regenerates `public/privacy-policy.html` and prerenders the legal routes. Verify `/terms-of-service?lang=en`, `?lang=es`, `?lang=uz` and the corresponding privacy routes, plus the static privacy HTML. The ToS renderer uses the canonical `companyName` and subsection `subtitle` fields.

The GitHub Pages workflow publishes `dist` on a push to `main` or an explicit workflow dispatch. A local build does not publish. Record the actual authorized release, effective dates and live URL verification in the NFT planning files. These policy updates do not yet create the immutable public NFT ownership-terms page/download archive; that remains a separate child-plan requirement.
