import React, { useState } from 'react';

import { useToggle } from '@proscom/ui-react';
import { CheckList, ICheckListOption } from 'common/components/ui/CheckList/CheckList';
import { CHECKLIST_RECOMMENDED_OPTIONS } from 'variables/checklistRecommendedOptions';

export interface ChecklistFieldProps {
  isHideCheckbox?: boolean;
  isAddNew?: boolean;
  isHideRemove?: boolean;
}

export const ChecklistField: React.FC<ChecklistFieldProps> = (props) => {
  const { isHideCheckbox, isAddNew = true, isHideRemove } = props;

  const [checkListOptions, setCheckListOptions] = useState<ICheckListOption[]>(CHECKLIST_RECOMMENDED_OPTIONS);
  const recommendedDialogToggler = useToggle();
  const checklistBtnToggler = useToggle();

  return (
    <CheckList
      options={checkListOptions}
      onChange={setCheckListOptions}
      recommendedDialogToggler={recommendedDialogToggler}
      onDeleteRecommended={checklistBtnToggler.set}
      onRecoverRecommended={checklistBtnToggler.unset}
      isHideCheckbox={isHideCheckbox}
      isAddNew={isAddNew}
      isHideRemove={isHideRemove}
    />
  );
};
