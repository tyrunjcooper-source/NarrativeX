// NarrativeX - AI Comic Creator PWA
// State Management
const state = {
    currentGenre: null,
    currentCharacter: null,
    currentMode: null,
    currentAILevel: null,
    comics: [],
    settings: {
        theme: 'dark-theme',
        sound: true,
        autoSave: true,
        notifications: true
    },
    mediaRecorder: null,
    audioChunks: [],
    currentStory: ""
};

// Initialize App
window.addEventListener('load', () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').catch(e => console.log('SW registration failed', e));
    }
    loadSettings();
    loadComics();
    updateStats();
});

// Screen Navigation
function goToScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

function goBack() {
    goToScreen('homeScreen');
}

// Genre Selection
function selectGenre(genre) {
    state.currentGenre = genre;
    document.querySelectorAll('[onclick*="selectGenre"]').forEach(el => el.classList.remove('selected'));
    event.target.classList.add('selected');
    playSound();
}

// Character Selection
function selectCharacter(character) {
    state.currentCharacter = character;
    document.querySelectorAll('[onclick*="selectCharacter"]').forEach(el => el.classList.remove('selected'));
    event.target.closest('.grid-item').classList.add('selected');
    playSound();
    
    if (character === 'Create Own') {
        const name = prompt('Enter character name:');
        if (name) state.currentCharacter = name;
    }
}

// Story Mode Selection
function selectMode(mode) {
    state.currentMode = mode;
    document.querySelectorAll('[onclick*="selectMode"]').forEach(el => el.classList.remove('selected'));
    event.target.classList.add('selected');
    playSound();
}

// AI Level Selection
function selectAILevel(level) {
    state.currentAILevel = level;
    document.querySelectorAll('[onclick*="selectAILevel"]').forEach(el => el.classList.remove('selected'));
    event.target.classList.add('selected');
    playSound();
}

// Start Creating
function startCreating() {
    if (!state.currentGenre || !state.currentCharacter || !state.currentMode) {
        alert('Please select genre, character, and story mode!');
        return;
    }
    
    showModal('generatingModal');
    
    setTimeout(() => {
        closeModal('generatingModal');
        const comic = {
            id: Date.now(),
            genre: state.currentGenre,
            character: state.currentCharacter,
            mode: state.currentMode,
            content: generateComicContent(),
            createdAt: new Date().toLocaleString(),
            panels: generatePanels()
        };
        
        state.comics.push(comic);
        saveComics();
        updateStats();
        showSuccessModal(`${state.currentCharacter} comic created in ${state.currentGenre} mode!`);
        playSound();
    }, 2000);
}

// Generate Comic Content
function generateComicContent() {
    const templates = {
        'Action': [
            `${state.currentCharacter} faces an unexpected challenge!`,
            'An intense battle begins...',
            'Victory is within reach!',
            'The hero stands triumphant!'
        ],
        'Romance': [
            `${state.currentCharacter} discovers something new...`,
            'Emotions run deep...',
            'A moment of connection...',
            'Love finds a way...'
        ],
        'Horror': [
            `${state.currentCharacter} enters unknown territory...`,
            'Something feels wrong...',
            'Terror strikes!',
            'Survival is the only option...'
        ],
        'Comedy': [
            `${state.currentCharacter} finds themselves in a hilarious situation!`,
            'What a twist!',
            'Laughter ensues!',
            'Everyone learns a lesson!'
        ],
        'Sci-Fi': [
            `${state.currentCharacter} discovers advanced technology...`,
            'The future awaits...',
            'Reality bends!',
            'A new era begins...'
        ],
        'Fantasy': [
            `${state.currentCharacter} enters a magical realm...`,
            'Ancient powers awaken...',
            'The quest intensifies!',
            'Legend is born...'
        ]
    };
    
    return templates[state.currentGenre] || templates['Action'];
}

// Generate Comic Panels
function generatePanels() {
    const panels = generateComicContent();
    return panels.map((text, idx) => ({
        panelNumber: idx + 1,
        text: text,
        emoji: getEmojiForPanel(state.currentGenre, idx)
    }));
}

function getEmojiForPanel(genre, index) {
    const emojis = {
        'Action': ['⚡', '💥', '🔥', '🏆'],
        'Romance': ['💕', '😍', '✨', '💑'],
        'Horror': ['👻', '😱', '🔪', '🕷️'],
        'Comedy': ['😂', '🤣', '😄', '🎉'],
        'Sci-Fi': ['🚀', '🛸', '🤖', '🌌'],
        'Fantasy': ['🐉', '✨', '⚔️', '👑']
    };
    return emojis[genre]?.[index] || '📖';
}

