import React from 'react';

import { EStatusBadgeTypesEnum } from 'common/components/ui/_badges/StatusBadge/StatusBadge';
import { ITask } from 'common/components/ui/_cards/TaskCard/types';
import { TASKS_BY_ME, TASKS_BY_OTHER } from 'routes/projects/temp-data';

import { ProjectInfo } from './ProjectInfo/ProjectInfo';
import { ProjectTasks } from './ProjectTasks/ProjectTasks';

import s from './SingleProjectsTasks.module.scss';

export interface ISingleProjectsTasksProps {
  isPaused: boolean;
  onSettingsClick: () => void;
  onStartProject: () => void;
  onStartTask: (task: ITask) => void;
  onStopProject: () => void;
  onStopTask: (task: ITask) => void;
  statusType: EStatusBadgeTypesEnum;
}

// FIX back link icon
export const SingleProjectsTasks: React.FC<ISingleProjectsTasksProps> = (props) => {
  const { isPaused, onSettingsClick, onStartProject, onStartTask, onStopProject, onStopTask, statusType } = props;

  /* TODO: fetch real tasks */
  const tasks = [...TASKS_BY_ME, ...TASKS_BY_OTHER];

  return (
    <section className={s.SingleProjectsTasks__container}>
      <div className={s.SingleProjectsTasks__content}>
        <ProjectInfo
          isPaused={isPaused}
          onSettingsClick={onSettingsClick}
          onStartProject={onStartProject}
          onStopProject={onStopProject}
          statusType={statusType}
        />

        <ProjectTasks onStartTask={onStartTask} onStopTask={onStopTask} tasks={tasks} />
      </div>
    </section>
  );
};
