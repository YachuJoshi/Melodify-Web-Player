import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CustomPlayerContainer } from './CustomPlayerContainer';

import "./App.scss";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [songsList, setSongsList] = useState([]);
  const [filteredSongList, setFilteredSongList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  useEffect(() => {
    if (!songsList[currentIndex]) return;
    setFilteredSongList([songsList[currentIndex]]);
  }, [songsList, currentIndex]);

  const handleMusicShuffle = (status) => {
    if (status === 'PREVIOUS') {
      setCurrentIndex(index => {
        if (index <= 0) {
          return 0;
        }
        return index - 1;
      });
    }

    if (status === 'NEXT') {
      setCurrentIndex(index => {
        if (index >= songsList.length) {
          return songsList.length;
        }
        return index + 1;
      });
    }
  }

  const handleMusicChange = (index) => {
    setCurrentIndex(index);
  }

  return (
    <div className="App">
      {loading && <span>Loading... <span role="img" aria-label="Haha">🥳</span> </span>}
      <div className="songs-collection">
        {songsList.map((song, index) => (
          <div
            key={song.Title}
            className="wrapper"
            onClick={() => handleMusicChange(index)}>
            <div className="song-name">{song.Title}</div>
            <div className="song-artist">{song.Artist}</div>
          </div>
        ))}
      </div>
      {filteredSongList.map(song => (
        <div key={song} className="sPlayer">
          <div className="sName">{song.Title}</div>
          <div className="sArtist">{song.Artist}</div>
          <CustomPlayerContainer
            handleMusicShuffle={handleMusicShuffle}
            key={song.Title}
            song={song}
          />
        </div>
      ))}
      {error && <span>Oops.. Something went wrong...</span>}
    </div>
  );
}

export default App;
