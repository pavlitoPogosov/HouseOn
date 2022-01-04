import React from 'react';

import clsx from 'clsx';

import { ETextColors, Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { EColors } from 'variables/colors';

import { OnlineStatusLabel } from '../OnlineStatusLabel/OnlineStatusLabel';

import s from './ColorDotLabel.module.scss';

type TColorDotLabel = {
  containerClassName?: string;
  dotClassName?: string;
  dotColor?: EColors;
  dotContainerClassName?: string;
  dotSize?: number;
  extraValue?: string;
  extraValueClassName?: string;
  extraValueColor?: ETextColors;
  extraValueVariant?: TextPropsVariantsEnum;
  isOnline?: boolean;
  text?: string;
  textClassName?: string;
  textColor?: ETextColors;
  textVariant?: TextPropsVariantsEnum;
};

export const ColorDotLabel: React.FC<TColorDotLabel> = (props) => {
  const {
    dotColor = EColors.BLUE200,
    text,
    dotSize = 9,
    containerClassName,
    dotContainerClassName,
    dotClassName,
    textClassName,
    children,
    textColor,
    textVariant = TextPropsVariantsEnum.CAPTION_M,
    extraValueClassName,
    isOnline,
    extraValueColor,
    extraValue,
    extraValueVariant = TextPropsVariantsEnum.CAPTION_M
  } = props;

  return (
    <div className={clsx(s.ColorDotLabel__container, containerClassName)}>
      <OnlineStatusLabel
        containerClassName={dotContainerClassName}
        dotClassName={dotClassName}
        dotColor={dotColor}
        dotSize={dotSize}
        isOnline={isOnline}
      />

      {children || (
        <Text
          className={clsx(s.ColorDotLabel__text, textClassName)}
          color={textColor}
          text={text}
          variant={textVariant}
        />
      )}

      {extraValue && (
        <Text
          className={clsx(s.ColorDotLabel__extra_value, extraValueClassName)}
          color={extraValueColor}
          text={extraValue}
          variant={extraValueVariant}
        />
      )}
    </div>
  );
};
