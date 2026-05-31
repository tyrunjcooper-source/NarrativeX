// NarrativeX Characters Data
const characters = {
    'DC Universe': [
        { name: 'Superman', emoji: '🦸‍♂️', series: 'DC' },
        { name: 'Batman', emoji: '🦇', series: 'DC' },
        { name: 'Wonder Woman', emoji: '👩‍🦸', series: 'DC' },
        { name: 'The Flash', emoji: '⚡', series: 'DC' },
        { name: 'Green Lantern', emoji: '💚', series: 'DC' },
        { name: 'Aquaman', emoji: '🌊', series: 'DC' }
    ],
    'Marvel': [
        { name: 'Spider-Man', emoji: '🕷️', series: 'Marvel' },
        { name: 'Iron Man', emoji: '🤖', series: 'Marvel' },
        { name: 'Captain America', emoji: '🛡️', series: 'Marvel' },
        { name: 'Thor', emoji: '⚒️', series: 'Marvel' },
        { name: 'Black Widow', emoji: '🔫', series: 'Marvel' },
        { name: 'Hulk', emoji: '💪', series: 'Marvel' }
    ],
    'Anime': [
        { name: 'Naruto', emoji: '🍃', series: 'Anime' },
        { name: 'Luffy', emoji: '🏴‍☠️', series: 'Anime' },
        { name: 'Goku', emoji: '🌀', series: 'Anime' },
        { name: 'Ichigo', emoji: '⚔️', series: 'Anime' },
        { name: 'Tanjiro', emoji: '🔥', series: 'Anime' },
        { name: 'Eren', emoji: '🧱', series: 'Anime' },
        { name: 'Deku', emoji: '👊', series: 'Anime' },
        { name: 'Bakugo', emoji: '💥', series: 'Anime' },
        { name: 'All Might', emoji: '🦸', series: 'Anime' },
        { name: 'Saitama', emoji: '😐', series: 'Anime' },
        { name: 'Lelouch', emoji: '♛', series: 'Anime' },
        { name: 'Light Yagami', emoji: '📓', series: 'Anime' },
        { name: 'Vegeta', emoji: '👑', series: 'Anime' }
    ],
    'Manga': [
        { name: 'Tanjiro', emoji: '🔥', series: 'Manga' },
        { name: 'Luffy', emoji: '🏴‍☠️', series: 'Manga' },
        { name: 'Naruto', emoji: '🍃', series: 'Manga' },
        { name: 'Goku', emoji: '🌀', series: 'Manga' },
        { name: 'Ichigo', emoji: '⚔️', series: 'Manga' },
        { name: 'Deku', emoji: '👊', series: 'Manga' }
    ]
};

// Character tabs and grid population
document.addEventListener('DOMContentLoaded', () => {
    const charTabs = document.getElementById('charTabs');
    const characterGrid = document.getElementById('characterGrid');
    
    if (!charTabs || !characterGrid) return;
    
    let selectedUniverse = 'DC Universe';
    
    // Create tabs
    Object.keys(characters).forEach(universe => {
        const tab = document.createElement('div');
        tab.className = 'char-tab' + (universe === selectedUniverse ? ' active' : '');
        tab.textContent = universe;
        tab.onclick = () => {
            document.querySelectorAll('.char-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            selectedUniverse = universe;
            populateCharacterGrid();
            playSound();
        };
        charTabs.appendChild(tab);
    });
    
    // Populate character grid
    function populateCharacterGrid() {
        characterGrid.innerHTML = '';
        const chars = characters[selectedUniverse] || [];
        
        chars.forEach(char => {
            const card = document.createElement('div');
            card.className = 'character-card';
            card.onclick = () => selectCharacter(char.name);
            card.innerHTML = `
                <div class="char-emoji">${char.emoji}</div>
                <div class="char-name">${char.name}</div>
                <div class="char-series">${char.series}</div>
            `;
            characterGrid.appendChild(card);
        });
        
        // Add "Create Own" option
        const customCard = document.createElement('div');
        customCard.className = 'character-card';
        customCard.onclick = () => selectCharacter('Create Own');
        customCard.innerHTML = `
            <div class="char-emoji">✨</div>
            <div class="char-name">Create Own</div>
            <div class="char-series">Custom</div>
        `;
        characterGrid.appendChild(customCard);
    }
    
    // Initial population
    populateCharacterGrid();
});
