# MULTITALEN — Multi-Language Migration Plan

**Project:** orthodoxkerk.nl static website  
**Date drafted:** 2026-04-08  
**Languages:** NL (primary), RU (secondary), EN (tertiary)  
**Approach:** Language-segregated subfolders · shared assets at root · flag-based language switcher

---

## 1. Current State

| Aspect | Current |
|--------|---------|
| Language | Russian only (`lang="ru"`) |
| Page location | directly under `html/` |
| Legal pages | Dutch at root (`impressum/`, `privacyverklaring/`, `cookie-instellingen/`) |
| Tools | English under `TechManuals/` |
| Asset paths | all relative, depth-aware via `{PREFIX}` in `_template.html` |
| Hreflang | none |

---

## 2. Target Directory Structure

```
html/
├── index.html                  ← root redirect → /nl/  (Phase 8)
│
├── nl/                         ← DUTCH  (primary)
│   ├── index.html              ← dummy / stub page    (Phase 4)
│   ├── index_try.html          ← NL translation draft (Phase 6)
│   ├── nieuws/
│   │   ├── index.html          ← dummy               (Phase 4)
│   │   └── index_try.html      ← translation draft   (Phase 6)
│   ├── evenementen/            index + _try
│   ├── zondagsschool/          index + _try
│   ├── rooster/                index + _try
│   ├── donaties/               index + _try
│   ├── galerij/                index + _try
│   ├── contact/                index + _try
│   ├── over-ons/               index + _try
│   └── etiquette/              index + _try
│
├── ru/                         ← RUSSIAN (secondary) — migrated from root
│   ├── index.html              ← current html/index.html
│   ├── novosti/                ← current html/glavnaya/novosti/
│   ├── meropriyatiya/          ← current html/glavnaya/meropriyatiya/
│   ├── voskresnaya-shkola/     ← current html/glavnaya/voskresnaya-shkola/
│   ├── raspisanie/             ← current html/raspisanie/  (keep index2.html too)
│   ├── pozhertvovaniya/
│   ├── galereya/
│   ├── kontakty/
│   ├── o-nas/
│   └── o-nas/etiket/
│
├── en/                         ← ENGLISH (tertiary)
│   ├── index.html              ← dummy               (Phase 5)
│   ├── index_try.html          ← EN translation draft (Phase 7)
│   ├── news/                   index + _try
│   ├── events/                 index + _try
│   ├── sunday-school/          index + _try
│   ├── schedule/               index + _try
│   ├── donations/              index + _try
│   ├── gallery/                index + _try
│   ├── contact/                index + _try
│   ├── about/                  index + _try
│   └── etiquette/              index + _try
│
├── css/                        ← SHARED — unchanged
├── js/
├── fonts/
├── img/
├── DATA/                       ← SHARED source data — unchanged
├── TechManuals/                ← admin tools, English, stays at root
├── impressum/                  ← NL-specific legal — stays at root
├── privacyverklaring/          ← NL-specific legal — stays at root
├── cookie-instellingen/        ← NL-specific legal — stays at root
└── _template.html              ← updated master template
```

**Rationale for non-language-versioned pages:**
- `impressum/`, `privacyverklaring/`, `cookie-instellingen/` are Dutch legal obligations; no translation needed.
- `TechManuals/` are internal/admin; they stay at root in English.
- `DATA/` is source data, not a published page.

---

## 3. Page Slug Mapping

