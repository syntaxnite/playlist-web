# SoundRelay – Privacy Policy

**Last updated:** December 2024

This Privacy Policy describes how **SoundRelay** ("we", "us", or "our") handles your information when you use our playlist conversion service.

**TL;DR:** We don't store your data. Everything happens in your browser session only.

---

## 1. Information We Collect

### What We DON'T Collect

SoundRelay is designed with privacy as a core principle. We **do not collect, store, or retain**:

* ❌ User accounts or profiles
* ❌ Personal information (names, emails, addresses)
* ❌ Playlist contents after conversion
* ❌ Music listening history
* ❌ Payment information
* ❌ Browsing history across sessions
* ❌ Device fingerprinting data

### What We DO Process (Session Only)

During an active conversion session, we temporarily process:

* ✅ Playlist URLs you provide
* ✅ Track metadata (song titles, artists, albums)
* ✅ Temporary authentication tokens from music services
* ✅ Conversion progress and results

**All of this data is discarded when your session ends.**

---

## 2. How We Handle Your Data

### Session-Only Processing

* All playlist data lives in your browser's memory during the conversion
* No server-side storage of playlist contents
* Authentication tokens are used once and immediately discarded
* Your browser clears all data when you close the tab or refresh

### Third-Party Authentication

When you authorize access to music services:

* We request **minimal permissions** (read playlists, create playlists)
* Authentication happens directly between you and the music service
* We never see or store your login credentials
* Tokens are used immediately for the conversion, then deleted

### What Happens to Your Playlists

* **Source playlists**: We read metadata only, never modify originals
* **Destination playlists**: Created in your account via official APIs
* **SoundRelay role**: We're just a temporary bridge between services

---

## 3. Data We Don't Have Access To

SoundRelay **cannot access**:

* Your personal music libraries
* Private playlists (unless you specifically share them)
* Your listening history on any platform
* Your payment or subscription information
* Your personal messages or social data

We only work with **publicly accessible playlist metadata** that you explicitly provide.

---

## 4. Third-Party Services

### Music Platform Interactions

SoundRelay connects with:
* Spotify
* Apple Music  
* YouTube Music
* Deezer
* Tidal

**Important**: Each service has its own privacy policy. When you authenticate with them, you're subject to their data handling practices, not ours.

### Analytics and Tracking

* **No tracking cookies**: We don't use persistent tracking
* **No analytics**: We don't collect usage statistics
* **No advertising**: No ad networks or data brokers involved
* **No social media pixels**: No Facebook, Google, or other tracking pixels

---

## 5. Data Security

### How We Protect Your Session Data

* **HTTPS encryption**: All communication is encrypted in transit
* **No persistent storage**: Data never hits our servers permanently  
* **Memory-only processing**: Everything stays in browser RAM
* **Automatic cleanup**: Data is cleared when session ends

### What We Can't Control

* Security of the music platforms you connect to
* Your device's security (use updated browsers and antivirus)
* Network security on your end (use secure WiFi)

---

## 6. Your Rights and Control

### You Always Control

* **What playlists to convert**: You choose what to share
* **Which services to connect**: You decide which platforms to authorize
* **When to stop**: Close the tab anytime to end the session
* **Data deletion**: Happens automatically when you leave

### No Data Requests Needed

Since we don't store personal data:
* No need to request data deletion (it's automatic)
* No data portability requests needed  
* No correction requests necessary
* No opt-out required

---

## 7. Children's Privacy

SoundRelay does not knowingly collect data from children under 13. Since we don't collect personal information at all, this is not a concern for our service specifically.

However, the music platforms you connect to may have their own age restrictions and policies.

---

## 8. International Users

### Where Our Service Operates

* SoundRelay works globally where supported music services are available
* No data crosses borders because no data is stored
* All processing happens locally in your browser

### Regional Compliance

* **GDPR (Europe)**: Compliant by design (no data collection)
* **CCPA (California)**: No personal information sale or retention  
* **Other regions**: Generally compliant due to minimal data handling

---

## 9. Changes to This Policy

We may update this Privacy Policy occasionally. Major changes will be reflected in the "Last updated" date.

Since we don't collect contact information, we can't notify you directly of changes. Please review this policy periodically.

---

## 10. Technical Details for Privacy Advocates

### Data Flow

1. **You paste a playlist URL** → Parsed in browser JavaScript
2. **Authentication request** → Direct OAuth with music service  
3. **Playlist data fetch** → Stored in browser memory only
4. **Track matching** → Processed client-side with API calls
5. **Playlist creation** → Direct API call to destination service
6. **Session end** → All data cleared from memory

### No Server-Side Data Storage

* Our servers never see your playlist contents
* Authentication tokens are proxy-passed, not stored
* No databases contain user information
* No logs contain personal data

### Open Source Transparency

* Our code is available for review on GitHub
* You can verify our privacy claims by examining the source
* Community contributions are welcome for security improvements

---

## 11. Contact Us

If you have privacy questions or concerns:

**Email:** privacy@playlistrelay.com

**Response time:** We aim to respond within 48 hours.

**GitHub Issues:** For technical privacy questions, you can also open an issue on our repository.

---

## 12. Why We Built It This Way

**Privacy by design** isn't just a buzzword for us—it's how we built SoundRelay from the ground up.

We believe:
* Your music taste is personal
* You shouldn't have to trust us with your data
* The best privacy policy is not needing one
* Technology should work for you, not against you

**SoundRelay exists to move your playlists, not your personal information.**