// Step 3: Track normalization - SoundRelay's secret sauce

import { RawTrack, NormalizedTrack } from '../types/music';

/**
 * Normalize track data for accurate matching
 * This is critical for cross-platform track matching
 */
export function normalizeTrack(track: RawTrack): NormalizedTrack {
  return {
    title: normalizeTitle(track.title),
    artists: track.artists.map(normalizeArtist),
    duration: track.duration,
    isrc: track.isrc,
    originalTitle: track.title,
    originalArtists: [...track.artists]
  };
}

/**
 * Normalize track title for matching
 */
function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    // Remove common suffixes and prefixes
    .replace(/\s*\(remaster(ed)?\)/gi, '')
    .replace(/\s*\(re-?master(ed)?\)/gi, '')
    .replace(/\s*\(radio edit\)/gi, '')
    .replace(/\s*\(single version\)/gi, '')
    .replace(/\s*\(album version\)/gi, '')
    .replace(/\s*\(explicit\)/gi, '')
    .replace(/\s*\(clean\)/gi, '')
    .replace(/\s*\(feat\..*?\)/gi, '')
    .replace(/\s*\(featuring.*?\)/gi, '')
    .replace(/\s*\(with.*?\)/gi, '')
    .replace(/\s*\(live\)/gi, '')
    .replace(/\s*\(acoustic\)/gi, '')
    .replace(/\s*\(remix\)/gi, '')
    .replace(/\s*-\s*(radio edit|single|album version)/gi, '')
    // Remove extra punctuation
    .replace(/[^\w\s]/g, ' ')
    // Collapse whitespace
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Normalize artist name for matching
 */
function normalizeArtist(artist: string): string {
  return artist
    .toLowerCase()
    .replace(/^the\s+/i, '') // Remove "The" prefix
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Calculate similarity between two strings (0-1)
 */
export function calculateSimilarity(str1: string, str2: string): number {
  const a = str1.toLowerCase();
  const b = str2.toLowerCase();
  
  if (a === b) return 1;
  
  const longer = a.length > b.length ? a : b;
  const shorter = a.length > b.length ? b : a;
  
  if (longer.length === 0) return 1;
  
  const editDistance = levenshteinDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
}

/**
 * Calculate Levenshtein distance between two strings
 */
function levenshteinDistance(str1: string, str2: string): number {
  const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
  
  for (let i = 0; i <= str1.length; i++) {
    matrix[0][i] = i;
  }
  
  for (let j = 0; j <= str2.length; j++) {
    matrix[j][0] = j;
  }
  
  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1, // deletion
        matrix[j - 1][i] + 1, // insertion
        matrix[j - 1][i - 1] + indicator // substitution
      );
    }
  }
  
  return matrix[str2.length][str1.length];
}

/**
 * Check if artists overlap between two tracks
 */
export function calculateArtistOverlap(artists1: string[], artists2: string[]): number {
  const normalized1 = artists1.map(normalizeArtist);
  const normalized2 = artists2.map(normalizeArtist);
  
  let matches = 0;
  for (const artist1 of normalized1) {
    for (const artist2 of normalized2) {
      if (calculateSimilarity(artist1, artist2) > 0.8) {
        matches++;
        break;
      }
    }
  }
  
  return matches / Math.max(normalized1.length, normalized2.length);
}

/**
 * Check if durations are similar (within tolerance)
 */
export function isDurationSimilar(duration1: number, duration2: number, toleranceMs: number = 3000): boolean {
  return Math.abs(duration1 - duration2) <= toleranceMs;
}