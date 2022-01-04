import React, { useCallback, useEffect, useRef } from 'react';

import clsx from 'clsx';

import { useClickOutside, useToggle } from '@proscom/ui-react';
import { Checkbox } from 'common/components/ui/Checkbox/Checkbox';
import { Spinner } from 'common/components/ui/Spinner/Spinner';
import { TextArea } from 'common/components/ui/TextArea/TextArea';
import { moveInputCaretToEnd } from 'common/components/utils/moveInputCaretToEnd';
import { useInput } from 'common/hooks/useInput';

import s from './StatusInput.module.scss';

export interface StatusInputSaveValues {
  text: string;
  expiresInDay: boolean;
}

export interface StatusInputProps {
  initialText?: string;
  isLoading?: boolean;
  isError?: boolean;
  onDiscard: () => void;
  onSave: (values: StatusInputSaveValues) => void;
}

export const StatusInput: React.FC<StatusInputProps> = ({ initialText, isLoading, isError, onDiscard, onSave }) => {
  const checkboxToggler = useToggle();
  const [textAreaValue, handleChangeTextArea, setTextAreaValue] = useInput(initialText);

  const containerRef = useRef<HTMLInputElement | null>(null);
  useClickOutside(containerRef, onDiscard);

  const handleSave = useCallback(() => {
    if (!textAreaValue.trim()) {
      return onDiscard();
    }

    onSave({
      text: textAreaValue.trim(),
      expiresInDay: checkboxToggler.value
    });
  }, [textAreaValue, checkboxToggler.value, onDiscard, onSave]);

  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.ctrlKey) {
        handleSave();
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleSave, setTextAreaValue]);

  const renderSpinner = () => {
    if (!isLoading) return null;

    return (
      <Spinner size="xs" color="text-brand" className={clsx(s.StatusInput__spinner, !initialText ? s.right : s.left)} />
    );
  };

  return (
    <div ref={containerRef} className={s.StatusInput__container}>
      <TextArea
        textAreaClassName={s.StatusInput__input}
        value={textAreaValue}
        onChange={handleChangeTextArea}
        maxLetters={120}
        fieldContainerProps={{
          containerClassName: s.StatusInput__inputContainer
        }}
        onFocus={moveInputCaretToEnd}
        disabled={isLoading}
        autoFocus
      />

      <div className={s.StatusInput__controls}>
        {!initialText && (
          <Checkbox
            text="Post only for 24 hours"
            containerClassName={s.StatusInput__cbxContainer}
            textClassName={s.StatusInput__cbxText}
            checked={checkboxToggler.value}
            onChange={checkboxToggler.toggle}
          />
        )}

        <div className={s.StatusInput__btns}>
          {!initialText && renderSpinner()}
          <span onClick={onDiscard}>Discard</span>
          <span onClick={handleSave}>Save</span>
          {initialText && renderSpinner()}
        </div>
      </div>
    </div>
  );
};
