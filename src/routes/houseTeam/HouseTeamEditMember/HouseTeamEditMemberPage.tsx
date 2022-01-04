import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useHistory, useParams } from 'react-router';

import moment from 'moment';

import { useToggle } from '@proscom/ui-react';
import { Spinner } from 'common/components/ui/Spinner/Spinner';
import { useMutationWithError } from 'common/hooks/useMutationWithError';
import { useQueryWithError } from 'common/hooks/useQueryWithError';
import { FRAGMENT_ACCOUNT } from 'graphql/fragments/accountsFragment';
import { MUTATION_DEACTIVATE_ACCOUNT, MUTATION_UPDATE_ACCOUNT } from 'graphql/mutations/accounts';
import { QUERY_ACCOUNT_BY_ID } from 'graphql/queries/accounts';
import {
  AccountScheduleType,
  AccountScheduleUpdateInput,
  AccountType,
  AccountUpdateInput,
  DurationEnum
} from 'graphql/types';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { handleDeleteAccountAC } from 'redux/slices/houseTeamInviteSlice/actionCreators';
import { createToast } from 'redux/slices/toastSlice/actionCreators';
import { CenteredPageLayout } from 'routes/_layouts/CenteredPageLayout/CenteredPageLayout';
import { mapAccountSchedules } from 'utils/mapAccountSchedules';
import { HOUSE_TEAM_PAGE_ROUTE } from 'utils/routes';

import {
  TEAM_MEMBER_FORM_INITIAL_VALUES,
  TeamMemberForm,
  TeamMemberFormFieldNames
} from '../_common/TeamMemberForm/TeamMemberForm';

import { DeleteMemberAlertDialog } from './DeleteMemberAlertDialog/DeleteMemberAlertDialog';

import s from './HouseTeamEditMemberPage.module.scss';

export interface HouseTeamEditMemberPageProps {}

