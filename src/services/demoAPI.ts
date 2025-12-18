// Demo mode service for testing without API keys

import { EnhancedTrack, PlaylistInfo, CreatePlaylistParams } from './musicAPIs';

export class DemoServiceAPI {
  
  /**
   * Demo fetch playlist - returns sample tracks
   */
  async fetchPlaylist(service: string, playlistId: string): Promise<EnhancedTrack[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return [
      {
        title: 'Blinding Lights',
        artists: ['The Weeknd'],
        album: 'After Hours',
        duration: 200040,
        isrc: 'USUG11904252',
        spotifyId: service === 'spotify' ? '0VjIjW4GlULA4m4D5W0i1g' : undefined
      },
      {
        title: 'Watermelon Sugar',
        artists: ['Harry Styles'],
        album: 'Fine Line', 
        duration: 174000,
        isrc: 'USSM12003861',
        spotifyId: service === 'spotify' ? '6UelLqGlWMcVH1E5c4H7lY' : undefined
      },
      {
        title: 'Levitating',
        artists: ['Dua Lipa'],
        album: 'Future Nostalgia',
        duration: 203064,
        isrc: 'GBBKS1900470',
        spotifyId: service === 'spotify' ? '463CkQjx2Zk1yXoBuierM9' : undefined
      },
      {
        title: 'Good 4 U',
        artists: ['Olivia Rodrigo'],
        album: 'SOUR',
        duration: 178147,
        isrc: 'USUG12101294',
        spotifyId: service === 'spotify' ? '4ZtFanR9U6ndgddUvNcjcG' : undefined
      },
      {
        title: 'Save Your Tears',
        artists: ['The Weeknd'],
        album: 'After Hours',
        duration: 215441,
        isrc: 'USUG11904264',
        spotifyId: service === 'spotify' ? '5QO79kh1waicV47BqGRL3g' : undefined
      }
    ];
  }

  /**
   * Demo search tracks - returns matching sample results
   */
  async searchTracks(service: string, query: string): Promise<EnhancedTrack[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const allDemoTracks: EnhancedTrack[] = [
      {
        title: 'Blinding Lights',
        artists: ['The Weeknd'],
        album: 'After Hours',
        duration: 200040,
        isrc: 'USUG11904252',
        spotifyId: service === 'spotify' ? '0VjIjW4GlULA4m4D5W0i1g' : undefined
      },
      {
        title: 'Watermelon Sugar',
        artists: ['Harry Styles'],
        album: 'Fine Line',
        duration: 174000,
        isrc: 'USSM12003861',
        spotifyId: service === 'spotify' ? '6UelLqGlWMcVH1E5c4H7lY' : undefined
      },
      // Add more demo tracks with slight variations for fuzzy matching
      {
        title: 'Blinding Lights (Radio Edit)',
        artists: ['The Weeknd'],
        album: 'After Hours',
        duration: 195000,
        isrc: 'USUG11904252',
        spotifyId: service === 'spotify' ? '0VjIjW4GlULA4m4D5W0i1g' : undefined
      }
    ];

    // Simple search simulation - find tracks that match query
    const queryLower = query.toLowerCase();
    return allDemoTracks.filter(track => 
      track.title.toLowerCase().includes(queryLower) ||
      track.artists.some(artist => artist.toLowerCase().includes(queryLower)) ||
      (track.isrc && query.includes(track.isrc))
    );
  }

  /**
   * Demo create playlist
   */
  async createPlaylist(service: string, params: CreatePlaylistParams): Promise<PlaylistInfo> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const serviceUrls = {
      spotify: 'https://open.spotify.com/playlist/',
      apple: 'https://music.apple.com/playlist/',
      youtube: 'https://music.youtube.com/playlist?list=',
      deezer: 'https://deezer.com/playlist/',
      tidal: 'https://listen.tidal.com/playlist/'
    };

    const playlistId = `demo_${service}_${Date.now()}`;
    const baseUrl = serviceUrls[service as keyof typeof serviceUrls] || 'https://example.com/playlist/';
    
    return {
      id: playlistId,
      name: params.name,
      url: `${baseUrl}${playlistId}`,
      trackCount: 0
    };
  }

  /**
   * Demo add tracks to playlist
   */
  async addTracksToPlaylist(
    service: string,
    playlistId: string, 
    tracks: EnhancedTrack[],
    onProgress?: (added: number) => void
  ): Promise<void> {
    const batchSize = 5; // Smaller batches for demo
    let added = 0;

    for (let i = 0; i < tracks.length; i += batchSize) {
      const batch = tracks.slice(i, i + batchSize);
      
      // Simulate adding tracks
      await new Promise(resolve => setTimeout(resolve, 600));
      
      added += batch.length;
      onProgress?.(Math.min(added, tracks.length));
    }
  }
}

// Check if we're in demo mode (no API keys configured)
export function isDemoMode(): boolean {
  return !import.meta.env.VITE_SPOTIFY_CLIENT_ID || 
         import.meta.env.VITE_SPOTIFY_CLIENT_ID === 'your_spotify_client_id_here';
}

// Export demo instance
export const demoServiceAPI = new DemoServiceAPI();