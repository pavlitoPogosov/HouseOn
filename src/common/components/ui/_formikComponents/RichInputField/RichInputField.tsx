import React from 'react';

import { EditorState } from 'draft-js';
import { useField } from 'formik';

import { RichInput, RichInputProps } from '../../RichInput/RichInput';

export type RichInputFieldProps = Omit<RichInputProps, 'onChange' | 'editorState'> & { name: string };

export const RichInputField: React.FC<RichInputFieldProps> = ({ name, ...otherProps }) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (newState: EditorState) => {
    helpers.setTouched(true);
    helpers.setValue(newState);
  };

  return (
    <RichInput
      editorState={field.value}
      onChange={handleChange}
      error={meta.touched ? meta.error : undefined}
      {...otherProps}
    />
  );
};
