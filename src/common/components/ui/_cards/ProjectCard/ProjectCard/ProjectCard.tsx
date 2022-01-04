import React from 'react';

import { appHistory } from 'appHistory';
import clsx from 'clsx';

import { TaskProjectCard } from 'common/components/ui/_cards/common/TaskProjectCard/TaskProjectCard';
import s from 'common/components/ui/_cards/ProjectCard/ProjectCard/ProjectCard.module.scss';
import { ProjectCardContent } from 'common/components/ui/_cards/ProjectCard/ProjectCard/ProjectCardContent/ProjectCardContent';
import { ProjectCardImg } from 'common/components/ui/_cards/ProjectCard/ProjectCard/ProjectCardImg/ProjectCardImg';
import { IProject } from 'common/components/ui/_cards/ProjectCard/types';
import { PROJECTS_PAGE_SINGLE_PROJECT } from 'utils/routes';

export interface IProjectCardProps {
  containerClassName?: string;
  isActive?: boolean;
  onClick?: () => void;
  project: IProject;
}

export const ProjectCard: React.FC<IProjectCardProps> = (props) => {
  const { containerClassName, isActive, onClick, project } = props;

  const { isQuick } = project || {};

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    } else {
      appHistory.push(PROJECTS_PAGE_SINGLE_PROJECT.replace(':id(\\d+)', project.id));
    }
  };

  return isQuick ? (
    <article
      className={clsx(s.ProjectCard__container, isActive && s.active, containerClassName)}
      onClick={handleCardClick}>
      <div className={s.ProjectCard__quick_container}>
        <TaskProjectCard project={project} />
      </div>
    </article>
  ) : (
    <article
      className={clsx(s.ProjectCard__container, isActive && s.active, containerClassName)}
      onClick={handleCardClick}>
      <ProjectCardImg project={project} />

      <ProjectCardContent project={project} />
    </article>
  );
};
