import React from 'react';

import { Formik } from 'formik';
import moment from 'moment';
// eslint-disable-next-line
import * as Yup from 'yup';
// eslint-disable-next-line
import { useApolloClient } from '@apollo/client';

import { CheckboxField } from 'common/components/ui/_formikComponents/CheckboxField/CheckboxField';
import { DateInputField } from 'common/components/ui/_formikComponents/DateInputField/DateInputField';
import { ExtentedForm } from 'common/components/ui/_formikComponents/ExtentedForm/ExtentedForm';
import { InputField } from 'common/components/ui/_formikComponents/InputField/InputField';
import { Button } from 'common/components/ui/Button';
import { EDatepickerCalendarTypes } from 'common/components/ui/Datepicker/Datepicker';
import { ErrorMessage } from 'common/components/ui/ErrorMessage/ErrorMessage';
import { useMediaQuery } from 'common/hooks/useMediaQuery';
import { useMutationWithError } from 'common/hooks/useMutationWithError';
import {
  MUTATION_CREATE_ACCOUNT_INVITE,
  MUTATION_DEACTIVATE_ACCOUNT,
  MUTATION_UPDATE_ACCOUNT
} from 'graphql/mutations/accounts';
import { QUERY_MODAL_ACCOUNTS } from 'graphql/queries/accounts';
import { AccountRolesEnum, AccountType, AccountUpdateInput, InviteToHouseCreateInput, InviteType } from 'graphql/types';
import { DEFAULT_ERROR_MESSAGE } from 'utils/errorMessages';
import { REQUIRED_FIELD_VALIDATION } from 'utils/formValidation/validationFields';

import s from './GuestAddDialogContent.module.scss';

enum FieldNames {
  EXPIRATION_DATE = 'expiration_date',
  HAS_NO_EXPIRATION_DATE = 'has_no_expiration_date',
  NAME = 'name'
}

export const GUESTS_ADD_MODAL_INITIAL_VALUES = {
  [FieldNames.NAME]: '',
  [FieldNames.EXPIRATION_DATE]: {
    endDate: null,
    startDate: moment().startOf('day').add(1, 'month')
  },
  [FieldNames.HAS_NO_EXPIRATION_DATE]: false
};

const GUESTS_VALIDATION_SCHEMA = Yup.object().shape({ [FieldNames.NAME]: REQUIRED_FIELD_VALIDATION });

export interface GuestsAddDialogContentProps {
  accountToEdit?: AccountType | null;
  onCancel?: () => void;
  onCreated?: () => void;
  onEdited?: () => void;
}

