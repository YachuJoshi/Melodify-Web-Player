import React from 'react';

import { Player } from './Player';

const CustomPlayerContainer = ({ handleMusicShuffle, song }) => {
  return (
    <Player
      src={`http://localhost:1337${song.Song[0].url}`}
      handleMusicShuffle={handleMusicShuffle}
    />
  )
};

export { CustomPlayerContainer };
