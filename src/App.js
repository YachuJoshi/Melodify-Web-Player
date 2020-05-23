import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PlayerContainer } from './PlayerContainer';

import "./App.scss";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [songsList, setSongsList] = useState([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState('');

  useEffect(() => {
    setLoading(true);
    axios({
      method: "GET",
      url: "http://localhost:1337/music-lists"
    }).then(res => {
      setLoading(false);
      setSongsList(res.data);
    }).catch(err => {
      setLoading(false);
      setError(true);
      console.error(err);
    });
  }, []);

  const handleCurrentlyPlaying = (song) => {
    setCurrentlyPlaying(song.Title);
  }

  window.onkeydown = function (e) {
    return !(e.keyCode === 32);
  };

  return (
    <div className="App">
      {loading && <span>Loading... <span role="img" aria-label="Haha">🥳</span> </span>}
      {songsList.map((song) => (
        <PlayerContainer
          currentlyPlaying={currentlyPlaying}
          key={song.Title}
          song={song}
          handleCurrentlyPlaying={handleCurrentlyPlaying}
        />
      ))}
      {error && <span>Oops.. Something went wrong...</span>}
    </div>
  );
}

export default App;
