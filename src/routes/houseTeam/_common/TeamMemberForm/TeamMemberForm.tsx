import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';
import { DropzoneField } from 'common/components/ui/_formikComponents/DropzoneField/DropzoneField';
import { DropzonePreviewField } from 'common/components/ui/_formikComponents/DropzonePreviewField/DropzonePreviewField';
import { ExtentedForm } from 'common/components/ui/_formikComponents/ExtentedForm/ExtentedForm';
import { InputField } from 'common/components/ui/_formikComponents/InputField/InputField';
import { SelectUsualField } from 'common/components/ui/_formikComponents/SelectField';
import { WeekControlField } from 'common/components/ui/_formikComponents/WeekControlField/WeekControlField';
import { Button, ButtonLink } from 'common/components/ui/Button/Button';
import { ISelectPrimaryOption, ISelectTextualOption } from 'common/components/ui/Select';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { DurationEnum } from 'graphql/types';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { getWeekControlInitialValues } from 'utils/dates';
import { REQUIRED_FIELD_VALIDATION, getFilesFieldValidation } from 'utils/formValidation/validationFields';
import { HOUSE_TEAM_PAGE_ROUTE } from 'utils/routes';
import { TeamMemberAmpluaList } from 'variables/teamMemberAmpluaList';

import { TeamMemberHoldCard } from '../TeamMemberHoldCard/TeamMemberHoldCard';

import s from './TeamMemberForm.module.scss';

export enum TeamMemberFormFieldNames {
  HOUSE_ID = 'house_id',
  NAME = 'name',
  ROLE = 'role',
  ADDITIONAL_FILES = 'additional_files',
  WORKING_HOURS = 'working-hours',
  PROJECT = 'project',
  PAYMENT = 'payment',
  DURATION = 'duration',
  CURRENCY = 'currency'
}

export const TEAM_MEMBER_FORM_INITIAL_VALUES = {
  [TeamMemberFormFieldNames.HOUSE_ID]: '',
  [TeamMemberFormFieldNames.NAME]: '',
  [TeamMemberFormFieldNames.ROLE]: '',
  [TeamMemberFormFieldNames.ADDITIONAL_FILES]: [],
  [TeamMemberFormFieldNames.WORKING_HOURS]: getWeekControlInitialValues(),
  [TeamMemberFormFieldNames.PROJECT]: '',
  [TeamMemberFormFieldNames.PAYMENT]: '',
  [TeamMemberFormFieldNames.DURATION]: '' as DurationEnum,
  [TeamMemberFormFieldNames.CURRENCY]: 'USD'
};

const FORM_VALIDATION_SCHEMA = Yup.object().shape({
  [TeamMemberFormFieldNames.HOUSE_ID]: REQUIRED_FIELD_VALIDATION,
  [TeamMemberFormFieldNames.NAME]: REQUIRED_FIELD_VALIDATION,
  [TeamMemberFormFieldNames.ROLE]: REQUIRED_FIELD_VALIDATION,
  [TeamMemberFormFieldNames.ADDITIONAL_FILES]: getFilesFieldValidation(0),
  [TeamMemberFormFieldNames.PAYMENT]: REQUIRED_FIELD_VALIDATION,
  [TeamMemberFormFieldNames.DURATION]: REQUIRED_FIELD_VALIDATION,
  [TeamMemberFormFieldNames.CURRENCY]: REQUIRED_FIELD_VALIDATION
});

const CURRENCY_SELECT_FIELD_OPTIONS: ISelectPrimaryOption[] = [
  { text: 'USD', value: 'USD' },
  { text: 'EUR', value: 'EUR' }
];

export interface TeamMemberFormProps {
  memberCardTitle: string;
  initialValues?: typeof TEAM_MEMBER_FORM_INITIAL_VALUES;
  loading?: boolean;

  onSubmit: (values: typeof TEAM_MEMBER_FORM_INITIAL_VALUES) => void;
  onDelete?: () => void;
}

