# Project Governance & Architecture Rules

## 1. Multi-Language Quran Dataset Management
- **Folder Isolation**:
  - `languages/Arabic/`: Contains ONLY Arabic Quran text (`surah_number`, `surah_name`, `revelation_place`, `verse_count`, `verses`). NO `surah_meaning` field.
  - `languages/Bahasa Indonesia/`: Contains official Indonesian translations with `surah_meaning` in Indonesian.
  - Other language folders: Contain translations corresponding strictly to their target language.
- **Dataset Schema (Standard English Keys)**:
  ```json
  {
    "surah_number": 8,
    "surah_name": "Al-Anfal",
    "surah_meaning": "Rampasan Perang", // (Only for translation languages)
    "revelation_place": "Madaniyah",
    "verse_count": 75,
    "verses": [
      { "verse_number": 1, "text": "..." }
    ]
  }
  ```
- **Merging & Immutability**:
  - When processing partial PDFs (e.g. across Juz boundaries), always merge verses by `verse_number` in ascending order without duplicating or overwriting existing verses.
  - Never alter, summarize, or paraphrase Quranic text or official translation text from source PDFs.

## 2. Preview & UI Rendering Principles
- **Source of Truth for Active View**:
  - The Quran preview component (`QuranPreview.tsx`) MUST ALWAYS render the text of the currently active file (`currentText`).
  - NEVER fall back to Arabic text when a translation language (e.g. Bahasa Indonesia, English) is selected.
  - Script & Direction: Apply RTL (`dir="rtl"`) and Arabic typography (`font-['Amiri']`) ONLY if the active file is in the Arabic folder or contains Arabic script. Non-Arabic translation datasets must be rendered in standard LTR typography.
- **Surah Header Metadata**:
  - Display Surah Number, Revelation Place (`revelation_place` / `tempat_turun`), and Verse Count as equal peer badges in the header row.
  - Sourced directly from the active JSON without unrequested word mutations.
