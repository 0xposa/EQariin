# Project Governance & Architecture Rules

## 1. Multi-Language Quran Dataset Management
- **Folder Isolation**:
  - `languages/Arabic/`: Contains ONLY Arabic Quran text (`surah_number`, `surah_name`, `revelation_place`, `ayat_count`, `ayat`). NO `surah_meaning` field.
  - `languages/Bahasa Indonesia/`: Contains official Indonesian translations with `surah_meaning` in Indonesian.
  - Other language folders: Contain translations corresponding strictly to their target language.
- **Dataset Schema (Standard English Keys)**:
  ```json
  {
    "surah_number": 8,
    "surah_name": "Al-Anfal",
    "surah_meaning": "Rampasan Perang", // (Only for translation languages)
    "revelation_place": "Madaniyah",
    "ayat_count": 75,
    "ayat": [
      { "ayat_number": 1, "text": "..." }
    ]
  }
  ```
- **Merging & Immutability**:
  - When processing partial PDFs (e.g. across Juz boundaries), always merge verses by `ayat_number` in ascending order without duplicating or overwriting existing verses.
  - Never alter, summarize, or paraphrase Quranic text or official translation text from source PDFs.

## 2. Preview & UI Rendering Principles
- **Source of Truth for Active View**:
  - The Quran preview component (`QuranPreview.tsx`) MUST ALWAYS render the text of the currently active file (`currentText`).
  - NEVER fall back to Arabic text when a translation language (e.g. Bahasa Indonesia, English) is selected.
  - Script & Direction: Apply RTL (`dir="rtl"`) and Arabic typography (`font-['Amiri']`) ONLY if the active file is in the Arabic folder or contains Arabic script. Non-Arabic translation datasets must be rendered in standard LTR typography.
- **Surah Header Metadata**:
  - Display Surah Number, Revelation Place (`revelation_place` / `tempat_turun`), and Verse Count as equal peer badges in the header row.
  - Sourced directly from the active JSON without unrequested word mutations.

## 3. Translation Source Policy
- The 7 non-Indonesian, non-Arabic translation languages (English, Mandarin, Spanish, Japanese, Turkish, French, Malay) MUST use official King Fahd Complex translations as the source, NEVER AI-generated translations, even though this is slower.
- Only Arabic (from official Quran text) and Bahasa Indonesia (from Kemenag RI's official 2019 translation) may currently be AI-assisted extraction from PDF, since their sources are already confirmed official.
- Do not generate translation text for the 7 languages above unless an official source document is explicitly provided.

## 4. URL & Slug System
- Surah names in JSON (`surah_name`) may contain special characters (e.g. apostrophes: "Al-An'am", "Al-Ma'idah", "Al-A'raf"). These must NEVER be altered in the JSON data.
- For any URL, shareable link, or query parameter, ALWAYS use the URL-safe slug generated via `toSurahSlug()` (in `src/utils/slugUtils.ts`), never the raw `surah_name`.
- UI display (titles, breadcrumbs, verse cards) must always use the raw `surah_name` from JSON, never the slug.

## 5. UI Language vs Content Language Separation
- The "App Language" selector (UI chrome labels only) is fully independent from the "Select Language Folder" dropdown (surah content).
- **Surah Meaning beside Surah Name**: The value from the `surah_meaning` key is displayed directly beside `surah_name` in parentheses (e.g. `Al-Baqarah (Sapi Betina)`).
  - The value of `surah_meaning` follows the active App Language (`appLanguage`).
  - **Exception for Arabic**: This does NOT apply to Arabic (`tidak berlaku bagi bahasa arab!`). When Arabic is selected as the App Language, `surah_meaning` is omitted.
  - **Strict No-Fallback Rule**: If the JSON file for that surah in the target language does not exist in the `languages/` folders, `surah_meaning` MUST NOT be filled (must remain empty). Never use hardcoded dictionaries, artificial fallbacks, or surrogate translations. This applies strictly to ALL languages.
- `surah_name` itself follows the raw name from the active JSON data.
- Only generic UI chrome text (buttons, badges, breadcrumb labels like "languages", verse/surah number prefixes, revelation place translation) follows "App Language", via the `uiLabels.ts` dictionary.
- **Universal "Ayat" Terminology**: Across ALL languages (English, Arabic, Mandarin, Spanish, Japanese, Turkish, French, Malay, Bahasa Indonesia), the label for verses MUST always use the word `"Ayat"` (e.g. `ayatLabel: "Ayat"`, `ayat_number`, `ayat_count`).

## 6. Long Surah Processing Protocol
- For surahs spanning multiple Juz PDFs, or when explicitly instructed, process ONE language folder at a time per request — never generate all 9 language folders in a single response for long surahs, to avoid truncated or incomplete output.

## 7. Self-Documentation Requirement
- After completing any task that changes the project's schema, architecture, naming conventions, or established rules (e.g. changing JSON field names, renaming the project, changing the translation source policy, modifying the slug system), the AI MUST update this file (AGENTS.md) in the same response to reflect the change.
- Do NOT wait to be asked separately to update this file — updating it is part of completing the task itself.

## 8. Layout & Responsive Viewport Standards
- **Full-Width Edge-to-Edge Alignment**:
  - The application layout must adapt fluidly across all viewport widths and zoom levels.
  - Header (`Navbar`), main content sections (Hero, Investor, Features, World Languages), and Footer must use a uniform horizontal padding guide (`w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16`) so that left and right edges align consistently throughout the app.
  - Avoid restricting top-level sections with arbitrary fixed `max-w` containers (e.g. `max-w-3xl`, `max-w-6xl`, `max-w-7xl` with `mx-auto`) that cause jagged alignment or wide dead spaces on wide/zoomed displays.
- **Fixed Header Scroll Margin**:
  - Because `Navbar` is fixed, `html` must maintain `scroll-padding-top` (at least `5.5rem`) and sections with anchors must include `scroll-mt` to prevent section headers from being obscured when scrolled to.
