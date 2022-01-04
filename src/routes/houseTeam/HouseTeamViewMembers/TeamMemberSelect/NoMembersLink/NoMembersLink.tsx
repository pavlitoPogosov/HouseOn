import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { ButtonLink } from 'common/components/ui/Button/Button';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { HOUSE_TEAM_MEMBER_CREATION_PAGE_ROUTE } from 'utils/routes';

import s from './NoMembersLink.module.scss';

export interface NoMembersLinkProps {}

export const NoMembersLink: React.FC<NoMembersLinkProps> = () => {
  const intl = useIntl();

  return (
    <div className={s.NoMembersLink__container}>
      <Text
        text={intl.formatMessage({
          id: 'houseTeam.noMember.advice',
          defaultMessage: 'Add a new team member and perform your house managing successfully.'
        })}
        variant={TextPropsVariantsEnum.BODY_M}
        className={s.NoMembersLink__text}
        color="textSecondary"
      />

      <ButtonLink to={HOUSE_TEAM_MEMBER_CREATION_PAGE_ROUTE} variant="secondary" color="orange">
        <FormattedMessage id="houseTeam.button.addTeamMember" defaultMessage="Add a team member" />
      </ButtonLink>
    </div>
  );
};
