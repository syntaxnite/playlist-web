// Playlist Preview component with real-time track checking

import React, { useState, useEffect } from 'react';
import { PlaylistPreview, TrackPreview, CheckProgress } from '../types/playlist';
import { serviceAPI } from '../services/musicAPIs';
import { demoServiceAPI, isDemoMode } from '../services/demoAPI';
import { matchTrack } from '../utils/trackMatcher';

interface PlaylistPreviewPageProps {
  playlistUrl: string;
  sourceService: string;
  targetService: string;
  onBack: () => void;
  onProceed: (checkedTracks: TrackPreview[]) => void;
}

export const PlaylistPreviewPage: React.FC<PlaylistPreviewPageProps> = ({
  playlistUrl,
  sourceService,
  targetService,
  onBack,
  onProceed
}) => {
  const [playlist, setPlaylist] = useState<PlaylistPreview | null>(null);
  const [progress, setProgress] = useState<CheckProgress>({
    checkedTracks: 0,
    totalTracks: 0,
    foundTracks: 0,
    notFoundTracks: 0,
    percentage: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPlaylist();
  }, []);

  const loadPlaylist = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Parse playlist ID from URL (simplified for demo)
      const playlistId = playlistUrl.split('/').pop() || 'demo-playlist';
      
      const api = isDemoMode() ? demoServiceAPI : serviceAPI;
      const tracks = await api.fetchPlaylist(sourceService, playlistId);

      const playlistData: PlaylistPreview = {
        id: playlistId,
        name: isDemoMode() ? 'Demo Playlist' : 'My Awesome Playlist',
        description: isDemoMode() ? 'A sample playlist for demonstration' : undefined,
        sourceService,
        totalTracks: tracks.length,
        tracks: tracks.map((track, index) => ({
          id: `track-${index}`,
          title: track.title,
          artists: track.artists,
          album: track.album,
          duration: track.duration,
          isrc: track.isrc,
          status: 'pending'
        }))
      };

      setPlaylist(playlistData);
      setProgress({
        checkedTracks: 0,
        totalTracks: tracks.length,
        foundTracks: 0,
        notFoundTracks: 0,
        percentage: 0
      });

      // Start checking tracks automatically
      setTimeout(() => {
        checkAllTracks(playlistData);
      }, 1000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load playlist');
    } finally {
      setIsLoading(false);
    }
  };

  const checkAllTracks = async (playlistData: PlaylistPreview) => {
    setIsChecking(true);
    const api = isDemoMode() ? demoServiceAPI : serviceAPI;
    let checkedCount = 0;
    let foundCount = 0;

    // Process tracks in small batches
    const batchSize = 3;
    for (let i = 0; i < playlistData.tracks.length; i += batchSize) {
      const batch = playlistData.tracks.slice(i, i + batchSize);
      
      // Check batch in parallel
      const batchResults = await Promise.allSettled(
        batch.map(async (track) => {
          // Update status to checking
          setPlaylist(prev => prev ? {
            ...prev,
            tracks: prev.tracks.map(t => 
              t.id === track.id ? { ...t, status: 'checking' } : t
            )
          } : null);

          try {
            // Simulate the matching process
            const matchResult = await matchTrack(
              {
                title: track.title,
                artists: track.artists,
                album: track.album,
                duration: track.duration,
                isrc: track.isrc
              },
              (query) => api.searchTracks(targetService, query)
            );

            const newStatus = matchResult.success ? 'found' : 'not-found';
            const confidence = matchResult.confidence === 'high' ? 0.9 : 
                             matchResult.confidence === 'medium' ? 0.7 : 0.4;

            return {
              trackId: track.id,
              status: newStatus,
              confidence,
              matchedTrack: matchResult.track
            };
          } catch (error) {
            return {
              trackId: track.id,
              status: 'not-found' as const,
              error: 'Failed to check track'
            };
          }
        })
      );

      // Update results
      batchResults.forEach((result) => {
        if (result.status === 'fulfilled') {
          const { trackId, status, confidence, matchedTrack } = result.value;
          checkedCount++;
          if (status === 'found') foundCount++;

          setPlaylist(prev => prev ? {
            ...prev,
            tracks: prev.tracks.map(t => 
              t.id === trackId ? { 
                ...t, 
                status: status as TrackPreview['status'], 
                confidence,
                matchedTrack 
              } : t
            )
          } : null);

          setProgress({
            checkedTracks: checkedCount,
            totalTracks: playlistData.tracks.length,
            foundTracks: foundCount,
            notFoundTracks: checkedCount - foundCount,
            percentage: Math.round((checkedCount / playlistData.tracks.length) * 100)
          });
        }
      });

      // Small delay between batches
      if (i + batchSize < playlistData.tracks.length) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    setIsChecking(false);
  };

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getStatusIcon = (status: TrackPreview['status']) => {
    switch (status) {
      case 'pending':
        return <div className="w-4 h-4 bg-gray-500 rounded-full"></div>;
      case 'checking':
        return <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>;
      case 'found':
        return <div className="text-green-400">✅</div>;
      case 'not-found':
        return <div className="text-red-400">❌</div>;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-gray-900 to-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-300">Loading playlist...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-gray-900 to-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-red-400 mb-4">Error Loading Playlist</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={onBack}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!playlist) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-gray-900 to-slate-950 text-white">
      <div className="container mx-auto px-6 py-12 max-w-6xl">
        
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={onBack}
            className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors mb-6"
          >
            <span>←</span>
            <span>Back to Home</span>
          </button>

          <div className="bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl p-8">
            <div className="flex items-start space-x-6">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <span className="text-3xl">🎵</span>
              </div>
              
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{playlist.name}</h1>
                {playlist.description && (
                  <p className="text-gray-400 mb-3">{playlist.description}</p>
                )}
                <div className="flex items-center space-x-6 text-sm text-gray-400">
                  <span>{playlist.totalTracks} tracks</span>
                  <span>From {sourceService}</span>
                  <span>→ To {targetService}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        {(isChecking || progress.checkedTracks > 0) && (
          <div className="mb-8">
            <div className="bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  {isChecking ? 'Checking Availability...' : 'Check Complete!'}
                </h3>
                <span className="text-sm text-gray-400">{progress.percentage}%</span>
              </div>
              
              <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress.percentage}%` }}
                ></div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div>
                  <div className="text-2xl font-bold text-green-400">{progress.foundTracks}</div>
                  <div className="text-gray-400">Found</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-400">{progress.notFoundTracks}</div>
                  <div className="text-gray-400">Not Found</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-400">{progress.checkedTracks}</div>
                  <div className="text-gray-400">Checked</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tracks List */}
        <div className="bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8">
          <h3 className="text-xl font-bold mb-6">Track List</h3>
          
          <div className="space-y-3">
            {playlist.tracks.map((track, index) => (
              <div 
                key={track.id}
                className="flex items-center space-x-4 p-4 bg-white/[0.02] rounded-xl border border-white/5 hover:bg-white/[0.04] transition-colors"
              >
                <div className="w-8 text-center text-gray-400">
                  {index + 1}
                </div>
                
                <div className="w-6 flex justify-center">
                  {getStatusIcon(track.status)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{track.title}</div>
                  <div className="text-sm text-gray-400 truncate">
                    {track.artists.join(', ')} • {track.album}
                  </div>
                </div>
                
                <div className="text-sm text-gray-400">
                  {formatDuration(track.duration)}
                </div>

                {track.confidence && (
                  <div className="text-xs text-gray-500">
                    {Math.round(track.confidence * 100)}%
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        {!isChecking && progress.checkedTracks === playlist.totalTracks && (
          <div className="text-center space-y-4">
            <div className="text-lg text-gray-300 mb-6">
              Ready to create playlist with <span className="text-green-400 font-semibold">{progress.foundTracks}</span> tracks?
            </div>
            
            <div className="flex justify-center space-x-4">
              <button
                onClick={onBack}
                className="px-8 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-xl transition-colors"
              >
                Cancel
              </button>
              
              <button
                onClick={() => onProceed(playlist.tracks)}
                disabled={progress.foundTracks === 0}
                className={`px-8 py-3 font-semibold rounded-xl transition-colors ${
                  progress.foundTracks > 0
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                Create Playlist ({progress.foundTracks} tracks)
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default PlaylistPreviewPage;