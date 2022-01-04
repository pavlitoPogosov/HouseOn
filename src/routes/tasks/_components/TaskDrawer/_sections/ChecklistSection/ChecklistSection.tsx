import React, { useState } from 'react';
import { useIntl } from 'react-intl';

import { useToggle } from '@proscom/ui-react';
import { Fade } from 'common/components/ui/_animations/Fade/Fade';
import { Alert } from 'common/components/ui/Alert/Alert';
import { Button } from 'common/components/ui/Button/Button';
import { CheckList, ICheckListOption } from 'common/components/ui/CheckList/CheckList';
import { CHECKLIST_RECOMMENDED_OPTIONS } from 'variables/checklistRecommendedOptions';

import { SectionWrapper } from '../SectionWrapper/SectionWrapper';

import s from './ChecklistSection.module.scss';

export interface ChecklistSectionProps {}

export const ChecklistSection: React.FC<ChecklistSectionProps> = () => {
  const [checkListOptions, setCheckListOptions] = useState<ICheckListOption[]>(CHECKLIST_RECOMMENDED_OPTIONS);

  const intl = useIntl();

  const alertToggler = useToggle();
  const recommendedDialogToggler = useToggle();
  const checklistBtnToggler = useToggle();

  return (
    <SectionWrapper
      title={intl.formatMessage({ id: 'tasks.checklist.title', defaultMessage: 'Checklist' })}
      titleCmp={
        checklistBtnToggler.value ? (
          <Fade isActive>
            <Button color="orange" variant="secondary" size="s" onClick={recommendedDialogToggler.set}>
              {intl.formatMessage({
                id: 'tasks.checklist.button.viewRecommended',
                defaultMessage: 'View recommended'
              })}
            </Button>
          </Fade>
        ) : undefined
      }>
      {!alertToggler.value && (
        <Alert
          text={intl.formatMessage(
            {
              id: 'tasks.checklist.alert',
              defaultMessage:
                'This is a checklist recommended by {houseOwner}. You can make your own list or change current'
            },
            { houseOwner: 'Albert' }
          )}
          color="gray"
          onClose={alertToggler.toggle}
          containerClassName={s.ChecklistSection__alert}
        />
      )}

      <CheckList
        options={checkListOptions}
        onChange={setCheckListOptions}
        recommendedDialogToggler={recommendedDialogToggler}
        onDeleteRecommended={checklistBtnToggler.set}
        onRecoverRecommended={checklistBtnToggler.unset}
      />
    </SectionWrapper>
  );
};
