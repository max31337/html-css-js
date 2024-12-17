const hueSlider = document.getElementById('hue');
const saturationSlider = document.getElementById('saturation');
const lightnessSlider = document.getElementById('lightness');

const hueValue = document.getElementById('hueValue');
const saturationValue = document.getElementById('saturationValue');
const lightnessValue = document.getElementById('lightnessValue');

const colorDisplay = document.querySelector('.color-display');

function updateColor() {
    const hue = hueSlider.value;
    const saturation = saturationSlider.value;
    const lightness = lightnessSlider.value;

    hueValue.textContent = hue;
    saturationValue.textContent = saturation;
    lightnessValue.textContent = lightness;

    colorDisplay.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

hueSlider.addEventListener('input', updateColor);
saturationSlider.addEventListener('input', updateColor);
lightnessSlider.addEventListener('input', updateColor);

updateColor();
