import React from 'react';
import { Link } from 'react-router-dom';

import moment from 'moment';

import { IProject } from 'common/components/ui/_cards/ProjectCard/types';
import { TeamMemberType } from 'routes/houseTeam/HouseTeamViewMembers/tempData';
import { HOUSE_TEAM_PAGE_ROUTE } from 'utils/routes';

import { NavigationLink } from '../../NavigationLink/NavigationLink';

import s from './ProjectCard/ProjectCardContent/ProjectCardContent.module.scss';

const CARD_TIME_FORMAT = 'DD.MM.YY';

const renderAuthor = (author: TeamMemberType | null) => {
  if (!author) {
    return null;
  }

  return (
    <NavigationLink as={Link} className={s.ProjectCardContent__link} isUnderline to={HOUSE_TEAM_PAGE_ROUTE}>
      &thinsp;
      {author.name}
    </NavigationLink>
  );
};

export const ProjectCardDescription = (props: IProject): JSX.Element => {
  const { author, changedTime, comment, endTime, pausedTime, startTime, tasks } = props;

  if (comment) {
    return <>{comment}</>;
  }

  if (changedTime && !endTime) {
    return (
      <>
        <div className={s.ProjectCardContent__description_text}>
          {`Changed ${moment(changedTime).format(CARD_TIME_FORMAT)} by`}
        </div>

        {renderAuthor(author)}
      </>
    );
  }

  if (pausedTime && !endTime) {
    return (
      <>
        <div className={s.ProjectCardContent__description_text}>
          {`Paused ${moment(pausedTime).format(CARD_TIME_FORMAT)} by`}
        </div>

        {renderAuthor(author)}
      </>
    );
  }

  if (startTime && !endTime) {
    return (
      <>
        <div className={s.ProjectCardContent__description_text}>
          {`Started ${moment(startTime).format(CARD_TIME_FORMAT)} by`}
        </div>

        {renderAuthor(author)}
      </>
    );
  }

  if (!tasks.length) {
    // TODO add case for no tasks
    return (
      <>
        <div className={s.ProjectCardContent__description_text}>No avaliable tasks yet</div>

        {/*{renderAuthor(author)}*/}
      </>
    );
  }

  return (
    <>
      <div className={s.ProjectCardContent__description_text}>Created by</div>

      {renderAuthor(author)}
    </>
  );
};
