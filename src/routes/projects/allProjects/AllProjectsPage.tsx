import React from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router';

import { useToggle } from '@proscom/ui-react';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { Button } from 'common/components/ui/Button';
import { TextTabs, ITextTab } from 'common/components/ui/Tabs';
import { useMediaQuery } from 'common/hooks/useMediaQuery';
import { UsualLayout } from 'routes/_layouts/UsualLayout/UsualLayout';
import { TaskCreateModal } from 'routes/tasks/_components/TaskCreateModal/TaskCreateModal';
import { PROJECTS_PAGE_ROUTE, TASKS_PAGE_ROUTE } from 'utils/routes';

import { AllProjectsSections } from './AllProjectsSections/AllProjectsSections';

import s from './AllProjectsPage.module.scss';

const TABS: ITextTab[] = [
  { text: 'Projects', value: PROJECTS_PAGE_ROUTE },
  { text: 'Tasks', value: TASKS_PAGE_ROUTE }
];

export const AllProjectsPage: React.FC<unknown> = () => {
  const history = useHistory();

  const createTaskModal = useToggle();

  const handleTabsChange = (value: string) => {
    history.push(value);
  };

  const isDesktop = useMediaQuery('(min-width: 768px)');
  const intl = useIntl();

  return (
    <UsualLayout>
      <div className={s.AllProjectsPage__nav_container}>
        <TextTabs
          containerClassName={s.nav__tabs}
          onChange={handleTabsChange}
          size="l"
          tabs={TABS}
          value={PROJECTS_PAGE_ROUTE}
        />

        <Button
          className={s.nav__task_button}
          color="orange"
          leftIcon={<PlusIcon className={s.nav__task_button_icon} />}
          size="s"
          variant="primary"
          onClick={createTaskModal.set}
        >
          {isDesktop &&
            intl.formatMessage({
              defaultMessage: 'New task',
              id: 'projects.button.newTask'
            })}
        </Button>
      </div>
      <TaskCreateModal isOpen={createTaskModal.value} onClose={createTaskModal.unset} />
      <AllProjectsSections />
    </UsualLayout>
  );
};
