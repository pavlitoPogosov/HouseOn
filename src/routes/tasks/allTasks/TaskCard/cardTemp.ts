import { StatusState } from 'routes/tasks/_components/TaskViewModal/Status/Status';

export enum TaskTypeState {
  DEFAULT = 'default',
  FAST_TASK = 'fast_task'
}

export type ITaskCard = {
  status: StatusState;
  type: TaskTypeState;
  isHighPriority: boolean;
};

export const cardsTemp: ITaskCard[] = [
  { status: StatusState.IN_WORK, type: TaskTypeState.DEFAULT, isHighPriority: true },
  { status: StatusState.IN_WORK, type: TaskTypeState.FAST_TASK, isHighPriority: false },
  { status: StatusState.IN_WORK, type: TaskTypeState.FAST_TASK, isHighPriority: false },
  { status: StatusState.IN_WORK, type: TaskTypeState.DEFAULT, isHighPriority: true },
  { status: StatusState.IN_WORK, type: TaskTypeState.DEFAULT, isHighPriority: true },
  { status: StatusState.IN_WORK, type: TaskTypeState.FAST_TASK, isHighPriority: false },
  { status: StatusState.IN_WORK, type: TaskTypeState.FAST_TASK, isHighPriority: false },
  { status: StatusState.IN_WORK, type: TaskTypeState.DEFAULT, isHighPriority: true },
  { status: StatusState.IN_WORK, type: TaskTypeState.DEFAULT, isHighPriority: true }
];
