import React, { useCallback, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import clsx from 'clsx';
import update from 'immutability-helper';

import { useToggle } from '@proscom/ui-react';
import { ReactComponent as ChevronDownIcon } from 'assets/icons/chevronDown.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import { ChecklistRecommendedDialog } from '../_dialogs/ChecklistRecommendedDialog/ChecklistRecommendedDialog';

import { CheckListAdd } from './CheckListAdd/CheckListAdd';
import { CheckListOptionDnd } from './CheckListOption/CheckListOptionDnd';

import s from './CheckList.module.scss';

export interface ICheckListOption {
  id: number;
  isChecked: boolean;
  isRecommended: boolean;
  text: string;
}

export interface ICheckListProps {
  containerClassName?: string;
  hideViewClassName?: string;
  initialOpen?: boolean;
  isAddNew?: boolean;
  isHideCheckbox?: boolean;
  isHideRemove?: boolean;
  maxShownOptions?: number;
  onChange: (options: ICheckListOption[]) => void;
  onDeleteRecommended?: () => void;
  onRecoverRecommended?: () => void;
  options: ICheckListOption[];
  recommendedDialogToggler?: {
    set: () => void;
    unset: () => void;
    value: boolean;
  };
}

export const CheckList: React.FC<ICheckListProps> = (props) => {
  const {
    containerClassName,
    hideViewClassName,
    initialOpen = false,
    isAddNew = true,
    maxShownOptions = 4,
    onChange,
    onDeleteRecommended,
    onRecoverRecommended,
    options,
    recommendedDialogToggler,
    isHideCheckbox,
    isHideRemove
  } = props;

  const addOptionToggler = useToggle();
  const [open, setOpen] = useState(initialOpen);

  const onToggleHandler = () => {
    setOpen(!open);
  };

  const handleOptionDelete = useCallback(
    (deletedOption: ICheckListOption) => {
      return () => {
        onChange(options.filter((opt) => opt.id !== deletedOption.id));

        if (onDeleteRecommended && deletedOption.isRecommended) {
          onDeleteRecommended();
        }
      };
    },
    [onChange, options, onDeleteRecommended]
  );

  const handleOptionIsCheckedToggle = useCallback(
    (toggledOption: ICheckListOption) => {
      return () => {
        onChange(
          options.map((opt) =>
            opt.id !== toggledOption.id
              ? opt
              : {
                  ...opt,
                  isChecked: !opt.isChecked
                }
          )
        );
      };
    },
    [onChange, options]
  );

  const handleRecommendedOptionsSave = (addedOptions: ICheckListOption[], addedAllPossible: boolean) => {
    onChange([...addedOptions, ...options]);

    if (addedAllPossible && onRecoverRecommended) {
      onRecoverRecommended();
    }
  };

  const handleAddNew = (newOption: ICheckListOption) => {
    onChange([newOption, ...options]);
  };

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = options[dragIndex];
      const newCards = update(options, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard]
        ]
      });

      onChange(newCards);
    },
    [options, onChange]
  );

  const hideRule = open ? options.length : maxShownOptions;

  return (
    <>
      <div className={clsx(s.CheckList__container, containerClassName)}>
        <DndProvider backend={HTML5Backend}>
          <div className={s.CheckList__content}>
            {isAddNew && (
              <div className={s.CheckList__addButton} onClick={addOptionToggler.set}>
                <div className={s.CheckList__addButton_icon}>
                  <PlusIcon />
                </div>
                <Text variant={TextPropsVariantsEnum.BODY_M} color="textTretiary">
                  Add a new
                </Text>
              </div>
            )}
            {isAddNew && addOptionToggler.value && (
              <CheckListAdd onAddNew={handleAddNew} onClose={addOptionToggler.unset} isHideCheckbox={isHideCheckbox} />
            )}
            {options?.map((opt, index) => {
              const isHidden = index >= hideRule;

              return (
                <CheckListOptionDnd
                  containerClassName={s.CheckList__option}
                  id={opt.id}
                  index={index}
                  isChecked={opt.isChecked}
                  isHidden={isHidden}
                  key={opt.id}
                  moveCard={moveCard}
                  onDelete={handleOptionDelete(opt)}
                  onToggleIsChecked={handleOptionIsCheckedToggle(opt)}
                  text={opt.text}
                  isHideCheckbox={isHideCheckbox}
                  isHideRemove={isHideRemove}
                />
              );
            })}
          </div>
        </DndProvider>

        <div className={s.CheckList__footer}>
          {options.length > maxShownOptions && (
            <div className={clsx(s.CheckList__link, hideViewClassName)} onClick={onToggleHandler}>
              {open ? 'Hide all' : 'Show all'}

              <ChevronDownIcon className={clsx(s.CheckList__chevronIcon, open && s.rotate)} />
            </div>
          )}
        </div>
      </div>

      {recommendedDialogToggler && (
        <ChecklistRecommendedDialog
          checklistChosenOptions={options}
          isOpen={recommendedDialogToggler.value}
          onClose={recommendedDialogToggler.unset}
          onSave={handleRecommendedOptionsSave}
        />
      )}
    </>
  );
};
