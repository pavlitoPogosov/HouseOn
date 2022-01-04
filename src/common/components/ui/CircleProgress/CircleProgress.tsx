import React from 'react';

import clsx from 'clsx';

import s from './CircleProgress.module.scss';

export enum ECircleProgressStates {
  GREEN = 'green',
  WHITE = 'white'
}

export interface ICircleProgressProps {
  className?: string;
  color?: 'white' | 'green';
  percentage: number;
  progressBackgroundSvgClassName?: string;
  progressSvgClassName?: string;
  size?: number;
  strokeWidth?: number;
  textClassName?: string;
}

export const CircleProgress: React.FC<ICircleProgressProps> = ({
  className,
  color = 'white',
  percentage,
  progressBackgroundSvgClassName,
  progressSvgClassName,
  size = 32,
  strokeWidth = 3,
  textClassName
}) => {
  // SVG centers the stroke width on the radius, subtract out so circle fits in square
  const radiusCalc = (size - strokeWidth) / 2;
  const radius = radiusCalc >= 0 ? radiusCalc : 0;
  // Enclose cicle in a circumscribing square
  const viewBox = `0 0 ${size} ${size}`;
  // Arc length at 100% coverage is the circle circumference
  const strokeDasharray = radius * Math.PI * 2;
  // Scale 100% coverage overlay with the actual percent
  const strokeDashoffset = strokeDasharray - (strokeDasharray * percentage) / 100;

  return (
    <div
      className={clsx(
        s.CircleProgress__container,
        {
          [s.CircleProgress__white]: color === 'white',
          [s.CircleProgress__green]: color === 'green'
        },
        className
      )}>
      <svg height={size} viewBox={viewBox} width={size}>
        <circle
          className={clsx(s.CircleProgress__background, progressBackgroundSvgClassName)}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={`${strokeWidth}px`}
        />

        <circle
          className={clsx(s.CircleProgress__progress, progressSvgClassName)}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={`${strokeWidth}px`}
          // Start progress marker at 12 O'Clock
          style={{
            strokeDasharray,
            strokeDashoffset
          }}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />

        <text
          className={clsx(s.CircleProgress__text, textClassName)}
          dy=".3em"
          fill="currentColor"
          textAnchor="middle"
          x="50%"
          y="50%">
          {`${percentage}%`}
        </text>
      </svg>
    </div>
  );
};
