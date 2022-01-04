import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router';

import { useToggle } from '@proscom/ui-react';
import { CreatedEntityLinkDialogContent } from 'common/components/ui/_dialogs/CreatedEntityLinkDialogContent/CreatedEntityLinkDialogContent';
import { ColorfulIconTypes } from 'common/components/ui/ColorfulIcon/ColorfulIcon';
import { Dialog } from 'common/components/ui/Dialog/Dialog';
import { useMutationWithError } from 'common/hooks/useMutationWithError';
import { FRAGMENT_ACCOUNT } from 'graphql/fragments/accountsFragment';
import { MUTATION_CREATE_ACCOUNT_INVITE } from 'graphql/mutations/accounts';
import { AccountRolesEnum, AccountScheduleCreateInput, InviteToHouseCreateInput, InviteType } from 'graphql/types';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { createToast } from 'redux/slices/toastSlice/actionCreators';
import { CenteredPageLayout } from 'routes/_layouts/CenteredPageLayout/CenteredPageLayout';
import { mapAccountSchedules } from 'utils/mapAccountSchedules';
import { HOUSE_TEAM_PAGE_ROUTE, INVITE_PAGE_ROUTE } from 'utils/routes';

import {
  TEAM_MEMBER_FORM_INITIAL_VALUES,
  TeamMemberForm,
  TeamMemberFormFieldNames
} from '../_common/TeamMemberForm/TeamMemberForm';

export interface HouseTeamCreateMemberPageProps {}

export const HouseTeamCreateMemberPage: React.FC<HouseTeamCreateMemberPageProps> = () => {
  const modalToggler = useToggle();
  const history = useHistory();
  const dispatch = useTypedDispatch();
  const intl = useIntl();

  const [memberInviteLink, setMemberInviteLink] = useState('');

  const [createInvite, { loading }] = useMutationWithError<{ result: InviteType }, { input: InviteToHouseCreateInput }>(
    MUTATION_CREATE_ACCOUNT_INVITE,
    {
      update(cache, { data }) {
        cache.modify({
          fields: {
            houseAccounts(existingAccounts = []) {
              if (data) {
                const newAccountRef = cache.writeFragment({
                  data: data.result.account,
                  fragment: FRAGMENT_ACCOUNT,
                  fragmentName: 'Account'
                });
                return [...existingAccounts, newAccountRef];
              } else {
                return existingAccounts;
              }
            }
          }
        });
      },
      onCompleted({ result }) {
        setMemberInviteLink(window.origin + INVITE_PAGE_ROUTE.replace(':inviteId', result.public_uuid));
        modalToggler.set();
      },
      onError() {
        dispatch(
          createToast({
            title: intl.formatMessage({
              id: 'houseTeam.createMember.errorTitle',
              defaultMessage: 'Oops'
            }),
            text: intl.formatMessage({
              id: 'houseTeam.createMember.errorText',
              defaultMessage: 'Failed to create member. Please, try again'
            }),
            type: 'error'
          })
        );
      }
    }
  );

  const handleMemberCreation = async (values: typeof TEAM_MEMBER_FORM_INITIAL_VALUES) => {
    const accountSchedules = mapAccountSchedules(
      values[TeamMemberFormFieldNames.WORKING_HOURS]
    ) as AccountScheduleCreateInput[];

    await createInvite({
      variables: {
        input: {
          account: {
            amplua: values[TeamMemberFormFieldNames.ROLE],
            role: AccountRolesEnum.Worker,
            name: values[TeamMemberFormFieldNames.NAME]
          },
          accountSchedules,
          salary: {
            amount: parseInt(values[TeamMemberFormFieldNames.PAYMENT]),
            currency: values[TeamMemberFormFieldNames.CURRENCY],
            duration: values[TeamMemberFormFieldNames.DURATION]
          }
        }
      }
    });
  };

  return (
    <CenteredPageLayout>
      <TeamMemberForm memberCardTitle={'New team member'} onSubmit={handleMemberCreation} loading={loading} />
      <Dialog
        isOpen={modalToggler.value}
        onClose={() => history.push(HOUSE_TEAM_PAGE_ROUTE)}
        title={intl.formatMessage({
          id: 'houseTeam.dialog.newTeamMember.title',
          defaultMessage: 'New team member'
        })}
        icon={ColorfulIconTypes.GUEST_SETTINGS}>
        <CreatedEntityLinkDialogContent
          title={intl.formatMessage({
            id: 'houseTeam.dialog.newTeamMember.created.title',
            defaultMessage: 'A team member is created'
          })}
          description={intl.formatMessage({
            id: 'houseTeam.dialog.newTeamMember.created.description',
            defaultMessage:
              'Now you can share invite link with your team member. In case you’ll need to copy the link again it will be in the House Team list and widget on the home ownership page'
          })}
          link={memberInviteLink}
        />
      </Dialog>
    </CenteredPageLayout>
  );
};
