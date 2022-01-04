import React, { isValidElement } from 'react';

import clsx from 'clsx';

import s from './ChatMessage.module.scss';

export enum EChatMessageTypes {
  PRIMARY = 'primary',
  SECONDARY = 'secondary'
}

export enum EChatMessageSide {
  LEFT = 'left',
  RIGHT = 'right'
}

export type TChatMessage = {
  containerClassName?: string;
  containerContentClassName?: string;
  isLast: boolean;
  message?: string;
  messageBalloonTailClassName?: string;
  messageBalloonTailLeftClassName?: string;
  messageBalloonTailRightClassName?: string;
  side?: EChatMessageSide;
  type?: EChatMessageTypes;
};

export const ChatMessage: React.FC<TChatMessage> = (props) => {
  const {
    children,
    containerClassName,
    containerContentClassName,
    messageBalloonTailClassName,
    messageBalloonTailLeftClassName,
    messageBalloonTailRightClassName,
    message,
    isLast,
    type = EChatMessageTypes.PRIMARY,
    side = EChatMessageSide.LEFT
  } = props;

  const isLeft = side === EChatMessageSide.LEFT;
  const isRight = side === EChatMessageSide.RIGHT;
  const isPrimary = type === EChatMessageTypes.PRIMARY;
  const isSecondary = type === EChatMessageTypes.SECONDARY;

  return (
    <div
      className={clsx(
        s.ChatMessage__container,
        containerClassName,
        isLast && s.ChatMessage__container_last,
        isLeft && s.ChatMessage__container_left,
        isRight && s.ChatMessage__container_right,
        isPrimary && s.ChatMessage__container_primary,
        isSecondary && s.ChatMessage__container_secondary
      )}>
      {isLast && side === EChatMessageSide.LEFT && (
        <span
          className={clsx(
            s.ChatMessage__container_tail,
            s.ChatMessage__container_tail_left,
            messageBalloonTailClassName,
            messageBalloonTailLeftClassName
          )}
        />
      )}

      <div
        className={clsx(
          s.ChatMessage__container_content,
          containerContentClassName,
          isLast && s.ChatMessage__container_content_last,
          isLeft && s.ChatMessage__container_content_left,
          isRight && s.ChatMessage__container_content_right,
          isPrimary && s.ChatMessage__container_content_primary,
          isSecondary && s.ChatMessage__container_content_secondary
        )}>
        {isValidElement(children) ? children : message}
      </div>

      {isLast && side === EChatMessageSide.RIGHT && (
        <span
          className={clsx(
            s.ChatMessage__container_tail,
            s.ChatMessage__container_tail_right,
            messageBalloonTailClassName,
            messageBalloonTailRightClassName
          )}
        />
      )}
    </div>
  );
};
