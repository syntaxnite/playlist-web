// Step 1: URL parsing and service detection

import { UrlPattern } from '../types/music';

const URL_PATTERNS: UrlPattern[] = [
  {
    domain: 'spotify.com',
    pattern: /^https?:\/\/(open\.)?spotify\.com\/playlist\/([a-zA-Z0-9]+)/,
    service: 'spotify'
  },
  {
    domain: 'music.apple.com',
    pattern: /^https?:\/\/music\.apple\.com\/[a-z]{2}\/playlist\/[^\/]+\/([a-zA-Z0-9\.\-]+)/,
    service: 'apple'
  },
  {
    domain: 'music.youtube.com',
    pattern: /^https?:\/\/music\.youtube\.com\/playlist\?list=([a-zA-Z0-9\-_]+)/,
    service: 'youtube'
  },
  {
    domain: 'deezer.com',
    pattern: /^https?:\/\/(www\.)?deezer\.com\/[a-z]{2}\/playlist\/([0-9]+)/,
    service: 'deezer'
  },
  {
    domain: 'tidal.com',
    pattern: /^https?:\/\/(listen\.)?tidal\.com\/playlist\/([a-zA-Z0-9\-]+)/,
    service: 'tidal'
  }
];

export interface ParsedUrl {
  service: string;
  playlistId: string;
  isValid: boolean;
  error?: string;
}

export function parsePlaylistUrl(url: string): ParsedUrl {
  if (!url || typeof url !== 'string') {
    return {
      service: '',
      playlistId: '',
      isValid: false,
      error: 'Please provide a valid URL'
    };
  }

  // Clean the URL
  const cleanUrl = url.trim();

  for (const pattern of URL_PATTERNS) {
    const match = cleanUrl.match(pattern.pattern);
    if (match) {
      const playlistId = match[match.length - 1]; // Last capture group
      return {
        service: pattern.service,
        playlistId,
        isValid: true
      };
    }
  }

  return {
    service: '',
    playlistId: '',
    isValid: false,
    error: 'This playlist URL is not supported. Please use a playlist link from Spotify, Apple Music, YouTube Music, Deezer, or Tidal.'
  };
}

export function getSupportedDomains(): string[] {
  return URL_PATTERNS.map(pattern => pattern.domain);
}

export function isUrlSupported(url: string): boolean {
  return parsePlaylistUrl(url).isValid;
}