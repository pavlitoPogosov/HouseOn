import { LegacyRef } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';

import { TActivityCard } from 'common/components/ui/_cards/ActivityCard/ActivityCard';

type TDataItem = Pick<TActivityCard, 'activityAuthor' | 'activityDate' | 'activityTarget' | 'activityText' | 'comment'>;

export type TLastActivityWidgetProps = {
  buttonNewActivityLabel: string;
  data: TDataItem[];
  isButtonClicked: boolean;
  isDataLoading?: boolean;
  isScrolled: boolean;
  onActivityButtonClick: () => void;
  onScroll: () => void;
  scrollRef: LegacyRef<Scrollbars> | null;
};
