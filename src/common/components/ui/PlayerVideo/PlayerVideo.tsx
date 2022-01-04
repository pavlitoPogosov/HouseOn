import React, { useRef, useState, ChangeEvent } from 'react';

import clsx from 'clsx';

import { useToggle } from '@proscom/ui-react';
import { PlayerControls } from 'common/components/ui/PlayerControls/PlayerControls';
import ReactPlayer from 'react-player/lazy';

import s from './PlayerVideo.module.scss';

type TPlayerVideo = {
  className?: string;
  controls?: boolean;
  src: string;
};

type TPlayerState = {
  loaded: number;
  loadedSeconds: number;
  played: number;
  playedSeconds: number;
};

export const PlayerVideo: React.FC<TPlayerVideo> = (props) => {
  const { className, controls = true, src } = props;

  const playToggle = useToggle();

  const [playerState, setPlayerState] = useState({
    duration: 0,
    progress: 0
  });

  const playerRef = useRef<any>(null);

  const handleMediaProgress = (event: ChangeEvent<HTMLInputElement>) => {
    const manualChange = Number(event.target.value);
    setPlayerState({
      ...playerState,
      progress: manualChange
    });
    playerRef?.current?.seekTo(manualChange, 'seconds');
  };

  const handleDurationChange = (duration: number) => {
    setPlayerState({
      ...playerState,
      duration
    });
  };

  const handleProgressChange = (state: TPlayerState) => {
    setPlayerState({
      ...playerState,
      progress: state.playedSeconds
    });
  };

  const handleTogglePlay = () => {
    playToggle.toggle();
  };

  return (
    <div className={clsx(s.PlayerVideo__container, className)}>
      <div className={s.PlayerVideo__video_wrapper}>
        <ReactPlayer
          className={s.video_preview__player}
          controls={false}
          height="100%"
          onDuration={handleDurationChange}
          onProgress={handleProgressChange}
          playing={playToggle.value}
          progressInterval={500}
          ref={playerRef}
          url={src}
          width="100%"
        />
      </div>

      {controls && (
        <div className={s.PlayerControls__wrapper}>
          <PlayerControls
            handleMediaProgress={handleMediaProgress}
            isPlaying={playToggle.value}
            playerState={playerState}
            togglePlay={handleTogglePlay}
          />
        </div>
      )}
    </div>
  );
};
