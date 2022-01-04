import React from 'react';

import { useField } from 'formik';

import { DropzonePreview, DropzonePreviewProps } from 'common/components/ui/DropzonePreview/DropzonePreview';

// name should be same with dropzone input in order to display correct formik values
export type DropzonePreviewFieldProps = Omit<DropzonePreviewProps, 'value' | 'onCloseFile'> & {
  name: string;
  isClosable?: boolean;
};

export const DropzonePreviewField: React.FC<DropzonePreviewFieldProps> = ({
  name,
  children,
  isClosable,
  ...otherProps
}) => {
  const [field, meta, helpers] = useField(name);

  const handleFileClose = (file: File) => {
    helpers.setValue(field.value.filter((f: { name: string }) => f.name !== file.name));
  };

  return (
    <DropzonePreview
      {...field}
      {...meta}
      {...otherProps}
      fieldContainerProps={{
        ...otherProps.fieldContainerProps,
        error: meta.touched ? meta.error : undefined
      }}
      value={field.value || []}
      onCloseFile={isClosable ? handleFileClose : undefined}
    />
  );
};
