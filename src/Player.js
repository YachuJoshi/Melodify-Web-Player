import React, { useState, useEffect, useRef, useCallback } from 'react';

import styles from './customplayer.module.scss';

import { CustomPlayer } from './CustomPlayer';

const Player = ({ handleMusicShuffle, src }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [fraction, setFraction] = useState(0);
  const [volume, setVolume] = useState(1);
  const playerEl = useRef();

  useEffect(() => {
    let playerInterval = setInterval(() => {
      if (playerEl.current === null) return;
      let currentTime = playerEl.current.currentTime;
      let totalDuration = playerEl.current.duration;
      setFraction((currentTime / totalDuration) * 100);
      if (currentTime === totalDuration) {
        setIsPlaying(false);
      }
    }, 50);

    if (!isPlaying) {
      clearInterval(playerInterval);
    }

    return () => clearInterval(playerInterval)

  }, [fraction, isPlaying, setIsPlaying]);

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
    playerEl.current.play();
  }, []);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
    playerEl.current.pause();
  }, []);

  const handleSeek = (event) => {
    const element = document.querySelector('#progressIndicator');
    const maxX = element.clientWidth;
    setFraction((event.nativeEvent.offsetX / maxX) * 100);
    playerEl.current.currentTime = (event.nativeEvent.offsetX / maxX) * playerEl.current.duration;

    if (!isPlaying) {
      handlePlay();
    }
  }

  useEffect(() => {
    const togglePausePlay = (event) => {
      if (event.keyCode === 32) {
        if (isPlaying) {
          handlePause();
          return;
        }

        if (!isPlaying) {
          handlePlay();
          return;
        }
      }
      return;
    }
    window.addEventListener('keydown', togglePausePlay);
    return () => window.removeEventListener('keydown', togglePausePlay);
  }, [handlePause, handlePlay, isPlaying]);

  const seekBack = (sec) => {
    if (playerEl.current.currentTime <= 4) {
      playerEl.current.currentTime = 0;
      setFraction(0);
      return;
    };
    playerEl.current.currentTime -= sec;
    setFraction((playerEl.current.currentTime / playerEl.current.duration) * 100);
  }

  const seekForward = (sec) => {
    if (playerEl.current.currentTime >= playerEl.current.duration - 4) {
      playerEl.current.currentTime = playerEl.current.duration;
      setFraction(1);
      return;
    }
    playerEl.current.currentTime += sec;
    setFraction((playerEl.current.currentTime / playerEl.current.duration) * 100);
  }

  const handleVolumeSeek = (event) => {
    const element = document.querySelector('#volumeIndicator');
    const maxX = element.clientWidth;
    playerEl.current.volume = (event.nativeEvent.offsetX / maxX);
    setVolume(playerEl.current.volume);
  }

  const handleStart = (event) => {
    console.log('START');
  }

  const handleDragOver = (event) => {
    event.preventDefault();
    console.log(playerEl.current.currentTime, 1234);
    console.log('DRAGGING');
  }

  const handleEnd = (event) => {
    const element = document.querySelector('#progressIndicator');
    const maxX = element.clientWidth;
    if (event.nativeEvent.offsetX <= 0) {
      setFraction(0);
      playerEl.current.currentTime = 0;
      return;
    }

    setFraction((event.nativeEvent.offsetX / maxX) * 100);
    playerEl.current.currentTime = (event.nativeEvent.offsetX / maxX) * playerEl.current.duration;
    console.log(playerEl.current.currentTime);
    console.log('DONE');
  }

  return (
    <>
      <audio
        autoPlay
        src={src}
        className={styles.real__player}
        ref={playerEl}
      />
      <CustomPlayer
        isPlaying={isPlaying}
        fraction={fraction}
        volume={volume}
        playAudio={handlePlay}
        pauseAudio={handlePause}
        handleSeek={handleSeek}
        seekBack={seekBack}
        seekForward={seekForward}
        handleMusicShuffle={handleMusicShuffle}
        handleVolumeSeek={handleVolumeSeek}
        handleStart={handleStart}
        handleDragOver={handleDragOver}
        handleEnd={handleEnd}
      />
    </>
  );
};

export { Player };


  //handleDragOver()
    // const element = document.querySelector('#progressIndicator');
    // const maxX = element.clientWidth;
    // if (event.nativeEvent.offsetX < 0) return;
    // setFraction((event.nativeEvent.offsetX / maxX) * 100);
    // playerEl.current.currentTime = (event.nativeEvent.offsetX / maxX) * playerEl.current.duration;