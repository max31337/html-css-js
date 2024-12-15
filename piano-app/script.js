const noteFiles = {
    "C": "C.mp3",
    "Db": "Db.mp3",
    "D": "D.mp3",
    "Eb": "Eb.mp3",
    "E": "E.mp3",
    "F": "F.mp3",
    "Gb": "Gb.mp3",
    "G": "G.mp3",
    "Ab": "Ab.mp3",
    "A": "A.mp3",
    "Bb": "Bb.mp3",
    "B": "B.mp3"
};

const audioElements = {};
for (const note in noteFiles) {
    const audio = new Audio(`notes/${noteFiles[note]}`);
    audioElements[note] = audio;
}

document.querySelectorAll('.key').forEach(key => {
    key.addEventListener('click', () => {
        const note = key.getAttribute('data-note');
        playNote(note, key);
    });
});

function playNote(note, key) {
    if (audioElements[note]) {
        audioElements[note].currentTime = 0; 
        audioElements[note].play();
        
        key.classList.add('active');
        
        setTimeout(() => key.classList.remove('active'), 200);
        
        key.classList.add('pressed');
        setTimeout(() => key.classList.remove('pressed'), 100);
    }
}
