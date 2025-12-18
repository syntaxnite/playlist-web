// Core types for the music conversion system

export interface RawTrack {
  title: string;
  artists: string[];
  album: string;
  duration: number; // milliseconds
  isrc?: string;
}

export interface NormalizedTrack {
  title: string;
  artists: string[];
  duration: number;
  isrc?: string;
  originalTitle: string;
  originalArtists: string[];
}

export interface MatchResult {
  success: boolean;
  track?: RawTrack;
  confidence: 'high' | 'medium' | 'low';
  matchMethod: 'isrc' | 'metadata' | 'fuzzy' | 'none';
  reason?: string;
}

export interface ConversionResult {
  totalTracks: number;
  successCount: number;
  failedTracks: Array<{
    original: RawTrack;
    reason: string;
  }>;
  playlistUrl?: string;
  playlistId?: string;
}

export interface UrlPattern {
  domain: string;
  pattern: RegExp;
  service: string;
}

export interface ServiceAuth {
  token?: string;
  expiresAt?: number;
  scopes: string[];
}