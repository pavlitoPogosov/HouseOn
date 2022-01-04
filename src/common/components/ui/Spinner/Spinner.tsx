import React from 'react';

import clsx from 'clsx';

import s from './Spinner.module.scss';

type ColorType = 'text-brand' | 'white';
const ColorsMap: { [color in ColorType]: string } = {
  'text-brand': '#008e6c',
  white: '#fff'
};
interface SpinnerProps {
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs';
  color?: ColorType;
  className?: string;
  strokeWidth?: number;
}

export const Spinner: React.FC<SpinnerProps> = ({ className, color, strokeWidth = 10, size = 'md' }) => {
  return (
    <svg
      className={clsx(
        s.Spinner,
        {
          [s.Spinner__xl]: size === 'xl',
          [s.Spinner__lg]: size === 'lg',
          [s.Spinner__md]: size === 'md',
          [s.Spinner__sm]: size === 'sm',
          [s.Spinner__xs]: size === 'xs'
        },
        className
      )}
      viewBox="0 0 100 100"
      color={color ? ColorsMap[color] : undefined}
      preserveAspectRatio="xMidYMid">
      <circle
        cx="50"
        cy="50"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        r="35"
        strokeDasharray="164.93361431346415 56.97787143782138">
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="1s"
          values="0 50 50;360 50 50"
          keyTimes="0;1"
        />
      </circle>
    </svg>
  );
};
