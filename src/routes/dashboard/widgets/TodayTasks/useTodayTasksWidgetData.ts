import { TData } from 'common/components/ui/_charts/CircleChart/CircleChart';
import { EColors } from 'variables/colors';

import { TTodayTasksWidgetProps } from './types.TodayTasksWidget';

/* TODO: подключить API */
export const useTodayTasksWidgetData = (): TTodayTasksWidgetProps => {
  const title = 'Today tasks';
  const isDataLoading = false;

  const chartData: TData = [
    {
      color: EColors.ORANGE200,
      label: 'Overdue',
      value: 12
    },
    {
      color: EColors.GREEN200,
      label: 'Completed tasks',
      value: 8
    },
    {
      color: EColors.GREY200,
      label: 'Active',
      value: 12
    }
  ];

  const total = chartData?.reduce((curr, dataItem) => curr + dataItem.value, 0);
  const newTasksNumber = 8;

  return {
    chartData,
    isDataLoading,
    newTasksNumber,
    title,
    total
  };
};
