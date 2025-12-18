// Types for the new playlist preview system

import { EnhancedTrack } from '../services/musicAPIs';

export interface PlaylistPreview {
  id: string;
  name: string;
  description?: string;
  sourceService: string;
  totalTracks: number;
  imageUrl?: string;
  tracks: TrackPreview[];
}

export interface TrackPreview {
  id: string;
  title: string;
  artists: string[];
  album: string;
  duration: number;
  isrc?: string;
  status: 'pending' | 'found' | 'not-found' | 'checking';
  confidence?: number;
  matchedTrack?: EnhancedTrack;
  suggestions?: EnhancedTrack[];
  error?: string;
}

export interface CheckProgress {
  checkedTracks: number;
  totalTracks: number;
  foundTracks: number;
  notFoundTracks: number;
  percentage: number;
}