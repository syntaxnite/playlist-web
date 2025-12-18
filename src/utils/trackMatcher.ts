// Step 4: Tiered matching strategy

import { RawTrack, NormalizedTrack, MatchResult } from '../types/music';
import { 
  normalizeTrack, 
  calculateSimilarity, 
  calculateArtistOverlap, 
  isDurationSimilar 
} from './trackNormalizer';

export interface SearchResult {
  track: RawTrack;
  confidence: number;
  matchMethod: 'isrc' | 'metadata' | 'fuzzy';
}

/**
 * Main track matching function with tiered strategy
 */
export async function matchTrack(
  sourceTrack: RawTrack,
  searchFunction: (query: string, filters?: any) => Promise<RawTrack[]>
): Promise<MatchResult> {
  const normalized = normalizeTrack(sourceTrack);
  
  try {
    // Tier 1: ISRC match (best)
    if (normalized.isrc) {
      const isrcResult = await matchByISRC(normalized.isrc, searchFunction);
      if (isrcResult.success) {
        return isrcResult;
      }
    }
    
    // Tier 2: Exact-ish metadata match
    const metadataResult = await matchByMetadata(normalized, searchFunction);
    if (metadataResult.success && metadataResult.confidence === 'high') {
      return metadataResult;
    }
    
    // Tier 3: Fuzzy fallback (only if confidence is reasonable)
    const fuzzyResult = await matchByFuzzySearch(normalized, searchFunction);
    if (fuzzyResult.success && fuzzyResult.confidence !== 'low') {
      return fuzzyResult;
    }
    
    // No confident match found
    return {
      success: false,
      confidence: 'low',
      matchMethod: 'none',
      reason: 'No confident match found. False positives are worse than misses.'
    };
    
  } catch (error) {
    return {
      success: false,
      confidence: 'low',
      matchMethod: 'none',
      reason: `Search failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

/**
 * Tier 1: Match by ISRC (International Standard Recording Code)
 */
async function matchByISRC(
  isrc: string,
  searchFunction: (query: string, filters?: any) => Promise<RawTrack[]>
): Promise<MatchResult> {
  try {
    const results = await searchFunction(`isrc:${isrc}`);
    
    if (results.length > 0) {
      // ISRC is a fingerprint - first result is authoritative
      return {
        success: true,
        track: results[0],
        confidence: 'high',
        matchMethod: 'isrc'
      };
    }
    
    return { success: false, confidence: 'low', matchMethod: 'isrc' };
  } catch (error) {
    return { success: false, confidence: 'low', matchMethod: 'isrc' };
  }
}

/**
 * Tier 2: Match by metadata (artist + title)
 */
async function matchByMetadata(
  track: NormalizedTrack,
  searchFunction: (query: string, filters?: any) => Promise<RawTrack[]>
): Promise<MatchResult> {
  try {
    // Search with primary artist + title
    const primaryArtist = track.artists[0] || '';
    const query = `${primaryArtist} ${track.title}`.trim();
    
    if (!query) {
      return { success: false, confidence: 'low', matchMethod: 'metadata' };
    }
    
    const results = await searchFunction(query);
    
    // Filter and score results
    const scoredResults = results
      .map(result => scoreMetadataMatch(track, normalizeTrack(result), result))
      .filter(result => result.confidence > 0.7) // Only high confidence matches
      .sort((a, b) => b.confidence - a.confidence);
    
    if (scoredResults.length > 0) {
      const best = scoredResults[0];
      return {
        success: true,
        track: best.track,
        confidence: best.confidence > 0.9 ? 'high' : 'medium',
        matchMethod: 'metadata'
      };
    }
    
    return { success: false, confidence: 'low', matchMethod: 'metadata' };
  } catch (error) {
    return { success: false, confidence: 'low', matchMethod: 'metadata' };
  }
}

/**
 * Tier 3: Fuzzy fallback matching
 */
async function matchByFuzzySearch(
  track: NormalizedTrack,
  searchFunction: (query: string, filters?: any) => Promise<RawTrack[]>
): Promise<MatchResult> {
  try {
    // Try just the title if artist+title failed
    const results = await searchFunction(track.title);
    
    const scoredResults = results
      .map(result => scoreFuzzyMatch(track, normalizeTrack(result), result))
      .filter(result => result.confidence > 0.6) // Lower threshold for fuzzy
      .sort((a, b) => b.confidence - a.confidence);
    
    if (scoredResults.length > 0) {
      const best = scoredResults[0];
      // Be conservative with fuzzy matches
      return {
        success: true,
        track: best.track,
        confidence: best.confidence > 0.8 ? 'medium' : 'low',
        matchMethod: 'fuzzy'
      };
    }
    
    return { success: false, confidence: 'low', matchMethod: 'fuzzy' };
  } catch (error) {
    return { success: false, confidence: 'low', matchMethod: 'fuzzy' };
  }
}

/**
 * Score metadata match quality
 */
function scoreMetadataMatch(source: NormalizedTrack, candidate: NormalizedTrack, original: RawTrack): SearchResult {
  let score = 0;
  
  // Title similarity (40% weight)
  const titleSim = calculateSimilarity(source.title, candidate.title);
  score += titleSim * 0.4;
  
  // Artist overlap (35% weight)
  const artistOverlap = calculateArtistOverlap(source.artists, candidate.artists);
  score += artistOverlap * 0.35;
  
  // Duration similarity (25% weight)
  if (source.duration && candidate.duration) {
    const durationSim = isDurationSimilar(source.duration, candidate.duration) ? 1 : 0;
    score += durationSim * 0.25;
  }
  
  return {
    track: original,
    confidence: score,
    matchMethod: 'metadata'
  };
}

/**
 * Score fuzzy match quality
 */
function scoreFuzzyMatch(source: NormalizedTrack, candidate: NormalizedTrack, original: RawTrack): SearchResult {
  let score = 0;
  
  // Title similarity (50% weight for fuzzy)
  const titleSim = calculateSimilarity(source.title, candidate.title);
  score += titleSim * 0.5;
  
  // Artist overlap (30% weight)
  const artistOverlap = calculateArtistOverlap(source.artists, candidate.artists);
  score += artistOverlap * 0.3;
  
  // Duration bonus (20% weight)
  if (source.duration && candidate.duration) {
    const durationSim = isDurationSimilar(source.duration, candidate.duration, 5000) ? 1 : 0;
    score += durationSim * 0.2;
  }
  
  return {
    track: original,
    confidence: score,
    matchMethod: 'fuzzy'
  };
}