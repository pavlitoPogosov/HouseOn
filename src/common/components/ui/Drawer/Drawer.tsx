import React from 'react';
import ReactDOM from 'react-dom';

import clsx from 'clsx';

import { useDisableOverflow } from 'common/hooks/useDisableOverflow';

import { Fade } from '../_animations/Fade/Fade';
import { Slide, SlideAnimationProps } from '../_animations/Slide/Slide';

import s from './Drawer.module.scss';

export interface DrawerProps {
  animation?: SlideAnimationProps;
  containerClassName?: string;
  isOpen: boolean;

  onScroll?: (event: React.UIEvent<HTMLDivElement>) => void;
  onClose: () => void;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  children,
  containerClassName,
  animation = 'left',
  onClose,
  onScroll
}) => {
  const isTop = animation === 'top';
  const isBottom = animation === 'bottom';
  const isLeft = animation === 'left';
  const isRight = animation === 'right';

  useDisableOverflow(isOpen);

  return ReactDOM.createPortal(
    <>
      <Slide
        animation={animation}
        isActive={isOpen}
        onScroll={onScroll}
        className={clsx(
          s.Drawer__content,
          {
            [s.top]: isTop,
            [s.bottom]: isBottom,
            [s.left]: isLeft,
            [s.right]: isRight
          },
          containerClassName
        )}
      >
        {children}
      </Slide>

      <Fade className={s.Drawer__blackout} onMouseDown={onClose} isActive={isOpen} />
    </>,
    document.body
  );
};
