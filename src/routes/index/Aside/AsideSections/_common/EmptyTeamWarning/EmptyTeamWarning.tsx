import React from 'react';
import { useIntl } from 'react-intl';

import { HOUSE_TEAM_MEMBER_CREATION_PAGE_ROUTE } from 'utils/routes';

import { EmptySection } from '../_EmptySection/EmptySection';

export const EmptyTeamWarning = (): JSX.Element => {
  const intl = useIntl();

  return (
    <EmptySection
      buttonLink={HOUSE_TEAM_MEMBER_CREATION_PAGE_ROUTE}
      buttonText={intl.formatMessage({
        defaultMessage: 'Add a member',
        id: 'index.houseTeam.addMember.button'
      })}
      text={intl.formatMessage({
        defaultMessage: 'Add staff to manage processes in the house',
        id: 'index.houseTeam.addMember.description'
      })}
      textTitle={intl.formatMessage({
        defaultMessage: 'Set your house team',
        id: 'index.houseTeam.addMember.title'
      })}
    />
  );
};
