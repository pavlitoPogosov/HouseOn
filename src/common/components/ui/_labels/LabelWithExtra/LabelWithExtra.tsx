import React from 'react';

import clsx from 'clsx';

import { ETextColors, Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { EColors } from 'variables/colors';

import s from './LabelWithExtra.module.scss';

type TLabelWithExtra = {
  containerClassName?: string;
  extra?: string;
  extraBackgroundColor?: EColors;
  extraClassName?: string;
  extraContainerClassName?: string;
  extraTextColor?: ETextColors;
  extraVariant?: TextPropsVariantsEnum;
  text: string;
  textClassName?: string;
  textColor?: ETextColors;
  textVariant?: TextPropsVariantsEnum;
};

export const LabelWithExtra: React.FC<TLabelWithExtra> = (props) => {
  const {
    containerClassName,
    extraContainerClassName,
    textClassName,
    text,
    textVariant = TextPropsVariantsEnum.CAPTION_M,
    extraClassName,
    extra,
    textColor,
    extraTextColor = ETextColors.ORANGE,
    extraBackgroundColor = EColors.ORANGE100,
    extraVariant = TextPropsVariantsEnum.CAPTION_M
  } = props;

  const extraContainerStyle = { backgroundColor: extraBackgroundColor };

  return (
    <div className={clsx(s.LabelWithExtra__container, containerClassName)}>
      <Text
        className={clsx(s.LabelWithExtra__text, textClassName)}
        color={textColor}
        text={text}
        variant={textVariant}
      />

      {extra && (
        <div className={clsx(s.LabelWithExtra__extra_container, extraContainerClassName)} style={extraContainerStyle}>
          <Text
            className={clsx(s.LabelWithExtra__extra, extraClassName)}
            color={extraTextColor}
            text={extra}
            variant={extraVariant}
          />
        </div>
      )}
    </div>
  );
};
