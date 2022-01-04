import React from 'react';

import clsx from 'clsx';

import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';

import { FieldContainer, FieldContainerProps } from '../FieldContainer/FieldContainer';

import s from './DropzonePreview.module.scss';

type OwnProps = {
  containerClassName?: string;
  fileClassName?: string;
  disableErrorShow?: boolean;
  value: File[];
  fieldContainerProps?: FieldContainerProps;
  onCloseFile?: (file: File) => void;
};
export type DropzonePreviewProps = OwnProps;

export const DropzonePreview: React.FC<DropzonePreviewProps> = ({
  containerClassName,
  fileClassName,
  value,
  fieldContainerProps,
  disableErrorShow,
  onCloseFile
}) => {
  if (!value.length) {
    return null;
  }

  const handleFileClose = (file: File) => {
    return () => {
      onCloseFile && onCloseFile(file);
    };
  };

  return (
    <FieldContainer
      {...fieldContainerProps}
      error={!disableErrorShow ? fieldContainerProps?.error : undefined}
      variant="primary">
      <div className={clsx(s.DropzonePreview__container, containerClassName)}>
        {value.map((f) => (
          <div key={f.name} className={clsx(s.DropzonePreview__file, fileClassName)}>
            <img src={URL.createObjectURL(f)} alt={f.name} />

            {onCloseFile && (
              <div onClick={handleFileClose(f)} className={s.DropzonePreview__closeIcon}>
                <CloseIcon />
              </div>
            )}
          </div>
        ))}
      </div>
    </FieldContainer>
  );
};
