import React, { useRef } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';

import clsx from 'clsx';
import { Formik, FormikProps } from 'formik';
import { isNull } from 'lodash';
import moment from 'moment';
import * as Yup from 'yup';

import { ReactComponent as ChevronRightIcon } from 'assets/icons/chevronRight.svg';
import { ReactComponent as Rectangle } from 'assets/icons/rectangle.svg';
import { StatusBadge } from 'common/components/ui/_badges/StatusBadge/StatusBadge';
import { getRightStatusType } from 'common/components/ui/_cards/ProjectCard/getRightStatusType';
import { IProject } from 'common/components/ui/_cards/ProjectCard/types';
import { DialogSelectMembers } from 'common/components/ui/_dialogs/TeamSelectDialog/DialogSelectMembers/DialogSelectMembers';
import { ExtentedForm } from 'common/components/ui/_formikComponents/ExtentedForm/ExtentedForm';
import { InputField } from 'common/components/ui/_formikComponents/InputField/InputField';
import { TextAreaField } from 'common/components/ui/_formikComponents/TextAreaField/TextAreaField';
import { TimeInputField } from 'common/components/ui/_formikComponents/TimeInputField/TimeInputField';
import { Avatar } from 'common/components/ui/Avatar/Avatar';
import { Button } from 'common/components/ui/Button';
import { Input } from 'common/components/ui/Input/Input';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { TeamMemberType } from 'routes/houseTeam/HouseTeamViewMembers/tempData';
import { isProjectOrTaskPaused } from 'routes/projects/singleProject/isProjectOrTaskPaused';
import { REQUIRED_FIELD_VALIDATION } from 'utils/formValidation/validationFields';
import { mergeRefs } from 'utils/mergeRefs';

import { AdminsOrGuestsSelect } from '../AdminsOrGuestsSelect/AdminsOrGuestsSelect';
import { ModalTypes } from '../QuickProjectDialog';

import s from './ProjectForm.module.scss';

export enum ProjectFormFieldNames {
  ADMINS_OR_GUESTS = 'admin_or_guest',
  DESCRIPTION = 'description',
  PLACE = 'place',
  TEAM_MEMBER = 'team_member',
  TIME = 'time'
}

export const PROJECT_FORM_INITIAL_VALUES = {
  [ProjectFormFieldNames.DESCRIPTION]: '',
  [ProjectFormFieldNames.PLACE]: '',
  [ProjectFormFieldNames.TIME]: moment().set('hour', 22).set('minutes', 30),
  [ProjectFormFieldNames.TEAM_MEMBER]: null as TeamMemberType | null,
  [ProjectFormFieldNames.ADMINS_OR_GUESTS]: [] as TeamMemberType[]
};

const FORM_VALIDATION_SCHEMA = Yup.object().shape({
  [ProjectFormFieldNames.DESCRIPTION]: REQUIRED_FIELD_VALIDATION,
  [ProjectFormFieldNames.PLACE]: REQUIRED_FIELD_VALIDATION
});

export interface IProjectFormProps {
  activeType: ModalTypes;
  members: TeamMemberType[];
  onCancelClick: () => void;
  onSubmitClick: () => void;
  project: IProject;
  savedValues: typeof PROJECT_FORM_INITIAL_VALUES | null;
  setActiveType: React.Dispatch<React.SetStateAction<ModalTypes>>;
  setSavedValues: React.Dispatch<React.SetStateAction<typeof PROJECT_FORM_INITIAL_VALUES | null>>;
}

