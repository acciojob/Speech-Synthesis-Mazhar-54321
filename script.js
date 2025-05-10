// Your script here.
const synth = window.speechSynthesis;
const textInput = document.getElementById('text');
const voiceSelect = document.getElementById('voice');
const rate = document.getElementById('rate');
const pitch = document.getElementById('pitch');
const rateValue = document.getElementById('rate-value');
const pitchValue = document.getElementById('pitch-value');
const speakButton = document.getElementById('speak');
const stopButton = document.getElementById('stop');

let voices = [];

function populateVoices() {
  voices = synth.getVoices();
  voiceSelect.innerHTML = '';

  voices.forEach((voice, i) => {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = `${voice.name} (${voice.lang})`;
    if (voice.default) {
      option.textContent += ' — DEFAULT';
    }
    voiceSelect.appendChild(option);
  });
}

// Populate voices on page load and when voices change
populateVoices();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoices;
}

function speak() {
  if (synth.speaking) {
    synth.cancel(); // Stop current speech
  }

  const text = textInput.value;
  if (!text.trim()) return;

  const utterance = new SpeechSynthesisUtterance(text);
  const selectedVoice = voices[voiceSelect.value];
  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }

  utterance.rate = parseFloat(rate.value);
  utterance.pitch = parseFloat(pitch.value);

  synth.speak(utterance);
}

// Event listeners
speakButton.addEventListener('click', speak);
stopButton.addEventListener('click', () => synth.cancel());

rate.addEventListener('input', () => {
  rateValue.textContent = rate.value;
});

pitch.addEventListener('input', () => {
  pitchValue.textContent = pitch.value;
});
