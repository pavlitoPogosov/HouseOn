import React, {
  useEffect,
  useState
} from 'react';

import { useField } from 'formik';

import {
  SelectTextual,
  ISelectTextualProps,
  ISelectTextualOption
} from 'common/components/ui/Select';

export type TSelectTextualFieldProps = Omit<ISelectTextualProps, 'onChange' | 'selectedOption'> & { name: string };

export const SelectTextualField: React.FC<TSelectTextualFieldProps> = props => {
  const {
    children,
    name,
    options,
    ...otherProps
  } = props;

  const [
    field, , helpers
  ] = useField(name);

  const [ selected, setSelected ] = useState<ISelectTextualOption | undefined>(undefined);

  const handleSelectChange = (option: ISelectTextualOption) => {
    helpers.setValue(option.value);
    helpers.setTouched(true);
  };

  useEffect(() => {
    if (field.value && options?.length){
      const newSelected = options.find(opt => opt.value === field.value);
      if (newSelected?.value !== selected?.value){
        setSelected(newSelected);
      }
    }
  }, [ field, options ]);

  const isDisabled = options?.length < 2;

  return (
    <SelectTextual
      isDisabled={isDisabled}
      isDropDownIcon={!isDisabled}
      onChange={handleSelectChange}
      options={options}
      selectedOption={selected}
      {...otherProps}
    />
  );
};
