function textToAudio() {
    const text = document.querySelector('.text').value;

    if (text.trim() === '') {
        alert('Please enter some text to convert to audio!');
        return;
    }

    const speech = new SpeechSynthesisUtterance();

    speech.text = text;

    speech.rate = 1;
    speech.pitch = 1; 
    speech.volume = 1;

    window.speechSynthesis.speak(speech);
}
