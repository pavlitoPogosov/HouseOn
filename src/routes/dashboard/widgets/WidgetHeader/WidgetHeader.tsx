import React from 'react';

import clsx from 'clsx';

import { ButtonColors, ButtonLink, EButtonTextColors } from 'common/components/ui/Button';
import { IconStatic } from 'common/components/ui/IconStatic/IconStatic';
import { ETextColors, Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import s from './WidgetHeader.module.scss';

type TWidgetHeaderProps = {
  buttonClassName?: string;
  buttonColor?: ButtonColors;
  buttonLabel?: string;
  buttonLink?: string;
  buttonTextColor?: EButtonTextColors;
  childrenClassName?: string;
  containerClassName?: string;
  contentClassName?: string;
  customElement?: JSX.Element;
  icon?: JSX.Element;
  iconClassName?: string;
  title: string;
  titleTextClassName?: string;
  titleTextColor?: ETextColors;
  titleTextVariant?: TextPropsVariantsEnum;
};

export const WidgetHeader: React.FC<TWidgetHeaderProps> = (props) => {
  const {
    buttonClassName,
    buttonLabel,
    buttonLink,
    customElement,
    children,
    containerClassName,
    contentClassName,
    icon,
    childrenClassName,
    iconClassName,
    title,
    titleTextClassName,
    titleTextColor,
    titleTextVariant = TextPropsVariantsEnum.H4,
    buttonColor = 'transparent',
    buttonTextColor = EButtonTextColors.GREEN
  } = props;

  return (
    <div className={clsx(s.WidgetHeader__container, containerClassName)}>
      <div className={clsx(s.WidgetHeader__content, contentClassName)}>
        {customElement}

        {!customElement && (
          <div className={clsx(s.content__title_section)}>
            <IconStatic className={clsx(s.content__icon, iconClassName)} icon={icon} />

            <Text
              className={clsx(s.content__title, titleTextClassName)}
              color={titleTextColor}
              text={title}
              variant={titleTextVariant}
            />
          </div>
        )}

        {children && <div className={clsx(s.content__children, childrenClassName)}>{children}</div>}

        {!children && buttonLink && (
          <ButtonLink
            className={clsx(s.content__button, buttonClassName)}
            color={buttonColor}
            rightIcon="&gt;"
            textColor={buttonTextColor}
            to={buttonLink}
            variant="primary">
            {buttonLabel}
          </ButtonLink>
        )}
      </div>
    </div>
  );
};
