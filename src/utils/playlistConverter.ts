// Main playlist conversion orchestrator

import { RawTrack, ConversionResult } from '../types/music';
import { parsePlaylistUrl } from './urlParser';
import { matchTrack } from './trackMatcher';
import { serviceAPI } from '../services/musicAPIs';
import { demoServiceAPI, isDemoMode } from '../services/demoAPI';

export interface ConversionProgress {
  stage: 'parsing' | 'fetching' | 'matching' | 'creating' | 'adding' | 'complete';
  message: string;
  progress: number; // 0-100
  tracksProcessed?: number;
  totalTracks?: number;
  successCount?: number;
  failedCount?: number;
}

export type ProgressCallback = (progress: ConversionProgress) => void;

/**
 * Main conversion function orchestrating the entire process
 */
export async function convertPlaylist(
  sourceUrl: string,
  targetService: string,
  onProgress: ProgressCallback
): Promise<ConversionResult> {
  const api = isDemoMode() ? demoServiceAPI : serviceAPI;
  const isDemo = isDemoMode();
  
  try {
    // Step 1: Parse URL
    onProgress({
      stage: 'parsing',
      message: isDemo ? 'Demo: Analyzing playlist URL...' : 'Analyzing playlist URL...',
      progress: 5
    });

    const parsed = parsePlaylistUrl(sourceUrl);
    if (!parsed.isValid) {
      throw new Error(parsed.error || 'Invalid playlist URL');
    }

    // Step 2: Fetch source playlist
    onProgress({
      stage: 'fetching',
      message: isDemo ? `Demo: Fetching sample tracks...` : `Fetching playlist from ${parsed.service}...`,
      progress: 15
    });

    const sourceTracks = isDemo 
      ? await api.fetchPlaylist(parsed.service, parsed.playlistId)
      : await serviceAPI.fetchPlaylist(parsed.service, parsed.playlistId);
      
    if (!sourceTracks.length) {
      throw new Error('Playlist is empty or could not be fetched');
    }

    onProgress({
      stage: 'fetching',
      message: `Found ${sourceTracks.length} tracks`,
      progress: 25,
      totalTracks: sourceTracks.length
    });

    // Step 3: Match tracks in destination service
    onProgress({
      stage: 'matching',
      message: isDemo ? 'Demo: Finding matches...' : 'Finding matches in destination service...',
      progress: 30,
      totalTracks: sourceTracks.length,
      tracksProcessed: 0,
      successCount: 0
    });

    const matchResults = await matchAllTracks(
      sourceTracks, 
      targetService,
      api,
      (processed, successful) => {
        onProgress({
          stage: 'matching',
          message: `Matching tracks... (${processed}/${sourceTracks.length})`,
          progress: 30 + (processed / sourceTracks.length) * 40,
          totalTracks: sourceTracks.length,
          tracksProcessed: processed,
          successCount: successful
        });
      }
    );

    const successfulMatches = matchResults.filter(r => r.success);
    const failedMatches = matchResults.filter(r => !r.success);

    // Step 4: Create destination playlist
    onProgress({
      stage: 'creating',
      message: isDemo ? 'Demo: Creating playlist...' : 'Creating playlist...',
      progress: 75
    });

    const sourceName = await getPlaylistName(parsed.service, parsed.playlistId);
    const playlistInfo = await api.createPlaylist(targetService, {
      name: `${sourceName}${isDemo ? ' (Demo)' : ''} (via SoundRelay)`,
      description: `Converted from ${parsed.service} • ${successfulMatches.length}/${sourceTracks.length} tracks matched${isDemo ? ' • Demo Mode' : ''}`,
      isPublic: false
    });

    // Step 5: Add tracks in batches
    if (successfulMatches.length > 0) {
      onProgress({
        stage: 'adding',
        message: isDemo ? 'Demo: Adding tracks...' : 'Adding tracks to playlist...',
        progress: 80
      });

      await api.addTracksToPlaylist(
        targetService,
        playlistInfo.id,
        successfulMatches.map(r => r.track!),
        (added) => {
          onProgress({
            stage: 'adding',
            message: `Adding tracks... (${added}/${successfulMatches.length})`,
            progress: 80 + (added / successfulMatches.length) * 15
          });
        }
      );
    }

    onProgress({
      stage: 'complete',
      message: isDemo ? 'Demo conversion complete!' : 'Conversion complete!',
      progress: 100,
      successCount: successfulMatches.length,
      failedCount: failedMatches.length
    });

    return {
      totalTracks: sourceTracks.length,
      successCount: successfulMatches.length,
      failedTracks: failedMatches.map(r => ({
        original: sourceTracks[matchResults.indexOf(r)],
        reason: r.reason || 'No confident match found'
      })),
      playlistUrl: playlistInfo.url,
      playlistId: playlistInfo.id
    };

  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Conversion failed');
  }
}

/**
 * Get playlist name from source (for better naming)
 */
async function getPlaylistName(_service: string, _playlistId: string): Promise<string> {
  try {
    // This would fetch the actual playlist name
    // For now, return a default name
    return 'My Playlist';
  } catch {
    return 'Converted Playlist';
  }
}

/**
 * Match all tracks with progress tracking
 */
async function matchAllTracks(
  sourceTracks: RawTrack[],
  targetService: string,
  api: any,
  onProgress: (processed: number, successful: number) => void
) {
  const results = [];
  let successful = 0;

  // Process in chunks to avoid overwhelming APIs
  const chunkSize = 5;
  for (let i = 0; i < sourceTracks.length; i += chunkSize) {
    const chunk = sourceTracks.slice(i, i + chunkSize);
    
    // Process chunk in parallel
    const chunkResults = await Promise.all(
      chunk.map(track => matchTrack(track, (query) => api.searchTracks(targetService, query)))
    );
    
    results.push(...chunkResults);
    successful += chunkResults.filter(r => r.success).length;
    
    onProgress(Math.min(i + chunkSize, sourceTracks.length), successful);
    
    // Rate limiting delay
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  return results;
}