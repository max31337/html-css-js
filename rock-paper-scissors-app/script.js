let userChoice = '';
let computerChoice = '';
let winCounter = 0; 
let loseCounter = 0; 

const cards = document.querySelectorAll('.card');
const playButton = document.getElementById('playButton');
const resultModal = document.getElementById('resultModal');
const resultMessage = document.getElementById('resultMessage');
const computerChoiceText = document.getElementById('computerChoice');
const computerChoiceIcon = document.getElementById('computerChoiceIcon');
const closeModalBtn = document.getElementById('closeModalBtn');
const winCountDisplay = document.getElementById('winCount');
const loseCountDisplay = document.getElementById('loseCount');
const resetButton = document.getElementById('resetScores');
const warningModal = document.getElementById('warningModal');
const closeWarningModalBtn = document.getElementById('closeWarningModalBtn');

cards.forEach(card => {
    card.addEventListener('click', () => {
        cards.forEach(c => c.classList.remove('selected')); 
        card.classList.add('selected'); 
        userChoice = card.getAttribute('data-choice');
    });
});

function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    return choices[Math.floor(Math.random() * choices.length)];
}

function determineResult(user, computer) {
    if (user === computer) return "It's a tie!";
    if (
        (user === 'rock' && computer === 'scissors') ||
        (user === 'paper' && computer === 'rock') ||
        (user === 'scissors' && computer === 'paper')
    ) {
        winCounter++;
        winCountDisplay.textContent = winCounter;
        return 'You win!';
    } else {
        loseCounter++;
        loseCountDisplay.textContent = loseCounter;
        return 'You lose!';
    }
}

playButton.addEventListener('click', () => {
    if (!userChoice) {
        warningModal.style.display = 'flex';
        return;
    }

    computerChoice = getComputerChoice();
    const result = determineResult(userChoice, computerChoice);

    const emojiChoices = {
        rock: "🪨", 
        paper: "📄", 
        scissors: "✂️" 
    };

    resultMessage.textContent = result;
    computerChoiceText.innerHTML = `Computer chose: ${computerChoice} ${emojiChoices[computerChoice]}`;
    
    const icons = {
        rock: "https://images.emojiterra.com/google/noto-emoji/unicode-16.0/color/svg/270a.svg",
        paper: "https://images.emojiterra.com/google/noto-emoji/unicode-16.0/color/svg/270b.svg",
        scissors: "https://images.emojiterra.com/google/noto-emoji/unicode-16.0/color/svg/270c.svg"
    };
    
    computerChoiceIcon.src = icons[computerChoice];

    resultModal.style.display = 'flex';
});

closeModalBtn.addEventListener('click', () => {
    resultModal.style.display = 'none';
    resetGame();
});

closeWarningModalBtn.addEventListener('click', () => {
    warningModal.style.display = 'none';
});

function resetGame() {
    userChoice = '';
    cards.forEach(c => c.classList.remove('selected'));
}

resetButton.addEventListener('click', () => {
    winCounter = 0;
    loseCounter = 0;
    winCountDisplay.textContent = 0;
    loseCountDisplay.textContent = 0;
});

window.addEventListener('click', (e) => {
    if (e.target === resultModal) {
        resultModal.style.display = 'none';
        resetGame();
    } else if (e.target === warningModal) {
        warningModal.style.display = 'none';
    }
});
