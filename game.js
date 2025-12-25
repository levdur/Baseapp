import { sdk } from 'https://esm.sh/@farcaster/frame-sdk';

// Game state
let secretNumber;
let attempts;

// DOM elements
const guessInput = document.getElementById('guessInput');
const guessBtn = document.getElementById('guessBtn');
const feedback = document.getElementById('feedback');
const attemptsDiv = document.getElementById('attempts');
const restartBtn = document.getElementById('restartBtn');

// Initialize game
function initGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    guessInput.value = '';
    guessInput.disabled = false;
    guessBtn.disabled = false;
    feedback.textContent = '';
    feedback.className = 'feedback';
    attemptsDiv.textContent = '';
    restartBtn.classList.add('hidden');
    guessInput.focus();
}

// Handle guess
function handleGuess() {
    const guess = parseInt(guessInput.value);
    
    if (isNaN(guess) || guess < 1 || guess > 100) {
        feedback.textContent = 'Enter a number 1-100!';
        feedback.className = 'feedback';
        return;
    }
    
    attempts++;
    attemptsDiv.textContent = `Attempts: ${attempts}`;
    
    if (guess === secretNumber) {
        feedback.textContent = `🎉 You found it in ${attempts} tries!`;
        feedback.className = 'feedback correct';
        guessInput.disabled = true;
        guessBtn.disabled = true;
        restartBtn.classList.remove('hidden');
    } else if (guess < secretNumber) {
        feedback.textContent = '📈 Higher!';
        feedback.className = 'feedback higher';
        guessInput.value = '';
        guessInput.focus();
    } else {
        feedback.textContent = '📉 Lower!';
        feedback.className = 'feedback lower';
        guessInput.value = '';
        guessInput.focus();
    }
}

// Event listeners
guessBtn.addEventListener('click', handleGuess);

guessInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleGuess();
    }
});

restartBtn.addEventListener('click', initGame);

// Touch feedback
guessBtn.addEventListener('touchstart', () => {
    guessBtn.style.transform = 'scale(0.98)';
});

guessBtn.addEventListener('touchend', () => {
    guessBtn.style.transform = 'scale(1)';
});

// Start game
initGame();

// Farcaster SDK ready - call after everything is loaded
sdk.actions.ready();