| Page | RU path | NL path | EN path |
|------|---------|---------|---------|
| Homepage | `ru/` | `nl/` | `en/` |
| News | `ru/novosti/` | `nl/nieuws/` | `en/news/` |
| Events | `ru/meropriyatiya/` | `nl/evenementen/` | `en/events/` |
| Sunday School | `ru/voskresnaya-shkola/` | `nl/zondagsschool/` | `en/sunday-school/` |
| Schedule | `ru/raspisanie/` | `nl/rooster/` | `en/schedule/` |
| Donations | `ru/pozhertvovaniya/` | `nl/donaties/` | `en/donations/` |
| Gallery | `ru/galereya/` | `nl/galerij/` | `en/gallery/` |
| Contacts | `ru/kontakty/` | `nl/contact/` | `en/contact/` |
| About Us | `ru/o-nas/` | `nl/over-ons/` | `en/about/` |
| Etiquette | `ru/o-nas/etiket/` | `nl/etiquette/` | `en/etiquette/` |

---

## 4. Language Switcher Component Specification

### 4.1 Position

First `<li>` in `<ul class="site-nav">`, before "Главная/Home/Hoofdmenu".

### 4.2 HTML (RU version — active language is RU)

```html
<li class="has-children lang-switcher">
  <a href="#" class="lang-current" aria-label="Taal / Язык / Language">
    &#127479;&#127482;<span class="arrow">&#9662;</span>
  </a>
  <ul class="submenu lang-menu">
    <li><a href="/nl/">&#127475;&#127473; Nederlands</a></li>
    <li><a href="/ru/" class="lang-active">&#127479;&#127482; Русский</a></li>
    <li><a href="/en/">&#127468;&#127463; English</a></li>
  </ul>
</li>
```

Flag codepoints:
- 🇳🇱 NL = `&#127475;&#127473;`
- 🇷🇺 RU = `&#127479;&#127482;`
- 🇬🇧 EN = `&#127468;&#127463;`

Each language version carries **its own flag** in `lang-current` and marks itself `lang-active`.

### 4.3 Per-language switcher variants

| Language file | `lang-current` flag | `lang-active` class on |
|---------------|---------------------|----------------------|
| `nl/` pages   | 🇳🇱 | NL item |
| `ru/` pages   | 🇷🇺 | RU item |
| `en/` pages   | 🇬🇧 | EN item |

### 4.4 Language switcher links per page depth

Since all language-versioned pages are exactly **2 levels deep** from `html/`
(e.g. `html/ru/novosti/index.html`), cross-language links use root-relative paths:

```html
<a href="/nl/">          <!-- from any page, always root-relative -->
<a href="/nl/nieuws/">
<a href="/ru/novosti/">
```

> **Note:** Root-relative paths (`/nl/…`) require HTTP hosting. For local `file://` development,
> replace with relative paths such as `../../nl/` from `ru/novosti/`. Phase 9 documents both.

### 4.5 CSS additions to `html/css/custom.css`

```css
/* ── Language switcher ──────────────────────────────────────────────── */
.lang-switcher .lang-current {
  font-size: 1.25rem;
  letter-spacing: -0.05em;
  padding: 0 0.3rem;
  line-height: 1;
}
.lang-switcher .lang-menu { min-width: 155px; }
.lang-switcher .lang-active {
  font-weight: 700;
  pointer-events: none;
}
```

---

## 5. Asset Path Rules After Migration

All language pages live exactly 2 levels deep: `html/{lang}/{slug}/index.html`.

| Asset | Relative path from any language page |
|-------|--------------------------------------|
| `css/pico.min.css` | `../../css/pico.min.css` |
| `css/custom.css` | `../../css/custom.css` |
| `fonts/fonts.css` | `../../fonts/fonts.css` |
| `img/favicon.png` | `../../img/favicon.png` |
| Same-language root | `../` |
| Same-language sibling page | `../sibling/` |

Exception: `ru/o-nas/etiket/` is **3 levels deep** → uses `../../../` prefix.

The `{PREFIX}` convention in `_template.html` must document all three depths.

---

## 6. Navigation Menu Labels per Language

### Russian nav (current, migrated to `ru/`)
```
[🇷🇺▾]  Главная▾  Расписание  Пожертвования  Галерея  Контакты  О нас
         └ Новости
           Мероприятия
           Воскресная школа
```

