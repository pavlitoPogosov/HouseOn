import React, { useRef } from 'react';

import { useClickOutside, useToggle } from '@proscom/ui-react';
import { useInput } from 'common/hooks/useInput';

import { ICheckListOption } from '../CheckList';
import { CheckListOption } from '../CheckListOption/CheckListOption';

import s from './CheckListAdd.module.scss';

export interface CheckListAddProps {
  isHideCheckbox?: boolean;
  onClose: () => void;
  onAddNew: (option: ICheckListOption) => void;
}

export const CheckListAdd: React.FC<CheckListAddProps> = ({ isHideCheckbox, onClose, onAddNew }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [inputValue, setInputValue] = useInput();
  const isCheckedToggler = useToggle();

  const handleAddOption = () => {
    onAddNew({
      id: Date.now(),
      isChecked: isCheckedToggler.value,
      text: inputValue.trim(),
      isRecommended: false
    });
  };

  const handleClickOutside = () => {
    if (inputValue.trim()) {
      handleAddOption();
    }

    onClose();
  };

  useClickOutside(containerRef, handleClickOutside);

  return (
    <CheckListOption
      containerClassName={s.CheckListAdd}
      text=""
      isChecked={isCheckedToggler.value}
      onToggleIsChecked={isCheckedToggler.toggle}
      onDelete={onClose}
      ref={containerRef}
      isHideCheckbox={isHideCheckbox}
    >
      <input
        placeholder="Type..."
        onChange={setInputValue}
        className={s.CheckListAdd__input}
        value={inputValue}
        autoFocus
      />
    </CheckListOption>
  );
};
