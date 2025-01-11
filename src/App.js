import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [audioList, setAudioList] = useState([]);
  const [currentAudio, setCurrentAudio] = useState('');

  // Fetch the audio list dynamically
  useEffect(() => {
    fetch('/audio-samples/audio-files.json')
      .then((response) => response.json())
      .then((data) => {
        setAudioList(data);
        setCurrentAudio(data[0]); // Set the first audio as the default
      })
      .catch((error) => console.error('Error fetching audio files:', error));
  }, []);

  const handleAudioSelect = (file) => {
    setCurrentAudio(`/audio-samples/${file}`); // Update the source of the audio player
  };

  return (
    <div className="app-container">
      <div className="audio-list">
        <h2>Audio List</h2>
        <ul>
          {audioList.map((file, index) => (
            <li key={index} onClick={() => handleAudioSelect(file)}>
              {file.replace('.mp3', '')} {/* Display the name without .mp3 */}
            </li>
          ))}
        </ul>
      </div>
      <div className="audio-player-container">
        <h1>Audio Player</h1>
        {currentAudio && (
          <audio controls key={currentAudio}>
            <source src={currentAudio} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}
      </div>
      
    </div>
  );
}

export default App;