### Dutch nav (`nl/`)
```
[🇳🇱▾]  Hoofdmenu▾  Rooster  Donaties  Galerij  Contact  Over ons
         └ Nieuws
           Evenementen
           Zondagsschool
```

### English nav (`en/`)
```
[🇬🇧▾]  Home▾    Schedule  Donations  Gallery  Contact  About
         └ News
           Events
           Sunday School
```

---

## 7. Dummy Page Specification (NL & EN)

Dummy pages are **fully navigable stubs** — correct header, footer, language switcher, but minimal body.

Body content for dummy page:
```html
<main class="container" style="padding: 4rem 1rem; text-align: center;">
  <p style="font-size: 2rem;">🚧</p>
  <h2>[Page title in target language]</h2>
  <p>[Coming soon / In aanbouw / Under construction message in target language]</p>
  <p><a href="../">[Back to home in target language]</a></p>
</main>
```

NL dummy body text: *"Deze pagina is nog in aanbouw. Kom binnenkort terug."*  
EN dummy body text: *"This page is coming soon. Please check back later."*

---

## 8. _try.html File Specification

`_try.html` files are **machine-translated drafts** of the Russian source pages, placed alongside
`index.html` stubs in each language subfolder. They are:
- Full pages (complete HTML, correct nav, correct lang attribute)
- Content translated: all Russian text → target language
- Named `index_try.html` (not `index.html`) so they don't override the dummy
- For human review and manual refinement before promotion to `index.html`

Files to create per language:

| `_try.html` file | Source (RU) |
|------------------|-------------|
| `nl/index_try.html` | `ru/index.html` |
| `nl/nieuws/index_try.html` | `ru/novosti/index.html` |
| `nl/evenementen/index_try.html` | `ru/meropriyatiya/index.html` |
| `nl/zondagsschool/index_try.html` | `ru/voskresnaya-shkola/index.html` |
| `nl/rooster/index_try.html` | `ru/raspisanie/index.html` |
| `nl/donaties/index_try.html` | `ru/pozhertvovaniya/index.html` |
| `nl/galerij/index_try.html` | `ru/galereya/index.html` |
| `nl/contact/index_try.html` | `ru/kontakty/index.html` |
| `nl/over-ons/index_try.html` | `ru/o-nas/index.html` |
| `nl/etiquette/index_try.html` | `ru/o-nas/etiket/index.html` |
| `en/index_try.html` | `ru/index.html` |
| `en/news/index_try.html` | `ru/novosti/index.html` |
| `en/events/index_try.html` | `ru/meropriyatiya/index.html` |
| `en/sunday-school/index_try.html` | `ru/voskresnaya-shkola/index.html` |
| `en/schedule/index_try.html` | `ru/raspisanie/index.html` |
| `en/donations/index_try.html` | `ru/pozhertvovaniya/index.html` |
| `en/gallery/index_try.html` | `ru/galereya/index.html` |
| `en/contact/index_try.html` | `ru/kontakty/index.html` |
| `en/about/index_try.html` | `ru/o-nas/index.html` |
| `en/etiquette/index_try.html` | `ru/o-nas/etiket/index.html` |

---

## 9. hreflang Specification

Each page in every language includes these `<link>` tags in `<head>`:

```html
<!-- Example: ru/novosti/index.html -->
<link rel="alternate" hreflang="nl" href="https://www.orthodoxkerk.nl/nl/nieuws/">
<link rel="alternate" hreflang="ru" href="https://www.orthodoxkerk.nl/ru/novosti/">
<link rel="alternate" hreflang="en" href="https://www.orthodoxkerk.nl/en/news/">
<link rel="alternate" hreflang="x-default" href="https://www.orthodoxkerk.nl/nl/">
<link rel="canonical"               href="https://www.orthodoxkerk.nl/ru/novosti/">
```

`x-default` always points to the **NL (primary)** homepage.

