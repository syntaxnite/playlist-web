// Privacy Policy component for SoundRelay

import React from 'react';

export const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-gray-900 to-slate-950 text-white">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-400">Last updated: December 2024</p>
        </div>

        <div className="prose prose-invert prose-blue max-w-none">
          
          {/* TL;DR Section */}
          <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-8 mb-12">
            <div className="text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h2 className="text-2xl font-bold text-green-400 mb-4">TL;DR</h2>
              <p className="text-xl text-gray-300">
                We don't store your data. Everything happens in your browser session only.
              </p>
            </div>
          </div>

          {/* What We DON'T Collect */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-blue-400 mb-6">What We DON'T Collect</h2>
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
              <p className="text-lg font-medium text-red-400 mb-4">
                SoundRelay is designed with privacy as a core principle. We do not collect, store, or retain:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <span className="text-red-400">❌</span>
                    <span>User accounts or profiles</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-red-400">❌</span>
                    <span>Personal information</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-red-400">❌</span>
                    <span>Playlist contents after conversion</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-red-400">❌</span>
                    <span>Music listening history</span>
                  </li>
                </ul>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <span className="text-red-400">❌</span>
                    <span>Payment information</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-red-400">❌</span>
                    <span>Browsing history</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-red-400">❌</span>
                    <span>Device fingerprinting</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-red-400">❌</span>
                    <span>Tracking cookies</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* What We DO Process */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-blue-400 mb-6">What We DO Process (Session Only)</h2>
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
              <p className="text-lg font-medium text-green-400 mb-4">
                During an active conversion session, we temporarily process:
              </p>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <span className="text-green-400">✅</span>
                  <span>Playlist URLs you provide</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-green-400">✅</span>
                  <span>Track metadata (song titles, artists, albums)</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-green-400">✅</span>
                  <span>Temporary authentication tokens</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-green-400">✅</span>
                  <span>Conversion progress and results</span>
                </li>
              </ul>
              <div className="mt-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <p className="text-yellow-400 font-semibold">
                  🗑️ All of this data is discarded when your session ends.
                </p>
              </div>
            </div>
          </section>

          {/* Data Flow Visualization */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-blue-400 mb-6">How Your Data Flows</h2>
            <div className="bg-white/[0.02] rounded-xl p-6 border border-white/5">
              <div className="grid md:grid-cols-3 gap-6">
                
                <div className="text-center p-6 bg-blue-500/10 rounded-xl border border-blue-500/30">
                  <div className="text-3xl mb-3">🔗</div>
                  <h4 className="font-bold text-blue-400 mb-2">1. You Share</h4>
                  <p className="text-sm text-gray-400">Playlist URL processed in your browser only</p>
                </div>

                <div className="text-center p-6 bg-purple-500/10 rounded-xl border border-purple-500/30">
                  <div className="text-3xl mb-3">🔄</div>
                  <h4 className="font-bold text-purple-400 mb-2">2. We Convert</h4>
                  <p className="text-sm text-gray-400">Track matching happens in memory, no storage</p>
                </div>

                <div className="text-center p-6 bg-green-500/10 rounded-xl border border-green-500/30">
                  <div className="text-3xl mb-3">🗑️</div>
                  <h4 className="font-bold text-green-400 mb-2">3. Auto-Delete</h4>
                  <p className="text-sm text-gray-400">All data cleared when you close the tab</p>
                </div>
              </div>
            </div>
          </section>

          {/* Third-Party Services */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-blue-400 mb-6">Third-Party Services</h2>
            <div className="bg-white/[0.02] rounded-xl p-6 border border-white/5">
              <p className="mb-4 text-gray-300">SoundRelay connects with music platforms using their official APIs:</p>
              
              <div className="grid md:grid-cols-5 gap-4 mb-6">
                <div className="text-center p-4 bg-green-600/20 rounded-lg">
                  <div className="text-2xl mb-2">🎵</div>
                  <p className="text-sm font-medium">Spotify</p>
                </div>
                <div className="text-center p-4 bg-red-600/20 rounded-lg">
                  <div className="text-2xl mb-2">🍎</div>
                  <p className="text-sm font-medium">Apple Music</p>
                </div>
                <div className="text-center p-4 bg-red-600/20 rounded-lg">
                  <div className="text-2xl mb-2">📺</div>
                  <p className="text-sm font-medium">YouTube</p>
                </div>
                <div className="text-center p-4 bg-yellow-600/20 rounded-lg">
                  <div className="text-2xl mb-2">🎶</div>
                  <p className="text-sm font-medium">Deezer</p>
                </div>
                <div className="text-center p-4 bg-gray-600/20 rounded-lg">
                  <div className="text-2xl mb-2">🌊</div>
                  <p className="text-sm font-medium">Tidal</p>
                </div>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <p className="text-yellow-400 font-semibold">⚠️ Important:</p>
                <p className="text-gray-300 mt-2">
                  When you authenticate with these services, you're subject to their privacy policies, not ours. 
                  We're just a temporary bridge between them.
                </p>
              </div>
            </div>
          </section>

          {/* No Tracking Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-blue-400 mb-6">What We Don't Track</h2>
            <div className="grid md:grid-cols-2 gap-6">
              
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
                <h4 className="font-bold text-red-400 mb-4">❌ No Analytics</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• No Google Analytics</li>
                  <li>• No usage statistics</li>
                  <li>• No behavior tracking</li>
                  <li>• No conversion funnels</li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
                <h4 className="font-bold text-red-400 mb-4">🚫 No Advertising</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• No ad networks</li>
                  <li>• No data brokers</li>
                  <li>• No Facebook pixels</li>
                  <li>• No remarketing</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Security */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-blue-400 mb-6">How We Protect You</h2>
            <div className="grid md:grid-cols-4 gap-4">
              
              <div className="text-center p-4 bg-green-500/10 rounded-xl border border-green-500/30">
                <div className="text-2xl mb-2">🔒</div>
                <h4 className="font-semibold text-green-400 mb-2">HTTPS</h4>
                <p className="text-xs text-gray-400">All communication encrypted</p>
              </div>

              <div className="text-center p-4 bg-blue-500/10 rounded-xl border border-blue-500/30">
                <div className="text-2xl mb-2">💾</div>
                <h4 className="font-semibold text-blue-400 mb-2">Memory Only</h4>
                <p className="text-xs text-gray-400">Never touches our servers</p>
              </div>

              <div className="text-center p-4 bg-purple-500/10 rounded-xl border border-purple-500/30">
                <div className="text-2xl mb-2">🧹</div>
                <h4 className="font-semibold text-purple-400 mb-2">Auto-Clean</h4>
                <p className="text-xs text-gray-400">Data cleared automatically</p>
              </div>

              <div className="text-center p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/30">
                <div className="text-2xl mb-2">👁️</div>
                <h4 className="font-semibold text-yellow-400 mb-2">Open Source</h4>
                <p className="text-xs text-gray-400">Code is publicly auditable</p>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-blue-400 mb-6">Your Rights & Control</h2>
            <div className="bg-white/[0.02] rounded-xl p-6 border border-white/5">
              <div className="grid md:grid-cols-2 gap-6">
                
                <div>
                  <h4 className="font-semibold text-green-400 mb-3">✅ You Always Control:</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• What playlists to convert</li>
                    <li>• Which services to connect</li>
                    <li>• When to stop (close tab anytime)</li>
                    <li>• Data deletion (automatic)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-blue-400 mb-3">🙅‍♂️ No Requests Needed:</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• No data deletion requests</li>
                    <li>• No data portability requests</li>
                    <li>• No correction requests</li>
                    <li>• No opt-out procedures</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Why We Built It This Way */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-blue-400 mb-6">Why We Built It This Way</h2>
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-8">
              <div className="text-center">
                <div className="text-4xl mb-4">💡</div>
                <h3 className="text-xl font-bold text-blue-400 mb-4">Privacy by Design</h3>
                <p className="text-lg text-gray-300 mb-6">
                  Privacy isn't just a buzzword for us—it's how we built SoundRelay from the ground up.
                </p>
                <div className="grid md:grid-cols-2 gap-6 text-left">
                  <div>
                    <h4 className="font-semibold text-green-400 mb-2">We believe:</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li>• Your music taste is personal</li>
                      <li>• You shouldn't have to trust us with data</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-400 mb-2">Our philosophy:</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li>• The best privacy policy is not needing one</li>
                      <li>• Technology should work for you, not against you</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-blue-400 mb-6">Contact Us</h2>
            <div className="bg-white/[0.02] rounded-xl p-6 border border-white/5 text-center">
              <p className="mb-4">If you have privacy questions or concerns:</p>
              <div className="space-y-4">
                <a 
                  href="mailto:privacy@playlistrelay.com" 
                  className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
                >
                  <span>📧</span>
                  <span>privacy@playlistrelay.com</span>
                </a>
                <p className="text-sm text-gray-400">Response time: We aim to respond within 48 hours</p>
              </div>
            </div>
          </section>

          {/* Bottom Message */}
          <div className="text-center py-8 border-t border-white/10">
            <p className="text-xl font-semibold text-gray-300">
              SoundRelay exists to move your playlists, not your personal information.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Privacy;