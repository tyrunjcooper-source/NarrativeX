# 🎨 NarrativeX - AI Comic Creator PWA

## What is NarrativeX?
NarrativeX is a full-featured Progressive Web App (PWA) that lets you create AI-powered comics and stories with stunning visuals. It works on any device, works offline, and installs like a native app!

## ✨ Features

### 🎨 Comic Creator
- **6 Genres**: Action, Romance, Horror, Comedy, Sci-Fi, Fantasy
- **20+ Characters**: Superman, Batman, Naruto, Luffy, Goku, and more
- **3 Story Modes**: Quick, Guided, Never-Ending
- Smart comic panel generation with emoji illustrations

### 🤖 AI Studio
- **4 Generation Levels**: Sentence, Paragraph, Chapter, Full Comic
- Live chat with AI for story inspiration
- Real-time content generation

### 📱 Progressive Web App Features
- **Install like an app** - Works on iOS & Android
- **Offline support** - Service Worker caching
- **Auto-save** - All data stored locally
- **4 Themes** - Dark, Neon, Cosmic, Manga B&W

### 🛠️ Advanced Tools
- 📷 **Face Scan** - Capture and style your face
- 🎙️ **Voice Recording** - Add narration to comics
- 💾 **Export** - Download comics as JSON
- 📊 **Stats** - Track comics created and storage used

## 🚀 Getting Started

### On Your Phone
1. Visit: `https://tyrunjcooper-source.github.io/narrativex`
2. Tap the menu (⋯ or ↓ depending on browser)
3. Select "Add to Home Screen"
4. Tap the new NarrativeX icon to open
5. Start creating!

### On Desktop (Development)
1. Clone the repository
2. Run `python -m http.server 8000` (or similar local server)
3. Open `http://localhost:8000`
4. Open DevTools → Application → Service Workers to register

## 📁 Files
- **index.html** - Full UI with 8 screens
- **app.js** - Core logic & state management
- **manifest.json** - PWA configuration
- **sw.js** - Service Worker for offline support

## 🎮 How to Use

### Create a Comic
1. Home → Comic Creator
2. Select a **Genre** (Action, Romance, etc)
3. Choose a **Character** (or create your own)
4. Pick a **Story Mode**
5. Click "Start Creating" and watch the magic! ✨

### Chat with AI
1. Home → AI Studio
2. Select generation level (Sentence/Paragraph/Chapter/Full)
3. Paste your story or write something
4. Chat with AI in real-time

### Use Tools
1. Home → Tools
2. **Face Scan**: Capture your face with your camera
3. **Voice Recording**: Record narration
4. **Export**: Download all your comics

### Customize
1. Settings (⚙️ button)
2. Choose from 4 themes
3. Toggle sound, auto-save, notifications

## 💾 Storage
All data is stored **locally on your device** using localStorage:
- Comics are auto-saved
- Settings persist across sessions
- Works completely offline after first load

## 🎨 Themes
- **Dark** (Default) - Eye-friendly dark mode
- **Neon** - Bright cyber aesthetic
- **Cosmic** - Space-inspired colors
- **Manga B&W** - Classic black & white

## 📊 Characters
**DC Universe**: Superman, Wonder Woman, Batman, Flash  
**Marvel**: Spider-Man, Iron Man, Captain America  
**Anime**: Naruto, Luffy, Goku, Ichigo, Tanjiro, Eren, Deku, Bakugo, All Might, Saitama, Lelouch, Light Yagami, Vegeta  
**Custom**: Create your own!

## ⚙️ Technical Stack
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables
- **Vanilla JavaScript** - No dependencies
- **Service Worker** - Offline functionality
- **LocalStorage** - Data persistence
- **Web APIs** - Camera, Microphone, Audio Context

## 🔒 Privacy
Your data never leaves your device. Everything is stored locally!

## 📝 License
Created for storytellers everywhere. Made with ❤️

---

**Ready to create? Install NarrativeX today! 🎉**
