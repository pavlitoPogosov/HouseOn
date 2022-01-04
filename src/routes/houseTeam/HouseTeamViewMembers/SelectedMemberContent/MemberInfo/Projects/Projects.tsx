import React from 'react';
import { useIntl } from 'react-intl';

import { ProjectCard } from 'common/components/ui/_cards/ProjectCard/ProjectCard/ProjectCard';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { AccountType } from 'graphql/types';
import { PROJECTS, PROJECTS_QUICK } from 'routes/projects/temp-data';

import s from './Projects.module.scss';

export interface IProjectsProps {
  selectedMember: AccountType;
}

export const Projects: React.FC<IProjectsProps> = ({ selectedMember }) => {
  const intl = useIntl();

  return (
    <>
      <Text
        as="h3"
        className={s.Projects__title}
        text={intl.formatMessage({ defaultMessage: 'Quick projects', id: 'houseTeam.projects.quick.title' })}
        variant={TextPropsVariantsEnum.BODY_L}
      />

      <div className={s.Projects__section}>
        {PROJECTS_QUICK.map((project, i) => (
          <ProjectCard key={i} project={project} />
        ))}
      </div>

      <Text
        as="h3"
        className={s.Projects__title}
        text={intl.formatMessage({ defaultMessage: 'Basic projects', id: 'houseTeam.projects.basic.title' })}
        variant={TextPropsVariantsEnum.BODY_L}
      />

      <div className={s.Projects__section}>
        {PROJECTS.map((project, i) => (
          <ProjectCard key={i} project={project} />
        ))}
      </div>
    </>
  );
};
