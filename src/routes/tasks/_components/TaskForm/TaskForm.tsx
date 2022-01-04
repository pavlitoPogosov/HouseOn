import React, { useState } from 'react';
import { useIntl } from 'react-intl';

import clsx from 'clsx';
import { Formik } from 'formik';

import { useToggle } from '@proscom/ui-react';
import { ReactComponent as DownloadIcon } from 'assets/icons/download.svg';
import { ReactComponent as EyeIcon } from 'assets/icons/eye.svg';
import { ExtentedForm } from 'common/components/ui/_formikComponents/ExtentedForm/ExtentedForm';
import { InputField } from 'common/components/ui/_formikComponents/InputField/InputField';
import { SelectUsualField } from 'common/components/ui/_formikComponents/SelectField';
import { ToggleSwitchField } from 'common/components/ui/_formikComponents/ToggleSwitchField/ToggleSwitchField';
import { ColorfulIcon, ColorfulIconTypes, ColorfulIconVariants } from 'common/components/ui/ColorfulIcon/ColorfulIcon';
import { NavigationLink } from 'common/components/ui/NavigationLink/NavigationLink';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { TextArea } from 'common/components/ui/TextArea/TextArea';
import { moveInputCaretToEnd } from 'common/components/utils/moveInputCaretToEnd';
import { TeamMemberType } from 'routes/houseTeam/HouseTeamViewMembers/tempData';
import { FormNotification } from 'routes/tasks/_components/FormNotification/FormNotification';
import { ChecklistField } from 'routes/tasks/_components/TaskForm/ChecklistField/ChecklistField';
import { DeadlineField } from 'routes/tasks/_components/TaskForm/DeadlineField/DeadlineField';
import { ScheduleField } from 'routes/tasks/_components/TaskForm/ScheduleField/ScheduleField';
import { TeamSelectField } from 'routes/tasks/_components/TaskForm/TeamSelectField/TeamSelectField';

import s from './TaskForm.module.scss';

export enum TaskFormFieldNames {
  NAME = 'name',
  DESCRIBE = 'describe',
  MEMBER = 'member',
  PROJECT = 'project',
  IS_HIGH_PRIORITY = 'is-high-priority',
  DEADLINE = 'deadline'
}

export const TASK_FORM_INITIAL_VALUES = {
  [TaskFormFieldNames.NAME]: '',
  [TaskFormFieldNames.DESCRIBE]: '',
  [TaskFormFieldNames.MEMBER]: '',
  [TaskFormFieldNames.PROJECT]: '',
  [TaskFormFieldNames.IS_HIGH_PRIORITY]: false,
  [TaskFormFieldNames.DEADLINE]: false
};

const PROJECTS_OPTIONS = [
  { text: 'Project 1', value: 'Project 1' },
  { text: 'Project 2', value: 'Project 2' },
  { text: 'Project 3', value: 'Project 3' },
  { text: 'Project 4', value: 'Project 4' }
];

export interface TaskFormProps {
  initialValues?: typeof TASK_FORM_INITIAL_VALUES;
  isEdit?: boolean;
}

