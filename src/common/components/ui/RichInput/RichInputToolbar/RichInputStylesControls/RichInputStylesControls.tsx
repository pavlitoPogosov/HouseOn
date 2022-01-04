import React, { useMemo } from 'react';

import { DraftInlineStyle } from 'draft-js';

import { IconButton } from 'common/components/ui/IconButton/IconButton';

import { RichInputInlineStyles } from '../../RichInput';

import { ReactComponent as BoldIcon } from './icons/bold.svg';
import { ReactComponent as StrikeThroughIcon } from './icons/strikeThrough.svg';
import { ReactComponent as UnderlineIcon } from './icons/underline.svg';

import s from './RichInputStylesControls.module.scss';

type InlineStyleControl = {
  label: React.ReactNode;
  style: RichInputInlineStyles;
};

export interface RichInputStylesControlsProps {
  currentStyle: DraftInlineStyle;
  onSelect: (inlineStyle: RichInputInlineStyles) => void;
}

export const RichInputStylesControls: React.FC<RichInputStylesControlsProps> = ({ currentStyle, onSelect }) => {
  const inlineControls: InlineStyleControl[] = useMemo(() => {
    return [
      {
        label: <BoldIcon />,
        style: RichInputInlineStyles.BOLD
      },
      {
        label: <span className={s.RichInputControls__italic}>&iexcl;</span>,
        style: RichInputInlineStyles.ITALIC
      },
      {
        label: <UnderlineIcon />,
        style: RichInputInlineStyles.UNDERLINE
      },
      {
        label: <StrikeThroughIcon />,
        style: RichInputInlineStyles.STRIKETHROUGH
      }
    ];
  }, []);

  const handleControlSelect = (inlineStyle: RichInputInlineStyles) => {
    return (e: React.MouseEvent) => {
      e.preventDefault();
      onSelect(inlineStyle);
    };
  };

  return (
    <>
      {inlineControls.map((control) => (
        <IconButton
          key={control.style}
          onMouseDown={handleControlSelect(control.style)}
          isSelected={currentStyle.has(control.style)}
          className={s.RichInputControls__control}>
          {control.label}
        </IconButton>
      ))}
    </>
  );
};
