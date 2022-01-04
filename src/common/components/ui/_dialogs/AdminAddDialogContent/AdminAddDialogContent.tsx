import React from 'react';

import { Formik } from 'formik';
import moment from 'moment';
import * as Yup from 'yup';

import { useApolloClient } from '@apollo/client';
import { ExtentedForm } from 'common/components/ui/_formikComponents/ExtentedForm/ExtentedForm';
import { InputField } from 'common/components/ui/_formikComponents/InputField/InputField';
import { Button } from 'common/components/ui/Button';
import { ErrorMessage } from 'common/components/ui/ErrorMessage/ErrorMessage';
import { HintIcon } from 'common/components/ui/HintIcon/HintIcon';
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

import s from './AdminAddDialogContent.module.scss';

enum FieldNames {
  NAME = 'name',
  AMPLUA = 'amplua'
}

export const ADMINS_ADD_MODAL_INITIAL_VALUES = {
  [FieldNames.NAME]: '',
  [FieldNames.AMPLUA]: ''
};

const ADMINS_VALIDATION_SCHEMA = Yup.object().shape({
  [FieldNames.NAME]: REQUIRED_FIELD_VALIDATION,
  [FieldNames.AMPLUA]: REQUIRED_FIELD_VALIDATION
});

export interface AdminAddDialogContentProps {
  accountToEdit?: AccountType | null;
  onCreated?: () => void;
  onEdited?: () => void;
  onCancel?: () => void;
}

export const AdminAddDialogContent: React.FC<AdminAddDialogContentProps> = ({
  accountToEdit,
  onCancel,
  onCreated,
  onEdited
}) => {
  const { cache } = useApolloClient();
  const isTablet = useMediaQuery('(min-width: 576px)');

  const [createAccountInvite, { loading: creatingAccountInvite, error: errorCreatingAccount }] = useMutationWithError<
    { result: InviteType },
    { input: InviteToHouseCreateInput }
  >(MUTATION_CREATE_ACCOUNT_INVITE, {
    onCompleted({ result }) {
      const variables = {
        input: {
          roles: [AccountRolesEnum.Admin],
          is_deactivated: false
        }
      };

      const prevAccounts = cache.readQuery({
        query: QUERY_MODAL_ACCOUNTS,
        variables
      }) as { result: InviteType[] | undefined };

      cache.writeQuery({
        query: QUERY_MODAL_ACCOUNTS,
        variables,
        data: {
          result: [...(prevAccounts?.result || []), { ...result.account, invite: { public_uuid: result.public_uuid } }]
        }
      });

      onCreated && onCreated();
    }
  });
  const [deactivateAccount, { loading: deactivatingAccount, error: errorDeactivatingAccount }] = useMutationWithError<
    { result: AccountType },
    { id: string }
  >(MUTATION_DEACTIVATE_ACCOUNT, {
    onCompleted({ result }) {
      const variables = {
        input: {
          roles: [AccountRolesEnum.Admin],
          is_deactivated: false
        }
      };

      const prevAccounts = cache.readQuery({
        query: QUERY_MODAL_ACCOUNTS,
        variables
      }) as { result: InviteType[] | undefined };

      cache.writeQuery({
        query: QUERY_MODAL_ACCOUNTS,
        variables,
        data: {
          result: prevAccounts?.result?.filter((a) => a?.id !== result?.id) || []
        }
      });

      onEdited && onEdited();
    }
  });
  const [updateAccount, { loading: updatingAccount, error: errorUpdatingAccount }] = useMutationWithError<
    { result: AccountType },
    { input: AccountUpdateInput }
  >(MUTATION_UPDATE_ACCOUNT, {
    onCompleted() {
      onEdited && onEdited();
    }
  });

  const handleSubmit = (values: typeof ADMINS_ADD_MODAL_INITIAL_VALUES) => {
    if (!accountToEdit) {
      createAccountInvite({
        variables: {
          input: {
            account: {
              amplua: values.amplua,
              name: values.name,
              role: AccountRolesEnum.Admin,
              expires_at: moment().startOf('day').add(1, 'month')
            }
          }
        }
      });
    } else {
      updateAccount({
        variables: {
          input: {
            id: accountToEdit.id,
            amplua: values.amplua,
            expires_at: accountToEdit.expires_at,
            name: values.name
          }
        }
      });
    }
  };

  const handleDeactivateMember = (account: AccountType) => {
    return () => {
      deactivateAccount({
        variables: {
          id: account.id
        }
      });
    };
  };

  const isLoading = creatingAccountInvite || deactivatingAccount || updatingAccount;

  return (
    <Formik
      initialValues={
        accountToEdit
          ? { amplua: accountToEdit.amplua || '', name: accountToEdit.name || 'No name' }
          : ADMINS_ADD_MODAL_INITIAL_VALUES
      }
      validationSchema={ADMINS_VALIDATION_SCHEMA}
      onSubmit={handleSubmit}
      validateOnBlur={false}
      validateOnChange={false}>
      <ExtentedForm disableScrollToError>
        {accountToEdit && (
          <Button
            size={isTablet ? 'm' : 's'}
            color="orange"
            variant="secondary"
            type="button"
            onClick={handleDeactivateMember(accountToEdit)}
            className={s.AdminAddDialogContent__deleteBtn}
            disabled={isLoading}>
            Delete a member
          </Button>
        )}

        <InputField name={FieldNames.NAME} fieldContainerProps={{ label: 'Name' }} disabled={isLoading} autoFocus />

        <InputField
          name={FieldNames.AMPLUA}
          fieldContainerProps={{ label: 'Amplua' }}
          disabled={isLoading}
          icon={
            <HintIcon hint="Let us know who is using the system now. For example, if your husband’s mom will come to visit you, your staff and other house members will know who will set the tasks." />
          }
        />

        <ErrorMessage
          error={(errorCreatingAccount || errorDeactivatingAccount || errorUpdatingAccount) && DEFAULT_ERROR_MESSAGE}
        />

        <div className={s.AdminAddDialogContent__footer}>
          <Button size="s" color="orange" variant="secondary" disabled={isLoading} onClick={onCancel} type="button">
            Cancel
          </Button>

          <Button size="s" color="orange" isLoading={isLoading} type="submit">
            Save
          </Button>
        </div>
      </ExtentedForm>
    </Formik>
  );
};
