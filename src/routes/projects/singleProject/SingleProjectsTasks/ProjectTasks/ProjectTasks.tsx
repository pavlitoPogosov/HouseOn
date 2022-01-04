import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { useToggle } from '@proscom/ui-react';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { CounterBadge } from 'common/components/ui/_badges/CounterBadge/CounterBadge';
import { TaskCard } from 'common/components/ui/_cards/TaskCard/TaskCard';
import { ITask } from 'common/components/ui/_cards/TaskCard/types';
import { ButtonLink } from 'common/components/ui/Button';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { useMediaQuery } from 'common/hooks/useMediaQuery';
import { TaskCreateModal } from 'routes/tasks/_components/TaskCreateModal/TaskCreateModal';
import { TaskEditModal } from 'routes/tasks/_components/TaskEditModal/TaskEditModal';
import { TaskViewModal } from 'routes/tasks/_components/TaskViewModal/TaskViewModal';
import { PROJECTS_PAGE_ROUTE } from 'utils/routes';

import s from './ProjectTasks.module.scss';

type TProjectTasks = {
  onStartTask: (task: ITask) => void;
  onStopTask: (task: ITask) => void;
  tasks: ITask[];
};

type TSortedTasks = {
  [author: string]: ITask[];
};

export const sortTasksByAuthor = (tasks: ITask[]) =>
  tasks.reduce((sorted: TSortedTasks, task) => {
    const author = task.author?.name;

    if (author) {
      if (sorted[author]) {
        return {
          ...sorted,
          [author]: [...sorted[author], task]
        };
      }

      return {
        ...sorted,
        [author]: [task]
      };
    }

    return sorted;
  }, {});

export const ProjectTasks: React.FC<TProjectTasks> = ({ onStartTask, onStopTask, tasks }) => {
  const viewModal = useToggle();
  const createModal = useToggle();
  const editModal = useToggle();

  const intl = useIntl();

  const sortedTasks = sortTasksByAuthor(tasks);

  const counterText = tasks ? String(tasks?.length) : undefined;

  const isDesktop = useMediaQuery('(min-width: 768px)');

  const handleStateModal = (modalClose: { unset: () => void }, modalOpen: { set: () => void }) => {
    return () => {
      modalClose.unset();
      process.nextTick(() => modalOpen.set());
    };
  };

  return (
    <>
      <div className={s.ProjectTasks__nav}>
        <Text className={s.nav__title} variant={TextPropsVariantsEnum.H3}>
          <FormattedMessage defaultMessage="Tasks in the project" id="projects.tasks.title" />

          <CounterBadge className={s.nav__counter} color="gray" size="l" text={counterText} />
        </Text>

        <ButtonLink
          className={s.nav__task_button}
          color="orange"
          leftIcon={<PlusIcon className={s.nav__task_button_icon} />}
          size="s"
          to={PROJECTS_PAGE_ROUTE}
          variant="primary"
          onClick={createModal.set}>
          {isDesktop &&
            intl.formatMessage({
              defaultMessage: 'New task',
              id: 'projects.button.newTask'
            })}
        </ButtonLink>
      </div>

      {Object.entries(sortedTasks).map(([author, authorTasks]) => {
        return (
          <section key={author} className={s.ProjectTasks__section}>
            <div className={s.ProjectTasks__sectionTitle}>
              <Text
                color="textSecondary"
                text={intl.formatMessage({
                  defaultMessage: `Created by ${author}`,
                  id: 'projects.tasks.created.title'
                })}
                variant={TextPropsVariantsEnum.CAPTION_M}
              />
            </div>

            <div className={s.ProjectTasks__sectionContent}>
              {authorTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  onClick={viewModal.set}
                  onStartTask={() => onStartTask(task)}
                  onStopTask={() => onStopTask(task)}
                  task={task}
                />
              ))}
            </div>

            <>
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
            </>
          </section>
        );
      })}
    </>
  );
};
