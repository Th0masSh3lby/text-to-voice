import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    const synth = window.speechSynthesis; //web speech synthesis API

    const handleVoicesChanged = () => {
      setVoices(synth.getVoices());
    };

    synth.addEventListener("voiceschanged", handleVoicesChanged);
    return () => {
      synth.removeEventListener("voiceschanged", handleVoicesChanged);
    };
  }, []);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleVoiceChange = (event) => {
    setSelectedVoice(voices[event.target.value]);
  };

  const handleSpeak = () => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice;
    synth.speak(utterance);
  };

  return (
    <div id="main">
      <div className="App">
        <h1>Text-to-Speech</h1>
        <textarea
          placeholder="Enter text to convert to speech"
          value={text}
          onChange={handleTextChange}
        ></textarea>
        <div className="voiceSelector">
          <label htmlFor="voiceSelect">Select Voice: </label>
          <select id="voiceSelect" onChange={handleVoiceChange}>
            <option value="">Default</option>
            {voices.map((voice, index) => (
              <option key={voice.voiceURI} value={index}>
                {voice.name}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleSpeak}>Speak</button>
      </div>
      <p>by Aravind</p>
    </div>
  );
}

export default App;