// Generate with AI
function generateAI() {
    if (!state.currentAILevel) {
        alert('Please select an AI generation level!');
        return;
    }
    
    showModal('generatingModal');
    const storyText = document.getElementById('storyInput').value;
    
    setTimeout(() => {
        closeModal('generatingModal');
        const aiResponse = generateAIResponse(state.currentAILevel, storyText);
        const messageDiv = document.getElementById('chatLog');
        
        const userMsg = document.createElement('div');
        userMsg.className = 'message user';
        userMsg.textContent = storyText || 'Generate content';
        messageDiv.appendChild(userMsg);
        
        const aiMsg = document.createElement('div');
        aiMsg.className = 'message ai';
        aiMsg.textContent = aiResponse;
        messageDiv.appendChild(aiMsg);
        
        messageDiv.scrollTop = messageDiv.scrollHeight;
        playSound();
    }, 1500);
}

function generateAIResponse(level, context) {
    const responses = {
        'Sentence': 'As the story unfolds, our hero discovers an unexpected truth that will change everything.',
        'Paragraph': 'The journey continues as our hero faces new challenges. With courage burning in their heart and determination in their eyes, they venture into unknown territory. Along the way, they discover allies and uncover secrets that have been hidden for ages. The path ahead is uncertain, but the hero is ready.',
        'Chapter': 'Chapter 1: The Beginning\n\nOur story begins in a world where magic and technology coexist. The hero awakens with no memory of their past, but with an unshakeable sense of purpose. They must gather their strength, find allies, and uncover the truth about their identity. Every choice they make will shape their destiny and the fate of the world around them.\n\nAs they embark on this epic journey, they discover ancient powers within themselves. The adventure that awaits will test their limits and transform them in ways they never imagined.',
        'Full': 'FULL COMIC: The Complete Epic\n\n🎬 SCENE 1: The hero awakens\n🔥 SCENE 2: First challenge\n⚡ SCENE 3: Battle intensifies\n🏆 SCENE 4: Victory achieved\n✨ SCENE 5: New horizons\n\nThe tale of our hero has just begun!'
    };
    return responses[level] || responses['Sentence'];
}

// Send AI Message
function sendAIMessage() {
    const input = document.getElementById('aiMessage');
    const message = input.value.trim();
    
    if (!message) return;
    
    const messageDiv = document.getElementById('chatLog');
    const userMsg = document.createElement('div');
    userMsg.className = 'message user';
    userMsg.textContent = message;
    messageDiv.appendChild(userMsg);
    
    setTimeout(() => {
        const aiMsg = document.createElement('div');
        aiMsg.className = 'message ai';
        aiMsg.textContent = 'That\'s an interesting idea! Tell me more about what you\'d like to see in your story.';
        messageDiv.appendChild(aiMsg);
        messageDiv.scrollTop = messageDiv.scrollHeight;
        playSound();
    }, 500);
    
    input.value = '';
}

// Face Scan
function captureFace() {
    const video = document.getElementById('cameraFeed');
    const canvas = document.getElementById('faceCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);
    
    const imageData = canvas.toDataURL('image/jpeg');
    const preview = document.getElementById('facePreview');
    preview.innerHTML = `<img src="${imageData}" style="width: 100%; border-radius: 10px; margin: 1rem 0; box-shadow: 0 0 20px var(--accent);"></img><p style="text-align: center;">Face captured! Now apply a comic style...</p>`;
    playSound();
}

// Initialize Camera
function initializeCamera() {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
        .then(stream => {
            const video = document.getElementById('cameraFeed');
            video.srcObject = stream;
        })
        .catch(err => console.error('Camera error:', err));
}

// Voice Recording
function startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            state.mediaRecorder = new MediaRecorder(stream);
            state.audioChunks = [];
            
            state.mediaRecorder.ondataavailable = (e) => state.audioChunks.push(e.data);
            state.mediaRecorder.onstop = () => {
                const audioBlob = new Blob(state.audioChunks, { type: 'audio/wav' });
                const audioUrl = URL.createObjectURL(audioBlob);
                document.getElementById('audioPlayback').src = audioUrl;
            };
            
            state.mediaRecorder.start();
            document.getElementById('recordingStatus').innerHTML = '<div class="recording-indicator">🔴 Recording...</div>';
            playSound();
        })
        .catch(err => alert('Microphone access denied'));
}

function stopRecording() {
    if (state.mediaRecorder) {
        state.mediaRecorder.stop();
        document.getElementById('recordingStatus').innerHTML = '<p style="color: var(--success); text-align: center;">✓ Recording saved!</p>';
        playSound();
    }
}

