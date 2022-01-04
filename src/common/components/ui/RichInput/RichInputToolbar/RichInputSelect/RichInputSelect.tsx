import React, { useMemo, useRef, useState } from 'react';

import clsx from 'clsx';

import { useClickOutside } from '@proscom/ui-react';
import { ReactComponent as ChevronDownIcon } from 'assets/icons/chevronDown.svg';

import { RichInputBlockTypes } from '../../RichInput';

import s from './RichInputSelect.module.scss';

type SelectControl = {
  label: string;
  blockType: RichInputBlockTypes;
};

interface RichInputSelectProps {
  activeBlockType: string;
  onSelect: (blockType: RichInputBlockTypes) => void;
}

export const RichInputSelect: React.FC<RichInputSelectProps> = ({ activeBlockType, onSelect }) => {
  const selectControls: SelectControl[] = useMemo(() => {
    return [
      { label: 'Headline', blockType: RichInputBlockTypes.HEADLINE },
      { label: 'Text', blockType: RichInputBlockTypes.TEXT },
      { label: 'Caption', blockType: RichInputBlockTypes.CAPTION }
    ];
  }, []);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleControlSelect = (control: SelectControl) => {
    return (e: React.MouseEvent) => {
      e.preventDefault();

      setIsOpen(false);
      onSelect(control.blockType);
    };
  };

  const handleToggleSelect = (e: MouseEvent | React.MouseEvent) => {
    e.preventDefault();
    setIsOpen((prev) => !prev);
  };

  useClickOutside(containerRef, isOpen ? handleToggleSelect : null);

  return (
    <div ref={containerRef} className={s.RichInputSelect__container}>
      <div className={s.RichInputSelect__selected} onMouseDown={handleToggleSelect}>
        {selectControls.find((control) => control.blockType === activeBlockType)?.label}

        <ChevronDownIcon className={clsx(s.RichInputSelect__icon, !isOpen && s.up)} />
      </div>

      {isOpen && (
        <div className={s.RichInputSelect__dropdown}>
          {selectControls.map((control) => (
            <div
              className={clsx(s.RichInputSelect__control, control.blockType === activeBlockType && s.active)}
              key={control.label}
              onMouseDown={handleControlSelect(control)}>
              {control.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
