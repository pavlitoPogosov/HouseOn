import React from 'react';
import { useIntl } from 'react-intl';

import { Formik } from 'formik';
import moment from 'moment';
import * as Yup from 'yup';

// eslint-disable-next-line
import { useToggle } from '@proscom/ui-react';

import { ReactComponent as ArrowDiagonal } from 'assets/icons/arrowDiagonal.svg';
import { Fade } from 'common/components/ui/_animations/Fade/Fade';
import { TeamMemberShortenedCard } from 'common/components/ui/_cards/TeamMemberShortenedCard/TeamMemberShortenedCard';
import { AddCommentsBlockField } from 'common/components/ui/_formikComponents/AddCommentsBlockField/AddCommentsBlockField';
import { CheckListField } from 'common/components/ui/_formikComponents/CheckListField/CheckListField';
import { DateInputField } from 'common/components/ui/_formikComponents/DateInputField/DateInputField';
import { DropzoneField } from 'common/components/ui/_formikComponents/DropzoneField/DropzoneField';
import { DropzonePreviewField } from 'common/components/ui/_formikComponents/DropzonePreviewField/DropzonePreviewField';
import { ExtentedForm } from 'common/components/ui/_formikComponents/ExtentedForm/ExtentedForm';
import {
  PeriodicitySelectField,
  PeriodicitySelectFieldInitialValue
} from 'common/components/ui/_formikComponents/PeriodicitySelectField/PeriodicitySelectField';
import { SelectUsualField } from 'common/components/ui/_formikComponents/SelectField';
import { TextAreaField } from 'common/components/ui/_formikComponents/TextAreaField/TextAreaField';
import { ToggleSwitchField } from 'common/components/ui/_formikComponents/ToggleSwitchField/ToggleSwitchField';
import { Alert } from 'common/components/ui/Alert/Alert';
import { Button } from 'common/components/ui/Button/Button';
import { EDatepickerCalendarTypes } from 'common/components/ui/Datepicker/Datepicker';
import { IconCircle } from 'common/components/ui/IconCircle/IconCircle';
import { ISelectPrimaryOption } from 'common/components/ui/Select';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { CenteredPageLayout } from 'routes/_layouts/CenteredPageLayout/CenteredPageLayout';
import { TeamMemberType } from 'routes/houseTeam/HouseTeamViewMembers/tempData';
import { REQUIRED_FIELD_VALIDATION } from 'utils/formValidation/validationFields';
import { CHECKLIST_RECOMMENDED_OPTIONS } from 'variables/checklistRecommendedOptions';
// import { HouseholdCard } from 'common/components/ui/_cards/HouseholdCard/HouseholdCard';

import { TeamDialog } from './TeamDialog/TeamDialog';

import s from './CreateTaskPage.module.scss';

export interface CreateTaskPageProps {}

export enum CreateTaskFieldNames {
  ABOUT = 'about',
  CHECK_LIST = 'check_list',
  COMMENTS = 'comments',
  DEADLINE = 'deadline',
  FILES = 'files',
  IS_DEADLINE_ACTIVE = 'is_deadline_active',
  PERIODICITY = 'periodicity',
  PROJECT = 'project',
  TEAM_MEMBER = 'team_member'
}

export const CREATE_TASK_FORM_INITIAL_VALUES = {
  [CreateTaskFieldNames.ABOUT]: '',
  [CreateTaskFieldNames.PERIODICITY]: PeriodicitySelectFieldInitialValue,
  [CreateTaskFieldNames.DEADLINE]: { startDate: moment().startOf('day') },
  [CreateTaskFieldNames.TEAM_MEMBER]: null as TeamMemberType | null,
  [CreateTaskFieldNames.CHECK_LIST]: CHECKLIST_RECOMMENDED_OPTIONS,
  [CreateTaskFieldNames.PROJECT]: '',
  [CreateTaskFieldNames.FILES]: [],
  [CreateTaskFieldNames.IS_DEADLINE_ACTIVE]: false,
  [CreateTaskFieldNames.COMMENTS]: []
};
const CREATE_TASK_FORM_VALIDATION_SCHEMA = Yup.object().shape({
  [CreateTaskFieldNames.ABOUT]: REQUIRED_FIELD_VALIDATION,
  [CreateTaskFieldNames.PROJECT]: REQUIRED_FIELD_VALIDATION
});

