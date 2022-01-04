import React from 'react';

import { useField } from 'formik';
import { uniqBy } from 'lodash';

import { DropZone, DropZoneProps } from '../../DropZone/DropZone';

export type DropzoneFieldProps = DropZoneProps & { excludeRepeats?: boolean; loading?: boolean; name: string };

// values must be array of files only
export const DropzoneField: React.FC<DropzoneFieldProps> = ({
  excludeRepeats,
  linkText,
  loading = false,
  maxFiles = 1,
  name,
  ...otherProps
}) => {
  const [field, meta, helpers] = useField(name);

  const handleFieldDrop = (acceptedFiles: File[]) => {
    const valueToSet = excludeRepeats
      ? uniqBy([...(field?.value || []), ...acceptedFiles], 'name')
      : [...(field?.value || []), ...acceptedFiles];

    const value = valueToSet.length >= maxFiles ? valueToSet.slice(-maxFiles) : valueToSet;

    helpers.setValue(value);
    helpers.setTouched(true);
  };

  return (
    <DropZone
      {...field}
      {...otherProps}
      disabled={field.value?.length >= maxFiles || loading}
      fieldContainerProps={{
        ...otherProps.fieldContainerProps,
        error: meta.touched ? meta.error : undefined
      }}
      linkText={field.value?.length >= maxFiles ? 'You’ve reach the upload limit' : linkText}
      maxFiles={maxFiles}
      onDropAccepted={handleFieldDrop}
    />
  );
};