export const TeamMemberForm: React.FC<TeamMemberFormProps> = ({
  memberCardTitle,
  initialValues,
  loading = false,
  onSubmit,
  onDelete
}) => {
  const intl = useIntl();

  const { currentHouseId, availableAccounts } = useTypedSelector((s) => s.accounts);

  const houseSelectOptions: ISelectTextualOption[] = (availableAccounts || []).map((a) => ({
    text: a.house.title,
    value: a.house_id
  }));

  if (!initialValues && currentHouseId) {
    TEAM_MEMBER_FORM_INITIAL_VALUES[TeamMemberFormFieldNames.HOUSE_ID] = currentHouseId;
  }

  const PROJECT_SELECT_FIELD_OPTIONS = TeamMemberAmpluaList.map(({ text, value }) => ({
    text: intl.formatMessage({ defaultMessage: text, id: value }),
    value
  }));

  const DURATION_SELECT_FIELD_OPTIONS: { text: string; value: DurationEnum }[] = [
    {
      text: intl.formatMessage({ id: 'houseTeam.duration.hours', defaultMessage: 'Hours' }),
      value: DurationEnum.Hours
    },
    {
      text: intl.formatMessage({ id: 'houseTeam.duration.months', defaultMessage: 'Months' }),
      value: DurationEnum.Month
    }
  ];

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues ?? TEAM_MEMBER_FORM_INITIAL_VALUES}
        validationSchema={FORM_VALIDATION_SCHEMA}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={onSubmit}
      >
        <ExtentedForm>
          <div className={s.TeamMemberForm__header}>
            <TeamMemberHoldCard
              fieldName={TeamMemberFormFieldNames.HOUSE_ID}
              title={memberCardTitle}
              selectOptions={houseSelectOptions}
              className={s.TeamMemberForm__holdCard}
            />
            {onDelete && (
              <Button
                type="button"
                color="orange"
                variant="secondary"
                size="xl"
                onClick={onDelete}
                disabled={loading}
                leftIcon={
                  <span className={s.TeamMemberForm__deleteBtnIcon}>
                    <CloseIcon />
                  </span>
                }
                className={s.TeamMemberForm__deleteBtn}
              >
                <FormattedMessage id="houseTeam.button.deleteMember" defaultMessage="Delete member" />
              </Button>
            )}
          </div>
          <div className={s.TeamMemberForm__block}>
            <Text
              variant={TextPropsVariantsEnum.H3}
              text={intl.formatMessage({
                id: 'houseTeam.personalInformation.title',
                defaultMessage: 'Personal information'
              })}
              className={s.TeamMemberForm__title}
            />
            <InputField
              name={TeamMemberFormFieldNames.NAME}
              placeholder={intl.formatMessage({
                id: 'houseTeam.form.name.placeholder',
                defaultMessage: 'Type a first name and surname'
              })}
              fieldContainerProps={{
                label: intl.formatMessage({
                  id: 'houseTeam.form.name.label',
                  defaultMessage: 'Full name'
                })
              }}
              disabled={loading}
            />
            <SelectUsualField
              name={TeamMemberFormFieldNames.ROLE}
              options={PROJECT_SELECT_FIELD_OPTIONS}
              label={intl.formatMessage({
                id: 'houseTeam.form.role.label',
                defaultMessage: 'Member role'
              })}
              disabled={loading}
            />
          </div>
          <div className={s.TeamMemberForm__block}>
            <Text
              variant={TextPropsVariantsEnum.H3}
              text={intl.formatMessage({
                id: 'houseTeam.identityFiles.title',
                defaultMessage: 'Additional files to prove the identity'
              })}
              className={s.TeamMemberForm__title}
            />
            <DropzoneField name={TeamMemberFormFieldNames.ADDITIONAL_FILES} maxFiles={6} loading={loading} />
            <DropzonePreviewField name={TeamMemberFormFieldNames.ADDITIONAL_FILES} />
          </div>
          <div className={s.TeamMemberForm__block}>
            <Text
              variant={TextPropsVariantsEnum.H3}
              text={intl.formatMessage({
                id: 'houseTeam.payment.title',
                defaultMessage: 'Payment'
              })}
              className={s.TeamMemberForm__title}
            />
            <div className={s.TeamMemberForm__paymentInputs}>
              <InputField
                name={TeamMemberFormFieldNames.PAYMENT}
                placeholder={intl.formatMessage({
                  id: 'houseTeam.form.payment.placeholder',
                  defaultMessage: 'Payment for work'
                })}
                type="number"
                fieldContainerProps={{
                  label: intl.formatMessage({
                    id: 'houseTeam.form.payment.label',
                    defaultMessage: 'Payment'
                  }),
                  containerClassName: s.TeamMemberForm__paymentInput
                }}
                disabled={loading}
                allowOnlyNumbers
              />
              <SelectUsualField
                name={TeamMemberFormFieldNames.DURATION}
                options={DURATION_SELECT_FIELD_OPTIONS}
                label={intl.formatMessage({
                  id: 'houseTeam.form.duration.label',
                  defaultMessage: 'Duration'
                })}
                placeholder={intl.formatMessage({
                  id: 'houseTeam.form.duration.placeholder',
                  defaultMessage: 'Choose duration'
                })}
                fieldContainerProps={{ containerClassName: s.TeamMemberForm__paymentInput }}
                disabled={loading}
              />
              <SelectUsualField
                name={TeamMemberFormFieldNames.CURRENCY}
                fieldContainerProps={{ containerClassName: s.TeamMemberForm__paymentInput }}
                options={CURRENCY_SELECT_FIELD_OPTIONS}
                label={intl.formatMessage({
                  id: 'houseTeam.form.currency.label',
                  defaultMessage: 'Currency'
                })}
                disabled={loading}
              />
            </div>
          </div>
          <div className={s.TeamMemberForm__block}>
            <Text
              variant={TextPropsVariantsEnum.H3}
              text={intl.formatMessage({
                id: 'houseTeam.workingHours.title',
                defaultMessage: 'Working hours'
              })}
              className={s.TeamMemberForm__title}
            />
            <WeekControlField name={TeamMemberFormFieldNames.WORKING_HOURS} loading={loading} />
          </div>
          <Text
            variant={TextPropsVariantsEnum.H3}
            text={intl.formatMessage({
              id: 'houseTeam.assignWork.title',
              defaultMessage: 'Assign to work'
            })}
            className={s.TeamMemberForm__title}
          />
          <SelectUsualField
            name={TeamMemberFormFieldNames.PROJECT}
            options={PROJECT_SELECT_FIELD_OPTIONS}
            label={intl.formatMessage({
              id: 'houseTeam.form.project.label',
              defaultMessage: 'Project'
            })}
            disabled={loading}
          />
          <div className={s.TeamMemberForm__controls}>
            <ButtonLink color="orange" size="s" variant="secondary" to={HOUSE_TEAM_PAGE_ROUTE} isLoading={loading}>
              <FormattedMessage id="app.button.cancel" defaultMessage="Cancel" />
            </ButtonLink>
            <Button color="orange" size="s" type="submit" isLoading={loading}>
              <FormattedMessage id="houseTeam.button.save" defaultMessage="Save a team member" />
            </Button>
          </div>
        </ExtentedForm>
      </Formik>
    </>
  );
};
