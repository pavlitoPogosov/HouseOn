import React from 'react';

import clsx from 'clsx';

import { ReactComponent as ClockIcon } from 'assets/icons/clock.svg';
import s from 'common/components/ui/_cards/ProjectCard/ProjectCard/ProjectCardContent/ProjectCardContent.module.scss';
import { ProjectCardDescription } from 'common/components/ui/_cards/ProjectCard/ProjectCardDescription';
import { IProject } from 'common/components/ui/_cards/ProjectCard/types';
import {
  Text,
  TextPropsVariantsEnum,
} from 'common/components/ui/Text/Text';

export interface IProjectCardContentProps {
  project: IProject;
}

// TODO add arrow to tooltip
export const ProjectCardContent: React.FC<IProjectCardContentProps> = props => {
  const { project } = props;

  const {
    author,
    tasks,
    title,
  } = project;

  return (
    <div className={s.ProjectCardContent__container}>
      <Text
        className={s.ProjectCardContent__title}
        text={title}
        variant={TextPropsVariantsEnum.BODY_M}
      />

      <div className={s.ProjectCardContent__info}>
        {!!tasks.length && <ClockIcon className={s.ProjectCardContent__clock} />}

        <Text
          className={clsx(s.ProjectCardContent__description, author && s.withAuthor)}
          color="textTretiary"
          variant={TextPropsVariantsEnum.CAPTION_R}
        >
          <ProjectCardDescription {...project} />
        </Text>
      </div>
    </div>
  );
};
