import React from 'react';
import { Link } from 'react-router-dom';

import clsx from 'clsx';

import { ReactComponent as ProjectIcon } from 'assets/icons/project.svg';
import { ETextColors, Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import { Button, ButtonColors, ButtonSizes, ButtonVariants, EButtonTextColors } from '../../Button';
import { IconStatic } from '../../IconStatic/IconStatic';

import s from './HouseTaskCard.module.scss';

type THouseTaskCard = {
  buttonClassName?: string;
  buttonColor?: ButtonColors;
  buttonLabel: string;
  buttonSize?: ButtonSizes;
  buttonTextColor?: EButtonTextColors;
  buttonVariant?: ButtonVariants;
  containerClassName?: string;
  contentClassName?: string;
  detailsClassName?: string;
  icon?: JSX.Element;
  iconClassName?: string;
  linkTo: string;
  title: string;
  titleClassName?: string;
  titleColor?: ETextColors;
  titleVariant?: TextPropsVariantsEnum;
};

export const HouseTaskCard: React.FC<THouseTaskCard> = (props) => {
  const {
    containerClassName,
    buttonClassName,
    titleClassName,
    contentClassName,
    detailsClassName,
    iconClassName,
    title,
    icon = <ProjectIcon />,
    titleColor,
    linkTo,
    buttonLabel = 'Show details',
    buttonColor = 'transparent',
    buttonSize,
    buttonTextColor = EButtonTextColors.GREEN,
    buttonVariant = 'primary',
    titleVariant = TextPropsVariantsEnum.CAPTION_M
  } = props;

  return (
    <Link className={clsx(s.HouseTaskCard__container, containerClassName)} to={linkTo}>
      <div className={clsx(s.HouseTaskCard__content, contentClassName)}>
        <IconStatic className={clsx(s.content__icon, iconClassName)} icon={icon} />

        <div className={clsx(s.content__details, detailsClassName)}>
          <Text
            className={clsx(s.content__title, titleClassName)}
            color={titleColor}
            text={title}
            variant={titleVariant}
          />

          <Button
            className={clsx(s.content__button, buttonClassName)}
            color={buttonColor}
            isTextButton
            rightIcon="&gt;"
            size={buttonSize}
            tabIndex={-1}
            textColor={buttonTextColor}
            variant={buttonVariant}>
            {buttonLabel}
          </Button>
        </div>
      </div>
    </Link>
  );
};
