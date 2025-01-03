document.addEventListener('DOMContentLoaded', () => {
    // Menu navigation
    const menuItems = document.querySelectorAll('.menu-item');
    const sections = document.querySelectorAll('.section');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const sectionId = item.dataset.section;
            
            // Hide all sections
            sections.forEach(section => {
                section.classList.remove('active');
            });

            // Show selected section
            document.getElementById(sectionId).classList.add('active');

            // Add glitch effect to menu item
            item.style.animation = 'none';
            item.offsetHeight; // Trigger reflow
            item.style.animation = 'glitch 0.3s linear';
        });
    });

    // Bartender greeting
    const greetings = [
        "Welcome to NeoHaven. What's your poison?",
        "Another night in the digital dream...",
        "Looking for something to forget the matrix?",
        "All drinks guaranteed virus-free.",
    ];

    const speechBubble = document.querySelector('.speech-bubble');
    
    // Change greeting randomly every 10 seconds
    setInterval(() => {
        const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
        speechBubble.style.opacity = '0';
        
        setTimeout(() => {
            speechBubble.textContent = randomGreeting;
            speechBubble.style.opacity = '1';
        }, 500);
    }, 10000);

    // Order system
    const orderBtns = document.querySelectorAll('.order-btn');
    orderBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const drinkItem = e.target.closest('.drink-item');
            const drinkName = drinkItem.querySelector('h3').textContent;
            const price = drinkItem.querySelector('.price').textContent;
            
            // Change button state
            btn.textContent = 'Ordering...';
            btn.disabled = true;
            
            // Simulate order processing
            setTimeout(() => {
                btn.textContent = 'Ordered!';
                btn.classList.add('ordered');
                
                // Update bartender speech
                const speechBubble = document.querySelector('.speech-bubble');
                speechBubble.textContent = `Your ${drinkName} is being prepared! That'll be ${price}`;
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    btn.textContent = 'Order Now';
                    btn.disabled = false;
                    btn.classList.remove('ordered');
                }, 3000);
            }, 1500);
        });
    });

    // Music player functionality
    const playBtns = document.querySelectorAll('.play-btn');
    const progressBars = document.querySelectorAll('.progress');
    let activeTrack = null;

    playBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const isPlaying = btn.textContent === '⏸';
            
            // Stop any currently playing track
            if (activeTrack && activeTrack !== btn) {
                activeTrack.textContent = '▶';
                const activeProgress = activeTrack.closest('.track').querySelector('.progress');
                activeProgress.style.width = '0%';
            }

            if (isPlaying) {
                btn.textContent = '▶';
                clearInterval(btn.dataset.interval);
                activeTrack = null;
            } else {
                btn.textContent = '⏸';
                activeTrack = btn;
                let progress = 0;
                const progressBar = btn.closest('.track').querySelector('.progress');
                const timeDisplay = btn.closest('.track').querySelector('.time');
                
                btn.dataset.interval = setInterval(() => {
                    progress += 0.5;
                    if (progress > 100) {
                        progress = 0;
                        btn.textContent = '▶';
                        clearInterval(btn.dataset.interval);
                        activeTrack = null;
                    }
                    progressBar.style.width = `${progress}%`;
                    
                    // Update time display
                    const totalSeconds = Math.floor((progress / 100) * 180); // 3 minutes = 180 seconds
                    const minutes = Math.floor(totalSeconds / 60);
                    const seconds = totalSeconds % 60;
                    timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
                }, 50);
            }
        });
    });
});

// Add glitch effect keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes glitch {
        0% { transform: translate(0) }
        20% { transform: translate(-2px, 2px) }
        40% { transform: translate(-2px, -2px) }
        60% { transform: translate(2px, 2px) }
        80% { transform: translate(2px, -2px) }
        100% { transform: translate(0) }
    }
`;
document.head.appendChild(style); 