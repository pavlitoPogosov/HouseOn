import { TData } from 'common/components/ui/_charts/CircleChart/CircleChart';

export type TTodayTasksWidgetProps = {
  chartData: TData;
  isDataLoading?: boolean;
  newTasksNumber?: number;
  title: string;
  total: number;
};
