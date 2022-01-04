import React, { useEffect, useRef, useState } from 'react';

import clsx from 'clsx';
import { useDebouncedCallback } from 'use-debounce';

import { useScreenSize } from 'common/hooks/useScreenSize';
import { EColors } from 'variables/colors';

import s from './CircleProgressWithChildren.module.scss';

export enum ECircleProgressWithChildrenStates {
  GREEN = 'green',
  WHITE = 'white'
}

export interface ICircleProgressWithChildrenProps {
  backgroundColor?: EColors;
  childrenClassName?: string;
  childrenContainerClassName?: string;
  color?: EColors;
  containerClassName?: string;
  donutHoleClassName?: string;
  holeColor?: EColors;
  percentage: number;
  progressBackgroundSvgClassName?: string;
  progressSvgClassName?: string;
  strokeWidth?: number;
  wrapperClassName?: string;
}

export const CircleProgressWithChildren: React.FC<ICircleProgressWithChildrenProps> = (props) => {
  const {
    containerClassName,
    donutHoleClassName,
    childrenContainerClassName,
    childrenClassName,
    color = EColors.BLUE200,
    backgroundColor = EColors.GREY100,
    holeColor = EColors.WHITE,
    percentage,
    progressBackgroundSvgClassName,
    progressSvgClassName,
    strokeWidth = 3,
    children,
    wrapperClassName
  } = props;

  const screenSize = useScreenSize();
  const containerRef = useRef<HTMLDivElement>(null);

  const [size, setSize] = useState(0);

  const viewBox = `0 0 ${size} ${size}`;
  const radiusCalc = (size - strokeWidth) / 2;
  const radius = radiusCalc >= 0 ? radiusCalc : 0;
  const holeRadiusCalc = radius - strokeWidth / 2;
  const holeRadius = holeRadiusCalc >= 0 ? holeRadiusCalc : 0;
  const strokeDasharray = radius * Math.PI * 2;
  const axes = size / 2;
  const strokeDashoffset = strokeDasharray - (strokeDasharray * percentage) / 100;

  const updateSize = useDebouncedCallback((maxSize: number) => {
    setSize(maxSize);
  }, 500);

  useEffect(() => {
    const { offsetHeight, offsetWidth } = containerRef?.current || {};

    if (typeof offsetHeight === 'number' && typeof offsetWidth === 'number') {
      const maxSize = offsetHeight > offsetWidth ? offsetWidth : offsetHeight;

      if (size !== maxSize) {
        updateSize(maxSize);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef, screenSize]);

  return (
    <div className={clsx(s.CircleProgress__wrapper, wrapperClassName)} ref={containerRef}>
      <div className={clsx(s.CircleProgress__container, containerClassName)}>
        <svg height={size} viewBox={viewBox} width={size}>
          <circle
            className={clsx(s.CircleProgress__background, progressBackgroundSvgClassName)}
            cx={axes}
            cy={axes}
            r={radius}
            stroke={backgroundColor}
            strokeWidth={`${strokeWidth}px`}
          />

          <circle
            className={clsx(s.CircleProgress__progress, progressSvgClassName)}
            cx={axes}
            cy={axes}
            r={radius}
            stroke={color}
            strokeWidth={`${strokeWidth}px`}
            style={{
              strokeDasharray,
              strokeDashoffset
            }}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />

          <circle
            className={clsx(s.CircleChart__donut_hole, donutHoleClassName)}
            cx={axes}
            cy={axes}
            fill={holeColor}
            r={holeRadius}
            style={{ filter: 'url(#drop-shadow-hole)' }}
          />

          <g className={clsx(s.CircleChart__children_container, childrenContainerClassName)}>
            <foreignObject
              className={clsx(s.CircleChart__children, childrenClassName)}
              height={size}
              width={size}
              x="0"
              y="0">
              {children}
            </foreignObject>
          </g>
        </svg>
      </div>
    </div>
  );
};
