// Joke Generator App
const state = {
    currentJoke: null,
    currentCategory: 'random',
    jokeCount: 0,
    categories: new Set(),
    favorites: [],
    punchlineShown: false
};

const API_ENDPOINTS = {
    random: 'https://official-joke-api.appspot.com/random_joke',
    programming: 'https://official-joke-api.appspot.com/jokes/programming/random',
    knockKnock: 'https://official-joke-api.appspot.com/jokes/knock-knock/random',
    general: 'https://official-joke-api.appspot.com/jokes/general/random'
};

// Initialize
window.addEventListener('load', () => {
    loadStats();
    getJoke();
    setupCategoryButtons();
    setupServiceWorker();
});

// Setup Service Worker
function setupServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw-joke.js').catch(e => console.log('SW registration failed', e));
    }
}

// Setup Category Buttons
function setupCategoryButtons() {
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            buttons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            state.currentCategory = e.target.dataset.category;
            state.punchlineShown = false;
            getJoke();
        });
    });
}

// Get Joke from API
async function getJoke() {
    const jokeContainer = document.getElementById('jokeContainer');
    const loading = document.getElementById('loading');
    const error = document.getElementById('error');
    const punchline = document.getElementById('jokePunchline');

    // Reset state
    state.punchlineShown = false;
    if (punchline) punchline.classList.remove('show');
    if (error) error.classList.remove('show');
    if (loading) loading.classList.add('active');
    if (jokeContainer) jokeContainer.style.display = 'none';

    try {
        // Determine which API to use
        let apiUrl = API_ENDPOINTS.random;
        if (state.currentCategory === 'programming') {
            apiUrl = API_ENDPOINTS.programming;
        } else if (state.currentCategory === 'knock-knock') {
            apiUrl = API_ENDPOINTS.knockKnock;
        } else if (state.currentCategory === 'general') {
            apiUrl = API_ENDPOINTS.general;
        }

        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        
        // Handle both single and array responses
        const joke = Array.isArray(data) ? data[0] : data;

        state.currentJoke = joke;
        state.jokeCount++;
        state.categories.add(state.currentCategory);
        saveStats();

        displayJoke(joke);
        playSound();

    } catch (err) {
        console.error('Error fetching joke:', err);
        showError('Oops! Could not load a joke. Please try again.');
    } finally {
        if (loading) loading.classList.remove('active');
    }
}

// Display Joke
function displayJoke(joke) {
    const jokeContainer = document.getElementById('jokeContainer');
    const jokeText = document.getElementById('jokeText');
    const jokePunchline = document.getElementById('jokePunchline');

    // Handle different joke formats
    let setup = joke.setup || joke.joke || 'Why did the chicken cross the road?';
    let punchlineText = joke.delivery || joke.punchline || 'To get to the other side!';

    if (jokeText) jokeText.textContent = setup;
    if (jokePunchline) {
        jokePunchline.textContent = punchlineText;
        jokePunchline.classList.remove('show');
    }

    if (jokeContainer) jokeContainer.style.display = 'flex';
}

// Toggle Punchline
function togglePunchline() {
    if (!state.currentJoke) return;
    const punchline = document.getElementById('jokePunchline');
    if (punchline) {
        state.punchlineShown = !state.punchlineShown;
        punchline.classList.toggle('show');
    }
}

// Copy Joke
function copyJoke() {
    if (!state.currentJoke) return;

    let setup = state.currentJoke.setup || state.currentJoke.joke || '';
    let punchline = state.currentJoke.delivery || state.currentJoke.punchline || '';
    const jokeText = `${setup}\n\n${punchline}`;

    navigator.clipboard.writeText(jokeText).then(() => {
        alert('✅ Joke copied to clipboard!');
    }).catch(err => {
        console.error('Copy failed:', err);
        alert('Could not copy to clipboard');
    });
}

// Show Error
function showError(message) {
    const error = document.getElementById('error');
    if (error) {
        error.textContent = message;
        error.classList.add('show');
        setTimeout(() => {
            error.classList.remove('show');
        }, 5000);
    }
}

// Toggle Stats
function toggleStats() {
    const stats = document.getElementById('stats');
    if (stats) {
        stats.style.display = stats.style.display === 'none' ? 'grid' : 'none';
        updateStats();
    }
}

// Update Stats Display
function updateStats() {
    const jokeCount = document.getElementById('jokeCount');
    const categoryCount = document.getElementById('categoryCount');
    const favoriteCount = document.getElementById('favoriteCount');
    
    if (jokeCount) jokeCount.textContent = state.jokeCount;
    if (categoryCount) categoryCount.textContent = state.categories.size;
    if (favoriteCount) favoriteCount.textContent = state.favorites.length;
}

// Save Stats to LocalStorage
function saveStats() {
    localStorage.setItem('jokeGeneratorStats', JSON.stringify({
        jokeCount: state.jokeCount,
        categories: Array.from(state.categories),
        favorites: state.favorites
    }));
}

// Load Stats from LocalStorage
function loadStats() {
    const saved = localStorage.getItem('jokeGeneratorStats');
    if (saved) {
        const data = JSON.parse(saved);
        state.jokeCount = data.jokeCount || 0;
        state.categories = new Set(data.categories || []);
        state.favorites = data.favorites || [];
        updateStats();
    }
}

// Play Sound Effect
function playSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 800;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
    } catch (e) {
        // Silent fail - audio context not available
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        getJoke();
    } else if (e.code === 'Enter') {
        togglePunchline();
    } else if (e.code === 'KeyC') {
        copyJoke();
    }
});