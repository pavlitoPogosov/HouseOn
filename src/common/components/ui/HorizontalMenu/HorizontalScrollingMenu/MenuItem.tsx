import React from 'react';

import clsx from 'clsx';

import { ETextColors, Text, TextPropsVariantsEnum } from '../../Text/Text';

import s from './MenuItem.module.scss';

type TMenuItem = {
  className?: string;
  color?: ETextColors;
  containerClassName?: string;
  onClick: () => void;
  selected: boolean;
  title: string;
  variant?: TextPropsVariantsEnum;
};

export const MenuItem = (props: TMenuItem) => {
  const {
    onClick,
    selected,
    containerClassName,
    className,
    title,
    color: colorProp,
    variant = TextPropsVariantsEnum.H3
  } = props;

  let color;

  if (colorProp) {
    color = colorProp;
  } else if (selected) {
    color = undefined;
  } else {
    color = ETextColors.TRETIARY;
  }

  return (
    <div
      className={clsx(s.HorizontalScrollingMenu__item_container, containerClassName)}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <Text
        className={clsx(s.HorizontalScrollingMenu__item, className)}
        color={color}
        key={title}
        text={title}
        variant={variant}
      />
    </div>
  );
};
