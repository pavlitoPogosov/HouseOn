import React from 'react';

import clsx from 'clsx';

import { ReactComponent as LightningIcon } from 'assets/icons/lightning.svg';
import { StatusBadge } from 'common/components/ui/_badges/StatusBadge/StatusBadge';
import { getRightStatusType } from 'common/components/ui/_cards/ProjectCard/getRightStatusType';
import s from 'common/components/ui/_cards/ProjectCard/ProjectCard/ProjectCardImg/ProjectCardImg.module.scss';
import { IProject } from 'common/components/ui/_cards/ProjectCard/types';

export interface IProjectCardImgProps {
  project: IProject;
}

export const ProjectCardImg: React.FC<IProjectCardImgProps> = (props) => {
  const { project } = props;

  const { img, isQuick } = project;
  const statusType = getRightStatusType(project);

  return (
    <div className={clsx(s.ProjectCardImg__container, isQuick && s.quickProject)}>
      {!isQuick && img && <img alt="" src={img} />}

      {isQuick && (
        <div className={s.ProjectCardImg__quickIcon}>
          <LightningIcon />
        </div>
      )}

      <StatusBadge containerClassName={s.ProjectCardImg__badge} statusType={statusType} />
    </div>
  );
};
