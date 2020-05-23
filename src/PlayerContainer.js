import React, { useState, useEffect } from 'react';

import { Player } from './Player';

const PlayerContainer = ({ currentlyPlaying, handleCurrentlyPlaying, song }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      handleCurrentlyPlaying(song);
      return;
    }
    return;
  }, [handleCurrentlyPlaying, isPlaying, song])

  return (
    <div key={song.Title} className="wrapper">
      <div className="song-name">{song.Title}</div>
      <div className="song-artist">{song.Artist}</div>
      <div className="song-player">
        <Player
          title={song.Title}
          currentlyPlaying={currentlyPlaying}
          src={`http://localhost:1337${song.Song[0].url}`}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
      </div>
    </div>
  )
};

export { PlayerContainer };
