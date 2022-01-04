import React from 'react';

import clsx from 'clsx';

import { Checkbox } from 'common/components/ui/Checkbox/Checkbox';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import { ReactComponent as DotsIcon } from '../icons/dots.svg';

import s from './CheckListOption.module.scss';

export interface CheckListOptionProps {
  containerClassName?: string;
  children?: React.ReactNode;
  text: string;
  isChecked: boolean;
  isHideCheckbox?: boolean;
  onToggleIsChecked: (isChecked: boolean) => void;
  onDelete: () => void;
}

export const CheckListOption = React.forwardRef<HTMLDivElement, CheckListOptionProps>((props, ref) => {
  const { isChecked, isHideCheckbox, text, containerClassName, children, onToggleIsChecked, onDelete } = props;
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onToggleIsChecked(e.target.checked);
  };

  return (
    <div ref={ref} className={clsx(s.CheckListOption__container, containerClassName)}>
      <div className={s.CheckListOption__dots}>
        <DotsIcon />
      </div>

      {!isHideCheckbox && (
        <Checkbox
          checked={isChecked}
          onChange={handleCheckboxChange}
          containerClassName={s.CheckListOption__cbxContainer}
          checkboxClassName={s.CheckListOption__cbx}
        />
      )}

      {children || <Text variant={TextPropsVariantsEnum.BODY_L} text={text} className={s.CheckListOption__text} />}

      <div className={s.CheckListOption__minusIconWrapper} onClick={onDelete}>
        <div className={s.CheckListOption__minusIcon} />
      </div>
    </div>
  );
});
