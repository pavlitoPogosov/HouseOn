import ImgPlaceholder from 'common/components/ui/_cards/TeamMemberCard/TeamMemberAvatar.png';

import { TDataItem, TGuestsWidgetProps } from './types.GuestsWidget';

const fakeDataGenerator = (n: number) =>
  Array(n)
    .fill(null)
    .map((_, i) => ({
      avatar: ImgPlaceholder,
      date: 'Until Wednesday',
      id: i,
      memberLink: '/',
      name: 'Ben Affleck'
    }));

/* TODO: подключить API */
export const useGuestsWidgetData = (): TGuestsWidgetProps => {
  const title = 'Guests';
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
