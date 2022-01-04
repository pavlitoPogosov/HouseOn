import React from 'react';

import { useField } from 'formik';

import { AddCommentsBlock, AddCommentsBlockProps } from '../../AddCommentsBlock/AddCommentsBlock';
import { IComment } from '../../AddCommentsBlock/Comment/Comment';

export type AddCommentsBlockFieldProps = Omit<AddCommentsBlockProps, 'comments' | 'onChange'> & { name: string };

export const AddCommentsBlockField: React.FC<AddCommentsBlockFieldProps> = ({ name, children, ...otherProps }) => {
  const [field, , helpers] = useField(name);

  const handleChange = (newComments: IComment[]) => {
    helpers.setValue(newComments);
    helpers.setTouched(true);
  };

  return <AddCommentsBlock comments={field.value || []} onChange={handleChange} />;
};
