import React, { useState, useEffect, useRef, useCallback } from 'react';
import AudioPlayer from "react-h5-audio-player";
import 'react-h5-audio-player/src/styles.scss';

import styles from './customplayer.module.scss';

import { CustomPlayer } from './CustomPlayer';

const Player = ({ title, isPlaying, currentlyPlaying, setIsPlaying, src }) => {
  const [fraction, setFraction] = useState(0);
  const playerEl = useRef();

  const handleChange = () => console.log(playerEl.current.handleClickVolumeButton);

  useEffect(() => {
    let playerInterval = setInterval(() => {
      if (playerEl.current === null) return;
      let currentTime = playerEl.current.audio.current.currentTime;
      let totalDuration = playerEl.current.audio.current.duration;
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
    playerEl.current.audio.current.play();
  }, [setIsPlaying]);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
    playerEl.current.audio.current.pause();
  }, [setIsPlaying]);

  const handleSeek = (event) => {
    const element = document.querySelector('#progressIndicator');
    const maxX = element.clientWidth;
    setFraction((event.nativeEvent.offsetX / maxX) * 100);
    playerEl.current.audio.current.currentTime = (event.nativeEvent.offsetX / maxX) * playerEl.current.audio.current.duration;

    if (!isPlaying) {
      handlePlay();
    }
  }

  // useEffect(() => {
  //   const handler = (event, callback) => {
  //     if (event.keyCode === 32) {
  //       callback();
  //     }
  //   }

  //   if (title === currentlyPlaying) {
  //     if (isPlaying) {
  //       window.addEventListener('keydown', (event) => handler(event, handlePause));
  //     }
  //     if (!isPlaying) {
  //       window.addEventListener('keydown', (event) => handler(event, handlePlay));
  //     }
  //   }

  //   return () => {
  //     window.removeEventListener('keydown', (event) => handler(event, handlePlay));
  //     window.removeEventListener('keydown', (event) => handler(event, handlePause));
  //   }

  // }, [currentlyPlaying, handlePause, handlePlay, isPlaying, title]);

  const handleStart = (event) => {
    console.log('START');
  }

  const handleDragOver = (event) => {
    event.preventDefault();
    // const element = document.querySelector('#progressIndicator');
    // const maxX = element.clientWidth;
    // if (event.nativeEvent.offsetX < 0) return;
    // setFraction((event.nativeEvent.offsetX / maxX) * 100);
    // playerEl.current.audio.current.currentTime = (event.nativeEvent.offsetX / maxX) * playerEl.current.audio.current.duration;
    console.log(playerEl.current.audio.current.currentTime, 1234);
    console.log('DRAGGING');
  }

  const handleEnd = (event) => {
    const element = document.querySelector('#progressIndicator');
    const maxX = element.clientWidth;
    if (event.nativeEvent.offsetX <= 0) {
      setFraction(0);
      playerEl.current.audio.current.currentTime = 0;
      return;
    }

    setFraction((event.nativeEvent.offsetX / maxX) * 100);
    playerEl.current.audio.current.currentTime = (event.nativeEvent.offsetX / maxX) * playerEl.current.audio.current.duration;
    console.log(playerEl.current.audio.current.currentTime);
    console.log('DONE');
  }

  return (
    <>
      <AudioPlayer
        autoPlay={false}
        showSkipControls={true}
        src={src}
        className={styles.real__player}
        ref={playerEl}
      />
      <CustomPlayer
        isPlaying={isPlaying}
        fraction={fraction}
        playAudio={handlePlay}
        pauseAudio={handlePause}
        handleSeek={handleSeek}
        handleStart={handleStart}
        handleDragOver={handleDragOver}
        handleEnd={handleEnd}
      />
      <button onClick={handleChange}>FOCUS</button>
    </>
  );
};

export { Player };