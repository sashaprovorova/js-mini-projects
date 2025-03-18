let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");

window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices(); // gets all available voices
  speech.voice = voices[0]; // by default speaks in the first voice available on device

  voices.forEach((voice, i) => {
    voiceSelect.options[i] = new Option(voice.name, i); //iterates through all and assigns each to an option
  });
};

voiceSelect.addEventListener("change", () => {
  speech.voice = voices[voiceSelect.value]; // changes voice based on a select in the dropdown
});

document.querySelector("button").addEventListener("click", () => {
  speech.text = document.querySelector("textarea").value; // gets the text entered by user
  window.speechSynthesis.speak(speech); // reads the text
});
