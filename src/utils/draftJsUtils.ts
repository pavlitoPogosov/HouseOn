import React from 'react';

import { convertFromRaw, convertToRaw, EditorState, SelectionState } from 'draft-js';

export const getWindowSelectionRange = () => {
  const selection = window.getSelection();

  if (!selection || (selection && selection.rangeCount === 0)) {
    return null;
  }

  return selection.getRangeAt(0);
};

export const getEditorSelectedText = (editorState: EditorState): string => {
  const selectionState = editorState.getSelection();
  const anchorKey = selectionState.getAnchorKey();
  const currentContent = editorState.getCurrentContent();
  const currentContentBlock = currentContent.getBlockForKey(anchorKey);
  const start = selectionState.getStartOffset();
  const end = selectionState.getEndOffset();

  return currentContentBlock.getText().slice(start, end);
};

export const getToolbarStyles = (
  editorState: EditorState,
  elementToListenScroll?: HTMLElement | null | typeof window
): React.CSSProperties => {
  const hasFocus = editorState.getSelection().getHasFocus();
  const hasSelectedText = Boolean(getEditorSelectedText(editorState).trim());

  if (hasFocus && hasSelectedText) {
    const windowSelection = getWindowSelectionRange();
    const rangeBounds = windowSelection?.getBoundingClientRect();

    if (!rangeBounds) {
      return { display: 'none' };
    }

    let { left, top, bottom, right } = rangeBounds;
    let display = 'flex';

    // 20 is a half of toolbar height
    top = top + 20;

    const isOutOfViewPort = rangeBounds.left + 230 > window.innerWidth;
    let isOutOfScrollElementTop = false;
    let isOutOfScrollElementBottom = false;

    if (elementToListenScroll && elementToListenScroll !== window) {
      const el = elementToListenScroll as HTMLElement;
      isOutOfScrollElementTop = Boolean(el && el.getBoundingClientRect().top >= top);
      isOutOfScrollElementBottom = Boolean(el && el.getBoundingClientRect().bottom <= bottom + 40);
    }

    if (elementToListenScroll && elementToListenScroll === window) {
      const isInWindowViewPort = top >= 0 && left >= 0 && right <= window.innerWidth && bottom <= window.innerHeight;

      if (!isInWindowViewPort) {
        isOutOfScrollElementTop = true;
        isOutOfScrollElementBottom = true;
      }
    }

    if (isOutOfViewPort) {
      left = window.innerWidth - 230;
    }

    if (isOutOfScrollElementTop || isOutOfScrollElementBottom) {
      display = 'none';
    }

    return {
      display,
      top,
      left
    };
  }

  return {
    display: 'none'
  };
};

export const getDraftJsStateWithCursorAtEnd = (editorState: EditorState): EditorState => {
  const content = editorState.getCurrentContent();
  const blockMap = content.getBlockMap();

  const key = blockMap.last().getKey();
  const length = blockMap.last().getLength();

  const selection = new SelectionState({
    anchorKey: key,
    anchorOffset: length,
    focusKey: key,
    focusOffset: length
  });

  return EditorState.forceSelection(editorState, selection);
};

export const getDraftJsStateFromJSON = (json: string) => {
  return EditorState.createWithContent(convertFromRaw(JSON.parse(json)));
};

export const covertDraftJsStateToJSON = (editorState: EditorState) => {
  return JSON.stringify(convertToRaw(editorState.getCurrentContent()));
};
