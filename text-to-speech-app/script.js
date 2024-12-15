
let recognition; 
let isListening = false;
let lastProcessedIndex = 0;

function startConverting() {
    if (!('webkitSpeechRecognition' in window)) {
        alert("Sorry, your browser doesn't support speech recognition. Please use Chrome.");
        return;
    }

    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    const resultBox = document.getElementById('result');
    resultBox.innerHTML = ''; 

    let finalTranscript = ''; 

    recognition.start();
    isListening = true;

    recognition.onresult = function (event) {
        let interimTranscript = '';

        for (let i = lastProcessedIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                finalTranscript += formatSentence(transcript) + ' ';
                lastProcessedIndex = i + 1; 
            } else {
                interimTranscript += transcript;
            }
        }

        resultBox.innerText = finalTranscript + formatSentence(interimTranscript);
    };

    recognition.onerror = function (event) {
        console.error("Error:", event.error);
        stopConverting();
    };

    recognition.onend = function () {
        if (isListening) {
            console.log("Restarting speech recognition...");
            recognition.start();
        }
    };
}

function stopConverting() {
    if (recognition && isListening) {
        recognition.stop();
        isListening = false;
        console.log("Speech recognition stopped.");
    }
}

function formatSentence(text) {
    return text
        .split(/([.!?]\s    n)/) 
        .map(sentence => {
            let trimmed = sentence.trim();
            if (trimmed) {
                trimmed = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
                if (!/[.!?]$/.test(trimmed)) {
                    trimmed += '.';
                }
                trimmed = capitalizeNames(trimmed);
            }
            return trimmed;
        })
        .join(' ');
}

function capitalizeNames(text) {
    const names = ["Alice", "Bob", "John", "Mary", "David", "Michael", "Sarah"]; // Add more names here
    const regex = new RegExp(`\\b(${names.join("|")})\\b`, "gi");
    return text.replace(regex, (match) => match.charAt(0).toUpperCase() + match.slice(1).toLowerCase());
}

function stopConverting() {
    if (recognition && isListening) {
        recognition.stop();
        isListening = false;
        console.log("Speech recognition stopped.");
    }
}