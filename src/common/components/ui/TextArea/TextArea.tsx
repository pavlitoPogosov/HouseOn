import React, { useRef } from 'react';

import autosize from 'autosize';
import clsx from 'clsx';

import { mergeRefs } from 'utils/mergeRefs';

import { FieldContainerProps, FieldContainer } from '../FieldContainer/FieldContainer';

import s from './TextArea.module.scss';

type TOwnProps = {
  enableAutoSize?: boolean;
  fieldContainerProps?: FieldContainerProps;
  maxLetters?: number | null;
  maxLettersClassName?: string;
  textAreaClassName?: string;
};

export type TTextAreaProps = TOwnProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

let idCounter = 0;

export const TextArea = React.forwardRef<HTMLTextAreaElement, TTextAreaProps>((props, ref) => {
  const {
    children,
    disabled,
    enableAutoSize,
    fieldContainerProps,
    id,
    maxLetters = 240,
    maxLettersClassName,
    onChange,
    textAreaClassName,
    value,
    ...rest
  } = props;

  const _id = useRef(id || `area-field-${++idCounter}`).current;
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const valueLength = e.target.value.length;

    if (maxLetters && maxLetters < valueLength) {
      // cut values, need to do it in order to escape copy paste bugs
      const lettersToDelete = valueLength - maxLetters;
      textAreaRef.current!.value = e.target.value.slice(0, -lettersToDelete);

      return;
    }

    onChange && onChange(e);
    enableAutoSize && autosize(textAreaRef.current!);
  };

  return (
    <FieldContainer {...fieldContainerProps} disabled={disabled} id={_id} variant="primary">
      <div className={s.TextArea__wrapper}>
        <textarea
          {...rest}
          autoComplete="off"
          autoCorrect="off"
          className={clsx(s.TextArea, textAreaClassName)}
          disabled={disabled}
          id={_id}
          onChange={handleTextAreaChange}
          ref={mergeRefs([textAreaRef, ref])}
          value={value}
        />

        {children}

        {maxLetters && (
          <div
            className={clsx(
              s.TextArea__maxLetters,
              maxLetters - String(value || '').length <= 10 && s.danger,
              maxLettersClassName
            )}
          >
            {maxLetters - String(value || '').length}
          </div>
        )}
      </div>
    </FieldContainer>
  );
});
