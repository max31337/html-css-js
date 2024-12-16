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

    const micButtonParent = document.querySelector('.fa-microphone').parentElement;
    const stopButtonParent = document.querySelector('.fa-stop').parentElement;

    micButtonParent.classList.add('active-mic'); 
    stopButtonParent.classList.remove('active-stop'); 

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
        lastProcessedIndex = 0;
        console.log("Speech recognition stopped.");

        const micButtonParent = document.querySelector('.fa-microphone').parentElement;
        const stopButtonParent = document.querySelector('.fa-stop').parentElement;

        micButtonParent.classList.remove('active-mic');
        stopButtonParent.classList.add('active-stop'); 
    }
}

function formatSentence(text) {
    return text
        .split(/([.!?]\s)/) 
        .map(sentence => {
            let trimmed = sentence.trim();
            if (trimmed) {
                trimmed = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
                if (!/[.!?]$/.test(trimmed)) {
                    trimmed += '.'; 
                }
            }
            return trimmed;
        })
        .join(' ');
}
