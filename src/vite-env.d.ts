/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SPOTIFY_CLIENT_ID: string
  readonly VITE_APPLE_CLIENT_ID: string
  readonly VITE_YOUTUBE_CLIENT_ID: string
  readonly VITE_DEEZER_CLIENT_ID: string
  readonly VITE_TIDAL_CLIENT_ID: string
  readonly VITE_API_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}