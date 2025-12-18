// Service API integrations for actual playlist creation

import { RawTrack } from '../types/music';
import { authManager } from '../utils/authManager';

export interface PlaylistInfo {
  id: string;
  name: string;
  url: string;
  trackCount: number;
}

export interface CreatePlaylistParams {
  name: string;
  description?: string;
  isPublic?: boolean;
}

// Extended track type with service-specific IDs
export interface EnhancedTrack extends RawTrack {
  spotifyId?: string;
  appleId?: string;
  youtubeId?: string;
  deezerId?: string;
  tidalId?: string;
}

/**
 * Service-specific API integrations
 */
export class ServiceAPI {
  
  /**
   * Fetch playlist tracks from source service
   */
  async fetchPlaylist(service: string, playlistId: string): Promise<EnhancedTrack[]> {
    const auth = await authManager.getAuth(service);
    if (!auth) {
      throw new Error(`Authentication failed for ${service}`);
    }

    switch (service) {
      case 'spotify':
        return this.fetchSpotifyPlaylist(playlistId, auth.token!);
      case 'apple':
        return this.fetchApplePlaylist(playlistId, auth.token!);
      case 'youtube':
        return this.fetchYouTubePlaylist(playlistId, auth.token!);
      case 'deezer':
        return this.fetchDeezerPlaylist(playlistId, auth.token!);
      case 'tidal':
        return this.fetchTidalPlaylist(playlistId, auth.token!);
      default:
        throw new Error(`Unsupported service: ${service}`);
    }
  }

  /**
   * Search for tracks in destination service
   */
  async searchTracks(service: string, query: string): Promise<EnhancedTrack[]> {
    const auth = await authManager.getAuth(service);
    if (!auth) {
      throw new Error(`Authentication failed for ${service}`);
    }

    switch (service) {
      case 'spotify':
        return this.searchSpotifyTracks(query, auth.token!);
      case 'apple':
        return this.searchAppleTracks(query, auth.token!);
      case 'youtube':
        return this.searchYouTubeTracks(query, auth.token!);
      case 'deezer':
        return this.searchDeezerTracks(query, auth.token!);
      case 'tidal':
        return this.searchTidalTracks(query, auth.token!);
      default:
        throw new Error(`Unsupported service: ${service}`);
    }
  }

  /**
   * Create a new playlist in destination service
   */
  async createPlaylist(service: string, params: CreatePlaylistParams): Promise<PlaylistInfo> {
    const auth = await authManager.getAuth(service);
    if (!auth) {
      throw new Error(`Authentication failed for ${service}`);
    }

    switch (service) {
      case 'spotify':
        return this.createSpotifyPlaylist(params, auth.token!);
      case 'apple':
        return this.createApplePlaylist(params, auth.token!);
      case 'youtube':
        return this.createYouTubePlaylist(params, auth.token!);
      case 'deezer':
        return this.createDeezerPlaylist(params, auth.token!);
      case 'tidal':
        return this.createTidalPlaylist(params, auth.token!);
      default:
        throw new Error(`Unsupported service: ${service}`);
    }
  }

  /**
   * Add tracks to playlist in batches
   */
  async addTracksToPlaylist(
    service: string, 
    playlistId: string, 
    tracks: RawTrack[],
    onProgress?: (added: number) => void
  ): Promise<void> {
    const auth = await authManager.getAuth(service);
    if (!auth) {
      throw new Error(`Authentication failed for ${service}`);
    }

    switch (service) {
      case 'spotify':
        return this.addTracksToSpotifyPlaylist(playlistId, tracks, auth.token!, onProgress);
      case 'apple':
        return this.addTracksToApplePlaylist(playlistId, tracks, auth.token!, onProgress);
      case 'youtube':
        return this.addTracksToYouTubePlaylist(playlistId, tracks, auth.token!, onProgress);
      case 'deezer':
        return this.addTracksToDeezerPlaylist(playlistId, tracks, auth.token!, onProgress);
      case 'tidal':
        return this.addTracksToTidalPlaylist(playlistId, tracks, auth.token!, onProgress);
      default:
        throw new Error(`Unsupported service: ${service}`);
    }
  }

  // ===== SPOTIFY IMPLEMENTATIONS =====
  
