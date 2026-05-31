// NarrativeX Characters Data
const characters = {
    'DC Universe': [
        // Main Heroes
        { name: 'Superman', emoji: '🦸‍♂️', series: 'DC', role: 'Hero' },
        { name: 'Batman', emoji: '🦇', series: 'DC', role: 'Hero' },
        { name: 'Wonder Woman', emoji: '👩‍🦸', series: 'DC', role: 'Hero' },
        { name: 'The Flash', emoji: '⚡', series: 'DC', role: 'Hero' },
        { name: 'Green Lantern', emoji: '💚', series: 'DC', role: 'Hero' },
        { name: 'Aquaman', emoji: '🌊', series: 'DC', role: 'Hero' },
        { name: 'Cyborg', emoji: '🤖', series: 'DC', role: 'Hero' },
        { name: 'Green Arrow', emoji: '🏹', series: 'DC', role: 'Hero' },
        // Sidekicks & Supporting
        { name: 'Robin', emoji: '🦅', series: 'DC', role: 'Sidekick' },
        { name: 'Nightwing', emoji: '🌙', series: 'DC', role: 'Sidekick' },
        { name: 'Batgirl', emoji: '💜', series: 'DC', role: 'Sidekick' },
        { name: 'Kid Flash', emoji: '💨', series: 'DC', role: 'Sidekick' },
        { name: 'Speedy', emoji: '🔴', series: 'DC', role: 'Sidekick' },
    ],
    'Marvel': [
        // Main Heroes
        { name: 'Spider-Man', emoji: '🕷️', series: 'Marvel', role: 'Hero' },
        { name: 'Iron Man', emoji: '🤖', series: 'Marvel', role: 'Hero' },
        { name: 'Captain America', emoji: '🛡️', series: 'Marvel', role: 'Hero' },
        { name: 'Thor', emoji: '⚒️', series: 'Marvel', role: 'Hero' },
        { name: 'Black Widow', emoji: '🔫', series: 'Marvel', role: 'Hero' },
        { name: 'Hulk', emoji: '💪', series: 'Marvel', role: 'Hero' },
        { name: 'Doctor Strange', emoji: '🔮', series: 'Marvel', role: 'Hero' },
        { name: 'Black Panther', emoji: '🐾', series: 'Marvel', role: 'Hero' },
        // Sidekicks & Supporting
        { name: 'Falcon', emoji: '🦅', series: 'Marvel', role: 'Sidekick' },
        { name: 'Winter Soldier', emoji: '❄️', series: 'Marvel', role: 'Sidekick' },
        { name: 'Scarlet Witch', emoji: '🌪️', series: 'Marvel', role: 'Sidekick' },
        { name: 'Hawkeye', emoji: '🎯', series: 'Marvel', role: 'Sidekick' },
        { name: 'Vision', emoji: '💎', series: 'Marvel', role: 'Sidekick' },
        { name: 'War Machine', emoji: '🔫', series: 'Marvel', role: 'Sidekick' },
    ],
    'Anime': [
        // Main Heroes
        { name: 'Naruto', emoji: '🍃', series: 'Anime', role: 'Hero' },
        { name: 'Luffy', emoji: '🏴‍☠️', series: 'Anime', role: 'Hero' },
        { name: 'Goku', emoji: '🌀', series: 'Anime', role: 'Hero' },
        { name: 'Ichigo', emoji: '⚔️', series: 'Anime', role: 'Hero' },
        { name: 'Tanjiro', emoji: '🔥', series: 'Anime', role: 'Hero' },
        { name: 'Eren', emoji: '🧱', series: 'Anime', role: 'Hero' },
        { name: 'Deku', emoji: '👊', series: 'Anime', role: 'Hero' },
        { name: 'Bakugo', emoji: '💥', series: 'Anime', role: 'Hero' },
        { name: 'All Might', emoji: '🦸', series: 'Anime', role: 'Hero' },
        { name: 'Saitama', emoji: '😐', series: 'Anime', role: 'Hero' },
        { name: 'Lelouch', emoji: '♛', series: 'Anime', role: 'Hero' },
        { name: 'Light Yagami', emoji: '📓', series: 'Anime', role: 'Hero' },
        { name: 'Vegeta', emoji: '👑', series: 'Anime', role: 'Hero' },
        { name: 'Jotaro', emoji: '🕶️', series: 'Anime', role: 'Hero' },
        // Sidekicks & Supporting
        { name: 'Sasuke', emoji: '⚡', series: 'Anime', role: 'Sidekick' },
        { name: 'Sakura', emoji: '🌸', series: 'Anime', role: 'Sidekick' },
        { name: 'Kakashi', emoji: '👁️', series: 'Anime', role: 'Sidekick' },
        { name: 'Zoro', emoji: '🗡️', series: 'Anime', role: 'Sidekick' },
        { name: 'Nami', emoji: '🗺️', series: 'Anime', role: 'Sidekick' },
        { name: 'Chopper', emoji: '🦌', series: 'Anime', role: 'Sidekick' },
        { name: 'Vegeta Jr', emoji: '💙', series: 'Anime', role: 'Sidekick' },
        { name: 'Gohan', emoji: '⭐', series: 'Anime', role: 'Sidekick' },
        { name: 'Kenshin', emoji: '⛩️', series: 'Anime', role: 'Sidekick' },
        { name: 'Aizawa', emoji: '😴', series: 'Anime', role: 'Sidekick' },
        { name: 'Nezuko', emoji: '💚', series: 'Anime', role: 'Sidekick' },
        { name: 'Giyu', emoji: '💧', series: 'Anime', role: 'Sidekick' },
        { name: 'Mikasa', emoji: '🗡️', series: 'Anime', role: 'Sidekick' },
        { name: 'Armin', emoji: '📚', series: 'Anime', role: 'Sidekick' },
    ],
    'Manga': [
        // Main Heroes
        { name: 'Tanjiro', emoji: '🔥', series: 'Manga', role: 'Hero' },
        { name: 'Luffy', emoji: '🏴‍☠️', series: 'Manga', role: 'Hero' },
        { name: 'Naruto', emoji: '🍃', series: 'Manga', role: 'Hero' },
        { name: 'Goku', emoji: '🌀', series: 'Manga', role: 'Hero' },
        { name: 'Ichigo', emoji: '⚔️', series: 'Manga', role: 'Hero' },
        { name: 'Deku', emoji: '👊', series: 'Manga', role: 'Hero' },
        { name: 'Kenshin', emoji: '⛩️', series: 'Manga', role: 'Hero' },
        { name: 'Yuji', emoji: '🔴', series: 'Manga', role: 'Hero' },
        // Sidekicks & Supporting
        { name: 'Nezuko', emoji: '💚', series: 'Manga', role: 'Sidekick' },
        { name: 'Zoro', emoji: '🗡️', series: 'Manga', role: 'Sidekick' },
        { name: 'Sasuke', emoji: '⚡', series: 'Manga', role: 'Sidekick' },
        { name: 'Vegeta', emoji: '👑', series: 'Manga', role: 'Sidekick' },
        { name: 'Rukia', emoji: '👻', series: 'Manga', role: 'Sidekick' },
        { name: 'Ochako', emoji: '✨', series: 'Manga', role: 'Sidekick' },
        { name: 'Kaoru', emoji: '💜', series: 'Manga', role: 'Sidekick' },
        { name: 'Megumi', emoji: '🖤', series: 'Manga', role: 'Sidekick' },
    ],
    'New Heroes': [
        // 10 New Main Heroes
        { name: 'Daredevil', emoji: '👁️', series: 'Marvel', role: 'Hero' },
        { name: 'Deadpool', emoji: '🔴', series: 'Marvel', role: 'Hero' },
        { name: 'Wolverine', emoji: '🐺', series: 'Marvel', role: 'Hero' },
        { name: 'Cyclops', emoji: '🔴', series: 'Marvel', role: 'Hero' },
        { name: 'Storm', emoji: '⛈️', series: 'Marvel', role: 'Hero' },
        { name: 'Jean Grey', emoji: '🔥', series: 'Marvel', role: 'Hero' },
        { name: 'Ant-Man', emoji: '🐜', series: 'Marvel', role: 'Hero' },
        { name: 'Wasp', emoji: '🐝', series: 'Marvel', role: 'Hero' },
        { name: 'Shang-Chi', emoji: '🥋', series: 'Marvel', role: 'Hero' },
        { name: 'Moon Knight', emoji: '🌙', series: 'Marvel', role: 'Hero' },
    ],
    'DC Extended': [
        // 10 More DC Heroes & Villains
        { name: 'Superman', emoji: '🦸‍♂️', series: 'DC', role: 'Hero' },
        { name: 'Shazam', emoji: '⚡', series: 'DC', role: 'Hero' },
        { name: 'Atom', emoji: '⚛️', series: 'DC', role: 'Hero' },
        { name: 'Firestorm', emoji: '🔥', series: 'DC', role: 'Hero' },
        { name: 'Zatanna', emoji: '🎭', series: 'DC', role: 'Hero' },
        { name: 'Constantine', emoji: '🔮', series: 'DC', role: 'Hero' },
        { name: 'Hawkgirl', emoji: '🪶', series: 'DC', role: 'Hero' },
        { name: 'Mera', emoji: '🌊', series: 'DC', role: 'Hero' },
        { name: 'Vixen', emoji: '🦁', series: 'DC', role: 'Hero' },
        { name: 'Booster Gold', emoji: '⭐', series: 'DC', role: 'Hero' },
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
                <div class="char-series">${char.role}</div>
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
