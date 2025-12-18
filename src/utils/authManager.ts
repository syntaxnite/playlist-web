// Authentication manager without persistent accounts

import { ServiceAuth } from '../types/music';

class AuthManager {
  private authTokens: Map<string, ServiceAuth> = new Map();
  private authWindows: Map<string, Window | null> = new Map();

  /**
   * Get authentication for a service using OAuth popup
   */
  async getAuth(service: string): Promise<ServiceAuth | null> {
    // Check if we have a valid token in memory
    const existing = this.authTokens.get(service);
    if (existing && this.isTokenValid(existing)) {
      return existing;
    }

    // Request new auth via popup
    return this.requestAuth(service);
  }

  /**
   * Request authentication via OAuth popup
   */
  private async requestAuth(service: string): Promise<ServiceAuth | null> {
    return new Promise((resolve) => {
      const authUrl = this.getAuthUrl(service);
      const popup = window.open(
        authUrl,
        `auth_${service}`,
        'width=600,height=700,scrollbars=yes,resizable=yes'
      );

      this.authWindows.set(service, popup);

      // Listen for auth completion
      const checkClosed = setInterval(() => {
        if (popup?.closed) {
          clearInterval(checkClosed);
          this.authWindows.delete(service);
          resolve(null);
        }
      }, 1000);

      // Listen for auth success message
      const messageHandler = (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;
        
        if (event.data.type === 'auth_success' && event.data.service === service) {
          clearInterval(checkClosed);
          popup?.close();
          this.authWindows.delete(service);
          window.removeEventListener('message', messageHandler);

          const auth: ServiceAuth = {
            token: event.data.token,
            expiresAt: Date.now() + (event.data.expiresIn * 1000),
            scopes: event.data.scopes || []
          };

          this.authTokens.set(service, auth);
          resolve(auth);
        }
      };

      window.addEventListener('message', messageHandler);

      // Timeout after 5 minutes
      setTimeout(() => {
        clearInterval(checkClosed);
        popup?.close();
        this.authWindows.delete(service);
        window.removeEventListener('message', messageHandler);
        resolve(null);
      }, 300000);
    });
  }

  /**
   * Get OAuth URL for service
   */
  private getAuthUrl(service: string): string {
    const baseUrls = {
      spotify: 'https://accounts.spotify.com/authorize',
      apple: 'https://appleid.apple.com/auth/authorize',
      youtube: 'https://accounts.google.com/oauth/authorize',
      deezer: 'https://connect.deezer.com/oauth/auth.php',
      tidal: 'https://auth.tidal.com/oauth2/authorize'
    };

    const scopes = {
      spotify: 'playlist-modify-public playlist-modify-private',
      apple: 'media-user-access',
      youtube: 'https://www.googleapis.com/auth/youtube',
      deezer: 'manage_library',
      tidal: 'playlist:read playlist:write'
    };

    const clientIds = {
      spotify: import.meta.env.VITE_SPOTIFY_CLIENT_ID || '',
      apple: import.meta.env.VITE_APPLE_CLIENT_ID || '',
      youtube: import.meta.env.VITE_YOUTUBE_CLIENT_ID || '',
      deezer: import.meta.env.VITE_DEEZER_CLIENT_ID || '',
      tidal: import.meta.env.VITE_TIDAL_CLIENT_ID || ''
    };

    const params = new URLSearchParams({
      client_id: clientIds[service as keyof typeof clientIds] || '',
      response_type: 'code',
      redirect_uri: `${window.location.origin}/auth/callback`,
      scope: scopes[service as keyof typeof scopes] || '',
      state: service
    });

    return `${baseUrls[service as keyof typeof baseUrls]}?${params}`;
  }

  /**
   * Check if token is still valid
   */
  private isTokenValid(auth: ServiceAuth): boolean {
    if (!auth.token || !auth.expiresAt) return false;
    return Date.now() < auth.expiresAt - 60000; // 1 minute buffer
  }

  /**
   * Clear all auth tokens (on completion or refresh)
   */
  clearAuth(): void {
    this.authTokens.clear();
    
    // Close any open auth windows
    this.authWindows.forEach(window => {
      window?.close();
    });
    this.authWindows.clear();
  }

  /**
   * Get explanation text for auth request
   */
  getAuthExplanation(service: string): string {
    const serviceName = service.charAt(0).toUpperCase() + service.slice(1);
    return `We need access to your ${serviceName} account to create the playlist. We only request the minimum permissions needed and don't store any data.`;
  }
}

// Export singleton instance
export const authManager = new AuthManager();

// Clear auth on page unload
window.addEventListener('beforeunload', () => {
  authManager.clearAuth();
});