export const TaskForm: React.FC<TaskFormProps> = (props) => {
  const { initialValues, isEdit } = props;

  const intl = useIntl();
  const [selectedTeamMember, setSelectedTeamMember] = useState<TeamMemberType | null>(null);

  const dialogToggler = useToggle();

  const onSubmit = (values: typeof TASK_FORM_INITIAL_VALUES) => console.log(values);

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues ?? TASK_FORM_INITIAL_VALUES}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={onSubmit}>
      <ExtentedForm>
        <div className={clsx(s.TaskForm__block, s.TaskForm__block_pt)}>
          <Text variant={TextPropsVariantsEnum.BODY_L} className={s.TaskForm__title}>
            About the task
          </Text>
          <div className={clsx(s.TaskForm__formControl)}>
            <InputField
              name={TaskFormFieldNames.NAME}
              onFocus={moveInputCaretToEnd}
              fieldContainerProps={{
                label: intl.formatMessage({
                  id: 'tasks.form.name.label',
                  defaultMessage: 'Name'
                })
              }}
              autoFocus
            />
          </div>
          <div className={clsx(s.TaskForm__formControl, s.TaskForm__formControl_last)}>
            <TextArea
              onFocus={moveInputCaretToEnd}
              fieldContainerProps={{
                label: intl.formatMessage({
                  id: 'tasks.form.describe.label',
                  defaultMessage: 'Describe'
                })
              }}
              enableAutoSize
            />
          </div>
        </div>
        <div className={s.TaskForm__block}>
          <Text variant={TextPropsVariantsEnum.BODY_L} className={s.TaskForm__title}>
            Required house team
          </Text>
          <TeamSelectField
            dialogToggler={dialogToggler}
            selectedTeamMember={selectedTeamMember}
            setSelectedTeamMember={setSelectedTeamMember}
          />
        </div>
        <div className={s.TaskForm__block}>
          <Text variant={TextPropsVariantsEnum.BODY_L} className={s.TaskForm__title}>
            Assing to work
          </Text>
          <div className={clsx(s.TaskForm__formControl, s.TaskForm__formControl_last)}>
            <SelectUsualField
              name={TaskFormFieldNames.PROJECT}
              options={PROJECTS_OPTIONS}
              label={intl.formatMessage({
                id: 'tasks.form.project.label',
                defaultMessage: 'Project'
              })}
              placeholder={intl.formatMessage({
                id: 'tasks.form.project.placeholder',
                defaultMessage: 'Type or choose from the list'
              })}
            />
          </div>
        </div>
        <div className={s.TaskForm__block}>
          <div className={s.TaskForm__row}>
            <ColorfulIcon
              className={s.TaskForm__mr}
              icon={ColorfulIconTypes.LIGHTNING}
              variant={ColorfulIconVariants.ORANGE}
            />
            <Text variant={TextPropsVariantsEnum.BODY_M} className={s.TaskForm__mr}>
              {intl.formatMessage({ id: 'tasks.highPriority', defaultMessage: 'High priority' })}
            </Text>
            <ToggleSwitchField name={TaskFormFieldNames.IS_HIGH_PRIORITY} />
          </div>
        </div>
        <div className={s.TaskForm__block}>
          <Text variant={TextPropsVariantsEnum.BODY_L} className={s.TaskForm__title}>
            Schedule
          </Text>
          <FormNotification>
            <Text variant={TextPropsVariantsEnum.BODY_M} color="textSecondary">
              We recommend that you complete this task every week based on the size of your home.
            </Text>
          </FormNotification>
          <ScheduleField />
        </div>
        <div className={s.TaskForm__block}>
          <DeadlineField />
        </div>
        <div className={s.TaskForm__block}>
          <Text as="div" variant={TextPropsVariantsEnum.BODY_L} className={s.TaskForm__title}>
            Сhecklist
          </Text>
          <FormNotification>
            <Text variant={TextPropsVariantsEnum.BODY_M} color="textSecondary">
              There is checklist is recommended by Albert. You can make yours list, or change current.
            </Text>
          </FormNotification>
          <ChecklistField isHideCheckbox />
        </div>
        <div className={s.TaskForm__block}>
          <Text variant={TextPropsVariantsEnum.BODY_L} className={s.TaskForm__title}>
            House Data
          </Text>
          <FormNotification>
            <Text variant={TextPropsVariantsEnum.BODY_M} color="textSecondary">
              There is HouseData which is linked to the project. You can close access to some of them by breaking the
              link icon or keep them visible in this task
            </Text>
          </FormNotification>
          <div className={s.TaskForm__houseData}>
            <NavigationLink
              as="div"
              icon={<DownloadIcon />}
              className={clsx(s.TaskForm__houseDataLink, s.TaskForm__mr)}
              isUnderline>
              {intl.formatMessage({
                id: 'tasks.houseData.button.upload',
                defaultMessage: 'Upload image'
              })}
            </NavigationLink>
            <Text className={s.TaskForm__mr} variant={TextPropsVariantsEnum.BODY_M} color="textSecondary">
              or
            </Text>
            <NavigationLink as="div" icon={<EyeIcon />} className={s.TaskForm__houseDataLink} isUnderline>
              {intl.formatMessage({
                id: 'tasks.houseData.button.select',
                defaultMessage: 'Select more from HouseData'
              })}
            </NavigationLink>
          </div>
        </div>
      </ExtentedForm>
    </Formik>
  );
};
