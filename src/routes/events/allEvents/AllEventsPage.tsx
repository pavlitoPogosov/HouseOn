import React, { useState } from 'react';

import { IUsualTab } from 'common/components/ui/Tabs';
import { SortingDirectionEnum } from 'graphql/types';
import { UsualLayout } from 'routes/_layouts/UsualLayout/UsualLayout';
import { EVENTS_PAGE_ROUTE } from 'utils/routes';

import { useEventToast } from '../_common/hooks/useEventToast';

import { EventsControls } from './EventsControls/EventsControls';
import { EventsList } from './EventsList/EventsList';

export enum AllEventsTabsValues {
  ACTIVE = 'active',
  ARCHIVE = 'archive'
}

export const ALL_EVENTS_TABS: IUsualTab[] = [
  { text: 'Active', value: AllEventsTabsValues.ACTIVE },
  { text: 'Archive', value: AllEventsTabsValues.ARCHIVE }
];

export const AllEventsPage: React.FC<unknown> = () => {
  const [direction, setDirection] = useState(SortingDirectionEnum.Desc);
  const [chosenTab, setChosenTab] = useState(ALL_EVENTS_TABS[0].value);

  useEventToast({ replaceTo: EVENTS_PAGE_ROUTE });

  return (
    <UsualLayout>
      <EventsControls
        chosenTab={chosenTab}
        direction={direction}
        setChosenTab={setChosenTab}
        setDirection={setDirection}
      />

      <EventsList chosenTab={chosenTab} direction={direction} />
    </UsualLayout>
  );
};