export const HouseTeamEditMemberPage: React.FC<HouseTeamEditMemberPageProps> = () => {
  const dispatch = useTypedDispatch();
  const countDeleted = useTypedSelector<number>(({ houseTeamInvite }) => houseTeamInvite.countInvitedDelete);

  const { id } = useParams<{ id: string }>();

  const intl = useIntl();
  const history = useHistory();
  const alertModalToggler = useToggle();
  const { data: account, loading } = useQueryWithError<{ result: AccountType }, { id: string }>(QUERY_ACCOUNT_BY_ID, {
    variables: {
      id
    }
  });

  const [updateAccount, { loading: updateAccountLoading }] = useMutationWithError<
    { result: AccountType },
    { input: AccountUpdateInput }
  >(MUTATION_UPDATE_ACCOUNT, {
    onCompleted() {
      history.push(HOUSE_TEAM_PAGE_ROUTE);
    },
    onError() {
      dispatch(
        createToast({
          title: intl.formatMessage({
            id: 'houseTeam.editMember.errorTitle',
            defaultMessage: 'Oops'
          }),
          text: intl.formatMessage({
            id: 'houseTeam.editMember.errorText',
            defaultMessage: 'Failed to edit member. Please, try again'
          }),
          type: 'error'
        })
      );
    }
  });

  const [deactivateAccount, { loading: deactivateAccountLoading }] = useMutationWithError<
    { result: AccountType },
    { id: string }
  >(MUTATION_DEACTIVATE_ACCOUNT, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          houseAccounts(existingAccounts = []) {
            if (data) {
              const accountRef = cache.writeFragment({
                data: data.result,
                fragment: FRAGMENT_ACCOUNT,
                fragmentName: 'Account'
              });
              const _existingAccounts = [...existingAccounts];
              const index = _existingAccounts.findIndex((account) => accountRef?.__ref === account.__ref);
              if (index >= 0) {
                _existingAccounts.splice(index, 1);
              }
              return _existingAccounts;
            }
            return existingAccounts;
          }
        }
      });
    },
    onCompleted() {
      history.push(HOUSE_TEAM_PAGE_ROUTE);
    },
    onError() {
      dispatch(
        createToast({
          title: intl.formatMessage({
            id: 'houseTeam.editMember.errorTitle',
            defaultMessage: 'Oops'
          }),
          text: intl.formatMessage({
            id: 'houseTeam.editMember.errorText',
            defaultMessage: 'Failed to deactivate member. Please, try again'
          }),
          type: 'error'
        })
      );
    }
  });

  const handleAccountSchedule = (schedules: AccountScheduleType[] | []) => {
    return moment.weekdays().reduce((accom, w) => {
      const workedDay = schedules.find(({ weekday }) => weekday.toLowerCase() === w.toLowerCase());
      if (workedDay) {
        return {
          ...accom,
          [w]: {
            isOn: true,
            time: {
              startTime: workedDay.start_time,
              endTime: workedDay.end_time
            }
          }
        };
      } else {
        return {
          ...accom,
          [w]: {
            isOn: false,
            time: {
              startTime: moment().set('hour', 6).set('minutes', 0),
              endTime: moment().set('hour', 20).set('minutes', 30)
            }
          }
        };
      }
    }, {});
  };

  const editedMemberInitialValues = useMemo(() => {
    return {
      [TeamMemberFormFieldNames.HOUSE_ID]: account?.result.house_id || ' ',
      [TeamMemberFormFieldNames.NAME]: account?.result.name || '',
      [TeamMemberFormFieldNames.ROLE]: account?.result.amplua || '',
      [TeamMemberFormFieldNames.ADDITIONAL_FILES]: [],
      [TeamMemberFormFieldNames.WORKING_HOURS]: handleAccountSchedule(account?.result.schedules || []),
      [TeamMemberFormFieldNames.PROJECT]: '',
      [TeamMemberFormFieldNames.PAYMENT]: account?.result.salary?.amount.toString() || '',
      [TeamMemberFormFieldNames.DURATION]: account?.result.salary?.duration || ('' as DurationEnum),
      [TeamMemberFormFieldNames.CURRENCY]: account?.result.salary?.currency || ''
    };
  }, [account]);

  const handleMemberEdit = async (values: typeof TEAM_MEMBER_FORM_INITIAL_VALUES) => {
    const accountSchedules = mapAccountSchedules(
      values[TeamMemberFormFieldNames.WORKING_HOURS]
    ) as AccountScheduleUpdateInput[];

    await updateAccount({
      variables: {
        input: {
          id,
          accountSchedules,
          amplua: values[TeamMemberFormFieldNames.ROLE],
          name: values[TeamMemberFormFieldNames.NAME],
          salary: {
            amount: parseInt(values[TeamMemberFormFieldNames.PAYMENT]),
            currency: values[TeamMemberFormFieldNames.CURRENCY],
            duration: values[TeamMemberFormFieldNames.DURATION]
          }
        }
      }
    });
  };

  const handleRemovalConfirm = async () => {
    await deactivateAccount({ variables: { id } });
  };

  const handleMemberDelete = async () => {
    await dispatch(handleDeleteAccountAC());

    if (countDeleted >= 2) {
      alertModalToggler.set();
    } else {
      await deactivateAccount({ variables: { id } });
    }
  };

  return (
    <CenteredPageLayout>
      {loading ? (
        <div className={s.HouseTeamEditMemberPage__spinner}>
          <div className={s.HouseTeamEditMemberPage__spinner}>
            <Spinner size="xl" color="text-brand" strokeWidth={6} />
          </div>
        </div>
      ) : (
        <TeamMemberForm
          onSubmit={handleMemberEdit}
          onDelete={handleMemberDelete}
          loading={updateAccountLoading || deactivateAccountLoading}
          initialValues={editedMemberInitialValues}
          memberCardTitle={'Edit member'}
        />
      )}

      <DeleteMemberAlertDialog
        isOpen={alertModalToggler.value}
        onClose={handleRemovalConfirm}
        onRemovalConfirm={alertModalToggler.unset}
      />
    </CenteredPageLayout>
  );
};
