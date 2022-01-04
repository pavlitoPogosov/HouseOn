import React from 'react';

import clsx from 'clsx';

import { Fade } from 'common/components/ui/_animations/Fade/Fade';
import { THouseEventWithStyles } from 'utils/calendar';

import s from './Event.module.scss';

export interface EventProps {
  containerClassName: string;
  containerStyle: React.CSSProperties;
  event: THouseEventWithStyles;
  showAuthor?: boolean;
}

export const Event: React.FC<EventProps> = ({ containerClassName, containerStyle, event }) => {
  const { creator, title } = event;
  const showAuthor = Math.abs(event.starts_at.diff(event.ends_at, 'days')) > 1;

  return (
    <Fade className={clsx(s.Event__wrapper, containerClassName)} isActive style={containerStyle}>
      <div className={s.Event__container}>
        <div className={s.Event__inner}>
          <div className={s.Event__titleWrapper}>
            <div className={s.Event__title}>{title}</div>

            {showAuthor && creator?.name && (
              <div className={s.Event__author}>
                Author:
                <span>{` ${creator.name}`}</span>
              </div>
            )}
          </div>

          <div className={s.Event__date}>{`${event.starts_at.format('DD.MM')} - ${event.ends_at.format('DD.MM')}`}</div>
        </div>
      </div>
    </Fade>
  );
};