---

## 10. Migration Phases

---

### Phase 1 — Preparation & Template Update
**Goal:** Lay groundwork; no pages moved yet.

**Files changed:**
- `html/_template.html` — update {PREFIX} docs, add language switcher `<li>` placeholder, annotate asset path rules for 3 depths
- `html/css/custom.css` — add `.lang-switcher` CSS block (Section 4.5)

**Checklist:**
- [ ] Add `.lang-switcher` CSS to `custom.css`
- [ ] Insert language switcher `<li>` (RU variant, since template is RU) as first nav item in `_template.html`
- [ ] Document `{PREFIX}` variants in `_template.html` comment header: `../` (lang root), `../../` (1 level), `../../../` (2 levels)
- [ ] No pages moved, no broken links at this point

**Acceptance:** Site looks identical; language switcher visible in header (links don't work yet since /nl/ doesn't exist).

---

### Phase 2 — RU Subtree Migration
**Goal:** Move all current Russian pages from `html/` root into `html/ru/`.

**Files changed / created:**
- Create `html/ru/` tree as per Section 2
- Flatten `glavnaya/` (novosti, meropriyatiya, voskresnaya-shkola move directly under `ru/`)
- Update all internal `href` links in every migrated page to new relative paths
- Update all asset references: `css/` → `../../css/`, etc. (or `../css/` for `ru/index.html`)
- Add language switcher (RU variant) as first nav item in every RU page
- Update `lang` attributes: already `lang="ru"` — no change needed

**Internal link adjustments example (ru/novosti/):**
```
Before: href="../raspisanie/index.html"
After:  href="../raspisanie/"          (sibling in ru/)
Assets: href="../../css/custom.css"
Logo:   href="../"                      (ru/ root)
```

**Checklist:**
- [ ] `ru/index.html` (from `index.html`) — PREFIX = `../`
- [ ] `ru/novosti/` (from `glavnaya/novosti/`) — PREFIX = `../../`
- [ ] `ru/meropriyatiya/` (from `glavnaya/meropriyatiya/`) — PREFIX = `../../`
- [ ] `ru/voskresnaya-shkola/` (from `glavnaya/voskresnaya-shkola/`) — PREFIX = `../../`
- [ ] `ru/raspisanie/` (from `raspisanie/`) — PREFIX = `../../` (keep `index2.html`)
- [ ] `ru/pozhertvovaniya/` — PREFIX = `../../`
- [ ] `ru/galereya/` — PREFIX = `../../`
- [ ] `ru/kontakty/` — PREFIX = `../../`
- [ ] `ru/o-nas/` — PREFIX = `../../`
- [ ] `ru/o-nas/etiket/` — PREFIX = `../../../`
- [ ] All cross-page links within RU verified and working
- [ ] Root `html/index.html` temporarily kept (not yet broken — Phase 8 handles it)

**Acceptance:** All RU pages load correctly from `html/ru/`; internal navigation works.

---

### Phase 3 — Language Switcher Polish & Testing
**Goal:** Verify language switcher renders correctly on all RU pages; adjust CSS if needed.

**Files changed:**
- `html/css/custom.css` — tweak if flag emoji sizing/alignment needs adjustment at various breakpoints
- Any RU page where switcher HTML needs correction

