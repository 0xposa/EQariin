import { SurahJsonObject } from '../types';

/**
 * Parses a JSON string into a SurahJsonObject.
 */
export function parseSurahJson(jsonString: string): SurahJsonObject | null {
  try {
    return JSON.parse(jsonString) as SurahJsonObject;
  } catch (error) {
    console.error('Failed to parse Surah JSON:', error);
    return null;
  }
}
