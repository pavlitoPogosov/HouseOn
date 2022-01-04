import ImgPlaceholder from 'common/components/ui/_cards/TeamMemberCard/TeamMemberAvatar.png';

import { TDataItem, TPendingInvitesWidgetProps } from './types.PendingInvitesWidget';

const fakeDataGenerator = (n: number) =>
  Array(n)
    .fill(null)
    .map((_, i) => ({
      avatar: ImgPlaceholder,
      date: 'Yesterday',
      id: i,
      memberLink: '/',
      name: 'Ben Affleck'
    }));

/* TODO: подключить API */
export const usePendingInvitesWidgetData = (): TPendingInvitesWidgetProps => {
  const title = 'Pending invites';
  const isDataLoading = false;

  const data: TDataItem[] = fakeDataGenerator(12);

  const onEditClick = (id: number) => {};
  const onCopyClick = (id: number) => {};

  return {
    data,
    isDataLoading,
    onCopyClick,
    onEditClick,
    title
  };
};
