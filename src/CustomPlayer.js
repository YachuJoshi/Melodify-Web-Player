import React from 'react';
import { IoMdPause, IoMdPlay } from 'react-icons/io';
import { AiFillStepForward, AiFillStepBackward } from 'react-icons/ai';

import styles from './customplayer.module.scss';

const CustomPlayer = ({
  isPlaying,
  fraction,
  playAudio,
  pauseAudio,
  handleSeek,
  handleStart,
  handleDragOver,
  handleEnd
}) => {

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
            className={styles.progress__box}></span>
        </div>

        <div className={styles.controls}>
          <AiFillStepBackward
            className={styles.controls__skipback}
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
          <AiFillStepForward
            className={styles.controls__skipfront}
          />
        </div>
      </div>
    </>
  )
};

export { CustomPlayer };