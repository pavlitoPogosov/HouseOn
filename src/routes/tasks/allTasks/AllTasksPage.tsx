import React from 'react';
import { useIntl } from 'react-intl';

import { appHistory } from 'appHistory';

import { useToggle } from '@proscom/ui-react';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { Button } from 'common/components/ui/Button/Button';
import { TextTabs, ITextTab } from 'common/components/ui/Tabs';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { useMediaQuery } from 'common/hooks/useMediaQuery';
import { UsualLayout } from 'routes/_layouts/UsualLayout/UsualLayout';
import { TaskCreateModal } from 'routes/tasks/_components/TaskCreateModal/TaskCreateModal';
import { TaskEditModal } from 'routes/tasks/_components/TaskEditModal/TaskEditModal';
import { TaskViewModal } from 'routes/tasks/_components/TaskViewModal/TaskViewModal';
import { cardsTemp } from 'routes/tasks/allTasks/TaskCard/cardTemp';
import { PROJECTS_PAGE_ROUTE, TASKS_PAGE_ROUTE } from 'utils/routes';

import { AllTasksControls } from './AllTasksControls/AllTasksControls';
import { TaskCard } from './TaskCard/TaskCard';

import s from './AllTasksPage.module.scss';

export const AllTasksPage: React.FC<unknown> = () => {
  const intl = useIntl();

  const isDesktop = useMediaQuery('(min-width: 768px)');

  const viewModal = useToggle();
  const createModal = useToggle();
  const editModal = useToggle();

  const TABS: ITextTab[] = [
    {
      text: intl.formatMessage({ defaultMessage: 'Projects', id: 'app.route.projects' }),
      value: PROJECTS_PAGE_ROUTE
    },
    {
      text: intl.formatMessage({ defaultMessage: 'Tasks', id: 'app.route.tasks' }),
      value: TASKS_PAGE_ROUTE
    }
  ];

  const CONTENT_SECTIONS = [
    { tasksCount: 4, title: 'Дата' },
    { tasksCount: 3, title: 'Дата' },
    { tasksCount: 2, title: 'Дата' }
  ];

  const handleTabsChange = (value: string) => {
    appHistory.push(value);
  };

  const handleStateModal = (modalClose: { unset: () => void }, modalOpen: { set: () => void }) => {
    return () => {
      modalClose.unset();
      process.nextTick(() => modalOpen.set());
    };
  };

  return (
    <UsualLayout>
      <div className={s.AllTasksPage__header}>
        <TextTabs
          containerClassName={s.AllTasksPage__tabs}
          onChange={handleTabsChange}
          size="l"
          tabClassName={s.AllTasksPage__tab}
          tabs={TABS}
          value={TASKS_PAGE_ROUTE}
        />
        <Button
          className={s.nav__task_button}
          color="orange"
          leftIcon={<PlusIcon className={s.nav__task_button_icon} />}
          size="s"
          variant="primary"
          onClick={createModal.set}>
          {isDesktop &&
            intl.formatMessage({
              defaultMessage: 'New task',
              id: 'projects.button.newTask'
            })}
        </Button>
      </div>

      <AllTasksControls />

      {CONTENT_SECTIONS.map((section, i) => (
        <React.Fragment key={i}>
          <Text
            className={s.AllTasksPage__title}
            color="textSecondary"
            text="Date"
            variant={TextPropsVariantsEnum.CAPTION_M}
          />

          <div className={s.AllTasksPage__section}>
            {cardsTemp.map((card, index) => (
              <TaskCard key={index} card={card} containerClassName={s.AllTasksPage__item} onClick={viewModal.set} />
            ))}
          </div>
        </React.Fragment>
      ))}

      <TaskEditModal
        isOpen={editModal.value}
        onClose={editModal.unset}
        onBack={handleStateModal(editModal, viewModal)}
      />
      <TaskViewModal
        isOpen={viewModal.value}
        onClose={viewModal.unset}
        onEdit={handleStateModal(viewModal, editModal)}
      />
      <TaskCreateModal isOpen={createModal.value} onClose={createModal.unset} />
    </UsualLayout>
  );
};