**Checklist:**
- [ ] Desktop: switcher shows flag icon + ▾, hover opens dropdown with 3 flags + names
- [ ] Mobile (≤768px): switcher appears inside hamburger menu, tappable
- [ ] Active language (RU) is bold/non-clickable in dropdown
- [ ] NL and EN links are present (will be 404 until Phase 4/5 — that's acceptable)
- [ ] No layout breakage in any RU page

**Acceptance:** Language switcher visually complete and functional on all RU pages.

---

### Phase 4 — NL Dummy Pages
**Goal:** Create complete `html/nl/` subfolder structure with navigable stub pages.

**Files created:** 10 × `nl/{slug}/index.html`

Each NL dummy page:
- Full HTML skeleton (head, header, main, footer)
- `lang="nl"`
- Language switcher (NL variant: 🇳🇱 active)
- NL navigation (see Section 6)
- Asset paths: `../../css/`, etc.
- Body: stub message per Section 7
- hreflang links pointing to RU counterparts (EN still 404 — omit EN hreflang until Phase 5)

**NL nav internal links example (`nl/nieuws/index.html`):**
```html
<a href="../">Hoofdmenu</a>
<a href="../evenementen/">Evenementen</a>
<a href="../rooster/">Rooster</a>
<!-- etc. -->
```

**Checklist:**
- [ ] `nl/index.html`
- [ ] `nl/nieuws/index.html`
- [ ] `nl/evenementen/index.html`
- [ ] `nl/zondagsschool/index.html`
- [ ] `nl/rooster/index.html`
- [ ] `nl/donaties/index.html`
- [ ] `nl/galerij/index.html`
- [ ] `nl/contact/index.html`
- [ ] `nl/over-ons/index.html`
- [ ] `nl/etiquette/index.html`
- [ ] All NL-internal nav links resolve correctly
- [ ] Language switcher: NL=active, RU links resolve to `ru/`, EN links are dead (acceptable)

**Acceptance:** Complete NL site navigation works; all pages load (as stubs).

---

### Phase 5 — EN Dummy Pages
**Goal:** Create complete `html/en/` subfolder structure with navigable stub pages.

**Files created:** 10 × `en/{slug}/index.html`

Identical approach to Phase 4 but for English.

**Checklist:**
- [ ] `en/index.html`
- [ ] `en/news/index.html`
- [ ] `en/events/index.html`
- [ ] `en/sunday-school/index.html`
- [ ] `en/schedule/index.html`
- [ ] `en/donations/index.html`
- [ ] `en/gallery/index.html`
- [ ] `en/contact/index.html`
- [ ] `en/about/index.html`
- [ ] `en/etiquette/index.html`
- [ ] Update NL pages to add EN hreflang links (now that EN exists)
- [ ] Update RU pages to add EN hreflang links

**Acceptance:** All three language sections navigable; language switcher cross-links all resolve.

---

### Phase 6 — NL Translation Drafts (_try.html)
**Goal:** Machine-translate all RU pages to Dutch; save as `index_try.html` alongside NL stubs.

**Source:** each `html/ru/{slug}/index.html`  
**Output:** `html/nl/{nl-slug}/index_try.html`

Translation scope per file:
- `<html lang="ru">` → `<html lang="nl">`
- `<title>` — translate
- `<h1>`, `<h2>`, `<hgroup>` — translate
- All body text, paragraphs, card text, section headings
- Navigation labels → NL nav labels (Section 6)
- Language switcher → NL variant
- Hero image `alt` texts
- `href` paths updated to NL slugs and `../../` asset paths
- **Do not translate:** image filenames, CSS class names, JS code, schedule CSV data

Special handling:
- `nl/rooster/index_try.html`: schedule data (CSV block) stays in Russian — dates/names are unchanged; only UI headings translate
- `nl/galerij/index_try.html`: photo captions translate if present

**20 files to create** (see full list in Section 8).

**Acceptance:** Each `_try.html` loads correctly; content is recognisably Dutch; nav links point to NL slugs.

---

### Phase 7 — EN Translation Drafts (_try.html)
**Goal:** Machine-translate all RU pages to English; save as `index_try.html` in EN subfolders.

Identical approach to Phase 6.

**20 files to create** (see full list in Section 8).

**Acceptance:** Each `_try.html` loads correctly; content is recognisably English.

---

### Phase 8 — Root Redirect & Legacy URL Handling
**Goal:** Update root `html/index.html` to redirect visitors to `/nl/` (primary language).

**Root `html/index.html`** becomes a redirect-only page:
```html
<!doctype html>
<html lang="nl">
<head>
  <meta charset="utf-8">
  <meta http-equiv="refresh" content="0; url=nl/">
  <link rel="canonical" href="https://www.orthodoxkerk.nl/nl/">
  <title>orthodoxkerk.nl</title>
  <script>window.location.replace('nl/');</script>
</head>
<body>
  <p><a href="nl/">orthodoxkerk.nl</a></p>
</body>
</html>
```

**Legacy URL stubs** — create thin redirect pages for old root-level paths that may be bookmarked or indexed:

| Old URL | Redirect to |
|---------|-------------|
| `html/raspisanie/` | `../ru/raspisanie/` |
| `html/galereya/` | `../ru/galereya/` |
| `html/kontakty/` | `../ru/kontakty/` |
| `html/o-nas/` | `../ru/o-nas/` |
| `html/pozhertvovaniya/` | `../ru/pozhertvovaniya/` |
| `html/glavnaya/novosti/` | `../../ru/novosti/` |
| `html/glavnaya/meropriyatiya/` | `../../ru/meropriyatiya/` |
| `html/glavnaya/voskresnaya-shkola/` | `../../ru/voskresnaya-shkola/` |

Each stub is a minimal HTML file with `<meta http-equiv="refresh">` + JS redirect.

**Checklist:**
- [ ] Root `index.html` redirects to `nl/`
- [ ] All legacy path stubs created
- [ ] Test: bookmarked RU URLs still land on correct RU pages

---

## 11. Phase Summary Table

| # | Phase | Primary files | Output |
|---|-------|--------------|--------|
| 1 | Preparation & Template Update | `_template.html`, `custom.css` | lang switcher CSS + template |
| 2 | RU Subtree Migration | 10 RU pages → `ru/` | working `/ru/` tree |
| 3 | Language Switcher Polish | `custom.css`, RU pages | verified switcher UX |
| 4 | NL Dummy Pages | 10 × `nl/*/index.html` | navigable NL stubs |
| 5 | EN Dummy Pages | 10 × `en/*/index.html` | navigable EN stubs + all hreflang active |
| 6 | NL Translation Drafts | 10 × `nl/*/index_try.html` | NL draft content |
| 7 | EN Translation Drafts | 10 × `en/*/index_try.html` | EN draft content |
| 8 | Root Redirect & Legacy | `index.html` + 8 stubs | clean entry points |

**Total new/modified files:** ~70

---

## 12. Out of Scope (for this migration)

- Server-side language detection (`.htaccess` / Nginx rules) — requires hosting config, not static HTML
- Automatic language preference cookie — JS enhancement, deferred
- Translation of `impressum/`, `privacyverklaring/`, `cookie-instellingen/` — NL-jurisdiction legal, stays Dutch only
- Translation of `TechManuals/` — internal admin, stays English
- Content updates / new text — migration only copies+translates existing RU content
- Schedule (`raspisanie/`) CSV data translation — schedule names are liturgical/proper nouns; keep RU data in all language versions of the schedule page

---

## 13. Open Questions for Human Decision

1. **Domain/path root:** Will the site be deployed at `https://www.orthodoxkerk.nl/` (root)? Root-relative links (`/nl/`) depend on this.
2. **NL as root default?** Should `orthodoxkerk.nl/` redirect to `/nl/` or should NL content live at root `/` with `/ru/` and `/en/` as sub-paths?
3. **Schedule in NL/EN:** Should `nl/rooster/` show the same JS-rendered schedule (Russian liturgical names), or a translated UI + original data?
4. **Gallery:** Photos have Russian captions. Translate captions per language version, or keep one shared gallery?
5. **Promotion workflow:** Once `_try.html` is reviewed, the human renames it to `index.html`. Should the dummy `index.html` be preserved as `index_dummy.html`? Or just overwritten?
