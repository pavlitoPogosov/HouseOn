import React, { useEffect, useRef, useState } from 'react';

import clsx from 'clsx';
import { useDebouncedCallback } from 'use-debounce';

import { useScreenSize } from 'common/hooks/useScreenSize';
import { EColors } from 'variables/colors';

import s from './CircleChart.module.scss';

export type TDataItem = {
  color: EColors;
  label: string;
  value: number;
};

export type TData = TDataItem[];

export interface ICircleChartProps {
  chartClassName?: string;
  childrenClassName?: string;
  childrenContainerClassName?: string;
  containerClassName?: string;
  data: TData;
  donutClassName?: string;
  donutHoleClassName?: string;
  donutRingClassName?: string;
  donutSegmentClassName?: string;
  holeColor?: EColors;
  radius?: number;
  strokeWidth?: number;
}

const strokeWidthCoefficient = 0.17;

export const CircleChart: React.FC<ICircleChartProps> = (props) => {
  const {
    data,
    chartClassName,
    children,
    childrenClassName,
    childrenContainerClassName,
    containerClassName,
    donutClassName,
    donutHoleClassName,
    donutRingClassName,
    donutSegmentClassName,
    holeColor = EColors.WHITE,
    strokeWidth: strokeWidthProp = 32
  } = props;

  const totalDataValue = data?.reduce((current, next) => current + next.value, 0) || 0;

  const screenSize = useScreenSize();
  const containerRef = useRef<HTMLDivElement>(null);

  const [size, setSize] = useState(0);

  const halfSize = size / 2;
  const viewBox = `0 0 ${size} ${size}`;

  let strokeWidth = strokeWidthProp;

  if (strokeWidth / size > strokeWidthCoefficient) {
    strokeWidth = size * strokeWidthCoefficient;
  }

  const radiusCalc = (size - strokeWidth) / 2;
  const radius = radiusCalc >= 0 ? radiusCalc : 0;
  const holeRadiusCalc = radius - strokeWidth / 2;
  const holeRadius = holeRadiusCalc >= 0 ? holeRadiusCalc : 0;
  const strokeDasharray = radius * Math.PI * 2;
  const axes = size / 2;

  const lastItemColor = data?.[data.length]?.color;

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
    <div className={clsx(s.CircleChart__container, containerClassName)} ref={containerRef}>
      <div className={clsx(s.CircleChart, chartClassName)}>
        <svg
          aria-labelledby="beers-title beers-desc"
          className={clsx(s.CircleChart__donut, donutClassName)}
          height="100%"
          role="img"
          viewBox={viewBox}
          width="100%">
          <defs>
            <filter id="drop-shadow-hole">
              <feDropShadow dx="0" dy="0" floodColor="rgba(34, 60, 80, 0.2)" stdDeviation="1.5" />
            </filter>

            <filter id="inset-shadow-segment">
              <feFlood floodColor={EColors.WHITE} />

              <feComposite in2="SourceGraphic" operator="out" />

              <feDropShadow dx="0" dy="0" floodColor="rgba(255, 255, 255, 0.2)" stdDeviation="0.5" />

              <feComposite in2="SourceGraphic" operator="atop" />
            </filter>
          </defs>

          <circle
            className={clsx(s.CircleChart__donut_ring, donutRingClassName)}
            cx={axes}
            cy={axes}
            fill="transparent"
            r={radius}
            role="presentation"
            stroke={lastItemColor || '#d2d3d4'}
            strokeWidth={strokeWidth}
          />

          {data?.map((item, i) => {
            const { color, label, value } = item;

            const prevTotal =
              data?.filter((_, index) => index < i)?.reduce((current, next) => current + next.value, 0) || 0;
            const prevPercentage = prevTotal / totalDataValue;
            const angle = 360 * prevPercentage;

            const percentage = value / totalDataValue;
            const strokeDashoffset = strokeDasharray - strokeDasharray * percentage;

            const transform = `rotate(${-90 + angle} ${halfSize} ${halfSize})`;
            const isLast = data.length === i + 1;

            return (
              <circle
                className={clsx(s.CircleChart__donut_segment, donutSegmentClassName)}
                cx={axes}
                cy={axes}
                fill={EColors.TRANSPARENT}
                key={label}
                r={radius}
                stroke={isLast ? EColors.TRANSPARENT : color}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeWidth={strokeWidth}
                style={{ filter: 'url(#inset-shadow-segment)' }}
                transform={transform}
              />
            );
          })}

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