export const ProjectForm = React.forwardRef<any, IProjectFormProps>((props, ref) => {
  const { activeType, members, onCancelClick, onSubmitClick, project, savedValues, setActiveType, setSavedValues } =
    props;

  const statusType = getRightStatusType(project);
  const isStarted = !isProjectOrTaskPaused(statusType);
  const member = project.members?.[0];

  const timeAndPlace = 'Garden • 10:30pm';

  const formikRef = useRef<FormikProps<typeof PROJECT_FORM_INITIAL_VALUES> | null>(null);

  const intl = useIntl();

  const handleClickAdminOrGuests = () => {
    setSavedValues(formikRef.current?.values || null);
    setActiveType(ModalTypes.INFORM_MEMBERS);
  };

  const handleClickHouseTeam = () => {
    setSavedValues(formikRef.current?.values || null);
    setActiveType(ModalTypes.HOUSE_TEAM);
  };

  const handleSelectMember = (newMember: TeamMemberType | null) => {
    setSavedValues((prev) =>
      isNull(prev)
        ? prev
        : {
            ...prev,
            [ProjectFormFieldNames.TEAM_MEMBER]: newMember
          }
    );
  };

  const handleSelectAdminOrGuest = (newAdminOrGuest: TeamMemberType) => {
    if (savedValues) {
      const currentValue = savedValues ? savedValues[ProjectFormFieldNames.ADMINS_OR_GUESTS] : [];

      setSavedValues(
        (prev) =>
          ({
            ...prev,
            [ProjectFormFieldNames.ADMINS_OR_GUESTS]: currentValue.find((i) => i.id === newAdminOrGuest.id)
              ? currentValue.filter((i) => i.id !== newAdminOrGuest.id)
              : [...currentValue, newAdminOrGuest]
          } as typeof PROJECT_FORM_INITIAL_VALUES)
      );
    }
  };

  const handleDeleteAdminOrGuest = (guestToDelete: TeamMemberType) => {
    return () => {
      if (formikRef.current) {
        formikRef.current.setFieldValue(
          ProjectFormFieldNames.ADMINS_OR_GUESTS,
          formikRef.current.values[ProjectFormFieldNames.ADMINS_OR_GUESTS].filter((i) => i.id !== guestToDelete.id)
        );
      }
    };
  };

  if (activeType === ModalTypes.HOUSE_TEAM) {
    return (
      <DialogSelectMembers
        members={members}
        selectedMember={savedValues ? savedValues[ProjectFormFieldNames.TEAM_MEMBER] : null}
        setSelectedMember={handleSelectMember}
      />
    );
  }

  if (activeType === ModalTypes.INFORM_MEMBERS) {
    return (
      <AdminsOrGuestsSelect
        members={members}
        selectedAdminsOrGuests={savedValues ? savedValues[ProjectFormFieldNames.ADMINS_OR_GUESTS] : null}
        setSelectedAdminsOrGuests={handleSelectAdminOrGuest}
      />
    );
  }

  return (
    <Formik
      initialValues={savedValues || PROJECT_FORM_INITIAL_VALUES}
      innerRef={mergeRefs([formikRef, ref])}
      onSubmit={() => {}}
      validateOnBlur={false}
      validateOnChange={false}
      validationSchema={FORM_VALIDATION_SCHEMA}>
      {({ values }) => (
        <ExtentedForm disableScrollToError>
          <StatusBadge containerClassName={s.TaskProjectCard__status} statusType={statusType} />

          <Text
            as="div"
            className={s.ProjectForm__title}
            text={intl.formatMessage({ defaultMessage: 'About the project', id: 'projects.form.about.title' })}
            variant={TextPropsVariantsEnum.H3}
          />

          {!isStarted && (
            <TextAreaField
              enableAutoSize
              fieldContainerProps={{
                label: intl.formatMessage({
                  defaultMessage: 'What are you going to do',
                  id: 'projects.form.description.label'
                })
              }}
              maxLetters={480}
              name={ProjectFormFieldNames.DESCRIPTION}
              placeholder={intl.formatMessage({
                defaultMessage: 'Type..',
                id: 'projects.form.description.placeholder'
              })}
            />
          )}

          {isStarted && (
            <Text
              className={s.ProjectForm__title}
              color="textSecondary"
              text={intl.formatMessage({
                defaultMessage:
                  'This is the description of the section that we attached so that it was here. This is the description of the section that we attached so that it was here. ',
                id: 'projects.form.about.description'
              })}
              variant={TextPropsVariantsEnum.BODY_M}
            />
          )}

          {!isStarted && (
            <>
              <Text
                as="div"
                className={s.ProjectForm__title}
                text={intl.formatMessage({ defaultMessage: 'Time and place', id: 'projects.form.timeAndPlace.title' })}
                variant={TextPropsVariantsEnum.H3}
              />

              <div className={s.ProjectForm__flex}>
                <InputField
                  fieldContainerProps={{
                    containerClassName: s.ProjectForm__placeInput,
                    label: intl.formatMessage({
                      defaultMessage: 'Place of meeting',
                      id: 'projects.form.place.label'
                    })
                  }}
                  name={ProjectFormFieldNames.PLACE}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Type..',
                    id: 'projects.form.place.placeholder'
                  })}
                />

                <TimeInputField
                  fieldContainerProps={{
                    containerClassName: s.ProjectForm__timeInput,
                    label: intl.formatMessage({
                      defaultMessage: 'Time of beginning',
                      id: 'projects.form.time.label'
                    })
                  }}
                  name={ProjectFormFieldNames.TIME}
                />
              </div>

              <Text
                as="div"
                className={s.ProjectForm__title}
                text={intl.formatMessage({
                  defaultMessage: 'House Team',
                  id: 'projects.form.houseTeam.title'
                })}
                variant={TextPropsVariantsEnum.H3}
              />

              <Input
                defaultValue={values[ProjectFormFieldNames.TEAM_MEMBER]?.name || ''}
                fieldContainerProps={{
                  label: intl.formatMessage({
                    defaultMessage: 'Who does it',
                    id: 'projects.form.teamMember.label'
                  })
                }}
                onClick={handleClickHouseTeam}
                placeholder={intl.formatMessage({ defaultMessage: 'Choose..', id: 'app.choose' })}
              />
            </>
          )}

          {isStarted && (
            <div className={s.ProjectForm__time_who_container}>
              <div className={s.ProjectForm__time}>
                <Text
                  as="div"
                  className={s.ProjectForm__time_title}
                  text={intl.formatMessage({
                    defaultMessage: 'Time and place',
                    id: 'projects.form.timeAndPlace.title'
                  })}
                  variant={TextPropsVariantsEnum.H3}
                />

                <Text
                  className={s.ProjectForm__time_text}
                  color="textSecondary"
                  text={intl.formatMessage({ defaultMessage: timeAndPlace, id: 'projects.form.timeAndPlace.text' })}
                  variant={TextPropsVariantsEnum.BODY_M}
                />
              </div>

              <div className={s.ProjectForm__who}>
                <Text
                  as="div"
                  className={s.ProjectForm__who_title}
                  text={intl.formatMessage({ defaultMessage: 'Who does it', id: 'projects.form.who.title' })}
                  variant={TextPropsVariantsEnum.H3}
                />

                <div className={s.ProjectForm__who_memberCard} key={member?.id}>
                  <Avatar
                    avatar={member?.avatar}
                    containerClassName={s.ProjectForm__who_memberAvatar}
                    height={40}
                    width={40}
                  />

                  <Text
                    className={s.ProjectForm__who_name}
                    color="textSecondary"
                    text={member?.name}
                    variant={TextPropsVariantsEnum.BODY_M}
                  />
                </div>
              </div>
            </div>
          )}

          <div className={s.ProjectForm__controls}>
            <Button
              className={s.controls__cancel}
              color="grey"
              onClick={onCancelClick}
              size="m"
              type="button"
              variant="primary">
              <FormattedMessage defaultMessage="Cancel" id="project.modal.starting.cancel" />
            </Button>

            <Button
              className={clsx(s.controls__submit, isStarted && s.started)}
              color={isStarted ? 'grey' : 'green'}
              leftIcon={isStarted && <Rectangle className={clsx(s.controls__submit_icon, s.submit_icon__pause)} />}
              onClick={onSubmitClick}
              rightIcon={!isStarted && <ChevronRightIcon className={s.controls__submit_icon} />}
              variant="primary">
              {isStarted ? (
                <FormattedMessage defaultMessage="Stop the project" id="project.modal.stop.submit" />
              ) : (
                <FormattedMessage defaultMessage="Start the project" id="project.modal.start.submit" />
              )}
            </Button>
          </div>
        </ExtentedForm>
      )}
    </Formik>
  );
});
