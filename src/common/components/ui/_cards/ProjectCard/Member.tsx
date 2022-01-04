import React from 'react';
import { Link } from 'react-router-dom';

import { TeamMemberType } from 'routes/houseTeam/HouseTeamViewMembers/tempData';
import { HOUSE_TEAM_PAGE_ROUTE } from 'utils/routes';

import { NavigationLink } from '../../NavigationLink/NavigationLink';

type TMember = {
  className?: string;
  member: TeamMemberType | null;
};

export const Member = (props: TMember) => {
  const { className, member } = props;

  if (!member) {
    return null;
  }

  return (
    <NavigationLink as={Link} className={className} isUnderline to={HOUSE_TEAM_PAGE_ROUTE}>
      &thinsp;
      {member.name}
    </NavigationLink>
  );
};