export const GuestsAddDialogContent: React.FC<GuestsAddDialogContentProps> = ({
  accountToEdit,
  onCancel,
  onCreated,
  onEdited
}) => {
  const { cache } = useApolloClient();
  const isTablet = useMediaQuery('(min-width: 576px)');

  const [createAccountInvite, { error: errorCreatingAccount, loading: creatingAccountInvite }] = useMutationWithError<
    { result: InviteType },
    { input: InviteToHouseCreateInput }
  >(MUTATION_CREATE_ACCOUNT_INVITE, {
    onCompleted({ result }) {
      const variables = {
        input: {
          is_deactivated: false,
          roles: [AccountRolesEnum.Guest]
        }
      };
      const prevAccounts = cache.readQuery({
        query: QUERY_MODAL_ACCOUNTS,
        variables
      }) as { result: InviteType[] | undefined };
      cache.writeQuery({
        data: {
          result: [...(prevAccounts?.result || []), { ...result.account, invite: { public_uuid: result.public_uuid } }]
        },
        query: QUERY_MODAL_ACCOUNTS,
        variables
      });
      onCreated && onCreated();
    }
  });
  const [deactivateAccount, { error: errorDeactivatingAccount, loading: deactivatingAccount }] = useMutationWithError<
    { result: AccountType },
    { id: string }
  >(MUTATION_DEACTIVATE_ACCOUNT, {
    onCompleted({ result }) {
      const variables = {
        input: {
          is_deactivated: false,
          roles: [AccountRolesEnum.Guest]
        }
      };
      const prevAccounts = cache.readQuery({
        query: QUERY_MODAL_ACCOUNTS,
        variables
      }) as { result: InviteType[] | undefined };
      cache.writeQuery({
        data: { result: prevAccounts?.result?.filter((a) => a?.id !== result?.id) || [] },
        query: QUERY_MODAL_ACCOUNTS,
        variables
      });
      onEdited && onEdited();
    }
  });
  const [updateAccount, { error: errorUpdatingAccount, loading: updatingAccount }] = useMutationWithError<
    { result: AccountType },
    { input: AccountUpdateInput }
  >(MUTATION_UPDATE_ACCOUNT, {
    onCompleted() {
      onEdited && onEdited();
    }
  });
  const handleSubmit = (values: typeof GUESTS_ADD_MODAL_INITIAL_VALUES) => {
    if (!accountToEdit) {
      createAccountInvite({
        variables: {
          input: {
            account: {
              amplua: '',
              expires_at: values.has_no_expiration_date ? null : values.expiration_date.startDate,
              name: values.name,
              role: AccountRolesEnum.Guest
            }
          }
        }
      });
    } else {
      updateAccount({
        variables: {
          input: {
            amplua: accountToEdit.amplua,
            expires_at: values.has_no_expiration_date ? null : values.expiration_date.startDate,
            id: accountToEdit.id,
            name: values.name
          }
        }
      });
    }
  };

  const handleCancelClick = () => {
    onCancel && onCancel();
  };

  const handleDeactivateMember = (account: AccountType) => {
    return () => {
      deactivateAccount({ variables: { id: account.id } });
    };
  };
  const isLoading = creatingAccountInvite || deactivatingAccount || updatingAccount;
  return (
    <Formik
      initialValues={
        accountToEdit
          ? {
              expiration_date: accountToEdit.expires_at
                ? { endDate: null, startDate: accountToEdit.expires_at }
                : GUESTS_ADD_MODAL_INITIAL_VALUES[FieldNames.EXPIRATION_DATE],
              has_no_expiration_date: !accountToEdit.expires_at,
              name: accountToEdit.name || 'No name'
            }
          : GUESTS_ADD_MODAL_INITIAL_VALUES
      }
      onSubmit={handleSubmit}
      validateOnBlur={false}
      validateOnChange={false}
      validationSchema={GUESTS_VALIDATION_SCHEMA}
    >
      {({ values }) => (
        <ExtentedForm disableScrollToError>
          {accountToEdit && (
            <Button
              className={s.GuestsAddDialogContent__deleteBtn}
              color="orange"
              disabled={isLoading}
              onClick={handleDeactivateMember(accountToEdit)}
              size={isTablet ? 'm' : 's'}
              type="button"
              variant="secondary"
            >
              Delete a member
            </Button>
          )}

          <InputField autoFocus disabled={isLoading} fieldContainerProps={{ label: 'Name' }} name={FieldNames.NAME} />

          <DateInputField
            datepickerProps={{
              disableRangeSelect: true,
              disabledCalendars: [EDatepickerCalendarTypes.YEAR],
              disabledTillDate: moment().startOf('day')
            }}
            disabled={isLoading || values[FieldNames.HAS_NO_EXPIRATION_DATE]}
            fieldContainerProps={{ label: 'Expiration date' }}
            name={FieldNames.EXPIRATION_DATE}
          />

          <CheckboxField disabled={isLoading} name={FieldNames.HAS_NO_EXPIRATION_DATE} text="All days" />

          <ErrorMessage
            error={(errorCreatingAccount || errorDeactivatingAccount || errorUpdatingAccount) && DEFAULT_ERROR_MESSAGE}
          />

          <div className={s.GuestsAddDialogContent__footer}>
            <Button
              color="orange"
              disabled={isLoading}
              onClick={handleCancelClick}
              size="s"
              type="button"
              variant="secondary"
            >
              Cancel
            </Button>

            <Button color="orange" isLoading={isLoading} size="s" type="submit">
              Save
            </Button>
          </div>
        </ExtentedForm>
      )}
    </Formik>
  );
};