const PROJECT_SELECT_OPTIONS: ISelectPrimaryOption[] = [
  { text: 'Some Project 1', value: '1' },
  { text: 'Some Project 2', value: '2' },
  { text: 'Some Project 3', value: '3' },
  { text: 'Some Project 4', value: '4' },
  { text: 'Some Project 5', value: '5' }
];

export const CreateTaskPage: React.FC<CreateTaskPageProps> = () => {
  const alertToggler = useToggle();
  const teamDialogToggler = useToggle();
  const recommendedDialogToggler = useToggle();
  const viewRecommendedToggler = useToggle();

  const intl = useIntl();

  const handleCreateTask = (values: typeof CREATE_TASK_FORM_INITIAL_VALUES) => {};

  return (
    <CenteredPageLayout>
      {/* FIX make this cmp */}

      {/* <HouseholdCard
        title="Create a task"
        selectText="Add to"
        avatarClassName={s.CreateTaskPage__avatar}
        avatarCmp={<ColorfulIcon icon={ColorfulIconTypes.TASK} className={s.CreateTaskPage__icon} />}
      /> */}

      <Formik
        initialValues={CREATE_TASK_FORM_INITIAL_VALUES}
        onSubmit={handleCreateTask}
        validationSchema={CREATE_TASK_FORM_VALIDATION_SCHEMA}>
        {({ values }) => (
          <ExtentedForm>
            <section className={s.CreateTaskPage__section}>
              <Text className={s.CreateTaskPage__title} text="About the task" variant={TextPropsVariantsEnum.H3} />

              <TextAreaField
                enableAutoSize
                fieldContainerProps={{
                  label: intl.formatMessage({
                    defaultMessage: 'Describe',
                    id: 'tasks.form.describe.label'
                  })
                }}
                maxLength={480}
                name={CreateTaskFieldNames.ABOUT}
                placeholder={intl.formatMessage({
                  defaultMessage: 'Example: “Clean up the floor pleasel”',
                  id: 'tasks.form.describe.placeholder'
                })}
              />
            </section>

            <section className={s.CreateTaskPage__section}>
              <Text
                className={s.CreateTaskPage__title}
                text={intl.formatMessage({ defaultMessage: 'Periodicity', id: 'tasks.periodicity.title' })}
                variant={TextPropsVariantsEnum.H3}
              />

              <PeriodicitySelectField name={CreateTaskFieldNames.PERIODICITY} />
            </section>

            <section className={s.CreateTaskPage__deadlineSection}>
              <div>
                <Text
                  text={intl.formatMessage({ defaultMessage: 'Deadline', id: 'tasks.deadline.title' })}
                  variant={TextPropsVariantsEnum.H3}
                />

                <ToggleSwitchField
                  containerClassName={s.CreateTaskPage__deadlineSwitch}
                  name={CreateTaskFieldNames.IS_DEADLINE_ACTIVE}
                />
              </div>

              {values[CreateTaskFieldNames.IS_DEADLINE_ACTIVE] && (
                <DateInputField
                  datepickerProps={{
                    disableRangeSelect: true,
                    disabledCalendars: [EDatepickerCalendarTypes.YEAR],
                    disabledTillDate: moment().startOf('day').subtract(1, 'day')
                  }}
                  fieldContainerProps={{ containerClassName: s.CreateTaskPage__dateInput }}
                  name={CreateTaskFieldNames.DEADLINE}
                />
              )}
            </section>

            <section className={s.CreateTaskPage__section}>
              <Text
                className={s.CreateTaskPage__title}
                text={intl.formatMessage({
                  defaultMessage: 'Required house team',
                  id: 'tasks.requiredHouseTeam.title'
                })}
                variant={TextPropsVariantsEnum.H3}
              />

              <TeamMemberShortenedCard
                avatar={values[CreateTaskFieldNames.TEAM_MEMBER]?.avatar || null}
                onClickEdit={teamDialogToggler.set}
                role={values[CreateTaskFieldNames.TEAM_MEMBER]?.role || null}
              />
            </section>

            <section className={s.CreateTaskPage__section}>
              <div className={s.CreateTaskPage__flexTitle}>
                <Text
                  className={s.CreateTaskPage__title}
                  text={intl.formatMessage({
                    defaultMessage: 'Checklist',
                    id: 'tasks.checklist.title'
                  })}
                  variant={TextPropsVariantsEnum.H3}
                />

                {viewRecommendedToggler.value && (
                  <Fade isActive>
                    <Button
                      color="orange"
                      onClick={recommendedDialogToggler.set}
                      size="s"
                      type="button"
                      variant="secondary">
                      {intl.formatMessage({
                        defaultMessage: 'View recommended',
                        id: 'tasks.checklist.button.viewRecommended'
                      })}
                    </Button>
                  </Fade>
                )}
              </div>

              <CheckListField
                name={CreateTaskFieldNames.CHECK_LIST}
                onDeleteRecommended={viewRecommendedToggler.set}
                onRecoverRecommended={viewRecommendedToggler.unset}
                recommendedDialogToggler={recommendedDialogToggler}
              />
            </section>

            <section className={s.CreateTaskPage__section}>
              <div className={s.CreateTaskPage__flexTitle}>
                <Text
                  className={s.CreateTaskPage__title}
                  text={intl.formatMessage({ defaultMessage: 'HouseData', id: 'tasks.houseData.title' })}
                  variant={TextPropsVariantsEnum.H3}
                />

                <IconCircle height={32} icon={<ArrowDiagonal />} shadow="l" width={32} />
              </div>

              {!alertToggler.value && (
                <Alert
                  color="gray"
                  containerClassName={s.CreateTaskPage__houseDataAlert}
                  onClose={alertToggler.set}
                  text={intl.formatMessage({
                    defaultMessage:
                      'There is a place where all data about the house  collects. You can open access to data or add some files so your house team could see it.',
                    id: 'tasks.houseData.alert.hintAboutTask'
                  })}
                />
              )}

              <DropzoneField
                className={s.CreateTaskPage__dropzone}
                excludeRepeats
                maxFiles={3}
                name={CreateTaskFieldNames.FILES}
              />

              <DropzonePreviewField isClosable name={CreateTaskFieldNames.FILES} />
            </section>

            <section className={s.CreateTaskPage__section}>
              <Text
                className={s.CreateTaskPage__title}
                text={intl.formatMessage({
                  defaultMessage: 'Assign to work',
                  id: 'houseTeam.assignWork.title'
                })}
                variant={TextPropsVariantsEnum.H3}
              />

              <SelectUsualField
                label={intl.formatMessage({
                  defaultMessage: 'Project',
                  id: 'tasks.project.label'
                })}
                name={CreateTaskFieldNames.PROJECT}
                options={PROJECT_SELECT_OPTIONS}
                placeholder={intl.formatMessage({
                  defaultMessage: 'Type or choose from the list',
                  id: 'tasks.project.placeholder'
                })}
              />
            </section>

            <section className={s.CreateTaskPage__section}>
              <Text
                className={s.CreateTaskPage__title}
                text={intl.formatMessage({ defaultMessage: 'Comments', id: 'tasks.comments.title' })}
                variant={TextPropsVariantsEnum.H3}
              />

              <AddCommentsBlockField name={CreateTaskFieldNames.COMMENTS} />
            </section>

            <div className={s.CreateTaskPage__controls}>
              <Button color="orange" type="button" variant="secondary">
                {intl.formatMessage({ defaultMessage: 'Cancel', id: 'app.button.cancel' })}
              </Button>

              <Button color="orange" type="submit">
                {intl.formatMessage({ defaultMessage: 'Save', id: 'app.button.save' })}
              </Button>
            </div>

            <TeamDialog isOpen={teamDialogToggler.value} onClose={teamDialogToggler.unset} />
          </ExtentedForm>
        )}
      </Formik>
    </CenteredPageLayout>
  );
};
