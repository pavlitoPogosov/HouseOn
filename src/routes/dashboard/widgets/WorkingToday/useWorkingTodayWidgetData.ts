import ImgPlaceholder from 'common/components/ui/_cards/TeamMemberCard/TeamMemberAvatar.png';

import { TDataItem, TWorkingTodayWidgetProps } from './types.WorkingTodayWidget';

const fakeDataGenerator = (n: number) =>
  Array(n)
    .fill(null)
    .map((_, i) => ({
      avatar: ImgPlaceholder,
      id: i,
      isOnline: n % 3 === 0,
      memberLink: '/',
      name: 'Ben Affleck',
      role: 'Gardener',
      tasks: 25
    }));

/* TODO: подключить API */
export const useWorkingTodayWidgetData = (): TWorkingTodayWidgetProps => {
  const title = 'Working today';
  const isDataLoading = false;

  const data: TDataItem[] = fakeDataGenerator(12);

  const onMessageClick = (id: number) => {};

  return {
    data,
    isDataLoading,
    onMessageClick,
    title
  };
};
