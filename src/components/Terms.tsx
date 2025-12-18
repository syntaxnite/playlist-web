// Terms of Service component for SoundRelay

import React from 'react';

export const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-gray-900 to-slate-950 text-white">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Terms of Use
          </h1>
          <p className="text-gray-400">Last updated: December 2025</p>
        </div>

        <div className="prose prose-invert prose-blue max-w-none">
          
          <div className="bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8">
            <p className="text-lg leading-relaxed">
              These Terms of Use ("Terms") govern your use of <strong>SoundRelay</strong> ("SoundRelay", "we", "us", or "our"). 
              By accessing or using SoundRelay, you agree to these Terms. If you do not agree, do not use the service.
            </p>
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-blue-400 mb-4">1. What SoundRelay Is</h2>
            <div className="bg-white/[0.02] rounded-xl p-6 border border-white/5">
              <p className="mb-4">
                SoundRelay is a utility tool that helps users <strong>move, recreate, analyze, or transform playlists</strong> between music streaming services.
              </p>
              <p className="mb-4">
                SoundRelay does <strong>not</strong> host music, stream music, sell music, or distribute audio files. 
                The service operates solely on <strong>publicly available metadata</strong> and official APIs provided by third‑party music platforms.
              </p>
              <div className="mt-6">
                <h4 className="font-semibold text-green-400 mb-3">Our purpose is to:</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Reduce friction between streaming services</li>
                  <li>Enable informed and ethical user choice</li>
                  <li>Improve portability of user‑curated playlists</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-blue-400 mb-4">2. Ownership of Music and Content</h2>
            <div className="bg-white/[0.02] rounded-xl p-6 border border-white/5">
              <p className="mb-4">
                SoundRelay <strong>does not own, license, control, or claim any rights</strong> to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 mb-4">
                <li>Songs</li>
                <li>Albums</li>
                <li>Audio recordings</li>
                <li>Album artwork</li>
                <li>Artist names</li>
                <li>Trademarks of music services</li>
              </ul>
              <p className="text-yellow-400 font-medium">
                All music‑related content belongs to its respective rights holders, artists, labels, and streaming platforms.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-blue-400 mb-4">3. What SoundRelay Does and Does Not Do</h2>
            <div className="grid md:grid-cols-2 gap-6">
              
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
                <h4 className="font-bold text-green-400 mb-4">SoundRelay DOES:</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>✅ Read playlist metadata using official APIs</li>
                  <li>✅ Match tracks using ISRC codes and metadata</li>
                  <li>✅ Create playlists where permitted by APIs</li>
                  <li>✅ Generate links to playlists</li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
                <h4 className="font-bold text-red-400 mb-4">SoundRelay does NOT:</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>❌ Copy or transfer audio files</li>
                  <li>❌ Bypass paywalls or DRM</li>
                  <li>❌ Circumvent licensing restrictions</li>
                  <li>❌ Modify or redistribute music</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-blue-400 mb-4">4. Ethical Use and User Responsibility</h2>
            <div className="bg-white/[0.02] rounded-xl p-6 border border-white/5">
              <p className="mb-4">
                SoundRelay is designed to support <strong>ethical and lawful use</strong> of streaming services.
              </p>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-blue-400 mb-3">By using SoundRelay, you agree that:</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>You have the right to access the playlists you submit</li>
                  <li>You will comply with the terms of the streaming services you use</li>
                  <li>You understand that music availability varies by region and service</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-blue-400 mb-4">5. Third‑Party Services</h2>
            <div className="bg-white/[0.02] rounded-xl p-6 border border-white/5">
              <p className="mb-4">
                SoundRelay interacts with third‑party services such as Spotify, Apple Music, YouTube, Deezer, and others.
              </p>
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <p className="text-yellow-400 font-semibold mb-2">Important:</p>
                <p className="text-gray-300">
                  SoundRelay is <strong>not affiliated with, endorsed by, or sponsored by</strong> these services. 
                  We rely on their public APIs and are subject to their policies and limitations.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-blue-400 mb-4">6. Privacy and Data Handling</h2>
            <div className="bg-white/[0.02] rounded-xl p-6 border border-white/5">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                  <div className="text-2xl mb-2">🚫</div>
                  <h4 className="font-semibold text-green-400">No Accounts</h4>
                  <p className="text-sm text-gray-400">No permanent user profiles</p>
                </div>
                <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
                  <div className="text-2xl mb-2">⚡</div>
                  <h4 className="font-semibold text-blue-400">Session Only</h4>
                  <p className="text-sm text-gray-400">Data processed in-session only</p>
                </div>
                <div className="text-center p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
                  <div className="text-2xl mb-2">🗑️</div>
                  <h4 className="font-semibold text-purple-400">Auto-Delete</h4>
                  <p className="text-sm text-gray-400">Tokens discarded after use</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-blue-400 mb-4">7. Contact</h2>
            <div className="bg-white/[0.02] rounded-xl p-6 border border-white/5 text-center">
              <p className="mb-4">If you have questions about these Terms:</p>
              <a 
                href="mailto:support@playlistrelay.com" 
                className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
              >
                <span>📧</span>
                <span>support@playlistrelay.com</span>
              </a>
            </div>
          </section>

          <div className="text-center py-8 border-t border-white/10">
            <p className="text-xl font-semibold text-gray-300">
              SoundRelay exists to empower users with choice and portability—nothing more, nothing less.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Terms;