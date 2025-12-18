import { useState, useEffect } from 'react';

interface MusicService {
  id: string;
  name: string;
  color: string;
  domain: string;
  icon: string;
}

const musicServices: MusicService[] = [
  { id: 'spotify', name: 'Spotify', color: '#1DB954', domain: 'spotify.com', icon: '🎵' },
  { id: 'apple', name: 'Apple Music', color: '#FA233B', domain: 'music.apple.com', icon: '�' },
  { id: 'youtube', name: 'YouTube Music', color: '#FF0000', domain: 'music.youtube.com', icon: '▶️' },
  { id: 'deezer', name: 'Deezer', color: '#FEAA2D', domain: 'deezer.com', icon: '🎶' },
  { id: 'tidal', name: 'Tidal', color: '#000000', domain: 'tidal.com', icon: '🌊' },
];

function App() {
  const [sourceUrl, setSourceUrl] = useState('');
  const [detectedService, setDetectedService] = useState<MusicService | null>(null);
  const [targetService, setTargetService] = useState<MusicService | null>(null);
  const [isSwitching, setIsSwitching] = useState(false);
  const [switchResult, setSwitchResult] = useState<string | null>(null);

  useEffect(() => {
    const detected = musicServices.find(service => 
      sourceUrl.includes(service.domain)
    );
    setDetectedService(detected || null);
  }, [sourceUrl]);

  const handleSwitch = async () => {
    if (!detectedService || !targetService) return;
    
    setIsSwitching(true);
    setSwitchResult(null);
    
    // Simulate playlist switching process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsSwitching(false);
    setSwitchResult(`Playlist successfully switched from ${detectedService.name} to ${targetService.name}`);
  };

  const availableTargets = musicServices.filter(service => 
    service.id !== detectedService?.id
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-gray-900 to-slate-950 text-white">
      <div className="container mx-auto px-6 py-12">
        
        {/* Header */}
        <header className="text-center mb-20">
          <div className="mb-12">
            <h1 className="text-2xl font-light text-gray-300 tracking-[0.15em] uppercase mb-2">
              Playlist Relay
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
              Seamlessly transfer your playlists between Spotify, Apple Music, YouTube Music, Deezer, Tidal, and more
            </p>
          </div>
        </header>

        {/* Main Switching Interface */}
        <main className="max-w-4xl mx-auto">
          
          {/* Step 1: Source Playlist */}
          <section className="mb-12">
            <div className="bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Source Playlist</h3>
                <p className="text-gray-400">Paste your playlist link from any music service</p>
              </div>
              
              <div className="space-y-6">
                <input
                  type="url"
                  value={sourceUrl}
                  onChange={(e) => setSourceUrl(e.target.value)}
                  placeholder="https://open.spotify.com/playlist/... or any playlist link"
                  className="w-full px-8 py-6 bg-black/20 border border-white/20 rounded-2xl text-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                  disabled={isSwitching}
                />
                
                {detectedService && (
                  <div className="flex items-center justify-center space-x-4 py-4 animate-in slide-in-from-bottom-2 duration-500">
                    <span className="text-3xl">{detectedService.icon}</span>
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

          {/* Step 2: Target Service Selection */}
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
                      disabled={isSwitching}
                      className={`p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                        targetService?.id === service.id
                          ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/25'
                          : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
                      }`}
                    >
                      <div className="text-center space-y-3">
                        <div className="text-4xl">{service.icon}</div>
                        <div className="font-medium text-sm">{service.name}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Step 3: Switch Action */}
          {detectedService && targetService && (
            <section className="mb-12 animate-in slide-in-from-bottom-6 duration-900">
              <div className="text-center space-y-6">
                <div className="flex items-center justify-center space-x-8">
                  <div className="text-center">
                    <div className="text-4xl mb-2">{detectedService.icon}</div>
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
                    <div className="text-4xl mb-2">{targetService.icon}</div>
                    <p className="text-sm font-medium" style={{ color: targetService.color }}>
                      {targetService.name}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={handleSwitch}
                  disabled={isSwitching}
                  className={`px-12 py-4 text-xl font-bold rounded-2xl transition-all duration-300 transform ${
                    isSwitching
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 cursor-pointer shadow-xl hover:shadow-purple-500/25'
                  }`}
                >
                  {isSwitching ? 'Switching Playlist...' : 'Switch Playlist'}
                </button>
              </div>
            </section>
          )}

          {/* Result */}
          {switchResult && (
            <section className="text-center animate-in fade-in duration-1000">
              <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-8">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-2xl font-bold text-green-400 mb-2">Success!</h3>
                <p className="text-gray-300">{switchResult}</p>
              </div>
            </section>
          )}
        </main>

        {/* Supported Services */}
        <section className="mt-24 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Supported Music Services</h3>
            <p className="text-gray-400 text-lg">Switch between all major platforms</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8">
            {musicServices.map((service) => (
              <div key={service.id} className="text-center space-y-2">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-2xl">
                  {service.icon}
                </div>
                <p className="text-sm font-medium text-gray-300">{service.name}</p>
              </div>
            ))}
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-2xl">
                ➕
              </div>
              <p className="text-sm font-medium text-gray-300">More coming</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center pt-16 pb-8 border-t border-white/10">
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500 mb-6">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Support</a>
            <a href="#" className="hover:text-gray-300 transition-colors">API</a>
          </div>
          
          <p className="text-xs text-gray-600">
            © 2024 Playlist Relay. Seamlessly switch your music between platforms.
          </p>
        </footer>

      </div>
    </div>
  );
}

export default App;