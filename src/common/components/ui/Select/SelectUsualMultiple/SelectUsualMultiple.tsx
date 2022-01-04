import React from 'react';

import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import { SelectUsual, SelectUsualProps } from '../SelectUsual/SelectUsual';

import s from './SelectUsualMultiple.module.scss';

export interface ISelectUsualMultipleOption {
  text: string;
  value: string;
}

export type OwnProps = {
  value: ISelectUsualMultipleOption[];
  onChange: (newOptions: ISelectUsualMultipleOption[]) => void;
};

export type SelectUsualMultipleProps = OwnProps & Omit<SelectUsualProps, 'onChange' | 'selectedOption'>;

export const SelectUsualMultiple: React.FC<SelectUsualMultipleProps> = ({
  value,
  options,
  onChange,
  ...otherProps
}) => {
  const handleChange = (newOption: ISelectUsualMultipleOption) => {
    onChange([...value, newOption]);
  };

  const handleDelete = (deletedOption: ISelectUsualMultipleOption) => {
    return () => {
      onChange(value.filter((opt) => opt.value !== deletedOption.value));
    };
  };

  const optionsToShow = options.filter((opt) => !value.find((v) => v.value === opt.value));

  return (
    <SelectUsual {...otherProps} options={optionsToShow} onChange={handleChange}>
      {!!value.length && (
        <div className={s.SelectPrimaryMultiple__tagsWrapper}>
          {value.map((t) => (
            <div key={t.value} className={s.SelectPrimaryMultiple__tag}>
              <Text
                text={t.text}
                color="textSecondary"
                variant={TextPropsVariantsEnum.CAPTION_R}
                className={s.SelectPrimaryMultiple__tagText}
                as="div"
              />

              <CloseIcon className={s.SelectPrimaryMultiple__closeIcon} onClick={handleDelete(t)} />
            </div>
          ))}
        </div>
      )}
    </SelectUsual>
  );
};
