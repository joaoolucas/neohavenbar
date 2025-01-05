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

    // Effects configuration
    const effects = {
        drinks: {
            'Cyber Sunrise': {
                duration: 5000,
                effect: () => {
                    document.body.style.animation = 'sunriseEffect 5s';
                    const overlay = document.createElement('div');
                    overlay.className = 'effect-overlay sunrise';
                    document.body.appendChild(overlay);
                    setTimeout(() => overlay.remove(), 5000);
                }
            },
            'Neural Network': {
                duration: 5000,
                effect: () => {
                    const overlay = document.createElement('div');
                    overlay.className = 'effect-overlay matrix';
                    document.body.appendChild(overlay);
                    setTimeout(() => overlay.remove(), 5000);
                }
            }
        },
        drugs: {
            'Neural Boost': {
                duration: 8000,
                effect: () => {
                    document.body.classList.add('neural-boost');
                    const elements = document.querySelectorAll('.neon-text, .menu-item, .price, .drug-item, .drink-item, .social-icon');
                    elements.forEach(el => el.style.animation = 'pulseGlow 2s infinite');
                    
                    // Enhance visual effects
                    document.documentElement.style.setProperty('--neon-blue', '#00ffff');
                    document.documentElement.style.setProperty('--neon-purple', '#ff00ff');
                    document.documentElement.style.setProperty('--neon-green', '#50ff50');
                    
                    // Add matrix-like effect
                    const matrixOverlay = document.createElement('div');
                    matrixOverlay.className = 'effect-overlay neural-matrix';
                    document.body.appendChild(matrixOverlay);
                    
                    setTimeout(() => {
                        document.body.classList.remove('neural-boost');
                        elements.forEach(el => el.style.animation = '');
                        document.documentElement.style.setProperty('--neon-blue', '#00f3ff');
                        document.documentElement.style.setProperty('--neon-purple', '#ff00ff');
                        document.documentElement.style.setProperty('--neon-green', '#39ff14');
                        matrixOverlay.remove();
                    }, 8000);
                }
            },
            'Time Dilation': {
                duration: 10000,
                effect: () => {
                    document.body.classList.add('time-dilation');
                    const elements = document.querySelectorAll('*');
                    elements.forEach(el => {
                        el.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
                    });
                    setTimeout(() => {
                        document.body.classList.remove('time-dilation');
                        elements.forEach(el => {
                            el.style.transition = '';
                        });
                    }, 10000);
                }
            }
        }
    };

    // Function to apply substance effects
    const applyEffect = (substanceName, type) => {
        const substance = effects[type][substanceName];
        if (substance) {
            substance.effect();
            
            // Update bartender message
            const messages = {
                drinks: `Enjoying that ${substanceName}? The effects should kick in soon...`,
                drugs: `${substanceName} activated. Neural interfaces engaging...`
            };
            
            setTimeout(() => {
                const speechBubble = document.querySelector('.speech-bubble');
                speechBubble.textContent = messages[type];
            }, 1500);
        }
    };

    // Order system
    const orderBtns = document.querySelectorAll('.order-btn');
    orderBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const drinkItem = e.target.closest('.drink-item, .drug-item');
            const itemName = drinkItem.querySelector('h3').textContent;
            const price = drinkItem.querySelector('.price').textContent;
            const type = drinkItem.closest('section').id; // 'drinks' or 'drugs'
            
            // Change button state
            btn.textContent = 'Ordering...';
            btn.disabled = true;
            
            // Simulate order processing
            setTimeout(() => {
                btn.textContent = 'Ordered!';
                btn.classList.add('ordered');
                
                // Update bartender speech
                const speechBubble = document.querySelector('.speech-bubble');
                speechBubble.textContent = `Your ${itemName} is being prepared! That'll be ${price}`;
                
                // Apply the effect
                applyEffect(itemName, type);
                
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