import React from 'react';
import { FormattedMessage } from 'react-intl';

import clsx from 'clsx';

import { UsualTabs } from 'common/components/ui/Tabs';
import { SortingDirectionEnum } from 'graphql/types';

import { ALL_EVENTS_TABS } from '../AllEventsPage';

import { ReactComponent as ArrowsIcon } from './arrows.svg';

import s from './EventsControls.module.scss';

export interface EventsControlsProps {
  chosenTab: string;
  setChosenTab: React.Dispatch<React.SetStateAction<string>>;
  setDirection: React.Dispatch<React.SetStateAction<SortingDirectionEnum>>;
  direction: SortingDirectionEnum;
}

export const EventsControls: React.FC<EventsControlsProps> = ({ chosenTab, setChosenTab, setDirection, direction }) => {
  const handleSort = () => {
    setDirection(direction === SortingDirectionEnum.Asc ? SortingDirectionEnum.Desc : SortingDirectionEnum.Asc);
  };

  const handleChangeTab = (activeTab: string) => {
    setChosenTab(activeTab);
  };

  return (
    <header className={s.EventsControls__container}>
      <div className={s.EventsControls__actions}>
        <UsualTabs
          tabs={ALL_EVENTS_TABS}
          value={chosenTab}
          onChange={handleChangeTab}
          containerClassName={s.EventsControls__switcher}
        />

        <div
          className={clsx(s.EventsControls__dateSort, direction === SortingDirectionEnum.Asc && s.active)}
          onClick={handleSort}>
          <FormattedMessage id="event.header.sort.date" defaultMessage="Sort by: Date" />
          <ArrowsIcon className={s.EventsControls__dateSortIcon} />
        </div>
      </div>
    </header>
  );
};
