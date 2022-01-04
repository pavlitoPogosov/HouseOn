import React from 'react';
import { Link } from 'react-router-dom';

import { ColorfulIcon, ColorfulIconTypes } from 'common/components/ui/ColorfulIcon/ColorfulIcon';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import s from './UsualTab.module.scss';

export interface UsualTabProps {
  iconType: ColorfulIconTypes;
  isInActive: boolean;
  link: string;
  text: string;
}

export const UsualTab: React.FC<UsualTabProps> = ({ link, text, iconType, isInActive }) => {
  return (
    <Link className={s.UsualTab__container} to={link}>
      <ColorfulIcon icon={iconType} isInActive={isInActive} className={s.UsualTab__icon} />

      <Text className={s.UsualTab__text} variant={TextPropsVariantsEnum.BODY_M} text={text} />
    </Link>
  );
};
