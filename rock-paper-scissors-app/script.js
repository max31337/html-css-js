let userChoice = '';
let computerChoice = '';

const cards = document.querySelectorAll('.card');
const playButton = document.getElementById('playButton');
const resultModal = document.getElementById('resultModal');
const resultMessage = document.getElementById('resultMessage');
const computerChoiceText = document.getElementById('computerChoice');
const computerChoiceIcon = document.getElementById('computerChoiceIcon');
const closeModalBtn = document.getElementById('closeModalBtn');

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

playButton.addEventListener('click', () => {
    if (!userChoice) {
        alert('Please select Rock, Paper, or Scissors!');
        return;
    }

    computerChoice = getComputerChoice();

    let result;
    if (userChoice === computerChoice) {
        result = "It's a tie!";
    } else if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        result = "You win!";
    } else {
        result = "You lose!";
    }

    const icons = {
        rock: "https://images.emojiterra.com/google/noto-emoji/unicode-16.0/color/svg/270a.svg",
        paper: "https://images.emojiterra.com/google/noto-emoji/unicode-16.0/color/svg/270b.svg",
        scissors: "https://images.emojiterra.com/google/noto-emoji/unicode-16.0/color/svg/2702.svg"
    };

    resultMessage.textContent = result;
    computerChoiceText.textContent = `Computer chose: ${computerChoice}`;
    computerChoiceIcon.src = icons[computerChoice];

    resultModal.style.display = 'flex';
});

closeModalBtn.addEventListener('click', () => {
    resultModal.style.display = 'none';
    resetGame();
});

function resetGame() {
    userChoice = '';
    computerChoice = '';
    cards.forEach(c => c.classList.remove('selected'));
}

window.addEventListener('click', (e) => {
    if (e.target === resultModal) {
        resultModal.style.display = 'none';
        resetGame();
    }
});
