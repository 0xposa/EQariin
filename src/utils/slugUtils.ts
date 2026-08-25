/**
 * Utility functions for generating and matching URL-safe slugs for Surahs.
 */

/**
 * Converts any original surah name or file name into a clean, URL-safe slug.
 * 
 * Rules:
 * - All lowercase
 * - Apostrophes (', ’, `, ʻ, ʼ) and special symbols removed
 * - Spaces and underscores converted to hyphens
 * - Multiple consecutive hyphens collapsed
 * - Leading and trailing hyphens removed
 * 
 * Examples:
 * - "Al-An'am" -> "al-anam"
 * - "Al-Ma'idah" -> "al-maidah"
 * - "Ali Imran" -> "ali-imran"
 * - "Al-Fatihah.json" -> "al-fatihah"
 */
export function toSurahSlug(input: string | number): string {
  if (typeof input === 'number') {
    return String(input);
  }
  if (!input) return '';

  return input
    .replace(/\.json$/i, '')
    .toLowerCase()
    // Remove apostrophes, single quotes, accents, backticks, arabic hamza/ayn transliterations
    .replace(/['’`'ʻʼ]/g, '')
    // Replace non-alphanumeric characters (except existing hyphens) with hyphens
    .replace(/[^a-z0-9-]+/g, '-')
    // Collapse multiple consecutive hyphens into a single hyphen
    .replace(/-+/g, '-')
    // Remove leading and trailing hyphens
    .replace(/^-+|-+$/g, '');
}

/**
 * Checks if a candidate surah name/filename matches a given search slug or string.
 */
export function matchesSurahSlug(candidateNameOrFile: string, searchSlug: string): boolean {
  if (!candidateNameOrFile || !searchSlug) return false;
  return toSurahSlug(candidateNameOrFile) === toSurahSlug(searchSlug);
}
