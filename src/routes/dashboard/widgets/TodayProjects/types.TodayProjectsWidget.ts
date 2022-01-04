import { TDataItem } from 'common/components/ui/_charts/ColumnBarChart/ColumnBarChart';

import { TTask } from './useTodayProjectsWidgetData';

export type TTodayProjectsWidgetProps = {
  activeTasks: TTask[];
  chartData: TDataItem[];
  completedTasks: TTask[];
  isDataLoading?: boolean;
  overdueTasks: TTask[];
  tasks: TTask[];
};
