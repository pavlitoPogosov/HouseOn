import React, { useMemo } from 'react';
import ContentLoader from 'react-content-loader';

import { IDatepickerValue } from 'common/components/ui/Datepicker/Datepicker';
import { HouseEventsPageType } from 'graphql/types';
import { getEventsCalendarDays, getEventsSkeletons, getEventsRows } from 'utils/calendar';

import { Event } from './Event/Event';
import { EventsDays } from './EventsDays/EventsDays';

import s from './Events.module.scss';

export interface IEventsProps {
  currentDate: IDatepickerValue;
  events: HouseEventsPageType | undefined;
  isEmpty?: boolean;
  isLoading?: boolean;
}

export const Events: React.FC<IEventsProps> = ({ currentDate, events, isEmpty, isLoading }) => {
  const { events: eventsWithStyles, rowsCount } = useMemo(() => {
    return getEventsRows(events?.list || [], currentDate);
  }, [currentDate, events?.list]);

  const dayCells = useMemo(() => {
    return getEventsCalendarDays(currentDate);
  }, [currentDate]);

  const containerMinHeight = 268;
  const calculatedContainerHeight = 30 + 44 * rowsCount;
  const containerHeight = calculatedContainerHeight > 268 ? calculatedContainerHeight : containerMinHeight;

  return (
    <div className={s.Events__parent}>
      <div
        className={s.Events__container}
        style={{
          gridTemplateColumns: `repeat(${dayCells.length}, minmax(100px, 1fr))`,
          gridTemplateRows: `30px repeat(${rowsCount}, 44px)`,
          minHeight: containerMinHeight
        }}
      >
        <EventsDays dayCells={dayCells} isEmpty={!!isEmpty} lineHeight={containerHeight} />

        {isLoading &&
          getEventsSkeletons(currentDate).map((skeleton, i) => (
            <ContentLoader
              className={s.Events__event}
              height="40"
              key={i}
              preserveAspectRatio="none"
              style={{
                gridColumnEnd: skeleton.end,
                gridColumnStart: skeleton.start,
                gridRow: `${i + 2}/${i + 3}`
              }}
              viewBox="0 0 100 40"
              width="100%"
            >
              <rect height="40" rx="0" ry="0" width="100" x="0" y="0" />
            </ContentLoader>
          ))}

        {!isEmpty &&
          !isLoading &&
          eventsWithStyles.map((event) => (
            <Event
              containerClassName={s.Events__event}
              containerStyle={{
                gridColumnEnd: event.end ? event.end + 1 : event.start + 1,
                gridColumnStart: event.start,
                gridRow: event.gridRow
              }}
              event={event}
              key={event.id}
            />
          ))}
      </div>
    </div>
  );
};
