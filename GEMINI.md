# Quran Dataset & Application Standards

## 1. Language Dataset Governance
- **Strict Language Separation**:
  - `languages/Arabic/`: Pure Arabic Quranic text only. No translation and no `surah_meaning`.
  - `languages/Bahasa Indonesia/`: Official Indonesian translation + `surah_meaning` (Indonesian).
  - Each translation language dataset strictly contains translated text in `verses[].text`.
- **JSON Structure**:
  - Keys: `surah_number`, `surah_name`, `surah_meaning` (non-Arabic only), `revelation_place`, `verse_count`, `verses` with `verse_number` and `text`.
  - Incremental merging: When new verses from subsequent Juz are provided, append and sort by `verse_number`.

## 2. Rendering Rules (Preventing Regression)
- **Active File Integrity**:
  - When switching language folders (e.g. from `Arabic` to `Bahasa Indonesia`), the rendered verse text MUST display the content of the selected language file (`currentText`), NEVER default or fall back to Arabic text.
  - Direction (`dir="rtl"` vs `dir="ltr"`) and typography must dynamically match the active language/script.
- **Header Metadata**:
  - Surah number, revelation place, and total verses are displayed in a clean metadata row directly matching JSON values.
