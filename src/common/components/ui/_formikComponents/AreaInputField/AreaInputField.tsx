import React from 'react';

import { useField } from 'formik';

import { ReactComponent as FeetIcon } from 'assets/icons/feet.svg';
import { ReactComponent as MetersIcon } from 'assets/icons/meters.svg';
import { IconButton } from 'common/components/ui/IconButton/IconButton';
import { Input, TInputProps } from 'common/components/ui/Input/Input';
import { FloorSpaceUnitsEnum } from 'graphql/types';

import s from './AreaInputField.module.scss';

export type AreaInputFieldProps = TInputProps & Required<Pick<TInputProps, 'name'>> & { areaMetricName: string };

export const AreaInputField: React.FC<AreaInputFieldProps> = ({ areaMetricName, name, ...otherProps }) => {
  const [field, meta] = useField(name);
  const [areaField, _, areaHelpers] = useField(areaMetricName);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regExp = new RegExp(/^((\d{1,4})(\.\d{1,2})?)$/, 'g');

    if (e.target.value.length === 0) {
      return field.onChange(e);
    }

    if (regExp.test(e.target.value)) {
      field.onChange(e);
    }
  };

  const handleButtonClick = (value: FloorSpaceUnitsEnum) => {
    return () => {
      areaHelpers.setValue(value);
      areaHelpers.setTouched(true);
    };
  };

  return (
    <Input
      {...field}
      {...otherProps}
      autoComplete="off"
      fieldContainerProps={{
        ...otherProps.fieldContainerProps,
        error: meta.touched ? meta.error : undefined
      }}
      onChange={handleChange}
      type="number"
      value={field.value || ''}
    >
      <div className={s.AreaInput__btns}>
        <IconButton
          className={s.AreaInput__btn}
          height={24}
          isSelected={areaField.value === FloorSpaceUnitsEnum.Meter}
          onClick={handleButtonClick(FloorSpaceUnitsEnum.Meter)}
          width={24}
        >
          <MetersIcon />
        </IconButton>

        <IconButton
          className={s.AreaInput__btn}
          height={24}
          isSelected={areaField.value === FloorSpaceUnitsEnum.Feet}
          onClick={handleButtonClick(FloorSpaceUnitsEnum.Feet)}
          width={24}
        >
          <FeetIcon />
        </IconButton>
      </div>
    </Input>
  );
};
