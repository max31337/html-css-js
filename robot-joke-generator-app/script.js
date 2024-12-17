const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;
const chat = document.getElementById('chat');
const jokeBtn = document.getElementById('jokeBtn');

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('light-mode')) {
        themeIcon.textContent = '🌞';
    } else {
        themeIcon.textContent = '🌙';
    }
});

function addMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.textContent = text;
    chat.appendChild(messageDiv);
    chat.scrollTop = chat.scrollHeight;
}

async function fetchJoke() {
    try {
        const response = await fetch('https://official-joke-api.appspot.com/random_joke');
        const joke = await response.json();
        return `${joke.setup} - ${joke.punchline}`;
    } catch (error) {
        console.error('Error fetching joke:', error);
        return 'Oops! Something went wrong while fetching the joke.';
    }
}

jokeBtn.addEventListener('click', () => {
    addMessage('user', "Tell me a joke!");
    setTimeout(async () => {
        const joke = await fetchJoke();  
        addMessage('bot', joke);
    }, 1000);
});
