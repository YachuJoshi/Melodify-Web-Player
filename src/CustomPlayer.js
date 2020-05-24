import React from 'react';
import { IoMdPause, IoMdPlay, IoMdShuffle } from 'react-icons/io';
import { AiFillStepForward, AiFillStepBackward, AiOutlineBackward, AiOutlineForward } from 'react-icons/ai';
import { MdVolumeDown, MdVolumeUp } from 'react-icons/md';

import styles from './customplayer.module.scss';

const CustomPlayer = ({
  isPlaying,
  fraction,
  playAudio,
  pauseAudio,
  handleSeek,
  seekBack,
  seekForward,
  volume,
  handleVolumeSeek,
  handleMusicShuffle,
  handleStart,
  handleDragOver,
  handleEnd
}) => {

  let volumeElem = volume < 0.5 ?
    (<MdVolumeDown
      className={styles.controls__volume}
    />) :
    (<MdVolumeUp
      className={styles.controls__volume}
    />);

  return (
    <>
      <div className={styles.player__container}>
        <div
          className={styles.progress}>
          <span
            id="progressIndicator"
            onClick={event => {
              handleSeek(event);
            }}
            className={styles.progress__bar}></span>
          <span
            className={styles.progress__filler}
            onClick={event => {
              handleSeek(event);
            }}
            style={{
              width: fraction.toString() + '%'
            }}></span>
          <span
            draggable
            // onDragStart={event => handleStart(event)}
            // onDragOver={event => handleDragOver(event)}
            // onDragEnd={event => handleEnd(event)}
            style={{
              left: fraction.toString() + '%'
            }}
            className={styles.progress__circle}></span>
        </div>

        <div className={styles.controls}>
          <IoMdShuffle
            className={styles.controls__shuffle}
          />
          <div className={styles.music__controller}>
            <AiFillStepBackward
              onClick={() => handleMusicShuffle('PREVIOUS')}
              className={styles.controls__skipback}
            />
            <AiOutlineBackward
              onClick={() => seekBack(5)}
              className={styles.controls__seekback}
            />
            {isPlaying ?
              <IoMdPause
                onClick={() => {
                  pauseAudio();
                }}
                className={styles.buttonPause}
              />
              :
              <IoMdPlay
                onClick={() => playAudio()}
                className={styles.buttonPlay}
              />
            }
            <AiOutlineForward
              onClick={() => seekForward(5)}
              className={styles.controls__seekforward}
            />
            <AiFillStepForward
              onClick={() => handleMusicShuffle('NEXT')}
              className={styles.controls__skipforward}
            />
          </div>

          <div
            className={styles.volume}>
            {volumeElem}
            <span
              id="volumeIndicator"
              onClick={event => {
                handleVolumeSeek(event);
              }}
              className={styles.volume__bar}>
            </span>
            <span
              className={styles.volume__filler}
              onClick={event => {
                handleVolumeSeek(event);
              }}
              style={{
                width: (volume * 100).toString() + '%'
              }}>
            </span>
            <span
              draggable
              // onDragStart={event => handleStart(event)}
              // onDragOver={event => handleDragOver(event)}
              // onDragEnd={event => handleEnd(event)}
              style={{
                left: (volume * 100).toString() + '%'
              }}
              className={styles.volume__circle}></span>
          </div>
        </div>
      </div>
    </>
  )
};

export { CustomPlayer };