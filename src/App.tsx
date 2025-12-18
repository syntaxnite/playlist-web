import { useState, useEffect } from 'react';
import ServiceLogo from './components/ServiceLogo';
import { parsePlaylistUrl } from './utils/urlParser';
import { convertPlaylist, ConversionProgress } from './utils/playlistConverter';

interface MusicService {
  id: string;
  name: string;
  color: string;
  domain: string;
}

const musicServices: MusicService[] = [
  { id: 'spotify', name: 'Spotify', color: '#1DB954', domain: 'spotify.com' },
  { id: 'apple', name: 'Apple Music', color: '#FA233B', domain: 'music.apple.com' },
  { id: 'youtube', name: 'YouTube Music', color: '#FF0000', domain: 'music.youtube.com' },
  { id: 'deezer', name: 'Deezer', color: '#FEAA2D', domain: 'deezer.com' },
  { id: 'tidal', name: 'Tidal', color: '#000000', domain: 'tidal.com' },
];

function App() {
  const [sourceUrl, setSourceUrl] = useState('');
  const [detectedService, setDetectedService] = useState<MusicService | null>(null);
  const [targetService, setTargetService] = useState<MusicService | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [conversionProgress, setConversionProgress] = useState<ConversionProgress | null>(null);
  const [conversionResult, setConversionResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sourceUrl) {
      setDetectedService(null);
      setError(null);
      return;
    }

    const parsed = parsePlaylistUrl(sourceUrl);
    if (parsed.isValid) {
      const service = musicServices.find(s => s.id === parsed.service);
      setDetectedService(service || null);
      setError(null);
    } else {
      setDetectedService(null);
      setError(parsed.error || null);
    }
  }, [sourceUrl]);

  const handleConversion = async () => {
    if (!detectedService || !targetService) return;
    
    setIsConverting(true);
    setConversionProgress(null);
    setConversionResult(null);
    setError(null);
    
    try {
      const result = await convertPlaylist(
        sourceUrl,
        targetService.id,
        (progress) => setConversionProgress(progress)
      );
      
      setConversionResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed');
    } finally {
      setIsConverting(false);
      setConversionProgress(null);
    }
  };

  const availableTargets = musicServices.filter(service => 
    service.id !== detectedService?.id
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-gray-900 to-slate-950 text-white">
      <div className="container mx-auto px-6 py-12">
        
        <header className="text-center mb-20">
          <div className="mb-12">
            <h1 className="text-2xl font-light text-gray-300 tracking-[0.15em] uppercase mb-2">
              SoundRelay
            </h1>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto"></div>
          </div>
          
          <div className="space-y-8 max-w-5xl mx-auto">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight">
              Switch playlists between
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                any music service
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed">
              Powered by advanced track matching. Accuracy over completion, always.
            </p>
          </div>
        </header>

        <main className="max-w-4xl mx-auto">
          
          <section className="mb-12">
            <div className="bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Source Playlist</h3>
                <p className="text-gray-400">Paste your playlist link from any supported service</p>
              </div>
              
              <div className="space-y-6">
                <input
                  type="url"
                  value={sourceUrl}
                  onChange={(e) => setSourceUrl(e.target.value)}
                  placeholder="https://open.spotify.com/playlist/... or any playlist link"
                  className="w-full px-8 py-6 bg-black/20 border border-white/20 rounded-2xl text-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                  disabled={isConverting}
                />
                
                {error && (
                  <div className="text-center py-4">
                    <p className="text-red-400 text-sm">{error}</p>
                    <p className="text-gray-500 text-xs mt-2">We parse URLs precisely. Please use a direct playlist link.</p>
                  </div>
                )}
                
                {detectedService && (
                  <div className="flex items-center justify-center space-x-4 py-4 animate-in slide-in-from-bottom-2 duration-500">
                    <div style={{ color: detectedService.color }}>
                      <ServiceLogo service={detectedService.id} size="lg" />
                    </div>
                    <div className="text-center">
                      <p className="font-semibold" style={{ color: detectedService.color }}>
                        {detectedService.name}
                      </p>
                      <p className="text-sm text-gray-400">Playlist detected</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {detectedService && (
            <section className="mb-12 animate-in slide-in-from-bottom-4 duration-700">
              <div className="bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">Choose Target Service</h3>
                  <p className="text-gray-400">Where would you like to switch your playlist?</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {availableTargets.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => setTargetService(service)}
                      disabled={isConverting}
                      className={`p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                        targetService?.id === service.id
                          ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/25'
                          : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
                      } ${isConverting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <div className="text-center space-y-3">
                        <div style={{ color: service.color }}>
                          <ServiceLogo service={service.id} size="lg" />
                        </div>
                        <div className="font-medium text-sm">{service.name}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </section>
          )}

          {detectedService && targetService && (
            <section className="mb-12 animate-in slide-in-from-bottom-6 duration-900">
              <div className="text-center space-y-6">
                <div className="flex items-center justify-center space-x-8">
                  <div className="text-center">
                    <div className="mb-2" style={{ color: detectedService.color }}>
                      <ServiceLogo service={detectedService.id} size="lg" />
                    </div>
                    <p className="text-sm font-medium" style={{ color: detectedService.color }}>
                      {detectedService.name}
                    </p>
                  </div>
                  
                  <div className="flex-1 max-w-xs">
                    <div className="h-px bg-gradient-to-r from-blue-500 to-purple-500"></div>
                    <div className="text-center py-2">
                      <span className="text-2xl">→</span>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="mb-2" style={{ color: targetService.color }}>
                      <ServiceLogo service={targetService.id} size="lg" />
                    </div>
                    <p className="text-sm font-medium" style={{ color: targetService.color }}>
                      {targetService.name}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={handleConversion}
                  disabled={isConverting}
                  className={`px-12 py-4 text-xl font-bold rounded-2xl transition-all duration-300 transform ${
                    isConverting
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 cursor-pointer shadow-xl hover:shadow-purple-500/25'
                  }`}
                >
                  {isConverting ? 'Converting...' : 'Convert Playlist'}
                </button>
              </div>
            </section>
          )}

          {conversionProgress && (
            <section className="mb-12 animate-in fade-in duration-500">
              <div className="bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl p-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold capitalize">{conversionProgress.stage}</h3>
                    <span className="text-sm text-gray-400">{Math.round(conversionProgress.progress)}%</span>
                  </div>
                  
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${conversionProgress.progress}%` }}
                    ></div>
                  </div>
                  
                  <p className="text-gray-300">{conversionProgress.message}</p>
                  
                  {conversionProgress.tracksProcessed !== undefined && (
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>Processed: {conversionProgress.tracksProcessed}/{conversionProgress.totalTracks}</span>
                      <span>Successful: {conversionProgress.successCount}</span>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {conversionResult && (
            <section className="text-center animate-in fade-in duration-1000">
              <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-8">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-2xl font-bold text-green-400 mb-4">Conversion Complete!</h3>
                
                <div className="grid md:grid-cols-3 gap-4 mb-6 text-center">
                  <div>
                    <p className="text-2xl font-bold">{conversionResult.totalTracks}</p>
                    <p className="text-gray-400">Total Tracks</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-400">{conversionResult.successCount}</p>
                    <p className="text-gray-400">Successfully Matched</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-yellow-400">{conversionResult.failedTracks?.length || 0}</p>
                    <p className="text-gray-400">Not Found</p>
                  </div>
                </div>
                
                {conversionResult.playlistUrl && (
                  <a 
                    href={conversionResult.playlistUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-2xl transition-colors"
                  >
                    Open Playlist
                  </a>
                )}
              </div>
            </section>
          )}
        </main>

        <section className="mt-24 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Our Approach</h3>
            <p className="text-gray-400 text-lg">Precision over guesswork</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="text-xl font-semibold">ISRC Matching</h4>
              <p className="text-gray-400">
                We use International Standard Recording Codes when available for perfect track identification
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto">
                <span className="text-2xl">⚖️</span>
              </div>
              <h4 className="text-xl font-semibold">Quality Over Quantity</h4>
              <p className="text-gray-400">
                We prefer missing tracks over wrong ones. False positives are worse than misses.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto">
                <span className="text-2xl">🔒</span>
              </div>
              <h4 className="text-xl font-semibold">No Data Storage</h4>
              <p className="text-gray-400">
                Everything happens in memory. No playlists or personal data stored on our servers.
              </p>
            </div>
          </div>
        </section>

        <footer className="text-center pt-16 pb-8 border-t border-white/10">
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500 mb-6">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Supported Services</a>
            <a href="#" className="hover:text-gray-300 transition-colors">API Documentation</a>
          </div>
          
          <p className="text-xs text-gray-600">
            © 2024 SoundRelay. Intelligent playlist conversion.
          </p>
        </footer>

      </div>
    </div>
  );
}

export default App;