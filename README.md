# 🎵 SoundRelay

**Intelligent playlist conversion between music services**

SoundRelay seamlessly transfers your playlists between Spotify, Apple Music, YouTube Music, Deezer, and Tidal with advanced track matching technology.

## ✨ Features

- **🎯 ISRC Matching** - Uses International Standard Recording Codes for perfect track identification
- **⚖️ Quality over Quantity** - Prefers missing tracks over wrong ones
- **🔒 Privacy First** - No data storage, everything happens in memory
- **🚀 Real-time Progress** - Live conversion tracking with detailed feedback
- **🎨 Beautiful UI** - Modern dark theme with smooth animations

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/sound-relay-web.git
   cd sound-relay-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:3000
   ```

## 🔧 Configuration

### Demo Mode
The app works immediately in demo mode with sample data. No API keys required for testing.

### Production Mode
To enable real playlist conversion, add your API credentials to `.env`:

```bash
VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id
VITE_APPLE_CLIENT_ID=your_apple_client_id
VITE_YOUTUBE_CLIENT_ID=your_youtube_client_id
VITE_DEEZER_CLIENT_ID=your_deezer_client_id
VITE_TIDAL_CLIENT_ID=your_tidal_client_id
```

### OAuth Callback URLs
Register these callback URLs in your app configurations:
- Spotify: `http://localhost:3000/auth/spotify/callback`
- Apple Music: `http://localhost:3000/auth/apple/callback`
- YouTube Music: `http://localhost:3000/auth/youtube/callback`
- Deezer: `http://localhost:3000/auth/deezer/callback`
- Tidal: `http://localhost:3000/auth/tidal/callback`

## 🏗️ Architecture

### Core Components

- **URL Parser** (`src/utils/urlParser.ts`) - Precise playlist URL validation
- **Track Normalizer** (`src/utils/trackNormalizer.ts`) - Advanced text normalization for matching
- **Track Matcher** (`src/utils/trackMatcher.ts`) - Tiered matching strategy (ISRC → Metadata → Fuzzy)
- **Auth Manager** (`src/utils/authManager.ts`) - OAuth without persistent storage
- **Service APIs** (`src/services/musicAPIs.ts`) - Real API integrations
- **Conversion Engine** (`src/utils/playlistConverter.ts`) - Main orchestrator

### Matching Strategy

1. **Tier 1: ISRC Matching** - Perfect track identification using recording codes
2. **Tier 2: Metadata Matching** - Artist + title with quality scoring  
3. **Tier 3: Fuzzy Fallback** - Conservative similarity matching

## 🎵 Supported Services

- ✅ **Spotify** - Full implementation
- 🔄 **Apple Music** - Framework ready
- 🔄 **YouTube Music** - Framework ready  
- 🔄 **Deezer** - Framework ready
- 🔄 **Tidal** - Framework ready

## 🛠️ Built With

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool

## 📱 Usage

1. Paste any supported playlist URL
2. Choose your target music service
3. Watch real-time conversion progress
4. Get your new playlist with detailed results

## 🔒 Privacy

- No playlists or personal data stored on servers
- OAuth tokens live in memory only
- Authentication cleared on completion
- Transparent process with clear explanations

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Music service APIs for enabling cross-platform integration
- The ISRC system for providing universal track identification
- Open source community for inspiration and tools

---

**"Users forgive missing tracks. They do not forgive wrong ones."** - SoundRelay Philosophy