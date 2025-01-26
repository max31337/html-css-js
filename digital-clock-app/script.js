function updateClock() {
    const clockElement = document.getElementById('clock');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}

const themeToggle = document.getElementById('theme-toggle');
const toggleLabel = document.getElementById('toggle-label');
let isDarkMode = true;

themeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('light-mode', !isDarkMode);
    themeToggle.classList.toggle('on', !isDarkMode);
    toggleLabel.textContent = isDarkMode ? 'Dark Mode' : 'Light Mode';
});

setInterval(updateClock, 1000);
updateClock();
