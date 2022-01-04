import React, { useState } from 'react';

import { xorBy } from 'lodash';

import { Button } from 'common/components/ui/Button/Button';
import { ICheckListOption } from 'common/components/ui/CheckList/CheckList';
import { CheckListRecommendOption } from 'common/components/ui/CheckList/CheckListRecommendOption/CheckListRecommendOption';
import { ColorfulIconTypes } from 'common/components/ui/ColorfulIcon/ColorfulIcon';
import { Dialog } from 'common/components/ui/Dialog/Dialog';
import { CHECKLIST_RECOMMENDED_OPTIONS } from 'variables/checklistRecommendedOptions';

import s from './ChecklistRecommendedDialog.module.scss';

export interface ChecklistRecommendedDialogProps {
  isOpen: boolean;
  checklistChosenOptions: ICheckListOption[];

  onClose: () => void;
  onSave: (selectedOptions: ICheckListOption[], addedAllPossible: boolean) => void;
}

export const ChecklistRecommendedDialog: React.FC<ChecklistRecommendedDialogProps> = ({
  isOpen,
  checklistChosenOptions,
  onClose,
  onSave
}) => {
  const [selectedOptions, setSelectedOptions] = useState<ICheckListOption[]>([]);
  const recommendedOptionsToAdd = xorBy(
    CHECKLIST_RECOMMENDED_OPTIONS,
    checklistChosenOptions.filter((opt) => opt.isRecommended),
    'id'
  );

  const handleOptionSelect = (option: ICheckListOption) => {
    return () => {
      setSelectedOptions((prev) => {
        if (prev.find((prevSelected) => prevSelected.id === option.id)) {
          return prev.filter((prevSelected) => prevSelected.id !== option.id);
        }

        return [option, ...prev];
      });
    };
  };

  const handleOptionsSave = () => {
    setSelectedOptions([]);
    onSave(selectedOptions, selectedOptions.length === recommendedOptionsToAdd.length);
    onClose();
  };

  return (
    <Dialog
      title="Recommended checklist"
      isOpen={isOpen}
      onClose={onClose}
      counterBadgeNumber={7}
      icon={ColorfulIconTypes.CHECKLIST}
      blackoutClassName={s.ChecklistRecommendedDialog__blackout}
      disableOverflowControl>
      <div className={s.ChecklistRecommendedDialog__content}>
        {recommendedOptionsToAdd.map((opt) => (
          <CheckListRecommendOption
            key={opt.id}
            text={opt.text}
            containerClassName={s.ChecklistRecommendedDialog__option}
            onSelect={handleOptionSelect(opt)}
            isSelected={!!selectedOptions.find((selected) => selected.id === opt.id)}
          />
        ))}

        {!!selectedOptions.length && (
          <Button
            onClick={handleOptionsSave}
            color="orange"
            variant="primary"
            className={s.ChecklistRecommendedDialog__btn}>
            Save
          </Button>
        )}
      </div>
    </Dialog>
  );
};
