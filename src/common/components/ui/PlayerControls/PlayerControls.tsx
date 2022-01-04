import React, { ChangeEvent } from 'react';

import { utc } from 'moment';

import { ReactComponent as PauseIcon } from 'assets/icons/pause.svg';
import { ReactComponent as TriangleRightIcon } from 'assets/icons/triangleRight.svg';
import { IconButton } from 'common/components/ui/IconButton/IconButton';
import { TextPropsVariantsEnum, Text } from 'common/components/ui/Text/Text';

import s from './PlayerControls.module.scss';

type TPlayerState = { duration: number; progress: number };

type TPlayerControls = {
  handleMediaProgress: (event: ChangeEvent<HTMLInputElement>) => void;
  isPlaying: boolean;
  playerState: TPlayerState;
  togglePlay: () => void;
};

export const PlayerControls: React.FC<TPlayerControls> = (props) => {
  const { handleMediaProgress, isPlaying, playerState, togglePlay } = props;

  const { duration, progress } = playerState || {};

  const playPauseIcon = isPlaying ? <PauseIcon /> : <TriangleRightIcon />;

  const isHours = duration / 3600 >= 1;
  const timeFormat = isHours ? 'HH:mm:ss' : 'mm:ss';
  const progressTime = utc(progress * 1000).format(timeFormat);
  const durationTime = utc(duration * 1000).format(timeFormat);

  return (
    <div className={s.PlayerControls__container}>
      <div className={s.PlayerControls__actions}>
        <IconButton
          className={s.PlayerControls__button_play_pause}
          height={36}
          icon={playPauseIcon}
          onClick={togglePlay}
          width={36}
        />
      </div>

      <div className={s.PlayerControls__range_container}>
        <input
          className={s.PlayerControls__range}
          max={duration}
          min="0"
          onChange={(e) => handleMediaProgress(e)}
          type="range"
          value={progress || 0}
        />
      </div>

      <div className={s.PlayerControls__range_labels_container}>
        <Text color="white" text={progressTime} variant={TextPropsVariantsEnum.BODY_M} />

        <Text color="white" text={durationTime} variant={TextPropsVariantsEnum.BODY_M} />
      </div>
    </div>
  );
};
