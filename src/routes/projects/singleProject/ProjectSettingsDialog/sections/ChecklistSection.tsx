import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';

import { useFormikContext } from 'formik';

import { useToggle } from '@proscom/ui-react';
import { Alert } from 'common/components/ui/Alert/Alert';
import { CheckList, ICheckListOption } from 'common/components/ui/CheckList/CheckList';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { ESettingsFormFieldsTypes } from 'routes/projects/singleProject/ProjectSettingsDialog/types';
import { CHECKLIST_RECOMMENDED_OPTIONS } from 'variables/checklistRecommendedOptions';

import s from './styles.module.scss';

type TChecklistSection = {};

export const ChecklistSection: React.FC<TChecklistSection> = (props) => {
  const {} = props;

  const [checkListOptions, setCheckListOptions] = useState<ICheckListOption[]>(CHECKLIST_RECOMMENDED_OPTIONS);

  const intl = useIntl();

  const alertToggler = useToggle();
  const recommendedDialogToggler = useToggle();
  const checklistBtnToggler = useToggle();

  const { errors, isValid, setFieldValue, validateForm, values } = useFormikContext();

  useEffect(() => {
    setFieldValue(ESettingsFormFieldsTypes.CHECKLIST, checkListOptions);
  }, [checkListOptions]);

  return (
    <>
      <Text
        className={s.ChecklistSection__title}
        text={intl.formatMessage({ defaultMessage: 'Checklist', id: 'project.settings.form.checklist.title' })}
        variant={TextPropsVariantsEnum.H3}
      />

      {!alertToggler.value && (
        <Alert
          color="gray"
          containerClassName={s.ChecklistSection__alert}
          onClose={alertToggler.toggle}
          text={intl.formatMessage(
            {
              defaultMessage:
                'This is a checklist recommended by {houseOwner}. You can make your own list or change current',
              id: 'project.settings.form.checklist.alert'
            },
            { houseOwner: 'Albert' }
          )}
        />
      )}

      <CheckList
        hideViewClassName={s.ChecklistSection__checkList_hideView}
        isAddNew={false}
        onChange={setCheckListOptions}
        onDeleteRecommended={checklistBtnToggler.set}
        onRecoverRecommended={checklistBtnToggler.unset}
        options={checkListOptions}
        recommendedDialogToggler={recommendedDialogToggler}
      />
    </>
  );
};

/*

<CustomAccordion
      containerClassName={s.ChecklistSection__accordion}
      headerClassName={s.ChecklistSection__accordion_header}
      headerIconClassName={s.ChecklistSection__accordion_header_icon}
      title={
        intl.formatMessage({
          defaultMessage: 'Checklist',
          id: 'project.settings.form.checklist.title'
        })
      }
      toggleableClassName={s.ChecklistSection__accordion_toggleable}
      toggleableProps={{ isInitialOpen: true, }}
    >
      <div className={s.ChecklistSection__list}>
        {
          !alertToggler.value && (
            <Alert
              color="gray"
              containerClassName={s.ChecklistSection__alert}
              onClose={alertToggler.toggle}
              text={
                intl.formatMessage({
                  defaultMessage:
                    'This is a checklist recommended by {houseOwner}. You can make your own list or change current',
                  id: 'project.settings.form.checklist.alert'
                },
                { houseOwner: 'Albert' })
              }
            />
          )
        }

        <CheckList
          hideViewClassName={s.ChecklistSection__checkList_hideView}
          // initialOpen
          isAddNew={false}
          onChange={setCheckListOptions}
          onDeleteRecommended={checklistBtnToggler.set}
          onRecoverRecommended={checklistBtnToggler.unset}
          options={checkListOptions}
          recommendedDialogToggler={recommendedDialogToggler}
        />
      </div>
    </CustomAccordion>

 */
