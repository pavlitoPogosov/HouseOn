import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import { ReactComponent as DashboardIcon } from 'assets/icons/dashboard.svg';
import { ReactComponent as RocketIcon } from 'assets/icons/rocket.svg';
import { ProjectCard } from 'common/components/ui/_cards/ProjectCard/ProjectCard/ProjectCard';
import { IProject } from 'common/components/ui/_cards/ProjectCard/types';
import { Banner } from 'common/components/ui/Banner/Banner';
import { Button } from 'common/components/ui/Button/Button';
import { SortByPopup, SortByPopupOption } from 'common/components/ui/SortByPopup/SortByPopup';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { PROJECTS_QUICK, PROJECTS } from 'routes/projects/temp-data';
import { PROJECTS_PAGE_SINGLE_PROJECT } from 'utils/routes';

import { QuickProjectDialog } from './QuickProjectDialog/QuickProjectDialog';

import s from './AllProjectsSections.module.scss';

const SHOW_SELECT_OPTIONS: SortByPopupOption[] = [{ text: 'All states', value: 'all states' }];

export const AllProjectsSections: React.FC<unknown> = () => {
  const [activeQuickProject, setActiveQuickProject] = useState<null | IProject>(null);

  const intl = useIntl();
  const history = useHistory();

  const handleSortChange = () => {};

  const handleQuickProjectClick = (selectedProject: IProject | null) => {
    return () => setActiveQuickProject(selectedProject);
  };

  const handleProjectClick = (selectedProject: IProject) => {
    history.push(PROJECTS_PAGE_SINGLE_PROJECT.replace(':id(\\d+)', selectedProject.id));
  };

  return (
    <>
      {activeQuickProject && (
        <QuickProjectDialog
          isOpen={!!activeQuickProject}
          onClose={handleQuickProjectClick(null)}
          project={activeQuickProject}
        />
      )}

      <div className={s.AllProjectsSections__titleWithControls}>
        <Text className={s.AllProjectsSections__title} variant={TextPropsVariantsEnum.H3}>
          <>
            <RocketIcon className={s.AllProjectsSections__title_icon} />

            {intl.formatMessage({
              defaultMessage: 'Quick projects',
              id: 'projects.quick.title'
            })}
          </>
        </Text>

        <SortByPopup
          containerClassName={s.AllProjectsSections__sortPopup}
          onChange={handleSortChange}
          options={SHOW_SELECT_OPTIONS}
          selectedOption={SHOW_SELECT_OPTIONS[0]}
          selectedTextPrefix="Show:"
        />
      </div>

      <section className={s.AllProjectsSections__section}>
        {PROJECTS_QUICK.map((project) => {
          const { id } = project;

          return (
            <ProjectCard
              isActive={activeQuickProject?.id === id}
              key={id}
              onClick={handleQuickProjectClick(project)}
              project={project}
            />
          );
        })}

        <div className={s.AllProjectsSections__showMore}>
          <Button className={s.showMore__button} color="grey" size="s" variant="primary">
            <FormattedMessage defaultMessage="Show all" id="projects.button.showAll" />
          </Button>
        </div>
      </section>

      <Text className={s.AllProjectsSections__title} variant={TextPropsVariantsEnum.H3}>
        <>
          <DashboardIcon className={s.AllProjectsSections__title_icon} />

          {intl.formatMessage({
            defaultMessage: 'Basic',
            id: 'projects.basic.title'
          })}
        </>
      </Text>

      <section className={s.AllProjectsSections__section}>
        <Banner
          containerClassName={s.AllProjectsSections__banner}
          title={intl.formatMessage({
            defaultMessage: 'Switch on basic projects to start main operation in the house',
            id: 'projects.quick.banner.title'
          })}
          titleClassName={s.AllProjectsSections__bannerTitle}
          variant="primary">
          <Link className={s.AllProjectsSections__bannerLink} to="/">
            <FormattedMessage defaultMessage="Learn more" id="app.button.learnMore" />
          </Link>
        </Banner>

        {PROJECTS.map((project) => {
          const { id } = project;

          return <ProjectCard key={id} onClick={() => handleProjectClick(project)} project={project} />;
        })}

        <div className={s.AllProjectsSections__showMore}>
          <Button className={s.showMore__button} color="grey" size="s" variant="primary">
            <FormattedMessage defaultMessage="Show all" id="projects.button.showAll" />
          </Button>
        </div>
      </section>
    </>
  );
};
