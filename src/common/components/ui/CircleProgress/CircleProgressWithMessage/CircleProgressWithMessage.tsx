import React from 'react';

import clsx from 'clsx';

import { Text, TextProps, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import s from './CircleProgressWithMessage.module.scss';

export enum ECircleProgressWithMessageStates {
  BIG_GREEN_LIGHT = 'big-green-light',
  BIG_RED_LIGHT = 'big-red-light',
  BIG_YELLOW_LIGHT = 'big-yellow-light'
}

enum ECircleProgressWithMessageFilterColors {
  GREEN_LIGHT_DROP = '#b4cf91',
  GREEN_LIGHT_INSET = '#a6cf82',
  RED_LIGHT_DROP = '#cf9191',
  RED_LIGHT_INSET = '#cf8282',
  YELLOW_LIGHT_DROP = '#cfce91',
  YELLOW_LIGHT_INSET = '#cfcb82'
}

type TCircleProgressWithMessage = {
  containerClassName?: string;
  messageClassName?: string;
  messageContainerClassName?: string;
  percentage: number;
  progressBackgroundSvgClassName?: string;
  progressClassName?: string;
  progressColor?: ECircleProgressWithMessageStates;
  progressSvgClassName?: string;
  size?: number;
  strokeWidth?: number;
  textClassName?: string;
};

type TTextProps = Omit<TextProps, 'className'>;

export const CircleProgressWithMessage = (props: TTextProps & TCircleProgressWithMessage): JSX.Element => {
  const {
    containerClassName,
    progressClassName,
    messageContainerClassName,
    as,
    messageClassName,
    onClick,
    text,
    variant = TextPropsVariantsEnum.CAPTION_M,
    color = 'white',
    progressColor = ECircleProgressWithMessageStates.BIG_GREEN_LIGHT,
    percentage,
    progressBackgroundSvgClassName,
    progressSvgClassName,
    size = 134,
    strokeWidth = 18,
    textClassName
  } = props;

  // SVG centers the stroke width on the radius, subtract out so circle fits in square
  const radiusCalc = (size - strokeWidth) / 2;
  const radius = radiusCalc >= 0 ? radiusCalc : 0;
  // Enclose circle in a circumscribing square
  const viewBox = `0 0 ${size} ${size}`;
  // Arc length at 100% coverage is the circle circumference
  const strokeDasharray = radius * Math.PI * 2;
  // Scale 100% coverage overlay with the actual percent
  const strokeDashoffset = strokeDasharray - (strokeDasharray * percentage) / 100;

  let withFilters: boolean;
  let colorShadowDrop: ECircleProgressWithMessageFilterColors;
  let colorShadowInset: ECircleProgressWithMessageFilterColors;

  switch (progressColor) {
    case ECircleProgressWithMessageStates.BIG_GREEN_LIGHT:
      withFilters = true;
      colorShadowDrop = ECircleProgressWithMessageFilterColors.GREEN_LIGHT_DROP;
      colorShadowInset = ECircleProgressWithMessageFilterColors.GREEN_LIGHT_INSET;
      break;

    case ECircleProgressWithMessageStates.BIG_YELLOW_LIGHT:
      withFilters = true;
      colorShadowDrop = ECircleProgressWithMessageFilterColors.YELLOW_LIGHT_DROP;
      colorShadowInset = ECircleProgressWithMessageFilterColors.YELLOW_LIGHT_INSET;
      break;

    case ECircleProgressWithMessageStates.BIG_RED_LIGHT:
      withFilters = true;
      colorShadowDrop = ECircleProgressWithMessageFilterColors.RED_LIGHT_DROP;
      colorShadowInset = ECircleProgressWithMessageFilterColors.RED_LIGHT_INSET;
      break;

    default:
      withFilters = false;
      colorShadowDrop = ECircleProgressWithMessageFilterColors.GREEN_LIGHT_DROP;
      colorShadowInset = ECircleProgressWithMessageFilterColors.GREEN_LIGHT_INSET;
  }

  const dropShadowFilter = (
    <filter id="drop-shadow">
      <feGaussianBlur stdDeviation="8" />

      <feDropShadow dx="0" dy="0" floodColor={colorShadowDrop} stdDeviation="0.1" />
    </filter>
  );

  const insetShadowFilter = (
    <filter id="inset-shadow">
      <feFlood floodColor={colorShadowInset} />

      <feComposite in2="SourceGraphic" operator="out" />

      <feGaussianBlur stdDeviation="3" />

      <feDropShadow dx="0" dy="0" floodColor={colorShadowInset} stdDeviation="0.02" />

      <feComposite in2="SourceGraphic" operator="atop" />
    </filter>
  );

  const filters = (
    <defs>
      {dropShadowFilter}

      {insetShadowFilter}
    </defs>
  );

  const mainCircleFilter = withFilters ? { filter: 'url(#drop-shadow)' } : {};
  const shadowCircleFilter = withFilters ? { filter: 'url(#inset-shadow)' } : {};

  const mainCircleCommonStyle = {
    strokeDasharray,
    strokeDashoffset
  };

  const mainCircleStyle = {
    ...mainCircleFilter,
    ...mainCircleCommonStyle
  };

  const shadowCircleStyle = {
    ...shadowCircleFilter,
    ...mainCircleCommonStyle
  };

  return (
    <div className={clsx(s.CircleProgressWithMessage__container, containerClassName)}>
      <div
        className={clsx(
          {
            [s.CircleProgressWithMessage__big_green_light]:
              progressColor === ECircleProgressWithMessageStates.BIG_GREEN_LIGHT,
            [s.CircleProgressWithMessage__big_yellow_light]:
              progressColor === ECircleProgressWithMessageStates.BIG_YELLOW_LIGHT,
            [s.CircleProgressWithMessage__big_red_light]:
              progressColor === ECircleProgressWithMessageStates.BIG_RED_LIGHT
          },
          s.CircleProgressWithMessage__progress,
          progressClassName
        )}>
        <svg height={size} viewBox={viewBox} width={size}>
          {withFilters && filters}

          <circle
            className={clsx(s.CircleProgressWithMessage__background, progressBackgroundSvgClassName)}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={`${strokeWidth}px`}
          />

          <circle
            className={clsx(s.CircleProgressWithMessage__progress_shadow, progressSvgClassName)}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={`${strokeWidth}px`}
            style={mainCircleStyle}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />

          {withFilters && (
            <circle
              className={clsx(s.CircleProgressWithMessage__progress, progressSvgClassName)}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth={`${strokeWidth}px`}
              style={shadowCircleStyle}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
          )}

          <text
            className={clsx(s.CircleProgressWithMessage__text, textClassName)}
            dy=".3em"
            fill="currentColor"
            textAnchor="middle"
            x="50%"
            y="50%">
            {`${percentage}%`}
          </text>
        </svg>
      </div>

      {text && (
        <div className={clsx(s.CircleProgressWithMessage__message_container, messageContainerClassName)}>
          <Text
            as={as}
            className={clsx(s.CircleProgressWithMessage__message, messageClassName)}
            color={color}
            onClick={onClick}
            text={text}
            variant={variant}
          />
        </div>
      )}
    </div>
  );
};
