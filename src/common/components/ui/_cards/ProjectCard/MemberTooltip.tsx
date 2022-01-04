import React from 'react';

import s from 'common/components/ui/_cards/common/TaskProjectCard/TaskProjectCard.module.scss';
import { TeamMemberType } from 'routes/houseTeam/HouseTeamViewMembers/tempData';

type TRenderMemberTooltip = {
  member: TeamMemberType;
};

export const MemberTooltip = (props: TRenderMemberTooltip) => {
  const { member } = props;

  if (!member) return null;

  return (
    <div className={s.ProjectCardQuick__tooltip}>
      <span>Employee:</span>

      <br />

      <span>
        {member.name}

        <span className={s.tooltip__dot}>&thinsp; &#8226; &thinsp;</span>

        {member.role}
      </span>
    </div>
  );
};
