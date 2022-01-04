import React, { useRef } from 'react';
import { useDropzone, DropzoneOptions } from 'react-dropzone';

import clsx from 'clsx';

import { ReactComponent as UploadIcon } from 'assets/icons/upload.svg';

import { FieldContainer, FieldContainerProps } from '../FieldContainer/FieldContainer';
import { NavigationLink } from '../NavigationLink/NavigationLink';
import { Text, TextPropsVariantsEnum } from '../Text/Text';

import s from './DropZone.module.scss';

export interface RenderDropzoneContentOptions {
  linkClass: string;
  isDisabled: boolean;
}

export type OwnProps = {
  disabled?: boolean;
  text?: string;
  className?: string;
  fieldContainerProps?: Omit<FieldContainerProps, 'id'>;
  id?: string;
  size?: 's' | 'm' | 'l';
  linkText?: string;
  renderDropzoneContent?: (options: RenderDropzoneContentOptions) => React.ReactNode;
};

export type DropZoneProps = OwnProps & DropzoneOptions;

let idCounter = 0;

export const DropZone: React.FC<DropZoneProps> = ({
  disabled,
  text,
  id,
  className,
  fieldContainerProps,
  linkText = 'Upload a file',
  accept = 'image/*',
  maxFiles = 1,
  size = 'l',
  renderDropzoneContent,
  ...otherProps
}) => {
  const _id = useRef(id || `dropzone-${++idCounter}`).current;

  const { getRootProps, getInputProps, isDragActive } = useDropzone(otherProps);

  return (
    <FieldContainer {...fieldContainerProps} id={_id} disabled={disabled} variant="primary">
      <div
        {...getRootProps()}
        className={clsx(
          s.DropZone__container,
          {
            [s.DropZone__disabled]: disabled,
            [s.DropZone__s]: size === 's',
            [s.DropZone__m]: size === 'm',
            [s.DropZone__l]: size === 'l',
            [s.DropZone__active]: isDragActive
          },
          className
        )}>
        {text && (
          <Text variant={TextPropsVariantsEnum.CAPTION_M} color="textSecondary" className={s.DropZone__text}>
            {text}
          </Text>
        )}

        <input {...getInputProps()} id={_id} disabled={disabled} />

        {renderDropzoneContent ? (
          renderDropzoneContent({
            isDisabled: Boolean(disabled),
            linkClass: s.Dropzone__link
          })
        ) : (
          <NavigationLink as="div" text={linkText} className={s.DropZone__link} icon={<UploadIcon />} isUnderline />
        )}
      </div>
    </FieldContainer>
  );
};
