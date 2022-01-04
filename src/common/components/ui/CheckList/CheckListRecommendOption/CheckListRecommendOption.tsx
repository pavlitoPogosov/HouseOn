import React from 'react';

import clsx from 'clsx';

import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import s from './CheckListRecommendOption.module.scss';

export interface CheckListRecommendOptionProps {
  isSelected?: boolean;
  containerClassName?: string;

  text: string;

  onSelect?: () => void;
}

export const CheckListRecommendOption: React.FC<CheckListRecommendOptionProps> = ({
  isSelected,
  containerClassName,
  text,
  onSelect
}) => {
  return (
    <div
      className={clsx(s.CheckListRecommendOption__container, isSelected && s.selected, containerClassName)}
      onClick={onSelect}>
      <div className={s.CheckListRecommendOption__icon}>
        <PlusIcon />
      </div>

      <Text text={text} variant={TextPropsVariantsEnum.BODY_L} className={s.CheckListRecommendOption__text} />
    </div>
  );
};
