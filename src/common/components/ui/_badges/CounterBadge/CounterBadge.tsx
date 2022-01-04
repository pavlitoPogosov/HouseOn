import React from 'react';

import clsx from 'clsx';

import s from './CounterBadge.module.scss';

export interface CounterBadgeProps {
  text?: string;
  className?: string;
  color?: 'primary' | 'secondary' | 'red' | 'gray' | 'lightgray' | 'green';
  size?: 's' | 'm' | 'l';
}

export const CounterBadge: React.FC<CounterBadgeProps> = ({
  text,
  className,
  children,
  color = 'primary',
  size = 'm'
}) => {
  return (
    <div
      className={clsx(
        s.CounterBadge__container,
        {
          [s.CounterBadge__primary]: color === 'primary',
          [s.CounterBadge__secondary]: color === 'secondary',
          [s.CounterBadge__red]: color === 'red',
          [s.CounterBadge__gray]: color === 'gray',
          [s.CounterBadge__lightGray]: color === 'lightgray',
          [s.CounterBadge__green]: color === 'green',
          [s.CounterBadge__s]: size === 's',
          [s.CounterBadge__m]: size === 'm',
          [s.CounterBadge__l]: size === 'l'
        },
        className
      )}>
      {children ?? text}
    </div>
  );
};