  private async fetchSpotifyPlaylist(playlistId: string, token: string): Promise<EnhancedTrack[]> {
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=50`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Spotify playlist: ${response.statusText}`);
    }

    const data = await response.json();
    const tracks: EnhancedTrack[] = [];

    for (const item of data.items) {
      if (item.track && item.track.type === 'track') {
        tracks.push({
          title: item.track.name,
          artists: item.track.artists.map((artist: any) => artist.name),
          album: item.track.album.name,
          duration: item.track.duration_ms,
          isrc: item.track.external_ids?.isrc,
          spotifyId: item.track.id
        });
      }
    }

    // Handle pagination
    let nextUrl = data.next;
    while (nextUrl) {
      const nextResponse = await fetch(nextUrl, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const nextData = await nextResponse.json();
      
      for (const item of nextData.items) {
        if (item.track && item.track.type === 'track') {
          tracks.push({
            title: item.track.name,
            artists: item.track.artists.map((artist: any) => artist.name),
            album: item.track.album.name,
            duration: item.track.duration_ms,
            isrc: item.track.external_ids?.isrc,
            spotifyId: item.track.id
          });
        }
      }
      
      nextUrl = nextData.next;
    }

    return tracks;
  }

  private async searchSpotifyTracks(query: string, token: string): Promise<EnhancedTrack[]> {
    const searchQuery = encodeURIComponent(query);
    const response = await fetch(`https://api.spotify.com/v1/search?q=${searchQuery}&type=track&limit=20`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Spotify search failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.tracks.items.map((track: any): EnhancedTrack => ({
      title: track.name,
      artists: track.artists.map((artist: any) => artist.name),
      album: track.album.name,
      duration: track.duration_ms,
      isrc: track.external_ids?.isrc,
      spotifyId: track.id
    }));
  }

  private async createSpotifyPlaylist(params: CreatePlaylistParams, token: string): Promise<PlaylistInfo> {
    // Get user ID first
    const userResponse = await fetch('https://api.spotify.com/v1/me', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const userData = await userResponse.json();
    const userId = userData.id;

    // Create playlist
    const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: params.name,
        description: params.description || '',
        public: params.isPublic ?? false
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to create Spotify playlist: ${response.statusText}`);
    }

    const playlist = await response.json();
    return {
      id: playlist.id,
      name: playlist.name,
      url: playlist.external_urls.spotify,
      trackCount: 0
    };
  }

  private async addTracksToSpotifyPlaylist(
    playlistId: string, 
    tracks: RawTrack[], 
    token: string,
    onProgress?: (added: number) => void
  ): Promise<void> {
    const batchSize = 100; // Spotify's max
    let added = 0;

    for (let i = 0; i < tracks.length; i += batchSize) {
      const batch = tracks.slice(i, i + batchSize);
      const trackUris = batch
        .filter(track => (track as any).spotifyId)
        .map(track => `spotify:track:${(track as any).spotifyId}`);

      if (trackUris.length === 0) continue;

      const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uris: trackUris
        })
      });

      if (!response.ok) {
        console.warn(`Failed to add batch to Spotify playlist: ${response.statusText}`);
        continue;
      }

      added += trackUris.length;
      onProgress?.(added);

      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  // ===== PLACEHOLDER IMPLEMENTATIONS FOR OTHER SERVICES =====
  // These would be implemented similarly with each service's specific API

  private async fetchApplePlaylist(playlistId: string, token: string): Promise<RawTrack[]> {
    // Apple Music API implementation
    throw new Error('Apple Music integration coming soon');
  }

  private async searchAppleTracks(query: string, token: string, filters?: any): Promise<RawTrack[]> {
    // Apple Music search implementation
    throw new Error('Apple Music integration coming soon');
  }

  private async createApplePlaylist(params: CreatePlaylistParams, token: string): Promise<PlaylistInfo> {
    throw new Error('Apple Music integration coming soon');
  }

  private async addTracksToApplePlaylist(playlistId: string, tracks: RawTrack[], token: string, onProgress?: (added: number) => void): Promise<void> {
    throw new Error('Apple Music integration coming soon');
  }

  private async fetchYouTubePlaylist(playlistId: string, token: string): Promise<RawTrack[]> {
    // YouTube Music API implementation
    throw new Error('YouTube Music integration coming soon');
  }

  private async searchYouTubeTracks(query: string, token: string, filters?: any): Promise<RawTrack[]> {
    throw new Error('YouTube Music integration coming soon');
  }

  private async createYouTubePlaylist(params: CreatePlaylistParams, token: string): Promise<PlaylistInfo> {
    throw new Error('YouTube Music integration coming soon');
  }

  private async addTracksToYouTubePlaylist(playlistId: string, tracks: RawTrack[], token: string, onProgress?: (added: number) => void): Promise<void> {
    throw new Error('YouTube Music integration coming soon');
  }

  private async fetchDeezerPlaylist(playlistId: string, token: string): Promise<RawTrack[]> {
    // Deezer API implementation
    throw new Error('Deezer integration coming soon');
  }

  private async searchDeezerTracks(query: string, token: string, filters?: any): Promise<RawTrack[]> {
    throw new Error('Deezer integration coming soon');
  }

  private async createDeezerPlaylist(params: CreatePlaylistParams, token: string): Promise<PlaylistInfo> {
    throw new Error('Deezer integration coming soon');
  }

  private async addTracksToDeezerPlaylist(playlistId: string, tracks: RawTrack[], token: string, onProgress?: (added: number) => void): Promise<void> {
    throw new Error('Deezer integration coming soon');
  }

  private async fetchTidalPlaylist(playlistId: string, token: string): Promise<RawTrack[]> {
    // Tidal API implementation
    throw new Error('Tidal integration coming soon');
  }

  private async searchTidalTracks(query: string, token: string, filters?: any): Promise<RawTrack[]> {
    throw new Error('Tidal integration coming soon');
  }

  private async createTidalPlaylist(params: CreatePlaylistParams, token: string): Promise<PlaylistInfo> {
    throw new Error('Tidal integration coming soon');
  }

  private async addTracksToTidalPlaylist(playlistId: string, tracks: RawTrack[], token: string, onProgress?: (added: number) => void): Promise<void> {
    throw new Error('Tidal integration coming soon');
  }
}

// Export singleton instance
export const serviceAPI = new ServiceAPI();