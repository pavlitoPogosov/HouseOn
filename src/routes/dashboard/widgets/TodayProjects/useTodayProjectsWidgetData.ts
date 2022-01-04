import { TDataItem } from 'common/components/ui/_charts/ColumnBarChart/ColumnBarChart';
import { EColors } from 'variables/colors';

import { TTodayProjectsWidgetProps } from './types.TodayProjectsWidget';

export enum ETaskStatuses {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  OVERDUE = 'overdue'
}

export enum ETasksGroups {
  ACTIVE = 'Active tasks',
  COMPLETED = 'Completed tasks',
  OVERDUE = 'Overdue tasks'
}

export type TTask = {
  group: ETasksGroups;
  id: number;
  status: ETaskStatuses;
  title: string;
};

const fakeTasksGenerator = (n: number): TTask[] => {
  return Array(n)
    .fill(null)
    .map((_, id) => {
      let status = ETaskStatuses.ACTIVE;
      let group = ETasksGroups.ACTIVE;

      if (id % 7 === 0) {
        status = ETaskStatuses.OVERDUE;
        group = ETasksGroups.OVERDUE;
      } else if (id % 3 === 0) {
        status = ETaskStatuses.COMPLETED;
        group = ETasksGroups.COMPLETED;
      }

      return {
        group,
        id,
        status,
        title: 'Cleanliness and order in the house'
      };
    });
};

/* TODO: подключить API */
export const useTodayProjectsWidgetData = (): TTodayProjectsWidgetProps => {
  const tasks = fakeTasksGenerator(30);

  const activeTasks = tasks.filter((task) => task.status === ETaskStatuses.ACTIVE);
  const overdueTasks = tasks.filter((task) => task.status === ETaskStatuses.OVERDUE);
  const completedTasks = tasks.filter((task) => task.status === ETaskStatuses.COMPLETED);

  const chartData: TDataItem[] = [
    {
      color: EColors.BLUE200,
      group: ETasksGroups.ACTIVE,
      label: ETaskStatuses.ACTIVE,
      value: activeTasks.length
    },
    {
      color: EColors.RED200,
      group: ETasksGroups.OVERDUE,
      label: ETaskStatuses.OVERDUE,
      value: overdueTasks.length
    },
    {
      color: EColors.GREEN200,
      group: ETasksGroups.COMPLETED,
      label: ETaskStatuses.COMPLETED,
      value: completedTasks.length
    }

    // {
    //   color: EColors.YELLOW200,
    //   group: 'another',
    //   label: 'Another tasks',
    //   value: 19,
    // },
  ];

  return {
    activeTasks,
    chartData,
    completedTasks,
    overdueTasks,
    tasks
  };
};