function playRecording() {
    const audio = document.getElementById('audioPlayback');
    if (audio.src) audio.play();
}

// Gallery / Comics List
function loadComics() {
    const stored = localStorage.getItem('narrativeX_comics');
    if (stored) {
        state.comics = JSON.parse(stored);
        displayComics();
    }
}

function saveComics() {
    localStorage.setItem('narrativeX_comics', JSON.stringify(state.comics));
}

function displayComics() {
    const container = document.getElementById('comicsList');
    
    if (state.comics.length === 0) {
        container.innerHTML = '<p style="text-align: center; opacity: 0.7; padding: 2rem;">No comics yet! Start creating one! 🚀</p>';
        return;
    }
    
    container.innerHTML = state.comics.map((comic, idx) => `
        <div class="card">
            <h3>${comic.character} - ${comic.genre}</h3>
            <p>Mode: ${comic.mode}</p>
            <p style="font-size: 0.9rem; opacity: 0.7;">${comic.createdAt}</p>
            <div style="margin: 1rem 0;">
                ${comic.panels.map(p => `<div class="comic-panel"><p>${p.emoji}</p><p>${p.text}</p></div>`).join('')}
            </div>
            <button class="btn" onclick="viewComic(${idx})">View Comic 👀</button>
            <button class="btn secondary" onclick="deleteComic(${idx})">Delete 🗑️</button>
        </div>
    `).join('');
}

function viewComic(index) {
    const comic = state.comics[index];
    alert(`Comic: ${comic.character}\nGenre: ${comic.genre}\nMode: ${comic.mode}\n\n${comic.panels.map(p => `${p.emoji} ${p.text}`).join('\n')}`);
}

function deleteComic(index) {
    if (confirm('Delete this comic?')) {
        state.comics.splice(index, 1);
        saveComics();
        displayComics();
        updateStats();
        playSound();
    }
}

// Export Comics
function exportComics() {
    if (state.comics.length === 0) {
        alert('No comics to export!');
        return;
    }
    const data = JSON.stringify(state.comics, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'narrativex_comics.json';
    a.click();
}

// Settings
function loadSettings() {
    const stored = localStorage.getItem('narrativeX_settings');
    if (stored) {
        state.settings = { ...state.settings, ...JSON.parse(stored) };
        applyTheme(state.settings.theme);
    }
}

function saveSetting(key, value) {
    state.settings[key] = value;
    localStorage.setItem('narrativeX_settings', JSON.stringify(state.settings));
}

function setTheme(theme) {
    document.body.className = theme;
    state.settings.theme = theme;
    localStorage.setItem('narrativeX_settings', JSON.stringify(state.settings));
    document.querySelectorAll('[onclick*="setTheme"]').forEach(el => el.classList.remove('selected'));
    event.target.classList.add('selected');
    playSound();
}

function applyTheme(theme) {
    document.body.className = theme;
}

function showSettings() {
    goToScreen('settingsScreen');
}

// Stats
function updateStats() {
    document.getElementById('comicCount').textContent = state.comics.length;
    const storageUsed = JSON.stringify(state.comics).length / 1024 / 1024;
    document.getElementById('storageSize').textContent = storageUsed.toFixed(2) + 'MB';
}

// Modal Functions
function showModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

function showSuccessModal(message) {
    document.getElementById('successMessage').textContent = message;
    showModal('successModal');
}

// Sound Effects
function playSound() {
    if (!state.settings.sound) return;
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// Clear All Data
function clearAllData() {
    if (confirm('Clear all data? This cannot be undone!')) {
        localStorage.clear();
        state.comics = [];
        state.settings = {
            theme: 'dark-theme',
            sound: true,
            autoSave: true,
            notifications: true
        };
        location.reload();
    }
}

// Initialize on route changes
window.addEventListener('hashchange', () => {
    const screens = ['homeScreen', 'creatorScreen', 'aiStudioScreen', 'galleryScreen', 'toolsScreen', 'faceScanScreen', 'voiceScreen', 'settingsScreen'];
    const screenId = screens.find(s => location.hash.includes(s)) || 'homeScreen';
    goToScreen(screenId);
});

// Initialize Camera when Face Scan is opened
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.target.id === 'faceScanScreen' && mutation.target.classList.contains('active')) {
            initializeCamera();
        }
    });
});

if (document.getElementById('app')) {
    observer.observe(document.getElementById('app'), { subtree: true, attributes: true, attributeFilter: ['class'] });
}