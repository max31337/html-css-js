function textToAudio() {
    const text = document.querySelector('.text').value;

    if (text.trim() === '') {
        document.getElementById('warningModal').style.display = 'flex';
        return;
    }

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance();
    speech.text = text;
    speech.rate = 1;
    speech.pitch = 1;
    speech.volume = 1;

    window.speechSynthesis.speak(speech);
}

function closeModal() {
    document.getElementById('warningModal').style.display = 'none';
}
