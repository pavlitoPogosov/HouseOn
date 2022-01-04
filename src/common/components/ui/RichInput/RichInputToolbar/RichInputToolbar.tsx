import React, { useEffect, useState } from 'react';

import { EditorState, RichUtils } from 'draft-js';

import { getToolbarStyles } from 'utils/draftJsUtils';

import { RichInputBlockTypes, RichInputInlineStyles } from '../RichInput';

import { RichInputSelect } from './RichInputSelect/RichInputSelect';
import { RichInputStylesControls } from './RichInputStylesControls/RichInputStylesControls';

import s from './RichInputToolbar.module.scss';

export interface RichInputToolbarProps {
  editorState: EditorState;
  elementToListenScroll: HTMLElement | null | undefined | typeof window;
  activeBlockType: string;
  onChange: (EditorState: EditorState) => void;
}

export const RichInputToolbar: React.FC<RichInputToolbarProps> = ({
  editorState,
  activeBlockType,
  elementToListenScroll,
  onChange
}) => {
  const [containerStyles, setContainerStyles] = useState<React.CSSProperties>({});

  const handleInlineStyleToggle = (inlineStyle: RichInputInlineStyles) => {
    onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const handleBlockTypeToggle = (blockType: RichInputBlockTypes) => {
    onChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  useEffect(() => {
    const handleScroll = () => setContainerStyles(getToolbarStyles(editorState, elementToListenScroll));
    elementToListenScroll?.addEventListener('scroll', handleScroll);

    return () => {
      elementToListenScroll?.removeEventListener('scroll', handleScroll);
    };
  }, [elementToListenScroll, editorState]);

  useEffect(() => {
    setContainerStyles(getToolbarStyles(editorState));
  }, [editorState]);

  return (
    <div className={s.RichInputToolbar__container} style={containerStyles}>
      <RichInputStylesControls currentStyle={editorState.getCurrentInlineStyle()} onSelect={handleInlineStyleToggle} />

      <div className={s.RichInputToolbar__divider} />

      <RichInputSelect activeBlockType={activeBlockType} onSelect={handleBlockTypeToggle} />
    </div>
  );
};
