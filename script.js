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