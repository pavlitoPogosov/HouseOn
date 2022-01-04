import React, { useEffect, useRef } from 'react';

import clsx from 'clsx';
import {
  Editor,
  EditorState,
  EditorProps,
  DraftHandleValue,
  RichUtils,
  ContentBlock,
  getDefaultKeyBinding,
  KeyBindingUtil,
  Modifier
} from 'draft-js';

import { FieldContainer, FieldContainerProps } from '../FieldContainer/FieldContainer';

import { RichInputToolbar } from './RichInputToolbar/RichInputToolbar';

import s from './RichInput.module.scss';

// Types

export enum RichInputBlockTypes {
  HEADLINE = 'headline',
  TEXT = 'text',
  CAPTION = 'caption'
}

export enum RichInputInlineStyles {
  BOLD = 'BOLD',
  ITALIC = 'ITALIC',
  UNDERLINE = 'UNDERLINE',
  STRIKETHROUGH = 'STRIKETHROUGH'
}

const blockStyleFn = (block: ContentBlock) => {
  const blockType = block.getType();

  if (blockType === RichInputBlockTypes.HEADLINE) {
    return `RichInput__style__${RichInputBlockTypes.HEADLINE}`;
  }

  if (blockType === RichInputBlockTypes.TEXT) {
    return `RichInput__style__${RichInputBlockTypes.TEXT}`;
  }

  if (blockType === RichInputBlockTypes.CAPTION) {
    return `RichInput__style__${RichInputBlockTypes.CAPTION}`;
  }

  return '';
};

type OwnProps = {
  placeholder?: string;
  variant?: 'unset' | 'primary';
  containerClassName?: string;
  editorProps?: Omit<EditorProps, 'onChange' | 'editorState'>;
  elementToListenScroll?: HTMLElement | null | typeof window;

  editorState: EditorState;
  onChange: (newState: EditorState) => void;
};

export type RichInputProps = OwnProps & FieldContainerProps;

let idCounter = 0;

export const RichInput = React.forwardRef<any, RichInputProps>(
  (
    {
      editorState,
      placeholder,
      variant = 'unset',
      containerClassName,
      onChange,
      elementToListenScroll,
      editorProps,
      disabled,
      ...otherProps
    },
    ref
  ) => {
    const editorContainerId = useRef(`rich-input-${idCounter++}`).current;

    const handleChange = (newState: EditorState) => {
      if (disabled) return;

      onChange(newState);
    };

    const handleKeyBinding = (e: React.KeyboardEvent<Element>): string | null => {
      if (KeyBindingUtil.hasCommandModifier(e) && e.shiftKey && e.key.toLocaleLowerCase() === 'x') {
        return RichInputInlineStyles.STRIKETHROUGH;
      }

      return getDefaultKeyBinding(e);
    };

    const handleKeyCommand = (command: string, state: EditorState): DraftHandleValue => {
      const defaultBindingState = RichUtils.handleKeyCommand(state, command);

      if (!defaultBindingState && command === RichInputInlineStyles.STRIKETHROUGH) {
        const strikeThroughState = RichUtils.toggleInlineStyle(state, RichInputInlineStyles.STRIKETHROUGH);
        handleChange(strikeThroughState);

        return 'handled';
      }

      if (defaultBindingState) {
        handleChange(defaultBindingState);

        return 'handled';
      }

      return 'not-handled';
    };

    // hack to escape 'removeChild error'
    const handleBeforeInput = (chars: string, editorState: EditorState): DraftHandleValue => {
      const currentContentState = editorState.getCurrentContent();
      const selectionState = editorState.getSelection();

      handleChange(
        EditorState.push(editorState, Modifier.replaceText(currentContentState, selectionState, chars), 'undo')
      );

      return 'handled';
    };

    const activeBlockType = editorState
      .getCurrentContent()
      .getBlockForKey(editorState.getSelection().getStartKey())
      .getType();

    useEffect(() => {
      if (!activeBlockType || activeBlockType === 'unstyled') {
        handleChange(RichUtils.toggleBlockType(editorState, RichInputBlockTypes.TEXT));
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeBlockType]);

    return (
      <FieldContainer
        {...otherProps}
        containerClassName={clsx(variant === 'unset' && s.RichInput__unsetContainer)}
        disabled={disabled}
        variant="primary">
        <div
          id={editorContainerId}
          className={clsx(
            s.RichInput__container,
            {
              [s.RichInput__primary]: variant === 'primary',
              [s.RichInput__unset]: variant === 'unset',
              [s.RichInput__disabled]: disabled
            },
            containerClassName
          )}>
          <Editor
            {...editorProps}
            editorState={editorState}
            onChange={onChange}
            handleKeyCommand={handleKeyCommand}
            keyBindingFn={handleKeyBinding}
            blockStyleFn={blockStyleFn}
            handleBeforeInput={handleBeforeInput}
            placeholder={placeholder}
            ref={ref}
          />

          {!disabled && (
            <RichInputToolbar
              editorState={editorState}
              elementToListenScroll={elementToListenScroll}
              activeBlockType={activeBlockType}
              onChange={onChange}
            />
          )}
        </div>
      </FieldContainer>
    );
  }
);
