import React from 'react';

import { TaskProjectCard } from 'common/components/ui/_cards/common/TaskProjectCard/TaskProjectCard';
import { ITask } from 'common/components/ui/_cards/TaskCard/types';

export interface ITaskCardProps {
  containerClassName?: string;
  isSelected?: boolean;

  onClick?: () => void;
  onSelect?: (isSelected: boolean) => void;
  onStartTask?: () => void;
  onStopTask?: () => void;
  task?: ITask;
}

// TODO add real props
export const TaskCard: React.FC<ITaskCardProps> = (props) => {
  const { onClick, onStartTask, onStopTask, task } = props;

  return (
    <TaskProjectCard
      onClick={onClick}
      isTask
      onStartTask={onStartTask}
      onStopTask={onStopTask}
      project={task as ITask}
    />
  );
};
